import { useEffect, useState } from "react";
// import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState({title: '', stroller: '', age:0, venuetype: '', priced:''});
  const [searchDB] = useState(props.activitiesList);
  const [advanceSearch, setAdvance] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   onSearch(searchTerm);
  // };

  const handleSearchChange = () => {
    const filterbyactivity = searchDB.filter(activity =>{
    // if(searchTerm.title.length === 0 && searchTerm.stroller.length === 0){return true}
    if(searchTerm.title.length > 0 && !activity.title.toLowerCase().includes(searchTerm.title.toLowerCase())){return false}
    else if(searchTerm.stroller.length > 0 && !(activity.stroller.toString() === searchTerm.stroller.toString())){return false}
    else if(searchTerm.age > 0 && !(activity.ageMin <= searchTerm.age && activity.ageMax >= searchTerm.age)){return false}
    else if(searchTerm.venuetype.length > 0 && !(activity.venuetype.toString() === searchTerm.venuetype.toString())){return false}
    else if(searchTerm.priced.length > 0 && !(activity.priced.toString() === searchTerm.priced.toString())){return false}
    else{return true}
    });
    props.setActivitiesList(filterbyactivity);
  };

  useEffect(()=>{
    console.log(searchTerm.age)
    handleSearchChange();
  },[searchTerm])
  

  return (
    <div>
      <form
      //className="input-wrapper"
      // onSubmit={handleSubmit}
      >
        {/* <FaSearch id='search-icon'/> */}
        <input placeholder="Search for activities..." type="search"
          // value={searchTerm}
          onChange={(e) => setSearchTerm({...searchTerm, title: e.target.value})} />
        <button onClick={e=>{e.preventDefault(); setAdvance(!advanceSearch)}}>Advance</button> <br />
        {advanceSearch && 
        <>
        <label htmlFor="">Stroller</label>
        <input type="radio" name="stroller" id="" value='' onChange={e=>setSearchTerm({...searchTerm, stroller: e.target.value})}/><label htmlFor="">Any</label>
        <input type="radio" name="stroller" id="" value='false' onChange={e=>setSearchTerm({...searchTerm, stroller: e.target.value})}/><label htmlFor="">No</label>
        <input type="radio" name="stroller" id="" value='true' onChange={e=>setSearchTerm({...searchTerm, stroller: e.target.value})}/><label htmlFor="">Yes</label>
        <br />
        <label htmlFor="">Age</label>
        <input type="number" name="" id="" min={0} onChange={e=>setSearchTerm({...searchTerm, age: e.target.value})}/>
        <br />
        <label htmlFor="">Venue Type</label>
        <input type="radio" name="venuetype" id="" value='' onChange={e=>setSearchTerm({...searchTerm, venuetype: e.target.value})}/><label htmlFor="">Any</label>
        <input type="radio" name="venuetype" id="" value='indoor' onChange={e=>setSearchTerm({...searchTerm, venuetype: e.target.value})}/><label htmlFor="">Indoor</label>
        <input type="radio" name="venuetype" id="" value='outdoor' onChange={e=>setSearchTerm({...searchTerm, venuetype: e.target.value})}/><label htmlFor="">Outdoor</label>
        <label htmlFor="">Priced</label>
        <input type="radio" name="priced" id="" value='' onChange={e=>setSearchTerm({...searchTerm, priced: e.target.value})}/><label htmlFor="">Any</label>
        <input type="radio" name="priced" id="" value='true' onChange={e=>setSearchTerm({...searchTerm, priced: e.target.value})}/><label htmlFor="">Yes</label>
        <input type="radio" name="priced" id="" value='false' onChange={e=>setSearchTerm({...searchTerm, priced: e.target.value})}/><label htmlFor="">No</label>
        </>}
        

      </form>
      
    </div>
  );
}

export default SearchBar;