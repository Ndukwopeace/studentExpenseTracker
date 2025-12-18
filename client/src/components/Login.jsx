import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.access_token);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid login credentials");
        }
    }

    return (
        <div className="flex flex-col justify-center h-full">
            <Logo />
            <Form onSubmit={handleLogin} className="flex flex-col gap-6">
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Login</Button>
            </Form>
            <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <span
                    className="text-teal-600 font-semibold cursor-pointer"
                    onClick={() => navigate("/register")}
                >
    Register
  </span>
            </p>

        </div>
    );
}
