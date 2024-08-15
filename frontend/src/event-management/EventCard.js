import React, { useContext, useReducer } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventIcon from '@mui/icons-material/Event';
import HikeCard from '../hike-management/HikeCard';
import ParticipantsModal from '../participation-management/ParticipantsModal';
import { useTheme } from '@emotion/react';
import Reviews from '../review-management/Reviews';
import { Button, TextField, Rating } from '@mui/material';
import participate from '../api/participation-management/services/participate';
import AuthContext from '../auth/context/AuthContext';
import getUserProfile from '../api/profile-management/services/getUserProfile';
import postReview from '../api/review-management/services/postReview';
import { useNotificationError, useNotificationSuccess } from '../shared/context/NotificationContext';

// Reducer function
const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_COMMENT':
      return { ...state, comment: action.payload };
    case 'TOGGLE_REVIEW_FORM':
      return { ...state, showReviewForm: !state.showReviewForm };
    case 'SUBMIT_REVIEW':
      console.log('Review submitted with rating:', state.rating);
      console.log('Review comment:', state.comment);
      return { ...state, rating: 0, comment: '', showReviewForm: false };
    default:
      return state;
  }
};

// Initial state for the reducer
const initialState = {
  rating: 0,
  comment: '',
  showReviewForm: false,
};

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

const EventCard = ({ event, isEventOwner, isParticipation }) => {
  const setSuccess = useNotificationSuccess();
  const setError = useNotificationError();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const showSuccess = useNotificationSuccess();
  const showError = useNotificationError();
  const authData = useContext(AuthContext);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewParticipants = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleParticipateClick = async () => {
    try {
      const profileId = (await getUserProfile(authData.user.accessToken, authData.user.userId)).id;
      const response = await participate(authData.user.accessToken, event.id, profileId);
      setSuccess("Your participation is successful !");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleRatingChange = (event, newValue) => {
    dispatch({ type: 'SET_RATING', payload: newValue });
  };

  const handleCommentChange = (event) => {
    dispatch({ type: 'SET_COMMENT', payload: event.target.value });
  };

  const handleReviewFormToggle = () => {
    dispatch({ type: 'TOGGLE_REVIEW_FORM' });
  };

  const handleReviewSubmit = async () => {
    try{
    const profileId = (await getUserProfile(authData.user.accessToken, authData.user.userId)).id;
    const response = await postReview(authData.user.accessToken,event.id,profileId,state.rating,state.comment)
    dispatch({ type: 'SUBMIT_REVIEW' });
    showSuccess('Review posted successfully');
    }
    catch(error){
      showError(error.response.data.message)
      console.log(error.response.data.message)
    }
  };

  return (
    <Card sx={{ margin: '20px', border: `2px solid ${theme.palette.primary.main}` }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            <EventIcon />
          </Avatar>
        }
        action={
          isEventOwner ? (
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleViewParticipants}>View Participants</MenuItem>
              </Menu>
            </>
          ) : (
            !isParticipation ? <Button onClick={handleParticipateClick}>Participate</Button> : <Button onClick={handleReviewFormToggle}>Add Review</Button>
          )
        }
        title={event.title}
        titleTypographyProps={{ variant: 'h5' }}
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
      <ParticipantsModal
        open={isModalOpen}
        onClose={handleModalClose}
        event={event}
      />
      {!isEventOwner && <Reviews eventId={event.id} />}
      {isParticipation && !isEventOwner && state.showReviewForm && (
        <CardContent>
          <Typography variant="h6">Submit Your Review</Typography>
          <Rating
            value={state.rating}
            onChange={handleRatingChange}
            size="large"
            precision={0.5}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={state.comment}
            onChange={handleCommentChange}
          />
          <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default EventCard;
