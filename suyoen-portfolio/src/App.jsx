import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Skills from "./pages/Skills";
import Project from "./pages/Project";
import Career from "./pages/Career";
import Education from "./pages/Education";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/skill" element={<Skills />} />
        <Route path="/project" element={<Project />} />
        <Route path="/career" element={<Career />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </div>
  );
}

export default App;
