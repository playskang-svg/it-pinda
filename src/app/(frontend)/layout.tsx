import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'

import { SiteHeader } from '@/components/SiteHeader'
import { getClient, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/payload'

import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-default.png'] },
  alternates: {
    types: { 'application/rss+xml': '/rss.xml' },
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Menus live in D1, which is empty during the build.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getClient()
  const nav = await payload.findGlobal({ slug: 'navigation' })

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <a className="skip" href="#main">
          본문 바로가기
        </a>
        <SiteHeader items={nav.header ?? []} siteName={SITE_NAME} />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="frame">
            <div className="site-footer__row">
              <strong>{SITE_NAME}</strong>
              <nav aria-label="하단 메뉴" className="site-footer__nav">
                {nav.footer?.map((item) => (
                  <Link href={item.url} key={item.id ?? item.url}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <span>© {new Date().getFullYear()} it.pinda.kr</span>
            </div>
            <p className="site-footer__note">
              공식 요금을 직접 확인해 정리하는 개인 운영 정보 사이트입니다. 각 구독 서비스와 무관하며, 일부 링크에서
              제휴 수수료를 받을 수 있습니다. 결제 전에는 공식 페이지의 최신 요금을 확인해 주세요.
            </p>
          </div>
        </footer>
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
