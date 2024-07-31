import React, { useContext, useEffect, useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { useTheme } from '@emotion/react';
import getEventParticipations from '../api/participation-management/services/getEventParticipations';
import AuthContext from '../auth/context/AuthContext';
import getProfile from '../api/profile-management/services/getProfile';
import getUserProfile from '../api/profile-management/services/getUserProfile';

const ParticipantsModal = ({ open, onClose, event }) => {
  const authData = useContext(AuthContext);
  const theme = useTheme();
  const [participants, setParticipants] = useState([]);
  const [participations, setParticipations] = useState([]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
  };

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

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Participants
        </Typography>
        <List>
          {participants.map((participant) => (
            <ListItem key={participant.id}>
              <Avatar src={participant.avatar} alt={participant.name} />
              <ListItemText primary={participant.userName}/>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default ParticipantsModal;
