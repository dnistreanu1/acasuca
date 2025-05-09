import * as React from 'react';
import { Link } from '../../i18n/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/components/library/NavigationMenu';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const components: { title: 'toSell' | 'toRent' | 'residentialBuildings'; href: string; description: string }[] = [
  {
    title: 'toSell' as const,
    href: '/listings',
    description: '',
  },
  {
    title: 'toRent' as const,
    href: '/rent',
    description: '',
  },
  {
    title: 'residentialBuildings' as const,
    href: '/residential',
    description: '',
  },
];

export function NavigationBar({ children }: { children: React.ReactNode }) {
  const t = useTranslations('navigationBar');

  return (
    <>
      <div className="flex h-16 items-center justify-center border-b-1">
        <div className="flex w-3/4">
          <NavigationMenu className="flex-1">
            <NavigationMenuItem className="flex items-center mr-20">
              <Link href={'/'} passHref>
                <Image src="/content/images/logo.svg" alt="logo" width={204} height={52} className="pb-2" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuList>
              {components.map((component, id) => (
                <NavigationMenuItem key={id}>
                  <Link href={component.href} passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t(component.title)}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {children}
    </>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
