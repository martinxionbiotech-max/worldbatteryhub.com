# 合规页面内容检查批 — 双站审计报告（只读评估 · 零编辑）

> 审计日期：2026-10-23 · 审计师角色：合规审计师 + 技术 SEO
> 范围：`worldbatteryhub.com`（主仓 cwd）· `worldfreighthub.net`（repos/worldfreighthub）
> 参照基线：条款级 1500–2200 词/页 · 六页齐全（about/contact/privacy/terms/cookies/disclaimer）· 主体/联系/日期/口径四统一互链 · 零虚构 · 与 schema 一致
> 本文档为**新增审计产出**，未修改任何被审站点文件。

---

## 0. 词数口径说明

本文档词数取自 `wc -w`（原始文件词数，含 Astro 模板标签/frontmatter）。**可见正文词数比原始值约低 10–20%**（标签、`<BaseLayout>` props、样式类名计入）。因此"低于基线"的判断需按比例下修，但缺口方向不变。任务给定的数字与 `wc -w` 一致，本文沿用。

---

## 1. worldbatteryhub.com — 6 页逐页矩阵

| 页面 | 原始词数 | 估算可见词数 | 章节结构 | 条款覆盖率 vs 基线 | 日期戳 | 互链 | 结论 |
|---|---|---|---|---|---|---|---|
| `disclaimer.astro` | 807 | ~690 | 7 节 + Related policies | **高（~95%）**：信息性用途/非建议/安全/准确性/第三方/责任限制/变更 全齐 | `2026-09-21` | ✅ 链到 terms/privacy/safety/data-use/methodology | 达标（接近，仍可加"管辖法+可分割性"到 1500） |
| `privacy-policy.astro` | 1037 | ~900 | 13 节 + Related | **高（~90%）**：主体/不收集项/收集项/Cookie/用途/法律依据/共享/跨境/留存/安全/权利/儿童/变更 全齐 | `2026-09-21` | ✅ | 达标（接近基线，可补 DPA 投诉渠道） |
| `terms-of-use.astro` | 1089 | ~950 | 11 节 + Related | **高（~90%）**：目的/许可/禁止/自动化/知产/准确/无担保/责任/可用/管辖法/变更 | `2026-09-21` | ✅ | 达标（有管辖法=中国、责任上限，完整） |
| `safety-notice.astro` | 918 | ~790 | 7 节 + Related | **高（~92%）**：责任归属/电气/铅酸/锂电/运输/存储处置/免责 | `2026-09-21` | ✅ | **行业特有面最完整**（见 §3） |
| `about/index.astro` | 540 | ~460 | 6 块 | **中（~65%）**：编辑方法/覆盖/来源层级/Research Desk/纠错/独立性 | `2026-09-18`（inline） | ⚠️ 无 Related 互链块 | **偏薄**，主体披露不足（见 §2） |
| `contact/index.astro` | 302 | ~260 | 4 块 | **低（~55%）**：RFQ/编辑纠错/数据问题/不做事项 | `2026-09-18` | ⚠️ 底部仅回首页/产品/关于 | **偏薄 + 邮箱占位**（见 §2） |

**额外合规页（超出基线六页，加分项）**：`accessibility.astro`(590)、`data-use-and-citation.astro`(778)、`methodology.astro`(910)。

### 1.1 主体披露与联系一致性（battery）

| 维度 | 页脚 | 页内 | schema Organization | 一致性 |
|---|---|---|---|---|
| 品牌名 | "World Battery Hub" | 同 | `name: "World Battery Hub"` | ✅ |
| 法人/运营主体 | ❌ 未披露（仅"the operator of World Battery Hub"） | ❌ 同 | ❌ 无 `legalName`/`address`/`foundingDate` | ❌ **全网无法律主体名** |
| 联系邮箱 | 无（页脚仅链接） | rfq@ / editorial@ / data@（均标 placeholder） | ❌ 无 `contactPoint` | ⚠️ 邮箱口径一致但均占位 |
| 地址/电话 | ❌ | ❌ | ❌ | ❌ 缺失 |

**核心发现（battery 主体）**：站点有**商业产品目录（/lead-acid/products/）+ RFQ 报价流程**，但全站**未披露任何法律运营主体名称、注册地址、统一社会信用代码**。schema `Organization` 仅 `name/url/description` 三字段，为**极薄实体**，与 freight 站（披露 YIWU DINGWEI TRADING COMPANY + 地址 + 统一社会信用代码 + contactPoint）形成鲜明对比。这是 E-E-A-T / 信任度的最大缺口。

### 1.2 行业特定合规面（battery —— 电池产品特有）

| 合规面 | 覆盖位置 | 覆盖度 | 评估 |
|---|---|---|---|
| **安全公告** | `safety-notice.astro` 全文 + `/basics/battery-safety-basics/` | ✅ 强 | 电气/铅酸(硫酸+氢气)/锂电(热失控)分区，责任归属清晰 |
| **运输合规** | `safety-notice.astro` §5（UN 3480/3481 锂电 · UN 2794/2800 铅酸 · 荷电限制/包装/标签）+ `/basics/battery-transport-regulations/` | ✅ 强 | 覆盖危险品分类与打包指令 |
| **回收指引** | `safety-notice.astro` §6（禁止生活垃圾、授权回收）+ `/lead-acid/recycling` `/lithium/lithium-recycling` `/basics/battery-recycling-importers` | ✅ 强 | 回收/处置双端覆盖 |

**结论**：电池站**行业特有合规面是三者中最强**，安全/运输/回收三层齐全且专业。

### 1.3 零虚构核对（battery）

- ✅ About 明确写 "No fabrication"、"Research Desk 集体编辑实体、不虚构单一专家署名"、"未来真实评审者才列为 Person 实体，不用虚构 byline"。
- ✅ 免责声明："未标来源/置信标签的数值仅作指示性"。
- ✅ 联系页诚实标注"占位待定"。
- ⚠️ 轻微问题：占位标注只在 contact 页出现，privacy/disclaimer/terms 页引用 editorial@/data@ **未附带占位提示**（口径不完全统一）。

### 1.4 日期戳 / 互链（battery）

- ✅ 六页均有日期戳（legal 4 页 `2026-09-21`，about/contact `2026-09-18`）。
- ⚠️ 日期分两簇（09-18 vs 09-21），非阻断但可统一为单次 review 批次。
- ✅ 页脚有完整"政策与合规"导航行（Disclaimer/Terms/Privacy/Safety/Data Use/Accessibility/Methodology/About/Contact），全站统一互链。

---

## 2. worldfreighthub.net — 5 页逐页矩阵

| 页面 | 原始词数 | 估算可见词数 | 章节结构 | 条款覆盖率 vs 基线 | 日期戳 | 互链 | 结论 |
|---|---|---|---|---|---|---|---|
| `about.astro` | 963 | ~820 | 6 块 | **中（~70%）**：做什么/差异化/原则/不做/背后主体/纠错 | ❌ 无日期戳 | ✅ | 达标线附近，主体披露强 |
| `contact.astro` | 209 | ~180 | 3 块 | **低（~45%）**：直接联系/一般咨询/合作 | ❌ 无日期戳 | ⚠️ | **偏薄**（见 §2.3） |
| `cookie-policy.astro` | 248 | ~210 | 4 块 | **低（~50%）**：自设/第三方/控制/问题 | `19 Sep 2026` | ✅ | **薄页（P1）** |
| `privacy-policy.astro` | 428 | ~370 | 9 块 | **低（~55%）**：主体/收集/表单/不收集/留存/权利/第三方链接/变更/联系 | `19 Sep 2026` | ✅ | **薄页（P1）** |
| `terms-of-use.astro` | 468 | ~400 | 8 节 | **低（~55%）**：性质/估算/免责/第三方/许可使用/知产/纠错/变更 | `19 Sep 2026` | ✅ | **薄页（P1）** |
| ❌ `disclaimer` | **缺失** | — | — | **0%** | — | — | **P0 阻断（见 §2.1）** |

**额外合规页（加分项，部分补偿 disclaimer 缺失）**：`advertising-disclosure.astro`(228)、`corrections.astro`(400)、`editorial-policy.astro`(591)、`provider-verification-policy.astro`(1017)、`data-changelog.astro`。

### 2.1 缺 disclaimer —— 货运信息平台必备三面

当前**仅靠页脚 `footer.disclaimer` 一句话（en+ar 双语）+ terms §2/§3/§4 分散覆盖**，无独立 disclaimer 页。货运信息平台需独立覆盖：

| 必备面 | 现状 | 缺口 |
|---|---|---|
| **估算非承诺**（estimates ≠ commitment） | 页脚一句话 + terms §2"Rates and data are estimates" | ⚠️ 无独立页、无"报价非要约/不构成承运承诺"的完整声明 |
| **第三方承运人责任边界** | terms §4 有（承运合同在用户与承运人间） | ⚠️ 篇幅单薄，缺保险/货损/延误责任的明确切割 |
| **报价时效**（quote validity/expiry） | ❌ **完全缺失** | ❌ 无"报价有效期/时效性"声明，无"价格随燃油/季节/地缘变动，下单前需承运人书面确认" |

**建议**：新建独立 `disclaimer.astro`（≥1500 词），覆盖上述三面 + 一般免责 + 责任限制 + 变更条款，并纳入页脚 legal 列。

### 2.2 主体披露与联系一致性（freight）

| 维度 | 页脚 | 页内 | schema Organization | 一致性 |
|---|---|---|---|---|
| 品牌名 | WorldFreightHub | 同 | `name: "WorldFreightHub"` | ✅ |
| 法人 | — | `YIWU DINGWEI TRADING COMPANY`（about/evidence） | `legalName` 同 | ✅ |
| 成立年 | — | `2025` | `foundingDate: "2025"` | ✅ |
| 地址 | — | 义乌市江东路山口社区（evidence/company） | `PostalAddress` 同 | ✅ |
| 统一社会信用代码 | — | `92330782MA8GW3P***`（掩码） | `identifier` 同 | ✅（诚实掩码 + 明确"非完整"声明） |
| 联系邮箱 | — | `martin@dinweys.com` | `contactPoint.email` 同 | ✅ |
| 电话 | — | `+86 13323237275` | `contactPoint.telephone` 同 | ✅ |
| 编辑署名主体 | — | "WorldFreightHub Research Desk" | `publisherName` 同 | ✅ |

**结论（freight 主体）**：**强**。freight 是两站中唯一完整披露法人实体 + 地址 + 统一社会信用代码 + 联系方式 + contactPoint 的站，且 about/evidence/company/schema 四处口径完全一致。`founded 1990/2015/2016` 等年份均为**目录内第三方承运商**，非运营主体，不构成口径冲突。

### 2.3 零虚构核对（freight）

- ✅ 强。About 明确"Zero fabricated data / 不编造价格·时效·评价·评分"；evidence/company 明确"仅 first-party 声明、不冒充独立验证、信用代码掩码不声称完整"。
- ✅ Research Desk 集体署名，无虚构 byline。
- ⚠️ 唯一注意：统一社会信用代码**掩码发布**（诚实且已声明），但对信任度而言可考虑发布完整码或说明掩码理由（P2）。

### 2.4 日期戳 / 互链（freight）

- ⚠️ 仅 privacy/terms/cookie 有 `19 Sep 2026`；about/contact **无日期戳**。
- ✅ 页脚 legal 列完整（Privacy/Terms/Cookie/Advertising/Corrections/Data Changelog），但**无 disclaimer 项**（因页面缺失）。
- ⚠️ 阿语版存在独立合规页（`ar/about` `ar/contact`），但 **ar 版无 privacy/terms/cookie/disclaimer**（footer 链接硬编码指向英文 `/privacy-policy/` 等，未本地化）——阿语访客合规面缺失。

---

## 3. 缺口清单（P0–P2 汇总）

### 3.1 worldbatteryhub.com

| 等级 | 缺口 | 说明 | 建议 |
|---|---|---|---|
| **P0** | 联系邮箱全部为占位 | rfq@/editorial@/data@ 标注"placeholder pending setup"，未接入真实收件 | 上线前配置真实邮箱并删除占位标注 |
| **P1** | 无法律运营主体披露 | 全站 + schema 均无 legalName/地址/信用代码；有商业目录+RFQ 却无主体 | 补齐 schema `Organization.legalName/address/contactPoint/foundingDate`，对齐 freight |
| **P1** | schema Organization 极薄 | 仅 name/url/description | 加 contactPoint、sameAs、logo |
| **P1** | 无独立 cookie 政策页 | cookies 仅内嵌 privacy §4；基线六页要求独立 cookie 页 | 若未来加分析/营销 cookie，需独立页 + 同意横幅；当前无 cookie 可维持但应补占位页 |
| **P1** | about(540)/contact(302) 低于条款级基线 | about 缺独立互链块，contact 缺地址/电话/响应 SLA | 扩写 about E-E-A-T、contact 补主体+联系方式 |
| **P2** | 日期戳两簇 | 09-18 vs 09-21 | 统一单次 review 批次 |
| **P2** | 占位标注口径不一 | 仅 contact 标注 placeholder，legal 页引用邮箱未标注 | 统一在 legal 页也标注或同步去占位 |

### 3.2 worldfreighthub.net

| 等级 | 缺口 | 说明 | 建议 |
|---|---|---|---|
| **P0** | **缺 disclaimer 页** | 货运平台必备"估算非承诺/承运人责任/报价时效"三面无独立载体 | 新建 `disclaimer.astro`（≥1500 词）+ 页脚 legal 列加入口 |
| **P1** | privacy-policy 428 词偏薄 | 缺 GDPR 法律依据、国际传输、详细留存期、儿童、安全措施、DPA 投诉渠道、第三方处理者清单（formsubmit.co） | 补全条款至 1500+ |
| **P1** | terms-of-use 468 词偏薄 | 缺管辖法/司法辖区、责任上限、可分割性、争议解决、完整担保免责 | 补全条款至 1500+ |
| **P1** | cookie-policy 248 词偏薄 | 缺 cookie 类别/存续期/控制机制细目；formsubmit.co + Google Fonts 仅一句话 | 补全分类与管控说明 |
| **P1** | contact 209 词偏薄 | 缺地址、响应 SLA、运营主体署名 | 补全 |
| **P1** | 报价时效（quote expiry）完全缺失 | 全站无"报价有效期"声明 | 并入新 disclaimer 页 |
| **P2** | about/contact 无日期戳 | 仅 legal 三页有日期 | 统一加 review 日期 |
| **P2** | 阿语版无 legal 页 | footer legal 硬编码英文，阿语访客无合规页 | 为 ar 补齐 privacy/terms/cookie/disclaimer 或至少 ar 页内链英文版 |
| **P2** | 统一社会信用代码掩码 | 诚实且已声明，但信任度可再提升 | 考虑发布完整码或说明掩码理由 |

---

## 4. 行业特定合规面评估（双站对比）

| 维度 | battery | freight |
|---|---|---|
| 安全/危险品合规 | ✅✅ 强（安全公告 + UN38.3/UN 3480/3481/2794/2800 + 回收三层） | ➖ 仅涉 `shipping-batteries-china-to-gcc` 等单页，无独立合规页 |
| 信息性免责（非建议/非承诺） | ✅ 强（disclaimer §2/§3 明确非工程/采购/法律/安全建议） | ⚠️ 弱（仅页脚+terms 分散，无独立 disclaimer，报价时效缺失） |
| 第三方责任边界 | ✅（disclaimer §5 + terms §3 覆盖） | ✅ 有（terms §4 承运合同切割），但篇幅薄 |
| 主体披露（E-E-A-T） | ❌ 无法律主体名/地址/信用代码 | ✅✅ 强（完整法人 + 地址 + 信用代码 + contactPoint） |

**总体判断**：
- **battery 站**：免责/安全/运输/回收等**内容合规面最强**，但**主体披露（E-E-A-T 实体）最弱**——有商业目录却无法律主体名，是首要补强点。
- **freight 站**：**主体披露最强**，但**法律条款页（disclaimer/privacy/terms/cookie）整体偏薄 + 缺 disclaimer**——条款级厚度是首要补强点。

---

## 5. 建议补充项（按谷歌要求对齐）

### 5.1 两站通用（Google E-E-A-T + 法律合规）
1. **实体补齐**：schema `Organization` 至少含 `legalName` + `address(PostalAddress)` + `contactPoint` + `foundingDate` + `sameAs`（battery 尤其急需）。
2. **六页齐全**：about/contact/privacy/terms/cookies/disclaimer 六页必须具备且互链（battery 补 cookie 页，freight 补 disclaimer 页）。
3. **条款级厚度**：法律页（privacy/terms/disclaimer）对齐 1500–2200 词，补管辖法/责任上限/可分割性/争议解决/数据权利完整条款。
4. **日期戳统一**：所有合规页统一 review 日期，且页脚/页内/schema `dateModified` 一致。
5. **联系口径统一**：邮箱/电话/地址/主体名在页脚、页内、schema、contact 四处一致。

### 5.2 battery 特有
6. 商业目录 + RFQ 前，必须披露运营法律主体（至少 legalName + 注册地）。
7. 上线前替换占位邮箱为真实收件地址。

### 5.3 freight 特有
8. 新建 disclaimer 页覆盖：估算非承诺 / 第三方承运人责任边界 / **报价时效**。
9. privacy 页补充 formsubmit.co 作为数据处理器（processor）的明确披露 + 跨境传输说明。
10. 阿语版补齐 legal 页或页脚链回英文版。

---

*本报告为只读评估，未修改任何被审文件。*
