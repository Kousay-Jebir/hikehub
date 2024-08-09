import { POST_REVIEW } from "../routes";

export default async function postReview(accessToken,eventId,userProfileId,stars,comment){
    try {
        const response = await axios.post(POST_REVIEW,
          {userProfileId,eventId,stars,comment
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error) {
        // Handle error (e.g., show an alert or log it)
        throw error;
      }
}