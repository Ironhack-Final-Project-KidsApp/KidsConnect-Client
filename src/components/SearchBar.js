import { FaSearch } from 'react-icons/fa'
import './SearchBar.css';
import { useState } from 'react';
import AllActivitiesList from '../pages/AllActivitiesList';

function SearchBar({activitiesList}) {
    const [searchItem, setSearchItem] = useState("");
    const [filteredActivities, setFilteredActivities] = useState([]);


    const handleSearchInput = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered  = activitiesList.filter((activity) =>
        activity.name.toLowerCase().includes(searchText)
        );
        setFilteredActivities(filtered);
        setSearchItem(searchText);
      }; 

    return(

        <div>
            <div className="input-wrapper">
                <FaSearch id='search-icon'/>
                <input placeholder='Search for activities...' value={searchItem} onChange={handleSearchInput}/>
                
            </div>
            <AllActivitiesList activitiesList={searchItem ? filteredActivities : activitiesList} />
        </div>
    )
}

export default SearchBar;