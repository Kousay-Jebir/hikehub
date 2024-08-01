import { useTheme } from "@emotion/react";
import { Box, Typography,Avatar,Rating,Divider} from "@mui/material";
import { useState } from "react";

export default function EventReview() {
    const [value, setValue] = useState(3.5);
    const theme = useTheme()
    return(
        <Box p={2} border={`2px solid ${theme.palette.primary.main}`} borderRadius={2} display={'flex'} flexDirection={'column'} gap={2}>
            <Box display='flex' alignItems={"center"} justifyContent={'space-between'} flexWrap={'wrap'}>
                <Box display={'flex'} gap={1} alignItems={'center'} flexWrap={'wrap'}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography variant="string">Username</Typography>
                </Box>
                <Typography variant="body2">15-07-2024 10AM</Typography>
            </Box>
            <Rating name="read-only" value={value} readOnly />
            <Divider/>
            <Typography>This event was really great i just didn't like how the organizer didn't measure the difficulity well otherwise i enjoyed it</Typography>
        </Box>
    );
}