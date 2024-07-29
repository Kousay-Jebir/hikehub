import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventIcon from '@mui/icons-material/Event';
import HikeCard from '../hike-management/HikeCard';
import { useTheme } from '@emotion/react';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventCard = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{  margin: '20px',border:`2px solid ${theme.palette.primary.main}`}} elevation={0}>
      <CardHeader

        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            <EventIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={event.title}
        titleTypographyProps={{variant:'h5'}}
        subheader={`Starts: ${new Date(event.startDate).toLocaleString()}`}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>End Date: {new Date(event.endDate).toLocaleString()}</Typography>
          {event.hikes.map((hike) => (
            <HikeCard key={hike.id} hike={hike} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EventCard;
