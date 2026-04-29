# 五运六气引擎（可运行版）

## 已包含

- `src/lib/wuyun.ts`：五运六气核心计算（干支、主客运、主客气、同化、当前气步等，含 `analyzeByDate`）
- `src/lib/tizhi.ts`：先天体质分析（主弱脏/次弱脏、生克链、四因素）
- `src/lib/fangji.ts`：六气方/五运方查询接口（示例数据）
- `src/lib/rules.ts`：换年规则配置（大寒/立春/公历新年）
- `src/lib/errors.ts`：输入错误类型（含错误码/字段）
- `src/lib/app-types.ts`：前端可直接使用的报告类型定义
- `src/lib/generator.ts`：一站式生成报告（同步抛错版 + 安全返回版 + `validateInput`）
- `src/lib/format.ts`：报告摘要格式化（供 CLI/UI 复用）
- `src/lib/schema.ts`：`GeneratedReport` 运行时守卫（缓存反序列化校验）
- `src/lib/legacy-app.ts`：兼容旧 `App.tsx` 字段命名的适配层
- `src/index.ts`：统一导出入口（对外 import 更简洁）
- `src/demo.ts`：最小调用示例
- `src/cli.ts`：命令行入口（用于无 UI 快速验证）

## 快速检查

```bash
npm run check
```

## 真正运行（构建 + 执行）

```bash
npm run build
npm run demo
npm run test
```

## CLI 使用

```bash
npm run cli -- --birth 1990-01-01 --predict 2026-04-28 --boundary lichun
npm run cli -- --birth 1990-01-01 --predict 2026-04-28 --boundary dahan --json
```

支持参数：
- `--birth YYYY-MM-DD`
- `--predict YYYY-MM-DD`
- `--gender 男|女`
- `--boundary dahan|lichun|newyear`
- `--json`（输出完整 JSON）
- `--help`（打印帮助）

## 页面接入建议

### 方式 A（推荐）
直接使用新结构：

- `generateReport({ birthDate, predictDate, gender, rules })` -> `GeneratedReport`
- 返回值含 `meta`（engine/version/generatedAt）用于日志追踪
- `rules.boundaryConfig` 可自定义切换日（`dahanDay`/`lichunDay`）

### 方式 B（输入不可信场景）
使用安全返回，避免 try/catch 分支污染页面逻辑：

- `generateReportSafe(input)` -> `{ ok: true, data } | { ok: false, error }`

### 方式 C（兼容旧页面）
旧页面不想大改时：

- `toLegacyResult(generateReport(input))`

## 自动化测试

- `test/generator.test.mjs` + `test/wuyun-reference.test.mjs` + `test/report-fixtures.test.mjs` + `test/meta-version.test.mjs` 覆盖 22 类基础回归：
  - 有效输入返回关键字段（birthYear/currentYear/yearBoundaryUsed）
  - 非法日期通过 `generateReportSafe` 返回结构化错误
  - `dahan/lichun` 口径在 1 月边界日期上的差异
  - legacy 适配层关键字段透传

- 额外参考测试覆盖：`1984=甲子`、`子年司天在泉映射`、`analyzeByDate` 边界口径差异。
- 新增 `test/fixtures/report-cases.json`，以数据驱动方式固定边界口径样例。

## CI

- GitHub Actions: `.github/workflows/ci.yml`
- 每次 push/PR 自动执行：
  - `npm run check`
  - `npm run build`
  - `npm run demo`
  - `npm run test`

## 说明

- 日期校验：
  - 必须 `YYYY-MM-DD`
  - 自动拦截非法日期（如 `2026-02-31`）
  - 预测日期不能早于出生日期
  - 错误对象含 `code` 和 `field`
- 换年规则可配置：
  - `dahan`（默认）：大寒约 1/20 切换
  - `lichun`：立春约 2/4 切换
  - `newyear`：公历 1/1 切换

- 新增 `test/meta-version.test.mjs`，确保 `package.json` 与引擎元信息版本一致。
