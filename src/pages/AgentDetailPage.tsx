import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  MessageCircle,
  Star,
  Award,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { PropertyScheduleVisitForm } from '@/features/properties/components/PropertyScheduleVisitForm';
import { useAgent } from '@/features/agents/hooks';
import { useProperties } from '@/features/properties/hooks';
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';

export default function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: agent, isLoading: isAgentLoading } = useAgent(id);
  const { data: propertiesData, isLoading: isPropertiesLoading } = useProperties({
    pageSize: 50,
  });

  // Filter properties managed by this specific agent
  const agentProperties = propertiesData?.data?.filter((p) => p.agentId === id) || [];

  // Loading state
  if (isAgentLoading) {
    return (
      <div className="py-12 bg-neutral-background min-h-screen">
        <Container>
          <div className="space-y-6">
            <div className="h-6 w-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-64 w-full bg-muted animate-pulse rounded-3xl" />
            <div className="h-96 w-full bg-muted animate-pulse rounded-3xl" />
          </div>
        </Container>
      </div>
    );
  }

  // 404 Not Found State
  if (!agent) {
    return (
      <div className="py-24 text-center bg-neutral-background min-h-screen flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-border shadow-card text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 text-accent flex items-center justify-center mx-auto shadow-xs">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-primary-900">
              مشاور مورد نظر یافت نشد
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ممکن است کد شناسه مشاور اشتباه وارد شده باشد یا همکاری ایشان پایان یافته باشد.
            </p>
            <Button asChild variant="primary" className="w-full">
              <Link to={ROUTES.AGENTS}>
                <Building2 className="w-4 h-4 ms-2" />
                مشاهده لیست سایر مشاوران آرتام
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${agent.name} - ${agent.title} | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="description" content={agent.bio.slice(0, 160)} />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container>
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.AGENTS}>مشاوران ارشد</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{agent.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Agent Header Profile Card */}
          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-border shadow-soft mb-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-elevated shrink-0 bg-muted mx-auto lg:mx-0">
                <PersonAvatar
                  name={agent.name}
                  src={agent.avatar}
                  className="w-full h-full text-4xl"
                  loading="eager"
                />
                <div className="absolute bottom-2 end-2 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="در دسترس برای مشاوره" />
              </div>

              {/* Information */}
              <div className="flex-1 space-y-4 text-center lg:text-start">
                <div>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-900">
                      {agent.name}
                    </h1>
                    <span title="کارشناس تایید شده رسمی" className="inline-flex items-center">
                      <ShieldCheck className="w-5 h-5 text-accent-600" />
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-accent-700">{agent.title}</p>
                </div>

                {/* Rating & Sales count */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-sans">
                  <div className="flex items-center gap-1.5 text-accent-800 font-bold bg-accent-50 px-3 py-1 rounded-full border border-accent-200">
                    <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
                    <span>امتیاز: {toPersianDigits(agent.rating?.toFixed(1) || '۵٫۰')}</span>
                    <span className="text-muted-foreground font-normal">({toPersianDigits(agent.reviewCount || 0)} نظر)</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-primary-900 font-bold bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                    <Award className="w-4 h-4 text-primary-700" />
                    <span>{toPersianDigits(agent.salesCount)} معامله موفق ثبت‌شده</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-foreground/80 leading-[1.9] max-w-2xl text-justify">
                  {agent.bio}
                </p>

                {/* Specialties */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-primary-900 block mb-2">
                    تخصص‌های منطقه‌ای و کاربری:
                  </span>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {agent.specialties.map((spec, idx) => (
                      <Badge key={idx} variant="primary" size="sm" className="font-semibold text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="w-full lg:w-72 rounded-2xl bg-neutral-background p-5 border border-border space-y-3 shrink-0">
                <span className="text-xs font-bold text-primary-900 block text-center">
                  ارتباط مستقیم با کارشناس
                </span>

                <Button asChild variant="primary" className="w-full h-11 justify-center shadow-soft text-xs font-bold">
                  <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}>
                    <Phone className="w-4 h-4 ms-2 text-accent" />
                    تماس: {agent.phone}
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full h-11 justify-center border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-xs font-bold">
                  <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4 ms-2 text-emerald-600" />
                    ارسال پیام در واتساپ
                  </a>
                </Button>

                <div className="text-[11px] text-muted-foreground text-center pt-1 font-sans">
                  ایمیل: {agent.email}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Properties managed by this Agent */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                  فایل‌های فعال تحت مدیریت {agent.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  پنت‌هاوس‌ها، ویلاها و مستغلات انحصاری ثبت‌شده توسط این مشاور
                </p>
              </div>

              <span className="text-xs font-bold text-accent-700 font-sans">
                {toPersianDigits(agentProperties.length)} ملک فعال
              </span>
            </div>

            <PropertyGrid
              properties={agentProperties}
              isLoading={isPropertiesLoading}
              emptyTitle="در حال حاضر فایل فعالی ثبت نشده است"
              emptyDescription="فایل‌های قبلی این مشاور واگذار شده‌اند. جهت سپردن ملک یا اطلاع از فایل‌های خصوصی (Off-Market) با ایشان تماس حاصل فرمایید."
            />
          </div>

          {/* Section: Direct Contact / Appointment Form with this Agent */}
          <div className="max-w-2xl mx-auto rounded-3xl bg-white p-6 sm:p-10 border border-border shadow-soft space-y-5 mb-16">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary-900">
                درخواست جلسه مشاوره اختصاصی با {agent.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                زمان و موضوع جلسه خود را ثبت فرمایید تا هماهنگی‌های لازم به سرعت انجام پذیرد.
              </p>
            </div>

            <PropertyScheduleVisitForm propertyTitle={`مشاوره با ${agent.name}`} />
          </div>
        </Container>
      </div>
    </>
  );
}
