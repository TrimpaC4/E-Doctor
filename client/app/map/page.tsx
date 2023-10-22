"use client";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
// import geoJson from './chicago-parks.json';
import "./Map.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../src/redux/store";
import { getAllDoctors } from "../../src/redux/doctorSlice";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXltZW4xMDEwIiwiYSI6ImNsbncwbDdlNzAyaHQycmxlOWRyaWFkemwifQ.EH5vbilYH63oHQEaf62AIA";
interface MarkerProps {
  onClick: (description: string) => void;
  children?: React.ReactNode; // Make 'children' optional
  feature: any; // Add a more specific type for the 'feature' prop
}

interface mapStyle {
  container: any;
  style: any;
  center: any;
  zoom: any;
}
function addMarker(map: any, lng: any, lat: any) {
  const el = document.createElement("div");
  el.className = "marker11";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat([lat, lng]).addTo(map);
}

const Map = () => {
  const [Lat, setLat] = useState<number>(0);
  const [Long, setLong] = useState<number>(0);
  const [arr, setArr] = useState<any>([]);
  const [newArr, setNewarr] = useState<any>([]);
  const [infoDoc, setInfoDoc] = useState<any>([]);
  const [refrech, setRefrech] = useState<any>(false);
  console.log(infoDoc, "wwwwwwwwwwwwwwwwww");

  const dispatch: AppDispatch = useDispatch();
  const allDoctors = useSelector((state: RootState) => state.doctor.allDoctors);
  console.log(allDoctors, "thiiiiiis");

  function departement(): void {
    allDoctors.map((e: any) => {
      arr.push(e.department);
    });
  }
  console.log(arr, "this departments");

  // const myData: any = {
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Lincoln Park",
  //         description: "AAAAAAAAAAAAYMEN ",
  //       },
  //       geometry: {
  //         coordinates: [-87.637596, 41.940403],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Burnham Park",
  //         description: "A lakefront park on Chicago's south side",
  //       },
  //       geometry: {
  //         coordinates: [-87.603735, 41.829985],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Millennium Park",
  //         description:
  //           "A downtown park known for its art installations and unique architecture",
  //       },
  //       geometry: {
  //         coordinates: [-87.622554, 41.882534],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Grant Park",
  //         description:
  //           "A downtown park that is the site of many of Chicago's favorite festivals and events",
  //       },
  //       geometry: {
  //         coordinates: [-87.619185, 41.876367],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Humboldt Park",
  //         description: "A large park on Chicago's northwest side",
  //       },
  //       geometry: {
  //         coordinates: [-87.70199, 41.905423],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Douglas Park",
  //         description:
  //           "A large park near in Chicago's North Lawndale neighborhood",
  //       },
  //       geometry: {
  //         coordinates: [-87.699329, 41.860092],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Calumet Park",
  //         description:
  //           "A park on the Illinois-Indiana border featuring a historic fieldhouse",
  //       },
  //       geometry: {
  //         coordinates: [-87.530221, 41.715515],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Jackson Park",
  //         description:
  //           "A lakeside park that was the site of the 1893 World's Fair",
  //       },
  //       geometry: {
  //         coordinates: [-87.580389, 41.783185],
  //         type: "Point",
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "Columbus Park",
  //         description: "A large park in Chicago's Austin neighborhood",
  //       },
  //       geometry: {
  //         coordinates: [-87.769775, 41.873683],
  //         type: "Point",
  //       },
  //     },
  //   ],
  //   type: "FeatureCollection",
  // };

  // const x = allDoctors.forEach((e: any) => {
    
  //   const infoDocarr = {
  //     name: e.name,
  //     phone: e.phone,
  //     title: e.department,
  //     geo: [36.8869376, 10.174464]
  //   };

  //   infoDoc.push(infoDocarr);
  //   // setInfoDoc(...infoDoc,infoDocarr);
  // });
  function removeDuplicatesInfo(arr:any) {
    const seen = new Set();
    return arr.filter((obj:any) => {
      const serializedObj = JSON.stringify(obj);
      const isDuplicate = seen.has(serializedObj);
      if (!isDuplicate) {
        seen.add(serializedObj);
      }
      return !isDuplicate;
    });
  }

  console.log(Lat);
  console.log(Long);
  const mapContainerRef: any = useRef(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
 
  function removeDuplicates() {
    const uniqueSet = new Set();

    for (const item of arr) {
      if (!uniqueSet.has(item)) {
        uniqueSet.add(item);
        newArr.push(item);
      }
    }
  }
  useEffect(()=>{
    dispatch(getAllDoctors());

  },[])

  // Initialize map when component mounts
  useEffect(() => {
    const map: any = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [Long, Lat],
      zoom: 6,
    });
    const geojsonData: any = {
      type: "FeatureCollection",
      features: allDoctors.map((coords: any) => ({
        type: "Feature",
        geometry: {
          type: "Point", // You can change this to other geometries like LineString or Polygon as needed
          coordinates: [coords.long, coords.lat],
        },
        properties: {
          // Add any additional properties you want here
          title: coords.name,
          description: coords.department,
          phone: coords.phone,
          address: coords.address,
          avatar: coords.avatarUrl,
          email: coords.email
        }
      })),
    };
    removeDuplicates();
    departement();
    removeDuplicatesInfo(infoDoc)
    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error: any, image: string) {
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

    function success(pos: any) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      setLat(crd.latitude);
      setLong(crd.longitude);
      console.log(`More or less ${crd.accuracy} meters.`);
      const marker1 = new mapboxgl.Marker()
        .setLngLat([crd.longitude, crd.latitude])
        .addTo(map);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      })
    );
    map.addControl(
      new mapboxgl.FullscreenControl({
        container: document.querySelector("body"),
      })
    );

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Add popups to map features
    map.on("click", "points", (event: any) => {
      let coordinates:any = []
      let description = ""
      let address:any = ""
      let name = ""
      const email = event.features[0].properties.email;
      let phone = 0
      let avatarUrl = ""
     allDoctors.forEach((e:any)=>{
      coordinates=[e.long,e.lat]
      address=e.address
      avatarUrl=e.avatarUrl
      name=e.name
      phone=e.phone
      description=e.department
     })

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`<div className="location_info">
        <div className="map_avatar">
        <p>Departement:<br/>${description}</p>
        </div>
        <h4>name: ${name}</h4>
        <p id="nameDoctor">adress:<br/>${address}</p>
        <p>Phone Number:<br/>${phone}</p>
    </div>`)
        .addTo(map);
    });

    // Change cursor on hover
    map.on("mouseenter", "points", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "points", () => {
      map.getCanvas().style.cursor = "";
    });

    /////////////////////////////////////////////

    addMarker(map, Long, Lat);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Clean up on unmount
    return () => map.remove();
  }, [Lat, Long]);

  return (
    <div>
      <div className="big-div-parent">
        <div className="map-container" ref={mapContainerRef} />
      </div>
      {/* <ul>
        <select>
          <option>All departemnts</option>
          {newArr.map((e: any) => {
            <option value={e}>{e}</option>;
          })}
        </select>
      </ul> */}
      
      
    </div>
  );
};

export default Map;
