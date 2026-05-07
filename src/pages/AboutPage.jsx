import { siteConfig } from '../config/site.config'

// CUSTOMIZE: Replace with actual company story, team info, mission statement
export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--fg)', margin: '0 0 24px' }}>About {siteConfig.siteName}</h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)', marginBottom: 24 }}>
        Welcome to {siteConfig.siteName}. We are dedicated to providing the highest quality products to our customers.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)', marginBottom: 24 }}>
        Our mission is to deliver exceptional value and an outstanding shopping experience. Every product in our collection has been carefully selected to meet our high standards.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)' }}>
        Thank you for choosing {siteConfig.siteName}. We look forward to serving you.
      </p>
    </div>
  )
}
