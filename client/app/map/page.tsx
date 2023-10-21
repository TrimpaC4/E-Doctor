"use client"
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
// import geoJson from './chicago-parks.json';
import './Map.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../src/redux/store';
import { getAllDoctors } from '../../src/redux/doctorSlice';


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
  const [arr,setArr] = useState<any>(0)
  const dispatch: AppDispatch = useDispatch();
  const allDoctors = useSelector((state: RootState) => state.doctor.allDoctors);
console.log(allDoctors);
const myData:any ={
  
    "features": [
      {
        "type": "Feature",
        "properties": {
          "title": "Lincoln Park",
          "description": "AAAAAAAAAAAAYMEN "
        },
        "geometry": {
          "coordinates": [-87.637596, 41.940403],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Burnham Park",
          "description": "A lakefront park on Chicago's south side"
        },
        "geometry": {
          "coordinates": [-87.603735, 41.829985],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Millennium Park",
          "description": "A downtown park known for its art installations and unique architecture"
        },
        "geometry": {
          "coordinates": [-87.622554, 41.882534],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Grant Park",
          "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
        },
        "geometry": {
          "coordinates": [-87.619185, 41.876367],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Humboldt Park",
          "description": "A large park on Chicago's northwest side"
        },
        "geometry": {
          "coordinates": [-87.70199, 41.905423],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Douglas Park",
          "description": "A large park near in Chicago's North Lawndale neighborhood"
        },
        "geometry": {
          "coordinates": [-87.699329, 41.860092],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Calumet Park",
          "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
        },
        "geometry": {
          "coordinates": [-87.530221, 41.715515],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Jackson Park",
          "description": "A lakeside park that was the site of the 1893 World's Fair"
        },
        "geometry": {
          "coordinates": [-87.580389, 41.783185],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Columbus Park",
          "description": "A large park in Chicago's Austin neighborhood"
        },
        "geometry": {
          "coordinates": [-87.769775, 41.873683],
          "type": "Point"
        }
      }
    ],
    "type": "FeatureCollection"
  
  
}

  console.log(Lat);
  console.log(Long);
  const mapContainerRef :any= useRef(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const geojsonData:any = {
    type: "FeatureCollection",
    features: myData.features.map((coords:any) => ({
      type: "Feature",
      geometry: {
        type: "Point", // You can change this to other geometries like LineString or Polygon as needed
        coordinates: coords.geometry.coordinates,
      },
      properties: {
        // Add any additional properties you want here
        title: coords.properties.title,
        description:coords.properties.description
      },
    })),
  };



  // Initialize map when component mounts
  useEffect(() => {
    const map :any= new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [Long,Lat],
      zoom: 6,
    });
    dispatch(getAllDoctors());

    

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
              features: geojsonData.features,
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
     map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle:true
      }));    
      map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
      
//////////////////////////////////////////////////////////////////////////////////////////////////
      // Add popups to map features
      map.on('click', 'points', (event:any) => {
       
        const coordinates = event.features[0].geometry.coordinates;
        const description = event.features[0].properties.description;
      
        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div>${description}</div>`)
          .addTo(map);
      });
      
  
      // Change cursor on hover
      map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
  
      map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
      });

     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Clean up on unmount
    return () => map.remove();
  }, [Lat,Long]);

  return (
  <div>
    <div> </div>
  <div className="map-container" ref={mapContainerRef} />
  <div>

  </div>
  </div>
  );
};

export default Map;
