import React, { JSX } from 'react';

type Variant = 'body' | 'heading' | 'subheading' | 'caption';

interface TextProps<T extends React.ElementType = 'p'> {
  as?: T;
  variant?: Variant;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

// Polymorphic Text component using a generic parameter T
export const Text = <T extends React.ElementType = 'p'>({
  as,
  variant = 'body',
  color,
  className = '',
  children,
  ...rest
}: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>): JSX.Element => {
  // Default element is 'p' if "as" is not provided
  const Component = as || 'span';

  // Map variants to Tailwind CSS classes
  let baseStyle = '';
  switch (variant) {
    case 'heading':
      baseStyle = 'text-3xl font-bold';
      break;
    case 'subheading':
      baseStyle = 'text-2xl font-semibold';
      break;
    case 'caption':
      baseStyle = 'text-sm';
      break;
    case 'body':
    default:
      baseStyle = 'text-base';
  }

  // Combine base styles with any additional class names passed by the user
  return (
    <Component style={{ color }} className={`${baseStyle} ${className}`} {...rest}>
      {children}
    </Component>
  );
};
