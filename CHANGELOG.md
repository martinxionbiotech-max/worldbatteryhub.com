# CHANGELOG

> Change management per Phase 2 §50–51. Every change records: Date / URL / Change / Reason / Old / New / SEO risk / Rollback.

| Date | URL | Change | Reason | Old | New | SEO risk | Rollback |
|---|---|---|---|---|---|---|---|
| 2026-09-17 | worldbatteryhub.com/lead-acid/h6-vs-h7-vs-h8/ · /lead-acid/battery-group-sizes/ · /lead-acid/sli-battery/ · /lead-acid/cca/cca-by-battery-group/ · /lead-acid/truck-battery/ · /lead-acid/marine-battery/ · /lead-acid/battery-size-selection/ | Added deep links to data-worldbatteryhub entity pages (replacing data-home links where present) | Phase 2 Week 1, §06 Gap A: main → data should be entity-level, not home-level | Data-home links (or no entity links) | Entity-level links (e.g. /battery-groups/h6/, /group31/, /n200/, /group8d/) | Low — additive link edits only, no URL/title/H1/canonical/schema change | `git revert f369136` |
