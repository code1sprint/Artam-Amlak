import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Star, Award, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Agent } from '@/types/schema';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toPersianDigits } from '@/lib/formatters';

export interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className = '' }: AgentCardProps) {
  return (
    <article
      className={`group flex flex-col rounded-2xl bg-white border border-border shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/40 overflow-hidden ${className}`}
    >
      {/* Top Banner / Avatar */}
      <div className="relative pt-6 px-6 text-center flex flex-col items-center bg-gradient-to-b from-primary-50/60 to-transparent">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-card mb-3.5">
          <PersonAvatar
            name={agent.name}
            src={agent.avatar}
            className="w-full h-full text-2xl transition-transform duration-500 group-hover:scale-105"
            imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-1 end-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" title="در دسترس" />
        </div>

        <h3 className="text-lg font-bold text-primary-900 group-hover:text-accent-700 transition-colors">
          {agent.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[220px]">
          {agent.title}
        </p>

        {/* Rating and Sales */}
        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-1 text-accent-700 font-bold bg-accent-50/80 px-2 py-0.5 rounded-md border border-accent-200/50">
            <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
            <span>{toPersianDigits(agent.rating?.toFixed(1) || '۵٫۰')}</span>
            <span className="text-[10px] text-muted-foreground font-normal">({toPersianDigits(agent.reviewCount || 0)})</span>
          </div>

          <div className="flex items-center gap-1 text-primary-900 font-semibold bg-primary-50 px-2 py-0.5 rounded-md">
            <Award className="w-3.5 h-3.5 text-primary-700" />
            <span>{toPersianDigits(agent.salesCount)} معامله</span>
          </div>
        </div>
      </div>

      {/* Specialties Badges */}
      <div className="p-6 pt-4 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-muted-foreground block">تخصص‌ها:</span>
          <div className="flex flex-wrap gap-1.5">
            {agent.specialties.map((spec, i) => (
              <Badge key={i} variant="outline" size="sm" className="bg-neutral-background text-[11px]">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-border/60 flex items-center gap-2">
          <Button asChild size="sm" variant="primary" className="flex-1 shadow-xs">
            <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}>
              <Phone className="w-3.5 h-3.5 ms-1.5 text-accent-300" />
              تماس
            </a>
          </Button>

          <Button asChild size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noreferrer" title="واتساپ">
              <MessageCircle className="w-4 h-4" />
            </a>
          </Button>

          <Button asChild size="sm" variant="ghost" className="px-2" title="مشاهده پروفایل">
            <Link to={`/agents/${agent.id}`}>
              <ChevronLeft className="w-4 h-4 text-primary-900" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
