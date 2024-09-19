import { useState } from "react";
import { LoginFormData } from "../interfaces/interfaces";
import { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginData); 
    };




    return(
        <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <span>You don't have an account yet ? <NavLink to="/signUp">Create one</NavLink></span>
            
            
        </div>
        </>
    )
}