'use client'

import { useState } from 'react'

import { GAMSGO_CODE } from '@/lib/half-code'

export function CopyCode() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(GAMSGO_CODE)
    } catch {
      // In-app browsers often block the clipboard API.
      const area = document.createElement('textarea')
      area.value = GAMSGO_CODE
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={copied ? 'copy-code is-done' : 'copy-code'} onClick={copy} type="button">
      <span>겜스고 할인코드</span>
      <strong>{GAMSGO_CODE}</strong>
      <em aria-live="polite">{copied ? '복사됨 ✓' : '누르면 복사'}</em>
    </button>
  )
}
