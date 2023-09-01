import { Link } from "react-router-dom";


/* ines code - function ActivityCard({ activity }) {
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
} */


const ActivityCard = (props) => {
    return (
        <div><Link to={`/activity/${props.item._id}`}>{props.item.title}</Link></div>
    );
}
 

export default ActivityCard;