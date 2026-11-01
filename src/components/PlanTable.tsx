'use client'

import { useMemo, useState } from 'react'

import { HalfButton } from '@/components/HalfButton'
import type { PlanRow } from '@/lib/data'
import { formatDate, formatPrice, sortByPrice } from '@/lib/pricing'

const ORDER = ['ai', 'ott', 'vpn', 'hosting', 'software'] as const
const LABELS: Record<string, string> = { ai: 'AI', ott: 'OTT', vpn: 'VPN', hosting: '웹호스팅', software: '소프트웨어' }

export function PlanTable({
  rows,
  initialCategory,
  showTabs = true,
  limit,
}: {
  rows: PlanRow[]
  initialCategory?: string
  showTabs?: boolean
  limit?: number
}) {
  const categories = useMemo(
    () => ORDER.filter((c) => rows.some((r) => r.category === c)),
    [rows],
  )
  const [category, setCategory] = useState<string | undefined>(initialCategory ?? categories[0])
  const [order, setOrder] = useState<'price' | 'service'>('price')

  const visible = useMemo(() => {
    const filtered = showTabs ? rows.filter((r) => r.category === category) : rows
    const sorted =
      order === 'price'
        ? sortByPrice(filtered)
        : [...filtered].sort(
            (a, b) => a.service.localeCompare(b.service, 'ko') || a.monthlyPrice - b.monthlyPrice,
          )
    // Plans with a half-price offer come first; the rest keep their order below.
    const partitioned = [...sorted.filter((r) => r.half && r.monthlyPrice > 0), ...sorted.filter((r) => !r.half || r.monthlyPrice === 0)]
    return limit ? partitioned.slice(0, limit) : partitioned
  }, [rows, category, order, showTabs, limit])

  return (
    <div className="plans">
      <div className="plans__controls">
        {showTabs && categories.length > 1 ? (
          <div aria-label="분야 선택" className="plans__tabs" role="group">
            {categories.map((c) => (
              <button
                aria-pressed={c === category}
                key={c}
                onClick={() => setCategory(c)}
                type="button"
              >
                {LABELS[c] ?? c}
              </button>
            ))}
          </div>
        ) : null}
        <label className="plans__sort">
          정렬
          <select onChange={(e) => setOrder(e.target.value as 'price' | 'service')} value={order}>
            <option value="price">월 요금 낮은 순</option>
            <option value="service">서비스별</option>
          </select>
        </label>
      </div>
      <div className="plans__table">
        <table>
          <thead>
            <tr>
              <th scope="col">서비스·요금제</th>
              <th scope="col">월 요금</th>
              <th scope="col">연 결제</th>
              <th scope="col">핵심 차이</th>
              <th scope="col">확인일</th>
              <th scope="col">
                <span className="sr-only">구독할인 링크</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  <span className="plans__service">{row.service}</span>
                  <span className="plans__plan">{row.name}</span>
                </th>
                <td className="plans__price" data-label="월 요금">
                  {row.pricePrefix ? <small>{row.pricePrefix} </small> : null}
                  {row.monthlyPrice === 0 ? '무료' : formatPrice(row.monthlyPrice, row.currency)}
                </td>
                <td data-label="연 결제">
                  {row.annualPrice ? formatPrice(row.annualPrice, row.currency) : '–'}
                </td>
                <td data-label="핵심 차이">
                  {row.highlights}
                  {row.note ? <small className="plans__note">{row.note}</small> : null}
                </td>
                <td data-label="확인일">{formatDate(row.verifiedAt)}</td>
                <td className="plans__action">
                  {row.monthlyPrice === 0 ? null : row.half ? (
                    <HalfButton href={row.half.href} price={row.half.price} small />
                  ) : (
                    <a
                      className="button button--quiet"
                      href={row.href}
                      rel={row.sponsored ? 'sponsored nofollow noopener' : 'noopener'}
                      target="_blank"
                    >
                      {row.sponsored ? '구독할인 받기' : '공식 페이지'}
                    </a>
                  )}
                  {row.monthlyPrice !== 0 && (row.half || row.sponsored) ? <small>제휴 링크</small> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
