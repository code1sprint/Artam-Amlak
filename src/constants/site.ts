import { withBase } from '@/lib/base';
import { ROUTES } from './routes';

export const SITE_CONFIG = {
  brand: {
    name: 'املاک لوکس آرتام',
    enName: 'ARTAM LUXURY REAL ESTATE',
    tagline: 'تجربه اصالت و شکوه در برترین املاک شمیرانات',
    description:
      'کارگزاری تخصصی و انحصاری خرید، فروش و رهن پنت‌هاوس‌ها، ویلاهای مدرن و برج‌باغ‌های شاخص شمال تهران، با بیش از یک دهه همراهی مطمئن سرمایه‌گذاران و مالکان خاص.',
    logoMark: withBase('/brand/artam-logo-mark.png'),
    logoFull: withBase('/brand/artam-logo-full.png'),
  },
  contacts: {
    phone: '۰۲۱-۲۲۰۰۳۳۴۴',
    phoneRaw: '02122003344',
    mobile: '۰۹۱۲۱۱۱۰۰۲۲',
    mobileRaw: '09121110022',
    whatsapp: '989121110022',
    whatsappUrl: 'https://wa.me/989121110022',
    email: 'info@artam-estate.ir',
    city: 'تهران',
    district: 'منطقه ۱، شمیرانات',
    address: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۱۱۰، برج آرتام، طبقه هشتم',
    workingHours: 'شنبه تا پنج‌شنبه: ۹:۰۰ الی ۲۱:۰۰ | جمعه: ۱۰:۰۰ الی ۱۶:۰۰',
  },
  socials: [
    {
      id: 'instagram',
      title: 'اینستاگرام',
      url: 'https://instagram.com/artam.luxury.realestate',
      handle: '@artam.luxury',
    },
    {
      id: 'telegram',
      title: 'تلگرام',
      url: 'https://t.me/artam_estate',
      handle: '@artam_estate',
    },
    {
      id: 'whatsapp',
      title: 'واتساپ',
      url: 'https://wa.me/989121110022',
      handle: 'ارتباط مستقیم واتساپ',
    },
  ],
  menu: [
    { label: 'خانه', path: ROUTES.HOME },
    { label: 'فایل‌های ملکی', path: ROUTES.PROPERTIES },
    { label: 'مشاوران', path: ROUTES.AGENTS },
    { label: 'وبلاگ', path: ROUTES.BLOG },
    { label: 'درباره ما', path: ROUTES.ABOUT },
    { label: 'تماس با ما', path: ROUTES.CONTACT },
  ],
  propertyCategories: [
    { label: 'پنت‌هاوس‌های مجلل', query: 'penthouse', path: `${ROUTES.PROPERTIES}?type=penthouse` },
    { label: 'ویلای اختصاصی و مدرن', query: 'villa', path: `${ROUTES.PROPERTIES}?type=villa` },
    { label: 'برج‌باغ‌های مسکونی', query: 'tower', path: `${ROUTES.PROPERTIES}?type=tower` },
    { label: 'آپارتمان‌های لوکس شمیرانات', query: 'luxuryApartment', path: `${ROUTES.PROPERTIES}?type=luxuryApartment` },
    { label: 'موقعیت‌های اداری و تجاری', query: 'commercial', path: `${ROUTES.PROPERTIES}?type=commercial` },
  ],
  quickLinks: [
    { label: 'صفحه اصلی', path: ROUTES.HOME },
    { label: 'همه املاک و مستغلات', path: ROUTES.PROPERTIES },
    { label: 'مشاوران ارشد', path: ROUTES.AGENTS },
    { label: 'ثبت رایگان ملک', path: ROUTES.SUBMIT_PROPERTY },
    { label: 'علاقه‌مندی‌ها', path: ROUTES.FAVORITES },
    { label: 'پرسش‌های متداول', path: ROUTES.FAQ },
    { label: 'حریم خصوصی', path: ROUTES.PRIVACY },
    { label: 'شرایط استفاده', path: ROUTES.TERMS },
    { label: 'سیستم طراحی (دیزاین سیستم)', path: ROUTES.DESIGN_SYSTEM },
  ],
  licenseInfo: 'دارای پروانه تخصصی درجه یک کارگزاری املاک از اتحادیه صنف املاک تهران',
  copyright: 'تمامی حقوق مادی و معنوی برای کارگزاری املاک لوکس آرتام محفوظ است.',
} as const;
