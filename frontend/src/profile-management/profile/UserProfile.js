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
import ProfileRenderer from "../ProfileRenderer";
import HikerProfile from "../HikerProfile";

export default function UserProfile() {
  const authData = useContext(AuthContext);



  return (
    <>
      <ProfileRenderer id={authData.user.userId}><HikerProfile/></ProfileRenderer>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <ProfileSettings></ProfileSettings>
      </Paper>
    </>
  );
}
