import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Button, Box } from '@mui/material';
import MarkerEditForm from '../../hike-management/MarkerEditForm';

const MarkerControls = ({ map, handleMarkersUpdate }) => {
  const [markers, setMarkers] = useState([]);
  const [editingMarker, setEditingMarker] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    if (map) {
      // Function to handle map clicks and add new markers
      const handleMapClick = (e) => {
        const { latlng } = e;
        const newMarker = L.marker([latlng.lat, latlng.lng])
          .addTo(map)
          .bindPopup(`<div>Click to edit this marker.</div>`)
          .on('click', () => {
            setEditingMarker({ lat: latlng.lat, lng: latlng.lng, title: '', description: '' });
            setOpenEditForm(true);
          });

        setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        handleMarkersUpdate([...markers, newMarker]);
      };

      map.on('click', handleMapClick);

      // Clean up the event listener when the component unmounts
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [map, markers]);

  const handleSaveMarker = (updatedMarker) => {
    const marker = markers.find(m => m.getLatLng().equals([updatedMarker.lat, updatedMarker.lng]));
    if (marker) {
      marker.setPopupContent(`
        <b>${updatedMarker.title}</b><br>
        ${updatedMarker.description}
      `);
    }
    handleMarkersUpdate(markers);
  };

  const saveMarkers = () => {
    const markerData = markers.map(marker => ({
      lat: marker.getLatLng().lat,
      lng: marker.getLatLng().lng,
      title: marker.getPopup().getContent().split('<b>')[1]?.split('</b>')[0] || '',
      description: marker.getPopup().getContent().split('<br>')[1] || '',
    }));
    localStorage.setItem('userMarkers', JSON.stringify(markerData));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="primary" onClick={saveMarkers}>
        Save Markers
      </Button>
      <MarkerEditForm
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        marker={editingMarker}
        onSave={handleSaveMarker}
      />
    </Box>
  );
};

export default MarkerControls;


