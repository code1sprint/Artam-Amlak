import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Trash2,
  Upload,
  User,
  Home,
  Banknote,
  Camera,
} from 'lucide-react';

import { Container } from '@/components/common/Container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
import { ROUTES } from '@/constants/routes';
import { SITE_CONFIG } from '@/constants/site';
import { toPersianDigits } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import {
  STEP_FIELDS,
  STEP_SCHEMAS,
  submitPropertyListing,
  submitPropertySchema,
  type SubmitPropertyFormData,
} from '@/features/submit-property/api';

const STEPS = [
  { id: 1, title: 'اطلاعات تماس', icon: User },
  { id: 2, title: 'مشخصات ملک', icon: Home },
  { id: 3, title: 'قیمت و توضیحات', icon: Banknote },
  { id: 4, title: 'آپلود عکس', icon: Camera },
] as const;

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: 'آپارتمان / پنت‌هاوس',
  villa: 'ویلا',
  land: 'زمین',
  commercial: 'تجاری / اداری',
};

const DEAL_TYPE_LABELS: Record<string, string> = {
  sale: 'فروش',
  rent: 'رهن و اجاره',
  mortgage: 'رهن کامل',
};

type PhotoPreview = { file: File; url: string };

export default function SubmitPropertyPage() {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [previews, setPreviews] = useState<PhotoPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SubmitPropertyFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(submitPropertySchema) as any,
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      propertyType: undefined as unknown as SubmitPropertyFormData['propertyType'],
      dealType: undefined as unknown as SubmitPropertyFormData['dealType'],
      city: 'تهران',
      district: '',
      address: '',
      area: undefined as unknown as number,
      bedrooms: 0,
      bathrooms: 1,
      parking: 1,
      price: undefined as unknown as number,
      description: '',
      photos: [],
    },
    mode: 'onTouched',
  });

  const photos = watch('photos');

  useEffect(() => {
    setValue('photos', previews.map((p) => p.file), { shouldValidate: step === 3 });
  }, [previews, setValue, step]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup only on unmount
  }, []);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (!list.length) {
        toast.error('فقط فایل تصویری مجاز است');
        return;
      }
      setPreviews((prev) => {
        const remaining = 12 - prev.length;
        if (remaining <= 0) {
          toast.error('حداکثر ۱۲ عکس مجاز است');
          return prev;
        }
        const next = list.slice(0, remaining).map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));
        return [...prev, ...next];
      });
    },
    []
  );

  const removePhoto = (index: number) => {
    setPreviews((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    if (step === 3 && previews.length === 0) {
      toast.error('حداقل یک عکس آپلود کنید');
      return;
    }
    const valid = await trigger(fields);
    if (!valid) return;

    // Extra validate current step schema for coerce edge cases
    const values = getValues();
    const parsed = STEP_SCHEMAS[step].safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'لطفاً فیلدها را تکمیل کنید');
      return;
    }

    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit = async (data: SubmitPropertyFormData) => {
    try {
      const response = await submitPropertyListing({ ...data, photos: previews.map((p) => p.file) });
      if (response.success) {
        setReferenceCode(response.referenceCode);
        setIsSuccess(true);
        toast.success(response.message);
      }
    } catch {
      toast.error('خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.');
    }
  };

  const resetForm = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    reset();
    setStep(0);
    setIsSuccess(false);
    setReferenceCode('');
  };

  return (
    <>
      <Helmet>
        <title>{`ثبت رایگان ملک | ${SITE_CONFIG.brand.name}`}</title>
        <meta
          name="description"
          content="ملک لوکس خود را برای فروش یا اجاره به کارشناسان آرتام بسپارید. فرم چندمرحله‌ای ثبت ملک با آپلود عکس."
        />
      </Helmet>

      <div className="py-8 bg-neutral-background min-h-screen">
        <Container size="md">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.HOME}>صفحه اصلی</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>ثبت رایگان ملک</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="pb-8 border-b border-border mb-8 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-black text-primary-900 tracking-tight">
              ثبت و سپردن ملک به آرتام
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              مشخصات ملک را در چهار مرحله وارد کنید تا کارشناسان ما برای کارشناسی و بازاریابی با شما تماس بگیرند.
            </p>
          </div>

          {isSuccess ? (
            <div className="rounded-3xl bg-white border border-border shadow-soft p-8 sm:p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-xl font-bold text-primary-900">درخواست شما ثبت شد</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                کارشناسان آرتام پس از بررسی اولیه، ظرف یک روز کاری با شماره تماس شما ارتباط برقرار می‌کنند.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-sm">
                <span className="text-muted-foreground">کد پیگیری:</span>
                <span className="font-bold text-primary-900 font-sans tracking-wider">
                  {toPersianDigits(referenceCode)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button variant="primary" asChild>
                  <Link to={ROUTES.HOME}>بازگشت به صفحه اصلی</Link>
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  ثبت ملک دیگر
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-border shadow-soft overflow-hidden">
              {/* Progress */}
              <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-border/70 space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    مرحله {toPersianDigits(step + 1)} از {toPersianDigits(STEPS.length)}
                  </span>
                  <span className="font-semibold text-primary-900">{STEPS[step].title}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <ol className="hidden sm:grid grid-cols-4 gap-2">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const active = i === step;
                    const done = i < step;
                    return (
                      <li
                        key={s.id}
                        className={cn(
                          'flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs transition-colors',
                          active && 'bg-accent-50 text-primary-900',
                          done && 'text-emerald-700',
                          !active && !done && 'text-muted-foreground'
                        )}
                      >
                        <span
                          className={cn(
                            'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                            active && 'bg-accent text-primary-950',
                            done && 'bg-emerald-100 text-emerald-700',
                            !active && !done && 'bg-muted'
                          )}
                        >
                          {done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                        </span>
                        <span className="font-semibold truncate">{s.title}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 space-y-5">
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">نام و نام خانوادگی *</label>
                      <Input
                        placeholder="مثال: مهندس رادان علوی"
                        {...register('fullName')}
                        className={errors.fullName ? 'border-rose-400' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">شماره همراه *</label>
                        <Input
                          type="tel"
                          dir="ltr"
                          placeholder="0912..."
                          {...register('phone')}
                          className={errors.phone ? 'border-rose-400' : ''}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">ایمیل (اختیاری)</label>
                        <Input
                          type="email"
                          dir="ltr"
                          placeholder="name@example.com"
                          {...register('email')}
                          className={errors.email ? 'border-rose-400' : ''}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">نوع ملک *</label>
                        <Controller
                          name="propertyType"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className={cn('h-11 rounded-xl', errors.propertyType && 'border-rose-400')}>
                                <SelectValue placeholder="انتخاب کنید" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.propertyType && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.propertyType.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">نوع معامله *</label>
                        <Controller
                          name="dealType"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className={cn('h-11 rounded-xl', errors.dealType && 'border-rose-400')}>
                                <SelectValue placeholder="انتخاب کنید" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(DEAL_TYPE_LABELS).map(([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.dealType && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.dealType.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">شهر *</label>
                        <Input {...register('city')} className={errors.city ? 'border-rose-400' : ''} />
                        {errors.city && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.city.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">محله / منطقه *</label>
                        <Input
                          placeholder="مثال: زعفرانیه"
                          {...register('district')}
                          className={errors.district ? 'border-rose-400' : ''}
                        />
                        {errors.district && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.district.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">آدرس *</label>
                      <Input
                        placeholder="خیابان، پلاک، واحد..."
                        {...register('address')}
                        className={errors.address ? 'border-rose-400' : ''}
                      />
                      {errors.address && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.address.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">متراژ (م²) *</label>
                        <Input type="number" dir="ltr" {...register('area')} className={errors.area ? 'border-rose-400' : ''} />
                        {errors.area && (
                          <p className="text-[11px] text-rose-600 font-medium">{errors.area.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">خواب</label>
                        <Input type="number" dir="ltr" {...register('bedrooms')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">سرویس</label>
                        <Input type="number" dir="ltr" {...register('bathrooms')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-900">پارکینگ</label>
                        <Input type="number" dir="ltr" {...register('parking')} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">قیمت پیشنهادی (تومان) *</label>
                      <Input
                        type="number"
                        dir="ltr"
                        placeholder="مثلاً 45000000000"
                        {...register('price')}
                        className={errors.price ? 'border-rose-400' : ''}
                      />
                      {errors.price && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.price.message}</p>
                      )}
                      <p className="text-[11px] text-muted-foreground">
                        برای رهن و اجاره، ودیعه یا مبلغ اجاره ماهانه را وارد کنید.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-900">توضیحات ملک *</label>
                      <Textarea
                        rows={6}
                        placeholder="ویژگی‌های برجسته، امکانات، وضعیت سند، سال ساخت و هر نکته مهمی که خریدار باید بداند..."
                        {...register('description')}
                        className={errors.description ? 'border-rose-400' : ''}
                      />
                      {errors.description && (
                        <p className="text-[11px] text-rose-600 font-medium">{errors.description.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
                      }}
                      className={cn(
                        'relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors',
                        isDragging
                          ? 'border-accent bg-accent-50/60'
                          : 'border-border bg-muted/40 hover:border-accent/50',
                        errors.photos && previews.length === 0 && 'border-rose-400'
                      )}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center shadow-soft">
                        <Upload className="w-5 h-5 text-accent-700" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-primary-900">عکس‌ها را اینجا رها کنید</p>
                        <p className="text-xs text-muted-foreground">یا از دکمه زیر انتخاب کنید · JPG, PNG · حداکثر ۱۲ فایل</p>
                      </div>
                      <label className="inline-flex">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files?.length) addFiles(e.target.files);
                            e.target.value = '';
                          }}
                        />
                        <span className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary-900 text-white text-xs font-bold cursor-pointer hover:bg-primary-800 transition-colors">
                          <ImagePlus className="w-4 h-4 text-accent" />
                          انتخاب عکس
                        </span>
                      </label>
                    </div>

                    {previews.length > 0 && (
                      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {previews.map((item, index) => (
                          <li key={item.url} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
                            <img src={item.url} alt={`پیش‌نمایش ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-2 end-2 w-8 h-8 rounded-lg bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="حذف عکس"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="absolute bottom-2 start-2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white font-sans">
                              {toPersianDigits(index + 1)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {errors.photos && previews.length === 0 && (
                      <p className="text-[11px] text-rose-600 font-medium">{errors.photos.message as string}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {toPersianDigits(previews.length)} از ۱۲ عکس انتخاب شده
                      {photos?.length ? '' : ''}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/70">
                  <Button type="button" variant="outline" onClick={goBack} disabled={step === 0 || isSubmitting}>
                    <ChevronRight className="w-4 h-4 ms-1" />
                    قبلی
                  </Button>

                  {step < STEPS.length - 1 ? (
                    <Button type="button" variant="primary" onClick={goNext}>
                      بعدی
                      <ChevronLeft className="w-4 h-4 me-1" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      {isSubmitting ? 'در حال ارسال...' : 'ارسال نهایی درخواست'}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
