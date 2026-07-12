import '../globals.css'; 

import { PageTransitionProviderWrapper } from '@/components/PageTransitionProviderWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageTransitionProviderWrapper>
          {children}
        </PageTransitionProviderWrapper>
      </body>
    </html>
  );
}