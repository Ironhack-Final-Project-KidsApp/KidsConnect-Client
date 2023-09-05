import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import './Rating.css';
import rateService from "../services/rate.services";

const Rating = ({ idactivity }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState()

    useEffect(() => {
        // Fetch the user's current rating for the activity when the component mounts
        const fetchUserRating = async () => {
          try {
            const response = await rateService.userRateForActivity(idactivity);
            const userRating = response.data.rate;
            setRating(userRating);
          } catch (error) {
            console.error("Error fetching user's rating for the activity:", error);
          }
        };
    
        fetchUserRating();
      }, [idactivity]);

    const handelRateClick = async (item) => {
        try {
            await rateService.createRate(idactivity, { rate: item });
            setRating(item);

        } catch (error) {
            console.error("Error rating the activity:", error);
        }
    }

    return (
        <div>
        {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return(
                <label key={currentRating}>
                <input type="radio" name="rating" value={currentRating} onClick={() => handelRateClick(currentRating)}/>
                <FaStar 
                className='star' 
                size={20} 
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)} />  
                </label>
            );
        })}
        </div>
    )
}

export default Rating;