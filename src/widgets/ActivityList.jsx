// ── ActivityList widget ──
// iOS-list-style recent transactions / orders / events. Each row: tinted
// icon-tile + title + subtitle (left), amount + meta (right). Uses a
// hairline divider between rows, rounds outer corners only.

export default function ActivityList({
  title = 'Recent activity',
  items = [
    { emoji: '☕', label: 'Blue Bottle Coffee',  meta: 'Today',     amount: '−$6.25',   amountTone: 'debit' },
    { emoji: '🚖', label: 'Uber',                meta: 'Yesterday', amount: '−$24.10',  amountTone: 'debit' },
    { emoji: '💼', label: 'Payroll deposit',     meta: 'Mar 1',     amount: '+$3,200',  amountTone: 'credit' },
    { emoji: '🎬', label: 'Netflix',             meta: 'Feb 28',    amount: '−$15.99',  amountTone: 'debit' },
  ],
  background = '#ffffff',
  textColor = '#15171a',
  ctaLabel = 'See all',
  ctaUrl = '#',
}) {
  return (
    <div style={{
      background,
      color: textColor,
      borderRadius: 22,
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.04)',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    }}>
      {title && (
        <div style={{
          padding: '16px 18px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.55)',
          }}>{title}</span>
          {ctaLabel && (
            <a href={ctaUrl || '#'} style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#0F62A6',
              textDecoration: 'none',
            }}>{ctaLabel} →</a>
          )}
        </div>
      )}
      {items.map((it, i) => {
        const isCredit = it.amountTone === 'credit'
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 18px',
            borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
          }}>
            <span aria-hidden style={{
              width: 38, height: 38, minWidth: 38,
              borderRadius: 12,
              background: 'rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{it.emoji || '•'}</span>
            <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{it.label}</span>
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>{it.meta}</span>
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: isCredit ? '#1f7a3f' : '#15171a',
              fontVariantNumeric: 'tabular-nums',
            }}>{it.amount}</span>
          </div>
        )
      })}
    </div>
  )
}
