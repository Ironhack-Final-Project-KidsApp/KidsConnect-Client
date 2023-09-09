import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    // const handleEmail = (e) => setEmail(e.target.value);
    // const handlePassword = (e) => setPassword(e.target.value);
    
    const handleSubmit = (e) => {
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
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
        // <div>
        //     <h2>Log in</h2>
        //         <form onSubmit={handleSubmit}>
        //             <div>
        //                 <label>Email</label>
        //                 <br />
        //                 <input type="text" name="email"  value={email} onChange={handleEmail}/>
        //                 <br />
        //                 <label>Password</label>
        //                 <br />
        //                 <input type="password" name="password" value={password} onChange={handlePassword} />
        //                 <br />
        //             </div>
        //             <button type="submit">Log in</button>
        //         </form>

        //     { errorMessage && <p>{errorMessage}</p> }

        //     <p>Don't have an account? Please sign up here!<Link to="/signup">Log in</Link></p>
        // </div>
    )
}


export default LoginPage;