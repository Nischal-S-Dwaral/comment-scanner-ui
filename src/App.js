import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectOverview from "./pages/ProjectOverview";
import ProjectCode from "./pages/ProjectCode";
import {useSelector} from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: '"Urbanist", sans-serif',
    },
});

function App() {

    const user = useSelector((state) => state.user.currentUser);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" replace /> :  <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" replace /> :  <Register />} />
                    {
                        user && (
                            <>
                                <Route path="/" element={<Projects/>} />
                                <Route path="/projects" element={<Projects/>} />
                                <Route path="/projects/create" element={<CreateProject/>} />
                                <Route path="/dashboard/overview" element={<ProjectOverview />} />
                                <Route path="/dashboard/code" element={<ProjectCode />} />
                            </>
                        )
                    }
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
