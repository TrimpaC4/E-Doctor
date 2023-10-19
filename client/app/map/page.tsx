"use client"
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import geoJson from './chicago-parks.json';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXltZW4xMDEwIiwiYSI6ImNsbncwbDdlNzAyaHQycmxlOWRyaWFkemwifQ.EH5vbilYH63oHQEaf62AIA';
  interface MarkerProps {
    onClick: (description: string) => void;
    children?: React.ReactNode; // Make 'children' optional
    feature: any; // Add a more specific type for the 'feature' prop
  }
interface mapStyle{
    container: any
    style: any
    center: any
    zoom: any
}

const Marker: React.FC<any> = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

const Map = () => {
  const mapContainerRef:any = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map: any= new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Render custom marker components
    geoJson.features.forEach((feature:any) => {
      // Create a React ref
      const ref:any = React.createRef();
      // Create a new DOM node and save it to the React ref
      ref.current = document.createElement('div');
      // Render a Marker Component on our new DOM node
      createRoot(ref.current).render(
        <Marker onClick={markerClicked} feature={feature} />
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);

  const markerClicked = (title:any) => {
    window.alert(title);
  };

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
