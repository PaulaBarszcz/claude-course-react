export default function Callout({ type = 'info', icon, children }) {
  return (
    <div className={`callout ${type}`}>
      {icon && <div className="callout-icon">{icon}</div>}
      <div className="callout-body">{children}</div>
    </div>
  )
}
