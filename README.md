# املاک لوکس آرتام

سامانه وب **املاک لوکس آرتام** (ARTAM LUXURY REAL ESTATE) — کارگزاری تخصصی خرید، فروش و رهن پنت‌هاوس، ویلا و برج‌باغ در شمیرانات و شمال تهران.

رابط کاربری فارسی و RTL، با تمرکز روی تجربه لوکس، فیلتر و جستجوی فایل‌های ملکی، مشاوران، وبلاگ و ثبت ملک.

## استک فنی

| لایه | تکنولوژی |
|------|----------|
| فریم‌ورک | React 19 + TypeScript |
| باندلر | Vite 8 |
| استایل | Tailwind CSS 4 + توکن‌های دیزاین (`src/constants/tokens.ts`) |
| روتینگ | React Router 6 |
| داده | TanStack Query + دادهٔ mock در `src/data/` |
| فرم | React Hook Form + Zod |
| UI | Radix UI / کامپوننت‌های shadcn-style در `src/components/ui/` |
| انیمیشن | GSAP + Framer Motion + Lenis (اسکرول نرم) |
| نقشه | Leaflet / React Leaflet |
| فونت | Vazirmatn Variable |

## پیش‌نیازها

- Node.js ۱۸ یا بالاتر
- npm (یا bun)

## اجرای محلی

```bash
npm install
npm run dev
```

اپ روی `http://localhost:3000` بالا می‌آید.

### اسکریپت‌ها

| دستور | توضیح |
|--------|--------|
| `npm run dev` | سرور توسعه (پورت ۳۰۰۰) |
| `npm run build` | بیلد production در `dist/` |
| `npm run build:gh` | بیلد با `base=/Artam/` برای تست محلی GitHub Pages |
| `npm run preview` | پیش‌نمایش بیلد |
| `npm run preview:gh` | پیش‌نمایش بیلد با base گیتهاب پیجز |
| `npm run lint` | چک تایپ با `tsc --noEmit` |
| `npm run clean` | پاک کردن `dist` |

## ساختار پروژه

```
src/
├── app/           # روتر و providers
├── components/    # layout، home، ui، common
├── constants/     # برند، روت‌ها، ترجمه‌ها، توکن‌های دیزاین
├── context/       # علاقه‌مندی‌ها
├── data/          # mock: املاک، مشاوران، وبلاگ، FAQ
├── features/      # properties، agents، content، contact، submit-property
├── hooks/
├── lib/
├── pages/
└── types/
docs/
└── IMAGE_GENERATION_PROMPTS.md   # پرامپت تولید تصاویر برند
public/brand/                     # لوگو و دارایی‌های برند
```

## صفحات اصلی

| مسیر | صفحه |
|------|------|
| `/` | خانه |
| `/properties` | لیست و فیلتر فایل‌های ملکی |
| `/properties/:slug` | جزئیات ملک |
| `/agents` | مشاوران |
| `/agents/:id` | پروفایل مشاور |
| `/blog` · `/blog/:slug` | وبلاگ |
| `/submit-property` | ثبت رایگان ملک |
| `/favorites` | علاقه‌مندی‌ها |
| `/about` · `/contact` · `/faq` | درباره، تماس، سوالات متداول |
| `/privacy` · `/terms` | حریم خصوصی و شرایط استفاده |
| `/design-system` | نمایش دیزاین سیستم |

تنظیمات برند، تماس و منو در `src/constants/site.ts` است.

## دیزاین برند (خلاصه)

- **سرمه‌ای:** `#0F2A47`
- **طلایی:** `#C9A24B`
- **پس‌زمینه:** `#FAFAF8`
- **بوردر:** `#E8E6E1`

جزئیات پرامپت و اسلات‌های تصویری: [`docs/IMAGE_GENERATION_PROMPTS.md`](docs/IMAGE_GENERATION_PROMPTS.md)

## دیپلوی روی GitHub Pages

پروژه با Vite + React Router برای **project site** آماده است (`https://<user>.github.io/<repo>/`).

### یک‌بار در گیتهاب

1. ریپو را بسازید و کد را پوش کنید (نام ریپو مثلاً `Artam`).
2. در **Settings → Pages → Build and deployment** منبع را روی **GitHub Actions** بگذارید.
3. ورک‌فلو [`.github/workflows/deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml) با هر push به `main`/`master` بیلد می‌گیرد و دیپلوی می‌کند.
4. `BASE_PATH` از نام ریپو ست می‌شود (`/<repo>/`)؛ اگر نام ریپو غیر از `Artam` است، اسکریپت‌های محلی `build:gh` / `preview:gh` را مطابق همان نام عوض کنید.

### تست محلی قبل از پوش

```bash
npm run build:gh
npm run preview:gh
```

سپس آدرس پیش‌نمایش Vite را با مسیر پایهٔ `/Artam/` باز کنید.

### نکات فنی

- `base` در `vite.config.ts` از متغیر محیطی `BASE_PATH` خوانده می‌شود.
- روتر با `basename` هماهنگ با Vite است؛ دارایی‌های `public/` از طریق `withBase` / `withBasePaths` prefix می‌شوند.
- بعد از بیلد، `404.html` از روی `index.html` کپی می‌شود تا deep linkهای SPA روی Pages کار کنند.
- فایل `public/.nojekyll` پردازش Jekyll را روی Pages غیرفعال می‌کند.

## محیط (اختیاری)

فایل نمونه: [`.env.example`](.env.example) — مربوط به قالب اولیه AI Studio است و برای اجرای فعلی فرانت‌اند اجباری نیست. داده‌های ملک و محتوا از mockهای محلی خوانده می‌شوند.
