import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    // 环境默认的 threads/forks 池在本项目环境会触发 vitest 4.1 的 worker 状态 bug
    // （runner.config 未注入 → collection 报 undefined.config），改用 vmThreads 池
    // （测试模块在 VM 上下文内求值）规避。typecheck 不受影响。
    pool: "vmThreads",
  },
});
