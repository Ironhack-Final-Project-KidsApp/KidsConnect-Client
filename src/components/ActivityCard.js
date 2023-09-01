import { Link } from "react-router-dom";


function ActivityCard({ activity }) {
  return (
    <div key={activity?._id}>
      <img src={activity?.image} alt="activity-img" />
      <Link to={`/activity/${activity?._id}`}>
        <h1>{activity?.name}</h1>
      </Link>
      <h2>{activity?.title}</h2>
      <p>Created by: {activity?.author}</p>
      <Link to={`/activity/${activity?._id}`}>{activity?.title}</Link>
    </div>
  );
} 

export default ActivityCard;