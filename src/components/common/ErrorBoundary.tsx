import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);

    // Auto-reload once if dynamic import / chunk failed due to dev server rebuild
    if (
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.message?.includes('Importing a module script failed')
    ) {
      const hasAutoReloaded = sessionStorage.getItem('chunk_reload_attempted');
      if (!hasAutoReloaded) {
        sessionStorage.setItem('chunk_reload_attempted', 'true');
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    sessionStorage.removeItem('chunk_reload_attempted');
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-neutral-background">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-border shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary-900">
                بارگذاری صفحه با خطا مواجه شد
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                نسخه جدیدی از سامانه به‌روزرسانی شده است. لطفاً دکمه «تلاش مجدد و بارگذاری» را انتخاب فرمایید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={this.handleReset}
                className="w-full sm:w-auto shadow-soft"
              >
                <RefreshCw className="w-4 h-4 ms-2" />
                تلاش مجدد و بارگذاری
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <a href="/">
                  <Home className="w-4 h-4 ms-2" />
                  بازگشت به خانه
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
