import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { HalfCta } from '@/components/HalfCta'
import { PhotoHead } from '@/components/PhotoHead'
import { PlanTable } from '@/components/PlanTable'
import { RichText } from '@/components/RichText'
import { ShareBar } from '@/components/ShareBar'
import { getPlanRows } from '@/lib/data'
import { cheapestByService, getHalfProducts, getOfficialFloor } from '@/lib/half'
import { absoluteUrl, getClient, publishedWhere, SITE_URL } from '@/lib/payload'
import { formatDate } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const getPost = cache(async (slug: string) => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [...publishedWhere().and, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const og = typeof post.ogImage === 'object' ? post.ogImage?.url : null
  const image = og ? absoluteUrl(og) : '/og-default.png'
  const title = post.metaTitle || post.title
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: post.summary,
      url: `/posts/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: post.summary, images: [image] },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const hero = typeof post.heroImage === 'object' ? post.heroImage : null
  const category = typeof post.category === 'object' ? post.category : null
  const serviceIds = (post.relatedServices ?? []).map((s) => (typeof s === 'object' ? s.id : s))
  const from = `post:${post.slug}`
  const [rows, halfProducts, floor] = await Promise.all([
    serviceIds.length ? getPlanRows(from, { serviceIds }) : [],
    serviceIds.length ? getHalfProducts({ serviceIds }) : [],
    getOfficialFloor(serviceIds),
  ])
  // One product per service keeps the hook box short.
  const hooks = Object.values(cheapestByService(halfProducts))
  const related = (post.relatedPosts ?? []).filter((p) => typeof p === 'object')
  const url = `${SITE_URL}/posts/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: hero?.url ? absoluteUrl(hero.url) : undefined,
    mainEntityOfPage: url,
  }

  return (
    <article className="post">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />
      <PhotoHead
        eyebrow={
          category ? (
            <Link className="post__category" href={`/${category.slug}`}>
              {category.title}
            </Link>
          ) : null
        }
        lede={`${formatDate(post.verifiedAt)} 공식 페이지 기준으로 확인`}
        photo={hero?.url}
        photoAlt={hero?.alt}
        title={post.title}
      />
      <div className="frame frame--text post__body">
        <aside className="summary">
          <strong>💡 핵심 한 줄 요약</strong>
          <p>{post.summary}</p>
        </aside>
        {rows.length ? (
          <section className="post__plans">
            <h2>공식 요금표</h2>
            <PlanTable rows={rows} showTabs={false} />
          </section>
        ) : null}
        <HalfCta compact floor={floor} from={`${from}:top`} products={hooks} />
        <RichText
          data={post.content}
          midway={<HalfCta compact floor={floor} from={`${from}:mid`} products={hooks} title="여기까지 읽으셨다면, 이제 요금을 줄일 차례입니다" />}
        />
        <HalfCta floor={floor} from={`${from}:end`} products={hooks} title="정가로 계속 내시겠어요?" />
        {related.length ? (
          <section className="link-cards" aria-label="함께 보면 좋은 글">
            {related.map((item) => {
              if (typeof item !== 'object') return null
              const image = typeof item.heroImage === 'object' ? item.heroImage : null
              return (
                <Link className="link-card" href={`/posts/${item.slug}`} key={item.id}>
                  {image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" height={300} loading="lazy" src={image.url} width={480} />
                  ) : null}
                  <span>
                    <strong>{item.title}</strong>
                    {item.summary}
                  </span>
                </Link>
              )
            })}
          </section>
        ) : null}
        {post.sources?.length ? (
          <section className="sources">
            <h2>공식 출처</h2>
            <ul>
              {post.sources.map((source) => (
                <li key={source.id ?? source.url}>
                  <a href={source.url} rel="noopener" target="_blank">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="disclosure">
          가격과 혜택은 바뀔 수 있으니 결제 전에 공식 페이지를 확인해 주세요. 이 사이트의 일부 링크에서는 제휴 수수료를
          받을 수 있으며, 표시가 있는 링크가 이에 해당합니다.
        </p>
        <ShareBar card text={post.summary} title={post.title} url={url} />
      </div>
    </article>
  )
}
