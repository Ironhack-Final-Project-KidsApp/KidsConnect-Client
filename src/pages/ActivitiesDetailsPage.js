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
import { Chip, Box } from '@mui/material';



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
            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "700", color: "#00000", fontSize: "2rem", textTransform: "uppercase", textAlign: "center" }}>
              {activity?.title}
            </Typography>         
    </CardContent>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt="activity img"
          height="300"
          width="auto"
          image={activity?.activityImage}
          style={{ objectFit: 'fill', maxWidth: '100%'}}
          sx={{
            '@media (min-width: 768px)': { height: 300, width: 'auto'}}}
        />
    </div>
            
      <CardContent>
          <Typography variant="body2" color="text.secondary" style={{textAlign:'end'}}>
            <Chip sx={{ bgcolor: "#FFD700", color: "#000000" }} label={activity?.author?.name ? `Author: ${activity.author.name}` : ''}/>        
          </Typography>
      </CardContent>
      
      <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Description:</span> {activity?.description}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Stroller Accessible:</span> {activity?.stroller ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Min. Age:</span> {activity?.ageMin}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Max. Age:</span> {activity?.ageMax}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Location:</span> {activity?.location}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Priced:</span> {activity?.priced ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Venue type:</span> {activity?.venuetype}
                    </p>
                    
                  </Typography>
                </Box>
              </CardContent>

            <Ratings idactivity={idactivity} />
          <FavoriteButton idactivity={idactivity} />

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