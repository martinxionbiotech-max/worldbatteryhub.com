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
