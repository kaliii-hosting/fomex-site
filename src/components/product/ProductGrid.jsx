import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ aspectRatio: '1', background: 'var(--bg-alt)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ padding: 14 }}>
              <div style={{ height: 16, background: 'var(--bg-alt)', borderRadius: 4, marginBottom: 8, animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: 20, width: '40%', background: 'var(--bg-alt)', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products.length) {
    return <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--fg-muted)' }}>No products found.</div>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
