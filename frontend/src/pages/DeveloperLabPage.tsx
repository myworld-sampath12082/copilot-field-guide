import { Link } from 'react-router-dom'
import { assessmentRubric, labExercises, localValidationCommands, topicCoverage } from '../data/lab'
import { courseReviewDate } from '../data/course'

export default function DeveloperLabPage() {
  return (
    <main className="course-page developer-lab" id="main-content">
      <header className="page-intro lab-intro">
        <p className="eyebrow">Applied assessment · Java 21 · Spring Boot · PostgreSQL</p>
        <h1>From prompt to reviewed change</h1>
        <p>
          Work in this repository locally: understand a service, implement a small multi-file API change,
          test a regression, and review the diff. Each exercise gives you a prompt, expected behavior, and
          evidence to collect. It does not claim that a particular Copilot client will produce a correct answer.
        </p>
        <p><strong>Reviewed:</strong> {courseReviewDate}. Client controls and organization policies can change.</p>
        <Link className="button-link button-primary" to="/learn/session-modes">Review the workflow lessons first</Link>
      </header>

      <section className="lab-safety" aria-labelledby="lab-safety-heading">
        <h2 id="lab-safety-heading">Use a safe local workspace</h2>
        <ul>
          <li>Use a disposable local branch or fork. Do not push practice changes to the upstream repository.</li>
          <li>The public course intentionally does not host the Java API or its unauthenticated write endpoints.</li>
          <li>Keep database passwords, tokens, customer data, and unrelated private files out of prompts and attachments.</li>
          <li>Read the project instructions and verify every proposed command before allowing it to run.</li>
        </ul>
        <p><strong>Prerequisites:</strong> Java 21, Node.js 24+ with npm, and Docker with Compose. Check the installed tools with <code>java -version</code>, <code>node --version</code>, <code>npm --version</code>, and <code>docker compose version</code>. Backend exercises require the local PostgreSQL/API stack.</p>
        <p>Install the prerequisites and start the local database/API using the steps in the <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/README.md" target="_blank" rel="noreferrer">repository README</a>.</p>
      </section>

      <section className="lab-browser-path" aria-labelledby="lab-browser-path-heading">
        <h2 id="lab-browser-path-heading">No local API yet? Start with a read-only source trace</h2>
        <p>This browser-only preparation needs no Java, Node.js, Docker, or database. It helps you understand the example but cannot run or validate code and does not replace the implementation and test exercises.</p>
        <ol>
          <li>Read the <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/overview.md" target="_blank" rel="noreferrer">API overview</a> and note the current task-list filters.</li>
          <li>Trace <code>GET /api/tasks?topic=...</code> from the controller through the service and repository; compare the path with the focused controller test.</li>
          <li>Write down the request parameter, the method that applies the filter, the response shape, and one behavior you cannot confirm without running the tests.</li>
        </ol>
        <p>
          Source files:{' '}
          <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/backend/src/main/java/com/example/training/tasks/TrainingTaskController.java" target="_blank" rel="noreferrer">controller</a>
          {' · '}
          <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/backend/src/main/java/com/example/training/tasks/TrainingTaskService.java" target="_blank" rel="noreferrer">service</a>
          {' · '}
          <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/backend/src/main/java/com/example/training/tasks/TrainingTaskRepository.java" target="_blank" rel="noreferrer">repository</a>
          {' · '}
          <a href="https://github.com/sampath12082/copilot-field-guide/blob/main/backend/src/test/java/com/example/training/tasks/TrainingTaskControllerTest.java" target="_blank" rel="noreferrer">controller test</a>
        </p>
      </section>

      <section className="lab-workflow" aria-labelledby="lab-workflow-heading">
        <p className="eyebrow">Workflow overview</p>
        <h2 id="lab-workflow-heading">Keep the controls distinct</h2>
        <p>These are separate decisions in a Copilot-assisted change; the selected client determines which are available.</p>
        <ol>
          <li><strong>Copilot surface</strong><span>Identify the app, IDE, CLI, or coding-agent feature.</span></li>
          <li><strong>Model</strong><span>Use an option available to this plan and organization.</span></li>
          <li><strong>Context</strong><span>Provide only relevant files and work items; exclude secrets.</span></li>
          <li><strong>Tools</strong><span>Know which commands or external tools the task may use.</span></li>
          <li><strong>Permissions</strong><span>Choose least privilege and review approval requests.</span></li>
          <li><strong>Human validation</strong><span>Run tests, inspect the diff, and decide whether to ship.</span></li>
        </ol>
      </section>

      <section className="lab-governance" aria-labelledby="lab-governance-heading">
        <p className="eyebrow">Privacy and governance</p>
        <h2 id="lab-governance-heading">Check policy before sharing context or granting access</h2>
        <ul>
          <li>GitHub's policy documentation states that from April 24, 2026, interactions on individual Copilot Free, Pro, Pro+, and Max plans may be used to train and improve models unless the user opts out. Business and Enterprise customer data are not used to train models. Confirm the current account and organization settings; do not generalize from another plan.</li>
          <li>Check model-training controls separately from public-code matching, repository access, and tool permissions. Cloud sandbox usage is billed by compute, memory, and storage; review current billing and network rules before starting cloud work.</li>
          <li>Do not attach credentials, secrets, customer data, or unrelated private source. Treat issue text, generated code, and tool output as untrusted until checked.</li>
          <li>Use the organization’s public-code and dependency policies. Review licensing and attribution concerns with the appropriate owner; this course is not legal advice.</li>
          <li>Copilot findings are suggestions, not proof of security or compliance. Reproduce findings, run tests and security checks, and make the merge decision yourself.</li>
        </ul>
        <p className="lab-reference-links">
          <a href="https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies" target="_blank" rel="noreferrer">Copilot policies and model training</a>
          {' · '}
          <a href="https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes" target="_blank" rel="noreferrer">Cloud sandbox isolation and billing</a>
          {' · '}
          <a href="https://docs.github.com/en/copilot/responsible-use/agents" target="_blank" rel="noreferrer">Responsible use of agents</a>
          {' · '}
          <a href="https://docs.github.com/en/copilot/responsible-use/chat" target="_blank" rel="noreferrer">Responsible use of Copilot Chat</a>
        </p>
      </section>

      <section className="lab-command-card" aria-labelledby="lab-checks-heading">
        <h2 id="lab-checks-heading">Documented validation commands</h2>
        <p>Run the checks relevant to the exercise. Backend tests use the documented local development setup.</p>
        <ul>
          {localValidationCommands.map(command => <li key={command}><code>{command}</code></li>)}
        </ul>
      </section>

      <section className="lab-exercises" aria-labelledby="lab-exercises-heading">
        <header className="lab-section-heading">
          <p className="eyebrow">Progressive exercises</p>
          <h2 id="lab-exercises-heading">Practice the engineering loop</h2>
          <p>Start with explanation, then build, test, review, and combine the guidance.</p>
        </header>
        <ol className="lab-exercise-list">
          {labExercises.map((exercise, index) => (
            <li className="lab-exercise-card" key={exercise.title}>
              <p className="eyebrow">{exercise.level} · Exercise {index + 1}</p>
              <h3>{exercise.title}</h3>
              <p className="lab-surface"><strong>Surface:</strong> {exercise.surface}</p>
              <h4>Context</h4>
              <p>{exercise.context}</p>
              <h4>Prompt</h4>
              <pre><code>{exercise.prompt}</code></pre>
              <h4>Expected outcome</h4>
              <p>{exercise.expected}</p>
              <h4>Validate</h4>
              <ul>
                {exercise.validation.map(item => <li key={item}>{item}</li>)}
              </ul>
              {exercise.references && (
                <p className="lab-reference-links">
                  References: {exercise.references.map((reference, referenceIndex) => (
                    <span key={reference.url}>
                      {referenceIndex > 0 && ' · '}
                      <a href={reference.url} target="_blank" rel="noreferrer">{reference.label}</a>
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="lab-assessment" aria-labelledby="lab-assessment-heading">
        <p className="eyebrow">Module assessments and capstone</p>
        <h2 id="lab-assessment-heading">Show evidence, not just recognition</h2>
        <div className="lab-assessment-grid">
          <article>
            <h3>Copilot workflow assessment</h3>
            <p>Use a read-only investigation, verify plan-specific data and access policy, choose a bounded task and least-permissive tool setting, then produce and verify a local test change. Record the client, role, mode, environment, context, commands, and results.</p>
          </article>
          <article>
            <h3>Project setup assessment</h3>
            <p>Map repository instructions and their scopes, identify which files the chosen feature supports, then use relevant guidance for the title-filter change without duplicating or overriding project facts.</p>
          </article>
          <article>
            <h3>End-to-end capstone</h3>
            <p>Complete a small issue-to-PR workflow in a sandbox: plan, implementation, tests, security review, human diff review, and a clear record of accepted or rejected findings. Do not merge automatically.</p>
          </article>
        </div>
        <h3>Review rubric</h3>
        <ul className="lab-rubric">
          {assessmentRubric.map(item => (
            <li key={item.criterion}><strong>{item.criterion}:</strong> {item.evidence}</li>
          ))}
        </ul>
      </section>

      <section className="lab-measurement" aria-labelledby="lab-measurement-heading">
        <p className="eyebrow">Evaluation</p>
        <h2 id="lab-measurement-heading">Measure outcomes, not autocomplete counts</h2>
        <p>For a team pilot, compare similar task types before and after adoption. Record time to a reviewed change alongside correctness, test results, reviewer rework, escaped defects, and developer feedback. Define the baseline and collection policy with the team before collecting data.</p>
        <p>Accepted suggestions, token use, or a single fast task are not proof of productivity or quality. Report the observed sample and limitations; do not make a universal causal claim from a small comparison.</p>
      </section>

      <section className="lab-coverage" id="coverage" aria-labelledby="lab-coverage-heading">
        <p className="eyebrow">Course scope map</p>
        <h2 id="lab-coverage-heading">What this course covers—and does not</h2>
        <p>This is a focused developer introduction, not a complete guide to every client, plan, or organization configuration.</p>
        <ul>
          {topicCoverage.map(item => (
            <li key={item.topic}>
              <span className={item.status.startsWith('Out of scope') ? 'coverage-status out-of-scope' : 'coverage-status'}>{item.status}</span>
              <strong>{item.topic}</strong>
            </li>
          ))}
        </ul>
      </section>

      <footer className="lab-footer">
        <Link className="button-link button-secondary" to="/">Return to the learning path</Link>
        <Link className="button-link button-secondary" to="/slides">Review current documentation links</Link>
      </footer>
    </main>
  )
}
