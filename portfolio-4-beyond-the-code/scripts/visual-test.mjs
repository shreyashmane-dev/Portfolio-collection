import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const OUT = '.shots'
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--window-size=1440,900'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

const shot = async (name) => { await page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 82 }); console.log('shot:', name) }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

await page.goto(process.env.BASE_URL || 'http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(700)
await shot('01-intro')
await sleep(3400)
await shot('02-hero')

// scroll through sections
for (const [id, name] of [['about', '03-about'], ['skills', '04-skills'], ['projects', '05-projects'], ['journey', '06-journey'], ['exploring', '07-exploring'], ['contact', '08-contact']]) {
  await page.evaluate((sid) => document.getElementById(sid)?.scrollIntoView(), id)
  await sleep(1400)
  await shot(name)
}

// reverse-scroll check: back up to about, reveals must re-play
await page.evaluate(() => document.getElementById('about')?.scrollIntoView())
await sleep(1500)
await shot('08b-reverse-about')

// theme toggle
await page.evaluate(() => window.scrollTo(0, 0))
await sleep(900)
await page.click('button[aria-label*="Paper"]')
await sleep(1000)
await shot('09-hero-paper')
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView())
await sleep(1300)
await shot('10-projects-paper')

// back to void
await page.evaluate(() => window.scrollTo(0, 0))
await sleep(700)
await page.click('button[aria-label*="Void"]')
await sleep(800)

// project filter + modal
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView())
await sleep(1000)
const filterBtns = await page.$$('#projects button[aria-pressed]')
for (const b of filterBtns) {
  const txt = await b.evaluate((el) => el.textContent)
  if (txt.includes('IOT')) { await b.click(); break }
}
await sleep(900)
await shot('11-filter-iot')
const brief = await page.$('#projects article button')
if (brief) { await brief.click(); await sleep(800); await shot('12-modal') }
await page.keyboard.press('Escape')
await sleep(500)

// form validation
await page.evaluate(() => document.getElementById('contact')?.scrollIntoView())
await sleep(1100)
await page.click('#contact button[type="submit"]')
await sleep(500)
await shot('13-form-errors')

// mobile pass (isMobile emulation reloads the page, so let the entrance finish)
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
await page.evaluate(() => window.scrollTo(0, 0))
await sleep(4200)
await shot('14-mobile-hero')
await page.evaluate(() => document.getElementById('skills')?.scrollIntoView())
await sleep(1200)
await shot('15-mobile-skills')
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView())
await sleep(1200)
await shot('16-mobile-projects')
// mobile menu
await page.evaluate(() => window.scrollTo(0, 0))
await sleep(700)
await page.click('button[aria-label="Open menu"]')
await sleep(800)
await shot('17-mobile-menu')

console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')
await browser.close()