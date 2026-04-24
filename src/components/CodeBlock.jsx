export default function CodeBlock({ lang, label, dot = 'neutral', code }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{lang}</span>
        {label && (
          <span className="code-label">
            <span className={`dot dot-${dot}`} />
            {label}
          </span>
        )}
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  )
}

export function CodeSplit({ children }) {
  return <div className="code-split">{children}</div>
}
