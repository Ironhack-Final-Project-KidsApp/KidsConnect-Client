import { Link } from "react-router-dom";

<<<<<<< HEAD
function ActivityCard({ activity }) {
  return (
    <div key={activity._id}>
      <img src={activity.image} alt="activity-img" />
      <Link to={`/activity/${activity._id}`}>
        <h1>{activity.name}</h1>
      </Link>
      <h2>{activity.title}</h2>
      <p>Created by: {activity.author}</p>
    </div>
  );
}

=======
const ActivityCard = (props) => {
    return (
        <div><Link to={`/activity/${props.item._id}`}>{props.item.title}</Link></div>
    );
}
 
>>>>>>> d7282c77d8d7ea2d8d49fc5a1bdee776e5b0dd10
export default ActivityCard;