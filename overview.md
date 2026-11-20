# Application overview

Copilot Field Guide is a local interactive learning companion based on a
17-slide presentation about Copilot app workflow and project setup. The
course presents scoped explanations, official documentation links, applied
prompts, expected outcomes, validation steps, diagrams, and slide references.
The `/lab` page provides a progressive local Java/Spring Boot coding lab and
explicitly identifies topics that require client-specific or out-of-scope
guidance. A separate practice tracker retains the original task, checklist,
notes, and status features.

## Architecture

```text
Browser
  React + TypeScript (frontend/src)
    Learning content and quiz progress (local browser storage)
    Practice tracker
       |
       | /api requests through the Vite development proxy
       v
  Spring Boot REST API (backend/src/main/java/com/example/training)
       |
       | Spring Data JPA
       v
  PostgreSQL (Docker Compose)
```

The frontend is served at `http://localhost:5173`. Its Vite proxy sends `/api`
requests to the backend at `http://localhost:8081`. The backend connects to
PostgreSQL on host port `5433`; Compose maps that to the container's port `5432`
to avoid colliding with an existing local PostgreSQL service.

## Main areas

- `frontend/src/data/course.ts` contains the lesson text, practice checks, and
  slide references derived from the presentation.
- `frontend/src/data/lesson-exercises.ts` adds client scope, current references,
  and reproducible prompts/validation to each lesson.
- `frontend/src/data/lab.ts` defines progressive coding exercises, coverage
  status, validation commands, and the capstone rubric.
- `frontend/src/pages/CourseHomePage.tsx` presents the learning path and saves
  course-check progress in the current browser.
- `frontend/src/pages/LessonPage.tsx` displays explanations, scenarios,
  exercises, official references, practice checks, and related slides.
- `frontend/src/pages/DeveloperLabPage.tsx` presents hands-on assessments,
  governance guidance, and the explicit course scope map.
- `frontend/src/components/CourseVisual.tsx` renders text-based diagrams and
  selected screenshots from the presentation.
- `frontend/src/pages/SlideIndexPage.tsx` indexes all 17 source slides and
  links them to related lessons.
- `frontend/src/pages/BoardPage.tsx`, `TaskDetailPage.tsx`, and
  `TaskFormPage.tsx` retain the practice tracker at `/practice`.
- `frontend/src/api/tasks.ts` defines the typed API client and task data shapes.
- `backend/src/main/java/com/example/training/tasks/` implements REST endpoints,
  validation, service logic, JPA persistence, and sample task initialization.
- `frontend/e2e/` verifies course and tracker workflows in Chrome with
  Playwright.

## API routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tasks?topic=&status=` | List and filter tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/{id}` | Read lesson details |
| `PUT` | `/api/tasks/{id}` | Update lesson content and notes |
| `PATCH` | `/api/tasks/{id}/status` | Update task status |
| `PATCH` | `/api/tasks/{id}/steps/{index}` | Save checklist completion |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

## Sample data

On an empty database, the backend initializes six practice tasks covering
`AGENTS.md`, `README.md`, `.github/copilot-instructions.md`,
`.github/instructions/`, `overview.md`, and skills. Initialization does not
replace existing tasks.

## Tests

- Backend: `cd backend` then `.\mvnw.cmd test`
- Frontend: `npm --prefix frontend test` and
  `npm --prefix frontend run build`
- End-to-end: `npm --prefix frontend run test:e2e` with all services running
