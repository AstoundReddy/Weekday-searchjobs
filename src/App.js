import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchJobs from "./Pages/SearchJobs";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#55EFC4",
    },
    secondary : {
      main : "#4943DA"
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SearchJobs />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
