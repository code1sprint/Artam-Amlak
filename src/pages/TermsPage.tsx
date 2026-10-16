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
    title: '۱. پذیرش شرایط',
    body: `با ورود به وب‌سایت یا استفاده از خدمات کارگزاری املاک لوکس آرتام، این شرایط استفاده را می‌پذیرید. اگر با مفاد موافق نیستید، لطفاً از خدمات استفاده نکنید.`,
  },
  {
    title: '۲. ماهیت خدمات',
    body: `آرتام یک کارگزاری تخصصی املاک است و محتوای وب‌سایت جنبه اطلاع‌رسانی دارد. معرفی ملک، قیمت‌ها و مشخصات تا زمان بازدید و تأیید کارشناسی نهایی، غیرقطعی تلقی می‌شوند و ممکن است به‌روزرسانی شوند.`,
  },
  {
    title: '۳. صحت اطلاعات کاربران',
    body: `کاربرانی که از طریق فرم تماس، ثبت ملک یا سایر کانال‌ها اطلاعات ارسال می‌کنند، مسئول صحت و کامل بودن داده‌های ارائه‌شده هستند. ارائه اطلاعات نادرست می‌تواند منجر به رد درخواست یا پیگیری قانونی شود.`,
  },
  {
    title: '۴. کمیسیون و هزینه‌ها',
    body: `حق‌العمل معاملات مطابق نرخ‌نامه اتحادیه صنف مشاوران املاک تهران و توافق‌نامه جداگانه با طرفین محاسبه می‌شود. جزئیات بسته‌های خدماتی در زمان عقد قرارداد کارگزاری اعلام می‌گردد.`,
  },
  {
    title: '۵. مالکیت معنوی',
    body: `تمامی متون، تصاویر، لوگو، طراحی و محتوای منتشرشده در وب‌سایت متعلق به آرتام یا دارندگان مجوز مربوطه است. تکثیر یا استفاده تجاری بدون اجازه کتبی ممنوع است.`,
  },
  {
    title: '۶. محدودیت مسئولیت',
    body: `آرتام نهایت تلاش را برای صحت اطلاعات به‌کار می‌گیرد؛ با این حال در قبال تصمیم‌های سرمایه‌گذاری صرفاً بر اساس محتوای وب‌سایت، قطعی بودن معامله بدون بررسی حقوقی، یا اختلال‌های فنی خارج از کنترل، مسئولیتی فراتر از تعهدات قانونی ندارد.`,
  },
  {
    title: '۷. لینک‌های خارجی',
    body: `سایت ممکن است به سرویس‌های ثالث (نقشه، شبکه‌های اجتماعی و مانند آن) لینک دهد. سیاست‌ها و محتوای آن سرویس‌ها خارج از کنترل آرتام است.`,
  },
  {
    title: '۸. قانون حاکم',
    body: `این شرایط تابع قوانین جمهوری اسلامی ایران است. هرگونه اختلاف ابتدا از طریق مذاکره و در صورت لزوم از طریق مراجع صالح قضایی تهران رسیدگی می‌شود.`,
  },
  {
    title: '۹. تماس',
    body: `برای سوالات مربوط به شرایط استفاده: ${SITE_CONFIG.contacts.email} | تلفن ${SITE_CONFIG.contacts.phone} | آدرس: ${SITE_CONFIG.contacts.address}`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>{`شرایط استفاده | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content="شرایط و ضوابط استفاده از وب‌سایت و خدمات کارگزاری املاک لوکس آرتام."
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
                <BreadcrumbPage>شرایط استفاده</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="pb-8 border-b border-border mb-10">
            <p className="text-xs font-bold text-accent-700 mb-2">حقوقی و شفافیت</p>
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight">
              شرایط استفاده از خدمات
            </h1>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              ضوابط بهره‌برداری از وب‌سایت و خدمات کارگزاری {SITE_CONFIG.brand.name}.
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
            <Link to={ROUTES.PRIVACY} className="font-bold text-accent-700 hover:text-accent-800">
              سیاست حریم خصوصی ←
            </Link>
          </footer>
        </Container>
      </div>
    </>
  );
}
