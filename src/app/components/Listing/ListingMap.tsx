'use client';

import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/env';

// Define the container's dimensions for the map
const containerStyle = {
  width: '100%', // Adjust width as needed
  height: '800px', // Adjust height as needed, e.g. 100vh for full viewport height
};

interface ListingMapProps {
  lat: number;
  lng: number;
}

const ListingMap = ({ lat, lng }: ListingMapProps) => {
  // Loads the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={12}>
      {/* The Marker component draws a pin on the map */}
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

// Using React.memo to prevent unnecessary rerenders
export default React.memo(ListingMap);
