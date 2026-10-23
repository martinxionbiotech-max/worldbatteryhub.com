# Battery 站合规修复报告（compliance-fix-battery）

> 批次：battery 项目（worldbatteryhub.com）
> 执行角色：合规法律内容编辑 + 技术 SEO
> 修复日期：2026-10-23
> 依据：`docs/compliance-audit-battery-freight.md`（battery 站缺口清单）

---

## 1. 结论摘要

- ✅ `npm run build` 通过（203 页 → `dist/llms/**`、`llms.txt`、`llms-full.txt`），退出码 0。
- ✅ 渲染验证通过：about `#operator-disclosure`、contact 占位标注、disclaimer 管辖法节、privacy DPA 投诉节均已落地。
- ✅ 五页（about/contact/disclaimer/privacy/terms）主体口径、联系口径、日期戳统一为 `2026-10-23` 并互链。
- ✅ `safety-notice` 未改动（已达标，保持不动）。
- ✅ **零虚构**：主体信息取自用户明确指示的 `chengguangenergy-astro` 仓实测数据，真实不编造；仅披露已确认字段（legalName/shortName/市级地址），未编造详细地址/USCC/电话。

---

## 2. 各页词数（前 → 后，`wc -w` 原始值）

| 页面 | 修复前 | 修复后 | 目标 | 达标 |
|---|---|---|---|---|
| `about/index.astro` | 540 | **1566** | 1500+ | ✅ |
| `contact/index.astro` | 302 | **673** | 充实（RFQ 主渠道 + 纠错/数据通道 + 响应预期 + 互链） | ✅ |
| `disclaimer.astro` | 807 | **1525** | ~1500（补管辖法+可分割性） | ✅ |
| `privacy-policy.astro` | 1037 | **1508** | 达标（补 DPA 投诉渠道） | ✅ |
| `terms-of-use.astro` | 1089 | **1138** | 微补（与 disclaimer 管辖口径一致） | ✅ |
| `safety-notice.astro` | 918 | 918 | 不动 | ✅（未改） |

> 说明：以上为 `wc -w` 原始值（含 Astro 模板标签/frontmatter），可见正文词数约低 10–20%，与审计报告口径一致。

---

## 3. 占位邮箱处理方式

**决定：保持真实状态，不虚构收件地址；页内如实呈现并明确标注 `(placeholder — final address pending)`。**

- 三邮箱口径统一为 `(placeholder — final address pending)`：
  - RFQ：`rfq@worldbatteryhub.com`
  - 编辑纠错/数据问题：`editorial@worldbatteryhub.com`
  - 数据与方法论/许可：`data@worldbatteryhub.com`
- contact 页 lead 与 takeaways 明确写「占位待最终设置」，并新增「响应预期」小节：采用**可兑现口径**——`reasonable-effort target, not a contractual service level`，避免在邮箱未接入真实收件前承诺固定 SLA。
- contact 页新增「What this page does not do」小节，如实说明「无电话/实体地址（运营主体与联系方式 pending confirmation）」。
- legal 三页（disclaimer/privacy/terms）引用邮箱处原本未带占位提示的，本轮未在每处重复追加「placeholder」字样，改为统一通过 contact 页 + about 主体披露承接口径（避免法律页内文字过噪）；报告此处在待补充清单中标注「待真实邮箱接入后，删除所有 placeholder 标注」。

---

## 4. 主体披露现状与待补充清单

### 4.1 现状（用户已提供主体，已落地）

- 品牌名 `World Battery Hub` 全站一致（页脚/页内/schema `name` 一致）。
- **法律运营主体（已披露，真实不编造）**：
  - `legalName`: **Jinzhou Chengguang Power Source Co., Ltd.**
  - `alternateName` / shortName: **Chengguang Power Tech**
  - 地址（仅市级）：**Jinzhou, Hebei, China**
- 已写入：
  - **about 页** `#operator-disclosure` 小节：legalName + shortName + 市级地址（如实）；详细地址/USCC/电话标注「available on request」诚实表述。
  - **schema `Organization`**：补 `legalName` / `alternateName` / `address`（PostalAddress，仅市级 locality/region/country）三字段；未补任何编造字段。
  - **页脚**：`operated by Jinzhou Chengguang Power Source Co., Ltd. (Chengguang Power Tech)`。
  - **contact 页**：What-this-page-does-not-do 改为「无电话/详细街道地址——主体为 Jinzhou Chengguang… 电话与详细地址 available on request」。
  - **disclaimer / privacy**：主体指代由「operator of World Battery Hub」更新为实际 legalName + trading name，并链到 about 披露。
- **schema 保持真实**：`Organization` 现含 `name/url/description/legalName/alternateName/address`，不补 USCC/电话/详细街道/邮箱（缺项空缺）。

### 4.2 待用户补充清单（收到后补齐并同步 schema/页脚/contact）

1. **详细办公地址**（full street address，当前仅市级 Jinzhou, Hebei, China）。
2. **统一社会信用代码 / USCC**（unified social credit code / registration identifier）。
3. **主体电话**（contactPoint.telephone）。

> 说明：两站不同主体，本轮仅用用户明确指示的 chengguangenergy.com 同一主体信息（自 `chengguangenergy-astro/src/data/site.ts` 实测）；未借用 freight 站 YIWU DINGWEI 信息。占位邮箱（rfq@/editorial@/data@）仍待真实收件地址，替换后删 placeholder 标注。

---

## 5. 主要修改明细

- **about**：新增「What this platform is」「Operator and platform disclosure」「Correction policy（独立小节）」「Editorial independence（独立小节）」「Related pages 互链块」；深化 Editorial method（6 条条款级）、Source hierarchy（三级 + 阈值规则）、Research Desk（四步流程 collect→cross-check→label→explain）。
- **contact**：RFQ 升为主渠道并详列需提供信息；编辑纠错/数据问题通道分列；新增「What you can expect」可兑现响应口径与「What this page does not do」；补 Related pages 互链块；补 `#rfq`/`#editorial` 锚点供 about/disclaimer 深链。
- **disclaimer**：新增「8. Governing law and severability」（中国法，与 terms 一致）；补管辖法+可分割性+强制性权利+语言版本+生效条款；深化 §1/§2/§3/§4/§5/§6（内容范围、无专业关系、危险品运输文档、第三方数据时效、责任限制适用方式、非隶属声明）。
- **privacy**：新增「12. Complaints and supervisory authorities」（如实：适用监管机构投诉权，不指定单一 lead authority）；新增处理器（processor）说明、跨境转移适当保障、留存终止原则、安全事件通知、可分割性；重编号 13/14。
- **terms**：§10 补可分割性，明确与 disclaimer 口径一致。
- **日期戳**：五页 `dateModified` + byline 统一 `2026-10-23`。

---

## 6. Build 与渲染验证

- `npm run build` → `Done: 203 pages → dist/llms/**, llms.txt, llms-full.txt`，退出码 0。
- 渲染验证（grep dist）：
  - `dist/about/index.html` 含 `operator-disclosure` ✅
  - `dist/contact/index.html` 含 `placeholder` 标注（7 处）✅
  - `dist/disclaimer/index.html` 含 `Governing law and severability` ✅
  - `dist/privacy-policy/index.html` 含 `Complaints and supervisory authorities` ✅
- `safety-notice.astro` 无 diff（未改）✅
- 构建产物 `node_modules/.vite/deps/_metadata.json` 的无关变更已 `git checkout` 还原，不进入提交。

---

## 7. 提交与推送

- commit 标记：`compliance-fix-*`
- 同步状态：与 `origin/main` 同步 0/0（fetch 后无 ahead/behind）。
