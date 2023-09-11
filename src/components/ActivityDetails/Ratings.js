import { useState, useEffect, useCallback } from "react";
import rateService from "../../services/rate.services";
import { Rating } from "@mui/material";

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
          {averageRating > 1 && <p>Average Rating: {averageRating}</p>} 
          {rating > 1 && <Rating onClick={(e) => handelRateClick(e.target.value)} value={rating} size="small" />}
          {!rating && <Rating onClick={(e) => handelRateClick(e.target.value)} size="small" />}
        </div>
    )
}

export default Ratings;
