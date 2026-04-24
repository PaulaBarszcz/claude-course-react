export default function ModuleHeader({ tag, title, desc }) {
  return (
    <div className="module-header">
      <div className="module-tag">{tag}</div>
      <div className="module-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="module-desc">{desc}</div>
    </div>
  )
}
