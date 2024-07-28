import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const MarkerControls = ({ map, handleMarkersUpdate }) => {
  const [markers, setMarkers] = useState([]);
  const [editingMarker, setEditingMarker] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  useEffect(() => {
    if (map) {
      const handleMapClick = (e) => {
        const { latlng } = e;
        const newMarker = L.marker([latlng.lat, latlng.lng])
          .addTo(map)
          .bindPopup(`<div>Click to edit this marker.</div>`)
          .on('click', () => {
            setEditingMarker(newMarker);
            setPopupContent(newMarker.getPopup().getContent());
            setOpenEditForm(true);
          });

        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        handleMarkersUpdate([...markers, newMarker]);
      };

      map.on('click', handleMapClick);

      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [map, markers]);

  const handleSaveMarker = () => {
    if (editingMarker) {
      editingMarker.setPopupContent(popupContent);
      setOpenEditForm(false);
    }
  };

  return (
    <>
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Edit Marker</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Popup Content"
            fullWidth
            value={popupContent}
            onChange={(e) => setPopupContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button onClick={handleSaveMarker}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MarkerControls;

