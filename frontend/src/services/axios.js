
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:9035/api",
  headers: {
    "Content-Type": "application/json",
  },
  /*
  headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
  */
});
export default axiosInstance;