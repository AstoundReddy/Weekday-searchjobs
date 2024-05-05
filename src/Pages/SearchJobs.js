import React, { useCallback, useEffect, useRef, useState } from "react";
import { jobApi } from "../API/jobApi";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Box, Container, Grid, Typography } from "@mui/material";
import JobCard from "../Components/JobCard";
import Filters from "../Components/Filters";
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
  const [selectedCompanyName, setSelectedCompanyName] = useState([]);
  
  function filterJobs() {
    return jobs.filter((job) => (
      (selectedRole.length === 0 || selectedRole.some(role => job.jobRole === role.value)) &&
      (selectedExperience.length === 0 || selectedExperience.some(exp => job.minExp <= parseInt(exp.value) && job.maxExp >= parseInt(exp.value))) &&
      (selectedLocation.length === 0 || selectedLocation.some(loc => job.location === loc.value)) &&
      (selectedSalary.length === 0 || selectedSalary.some(salary => job.minJdSalary >= salary.value)) &&
      (selectedCompanyName.length === 0 || selectedCompanyName.some(name => job.companyName.toLowerCase().includes(name.value.toLowerCase())))
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
      toast.error("Error while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [index, isLoading]);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      minWidth: "8rem",  
      textAlign : "left" // Set the minimum width you desire
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
        <Select
        styles={customStyles}
          options={[]} // You would populate this similar to the others
          placeholder="Company Name"
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
        <div ref={loaderRef}>END</div>
        {isLoading && <CircularProgress />}
      </Box>
    </div>
  );
}

export default SearchJobs;
