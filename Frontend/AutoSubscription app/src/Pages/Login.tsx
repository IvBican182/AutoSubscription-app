import { useState } from "react";
import { LoginFormData } from "../interfaces/interfaces";
import { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../Redux/store";
import { userLogin } from "../Redux/authSlice";
import style from "./Login.module.css";

export default function Login() {

    const dispatch = useAppDispatch();


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
        dispatch(userLogin(loginData));
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
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="password"
                            value={loginData.password}
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