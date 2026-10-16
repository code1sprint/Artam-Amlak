# آرتام — راهنمای تولید تصاویر برند

سند مرجع برای جایگزینی تصاویر Unsplash با عکس‌های اختصاصی هماهنگ با دیزاین سیستم **املاک لوکس آرتام**.

---

## ۱. زبان بصری برند (خلاصه دیزاین)

| محور | مشخصات |
|------|--------|
| برند | املاک لوکس آرتام / ARTAM LUXURY REAL ESTATE |
| بازار | شمیرانات (زعفرانیه، فرشته، نیاوران، الهیه، لواسان) — RTL فارسی |
| پالت | سرمه‌ای `#0F2A47` · طلایی `#C9A24B` · پس‌زمینه گرم `#FAFAF8` · بوردر `#E8E6E1` |
| تایپ | Vazirmatn Variable |
| حس کلی | لوکس دیپلماتیک، سندمحور، انحصاری — نه MLS عمومی |
| قاب‌ها | `rounded-2xl` / `rounded-3xl`، سایه نرم navy-tint، گرادیان سرمه‌ای روی هیرو |

### سبک مشترک همه پرامپت‌ها

در انتهای هر پرامپت این بلوک را اضافه کنید (یا در negative prompt بگذارید):

**Style lock (English):**
```
luxury Iranian / North Tehran Shemiranat real-estate photography, cinematic editorial quality,
deep navy (#0F2A47) and soft metallic gold (#C9A24B) color harmony in scene accents,
warm natural light or golden-hour, photorealistic, architectural photography,
no text overlays, no watermarks, no logos, no UI mockups
```

**Negative (پیشنهادی):**
```
cartoon, illustration, CGI render look, oversaturated purple neon, stock selfie vibe,
crowded tourism, poor composition, blurry, watermark, text, logo, brand name in image
```

---

## ۲. فهرست اسلات‌های تصویری پروژه

### ۲.۱ لوگو و کروم (لوکال — نیاز به جنریت ندارند مگر بازطراحی برند)

| کد | محل استفاده | مسیر فعلی | نسبت |
|----|-------------|-----------|------|
| B1 | `BrandLogo` mark | `/public/brand/artam-logo-mark.png` | ~1040×838 |
| B2 | `BrandLogo` full / فوتر | `/public/brand/artam-logo-full.png` | ~1040×1644 |
| B3 | لودر روت (`router.tsx`) | همان logoMark | ۸×۸ مربع |
| B4 | مارکر نقشه تماس | همان logoMark | ۵۲×۵۲ |

> این‌ها فایل برند موجودند؛ پرامپت عکس برایشان لازم نیست.

---

### ۲.۲ هیرو و دسته‌بندی‌ها (خانه)

| کد | فایل | موضوع | نسبت پیشنهادی | URL فعلی (Unsplash) |
|----|------|--------|---------------|---------------------|
| H1 | `HomeHero.tsx` | هیرو فول‌بلید خانه | ۲۱∶۹ یا ۱۶∶۹ · ۱۹۲۰px+ | `photo-1600596542815` |
| C1 | `PropertyCategoriesSection` | آپارتمان و پنت‌هاوس | پرتره ~۳∶۴ · ۱۰۰۰px | `photo-1600607687939` |
| C2 | همان | ویلای مستقل و مدرن | ~۳∶۴ | `photo-1613977257363` |
| C3 | همان | اداری و تجاری | ~۳∶۴ | `photo-1486406146926` |
| C4 | همان | زمین و کلنگی | ~۳∶۴ | `photo-1500382017468` |

---

### ۲.۳ صفحه درباره ما

| کد | موضوع | نسبت | URL فعلی |
|----|--------|------|----------|
| A1 | دفتر مرکزی برج آرتام زعفرانیه | ۴∶۳ · ۱۲۰۰px | `photo-1497366216548` |
| A2 | پروانه درجه یک اتحادیه | ۴∶۳ → lightbox ۱۶∶۱۰ | `photo-1589829545856` |
| A3 | ISO 9001 TUV | ۴∶۳ | `photo-1450133064473` |
| A4 | تندیس زرین برند برتر | ۴∶۳ | `photo-1567427017947` |
| A5 | گواهی صلاحیت حقوقی قرارداد | ۴∶۳ | `photo-1454165804606` |

---

### ۲.۴ مشاوران (آواتار مربع)

| کد | نام | نقش | نسبت | URL فعلی |
|----|-----|-----|------|----------|
| AG1 | مهندس آرش شایگان | مدیر دپارتمان پنت‌هاوس و دیپلماتیک | ۱∶۱ · ۶۰۰px | `photo-1560250097` |
| AG2 | مهندس ماندانا پیروز | کارشناس ارشد ویلاهای مدرن | ۱∶۱ | `photo-1573496359142` |
| AG3 | سامان فراهانی | مشاور سرمایه‌گذاری و پیش‌فروش | ۱∶۱ | `photo-1519085360753` |
| AG4 | نیلوفر رادمنش | رهن و اجاره دیپلماتیک | ۱∶۱ | `photo-1580489944761` |
| AG5 | دکتر کامران بصیرت | مشاور حقوقی و تجاری | ۱∶۱ | `photo-1507003211169` |

مصرف‌کننده‌ها: `AgentCard`، `AgentDetailPage`، `ContactAgentCard`، آواتار نویسنده بلاگ.

---

### ۲.۵ نظرات مشتریان (آواتار)

| کد | نام | نقش | نسبت · ۳۰۰px |
|----|-----|-----|--------------|
| T1 | دکتر محمدرضا اعتمادی | جراح قلب و سرمایه‌گذار | `photo-1534528741775` |
| T2 | مهندس بهزاد کمالی | مدیرعامل هلدینگ پتروشیمی | `photo-1507003211169` |
| T3 | سوفیا هدایت‌پور | طراح ارشد مد | `photo-1544005313` |
| T4 | فرهاد انصاری | بنیان‌گذار فین‌تک | `photo-1500648767791` |
| T5 | دکتر هدی رضایی | استاد دانشگاه / مالک ویلا | `photo-1573496359142` |
| T6 | کیوان دادگر | تجارت بین‌الملل | `photo-1519085360753` |

قاب: `rounded-xl` squircle در `TestimonialCard`.

---

### ۲.۶ کاور وبلاگ (۱۶∶۹)

| کد | عنوان مقاله | نسبت · ۱۲۰۰px | URL فعلی |
|----|-------------|----------------|----------|
| BL1 | روند معماری و پنت‌هاوس شمیرانات | ۱۶∶۹ | `photo-1600607687939` |
| BL2 | راهنمای حقوقی سند و پایان‌کار | ۱۶∶۹ | `photo-1450133064473` |
| BL3 | سرمایه‌گذاری ویلا لواسانات | ۱۶∶۹ | `photo-1613977257363` |
| BL4 | BMS و خانه هوشمند | ۱۶∶۹ | `photo-1558002038` |
| BL5 | اجاره دیپلماتیک | ۱۶∶۹ | `photo-1600607687644` |
| BL6 | هوم استیجینگ فروش | ۱۶∶۹ | `photo-1600585154526` |

---

### ۲.۷ املاک (۲۴ فایل · گالری ۱–۴ عکس · کاور ۴∶۳)

| کد | ملک | نوع / محله | تعداد عکس فعلی |
|----|------|------------|----------------|
| P1 | پنت‌هاوس اسکای دید البرز | آپارتمان · زعفرانیه | ۴ |
| P2 | عمارت پنت‌هاوس فرشته | آپارتمان · فرشته | ۳ |
| P3 | ویلای ارگانیک سد لتیان | ویلا · لواسان | ۳ |
| P4 | آپارتمان دیپلماتیک برج‌باغ | آپارتمان · نیاوران | ۲ |
| P5 | اجاره فول‌فرنیش گلنار | آپارتمان · الهیه | ۲ |
| P6 | واحد ۴۲۰ متری برج‌باغ | آپارتمان · کامرانیه | ۲ |
| P7 | ویلای کلاسیک بام ولنجک | ویلا · ولنجک | ۲ |
| P8 | ساختمان اداری هلدینگی | تجاری · فرمانیه | ۲ |
| P9 | زمین کلنگی دستور نقشه | زمین · شهرک غرب | ۱ |
| P10 | آپارتمان پانوراما اقدسیه | آپارتمان · اقدسیه | ۲ |
| P11 | پنت‌هاوس بوتیک محمودیه | آپارتمان · محمودیه | ۲ |
| P12 | رهن واحد باغ تجریش | آپارتمان · تجریش | ۲ |
| P13 | واحد اداری میدان کاج | تجاری · سعادت‌آباد | ۱ |
| P14 | ویلای مینیمال ژاپنی بتن | ویلا · لواسان | ۲ |
| P15 | آپارتمان ۲۶۰ متری زعفرانیه | آپارتمان · زعفرانیه | ۲ |
| P16 | ویلای دوبلکس شهرک غرب | ویلا · شهرک غرب | ۱ |
| P17 | رهن کامل پنت‌هاوس فرمانیه | آپارتمان · فرمانیه | ۲ |
| P18 | واحد ۲۱۰ متری سعادت‌آباد | آپارتمان · سعادت‌آباد | ۱ |
| P19 | زمین دونبش ساسان ولنجک | زمین · ولنجک | ۱ |
| P20 | اجاره پنت‌هاوس فول‌فرنیش | آپارتمان · نیاوران | ۲ |
| P21 | مغازه بر اندرزگو | تجاری · فرمانیه | ۱ |
| P22 | واحد نئوکلاسیک زعفرانیه | آپارتمان · زعفرانیه | ۲ |
| P23 | پنت‌هاوس ۶۰۰ متری دوبلکس | آپارتمان · الهیه | ۳ |
| P24 | ویلای هوشمند شورکاب | ویلا · لواسان | ۲ |

مصرف‌کننده‌ها: `PropertyCard` (۴∶۳)، `PropertyGallery`، `PropertyListCard`، پاپ‌آپ نقشه.

---

## ۳. پرامپت‌های حرفه‌ای تولید تصویر

همه پرامپت‌ها به انگلیسی نوشته شده‌اند تا با Midjourney / Flux / SD / Ideogram سازگار باشند. قبل از هر کدام، **Style lock** بخش ۱ را بچسبانید.

---

### H1 — هیرو صفحه اصلی

**ابعاد:** 1920×1080 یا 2560×1080 (wide) · فضای تیره در ۱/۳ پایین برای گرادیان سرمه‌ای و تایپ سفید

```
Ultra-wide cinematic exterior of an ultra-luxury modern penthouse villa in North Tehran Shemiranat foothills at golden hour, Alborz mountains soft silhouette in background, floor-to-ceiling glass facade reflecting warm dusk light, private rooftop infinity edge pool hint, manicured stone terrace, dramatic deep shadows in lower third for dark navy overlay, no people, architectural editorial photography, shallow atmospheric haze, 21:9 composition, photorealistic 8k
```

---

### C1 — دسته آپارتمان و پنت‌هاوس

**ابعاد:** 1000×1400 (portrait) · ۱/۳ پایین تاریک برای متن سفید

```
Vertical luxury real-estate category photo: breathtaking modern penthouse living room with panoramic Alborz mountain view through floor-to-ceiling windows, warm walnut flooring, soft gold accent lighting, biophilic terrace garden visible, deep navy shadows toward bottom third for text overlay, no people, editorial interior architecture, 3:4 portrait, photorealistic
```

### C2 — دسته ویلا

```
Vertical luxury category photo: exclusive contemporary villa exterior in Lavasan hills, clean modern volumes, natural stone and glass, infinity pool reflecting sky, mature cypress trees, golden-hour side light, dark gradient-ready lower third, no people, architectural photography, 3:4 portrait, photorealistic
```

### C3 — دسته اداری تجاری

```
Vertical luxury commercial real-estate photo: elegant glass office tower facade in upscale North Tehran business district at blue hour, refined curtain wall reflections, warm lobby glow at base, sophisticated and corporate not cold, dark lower third for overlay text, no people, architectural photography, 3:4 portrait, photorealistic
```

### C4 — دسته زمین و کلنگی

```
Vertical prime residential land photo: empty premium sloping plot in affluent Shemiranat neighborhood ready for luxury construction, clear sky, distant Alborz, soft morning light over green grass and stone boundary wall, aspirational not barren wasteland, dark lower third for text, no people, no machinery, landscape architectural photo, 3:4 portrait, photorealistic
```

---

### A1 — دفتر مرکزی آرتام (درباره ما)

**ابعاد:** 1200×900 (۴∶۳) · قاب سفید لوکس در UI

```
Luxury boutique real-estate brokerage headquarters interior in Zaferaniyeh Tehran, refined reception lobby with deep navy walls, soft metallic gold accents, natural stone desk, warm indirect lighting, floor-to-ceiling windows, discreet artwork, quiet exclusive atmosphere, no visible brand logos or text, architectural interior photography, 4:3, photorealistic
```

### A2 — پروانه اتحادیه

```
Formal flat-lay of an official Iranian real-estate brokerage first-class license certificate document on dark walnut desk, subtle gold foil seal impression, soft studio lighting, navy leather folder corner in frame, prestigious and authentic mood, no readable fake text if possible or keep text soft-blurred, 4:3 product photography, photorealistic
```

### A3 — ISO 9001

```
Professional quality management certificate presentation: ISO-style certificate folder with metallic seal on clean white marble surface beside soft gold pen, corporate luxury still life, navy and cream palette, soft side light, 4:3, photorealistic, no clutter
```

### A4 — تندیس برند برتر

```
Elegant golden award trophy for top luxury real-estate brand on black granite pedestal, soft spotlight, shallow depth of field, metallic gold reflections, prestigious ceremony mood, navy background bokeh, 4:3 product photography, photorealistic
```

### A5 — صلاحیت حقوقی قرارداد

```
Legal contract review still life for luxury property brokerage: leather-bound contract folder, fountain pen, reading glasses, soft daylight on oak desk, navy binder, discreet gold clip, serious trustworthy atmosphere, 4:3, photorealistic, no readable sensitive text
```

---

### مشاوران — AG1 تا AG5

**ابعاد:** 600×600 · کراپ برای `rounded-2xl` · لباس سرمه‌ای/طلایی ملایم · نور استودیو نرم

**AG1 — آرش شایگان**
```
Professional headshot of a confident Iranian man in mid-40s, luxury real-estate executive, charcoal navy tailored suit, subtle gold tie pin, calm authoritative smile, soft studio key light, neutral warm gray backdrop, square 1:1 crop, editorial LinkedIn quality, Middle Eastern features, photorealistic
```

**AG2 — ماندانا پیروز**
```
Professional headshot of an elegant Iranian woman in late 30s, senior villa architecture consultant, navy blazer over cream blouse, refined gold earrings, intelligent warm expression, soft studio light, neutral backdrop, square 1:1, editorial portrait, photorealistic
```

**AG3 — سامان فراهانی**
```
Professional headshot of an Iranian man in early 40s, investment advisor look, modern navy suit without tie, subtle stubble, approachable confident expression, soft studio lighting, warm gray background, square 1:1, photorealistic
```

**AG4 — نیلوفر رادمنش**
```
Professional headshot of a polished Iranian woman in early 30s, diplomatic rental specialist, elegant navy dress jacket, soft gold necklace, multilingual cosmopolitan presence, soft beauty lighting, neutral backdrop, square 1:1, photorealistic
```

**AG5 — کامران بصیرت**
```
Professional headshot of a distinguished Iranian man in early 50s, senior legal counsel for luxury real estate, classic navy suit, glasses optional, trustworthy serious expression, soft studio light, warm gray backdrop, square 1:1, photorealistic
```

---

### نظرات — T1 تا T6

**ابعاد:** 300×300 · حس Affluent client نه مشاور برند

**T1**
```
Affluent Iranian male doctor in late 50s, refined casual luxury attire, warm credible smile, soft natural light portrait, square crop, photorealistic lifestyle headshot
```

**T2**
```
Successful Iranian male executive mid-50s, holding company CEO look, navy blazer, confident composed portrait, soft studio light, square 1:1, photorealistic
```

**T3**
```
Sophisticated Iranian woman mid-30s fashion designer, elegant minimal styling, soft natural window light, stylish but understated, square crop, photorealistic
```

**T4**
```
Young Iranian male tech founder early 30s, smart-casual luxury look, approachable smile, modern office bokeh, square 1:1, photorealistic
```

**T5**
```
Elegant Iranian woman professor mid-40s, warm intellectual presence, soft knit and pearl, natural light, square crop, photorealistic
```

**T6**
```
Iranian male international trader mid-40s, travel-ready tailored blazer, cosmopolitan confident look, soft studio light, square 1:1, photorealistic
```

---

### وبلاگ — BL1 تا BL6

**ابعاد:** 1200×675 (۱۶∶۹) · گوشه بالا برای بج دسته · گوشه پایین برای زمان مطالعه

**BL1 — روند پنت‌هاوس / بیوفیلیک**
```
Wide 16:9 editorial photo of biophilic luxury penthouse terrace garden in Shemiranat with glass infinity pool edge and Alborz view, lush four-season planting, golden hour, no people, architectural lifestyle photography
```

**BL2 — حقوقی سند**
```
Wide 16:9 still life of luxury property legal documents, single-leaf deed folder, cadastral map edges soft-blurred, fountain pen, soft daylight on marble desk, navy and cream palette, trustworthy editorial photo
```

**BL3 — سرمایه‌گذاری لواسان**
```
Wide 16:9 aerial-feeling view of exclusive modern villas nestled in Lavasan green hills near lake atmosphere, clear sky, investment aspirational mood, no people, landscape architectural photography
```

**BL4 — BMS / خانه هوشمند**
```
Wide 16:9 modern luxury living room with discreet smart-home wall panel and ambient LED cove lighting, tablet controlling lights softly in frame without readable UI text, sleek tech meets warm wood, twilight interior, photorealistic
```

**BL5 — اجاره دیپلماتیک**
```
Wide 16:9 fully furnished diplomatic-grade luxury apartment living room in Elahiyeh style, European designer furniture, soft evening lamps, secure discreet curtains, no people, hospitality editorial photography
```

**BL6 — هوم استیجینگ**
```
Wide 16:9 perfectly staged luxury bedroom ready for sale, warm layered lighting, fresh flowers, hotel-like bedding, decluttered surfaces, inviting emotional first-impression mood, no people, interior staging photography
```

---

### املاک — کاور و گالری

برای هر ملک: **عکس اول = کاور ۴∶۳ (۱۲۰۰×۹۰۰)** · عکس‌های بعدی = گالری (داخلی / نما / امکانات).

#### P1 — پنت‌هاوس اسکای زعفرانیه (۴ عکس)

```
1 COVER 4:3: Ultra-luxury neo-classical modern penthouse exterior/rooftop in Zaferaniyeh with suspended glass pool over city and Alborz skyline at dusk, no people
2: Grand living room with imported Milan finishes, floor-to-ceiling windows to mountains
3: Private rooftop four-season garden and glass pool edge
4: Master suite with king bed and panoramic night city lights
```

#### P2 — عمارت پنت‌هاوس فرشته (۳)

```
1 COVER: Palace-like penthouse facade in Fereshteh Chenaran lane, 4.5m ceiling hint through tall windows, 360 city view dusk
2: Gaggenau-style open kitchen and double-height living
3: Indoor spa / sauna wood detail with soft lighting
```

#### P3 — ویلای ارگانیک لتیان (۳)

```
1 COVER: Organic modern triplex villa overlooking Latyan reservoir lake, 1800sqm landscaped grounds, infinity pool, golden hour
2: Dutch-style garden and tennis court aerial-feeling
3: Glass indoor-outdoor living with lake reflection
```

#### P4 — دیپلماتیک برج‌باغ نیاوران (۲)

```
1 COVER: Diplomatic tower-garden apartment exterior with lush shared courtyard, North Tehran
2: Bright 4-bedroom living with floor-to-ceiling windows to mature garden
```

#### P5 — اجاره فول‌فرنیش الهیه (۲)

```
1 COVER: Super-luxury furnished living room Elahiyeh, Fendi/Roche Bobois vibe furniture, green unobstructed view
2: Designer bedroom ready for diplomatic tenant, soft evening light
```

#### P6 — ۴۲۰ متری کامرانیه (۲)

```
1 COVER: Brand-new tower-garden unit facade Kamraniyeh, elegant stone and glass
2: Column-free living with 20m terrace overlooking garden, 3.8m ceilings
```

#### P7 — ویلای کلاسیک ولنجک (۲)

```
1 COVER: Classic mansion villa on Velenjak ridge with city overlook terraces, stone facade, mature walnut trees
2: Indoor pool and glass elevator shaft interior drama
```

#### P8 — اداری هلدینگی فرمانیه (۲)

```
1 COVER: Independent 5-story holding office building at Farmaniyeh Andarzgoo corner, prestigious street presence
2: Refined corporate lobby with stone and navy accents
```

#### P9 — زمین شهرک غرب (۱)

```
COVER 4:3: Premium empty residential plot in Shahrak-e Gharb Phase 1 villa street, 22m frontage feel, ready for luxury build, morning light, no debris piles
```

#### P10 — پانوراما اقدسیه (۲)

```
1 COVER: Panoramic apartment living with floor-to-ceiling windows over Aghdasieh gardens
2: Luxury lobby and roof garden city view
```

#### P11 — پنت‌هاوس بوتیک محمودیه (۲)

```
1 COVER: Boutique neo-modern penthouse with private 80sqm yard and jacuzzi, Mahmoudieh
2: Italian slab stone living with Yamaha lifestyle audio vibe (no logos)
```

#### P12 — باغ تجریش (۲)

```
1 COVER: Garden apartment in mature Tajrish orchard with ancient plane trees and qanat stream mood
2: Column-free salon opening to green terrace
```

#### P13 — اداری سعادت‌آباد (۱)

```
COVER: Luxury office unit with frameless glass partitions, conference room, modern island kitchenette, Saadat Abad Kaj Square vibe
```

#### P14 — ویلای مینیمال ژاپنی لواسان (۲)

```
1 COVER: Award-winning Japanese minimal villa, exposed polished concrete, cedar wood, glass courtyard pool, Lavasan
2: Zen garden courtyard with glass warm pool at dusk
```

#### P15 — ۲۶۰ متری زعفرانیه (۲)

```
1 COVER: Boutique 8-unit modern building apartment Zaferaniyeh, calm street presence
2: Bright 3-bedroom living Spanish materials, soft daylight
```

#### P16 — ویلای دوبلکس شهرک غرب (۱)

```
COVER: Modern duplex villa in gated Shahrak-e Gharb cul-de-sac, heated outdoor pool in rear yard, private guest suite entrance
```

#### P17 — پنت‌هاوس رهن فرمانیه (۲)

```
1 COVER: Exceptional Farmaniyeh west penthouse with modern dome ceilings and wraparound terrace to mountain and city
2: Dual living reception with private elevator lobby
```

#### P18 — ۲۱۰ متری سعادت‌آباد (۱)

```
COVER: Brand-new unused luxury apartment on 24m boulevard Saadat Abad, travertine and thermo-wood facade, neoclassical kitchen glimpse
```

#### P19 — زمین دونبش ولنجک (۱)

```
COVER: Rare corner 520sqm prime land on Sassan Velenjak with exceptional dual frontage, clear luxury build potential, soft morning light
```

#### P20 — اجاره پنت‌هاوس نیاوران (۲)

```
1 COVER: 500sqm fully furnished rental penthouse Niavaran, European furniture, rooftop jacuzzi city panorama at night
2: Living with billiard table and ambient luxury lighting
```

#### P21 — مغازه اندرزگو (۱)

```
COVER: Flagship street-front commercial shop on Andarzgoo boulevard, 12m frontage, 6m ceiling height feel, ideal for luxury brand showroom, dusk storefront glow, no readable shop signs
```

#### P22 — نئوکلاسیک زعفرانیه (۲)

```
1 COVER: Neoclassical garden apartment in heart of Zaferaniyeh orchards, elegant stone facade
2: Master suite with full wood closets and soft gold fixtures
```

#### P23 — پنت‌هاوس دوبلکس الهیه (۳)

```
1 COVER: Spectacular 600sqm duplex penthouse Elahiyeh with 6m living ceiling and private four-season glass-wall pool to sky, Chenaran and mountain view
2: Double-height living with private elevator between floors
3: Glass pool room night glow
```

#### P24 — ویلای هوشمند شورکاب (۲)

```
1 COVER: Fully smart modern villa in Shurkab Lavasan, 1200sqm grounds, cantilevered infinity pool, glass terrace to orchards
2: Night exterior with warm smart lighting and 24h security gate mood
```

---

## ۴. اولویت تولید (پیشنهادی)

| اولویت | اسلات | دلیل |
|--------|-------|------|
| ۱ | H1 | اولین فریم سایت؛ قوی‌ترین سیگنال برند |
| ۲ | C1–C4 | بخش اصلی صفحه خانه |
| ۳ | کاور املاک شاخص P1, P2, P3, P23, P24 | فایل‌های featured |
| ۴ | A1 + گواهی‌ها A2–A5 | اعتماد صفحه درباره ما |
| ۵ | AG1–AG5 | صفحات مشاوران و کارت‌ها |
| ۶ | BL1–BL6 | کارت‌های وبلاگ |
| ۷ | T1–T6 | بخش نظرات |
| ۸ | بقیه گالری املاک | تکمیل جزئیات |

---

## ۵. نام‌گذاری فایل پیشنهادی

```
public/images/
  hero/home-hero.webp
  categories/apartment.webp
  categories/villa.webp
  categories/commercial.webp
  categories/land.webp
  about/hq-office.webp
  about/cert-union.webp
  about/cert-iso.webp
  about/cert-award.webp
  about/cert-legal.webp
  agents/ag-shayegan.webp
  agents/ag-pirouz.webp
  agents/ag-farahani.webp
  agents/ag-radmanesh.webp
  agents/ag-basirat.webp
  testimonials/t-etemadi.webp
  ...
  blog/bl-trends-shemiranat.webp
  ...
  properties/prop-1/cover.webp
  properties/prop-1/01.webp
  ...
```

فرمت پیشنهادی: **WebP** یا **AVIF** · کیفیت ۸۰–۸۵ · عرض مطابق جدول نسبت‌ها.

---

## ۶. منابع کد مرتبط

| موضوع | مسیر |
|-------|------|
| برند و کپی | `src/constants/site.ts` |
| توکن رنگ | `src/index.css` · `src/constants/tokens.ts` |
| هیرو | `src/components/home/HomeHero.tsx` |
| دسته‌ها | `src/components/home/PropertyCategoriesSection.tsx` |
| درباره ما | `src/pages/AboutPage.tsx` |
| املاک mock | `src/data/properties.mock.ts` |
| مشاوران | `src/data/agents.mock.ts` |
| نظرات | `src/data/testimonials.mock.ts` |
| وبلاگ | `src/data/blog.mock.ts` |
| لوگو | `src/components/common/BrandLogo.tsx` · `public/brand/` |

---

*آخرین به‌روزرسانی: بر اساس وضعیت فعلی پروژه آرتام (جایگزین‌های Unsplash).*
