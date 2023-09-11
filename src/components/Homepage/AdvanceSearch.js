import { Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";

const AdvanceSearch = ({setSearchTerm, searchTerm}) => {
    return (
        
        <FormControl fullWidth>
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <FormLabel id="demo-radio-buttons-group-label">Stroller</FormLabel>
                    <RadioGroup
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={e=>setSearchTerm({...searchTerm, stroller: e.target.value})}
                    >
                        <FormControlLabel value="" control={<Radio />} label="Any" />
                        <FormControlLabel value="true" control={<Radio />} label="Accessible" />
                        <FormControlLabel value="false" control={<Radio />} label="Not Accessible" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormLabel id="demo-radio-buttons-group-label">Venue Type</FormLabel>
                    <RadioGroup
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={e=>setSearchTerm({...searchTerm, venuetype: e.target.value})}
                    >
                        <FormControlLabel value="" control={<Radio />} label="Any" />
                        <FormControlLabel value="indoor" control={<Radio />} label="Indoor" />
                        <FormControlLabel value="outdoor" control={<Radio />} label="Outdoor" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormLabel id="demo-radio-buttons-group-label">Priced</FormLabel>
                    <RadioGroup
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={e=>setSearchTerm({...searchTerm, priced: e.target.value})}
                    >
                        <FormControlLabel value="" control={<Radio />} label="Any" />
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField
                        id="age"
                        label="Age"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e=>setSearchTerm({...searchTerm, age: e.target.value})}
                    />
                </Grid>
            </Grid>
        </FormControl>
        
    );
}
 
export default AdvanceSearch;