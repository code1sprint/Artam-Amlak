import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { ROUTES } from '@/constants/routes';
import { UI_STRINGS } from '@/constants/translations';
import { SITE_CONFIG } from '@/constants/site';

// Core real estate pages directly imported to guarantee zero dynamic chunk fetch failures
import HomePage from '@/pages/HomePage';
import PropertiesPage from '@/pages/PropertiesPage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';

// Resilient lazy helper with auto-retry
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      console.warn('Initial chunk load failed, retrying once...', err);
      try {
        return await factory();
      } catch (retryErr) {
        // If second attempt fails, let error boundary handle or reload
        throw retryErr;
      }
    }
  });
}

const AboutPage = lazyWithRetry(() => import('@/pages/AboutPage'));
const AgentsPage = lazyWithRetry(() => import('@/pages/AgentsPage'));
const AgentDetailPage = lazyWithRetry(() => import('@/pages/AgentDetailPage'));
const ContactPage = lazyWithRetry(() => import('@/pages/ContactPage'));
const SubmitPropertyPage = lazyWithRetry(() => import('@/pages/SubmitPropertyPage'));
const BlogPage = lazyWithRetry(() => import('@/pages/BlogPage'));
const BlogPostPage = lazyWithRetry(() => import('@/pages/BlogPostPage'));
const FAQPage = lazyWithRetry(() => import('@/pages/FAQPage'));
const PrivacyPage = lazyWithRetry(() => import('@/pages/PrivacyPage'));
const TermsPage = lazyWithRetry(() => import('@/pages/TermsPage'));
const FavoritesPage = lazyWithRetry(() => import('@/pages/FavoritesPage'));
const DesignSystemPage = lazyWithRetry(() => import('@/pages/DesignSystemPage'));
const NotFoundPage = lazyWithRetry(() => import('@/pages/NotFoundPage'));

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-primary-100 border-t-accent animate-spin" />
        <img
          src={SITE_CONFIG.brand.logoMark}
          alt=""
          className="w-8 h-8 rounded-lg object-cover absolute"
        />
      </div>
      <p className="text-xs text-muted-foreground font-medium animate-pulse">
        {UI_STRINGS.status.loading}
      </p>
    </div>
  );
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(
  [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PROPERTIES,
        element: <PropertiesPage />,
      },
      {
        path: ROUTES.PROPERTY_DETAIL,
        element: <PropertyDetailPage />,
      },
      {
        path: ROUTES.AGENTS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AgentsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.AGENT_DETAIL,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AgentDetailPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONTACT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SUBMIT_PROPERTY,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SubmitPropertyPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BLOG,
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BLOG_POST,
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogPostPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.FAQ,
        element: (
          <Suspense fallback={<PageLoader />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRIVACY,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TERMS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.FAVORITES,
        element: (
          <Suspense fallback={<PageLoader />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.DESIGN_SYSTEM,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DesignSystemPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  ],
  { basename: routerBasename || undefined },
);
