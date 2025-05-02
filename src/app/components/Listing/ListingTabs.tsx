'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../library/Tabs';
import { Separator } from '../library/Separator';

interface ListingTabsProps {
  className?: string;
  smallCards: React.ReactNode;
  largeCards: React.ReactNode;
  mapView: React.ReactNode;
}

const getInitialTabsView = (): 'small' | 'large' | 'map' => {
  const value = localStorage.getItem('tabsView');
  if (value === 'small' || value === 'large' || value === 'map') {
    return value;
  } else {
    return 'small';
  }
};

export function ListingTabs({ className, smallCards, largeCards, mapView }: ListingTabsProps) {
  const [tabsView, setTabsView] = useState<'small' | 'large' | 'map'>(getInitialTabsView());

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
            Small
          </TabsTrigger>
          <TabsTrigger
            value="large"
            onClick={() => setTabsView('large')}
            className={`w-fit px-8 ${tabsView === 'large' ? ' bg-white text-grey' : 'bg-white text-black'}`}
          >
            Large
          </TabsTrigger>
          <TabsTrigger
            value="map"
            onClick={() => setTabsView('map')}
            className={`w-fit px-8 ${tabsView === 'map' ? ' bg-white text-grey' : 'bg-white text-black'}`}
          >
            Map
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
