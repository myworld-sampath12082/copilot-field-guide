import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BoardPage from '../pages/BoardPage'
import { vi, test, expect } from 'vitest'

vi.mock('../api/tasks', () => ({
  tasksApi: { list: vi.fn().mockResolvedValue([]) }
}))

test('shows the beginner-friendly empty state', async () => {
  render(<MemoryRouter><BoardPage /></MemoryRouter>)
  expect(await screen.findByText('No tasks yet')).toBeInTheDocument()
  expect(screen.getByText('Create a task to start learning one guidance file at a time.')).toBeInTheDocument()
})
