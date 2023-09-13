import { useState, useEffect } from "react";
import activityService from '../services/activity.services';
import SearchBar from "../components/Homepage/SearchBar";
import ActivityCard from "../components/Homepage/ActivityCard";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
  
function AllActivitiesList() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      activityService
        .getAllActivities()
        .then((response) => {
          setActivitiesList(response.data.reverse());
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
        // console.log(activitiesList.filter(fil => fil.lat).map(e=>{return {lat:e.lat, lng:e.lng}}))
    }, []);

   if (!isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <div>
      <SearchBar activitiesList={activitiesList} setActivitiesList={setActivitiesList} />

      {activitiesList.length === 0 ? (
          <p>No activities found</p>
      ) : (
          <Grid container spacing={2} justifyContent="flex-start" sx={{ margin: '2rem' }}>
              {activitiesList.map(activity => (
                  <Grid item key={activity._id} xs={12} sm={6} md={4} lg={3}>
                      <ActivityCard activity={activity} />
                  </Grid>
              ))}
          </Grid>
      )}
  </div>
);
}

export default AllActivitiesList;


