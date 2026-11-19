import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, test, expect } from 'vitest'
import CourseHomePage from '../pages/CourseHomePage'
import LessonPage from '../pages/LessonPage'
import SlideIndexPage from '../pages/SlideIndexPage'

test('presents the learning path as the main experience', () => {
  render(<MemoryRouter><CourseHomePage completedLessons={[]} /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'Copilot project setup & workflow' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Project setup' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Copilot workflow' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Open practice tracker' })).toHaveAttribute('href', '/practice')
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
  expect(screen.getByRole('img', { name: /mode menu showing Interactive, Plan, and Autopilot/i })).toBeInTheDocument()
})

test('the slide index links source sections back to relevant lessons', () => {
  render(<MemoryRouter><SlideIndexPage /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: 'Presentation slide references' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Repository Instruction Files' })).toBeInTheDocument()
  const agentsLinks = screen.getAllByRole('link', { name: 'Open lesson: AGENTS.md' })
  expect(agentsLinks).toHaveLength(3)
  expect(agentsLinks[0]).toHaveAttribute('href', '/learn/agents-md')
  expect(screen.getByText('Local machine, GitHub Environments, and Dev Tunnels.')).toBeInTheDocument()
})
