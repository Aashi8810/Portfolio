import '../globals.css'; 

import { PageTransitionProviderWrapper } from '@/components/PageTransitionProviderWrapper';
import { OrbitalNav } from '@/components/OrbitalNav';
import { MainWrapper } from '@/components/MainWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0F0A] text-white">
        <PageTransitionProviderWrapper>
          <OrbitalNav />
          <MainWrapper>
            {children}
          </MainWrapper>
        </PageTransitionProviderWrapper>
      </body>
    </html>
  );
}