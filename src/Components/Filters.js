import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Select from 'react-select'
function Filters() {
  const roles = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullStack', label: 'Full Stack' },
    { value: 'devOps', label: 'DevOps' },
    { value: 'softwareEngineer', label: 'Software Engineer' },
    { value: 'dataScientist', label: 'Data Scientist' },
    { value: 'productManager', label: 'Product Manager' },
    { value: 'projectManager', label: 'Project Manager' },
    { value: 'qaEngineer', label: 'QA Engineer' },
    { value: 'databaseAdmin', label: 'Database Administrator' },
    { value: 'systemAdmin', label: 'System Administrator' },
    { value: 'networkEngineer', label: 'Network Engineer' },
    { value: 'securityAnalyst', label: 'Security Analyst' },
    { value: 'graphicDesigner', label: 'Graphic Designer' },
    { value: 'uxDesigner', label: 'UX Designer' },
    { value: 'uiDesigner', label: 'UI Designer' },
    { value: 'visualDesigner', label: 'Visual Designer' },
  ];
  
  const employees = [
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-100', label: '51-100' },
    { value: '101-200', label: '101-200' },
    { value: '201-300', label: '201-300' },
    { value: '301-500', label: '301-500' },
    { value: '500+', label: '500+' },
  ];
  

  const experiences = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '4', label: '4 Years' },
    { value: '5', label: '5 Years' },
    { value: '6', label: '6 Years' },
    { value: '7', label: '7 Years' },
    { value: '8', label: '8 Years' },
    { value: '9', label: '9 Years' },
    { value: '10', label: '10+ Years' },
  ];
  
  const locations = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const salaries = [
    { value: '40000', label: '$40,000' },
    { value: '60000', label: '$60,000' },
    { value: '80000', label: '$80,000' },
  ];
  const customStyles = {
    container: (provided) => ({
      ...provided,
      minWidth: "8rem",  
      textAlign : "left" // Set the minimum width you desire
    }),
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Select styles={customStyles} options={roles} placeholder="Role" />
      </Grid>
      <Grid item>
        <Select options={employees} placeholder="Number of employees" />
      </Grid>
      <Grid item>
        <Select options={experiences} placeholder="Experience" />
      </Grid>
      <Grid item>
        <Select options={locations} placeholder="Location" />
      </Grid>
      <Grid item>
        <Select options={salaries} placeholder="Salary" />
      </Grid>
      <Grid item>
        <Select
          options={[]} // You would populate this similar to the others
          placeholder="Company Name"
        />
      </Grid>
    </Grid>

  )
}

export default Filters