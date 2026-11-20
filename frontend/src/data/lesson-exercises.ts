import type { Lesson, LessonResource } from './course'

type LessonEnhancement = Pick<Lesson, 'surface' | 'resources' | 'exercise'>

const docs = {
  agentSessions: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions',
  cloudSandboxes: 'https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes',
  customEnvironments: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-a-custom-environment',
  customInstructions: 'https://docs.github.com/en/copilot/reference/custom-instructions-support',
  agentSkills: 'https://docs.github.com/en/copilot/concepts/customizations/agent-skills',
  policies: 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies',
  responsibleAgents: 'https://docs.github.com/en/copilot/responsible-use/agents',
  responsibleChat: 'https://docs.github.com/en/copilot/responsible-use/chat',
  fusion: 'https://docs.github.com/en/copilot/concepts/models/copilot-fusion',
  usage: 'https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage',
  voice: 'https://code.visualstudio.com/docs/configure/accessibility/voice',
  overview: 'https://github.com/sampath12082/copilot-field-guide/blob/main/overview.md'
} as const

function resources(...items: Array<[string, string]>): LessonResource[] {
  return items.map(([label, url]) => ({ label, url }))
}

export const lessonEnhancements: Record<string, LessonEnhancement> = {
  'session-modes': {
    surface: 'Copilot app and CLI mode concepts; the source screenshot does not record its client or version.',
    resources: resources(
      ['GitHub Copilot app agent sessions', docs.agentSessions],
      ['Autopilot and agent workflows', 'https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/autopilot'],
      ['Original slide 3 screenshot (historical; capture date unknown)', '/deck/slide-03.png']
    ),
    exercise: {
      title: 'Choose a mode for a bounded change',
      context: 'Use a disposable branch and a small formatting or documentation-only task. Do not start with a task that can alter production data or infrastructure.',
      prompt: 'First explain the difference between Interactive, Plan, and Autopilot in the Copilot client I am using. For this task, identify the files you would change, the checks you would run, and a stop condition. Do not edit until I review the plan.',
      expected: 'A short plan names the target files, validation, and an explicit boundary. The client and its mode behavior are identified rather than assumed to match another Copilot surface.',
      validation: [
        'Confirm the selected client and mode using its current documentation.',
        'Review the proposed file list and stop condition before allowing edits.',
        'After any edit, inspect the diff and run the stated check.'
      ]
    }
  },
  'agent-selection': {
    surface: 'Agent picker from the supplied presentation; its exact client/version is not identified, so role labels must be checked for the selected client.',
    resources: resources(
      ['GitHub Copilot app agent sessions', docs.agentSessions],
      ['Responsible use of agents', docs.responsibleAgents],
      ['Original slide 4 screenshot (historical; capture date unknown)', '/deck/slide-04.png']
    ),
    exercise: {
      title: 'Compare a read-only investigation with an edit request',
      context: 'Use the existing `/api/tasks` implementation as a code-reading target. Select roles only when they are available in your client.',
      prompt: 'Read TrainingTaskController, TrainingTaskService, TrainingTaskRepository, and their tests. Explain how GET /api/tasks?topic=... is handled, cite the files you used, and do not edit or run state-changing commands. Identify the read-only workflow and editing role available in this client, if any; do not assume the names Ask or Agent are universal.',
      expected: 'A source-anchored explanation traces controller to service to repository and distinguishes reading from editing. It does not claim that every client has the same Ask or Agent role.',
      validation: [
        'Check the explanation against the actual controller, service, repository, and tests.',
        'Verify the selected role and available tools in the client before any edit.',
        'Use the exact endpoint behavior documented in overview.md as a cross-check.'
      ]
    }
  },
  'tool-permissions': {
    surface: 'GitHub Copilot app agent-session tool approvals; the choices available in other clients can differ.',
    resources: resources(
      ['GitHub Copilot app agent sessions', docs.agentSessions],
      ['Copilot policies and model training', docs.policies],
      ['Original slide 5 screenshot (historical; labels are outdated)', '/deck/slide-05.png']
    ),
    exercise: {
      title: 'Select the least-permissive approval setting',
      context: 'Practice with a read-only request first, then a harmless command in a disposable local branch. Do not grant broad access to compensate for an unclear prompt.',
      prompt: 'For this task, list every tool or command you expect to use and what it can change. Recommend the least-permissive approval option available in this client. Ask before any action outside that list.',
      expected: 'The developer can explain the current labels—Ask every time, Assisted, and Approve all—without confusing them with Interactive, Plan, or Autopilot modes.',
      validation: [
        'Confirm labels and effects in the current client documentation.',
        'Read each approval request and its likely side effects before allowing it.',
        'Check that organization policy and the environment permit the requested tool.'
      ]
    }
  },
  'task-environments': {
    surface: 'Environment choices depend on the Copilot client. Cloud, Actions, and registered custom environments are separate options; remote IDE tunnels are a different workflow.',
    resources: resources(
      ['About Copilot cloud sandboxes', docs.cloudSandboxes],
      ['Create a custom environment for Copilot coding agent', docs.customEnvironments],
      ['Responsible use of agents', docs.responsibleAgents],
      ['Original slide 6 screenshot (historical; capture date unknown)', '/deck/slide-06.png']
    ),
    exercise: {
      title: 'Identify the actual host before delegating work',
      context: 'Compare local work with the Cloud or Actions option documented for the client you actually use. A registered custom environment is user-managed; do not confuse it with GitHub Actions setup.',
      prompt: 'Before changing files, tell me which Copilot client is active, whether the session runs locally, in a GitHub-hosted Cloud sandbox, a GitHub Actions job, or a registered custom environment, the repository and folder it will use, what network/credential access it has, whether cloud usage is billable, and how I can stop it. If any detail is unknown, tell me how to verify it.',
      expected: 'A host-and-folder checklist that distinguishes local execution, the GitHub-hosted Cloud sandbox, Actions jobs, user-managed Linux/Codespace custom hosts, and separate VS Code remote workflows.',
      validation: [
        'Use the current setup guide; Cloud is GitHub-hosted, Actions is an Actions job, and a custom environment is a user-managed Linux machine or Codespace running copilotd.',
        'Verify the repository, branch, folder, network access, credential scope, and Cloud billing before the task.',
        'Choose Actions only for Actions-specific setup, Windows, or custom runners; do not assume a tunnel is required by a cloud session.'
      ]
    }
  },
  'models-and-fusion': {
    surface: 'Copilot model picker and Fusion concepts from the supplied deck; exact account, plan, and client are not recorded.',
    resources: resources(
      ['Copilot Fusion', docs.fusion],
      ['Monitor Copilot AI usage', docs.usage],
      ['Copilot policies and model training', docs.policies],
      ['Original slide 7 screenshots (historical; capture date unknown)', '/deck/slide-07-models.png']
    ),
    exercise: {
      title: 'Compare available model choices without assuming plan access',
      context: 'Use the same small, reviewable code-explanation task with two choices that are actually offered to your account.',
      prompt: 'Explain this method and identify one edge case, citing the code. First show me the models and effort choices available in this client, and note any plan or policy caveat. Do not assume a model or effort option is available if it is not shown.',
      expected: 'A side-by-side comparison of explanation quality and observed usage for the options actually available, with no promise that a specific model or effort level is universal.',
      validation: [
        'Check current plan and organization availability before comparing; Fusion Fast is not generally selectable and is documented only for VS Code inline chat.',
        'Verify both explanations against the source and tests.',
        'Record observed latency and usage only; do not infer a general cost or productivity guarantee from one task.'
      ]
    }
  },
  'prompt-attachments': {
    surface: 'Copilot chat attachment picker; available files, issues, pull requests, and sessions vary by client.',
    resources: resources(
      ['Responsible use of Copilot Chat', docs.responsibleChat],
      ['Copilot policies and model training', docs.policies],
      ['Original slide 8 screenshot (historical; capture date unknown)', '/deck/slide-08.png']
    ),
    exercise: {
      title: 'Attach only the context needed to fix a task',
      context: 'Use the task API as an example. Attach a controller and its focused test only if those options exist in your client; never attach local secrets or unrelated customer data.',
      prompt: 'Using only the relevant task API controller and its test, explain where the request is validated and how the response is formed. Do not edit files. List the context you used and say if you need more information.',
      expected: 'A concise, source-anchored explanation and an explicit list of the selected context; no assumptions that every client supports the same picker options.',
      validation: [
        'Inspect every selected attachment before sending.',
        'Remove secrets, personal data, and unrelated files; check organization policy for permitted context.',
        'Verify each claim against the attached source and report any missing context.'
      ]
    }
  },
  dictation: {
    surface: 'Experimental built-in dictation in VS Code desktop and VS Code for the Web; not conversational Voice Mode.',
    resources: resources(
      ['VS Code voice and dictation support', docs.voice],
      ['Copilot policies and model training', docs.policies],
      ['Original slide 9 screenshot (historical; capture date unknown)', '/deck/slide-09.png']
    ),
    exercise: {
      title: 'Review dictated text before it becomes prompt context',
      context: 'Use a short, non-sensitive request in a supported VS Code version. Dictation and conversational voice features are separate workflows.',
      prompt: 'Dictate a short request to explain the task service. Before submitting it, read the transcript, correct any names or code identifiers, and remove private information.',
      expected: 'The learner can find the current dictation support status and settings for their VS Code platform, and treats the transcript as prompt content that must be reviewed.',
      validation: [
        'Check platform/version support: Windows x64/Arm64, macOS Apple silicon, Linux x64/Arm64 with glibc 2.34+, or the web transcription requirements; note that built-in dictation is experimental.',
        'Review audio and transcript handling settings and organization controls.',
        'Correct the transcript before sending; do not dictate credentials, customer data, or secrets.'
      ]
    }
  },
  'usage-and-status': {
    surface: 'VS Code Copilot status view shown in the source deck; screenshot capture date and extension version are unknown.',
    resources: resources(
      ['Monitor Copilot AI usage', docs.usage],
      ['Copilot policies and model training', docs.policies],
      ['Original slide 10 screenshot (historical; values are not current plan limits)', '/deck/slide-10.png']
    ),
    exercise: {
      title: 'Verify status information against your own account',
      context: 'Open the status or usage view in the Copilot client you actually use; do not infer current limits from the presentation screenshot.',
      prompt: 'For this client, identify where I can check my current Copilot plan/usage and the state of any codebase index or session-sync feature. Separate account-specific values from general product behavior.',
      expected: 'A dated, client-specific explanation that labels account values as live and distinguishes them from policy or product-wide facts.',
      validation: [
        'Open current official usage guidance and your own account view.',
        'Verify whether indexing or sync is enabled before relying on its results or behavior.',
        'Do not interpret the source screenshot percentages or dates as current allowances.'
      ]
    }
  },
  'why-setup-files': {
    surface: 'Repository guidance in Copilot features that support the relevant file type; behavior is feature-specific.',
    resources: resources(
      ['Custom-instruction support matrix', docs.customInstructions],
      ['Responsible use of Copilot Chat', docs.responsibleChat]
    ),
    exercise: {
      title: 'Compare the same test task with and without project guidance',
      context: 'Use two fresh chats in the same client with the same model and workspace. Compare a test-only task for TrainingTaskService.updateStatus; do not edit production code or change any other context between runs. The Java path-specific instructions target main-source files, not files under src/test.',
      prompt: 'Run this same task twice in fresh chats. Run A: do not open, attach, or reference README.md or .github/copilot-instructions.md; ask: “Inspect TrainingTaskService.updateStatus and its focused tests. Propose a test-only change for one meaningful untested boundary. List the test file, exact test command, relevant constraints, and expected assertion. Do not edit files.” Run B: repeat the exact prompt in a fresh chat, but first provide README.md and .github/copilot-instructions.md as repository-wide context. Also show .github/instructions/java.instructions.md and ask whether its applyTo pattern matches the production service and/or the target src/test file; do not treat it as applicable to the test unless its path scope matches. Compare the proposed test, constraints, command, and validation; verify both proposals against the source before deciding whether guidance improved the result.',
      expected: 'A controlled, source-checked comparison records what changed between the two proposals and whether Run B used accurate project-specific commands or rules. It correctly distinguishes repository-wide guidance from Java source-only path instructions, and does not claim that guidance guarantees correctness or that the first run had no implicit context.',
      validation: [
        'Use fresh chats with the same client, model, workspace, and prompt; vary only whether the named guidance is explicitly provided.',
        'Record any implicit context the client may still include and do not treat Run A as a guaranteed no-context baseline.',
        'Check instruction filename and path scope against the target test file.',
        'Verify the proposed test and command against the actual source, README.md, and Maven configuration; guidance is not proof.'
      ]
    }
  },
  readme: {
    surface: 'General project documentation for people; a Copilot feature may use it only when the file is available in context.',
    resources: resources(
      ['This repository README and run instructions', 'https://github.com/sampath12082/copilot-field-guide/blob/main/README.md']
    ),
    exercise: {
      title: 'Verify a README command against the project',
      context: 'Use this repository as a sample. Check the frontend npm scripts and backend Maven wrapper rather than treating documentation as executable truth.',
      prompt: 'Read README.md and identify the documented frontend test/build commands and backend test command. Check each against package.json or the Maven project and report any mismatch without changing files.',
      expected: 'A short command matrix with the source file that defines each command and any prerequisite such as PostgreSQL or Docker.',
      validation: [
        'Compare npm commands with frontend/package.json.',
        'Compare the backend command with backend/pom.xml and the Maven wrapper.',
        'Run only the relevant check in a local development environment and update stale documentation.'
      ]
    }
  },
  'agents-md': {
    surface: 'Copilot coding features that support AGENTS.md; support and nested-file behavior vary by feature.',
    resources: resources(['Custom-instruction support matrix', docs.customInstructions]),
    exercise: {
      title: 'Find the nearest applicable agent guidance',
      context: 'The Java source and its tests have different repository paths and may match different instruction files.',
      prompt: 'For backend/src/main/java/com/example/training/tasks/TrainingTaskService.java, find every AGENTS.md that could apply based on its location. Tell me which feature support you verified, quote only the relevant rule headings, and do not edit files.',
      expected: 'A location-based explanation that identifies applicable guidance and calls out client support as a separate question.',
      validation: [
        'Inspect the root and nested guidance files in the repository tree.',
        'Check the current Copilot feature support matrix rather than generalizing from another client.',
        'Compare the answer with the actual instruction content and target path.'
      ]
    }
  },
  'copilot-instructions': {
    surface: 'Repository-wide Copilot instructions in clients/features that support .github/copilot-instructions.md.',
    resources: resources(['Custom-instruction support matrix', docs.customInstructions]),
    exercise: {
      title: 'Test whether repository guidance applies to the selected client',
      context: 'Use an instruction that asks a supported feature to report the project test command; do not add a rule that changes security behavior.',
      prompt: 'In this repository context, find .github/copilot-instructions.md. If this client supports it, report the test and build checks it lists and explain how you know the file was included. If you cannot verify inclusion, say so instead of guessing.',
      expected: 'An explicit support/inclusion status and a source-anchored summary, not an assumption that all Copilot requests load the file.',
      validation: [
        'Check the support matrix for the exact client and feature.',
        'Compare the reported commands and boundaries with the file itself.',
        'Run the relevant check and confirm that project facts take precedence over stale guidance.'
      ]
    }
  },
  'path-specific': {
    surface: 'Copilot features that support path-specific instruction files; filename, glob, and client support all matter.',
    resources: resources(['Custom-instruction support matrix', docs.customInstructions]),
    exercise: {
      title: 'Create and test one Java-scoped instruction',
      context: 'Use the actual frontend/backend paths in this repository. A path-specific instruction filename ends in .instructions.md under .github/instructions/.',
      prompt: 'Draft .github/instructions/java.instructions.md with frontmatter applyTo: "backend/src/main/java/**/*.java". Include only verified Java/Spring conventions from this repository. Show one matching path and one non-matching test or TypeScript path; do not edit until I review.',
      expected: 'A complete file with valid frontmatter, a narrow pattern, and conventions consistent with the existing Java instructions; no unrelated SQL Server or AWS assumptions.',
      validation: [
        'Verify the filename and frontmatter format against current instructions documentation.',
        'Check the pattern against backend/src/main/java/... and frontend/src/... paths.',
        'Confirm the selected feature supports path-specific files and verify behavior on one matching file.'
      ]
    }
  },
  'architecture-overview': {
    surface: 'Repository architecture documentation; the example is verified against this repository overview and source tree.',
    resources: resources(
      ['This repository architecture and API map', docs.overview],
      ['Responsible use of Copilot Chat', docs.responsibleChat]
    ),
    exercise: {
      title: 'Trace a task request across the real application',
      context: 'Use an existing GET /api/tasks request and the repository overview as starting points.',
      prompt: 'Trace GET /api/tasks?topic=README.md from the React client through the Spring Boot controller, service, and repository. List the files and method names you verified. If overview.md disagrees with source, report the mismatch instead of copying the diagram.',
      expected: 'A source-anchored call path, including the frontend API boundary and actual persistence method, with discrepancies clearly flagged.',
      validation: [
        'Open each cited file and confirm the call path and filter behavior.',
        'Compare the explanation with overview.md and update documentation if source has changed.',
        'Run the focused backend test that covers task listing.'
      ]
    }
  },
  skills: {
    surface: 'Copilot surfaces with agent-skill support; project and personal locations differ by client.',
    resources: resources(
      ['Agent skills and supported locations', docs.agentSkills],
      ['Responsible use of agents', docs.responsibleAgents]
    ),
    exercise: {
      title: 'Review a skill before using it',
      context: 'Use a trusted, read-only test-checklist skill in a disposable sample repository. Never install a skill only because its name looks familiar.',
      prompt: 'Inspect this skill folder and its SKILL.md, scripts, references, and assets. Summarize its trigger, every action it can perform, and any network or file-write behavior. Do not run scripts or modify the repository.',
      expected: "A source-based trust review that identifies the skill's purpose, supported location, side effects, and conditions under which it should load.",
      validation: [
        'Check current documentation for project and personal skill locations on this surface.',
        'Read all scripts and external references before executing anything.',
        'Invoke only a reviewed skill for a matching task, then verify its output independently.'
      ]
    }
  },
  'putting-it-together': {
    surface: 'Project setup workflow across supported Copilot features; verify each file type on the selected client.',
    resources: resources(
      ['Custom-instruction support matrix', docs.customInstructions],
      ['Agent skills', docs.agentSkills],
      ['This repository setup and architecture guide', docs.overview]
    ),
    exercise: {
      title: 'Complete a repository setup assessment',
      context: 'Use a sample repository and add only guidance that solves a demonstrated contributor or Copilot workflow problem.',
      prompt: 'Inspect this repository and report: its setup/test commands, applicable agent instructions, one supported path-specific rule, an architecture reference to verify, and one repeatable procedure that could be a skill. Identify the client support for each file before recommending changes.',
      expected: "A setup map with each file's audience, path, purpose, support evidence, and verification command, with no duplicated or conflicting rules.",
      validation: [
        'Run the documented checks and compare them with build configuration.',
        'Test one matching and one non-matching path for scoped guidance.',
        'Review the final diff and ask another reviewer to verify architecture and policy claims.'
      ]
    }
  }
}
