import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import userService from '../services/user.services';
import activityService from '../services/activity.services';
import { AuthContext } from '../context/auth.context';

const ActivitiesDetailsPage = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const params = useParams();
    const { idactivity } = params;
    const [activity, setActivity] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Function to fetch activity details by ID
    const fetchActivityDetails = async () => {
        try {
            const response = await activityService.getActivity(idactivity);
            setActivity(response.data);
        } catch (error) {
            console.error("Error fetching activity details:", error);
        }
    };

    // Function to toggle favorite status
    const toggleFavorite = async () => {
        try {
            // Call the toggleFavorite API endpoint
            await userService.toggleFavorite(idactivity);

            // Update the isFavorite state
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    useEffect(() => {
        fetchActivityDetails();
        // Check if the activity is in the user's favorites and update isFavorite state accordingly
        if (user && user.favorite.includes(idactivity)) {
            setIsFavorite(true);
        }
    }, [idactivity, user]);

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
                    <button onClick={toggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ActivitiesDetailsPage;