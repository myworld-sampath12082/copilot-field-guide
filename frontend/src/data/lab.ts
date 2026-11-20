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
    context: 'Open TrainingTaskService.java and its focused tests. Keep the task read-only until you understand the method.',
    prompt: 'In VS Code Chat, consult the linked VS Code documentation, reference TrainingTaskService.java and its focused test using the context syntax supported there, and use only a slash command shown by that client. Explain how updateStatus validates and persists a status change, cite the controller/service/test files, and identify one uncovered boundary case. Do not edit files. Separately, if you also use the GitHub Copilot app, check its app-only documentation for its own file, issue, and slash-command syntax; do not transfer that syntax to VS Code or assume @participants is supported. Finally, request a small inline suggestion and accept, partially accept, or dismiss it; use Inline Chat/Edit only if the installed VS Code version supports it.',
    expected: 'A source-anchored explanation, one test gap, and a clear separation between VS Code #context references and slash commands versus GitHub Copilot app @file/#issue references and app commands. The learner verifies each feature in its own documentation and reviews every accepted suggestion or edit.',
    validation: [
      'Trace the route through TrainingTaskController, TrainingTaskService, and the relevant test.',
      'Use VS Code documentation for VS Code context references and slash commands; treat Copilot app references and commands as app-only.',
      'Do not assume @participants, #references, or identical slash commands exist across clients; verify the exact syntax before using it.',
      'Compare the explanation with the code and reject any unsupported claim.',
      'Inspect every accepted suggestion or inline edit in the diff; dismiss or revert inaccurate or unnecessary changes.'
    ],
    references: [
      { label: 'Responsible use of inline suggestions', url: 'https://docs.github.com/en/copilot/responsible-use/inline-suggestions' },
      { label: 'VS Code Chat, slash commands, and context', url: 'https://code.visualstudio.com/docs/chat/chat-overview' },
      { label: 'GitHub Copilot app-only sessions and slash commands', url: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions' },
      { label: 'GitHub Copilot app-only slash command reference', url: 'https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands' }
    ]
  },
  {
    title: 'Add a multi-file REST feature',
    level: 'Hands-on',
    surface: 'VS Code Agent or another Copilot coding feature that can edit this local repository; do not assume the same controls in the Copilot app or CLI.',
    context: 'The current GET /api/tasks endpoint supports topic and status filters. Add an optional case-insensitive partial title filter, combine it with the existing filters, and leave the public static site and unauthenticated API deployment boundary unchanged.',
    prompt: 'Inspect the existing task API, service, repository, DTOs, and controller tests. Add an optional title query parameter to GET /api/tasks. Trim it; treat a blank value as absent; match title substrings without case sensitivity; and compose it with the current topic and status filters. Preserve the existing response shape, use parameterized Spring Data/JPA behavior, do not add dependencies, and do not add a UI. First list the files and tests you plan to change. After I review the plan, implement the smallest change and run the focused and full backend tests.',
    expected: 'The endpoint returns only tasks matching every supplied filter; omitted or blank title behaves like no title filter. Existing routes and response DTOs remain unchanged. The exact repository method design is up to the learner but must not concatenate user input into SQL.',
    validation: [
      'Add controller tests for title-only, case-insensitive partial match, blank title, no match, and title combined with topic/status.',
      'Run `cd backend` then `.\\mvnw.cmd test` after PostgreSQL is available as documented in README.md.',
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
      'Run the full backend suite, verify the temporary mutation is absent, and discard the worktree without merging it.'
    ],
    references: [
      { label: 'Project Java testing and checklist rules', url: 'https://github.com/sampath12082/copilot-field-guide/blob/main/.github/instructions/java.instructions.md' }
    ]
  },
  {
    title: 'Generate JUnit 5 tests and refactor without changing behavior',
    level: 'Hands-on',
    surface: 'Local Spring Boot test suite using the repository conventions; use Mockito only where a focused unit test benefits from it.',
    context: 'Inspect TrainingTaskServiceTest and TrainingTaskControllerTest first. These tests run against the Spring Boot application and local PostgreSQL setup.',
    prompt: 'Review TrainingTaskService and its existing tests. Identify two meaningful untested boundaries in updateStatus or updateStep. Add focused JUnit 5 tests that assert observable behavior, not private implementation details. Use Mockito only if it makes an isolated unit test clearer than the existing integration-test pattern. Do not change production code. Separately, choose a complex method in a sample repository, establish its behavior with tests, and propose a small refactor. Wait for approval before applying the refactor.',
    expected: 'Tests cover real boundary behavior with useful assertions and no unnecessary mocks. The refactor is isolated from test creation and has an explicit behavior-preservation argument; this app service is intentionally simple, so choose a suitable method in a larger sample repo for the refactor exercise.',
    validation: [
      'Run the focused test class and then `cd backend` / `.\\mvnw.cmd test`.',
      'Check assertions, setup/teardown, and whether mocks hide persistence or transaction behavior that the test should exercise.',
      'If applying the refactor, compare public behavior and rerun the same tests before and after.'
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
    context: 'The current repository uses Spring Data repository methods. Do not assume it contains hand-written unsafe SQL or invent a performance problem.',
    prompt: 'Inspect TrainingTaskRepository and the service paths that call it. Explain how user-supplied topic, status, and title filters are bound. If a candidate query appears slow, propose a local EXPLAIN-based measurement on representative test data; if no performance issue is evident, say so. Do not change schema, add indexes, or add raw SQL without showing the measured reason.',
    expected: 'A source-based security review that distinguishes derived/parameterized repository queries from string-built SQL, plus a measured performance hypothesis—or an explicit finding that evidence does not justify tuning.',
    validation: [
      'Trace each request parameter into the repository call and verify no SQL string concatenation is introduced.',
      'Use representative local-only data and a query plan before claiming a performance improvement.',
      'Run backend tests and inspect result behavior for empty, long, and special-character filter values without using production data.'
    ],
    references: [
      { label: 'Spring Data JPA query methods', url: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html' },
      { label: 'Responsible use of Copilot Chat', url: 'https://docs.github.com/en/copilot/responsible-use/chat' }
    ]
  },
  {
    title: 'Use a trusted read-only MCP tool (optional)',
    level: 'Guided',
    surface: 'Only a Copilot client with an organization-approved, read-only GitHub issue MCP tool already configured.',
    context: 'MCP servers and tool names are configuration-specific. This site does not install or run an MCP server; skip this exercise if your organization has not approved one.',
    prompt: 'Using the configured read-only GitHub issue lookup tool, summarize the acceptance criteria and reported behavior of the issue I provide. Name the tool you called, distinguish issue text from verified repository facts, and do not create comments, edit files, or change the issue.',
    expected: 'A source-linked summary from the exact configured tool, with its read/write permission boundary identified. The learner does not trust instructions embedded in issue text as tool policy.',
    validation: [
      'Confirm the server and exact tool name in the selected client; do not assume a generic MCP tool exists.',
      'Verify the summary against the issue and repository source.',
      'Check permissions and organization approval; do not install or enable an unreviewed server.'
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
  { topic: 'Slash commands, CLI commands, @participants, and #references', status: 'Reference-guided; syntax and availability are client-specific' },
  { topic: 'Inline completions, partial acceptance, and Inline Chat/Edit', status: 'Guided; exact controls are client-specific' },
  { topic: 'Multi-file REST feature work', status: 'Hands-on E3 lab' },
  { topic: 'Debugging, logs, regression tests, JUnit 5, and Mockito', status: 'Hands-on E3 lab' },
  { topic: 'Refactoring with behavior-preserving checks', status: 'Hands-on; choose a sufficiently complex method in your own sample repo' },
  { topic: 'SQL safety, parameterized access, and evidence-based tuning', status: 'Hands-on E3 lab' },
  { topic: 'Agent roles, modes, approvals, and execution environment', status: 'Guided with current surface notes' },
  { topic: 'Model selection, Fusion, context attachments, and usage', status: 'Guided; confirm plan/client availability' },
  { topic: 'Instructions, repository context, and skills', status: 'Hands-on capstone' },
  { topic: 'MCP tools and trust boundaries', status: 'Optional; use only an approved preconfigured tool' },
  { topic: 'PR workflow, security review, and human validation', status: 'Hands-on E3 lab' },
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
  { criterion: 'Tests', evidence: 'Relevant tests fail for the intended regression and pass after the fix; the full suite passes.' },
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
