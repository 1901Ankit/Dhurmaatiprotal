import Axios from "axios";
const dhurMaatiServerUrl = "http://18.142.253.251:8000";
const allcanfarmServerUrl = "http://18.140.237.109:8000";

const dhurMaatiSecuredApi = Axios.create({
  baseURL: `${dhurMaatiServerUrl}`,
});

const dhurMaatiPublicApi = Axios.create({
  baseURL: `${dhurMaatiServerUrl}`,
});

const AllCanFarmSecureApi = Axios.create({
  baseURL: `${allcanfarmServerUrl}`,
});

const AllCanFarmPublicApi = Axios.create({
  baseURL: `${allcanfarmServerUrl}`,
});

dhurMaatiSecuredApi.interceptors.request.use((config) => {
  // console.log(localStorage.getItem("secret_token"));
  const login_token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${login_token}`;
  return config;
});

const expiredToken = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      return true;
    }
  } else {
    return false;
  }
};
const forbiddenError = (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      return true;
    }
  } else {
    return false;
  }
};
export default {
  publicApi: dhurMaatiPublicApi,
  forbiddenError,
  expiredToken,
  securedApi: dhurMaatiSecuredApi,
  AllCanFarmSecureApi,
  AllCanFarmPublicApi,
};
