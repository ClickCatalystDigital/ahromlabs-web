// How work moves through a system, step by step — the industry pages' figure.
// Drawn in the same language as SystemDiagram (mono labels, hairlines, navy
// markers) but as real text in an ordered list, not an image: readable by
// people, screen readers, search engines and models alike. Vertical on phones,
// a numbered grid on wider screens.
export function FlowFigure({ title, steps }: { title: string; steps: { step: string; detail: string }[] }) {
  return (
    <figure className="flow-figure">
      <figcaption className="flow-caption">{title}</figcaption>
      <ol className="flow-steps">
        {steps.map((s, i) => (
          <li key={s.step} className="flow-step">
            <span className="flow-marker" aria-hidden="true" />
            <span className="flow-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="flow-title">{s.step}</span>
            <span className="flow-detail">{s.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
