import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import activityService from '../services/activity.services'

function AllActivitiesList() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        activityService
          .getAllActivities()
          .then((response) => {
            setActivitiesList(response.data);
            setIsLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);
  
    if (activitiesList.length === 0 && isLoading === false) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        {activitiesList.length === 0 ? (
          <p>No activities found</p>
        ) : (
          <div>
            {activitiesList.map((activity) => (
              <div key={activity._id}>
                <img src={activity.image} alt="activity-img" />
                <Link to={`/activity/${activity._id}`}>
                  <h1>{activity.name}</h1>
                </Link>
                <h2>{activity.title}</h2>
                <p>Created by: {activity.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default AllActivitiesList;