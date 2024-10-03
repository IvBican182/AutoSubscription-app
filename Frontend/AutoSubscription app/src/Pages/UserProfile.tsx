import { useSelector } from "react-redux";
import { useAppDispatch } from "../Redux/store";
import style from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import { RootState } from "../Redux/store";
import { fetchSingleUser } from "../Redux/userSlice";
import UserData from "../components/UserData";
import { updateUserData } from "../Redux/authSlice";

//User profile page
export default function UserProfile() {

    //enables the usage of dispatch
    const dispatch = useAppDispatch();

    //extract authenticated user and his token
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);

    //convert user object to array for mapping purposes
    const userArray = [user];

    //get the current user ID, we want to use it later for fetching current user data
    const id = userArray.map((u:any) => (u.id));

    //setting user Id
    const userId = id[0]

    console.log(userId);

    //form data which user should provide for updating
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        user_email: "",
        hashed_password: ""
    });

    //we use useEffect for our async thunk, fetching userData by his ID
    useEffect(() => {
        dispatch(fetchSingleUser(userId));
        console.log(user);
    }, [])

    //updating user input state so that we see the changes
    function handleChange(e: any) {
        e.preventDefault();
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [e.target.name] : e.target.value
            }
        })
    };
    
    //submit new user changes
    function handleSubmit(e: any) {
        e.preventDefault();
        //we need to send current user ID (so that backend knows which user we need to update)
        //we send new form data our user entered
        //we send the current user token for authentication and protection
        dispatch(updateUserData({ userId: userId, formData: formData, token: token }));

        setFormData({
            first_name: "",
            last_name: "",
            user_email: "",
            hashed_password: ""
          });
    }

    return (
        <div>
            <div>
                <h1>PROFILE</h1>
                {/* we map the user array to send user data to another component */}
                <ul>{userArray.map((u:any) => {
                    return (
                        <UserData key={u.id} props={u}/>
                    )
                })}</ul>
                <div className={style.profileFormContainer}>
                    <div className={style.profileFormTextContainer}>
                        <form className={style.profileForm} onSubmit={handleSubmit}>
                            <h2>Change your info</h2>

                            <div>
                                <label className={style.profileLabel}>change first name:</label>
                                <input className={style.profileInput}
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className={style.profileLabel}>Change last name:</label>
                                <input className={style.profileInput}
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className={style.profileLabel}>Change email:</label>
                                <input className={style.profileInput}
                                    type="email"
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className={style.profileLabel}>Change password:</label>
                                <input className={style.profileInput}
                                    type="password"
                                    name="hashed_password"
                                    value={formData.hashed_password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className={style.profileButton} type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}