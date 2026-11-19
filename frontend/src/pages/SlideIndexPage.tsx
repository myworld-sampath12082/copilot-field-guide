import { Link } from 'react-router-dom'
import { lessons, sourceSlides } from '../data/course'

export default function SlideIndexPage() {
  return (
    <main className="slide-index-page" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Source deck · 17 slides</p>
        <h1>Presentation slide references</h1>
        <p>
          Each entry names a section from the source presentation. Where a lesson covers the slide,
          use its link to return to the guided explanation.
        </p>
      </header>
      <ol className="slide-reference-list">
        {sourceSlides.map(slide => {
          const relatedLessons = lessons.filter(lesson => lesson.slides.includes(slide.number))
          return (
            <li id={`slide-${slide.number}`} key={slide.number}>
              <article className="slide-reference-card">
                <p className="eyebrow">Slide {slide.number}</p>
                <h2>{slide.title}</h2>
                <p>{slide.summary}</p>
                {relatedLessons.length > 0 ? (
                  <ul aria-label={`Lessons related to slide ${slide.number}`}>
                    {relatedLessons.map(lesson => (
                      <li key={lesson.slug}>
                        <Link to={`/learn/${lesson.slug}`}>Open lesson: {lesson.shortTitle}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="slide-no-lesson">Opening or closing slide; no separate lesson.</p>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </main>
  )
}
