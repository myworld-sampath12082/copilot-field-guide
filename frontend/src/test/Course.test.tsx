import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, test, expect } from 'vitest'
import CourseHomePage from '../pages/CourseHomePage'
import DeveloperLabPage from '../pages/DeveloperLabPage'
import LessonPage from '../pages/LessonPage'
import SlideIndexPage from '../pages/SlideIndexPage'
import { lessons } from '../data/course'
import { labExercises } from '../data/lab'

test('presents the learning path as the main experience', () => {
  render(<MemoryRouter><CourseHomePage completedLessons={[]} /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'Copilot app workflow & project setup' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Project setup' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Copilot workflow' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Open practice tracker' })).toHaveAttribute('href', '/practice')
  expect(screen.getByRole('link', { name: 'Open the hands-on lab' })).toHaveAttribute('href', '/lab')
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
  expect(promptExercise.prompt).toContain('do not transfer that syntax to VS Code')

  const regressionExercise = labExercises.find(exercise => exercise.title.includes('checklist-state regression'))
  expect(regressionExercise?.prompt).toContain('notes-only PUT')
  expect(regressionExercise?.prompt).toContain('status-only PATCH')
  expect(regressionExercise?.expected).toContain('only the notes-only PUT preservation test fails')

  const setupExercise = lessons.find(lesson => lesson.slug === 'why-setup-files')?.exercise
  expect(setupExercise?.title).toContain('with and without project guidance')
  expect(setupExercise?.prompt).toContain('Run A:')
  expect(setupExercise?.prompt).toContain('Run B:')
})

test('the hands-on lab covers the coding capstone and explicit course scope', () => {
  render(<MemoryRouter><DeveloperLabPage /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'From prompt to reviewed change' })).toBeInTheDocument()
  expect(screen.getByText(/Java 21, Node\.js 24\+ with npm, and Docker with Compose/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'End-to-end capstone' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Check policy before sharing context or granting access' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Check data handling and access policy before prompting' })).toBeInTheDocument()
  expect(screen.getByText(/individual Copilot Free, Pro, Pro\+, and Max plans may be used to train and improve models/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'What this course covers—and does not' })).toBeInTheDocument()
  expect(screen.getByText(/install arbitrary MCP servers or change enterprise admin policy/i)).toBeInTheDocument()
})
