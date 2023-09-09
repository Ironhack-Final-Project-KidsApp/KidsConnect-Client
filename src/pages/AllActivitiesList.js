import { useState, useEffect } from "react";
import activityService from '../services/activity.services';
import SearchBar from "../components/SearchBar";
import ActivityCard from "../components/ActivityCard";
import './AllActivitiesList.css';
  
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
    }, []);
    if (!isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <SearchBar activitiesList={activitiesList} setActivitiesList={setActivitiesList} />
  
        {activitiesList.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div className="card-container">

          {activitiesList.map(activity => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllActivitiesList;


