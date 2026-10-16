import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(3, 'لطفاً نام و نام خانوادگی خود را کامل وارد فرمایید (حداقل ۳ حرف)'),
  phone: z
    .string()
    .min(10, 'شماره تماس باید حداقل ۱۰ رقم باشد')
    .regex(/^(\+98|0)?9\d{9}$/, 'لطفاً شماره همراه معتبر وارد فرمایید (مانند ۰۹۱۲۳۴۵۶۷۸۹)'),
  subject: z.string().min(2, 'لطفاً موضوع پیام را مشخص فرمایید'),
  message: z.string().min(10, 'متن پیام باید حداقل شامل ۱۰ حرف باشد'),
  // Honeypot field for anti-spam bots
  website_trap: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Anti-spam honeypot verification
  if (data.website_trap && data.website_trap.trim() !== '') {
    // Silently drop spam bot submissions
    console.warn('Bot submission blocked via honeypot.');
    return { success: true, message: 'پیام شما دریافت شد.' };
  }

  // Simulated backend API latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: 'پیام شما با موفقیت دریافت شد. کارشناسان آرتام در کوتاه‌ترین زمان با شما تماس خواهند گرفت.',
  };
}
