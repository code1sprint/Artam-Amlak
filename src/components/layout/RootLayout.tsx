import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContact } from '@/components/common/FloatingContact';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export function RootLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#0F172A] selection:bg-[#C9A24B]/20 selection:text-[#0F2A47] relative">
        <ScrollToTop />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </ErrorBoundary>
  );
}

// Alias for compatibility
export const AppLayout = RootLayout;
