# 心灵诊疗室 · Cloudflare Pages 部署指南

| 字段 | 内容 |
| --- | --- |
| 文档版本 | v0.2.0 |
| 最后更新 | 2026-08-06 |
| 适用版本 | v1.0（前端静态导出）/ v1.1（全栈 Functions + D1 + KV） |
| 配套文档 | [PRD.md](./PRD.md) · [SPEC.md](./SPEC.md) · [PLAN.md](./PLAN.md) |

本指南分三阶段：
- **阶段一**：前端静态部署（v1.0 公测，无需后端与数据库）
- **阶段二**：后端 Pages Functions 接入（v1.1 云同步）
- **阶段三**：数据库 D1 + 缓存 KV 配置（v1.1 云同步）

> 公测阶段只需完成「阶段一」即可上线。阶段二、三为云存档功能预留。

---

## 阶段一：前端静态部署（v1.0 公测）

### 1.1 前置准备

| 项 | 要求 |
| --- | --- |
| Cloudflare 账号 | 注册 https://dash.cloudflare.com/sign-up（免费） |
| Git 仓库 | 项目已推送 GitHub（见 [PLAN.md](./PLAN.md)） |
| Node.js | 本地 ≥ 18.17（与 Next 14 一致） |
| 包管理器 | npm（项目默认） |

### 1.2 启用 Next.js 静态导出

编辑 [next.config.mjs](../next.config.mjs)：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静态导出：产出 out/ 目录，可托管到任意静态 CDN
  output: "export",
  // 本作不使用 next/image 的优化服务，避免静态导出冲突
  images: {
    unoptimized: true,
  },
  // 静态导出时关闭 trailing slash 重写问题
  trailingSlash: true,
};

export default nextConfig;
```

> 注意：`output: "export"` 不支持 `rewrites`/`redirects`/`headers` 中的动态规则；本作为单页应用，无此依赖。

### 1.3 本地验证静态产物

```bash
cd psyche-clinic-next
npm install
npm run build          # 产出 out/ 目录
npx serve out          # 本地预览，访问 http://localhost:3000
```

确认：标题屏正常、接诊流程跑通、成就特效正常、存档可读写。

### 1.4 方式 A：通过 Cloudflare Dashboard 部署（推荐新手）

1. 登录 Cloudflare Dashboard → 左侧 **Workers & Pages** → **创建应用程序** → **Pages** → **上传资产** 或 **连接到 Git**。

2. **连接到 Git**（推荐，自动 CI/CD）：
   - 选择 GitHub，授权 Cloudflare 访问对应仓库。
   - 选中 `psyche-clinic-next` 仓库。
   - 构建配置：
     | 字段 | 值 |
     | --- | --- |
     | 生产分支 | `main` |
     | 框架预设 | Next.js |
     | 构建命令 | `npm run build` |
     | 构建输出目录 | `out` |
     | 根目录 | `/`（仓库根即项目根） |
   - 环境变量（Settings → Environment variables）：
     | 变量 | 值 | 用途 |
     | --- | --- | --- |
     | `NODE_VERSION` | `20` | Cloudflare 默认 18，建议升至 20 |
   - **保存并部署**。

3. **上传资产**（无 Git 自动化需求时）：
   - 本地执行 `npm run build` 产出 `out/`。
   - Dashboard 选择「直接上传资产」→ 拖拽 `out/` 目录内容（注意是目录内容，非目录本身）。
   - 命名项目（如 `psyche-clinic`）→ 部署。

### 1.5 方式 B：通过 Wrangler CLI 部署（推荐进阶）

```bash
# 1. 安装 Wrangler
npm install -D wrangler

# 2. 登录（浏览器授权）
npx wrangler login

# 3. 构建静态产物
npm run build

# 4. 部署到 Pages
npx wrangler pages deploy out --project-name=psyche-clinic
```

首次部署会询问「是否创建新项目」，选择是。部署成功后返回形如：
```
https://<commit-hash>.psyche-clinic.pages.dev
https://psyche-clinic.pages.dev      # 生产域名
```

### 1.6 绑定自定义域名（可选）

1. Cloudflare Dashboard → Pages → `psyche-clinic` 项目 → **自定义域** → **设置自定义域**。
2. 输入你的域名（如 `play.psyche-clinic.com`）。
3. 按提示添加 CNAME 记录指向 `<project>.pages.dev`。
4. 等待 DNS 生效（通常几分钟），Cloudflare 自动签发 SSL。

### 1.7 构建与部署验证清单

- [ ] 访问 `https://<project>.pages.dev` 看到标题屏
- [ ] 副文案「你不必是心理学家，也能成为某个人暗夜里的那束光」可见
- [ ] 接诊流程可完整跑通（林晓剧本）
- [ ] 触发成就解锁，全屏特效正常（含粒子、光晕、传说金环）
- [ ] 关闭浏览器重开，存档可恢复
- [ ] 移动端 Safari/Chrome 访问布局正常
- [ ] 浏览器控制台无红色错误

### 1.8 常见问题

| 问题 | 原因 | 解决 |
| --- | --- | --- |
| 部署后白屏 | `output: "export"` 未启用或输出目录填错 | 确认 `next.config.mjs` 配置；输出目录填 `out` |
| 路由 404 | 单页应用刷新子路径 404 | 本作为单一入口 `/`，无子路由；如未来加路由需配置 `_redirects` |
| 字体不加载 | Next Font 与静态导出冲突 | 本作使用系统字体 + Noto Serif SC（CDN），无此问题 |
| 图片 404 | `public/images` 路径引用错误 | 确认引用为 `/images/xxx.jpg`（绝对路径） |
| localStorage 被隔离 | 第三方 iframe 上下文 | Pages 自定义域非 iframe，无此问题 |
| 构建时 Node 版本不符 | Cloudflare 默认 Node 18 | 设置环境变量 `NODE_VERSION=20` |

---

## 阶段二：后端 Pages Functions 配置（v1.1 云同步）

当需要云存档功能时启用。Pages Functions 是 Cloudflare 在边缘运行的 Serverless，与前端同源部署，无需独立后端服务器。

### 2.1 目录结构

在项目根新增 `functions/` 目录，文件路径即 API 路径：

```
psyche-clinic-next/
└── functions/
    └── api/
        ├── _middleware.ts        # 全局中间件：鉴权、限流、CORS
        ├── save/
        │   └── index.ts          # GET/PUT /api/save
        ├── achievements/
        │   └── index.ts          # GET/PUT /api/achievements
        └── user/
            └── index.ts          # POST /api/user（创建匿名用户）
```

> 部署时 Pages 会自动检测 `functions/` 目录，将其编译为边缘函数，路径前缀自动加 `/api`。

### 2.2 创建首个 Function

`functions/api/save/index.ts`：

```typescript
interface Env {
  DB: D1Database;      // 阶段三绑定
  KV: KVNamespace;     // 阶段三绑定
  ALLOWED_ORIGIN: string;
}

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const userId = ctx.request.headers.get("X-User-Id");
  if (!userId) return json({ error: "missing user id" }, 401);

  // 优先读 KV 缓存
  const cached = await ctx.env.KV.get(`save:${userId}`);
  if (cached) return json({ state: JSON.parse(cached), source: "kv" });

  // 回源 D1
  const row = await ctx.env.DB
    .prepare("SELECT game_state, updated_at FROM saves WHERE user_id = ?")
    .bind(userId)
    .first();
  if (!row) return json({ state: null });

  // 回写 KV（TTL 1 小时）
  await ctx.env.KV.put(`save:${userId}`, String(row.game_state), { expirationTtl: 3600 });
  return json({ state: JSON.parse(row.game_state as string), updated_at: row.updated_at });
};

export const onRequestPut: PagesFunction<Env> = async (ctx) => {
  const userId = ctx.request.headers.get("X-User-Id");
  if (!userId) return json({ error: "missing user id" }, 401);

  const body = await ctx.request.json();
  const now = Date.now();
  const stateJson = JSON.stringify(body.state);

  // 写 D1（upsert）
  await ctx.env.DB
    .prepare(
      `INSERT INTO saves (user_id, game_state, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET game_state = excluded.game_state, updated_at = excluded.updated_at`
    )
    .bind(userId, stateJson, now)
    .run();

  // 写 KV 缓存
  await ctx.env.KV.put(`save:${userId}`, stateJson, { expirationTtl: 3600 });

  return json({ ok: true, updated_at: now });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
```

### 2.3 全局中间件

`functions/api/_middleware.ts`：

```typescript
interface Env {
  DB: D1Database;
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  // CORS
  const origin = "https://psyche-clinic.pages.dev"; // 替换为你的域名
  ctx.data.corsOrigin = origin;

  // 简单限流：按 IP 每分钟 60 次
  const ip = ctx.request.headers.get("CF-Connecting-IP") ?? "unknown";
  const key = `rate:${ip}`;
  const count = parseInt((await ctx.env.KV.get(key)) ?? "0");
  if (count > 60) {
    return new Response(JSON.stringify({ error: "rate limited" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }
  await ctx.env.KV.put(key, String(count + 1), { expirationTtl: 60 });

  // 透传到下一个 handler
  return ctx.next();
};
```

### 2.4 本地开发调试

在项目根创建 `wrangler.toml`（仅本地开发用，Pages 部署不读取此文件）：

```toml
name = "psyche-clinic"
compatibility_date = "2026-08-06"

[[d1_databases]]
binding = "DB"
database_name = "psyche-clinic-db"
database_id = "<在阶段三创建后填入>"

[[kv_namespaces]]
binding = "KV"
id = "<在阶段三创建后填入>"
```

本地启动（带 Functions 与 D1/KV 本地模拟）：

```bash
npx wrangler pages dev out --local --persist-to=.wrangler
# 访问 http://localhost:8788
```

> `pages dev` 会自动加载 `functions/`、本地模拟 D1/KV，数据持久化到 `.wrangler/`。

### 2.5 Functions 部署

Functions 与前端一起部署，无需单独操作：

- **Git 连接部署**：推送代码到 `main`，Cloudflare 自动构建并部署 `functions/`。
- **Wrangler 部署**：`npx wrangler pages deploy out --project-name=psyche-clinic`。

部署后在 Dashboard → Pages → 项目 → **Functions** 标签可看到所有路由。

### 2.6 Functions 验证清单

- [ ] `curl https://<project>.pages.dev/api/save -H "X-User-Id: test"` 返回 `{state: null}`
- [ ] `curl -X PUT .../api/save -H "X-User-Id: test" -d '{"state":{"doctor":{"reputation":10}}}'` 返回 `{ok:true}`
- [ ] 再次 GET 返回刚写入的数据
- [ ] 无 `X-User-Id` 头返回 401
- [ ] 1 分钟内超过 60 次请求返回 429

---

## 阶段三：数据库 D1 + 缓存 KV 配置（v1.1 云同步）

### 3.1 创建 Cloudflare D1 数据库

**方式 A：Dashboard**
1. Cloudflare Dashboard → **Workers & Pages** → **D1** → **创建数据库**。
2. 数据库名：`psyche-clinic-db`。
3. 创建后记录 `database_id`（后续绑定用）。

**方式 B：Wrangler CLI（推荐）**
```bash
npx wrangler d1 create psyche-clinic-db
# 输出形如：
# [[d1_databases]]
# binding = "DB"
# database_name = "psyche-clinic-db"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

将输出的 `database_id` 填入 `wrangler.toml`（本地开发）与 Pages 项目设置（生产）。

### 3.2 创建 KV 命名空间

**方式 A：Dashboard**
1. Dashboard → **Workers & Pages** → **KV** → **创建命名空间**。
2. 名称：`psyche-clinic-kv`。

**方式 B：Wrangler CLI**
```bash
npx wrangler kv namespace create psyche-clinic-kv
# 输出 binding 与 id，填入配置
```

### 3.3 初始化数据库 Schema

创建 `schema.sql`（项目根）：

```sql
-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,           -- 匿名 ID（UUID v4）
  email TEXT,                    -- 可选，注册后填入
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL
);

-- 游戏存档
CREATE TABLE IF NOT EXISTS saves (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  game_state TEXT NOT NULL,      -- JSON
  updated_at INTEGER NOT NULL
);

-- 成就进度
CREATE TABLE IF NOT EXISTS achievements (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  unlocked INTEGER NOT NULL DEFAULT 0,
  unlocked_day INTEGER NOT NULL DEFAULT 0,
  unlocked_at INTEGER,
  PRIMARY KEY (user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);
```

**本地执行**（写入本地模拟数据库 `.wrangler/`）：

```bash
npx wrangler d1 execute psyche-clinic-db --local --file=schema.sql
```

**远程执行**（写入生产 D1）：

```bash
npx wrangler d1 execute psyche-clinic-db --remote --file=schema.sql
```

**Dashboard 执行**：D1 → 选中数据库 → **查询** → 粘贴 SQL → 运行。

### 3.4 将 D1 / KV 绑定到 Pages 项目

**Dashboard**：
1. Pages → `psyche-clinic` 项目 → **设置** → **Functions** → **D1 数据库绑定** → **添加绑定**。
   - 变量名：`DB`（与代码中 `ctx.env.DB` 一致）
   - 数据库：`psyche-clinic-db`
2. 同路径 → **KV 命名空间绑定** → **添加绑定**。
   - 变量名：`KV`
   - 命名空间：`psyche-clinic-kv`
3. 环境变量：
   - `ALLOWED_ORIGIN = https://你的域名`

**Wrangler**（`wrangler.toml` 已配置）：
本地开发自动生效；生产部署时 Dashboard 绑定优先。

### 3.5 客户端切换到云存储

在客户端入口（如 `lib/state/Storage.ts` 的初始化处）条件注入：

```typescript
import { LocalStorageDriver, setGlobalDriver, type StorageDriver } from "./Storage";

// 远程 Driver 封装（v1.1 实现）
class RemoteDriver implements StorageDriver {
  constructor(private baseUrl: string, private userId: string) {}

  async get<T>(key: string): Promise<T | null> {
    const res = await fetch(`${this.baseUrl}/api/save`, {
      headers: { "X-User-Id": this.userId },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.state as T | null;
  }
  // ... set/getMany/has/remove 类似
}

// 初始化：登录态用 RemoteDriver，否则降级本地
export async function initStorage() {
  const userId = localStorage.getItem("ps.uid");
  if (userId) {
    setGlobalDriver(new RemoteDriver(window.location.origin, userId));
  } else {
    setGlobalDriver(new LocalStorageDriver());
  }
}
```

> 兼容策略：`RemoteDriver` 失败时自动 fallback 到 `LocalStorageDriver`，保证断网可玩。

### 3.6 数据库运维

| 操作 | 命令 |
| --- | --- |
| 查看所有表 | `npx wrangler d1 execute psyche-clinic-db --remote --command="SELECT name FROM sqlite_master WHERE type='table'"` |
| 查询用户数 | `npx wrangler d1 execute psyche-clinic-db --remote --command="SELECT COUNT(*) FROM users"` |
| 备份导出 | `npx wrangler d1 export psyche-clinic-db --remote --output=backup.sql` |
| 执行迁移 | `npx wrangler d1 execute psyche-clinic-db --remote --file=migrations/001_add_xxx.sql` |

### 3.7 数据库验证清单

- [ ] `SELECT COUNT(*) FROM users` 返回 0（初始状态）
- [ ] 通过 API 创建用户后，表中有记录
- [ ] PUT `/api/save` 后 `SELECT * FROM saves` 有对应行
- [ ] KV 中 `save:<userId>` 键存在（缓存命中）
- [ ] 删除用户后 `saves`/`achievements` 级联删除（外键生效）

---

## 附录 A：完整部署流水线（CI/CD）

GitHub 推送 → Cloudflare 自动构建 → 部署预览 → 合并到 main → 生产部署。

```
开发者 push 到 feat/* 分支
        │
        ▼
Cloudflare Pages 自动构建
        │
        ▼
生成预览域名 <hash>.psyche-clinic.pages.dev
        │
        ▼
PR 审查 + 预览验证
        │
        ▼
合并到 main
        │
        ▼
自动部署到生产 psyche-clinic.pages.dev
        │
        ▼
（v1.1）Functions 绑定的 D1/KV 生效
```

### 环境变量分级
| 变量 | Production | Preview |
| --- | --- | --- |
| `NODE_VERSION` | 20 | 20 |
| `ALLOWED_ORIGIN` | `https://你的正式域名` | `https://preview.psyche-clinic.pages.dev` |
| D1 绑定 | `DB` → 生产库 | `DB` → 测试库（建议另建 `psyche-clinic-db-test`） |
| KV 绑定 | `KV` → 生产 | `KV` → 测试 |

---

## 附录 B：免费额度与成本

| 资源 | 免费额度 | 本作预估用量 |
| --- | --- | --- |
| Pages 构建 | 500 次/月 | < 100 次 |
| Pages 请求 | 100 万次/月 | 公测期 < 10 万 |
| Functions 调用 | 10 万次/天 | < 1 万 |
| D1 行读 | 500 万/天 | < 5 万 |
| D1 行写 | 10 万/天 | < 1 万 |
| D1 存储 | 5 GB | < 100 MB |
| KV 读 | 10 万/天 | < 5 万 |
| KV 写 | 1000/天 | < 500 |

> 公测阶段（v1.0 纯静态）完全免费。v1.1 开启云同步后仍远低于免费额度。

---

## 附录 C：回滚与应急

| 场景 | 操作 |
| --- | --- |
| 新版本线上故障 | Dashboard → Pages → 项目 → **部署** → 选中上一稳定版本 → **回滚到此部署** |
| 数据库误操作 | `npx wrangler d1 execute psyche-clinic-db --remote --file=backup.sql` 恢复 |
| KV 缓存脏数据 | Dashboard → KV → 选中 `save:<userId>` → 删除，下次回源 D1 |
| 全站下线 | Pages 项目可临时「禁用」；自定义域 DNS 可紧急切到静态兜底页 |

---

## 附录 D：变更记录

| 版本 | 日期 | 变更摘要 |
| --- | --- | --- |
| v0.2.0 | 2026-08-06 | 初版部署指南：阶段一前端静态部署、阶段二 Functions、阶段三 D1+KV，含验证清单与运维附录 |
