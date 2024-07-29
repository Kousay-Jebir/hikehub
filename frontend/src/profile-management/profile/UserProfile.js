import { useContext, useEffect, useState } from "react";
import getProfile from "../../api/profile-management/services/getProfile";
import AuthContext from "../../auth/context/AuthContext";

export default function UserProfile(){
    const authData = useContext(AuthContext);
    const [profile,setPorilfe] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile(authData.user.accessToken, authData.user.userId);
                setPorilfe(profile);
                console.log(profile)
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);
}