import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';
import { APP_CONFIG } from '@/constants/app';
import { UI_STRINGS } from '@/constants/translations';
import { cn } from '@/lib/utils';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: UI_STRINGS.navigation.home, path: ROUTES.HOME },
    { label: UI_STRINGS.navigation.properties, path: ROUTES.PROPERTIES },
    { label: UI_STRINGS.navigation.agents, path: ROUTES.AGENTS },
    { label: UI_STRINGS.navigation.blog, path: ROUTES.BLOG },
    { label: UI_STRINGS.navigation.about, path: ROUTES.ABOUT },
    { label: UI_STRINGS.navigation.contact, path: ROUTES.CONTACT },
    { label: UI_STRINGS.navigation.designSystem, path: ROUTES.DESIGN_SYSTEM, badge: 'دیزاین' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-white/90 backdrop-blur-md transition-all">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <BrandLogo variant="lockup" size={44} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    isActive
                      ? 'text-primary-900 font-bold bg-primary-50/80'
                      : 'text-foreground/80 hover:text-primary-900 hover:bg-muted/60'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ms-1.5 rounded-full bg-accent-100 text-accent-800 px-1.5 py-0.5 text-[10px] font-bold border border-accent-300">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 start-3 end-3 h-0.5 bg-accent-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
              <Link to={ROUTES.SUBMIT_PROPERTY}>
                <Sparkles className="w-3.5 h-3.5 ms-1.5 text-accent" />
                {UI_STRINGS.navigation.submitProperty}
              </Link>
            </Button>

            <Button asChild variant="primary" size="sm">
              <a href={`tel:${APP_CONFIG.phone}`}>
                <PhoneCall className="w-3.5 h-3.5 ms-1.5 text-accent" />
                <span>{APP_CONFIG.phone}</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="منوی سایت">
                  <Menu className="h-6 w-6 text-primary-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="start" className="flex flex-col justify-between">
                <div>
                  <SheetHeader className="mb-6">
                    <SheetTitle asChild>
                      <div>
                        <BrandLogo
                          variant="lockup"
                          size={36}
                          asLink={false}
                          showEnName={false}
                          subtitle={APP_CONFIG.city}
                        />
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-1.5">
                    {navLinks.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary-900 text-white font-bold'
                              : 'text-foreground hover:bg-muted'
                          )}
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-accent-500 text-primary-950 px-2 py-0.5 text-[10px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <Button asChild variant="accent" className="w-full">
                    <Link to={ROUTES.SUBMIT_PROPERTY} onClick={() => setMobileOpen(false)}>
                      <Sparkles className="w-4 h-4 ms-2" />
                      {UI_STRINGS.navigation.submitProperty}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={`tel:${APP_CONFIG.phone}`}>
                      <PhoneCall className="w-4 h-4 ms-2" />
                      تماس: {APP_CONFIG.phone}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
