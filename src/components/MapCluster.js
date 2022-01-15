import React, { useRef, useState } from "react";

import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./BaseMap.css";

const data1 = [
  {
    id: 1,
    location: "lable-1",
    coordinates: [51.416347, 35.791591],
  },
  {
    id: 2,
    location: "lable-2",
    coordinates: [51.423492, 35.783419],
  },
  {
    id: 3,
    location: "lable-3",
    coordinates: [51.435946, 35.784417],
  },
  {
    id: 4,
    location: "lable-4",
    coordinates: [51.484902, 35.788065],
  },
  {
    id: 5,
    location: "lable-5",
    coordinates: [51.49382, 35.785237],
  },
];

export const MapCluster = () => {
  const [viewport, setViewport] = useState({
    latitude: 35.6892,
    longitude: 51.389,
    width: "100vw",
    height: "100vh",
    zoom: 9,
  });

  const mapRef = useRef();

  const points = data1.map((m, index) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: m.id,
      lable: m.location,
    },
    geometry: { type: "Point", coordinates: m.coordinates },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  });

  console.log(clusters);

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={22}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(newViewport) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {clusters.map((cluster, index) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        if (isCluster) {
          return (
            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
              <div
                className="cluster-marker"
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator({
                      speed: 2
                    }),
                    transitionDuration: "auto"
                  });
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.id}
            latitude={latitude}
            longitude={longitude}
          >
            <button>
              <i class="fas fa-map-marker-alt "></i>
            </button>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
};
