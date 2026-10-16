import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpLeft,
  Send,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { BrandLogo } from '@/components/common/BrandLogo';
import { SITE_CONFIG } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { toPersianDigits } from '@/lib/formatters';

export function Footer() {
  const currentPersianYear = toPersianDigits(1405);

  return (
    <footer className="border-t border-border bg-[#0B2139] text-white pt-16 pb-8 selection:bg-accent selection:text-primary-950">
      <Container>
        {/* 4 Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: About the Agency */}
          <div className="space-y-4">
            <BrandLogo variant="full" size={112} asLink className="block" />

            <p className="text-sm text-slate-300 leading-[1.85]">
              {SITE_CONFIG.brand.description}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-accent-200">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span className="leading-snug">{SITE_CONFIG.licenseInfo}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-accent-400 tracking-tight mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              لینک‌های سریع
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {SITE_CONFIG.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <ArrowUpLeft className="w-3.5 h-3.5 text-accent-400 transition-transform group-hover:-translate-x-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Categories */}
          <div>
            <h4 className="text-base font-bold text-accent-400 tracking-tight mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              دسته‌بندی ملک‌ها
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {SITE_CONFIG.propertyCategories.map((cat) => (
                <li key={cat.query}>
                  <Link
                    to={cat.path}
                    className="group flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <ArrowUpLeft className="w-3.5 h-3.5 text-accent-400 transition-transform group-hover:-translate-x-1" />
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Socials */}
          <div className="space-y-5">
            <h4 className="text-base font-bold text-accent-400 tracking-tight mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              اطلاعات تماس و دفتر
            </h4>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contacts.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>
                  دفتر مرکزی:{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}
                    className="font-bold text-white hover:text-accent font-sans transition-colors"
                  >
                    {SITE_CONFIG.contacts.phone}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contacts.email}`}
                  className="hover:text-accent font-sans transition-colors"
                >
                  {SITE_CONFIG.contacts.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contacts.workingHours}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-accent-300 block mb-2.5">
                شبکه‌های اجتماعی آرتام:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={SITE_CONFIG.socials[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent hover:text-primary-950 text-white transition-all shadow-xs"
                  aria-label="اینستاگرام"
                >
                  <span className="font-bold text-xs">IG</span>
                </a>
                <a
                  href={SITE_CONFIG.socials[1].url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent hover:text-primary-950 text-white transition-all shadow-xs"
                  aria-label="کانال تلگرام"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socials[2].url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent hover:text-primary-950 text-white transition-all shadow-xs"
                  aria-label="واتساپ پشتیبانی"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-start">
            <p className="leading-relaxed">
              {SITE_CONFIG.copyright} (سال {currentPersianYear})
            </p>
            <p className="leading-relaxed">
              طراحی و توسعه توسط{' '}
              <a
                href="https://code1sprint.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-accent transition-colors"
              >
                code1sprint
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs flex-wrap justify-center">
            <Link to={ROUTES.PRIVACY} className="hover:text-accent transition-colors">
              حریم خصوصی
            </Link>
            <span className="text-slate-600">•</span>
            <Link to={ROUTES.TERMS} className="hover:text-accent transition-colors">
              شرایط استفاده
            </Link>
            <span className="text-slate-600">•</span>
            <Link to={ROUTES.FAQ} className="hover:text-accent transition-colors">
              سوالات پرتکرار
            </Link>
            <span className="text-slate-600">•</span>
            <Link to={ROUTES.CONTACT} className="hover:text-accent transition-colors">
              ارتباط مستقیم
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
