import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/FavoriteButton";

const ActivitiesDetailsPage = () => {
    const { idactivity } = useParams();
    const [activity, setActivity] = useState(null);
    
    useEffect(() => {
      activityService.getActivity(idactivity)
      .then((response) => {
        console.log(response.data)
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [idactivity])

    if (!activity) {
      return <p>Loading...</p>;
    }
    
return (
        <div>
            {activity && (
                <>
                    <img src={activity?.image} alt="activity-img" />
                    <h1>{activity?.title}</h1>
                    <p>Description: {activity?.description}</p>
                    <p>Stroller: {activity?.stroller}</p>
                    <p>Min. Age: {activity?.ageMin}</p>
                    <p>Max. Age: {activity?.ageMax}</p>
                    <p>Location: {activity?.location}</p>
                    <FavoriteButton idactivity={idactivity}/>
                </>
            )}
        </div>
    );
};

export default ActivitiesDetailsPage;