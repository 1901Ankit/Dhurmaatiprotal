import publicApi from "./config";
import securedApi from "./config";
// import { Buffer } from 'buffer';

const authControllers = {
  login: async (data) => {
    try {
      let result = await publicApi.publicApi.post(`/api/verify-otp`,data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  sendOTP: async (data) => {
    try {
      let result = await publicApi.publicApi.post(`/api/send-otp-Admin`,data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  logout: async (data) => {
    try {
      let result = await securedApi.securedApi.post("/api/logout");
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default authControllers;
