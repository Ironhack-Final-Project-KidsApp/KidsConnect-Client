import axios from "axios";

class RateServices {
  constructor() {
    this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'https://kidsconnect.cyclic.cloud'
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createRate = (activityId, requestBody) => {
    return this.api.post(`/activity/${activityId}/rating`, requestBody);
  };

  avarageRate = (activityId) => {
    return this.api.get(`/activity/${activityId}/avarageRating`);
  };
}

const rateService = new RateServices();

export default rateService;