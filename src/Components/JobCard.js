import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function JobCard() {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <img src="https://via.placeholder.com/150" alt="company logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <Box>
            <Typography variant="h5" component="div">
              Company Name
            </Typography>
            <Typography component="div">Role Name</Typography>
            <Typography component="div">Location</Typography>
          </Box>
        </Box>
        <Typography variant="body2">Estimated Salary</Typography>
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
            Lorem epsum Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsum
          </Typography>
          <Typography variant="body2" component="p" sx={{ paddingRight: 1 }}>
            Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum Lorem epsumLorem epsum
          </Typography>
        </Box>
        <Typography sx={{ mt: 2, mb: 1 }} color="textSecondary">
          Minimum Experience: 5 years
        </Typography>
        <Button variant="outlined" sx={{ width: "100%", mb: 1 }}>
          View job
        </Button>
        <Button variant="contained" color="primary" sx={{ width: "100%", mb: 1 }}>
          Easy Apply
        </Button>
        <Button variant="contained" sx={{ width: "100%", bgcolor: "secondary.main" }}>
          Unlock referral asks
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobCard;
