import axios from "axios";

class ActivityServices {
  constructor() {
    this.api = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL || 'https://kidsconnect.cyclic.cloud'
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createActivity = (requestBody) => {
    return this.api.post("/activity", requestBody);
  };

  getAllActivities = () => {
    return this.api.get("/activity");
  };

  getActivity = (id) => {
    return this.api.get(`/activity/${id}`);
  };

  updateActivity = (id, requestBody) => {
    return this.api.put(`/activity/${id}`, requestBody);
  };

  deleteActivity = (id) => {
    return this.api.delete(`/activity/${id}`);
  };
}

const activityService = new ActivityServices();

export default activityService;