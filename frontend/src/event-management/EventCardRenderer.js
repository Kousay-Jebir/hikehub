import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context/AuthContext";
import { useParams } from "react-router-dom";
import getEvent from "../api/event-management/services/getEvent";
import { Box } from "@mui/material";
import Loader from "../shared/components/Loader";
import { Children, cloneElement } from "react";
import useFetch from "../shared/hooks/useFetch";
import { useTheme } from "@emotion/react";
import getUserId from "../api/profile-management/services/getUserId";
import getOrganizatorId from "../api/profile-management/services/getOrganizatorId";

export default function EventCardRenderer({ children, id }) {
    const authData = useContext(AuthContext);
    const theme = useTheme();
    const params = useParams();
    const eventId = id || params.eventId;

    const [profile, setProfile] = useState({});
    const { data, loading, error } = useFetch(() => getEvent(authData.user.accessToken, eventId));

    const [isEventOwner, setIsEventOwner] = useState(false);

    useEffect(() => {
        if (data && data.organizerId) {
            const checkOwnership = async () => {
                try {
                    const organizerId = await getOrganizatorId(authData.user.accessToken, authData.user.userId);
                    setIsEventOwner(data.organizerId === organizerId);
                    console.log("organizerId is"+ authData.user.userId)
                } catch (error) {
                    console.error('Failed to fetch organizer ID:', error);
                }
            };
            checkOwnership();
        }
    }, [data, authData.user.accessToken, authData.user.userId]);

    if (loading) {
        return (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <Loader />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No event data available</div>;
    }

    return (
        <>
            {Children.map(children, child =>
                cloneElement(child, { event: data, isEventOwner })
            )}
        </>
    );
}
