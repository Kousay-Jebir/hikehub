import { useTheme } from "@emotion/react";
import { Box, Typography,Avatar,Rating,Divider} from "@mui/material";
import { useState } from "react";

export default function EventReview({review}) {
    console.log(review.stars)
    const theme = useTheme()
    return(
        <Box p={2} border={`2px solid ${theme.palette.primary.main}`} borderRadius={2} display={'flex'} flexDirection={'column'} gap={2}>
            <Box display='flex' alignItems={"center"} justifyContent={'space-between'} flexWrap={'wrap'}>
                <Box display={'flex'} gap={1} alignItems={'center'} flexWrap={'wrap'}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography variant="string">{review.userName}</Typography>
                </Box>
                <Typography variant="body2">{review.createdAt}</Typography>
            </Box>
            <Rating name="read-only" value={review.stars} readOnly  precision={0.5}/>
            <Divider/>
            <Typography>{review.comment}</Typography>
        </Box>
    );
}