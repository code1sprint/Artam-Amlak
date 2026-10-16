import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: ProvidersProps) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <SmoothScrollProvider>
            {children}
            <Toaster
              position="bottom-left"
              dir="rtl"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: "'Vazirmatn Variable', sans-serif",
                  borderRadius: '14px',
                },
              }}
            />
          </SmoothScrollProvider>
        </FavoritesProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
