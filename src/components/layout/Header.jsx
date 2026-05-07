import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { siteConfig } from '../../config/site.config'

// CUSTOMIZE: Update navigation links, logo, and brand styling
export default function Header() {
  const { totalItems, setIsOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontSize: 20, fontWeight: 700, color: 'var(--fg)', textDecoration: 'none' }}>
          {siteConfig.siteName}
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          <Link to="/shop" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Shop</Link>
          <Link to="/about" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>About</Link>
          <Link to="/contact" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Contact</Link>
          <button onClick={() => setIsOpen(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)', padding: 4 }}>
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -8, background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 10, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{totalItems}</span>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)', display: 'none' }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{ padding: '12px 20px 20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link to="/shop" onClick={() => setMobileOpen(false)} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: 16 }}>Shop</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: 16 }}>About</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: 16 }}>Contact</Link>
        </div>
      )}
    </header>
  )
}
