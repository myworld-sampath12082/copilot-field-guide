# Site feedback: Copilot Field Guide audit

**Audit date:** November 20, 2026\
**Scope:** Home page, slide reference page, and all 16 lesson routes.

The companion [example-coverage audit](./example-coverage-audit.md) adds a topic inventory, E0–E4 example rubric, module assessments, and proposed acceptance gates from a second review received the same day.

## Remediation tracking

- [x] Keep an explicit scope map, learning outcomes, audience/prerequisites, and honest out-of-scope topics.
- [x] Correct current permission labels, environment terminology, client/surface attribution, and supported-feature references.
- [x] Give every existing lesson a reproducible E2 exercise with a prompt, expected behavior, and validation; add E3 assessments for core engineering workflows.
- [x] Add a progressive Java/Spring Boot lab, test-first bug fix, JUnit/Mockito, SQL review, safe tool/MCP use, and human PR/security review.
- [x] Add dated plan/policy/privacy, dictation, model/usage, instruction/skills, public-code, and responsible-use references.
- [x] Improve conceptual diagrams and interface attribution; distinguish undated source screenshots from current product instructions.
- [x] Add module assessments, an end-to-end capstone, a take-away checklist, and an ongoing content-review date.

### Remediation result

The course now has client-specific surface notes and official references across all 16 lessons, with a prompt, expected outcome, and validation steps for each. The `/lab` path contains progressive code, regression, JUnit/Mockito, SQL, MCP, governance, and review exercises; two module assessments; an end-to-end capstone; an assessment rubric; and a coverage map that names explicit limits.

The environment lesson now distinguishes local work, GitHub-hosted Cloud sandboxes, Actions jobs, user-managed custom environments, and separate remote IDE/tunnel workflows. The privacy checkpoint separately checks model-training settings, public-code matching, repository access, and tool permissions. Its plan-specific wording reflects the policy documentation reviewed for this audit date; learners are directed to verify their own current settings.

**Validation:** frontend unit tests passed (6 tests); production build passed; six Playwright browser checks passed against the deployed URL for navigation, lesson/slide links, all lesson routes, mobile layout, and the absence of `/api` requests from public course pages. A separate production-browser check confirmed `/practice` displays the local-only notice and makes no `/api` requests. The full tracker E2E suite was not run because its local PostgreSQL/API stack was not running.

**Publication:** deployed to Cloudflare Pages Free at [https://copilot-field-guide.pages.dev](https://copilot-field-guide.pages.dev). The public site remains course-only; the Java API and PostgreSQL are not hosted.

## November 20, 2026 re-audit follow-up

The earlier follow-up report is archived in [site-reaudit-nov20-2026.md](./site-reaudit-nov20-2026.md); its score is an earlier 87/100 snapshot. The attached later re-audit rated the current course 91/100 and identified additional opportunities around interface verification, setup friction, and date synchronization. Its attachment remains unchanged.

- [x] Make the regression red/green path a notes-only PUT with the unchanged checklist, a separate status-only PATCH control, and a distinct checklist-change reset case.
- [x] Separate VS Code Chat syntax/documentation from GitHub Copilot app-only references and commands; do not imply shared support for `@participants`.
- [x] Compare the same test-only task with and without explicitly supplied project guidance in two fresh, otherwise consistent chats.
- [x] Keep Java, Node.js, Docker Compose, and the local PostgreSQL/API requirements visible in the lab.

The screenshot feedback also uncovered a related layout issue: `CourseVisual` gave its outer `<figure>` the same `visual-comparison` class as the inner comparison grid, causing the figure heading, cards, and caption to become grid columns at tablet widths. The wrapper now has its own `course-visual` class, and browser coverage asserts the figure stays block-level while the comparison content remains a grid.

**Validation:** frontend unit tests passed (7 tests), production build passed, and four targeted Playwright checks passed both locally and against the deployed URL (navigation, every lesson route, mobile layout, and API-free public pages). A 763 px browser check confirmed the comparison heading, cards, and caption stack without overlap while the inner comparison remains a grid. The full tracker E2E suite was not run because its local PostgreSQL/API stack was not running.

**Publication:** refinements are live at [https://copilot-field-guide.pages.dev](https://copilot-field-guide.pages.dev); the tablet-width layout was checked on the published site.

## November 20, 2026 score-improvement follow-up

The latest 91/100 review's actionable notes are addressed in the course:

- [x] Use the shared `courseReviewDate` on the homepage and synchronize the date in this README with the lesson, slide, and lab indicators.
- [x] Add current VS Code codebase-exploration and Chat-view references, with a precise comparison to the GitHub Copilot app's session modes and tool permissions.
- [x] Update the tool-permissions knowledge check to verify that `Approve all` does not override product or organization policy.
- [x] Add documentation-based current interface paths for VS Code exploration, app tool permissions, and model/Fusion controls while keeping the supplied screenshots labeled as historical.
- [x] Provide a browser-only, read-only API trace for learners who have not prepared the local stack; add exact local prerequisite checks and use `npm ci` for a reproducible frontend install.

The browser-only route is explicitly preparation, not a substitute for code changes or test execution. Product availability still depends on the selected client, plan, and organization policy; the course does not claim to cover every Copilot interface.

**Validation:** frontend unit tests passed (10 tests) and the production build passed. Six targeted Playwright checks passed against the local production preview; four passed against the final stable deployment for navigation, all 16 lesson routes and visual assets, mobile layout, and API-free public course pages. The knowledge-check/progress test also passed against the live URL after an initial transient timeout. The backend-dependent tracker E2E suite was not run because the local PostgreSQL/API stack was not running.

**Publication:** live at [https://copilot-field-guide.pages.dev](https://copilot-field-guide.pages.dev); final deployment preview: [https://a2aead24.copilot-field-guide.pages.dev](https://a2aead24.copilot-field-guide.pages.dev). The newly added client-specific diagrams and browser-only lab path were confirmed on the published site.

All concrete deductions in the 91/100 review have been addressed. The original attachment remains unchanged; only a fresh independent review can confirm a new numeric score, including 100/100.

## Slash-command exercise follow-up

The first guided lab exercise now separates a two-command VS Code workflow (`/explain` on the active method and `/tests` on the selected method) from GitHub Copilot app commands (`/plan` and `/review`). It asks learners to check the installed VS Code command picker, keep the generated test as a proposal, and perform the unrelated inline-suggestion activity on a disposable branch. References point to the VS Code-specific command cheat sheet and the app-only command documentation.

**Validation:** frontend unit tests passed (10 tests); production TypeScript/Vite build passed.

## Audit report

### Audit scope and date

I crawled the home page, the slide reference page, and all **16 of 16 lesson routes**, checking their visible text, captions, alt text, examples, practice questions, and slide links against current GitHub and VS Code documentation.

The site is a focused course on Copilot session workflows and project guidance files. It is **not** a general GitHub Copilot training course. The route review is complete; I visually sampled the linked slide 3 image, but did not OCR every line embedded in all 17 slide images. Those image-only details are noted as a remaining verification limit.

### Executive assessment

The lessons are generally cautious about feature support varying by client, account, settings, and policy. That's a sound approach. The main problems are **out-of-date permission labels**, **environment names that do not match current GitHub documentation**, and **a major gap between the course's file-and-settings explanations and the practical coding work developers need to learn**.

**Score: 57/100**\
**Training readiness:** Ready with changes for a short introduction to the specific topics it covers; not ready as a professional team's full GitHub Copilot training.

| Evaluation area | Score |
| --- | ---: |
| Technical accuracy | 16/20 |
| Currency and version correctness | 8/15 |
| Content completeness | 5/15 |
| Practical developer examples | 5/15 |
| Visual communication | 6/10 |
| Learning structure and clarity | 8/10 |
| Enterprise relevance | 5/10 |
| Presentation consistency | 4/5 |
| **Total** | **57/100** |

### Critical findings

1. **Update the permission labels and screenshot on slide 5 / lesson 3.** The course shows “Manual permissions” and “Allow all.” Current GitHub Copilot app documentation calls the choices **“Ask every time,” “Assisted,” and “Approve all.”** The distinction between session mode and tool permissions is correct, but the displayed names can confuse learners following along. [GitHub: Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
2. **Reconcile the environment terminology on slide 6 / lesson 4.** The course presents “Local machine,” “GitHub Environments,” and “Dev Tunnels.” Current documentation describes cloud sessions, GitHub Actions environments, and custom environments, with availability depending on the client. The course should identify the exact Copilot client and environment feature shown, provide the corresponding setup documentation, and recheck the “Preview” label. [GitHub: Cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) · [GitHub: Custom environments](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-a-custom-environment)
3. **Name the Copilot surface for each workflow and screenshot.** The course moves among app/CLI session modes, VS Code dictation, repository instruction files, and status-panel information. These are not interchangeable interfaces, and some features have different availability across them. Add a clear client label and a support/version note wherever the experience changes.
4. **Add practical code work.** The scenarios explain what a developer might do, but they generally do not provide a complete prompt, relevant repository context, Copilot's output, and concrete validation steps. There is no end-to-end Java/Spring Boot lab covering a feature, bug fix, tests, review, and security checks.
5. **Add an enterprise privacy and governance lesson.** The course discusses permissions and tool access, but not current plan-specific data handling, organization policies, security review, or the risks of supplying sensitive context. Current GitHub policy documentation describes different model-training settings for individual plans and Business/Enterprise customers; that needs careful, dated treatment. [GitHub: Copilot policies and model training](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies) · [GitHub: Responsible use of agents](https://docs.github.com/en/copilot/responsible-use/agents)

### Page-by-page review

All 16 lesson pages share a useful pattern: a plain-language explanation, a caveat, an illustrative scenario, a “what you do / what Copilot may do / what to review” breakdown, a quiz, and source-slide links. The weakness is that these are mostly **understanding checks**, not hands-on exercises.

| Page | Claim checked | Finding and recommended action |
| --- | --- | --- |
| Home `/` | 16-lesson course and 17-slide source deck | The scope is clear, but the title and introduction should say this is a **Copilot app workflow and project setup** course, rather than implying broad Copilot coverage. |
| `/slides` | 17 slide titles and lesson mapping | Useful index. Slides 2 and 17 have no separate lesson, which is reasonable. Add a capture date, client name, and links to the relevant current docs. |
| `/learn/session-modes` | Interactive, Plan, Autopilot | Directionally accurate for the Copilot app and CLI. Clarify which client the screenshot demonstrates. The CLI also supports a plan-to-Autopilot path that can proceed without the same manual plan-approval step implied by the lesson. [Autopilot documentation](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/autopilot) |
| `/learn/agent-selection` | Ask, Agent, custom roles | The read-only Ask versus editing Agent distinction is useful, but should be scoped to the shown client. Add an example prompt and show the resulting change or answer. |
| `/learn/tool-permissions` | Manual approval, Assisted, Allow all | **Needs correction:** labels differ from current app docs. Preserve the correct point that mode and permission settings are separate. Explain the effect and risk of approving tools. |
| `/learn/task-environments` | Local, GitHub Environments, Dev Tunnels | **Needs a current terminology and support review.** Explain which feature and client “GitHub Environments” refers to and link its setup guide. Distinguish cloud sandbox, Actions, and custom environments where applicable. |
| `/learn/models-and-fusion` | Model picker and Fusion effort levels | The core explanation is consistent with current Fusion documentation. Add that Fusion effort options vary by plan and policy, and that Fusion Fast is not a selectable general effort level. Explain the possible cost and latency tradeoff. [Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) |
| `/learn/prompt-attachments` | Files, folders, issues, PRs, sessions | Appropriate caveats about picker variation. Add a concrete prompt and a short reminder to inspect selected context and avoid attaching secrets or unrelated sensitive material. |
| `/learn/dictation` | Desktop/on-device and web/cloud transcription | The processing distinction is supported by current VS Code documentation. Add platform requirements, the experimental label, and the relevant organization controls. [VS Code voice support](https://code.visualstudio.com/docs/configure/accessibility/voice) |
| `/learn/usage-and-status` | Account usage, suggestions, semantic index, session sync | The account-specific warning is good. Identify the client shown and date the screenshot; explain that usage information and plan allowances change. [Monitoring Copilot AI credits](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage) |
| `/learn/why-setup-files` | Guidance helps but does not guarantee correctness | Accurate and well framed. Strengthen the lesson with a short prompt showing how to point Copilot to the relevant guidance and then verify the result. |
| `/learn/readme` | README as human-oriented project context | Accurate. Add a concrete README example and have learners verify the documented commands against the actual build files. |
| `/learn/agents-md` | Nearest applicable `AGENTS.md` and feature support | Generally accurate, with a good nested-file example. Add the caveat that supported filenames and behavior vary by Copilot feature and client. [Custom-instruction support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support) |
| `/learn/copilot-instructions` | Repository-wide `.github/copilot-instructions.md` | The distinction from `AGENTS.md` is useful. Add a support-matrix link and clarify that repository context and feature support determine whether instructions are applied. |
| `/learn/path-specific` | `applyTo` patterns and matching paths | The pattern example is understandable. Include the required `*.instructions.md` filename convention and a current support note. The SQL Server plus AWS SNS/SQS example mixes unrelated stack assumptions; replace it with one coherent project example or label the rules as deliberately illustrative. |
| `/learn/architecture-overview` | Reference document and React → Spring Boot → PostgreSQL example | Correctly says the document must be read and checked against code. The architecture claim is **not independently verifiable from the page alone**; link to the source diagram or repository documentation. |
| `/learn/skills` | `SKILL.md`, frontmatter, optional assets | The basic description is sound, but the location list is incomplete. Current docs list `.github/skills`, `.claude/skills`, and `.agents/skills` for project skills, plus `~/.copilot/skills` and `~/.agents/skills` for personal skills; supported locations depend on the surface. Add a warning to inspect third-party skills before installing. [Agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) |
| `/learn/putting-it-together` | README, agent instructions, scoped rules, architecture docs, skills | Strong summary of the course, with good caveats about availability. Add the complete skills-location options and turn this sequence into a setup exercise that learners apply to a sample repository. |

### Slide-by-slide findings

The index exposes these 17 slide topics. Ratings assess the topic and its representation in the site; they do not claim a full text extraction of every slide-image pixel.

| # | Topic | Technical accuracy | Clarity | Visual quality | Missing information | Recommended action |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Project Setup Files for AI Coding Assistants | Good | Good | Needs improvement | Copilot-specific scope, objectives | Rename to make the Copilot app/project-setup focus explicit; add learning outcomes. |
| 2 | Meet Your Trainer | Not applicable | Good | Not assessed | Audience, prerequisites | Keep as an opening slide; state expected IDE/client and audience level. |
| 3 | Session Modes | Good | Good | Needs improvement | Client/version scope | Label the product surface and explain when to use each mode. The sampled image's UI is small within the slide canvas, reducing live-room readability. |
| 4 | Agent Selection | Good | Good | Needs improvement | Ask/Agent limits and custom-agent setup | Add a small workflow example and label the shown client. |
| 5 | Tool Permissions | **Incorrect/outdated labels** | Needs improvement | Needs improvement | Current names and risk examples | Replace screenshot labels with current “Ask every time / Assisted / Approve all” terminology and explain least privilege. |
| 6 | Where Tasks Run | Needs improvement | Needs improvement | Needs improvement | Current environment model and client support | Recheck the named environments, preview status, and setup steps against current docs. |
| 7 | Models and Copilot Fusion | Good | Good | Needs improvement | Plan/policy matrix, Fusion Fast, cost/latency | Keep the concept; add current availability and an effort-level comparison. |
| 8 | Prompt Attachments | Good | Good | Needs improvement | Context privacy and limits | Show a real prompt with selected files and explain why each attachment is relevant. |
| 9 | Dictation in VS Code | Good | Good | Needs improvement | Platforms, settings, policy | Add the platform support and privacy controls; distinguish dictation from conversational voice mode. |
| 10 | Usage and Status | Needs improvement | Good | Needs improvement | Screenshot capture date and client | Date the screenshot and identify which usage/index/session fields are client-specific. |
| 11 | Why Setup Files Matter | Good | Good | Good | Concrete before/after result | Keep the explanation; show how guidance changes a real task and what it cannot guarantee. |
| 12 | Where Each Setup File Fits | Good | Good | Needs improvement | Feature support matrix | Make scope and supported surfaces visible in the diagram. |
| 13 | Repository Instruction Files | Good | Good | Needs improvement | Cross-client support details | Add the current support matrix and explain when instruction files are actually included. |
| 14 | Path-Specific Instructions | Good | Needs improvement | Needs improvement | Filename convention and coherent example | Show a complete `.instructions.md` example with a matching and non-matching path from one codebase. |
| 15 | Skills: Procedures Loaded On Demand | Needs improvement | Good | Needs improvement | Additional paths and third-party skill risk | Update skill locations; explain relevance-based loading and review before installation. |
| 16 | Project Setup Sequence | Good | Good | Good | Applied repo exercise | Finish with learners creating and validating the files in a sample repository. |
| 17 | Thank You | Not applicable | Good | Not assessed | Next steps and learning reinforcement | Add a short challenge, documentation links, and a take-away checklist. |

### Coverage gaps and visual recommendations

**Covered adequately or partially:** session modes, roles, approvals, context attachment, project instructions, path-specific guidance, architecture notes, skills, model selection, dictation, and usage status.

**Missing for a day-to-day developer course:** inline completion, natural-language prompting with examples, code explanation, refactoring, bug fixing, JUnit/Mockito testing, SQL tuning, logs/debugging, multi-file feature work, PR review, CLI workflow, MCP tools, security/privacy, licensing/compliance, and measuring outcomes. These do not all need their own slides, but the course needs at least one coherent coding lab.

Add these visuals next to the relevant lessons:

- **Workflow overview:** original diagram distinguishing the Copilot client, model selection, context, tools, permissions, and human review.
- **Mode and permission comparison:** a labeled diagram separating session behavior from tool approval; use a current screenshot for exact labels.
- **Repository guidance scope:** original tree diagram showing root and nested `AGENTS.md`, repository-wide instructions, path-specific files, and skills, with a client-support note.
- **Coding lab:** authentic, readable IDE screenshots showing prompt, context, diff, test run, and review. Blur secrets and use a current interface.
- **Validation lifecycle:** original diagram from task → plan/edit → tests/security checks → human diff review → commit/PR.

Avoid relying on screenshots alone to teach distinctions; screenshots are useful for current interface steps, while diagrams are better for concepts that apply across versions.

### Recommended practical demonstrations

Use one Java/Spring Boot repository through the course. Each exercise should include the developer's goal, exact prompt, relevant context, expected outcome, and validation:

1. Ask Copilot to explain an unfamiliar service, then confirm its explanation against the call path.
2. Implement a REST endpoint across controller/service/tests; review the plan and diff, then run the project's documented checks.
3. Fix a reproducible bug; have Copilot propose a test first, then verify the fix with JUnit 5 and Mockito.
4. Refactor a complex method and compare behavior before and after with tests.
5. Review generated code for input validation, authorization, SQL parameterization, secrets, dependencies, and unintended file changes.
6. Demonstrate a scoped instruction or skill, then verify that it applies to the intended files and does not silently overrule project facts.

GitHub's responsible-use guidance explicitly says generated code may be inaccurate or insecure and should be reviewed and tested. Make that validation part of every demonstration, not a closing disclaimer. [Responsible use of Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

### Improvement roadmap

- **P0 — Before delivery:** update slide 5 permissions terminology; reconcile slide 6 environment labels and preview status; name the client/surface wherever screenshots and controls are shown.
- **P1 — Essential:** add a complete Java/Spring Boot hands-on lab; include tests and human review; add current plan, policy, and support references for models, instructions, and skills.
- **P1 — Enterprise:** add a concise data-handling and governance section, including organization controls and current individual versus Business/Enterprise policy differences.
- **P2 — Improve learning:** turn quizzes into applied exercises with expected results and validation steps; add a current workflow diagram and clearer interface screenshots.
- **P3 — Optional:** add an assessment or take-away checklist and a maintenance date so screenshots and feature labels are reviewed as Copilot changes.

### Would developers learn to use Copilot effectively tomorrow?

**Not yet, if this is presented as the team's full Copilot training.** Developers would learn useful distinctions about session modes, permissions, project guidance, and skills. They would not yet practice the core engineering loop of prompting, editing, testing, reviewing, and safely shipping a change—and two interface areas need current terminology.

The five most important changes are: **correct the permissions UI, update the environment model, identify each Copilot surface, add an end-to-end coding lab, and teach enterprise data handling and human validation.**

## Implementation notes

The report's status checklist above will be updated as findings are addressed. The original course slides are included as screenshots and are not assumed to be editable source; course text and diagrams should provide clear, current alternatives wherever a screenshot cannot be safely or verifiably updated.
