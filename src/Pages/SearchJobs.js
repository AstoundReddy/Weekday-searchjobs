import React, { useCallback, useEffect, useRef, useState } from "react";
import { jobApi } from "../API/jobApi";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import JobCard from "../Components/JobCard";
import Select from 'react-select'
import { employees, experiences, locations, roles, salaries } from "../Helper/FilterArray";

function SearchJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(1);
  const loaderRef = useRef(null);

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedNumEmployees, setSelectedNumEmployees] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [companyNameFilter, setCompanyNameFilter] = useState(""); // State for input text

  function filterJobs() {
    return jobs.filter((job) => (
      (selectedRole.length === 0 || selectedRole.some(role => job.jobRole === role.value)) &&
      (selectedExperience.length === 0 || selectedExperience.some(exp => job.minExp <= parseInt(exp.value) && job.maxExp >= parseInt(exp.value))) &&
      (selectedLocation.length === 0 || selectedLocation.some(loc => 
        loc.value === "onsite" ? job.location !== "remote" : job.location === loc.value
      )) &&   
      (selectedSalary.length === 0 || selectedSalary.some(salary => job.minJdSalary >= salary.value)) &&
      (companyNameFilter === "" || job.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())) // Filter by text input
    ));
  }
  
  
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await jobApi.getJobs({ limit: 12, offset: 0 });
        setJobs(response.data.jdList);
        console.log(response.data.jdList)
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
     console.log("Error while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [index, isLoading]);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      minWidth: "8rem",  
      textAlign : "left", // Set the minimum width you desire
      fontFamily: "'Lexend', sans-serif",
      fontSize : "0.8rem"
    }),
  };
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
        <Box sx = {{m:2 , mx : 8}}>
        <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Select
        isMulti
        onChange={setSelectedRole}
        styles={customStyles} options={roles} placeholder="Role" />
      </Grid>
      <Grid item>
        <Select
        isMulti
        styles={customStyles}
        onChange={setSelectedNumEmployees}
        options={employees} placeholder="Number of employees" />
      </Grid>
      <Grid item>
        <Select
        isMulti
        styles={customStyles}
        onChange={setSelectedExperience}
        options={experiences} placeholder="Experience" />
      </Grid>
      <Grid item>
        <Select
        isMulti
        styles={customStyles}
        onChange={setSelectedLocation}
        options={locations} placeholder="Location" />
      </Grid>
      <Grid item>
        <Select
        isMulti
        styles={customStyles}
        onChange={setSelectedSalary}
        options={salaries} placeholder="Minimum Salary" />
      </Grid>
      <Grid item>
      <input
                placeholder="Company Name"
                value={companyNameFilter}
                onChange={e => setCompanyNameFilter(e.target.value)}
             style={{padding : "0.5rem"  , fontSize : "0.8rem" ,  
              fontFamily: "'Lexend', sans-serif"
            }}
              />
      </Grid>
    </Grid>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: 4 }}>
          {filterJobs().map((job, index) => (
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
        {isLoading && <CircularProgress />}
        <Box ref={loaderRef} sx= {{background : "black" , color:"white" , mt : 2}}>END</Box>
      </Box>
    </div>
  );
}

export default SearchJobs;
