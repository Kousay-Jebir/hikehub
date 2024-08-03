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
import ProfileRenderer from "../ProfileRenderer";
import OrganizatorProfile from "../OrganizatorProfile";

export default function OrganizationProfile() {
  const authData = useContext(AuthContext);
  const navigate = useNavigate()


  return (
    <>
      <ProfileRenderer id={authData.user.userId}><OrganizatorProfile/></ProfileRenderer>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Events></Events>
      </Paper>
    </>
  );
}