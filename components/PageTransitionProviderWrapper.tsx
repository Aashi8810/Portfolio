// components/PageTransitionProviderWrapper.tsx
'use client'; // This directive is required for Context

import { PageTransitionProvider } from './PageTransition'; // Assuming this is where your provider is defined

export function PageTransitionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <PageTransitionProvider>{children}</PageTransitionProvider>;
}