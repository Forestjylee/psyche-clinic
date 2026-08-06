# 暖心小诊室 · Cozy Clinic

> 你不必是心理学家，也能成为某个人暗夜里的那束光。

一款「让普通人也能体验到倾听与陪伴价值」的心理医生模拟器。通过对话诊疗影响患者结局，在经营诊所的过程中，养成医者之心。

## 文档导航

所有项目文档存放于 [`docs/`](./docs) 目录，长期迭代基线：

| 文档 | 内容 |
| --- | --- |
| [docs/PRD.md](./docs/PRD.md) | 产品需求文档：定位、玩法、功能、设计原则 |
| [docs/SPEC.md](./docs/SPEC.md) | 技术规格：技术栈、目录、数据模型、引擎契约 |
| [docs/PLAN.md](./docs/PLAN.md) | 迭代计划：里程碑、任务分解、完成记录 |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Cloudflare Pages 部署指南（前端 + 后端 + 数据库） |

## 快速开始

```bash
npm install
npm run dev          # 开发，访问 http://localhost:3000
npm run build        # 构建静态产物到 out/
npm run typecheck    # 类型检查
```

## 项目结构

```
psyche-clinic-next/
├── app/              # Next.js 入口
├── components/game/  # 游戏表现层（17 个组件）
├── lib/              # 业务逻辑层
│   ├── audio/        # 音频封装
│   ├── data/         # 静态内容数据
│   ├── engine/       # 纯逻辑引擎（对话/成就）
│   ├── hooks/        # React 状态 Provider
│   ├── state/        # 持久化抽象
│   ├── utils/        # 工具函数
│   └── types.ts      # 全局类型契约
├── public/           # 静态资源
└── docs/             # 项目文档
```

详细架构见 [docs/SPEC.md](./docs/SPEC.md)。

## 部署

公测阶段采用静态导出 + Cloudflare Pages。完整步骤见 [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)。

## 免责声明

本作是一款以「倾听与陪伴」为主题的互动叙事游戏，**不构成**任何临床诊断、治疗建议或药物指导。如你或身边的人正经历心理困扰，请寻求专业心理咨询师或医疗机构的帮助。

## 版本

当前：v0.2.0（公测候选版） · 详见 [docs/PLAN.md](./docs/PLAN.md)
