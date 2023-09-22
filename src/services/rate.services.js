import axios from "axios";

class RateServices {
  constructor() {
    this.api = axios.create({
        baseURL: 'https://kidsconnect.cyclic.cloud/' //process.env.REACT_APP_API_URL
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  
  userRateForActivity = (activityId) => {
    return this.api.get(`/activity/${activityId}/rating`);
  };

  createRate = (activityId, requestBody) => {
    return this.api.post(`/activity/${activityId}/rating`, requestBody);
  };

  avarageRate = (activityId) => {
    return this.api.get(`/activity/${activityId}/avarageRating`);
  };
}

const rateService = new RateServices();

export default rateService;