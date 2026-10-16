import { z } from 'zod';

export const step1Schema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی حداقل ۳ حرف باشد'),
  phone: z
    .string()
    .min(10, 'شماره تماس باید حداقل ۱۰ رقم باشد')
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره همراه معتبر وارد کنید (مانند ۰۹۱۲۳۴۵۶۷۸۹)'),
  email: z.union([
    z.literal(''),
    z.string().email('ایمیل معتبر وارد کنید'),
  ]),
});

export const step2Schema = z.object({
  propertyType: z.enum(['apartment', 'villa', 'land', 'commercial'], {
    error: 'نوع ملک را انتخاب کنید',
  }),
  dealType: z.enum(['sale', 'rent', 'mortgage'], {
    error: 'نوع معامله را انتخاب کنید',
  }),
  city: z.string().min(2, 'شهر را وارد کنید'),
  district: z.string().min(2, 'محله یا منطقه را وارد کنید'),
  address: z.string().min(8, 'آدرس دقیق‌تر وارد کنید'),
  area: z.coerce.number().positive('متراژ باید بیشتر از صفر باشد'),
  bedrooms: z.coerce.number().int().nonnegative('تعداد خواب معتبر نیست'),
  bathrooms: z.coerce.number().int().nonnegative('تعداد سرویس معتبر نیست'),
  parking: z.coerce.number().int().nonnegative('تعداد پارکینگ معتبر نیست'),
});

export const step3Schema = z.object({
  price: z.coerce.number().positive('قیمت یا ودیعه را وارد کنید'),
  description: z.string().min(30, 'توضیحات حداقل ۳۰ حرف باشد'),
});

export const step4Schema = z.object({
  photos: z
    .array(z.instanceof(File))
    .min(1, 'حداقل یک عکس آپلود کنید')
    .max(12, 'حداکثر ۱۲ عکس مجاز است'),
});

export const submitPropertySchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type SubmitPropertyFormData = z.infer<typeof submitPropertySchema>;

export const STEP_SCHEMAS = [step1Schema, step2Schema, step3Schema, step4Schema] as const;

export const STEP_FIELDS: (keyof SubmitPropertyFormData)[][] = [
  ['fullName', 'phone', 'email'],
  [
    'propertyType',
    'dealType',
    'city',
    'district',
    'address',
    'area',
    'bedrooms',
    'bathrooms',
    'parking',
  ],
  ['price', 'description'],
  ['photos'],
];

export async function submitPropertyListing(
  data: SubmitPropertyFormData
): Promise<{ success: boolean; message: string; referenceCode: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const referenceCode = `ART-${Date.now().toString().slice(-6)}`;

  // Photos are not uploaded in mock mode; only metadata is acknowledged
  void data.photos.length;

  return {
    success: true,
    message: 'درخواست ثبت ملک با موفقیت دریافت شد. کارشناسان آرتام به‌زودی با شما تماس می‌گیرند.',
    referenceCode,
  };
}
