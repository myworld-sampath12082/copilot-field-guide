# Copilot Field Guide: Example Coverage and Practical Learning Audit

**Audit date:** November 20, 2026\
**Material reviewed:** Home page, slide reference page, 16 lesson pages, their visible captions/alt text, scenario cards, checks for understanding, and internal links.\
**Scope note:** This audit classifies what the published site actually teaches. Its scenarios are not counted as reproducible labs unless they include usable instructions, a prompt/workflow, an expected result, and validation. The lesson pages link to presentation screenshots; the source image for slide 3 was visually sampled, but image-only text in all 17 slide PNGs was not OCR-verified. Where a page claims a specific demo-app architecture, the site alone does not let me independently verify that claim against its source code.

## 1. Executive result

The course contains two modules with eight lessons each: **Copilot workflow** and **Project setup**. Every lesson has a short scenario and a multiple-choice check. That gives learners a useful conceptual pass, but nearly all existing examples are **E1 – Basic example**. None reaches E2 because the learner is not given a complete prompt, concrete output, and reproducible validation. None reaches E3 or E4.

**Example coverage score: 45/100.** The examples make concepts easier to discuss, but a developer could not use this course alone to independently complete and validate a Copilot-assisted engineering task.

Current GitHub documentation supports the broad concepts around modes, Fusion, instructions, and skills. However, the material needs a client/surface label and current labels for permissions. Current app documentation uses “Ask every time,” “Assisted,” and “Approve all”; the slide shows “Manual permissions” and “Allow all.” [Agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) Current documentation also describes cloud sandboxes, Actions environments, and custom environments; the guide’s “GitHub Environments / Dev Tunnels” framing needs a client-specific mapping and verification. [Cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) · [Custom environments](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-a-custom-environment)

### Classification key

- **E0 – No example:** concept absent or merely mentioned without a demonstration.
- **E1 – Basic example:** illustrative scenario or explanation, not a reproducible use.
- **E2 – Practical example:** realistic scenario with prompt/workflow and expected output.
- **E3 – Hands-on exercise:** learner can independently reproduce and validate the workflow.
- **E4 – Advanced scenario:** complex end-to-end implementation, validation, and edge cases.

The site’s examples are classified based on the published content. Recommendations below are explicitly new; they are not represented as existing site material.

## 2. Complete content inventory and topic-wise example coverage

Coverage columns: **Explained** means the page teaches the concept; **example** is its actual coverage level; **visual** means a relevant visual is present or referenced; **exercise** means a learner can perform the workflow independently. “Some” indicates a screenshot/diagram exists but does not demonstrate the work itself.

| Module | Topic | Concept explained | Example available | Example quality | Visual available | Hands-on exercise | Gap |
|---|---|---:|---:|---|---|---:|---|
| Copilot workflow | Interactive mode | Yes | E1 | Short scenario about a refactor; no prompt or transcript | Yes, menu screenshot | No | Add a prompt and show how the developer steers the next step. |
| Copilot workflow | Plan mode | Yes | E1 | Scenario says review a plan before execution | Yes, menu screenshot | No | Show a real plan, revision, approval, and implementation. CLI and app behaviors must be distinguished. |
| Copilot workflow | Autopilot mode | Yes | E1 | Autonomy explained, not demonstrated | Yes, menu screenshot | No | Add an end-to-end bounded task, permission choices, progress, stop condition, and diff review. |
| Copilot workflow | Session mode versus tool permissions | Yes | E1 | Useful distinction in a hypothetical command scenario | Yes, menus | No | Demonstrate the same task under two permission settings; use current labels. |
| Copilot workflow | Ask role | Yes | E1 | Failing-test investigation scenario | Yes, agent picker screenshot | No | Show a read-only request and a representative answer, with files/tools used. |
| Copilot workflow | Agent role | Yes | E1 | Says Agent can edit, run commands, and validate | Yes, agent picker screenshot | No | Show changed files, exact commands, and test result. |
| Copilot workflow | Custom agents | Yes | E1 | Names specialized profiles but no profile definition/use | Yes, picker screenshot | No | Create/select a reviewer or test agent and show what its tools/instructions change. |
| Copilot workflow | Manual/Assisted/Allow all permissions | Yes | E1 | Scenario mentions a file-changing command | Yes, permission menu | No | Update labels to current app terminology; show an approval prompt and consequences. |
| Copilot workflow | Local machine environment | Yes | E1 | Describes local folder/tools | Yes, environment menu | No | Show selecting repository/folder and checking the actual host. |
| Copilot workflow | GitHub Environments / registered remote host | Yes | E1 | Describes a preview remote-host flow | Yes, environment menu | No | Map this label to the current supported environment feature and provide its setup steps. |
| Copilot workflow | Dev Tunnels | Yes | E1 | One-sentence connection/sign-in description | Yes, environment menu | No | Specify the Copilot client and tunnel prerequisites, then demonstrate connection and disconnection. |
| Copilot workflow | Individual model selection | Yes | E1 | Scenario compares model and Fusion | Yes, model picker screenshot | No | Demonstrate model choice on a task and explain plan/policy availability. |
| Copilot workflow | Copilot Fusion | Yes | E1 | Says Fusion can choose/coordinate models; no actual task result | Yes, picker/settings screenshots | No | Show one task, its selected effort, result, and actual usage. Current Fusion details/effort options can change. [Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) |
| Copilot workflow | Fusion effort levels | Yes | E1 | Standard/High/Max described | Yes, effort screenshot | No | Compare a well-scoped task at two effort levels and discuss time/credit tradeoffs. |
| Copilot workflow | File/folder attachments | Yes | E1 | Scenario asks for bug fix with issue and source file | Yes, attachment picker | No | Show attachment selection, resulting context, and an answer that uses it. |
| Copilot workflow | Issue, pull request, and session attachments | Yes | E1 | Options named; caveat says availability varies | Yes, picker screenshot | No | Demonstrate one available work-item context and explain client-specific support. |
| Copilot workflow | Dictation in VS Code | Yes | E1 | Dictate, review transcript, then submit | Yes, microphone screenshot | No | Add reproducible steps, supported platforms, and privacy settings. Current VS Code docs call built-in dictation experimental and distinguish desktop/local transcription from web/cloud transcription. [Voice support](https://code.visualstudio.com/docs/configure/accessibility/voice) |
| Copilot workflow | Account usage/status | Yes | E1 | Screenshot values are correctly called live/account-specific | Yes, status panel screenshot | No | Demonstrate where a learner checks their own plan/allowance and what the fields mean. |
| Copilot workflow | Inline suggestion status | Yes | E1 | Mentioned in status panel; no completion example | Yes, status panel only | No | Add an inline suggestion accept/partial-accept/dismiss walkthrough. |
| Copilot workflow | Semantic index | Yes | E1 | Search-misses-recent-change scenario | Yes, status panel | No | Show an actual stale-index symptom and a direct-file verification workflow. |
| Copilot workflow | Session sync | Yes | E1 | Experimental status explained, no setup or privacy workflow | Yes, status panel | No | Explain what syncs, configuration, and data-handling implications for the shown client. |
| Project setup | Why setup files matter | Yes | E1 | New endpoint in an unfamiliar service | Diagram | No | Compare output with and without useful project context; verify using repo checks. |
| Project setup | README purpose/setup/run/test | Yes | E1 | Teammate starting app and finding test command | Diagram/card | No | Supply a real sample README and run the documented commands. |
| Project setup | AGENTS.md standing instructions | Yes | E1 | Root and nested backend example | Tree diagram | No | Give learners a nested repo and ask them to identify applicable guidance, then verify in the client. |
| Project setup | Copilot repository instructions | Yes | E1 | Shared test command/generated-code boundary scenario | Scope comparison | No | Show a supported request where instructions are applied and the resulting reference/context. |
| Project setup | Path-specific instructions / applyTo | Yes | E1 | Java glob with matching/non-matching paths | Code sample and path list | No | Add complete filename convention and test the glob in the selected client. |
| Project setup | Architecture overview | Yes | E1 | React → Spring Boot → PostgreSQL flow | Flow diagram | No | Ask Copilot to trace a feature across layers; verify every claim against code. The page’s claim about its demo app is not independently verified here. |
| Project setup | Agent skills / SKILL.md | Yes | E1 | Release-readiness checklist scenario and folder tree | Folder diagram | No | Create and invoke a sample skill, inspect loaded behavior, and validate output. Include current supported locations. [Agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) |
| Project setup | Combining README, instructions, architecture, skills | Yes | E1 | Setup sequence scenario | Sequence diagram | No | Apply the files to a sample repo and complete a task that uses each applicable item. |
| Missing core topic | Natural-language prompting and prompt structure | No | E0 | None | No | No | Add prompt → response → iteration example. |
| Missing core topic | Slash commands | No | E0 | No command demonstrated | No | No | Teach only commands relevant to the chosen client, with command, context, result, and limitations. The Copilot app and CLI have their own command references. [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands) |
| Missing core topic | @participants and #references | No | E0 | None | No | No | Demonstrate actual references/participants in a supported IDE and show the context they add. |
| Missing core topic | Inline code completion | No | E0 | None | No | No | Show suggestion, accept/partial accept/dismiss, and review. [Inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions) |
| Missing core topic | Inline Chat / Edit workflow | No | E0 | None | No | No | Demonstrate a local edit and inspect the diff; establish terminology for target IDE/version. |
| Missing core topic | Code explanation and code generation | No | E0 | None | No | No | Add Java REST endpoint generation and explanation labs. |
| Missing core topic | Debugging and logs | No | E0 | None | No | No | Use a failing test/log, investigate likely cause, make a fix, rerun validation. |
| Missing core topic | JUnit 5 / Mockito test generation | No | E0 | None | No | No | Generate tests for an existing service, run them, inspect assertions and mocks. |
| Missing core topic | Refactoring and SQL performance | No | E0 | None | No | No | Use a bounded refactor and query review with behavioral/performance validation. |
| Missing core topic | Multi-file feature / Agent Mode | No | E0 | None | No | No | Provide a plan-to-change-to-test-to-review workflow. |
| Missing core topic | MCP server/tool integration | No | E0 | None | No | No | Show a specific MCP tool, permissions, invocation, returned data, and trust boundary. [MCP](https://docs.github.com/en/copilot/concepts/customizations/mcp) |
| Missing core topic | Coding agent and pull request lifecycle | No | E0 | None | No | No | Demonstrate issue → agent task → branch/PR → checks → human review. |
| Missing core topic | Security and responsible AI | No | E0 | None | No | No | Show an insecure example, corrected code, review, and test. Generated code needs careful review and testing. [Responsible use of Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Missing core topic | Enterprise data, policy, and governance | No | E0 | None | No | No | Add a realistic admin/user policy exercise, including plan-specific data controls and organizational settings. |
| Missing core topic | Licensing/public-code matching/compliance | No | E0 | None | No | No | Explain enterprise policy and demonstrate how to review a public-code match or compliance question. |
| Missing core topic | Developer productivity measurement | No | E0 | None | No | No | Define a workflow metric and a baseline; avoid treating acceptance counts as proof of productivity. |

## 3. Topics with no examples and weak examples

### E0 – No example

The site contains no lessons or demonstrations for: prompt construction; slash commands; @participants or #references; inline completions; Inline Chat/Edit; code explanation or generation; debugging and log analysis; test generation and execution; refactoring; SQL optimization; MCP; coding agent/PR workflow; security review; enterprise data/governance; licensing/compliance; or developer-productivity measurement.

These are absent from the published course, rather than merely weakly explained. The course’s “Agent,” “skills,” and “architecture” lessons do not count as examples of these distinct workflows.

### E1 – Weak or superficial examples

All 16 existing lesson scenarios are E1. They generally tell the learner what to do and what to review, but do not supply enough information to reproduce the work. In particular, the site provides no actual Copilot prompt, no Copilot response or code diff, no expected test output, and no step-by-step validation result. Its multiple-choice checks test recognition, not performance.

This is a meaningful gap for the site’s own topics: permissions, modes, model choice, attachments, remote environments, and setup files all need at least one E2 usage example, and the core engineering workflows should reach E3.

## 4. New recommended examples

The following are recommendations, **not examples already present on the site**. Use one sample Spring Boot task repository with a README, a small service, tests, and one documented architecture diagram.

### Example A: Generate a REST endpoint with Agent Mode (new; target E3)

**Objective:** Add `GET /api/tasks/{id}` using the repository’s existing patterns.

**Prompt:** “Inspect the existing task API, service, DTOs, and tests. Add a GET endpoint for one task by ID, following the current response and error-handling conventions. Do not add dependencies. First summarize the files and behavior you plan to change; then implement it and add JUnit 5 tests. Run the documented test command and report the exact result. Do not edit generated files.”

**Expected outcome:** A proposed file list, a controller/service change consistent with existing conventions, tests for found and missing task cases, and the actual test command/result. The expected result is the behavior and validation, not a prescribed code listing.

**Validation:** Inspect the diff; confirm 404/response behavior and authorization requirements; run the repository’s test command; review test assertions and any changed files.

**Visual:** Authentic IDE screenshot showing prompt/context, plan, diff, terminal result, and human review in one sequence.

### Example B: Investigate and fix a bug (new; target E3)

**Objective:** A task’s completion state is not persisted after update.

**Workflow/prompt:** “Trace the update request from controller to repository. Do not edit files yet. Identify the likely cause and propose a regression test. Include the relevant code paths and explain what evidence supports the diagnosis.” After reviewing the diagnosis: “Implement the smallest fix and regression test. Run the focused test and the full test suite; report commands and results.”

**Expected outcome:** A traceable diagnosis, a test that fails before the fix and passes after it, and a diff limited to the relevant path.

**Validation:** Confirm the test fails against the bug, passes after the fix, and the full suite is green; inspect the persistence semantics and transaction boundary.

**Visual:** Before/after test output plus a small controller → service → repository sequence diagram.

### Example C: Generate and evaluate JUnit 5 / Mockito tests (new; target E3)

**Prompt:** “Read TaskService and its dependencies. Add JUnit 5 and Mockito tests for the existing behavior: valid task, missing task, and repository failure. Match the project’s test conventions. Do not change production code. Explain what each test asserts, then run the focused test class.”

**Expected outcome:** Tests that assert externally meaningful behavior, avoid unnecessary mocking, and use the project’s existing setup.

**Validation:** Run the focused class and full suite; inspect for weak assertions, over-mocking, missing boundary cases, and tests that only mirror implementation details.

**Visual:** Test code beside test-run output, with the assertion under review highlighted.

### Example D: SQL security and query review (new; target E3)

**Prompt:** “Review this repository query for injection risk and avoidable performance problems. First explain the risks with line references. Then propose a parameterized version that preserves behavior. Do not change schema or add dependencies. Include a test or explain how to validate behavior against representative inputs.”

**Expected outcome:** Identification of unsafe string concatenation if present, a parameterized query using the project’s actual database library, and a behavior-preserving change proposal.

**Validation:** Inspect the parameter binding, run integration/unit tests, test empty/long/special-character inputs, and use the project’s query plan or database test fixture to validate performance claims. Do not accept unsupported claims that a query is faster without evidence.

**Visual:** Insecure query and safe parameterized query comparison, annotated with parameter binding and validation.

### Example E: MCP tool interaction and trust boundary (new; target E2)

**Objective:** Use a configured read-only issue tracker tool to summarize an issue before proposing code changes.

**Workflow:** Show the MCP server name, the specific tool exposed, what data it can read, which permission is required, the tool call/result, and how the developer uses the result as context. Do not present a generic “MCP connects tools” description as an integration demo.

**Expected outcome:** A source-linked issue summary and a proposed next step, with no external changes made by the read-only tool.

**Validation:** Confirm the tool result is from the intended issue, verify repository facts locally, and show how access is disabled or restricted. Add a warning to inspect untrusted tool output and avoid exposing secrets.

**Visual:** Original diagram: Copilot agent → MCP client → named issue tool → read-only issue data, with the permission boundary labeled.

### Example F: Reusable prompt and path-specific instructions (new; target E3)

**Objective:** Establish a team’s supported test conventions for Java services.

**Workflow:** Create a current `.github/instructions/java-tests.instructions.md` file with an `applyTo` pattern appropriate to the repo; add a reusable prompt file only if the chosen client supports it. Ask Copilot to add a test to a Java service and then to a TypeScript file.

**Expected outcome:** The Java request uses the scoped test conventions; the unrelated TypeScript request does not. Explain that instruction support varies by Copilot surface and feature. [Custom-instruction support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)

**Validation:** Verify filename/frontmatter and matching paths; inspect the applied context in the client where available; compare generated changes with actual build/test conventions.

**Visual:** Repository tree showing the instruction file and exactly which paths match.

### Example G: Pull request review and security check (new; target E3)

**Objective:** Review a small feature branch for correctness, security, tests, and scope.

**Prompt/workflow:** Request a review of the diff with explicit focus on authorization, input validation, SQL parameterization, error handling, tests, and unintended changes. Ask Copilot to cite changed lines and explain each finding. Then run the project’s tests and security checks; decide which findings are valid.

**Expected outcome:** A prioritized list of findings with file/line evidence, not an unconditional “approved” result.

**Validation:** Reproduce findings, inspect the code, run tests/security tooling, and document rejected false positives. Copilot review supplements human review; it does not replace it. [Responsible use of agents](https://docs.github.com/en/copilot/responsible-use/agents)

**Visual:** Human review lifecycle diagram: Copilot findings → reproduction → tests/security checks → human disposition → merge decision.

## 5. Progressive learning assessment

| Level | Target learner capability | Existing coverage | Assessment |
|---|---|---|---|
| 1. Understand a feature | Explain modes, roles, permissions, context, files, and skills | Present across all lessons | Reasonable conceptual coverage; terminology and client scope need updates. |
| 2. Use a feature independently | Select a mode/role, attach context, configure guidance, run a command | Not demonstrated | The course jumps from explanation to hypothetical scenarios without reproducible steps. |
| 3. Apply it to an existing application | Implement/fix/refactor code and test it in a real repo | Missing | No code changes, test runs, or actual app tasks are shown. |
| 4. Combine capabilities | Use instructions/context + Agent + tools + tests + review | Only described in setup sequence | No integrated task proves these pieces work together. |
| 5. Complete and validate end-to-end | Deliver a reviewed change with test/security evidence | Missing | No capstone or practical assessment exists. |

The path progresses from basic concepts to configuration topics, but it does **not** increase example complexity. It stays at E1, then ends with a list of setup files rather than a validated implementation. The recommended progression is: guided feature demos (L1), scaffolded repo tasks (L2), bug/test task (L3), combined multi-file task with MCP or custom instructions (L4), and reviewed capstone (L5).

## 6. Module-wise practical assessment

### Module 1: Copilot workflow (8 lessons)

- **A developer should know:** modes affect task continuation; roles affect the kind of work; permissions control approval; environment determines where the work runs; model/Fusion selection affects the model workflow; context can be attached; dictation and usage/status are client/account dependent.
- **A developer should be able to do:** choose a mode and role for a task, grant only appropriate access, identify the execution environment, provide relevant context, review model/usage options, and verify the resulting work.
- **Examples currently teaching this:** eight illustrative scenarios (refactor, failing test, file-changing command, remote host, model comparison, bug/issue attachment, dictation, stale semantic index), each with “what you do / may do / review.”
- **Sufficient practice?** No. They are scenarios, not executable workflows; learners never see a submitted prompt, actual response, command approval, change, or verification output.
- **Assessment task:** In a sample repo, investigate a failing test using Ask, plan a fix, switch to Agent, select an appropriate approval level, implement the fix, and verify the tests. Learners must explain why the environment and context are appropriate.
- **Missing:** current permission labels, environment mapping, exact product-surface names, prompt text, results, checkpoints, usage/privacy explanation, and independent task completion.

### Module 2: Project setup (8 lessons)

- **A developer should know:** README, AGENTS.md, repository-wide instructions, path-specific instructions, architecture notes, and skills have different purposes and scopes; none guarantees a correct result or universal loading.
- **A developer should be able to do:** locate/create relevant guidance, identify which paths it applies to, point Copilot at architecture context, and confirm the agent used valid project commands and conventions.
- **Examples currently teaching this:** a new endpoint, contributor setup, nested AGENTS.md, shared repository rules, Java `applyTo` glob, three-layer architecture, release-checklist skill, and combined setup sequence.
- **Sufficient practice?** No. Examples show concepts and paths but no completed files, prompts, behavior differences, or validation runs.
- **Assessment task:** In a starter repository, add a README test command, root and nested AGENTS.md guidance, one repository-wide instruction, one Java-scoped instruction, an architecture overview, and a test skill. Ask Copilot to add a service behavior and show which guidance applies; run tests and inspect the diff.
- **Missing:** runnable sample repo, complete files with correct names/frontmatter, feature support checks, conflict handling, actual generated changes, and validation evidence.

## 7. Hands-on exercise set

To meet the proposed acceptance criteria, add these assessed exercises and require evidence from the learner:

1. **Prompting and context:** explain a service class with `#file` or the selected client’s equivalent; learner checks explanation against code and corrects one wrong inference.
2. **Code generation:** add a REST endpoint across controller/service/tests; learner captures prompt, diff, and test result.
3. **Debugging:** investigate a failing test; learner records diagnosis, regression test, fix, and before/after results.
4. **Testing:** generate JUnit 5/Mockito tests; learner runs them and identifies one inadequate assertion or unnecessary mock.
5. **Security:** review an unsafe query or authorization check; learner applies a corrected approach and runs tests/security checks.
6. **Agent/MCP:** perform a bounded multi-file task with a named tool; learner explains tool permissions and checks tool output against source facts.
7. **Enterprise and PR review:** review a generated PR, apply organization policy, examine security and licensing signals, and record which findings were accepted/rejected.
8. **Capstone:** complete one feature from issue to tested PR, combining project instructions, architecture context, mode/permissions, tests, and human review.

Each exercise needs a rubric: task outcome, correctness, tests, security, scope control, and ability to explain the final diff. A multiple-choice quiz can supplement but cannot substitute for performance evidence.

## 8. Example coverage score

| Metric | Weight | Score | Basis |
|---|---:|---:|---|
| Topic-level example coverage | 25 | 9 | The site has a scenario in each lesson, but none of the core developer workflow topics are demonstrated; several requested topics are absent. |
| Technical accuracy of examples | 20 | 16 | Most scenario-level guidance is cautious and plausible; permission labels need updating, environment vocabulary needs reconciliation, and one architecture claim is not source-verified. |
| Real-world developer relevance | 15 | 8 | Scenarios resemble work situations, but do not show actual code or outcomes. The path-specific example mixes unrelated AWS and SQL Server conventions. |
| Step-by-step reproducibility | 15 | 2 | No complete prompt-to-result workflow or runnable instructions. |
| Expected output and validation | 10 | 3 | “What to review” is a useful cue, but expected code/results and test outputs are absent. |
| Visual demonstration | 10 | 5 | Relevant screenshots/diagrams are referenced. Most show menus or conceptual flows, not the coding action and validation. The sampled slide 3 image has small interface text. |
| Progressive difficulty | 5 | 2 | The lesson order is logical, but example complexity does not increase and there is no capstone. |
| **Total** | **100** | **45** | **Below the proposed approval threshold.** |

## 9. Highest-priority improvements

1. **Add a reproducible coding capstone** with prompt, context, multi-file change, tests, and review evidence.
2. **Add practical examples for absent core workflows:** prompt/context, inline completion, debugging, test generation, code review, MCP, and PR lifecycle.
3. **Update and scope product UI claims:** current permission labels; current environment terminology; client/version/surface labels on every screenshot and feature lesson.
4. **Make every existing scenario actionable:** add the exact prompt or steps, expected output, validation command/result, limitations, and a learner task.
5. **Add enterprise security and data governance:** policy-dependent feature access, data handling, permissions, sensitive context, code security, licensing, and human review.

## 10. Acceptance-gate status

These are the user-provided proposed thresholds, not official GitHub standards.

| Proposed gate | Current status | Evidence needed to pass |
|---|---|---|
| Topic inventory coverage: 100% | Not met | Add a complete scope map and explicitly mark out-of-scope topics; include the core training topics selected for this audience. |
| Critical feature factual accuracy: 100% | Not met yet | Correct permission labels and reconcile environments; add client/version and support documentation. |
| Topics requiring examples at E2 or better: 90% | Not met | Upgrade existing E1 scenarios and provide E2 prompts/results for selected individual features. |
| Core developer workflows at E3: 100% | Not met | Hands-on code generation, debugging, testing, and review labs with learner validation. |
| Practical examples with validation: 90% | Not met | Include actual test/security commands and observable outcomes in nearly all practical labs. |
| Modules with hands-on assessment: 100% | Not met | Add an assessed module task for both workflow and project setup modules. |

**Decision:** Do not approve the site as a complete professional Copilot training programme until the workflow and capstone exercises are added. It can serve as a conceptual pre-read for its narrow setup/workflow topics after the current terminology corrections.
