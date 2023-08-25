import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import avatarImage from '../assets/avatar-image.png'
//create in the profile a list of the users created activities?

function ProfilePage() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    return(
        <div>
            <h1>{user.name} Profile</h1>

            <p>Email: {user.email}</p>

            <img src="" alt="" style={{width: '50px', height: '50px', borderRadius: '75%'}} /> :
            <img src={avatarImage} alt={"profile_image"} style={{width: '50px', height: '50px', borderRadius: '75%'}} />
            <button>Change image</button>
            <form>
                <input type="file" name="image"/>
                <button>Cancel Edit</button>
                <button type="submit">Save new profile image</button>
            </form>

        
            
        </div>
    )
}


export default ProfilePage;