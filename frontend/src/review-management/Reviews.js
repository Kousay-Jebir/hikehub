import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context/AuthContext";
import getEventReviews from "../api/review-management/services/getEventReviews.js";
import EventReview from "./EventReview";

export default function Reviews({eventId}) {
    const authData = useContext(AuthContext)
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
    }, [authData.user.accessToken,eventId]); // Add eventId to the dependency array

    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
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