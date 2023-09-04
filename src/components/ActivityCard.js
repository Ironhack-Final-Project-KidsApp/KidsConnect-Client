import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function ActivityCard({ activity }) {

  return (
    <div key={activity?._id}>
      <img src={activity?.image} alt="activity-img" />
      <Link to={`/activity/${activity?._id}`}>
        <h1>{activity?.title}</h1>
      </Link>
     {/* { console.log('author:', activity.author)} */}
      <p>Created by: {activity?.author?.name}</p>
      <FavoriteButton idactivity={activity?._id} />
    </div>
  );
} 

export default ActivityCard;