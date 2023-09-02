import { useState, useEffect } from "react";
import activityService from '../services/activity.services';
import SearchBar from "../components/SearchBar";
import ActivityCard from "../components/ActivityCard";
  
function AllActivitiesList() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      activityService
        .getAllActivities()
        .then((response) => {
          setActivitiesList(response.data);
          setSearchResults(response.data);
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleSearch = (searchTerm) => {
      const filteredActivities = activitiesList.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const updatedActivities = searchTerm === "" ? activitiesList : filteredActivities;
      setSearchResults(updatedActivities);
    };

  
    if (!isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <SearchBar onSearch={(e) => handleSearch(e.target.value)} />
  
        {searchResults.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div>
          {searchResults.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllActivitiesList;


