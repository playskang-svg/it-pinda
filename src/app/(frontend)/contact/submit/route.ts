import { getClient } from '@/lib/payload'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// shortcut: honeypot only, no rate limit; add Turnstile if spam reaches the inquiries list.
export async function POST(request: Request) {
  const body = (await request.json().catch((): null => null)) as Record<string, unknown> | null
  if (!body) return new Response(null, { status: 400 })
  if (body.website) return new Response(null, { status: 204 })

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const valid =
    name.length > 0 &&
    name.length <= 50 &&
    EMAIL.test(email) &&
    email.length <= 254 &&
    message.length > 0 &&
    message.length <= 3000
  if (!valid) return new Response(null, { status: 400 })

  const payload = await getClient()
  await payload.create({ collection: 'inquiries', data: { name, email, message } })
  return new Response(null, { status: 204 })
}
