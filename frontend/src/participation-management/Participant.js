import { ListItem,Avatar,ListItemText} from "@mui/material";
import { Link } from "react-router-dom";

export default function Participant({participant}){
    return (
        <ListItem key={participant.id}>
                  <Avatar src={participant.avatar} alt={participant.name} sx={{ mr: 2 }} />
                  <ListItemText primary={<Link to={`/profiles/hiker/${participant.userId}`} >{participant.userName}</Link>} secondary={participant.joinedAt}/>
                </ListItem>

    );
}