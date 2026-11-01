import { HalfGrid } from '@/components/HalfGrid'
import { PhotoHead } from '@/components/PhotoHead'
import { PlanTable } from '@/components/PlanTable'
import { PostList } from '@/components/PostList'
import { ShareBar } from '@/components/ShareBar'
import { getPlanRows } from '@/lib/data'
import { getHalfProducts } from '@/lib/half'
import { getClient, publishedWhere, SITE_URL } from '@/lib/payload'
import type { Service } from '@/payload-types'

export async function CategoryPage({
  slug,
  title,
  lede,
  planCategory,
  photo,
  photoAlt,
}: {
  slug: string
  title: string
  lede: string
  planCategory?: Service['category']
  photo: string
  photoAlt: string
}) {
  const payload = await getClient()
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const category = categories.docs[0]
  const halfCategory = planCategory === 'ai' ? 'ai' : planCategory === 'ott' ? 'ott' : null
  const [posts, rows, half] = await Promise.all([
    category
      ? payload.find({
          collection: 'posts',
          where: { and: [...publishedWhere().and, { category: { equals: category.id } }] },
          limit: 30,
          depth: 1,
          sort: '-publishedAt',
        })
      : null,
    planCategory ? getPlanRows(slug, { categories: [planCategory] }) : null,
    halfCategory ? getHalfProducts({ category: halfCategory, limit: 8 }) : [],
  ])

  return (
    <>
      <PhotoHead lede={lede} photo={photo} photoAlt={photoAlt} title={title} />
      {rows?.length ? (
        <section className="section">
          <div className="frame">
            <h2>공식 요금표</h2>
            <PlanTable rows={rows} showTabs={false} />
          </div>
        </section>
      ) : null}
      {half.length ? (
        <section className="section section--tone">
          <div className="frame">
            <h2>{title} 반값으로 쓰기</h2>
            <p className="section-lede">
              같은 서비스를 겜스고 공유 구독으로 쓰면 이만큼 내려갑니다. 정가로 계속 내면 그 차액은 그냥
              사라집니다.
            </p>
            <HalfGrid from={`category:${slug}`} products={half} />
          </div>
        </section>
      ) : null}
      <section className="section section--tone">
        <div className="frame">
          <h2>{title} 글 모음</h2>
          <PostList posts={posts?.docs ?? []} />
          <ShareBar card title={title} url={`${SITE_URL}/${slug}`} />
        </div>
      </section>
    </>
  )
}
