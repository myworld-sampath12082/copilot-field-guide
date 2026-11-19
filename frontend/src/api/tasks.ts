export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE'

export interface TaskSummary {
  id: number
  title: string
  topic: string
  status: TaskStatus
}

export interface TaskDetail extends TaskSummary {
  objective: string
  steps: string[]
  completedSteps: number[]
  notes: string
}

export interface TaskInput {
  title: string
  topic: string
  objective: string
  steps: string[]
  notes?: string
  status: TaskStatus
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(body.message || 'Request failed')
  }
  if (response.status === 204) return undefined as T
  return response.json()
}

export const tasksApi = {
  list: (topic = '', status = '') => {
    const params = new URLSearchParams()
    if (topic) params.set('topic', topic)
    if (status) params.set('status', status)
    const query = params.size ? `?${params}` : ''
    return request<TaskSummary[]>(`/tasks${query}`)
  },
  get: (id: string) => request<TaskDetail>(`/tasks/${id}`),
  create: (task: TaskInput) => request<TaskSummary>('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  update: (id: number, task: TaskInput) =>
    request<TaskDetail>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) }),
  updateStatus: (id: number, status: TaskStatus) =>
    request<TaskDetail>(`/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  updateStep: (id: number, index: number, completed: boolean) =>
    request<TaskDetail>(`/tasks/${id}/steps/${index}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed })
    }),
  remove: (id: number) => request<void>(`/tasks/${id}`, { method: 'DELETE' })
}
