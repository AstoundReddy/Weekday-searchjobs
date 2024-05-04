import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchJobs from "./Pages/SearchJobs";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchJobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
