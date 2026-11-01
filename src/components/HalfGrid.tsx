import Link from 'next/link'

import { HalfButton } from '@/components/HalfButton'
import { halfHref } from '@/lib/half'
import type { GamsgoProduct } from '@/payload-types'

export function HalfGrid({ products, from }: { products: GamsgoProduct[]; from: string }) {
  if (products.length === 0) return <p>준비 중입니다.</p>
  return (
    <ul className="half-grid">
      {products.map((product) => (
        <li key={product.id}>
          <Link className="half-card__head" href={`/half/${product.slug}`}>
            {product.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" height={56} loading="lazy" src={product.logo} width={56} />
            ) : null}
            <span>
              <strong>{product.name}</strong>
              <small>{product.summary}</small>
            </span>
          </Link>
          <HalfButton href={halfHref(product, from)} price={product.monthlyPrice} small />
        </li>
      ))}
    </ul>
  )
}
