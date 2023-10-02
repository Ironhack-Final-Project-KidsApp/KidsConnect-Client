import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";
import { green } from '@mui/material/colors';
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    
    const handleSubmit = (e) => {
      setLoading(true);
        e.preventDefault()
        const requestBody = { email, password };
        authService
            .login(requestBody)
            .then((response) =>{
                storeToken(response.data.authToken)
                authenticateUser()
                navigate("/")
            } )
            .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error' 
            setErrorMessage(errorMessage)})
    }

    //useEffect(()=>{authService.startServer()},[])
    
    return(
        <Container component="form" onSubmit={handleSubmit} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          { errorMessage && <Typography component="h1" variant="h5">{errorMessage}</Typography> }
          <Box  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setPassword(e.target.value)}
            />
            <Box sx={{ position: 'relative' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Log In
              </Button>
              {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              )}
            </Box>




            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    )
}


export default LoginPage;
