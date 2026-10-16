import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Agent } from '@/types/schema';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toPersianDigits } from '@/lib/formatters';
import { toast } from 'sonner';

export interface ContactAgentCardProps {
  agent: Agent;
  propertyTitle?: string;
  className?: string;
}

export function ContactAgentCard({ agent, propertyTitle, className = '' }: ContactAgentCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error('لطفاً نام و شماره تماس خود را وارد نمایید');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success('درخواست بازدید با موفقیت ثبت شد. مشاور مربوطه ظرف ۳۰ دقیقه با شما تماس خواهد گرفت.');
      setFullName('');
      setPhone('');
      setPreferredTime('');
      setMessage('');
    }, 600);
  };

  return (
    <div className={`rounded-2xl bg-white border border-border shadow-card p-6 space-y-5 ${className}`}>
      {/* Agent Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-border/80">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-border shadow-soft">
          <PersonAvatar
            name={agent.name}
            src={agent.avatar}
            className="w-full h-full text-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-base font-bold text-primary-900 truncate">{agent.name}</h4>
            <span title="کارشناس تایید شده" className="shrink-0 flex items-center">
              <ShieldCheck className="w-4 h-4 text-accent-600" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{agent.title}</p>
          <div className="flex items-center gap-1 text-xs text-accent-700 font-bold mt-1 font-sans">
            <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
            <span>{toPersianDigits(agent.rating?.toFixed(1) || '۵٫۰')}</span>
            <span className="text-[10px] text-muted-foreground font-normal">
              ({toPersianDigits(agent.salesCount)} معامله موفق)
            </span>
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="space-y-2.5">
        <Button asChild variant="primary" className="w-full h-11 justify-center shadow-soft">
          <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}>
            <Phone className="w-4 h-4 ms-2 text-accent-300" />
            تماس مستقیم: {agent.phone}
          </a>
        </Button>

        <Button asChild variant="outline" className="w-full h-11 justify-center border-emerald-300 text-emerald-800 hover:bg-emerald-50">
          <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noreferrer">
            <MessageCircle className="w-4 h-4 ms-2 text-emerald-600" />
            ارسال پیام در واتساپ
          </a>
        </Button>

        {/* Schedule Visit Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="accent" className="w-full h-11 justify-center shadow-soft font-bold">
              <Calendar className="w-4 h-4 ms-2" />
              هماهنگی بازدید حضوری
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>هماهنگی بازدید حضوری ملک</DialogTitle>
              <DialogDescription>
                {propertyTitle ? (
                  <span>برای هماهنگی بازدید اختصاصی از «{propertyTitle}» مشخصات خود را ثبت فرمایید:</span>
                ) : (
                  <span>کارشناس مربوطه جهت هماهنگی ساعت بازدید با شما تماس حاصل خواهد نمود:</span>
                )}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitVisit} className="space-y-3.5 py-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-900">نام و نام خانوادگی *</label>
                <Input
                  required
                  placeholder="مثال: دکتر علیرضا راد"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-900">شماره تماس همراه *</label>
                <Input
                  required
                  type="tel"
                  dir="ltr"
                  placeholder="۰۹۱۲..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-900">زمان ترجیحی برای بازدید</label>
                <Input
                  placeholder="مثال: پنج‌شنبه بعدازظهر ساعت ۱۷ به بعد"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-900">توضیحات یا پرسش خاص</label>
                <Textarea
                  placeholder="نکات مدنظر شما برای بررسی در روز بازدید..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" variant="primary" className="w-full shadow-soft" disabled={isSubmitting}>
                  {isSubmitting ? 'در حال ارسال درخواست...' : 'ثبت و ارسال نهایی درخواست'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
        <CheckCircle2 className="w-3.5 h-3.5 text-accent-600 shrink-0" />
        <span>مشاوره و هماهنگی بازدید کاملاً رایگان است</span>
      </div>
    </div>
  );
}
