import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const visitFormSchema = z.object({
  name: z.string().min(3, 'لطفاً نام و نام خانوادگی خود را کامل وارد نمایید (حداقل ۳ حرف)'),
  phone: z
    .string()
    .min(10, 'شماره تماس باید حداقل ۱۰ رقم باشد')
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره همراه معتبر وارد فرمایید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
  date: z.string().min(3, 'لطفاً روز یا ساعت ترجیحی برای بازدید را مشخص فرمایید'),
  message: z.string().optional(),
});

type VisitFormData = z.infer<typeof visitFormSchema>;

export interface PropertyScheduleVisitFormProps {
  propertyTitle: string;
  onSuccess?: () => void;
}

export function PropertyScheduleVisitForm({
  propertyTitle,
  onSuccess,
}: PropertyScheduleVisitFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormData>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      message: '',
    },
  });

  const onSubmit = async (data: VisitFormData) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 650));
    toast.success('درخواست هماهنگی بازدید با موفقیت ثبت شد. مشاور ارشد ظرف ۳۰ دقیقه با شما تماس خواهد گرفت.');
    setIsSubmitted(true);
    reset();
    onSuccess?.();
  };

  if (isSubmitted) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-emerald-900">درخواست شما با موفقیت ثبت گردید</h4>
        <p className="text-xs text-emerald-800 leading-relaxed">
          کارشناس مسئول فایل جهت هماهنگی نهایی ساعت بازدید اختصاصی با شما تماس خواهد گرفت.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          className="mt-2 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100"
        >
          ثبت درخواست دیگر
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 text-start">
      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-primary-900 flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-accent-700" />
          نام و نام خانوادگی *
        </label>
        <Input
          placeholder="مثال: دکتر آریا کیان"
          {...register('name')}
          className={errors.name ? 'border-rose-400 focus:ring-rose-200' : ''}
        />
        {errors.name && (
          <p className="text-[11px] text-rose-600 font-medium">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-primary-900 flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 text-accent-700" />
          شماره همراه *
        </label>
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

      {/* Preferred Date/Time */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-primary-900 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-accent-700" />
          روز و ساعت ترجیحی بازدید *
        </label>
        <Input
          placeholder="مثلاً: پنج‌شنبه بعدازظهر، ساعت ۱۶ تا ۱۹"
          {...register('date')}
          className={errors.date ? 'border-rose-400 focus:ring-rose-200' : ''}
        />
        {errors.date && (
          <p className="text-[11px] text-rose-600 font-medium">{errors.date.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-primary-900 flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5 text-accent-700" />
          توضیحات تکمیلی (اختیاری)
        </label>
        <Textarea
          placeholder="آیا تمایل به بررسی شرایط تهاتر دارید یا نکته خاصی مدنظر است؟"
          rows={2}
          {...register('message')}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full shadow-soft font-bold text-xs sm:text-sm mt-2"
        disabled={isSubmitting}
      >
        <Send className="w-3.5 h-3.5 ms-2 text-accent" />
        {isSubmitting ? 'در حال ارسال درخواست...' : 'تأیید و ارسال درخواست بازدید'}
      </Button>

      <p className="text-[10px] text-muted-foreground text-center pt-1 leading-normal">
        اطلاعات شما نزد کارگزاری آرتام کاملاً محرمانه خواهد ماند.
      </p>
    </form>
  );
}
