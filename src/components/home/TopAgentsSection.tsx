import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/features/agents/components/AgentCard';
import { useAgents } from '@/features/agents/hooks';
import { ROUTES } from '@/constants/routes';
import { HomeMotionWrapper } from './HomeMotionWrapper';

export function TopAgentsSection() {
  const { data: agents, isLoading } = useAgents();

  return (
    <section className="py-20 md:py-28 bg-white border-b border-border/70">
      <Container>
        <HomeMotionWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="start"
              className="mb-0"
              badge="تیم تخصصی شمیرانات"
              title="مشاوران برگزیده و وکلای ملکی"
              subtitle="کارشناسانی کارکشته، مسلط بر قیمت‌گذاری دقیق، اصول معماری و مذاکرات قراردادهای سنگین"
            />
            <Button asChild variant="outline" size="md" className="self-start md:self-end shrink-0 shadow-xs">
              <Link to={ROUTES.AGENTS}>
                مشاهده همه کارشناسان
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-96 rounded-2xl bg-muted/60 animate-pulse" />
                ))
              : agents?.slice(0, 4).map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button asChild variant="primary" className="w-full">
              <Link to={ROUTES.AGENTS}>
                مشاهده همه کارشناسان
                <ArrowLeft className="w-4 h-4 me-2" />
              </Link>
            </Button>
          </div>
        </HomeMotionWrapper>
      </Container>
    </section>
  );
}
