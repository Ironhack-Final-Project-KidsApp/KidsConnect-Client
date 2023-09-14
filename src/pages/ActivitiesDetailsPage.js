import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/ActivityDetails/FavoriteButton";
import Ratings from "../components/ActivityDetails/Ratings";
import { AuthContext } from "../context/auth.context";
import DeleteActivity from "../components/ActivityDetails/DeleteActivity";
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Chip, Grid, Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import './Homepage.css';


const ActivitiesDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { idactivity } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    activityService.getActivity(idactivity)
      .then((response) => {
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [idactivity]);


  if (!activity) {
    return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
    <CircularProgress />
  </Box>
    );
  }

  return (
    <div className="app-background">
    <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
    <Card sx={{ width: '90%', margin:8, background: "rgba(255, 255, 255, 1)", '@media (min-width: 768px)': { width: '70%' }  }}>
    
    {activity && (
      <>
    <CardContent>
            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "700", color: "#00000", fontSize: "2rem", textTransform: "uppercase", textAlign: "center" }}>
              {activity?.title}
            </Typography> 
            <Box sx={{ textAlign: "center", mt: 2, }}>
              <FavoriteButton idactivity={idactivity} />
            </Box>     
    </CardContent>

    

    <Box display="flex" justifyContent="center" alignItems="center">
        <CardMedia
          component="img"
          alt="activity img"
          height="300"
          width="auto"
          image={activity?.activityImage}
          style={{ objectFit: 'fill', maxWidth: '100%' }}
          sx={{ '@media (min-width: 768px)': { height: 300, width: 'auto' },}}/>
      </Box>

      <CardContent>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      textAlign: 'right',
      marginRight: {
        xs: 0,
        sm: 0,
        md: '20%',
      },
    }}
  >
    <Chip
      sx={{ bgcolor: "#add8e6", color: "#000000" }}
      label={activity?.author?.name ? `By: ${activity.author.name}` : ''}
    />
  </Typography> 
      </CardContent>  

    <CardContent>
      <Divider Divider textAlign="center" style={{width:'100%'}}>
        DESCRIPTION
      </Divider>
      <Typography variant="body2" style={{textAlign: 'center'}}>
          {activity?.description}
      </Typography>
    </CardContent>


    <CardContent>
      <Divider style={{ textAlign: 'center', width: '100%' }}>
        DETAILS
      </Divider>
      <Typography variant="body2" style={{ textAlign: 'center' }}>
        <Typography variant="body2" fontWeight="bold">
          Stroller Accessible:
        </Typography>
        {activity?.stroller ? 'Yes' : 'No'}

        <Typography variant="body2" fontWeight="bold">
          Min. Age:
        </Typography>
        {activity?.ageMin}

        <Typography variant="body2" fontWeight="bold">
          Max. Age:
        </Typography>
        {activity?.ageMax}

        <Typography variant="body2" fontWeight="bold">
          Priced:
        </Typography>
        {activity?.priced ? 'Yes' : 'No'}

        <Typography variant="body2" fontWeight="bold">
          Venue type:
        </Typography>
        {activity?.venuetype}

        <Typography variant="body2" fontWeight="bold">
          Location:
        </Typography>
        {activity?.location}
      </Typography>
    </CardContent>


    <CardContent>
      <Divider style={{ textAlign: 'center', width: '100%' }}>
        RATING
      </Divider>
      <Grid container justifyContent="center">
      <Ratings idactivity={idactivity} />
      </Grid>
    </CardContent>
    
    <Box sx={{ textAlign: 'center', mt: 2, }}>
          {activity.author?._id === user._id ?
          <div>
            <DeleteActivity idactivity={idactivity} userid={user._id} />
            <br />
            <Button
              variant="contained"
              sx={{ mb: 2, width: '30%'}}
              component={Link}
              to="./edit"
              >
              Edit Activity
            </Button>
          </div> :<></> }
    </Box>
        </>
      )}

      </Card>
      </Container>
    </div>
  );
};

export default ActivitiesDetailsPage;