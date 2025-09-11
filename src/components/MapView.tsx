import { useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/mapbox';
import type { MarkerEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define site/location types
interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'head-office' | 'active-site' | 'inactive-site' | 'site';
  address?: string;
  workers?: number;
  status?: string;
}

interface MapViewProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  mapboxToken?: string;
}

const MapView = ({ 
  locations, 
  center, 
  zoom = 10, 
  height = '400px',
  mapboxToken = 'pk.eyJ1IjoiamFtZXNrZWxsIiwiYSI6ImNtNTJ4M28yZzAyczUycnB0c2xjd2gxdWQifQ.E7BFtiI2JdgCH91Eb2yctw'
}: MapViewProps) => {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  
  // Calculate center if not provided
  const mapCenter = center || {
    lat: locations[0]?.latitude || -33.8688,
    lng: locations[0]?.longitude || 151.2093
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'head-office':
        return '#3b82f6'; // Blue
      case 'active-site':
        return '#16a34a'; // Green
      case 'inactive-site':
        return '#dc2626'; // Red
      case 'site':
        return '#f59e0b'; // Orange
      default:
        return '#666';
    }
  };

  const getMarkerSize = (type: string) => {
    return type === 'head-office' ? 40 : 30;
  };

  return (
    <div style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: mapCenter.lng,
          latitude: mapCenter.lat,
          zoom: zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-right" />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={(e: MarkerEvent<MouseEvent>) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(location);
            }}
          >
            <div
              style={{
                width: getMarkerSize(location.type),
                height: getMarkerSize(location.type),
                borderRadius: '50%',
                backgroundColor: getMarkerColor(location.type),
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {location.type === 'head-office' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              )}
              {location.type === 'active-site' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
              {location.type === 'inactive-site' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              )}
              {location.type === 'site' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17 11V7c0-2.21-1.79-4-4-4s-4 1.79-4 4v4H7v10h10V11h-2zm-6 0V7c0-1.1.9-2 2-2s2 .9 2 2v4h-4z"/>
                </svg>
              )}
            </div>
          </Marker>
        ))}
        
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            anchor="bottom"
          >
            <div style={{ padding: '8px' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold', marginBottom: '4px' }}>
                {popupInfo.name}
              </h3>
              {popupInfo.address && (
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  {popupInfo.address}
                </p>
              )}
              {popupInfo.workers && (
                <p style={{ margin: 0, fontSize: '12px', marginTop: '4px' }}>
                  Workers: {popupInfo.workers}
                </p>
              )}
              {popupInfo.status && (
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  marginTop: '4px',
                  color: popupInfo.status === 'Active' ? '#16a34a' : '#dc2626'
                }}>
                  Status: {popupInfo.status}
                </p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapView;