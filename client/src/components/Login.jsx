import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")


    const navigate = useNavigate();

    function handleLogin (e){
        e.preventDefault();
        console.log(email);
        console.log(password);

        navigate('/dashboard');
    }
    return (
        <div className="flex flex-col justify-center h-full">
            <Logo/>
            <Form handleSubmit={handleLogin} className="flex flex-col gap-6" >
                <Input  type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
                <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                <Button type="submit" className="bg-teal-500 text-white">Login</Button>
            </Form>
        </div>
    )
}