import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import TrailSelector from './TrailSelector';
import MarkerControls from './MarkerControls';
import trailsData from './data.json'; // Adjust the path according to your file structure

const MapComponent = ({ handleMarkersChange }) => {
  const mapRef = useRef(null); // Create a ref for the map container
  const mapInstanceRef = useRef(null); // Ref to store the map instance
  const [selectedTrail, setSelectedTrail] = useState(null); // State to hold the selected trail
  const [markers, setMarkers] = useState([]); // State to hold the markers

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize the map only if it hasn't been initialized yet
      const mapInstance = L.map(mapRef.current).setView([37.3861, -122.0838], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

      const geocoder = new L.Control.Geocoder({
        defaultMarkGeocode: false,
      }).addTo(mapInstance);

      geocoder.on('markgeocode', function (e) {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
          [bbox.getNorthEast().lat, bbox.getSouthWest().lng],
          [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
          [bbox.getSouthWest().lat, bbox.getNorthEast().lng]
        ]).addTo(mapInstance);

        mapInstance.fitBounds(poly.getBounds()); // Adjust the map to fit the search results
      });

      mapInstanceRef.current = mapInstance;
    }

    // Cleanup function to remove the map instance
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && selectedTrail) {
      // Remove existing trails
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add selected trail
      const geojsonLayer = L.geoJSON(selectedTrail, {
        style: feature => ({
          color: feature.properties.difficulty === 'Hard' ? 'red' : 'green',
          weight: 5
        }),
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`<b>${feature.properties.name}</b><br>Difficulty: ${feature.properties.difficulty}`);
        }
      }).addTo(mapInstanceRef.current);

      // Center the map on the trail's bounding box
      const bounds = geojsonLayer.getBounds();
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [selectedTrail]);

  const handleTrailSelection = (trail) => {
    setSelectedTrail(trail);
  };

  const handleMarkersUpdate = (updatedMarkers) => {
    setMarkers(updatedMarkers);
    handleMarkersChange(updatedMarkers);
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
      <TrailSelector trails={trailsData.features} onSelect={handleTrailSelection} />
      <MarkerControls map={mapInstanceRef.current} handleMarkersUpdate={handleMarkersUpdate} />
    </div>
  );
};

export default MapComponent;
