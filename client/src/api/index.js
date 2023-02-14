import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

export default {
  user: {
    fetchUser: () => {
      const client = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
      });
      return client.get("/auth/login/success");
    },
  },
};
