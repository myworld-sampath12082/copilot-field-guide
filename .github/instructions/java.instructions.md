---
applyTo: "backend/src/main/java/**/*.java"
---

# Java and Spring Boot guidance

- Keep HTTP mapping and status codes in `TrainingTaskController`.
- Put business rules and transaction boundaries in `TrainingTaskService`.
- Use `TrainingTaskRepository` for persistence; do not put SQL or persistence
  logic in controllers.
- Use DTO records for request and response payloads instead of exposing JPA
  entities directly.
- Validate user input at the request boundary and preserve the API's
  `422 Unprocessable Entity` validation response.
- When changing persisted collections, preserve Hibernate-managed mutable
  collection semantics.
- Add or update focused JUnit tests for changed service or endpoint behavior.
