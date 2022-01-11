import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./BaseMap.css";
const data1 = [
  {
    location: "lable-1",
    coordinates: [51.416347, 35.791591],
  },
  {
    location: "lable-2",
    coordinates: [51.423492, 35.783419],
  },
  {
    location: "lable-3",
    coordinates: [51.435946, 35.784417],
  },
  {
    location: "lable-4",
    coordinates: [51.484902, 35.788065],
  },
  {
    location: "lable-5",
    coordinates: [51.49382, 35.785237],
  },
];
const data2 = [
  {
    location: "lable-1",
    coordinates: [51.416347, 35.791591],
  },
];
const BaseMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXJpYWtoYXllciIsImEiOiJja3k5dWVjM2IwOXVqMnZwOTZ4cmhncG9oIn0.v31YAZMz60ZwK36QDQskoA";
  const [zoom, setzoom] = useState(9);
  const [maplg, setMaplg] = useState(data2);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [51.389, 35.6892],
      zoom: zoom,
    });
    const addmarkertomap = (data) => {
      maplg.forEach((location) => {
        console.log(location.location);
        const el = document.createElement("div");
        el.className = "marker";
        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 30 }).setHTML(
              `<h3>${location.location}</h3>`
            )
          )
          .addTo(map);
      });
      setMaplg(data);
    };
    const removemarkerfrommap = (data) => {
      maplg.forEach((location) => {
        const el = document.getElementsByClassName("marker");
        el[0].remove();
      });
    };
    map.on("zoom", (e) => {
      const currentZoom = map.getZoom();
      if (currentZoom > 11) {
        addmarkertomap(data1);
      } else if (currentZoom < 11) {
        /**todo: how remove?? */
        
      }
    });
  }, []);

  return <div id="mapContainer" className="map"></div>;
};

export default BaseMap;
