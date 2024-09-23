import { useSelector } from "react-redux";
import { useAppDispatch } from "../Redux/store";
import style from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import { RootState } from "../Redux/store";
import { changeUserData, fetchSingleUser } from "../Redux/userSlice";
import UserData from "../components/UserData";

export default function UserProfile() {
    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.auth.user);

    const id = user.map((u:any) => (u.id));

    const userId = id[0]

    console.log(userId);


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        user_email: "",
        hashed_password: ""
    });

    
    useEffect(() => {
        dispatch(fetchSingleUser(userId));
        console.log(user);
    }, [])


    function handleChange(e: any) {
        e.preventDefault();
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [e.target.name] : e.target.value
            }
        })
    };

    function handleSubmit(e: any) {
        e.preventDefault();
        dispatch(changeUserData({ userId: userId, formData: formData }));

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
                <ul>{user.map((u:any) => {
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