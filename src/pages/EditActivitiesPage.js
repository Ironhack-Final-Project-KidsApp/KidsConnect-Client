import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import activityService from "../services/activity.services";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import Autofillgoogle from "../components/CreateActivity/Autofillgoogle";
import './Homepage.css'

const EditActivitiesPage = () => {
    const navigate = useNavigate();
    const {idactivity} = useParams();
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [activity, setActivity] = useState({author: user._id})
    const [errorMessage, setError] = useState(null)
    const [location, setLocation] = useState(null)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null)

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
          .then((response) => {
            console.log("response is: ", response);
            setActivity({ ...activity, activityImage: response.data.fileUrl });
          })
          .catch((err) => {
            const errorMessage =
              err?.response?.data?.message ?? "Image upload failed.";
              setError(errorMessage);
          });
      };

    
    const handleSubmit = e =>{
        const storeActivity = activity;
        storeActivity.location = location;
        storeActivity.lat = lat;
        storeActivity.lng = lng;
        
        e.preventDefault();
        activityService.updateActivity(idactivity, storeActivity)
            .then(response => navigate(`/profile/${user._id}`))
            .catch(err=>setError(err.message));
        console.log(storeActivity)
    }


    useEffect(()=>{
        activityService.getActivity(idactivity)
            .then(response => setActivity(response.data))
    },[idactivity])

    return (
    <div className="app-background">
    <Container component="form" maxWidth="sm" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        {activity.title &&
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Edit Activity
            </Typography>
            {errorMessage && <Typography component="h1" variant="h4" align="center">{errorMessage}</Typography>}
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        variant="standard"
                        defaultValue={activity.title}
                        onChange={e=>setActivity({...activity, title: e.target.value})}
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
                        defaultValue={activity.ageMin}
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
                        defaultValue={activity.ageMax}
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
                        defaultValue={activity.description}
                        onChange={e=>setActivity({...activity, description: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autofillgoogle setLocation={setLocation} setLat={setLat} setLng={setLng} location={activity.location} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="venuetype"
                        select
                        name='venuetype'
                        label="Type of Venue"
                        fullWidth
                        required
                        helperText="Indoors or Outdoors"
                        variant="standard"
                        defaultValue={activity.venuetype}
                        onChange={e=>setActivity({...activity, venuetype: e.target.value})}
                    >
                        <MenuItem value=''></MenuItem>
                        <MenuItem value='indoor'>Indoor</MenuItem>
                        <MenuItem value='outdoor'>Outdoor</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="stroller" value="yes" checked={activity.stroller} />}
                        label="Stroller Accessible"
                        onChange={e=>setActivity({...activity, stroller: e.target.checked})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="priced" value="yes" checked={activity.priced} />}
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
        }
    </Container>
    </div>
    );
}
 
export default EditActivitiesPage;