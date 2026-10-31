import { getClient, SITE_URL } from '@/lib/payload'

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|kakaotalk-scrap|preview/i

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'affiliate-links',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const link = docs[0]
  if (!link) return Response.redirect(`${SITE_URL}/deals`, 302)

  if (!BOT.test(request.headers.get('user-agent') ?? '')) {
    const from = new URL(request.url).searchParams.get('from')?.slice(0, 120)
    // A failed count must not cost the visitor the redirect.
    await payload
      .create({ collection: 'affiliate-clicks', data: { link: link.id, from } })
      .catch((error) => payload.logger.error({ err: error, msg: 'click log failed' }))
  }

  return new Response(null, {
    status: 302,
    headers: { location: link.url, 'x-robots-tag': 'noindex', 'cache-control': 'no-store' },
  })
}
