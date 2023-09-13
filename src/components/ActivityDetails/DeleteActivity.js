import { useNavigate } from "react-router";
import activityService from "../../services/activity.services";
import { Button } from '@mui/material';


const DeleteActivity = (props) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        await activityService.deleteActivity(props.idactivity);
        navigate(`/profile/${props.userid}`)
    };

    return (
        <div>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 2, width: '30%' }}
                onClick={handleClick}
                >
                Delete Activity
            </Button>
        </div>   
    )
}
 
export default DeleteActivity;