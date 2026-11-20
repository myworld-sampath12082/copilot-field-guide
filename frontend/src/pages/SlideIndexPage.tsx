import { Link } from 'react-router-dom'
import { courseReviewDate, lessons, sourceSlides } from '../data/course'

const currentReferences = [
  { label: 'Agent sessions and tool permissions', url: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions' },
  { label: 'Cloud sandboxes', url: 'https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes' },
  { label: 'Custom environments', url: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-a-custom-environment' },
  { label: 'Custom-instruction support matrix', url: 'https://docs.github.com/en/copilot/reference/custom-instructions-support' },
  { label: 'Agent skills', url: 'https://docs.github.com/en/copilot/concepts/customizations/agent-skills' },
  { label: 'Copilot policies and model training', url: 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies' },
  { label: 'Responsible use of agents', url: 'https://docs.github.com/en/copilot/responsible-use/agents' },
  { label: 'VS Code voice support', url: 'https://code.visualstudio.com/docs/configure/accessibility/voice' }
]

export default function SlideIndexPage() {
  return (
    <main className="slide-index-page" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Source deck · 17 slides · content checked {courseReviewDate}</p>
        <h1>Presentation slide references</h1>
        <p>
          Each entry names a section from the source presentation. Where a lesson covers the slide,
          use its link to return to the guided explanation.
        </p>
        <p>
          The source deck does not provide a verified capture date or client name for every interface screenshot.
          Lessons identify the surface they teach; screenshots are historical references, not current UI instructions.
        </p>
      </header>
      <section className="current-documents" aria-labelledby="current-documents-heading">
        <h2 id="current-documents-heading">Current official references</h2>
        <p>These documentation links support the feature and policy notes in the lessons. Availability changes; check your client and organization settings.</p>
        <ul>
          {currentReferences.map(reference => (
            <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noreferrer">{reference.label}</a>
            </li>
          ))}
        </ul>
      </section>
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
      <section className="slide-next-steps" aria-labelledby="slide-next-steps-heading">
        <p className="eyebrow">Take-away</p>
        <h2 id="slide-next-steps-heading">Before you ship Copilot-assisted work</h2>
        <ul>
          <li>Name the client and confirm the feature support and organization policy.</li>
          <li>Give only relevant, non-sensitive context and set a clear task boundary.</li>
          <li>Run the documented checks and inspect the complete diff yourself.</li>
          <li>Reproduce security findings and decide explicitly whether to accept or reject them.</li>
        </ul>
        <Link className="button-link button-primary" to="/lab">Practice the complete workflow</Link>
      </section>
    </main>
  )
}
