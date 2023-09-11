import { useNavigate } from "react-router";
import activityService from "../../services/activity.services";

const DeleteActivity = (props) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        await activityService.deleteActivity(props.idactivity);
        navigate(`/profile/${props.userid}`)
    };

    
    return (
        <button onClick={handleClick}>Delete Activity</button>
    );
}
 
export default DeleteActivity;