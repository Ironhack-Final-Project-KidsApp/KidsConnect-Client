import axios from "axios";

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'https://kidsconnect.cyclic.cloud'
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
       
            if (storedToken) {
              config.headers = { Authorization: `Bearer ${storedToken}` };
            }
       
            return config;
          });
    }

    uploadImage = (file) => {
        return this.api.post("/upload", file);
      };
    
    updateUser = (updatedUser) => {
      return this.api.put("/user-image", updatedUser);
    }

    getUser = (id) => {
        return this.api.get(`/user/${id}`);
    }

    getActivity = id => {
      return this.api.get(`/user/${id}/activity`)
    }
    getUsersFavourites = (userId) => {
      return this.api.get(`/activity/favorites/${userId}`)
    }
    
  toggleFavorite = (id) => {
    return this.api.post(`/activity/${id}/favorite`);
  }

  

}

const userService = new UserService();

export default userService;