import React, { useContext, useEffect, useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Avatar, Tabs, Tab, Divider } from '@mui/material';
import { useTheme } from '@emotion/react';
import getEventParticipations from '../api/participation-management/services/getEventParticipations';
import AuthContext from '../auth/context/AuthContext';
import getUserProfile from '../api/profile-management/services/getUserProfile';
import Reviews from '../review-management/Reviews';

const ParticipantsModal = ({ open, onClose, event }) => {
  const authData = useContext(AuthContext);
  const theme = useTheme();
  const [participants, setParticipants] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0); // State for managing the selected tab
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
  };

  // Fetch participations
  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const result = await getEventParticipations(authData.user.accessToken, event.id);
        setParticipations(result);
      } catch (error) {
        console.error("Error fetching participations:", error);
      }
    };

    fetchParticipations();
  }, [authData.user.accessToken, event.id]);

  // Fetch participants
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantPromises = participations.map(async (participation) => {
          const result = await getUserProfile(authData.user.accessToken, participation.userProfileId);
          return result;
        });

        const participantsData = await Promise.all(participantPromises);
        setParticipants(participantsData);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    if (participations.length > 0) {
      fetchParticipants();
    }
  }, [authData.user.accessToken, participations]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Event Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="modal tabs"
          sx={{ mb: 2 }}
        >
          <Tab label="Participants" />
          <Tab label="Reviews" />
        </Tabs>
        {selectedTab === 0 && (
          <>
            <Typography variant="h6" component="h3">
              Participants
            </Typography>
            <List>
              {participants.map((participant) => (
                <ListItem key={participant.id}>
                  <Avatar src={participant.avatar} alt={participant.name} sx={{ mr: 2 }} />
                  <ListItemText primary={participant.userName} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        {selectedTab === 1 && <Reviews eventId={event.id} />}
      </Box>
    </Modal>
  );
};

export default ParticipantsModal;
