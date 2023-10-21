"use client"
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
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

const Map = () => {
  const [Lat,setLat] = useState<number>(0)
  const [Long,setLong] = useState<number>(0)
  console.log(Lat);
  console.log(Long);
  const mapContainerRef :any= useRef(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  

  // Initialize map when component mounts
  useEffect(() => {
    const map :any= new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [Long,Lat],
      zoom: 10,
    });

    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error:any, image:string) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    // current position
    
    function success(pos:any) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      setLat(crd.latitude)
      setLong(crd.longitude)
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err:any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [Lat,Long]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
