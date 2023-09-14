import { useCallback, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Container, InputAdornment, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMaps from "./GoogleMaps";
import AdvanceSearch from "./AdvanceSearch";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState({title: '', stroller: '', age:0, venuetype: '', priced:''});
  const [searchDB] = useState(props.activitiesList);
  const [advanceSearch, setAdvance] = useState(false);
  const [mapSearch, setMap] = useState(false)
  const { setActivitiesList } = props;

  const handleSearchChange = useCallback((item) => {
    const filterbyactivity = searchDB.filter(activity =>{
    if(item.title.length > 0 && !activity.title.toLowerCase().includes(item.title.toLowerCase())){return false}
    else if(item.stroller.length > 0 && !(activity.stroller.toString() === item.stroller.toString())){return false}
    else if(item.age > 0 && !(activity.ageMin <= item.age && activity.ageMax >= item.age)){return false}
    else if(item.venuetype.length > 0 && !(activity.venuetype.toString() === item.venuetype.toString())){return false}
    else if(item.priced.length > 0 && !(activity.priced.toString() === item.priced.toString())){return false}
    else{return true}
    });
    setActivitiesList(filterbyactivity);
  },[searchDB,setActivitiesList])

  useEffect(()=>{
    // console.log(searchTerm.age)
    handleSearchChange(searchTerm);
  }, [searchTerm,handleSearchChange])

  return (
    <div>
      {/* <Container sx={{paddingBottom:'20px'}}>
        <GoogleMaps activity={props.activitiesList.filter(fil => fil.lat).map(e=>{return {lat:e.lat, lng:e.lng, _id:e._id}})} />
      </Container> */}
      <Container>
        <TextField
          id="outlined-search" 
          label="Search field" 
          type="search" 
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchTerm({...searchTerm, title: e.target.value})}
        />
        <Accordion onChange={()=>setMap(!mapSearch)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>See on Google Maps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GoogleMaps activity={props.activitiesList.filter(fil => fil.lat).map(e=>{return {lat:e.lat, lng:e.lng, _id:e._id}})} />
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={()=>setAdvance(!advanceSearch)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Advance Search</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdvanceSearch
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          </AccordionDetails>
        </Accordion>
      </Container>      
    </div>
  );
}

export default SearchBar;