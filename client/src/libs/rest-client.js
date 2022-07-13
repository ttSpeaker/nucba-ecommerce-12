import axios from "axios";
import { BACK_URL } from "../config/config";

const sendPostRequest = async (url, body, options) => {
  const axiosOptions = {};
  try {
    if (options && options.loggedIn) {
      const accesToken = localStorage.getItem("accessToken");
      axiosOptions.headers = {
        authorization: "Bearer " + accesToken,
      };
    }
    const response = await axios.post(url, body, axiosOptions);
    console.log(response);
  } catch (error) {
    if ("TokenExpiredError" === error.response.data.error.name) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Not able to refresh token");
      }
      console.log(`Refresh token: ${refreshToken}`);
      const refreshResponse = await axios.post(
        BACK_URL + "/auth/refresh",
        null,
        {
          headers: {
            authorization: "Bearer " + refreshToken,
          },
        }
      );
      if (refreshResponse.data && refreshResponse.data.accessToken) {
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);
      }
      if (options && options.loggedIn) {
        const accesToken = localStorage.getItem("accessToken");
        axiosOptions.headers = {
          authorization: "Bearer " + accesToken,
        };
      }
      const response = await axios.post(url, body, axiosOptions);
    }
    
    throw error;
  }
};

export default sendPostRequest;
