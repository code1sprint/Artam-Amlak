import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  PhoneCall,
  Sparkles,
  Building,
  ArrowLeft,
  X,
  Phone,
  Clock,
  Compass,
  Heart,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SITE_CONFIG } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { useFavorites } from '@/context/FavoritesContext';
import { toPersianDigits } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-border/80 py-3'
          : 'bg-white/80 md:bg-white/60 backdrop-blur-xs border-b border-border/30 py-4.5'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <BrandLogo variant="lockup" size={48} />

          {/* Desktop Navigation Links (NavLink with active states) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {SITE_CONFIG.menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 select-none',
                    isActive
                      ? 'text-primary-900 font-bold bg-primary-50'
                      : 'text-foreground/80 hover:text-primary-900 hover:bg-muted/70'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0.5 start-3 end-3 h-[2.5px] bg-accent-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Call & Actions Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="iconSm"
              className="relative text-primary-900 hover:bg-primary-50"
              aria-label="علاقه‌مندی‌ها"
            >
              <Link to={ROUTES.FAVORITES}>
                <Heart className={cn('w-4.5 h-4.5', favoritesCount > 0 && 'fill-accent text-accent')} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -end-1 min-w-4 h-4 px-1 rounded-full bg-accent text-primary-950 text-[10px] font-bold flex items-center justify-center font-sans">
                    {toPersianDigits(favoritesCount)}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden xl:inline-flex border-accent-300/80 bg-accent-50/40 hover:bg-accent-50 text-primary-900"
            >
              <Link to={ROUTES.SUBMIT_PROPERTY}>
                <Sparkles className="w-3.5 h-3.5 ms-1.5 text-accent-600" />
                ثبت رایگان ملک
              </Link>
            </Button>

            <Button asChild variant="primary" size="md" className="shadow-soft group">
              <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}>
                <PhoneCall className="w-4 h-4 ms-2 text-accent-400 group-hover:rotate-12 transition-transform duration-200" />
                <span>تماس بگیرید:</span>
                <span className="font-bold text-accent-300 font-sans">
                  {SITE_CONFIG.contacts.phone}
                </span>
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              asChild
              variant="ghost"
              size="iconSm"
              className="relative text-primary-900"
              aria-label="علاقه‌مندی‌ها"
            >
              <Link to={ROUTES.FAVORITES}>
                <Heart className={cn('w-4.5 h-4.5', favoritesCount > 0 && 'fill-accent text-accent')} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 px-1 rounded-full bg-accent text-primary-950 text-[10px] font-bold flex items-center justify-center font-sans">
                    {toPersianDigits(favoritesCount)}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="iconSm"
              className="sm:hidden text-primary-900 border-border"
            >
              <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`} aria-label="تماس مستقیم">
                <PhoneCall className="w-4 h-4 text-accent-700" />
              </a>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-primary-50 text-primary-900"
                  aria-label="منوی ناوبری سایت"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="start" className="w-[85vw] max-w-sm flex flex-col justify-between p-6">
                <div className="space-y-6">
                  <SheetHeader className="text-start border-b border-border/80 pb-4">
                    <SheetTitle asChild>
                      <div>
                        <BrandLogo
                          variant="lockup"
                          size={40}
                          asLink={false}
                          showEnName={false}
                          subtitle={SITE_CONFIG.contacts.district}
                        />
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation Links list */}
                  <nav className="flex flex-col gap-1">
                    {SITE_CONFIG.menu.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors select-none',
                            isActive
                              ? 'bg-primary-900 text-white font-bold shadow-soft'
                              : 'text-foreground hover:bg-muted active:bg-primary-50'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{item.label}</span>
                            <ArrowLeft
                              className={cn(
                                'w-4 h-4 transition-transform',
                                isActive ? 'text-accent-400 rotate-180' : 'text-muted-foreground'
                              )}
                            />
                          </>
                        )}
                      </NavLink>
                    ))}

                    <Link
                      to={ROUTES.DESIGN_SYSTEM}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-accent-800 bg-accent-50/70 border border-accent-200 mt-2"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-accent-600" />
                        مشاهده مستندات سیستم طراحی
                      </span>
                      <span className="text-[10px] bg-accent-500 text-primary-950 font-bold px-2 py-0.5 rounded-full">
                        UI Kit
                      </span>
                    </Link>
                  </nav>
                </div>

                {/* Drawer Footer Actions */}
                <div className="space-y-3 pt-6 border-t border-border/80">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                    <span>{SITE_CONFIG.contacts.workingHours}</span>
                  </div>

                  <Button asChild variant="primary" className="w-full justify-center">
                    <a href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}>
                      <Phone className="w-4 h-4 ms-2 text-accent" />
                      تماس با دفتر: {SITE_CONFIG.contacts.phone}
                    </a>
                  </Button>

                  <Button asChild variant="accent" className="w-full justify-center">
                    <Link to={ROUTES.SUBMIT_PROPERTY}>
                      <Sparkles className="w-4 h-4 ms-2" />
                      ثبت رایگان مشخصات ملک
                    </Link>
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
