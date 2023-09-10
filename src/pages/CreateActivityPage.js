import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import activityService from "../services/activity.services";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import GoogleMapsAutofill from "../components/GoogleMapsAutofill";

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const [activity, setActivity] = useState({author: user._id})
  const [errorMessage, setError] = useState(null)

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

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
      activityService.createActivity(activity)
        .then(response => navigate(`/profile/${user._id}`))
        .catch(err=>setError(err.message));
      console.log(activity)
  }

  return (
    <Container component="form" maxWidth="sm" sx={{ mb: 4 }} onSubmit={handleSubmit}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        Create Activity
      </Typography>
      <Typography component="h1" variant="h4" align="center">
        {errorMessage}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            required
            onChange={e=>setActivity({...activity, title: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type='number'
            InputProps={{ inputProps: { min: 0 }}}
            id="ageMin"
            name="ageMin"
            label="Minimum Age"
            fullWidth
            variant="standard"
            onChange={e=>setActivity({...activity, ageMin: e.target.value})}
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
            onChange={e=>setActivity({...activity, ageMax: e.target.value})}
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
            variant="filled"
            fullWidth
            onChange={e=>setActivity({...activity, description: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="venuetype"
            select
            name='venuetype'
            label="Type of Venue"
            defaultValue=""
            fullWidth
            required
            helperText="Indoors or Outdoors"
            variant="standard"
            onChange={e=>setActivity({...activity, venuetype: e.target.value})}
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='indoor'>Indoor</MenuItem>
            <MenuItem value='outdoor'>Outdoor</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <GoogleMapsAutofill activity={activity} setActivity={setActivity} />
          {/* <TextField
            id="location"
            name="location"
            label="Location"
            fullWidth
            required
            variant="standard"
            onChange={e=>setActivity({...activity, location: e.target.value})}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="stroller" value="yes" />}
            label="Stroller Accessible"
            onChange={e=>setActivity({...activity, stroller: e.target.checked})}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="priced" value="yes" />}
            label="Requires Payment"
            onChange={e=>setActivity({...activity, priced: e.target.checked})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
            onChange={e=>handleFileUpload(e)}
          >
            Upload an image
            <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" />
          </Button>
          {activity.activityImage &&<CheckIcon color='success'/>}
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