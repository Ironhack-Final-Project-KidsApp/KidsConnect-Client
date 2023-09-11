import { useState, useEffect, useCallback } from "react";
// import { FaStar } from 'react-icons/fa';
// import './Rating.css';
import rateService from "../../services/rate.services";
import { Rating } from "@mui/material";

const Ratings = ({ idactivity }) => {
    const [rating, setRating] = useState(null);
    // const [hover, setHover] = useState()
    const [averageRating, setAverageRating] = useState(null);

    // const onUpdateAverageRating = () => {
    //   fetchAverageRating();
    // };
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
          {rating > 1 && <Rating onClick={(e) => handelRateClick(e.target.value)} value={rating} size="large" />}
          {!rating && <Rating onClick={(e) => handelRateClick(e.target.value)} size="large" />}
          {averageRating > 1 && <p>Average Rating: {averageRating}</p>}

        {/* {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return(
                <label key={currentRating}>
                <input id='starradio' type="radio" name="rating" value={currentRating} onClick={() => handelRateClick(currentRating)}/>
                <FaStar 
                className='star' 
                size={20} 
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)} />  
                </label>
            );
        })} */}
        
        
        </div>
    )
}

export default Ratings;
