import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import {
  Building2,
  Search,
  Sparkles,
  SlidersHorizontal,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  Bookmark,
  ChevronLeft,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PriceText } from '@/components/common/PriceText';
import { Rating } from '@/components/common/Rating';
import { IconBox } from '@/components/common/IconBox';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { DESIGN_TOKENS } from '@/constants/tokens';
import { APP_CONFIG } from '@/constants/app';
import { UI_STRINGS } from '@/constants/translations';
import { withBase } from '@/lib/base';
import { toPersianDigits } from '@/lib/formatters';

export default function DesignSystemPage() {
  const [sliderPrice, setSliderPrice] = useState<number[]>([15, 85]);
  const [selectedPropertyType, setSelectedPropertyType] = useState('penthouse');
  const [agreed, setAgreed] = useState(true);

  return (
    <>
      <Helmet>
        <title>{`سیستم طراحی و مستندات بصری | ${APP_CONFIG.name}`}</title>
      </Helmet>

      <div className="py-12 bg-neutral-background">
        <Container>
          {/* Breadcrumb Preview */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={withBase('/')}>{UI_STRINGS.navigation.home}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{UI_STRINGS.navigation.designSystem}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Heading */}
          <SectionHeading
            badge="سیستم طراحی اختصاصی"
            title="مستندات دیزاین سیستم املاک لوکس"
            subtitle="پالت رنگی سرمه‌ای و طلایی، تایپوگرافی وزیرمتن، کامپوننت‌های پایه و الگوهای تعاملی RTL"
          />

          <div className="space-y-16">
            {/* 1. PALETTE SECTION */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۱. پالت رنگ‌های برند (Brand Color Tokens)</h3>
                <p className="text-sm text-muted-foreground">رنگ اصلی سرمه‌ای عمیق، تأکید طلایی متالیک و پس‌زمینه‌های طبیعی گرم</p>
              </div>

              {/* Primary Navy */}
              <div>
                <h4 className="text-sm font-semibold text-primary-900 mb-3">طیف سرمه‌ای اختصاصی (Primary Navy #0F2A47)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
                  {Object.entries(DESIGN_TOKENS.colors.primary)
                    .filter(([key]) => key !== 'DEFAULT')
                    .map(([shade, hex]) => (
                      <div key={shade} className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                        <div
                          className="h-12 w-full rounded-lg mb-2 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="text-xs font-bold text-foreground">{toPersianDigits(shade)}</div>
                        <div className="text-[11px] font-mono text-muted-foreground uppercase">{hex}</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Accent Gold */}
              <div>
                <h4 className="text-sm font-semibold text-primary-900 mb-3">طیف طلایی لوکس (Accent Gold #C9A24B)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
                  {Object.entries(DESIGN_TOKENS.colors.accent)
                    .filter(([key]) => key !== 'DEFAULT')
                    .map(([shade, hex]) => (
                      <div key={shade} className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                        <div
                          className="h-12 w-full rounded-lg mb-2 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="text-xs font-bold text-foreground">{toPersianDigits(shade)}</div>
                        <div className="text-[11px] font-mono text-muted-foreground uppercase">{hex}</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Feedback and Neutrals */}
              <div>
                <h4 className="text-sm font-semibold text-primary-900 mb-3">سطوح و رنگ‌های بازخورد (Feedback & Neutrals)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 border border-border bg-[#FAFAF8]" />
                    <div className="text-xs font-bold">پس‌زمینه اصلی</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#FAFAF8</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 border border-border bg-[#FFFFFF]" />
                    <div className="text-xs font-bold">سطح کارت‌ها</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#FFFFFF</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 bg-[#16A34A]" />
                    <div className="text-xs font-bold text-emerald-700">موفقیت (Success)</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#16A34A</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 bg-[#DC2626]" />
                    <div className="text-xs font-bold text-rose-700">خطا (Danger)</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#DC2626</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 bg-[#F59E0B]" />
                    <div className="text-xs font-bold text-amber-700">هشدار (Warning)</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#F59E0B</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border text-center shadow-xs">
                    <div className="h-10 w-full rounded-lg mb-2 bg-[#64748B]" />
                    <div className="text-xs font-bold text-slate-700">متن فرعی (Muted)</div>
                    <div className="text-[11px] font-mono text-muted-foreground">#64748B</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. TYPOGRAPHY SECTION */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۲. مقیاس تایپوگرافی (Typography Scale - Vazirmatn)</h3>
                <p className="text-sm text-muted-foreground">فونت وزیرمتن self-hosted، فاصله‌گذاری خطوط متناسب با خط فارسی (۱.۸ برای پاراگراف‌ها)</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-soft space-y-6 divide-y divide-border">
                <div className="pt-2 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">تیتر یک (H1 - 36px)</span>
                  <h1 className="text-3xl sm:text-4xl text-primary-900 font-extrabold flex-1">
                    پنت‌هاوس مجلل رو به کوهستان در زعفرانیه
                  </h1>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">تیتر دو (H2 - 28px)</span>
                  <h2 className="text-2xl sm:text-3xl text-primary-900 font-bold flex-1">
                    برترین پروژه‌های مسکونی و تجاری شمال پایتخت
                  </h2>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">تیتر سه (H3 - 22px)</span>
                  <h3 className="text-xl font-bold text-primary-900 flex-1">
                    امکانات رفاهی اختصاصی، مشاعات آبی و هلی‌پد
                  </h3>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">متن بدنه (Body Text)</span>
                  <p className="text-base text-foreground leading-[1.8] flex-1">
                    این ملک با متراژ ۵۵۰ متر مربع در طبقه پانزدهم برجی مجلل واقع شده است. چشم‌انداز ۳۶۰ درجه، متریال تماماً وارداتی اروپایی، سیستم خانه هوشمند و ۴ پارکینگ سندی از ویژگی‌های بارز این واحد بی‌نظیر می‌باشد.
                  </p>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">زیرنویس (Caption)</span>
                  <p className="caption-text flex-1">
                    تاریخ آخرین به‌روزرسانی قیمت و استعلام سند: ۲ روز پیش توسط کارشناس ارشد دفتر آرتام
                  </p>
                </div>
              </div>
            </section>

            {/* 3. BUTTONS SECTION */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۳. دکمه‌ها و وضعیت‌ها (Button Variants & Sizes)</h3>
                <p className="text-sm text-muted-foreground">طراحی لوکس بدون گردی اغراق‌آمیز (Radius 12-16px) با استیت‌های hover و active</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-soft space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground mb-3">انواع دکمه‌ها (Variants)</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">دکمه اصلی سرمه‌ای</Button>
                    <Button variant="accent">دکمه تأکید طلایی</Button>
                    <Button variant="outline">دکمه خطی (Outline)</Button>
                    <Button variant="secondary">دکمه فرعی (Secondary)</Button>
                    <Button variant="ghost">دکمه شفاف (Ghost)</Button>
                    <Button variant="danger">دکمه هشدار (Danger)</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground mb-3">اندازه‌ها و آیکون‌ها (Sizes & Icons)</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">سایز کوچک (Small)</Button>
                    <Button size="md">سایز استاندارد (Medium)</Button>
                    <Button size="lg">سایز بزرگ (Large)</Button>
                    <Button size="md" variant="primary">
                      <Sparkles className="w-4 h-4 ms-2 text-accent" />
                      همراه با آیکون راست
                    </Button>
                    <Button size="md" variant="outline">
                      آیکون در سمت چپ
                      <ChevronLeft className="w-4 h-4 me-2" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="primary">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. FORM INPUTS & SELECT & SLIDER */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۴. فیلدهای فرم، انتخاب‌گر و اسلایدر RTL</h3>
                <p className="text-sm text-muted-foreground">چیدمان کامپوننت‌های فرم بر مبنای جهت راست‌به‌چپ (RTL) و فوکوس طلایی</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-soft space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary-900">ورودی جستجو با آیکون</label>
                    <Input
                      placeholder="جستجوی محله، متراژ یا نام برج..."
                      startIcon={<Search className="w-4 h-4" />}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary-900">ورودی شماره تماس</label>
                    <Input
                      placeholder="۰۹۱۲..."
                      startIcon={<Phone className="w-4 h-4" />}
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary-900">انتخاب نوع ملک (RTL Select)</label>
                    <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="یک گزینه انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="penthouse">{UI_STRINGS.propertyTypes.penthouse}</SelectItem>
                        <SelectItem value="villa">{UI_STRINGS.propertyTypes.villa}</SelectItem>
                        <SelectItem value="luxuryApartment">{UI_STRINGS.propertyTypes.luxuryApartment}</SelectItem>
                        <SelectItem value="commercial">{UI_STRINGS.propertyTypes.commercial}</SelectItem>
                        <SelectItem value="tower">{UI_STRINGS.propertyTypes.tower}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary-900">متن پیام یا توضیحات ملک</label>
                  <Textarea placeholder="ویژگی‌های خاص، طبقه، موقعیت و شرایط پرداخت خود را بنویسید..." />
                </div>

                {/* Slider RTL Range */}
                <div className="p-5 rounded-xl bg-neutral-background border border-border/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-900">بازه قیمت پیشنهادی (اسلایدر RTL):</span>
                    <span className="text-xs font-semibold text-accent-700">
                      از {toPersianDigits(sliderPrice[0])} تا {toPersianDigits(sliderPrice[1])} میلیارد تومان
                    </span>
                  </div>
                  <Slider
                    value={sliderPrice}
                    onValueChange={setSliderPrice}
                    max={120}
                    min={5}
                    step={1}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>حداکثر: {toPersianDigits(120)} میلیارد تومان</span>
                    <span>حداقل: {toPersianDigits(5)} میلیارد تومان</span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(val) => setAgreed(!!val)}
                  />
                  <label htmlFor="terms" className="text-xs font-medium text-foreground cursor-pointer select-none">
                    موافقت با قوانین و مقررات محرمانگی قراردادهای اختصاصی آرتام
                  </label>
                </div>
              </div>
            </section>

            {/* 5. BADGES & CARDS */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۵. نشان‌ها و کارت‌ها (Badges & Cards)</h3>
                <p className="text-sm text-muted-foreground">کارت‌های مینیمال با سایه‌های نرم و برچسب‌های وضعیت</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="primary">{UI_STRINGS.badges.featured}</Badge>
                <Badge variant="accent">{UI_STRINGS.badges.exclusive}</Badge>
                <Badge variant="goldFilled">لوکس درجه یک</Badge>
                <Badge variant="success">{UI_STRINGS.badges.verified}</Badge>
                <Badge variant="danger">{UI_STRINGS.badges.sold}</Badge>
                <Badge variant="secondary">{UI_STRINGS.badges.new}</Badge>
                <Badge variant="outline">منطقه زعفرانیه</Badge>
              </div>

              {/* Card Example */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hoverEffect>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="accent">{UI_STRINGS.badges.exclusive}</Badge>
                      <Rating value={4.9} reviewsCount={28} size="sm" />
                    </div>
                    <CardTitle>پنت‌هاوس ۷۰۰ متری فرشته</CardTitle>
                    <CardDescription>طراحی نئوکلاسیک با استخر شیشه‌ای در بام</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-44 w-full rounded-xl bg-gradient-to-tr from-primary-900 to-primary-700 flex items-center justify-center text-accent-300">
                      <Building2 className="w-12 h-12 opacity-80" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>متراژ: {toPersianDigits(700)} م²</span>
                      <span>تعداد خواب: {toPersianDigits(5)} مستر</span>
                      <span>طبقه: {toPersianDigits(22)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <PriceText amount={210000000000} size="md" readableUnit />
                    <Button size="sm" variant="primary">
                      {UI_STRINGS.actions.viewDetails}
                    </Button>
                  </CardFooter>
                </Card>

                <Card hoverEffect>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="success">{UI_STRINGS.badges.verified}</Badge>
                      <Rating value={5.0} reviewsCount={14} size="sm" />
                    </div>
                    <CardTitle>ویلای مدرن لواسانات</CardTitle>
                    <CardDescription>محوطه‌سازی هلندی با دید دریاچه و هوای پاک</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-44 w-full rounded-xl bg-gradient-to-tr from-primary-800 to-primary-600 flex items-center justify-center text-accent-300">
                      <Building2 className="w-12 h-12 opacity-80" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>زمین: {toPersianDigits(1200)} م²</span>
                      <span>بنا: {toPersianDigits(850)} م²</span>
                      <span>سند: تک‌برگ</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <PriceText amount={165000000000} size="md" readableUnit />
                    <Button size="sm" variant="primary">
                      {UI_STRINGS.actions.viewDetails}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>اسکلت لودینگ (Skeleton)</CardTitle>
                    <CardDescription>حالت پیش‌نمایش بارگذاری محتوا</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-44 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-9 w-20" />
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* 6. MODALS, SHEETS & TABS */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۶. دیالوگ، کشوی فیلتر (Sheet) و زبانه‌ها (Tabs)</h3>
                <p className="text-sm text-muted-foreground">طراحی ریسپانسیو برای فیلتر موبایل و تعاملات پیشرفته</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-soft space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="primary">
                        <Phone className="w-4 h-4 ms-2" />
                        تست دیالوگ درخواست هماهنگی بازدید
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>هماهنگی بازدید حضوری ملک</DialogTitle>
                        <DialogDescription>
                          مشاوران ارشد آرتام ظرف ۳۰ دقیقه جهت هماهنگی ساعت بازدید با شما تماس خواهند گرفت.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <Input placeholder="نام و نام خانوادگی" />
                        <Input placeholder="شماره تماس همراه" />
                        <Textarea placeholder="زمان ترجیحی برای بازدید (صبح یا بعدازظهر)..." />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="primary"
                          onClick={() => toast.success('درخواست بازدید با موفقیت ثبت شد.')}
                        >
                          تأیید و ارسال درخواست
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Sheet Drawer (Mobile Filter) */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="accent">
                        <SlidersHorizontal className="w-4 h-4 ms-2" />
                        تست کشوی فیلترها (Sheet Drawer)
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="start">
                      <SheetHeader>
                        <SheetTitle>فیلترهای اختصاصی ملک</SheetTitle>
                        <SheetDescription>
                          بر اساس محله، محدوده قیمت و امکانات خاص جستجو کنید.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-6 py-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold">منطقه</label>
                          <Input placeholder="مثلاً نیاوران، الهیه، کامرانیه" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold">بازه قیمت</label>
                          <Slider defaultValue={[20, 90]} max={150} min={10} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold">امکانات ویژه</label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox id="f1" defaultChecked />
                              <label htmlFor="f1" className="text-xs">استخر و سونا</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="f2" defaultChecked />
                              <label htmlFor="f2" className="text-xs">پنت‌هاوس و روف‌گاردن</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="f3" />
                              <label htmlFor="f3" className="text-xs">سند بدون ریشه</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <SheetFooter>
                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => toast.info('فیلترها اعمال شدند')}
                        >
                          اعمال فیلترها
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  {/* Toast triggers */}
                  <Button
                    variant="outline"
                    onClick={() => toast.success('لینک ملک با موفقیت کپی شد')}
                  >
                    <Share2 className="w-4 h-4 ms-2 text-emerald-600" />
                    تست پیام موفقیت (Toast)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error('خطا در برقراری ارتباط با سرور')}
                  >
                    <AlertCircle className="w-4 h-4 ms-2 text-rose-600" />
                    تست پیام خطا (Toast)
                  </Button>
                </div>

                {/* Tabs */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold text-muted-foreground mb-3">زبانه‌ها (Tabs)</h4>
                  <Tabs defaultValue="buy">
                    <TabsList>
                      <TabsTrigger value="buy">{UI_STRINGS.transactionTypes.buy}</TabsTrigger>
                      <TabsTrigger value="rent">{UI_STRINGS.transactionTypes.rent}</TabsTrigger>
                      <TabsTrigger value="presale">{UI_STRINGS.transactionTypes.presale}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="p-4 rounded-xl bg-neutral-background border border-border">
                      <p className="text-sm text-foreground">
                        خرید قطعی و نقل و انتقال اسناد رسمی پنت‌هاوس‌ها و ویلاهای اصیل در مناطق یک و دو تهران.
                      </p>
                    </TabsContent>
                    <TabsContent value="rent" className="p-4 rounded-xl bg-neutral-background border border-border">
                      <p className="text-sm text-foreground">
                        رهن کامل و اجاره واحدهای مبله لوکس برای دیپلمات‌ها، مدیران ارشد و سفارتخانه‌ها.
                      </p>
                    </TabsContent>
                    <TabsContent value="presale" className="p-4 rounded-xl bg-neutral-background border border-border">
                      <p className="text-sm text-foreground">
                        سرمایه‌گذاری در پیش‌فروش شاهکارهای معماری سازندگان بنام پایتخت با تضمین سود و زمان‌بندی دقیق تحویل.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </section>

            {/* 7. ACCORDION & HELPER COMPONENTS */}
            <section className="space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-xl font-bold text-primary-900">۷. آکاردئون و کامپوننت‌های کمکی (IconBox & Rating)</h3>
                <p className="text-sm text-muted-foreground">المان‌های تزئینی و بصری اختصاصی هویت بصری آرتام</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Accordion */}
                <div className="bg-white rounded-2xl p-6 border border-border shadow-soft">
                  <h4 className="text-sm font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent" />
                    پرسش‌های متداول (Accordion RTL)
                  </h4>
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>فرایند احراز اصالت اسناد چگونه انجام می‌شود؟</AccordionTrigger>
                      <AccordionContent>
                        تمام فایل‌های معرفی‌شده در آرتام پیش از عرضه عمومی، توسط دپارتمان حقوقی بررسی شده و اصالت سند تک‌برگ و عدم ریشه‌های اوقافی یا بنیادی تضمین می‌گردد.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>آیا امکان بازدید مجازی و ویدئویی برای مشتریان خارج از کشور فراهم است؟</AccordionTrigger>
                      <AccordionContent>
                        بله، برای تمامی پنت‌هاوس‌ها و ویلاهای انحصاری تور سه‌بعدی و فیلم‌برداری باکیفیت 4K همراه با توضیحات مهندس پروژه آماده شده است.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>شرایط پرداخت در معاملات تهاتر چگونه است؟</AccordionTrigger>
                      <AccordionContent>
                        امکان تهاتر بخشی از ثمن معامله با املاک ارزنده یا خودروهای وارداتی طبق کارشناسی رسمی دادگستری امکان‌پذیر است.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Helper Components Showcase */}
                <div className="bg-white rounded-2xl p-6 border border-border shadow-soft space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-primary-900 mb-3">باکس‌های آیکون لوکس (IconBox)</h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <IconBox icon={<Building2 />} variant="primary" size="lg" />
                      <IconBox icon={<Sparkles />} variant="accent" size="lg" />
                      <IconBox icon={<MapPin />} variant="softPrimary" size="lg" />
                      <IconBox icon={<Phone />} variant="softAccent" size="lg" />
                      <IconBox icon={<CheckCircle2 />} variant="outline" size="lg" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-primary-900 mb-3">نمایشگر قیمت فارسی (PriceText)</h4>
                    <div className="space-y-3">
                      <PriceText amount={34000000000} size="xl" readableUnit prefix="قیمت پایه:" />
                      <div>
                        <PriceText amount={850000000} size="lg" prefix="ودیعه:" />
                      </div>
                      <div>
                        <PriceText amount={45000000} size="md" prefix="اجاره بها:" suffix="ماهانه" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-primary-900 mb-2">امتیاز و ستاره طلایی (Rating)</h4>
                    <div className="flex flex-col gap-2">
                      <Rating value={4.8} reviewsCount={42} size="lg" />
                      <Rating value={5.0} reviewsCount={12} size="md" />
                      <Rating value={3.5} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
