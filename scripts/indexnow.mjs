// Tells Naver about every URL in the live sitemap. Run after a deploy: node scripts/indexnow.mjs
const KEY = 'a3692b9a13d016896a43b326be518bd0'
const HOST = 'it.pinda.kr'
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) throw new Error('sitemap has no URLs')
const res = await fetch('https://searchadvisor.naver.com/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(urlList.length, 'urls', res.status, await res.text())
