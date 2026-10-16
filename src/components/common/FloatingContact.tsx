import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export function FloatingContact() {
  return (
    <aside
      aria-label="تماس و پشتیبانی سریع"
      className="fixed bottom-0 inset-x-0 z-40 p-3 md:hidden pointer-events-none"
    >
      <div className="mx-auto max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-border/80 shadow-elevated flex items-center justify-between gap-2.5 pointer-events-auto transition-transform duration-300">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.contacts.mobileRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-900 text-white font-semibold text-xs transition-transform active:scale-98 shadow-soft"
          aria-label="تماس مستقیم با کارشناس ارشد"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-accent-300">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>تماس فوری با کارشناس</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={SITE_CONFIG.contacts.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs transition-transform active:scale-98 shadow-soft"
          aria-label="ارسال پیام در واتساپ"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/10 text-white">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span>پیام در واتساپ</span>
        </a>
      </div>
    </aside>
  );
}
