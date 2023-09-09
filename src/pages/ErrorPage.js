//use this page to display the error messages
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';



function ErrorPage() {
const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        direction: {xs:'column-reverse', sm:'column-reverse'}
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid>
          <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              style={{maxWidth:'80vw'}}
            />
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={()=>navigate('/')}>Back Home</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>


    
  );
}

export default ErrorPage;