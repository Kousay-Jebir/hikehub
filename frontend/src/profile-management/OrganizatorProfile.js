import React from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function OrganizatorProfile({ profile }) {
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
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            alt={profile.name || "Organization"}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 120, height: 120, mr: 2, border: `4px solid ${theme.palette.primary.main}` }} // Avatar border color
          />
          <Box>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
              {profile.name || "Organization Name"}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {profile.description || renderPrivateField()}
            </Typography>
            <Tooltip title="Edit Profile">
              <IconButton color="primary" onClick={() => navigate("/setup/organization-profile")}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Divider sx={{ my: 4, width: "100%", bgcolor: theme.palette.divider }} />
        <Box width="100%">
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Contact and Social Information
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Phone Number: {profile.contact?.phone || renderPrivateField()}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Email: {profile.contact?.email || renderPrivateField()}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Facebook: {profile.social?.facebook || renderPrivateField()}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Instagram: {profile.social?.instagram || renderPrivateField()}
          </Typography>
          <Divider sx={{ my: 4, bgcolor: theme.palette.divider }} />
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Account Information
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Email: {profile.email || renderPrivateField()}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Username: {profile.userName || renderPrivateField()}
          </Typography>
        </Box>
      </Paper>
  );
}
