import Login from "./components/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import AllExpenses from "./components/AllExpenses.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Register from "./components/Register.jsx";

function App() {
    return (
        <div className="app px-2">


            <Routes>
                <Route index element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="all-expenses" element={<AllExpenses />} />
                    </Route>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
