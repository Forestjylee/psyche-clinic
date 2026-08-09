// ============================================================
// 患者剧本聚合入口（动态收集）
// ============================================================
// 由 scripts/scan-patients.mjs 生成 lib/data/patients/index.generated.ts
// （显式模块映射），新增剧本放进 lib/data/patients/ 即自动进池，无需改动本文件——
// 运行 `npm run dev` / `npm test` / `npm run build`（predev / pretest / prebuild 钩子）
// 会自动重新生成索引。目录约定：lib/data/patients/ 只放患者剧本文件。
//
// 不用 import.meta.glob：那是 Vite 特性，Next.js（webpack）运行时没有，
// 会抛 `{}.glob is not a function`。生成式显式映射在 webpack 与 vitest 双端可用。
import type { PatientScenario } from "../types";
import { collected } from "./patients/index.generated";
import { patientA } from "./patients/lin_xiao";
import { GUIDED_PATIENT_ID } from "./patients/xiao_bei";

// 兼容既有命名导出（lin-xiao-walk.test.ts 引用 patientA）
export { patientA, GUIDED_PATIENT_ID };

// 稳定排序：引导患者（小北）置顶，其余按 id 字母序 —— 保证「引导患者在 allPatients 首位」断言成立
export const allPatients: PatientScenario[] = collected.sort((a, b) => {
  if (a.id === GUIDED_PATIENT_ID) return -1;
  if (b.id === GUIDED_PATIENT_ID) return 1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
});
