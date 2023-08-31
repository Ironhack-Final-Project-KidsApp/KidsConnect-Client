import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
//import avatarImage from '../assets/avatar-image.png'
import userService from '../services/user.services';

function ProfilePage() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [userImage, setUserImage] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [userActivity, setActivity] = useState([])
    const [loading, setLoading] = useState(true);

    const handleFileUpload = (e) => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
     
        uploadData.append("image", e.target.files[0]);
     
        userService
          .uploadImage(uploadData)
          .then(response => {
            console.log("response is: ", response);
            setUserImage(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
                
        userService
          .updateUser({id: user._id, image: userImage})
          .then(response => {
            console.log("response: ", response);
            // setUserImage("")
          })
          .catch(err => console.log("Error: ", err));
      };

      useEffect(() => {
        userService.getUser(user._id)
          .then(response => {
            // console.log("response is:", response.data)
            user.image = response.data.image
            setUserImage(user.image)
          });
        userService.getActivity(user._id)
          .then(response => {
            // console.log("response is:", response.data)
            setActivity(response.data)
          });
        setLoading(false)
      }, [user])

      // console.log("User is:", user)
    return(
        <div>
          {loading && 'Data being gathered'}
          {!loading && <>
            <h1>{user.name} Profile</h1>

            <p>Email: {user.email}</p>

            <p>Profile Image:</p>            
                <img src={userImage} alt="profile_image" style={{ width: '50px', height: '50px', borderRadius: '75%' }} />
               
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
            <h1>{user.name} Activities</h1>
            {userActivity && userActivity.map(item => {
              return <div key={item._id}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                </div>
            })}
          </>}
          
        </div>
    )
}


export default ProfilePage;