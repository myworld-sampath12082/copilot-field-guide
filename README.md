# Copilot Field Guide

A local React + TypeScript learning companion, Spring Boot API, and PostgreSQL task tracker. The guided course follows the 17-slide Copilot Project Setup Files presentation, covering project guidance files and the Copilot workflow.

## Learning experience

- The home page presents a sequenced course on setup files and Copilot workflow.
- Each lesson includes a plain-language explanation, an illustrative worked scenario, a visual, a practice check, and related slide references.
- Lesson-check progress is saved in the current browser.
- The original task board remains available at **Practice tracker** for creating tasks, checking off steps, saving notes, and tracking status.
- Workflow screenshots are reused from the supplied presentation. Account values and feature availability shown in screenshots are examples, not fixed limits or guarantees.
- Production builds are course-only: the task tracker and its unauthenticated write API remain available only in local development.

## Free static deployment

The React learning course can be hosted on the Cloudflare Pages Free plan without deploying the Java API or PostgreSQL database. The production build omits the practice tracker because it requires the local API, whose task write endpoints are not authenticated.

In Cloudflare Pages, connect the repository and set:

- Root directory: `frontend`
- Build command: `npm ci && npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Plan: Free; use the provided `*.pages.dev` address rather than purchasing a custom domain

Before publishing, run `npm --prefix frontend test`, `npm --prefix frontend run build`, and the Playwright checks. Verify that lesson routes work on direct navigation and that the deployed site does not send requests to `/api`. Cloudflare free-plan quotas and terms can change; avoid enabling paid Workers or other billable services if maintaining a $0 deployment is required.

## Copilot guidance examples

This repository includes working examples of several setup-file topics:

- [AGENTS.md](./AGENTS.md) — agent guidance whose scope depends on repository location and feature support
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) —
  Copilot-specific repository context
- [.github/instructions/](./.github/instructions/) — Java, React, and
  TypeScript file-pattern instructions
- [overview.md](./overview.md) — architecture and API map
- [.github/skills/authoring-guidance-files/SKILL.md](./.github/skills/authoring-guidance-files/SKILL.md) —
  a reusable workflow for creating guidance files

## Prerequisites

- Java 21
- Node.js 24+ and npm
- Docker with Docker Compose

## Start locally

1. Start PostgreSQL:

   ```powershell
   Copy-Item .env.example .env
   # Edit .env and replace the placeholder with a local-only password.
   docker compose up -d postgres
   ```

   PostgreSQL is exposed on host port `5433` to avoid conflicting with a local
   PostgreSQL service on the default port. The `.env` file is local and ignored
   by Git; do not commit it. Existing database volumes retain the password they
   were initialized with. On its first run, the backend adds six sample learning
   tasks covering the guidance-file topics. Existing tasks are preserved on
   later starts.

2. Start the backend in one terminal:

   ```powershell
   cd backend
   $env:SPRING_DATASOURCE_PASSWORD = "same-local-password-as-.env"
   $env:SERVER_PORT = "8081"
   .\mvnw.cmd spring-boot:run
   ```

   macOS/Linux:

   ```sh
   cd backend
   SPRING_DATASOURCE_PASSWORD="same-local-password-as-.env" \
   SERVER_PORT=8081 ./mvnw spring-boot:run
   ```

   API: `http://localhost:8081`

3. Start the frontend in another terminal:

   ```powershell
   npm --prefix frontend install
   npm --prefix frontend run dev
   ```

   Web app: use the Vite URL printed in the terminal (normally `http://localhost:5173`).

## Run tests

Backend:

```powershell
cd backend
.\mvnw.cmd test
```

Frontend:

```powershell
npm --prefix frontend install
npm --prefix frontend test
npm --prefix frontend run build
```

End-to-end tests (requires PostgreSQL, backend, and frontend to be running):

```powershell
npm --prefix frontend run test:e2e
```

Playwright uses the installed Google Chrome browser. Set `PLAYWRIGHT_BASE_URL`
to test a different frontend URL.

## Structure

- `frontend/src/data/course.ts` — course lessons and source-slide references
- `frontend/src/pages/` — learning path, lessons, slide index, task board, and task forms
- `frontend/src/components/CourseVisual.tsx` — accessible course diagrams and presentation screenshots
- `frontend/src/api/tasks.ts` — typed REST API client
- `backend/src/main/java/com/example/training/tasks/` — controller, service, repository, and entity
- `backend/src/test/java/` — focused service and REST tests
- `docker-compose.yml` — local PostgreSQL service
