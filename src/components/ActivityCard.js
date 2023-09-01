import { Link } from "react-router-dom";

function ActivityCard({ activity }) {

  return (
    <div key={activity?._id}>
      <img src={activity?.image} alt="activity-img" />
      <Link to={`/activity/${activity?._id}`}>
        <h1>{activity?.title}</h1>
      </Link>
     { console.log('author:', activity)}
      <p>Created by: {activity?.author}</p>
    </div>
  );
} 

export default ActivityCard;