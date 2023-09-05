import axios from "axios";

class AuthService {
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

    login = requestBody => {
        return this.api.post('/auth/login', requestBody);
      };
     
    signup = requestBody => {
        return this.api.post('/auth/signup', requestBody);
      };
     
    verifyToken = () => {
        return this.api.get('/auth/verify');
      };

    uploadImage = (file) => {
        return this.api.post("/auth/upload", file);
      };
    
    updateUser = (updatedUser) => {
      return this.api.put("/auth/users", updatedUser);
    }
}

const authService = new AuthService();

export default authService;