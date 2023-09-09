import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import GitHubLogo from '../assets/github.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


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
                    <Grid item xs textAlign='center'>
                        <a href='https://github.com/InesAlmeida-91'><GitHubIcon/></a>
                        <a href="https://www.linkedin.com/in/in%C3%AAs-almeida-b34ab827b/"><LinkedInIcon/></a>
                        Inês Almeida 
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs textAlign='center'>
                        Jan Schnell
                        <a href='https://github.com/SchenRinan'><GitHubIcon/></a>
                        <a href="https://www.linkedin.com/in/janschnell/"><LinkedInIcon/></a>
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