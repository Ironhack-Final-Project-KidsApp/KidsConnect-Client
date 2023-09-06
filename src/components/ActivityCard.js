import { Link } from "react-router-dom";

function ActivityCard({ activity }) {

  return (
    <div key={activity?._id}>
      <img src={activity?.image} alt="activity-img" />
      <Link to={`/activity/${activity?._id}`}>
        <h1>{activity?.title}</h1>
      </Link>
      {activity.author.name ? <p>Created by: {activity.author.name}</p> : <></>}
    </div>
  );
} 

export default ActivityCard;