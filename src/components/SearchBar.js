import { useEffect, useState } from "react";
import './SearchBar.css'
import { Search } from "@mui/icons-material";

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

  const handleSearchChange = (item) => {
    const filterbyactivity = searchDB.filter(activity =>{
    // if(item.title.length === 0 && item.stroller.length === 0){return true}
    if(item.title.length > 0 && !activity.title.toLowerCase().includes(item.title.toLowerCase())){return false}
    else if(item.stroller.length > 0 && !(activity.stroller.toString() === item.stroller.toString())){return false}
    else if(item.age > 0 && !(activity.ageMin <= item.age && activity.ageMax >= item.age)){return false}
    else if(item.venuetype.length > 0 && !(activity.venuetype.toString() === item.venuetype.toString())){return false}
    else if(item.priced.length > 0 && !(activity.priced.toString() === item.priced.toString())){return false}
    else{return true}
    });
    props.setActivitiesList(filterbyactivity);
  };

  useEffect(()=>{
    // console.log(searchTerm.age)
    handleSearchChange(searchTerm);
  }, [searchTerm])



  return (
    <div>
      <form
      //className="input-wrapper"
      // onSubmit={handleSubmit}
      >
        <Search></Search>

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