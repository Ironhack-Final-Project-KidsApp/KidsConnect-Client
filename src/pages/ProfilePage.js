import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import userService from '../services/user.services';
import ActivityCard from '../components/ActivityCard';
import './AllActivitiesList.css';

function ProfilePage() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [userProfile, setUser] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [userActivity, setActivity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFileUpload = (e) => {
    //console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
  
    uploadData.append("image", e.target.files[0]);
  
    userService
      .uploadImage(uploadData)
      .then(response => {
        //console.log("response is: ", response);
        setUser({...userProfile, image: response.data.fileUrl});
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userService
      .updateUser({id: user._id, image: userProfile.image})
      .then(response => {
        //console.log("response: ", response);
        setShowUpload(!showUpload);
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  };

  useEffect(() => {
    userService.getUser(user._id)
      .then(response => {
        //console.log("response is:", response.data.favorite)
        setUser({...userProfile, favorite: response.data.favorite.reverse(), image: response.data.image})
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
    userService.getActivity(user._id)
      .then(response => {
        setActivity(response.data.reverse())
      })
      .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error'; setErrorMessage(errorMessage)});
  }, [user._id])

  return(
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <h1>{user.name} Profile</h1>

      <p>Email: {user.email}</p>

      <p>Profile Image:</p>
      {userProfile.image && <img src={userProfile.image} alt="profile_image" style={{ width: '50px', height: '50px', borderRadius: '75%' }} />}
          
      <br />
      {!showUpload &&
          <button onClick={()=> setShowUpload(!showUpload)}>Change profile image</button>
      }
      {showUpload && (
              <form onSubmit={handleSubmit}>
                  <input type="file" name="image" onChange={(e) => handleFileUpload(e)}/>
                  <button onClick={()=> setShowUpload(!showUpload)}>Cancel Edit</button>
                  <button type="submit">Save new profile image</button>
              </form>)
      }
      <h1>{user.name}'s Created Activities</h1>
      <div className='card-container'>
      {!userActivity && <div>Loading</div>}
      { userActivity && userActivity.length > 0 && userActivity.map(item => {
        return <ActivityCard key={item._id} activity={item} />
      })}
      </div>
      <h1>{user.name}'s Favorites</h1>
      <div className='card-container'>
        {userProfile.favorite && userProfile.favorite.map(item => {
          return <ActivityCard key={item._id} activity={item} />
        })}
      </div>
     
    </div>
  )
}


export default ProfilePage;