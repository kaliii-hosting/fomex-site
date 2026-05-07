import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 200, backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 400, background: 'var(--bg)', zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Cart ({items.length})</h2>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)' }}><X size={20} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--fg-muted)', padding: '40px 0' }}>Your cart is empty.</p>
          ) : items.map(item => (
            <div key={item.key} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-alt)', flexShrink: 0 }}>
                {item.product.image && <img src={item.product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.product.title}</div>
                {item.variant?.title !== 'Default Title' && <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{item.variant?.title}</div>}
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <button onClick={() => updateQuantity(item.key, item.quantity - 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg)' }}><Minus size={14} /></button>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg)' }}><Plus size={14} /></button>
                  <button onClick={() => removeItem(item.key)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
