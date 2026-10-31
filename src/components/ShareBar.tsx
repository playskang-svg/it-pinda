'use client'

import { useEffect, useState } from 'react'

export function ShareBar({ title, url, text }: { title: string; url: string; text?: string }) {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => setCanShare(typeof navigator.share === 'function'), [])

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = async () => {
    try {
      await navigator.share({ title, text, url })
    } catch {
      // The visitor closed the share sheet.
    }
  }

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const targets = [
    { label: '스레드', href: `https://www.threads.net/intent/post?text=${t}%20${u}` },
    { label: '페이스북', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: '네이버', href: `https://share.naver.com/web/shareView?url=${u}&title=${t}` },
  ]

  return (
    <div aria-label="이 글 공유하기" className="share" role="group">
      {canShare ? (
        <button className="button" onClick={share} type="button">
          공유하기
        </button>
      ) : null}
      <button className="button button--quiet" onClick={copy} type="button">
        {copied ? '복사했습니다' : '링크 복사'}
      </button>
      {targets.map((target) => (
        <a
          className="button button--quiet"
          href={target.href}
          key={target.label}
          rel="noopener nofollow"
          target="_blank"
        >
          {target.label}
        </a>
      ))}
      <span aria-live="polite" className="sr-only">
        {copied ? '링크를 복사했습니다' : ''}
      </span>
    </div>
  )
}
