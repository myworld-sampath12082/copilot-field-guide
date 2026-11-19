import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Dropdown, Option, Card, Badge, Textarea, MessageBar, MessageBarBody } from '@fluentui/react-components'
import { TaskDetail, TaskStatus, tasksApi } from '../api/tasks'

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<TaskDetail | null>(null)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  async function load() {
    if (!id) return
    try {
      const value = await tasksApi.get(id)
      setTask(value)
      setNotes(value.notes)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load task')
    }
  }

  useEffect(() => { load() }, [id])

  async function saveStatus(status: TaskStatus) {
    if (!task) return
    try {
      const updated = await tasksApi.updateStatus(task.id, status)
      setTask(updated)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to update status')
    }
  }

  async function saveNotes() {
    if (!task) return
    try {
      const updated = await tasksApi.update(task.id, {
        title: task.title, topic: task.topic, objective: task.objective,
        steps: task.steps, notes, status: task.status
      })
      setTask(updated)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save notes')
    }
  }

  async function updateStep(index: number, completed: boolean) {
    if (!task) return
    try {
      setTask(await tasksApi.updateStep(task.id, index, completed))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to update checklist')
    }
  }

  async function remove() {
    if (!task || !window.confirm('Delete this training task?')) return
    try {
      await tasksApi.remove(task.id)
      navigate('/practice')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to delete task')
    }
  }

  if (!task) return <main className="page" id="main-content"><p>{error || 'Loading task…'}</p></main>

  const statusText = task.status === 'TO_DO' ? 'To do' : task.status === 'IN_PROGRESS' ? 'In progress' : 'Done'

  return (
    <main className="page" id="main-content">
      <div className="page-heading">
        <div><p className="eyebrow">{task.topic}</p><h1>{task.title}</h1></div>
        <Button onClick={() => navigate('/practice')}>Back to board</Button>
      </div>
      {error && <MessageBar intent="error"><MessageBarBody>{error}</MessageBarBody></MessageBar>}
      <div className="detail-layout">
        <Card className="lesson-card">
          <Badge appearance="tint">{task.topic}</Badge>
          <h2>Learning objective</h2>
          <p>{task.objective || 'No objective has been added yet.'}</p>
          <h2>Checklist</h2>
          {task.steps.length ? (
            <ol className="checklist">
              {task.steps.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <label className="checklist-item">
                    <input
                      type="checkbox"
                      checked={task.completedSteps.includes(index)}
                      onChange={event => updateStep(index, event.currentTarget.checked)}
                    />
                    <span>{step}</span>
                  </label>
                </li>
              ))}
            </ol>
          ) : <p>No checklist steps yet.</p>}
        </Card>
        <aside className="lesson-sidebar">
          <Card>
            <h3>Progress</h3>
            <Dropdown value={statusText} selectedOptions={[task.status]} onOptionSelect={(_, data) => saveStatus(data.optionValue as TaskStatus)}>
              <Option value="TO_DO">To do</Option>
              <Option value="IN_PROGRESS">In progress</Option>
              <Option value="DONE">Done</Option>
            </Dropdown>
          </Card>
          <Card>
            <h3>Notes</h3>
            <Textarea rows={7} value={notes} onChange={(_, data) => setNotes(data.value)} placeholder="What did you learn?" />
            <div className="sidebar-actions"><Button appearance="primary" onClick={saveNotes}>Save notes</Button></div>
          </Card>
          <div className="action-row">
            <Button onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</Button>
            <Button appearance="subtle" onClick={remove}>Delete</Button>
          </div>
        </aside>
      </div>
    </main>
  )
}
