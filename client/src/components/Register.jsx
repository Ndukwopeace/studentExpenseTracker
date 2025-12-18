import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo.jsx";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/register", {
                email,
                password,
            });

            navigate("/");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Registration failed");
            } else {
                setError("Network error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center h-full gap-6">
            <Logo />

            <Form onSubmit={handleRegister} className="flex flex-col gap-5">
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <Button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </Button>
            </Form>

            <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/" className="text-teal-600 font-semibold">
                    Login
                </Link>
            </p>
        </div>
    );
}
