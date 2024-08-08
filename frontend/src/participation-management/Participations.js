import { useContext, useEffect, useState } from "react";
import getOrganizatorEvents from "../api/event-management/services/getOrganizatorEvents";
import AuthContext from "../auth/context/AuthContext";
import EventCard from "../event-management/EventCard";
import Reviews from "../review-management/Reviews";
import getHikerParticipations from "../api/participation-management/services/getHikerParticipations";
import getUserProfile from "../api/profile-management/services/getUserProfile";

export default function Participations() {
    const [events, setEvents] = useState([]);
    const authData = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const profileId = (await getUserProfile(authData.user.accessToken,authData.user.userId)).id;
                const events = await getHikerParticipations(authData.user.accessToken,profileId );
                setEvents(events);
                console.log(events)
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            {events.map((event, index) => (
                    <EventCard event={event} key={index} isEventOwner={false} isParticipation={true}/>
            ))}
        </div>
    );
}
