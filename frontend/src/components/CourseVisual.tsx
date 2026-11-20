import { LessonVisual } from '../data/course'

type Props = {
  visual: LessonVisual
}

export default function CourseVisual({ visual }: Props) {
  return (
    <figure className="course-visual">
      <h2>{visual.title}</h2>
      {visual.kind === 'screenshots' && (
        <div className="visual-screenshots">
          {visual.images.map(image => (
            <div className="visual-screenshot" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <a href={image.src} target="_blank" rel="noreferrer">
                Open full-size image: {image.label}
              </a>
            </div>
          ))}
        </div>
      )}
      {visual.kind === 'steps' && (
        <ol className="visual-step-list">
          {visual.steps.map((step, index) => (
            <li className="visual-step" key={step.title}>
              <span className="visual-step-number" aria-hidden="true">{index + 1}</span>
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </li>
          ))}
        </ol>
      )}
      {visual.kind === 'comparison' && (
        <div className="visual-comparison">
          {visual.items.map(item => (
            <section className="visual-comparison-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </section>
          ))}
        </div>
      )}
      {visual.kind === 'tree' && (
        <ul className="visual-tree">
          {visual.lines.map((line, index) => (
            <li className={`tree-line tree-depth-${line.depth}`} key={`${line.title}-${index}`}>
              <code>{line.title}</code>
              <span>{line.detail}</span>
            </li>
          ))}
        </ul>
      )}
      {visual.kind === 'code-match' && (
        <>
          <pre className="visual-code"><code>{visual.code}</code></pre>
          <div className="visual-match-grid">
            <section>
              <h3>Intended matches</h3>
              <ul>{visual.matches.map(path => <li key={path}><code>{path}</code></li>)}</ul>
            </section>
            <section>
              <h3>Not matched by this example</h3>
              <ul>{visual.doesNotMatch.map(path => <li key={path}><code>{path}</code></li>)}</ul>
            </section>
          </div>
        </>
      )}
      {visual.kind === 'architecture' && (
        <ol className="visual-architecture">
          {visual.nodes.map(node => (
            <li key={node.title}>
              <strong>{node.title}</strong>
              <span>{node.detail}</span>
            </li>
          ))}
        </ol>
      )}
      <figcaption>{visual.caption}</figcaption>
    </figure>
  )
}
