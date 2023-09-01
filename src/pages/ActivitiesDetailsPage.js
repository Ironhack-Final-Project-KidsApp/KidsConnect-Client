import { useParams } from "react-router-dom";
import activityService from "../services/activity.services";
import { useEffect, useState } from "react";

const ActivitiesDetailsPage = () => {
    const params = useParams();
    const {idactivity} = params;
    const [activity, setActivity] = useState(null);
    
    useEffect(()=>{
        activityService.getActivity(idactivity)
            .then(response => setActivity(response.data))
    },[idactivity])
    

    return (
        <div>
            {activity&&<>
                <img src={activity.image} alt="" />
                <h1>{activity.title}</h1>
            </>}
        </div>
    );
}
 
export default ActivitiesDetailsPage;