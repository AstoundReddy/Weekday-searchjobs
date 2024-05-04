import apiInstance from "../Config/axiosConfig";
import { GET_JOBS } from "./URI";
const jobApi = {
  getJobs: async (data) => {
    const endpoint = { ...GET_JOBS, data: data };
    return apiInstance(endpoint);
  },
};

export { jobApi };
