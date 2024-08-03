import { useContext, useEffect,useState } from "react";
import AuthContext from "../auth/context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import getProfile from "../api/profile-management/services/getProfile";
export default function HikerProfileRenderer() {
    const authData = useContext(AuthContext);
    let params = useParams();
    const [profile,setProfile] = useState({});
      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const profile = await getProfile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsZWFzZSIsInN1YiI6Nywicm9sZXMiOlsiaGlrZXIiXSwiaWF0IjoxNzIyNjgwOTA1LCJleHAiOjE3MjI2ODQ1MDV9.XVO7RODfFTOz94nkKpCB60gWfGY__z6VllpLArTZfJw', params.profileId);
            setProfile(profile);
            console.log(profile);
          } catch (error) {
            console.error('Failed to fetch profile:', error);
          }
        };
        fetchProfile();
      }, [params.profileId]);
}