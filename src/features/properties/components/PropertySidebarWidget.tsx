import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, ShieldCheck, Star } from 'lucide-react';
import { Agent } from '@/types/schema';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropertyScheduleVisitForm } from './PropertyScheduleVisitForm';
import { toPersianDigits } from '@/lib/formatters';

export interface PropertySidebarWidgetProps {
  agent: Agent;
  propertyTitle: string;
  className?: string;
}

export function PropertySidebarWidget({
  agent,
  propertyTitle,
  className = '',
}: PropertySidebarWidgetProps) {
  return (
    <aside
      className={`rounded-3xl bg-white border border-border shadow-card p-6 space-y-6 sticky top-24 ${className}`}
    >
      {/* Agent Profile Box */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-border/80">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-soft">
          <PersonAvatar
            name={agent.name}
            src={agent.avatar}
            className="w-full h-full text-lg"
          />
          <div className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-base font-bold text-primary-900 truncate">{agent.name}</h4>
            <span title="کارشناس تایید شده" className="shrink-0 flex items-center">
              <ShieldCheck className="w-4 h-4 text-accent-600" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{agent.title}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mt-1 font-sans">
            <div className="flex items-center gap-1 text-accent-700 font-bold bg-accent-50 px-1.5 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
              <span>{toPersianDigits(agent.rating?.toFixed(1) || '۵٫۰')}</span>
            </div>
            <span>•</span>
            <span className="text-[11px] text-muted-foreground">
              {toPersianDigits(agent.salesCount)} معامله موفق
            </span>
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <Button asChild variant="primary" size="md" className="shadow-xs font-bold text-xs">
          <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}>
            <Phone className="w-3.5 h-3.5 ms-1.5 text-accent-300" />
            تماس تلفنی
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="md"
          className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-bold text-xs"
        >
          <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noreferrer">
            <MessageCircle className="w-3.5 h-3.5 ms-1.5 text-emerald-600" />
            پیام واتساپ
          </a>
        </Button>
      </div>

      {/* Schedule Visit Form Container */}
      <div className="pt-2 border-t border-border/80 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary-900">
          <Calendar className="w-4 h-4 text-accent" />
          <span>هماهنگی بازدید حضوری اختصاصی</span>
        </div>
        <PropertyScheduleVisitForm propertyTitle={propertyTitle} />
      </div>
    </aside>
  );
}

/**
 * Mobile Fixed Bottom Action Bar for Property Detail
 */
export function PropertyMobileBottomBar({
  agent,
  propertyTitle,
}: {
  agent: Agent;
  propertyTitle: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-border shadow-elevated lg:hidden">
      <div className="max-w-md mx-auto flex items-center gap-2.5">
        {/* Direct Call */}
        <Button asChild variant="primary" className="flex-1 h-12 shadow-soft font-bold text-xs">
          <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}>
            <Phone className="w-4 h-4 ms-2 text-accent" />
            تماس با مشاور
          </a>
        </Button>

        {/* Schedule Visit Dialog Trigger */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="accent" className="flex-1 h-12 shadow-soft font-bold text-xs">
              <Calendar className="w-4 h-4 ms-2" />
              درخواست بازدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>هماهنگی بازدید حضوری ملک</DialogTitle>
              <DialogDescription>
                مشخصات خود را وارد فرمایید تا کارشناس فایل با شما تماس بگیرد:
              </DialogDescription>
            </DialogHeader>
            <PropertyScheduleVisitForm
              propertyTitle={propertyTitle}
              onSuccess={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
