import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/FavoriteButton";
import Ratings from "../components/Ratings";
import { AuthContext } from "../context/auth.context";
import DeleteActivity from "../components/DeleteActivity";
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


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
    return <p>Loading...</p>;
  }

  return (
    <div>
    <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <Card sx={{ width: '90%', margin:8, background: "#c0c1c014"}}>
    
    {activity && (
      <>
    <CardContent>
            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "700", color: "#00000", fontSize: "2rem", textTransform: "uppercase" }}>
              {activity?.title}
            </Typography>         
    </CardContent>

    <CardMedia
          component="img"
          alt="itinerary pic"
          height="600"
          image={activity?.activityImage}
          style={{objectFit:'cover'}}
        /> 
            

      
    
          <p>Description: {activity?.description}</p>
          <p>Stroller Accesible: {activity?.stroller ? "Yes" : "No"}</p>
          <p>Min. Age: {activity?.ageMin}</p>
          <p>Max. Age: {activity?.ageMax}</p>
          <p>Location: {activity?.location}</p>
          <p>Priced: {activity?.priced ? "Yes" : "No"}</p>
          <p>Venue type: {activity?.venuetype}</p>
          <FavoriteButton idactivity={idactivity} />
          <Ratings idactivity={idactivity} />
          {activity?.author?.name && <p>Author: {activity.author.name}</p>}
          {activity.author?._id === user._id ?
          <div>
            <DeleteActivity idactivity={idactivity} userid={user._id} />
            <br />
            <Link to='./edit'><button>Edit Activity</button></Link>
          </div> :<></> }
        </>
      )}
      </Card>
      </Container>
    </div>
  );
};

export default ActivitiesDetailsPage;