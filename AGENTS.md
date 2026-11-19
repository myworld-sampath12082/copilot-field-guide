# Repository guidance

## Project

Copilot Field Guide is a local interactive course based on a Copilot project
setup presentation. Its React/TypeScript frontend teaches project guidance
files and Copilot workflow; a Java 21/Spring Boot API and PostgreSQL database
support the retained practice task tracker.

## Working rules

- Keep changes focused on the requested feature and preserve the existing stack.
- Keep API calls in `frontend/src/api/`; pages should use the typed API client.
- Keep backend responsibilities separated between controller, service, and
  repository classes under `backend/src/main/java/com/example/training/tasks/`.
- Validate request data at the API boundary and return explicit errors; do not
  hide failures behind mock data or silent fallbacks.
- Keep sample lesson initialization idempotent. Do not overwrite learner edits
  or add sample rows when tasks already exist.
- Do not commit credentials. Local Compose and the backend datasource obtain
  their PostgreSQL password from an ignored `.env` file and environment
  variable; `.env.example` contains only a placeholder.
- Update the relevant tests and documentation when behavior or run instructions
  change.

## Verify changes

Run the smallest relevant checks:

- Frontend tests: `npm --prefix frontend test`
- Frontend production build: `npm --prefix frontend run build`
- Backend tests: from `backend/`, run `.\mvnw.cmd test` on Windows
- Browser end-to-end tests: `npm --prefix frontend run test:e2e` while the
  database, API, and frontend are running

See [README.md](./README.md) for local startup instructions and the other
Copilot guidance examples.
