'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  variant: 'primary' | 'secondary';
}

export const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'primary',
  ...props
}: SeparatorProps) => {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      orientation={orientation}
      decorative={decorative}
      className={cn(
        `${(() => {
          if (variant === 'primary') {
            if (orientation === 'horizontal') {
              return 'h-4 bg-[#F2F3F6]';
            }
            if (orientation === 'vertical') {
              return 'w-4 bg-[#F2F3F6]';
            }
          }

          if (variant === 'secondary') {
            if (orientation === 'horizontal') {
              return 'h-4 ';
            }
            if (orientation === 'vertical') {
              return 'w-4 ';
            }
          }

          return '';
        })()} ${className}`
      )}
      role="separator"
      {...props}
    />
  );
};
