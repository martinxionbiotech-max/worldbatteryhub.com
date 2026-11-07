// Dependency-free Markdown generation for md-negotiation.
// Converts each dist/**/index.html main content into a sibling index.md
// and writes dist/_md/manifest.json mapping URL paths to Markdown paths.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const SKIP_DIRS = new Set(['_astro', 'images', '_md', 'api']);

async function* walk(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(path.join(dir, e.name));
    } else if (e.name.endsWith('.html')) {
      yield path.join(dir, e.name);
    }
  }
}

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

function htmlToMarkdown(html) {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '');

  s = s.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${'#'.repeat(+n)} ${t.replace(/<[^>]+>/g, '').trim()}\n\n`);
  s = s.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    const text = t.replace(/<[^>]+>/g, '').trim();
    return text ? `[${text}](${href})` : '';
  });
  s = s.replace(/<li[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '');
  s = s.replace(/<tr[^>]*>/gi, '\n| ').replace(/<\/tr>/gi, ' |');
  s = s.replace(/<t[dh][^>]*>/gi, '').replace(/<\/t[dh]>/gi, ' | ');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|section|table|ul|ol)>/gi, '\n\n');
  s = s.replace(/<[^>]+>/g, '');
  s = decode(s);
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ');
  return s.trim();
}

function extractContent(html) {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (m) return m[1];
  const b = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return b ? b[1] : null;
}

const manifest = {};
let generated = 0;
const skipped = [];

for await (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep);
  if (rel.join('/') === '404.html') { skipped.push('404.html'); continue; }
  const html = await readFile(file, 'utf8');
  if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) { skipped.push(rel.join('/')); continue; }
  const content = extractContent(html);
  if (!content) { skipped.push(rel.join('/')); continue; }
  const md = htmlToMarkdown(content);
  if (md.length < 60) { skipped.push(rel.join('/')); continue; }
  const mdFile = file.replace(/\.html$/, '.md');
  await writeFile(mdFile, md + '\n', 'utf8');
  let pub = '/' + rel.slice(0, -1).join('/');
  if (rel[rel.length - 1] !== 'index.html') pub += '/' + rel[rel.length - 1].replace(/\.html$/, '');
  const key = pub === '' ? '/' : pub.endsWith('/') ? pub : pub + '/';
  manifest[key] = key === '/' ? '/index.md' : key + 'index.md';
  generated++;
}

await mkdir(path.join(DIST, '_md'), { recursive: true });
await writeFile(path.join(DIST, '_md', 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log(`[md-negotiation] generated=${generated} skipped=${skipped.length}`);
if (!generated) process.exit(1);
