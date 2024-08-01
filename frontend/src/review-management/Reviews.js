import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context/AuthContext";
import getEventReviews from "../api/review-management/services/getEventReviews.js";
import EventReview from "./EventReview";

export default function Reviews({eventId}) {
    const authData = {user:{accessToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsZWFzZSIsInN1YiI6Nywicm9sZXMiOlsiaGlrZXIiXSwiaWF0IjoxNzIyNTE0ODgwLCJleHAiOjE3MjI1MTg0ODB9.MWFxeux8EJUU4lGVH6HsyZg8CP8ngASDmC_EHK05Ugo'}}
    const [reviews,setReviews] = useState([]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const result = await getEventReviews(authData.user.accessToken, eventId);
                setReviews(result);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [eventId]); // Add eventId to the dependency array

    return (
        <Box>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <EventReview key={index} review={review} />
                ))
            ) : (
                <Box>There are currently no reviews for this event</Box>
            )}
        </Box>
    );
}