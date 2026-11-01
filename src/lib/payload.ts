import config from '@payload-config'
import { getPayload } from 'payload'

export const getClient = () => getPayload({ config })

export const SITE_URL = 'https://it.pinda.kr'
// Unique brand keyword: Naver had no results for it on 2026-11-01, so the site can own the search.
export const SITE_NAME = '핀다구독'
// Without the space: people type the name as one word into Naver.
export const SITE_NAME_COMPACT = '구독할인정보센터'
export const SITE_TITLE = `${SITE_NAME} — ${SITE_NAME_COMPACT}, AI·OTT 구독료 비교와 할인`
export const SITE_DESCRIPTION =
  '핀다구독은 AI·OTT 구독료를 공식 요금과 비교하고 할인 정보를 정리하는 사이트입니다. 더 내고 있지 않은지 확인하세요.'

export const publishedWhere = () => ({
  and: [
    { _status: { equals: 'published' as const } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ],
})

// Media URLs already carry serverURL in production and are relative elsewhere.
export const absoluteUrl = (url: string): string => (url.startsWith('http') ? url : `${SITE_URL}${url}`)
