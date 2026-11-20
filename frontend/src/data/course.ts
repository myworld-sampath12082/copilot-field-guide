import { lessonEnhancements } from './lesson-exercises'

export type LessonSection = 'Project setup' | 'Copilot workflow'

export const courseReviewDate = 'November 20, 2026'

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

export type LessonResource = {
  label: string
  url: string
}

export type LessonExercise = {
  title: string
  context: string
  prompt: string
  expected: string
  validation: string[]
}

type InterfaceGuide = {
  title: string
  steps: VisualStep[]
  references: LessonResource[]
}

type LessonVisualContent =
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

export type LessonVisual = LessonVisualContent & {
  interfaceGuide?: InterfaceGuide
}

export type Lesson = {
  slug: string
  section: LessonSection
  title: string
  shortTitle: string
  summary: string
  explanation: string
  surface: string
  scenario: Scenario
  caveat: string
  visual: LessonVisual
  resources: LessonResource[]
  exercise: LessonExercise
  check: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
  slides: number[]
}

type LessonDraft = Omit<Lesson, 'surface' | 'resources' | 'exercise'>

export const sourceSlides = [
  { number: 1, title: 'Project Setup Files for AI Coding Assistants', summary: 'Course opening and the setup-file topics.' },
  { number: 2, title: 'Meet Your Trainer', summary: 'Trainer introduction and program goals.' },
  { number: 3, title: 'Session Modes', summary: 'Interactive, Plan, and Autopilot collaboration modes.' },
  { number: 4, title: 'Agent Selection', summary: 'Role names and custom agent choices are client-specific; see the lesson for current guidance.' },
  { number: 5, title: 'Tool Permissions', summary: 'Source-slide wording is historical; see the lesson for current labels and permission guidance.' },
  { number: 6, title: 'Where Tasks Run', summary: 'Distinguish local, Cloud, Actions, user-managed custom environments, and remote IDE workflows.' },
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

const lessonContent: LessonDraft[] = [
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
    explanation: 'Path-specific Copilot instruction files belong under .github/instructions/ and use a filename ending in .instructions.md. Frontmatter such as applyTo targets matching paths; it is not a rule for every file. The selected Copilot feature must support and include the file for it to affect a task.',
    scenario: {
      context: 'Illustrative example: a Java instruction file targets this repository’s backend production source.',
      youDo: 'Use a narrow applyTo pattern, then ask for a change to a matching Java file and a non-matching TypeScript file.',
      copilotMayDo: 'Use matched rules if the feature supports path-specific instructions and includes them in its context.',
      review: 'Check the filename, glob match, client support, and each technical rule against this repository.'
    },
    caveat: 'The example uses this repository’s Java/Spring Boot conventions. Do not copy rules into a different stack without verifying them.',
    visual: {
      kind: 'code-match',
      title: 'A complete Java instruction for this repository',
      code: '---\napplyTo: "backend/src/main/java/**/*.java"\n---\n# Java and Spring Boot guidance\n- Keep HTTP mapping in TrainingTaskController.\n- Put business rules and transactions in TrainingTaskService.\n- Use request and response DTOs.\n- Add focused JUnit tests for changed behavior.',
      matches: ['backend/src/main/java/com/example/training/tasks/TrainingTaskService.java'],
      doesNotMatch: ['backend/src/test/java/com/example/training/tasks/TrainingTaskServiceTest.java', 'frontend/src/App.tsx', 'README.md'],
      caption: 'The target pattern matches production Java sources, not tests or frontend files. Verify the pattern and feature support before relying on it.'
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
    title: 'Skills: reviewed procedures loaded when relevant',
    shortTitle: 'Skills',
    summary: 'Package a repeatable workflow in a SKILL.md folder with optional supporting assets.',
    explanation: 'A skill is a folder with a SKILL.md file containing YAML frontmatter and a procedure. Current GitHub documentation lists .github/skills, .claude/skills, and .agents/skills for project skills, plus ~/.copilot/skills and ~/.agents/skills for personal skills. Support depends on the Copilot surface. Skills can include scripts and other files, so inspect their contents and side effects before using them.',
    scenario: {
      context: 'Illustrative scenario: the team repeats the same release-readiness checks before each release.',
      youDo: 'Create a focused SKILL.md with a clear trigger and ordered steps; review any third-party skill, script, and network access before installing or running it.',
      copilotMayDo: 'Load and follow the procedure when a relevant request is made in a feature that supports skills.',
      review: 'Check the frontmatter, trigger description, each procedure step, and any scripts or templates before relying on the result.'
    },
    caveat: 'Supported locations and skill behavior depend on the Copilot surface. A skill is untrusted code/content until reviewed and is not guaranteed to load for unrelated tasks.',
    visual: {
      kind: 'comparison',
      title: 'Documented project and personal skill locations',
      items: [
        { title: 'Project skills', detail: '.github/skills/, .claude/skills/, or .agents/skills/ in a repository, where supported.' },
        { title: 'Personal skills', detail: '~/.copilot/skills/ or ~/.agents/skills/ for the current user, where supported.' },
        { title: 'Review first', detail: 'Inspect SKILL.md, scripts, references, and assets; check for file writes, network use, and unsupported claims.' }
      ],
      caption: 'Locations and loading support vary by surface. Follow the current Agent skills documentation for the client you use.'
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
      kind: 'tree',
      title: 'Repository guidance has different audiences and scopes',
      lines: [
        { depth: 0, title: 'Repository root/', detail: 'Start with files that help people and supported Copilot features.' },
        { depth: 1, title: 'README.md', detail: 'Human setup, run, and test instructions.' },
        { depth: 1, title: 'AGENTS.md', detail: 'Agent guidance whose location and nearest applicable file matter.' },
        { depth: 1, title: '.github/copilot-instructions.md', detail: 'Repository-wide Copilot guidance where the selected feature supports it.' },
        { depth: 1, title: '.github/instructions/java.instructions.md', detail: 'Java rules match the configured backend source paths.' },
        { depth: 2, title: 'backend/src/main/...', detail: 'Example target path for the Java-scoped instruction.' },
        { depth: 1, title: '.github/skills/.../SKILL.md', detail: 'A reviewed repeatable procedure for relevant supported tasks.' },
        { depth: 1, title: 'overview.md', detail: 'Architecture reference to read and verify against source.' }
      ],
      caption: 'Original scope diagram. No file is guaranteed to load for every client or task; check the current support matrix and verify the matching path.'
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
      kind: 'comparison',
      title: 'Three collaboration patterns in the source deck',
      items: [
        { title: 'Interactive', detail: 'Keep a back-and-forth loop and guide the next step as work proceeds.' },
        { title: 'Plan', detail: 'Ask for a plan before implementation; verify whether the selected client pauses for approval.' },
        { title: 'Autopilot', detail: 'Allow a bounded task to proceed more autonomously, subject to client controls and policy.' }
      ],
      caption: 'Original conceptual diagram for readability. The supplied slide 3 screenshot is available as a historical reference; its client and capture date are not recorded.'
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
    summary: 'Verify the supported role and controls in the selected client before investigating or editing.',
    explanation: 'VS Code’s current codebase-exploration guide uses the Chat view with Copilot as the session target and Agent as the role. Its no-edit prompt is an instruction, not a permission boundary, and Manual permissions may not ask before every file edit; inspect tool activity and the Git diff. The GitHub Copilot app uses its own session modes and tool permissions, which should not be mapped to VS Code role names. Custom agents can add specialized instructions and tools, so inspect their configuration before relying on them.',
    scenario: {
      context: 'Illustrative scenario: first investigate a failing test, then decide whether a code change is needed.',
      youDo: 'Check the selected client’s current documentation and choose a read-only workflow for investigation. If you want implementation, choose a role that can edit and specify what should be changed.',
      copilotMayDo: 'A read-only role can explain findings without changing state; an editing role can propose changes or run tools, subject to its permissions.',
      review: 'Check the selected role, tools used, changes, and validation output. Redirect the work when needed.'
    },
    caveat: 'The source screenshot does not identify its client or version. Role labels and behavior vary; do not assume Ask/Agent choices exist or behave the same way in every client. Role, session mode, and tool permissions are separate controls.',
    visual: {
      kind: 'comparison',
      title: 'Verify the workflow in the Copilot client you use',
      items: [
        { title: 'VS Code · Chat view', detail: 'The current exploration guide uses Copilot as the session target and Agent as the role. A no-edit prompt is not a permission boundary; inspect tool activity and the Git diff.' },
        { title: 'GitHub Copilot app · session', detail: 'Interactive, Plan, and Autopilot are session modes; tool permissions are separate. Do not translate these mode labels into VS Code role names.' },
        { title: 'Custom profile', detail: 'A repository or user-defined agent may add specialized instructions and tools; inspect its configuration.' }
      ],
      interfaceGuide: {
        title: 'Current VS Code codebase-exploration path',
        steps: [
          { title: 'Open Chat', detail: 'Open the Chat view in VS Code and start a new chat for the repository you want to inspect.' },
          { title: 'Check the session controls', detail: 'The documented exploration flow selects Copilot as the session target, Agent as the role, and Manual permissions; available options vary by account and policy.' },
          { title: 'Verify the outcome', detail: 'A no-edit request is not a hard boundary. Review tool activity and compare the Git status/diff before and after the investigation.' }
        ],
        references: [
          { label: 'VS Code · explore a codebase without changing files', url: 'https://code.visualstudio.com/docs/agents/guides/explore-a-codebase' },
          { label: 'VS Code · use the Chat view', url: 'https://code.visualstudio.com/docs/agents/run/chat-view' }
        ]
      },
      caption: 'Documentation-based client comparison, not a product screenshot. The slide 4 source image is historical and does not identify its client/version.'
    },
    check: {
      question: 'What should you verify when following a no-edit code exploration workflow in VS Code?',
      options: [
        'The prompt and Manual permissions guarantee that no file can change.',
        'The actual session controls and tool activity, then the repository diff for unintended changes.',
        'That the GitHub Copilot app uses the same role names as VS Code.'
      ],
      correctAnswer: 1,
      explanation: 'A no-edit prompt is an instruction, not a permission boundary, and Manual permissions do not necessarily ask before every file edit. Check the session controls, tool activity, and resulting diff.'
    },
    slides: [4]
  },
  {
    slug: 'tool-permissions',
    section: 'Copilot workflow',
    title: 'Tool permissions: choose when tools need approval',
    shortTitle: 'Tool permissions',
    summary: 'Ask every time, Assisted, and Approve all control tool approvals separately from session mode.',
    explanation: 'In the documented Copilot app, Ask every time requests your approval before a tool runs. Assisted can approve eligible requests based on a safety assessment and asks you about others. Approve all skips individual approval prompts for supported tools, but policy and feature restrictions still apply. These are tool-approval settings, not session modes.',
    scenario: {
      context: 'Illustrative scenario: an autonomous session wants to run a command that changes files.',
      youDo: 'Choose the least-permissive setting that still supports the task. Prefer Ask every time when you need to inspect each command.',
      copilotMayDo: 'Request approval, automatically approve eligible actions, or skip per-action prompts according to the selected setting.',
      review: 'Read the command and its likely effects; do not infer that a mode or approval setting makes a command safe.'
    },
    caveat: 'Labels and eligible actions vary by product surface and policy. Assisted is not a guarantee of safety; review tool actions and use least privilege.',
    visual: {
      kind: 'comparison',
      title: 'Current approval choices in the Copilot app',
      items: [
        { title: 'Ask every time', detail: 'Ask before running each tool that requires approval.' },
        { title: 'Assisted', detail: 'Approve requests judged safe and ask about potentially risky actions.' },
        { title: 'Approve all', detail: 'Skip individual approval prompts for supported tools; product and organization restrictions still apply.' }
      ],
      interfaceGuide: {
        title: 'Where to find app-session tool permissions',
        steps: [
          { title: 'For one session', detail: 'Open the session control below the prompt, hover over Tool permissions, and select the available approval level.' },
          { title: 'For future local sessions', detail: 'Open app settings, choose Sessions, then set the default under Tool permissions.' },
          { title: 'Check policy limits', detail: 'Approval preferences do not grant blocked capabilities. Confirm the option is available and review each tool’s effects.' }
        ],
        references: [
          { label: 'GitHub Copilot app · choosing tool permissions', url: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions' },
          { label: 'Copilot policies', url: 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies' }
        ]
      },
      caption: 'Documentation-based app navigation, not a product screenshot. The supplied slide uses historical labels; verify current options and policy for your account.'
    },
    check: {
      question: 'If organization policy restricts a tool, what happens when you select Approve all?',
      options: [
        'Approve all overrides the organization restriction for this session.',
        'The approval preference does not override policy; restricted actions can remain unavailable.',
        'The restriction is applied only when using Plan mode.'
      ],
      correctAnswer: 1,
      explanation: 'Approve all skips individual approval prompts for supported tools; it does not grant capabilities blocked by product or organization policy. Use the least-permissive available setting and verify tool availability.'
    },
    slides: [5]
  },
  {
    slug: 'task-environments',
    section: 'Copilot workflow',
    title: 'Where tasks run: identify the host and project folder',
    shortTitle: 'Task environment',
    summary: 'Choose the actual local, cloud-agent, custom, or remote host supported by your Copilot client.',
    explanation: '“Where the task runs” is a client-specific choice, not one universal Copilot environment menu. A local session runs on your machine; a Cloud session uses a GitHub-hosted sandbox; an Actions session runs in a GitHub Actions job; and a custom environment is a Linux machine or Codespace you register and manage as a Copilot host. A VS Code remote host or tunnel is a separate workflow. These terms describe different features and must not be used interchangeably.',
    scenario: {
      context: 'Illustrative scenario: you need a cloud coding agent to use the repository’s build tools, or you need a Windows/self-hosted runner.',
      youDo: 'Choose Cloud for a GitHub-hosted sandbox unless the task needs Actions-only setup such as a Windows environment or custom runner. Register a custom environment only when you intend to manage its machine, tools, and lifecycle.',
      copilotMayDo: 'Run in a GitHub-hosted sandbox, an Actions job, or a registered custom host according to the selected environment.',
      review: 'Verify the host, repository, branch, dependencies, network access, credential scope, billing, and how to stop the session. Do not assume a local Dev Tunnel is required by a cloud agent.'
    },
    caveat: '“GitHub Environments” and its Preview badge are source-deck terms; the screenshot capture date is unknown. Cloud and Actions are distinct; custom environments are user-managed Linux machines or Codespaces, not Actions setup steps. Cloud sandbox usage is billed by compute, memory, and storage. Verify current options and billing for your account.',
    visual: {
      kind: 'comparison',
      title: 'Map the task to the environment it actually uses',
      items: [
        { title: 'Local IDE workspace', detail: 'The selected editor works with a local repository and local tools.' },
        { title: 'Cloud', detail: 'A GitHub-hosted sandbox runs the session; usage is billed by compute, memory, and storage.' },
        { title: 'Actions', detail: 'A GitHub Actions job runs the session; use it for Actions-only setup, Windows, or custom runners.' },
        { title: 'Custom environment', detail: 'A registered Linux machine or Codespace runs copilotd; you manage its tools, workspace, and lifecycle.' },
        { title: 'Remote IDE or tunnel', detail: 'A VS Code remote host/tunnel is a separate workflow; use it only when the selected client and task require it.' }
      ],
      caption: 'Original terminology map, not a screenshot. The original slide 6 image is retained as a historical reference; its client and capture date are not documented.'
    },
    check: {
      question: 'When should you choose an Actions environment instead of Cloud?',
      options: ['When the task requires Actions-only setup, such as a Windows environment or custom runner.', 'Whenever a repository has a README file.'],
      correctAnswer: 0,
      explanation: 'GitHub documents Actions for custom setup steps, larger or self-hosted runners, and Windows development environments; Cloud is the default otherwise.'
    },
    slides: [6]
  },
  {
    slug: 'models-and-fusion',
    section: 'Copilot workflow',
    title: 'Models and Copilot Fusion: choose or coordinate models',
    shortTitle: 'Models & Fusion',
    summary: 'Select an individual model or use Fusion when available; check effort options, plan, and usage.',
    explanation: 'You can choose an individual model when you need its capabilities or want to compare usage. Available models depend on plan, client, and organization policy. Copilot Fusion can select one model or coordinate multiple models and workflows. Standard, High, and Max effort levels are available when offered to your account; Fusion Fast is not a generally selectable effort level and is currently limited to VS Code inline chat. Fusion can use multiple model calls, so check the current plan and usage details.',
    scenario: {
      context: 'Illustrative scenario: compare approaches for a multi-step task with an account that offers both model selection and Fusion.',
      youDo: 'Choose a specific model if you need to target its capabilities, or choose Fusion if you want it to select or coordinate models. Check the offered effort levels and whether a Fast option is specifically available in VS Code inline chat.',
      copilotMayDo: 'Use the selected model or, with Fusion, select one or coordinate multiple models and workflows.',
      review: 'Check which options your account actually offers, review the result, and monitor current plan and usage details.'
    },
    caveat: 'Model availability and effort levels depend on plan, client, and organization policy. Fusion Fast is not generally selectable outside VS Code inline chat. Fusion may use multiple calls; it is not a promise of a particular result or usage amount.',
    visual: {
      kind: 'screenshots',
      title: 'Model and Fusion controls shown in the presentation',
      interfaceGuide: {
        title: 'Current documented model-control path · GitHub Copilot app',
        steps: [
          { title: 'Choose a model or Fusion', detail: 'In an app session, use the model selector below the prompt. Fusion selects a model or execution pattern for each task.' },
          { title: 'Select effort when offered', detail: 'Effort choices and availability depend on account and policy. After a Fusion response, hover over its effort label to inspect the models used.' },
          { title: 'Know the VS Code Fast exception', detail: 'Fusion Fast is not selectable by users; it is only used in qualifying VS Code inline-chat scenarios.' }
        ],
        references: [
          { label: 'GitHub Copilot app · session model and effort controls', url: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions' },
          { label: 'Copilot Fusion · execution patterns and effort levels', url: 'https://docs.github.com/en/copilot/concepts/models/copilot-fusion' }
        ]
      },
      images: [
        { src: '/deck/slide-07-models.png', alt: 'Model picker showing Copilot Fusion and model choices, some marked as requiring an upgrade.', label: 'Slide 7 · Model picker' },
        { src: '/deck/slide-07-fusion.png', alt: 'Copilot Fusion settings showing Standard, High, and Max effort levels, with Standard selected.', label: 'Slide 7 · Fusion effort' }
      ],
      caption: 'The source-deck screenshots are historical; their capture date and client are unknown. The documented app flow above is separate and should not be inferred from those images.'
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
      caption: 'Historical source-deck screenshot; the capture date is unknown. Picker options vary by client and context.'
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
    explanation: 'Built-in dictation converts speech to text in the chat composer. The on-device desktop model is supported on Windows x64/Arm64, macOS Apple silicon, and Linux x64/Arm64 with glibc 2.34 or later; after its first download, transcription runs locally. In VS Code for the Web, audio is sent to Microsoft’s AI voice service and requires network access and GitHub sign-in. If language-model cleanup is enabled, transcript text is separately sent to a Copilot model.',
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
      caption: 'Historical VS Code screenshot; the capture date is unknown. The slide describes different desktop and web processing paths.'
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
    caveat: 'The screenshot capture date and extension version are unknown. Its usage values and reset date are historical examples, not current plan limits. Check current documentation for session-sync availability and data handling.',
    visual: {
      kind: 'screenshots',
      title: 'Status panel shown in the presentation',
      images: [{ src: '/deck/slide-10.png', alt: 'Copilot status panel with account usage, inline suggestions, codebase semantic index marked out of date, and session sync not enabled.', label: 'Slide 10 · Usage and Status' }],
      caption: 'Historical VS Code screenshot; capture date and extension version are unknown. Account values are examples only, not current plan limits.'
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
  ...lessonContent.filter(lesson => lesson.section === 'Copilot workflow').map(addLessonEnhancements),
  ...lessonContent.filter(lesson => lesson.section === 'Project setup').map(addLessonEnhancements)
]

function addLessonEnhancements(lesson: LessonDraft): Lesson {
  const enhancement = lessonEnhancements[lesson.slug]
  if (!enhancement) throw new Error(`Missing practical content for lesson "${lesson.slug}"`)
  return { ...lesson, ...enhancement }
}

export function getLesson(slug: string | undefined) {
  return lessons.find(lesson => lesson.slug === slug)
}

export function getSectionLessons(section: LessonSection) {
  return lessons.filter(lesson => lesson.section === section)
}
