import React, { useEffect, useState } from "react";
import { jobApi } from "../API/jobApi";
import { toast } from "react-toastify";
function SearchJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setIsLoading(true);
    let body = {
      limit: 10,
      offset: 0,
    };
    try {
      const response = await jobApi.getJobs(body);
      toast.success("Jobs fetched successfully");
      console.log(response?.data);
      setJobs(response?.data);
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return <div>Job search page</div>;
}

export default SearchJobs;
