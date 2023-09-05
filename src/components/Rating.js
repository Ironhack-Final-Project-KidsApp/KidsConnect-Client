import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import './Rating.css';
import rateService from "../services/rate.services";

const Rating = ({ idactivity }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState()

    //user rate the activity - rateService.createRate(idactivity)
    //after refresh or log out the users rating need to be mantained
   //useEffect??

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