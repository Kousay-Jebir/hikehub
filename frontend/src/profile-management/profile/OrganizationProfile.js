import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import getProfile from "../../api/profile-management/services/getProfile";
import AuthContext from "../../auth/context/AuthContext";
import ProfileSettings from "../profile-settings/ProfileSettings";
import { useNavigate } from "react-router-dom";
import Events from "../../event-management/Events";

export default function OrganizationProfile() {
  const authData = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(authData.user.accessToken, authData.user.userId);
        setProfile(profile);
        setLoading(false);
        console.log(profile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authData.user.accessToken, authData.user.userId]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            alt={`${profile.firstName} ${profile.lastName}`}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Box>
            <Typography variant="h5">
              {profile.name || "First Name"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {profile.description || "No bio available"}
            </Typography>
            <Tooltip title="Edit Profile">
              <IconButton color="primary" onClick={()=>{authData.user.roles.includes("hiker") ? navigate("/setup/hiker-profile"):navigate("/setup/organization-profile")}}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contact and social Information</Typography>
            <Typography variant="body1"><strong>Phone number:</strong> {profile.contact.phone || "Not provided"}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {profile.contact.email || "Not provided"}</Typography>
            <Typography variant="body1"><strong>Facebook:</strong> {profile.social?.facebook || "Not provided"}</Typography>
            <Typography variant="body1"><strong>Instagram:</strong> {profile.social?.instagram || "Not provided"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Account Information</Typography>
            <Typography variant="body1"><strong>Email:</strong> {profile.email || "Not provided"}</Typography>
            <Typography variant="body1"><strong>Username:</strong> {profile.userName || "Not provided"}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Events></Events>
      </Paper>
    </>
  );
}