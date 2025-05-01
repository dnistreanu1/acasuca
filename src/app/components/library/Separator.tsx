'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_DIMMENSIONS_MAP = {
  sm: {
    height: 'h-2',
    width: 'w-2',
  },
  md: {
    height: 'h-4',
    width: 'w-4',
  },
  lg: {
    height: 'h-6',
    width: 'w-6',
  },
};

export const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'secondary',
  size = 'md',
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
              return `${SIZE_DIMMENSIONS_MAP[size].height} bg-[#F2F3F6]`;
            }
            if (orientation === 'vertical') {
              return `${SIZE_DIMMENSIONS_MAP[size].width} bg-[#F2F3F6]`;
            }
          }

          if (variant === 'secondary') {
            if (orientation === 'horizontal') {
              return SIZE_DIMMENSIONS_MAP[size].height;
            }
            if (orientation === 'vertical') {
              return SIZE_DIMMENSIONS_MAP[size].width;
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
