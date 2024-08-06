import React from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Container,
  Divider,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function HikerProfile({ profile,isProfileOwner }) {
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

  // Helper function to render locked icon for private fields
  const renderPrivateField = () => (
    <Box display="flex" alignItems="center">
      <LockIcon color="action" sx={{ mr: 1 }} />
      <Typography variant="body1">Field set to private</Typography>
    </Box>
  );

  return (
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper, // Card color from theme
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: theme.shadows[3], // Box shadow from theme
        }}
      >
        <Avatar
          alt={`${profile.firstName} ${profile.lastName}`}
          src="/static/images/avatar/2.jpg"
          sx={{ width: 120, height: 120, mb: 2, border: `4px solid ${theme.palette.primary.main}` }} // Avatar border color
        />
        <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.primary }}>
          {profile.firstName || "First Name"} {profile.lastName || "Last Name"}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph align="center">
          {profile.bio || renderPrivateField()}
        </Typography>
        {isProfileOwner? <Tooltip title="Edit Profile">
          <IconButton color="primary" onClick={() => navigate("/setup/hiker-profile")}>
            <EditIcon />
          </IconButton>
        </Tooltip>:null}
        <Divider sx={{ my: 4, width: "100%", bgcolor: theme.palette.divider }} />
        <Box width="100%">
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
            Personal Information
          </Typography>
          <Box mb={2}>
            <Typography variant="body1">
              <strong>Birthday:</strong> {profile.birthday ? new Date(profile.birthday).toLocaleDateString() : renderPrivateField()}
            </Typography>
            <Typography variant="body1">
              <strong>Nationality:</strong> {profile.nationality || renderPrivateField()}
            </Typography>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {profile.phoneNumber || renderPrivateField()}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {profile.genderCode || renderPrivateField()}
            </Typography>
          </Box>
          <Divider sx={{ my: 4, bgcolor: theme.palette.divider }} />
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
            Account Information
          </Typography>
          <Box>
            <Typography variant="body1">
              <strong>Email:</strong> {profile.email || renderPrivateField()}
            </Typography>
            <Typography variant="body1">
              <strong>Username:</strong> {profile.userName || renderPrivateField()}
            </Typography>
          </Box>
        </Box>
      </Paper>
  );
}
