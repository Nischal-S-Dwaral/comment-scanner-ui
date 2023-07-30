import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectOverview from "./pages/ProjectOverview";
import ProjectCode from "./pages/ProjectCode";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Projects/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/projects/create" element={<CreateProject/>} />
                <Route path="/dashboard/overview" element={<ProjectOverview />} />
                <Route path="/dashboard/code" element={<ProjectCode />} />
            </Routes>
        </Router>
    );
}

export default App;
