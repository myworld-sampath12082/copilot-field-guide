---
name: authoring-guidance-files
description: Create or improve repository guidance files for coding agents. Use when asked to add AGENTS.md, Copilot instructions, file-scoped instructions, an architecture overview, or a reusable skill.
---

# Authoring repository guidance files

Use this workflow when a repository needs clear, maintainable guidance for
coding agents.

## Workflow

1. Inspect the repository structure, build files, tests, and existing guidance.
2. Identify the intended audience and scope:
   - Shared agent behavior belongs in `AGENTS.md`.
   - Copilot-specific project context belongs in
     `.github/copilot-instructions.md`.
   - Language- or path-specific rules belong in
     `.github/instructions/*.instructions.md` with an `applyTo` frontmatter
     pattern.
   - Architecture and data-flow explanations belong in `overview.md`.
   - Repeatable, task-specific procedures belong in a skill's `SKILL.md`.
3. Keep each file focused on its audience. Link to related files instead of
   copying the same rules into every document.
4. Make instructions actionable and consistent with the code that exists.
   Include exact test and run commands where they help contributors.
5. Check file-scoped patterns against the actual project paths.
6. Review for contradictions, stale commands, unsupported claims, and
   accidentally included secrets.

## Completion checklist

- Each file has one clear purpose and appropriate scope.
- Scoped instructions include a valid frontmatter `applyTo` pattern.
- Skills include a concise description, trigger conditions, and ordered steps.
- Paths, framework names, API routes, and commands match the repository.
- Documentation changes do not replace unrelated project documentation.
