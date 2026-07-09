# AI百宝箱 AiBox

> 收录优质 AI 工具与产品，按场景分类检索，发现最好用的 AI 写作、图像、视频、编程、设计、办公工具。
>
> A curated collection of high-quality AI tools and products, categorized by use case to help you discover the best AI tools for writing, image, video, coding, design, and productivity.

---

## 简体中文 / English

- [简体中文](#简体中文)
- [English](#english)

---

## 简体中文

### 简介

AI百宝箱（AiBox）是一个前后端分离的 AI 工具导航站。前端基于 React + TypeScript + Vite 构建，后端使用 Express + TypeScript 提供 RESTful API。采用 Monorepo 单仓库管理，前后端共享 TypeScript 类型定义。

### 项目结构

```
aibox/
├── frontend/          # 前端 React + Vite 应用
│   ├── src/
│   │   ├── api/       # API 请求层
│   │   ├── components/# 通用组件
│   │   ├── hooks/     # 自定义 Hook
│   │   ├── lib/       # 工具函数
│   │   ├── pages/     # 页面组件
│   │   ├── store/     # Zustand 状态管理
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/           # 后端 Express API 服务
│   ├── src/
│   │   ├── routes/    # API 路由
│   │   ├── data/      # 数据层
│   │   ├── app.ts     # Express 应用
│   │   └── index.ts   # 服务入口
│   ├── Dockerfile
│   └── package.json
├── shared/            # 前后端共享类型定义
│   ├── types.ts
│   └── package.json
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json       # Monorepo 根配置
```

### 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | 前端 UI 框架 |
| TypeScript | 前后端类型安全 |
| Vite 6 | 前端构建工具 |
| Tailwind CSS 3 | 原子化 CSS 样式 |
| React Router 7 | 客户端路由 |
| Zustand | 状态管理 |
| Express 4 | 后端 API 框架 |
| pnpm workspace | Monorepo 包管理 |

### 快速开始

#### 环境要求

- Node.js >= 20
- pnpm

#### 安装与运行

```bash
# 安装所有依赖
pnpm install

# 同时启动前后端开发服务器
pnpm dev

# 或分别启动
pnpm dev:frontend   # 前端 http://localhost:5173
pnpm dev:backend    # 后端 http://localhost:3001

# 构建所有包
pnpm build

# 代码检查
pnpm lint
```

#### Docker 部署

```bash
# 构建并启动前后端容器
docker compose up -d

# 前端 http://localhost:8080
# 后端 http://localhost:3001
```

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/health | 健康检查 |
| GET | /api/categories | 获取所有分类 |
| GET | /api/categories/:slug | 按 slug 获取分类 |
| GET | /api/categories/:slug/tools | 获取分类下的工具 |
| GET | /api/tools | 获取工具列表（支持筛选） |
| GET | /api/tools/featured | 获取精选工具 |
| GET | /api/tools/latest | 获取最新工具 |
| GET | /api/tools/search?q= | 搜索工具 |
| GET | /api/tools/:id | 获取工具详情 |
| GET | /api/tools/:id/related | 获取相关工具 |
| GET | /api/news | 获取资讯列表 |
| GET | /api/news/latest | 获取最新资讯 |
| GET | /api/projects | 获取项目列表 |
| GET | /api/projects/latest | 获取最新项目 |

---

## English

### Introduction

AiBox is a full-stack AI tools navigation site with separated frontend and backend. The frontend is built with React + TypeScript + Vite, the backend uses Express + TypeScript providing RESTful APIs. Managed as a Monorepo with shared TypeScript type definitions.

### Project Structure

```
aibox/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── api/       # API client layer
│   │   ├── components/# Shared components
│   │   ├── hooks/     # Custom hooks
│   │   ├── lib/       # Utility functions
│   │   ├── pages/     # Page components
│   │   ├── store/     # Zustand state management
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/           # Express API server
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── data/      # Data layer
│   │   ├── app.ts     # Express app
│   │   └── index.ts   # Server entry
│   ├── Dockerfile
│   └── package.json
├── shared/            # Shared type definitions
│   ├── types.ts
│   └── package.json
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json       # Monorepo root config
```

### Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend UI framework |
| TypeScript | Full-stack type safety |
| Vite 6 | Frontend build tool |
| Tailwind CSS 3 | Utility-first CSS |
| React Router 7 | Client-side routing |
| Zustand | State management |
| Express 4 | Backend API framework |
| pnpm workspace | Monorepo package management |

### Getting Started

#### Prerequisites

- Node.js >= 20
- pnpm

#### Installation & Development

```bash
# Install all dependencies
pnpm install

# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:frontend   # Frontend http://localhost:5173
pnpm dev:backend    # Backend http://localhost:3001

# Build all packages
pnpm build

# Lint
pnpm lint
```

#### Docker Deployment

```bash
# Build and start all containers
docker compose up -d

# Frontend http://localhost:8080
# Backend http://localhost:3001
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/categories | Get all categories |
| GET | /api/categories/:slug | Get category by slug |
| GET | /api/categories/:slug/tools | Get tools in category |
| GET | /api/tools | Get tools (with filters) |
| GET | /api/tools/featured | Get featured tools |
| GET | /api/tools/latest | Get latest tools |
| GET | /api/tools/search?q= | Search tools |
| GET | /api/tools/:id | Get tool by id |
| GET | /api/tools/:id/related | Get related tools |
| GET | /api/news | Get news list |
| GET | /api/news/latest | Get latest news |
| GET | /api/projects | Get projects list |
| GET | /api/projects/latest | Get latest projects |
