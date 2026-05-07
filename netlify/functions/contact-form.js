export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' }
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  if (!BREVO_API_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'BREVO_API_KEY not configured' }) }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}')
    if (!name || !email || !message) return { statusCode: 400, body: JSON.stringify({ error: 'name, email, and message are required' }) }

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name, email },
        to: [{ email: process.env.CONTACT_EMAIL || email }],
        subject: `Contact Form: ${name}`,
        htmlContent: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return { statusCode: 500, body: JSON.stringify({ error: err }) }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
