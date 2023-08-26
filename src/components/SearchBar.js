function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for activities"/>
    );
  }
  
  export default SearchBar;