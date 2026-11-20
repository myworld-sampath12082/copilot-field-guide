import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { lessons } from './data/course'
import BoardPage from './pages/BoardPage'
import CourseHomePage from './pages/CourseHomePage'
import DeveloperLabPage from './pages/DeveloperLabPage'
import LessonPage from './pages/LessonPage'
import SlideIndexPage from './pages/SlideIndexPage'
import TaskDetailPage from './pages/TaskDetailPage'
import TaskFormPage from './pages/TaskFormPage'

const progressKey = 'copilot-course-completed'
const practiceTrackerEnabled = import.meta.env.DEV

function readProgress() {
  const saved = window.localStorage.getItem(progressKey)
  if (!saved) return []
  return saved.split(',').filter(slug => lessons.some(lesson => lesson.slug === slug))
}

export default function App() {
  const location = useLocation()
  const [completedLessons, setCompletedLessons] = useState<string[]>(readProgress)

  function markComplete(slug: string) {
    if (completedLessons.includes(slug)) return
    const updated = [...completedLessons, slug]
    window.localStorage.setItem(progressKey, updated.join(','))
    setCompletedLessons(updated)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="site-brand" to="/" aria-label="Copilot Field Guide home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>Copilot Field Guide</span>
        </Link>
        <nav className="site-navigation" aria-label="Main navigation">
          <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>Learning path</Link>
          <Link to="/slides" aria-current={location.pathname === '/slides' ? 'page' : undefined}>Slide references</Link>
          <Link to="/lab" aria-current={location.pathname === '/lab' ? 'page' : undefined}>Hands-on lab</Link>
          {practiceTrackerEnabled && (
            <Link to="/practice" aria-current={location.pathname.startsWith('/practice') ? 'page' : undefined}>Practice tracker</Link>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<CourseHomePage completedLessons={completedLessons} />} />
        <Route path="/learn/:slug" element={<LessonPage completedLessons={completedLessons} onComplete={markComplete} />} />
        <Route path="/slides" element={<SlideIndexPage />} />
        <Route path="/lab" element={<DeveloperLabPage />} />
        {practiceTrackerEnabled ? (
          <>
            <Route path="/practice" element={<BoardPage />} />
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
          </>
        ) : (
          <Route
            path="/practice"
            element={
              <main className="page" id="main-content">
                <h1>Practice tracker is local-only</h1>
                <p>The public course includes lessons and knowledge checks. Task tracking requires the local Java API and PostgreSQL database.</p>
                <Link to="/">Return to the learning path</Link>
              </main>
            }
          />
        )}
        <Route path="*" element={<main className="page" id="main-content"><h1>Page not found</h1><Link to="/">Return to the learning path</Link></main>} />
      </Routes>
    </div>
  )
}
