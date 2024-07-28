import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const MarkerEditForm = ({ open, onClose, marker, onSave }) => {
  const [title, setTitle] = useState(marker?.title || '');
  const [description, setDescription] = useState(marker?.description || '');

  useEffect(() => {
    if (marker) {
      setTitle(marker.title || '');
      setDescription(marker.description || '');
    }
  }, [marker]);

  const handleSave = () => {
    onSave({ ...marker, title, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Marker</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkerEditForm;

