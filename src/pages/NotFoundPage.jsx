import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: 72, fontWeight: 800, color: 'var(--fg-muted)', margin: 0 }}>404</h1>
      <p style={{ fontSize: 18, color: 'var(--fg-muted)', margin: '12px 0 32px' }}>Page not found</p>
      <Link to="/" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: 8, background: 'var(--primary)', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
        Go Home
      </Link>
    </div>
  )
}
