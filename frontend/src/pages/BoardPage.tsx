import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Dropdown, Option, ProgressBar, Badge, Card } from '@fluentui/react-components'
import { Add24Regular } from '@fluentui/react-icons'
import { TaskStatus, TaskSummary, tasksApi } from '../api/tasks'

const topics = ['All topics', 'AGENTS.md', 'README.md', '.github/copilot-instructions.md', '.github/instructions/', 'overview.md', 'skills']
const statusOptions = ['All statuses', 'TO_DO', 'IN_PROGRESS', 'DONE']

function statusLabel(status: TaskStatus) {
  return status === 'TO_DO' ? 'To do' : status === 'IN_PROGRESS' ? 'In progress' : 'Done'
}

export default function BoardPage() {
  const [tasks, setTasks] = useState<TaskSummary[]>([])
  const [topic, setTopic] = useState('All topics')
  const [status, setStatus] = useState('All statuses')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function load() {
    setError('')
    try {
      setTasks(await tasksApi.list(topic === 'All topics' ? '' : topic, status === 'All statuses' ? '' : status))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load tasks')
    }
  }

  useEffect(() => { load() }, [topic, status])

  const progress = useMemo(() => tasks.length ? tasks.filter(t => t.status === 'DONE').length / tasks.length : 0, [tasks])

  return (
    <main className="page" id="main-content">
      <div className="page-heading">
        <div><p className="eyebrow">Training workspace</p><h1>Guidance task board</h1></div>
        <Button appearance="primary" icon={<Add24Regular />} onClick={() => navigate('/tasks/new')}>New task</Button>
      </div>
      {error && <p className="error">{error}</p>}
      <section className="progress-card">
        <div className="progress-copy"><strong>{Math.round(progress * 100)}%</strong><span>completed in this view</span></div>
        <ProgressBar value={progress} />
      </section>
      <div className="filters">
        <Dropdown value={topic} selectedOptions={[topic]} onOptionSelect={(_, data) => setTopic(String(data.optionValue))}>
          {topics.map(item => <Option key={item} value={item}>{item}</Option>)}
        </Dropdown>
        <Dropdown value={status === 'All statuses' ? status : statusLabel(status as TaskStatus)} selectedOptions={[status]} onOptionSelect={(_, data) => setStatus(String(data.optionValue))}>
          {statusOptions.map(item => <Option key={item} value={item}>{item === 'All statuses' ? item : statusLabel(item as TaskStatus)}</Option>)}
        </Dropdown>
      </div>
      {tasks.length === 0 ? (
        <Card className="empty-card"><h2>No tasks yet</h2><p>Create a task to start learning one guidance file at a time.</p><Link to="/tasks/new">Create the first task</Link></Card>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <Link key={task.id} to={`/tasks/${task.id}`} className="task-link">
              <Card className="task-card">
                <div className="task-card-top"><Badge appearance="tint">{task.topic}</Badge><Badge color={task.status === 'DONE' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning' : 'informative'}>{statusLabel(task.status)}</Badge></div>
                <h2>{task.title}</h2>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
