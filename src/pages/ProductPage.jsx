import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { fetchAllProducts } from '../lib/shopify'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    fetchAllProducts(200).then(products => {
      const found = (products || []).find(p => p.handle === handle)
      setProduct(found || null)
      if (found?.variants?.length) setSelectedVariant(found.variants[0])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [handle])

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: 'var(--fg-muted)' }}>Loading...</div>
  if (!product) return <div style={{ padding: 60, textAlign: 'center' }}><p style={{ color: 'var(--fg-muted)' }}>Product not found.</p><Link to="/shop" style={{ color: 'var(--primary)' }}>Back to Shop</Link></div>

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
        <ChevronLeft size={16} /> Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
        <div style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: 'var(--bg-alt)' }}>
          {product.image ? (
            <img src={product.image} alt={product.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-muted)' }}>No Image</div>
          )}
        </div>

        <div>
          {product.productType && <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{product.productType}</div>}
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg)', margin: '0 0 12px' }}>{product.title}</h1>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)', marginBottom: 24 }}>
            ${(selectedVariant?.price || product.price).toFixed(2)}
          </div>

          {product.variants?.length > 1 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 8 }}>Options</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.variants.map(v => (
                  <button key={v.id} onClick={() => setSelectedVariant(v)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${selectedVariant?.id === v.id ? 'var(--primary)' : 'var(--border)'}`, background: selectedVariant?.id === v.id ? 'var(--primary)' : 'transparent', color: selectedVariant?.id === v.id ? '#fff' : 'var(--fg)', fontSize: 14, cursor: 'pointer' }}>
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => addItem(product, selectedVariant)}
            style={{ width: '100%', maxWidth: 400, padding: '16px', borderRadius: 10, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            Add to Cart
          </button>

          {product.description && (
            <div style={{ marginTop: 32, fontSize: 15, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{product.description}</div>
          )}
        </div>
      </div>
    </div>
  )
}
