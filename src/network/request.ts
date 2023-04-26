import type { HttpMethod } from "~/types";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { TYPE } from "vue-toastification";
import { Endpoints } from "./endpoints";

import axios from "axios";
import showToast from "~/utils/toast";
import { getAuthToken, saveAuthToken } from "./session";
import { useStore } from "~/store";

// Create a new axios instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

/**
 * Make a request to the Fireduino API
 */
function makeRequest(method: HttpMethod, endpoint: string, data: any, callback: (response: any) => void) {
  // If data is a string or number
  if (["string", "number"].includes(typeof data)) {
    endpoint += "/" + data;
  }

  // Create config 
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
  };

  // If endpoint is not login
  if (endpoint !== "/api/login") {
    config.headers = {
      Authorization: `Bearer ${getAuthToken()}`,
    };
  }

  // If data is not null
  if (data !== null) {
    // Add data to config
    config.data = data;
  }

  // Execute request
  instance(config).then((response) => {
    // Reset session
    let token = response.headers.authorization;

    // If has new token
    if (token) {
      token = token.split(" ")[1];
      // Save new token
      saveAuthToken(token);
    }

    callback(response.data);
  })
  .catch((error: AxiosError) => {
    // If has custom message
    if (error.response && ((error.response?.data) as any).message) {
      error.message = ((error.response?.data) as any).message
    }

    // If session is expired
    if (error.request.status === 401) {
      useStore().dialog.session.open = true;
    }

    // Show error toast
    showToast(TYPE.ERROR, error.message);

    // Execute callback
    callback(error);
  });
}

export { Endpoints };
export default makeRequest;