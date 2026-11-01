import { formatPrice } from '@/lib/pricing'

// Blinking affiliate button for GamsGo shared subscriptions.
export function HalfButton({
  href,
  price,
  label = '구독할인 받기',
  small = false,
}: {
  href: string
  price?: number | null
  label?: string
  small?: boolean
}) {
  return (
    <a
      className={small ? 'button button--half button--half-small' : 'button button--half'}
      href={href}
      rel="sponsored nofollow noopener"
      target="_blank"
    >
      <span aria-hidden="true" className="button--half__dot" />
      {label}
      {price ? <strong>월 {formatPrice(price, 'KRW')}~</strong> : null}
    </a>
  )
}
