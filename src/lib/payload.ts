import config from '@payload-config'
import { getPayload } from 'payload'

export const getClient = () => getPayload({ config })

export const SITE_URL = 'https://it.pinda.kr'
export const SITE_NAME = '구독할인 정보센터'
// Without the space: people type the name as one word into Naver.
export const SITE_NAME_COMPACT = '구독할인정보센터'
export const SITE_TITLE = `${SITE_NAME_COMPACT} — AI·OTT 구독료 비교와 할인 정보`
export const SITE_DESCRIPTION =
  '구독할인정보센터는 AI·OTT 구독료를 공식 요금과 비교하고 할인 정보를 정리하는 사이트입니다. 더 내고 있지 않은지 확인하세요.'

export const publishedWhere = () => ({
  and: [
    { _status: { equals: 'published' as const } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ],
})

// Media URLs already carry serverURL in production and are relative elsewhere.
export const absoluteUrl = (url: string): string => (url.startsWith('http') ? url : `${SITE_URL}${url}`)
