// HikeMap.js
import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HikeMap = ({ hike }) => {
  // Ensure hike and its geometry are defined
  if (!hike || !hike.geometry || !hike.geometry.coordinates) return null;

  // Convert GeoJSON coordinates to Leaflet format [latitude, longitude]
  const polylinePositions = hike.geometry.coordinates.map(coord => [coord[1], coord[0]]);
  
  // Calculate the center of the map based on the trail
  const center = polylinePositions.length > 0 ? polylinePositions[Math.floor(polylinePositions.length / 2)] : [36.81897, 10.16579];
  
  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ height: '300px', width: '100%' }}
      scrollWheelZoom={true}
      dragging={false}
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={polylinePositions} color="blue" />
    </MapContainer>
  );
};

export default HikeMap;
