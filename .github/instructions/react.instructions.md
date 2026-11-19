---
applyTo: "frontend/src/**/*.tsx"
---

# React page and component guidance

- Use functional React components and hooks, following the patterns in
  `frontend/src/pages/`.
- Keep API access in the typed client at `frontend/src/api/tasks.ts`.
- Show loading and request errors to the user; do not silently substitute
  mock data when the API fails.
- Use semantic headings, buttons, labels, and native checkboxes so the app
  remains keyboard- and screen-reader-friendly.
- Keep checklist and status changes synchronized with the API response.
- Add or update focused component tests for frontend-only behavior and
  Playwright tests for complete user workflows.
