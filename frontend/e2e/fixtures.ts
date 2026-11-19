import { expect, test as base } from '@playwright/test'
import type { TaskInput, TaskSummary } from '../src/api/tasks'

type E2EFixtures = {
  taskFactory: (overrides?: Partial<TaskInput>) => Promise<TaskSummary>
  trackTask: (id: number) => void
}

export const test = base.extend<E2EFixtures>({
  taskFactory: async ({ request }, use) => {
    const taskIds = new Set<number>()
    let taskNumber = 0

    await use(async (overrides = {}) => {
      const input: TaskInput = {
        title: `Playwright task ${Date.now()}-${++taskNumber}`,
        topic: 'AGENTS.md',
        objective: 'Practice repository guidance.',
        steps: ['Read the guidance', 'Apply it'],
        status: 'TO_DO',
        ...overrides
      }
      const { notes: _notes, ...createRequest } = input
      const response = await request.post('/api/tasks', { data: createRequest })
      expect(response.status()).toBe(201)

      const task = await response.json() as TaskSummary
      taskIds.add(task.id)
      return task
    })

    for (const id of taskIds) {
      const response = await request.delete(`/api/tasks/${id}`)
      expect([204, 404]).toContain(response.status())
    }
  },
  trackTask: async ({ request }, use) => {
    const taskIds = new Set<number>()
    await use((id) => taskIds.add(id))
    for (const id of taskIds) {
      const response = await request.delete(`/api/tasks/${id}`)
      expect([204, 404]).toContain(response.status())
    }
  }
})

export { expect }
