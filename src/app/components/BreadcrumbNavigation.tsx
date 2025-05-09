'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './library/Breadcrumb';
import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/request';
import { useTranslations } from 'next-intl';
import { isGUID } from '@/common/utils/text';

const isValidBreadcrumbKey = (key: string) => {
  const isString = typeof key === 'string';
  const isAGuid = isGUID(key);
  return isString && !isAGuid;
};

export const BreadcrumbNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations('common');
  const pathSegments = pathname.split('/').filter((el) => !locales.includes(el as any) && el !== '');
  // Build an array of breadcrumb objects
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Construct the URL for the breadcrumb (e.g., "/products", "/products/item", ...)
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    // Optionally, format the segment (capitalize, replace dashes with spaces, etc.)
    const label = segment.replace(/-/g, '').replace(/\b\w/g, (char) => char.toUpperCase());

    return { label: isValidBreadcrumbKey(label.toLowerCase()) ? t(label.toLowerCase() as any) : label, href };
  });

  // Always include a "Home" link at the start.
  const fullBreadcrumbs = [{ label: t('home'), href: '/' }, ...breadcrumbs];

  return (
    <Breadcrumb className="py-2">
      <BreadcrumbList>
        {fullBreadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
