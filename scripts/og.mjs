// Renders share thumbnails with the snsogg skill: one per post (og/<slug>.png) plus the site default.
// Run: pnpm exec tsx scripts/og.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

import { posts } from './seed-data.ts'

const SKILL = 'C:/Window_DEV/.claude/skills/snsogg/render.mjs'
const { renderCard } = await import(pathToFileURL(SKILL).href)

const theme = {
  brand: '#ffffff',
  accent: '#7fe0bb',
  cta: '#0f8a5f',
}
const fontFiles = { 400: 'C:/Windows/Fonts/malgun.ttf', 700: 'C:/Windows/Fonts/malgunbd.ttf' }
const photo = (name) =>
  `data:image/jpeg;base64,${readFileSync(`og/bg/${name}.jpg`).toString("base64")}`
const badges = { ai: 'AI 구독', ott: 'OTT 구독', cancel: '해지·환불', vpn: 'VPN' }

mkdirSync('og', { recursive: true })
for (const post of posts) {
  const png = await renderCard({
    layout: 'article',
    badge: badges[post.category],
    title: post.title,
    hook: post.hook,
    excerpt: post.summary,
    bgImage: photo(post.hero),
    footerText: 'it.pinda.kr',
    cta: '공식 요금 확인하기 →',
    theme,
    fontFiles,
  })
  writeFileSync(`og/${post.slug}.png`, png)
  console.log(post.slug, png.length)
}
const fallback = await renderCard({
  layout: 'article',
  badge: 'AI·OTT 구독료',
  title: '구독할인 정보센터',
  hook: 'AI·OTT 구독료, 더 내고 있지 않나요? 공식 요금부터 나란히 비교해 보세요.',
  excerpt: '공식 요금과 할인을 확인일과 함께 정리했습니다.',
  bgImage: photo('hero'),
  footerText: 'it.pinda.kr',
  cta: '요금 비교 보기 →',
  theme,
  fontFiles,
})
writeFileSync('public/og-default.png', fallback)
