import { Link } from 'react-router-dom'
import { LessonSection, lessons, getSectionLessons } from '../data/course'

const sections: Array<{ name: LessonSection; introduction: string }> = [
  {
    name: 'Copilot workflow',
    introduction: 'Explore how roles, modes, permissions, environment, models, context, and status affect a task.'
  },
  {
    name: 'Project setup',
    introduction: 'Learn what each project file is for, how its scope works, and how the pieces fit together.'
  }
]

export default function CourseHomePage({ completedLessons }: { completedLessons: string[] }) {
  const completed = new Set(completedLessons)
  const firstIncomplete = lessons.find(lesson => !completed.has(lesson.slug)) ?? lessons[0]
  const percentage = Math.round((completed.size / lessons.length) * 100)

  return (
    <main className="course-page" id="main-content">
      <section className="course-hero">
        <div className="hero-copy">
          <p className="eyebrow">AI Enablement Pilot · Guided course</p>
          <h1>Copilot project setup &amp; workflow</h1>
          <p className="hero-description">
            A practical learning path through the project guidance files and Copilot workflow shown in the presentation.
            Each lesson includes an example, a visual, a practice check, and the related source slide.
          </p>
          <div className="hero-actions">
            <Link className="button-link button-primary" to={`/learn/${firstIncomplete.slug}`}>
              {completed.size ? 'Continue learning' : 'Start learning'}
            </Link>
            <Link className="button-link button-secondary" to="/slides">Browse slide references</Link>
          </div>
        </div>
        <aside className="course-progress" aria-label="Course progress">
          <p className="eyebrow">Your progress</p>
          <strong>{completed.size} <span>of {lessons.length} lessons</span></strong>
          <progress value={completed.size} max={lessons.length} aria-label={`${percentage}% of lessons completed`} />
          <p>{percentage}% complete · saved in this browser</p>
        </aside>
      </section>

      <section className="learning-intro" aria-labelledby="learning-path-heading">
        <div>
          <p className="eyebrow">Learning path</p>
          <h2 id="learning-path-heading">Follow the presentation in two parts</h2>
        </div>
        <p>Source of truth: the 17-slide Copilot Project Setup Files presentation. Behavior and availability can vary by feature, client, account, settings, and organization policy.</p>
      </section>

      <div className="course-sections">
        {sections.map(section => {
          const sectionLessons = getSectionLessons(section.name)
          return (
            <section className="course-section" key={section.name} aria-labelledby={`section-${section.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <header className="course-section-header">
                <div>
                  <p className="eyebrow">{sectionLessons.length} lessons</p>
                  <h2 id={`section-${section.name.toLowerCase().replace(/\s+/g, '-')}`}>{section.name}</h2>
                </div>
                <p>{section.introduction}</p>
              </header>
              <ol className="lesson-card-grid">
                {sectionLessons.map((lesson, index) => {
                  const isComplete = completed.has(lesson.slug)
                  return (
                    <li key={lesson.slug}>
                      <Link className="lesson-card-link" to={`/learn/${lesson.slug}`}>
                        <article className={`lesson-card-preview${isComplete ? ' is-complete' : ''}`}>
                          <div className="lesson-card-meta">
                            <span>Lesson {lessons.indexOf(lesson) + 1}</span>
                            <span>{isComplete ? 'Completed' : `Step ${index + 1} of ${sectionLessons.length}`}</span>
                          </div>
                          <h3>{lesson.title}</h3>
                          <p>{lesson.summary}</p>
                          <span className="lesson-card-footer">
                            Slides {lesson.slides.join(', ')} <span aria-hidden="true">→</span>
                          </span>
                        </article>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </section>
          )
        })}
      </div>

      {import.meta.env.DEV && (
        <aside className="practice-promo">
          <div>
            <p className="eyebrow">Keep practicing</p>
            <h2>Use the project setup task tracker</h2>
            <p>Retained from the original app: create lessons, check off steps, save notes, and track status.</p>
          </div>
          <Link className="button-link button-secondary" to="/practice">Open practice tracker</Link>
        </aside>
      )}
    </main>
  )
}
