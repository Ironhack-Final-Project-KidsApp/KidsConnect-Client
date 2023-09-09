import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import activityService from "../services/activity.services";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Paper, Step, Stepper, TextField, Typography } from "@mui/material";

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const [activity, setActivity] = useState({author: user._id})
  const [errorMessage, setError] = useState(null)

    const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("activityImage", e.target.files[0]);
    activityService
      .uploadActivityImage(uploadData)
      .then(response => {
        console.log("response is: ", response);
        setActivity({...activity, activityImage: response.data.fileUrl});
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message ?? "Image upload failed.";
        setError(errorMessage);
      });
    }

  const handleSubmit = e =>{
      e.preventDefault();
      // activityService.createActivity(activity)
      //     .then(response => navigate(`/profile/${user._id}`))
      //     .catch(err=>setError(err.message));
      console.log(activity)
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        Create Activity
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type='number'
            InputProps={{ inputProps: { min: 0 } }}
            id="ageMin"
            name="ageMin"
            label="Minimum Age"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type='number'
            InputProps={{ inputProps: { min: 0 } }}
            id="ageMax"
            name="ageMax"
            label="Maximum Age"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            rows={10}
            id="description"
            name="description"
            label="Description"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="location"
            name="location"
            label="Location"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Create Activity
      </Button>
    </Paper>
  </Container>
      // <div>
      //     <form action="" onSubmit={handleSubmit}>
      //       <h2>Create Activity:</h2>
      //         <label htmlFor="">Title:</label>
      //         <input type="text" onChange={e => setActivity({...activity, title: e.target.value})} required={true} />
      //         <label htmlFor="">Description</label>
      //         <input type="text" onChange={e => setActivity({...activity, description: e.target.value})} required />
      //         <label htmlFor="">Stroller Accesible:</label>
      //         <input type="checkbox" onChange={e => setActivity({...activity, stroller: e.target.checked})} />
      //         <label htmlFor="">Minimum Age:</label>
      //         <input type="number" name="" id="" min={0} onChange={e => setActivity({...activity, ageMin:e.target.value})} />
      //         <label htmlFor="">Maximum Age:</label>
      //         <input type="number" name="" id="" min={0} onChange={e => setActivity({...activity, ageMax:e.target.value})} />
      //         <label htmlFor="">Location:</label>
      //         <input type="text" name="" id="" onChange={e=> setActivity({...activity, location:e.target.value})} />
      //         <label htmlFor="">Venue Type:</label>
      //         <select name="" id="" onChange={e=>setActivity({...activity, venuetype:e.target.value})} required>
      //             <option value=""></option>
      //             <option value="outdoor">Outdoor</option>
      //             <option value="indoor">Indoor</option>
      //         </select>
      //         <br />
      //         <label htmlFor="">Priced:</label>
      //         <input type="checkbox" onChange={e => setActivity({...activity, priced: e.target.checked})} />
      //         <br />
      //         <label htmlFor="">Image:</label>
      //         <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />

      //         {/* <label htmlFor="">Event</label>
      //         <input type="text" name="" id="" onChange={e=> setActivity({...activity, event:e.target.value})} />*/}

      //         <button type="submit">Create Activity</button>
      //     </form>
      //     {error && <div>{error}</div>}
      // </div>
  );
}

export default CreateActivityPage;