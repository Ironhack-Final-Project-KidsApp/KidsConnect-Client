import { Container, Divider, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

function UserTips() {
    return(
        <div>
            <Container sx={{padding:'30px 10px'}}>
                <h1>KidsConnect User Tips!</h1>
            </Container>
            <Grid
                container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Discover Activities
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Browse through a variety of activities suitable for children of different ages. Use the filtering options to find activities that match your preferences and needs.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Favorites <FavoriteIcon color="error"/>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Want to keep tabs on activites you really wanted? Save them in your very own profile and you can see them anytime.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Safety First <HealthAndSafetyIcon/>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Prioritize safety while exploring activities. Always supervise your children and ensure that activities are suitable for their age and abilities.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Respectful Interaction
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Be courteous and respectful when interacting with other users. Share your experiences, ask questions, and provide helpful tips to create a positive community environment.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Appropriate Content
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Avoid sharing or discussing content that is inappropriate, offensive, or sensitive in nature. Let's keep the discussion child-friendly and supportive.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Privacy
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Protect your privacy and the privacy of others. Avoid sharing personal contact information or any other sensitive details.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Feedback
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        We value your feedback! If you encounter any issues or have suggestions for improvement, feel free to reach out to our support team.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h5" component="div">
                        Moderation
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Our team moderates the content to ensure that it aligns with our community guidelines. Inappropriate or irrelevant content may be removed.
                        </Typography>
                    </Container>
                </Grid>
                
                <Grid item xs={12}>
                <Divider variant="middle" sx={{ borderBottomWidth: 5 }} />
                    <Container>
                        <Typography variant="h5" component="div">
                        
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        Thank you for joining the KidsConnect community! Together, we can create a fun and safe space for families to explore, play, and learn.
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
            
            
        </div>
    )
}

export default UserTips;