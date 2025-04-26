import React, { ReactNode } from 'react';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-1 justify-center bg-[#F2F3F6] h-full">
      <div className="relative w-3/4">{children}</div>
    </main>
  );
};
