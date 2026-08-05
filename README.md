# Cofre

Offline-first PWA for tracking a monthly spending cap, credit card bill and savings projection. It models the one thing most budget apps get wrong: a credit purchase is not money that left your account yet. Built with **HTML5, CSS3, and vanilla JavaScript** — no build step, no framework, no dependencies. The interface is in Brazilian Portuguese.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

---

## About the project

Cofre ("safe", as in the box you keep money in) answers a single question: **how much do I actually have?** Not the balance the bank shows, but what is left once the open credit card bill is paid and the rest of the month has been spent.

The interesting part is how the two payment methods are treated differently, because they behave differently in real life:

| | Effect on balance | Counts toward the monthly cap |
| :-- | :-- | :-- |
| **Pix** (instant transfer) | Leaves immediately | Yes |
| **Credit card** | Nothing leaves — it joins the open bill | Yes |
| **"Paguei a fatura"** (bill paid) | The whole open bill leaves at once | No, already counted |

So a credit purchase eats into your spending cap the moment you make it, but it does not touch your savings until you tap **Paguei a fatura**. The headline balance always shows what is really there, with a subtitle showing what will be left after the bill is settled. That gap is the number that usually catches people out.

Everything lives in `localStorage`. There is no server, no account, no sign-up, and nothing is ever sent anywhere — which is also why backups are manual, via a restore code you copy yourself.

## Tech stack

- **HTML5** — single file, semantic sections, no templating
- **CSS3** — custom properties, flexbox and grid, `env(safe-area-inset-*)` for notched screens, `prefers-reduced-motion` support
- **JavaScript (ES5-style, vanilla)** — no transpiler, no bundler, no runtime dependency
- **Web App Manifest + Service Worker** — installable, cache-first, works with no connection
- **localStorage** — the entire persistence layer

## Features

- [x] Monthly spending cap with a progress bar, sixth markers and an over-budget warning
- [x] Credit purchases go to the open bill and leave the balance untouched
- [x] Pix outflows leave the balance immediately
- [x] Both count toward the monthly cap
- [x] One-tap **"Paguei a fatura"** to settle the open bill, with confirmation
- [x] Fixed and variable income posted automatically each month, confirmed with a **"recebi"** button
- [x] Balance projection for the coming months, after income, bill and cap
- [x] First-run setup that asks for your own numbers — none are hard-coded
- [x] Backup and restore through a portable text code
- [x] Editable monthly cap and fixed income, plus a full wipe
- [x] Entry list for the current month, with delete
- [x] Installable on Android and iOS, fully usable offline
- [ ] Per-month editing of variable income after setup
- [ ] Categories or tags for entries
- [ ] History view across past months

## Getting started

Clone the repository and serve the folder over HTTP:

```bash
git clone https://github.com/gabrielggiani-alt/cofre.git
cd cofre
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Opening `index.html` directly from the filesystem works too, but browsers only register service workers over `http://` or `https://`, so the offline layer stays inactive that way.

### Installing on your phone

**Android — Chrome**
1. Open the app URL in Chrome.
2. Tap the **⋮** menu.
3. Choose **Add to home screen** (or **Install app**) and confirm.

**iPhone — Safari**
1. Open the app URL in Safari. It must be Safari; other iOS browsers cannot install web apps.
2. Tap the **Share** button.
3. Scroll down, choose **Add to Home Screen** and confirm.

Once installed it launches standalone, with no browser chrome, and opens with no connection.

## Project structure

```
cofre/
├── index.html               # entire app — markup, styles and logic
├── manifest.webmanifest     # PWA metadata, icons, standalone display
├── sw.js                    # service worker, cache-first with network fallback
├── icon-192.png             # home screen icon
├── icon-512.png             # high-resolution icon
├── icon-512-maskable.png    # adaptive icon for Android
└── README.md
```

| File | Role |
| :-- | :-- |
| `index.html` | Setup screen, main app, settings, and all state handling |
| `manifest.webmanifest` | Makes the app installable and defines how it launches |
| `sw.js` | Precaches the shell on install, serves from cache, falls back to the network |
| `icon-*.png` | Launcher icons, including a maskable variant for Android |

## License

Released under the MIT License. Use it, fork it, change it.

---

**Author:** Gabriel Gomes Giani
