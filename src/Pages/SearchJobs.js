import React, { useCallback, useEffect, useRef, useState } from "react";
import { jobApi } from "../API/jobApi";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Box, Container } from "@mui/material";
import JobCard from "../Components/JobCard";
function SearchJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(1);
  const loaderRef = useRef(null);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await jobApi.getJobs({ limit: 12, offset: 0 });
        setJobs(response.data.jdList);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await jobApi.getJobs({ limit: 12, offset: index * 12 });
      console.log(response.data.jdList);
      setJobs((prevJobs) => [...prevJobs, ...response.data.jdList]);
      setIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      toast.error("Error while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [index, isLoading]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: 4 }}>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
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
        <div ref={loaderRef}>END</div>
        {isLoading && <CircularProgress />}
      </Box>
    </div>
  );
}

export default SearchJobs;
