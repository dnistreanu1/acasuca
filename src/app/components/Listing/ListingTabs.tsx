'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../library/Tabs';
import { Separator } from '../library/Separator';
import { useTranslations } from 'next-intl';

interface ListingTabsProps {
  className?: string;
  smallCards: React.ReactNode;
  largeCards: React.ReactNode;
  mapView: React.ReactNode;
}

type TabsView = 'small' | 'large' | 'map';

const getInitialTabsView = (): TabsView => {
  const value = localStorage.getItem('tabsView') || 'small';
  return value as TabsView;
};

export function ListingTabs({ className, smallCards, largeCards, mapView }: ListingTabsProps) {
  const [tabsView, setTabsView] = useState<TabsView>(getInitialTabsView());
  const t = useTranslations('listing.tabs');

  // Save the selected tab view in local storage
  useEffect(() => {
    localStorage.setItem('tabsView', tabsView);
  }, [tabsView]);

  return (
    <>
      <Tabs defaultValue={tabsView} className={`${className}`}>
        <TabsList className="flex gap-6" color="red">
          <TabsTrigger
            value="small"
            onClick={() => setTabsView('small')}
            className={`w-fit px-8 shadow-2xl ${tabsView === 'small' ? 'bg-white text-grey' : 'bg-white text-black'}`}
          >
            {t('small')}
          </TabsTrigger>
          <TabsTrigger
            value="large"
            onClick={() => setTabsView('large')}
            className={`w-fit px-8 ${tabsView === 'large' ? ' bg-white text-grey' : 'bg-white text-black'}`}
          >
            {t('large')}
          </TabsTrigger>
          <TabsTrigger
            value="map"
            onClick={() => setTabsView('map')}
            className={`w-fit px-8 ${tabsView === 'map' ? ' bg-white text-grey' : 'bg-white text-black'}`}
          >
            {t('map')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator variant="secondary" />
      <div className={tabsView === 'small' ? 'visible' : 'hidden'}>{smallCards}</div>
      <div className={tabsView === 'large' ? 'visible' : 'hidden'}>{largeCards}</div>
      <div className={tabsView === 'map' ? 'visible' : 'hidden'}>{mapView}</div>
    </>
  );
}
