import { useState } from "react"
import { ChangeEvent } from "react";
import { SignUpFormData } from "../interfaces/interfaces"; 
import { useAppDispatch } from "../Redux/store";
import { userSignUp } from "../Redux/authSlice";
import { useNavigate } from 'react-router-dom';
import style from "./SignUp.module.css"


//page for signin in the user
export default function SignUp() {

    //enables the usage of dispatch
    const dispatch = useAppDispatch();
    
    //enables navigating to another route
    const navigate = useNavigate();

    //our form data state, we will ask the user to enter these values
    const [formData, setFormData] = useState<SignUpFormData>({
        first_name: '',
        last_name: '',
        user_email: '',
        hashed_password: '',
        user_age: 0,
        role_id: 2,
        
    });

    
    //updating user input state so that we see the changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };
    
    //parsing user input from string to number and spreading the rest of the user object
    const parsedFormData = {
        ...formData,
        user_age: Number(formData.user_age),
        role_id: Number(formData.role_id),
        
      };

    //submit our form
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        //dispatch our signUp thunk, sends parsed data to our backend API
        dispatch(userSignUp(parsedFormData));
        //navigates the user to homepage
        navigate('/home');
        console.log(parsedFormData); 
    };


    return(
        <>
        
        <div className={style.formContainer}>
            <div className={style.formTextContainer}>
                <div className={style.imageContainer}></div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h2>Sign-Up</h2>

                    <div>
                        <label className={style.label}>First Name:</label>
                        <input className={style.input}
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Last Name:</label>
                        <input className={style.input}
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Email:</label>
                        <input className={style.input}
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="hashed_password"
                            value={formData.hashed_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Age:</label>
                        <input className={style.input}
                            type="number"
                            name="user_age"
                            value={formData.user_age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>
                            Role:
                            <select name="role_id" value={formData.role_id} onChange={handleChange}>
                                <option value={2}>user</option>
                                <option value={1}>admin</option>
                            </select>
                        </label>
                    </div>

                    <button className={style.button} type="submit">SignUp</button>
                </form>
            </div>
        </div>
        
        </>
    )
}