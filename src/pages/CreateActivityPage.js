import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import activityService from "../services/activity.services";
import { useNavigate } from "react-router-dom";

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const [activity, setActivity] = useState({author: user._id})
  const [error, setError] = useState(null)

    const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("activityImage", e.target.files[0]);
    activityService
      .uploadActivityImage(uploadData)
      .then(response => {
        console.log("response is: ", response);
        setActivity({...activity, activityImage: response.data.fileUrl});
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message ?? "Image upload failed.";
        setError(errorMessage);
      });
    }

  const handleSubmit = e =>{
      e.preventDefault();
      activityService.createActivity(activity)
          .then(response => navigate(`/profile/${user._id}`))
          .catch(err=>setError(err.message));
  }

  return (
      <div>
          <form action="" onSubmit={handleSubmit}>
            <h2>Create Activity:</h2>
              <label htmlFor="">Title:</label>
              <input type="text" onChange={e => setActivity({...activity, title: e.target.value})} required={true} />
              <label htmlFor="">Description</label>
              <input type="text" onChange={e => setActivity({...activity, description: e.target.value})} required />
              <label htmlFor="">Stroller Accesible:</label>
              <input type="checkbox" onChange={e => setActivity({...activity, stroller: e.target.checked})} />
              <label htmlFor="">Minimum Age:</label>
              <input type="number" name="" id="" min={0} onChange={e => setActivity({...activity, ageMin:e.target.value})} />
              <label htmlFor="">Maximum Age:</label>
              <input type="number" name="" id="" min={0} onChange={e => setActivity({...activity, ageMax:e.target.value})} />
              <label htmlFor="">Location:</label>
              <input type="text" name="" id="" onChange={e=> setActivity({...activity, location:e.target.value})} />
              <label htmlFor="">Venue Type:</label>
              <select name="" id="" onChange={e=>setActivity({...activity, venuetype:e.target.value})} required>
                  <option value=""></option>
                  <option value="outdoor">Outdoor</option>
                  <option value="indoor">Indoor</option>
              </select>
              <br />
              <label htmlFor="">Priced:</label>
              <input type="checkbox" onChange={e => setActivity({...activity, priced: e.target.checked})} />
              <br />
              <label htmlFor="">Image:</label>
              <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />

              {/* <label htmlFor="">Event</label>
              <input type="text" name="" id="" onChange={e=> setActivity({...activity, event:e.target.value})} />*/}

              <button type="submit">Create Activity</button>
          </form>
          {error && <div>{error}</div>}
      </div>
  );
}

export default CreateActivityPage;