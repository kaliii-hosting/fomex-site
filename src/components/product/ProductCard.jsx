import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg)', transition: 'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.12)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ aspectRatio: '1', background: 'var(--bg-alt)', overflow: 'hidden' }}>
          {product.image ? (
            <img src={product.image} alt={product.imageAlt || product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-muted)', fontSize: 14 }}>No Image</div>
          )}
        </div>
        <div style={{ padding: '12px 14px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</div>
          {product.productType && <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 6 }}>{product.productType}</div>}
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>${product.price.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  )
}
