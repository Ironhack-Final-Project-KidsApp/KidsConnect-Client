import React, { useState, useEffect } from "react";
import activityService from "../services/activity.services";
import SearchBar from "../components/SearchBar";
import ActivitiesList from "../components/ActivityList";

function AllActivities() {
  const [activitiesList, setActivitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery === "") {
      activityService.getAllActivities()
        .then((response) => {
          setActivitiesList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      activityService.getActivity(searchQuery)
        .then((response) => {
          setActivitiesList([response.data]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [searchQuery]);

  if (activitiesList.length === 0 && isLoading === false) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for activities"
      />
      {activitiesList.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <ActivitiesList activitiesList={activitiesList} isLoading={isLoading} />
      )}
    </div>
  );
}

export default AllActivities;