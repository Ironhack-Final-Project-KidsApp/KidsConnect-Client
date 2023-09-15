import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import userService from '../services/user.services';
import ActivityCard from '../components/Homepage/ActivityCard';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './Homepage.css'

function ProfilePage() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [userProfile, setUser] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [userActivity, setActivity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFileUpload = (e) => {
    //console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
  
    uploadData.append("image", e.target.files[0]);
  
    userService
      .uploadImage(uploadData)
      .then(response => {
        //console.log("response is: ", response);
        setUser({...userProfile, image: response.data.fileUrl});
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userService
      .updateUser({id: user._id, image: userProfile.image})
      .then(response => {
        //console.log("response: ", response);
        setShowUpload(!showUpload);
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  };

  useEffect(() => {
    userService.getUser(user._id)
      .then(response => {
        //console.log("response is:", response.data.favorite)
        setUser({favorite: response.data.favorite.reverse(), image: response.data.image})
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
    userService.getActivity(user._id)
      .then(response => {
        setActivity(response.data.reverse())
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  }, [user._id])

  return (
    <div className="app-background">
    <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
      {errorMessage && <p>{errorMessage}</p>}
      {(!user && (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', top: 'calc(50% - 93px)', position: 'absolute' }}>
          <CircularProgress />
        </Box>
      )) || (
        <>
          <Card style={{ width: '70%' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
              <Typography sx={{ fontWeight: "700", color: "#000000", fontSize: "2rem", textTransform: "uppercase", marginTop: '8px' }} gutterBottom variant="h4" component="div">
                {user.name}'s Profile
              </Typography>

              {userProfile.image ? (
                <Avatar
                  sx={{ width: 90, height: 90, margin: '8px' }}
                  alt="Remy Sharp"
                  src={userProfile.image}
                />
              ) : (
                <Avatar
                  sx={{ width: 90, height: 90, margin: '8px' }}
                  alt="Remy Sharp"
                >
                </Avatar>
              )}

              <Grid item container xs={12} justifyContent="center" style={{ margin: '8px 8px 8px 0px' }} sx={{ pl: 2 }}>
                {!showUpload && (
                  <Button
                    variant="raised"
                    component="span"
                    sx={{ bgcolor: '#add8e6' }}
                    startIcon={<AddPhotoAlternateIcon />}
                    onClick={() => setShowUpload(!showUpload)}
                  >
                    Image
                  </Button>
                )}
                {showUpload && (
                  <form onSubmit={handleSubmit}>
                    <Input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={(e) => handleFileUpload(e)}
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="raised" component="span" sx={{ bgcolor: '##add8e6' }} startIcon={<AddPhotoAlternateIcon />}>
                        Upload Image
                      </Button>
                    </label>
                    <Button
                      variant="outlined"
                      sx={{ bgcolor: '#add8e6', ml: 1 }}
                      onClick={() => setShowUpload(!showUpload)}
                    >
                      Cancel Edit
                    </Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: '#add8e6', ml: 1 }}>
                      Save new profile image
                    </Button>
                  </form>
                )}
              </Grid>

              <Typography style={{ margin: '8px' }} variant="body2" color="text.secondary">
                Name: {user.name}
              </Typography>
              <Typography style={{ margin: '8px' }} variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ paddingBottom:'20px', width: '90%', margin:8, background: "rgba(255, 255, 255, 1)", display:'flex', flexDirection:'column', alignItems:'center', '@media (min-width: 768px)': { width: '70%' } }}>
          <Typography 
            sx={{ fontWeight: "700", color: "#000000", fontSize: "1.5rem", textTransform: "uppercase", marginTop: '16px' }} 
            padding='30px 0 20px'
            gutterBottom 
            variant="h4" 
            component="div">
            {user.name}'s Created Activities
          </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
            {userActivity ? (
              userActivity.length > 0 ? (
                userActivity.map((item) => (
                  <Grid item key={item._id}>
                    <ActivityCard activity={item} />
                  </Grid>
                ))
              ) : (
                <Typography>No created activities yet.</Typography>
              )
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>

          <Typography 
            sx={{ fontWeight: "700", color: "#000000", fontSize: "1.5rem", textTransform: "uppercase", marginTop: '16px' }} 
            gutterBottom variant="h4" 
            component="div"
            padding='30px 0 20px'
            >
            {user.name}'s Favorites
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {userProfile.favorite ? (
              userProfile.favorite.length > 0 ? (
                userProfile.favorite.map((item) => (
                  <Grid item key={item._id}>
                    <ActivityCard activity={item} />
                  </Grid>
                ))
              ) : (
                <Typography>No favorite activities yet.</Typography>
              )
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
          </Card>
        </>
      )}
    </Container>
    </div>
  );
}

export default ProfilePage;
