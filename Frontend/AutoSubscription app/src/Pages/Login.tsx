import { useState } from "react";
import { LoginFormData } from "../interfaces/interfaces";
import { ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/store";
import { userLogin } from "../Redux/authSlice";
import style from "./Login.module.css";

export default function Login() {
    
    //enables the usage of dispatch
    const dispatch = useAppDispatch();

    //enables navigating to another route
    const navigate = useNavigate();

    //our form data state, we will ask the user to enter these values
    const [loginData, setLoginData] = useState({
        user_email: "",
        hashed_password: ""
    });
    
    //updating user input state so that we see the changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    //submit our form
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        //dispatch our login thunk, sends data to our backend API
        dispatch(userLogin(loginData));
        //navigates the user to homepage
        navigate('/home');
        console.log(loginData); 
    };




    return(
        <>
        <div className={style.formContainer}>
            <div className={style.formTextContainer}>
                <div className={style.imageContainer}></div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div>
                        <label className={style.label}>Email:</label>
                        <input className={style.input}
                            type="email"
                            name="user_email"
                            value={loginData.user_email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="hashed_password"
                            value={loginData.hashed_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className={style.button} type="submit">Login</button>
                    <span>You don't have an account yet ? <NavLink to="/signUp">Create one</NavLink></span>
                </form>

            </div>
            
            
        </div>
        </>
    )
}