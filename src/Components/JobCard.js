import React from "react";
import { Card, CardContent, Typography, Button, Box, CardActions } from "@mui/material";

function JobCard({ companyName, jobRole, location, jobDetailsFromCompany, logoUrl, maxExp, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode, jdLink }) {
  return (
    <Card sx={{ maxWidth: "24rem", m: 2, boxShadow: 4, borderRadius: 4 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {/* <Box
          sx={{
            p: 0.1, // padding
            fontSize: "0.6rem",
            m: 1, // margin
            py: 0, // padding Y
            px: 0.5, // padding X
            borderRadius: 2.5,
            boxShadow: 1,
          }}>
          <Typography variant="subtitle2">⏳ Posted {} days ago</Typography>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <img src={logoUrl} alt="company logo" style={{ width: "50px", height: "50px", alignSelf: "center", textAlign: "left" }} />
          <div style={{ textAlign: "left" }}>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {companyName}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
              {jobRole}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
              {location}
            </Typography>
          </div>
        </Box>
        {minJdSalary && maxJdSalary && (
          <Typography variant="body2">
            Estimated Salary : {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}
          </Typography>
        )}
        {minJdSalary && !maxJdSalary && (
          <Typography variant="body2">
            Estimated Salary : greater than {minJdSalary} {salaryCurrencyCode}
          </Typography>
        )}
        {!minJdSalary && maxJdSalary && (
          <Typography variant="body2">
            Estimated Salary : less than {maxJdSalary} {salaryCurrencyCode}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          About Company:
        </Typography>
        <Box
          sx={{
            overflow: "hidden",
            maxHeight: "100px",
            position: "relative",
            mb: 2,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "30px",
              backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            },
          }}>
          <Typography variant="body2" component="p" sx={{ paddingRight: 1 }}>
            {jobDetailsFromCompany}
          </Typography>
        </Box>
        <Button variant="text" onClick={() => window.open(jdLink, "_blank")} sx={{ width: "100%", mb: 1 }}>
          View job
        </Button>
        {minExp && maxExp && (
          <Typography sx={{ mt: 2, mb: 1 }} color="textSecondary">
            Experience: {minExp} - {maxExp} years
          </Typography>
        )}
        {minExp && !maxExp && (
          <Typography sx={{ mt: 2, mb: 1 }} color="textSecondary">
            Minimum Experience: {minExp} years
          </Typography>
        )}
        {!minExp && maxExp && (
          <Typography sx={{ mt: 2, mb: 1 }} color="textSecondary">
            Maximum Experience: {maxExp} years
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ mt: "auto" }}>
        <Box>
          <Button variant="contained" color="primary" sx={{ width: "100%", mb: 1 }}>
            ⚡ Easy Apply
          </Button>
          <Button variant="contained" sx={{ width: "100%", bgcolor: "secondary.main" }}>
            Unlock referral asks
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default JobCard;
