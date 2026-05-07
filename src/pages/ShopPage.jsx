import { useState, useEffect, useMemo } from 'react'
import { Search } from 'lucide-react'
import { fetchAllProducts } from '../lib/shopify'
import ProductGrid from '../components/product/ProductGrid'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    fetchAllProducts(100).then(p => { setProducts(p || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const types = [...new Set(products.map(p => p.productType).filter(Boolean))]
    return ['all', ...types]
  }, [products])

  const filtered = useMemo(() => {
    let result = products
    if (category !== 'all') result = result.filter(p => p.productType === category)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || (p.productType || '').toLowerCase().includes(q))
    }
    return result
  }, [products, search, category])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg)', margin: '0 0 24px' }}>Shop</h1>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 360 }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)' }} />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid var(--border)', background: category === cat ? 'var(--primary)' : 'transparent', color: category === cat ? '#fff' : 'var(--fg-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid products={filtered} loading={loading} />
    </div>
  )
}
