import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, Textarea, Dropdown, Option, MessageBar, MessageBarBody } from '@fluentui/react-components'
import { TaskInput, TaskStatus, tasksApi } from '../api/tasks'

const topics = ['AGENTS.md', 'README.md', '.github/copilot-instructions.md', '.github/instructions/', 'overview.md', 'skills']

export default function TaskFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('AGENTS.md')
  const [objective, setObjective] = useState('')
  const [steps, setSteps] = useState('')
  const [status, setStatus] = useState<TaskStatus>('TO_DO')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    tasksApi.get(id).then(task => {
      setTitle(task.title)
      setTopic(task.topic)
      setObjective(task.objective)
      setSteps(task.steps.join('\n'))
      setStatus(task.status)
      setNotes(task.notes)
    }).catch(e => setError(e instanceof Error ? e.message : 'Unable to load task'))
  }, [id])

  async function save(event: FormEvent) {
    event.preventDefault()
    setError('')
    const task: TaskInput = {
      title, topic, objective,
      steps: steps.split('\n').map(step => step.trim()).filter(Boolean),
      status, notes
    }
    try {
      if (id) {
        await tasksApi.update(Number(id), task)
        navigate(`/tasks/${id}`)
      } else {
        const created = await tasksApi.create(task)
        navigate(`/tasks/${created.id}`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save task')
    }
  }

  return (
    <main className="page" id="main-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Learning task</p>
          <h1>{id ? 'Edit task' : 'Create a task'}</h1>
        </div>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </div>
      {error && <MessageBar intent="error"><MessageBarBody>{error}</MessageBarBody></MessageBar>}
      <form className="form-card" onSubmit={save}>
        <label>Task title<Input required value={title} onChange={(_, data) => setTitle(data.value)} /></label>
        <label>Guidance topic
          <Dropdown value={topic} selectedOptions={[topic]} onOptionSelect={(_, data) => setTopic(String(data.optionValue))}>
            {topics.map(item => <Option key={item} value={item}>{item}</Option>)}
          </Dropdown>
        </label>
        <label>Objective<Textarea value={objective} onChange={(_, data) => setObjective(data.value)} /></label>
        <label>Checklist (one step per line)<Textarea rows={5} value={steps} onChange={(_, data) => setSteps(data.value)} /></label>
        <label>Status
          <Dropdown value={status.replace('_', ' ').toLowerCase()} selectedOptions={[status]} onOptionSelect={(_, data) => setStatus(data.optionValue as TaskStatus)}>
            <Option value="TO_DO">To do</Option>
            <Option value="IN_PROGRESS">In progress</Option>
            <Option value="DONE">Done</Option>
          </Dropdown>
        </label>
        {id && <label>Notes<Textarea rows={4} value={notes} onChange={(_, data) => setNotes(data.value)} /></label>}
        <div className="form-actions"><Button appearance="primary" type="submit">Save task</Button></div>
      </form>
    </main>
  )
}
