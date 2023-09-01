import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import activityService from "../services/activity.services";
import { useNavigate } from "react-router-dom";

const CreateActivityPage = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [title , setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stroller, setStroller] = useState(false);
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(0);
    const [location, setLocation] = useState('');
    const [venuetype, setVenueType] = useState('');
    const [event, setEvent] = useState('');
    const [error, setError] = useState(null)

    console.log('User is:', user)

    const handleSubmit = e =>{
        e.preventDefault();
        activityService.createActivity({
            title,
            description,
            author: user._id,
            stroller,
            ageMin,
            ageMax,
            location,
            venuetype,
            event
        })
        .then(response => navigate(`/profile/${user._id}`))
        .catch(err=>setError(err.message));
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Title:</label>
                <input type="text" onChange={e => setTitle(e.target.value)} required={true} />
                <label htmlFor="">Description</label>
                <input type="text" onChange={e => setDescription(e.target.value)} required />
                <label htmlFor="">Stroller Accesible:</label>
                <input type="checkbox" onChange={e => setStroller(e.target.checked)} />
                <label htmlFor="">Minimum Age:</label>
                <input type="number" name="" id="" min={0} onChange={e => setAgeMin(e.target.value)} />
                <label htmlFor="">Maximum Age:</label>
                <input type="number" name="" id="" min={0} onChange={e => setAgeMax(e.target.value)} />
                <label htmlFor="">Location:</label>
                <input type="text" name="" id="" onChange={e=> setLocation(e.target.value)} />
                <label htmlFor="">Venue Type:</label>
                <select name="" id="" onChange={e=>setVenueType(e.target.value)} required>
                    <option value=""></option>
                    <option value="outdoor">Outdoor</option>
                    <option value="indoor">Indoor</option>
                </select>
                <label htmlFor="">Event</label>
                <input type="text" name="" id="" onChange={e=> setEvent(e.target.value)} />
                {/* <input type="submit" value="Create Activity" onClick={handleSubmit} /> */}
                <button type="submit">Create Activity</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}
 
export default CreateActivityPage;