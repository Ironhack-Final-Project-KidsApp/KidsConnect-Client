import { useState } from "react";
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(searchTerm);
  };

  return (
    <div>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <FaSearch id='search-icon'/>
        <input placeholder="Search for activities..." type="text"
          value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
      </form>
      
    </div>
  );
}

export default SearchBar;