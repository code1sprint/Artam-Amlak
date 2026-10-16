import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/Container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';

const SECTIONS = [
  {
    title: '۱. مقدمه',
    body: `کارگزاری املاک لوکس آرتام («آرتام»، «ما») به حفظ حریم خصوصی بازدیدکنندگان و کاربران وب‌سایت و خدمات خود متعهد است. این سیاست توضیح می‌دهد چه اطلاعاتی جمع‌آوری می‌شود، چگونه استفاده می‌گردد و چه حقوقی دارید.`,
  },
  {
    title: '۲. اطلاعاتی که جمع‌آوری می‌کنیم',
    body: `اطلاعاتی که خودتان ارائه می‌دهید — از جمله نام، شماره تماس، ایمیل، مشخصات ملک و محتوای پیام‌های فرم تماس یا ثبت ملک — و داده‌های فنی حداقلی مانند نوع مرورگر، آدرس IP تقریبی و صفحات بازدیدشده برای بهبود عملکرد سایت و امنیت.`,
  },
  {
    title: '۳. نحوه استفاده از اطلاعات',
    body: `از اطلاعات برای پاسخ به درخواست‌ها، هماهنگی بازدید، کارشناسی و بازاریابی ملک، بهبود تجربه کاربری، جلوگیری از سوءاستفاده و ارسال اطلاع‌رسانی‌های مرتبط با خدمات (در صورت رضایت شما) استفاده می‌شود. اطلاعات شخصی بدون مبنای قانونی یا رضایت، به اشخاص ثالث فروخته نمی‌شود.`,
  },
  {
    title: '۴. اشتراک‌گذاری با اشخاص ثالث',
    body: `در موارد لازم، اطلاعات ممکن است با مشاوران داخلی، وکلای همکار، دفاتر اسناد رسمی یا ارائه‌دهندگان خدمات فنی (میزبانی، ایمیل تراکنشی) صرفاً به میزان مورد نیاز برای انجام معامله یا ارائه خدمت به اشتراک گذاشته شود. این اشخاص موظف به رعایت محرمانگی هستند.`,
  },
  {
    title: '۵. نگهداری و امنیت',
    body: `اطلاعات به مدت لازم برای تحقق اهداف فوق یا الزامات قانونی نگهداری می‌شود. تدابیر فنی و سازمانی متعارف برای محافظت در برابر دسترسی غیرمجاز، افشا یا از بین رفتن داده اعمال می‌گردد؛ با این حال هیچ سامانه الکترونیکی مطلقاً امن نیست.`,
  },
  {
    title: '۶. کوکی‌ها و ذخیره‌سازی محلی',
    body: `سایت ممکن است از کوکی‌ها یا حافظه محلی مرورگر (مانند فهرست علاقه‌مندی‌ها) برای بهبود تجربه استفاده کند. می‌توانید از طریق تنظیمات مرورگر کوکی‌ها را محدود کنید؛ بخشی از قابلیت‌ها ممکن است تحت تأثیر قرار گیرد.`,
  },
  {
    title: '۷. حقوق شما',
    body: `شما می‌توانید درخواست دسترسی، اصلاح یا حذف اطلاعات شخصی خود را از طریق صفحه تماس با ما مطرح کنید. در صورت وجود الزام قانونی برای نگهداری داده، امکان حذف کامل ممکن است محدود شود.`,
  },
  {
    title: '۸. تغییرات این سیاست',
    body: `ممکن است این صفحه به‌روزرسانی شود. تاریخ آخرین بازنگری در پایین صفحه درج می‌شود. ادامه استفاده از سایت پس از انتشار تغییرات به معنای آگاهی از نسخه جدید است.`,
  },
  {
    title: '۹. تماس',
    body: `برای پرسش درباره حریم خصوصی با دفتر مرکزی آرتام تماس بگیرید: ${SITE_CONFIG.contacts.email} یا ${SITE_CONFIG.contacts.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>{`حریم خصوصی | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content="سیاست حفظ حریم خصوصی کاربران وب‌سایت و خدمات کارگزاری املاک لوکس آرتام."
        />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container size="sm">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>حریم خصوصی</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="pb-8 border-b border-border mb-10">
            <p className="text-xs font-bold text-accent-700 mb-2">حقوقی و شفافیت</p>
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight">
              سیاست حفظ حریم خصوصی
            </h1>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              نحوه جمع‌آوری، استفاده و محافظت از اطلاعات کاربران در {SITE_CONFIG.brand.name}.
            </p>
          </header>

          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-lg font-bold text-primary-900">{section.title}</h2>
                <p className="text-[15px] leading-[1.95] text-foreground/85">{section.body}</p>
              </section>
            ))}
          </div>

          <footer className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>آخرین بازنگری: مهر ۱۴۰۴</span>
            <Link to={ROUTES.TERMS} className="font-bold text-accent-700 hover:text-accent-800">
              شرایط استفاده از خدمات ←
            </Link>
          </footer>
        </Container>
      </div>
    </>
  );
}
