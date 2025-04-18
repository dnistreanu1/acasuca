'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './generic/BreadcrumbTemplate';
import { usePathname } from 'next/navigation';

export const BreadcrumbNavigation = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  // Build an array of breadcrumb objects
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Construct the URL for the breadcrumb (e.g., "/products", "/products/item", ...)
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    // Optionally, format the segment (capitalize, replace dashes with spaces, etc.)
    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    return { label, href };
  });

  // Always include a "Home" link at the start.
  const fullBreadcrumbs = [{ label: 'Home', href: '/' }, ...breadcrumbs];

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
