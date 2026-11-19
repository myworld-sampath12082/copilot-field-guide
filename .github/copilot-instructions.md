# Copilot instructions

## Product context

This is an interactive learning companion for a Copilot project setup
presentation. The React course explains repository guidance files and Copilot
workflow; its practice tracker talks to a Spring Boot REST API that persists
tasks and learner progress in PostgreSQL.

## Where to make changes

- `frontend/src/data/course.ts` contains course content and slide references.
- `frontend/src/pages/` contains the learning path, lessons, slide index, task
  board, and task form.
- `frontend/src/components/CourseVisual.tsx` renders course diagrams and
  presentation screenshots.
- `frontend/src/api/tasks.ts` is the typed boundary for `/api` requests.
- `backend/src/main/java/com/example/training/tasks/` contains task DTOs,
  controller, service, repository, entity, and status types.
- `backend/src/test/java/` contains backend service and API tests.
- `frontend/e2e/` contains browser tests for user workflows.

## Implementation conventions

- Reuse `tasksApi` rather than calling `fetch` from page components.
- Keep HTTP and validation behavior in the backend controller/service layer;
  return useful error messages for failed requests.
- Use constructor injection and request/response DTOs in Java.
- Keep task status values as `TO_DO`, `IN_PROGRESS`, and `DONE` in API payloads.
- Preserve checklist completion when editing notes or status. Reset completion
  only when the checklist itself changes.
- Keep database initialization safe for existing user data.

## Verification

Run `npm --prefix frontend test` and `npm --prefix frontend run build` for
frontend changes. Run `.\mvnw.cmd test` from `backend/` for backend changes.
Run `npm --prefix frontend run test:e2e` with the local stack running for
user-facing workflow changes.

## Scope and safety

Do not add external services, authentication, deployment resources, or
production secrets unless requested. Avoid replacing a failing API request with
sample data; surface the error to the user instead.
