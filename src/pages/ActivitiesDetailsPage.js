import { useParams } from "react-router-dom";
import activityService from "../services/activity.services";
import { useEffect, useState } from "react";


const ActivitiesDetailsPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [stroller, setStroller] = useState(null)
    const [ageMin, setAgeMin] = useState(null);
    const [ageMax, setAgeMax] = useState(null);
    const [location, setLocation] = useState(null);
    const [venuetype, setVenueType] = useState(null);
    const [event, setEvent] = useState(null);
    const [priced, setPriced] = useState(null);
    const [image, setImage] = useState(null);
    const [loadData, setLoad] = useState(false)

    useEffect(()=>{
        activityService.getActivity(id)
            .then(result => {
                setAuthor(result.data.author.name);
                setTitle(result.data.title);
                setDescription(result.data.description);
                setStroller(result.data.stroller);
                setAgeMin(result.data.ageMin);
                setAgeMax(result.data.ageMax);
                setLocation(result.data.location);
                setVenueType(result.data.venuetype);
                setEvent(result.data.event);
                setPriced(result.data.priced);
                setImage(result.data.image);
                setLoad(true);
            })
    }, [id])

    return (
        <div>{loadData ?
            <div>
                <div>Author: {author}</div>
                <div>Title: {title}</div>
                <div>Description: {description}</div>
                <div>Stroller: {stroller ? 'Allowed': 'Not Allowed'}</div>
                <div>Min Age: {ageMin}</div>
                <div>Max Age: {ageMax}</div>
                <div>Location: {location}</div>
                <div>Venue Type: {venuetype}</div>
                <div>Event: {event}</div>
                <div>Priced: {priced ? 'Need to pay':'Free'}</div>
                <div>Image: {image}</div>
            </div>
            : 'loading'}
        </div>
    );
}
 
export default ActivitiesDetailsPage;