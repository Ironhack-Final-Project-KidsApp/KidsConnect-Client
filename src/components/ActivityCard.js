import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function ActivityCard({ activity }) {
  const authorName = activity?.author?.name || 'Unknown Author';

  return (
    <Card sx={{ width: 250, margin: '10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={activity?.activityImage}
          alt="activity-img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {activity?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Created by:{authorName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        <Link to={`/activity/${activity?._id}`}>Check activity!</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default ActivityCard;
