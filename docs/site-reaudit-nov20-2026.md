# Copilot Field Guide: Current Site Re-audit

**Re-audit date:** November 20, 2026
**Site reviewed:** https://copilot-field-guide.pages.dev/
**Coverage:** Current home page, slide reference page, all 16 lesson routes, and the new `/lab` route. I checked visible page content, exercise prompts/outcomes/validation, links, and a rendered lab screenshot. I also read the linked repository README, overview, task service, repository, DTO, and controller to verify lab assumptions. This is a site audit, not a code test run.

## Executive assessment

The site has changed materially since the previous audit. It now presents itself as a **focused Copilot app workflow and project setup course**, explicitly says it is not a complete Copilot or enterprise-governance curriculum, and adds a nine-exercise Java/Spring Boot/PostgreSQL lab. Each lesson now has a client/scope note, an applied prompt, an expected outcome, validation steps, and official references. The slide page labels the original deck screenshots as historical.

The previous example coverage score of 45/100 and the earlier readiness concerns are superseded by this re-audit. The revised site is **ready with a few corrections** for its stated focused course. It is not a substitute for a full survey of every Copilot client, plan, or administration workflow.

**Updated example coverage score: 87/100.** The design has moved from hypothetical scenarios to reproducible, assessed work. The remaining deductions reflect a couple of exercise ambiguities, client-specific command coverage, and the local setup requirements.

## What changed for the better

- The home page now states audience, prerequisites, intended scope, and outcomes. It links directly to the lab and an explicit coverage/out-of-scope map.
- All 16 lessons now include an “Apply it” exercise with a prompt or task, expected result, validation checks, and current references. The old scenario and quiz remain as reinforcement.
- The lab progresses from explanation and context through a multi-file REST feature, regression debugging, JUnit 5/Mockito, query safety, optional MCP, policy/data handling, human review, and a capstone.
- The lab adds safe-workspace guidance, test/build commands, a human-review rubric, and a careful privacy/governance section.
- Slide 5’s old permission labels are explicitly marked historical; the lesson now gives current app labels: Ask every time, Assisted, and Approve all. This matches current app documentation. [Agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- Slide 6’s environment terminology is now reconciled with Cloud, Actions, user-managed custom environments, and separate remote IDE/tunnel workflows. This distinction matches current GitHub documentation. [Cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes)
- Fusion Fast, policy-dependent availability, client-specific custom instructions, skill locations, dictation platforms, and the dated model-training distinction are now called out with official references. [Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) · [Custom-instruction support](https://docs.github.com/en/copilot/reference/custom-instructions-support) · [Agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) · [VS Code voice support](https://code.visualstudio.com/docs/configure/accessibility/voice)
- The repository README and API overview confirm the published setup commands and architecture. The backend’s current task-list endpoint supports topic and status filters; the lab clearly frames title filtering as a new exercise. The overview says the public static deployment does not deploy the Java API, consistent with the lab safety note.

## Current lesson and page feedback

| Page/module | Current assessment | Remaining feedback |
|---|---|---|
| Home `/` | Strong scope statement, audience, outcomes, prerequisites, course path, progress, and lab entry point. | Keep the reviewed date synchronized with the linked documentation and repository. |
| `/slides` | Complete 17-slide map; current references are grouped together; screenshot caveats are explicit; includes a practical takeaway checklist and lab link. | Good supporting index. Source images still have unknown original client/capture dates, but the site now clearly treats them as historical. |
| `/learn/session-modes` | Strongly separates modes from permissions and identifies app/CLI scope. Adds a bounded task prompt, expected plan, and checks. | The prompt is safe and useful, though a harmless documentation-only task is less representative than the later feature lab. |
| `/learn/agent-selection` | Correctly warns that Ask/Agent names are client-specific and avoids treating them as universal. Applied read-only code-trace prompt is reproducible. | Its reference list includes the Copilot app’s agent-session docs; make the separate VS Code role behavior equally easy to verify. |
| `/learn/tool-permissions` | Current labels and effects are clearly explained; least-privilege exercise is useful. | The quiz says “Unconditional approval (Approve all),” which is clear, but learners should still see that organization/policy restrictions can make the option unavailable. The lesson already notes this. |
| `/learn/task-environments` | Strongest correction from the prior review. Distinguishes Cloud, Actions, custom hosts, and remote IDE tunnels, with billing/access checks. | Preserve this explicit distinction. It accurately warns against reading the old slide’s “GitHub Environments” label as a current universal menu. |
| `/learn/models-and-fusion` | Fusion explanation, effort levels, Fast limitation, account/plan caveats, and usage validation are current and qualified. | Consider naming the current product surface on the source screenshot; current lesson correctly says its capture metadata is unknown. |
| `/learn/prompt-attachments` | Provides a practical, source-grounded prompt and a sensitive-context review. | Good. The example correctly avoids assuming all clients have the same attachment picker. |
| `/learn/dictation` | Accurately separates experimental dictation from Voice Mode and explains desktop versus web handling and platform coverage. | Good. Keep the live platform table updated when VS Code support changes. |
| `/learn/usage-and-status` | Calls the source screenshot historical and account values non-current; gives a client-specific verification task. | Session sync and semantic-index behavior are especially version-sensitive; retain the caveat that current documentation and the user’s own status view control. |
| `/learn/why-setup-files` | Adds a test-only applied prompt and validation instead of relying on a hypothetical endpoint scenario. | The title says “compare with and without context,” but the prompt does not actually run both variants. Add a second prompt/run or rename it “Use applicable project context.” |
| `/learn/readme` | Verifiable command-matrix exercise checks README against package/build files and prerequisites. | Good; it explicitly tells learners not to treat documentation as executable truth. |
| `/learn/agents-md` | Gives a real repository path, asks learners to locate applicable guidance, and separates path scope from client support. | Good; students should use the linked support matrix for the exact client and feature. |
| `/learn/copilot-instructions` | Applied exercise requires proof that the file is supported/included, not mere assumption. | Good. |
| `/learn/path-specific` | Correct filename suffix, narrow `applyTo` path, matching/non-matching examples, and verified project conventions. | Good correction from the prior mixed-stack example. |
| `/learn/architecture-overview` | The React → Spring Boot → PostgreSQL map is now explicitly tied to the repository overview and source tree; task asks to flag discrepancies. | Good. |
| `/learn/skills` | Supported project/personal locations are listed; side effects and untrusted skill content are covered before execution. | Good. |
| `/learn/putting-it-together` | Integrated setup assessment asks for audience, path, purpose, client support, and validation without duplicating rules. | Good. |
| `/lab` | Full applied course with nine prompts, expected outcomes, checks, scope map, rubrics, and capstone. The rendered desktop page is readable and the safety section is prominent. | Fix the two exercise issues below before delivery. The lab requires a locally prepared Java/Node/Docker/PostgreSQL environment; keep those prerequisites prominent. |

## Corrections to make before delivery

### P1 — Make the regression lab’s red/green path precise

Exercise 3 asks learners to prove that “a notes-only or status-only update” preserves completed checklist items, then introduces an unconditional clear in `TrainingTaskService.update`. In the actual code, a status-only PATCH is handled by the separate `updateStatus` method; the deliberate mutation in `update` will not make that status-only test fail. The code also treats an omitted `steps` list on the PUT update as an empty list, so the notes-only case must send the unchanged checklist to isolate the invariant.

**Suggested change:** Make the red/green test a notes-only PUT that includes the existing steps. Keep a separate status-only PATCH test as a control and say it should pass before and after the intentional mutation. This makes the causal demonstration exact and teaches the API boundary accurately.

### P2 — Avoid mixing slash-command references across clients

Lab Exercise 1 is labeled for VS Code Copilot Chat and inline suggestions, but its reference list includes GitHub Copilot app slash-command documentation. The prompt wisely tells learners to check which syntax is available, yet the reference could still imply the app’s commands are the VS Code commands.

**Suggested change:** Label that link “App-only slash command reference,” add the current VS Code-specific command/context reference, or leave slash commands as a “look up only if supported” extension task. Keep `@participants`, `#references`, and slash-command examples explicitly tied to the selected client.

### P2 — Either run both context variants or rename the exercise

The “Compare a task with and without relevant project context” exercise currently gives one prompt asking the learner to read applicable guidance. It teaches checking context, but does not compare outputs with and without it.

**Suggested change:** Provide two controlled prompts on the same test-only task, one without guidance and one with it, then ask learners to compare commands, constraints, and validation. Otherwise rename the exercise to describe its current single-run workflow.

## Module and practical learning assessment

### Copilot workflow — 8 lessons

- **Learners should know:** Modes, roles, permissions, environment, model choice, context, dictation, and usage are distinct controls whose behavior depends on client and policy.
- **They should be able to do:** Identify the active client and host, choose an appropriate bounded workflow, supply relevant context, avoid broad access, and inspect the output.
- **Current practice:** Eight lesson prompts plus lab exercises for role/context, mode/permission, environment, model, attachment, dictation, and status use.
- **Assessment:** The lab’s workflow assessment requires a read-only investigation, policy check, bounded change, least-permissive tool setting, and verified local test change.
- **Remaining gap:** Slash command and IDE-specific references need cleaner separation; this course does not provide a complete UI walkthrough for every Copilot client, which it now explicitly marks out of scope.

### Project setup — 8 lessons

- **Learners should know:** README, AGENTS.md, repository instructions, path-specific instructions, architecture docs, and skills serve different audiences and scopes.
- **They should be able to do:** Verify support, locate applicable files, check commands and path patterns, avoid conflicting rules, and validate a task against project tests.
- **Current practice:** Each lesson now has an applied prompt and expected outcome; the capstone combines repository guidance with the REST filter task.
- **Assessment:** The project setup assessment asks learners to map instruction scope and use only applicable guidance in the feature change.
- **Remaining gap:** No significant content gap inside the stated project setup scope. Keep repository examples synced with actual code and support documentation.

## Progressive sequence and coverage

The progression is now credible: understand controls → inspect a code path → add a multi-file feature → reproduce a regression → generate tests/refactor → assess query safety → optionally use MCP → check policy → review a change → complete a setup/coding capstone. The separate rubric assesses correctness, tests, security/privacy, governance, scope control, and human review.

Coverage is also more honest than before: the lab distinguishes hands-on content from reference-guided content and marks unsupported client-wide UI walkthroughs, arbitrary MCP installation, admin policy changes, legal determinations, ROI guarantees, and production deployment out of scope. That is appropriate for this course’s stated limits.

## Updated score

| Metric | Weight | Score | Basis |
|---|---:|---:|---|
| Topic-level example coverage | 25 | 23 | Every in-scope lesson now has an applied prompt; the lab covers the core engineering loop. Slash-command/client specifics remain conditional. |
| Technical accuracy of examples | 20 | 18 | Permissions, environments, Fusion, paths, skills, dictation, and policy claims are qualified and linked. One regression-test mutation path needs clarification. |
| Real-world developer relevance | 15 | 14 | Java/Spring Boot API, existing repository, tests, query review, and PR review are realistic and tied to the linked project. |
| Step-by-step reproducibility | 15 | 11 | Prompts and local commands are concrete, but learners need the full Java 21/Node 24+/Docker/PostgreSQL setup and a supported client. |
| Expected output and validation | 10 | 9 | Most exercises define evidence and validation; regression red/green behavior needs one correction. |
| Visual demonstration | 10 | 8 | Current concept diagrams, historical screenshot caveats, and a readable lab layout. It does not attempt every live client UI. |
| Progressive difficulty | 5 | 4 | Clear Guided → Hands-on → Capstone sequence; a couple of exercises need tighter task boundaries. |
| **Total** | **100** | **87** | **Ready with the listed refinements for its focused course scope.** |

## Final recommendation

**Ready with changes** for the stated Copilot app workflow and project setup course after the regression-lab wording and client-specific slash-command references are corrected. The course now teaches observable engineering work and validation rather than only describing features. It still should not be advertised as comprehensive training for every Copilot surface or enterprise administration topic; the home page and coverage map appropriately say so.

The prior 45/100 example score applied to the older site snapshot. Use this re-audit as the current assessment.
