import { Avatar, Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
// import GitHubLogo from '../assets/github.png';
import GitHubIcon from '@mui/icons-material/GitHub';


function Footer() {
    return(
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
        }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
                {/* Made by */}
                <Grid container spacing={2} sx={{display:'flex', alignItems:'center'}}>
                    <Grid item xs>
                        <a href='https://github.com/InesAlmeida-91'>Inês Almeida <GitHubIcon/></a>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                        <a href='https://github.com/SchenRinan'>Jan Andrew Schnell <GitHubIcon/></a>
                    </Grid>
                </Grid>
            </Typography>
          </Container>
        </Box>
        // <div>
        //     <p>Made by:</p>
        //     <a href='https://github.com/InesAlmeida-91'>Inês Almeida <img src={GitHubLogo} alt="GitHubLogo" style={{width: '2rem'}}></img></a>
        //     <br/>
        //     <a href='https://github.com/SchenRinan'>Jan Schnell <img src={GitHubLogo} alt="GitHubLogo" style={{width: '2rem'}}></img></a>
        // </div>
        
    )
}

export default Footer;