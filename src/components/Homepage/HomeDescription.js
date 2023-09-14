import { Container, Stack, Typography } from "@mui/material";

const HomeDescription = () => {
    return (
        <section style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            alignItems='flex-start'
          >
            <div style={{padding: '25px 0', maxWidth:'400px'}}>
              <Container>
                <Typography variant="h5" component="div">
                  Explore
                </Typography>
                <br />
                <Typography variant="body2">
                  Choose from the community posted places. See if the place is indoors or outdoors, appropriate for your child's age, and overall experience of others.
                </Typography>
              </Container>
            </div>
            <div style={{padding: '25px 0', maxWidth:'400px'}}>
              <Container>
                <Typography variant="h5" component="div">
                  Save your favorites
                </Typography>
                <br />
                <Typography variant="body2">
                  Want to keep tabs on activites you really wanted? Save them in your very own profile and you can see them anytime.
                </Typography>
              </Container>
            </div>
            <div style={{padding: '25px 0', maxWidth:'400px'}}>
              <Container>
                <Typography variant="h5" component="div">
                  Create your Activity
                </Typography>
                <br />
                <Typography variant="body2">
                  Found a place for kids you want to share? Add it here and enjoy them with other people!
                </Typography>
              </Container>
            </div>
          </Stack>
        </section>
    );
}
 
export default HomeDescription;