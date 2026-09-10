'use client';

import { usePathname } from 'next/navigation';

export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main className={`${isHome ? 'pl-0' : 'pl-0 lg:pl-[180px]'} min-h-screen transition-[padding] duration-300`}>
      {children}
    </main>
  );
};