import React, { ReactNode } from 'react';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-1 justify-center">
      <div className="w-3/4">{children}</div>
    </main>
  );
};
