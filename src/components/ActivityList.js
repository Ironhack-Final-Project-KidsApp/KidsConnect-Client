import { Link } from "react-router-dom";

function ActivitiesList({ activitiesList, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : activitiesList.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div>
          {activitiesList.map((activity) => (
            <div key={activity._id}>
              <img src={activity.image} alt="activity-img" />
              <Link to={`/activity/${activity._id}`}>
                <h1>{activity.name}</h1>
              </Link>
              <h2>{activity.title}</h2>
              <p>Created by: {activity.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivitiesList;