import React, { useState, useEffect } from "react";
import activityService from "../services/activity.services";
import SearchBar from "../components/SearchBar";
import ActivitiesList from "../components/ActivityList";

function AllActivities() {
  const [activitiesList, setActivitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    activityService.getAllActivities()
      .then((response) => {
        setActivitiesList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ActivitiesList activitiesList={activitiesList} isLoading={isLoading} />
    </div>
  );
}

export default AllActivities;