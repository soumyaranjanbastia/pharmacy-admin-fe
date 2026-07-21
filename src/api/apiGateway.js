import axios from "axios";
import { getBaseUrl, API_METHODS } from "./apiConfig";
import { getTokens, storeTokens } from "../utils/tokenManager";
import { getDeviceInfo } from "../utils/deviceInfo";
import { checkPayloadForAbnormalText } from "../utils/securityValidator";

export const apiGateway = async (
  endpoint,
  method = API_METHODS.GET,
  body = null,
  headers = {}
) => {
  // Security gate check
  if (checkPayloadForAbnormalText(body) || checkPayloadForAbnormalText(endpoint)) {
    console.error("❌ API request blocked due to malicious payload or URL pattern.");
    throw new Error("Security validation failed: Invalid characters or patterns detected in request.");
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  // Get tokens from localStorage
  const { accessToken, refreshToken } = getTokens();
  const deviceInfo = getDeviceInfo();

  const defaultHeaders = {
    "Content-Type": "application/json",
    "device-info": JSON.stringify(deviceInfo),
    ...headers,
  };

  if (accessToken) {
    defaultHeaders["x-access-token"] = accessToken;
  }
  if (refreshToken) {
    defaultHeaders["x-refresh-token"] = refreshToken;
  }

  const config = {
    url,
    method,
    headers: defaultHeaders,
  };

  if (body && [API_METHODS.POST, API_METHODS.PUT, API_METHODS.PATCH].includes(method)) {
    config.data = body;
  }

  try {
    const response = await axios(config);

    const newAccessToken =
      response.headers["x-access-token"] || response.headers["X-Access-Token"];
    const newRefreshToken =
      response.headers["x-refresh-token"] || response.headers["X-Refresh-Token"];

    if (newAccessToken || newRefreshToken) {
      storeTokens({
        accessToken: newAccessToken || accessToken,
        refreshToken: newRefreshToken || refreshToken,
      });
    }

    return response.data;
  } catch (error) {
    console.error("❌ API Gateway Error:", error);
    if (error.response) {
      const serverMessage = error.response.data?.message || error.response.data?.error || null;
      throw new Error(
        serverMessage ? serverMessage : `HTTP error! status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error("Network error: No response received from server.");
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};
