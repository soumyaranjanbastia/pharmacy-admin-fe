const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_TYPE_KEY = "userType";
const USER_DATA_KEY = "userData";

export const storeTokens = ({ accessToken, refreshToken, userType, user }) => {
  try {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    if (userType) {
      localStorage.setItem(USER_TYPE_KEY, userType);
    }
    if (user) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }
    console.log("✅ Tokens, UserType and UserData stored successfully.");
  } catch (error) {
    console.error("❌ Error storing tokens/userType:", error);
  }
};

export const getTokens = () => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const userType = localStorage.getItem(USER_TYPE_KEY);
    const userStr = localStorage.getItem(USER_DATA_KEY);
    const user = userStr ? JSON.parse(userStr) : null;
    return { accessToken, refreshToken, userType, user };
  } catch (error) {
    console.error("❌ Error retrieving tokens:", error);
    return { accessToken: null, refreshToken: null, userType: null };
  }
};

export const clearAuthStorage = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    console.log("🧹 Cleared auth storage.");
  } catch (error) {
    console.error("❌ Error clearing tokens:", error);
  }
};
