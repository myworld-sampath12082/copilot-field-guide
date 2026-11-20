import { FormEvent, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CourseVisual from '../components/CourseVisual'
import { courseReviewDate, LessonSection, getLesson, getSectionLessons, lessons, sourceSlides } from '../data/course'

type Props = {
  completedLessons: string[]
  onComplete: (slug: string) => void
}

const sectionNames: LessonSection[] = ['Copilot workflow', 'Project setup']

export default function LessonPage({ completedLessons, onComplete }: Props) {
  const { slug } = useParams()
  const lesson = getLesson(slug)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setChecked(false)
  }, [slug])

  if (!lesson) return <Navigate to="/" replace />

  const lessonIndex = lessons.indexOf(lesson)
  const previous = lessons[lessonIndex - 1]
  const next = lessons[lessonIndex + 1]
  const correctAnswer = lesson.check.correctAnswer
  const lessonSlug = lesson.slug
  const isCorrect = selectedAnswer === correctAnswer
  const isComplete = completedLessons.includes(lesson.slug)

  function checkAnswer(event: FormEvent) {
    event.preventDefault()
    if (selectedAnswer === null) return
    setChecked(true)
    if (selectedAnswer === correctAnswer) onComplete(lessonSlug)
  }

  return (
    <main className="lesson-page" id="main-content">
      <div className="lesson-contents-shell">
        <nav className="lesson-contents desktop-lesson-contents" aria-label="Course lessons">
          <ContentsLinks completedLessons={completedLessons} currentSlug={lesson.slug} />
        </nav>
        <details className="mobile-lesson-contents">
          <summary>Course contents · {lesson.shortTitle}</summary>
          <nav className="lesson-contents" aria-label="Course lessons">
            <ContentsLinks completedLessons={completedLessons} currentSlug={lesson.slug} />
          </nav>
        </details>
      </div>

      <article className="lesson-content">
        <header className="lesson-header">
          <p className="eyebrow">{lesson.section} · Lesson {lessonIndex + 1} of {lessons.length}</p>
          <h1>{lesson.title}</h1>
          <p className="lesson-summary">{lesson.summary}</p>
          <p className="surface-note"><strong>Surface and scope:</strong> {lesson.surface} <span>Content checked {courseReviewDate}; availability may change by client, plan, and organization policy.</span></p>
          {isComplete && <p className="completion-note" role="status">Knowledge check completed. You can revisit this lesson any time.</p>}
        </header>

        <section className="lesson-explanation" aria-labelledby="explanation-heading">
          <h2 id="explanation-heading">In plain language</h2>
          <p>{lesson.explanation}</p>
          <p className="accuracy-note"><strong>Keep in mind:</strong> {lesson.caveat}</p>
        </section>

        <CourseVisual visual={lesson.visual} />

        <section className="applied-exercise" aria-labelledby="exercise-heading">
          <p className="eyebrow">Apply it</p>
          <h2 id="exercise-heading">{lesson.exercise.title}</h2>
          <p>{lesson.exercise.context}</p>
          <h3>Prompt or task</h3>
          <pre><code>{lesson.exercise.prompt}</code></pre>
          <h3>Expected result</h3>
          <p>{lesson.exercise.expected}</p>
          <h3>Validate it</h3>
          <ul>
            {lesson.exercise.validation.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="scenario-card" aria-labelledby="scenario-heading">
          <p className="eyebrow">Illustrative scenario</p>
          <h2 id="scenario-heading">{lesson.scenario.context}</h2>
          <dl className="scenario-steps">
            <div>
              <dt>What you do</dt>
              <dd>{lesson.scenario.youDo}</dd>
            </div>
            <div>
              <dt>What Copilot may do</dt>
              <dd>{lesson.scenario.copilotMayDo}</dd>
            </div>
            <div>
              <dt>What to review</dt>
              <dd>{lesson.scenario.review}</dd>
            </div>
          </dl>
        </section>

        <section className="knowledge-check" aria-labelledby="check-heading">
          <p className="eyebrow">Practice</p>
          <h2 id="check-heading">Check your understanding</h2>
          <form onSubmit={checkAnswer}>
            <fieldset>
              <legend>{lesson.check.question}</legend>
              {lesson.check.options.map((option, index) => {
                const id = `answer-${lesson.slug}-${index}`
                return (
                  <label className="answer-option" htmlFor={id} key={option}>
                    <input
                      id={id}
                      type="radio"
                      name={`answer-${lesson.slug}`}
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => {
                        setSelectedAnswer(index)
                        setChecked(false)
                      }}
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </fieldset>
            <button className="button-link button-primary" type="submit" disabled={selectedAnswer === null}>
              Check answer
            </button>
          </form>
          {checked && (
            <p className={isCorrect ? 'answer-feedback correct' : 'answer-feedback'} role="status">
              <strong>{isCorrect ? 'That’s right.' : 'Not quite.'}</strong> {lesson.check.explanation}
            </p>
          )}
        </section>

        <section className="lesson-resources" aria-labelledby="resources-heading">
          <h2 id="resources-heading">Current references</h2>
          <p>Use official documentation to confirm support and behavior for your selected surface.</p>
          <ul>
            {lesson.resources.map(resource => (
              <li key={resource.url}>
                <a href={resource.url} target="_blank" rel="noreferrer">{resource.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="slide-references" id="source-reference" aria-labelledby="source-heading">
          <h2 id="source-heading">Related presentation slides</h2>
          <p>These references point to the source deck’s slide index and section titles.</p>
          <ul>
            {lesson.slides.map(number => {
              const slide = sourceSlides.find(item => item.number === number)
              return slide ? (
                <li key={number}>
                  <Link to={`/slides#slide-${number}`}>Slide {number} · {slide.title}</Link>
                </li>
              ) : null
            })}
          </ul>
        </section>

        <nav className="lesson-pagination" aria-label="Lesson navigation">
          {previous ? (
            <Link className="button-link button-secondary" to={`/learn/${previous.slug}`}>← Previous: {previous.shortTitle}</Link>
          ) : <span />}
          {next ? (
            <Link className="button-link button-primary" to={`/learn/${next.slug}`}>Next: {next.shortTitle} →</Link>
          ) : (
            <Link className="button-link button-primary" to="/">Finish the learning path</Link>
          )}
        </nav>
      </article>
    </main>
  )
}

function ContentsLinks({ completedLessons, currentSlug }: { completedLessons: string[]; currentSlug: string }) {
  return (
    <>
      {sectionNames.map(section => (
        <section className="lesson-contents-group" key={section}>
          <h2>{section}</h2>
          <ol>
            {getSectionLessons(section).map(item => (
              <li key={item.slug}>
                <Link
                  className={item.slug === currentSlug ? 'active' : ''}
                  aria-current={item.slug === currentSlug ? 'page' : undefined}
                  to={`/learn/${item.slug}`}
                >
                  <span>{item.shortTitle}</span>
                  {completedLessons.includes(item.slug) && <span className="nav-complete" aria-label="completed">✓</span>}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <Link className="slide-index-link" to="/slides">All slide references</Link>
    </>
  )
}
