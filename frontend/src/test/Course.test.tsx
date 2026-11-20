import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, test, expect } from 'vitest'
import CourseHomePage from '../pages/CourseHomePage'
import DeveloperLabPage from '../pages/DeveloperLabPage'
import LessonPage from '../pages/LessonPage'
import SlideIndexPage from '../pages/SlideIndexPage'
import { courseReviewDate, lessons } from '../data/course'
import { labExercises } from '../data/lab'

test('presents the learning path as the main experience', () => {
  render(<MemoryRouter><CourseHomePage completedLessons={[]} /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'Copilot app workflow & project setup' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Project setup' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Copilot workflow' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Open practice tracker' })).toHaveAttribute('href', '/practice')
  expect(screen.getByRole('link', { name: 'Open the hands-on lab' })).toHaveAttribute('href', '/lab')
  expect(screen.getByText(new RegExp(`Content references reviewed ${courseReviewDate}`))).toBeInTheDocument()
})

test('a correct knowledge check marks its lesson complete and includes its source reference', () => {
  const onComplete = vi.fn()
  render(
    <MemoryRouter initialEntries={['/learn/session-modes']}>
      <Routes>
        <Route path="/learn/:slug" element={<LessonPage completedLessons={[]} onComplete={onComplete} />} />
      </Routes>
    </MemoryRouter>
  )

  fireEvent.click(screen.getByRole('radio', { name: 'It prepares a plan for you to review before execution.' }))
  fireEvent.click(screen.getByRole('button', { name: 'Check answer' }))

  expect(onComplete).toHaveBeenCalledWith('session-modes')
  expect(screen.getByRole('status')).toHaveTextContent('That’s right.')
  expect(screen.getByRole('link', { name: 'Slide 3 · Session Modes' })).toHaveAttribute('href', '/slides#slide-3')
  expect(screen.getByRole('heading', { name: 'Three collaboration patterns in the source deck' })).toBeInTheDocument()
  expect(screen.getByText(/source screenshot does not record its client or version/i)).toBeInTheDocument()
})

test('the slide index links source sections back to relevant lessons', () => {
  render(<MemoryRouter><SlideIndexPage /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'Presentation slide references' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Current official references' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Repository Instruction Files' })).toBeInTheDocument()
  const agentsLinks = screen.getAllByRole('link', { name: 'Open lesson: AGENTS.md' })
  expect(agentsLinks).toHaveLength(3)
  expect(agentsLinks[0]).toHaveAttribute('href', '/learn/agents-md')
  expect(screen.getByText('Distinguish local, Cloud, Actions, user-managed custom environments, and remote IDE workflows.')).toBeInTheDocument()
})

test('every lesson has a scoped surface, a prompt, an expected result, and validation steps', () => {
  expect(lessons).toHaveLength(16)
  for (const lesson of lessons) {
    expect(lesson.surface.length).toBeGreaterThan(0)
    expect(lesson.exercise.prompt.length).toBeGreaterThan(0)
    expect(lesson.exercise.expected.length).toBeGreaterThan(0)
    expect(lesson.exercise.validation.length).toBeGreaterThan(0)
    expect(lesson.resources.length).toBeGreaterThan(0)
  }
})

test('applied exercises distinguish client syntax, isolate regression behavior, and compare context', () => {
  const promptExercise = labExercises[0]
  expect(promptExercise.references?.some(reference => reference.label.startsWith('VS Code Chat'))).toBe(true)
  expect(promptExercise.references?.filter(reference => reference.label.includes('app-only'))).toHaveLength(2)
  expect(promptExercise.references?.some(reference => reference.url.endsWith('chat-cheat-sheet?tool=vscode'))).toBe(true)
  expect(promptExercise.prompt).toContain('invoke `/explain`')
  expect(promptExercise.prompt).toContain('invoke `/tests`')
  expect(promptExercise.prompt).toContain('`/plan`')
  expect(promptExercise.prompt).toContain('`/review`')
  expect(promptExercise.prompt).toContain('Do not use those app commands as if they were VS Code commands.')
  expect(promptExercise.expected).toContain('proposed JUnit 5 test without editing files')
  expect(promptExercise.validation).toContain('Type `/` in VS Code Chat and confirm the current command list; command availability can vary by client version and context.')

  const regressionExercise = labExercises.find(exercise => exercise.title.includes('checklist-state regression'))
  expect(regressionExercise?.prompt).toContain('notes-only PUT')
  expect(regressionExercise?.prompt).toContain('status-only PATCH')
  expect(regressionExercise?.expected).toContain('only the notes-only PUT preservation test fails')

  const setupExercise = lessons.find(lesson => lesson.slug === 'why-setup-files')?.exercise
  expect(setupExercise?.title).toContain('with and without project guidance')
  expect(setupExercise?.prompt).toContain('Run A:')
  expect(setupExercise?.prompt).toContain('Run B:')
})

test('agent selection distinguishes current VS Code controls from Copilot app modes', () => {
  render(
    <MemoryRouter initialEntries={['/learn/agent-selection']}>
      <Routes>
        <Route path="/learn/:slug" element={<LessonPage completedLessons={[]} onComplete={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  )

  const explorationLinks = screen.getAllByRole('link', { name: 'VS Code · explore a codebase without changing files' })
  expect(explorationLinks).toHaveLength(2)
  expect(explorationLinks[0]).toHaveAttribute(
    'href',
    'https://code.visualstudio.com/docs/agents/guides/explore-a-codebase'
  )
  expect(screen.getByText(/Copilot session target, Agent role, and Manual permissions/i)).toBeInTheDocument()
  expect(screen.getAllByText(/not a permission boundary/i).length).toBeGreaterThan(0)
})

test('the tool-permissions quiz explicitly checks that policy restrictions still apply', () => {
  render(
    <MemoryRouter initialEntries={['/learn/tool-permissions']}>
      <Routes>
        <Route path="/learn/:slug" element={<LessonPage completedLessons={[]} onComplete={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { name: 'Where to find app-session tool permissions' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('radio', { name: /approval preference does not override policy/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Check answer' }))

  expect(screen.getByRole('status')).toHaveTextContent('does not grant capabilities blocked by product or organization policy')
})

test('the model lesson separates current app controls from historical screenshots', () => {
  render(
    <MemoryRouter initialEntries={['/learn/models-and-fusion']}>
      <Routes>
        <Route path="/learn/:slug" element={<LessonPage completedLessons={[]} onComplete={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { name: 'Current documented model-control path · GitHub Copilot app' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Copilot Fusion · execution patterns and effort levels' })).toHaveAttribute(
    'href',
    'https://docs.github.com/en/copilot/concepts/models/copilot-fusion'
  )
  expect(screen.getByText(/source-deck screenshots are historical/i)).toBeInTheDocument()
})

test('the hands-on lab covers the coding capstone and explicit course scope', () => {
  render(<MemoryRouter><DeveloperLabPage /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'From prompt to reviewed change' })).toBeInTheDocument()
  expect(screen.getByText(/Java 21, Node\.js 24\+ with npm, and Docker with Compose/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'No local API yet? Start with a read-only source trace' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'controller' })).toHaveAttribute(
    'href',
    'https://github.com/sampath12082/copilot-field-guide/blob/main/backend/src/main/java/com/example/training/tasks/TrainingTaskController.java'
  )
  expect(screen.getByRole('heading', { name: 'End-to-end capstone' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Check policy before sharing context or granting access' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Check data handling and access policy before prompting' })).toBeInTheDocument()
  expect(screen.getByText(/individual Copilot Free, Pro, Pro\+, and Max plans may be used to train and improve models/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'What this course covers—and does not' })).toBeInTheDocument()
  expect(screen.getByText(/install arbitrary MCP servers or change enterprise admin policy/i)).toBeInTheDocument()
})
