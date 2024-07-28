// HikeMap.js
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const HikeMap = ({ hike, handleHikeChange, index }) => {
  const [markers, setMarkers] = useState(hike.markers || []);

  const map = useRef();

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        const newMarker = e.latlng;
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        handleHikeChange(index, "markers", [...markers, newMarker]);
      },
    });
    return null;
  };

  useEffect(() => {
    if (map.current) {
      const mapInstance = map.current.leafletElement;
      mapInstance.invalidateSize();
    }
  }, [map]);

  return (
    <MapContainer
      center={[36.81897, 10.16579]} // Default center, you can set it to your preferred location
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      ref={map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkerOnClick />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker} />
      ))}
    </MapContainer>
  );
};

export default HikeMap;
