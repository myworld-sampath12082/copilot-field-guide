export type LabReference = {
  label: string
  url: string
}

export type LabExercise = {
  title: string
  level: 'Guided' | 'Hands-on' | 'Capstone'
  surface: string
  context: string
  prompt: string
  expected: string
  validation: string[]
  references?: LabReference[]
}

export const labExercises: LabExercise[] = [
  {
    title: 'Prompt, reference context, and steer an inline suggestion',
    level: 'Guided',
    surface: 'VS Code Copilot Chat and inline suggestions; use only features available in your installed version.',
    context: 'Open TrainingTaskService.java and its focused tests. Use an answer-only chat without code-edit or terminal tools for the slash-command investigation when available; start from a clean disposable worktree and inspect it before and after. Use a separate temporary folder outside the repository for inline completion.',
    prompt: 'In VS Code Chat, type `/` and confirm the installed client offers `/explain` and `/tests`; if a command is absent, note that and consult the VS Code-specific references below instead of substituting a Copilot app command. For these requests, use an answer-only chat with code-edit and terminal tools disabled where the client supports that configuration. A no-edit prompt or Manual permissions alone is not a permission boundary; do not approve edit or run actions, and inspect tool activity and `git status --short` before and after. Step 1: open TrainingTaskService.java, place the cursor in updateStatus, invoke `/explain`, and ask: “Explain how this method validates and persists a status change. Trace the controller-to-service path, cite the relevant test, identify one uncovered boundary case, and do not edit files.” Step 2: select the method, invoke `/tests`, and ask: “Suggest one focused JUnit 5 test for the boundary case identified above. Show the test code as a proposal only; do not edit files or run commands.” Record the two actual responses and note whether the worktree stayed unchanged. For a separate inline-completion activity, create `inline-suggestions-practice.js` in a temporary folder outside the repository with `// Sum the numbers in the array. Return 0 for an empty array.` and `function sumNumbers(numbers) {}`. Place the cursor after `{`, press Enter, and pause. If no ghost text appears, run `Trigger Inline Suggestion` from the Command Palette. Inspect the suggestion; use Tab to accept, Escape to dismiss, or Ctrl+Right on Windows/Linux (Command+Right on macOS) to accept the next word. Alternatively, run `Accept Next Line Of Inline Suggestion` from the Command Palette. Complete the function. Append `console.log(sumNumbers([1, 2, 3])); // 6`, `console.log(sumNumbers([])); // 0`, and `console.log(sumNumbers([-2, 5])); // 3`. From the temporary folder, run `node inline-suggestions-practice.js` and compare the actual outputs with 6, 0, and 3. Separately, the GitHub Copilot app has its own commands—for example, `/plan` starts a plan in an app session and `/review` reviews session changes. Do not use those app commands as if they were VS Code commands.',
    expected: 'The `/explain` and `/tests` steps produce a source-anchored method explanation and a proposed JUnit 5 test without editing files; the learner records the actual responses and verifies the worktree. The inline activity produces an inspected suggestion in a temporary file, and the completed function is checked against the three expected sums without assuming Copilot returns identical code.',
    validation: [
      'Type `/` in VS Code Chat and confirm the current command list; command availability can vary by client version and context.',
      'Before and after the slash-command steps, inspect tool activity and `git status --short`; a no-edit prompt is not a security control.',
      'Trace the explanation through TrainingTaskController, TrainingTaskService, and the relevant test; reject claims unsupported by source.',
      'Check that the proposed test asserts observable behavior and matches the repository test conventions; keep it as a proposal for this read-only exercise.',
      'If you later add the test to the repository, inspect it and run the focused backend test before relying on it.',
      'Use the app-only reference to verify `/plan` and `/review`; do not transfer those commands across clients.',
      'Keep the completion scratch file outside the repository; record the actual suggestion disposition and Node.js output, and do not claim a result you did not run.',
      'Run `node inline-suggestions-practice.js` on the completed scratch file and verify outputs 6, 0, and 3.',
      'Inspect every accepted suggestion or inline edit; dismiss or revert inaccurate or unnecessary changes.'
    ],
    references: [
      { label: 'VS Code Copilot Chat slash-command cheat sheet', url: 'https://docs.github.com/en/copilot/reference/chat-cheat-sheet?tool=vscode' },
      { label: 'VS Code Chat, slash commands, and context', url: 'https://code.visualstudio.com/docs/chat/chat-overview' },
      { label: 'VS Code inline suggestions: trigger, accept, partially accept, and dismiss', url: 'https://code.visualstudio.com/docs/editing/ai-powered-suggestions' },
      { label: 'VS Code agent approvals and permissions', url: 'https://code.visualstudio.com/docs/agents/run/approvals' },
      { label: 'GitHub Copilot app-only sessions and slash commands', url: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions' },
      { label: 'GitHub Copilot app-only slash command reference', url: 'https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands' }
    ]
  },
  {
    title: 'Add a multi-file REST feature',
    level: 'Hands-on',
    surface: 'VS Code Agent or another Copilot coding feature that can edit this local repository; do not assume the same controls in the Copilot app or CLI.',
    context: 'Record the current baseline commit SHA, then create a disposable branch named `exercise-2-title-filter`. The unmodified GET /api/tasks baseline supports topic and status filters; this exercise adds a case-insensitive partial title filter on that branch. Leave the public static site and unauthenticated API deployment boundary unchanged.',
    prompt: 'Inspect the existing task API, service, repository, DTOs, and controller tests. Add an optional title query parameter to GET /api/tasks. Trim it; treat a blank value as absent; match title substrings without case sensitivity; and compose it with the current topic and status filters. Preserve the existing response shape, use parameterized Spring Data/JPA behavior, do not add dependencies, and do not add a UI. First list the files and tests you plan to change. After I review the plan, implement the smallest change and run the focused and full backend tests.',
    expected: 'The endpoint returns only tasks matching every supplied filter; omitted or blank title behaves like no title filter. Existing routes and response DTOs remain unchanged. The exact repository method design is up to the learner but must not concatenate user input into SQL.',
    validation: [
      'Add controller tests for title-only, case-insensitive partial match, blank title, no match, and title combined with topic/status.',
      'Run `cd backend` then `.\\mvnw.cmd test` after PostgreSQL is available as documented in README.md.',
      'Record the baseline commit SHA, reviewed plan, Copilot response, changed-file list, final diff, exact test command, and actual test output; mark anything not run as not run.',
      'Inspect the diff for SQL concatenation, duplicated filter logic, DTO changes, and unintended frontend or deployment edits.',
      'If a local API is running, verify GET /api/tasks?title=guide returns only matching task summaries.'
    ],
    references: [
      { label: 'Spring Data JPA query methods', url: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html' },
      { label: 'Project API and test instructions', url: 'https://github.com/sampath12082/copilot-field-guide/blob/main/overview.md' }
    ]
  },
  {
    title: 'Reproduce and debug a checklist-state regression test-first',
    level: 'Hands-on',
    surface: 'Local Java/Spring Boot repository in a disposable Git worktree; never make the intentionally broken change on a shared branch.',
    context: 'The service preserves completed checklist items when a PUT update keeps the checklist unchanged, resets completion when the checklist changes, and handles status-only PATCH in a separate method. A PUT update must include the existing steps to isolate a notes-only change. This exercise uses the current invariant; it does not claim that the published baseline has the bug.',
    prompt: 'In this disposable worktree, add three focused tests: (1) a notes-only PUT sends the task’s unchanged title, topic, objective, steps, and status plus changed notes, and preserves a completed checklist index; (2) a status-only PATCH preserves the same completed index as a control; and (3) a PUT that replaces the checklist resets completion. Run all three against the current implementation. Then temporarily change TrainingTaskService.update to clear completed steps unconditionally on every PUT, and rerun the tests: the notes-only PUT must fail, the status-only PATCH control must still pass because it uses updateStatus, and the changed-checklist case must pass. Record the failing assertion and trace the behavior through the controller and service. Restore the original conditional reset, rerun the tests, verify all pass, and do not commit the temporary mutation.',
    expected: 'On the baseline, all three tests pass. With the temporary mutation, only the notes-only PUT preservation test fails; the status-only PATCH control still passes and changing the checklist still resets completion. After restoring the conditional reset, all tests pass. The final diff contains tests only and no intentional defect.',
    validation: [
      'Create and work only in a disposable branch/worktree.',
      'Include the unchanged steps list in the notes-only PUT so the test isolates notes behavior; keep the status-only case as a separate PATCH control.',
      'Confirm the deliberate mutation affects PUT update, not PATCH updateStatus; record which assertion fails and which controls remain green.',
      'Record the observed baseline, mutation, and restored test outputs separately; the expected result is not a substitute for running the tests.',
      'Run the full backend suite, verify the temporary mutation is absent, and discard the worktree without merging it.'
    ],
    references: [
      { label: 'Project Java testing and checklist rules', url: 'https://github.com/sampath12082/copilot-field-guide/blob/main/.github/instructions/java.instructions.md' }
    ]
  },
  {
    title: 'Generate JUnit 5 boundary tests; refactoring is an instructor extension',
    level: 'Hands-on',
    surface: 'Local Spring Boot test suite using the repository conventions; use Mockito only where a focused unit test benefits from it.',
    context: 'Inspect TrainingTaskServiceTest and TrainingTaskControllerTest first. These tests run against the Spring Boot application and local PostgreSQL setup. The current service is intentionally small; refactoring is not part of the reproducible core exercise.',
    prompt: 'Review TrainingTaskService and its existing tests. Identify two meaningful untested boundaries in updateStatus or updateStep. Propose focused JUnit 5 tests that assert observable behavior, not private implementation details; after review, add them in a disposable branch. Use Mockito only if it makes an isolated unit test clearer than the existing integration-test pattern. Do not change production code for the core exercise. A separate refactoring extension may be assigned only when an instructor supplies a fixed repository/commit, target method, behavior contract, and baseline test command.',
    expected: 'The core exercise produces focused tests for actual boundary behavior without unnecessary mocks or production changes. Refactoring is clearly optional and reproducible only when its repository, commit, method, contract, and baseline checks are provided.',
    validation: [
      'Run the focused test class and then `cd backend` / `.\\mvnw.cmd test`.',
      'Capture the proposed tests, final diff, exact commands, and observed outputs; mark tests that could not be run as not run.',
      'Check assertions, setup/teardown, and whether mocks hide persistence or transaction behavior that the test should exercise.',
      'For an instructor-assigned refactor only, compare public behavior and rerun the same baseline tests before and after.'
    ],
    references: [
      { label: 'JUnit 5 user guide', url: 'https://junit.org/junit5/docs/current/user-guide/' },
      { label: 'Mockito documentation', url: 'https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html' }
    ]
  },
  {
    title: 'Review query safety and performance claims',
    level: 'Hands-on',
    surface: 'Spring Data JPA and PostgreSQL in this repository; query-plan work must use a local development database.',
    context: 'The unmodified baseline commit has only topic and status filters. Complete Exercise 2 first on `exercise-2-title-filter`, then compare that branch with the recorded baseline commit before reviewing title binding. Do not assume the baseline contains hand-written unsafe SQL or invent a performance problem.',
    prompt: 'Compare the baseline commit recorded before Exercise 2 with the `exercise-2-title-filter` branch. In the baseline, trace how user-supplied topic and status filters reach TrainingTaskRepository. On the feature branch, separately trace the newly added title filter and explain how it is bound. If the branch or baseline commit is unavailable, state that title filtering is not verified rather than describing it as implemented. If a candidate query appears slow, propose a local EXPLAIN-based measurement on representative test data; if no performance issue is evident, say so. Do not change schema, add indexes, or add raw SQL without showing the measured reason.',
    expected: 'A source-based comparison that identifies topic/status as baseline filters and title as an Exercise 2 branch addition, distinguishes parameterized repository behavior from string-built SQL, and makes a measured performance hypothesis—or explicitly says evidence does not justify tuning.',
    validation: [
      'Verify the baseline controller, service, and repository expose topic/status only; inspect the title parameter only on the Exercise 2 feature branch.',
      'Trace each available request parameter into its repository call and verify no SQL string concatenation is introduced.',
      'Use representative local-only data and a query plan before claiming a performance improvement.',
      'Record the source paths, query-plan evidence if applicable, exact test command, and observed result; do not describe an unrun measurement as a finding.',
      'Run backend tests and inspect result behavior for empty, long, and special-character filter values without using production data.'
    ],
    references: [
      { label: 'Spring Data JPA query methods', url: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html' },
      { label: 'Responsible use of Copilot Chat', url: 'https://docs.github.com/en/copilot/responsible-use/chat' }
    ]
  },
  {
    title: 'Optional instructor demo: inspect a read-only MCP tool',
    level: 'Guided',
    surface: 'Instructor-provided sandbox only: the course does not configure or demonstrate an MCP server or tool.',
    context: 'MCP servers and tool names are configuration-specific. This public course does not install or run an MCP server. Without an organization-approved, preconfigured sandbox and instructor demonstration, treat this as reference-only and skip the tool call.',
    prompt: 'If an instructor provides an approved sandbox, first record the exact server and issue-lookup tool name, its permitted data scope, and which write tools are unavailable. Use that preconfigured read-only tool to summarize the acceptance criteria and reported behavior of the supplied test issue. Cite the tool result, distinguish issue text from repository facts verified in source, and do not create comments, edit files, or change the issue. Do not install or enable a server for this exercise.',
    expected: 'Only an instructor-run sandbox demonstrates the integration: it records a named tool, its read scope, observed call/result, and confirmation that write actions are unavailable. Otherwise the learner records this topic as reference-only, not completed hands-on work.',
    validation: [
      'Confirm the server and exact tool name in the selected client; do not assume a generic MCP tool exists.',
      'Inspect the available tools and allowed scope; verify write actions are not exposed rather than trusting a “read-only” label.',
      'Record the actual tool call and result, then verify issue claims against the issue and repository source.',
      'Check organization approval; do not install or enable an unreviewed server. If no approved sandbox is provided, mark the demo not available.'
    ],
    references: [
      { label: 'Model Context Protocol (MCP) in Copilot', url: 'https://docs.github.com/en/copilot/concepts/customizations/mcp' },
      { label: 'Responsible use of agents', url: 'https://docs.github.com/en/copilot/responsible-use/agents' }
    ]
  },
  {
    title: 'Check data handling and access policy before prompting',
    level: 'Guided',
    surface: 'The current account, organization, Copilot plan, and client settings; use documentation rather than inferring policy from a UI label.',
    context: 'Use a non-sensitive sample repository. Do not paste credentials, customer information, or private source while investigating the applicable policy.',
    prompt: 'Before sending any prompt or starting a coding-agent session, identify whether this is an individual Copilot Free/Pro/Pro+/Max plan or a Business/Enterprise seat. Read the current model-training and public-code-matching policies, check account and organization settings, and verify repository access for the selected client and environment. Report the date and source for each claim. Separate model-training settings, public-code matching, tool permissions, and repository access; do not make a legal or compliance determination.',
    expected: 'A short table records the plan/account type, verified training control, public-code matching setting, repository/tool scope, and which context is safe to share. It notes that GitHub policy documentation says individual Free/Pro/Pro+/Max interactions may be used for training from April 24, 2026 unless opted out, while Business/Enterprise customer data are not used to train models; the learner verifies current settings rather than assuming.',
    validation: [
      'Check the current account and organization policy pages; document the plan and date instead of generalizing across plans.',
      'Verify model-training controls separately from public-code matching and tool/repository access.',
      'Exclude secrets and sensitive data from the exercise; ask the organization policy owner if the permitted context is unclear.',
      'Do not treat these policy checks as legal advice or proof that a specific prompt is compliant.'
    ],
    references: [
      { label: 'Copilot policies and model training', url: 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies' },
      { label: 'Responsible use of agents', url: 'https://docs.github.com/en/copilot/responsible-use/agents' },
      { label: 'Cloud sandbox isolation and billing', url: 'https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes' }
    ]
  },
  {
    title: 'Review a proposed change as a human reviewer',
    level: 'Hands-on',
    surface: 'A local Git diff and the GitHub pull-request workflow; Copilot review is supplemental to human review.',
    context: 'Use the feature branch from the REST filter exercise or a sandbox fork. Do not push to the upstream repository as part of this exercise.',
    prompt: 'Review only the current diff. Check request validation, authorization assumptions, parameterized data access, error handling, tests, secrets, dependency changes, and unrelated files. For every finding, cite a changed line and explain how to verify it. Separate confirmed defects from questions and false positives. Do not approve, commit, or merge.',
    expected: 'A prioritized, evidence-based review checklist with a human disposition for each finding; no blanket claim that generated code is secure or ready to merge.',
    validation: [
      'Reproduce each actionable finding against the code and tests.',
      'Run `git diff --check`, the focused test, and the full project checks.',
      'Record the exact diff reviewed, checks actually run, observed output, and disposition of each finding; distinguish a proposed review from an executed one.',
      'Inspect dependency and public-code-match settings using current organization policy; ask an administrator or legal reviewer for policy interpretation.',
      'For a real pull request, review CI results and the final diff yourself before deciding whether to merge.'
    ],
    references: [
      { label: 'Responsible use of agents', url: 'https://docs.github.com/en/copilot/responsible-use/agents' },
      { label: 'Copilot policies and model training', url: 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies' }
    ]
  },
  {
    title: 'Set up guidance and complete the capstone',
    level: 'Capstone',
    surface: 'A repository and one named Copilot client/feature whose support matrix has been checked.',
    context: 'Combine the project-setup module with the API-filter task. Use a disposable fork or local branch and a documented sample task.',
    prompt: 'Before editing, map the repository README, root/nested AGENTS.md files, .github/copilot-instructions.md, one .github/instructions/*.instructions.md file, the architecture overview, and any relevant skill. For each file, state its purpose, path scope, and support evidence for this client. Then propose the title-filter change, implement it only after plan review, add tests, and produce a human-review checklist.',
    expected: 'A bounded multi-file change using only applicable guidance, with passing tests, a reviewed diff, and an explanation of where each instruction did or did not apply.',
    validation: [
      'Run the frontend and backend checks documented in README.md.',
      'Check one matching and one non-matching path for scoped guidance.',
      'Record the client, mode, permissions, environment, context attachments, commands, and test outcomes.',
      'Save the actual plan, response, reviewed diff, test output, and human decisions; label unavailable evidence as not run or not available.',
      'Use the rubric below to assess correctness, tests, security, scope control, and ability to explain the final diff.'
    ],
    references: [
      { label: 'Copilot custom-instruction support matrix', url: 'https://docs.github.com/en/copilot/reference/custom-instructions-support' },
      { label: 'Agent skills and supported locations', url: 'https://docs.github.com/en/copilot/concepts/customizations/agent-skills' },
      { label: 'Repository architecture and API map', url: 'https://github.com/sampath12082/copilot-field-guide/blob/main/overview.md' }
    ]
  }
]

export const topicCoverage = [
  { topic: 'Natural-language prompt structure and code explanation', status: 'Guided and hands-on' },
  { topic: 'Slash commands, CLI commands, @participants, and #references', status: 'Reference-guided; VS Code # mentions are shown explicitly; syntax and availability vary by client' },
  { topic: 'Inline completions and partial acceptance', status: 'Guided reproducible scratch-file exercise; verify current controls in the linked VS Code guide' },
  { topic: 'Multi-file REST feature work', status: 'Hands-on exercise; capture the actual plan, diff, test command, and result' },
  { topic: 'Test-first regression debugging, JUnit 5, and Mockito', status: 'Hands-on exercises; capture observed failures, controls, restored results, and test output; log analysis is out of scope' },
  { topic: 'Refactoring with behavior-preserving checks', status: 'Optional instructor extension; requires a fixed repository, method, contract, and baseline test command' },
  { topic: 'SQL safety, parameterized access, and evidence-based tuning', status: 'Source review; run and record a local query plan only when evidence justifies measurement' },
  { topic: 'Agent roles, modes, approvals, and execution environment', status: 'Guided with current surface notes' },
  { topic: 'Model selection, Fusion, context attachments, and usage', status: 'Guided; confirm plan/client availability' },
  { topic: 'Instructions, repository context, and skills', status: 'Capstone; record support, discovery, inclusion signals, and observed adherence separately' },
  { topic: 'MCP tools and trust boundaries', status: 'Reference-only unless an instructor provides an approved, preconfigured sandbox demo' },
  { topic: 'PR workflow, security review, and human validation', status: 'Hands-on local diff review; no seeded vulnerability or hosted PR demo is included' },
  { topic: 'Log analysis and a seeded security flaw/fix', status: 'Out of scope; no log corpus or intentionally vulnerable sample is shipped' },
  { topic: 'Data handling, model-training policy, and sensitive context', status: 'Guided governance exercise; verify the account and organization settings' },
  { topic: 'Licensing, public-code matching, and compliance', status: 'Policy reference only; not legal advice' },
  { topic: 'Developer outcome measurement', status: 'Discussed as an evaluation method, not a productivity guarantee' },
  { topic: 'Install arbitrary MCP servers or change enterprise admin policy', status: 'Out of scope; requires organization review and environment-specific authorization' },
  { topic: 'Legal advice or organization-specific licensing determinations', status: 'Out of scope; consult current policy and the appropriate legal/compliance owner' },
  { topic: 'A complete, current UI walkthrough for every Copilot client and plan', status: 'Out of scope; use the linked support matrix and client documentation' },
  { topic: 'Productivity guarantees or universal ROI claims', status: 'Out of scope; evaluate comparable tasks with a documented baseline' },
  { topic: 'Production deployment of the unauthenticated task API', status: 'Out of scope; the public site is static and course-only by design' }
] as const

export const assessmentRubric = [
  { criterion: 'Task correctness', evidence: 'The endpoint behavior matches the prompt and edge cases.' },
  { criterion: 'Tests', evidence: 'Record the actual regression assertion, control results, exact commands, and outputs; mark unrun checks as not run.' },
  { criterion: 'Security and privacy', evidence: 'Input is handled safely, sensitive context is excluded, and tool permissions are appropriate.' },
  { criterion: 'Governance and policy', evidence: 'Plan-specific training, public-code matching, repository access, and tool permissions are checked separately against current account and organization settings.' },
  { criterion: 'Scope control', evidence: 'Only necessary files changed; no secrets, generated files, or unrelated dependencies were added.' },
  { criterion: 'Human review', evidence: 'The learner can explain each changed file and independently verify the final diff.' }
] as const

export const localValidationCommands = [
  'npm --prefix frontend test',
  'npm --prefix frontend run build',
  'cd backend; .\\mvnw.cmd test'
] as const
