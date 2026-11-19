---
applyTo: "frontend/src/**/*.ts"
---

# TypeScript guidance

- Keep API request and response shapes in `frontend/src/api/tasks.ts`.
- Use the `TaskStatus`, `TaskInput`, `TaskSummary`, and `TaskDetail` types
  rather than duplicating string or object shapes.
- Prefer explicit guards and useful error messages over unchecked casts or
  success-shaped fallbacks.
- Keep topic and status values aligned with the backend enums and seeded
  lessons.
