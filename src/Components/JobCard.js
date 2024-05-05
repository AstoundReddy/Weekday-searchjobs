import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import { toTitleCase } from "../Helper/TitleCase";

function JobCard({ companyName, jobRole, location, jobDetailsFromCompany, logoUrl, maxExp, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode, jdLink }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "36rem", width: "24rem" , borderRadius : 4 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", p: 1, mx: 1 }}>
        <img src={logoUrl} alt="company logo" style={{ width: "30px", height: "30px", alignSelf: "center", textAlign: "left" }} />
        <div style={{ textAlign: "left" }}>
          <Typography sx={{ ml: 2, fontWeight: "600", color: "grey.500", letterSpacing: 1 }}>{companyName}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{  ml: 2, fontWeight: "400" }}>
            {toTitleCase(jobRole)}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{  ml: 2, fontWeight: "400" }}>
            {toTitleCase(location)}
          </Typography>
        </div>
      </Box>
      {minJdSalary && maxJdSalary && (
        <Typography sx={{ textAlign: "left", fontWeight: 300, m: 1, p: 1 }} color="textSecondary" variant="body2">
          Estimated Salary : {minJdSalary} - {maxJdSalary} {salaryCurrencyCode} ✅
        </Typography>
      )}
      {minJdSalary && !maxJdSalary && (
        <Typography sx={{ textAlign: "left", fontWeight: 300, m: 1, p: 1 }} color="textSecondary" variant="body2">
          Estimated Salary : greater than {minJdSalary} {salaryCurrencyCode}
        </Typography>
      )}
      {!minJdSalary && maxJdSalary && (
        <Typography sx={{ textAlign: "left", fontWeight: 300, m: 1, p: 1 }} color="textSecondary" variant="body2">
          Estimated Salary : less than {maxJdSalary} {salaryCurrencyCode}
        </Typography>
      )}

      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 1, mx: 1 }}>
        <Typography sx={{ fontWeight: 600, textAlign: "left" }} variant="body1" color="textSecondary">
          About Company:
        </Typography>
        <Box
          sx={{
            overflow: "hidden",
            position: "relative",
            mb: 2,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "10rem",
              backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.9) , rgba(255, 255, 255, 1))",
            },
          }}>
          <Typography variant="body2" component="p" sx={{ paddingRight: 1 }}>
            {jobDetailsFromCompany}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Button  variant="text" color="secondary" onClick={() => window.open(jdLink, "_blank")} sx={{ width: "100%", position: "relative", bottom: "5%" }}>
          View job
        </Button>
        {minExp && maxExp && (
          <Typography sx={{ textAlign: "left", px: 2 , fontFamily : "sans-serif" , fontWeight : 600 , color : "grey.500" , letterSpacing : 1.15, fontSize : 14 }} color="textSecondary">
            Experience: {minExp} - {maxExp} years
          </Typography>
        )}
        {minExp && !maxExp && (
          <Typography sx={{ textAlign: "left", px: 2 , fontFamily : "sans-serif" , fontWeight : 600 , color : "grey.500" , letterSpacing : 1.15, fontSize : 14 }} color="textSecondary">
            Minimum Experience: {minExp} years
          </Typography>
        )}
        {!minExp && maxExp && (
          <Typography sx={{ textAlign: "left", px: 2 , fontFamily : "sans-serif" , fontWeight : 600 , color : "grey.500" , letterSpacing : 1.15, fontSize : 14 }} color="textSecondary">
            Maximum Experience: {maxExp} years
          </Typography>
        )}
        <CardActions>
          <Box sx = {{width : "100%"}}>
          <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          mb: 1,
          textTransform: 'none',  // Disable uppercase text
          fontWeight : 600,
          fontFamily : "sans-serif"
        }}
      >
       <Typography> ⚡ Easy Apply</Typography>
      </Button>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          bgcolor: "secondary.main",
          color: 'white',  // Set font color to white
          textTransform: 'none',  // Disable uppercase text
        }}
      >
        <Typography>Unlock referral asks</Typography>
      </Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}

export default JobCard;
