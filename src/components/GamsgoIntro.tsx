import { CopyCode } from '@/components/CopyCode'

// Figures are GamsGo's own statements, read from gamsgo.com on 2026-11-01.
export function GamsgoIntro() {
  return (
    <aside className="gamsgo-intro" id="gamsgo">
      <h2>겜스고(GamsGo)는 어떤 곳인가요?</h2>
      <p>
        AI, OTT, 음악, 소프트웨어 구독을 여러 명이 나눠 쓰거나 할인가로 살 수 있는 구독 플랫폼입니다. 국내에서는
        주식회사 유림마켓 이름으로 운영합니다.
      </p>
      <ul>
        <li>겜스고 소개 기준 7년간 150여 개국, 1,000만 명 이상 이용</li>
        <li>결제 후 자동 제공, 겜스고 자체 집계 평균 3초</li>
        <li>24시간 고객 지원, 계정을 복구할 수 없으면 환불</li>
      </ul>
      <CopyCode />
      <small>
        코드는 결제 화면의 코드 입력칸에 주문 전에 넣어 주세요. 할인 금액은 상품마다 다르니 결제 전에 확인해 주세요.
      </small>
    </aside>
  )
}
