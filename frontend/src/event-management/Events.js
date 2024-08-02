import { useContext, useEffect, useState } from "react";
import getOrganizatorEvents from "../api/event-management/services/getOrganizatorEvents";
import AuthContext from "../auth/context/AuthContext";
import EventCard from "./EventCard";
import Reviews from "../review-management/Reviews";

export default function Events() {
    const [events, setEvents] = useState([]);
    const authData = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getOrganizatorEvents(authData.user.accessToken, authData.user.userId);
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
                    <EventCard event={event} key={index} />
            ))}
        </div>
    );
}
