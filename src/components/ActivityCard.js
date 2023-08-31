import { Link } from "react-router-dom";

const ActivityCard = (props) => {
    return (
        <div><Link to={`/activity/${props.item._id}`}>{props.item.title}</Link></div>
    );
}
 
export default ActivityCard;