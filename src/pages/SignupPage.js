import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.services";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    // const handleEmail = (e) => setEmail(e.target.value);
    // const handlePassword = (e) => setPassword(e.target.value);
    // const handleName = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, name };
        authService
            .signup(requestBody)
            .then((response) => {
                navigate("/login");
              })
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { errorMessage && <p>{errorMessage}</p> }
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={e=>setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required='true'
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        // <div>
        //     <h2>Sign up</h2>
        //         <form onSubmit={handleSubmit}>
        //             <div>
        //                 <label>Name</label>
        //                 <br />
        //                 <input type="text" name="name" value={name} onChange={handleName}/>
        //                 <br />
        //                 <label>Email</label>
        //                 <br />
        //                 <input type="text" name="email" value={email}  onChange={handleEmail} />
        //                 <br />
        //                 <label>Password</label>
        //                 <br />
        //                 <input type="password" name="password" value={password}  onChange={handlePassword} />
        //                 <br />
        //             </div>
        //             <p>By signing up, you agree with all our terms and conditions!</p>
        //             <button type="submit">Sign up</button>
        //         </form>

        //         { errorMessage && <p>{errorMessage}</p> }

        //     <p>Already have an account? Please log in here!<Link to="/login">Log in</Link></p>
        // </div>
    )
}


export default SignupPage;