import React, { useState ,useEffect} from 'react';
import { ListItem, Avatar, ListItemText, Checkbox, Tooltip, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for requests

export default function Participant({ participant, eventEndDate ,setAttendance}) {
    const [checked, setChecked] = useState(participant.didAttend);
    const currentDate = new Date();
    const endDate = new Date(eventEndDate);
    const isEventEnded = currentDate > endDate;


    useEffect(() => {
        setChecked(participant.didAttend);
    }, [participant.didAttend]);
    const handleCheckboxChange = async (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        setAttendance(participant.userProfileId,newChecked)
    };

    return (
        <ListItem key={participant.id}>
            <Avatar src={participant.avatar} alt={participant.name} sx={{ mr: 2 }} />
            <ListItemText
                primary={
                    <Link to={`/profiles/hiker/${participant.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {participant.userName}
                    </Link>
                }
                secondary={participant.joinedAt}
            />
            <Tooltip
                title={isEventEnded ? '' : 'This is used to mark attendance after the event ends'}
                placement="top"
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            disabled={!isEventEnded}
                        />
                    }
                    label="Mark Attendance"
                />
            </Tooltip>
        </ListItem>
    );
}
