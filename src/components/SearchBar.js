import { useState } from "react";
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <input placeholder="Search for activities..." type="text"
          value={searchTerm} onChange={handleSearchChange} />
          <button type="submit"><FaSearch id='search-icon'/></button>
      </form>
      
    </div>
  );
}

export default SearchBar;