import fs from 'node:fs';
import path from 'node:path';

const dist = process.env.DIST || 'dist';
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
const siteName = process.env.SITE_NAME || 'World Battery Hub';
const siteDesc = process.env.SITE_DESC || 'Battery industry reference: technology, manufacturers, markets, standards and test methods.';
const ogImage = process.env.OG_IMAGE || 'https://worldbatteryhub.com/images/og-image.png';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

if (!fs.existsSync(dist)) {
  console.error('postbuild: dist not found');
  process.exit(0);
}

const all = walk(dist);
const pages = all.filter((f) => f.endsWith('.html'));

let ogAdded = 0;
for (const file of pages) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (!html.includes('property="og:title"')) {
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim() || siteName;
    const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1]?.trim() || siteDesc;
    const canon = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/) || [])[1]?.trim();
    if (canon) {
      const tags = [
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(desc)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:url" content="${esc(canon)}" />`,
        `<meta property="og:site_name" content="${esc(siteName)}" />`,
        `<meta property="og:image" content="${esc(ogImage)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ].join('\n    ');
      html = html.replace('</head>', `    ${tags}\n  </head>`);
      changed = true;
      ogAdded++;
    }
  }

  if (!/"@type"\s*:\s*"Organization"/.test(html)) {
    const org = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","@id":"https://worldbatteryhub.com/#organization","name":"World Battery Hub","url":"https://worldbatteryhub.com","logo":"https://worldbatteryhub.com/images/logo-icon.png"}</script>`;
    html = html.replace('</head>', `    ${org}\n  </head>`);
    changed = true;
  }

  if (!html.includes('"BreadcrumbList"')) {
    const rel = path.relative(dist, file).split(path.sep);
    const segs = rel.slice(0, -1);
    if (segs.length > 0) {
      const items = [{ name: 'Home', url: siteUrl + '/' }];
      segs.forEach((seg, i) => {
        const name = seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        items.push({ name, url: siteUrl + '/' + segs.slice(0, i + 1).join('/') + '/' });
      });
      const bc = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem', position: i + 1, name: it.name, item: it.url,
        })),
      };
      html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(bc)}</script>\n  </head>`);
      changed = true;
    }
  }

  if (!/"@type"\s*:\s*"(Article|TechArticle|CollectionPage|WebSite)"/.test(html)) {
    const rel = path.relative(dist, file).split(path.sep);
    const segs = rel.slice(0, -1);
    if (segs.length >= 1) {
      const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.split('|')[0].trim() || siteName;
      const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1]?.trim() || siteDesc;
      const canon = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/) || [])[1]?.trim();
      if (canon) {
        const art = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: desc,
          url: canon,
          mainEntityOfPage: canon,
          dateModified: '2026-11-07',
          author: { '@type': 'Organization', name: siteName },
          publisher: { '@id': 'https://worldbatteryhub.com/#organization' },
          isPartOf: { '@id': siteUrl + '/' },
        };
        html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(art)}</script>\n  </head>`);
        changed = true;
      }
    }
  }

  if (changed) fs.writeFileSync(file, html);
}

// Related-cluster links for sub-sites (improves crawl depth and cluster connectivity).
if (siteUrl !== 'https://worldbatteryhub.com') {
  const infos = pages.map((file) => {
    const rel = path.relative(dist, file).split(path.sep);
    const segs = rel.slice(0, -1);
    const url = segs.length ? '/' + segs.join('/') + '/' : '/';
    const html = fs.readFileSync(file, 'utf8');
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.split('|')[0].trim() || '';
    return { file, url, title, section: segs.length >= 2 ? segs[0] : (segs.length === 1 ? '(articles)' : '') };
  });
  for (const info of infos) {
    if (!info.section || !info.title) continue;
    let html = fs.readFileSync(info.file, 'utf8');
    if (html.includes('More in this cluster')) continue;
    const siblings = infos.filter((p) => p.section === info.section && p.url !== info.url && p.title).slice(0, 4);
    if (siblings.length < 2) continue;
    const list = siblings.map((p) => `<li><a href="${p.url}">${p.title}</a></li>`).join('');
    const block = `<h2>More in this cluster</h2><ul>${list}</ul>`;
    if (html.includes('<footer')) html = html.replace('<footer', block + '<footer');
    else html = html.replace('</body>', block + '</body>');
    fs.writeFileSync(info.file, html);
  }
}

if (process.env.SKIP_LLMS !== '1' && !fs.existsSync(path.join(dist, 'llms.txt'))) {
  const lines = [];
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim();
    const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1]?.trim();
    const canon = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/) || [])[1]?.trim();
    if (title && canon) lines.push(`- [${title}](${canon})${desc ? ': ' + desc : ''}`);
  }
  const body = `# ${siteName}\n\n> ${siteDesc}\n\n## Pages\n\n${lines.join('\n')}\n`;
  fs.writeFileSync(path.join(dist, 'llms.txt'), body);
}

console.log(`postbuild: og=${ogAdded}/${pages.length}, llms=${fs.existsSync(path.join(dist, 'llms.txt'))}`);
