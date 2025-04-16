import Image from 'next/image';
import React, { ReactNode } from 'react';

export const NavigationBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-white h-16 flex justify-center items-center text-black border-b-gray-200 border-b-1">
        <div className="w-3/4">
          <div>
            <Image src="/content/images/logo.svg" alt="logo" width={204} height={52} className="mb-4" />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
