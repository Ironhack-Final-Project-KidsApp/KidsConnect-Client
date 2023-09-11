import { useState, useEffect, useCallback } from "react";
import rateService from "../../services/rate.services";
import { Rating, Box } from "@mui/material";
import Typography from '@mui/material/Typography';

const Ratings = ({ idactivity }) => {
    const [rating, setRating] = useState(null);
    const [averageRating, setAverageRating] = useState(null);

    const fetchAverageRating = useCallback(() => {
      rateService.avarageRate(idactivity)
        .then((response) => {
          // console.log('rate response', response.data.result)
          setAverageRating((Math.floor(response.data.result*10)/10));
        })
        .catch((error) => {
          console.error("Error fetching average rating:", error);
        });
    },[idactivity])
    const fetchUserRating = useCallback(async () => {
      try {
        const response = await rateService.userRateForActivity(idactivity);
        const userRating = response.data.rate;
        setRating(userRating);
      } catch (error) {
        console.error("Error fetching user's rating for the activity:", error);
      }
    },[idactivity])
    useEffect(() => {
      fetchAverageRating();
      fetchUserRating();
    }, [fetchAverageRating, fetchUserRating]);

    const handelRateClick = async (item) => {
        try {
          if(item > 0){
            await rateService.createRate(idactivity, { rate: item });
            setRating(item);
            fetchAverageRating();
          }
            
        } catch (error) {
            console.error("Error rating the activity:", error);
        }
    }

    return (
      <div>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {rating >= 1 && (
            <Rating onClick={(e) => handelRateClick(e.target.value)} value={rating} size="small" />
          )}
          {averageRating >= 1 && (
            <Typography variant="body2">
              Average Rating: {averageRating}
            </Typography>
          )}
          {!rating && (
            <Rating onClick={(e) => handelRateClick(e.target.value)} size="small" />
          )}
        </Box>
    </div>
    )
}

export default Ratings;
