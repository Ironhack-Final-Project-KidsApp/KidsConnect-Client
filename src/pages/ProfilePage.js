import avatarImage from '../assets/avatar-image.png'

function ProfilePage() {
    return(
        <div>
            <h1>Profile</h1>

            <img src="" alt="" style={{width: '50px', height: '50px', borderRadius: '75%'}} /> :
            <img src={avatarImage} alt={"profile_image"} style={{width: '50px', height: '50px', borderRadius: '75%'}} />
            <button>Change image</button>
            <form>
                <input type="file" name="image"/>
                <button>Cancel Edit</button>
                <button type="submit">Save new profile image</button>
            </form>

            <p>Email</p>
            
            <p>Username</p>
         
        </div>
    )
}


export default ProfilePage;