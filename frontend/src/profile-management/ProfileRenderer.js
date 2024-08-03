import { useContext, useEffect,useState } from "react";
import AuthContext from "../auth/context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import getProfile from "../api/profile-management/services/getProfile";
import { Children } from "react";
import Loader from "../shared/components/Loader";
import { Box ,Container} from "@mui/material";
import { cloneElement } from "react";
import useFetch from "../shared/hooks/useFetch";
import { useTheme } from "@emotion/react";
export default function ProfileRenderer({children}) {
    const authData = useContext(AuthContext);
    const theme = useTheme();
    let params = useParams();
    const [profile,setProfile] = useState({});
    const { data, loading, error } = useFetch(()=>  getProfile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsZWFzZSIsInN1YiI6Nywicm9sZXMiOlsiaGlrZXIiXSwiaWF0IjoxNzIyNzE3ODMzLCJleHAiOjE3MjI3MjE0MzN9.1RJqq0PjB5EeIwwfL9FWV7m9gMsYAC6SAGoSmQ3oFSI', params.profileId))
      /* useEffect(() => {
        const fetchProfile = async () => {
          try {
            const profile = await getProfile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsZWFzZSIsInN1YiI6Nywicm9sZXMiOlsiaGlrZXIiXSwiaWF0IjoxNzIyNjg0MjU1LCJleHAiOjE3MjI2ODc4NTV9.sXcwGdqphZPcnGdlR7EHQH7yVPzrmI2lzEunF_qAQ5I', params.profileId);
            setProfile(profile);
            console.log(profile);
          } catch (error) {
            console.error('Failed to fetch profile:', error);
          }
        };
        fetchProfile();
      }, [params.profileId]); */
      if (loading) return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}><Loader/></Box>;
      if (error) return <div>Error: {error}</div>;
    return (
      <>
            {Children.map(children, child =>
                cloneElement(child, { profile:data })
            )}
      </>
    );
}