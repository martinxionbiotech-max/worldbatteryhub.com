# CHANGELOG

> Change management per Phase 2 §50–51. Every change records: Date / URL / Change / Reason / Old / New / SEO risk / Rollback.

| Date | URL | Change | Reason | Old | New | SEO risk | Rollback |
|---|---|---|---|---|---|---|---|
| 2026-09-17 | worldbatteryhub.com/lead-acid/h6-vs-h7-vs-h8/ · /lead-acid/battery-group-sizes/ · /lead-acid/sli-battery/ · /lead-acid/cca/cca-by-battery-group/ · /lead-acid/truck-battery/ · /lead-acid/marine-battery/ · /lead-acid/battery-size-selection/ | Added deep links to data-worldbatteryhub entity pages (replacing data-home links where present) | Phase 2 Week 1, §06 Gap A: main → data should be entity-level, not home-level | Data-home links (or no entity links) | Entity-level links (e.g. /battery-groups/h6/, /group31/, /n200/, /group8d/) | Low — additive link edits only, no URL/title/H1/canonical/schema change | `git revert f369136` |
| 2026-09-17 | worldbatteryhub.com/lead-acid/h6-vs-h7-vs-h8/ | Added parameter-level Source Cards (Parameter/Source/Test standard table + representative source card) after the comparison table | P0 §2 Source/Evidence system — claim-level source records, Source Cards on H6/H7 comparison first (§44-45) | Page had a Sources list but no per-parameter source/standard mapping | Added "Source cards" section: Parameter→Source→Test-standard table + datasheet source card (Varta/Bosch/Exide/Yuasa, EN 50342 L3/L4/L5) | Low — additive only; no title/H1/canonical/URL change | `git revert` this commit |
| 2026-09-17 | worldbatteryhub.com/testing/ | Expanded testing hub: definition, scope, 21-method catalog (linked to testing sub-site), standards links, real-question FAQ (FAQPage schema) | P0 §4 Testing 主站扩容 — main hub should be entry point, not two links | Hub had only 2 links (capacity testing + CCA) | Full hub: lead + At-a-glance + 21-method table + standards + 3-question FAQ matching FAQPage JSON-LD | Low — additive rewrite of hub body; H1/canonical/URL unchanged | `git revert` this commit |
| 2026-09-17 | worldbatteryhub.com/lithium/nca-battery/ (new) | New NCA chemistry page (QAE title, At-a-glance box, Engineering interpretation block, original cathode→cell density calc, FAQ matching schema) | P0 §5 Lithium 扩容 — NCA chemistry page | No page existed | New page /lithium/nca-battery/ | Low — net-new URL, no existing URL/title touched | `git revert` this commit (removes page) |
| 2026-09-17 | worldbatteryhub.com/lithium/cell-formats-18650-21700-4680/ (new) | New cell-format comparison page (QAE title, At-a-glance box, Engineering interpretation block, original cylinder-volume calc, FAQ matching schema) | P0 §5 Lithium 扩容 — cell format comparison page | No page existed | New page /lithium/cell-formats-18650-21700-4680/ | Low — net-new URL | `git revert` this commit (removes page) |
| 2026-09-17 | worldbatteryhub.com/lithium/ | Added links to two new pages (NCA under Chemistries, cell formats under Fundamentals) | P0 §5 — surface new pages from hub | New pages unlisted on hub | Two new links added | Low — additive links only | `git revert` this commit |

## 2026-09-18 — SEO/AIO fix batch (audit #15, user-approved)
- Change: 36 page titles trimmed to ≤58 chars (SERP truncation)
- Reason: audit 15-seo-aio-audit.md P1 — titles >62 chars truncate in results
- Old: full descriptive titles (e.g. 80-char) | New: truncated at word boundary with …
- SEO risk: low (title variable feeds JSON-LD headline + og:title consistently)
- Rollback: git revert
- Change: 68 meta descriptions trimmed to ≤155 chars
- Reason: audit P1 — descriptions >165 chars truncate in results
- SEO risk: low | Rollback: git revert
- Change: 7 technology/testing pages upgraded Article → TechArticle schema
- Reason: audit P2 #2 — structured technical claims | SEO risk: low | Rollback: git revert

## 2026-09-18 — P1 batch (cron p1p2-batch-0918-1205)
- Date: 2026-09-18 | URL: worldbatteryhub.com/tools/battery-finder/ (new) + /tools/ + src/data/battery-groups.json (new)
- Change: Added interactive Battery Finder tool — static embedded JSON of 56 lead-acid groups, pure-JS client-side filter by group code / case size / voltage, with CCA-standard column and links to data.worldbatteryhub.com entity pages; added finder row to tools index.
- Reason: P1 §4 (audit #16 §38 "Battery Finder") — cross-reference/finder is the site's strongest entry tool.
- Old: no finder; tools index listed 3 calculators only | New: /tools/battery-finder/ + finder row in tools index.
- SEO risk: Low — net-new URL, no existing URL/title/H1/canonical touched; data is a trimmed snapshot of data-site batteries.json.
- Rollback: `git revert` this commit (removes page + data file + index row).

## 2026-09-18 — V2.0 content fix quick batch (cron v2fix-quick-0918-1305)
- Change: Added `<ol>` step lists to 8 how-to-titled pages (battery-date-code, desulfation, how-to-test-a-battery, jump-starting, lead-acid-charging, runtime-calculation, lithium/how-to-charge, lithium/storage)
- Reason: audit #18 §6 title-promise gap — how-to titles must deliver an ordered step list
- Old: how-to pages carried tables/lists but no `<ol>` step sequence | New: each now has a "…step by step" ordered list
- SEO risk: Low — additive only, no URL/title/H1/canonical/schema change | Rollback: git revert
- Change: Added SAE/EN/JIS CCA comparison table to /lead-acid/cca/how-cca-is-tested/
- Reason: audit #18 §6 — comparison title but no comparison table
- Old: prose-only standards mention | New: SAE J537 / EN 50342 / JIS D5301 table (region, temperature, method)
- SEO risk: Low — additive | Rollback: git revert
- Change: Deepened <50-word QAE answer sections on 5 pages (agm-battery, efb-battery, gel-battery, marine-battery, truck-battery) with evidence + analysis layers
- Reason: audit #18 §40 depth gate — thin answer sections need the mechanism/evidence "why" beneath the table or list
- Old: bare tables/lists or one-line answers | New: a short analysis paragraph added under each flagged section
- SEO risk: Low — additive, no structural changes | Rollback: git revert

## 2026-09-18 — V2.0 补装 + Audit#3 P1（night-batch-0918-1805）
- Change: 76 页加「What buyers should ask」买家清单 + 68 页加「The bottom line」结论节（重叠 51 页）
- Reason: audit #18 §57（买家清单强制）/ §42（结论节）— 域适配条目，禁模板套用，结论不重复立场块
- Old: 页末仅有 FAQ/Sources，无买家清单和结论节 | New: 每页末尾加域适配买家清单 + 简短 The bottom line
- SEO risk: Low — 纯增补，不改 URL/slug/title/H1/canonical/schema | Rollback: git revert（6 个 commit）
- Change: 枢纽轻补强——lead-acid hub 加 At a glance 直答框；technology hub 修复 data 子站断链（/data.worldbatteryhub.com → https://）
- Reason: audit #18 枢纽页专项 | Old: lead-acid hub 无直答框、technology hub 断链 | New: 直答框 + 断链修复
- SEO risk: Low — additive | Rollback: git revert
- Change: 新建 /methodology/ 页（研究方法论、来源层级、数据验证、厂商声明政策、标准验证、冲突处理、市场数据方法、更正、更新、编辑独立性）
- Reason: audit #19 item 19 / P1-6 | Old: 无 methodology 页 | New: /methodology/ 页 + nav/footer 链接
- SEO risk: Low — net-new URL | Rollback: git revert
- Change: /about/ 补 Editorial Entity「World Battery Hub Research Desk」（方法论+审核+更正政策，不虚构真人专家）
- Reason: audit #19 item 11 / P1-7 | Old: about 无编辑部实体 | New: Research Desk 集体编辑部实体 + 方法/审核/更正/独立性
- SEO risk: Low — additive | Rollback: git revert
