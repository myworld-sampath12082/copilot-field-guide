export type LessonSection = 'Project setup' | 'Copilot workflow'

type Scenario = {
  context: string
  youDo: string
  copilotMayDo: string
  review: string
}

type VisualStep = {
  title: string
  detail: string
}

export type LessonVisual =
  | {
      kind: 'steps'
      title: string
      steps: VisualStep[]
      caption: string
    }
  | {
      kind: 'comparison'
      title: string
      items: VisualStep[]
      caption: string
    }
  | {
      kind: 'tree'
      title: string
      lines: Array<VisualStep & { depth: 0 | 1 | 2 }>
      caption: string
    }
  | {
      kind: 'code-match'
      title: string
      code: string
      matches: string[]
      doesNotMatch: string[]
      caption: string
    }
  | {
      kind: 'architecture'
      title: string
      nodes: VisualStep[]
      caption: string
    }
  | {
      kind: 'screenshots'
      title: string
      images: Array<{ src: string; alt: string; label: string }>
      caption: string
    }

export type Lesson = {
  slug: string
  section: LessonSection
  title: string
  shortTitle: string
  summary: string
  explanation: string
  scenario: Scenario
  caveat: string
  visual: LessonVisual
  check: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
  slides: number[]
}

export const sourceSlides = [
  { number: 1, title: 'Project Setup Files for AI Coding Assistants', summary: 'Course opening and the setup-file topics.' },
  { number: 2, title: 'Meet Your Trainer', summary: 'Trainer introduction and program goals.' },
  { number: 3, title: 'Session Modes', summary: 'Interactive, Plan, and Autopilot collaboration modes.' },
  { number: 4, title: 'Agent Selection', summary: 'Ask, Agent, and custom agent roles.' },
  { number: 5, title: 'Tool Permissions', summary: 'Manual approval, Assisted, and Allow all permission settings.' },
  { number: 6, title: 'Where Tasks Run', summary: 'Local machine, GitHub Environments, and Dev Tunnels.' },
  { number: 7, title: 'Models and Copilot Fusion', summary: 'Choosing an individual model or using Copilot Fusion.' },
  { number: 8, title: 'Prompt Attachments', summary: 'Adding files, folders, and work-item context to a prompt.' },
  { number: 9, title: 'Dictation in VS Code', summary: 'Speech-to-text behavior on desktop and the web.' },
  { number: 10, title: 'Usage and Status', summary: 'Account usage, suggestions, semantic index, and session sync.' },
  { number: 11, title: 'Why Setup Files Matter', summary: 'How accessible project context can guide and validate a task.' },
  { number: 12, title: 'Where Each Setup File Fits', summary: 'A role for each project reference and instruction type.' },
  { number: 13, title: 'Repository Instruction Files', summary: 'AGENTS.md and Copilot instruction scope and support.' },
  { number: 14, title: 'Path-Specific Instructions', summary: 'Matching scoped rules and supplying architecture context.' },
  { number: 15, title: 'Skills: Procedures Loaded On Demand', summary: 'Skill folders, SKILL.md, and conditional availability.' },
  { number: 16, title: 'Project Setup Sequence', summary: 'Combining project references, instructions, and repeatable procedures.' },
  { number: 17, title: 'Thank You', summary: 'Closing takeaway about supported guidance files.' }
] as const

const lessonContent: Lesson[] = [
  {
    slug: 'why-setup-files',
    section: 'Project setup',
    title: 'Why setup files matter',
    shortTitle: 'Why setup files?',
    summary: 'Give an assistant project context it can use and a clear way to validate changes.',
    explanation: 'A new task starts with the files and context available to that session. Supported instructions and skills may load automatically when enabled. When relevant guidance is in context, an agent can use documented build, test, naming, and architecture details instead of inferring them from scratch. Guidance helps; it does not guarantee a correct result.',
    scenario: {
      context: 'Illustrative scenario: you ask for a new endpoint in an unfamiliar service.',
      youDo: 'Point to the relevant project area and check the README, applicable instructions, and architecture overview before asking for the change.',
      copilotMayDo: 'Use accessible build and test commands, file conventions, or data-flow notes while proposing a plan and edits.',
      review: 'Confirm the guidance applies to this feature and folder, inspect the diff, and run the documented checks yourself.'
    },
    caveat: 'Instruction support depends on the Copilot feature, file type, settings, and task context. An assistant only has the guidance available to its selected session and feature.',
    visual: {
      kind: 'steps',
      title: 'Context supports a reviewable workflow',
      steps: [
        { title: 'Open a task', detail: 'The session has a workspace and prompt.' },
        { title: 'Use available guidance', detail: 'Supported files can add project rules and references.' },
        { title: 'Propose or make a change', detail: 'The selected feature and mode shape the work.' },
        { title: 'Validate and review', detail: 'Use the repo checks and inspect the result.' }
      ],
      caption: 'Guidance informs the work; it does not replace checking the code or running tests.'
    },
    check: {
      question: 'Does adding a setup file guarantee every Copilot feature will read it?',
      options: ['Yes. All features read every Markdown file in the repository.', 'No. File support and scope depend on the feature, settings, and task context.'],
      correctAnswer: 1,
      explanation: 'The deck explicitly qualifies instruction support by feature, file type, settings, and context.'
    },
    slides: [11]
  },
  {
    slug: 'readme',
    section: 'Project setup',
    title: 'README.md: a human-friendly starting point',
    shortTitle: 'README.md',
    summary: 'Explain what the project is and how a person can set it up, run it, and test it.',
    explanation: 'The README is the project overview for people: purpose, prerequisites, setup, run, and test steps. It can also provide useful context to an assistant when the file is available in the task, but the deck does not describe README.md as a special instruction format.',
    scenario: {
      context: 'Illustrative scenario: a teammate needs to run the application and verify a change.',
      youDo: 'Read the prerequisites and copy the documented startup and test commands into your task context if needed.',
      copilotMayDo: 'Use those commands when it proposes how to validate a change, if the README is available to the session.',
      review: 'Check that commands still match package files and scripts; do not assume the README is current.'
    },
    caveat: 'A README is documentation, not a guarantee that a command will run in every environment. Check the actual project and local prerequisites.',
    visual: {
      kind: 'steps',
      title: 'The README answers the first four questions',
      steps: [
        { title: 'Purpose', detail: 'What does this project do?' },
        { title: 'Setup', detail: 'What tools and prerequisites are needed?' },
        { title: 'Run', detail: 'How do I start it locally?' },
        { title: 'Test', detail: 'How do I check a proposed change?' }
      ],
      caption: 'The deck places project purpose, setup, run, and test steps in the README.'
    },
    check: {
      question: 'Where should a new contributor look first for the documented test command?',
      options: ['README.md', 'A random path-specific instruction file', 'The Copilot model picker'],
      correctAnswer: 0,
      explanation: 'The deck identifies README.md as the place for project overview and setup, run, and test steps.'
    },
    slides: [12, 16]
  },
  {
    slug: 'agents-md',
    section: 'Project setup',
    title: 'AGENTS.md: agent instructions with location-based scope',
    shortTitle: 'AGENTS.md',
    summary: 'Record standing agent rules, while checking which file is nearest to the work.',
    explanation: 'AGENTS.md can hold standing agent instructions such as build commands, conventions, and boundaries. In supported features, scope depends on repository location: the nearest applicable AGENTS.md in the repository tree matters. A root file is not automatically the only scope, and every Copilot feature may not support this file.',
    scenario: {
      context: 'Illustrative scenario: a repository has a root AGENTS.md and another under backend/.',
      youDo: 'Before asking for a Java change, check the instructions nearest to the target file and confirm the current Copilot feature supports AGENTS.md.',
      copilotMayDo: 'Use applicable agent instructions in its context, such as a test command or a boundary not to edit generated code.',
      review: 'Check the file location, nested instructions, feature support, and actual diff.'
    },
    caveat: 'AGENTS.md scope depends on repository location and feature support. Do not treat every AGENTS.md as repository-wide.',
    visual: {
      kind: 'tree',
      title: 'A nested file can narrow the instructions',
      lines: [
        { depth: 0, title: 'AGENTS.md', detail: 'Instructions for supported work under the repository root.' },
        { depth: 1, title: 'backend/', detail: 'A project area with its own local guidance.' },
        { depth: 2, title: 'AGENTS.md', detail: 'Nearest instructions for work inside backend/ when supported.' },
        { depth: 2, title: 'src/main/…', detail: 'A Java file whose applicable guidance should be checked.' }
      ],
      caption: 'The deck describes the nearest AGENTS.md in the repository tree for supported features.'
    },
    check: {
      question: 'A Java file is inside backend/, which contains its own AGENTS.md. What should you check?',
      options: ['Only the root file; every AGENTS.md is global.', 'The nearest applicable file and whether the selected Copilot feature supports AGENTS.md.'],
      correctAnswer: 1,
      explanation: 'AGENTS.md scope depends on repository location, and file support differs by Copilot feature.'
    },
    slides: [12, 13, 16]
  },
  {
    slug: 'copilot-instructions',
    section: 'Project setup',
    title: '.github/copilot-instructions.md: repository-wide Copilot guidance',
    shortTitle: 'Copilot instructions',
    summary: 'Keep Copilot-specific standing guidance separate from AGENTS.md.',
    explanation: '.github/copilot-instructions.md is for Copilot-specific standing rules. The deck describes its scope as repository-wide guidance for requests made in the context of that repository, where the Copilot feature supports the file. It is related to AGENTS.md, but the two formats and their support are not interchangeable assumptions.',
    scenario: {
      context: 'Illustrative scenario: contributors want supported Copilot requests in this repository to know a shared test command and a generated-files boundary.',
      youDo: 'Put concise Copilot-specific rules in this file and confirm the selected client or feature supports it.',
      copilotMayDo: 'Apply the repository guidance when a request is made in the repository context and the file is included.',
      review: 'Verify the request is in the right repository context, then check whether the proposed command and boundaries match the code.'
    },
    caveat: 'The slide calls this repository-wide Copilot guidance, but explicitly says support varies by feature. Confirm the support matrix for the client you use.',
    visual: {
      kind: 'comparison',
      title: 'Related guidance, distinct scopes',
      items: [
        { title: 'AGENTS.md', detail: 'Agent instructions; location in the repository tree affects scope.' },
        { title: '.github/copilot-instructions.md', detail: 'Repository-wide Copilot guidance for supported features and repository-context requests.' },
        { title: 'Feature support', detail: 'Check the selected Copilot feature before relying on either file.' }
      ],
      caption: 'This comparison follows the distinctions and qualifications on slide 13.'
    },
    check: {
      question: 'Which statement best matches the deck?',
      options: ['AGENTS.md and copilot-instructions.md always have identical scope.', 'They serve related but distinct guidance roles; feature support must be checked.'],
      correctAnswer: 1,
      explanation: 'Slide 13 distinguishes the files and cautions that support varies by feature.'
    },
    slides: [12, 13, 16]
  },
  {
    slug: 'path-specific',
    section: 'Project setup',
    title: 'Path-specific instructions: rules for matching files',
    shortTitle: 'Path-specific rules',
    summary: 'Use an applyTo pattern to target a file type, then confirm the feature honors it.',
    explanation: 'Files under .github/instructions/ can use frontmatter such as applyTo to target matching paths. The pattern controls which paths match; it is not a general rule for every file. A reference document supplies context when the agent reads it. Both behaviors depend on support in the Copilot feature you use.',
    scenario: {
      context: 'Illustrative example from slide 14: a Java-specific instruction file targets Java source paths.',
      youDo: 'Write a narrow applyTo pattern, then ask for a change to a matching Java file. Adapt the example rules to the real project.',
      copilotMayDo: 'Use matched rules if the feature supports path-specific instructions and includes them in its context.',
      review: 'Test the glob against the target path, check feature support, and verify any technical rule against the codebase.'
    },
    caveat: 'The deck example mentions SQL Server and SNS/SQS; these are illustrative examples, not claims about this demo app or every project.',
    visual: {
      kind: 'code-match',
      title: 'Example pattern from the deck',
      code: '---\napplyTo: "**/*.java"\n---\n# Java rules (illustrative)\n- Use constructor injection in Spring Boot beans.\n- Use parameterised queries for SQL Server.\n- Publish events through the shared SNS/SQS helper.',
      matches: ['backend/src/main/java/TaskService.java', 'src/test/java/TaskServiceTest.java'],
      doesNotMatch: ['frontend/src/App.tsx', 'README.md'],
      caption: 'The example is illustrative. Confirm glob behavior and actual project conventions in your Copilot feature.'
    },
    check: {
      question: 'With applyTo: \"**/*.java\", which path is intended to match?',
      options: ['frontend/src/App.tsx', 'backend/src/main/java/TaskService.java', 'README.md'],
      correctAnswer: 1,
      explanation: 'The pattern targets Java files. Check the matching behavior in the feature you use.'
    },
    slides: [12, 14, 16]
  },
  {
    slug: 'architecture-overview',
    section: 'Project setup',
    title: 'Architecture overview: explain boundaries and data flow',
    shortTitle: 'Architecture overview',
    summary: 'Describe components, queues, data flow, and database ownership for tasks that need it.',
    explanation: 'An architecture overview such as docs/architecture/overview.md can explain components, data flow, queues, and database ownership. It is a reference document: it supplies context when the task needs it and the agent reads it. The diagram and prose should be checked against the current code.',
    scenario: {
      context: 'Illustrative scenario: a change crosses the browser, API, and persistence layers.',
      youDo: 'Read the overview and identify which component owns the behavior before requesting edits.',
      copilotMayDo: 'Use the documented flow to locate relevant files or explain likely boundaries if that document is available in context.',
      review: 'Trace the behavior in source code and confirm the diagram, database ownership, and API routes are current.'
    },
    caveat: 'A reference document does not automatically apply to every task. The deck says it helps when the task needs it and the agent reads it.',
    visual: {
      kind: 'architecture',
      title: 'Example flow in this learning app',
      nodes: [
        { title: 'React UI', detail: 'Shows learning content and submits task actions.' },
        { title: 'Spring Boot API', detail: 'Handles task requests and validation.' },
        { title: 'PostgreSQL', detail: 'Persists training tasks and progress.' }
      ],
      caption: 'This is a simplified map of this demo app; use its source and overview document to verify details.'
    },
    check: {
      question: 'When is an architecture overview useful to an assistant?',
      options: ['Only when the task needs it and the document is read or included in context.', 'It is automatically loaded for every task in every feature.'],
      correctAnswer: 0,
      explanation: 'The deck says a reference document supplies context when the agent reads it.'
    },
    slides: [12, 14, 16]
  },
  {
    slug: 'skills',
    section: 'Project setup',
    title: 'Skills: reusable procedures loaded when relevant',
    shortTitle: 'Skills',
    summary: 'Package a repeatable workflow in a SKILL.md folder with optional supporting assets.',
    explanation: 'A skill is a folder with a SKILL.md file containing YAML frontmatter and a procedure. Optional scripts, references, or assets can support it. Repository skills may live under .github/skills/ and personal skills under ~/.copilot/skills/. A feature that supports agent skills can load a skill when it is relevant; availability is not universal.',
    scenario: {
      context: 'Illustrative scenario: the team repeats the same release-readiness checks before each release.',
      youDo: 'Create a focused SKILL.md with a name, a description that explains when it applies, and ordered review steps.',
      copilotMayDo: 'Load and follow the procedure when a relevant request is made in a feature that supports skills.',
      review: 'Check the frontmatter, trigger description, each procedure step, and any scripts or templates before relying on the result.'
    },
    caveat: 'Skill availability depends on the Copilot feature. A skill is not guaranteed to load for unrelated tasks.',
    visual: {
      kind: 'tree',
      title: 'A skill folder can keep procedure and support files together',
      lines: [
        { depth: 0, title: '.github/skills/release-checklist/', detail: 'Repository skill example from the deck.' },
        { depth: 1, title: 'SKILL.md', detail: 'Name, description, and steps.' },
        { depth: 1, title: 'scripts/', detail: 'Optional helper scripts.' },
        { depth: 1, title: 'references/', detail: 'Optional longer reference material.' },
        { depth: 1, title: 'assets/', detail: 'Optional templates.' }
      ],
      caption: 'The folder layout and release-checklist example come from slide 15.'
    },
    check: {
      question: 'What makes a procedure a skill in the deck’s description?',
      options: ['A folder with SKILL.md and YAML frontmatter, available where agent skills are supported.', 'Any Markdown file, loaded by every Copilot feature for every request.'],
      correctAnswer: 0,
      explanation: 'The deck describes a skill folder and SKILL.md frontmatter, and qualifies availability by feature support.'
    },
    slides: [12, 15, 16]
  },
  {
    slug: 'putting-it-together',
    section: 'Project setup',
    title: 'Put the project references together',
    shortTitle: 'Setup sequence',
    summary: 'Use each file for its intended audience and scope instead of duplicating every rule.',
    explanation: 'The deck’s setup sequence assigns each project file a different job: README for purpose and commands; AGENTS.md for standing agent rules; path-specific instructions for matching files; architecture docs for components and data flow; and skills for repeatable procedures. Copilot uses only project files and capabilities available to the selected feature and session.',
    scenario: {
      context: 'Illustrative scenario: a new team wants contributors and supported Copilot features to understand a service.',
      youDo: 'Start with setup/run/test documentation, add concise standing rules, scope specialized rules, document architecture, and package repeated procedures as skills.',
      copilotMayDo: 'Use only the applicable, supported files available in the session while helping with a task.',
      review: 'Remove contradictions, verify paths and commands, check feature support, and compare architecture notes with the code.'
    },
    caveat: 'The sequence is a documentation pattern, not a promise that every file is automatically loaded or supported on every Copilot surface.',
    visual: {
      kind: 'steps',
      title: 'A project setup sequence',
      steps: [
        { title: 'README.md', detail: 'Purpose, setup, run, and test commands.' },
        { title: 'AGENTS.md', detail: 'Standing agent rules and links to useful references.' },
        { title: 'Scoped instructions', detail: 'Rules for matching Java, SQL, or test paths.' },
        { title: 'Architecture docs', detail: 'Components, queues, data flow, and database ownership.' },
        { title: 'Skills', detail: 'Repeatable procedures such as release checks.' }
      ],
      caption: 'This sequence summarizes slide 16; file support still depends on the selected feature and session.'
    },
    check: {
      question: 'Which is the most accurate takeaway from the setup sequence?',
      options: ['Every project file is loaded for every Copilot request.', 'Use each file for its purpose and rely only on files and capabilities available to the selected feature and session.'],
      correctAnswer: 1,
      explanation: 'Slide 16 makes file roles distinct and states that Copilot uses only project files and capabilities available to the selected feature and session.'
    },
    slides: [1, 12, 16, 17]
  },
  {
    slug: 'session-modes',
    section: 'Copilot workflow',
    title: 'Session modes: choose how collaboration proceeds',
    shortTitle: 'Session modes',
    summary: 'Interactive, Plan, and Autopilot describe how the task proceeds, not tool permission levels.',
    explanation: 'Interactive pauses for your input as you work together. Plan researches and prepares a plan for you to review before execution. Autopilot works autonomously through edits, tool use, and validation, subject to permissions and policy. Session mode and tool permissions are separate controls.',
    scenario: {
      context: 'Illustrative scenario: you want a refactor, but first need to understand its scope.',
      youDo: 'Choose Plan to review a proposed sequence before execution, or Interactive when you want to guide each step.',
      copilotMayDo: 'Research and prepare a plan, pause for input, or proceed autonomously depending on the selected mode.',
      review: 'Read the plan or diff and remember that Autopilot remains subject to permissions and policy.'
    },
    caveat: 'Available mode labels and behavior can depend on the Copilot client and configuration. Mode does not by itself grant tool permissions.',
    visual: {
      kind: 'screenshots',
      title: 'Mode choices shown in the presentation',
      images: [{ src: '/deck/slide-03.png', alt: 'Copilot mode menu showing Interactive, Plan, and Autopilot, with Autopilot selected.', label: 'Slide 3 · Session Modes' }],
      caption: 'Screenshot from the presentation. Autopilot is shown as working within permissions.'
    },
    check: {
      question: 'What does Plan mode change according to the deck?',
      options: ['It prepares a plan for you to review before execution.', 'It automatically allows every tool without approval.'],
      correctAnswer: 0,
      explanation: 'Plan is described as research and plan preparation. Permissions are a separate control.'
    },
    slides: [3]
  },
  {
    slug: 'agent-selection',
    section: 'Copilot workflow',
    title: 'Agent selection: choose a role for the task',
    shortTitle: 'Agent selection',
    summary: 'Ask is read-only research; Agent can edit and validate; custom profiles depend on setup.',
    explanation: 'The agent picker selects a role. Ask answers questions and researches with read-only tools; it does not edit files or run state-changing commands. Agent can find relevant code, edit files, run commands, and validate changes. Custom agents may have specialized instructions and tools, depending on your setup. The session mode controls how the session proceeds.',
    scenario: {
      context: 'Illustrative scenario: first investigate a failing test, then decide whether a code change is needed.',
      youDo: 'Use Ask for read-only investigation. If you want an implementation, choose a role that can edit and specify what should be changed.',
      copilotMayDo: 'Ask can explain findings without changing state; Agent can propose edits, run commands, and validate.',
      review: 'Check the selected role, tools used, changes, and validation output. Redirect the work when needed.'
    },
    caveat: 'Custom agent profiles and their tools depend on your setup. Agent role is separate from session mode and tool permissions.',
    visual: {
      kind: 'screenshots',
      title: 'Role picker shown in the presentation',
      images: [{ src: '/deck/slide-04.png', alt: 'Agent picker showing Agent, Ask, and a list of custom agent profiles.', label: 'Slide 4 · Agent Selection' }],
      caption: 'The picker selects a role; the mode controls how the session proceeds.'
    },
    check: {
      question: 'Which role does the deck describe as read-only?',
      options: ['Ask', 'Agent', 'A custom agent in every setup'],
      correctAnswer: 0,
      explanation: 'Ask uses read-only tools and does not edit files or run state-changing commands.'
    },
    slides: [4]
  },
  {
    slug: 'tool-permissions',
    section: 'Copilot workflow',
    title: 'Tool permissions: decide when approval is requested',
    shortTitle: 'Tool permissions',
    summary: 'Permission settings control approval prompts and remain separate from session mode.',
    explanation: 'Manual approval asks before using a tool that requires permission. Assisted lets a model assess eligible requests, approving those it judges safe and asking about requests that still need approval. Allow all runs tools without asking each time, but organization policy or the session environment can restrict it. Permissions are separate from the selected mode.',
    scenario: {
      context: 'Illustrative scenario: an autonomous session wants to run a command that changes files.',
      youDo: 'Choose a permission setting that matches your risk tolerance and inspect any request that still asks for approval.',
      copilotMayDo: 'Ask, be assisted, or run without asking for each approval, depending on the setting and applicable policy.',
      review: 'Read the command and its likely effects before approving; confirm organization and environment restrictions.'
    },
    caveat: 'Assisted approval applies to eligible requests and relies on a model assessment. Allow all may be restricted by organization policy or the environment.',
    visual: {
      kind: 'screenshots',
      title: 'Permission choices shown in the presentation',
      images: [{ src: '/deck/slide-05.png', alt: 'Permissions menu showing Manual permissions, Assisted permissions, and Allow all.', label: 'Slide 5 · Tool Permissions' }],
      caption: 'The screenshot distinguishes permission settings from the session mode.'
    },
    check: {
      question: 'Does selecting Autopilot automatically mean Allow all?',
      options: ['Yes. Mode and permissions are one setting.', 'No. Mode and tool permissions are separate controls.'],
      correctAnswer: 1,
      explanation: 'The presentation states that session mode and tool permissions are separate.'
    },
    slides: [5]
  },
  {
    slug: 'task-environments',
    section: 'Copilot workflow',
    title: 'Where tasks run: identify the host and project folder',
    shortTitle: 'Task environment',
    summary: 'Local machine, GitHub Environments, and Dev Tunnels use different hosts and access paths.',
    explanation: 'The environment determines which host and project folder the agent uses. A local session uses a folder on the current computer and its available tools. GitHub Environments can continue sessions across supported Copilot clients after registering a development machine; this feature is in preview. Dev Tunnels connect a session to a remote host through an active tunnel and require sign-in on the tunnel.',
    scenario: {
      context: 'Illustrative scenario: you want a session to use a development host that is not your current computer.',
      youDo: 'Select the supported remote environment, confirm the repository folder, and verify the host or tunnel is available and authenticated.',
      copilotMayDo: 'Work on the selected host and folder, rather than the current machine.',
      review: 'Check host identity and project path. Keep a remote host online and reachable; sign in to a Dev Tunnel.'
    },
    caveat: 'GitHub Environments are in preview in the deck. Remote sessions depend on the selected host, folder, and connectivity.',
    visual: {
      kind: 'screenshots',
      title: 'Environment choices shown in the presentation',
      images: [{ src: '/deck/slide-06.png', alt: 'Environment menu showing Local machine, GitHub Environments marked Preview, and Dev Tunnels.', label: 'Slide 6 · Where Tasks Run' }],
      caption: 'GitHub Environments are marked Preview in the presentation; Dev Tunnels require sign-in.'
    },
    check: {
      question: 'What should you verify before a remote session?',
      options: ['The selected host and project folder are correct and the host is reachable.', 'Only the model name; host and folder do not matter.'],
      correctAnswer: 0,
      explanation: 'The deck says remote sessions use the selected host and folder and that the host must remain online and reachable.'
    },
    slides: [6]
  },
  {
    slug: 'models-and-fusion',
    section: 'Copilot workflow',
    title: 'Models and Copilot Fusion: choose or coordinate models',
    shortTitle: 'Models & Fusion',
    summary: 'Select an individual model or use Fusion when available, and keep usage in view.',
    explanation: 'You can choose an individual model when you need its capabilities or want to compare usage. Available models depend on plan, client, and organization policy. Copilot Fusion can select one model or coordinate multiple models and workflows. Standard, High, and Max effort levels are available when offered to your account. Fusion can use multiple model calls, so check the current plan and usage details.',
    scenario: {
      context: 'Illustrative scenario: compare approaches for a multi-step task with an account that offers both model selection and Fusion.',
      youDo: 'Choose a specific model if you need to target its capabilities, or choose Fusion if you want it to select or coordinate models. Check the offered effort levels.',
      copilotMayDo: 'Use the selected model or, with Fusion, select one or coordinate multiple models and workflows.',
      review: 'Check which options your account actually offers, review the result, and monitor current plan and usage details.'
    },
    caveat: 'Model availability and effort levels depend on plan, client, and organization policy. Fusion may use multiple calls; it is not a promise of a particular result or usage amount.',
    visual: {
      kind: 'screenshots',
      title: 'Model and Fusion controls shown in the presentation',
      images: [
        { src: '/deck/slide-07-models.png', alt: 'Model picker showing Copilot Fusion and model choices, some marked as requiring an upgrade.', label: 'Slide 7 · Model picker' },
        { src: '/deck/slide-07-fusion.png', alt: 'Copilot Fusion settings showing Standard, High, and Max effort levels, with Standard selected.', label: 'Slide 7 · Fusion effort' }
      ],
      caption: 'Screenshots show one account at capture time. Availability and controls can vary.'
    },
    check: {
      question: 'What should you remember when using Copilot Fusion?',
      options: ['It always uses exactly one model call.', 'It may coordinate multiple models and workflows, so check current plan and usage details.'],
      correctAnswer: 1,
      explanation: 'The deck states Fusion can use multiple model calls and recommends checking plan and usage.'
    },
    slides: [7]
  },
  {
    slug: 'prompt-attachments',
    section: 'Copilot workflow',
    title: 'Prompt attachments: add relevant project or work-item context',
    shortTitle: 'Prompt attachments',
    summary: 'Attach files or folders and, where available, issues, pull requests, or sessions.',
    explanation: 'The attachment picker can add repository files and folders as prompt context. It may also offer issues, pull requests, or sessions. The available options vary by client and context. Attachments supply context; review the selected items before sending so the request includes the information you intend.',
    scenario: {
      context: 'Illustrative scenario: ask for a fix related to a reported bug and a specific source file.',
      youDo: 'Attach the relevant issue and source file if those picker options are available, then confirm each selected item.',
      copilotMayDo: 'Use attached material as prompt context when handling your request.',
      review: 'Remove unrelated or sensitive attachments and verify the final selection before sending.'
    },
    caveat: 'Issue, pull request, and session choices depend on the current client and context. Do not assume every picker option is present.',
    visual: {
      kind: 'screenshots',
      title: 'Attachment picker shown in the presentation',
      images: [{ src: '/deck/slide-08.png', alt: 'Attachment picker listing files, files and folders, GitHub issues, pull requests, and sessions.', label: 'Slide 8 · Prompt Attachments' }],
      caption: 'The picker options in the screenshot are examples; availability varies by client and context.'
    },
    check: {
      question: 'What is the best step before sending a prompt with attachments?',
      options: ['Review the selected items and confirm they are relevant.', 'Assume every client offers the same attachment types.'],
      correctAnswer: 0,
      explanation: 'The deck says attachment options vary and asks you to review selected items before sending.'
    },
    slides: [8]
  },
  {
    slug: 'dictation',
    section: 'Copilot workflow',
    title: 'Dictation: speak into the chat composer',
    shortTitle: 'Dictation',
    summary: 'Dictation behavior and audio handling differ between supported desktop platforms and the web.',
    explanation: 'Built-in dictation converts speech to text in the chat composer. On supported desktop platforms, the built-in speech model is downloaded on first use and transcription then runs on-device; dictated text stays in the composer until submission. In VS Code for the Web, audio is sent to Microsoft’s AI voice service for transcription. If language-model cleanup is enabled, transcript text is separately sent to a Copilot model.',
    scenario: {
      context: 'Illustrative scenario: dictate a short task description while using the chat composer.',
      youDo: 'Use dictation if available, then read and correct the transcript in the composer before you submit it.',
      copilotMayDo: 'Transcribe on-device on supported desktop platforms, or use the web service flow described in the deck; optional cleanup may send transcript text to a Copilot model.',
      review: 'Check transcript accuracy and consider the client-specific audio and transcript handling before submitting.'
    },
    caveat: 'Built-in dictation is experimental. Audio and transcript handling depend on client and settings; the desktop and web flows differ.',
    visual: {
      kind: 'screenshots',
      title: 'Dictation control shown in the presentation',
      images: [{ src: '/deck/slide-09.png', alt: 'VS Code chat composer with the dictation microphone control highlighted and a speech-to-text tooltip.', label: 'Slide 9 · Dictation' }],
      caption: 'The screenshot shows the composer control; the slide describes different desktop and web processing paths.'
    },
    check: {
      question: 'According to the deck, what happens to dictated text before submission?',
      options: ['It stays in the composer until you submit it.', 'It is always sent immediately without review.'],
      correctAnswer: 0,
      explanation: 'The deck says dictated text stays in the composer until you submit it.'
    },
    slides: [9]
  },
  {
    slug: 'usage-and-status',
    section: 'Copilot workflow',
    title: 'Usage and status: check account, suggestions, index, and sync',
    shortTitle: 'Usage & status',
    summary: 'Use the status menu as a live snapshot, not as a fixed plan specification.',
    explanation: 'The status menu reports account usage, inline suggestion status and controls, codebase semantic-index status, and session sync. An out-of-date index can return incomplete results for recent local changes. If session sync is enabled, it syncs local Copilot history to your GitHub account; session sync is experimental. Usage percentages and reset dates are live account details.',
    scenario: {
      context: 'Illustrative scenario: repository search seems to miss a recent local change.',
      youDo: 'Check the semantic-index status, then verify the relevant files directly instead of relying only on search.',
      copilotMayDo: 'Use available codebase context and suggestion settings according to the client’s current state.',
      review: 'Treat usage and reset information as account-specific and changing; check whether session sync is enabled before relying on its behavior.'
    },
    caveat: 'The slide screenshot shows Copilot Free at one point in time. Its usage numbers and reset date are not fixed plan limits. Session sync is experimental.',
    visual: {
      kind: 'screenshots',
      title: 'Status panel shown in the presentation',
      images: [{ src: '/deck/slide-10.png', alt: 'Copilot status panel with account usage, inline suggestions, codebase semantic index marked out of date, and session sync not enabled.', label: 'Slide 10 · Usage and Status' }],
      caption: 'Captured account values are examples only; percentages and reset dates vary over time and by account.'
    },
    check: {
      question: 'What does an out-of-date semantic index mean according to the deck?',
      options: ['Search can return incomplete results for recent local changes.', 'The Copilot account is out of usage.'],
      correctAnswer: 0,
      explanation: 'The deck specifically warns that an outdated index can miss recent local changes.'
    },
    slides: [10]
  }
]

export const lessons: Lesson[] = [
  ...lessonContent.filter(lesson => lesson.section === 'Copilot workflow'),
  ...lessonContent.filter(lesson => lesson.section === 'Project setup')
]

export function getLesson(slug: string | undefined) {
  return lessons.find(lesson => lesson.slug === slug)
}

export function getSectionLessons(section: LessonSection) {
  return lessons.filter(lesson => lesson.section === section)
}
