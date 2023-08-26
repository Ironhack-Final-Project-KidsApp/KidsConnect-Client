import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from "react-router-dom";
import avatarImage from '../assets/avatar-image.png'
import authService from '../services/auth.service';
//create in the profile a list of the users created activities?

function ProfilePage() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [userImage, setUserImage] = useState("");
    const [showUpload, setShowUpload] = useState(false);

    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);
     
        authService
          .uploadImage(uploadData)
          .then(response => {
            // console.log("response is: ", response);
            setUserImage(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
     
      const handleSubmit = (e) => {
        e.preventDefault();
       
        const uploadData = new FormData();
        uploadData.append("image", userImage);
        
        authService.uploadImage(uploadData)
          .then(response => {
            setUserImage(response.fileUrl);
            setShowUpload(false);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };


    return(
        <div>
            <h1>{user.name} Profile</h1>

            <p>Email: {user.email}</p>

            <p>Profile Image:</p>            
                {user.image ? (
                <img src={user.image} alt="profile_image" style={{ width: '50px', height: '50px', borderRadius: '75%' }} />
                ) : (
                <img src={avatarImage} alt="profile_image" style={{ width: '50px', height: '50px', borderRadius: '75%' }} />
                )}
                
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
        </div>
    )
}


export default ProfilePage;