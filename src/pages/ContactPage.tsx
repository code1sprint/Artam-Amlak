import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import L from 'leaflet';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { contactFormSchema, ContactFormData, submitContactForm } from '@/features/contact/api';
import { SITE_CONFIG } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [selectedSubject, setSelectedSubject] = useState('خرید و سرمایه‌گذاری ملک');
  const [isSuccess, setIsSuccess] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Office Headquarters Coordinates: Zafaraniyeh, Tehran
  const officeCoords: [number, number] = [35.8115, 51.4184];

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      subject: 'خرید و سرمایه‌گذاری ملک',
      message: '',
      website_trap: '',
    },
  });

  const handleSubjectChange = (val: string) => {
    setSelectedSubject(val);
    setValue('subject', val, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        toast.success(response.message);
        setIsSuccess(true);
        reset();
      }
    } catch {
      toast.error('خطا در برقراری ارتباط، لطفاً مجدداً تلاش فرمایید.');
    }
  };

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: officeCoords,
      zoom: 15,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Luxury Custom Marker with brand mark
    const officeMarkerIcon = L.divIcon({
      className: 'custom-office-pin',
      html: `
        <div style="
          width: 52px;
          height: 52px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #C9A24B;
          box-shadow: 0 8px 25px rgba(15, 42, 71, 0.45);
          background: #000;
        ">
          <img
            src="${SITE_CONFIG.brand.logoMark}"
            alt=""
            width="52"
            height="42"
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
        </div>
      `,
      iconSize: [52, 52],
      iconAnchor: [26, 26],
    });

    const popupHtml = `
      <div style="direction: rtl; text-align: start; font-family: 'Vazirmatn Variable', sans-serif; padding: 4px;">
        <div style="font-weight: 800; font-size: 13px; color: #0F2A47; margin-bottom: 2px;">دفتر مرکزی ${SITE_CONFIG.brand.name}</div>
        <div style="font-size: 11px; color: #64748B;">زعفرانیه، خیابان مقدس اردبیلی، برج آرتام</div>
      </div>
    `;

    L.marker(officeCoords, { icon: officeMarkerIcon }).addTo(map).bindPopup(popupHtml).openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{`تماس با ما | دفتر مرکزی ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content={`راه‌های ارتباط مستقیم با کارشناسان و مدیریت کارگزاری ${SITE_CONFIG.brand.name} در زعفرانیه شمیرانات`}
        />
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
                <BreadcrumbPage>تماس با ما</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading */}
          <div className="pb-8 border-b border-border mb-10 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black text-primary-900 tracking-tight leading-tight">
              ارتباط با دفتر مرکزی کارگزاری آرتام
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              مشاوران ارشد ما در تمامی ایام هفته آماده پاسخگویی به پرسش‌ها، هماهنگی جلسات حضوری و ارائه تحلیل‌های تخصصی بازار مسکن هستند.
            </p>
          </div>

          {/* Two-Column Section: Form on Start + Contact Info on End */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Column 1: Contact Form (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-10 border border-border shadow-soft space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-primary-900">ارسال پیام یا درخواست مشاوره</h2>
                <p className="text-xs text-muted-foreground">
                  مشخصات خود را ثبت فرمایید تا کارشناس مربوطه ظرف حداکثر ۱ ساعت کاری با شما تماس بگیرد.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-soft">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">پیام شما با موفقیت دریافت گردید</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    از پیام ارزشمند شما سپاسگزاریم. کارشناسان ما پس از بررسی اولیه، از طریق شماره تماس ارائه‌شده با شما ارتباط برقرار خواهند نمود.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                    className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                  >
                    ارسال پیام جدید
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot Anti-Spam Hidden Field */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden opacity-0 absolute -z-10 pointer-events-none"
                    {...register('website_trap')}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">نام و نام خانوادگی *</label>
                      <Input
                        placeholder="مثال: مهندس رادان علوی"
                        {...register('fullName')}
                        className={errors.fullName ? 'border-rose-400 focus:ring-rose-200' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">شماره تلفن همراه *</label>
                      <Input
                        type="tel"
                        dir="ltr"
                        placeholder="۰۹۱۲..."
                        {...register('phone')}
                        className={errors.phone ? 'border-rose-400 focus:ring-rose-200' : ''}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-900">موضوع درخواست *</label>
                    <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                      <SelectTrigger className="h-11 rounded-xl bg-white border-border text-xs font-semibold">
                        <SelectValue placeholder="یک موضوع انتخاب فرمایید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="خرید و سرمایه‌گذاری ملک">خرید پنت‌هاوس یا ویلا</SelectItem>
                        <SelectItem value="فروش و سپردن ملک">فروش و واگذاری ملک انحصاری</SelectItem>
                        <SelectItem value="رهن و اجاره دیپلماتیک">رهن و اجاره لوکس و دیپلماتیک</SelectItem>
                        <SelectItem value="تهاتر املاک فاخر">مذاکرات و کارشناسی تهاتر</SelectItem>
                        <SelectItem value="استعلام و مشاوره حقوقی">مشاوره حقوقی اسناد و قراردادها</SelectItem>
                        <SelectItem value="سایر موارد">پیشنهادات و سایر موارد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-900">متن پیام یا توضیحات ملک مدنظر *</label>
                    <Textarea
                      placeholder="متراژ، محله‌های مورد نظر، بودجه تقریبی یا هر نکته مدنظر خود را بنویسید..."
                      rows={4}
                      {...register('message')}
                      className={errors.message ? 'border-rose-400 focus:ring-rose-200' : ''}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-600 font-medium">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-soft font-bold text-sm h-12"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 ms-2 text-accent" />
                    {isSubmitting ? 'در حال ارسال پیام...' : 'ارسال نهایی پیام'}
                  </Button>
                </form>
              )}
            </div>

            {/* Column 2: Contact Information Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0B2139] text-white p-6 sm:p-10 shadow-elevated space-y-6">
              <div>
                <span className="text-xs text-accent-300 font-bold uppercase tracking-wider block mb-1">
                  دفتر شمیرانات
                </span>
                <h3 className="text-xl font-bold text-white">مشخصات و راه‌های ارتباطی</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed divide-y divide-white/10">
                {/* Address */}
                <div className="pt-2 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-accent-300 font-bold block mb-0.5">آدرس دفتر مرکزی:</span>
                    <span>{SITE_CONFIG.contacts.address}</span>
                  </div>
                </div>

                {/* Telephone Fixed & Direct */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-accent flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-accent-300 font-bold block">شماره‌های تماس مستقیم:</span>
                    <div className="font-sans font-bold">
                      <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`} className="hover:text-accent transition-colors block">
                        تلفن ثابت: {SITE_CONFIG.contacts.phone}
                      </a>
                      <a href={`tel:${SITE_CONFIG.contacts.mobileRaw}`} className="hover:text-accent transition-colors block text-accent-300">
                        همراه کارشناس ارشد: {SITE_CONFIG.contacts.mobile}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-accent flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-accent-300 font-bold block mb-0.5">پست الکترونیک:</span>
                    <a href={`mailto:${SITE_CONFIG.contacts.email}`} className="font-sans hover:text-accent transition-colors">
                      {SITE_CONFIG.contacts.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-accent flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-accent-300 font-bold block mb-0.5">ساعات فعالیت دفتر:</span>
                    <span>{SITE_CONFIG.contacts.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 bg-accent hover:bg-accent-400 text-primary-950 border-transparent font-bold text-xs sm:text-sm shadow-soft"
                >
                  <a href={SITE_CONFIG.contacts.whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4 ms-2" />
                    گفتگو و ارسال فایل در واتساپ
                  </a>
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-300 text-center">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>پاسخگویی سریع در کمتر از ۱۵ دقیقه در ساعات کاری</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Location Map Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent-600" />
                <h2 className="text-xl font-bold text-primary-900">موقعیت دفتر مرکزی بر روی نقشه</h2>
              </div>
              <a
                href={`https://www.google.com/maps?q=${officeCoords[0]},${officeCoords[1]}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-accent-700 hover:text-accent-800 flex items-center gap-1"
              >
                <span>باز کردن در گوگل مپ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-border shadow-card bg-muted">
              <div ref={mapContainerRef} className="w-full h-full z-10" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
