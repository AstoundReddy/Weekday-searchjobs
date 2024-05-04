import React, { useCallback, useEffect, useState } from "react";
import { jobApi } from "../API/jobApi";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Box, Container } from "@mui/material";
import JobCard from "../Components/JobCard";
function SearchJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    let body = {
      limit: 10,
      offset: 0,
    };
    try {
      const response = await jobApi.getJobs(body);
      toast.success("Jobs fetched successfully");
      console.log(response?.data);
      setJobs(response?.data.jdList);
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: 4 }}>
          {jobs.map((job) => (
            <JobCard
              key={job.jdUid}
              companyName={job.companyName}
              jobRole={job.jobRole}
              location={job.location}
              jobDetailsFromCompany={job.jobDetailsFromCompany}
              logoUrl={job.logoUrl}
              maxExp={job.maxExp}
              maxJdSalary={job.maxJdSalary}
              minExp={job.minExp}
              minJdSalary={job.minJdSalary}
              salaryCurrencyCode={job.salaryCurrencyCode}
              jdLink={job.jdLink}
            />
          ))}
        </Box>
        {isLoading ? <CircularProgress /> : null}
      </Box>
    </div>
  );
}

export default SearchJobs;
