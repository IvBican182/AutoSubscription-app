import {  useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import AdminHomepage from "../components/AdminHomepage";
import UserHomepage from "../components/UserHomepage";

//homepage route, we will render either user homepage or admin homepage, depends on who is authenticated
export default function Homepage() {
    
    //extracting user auth state
    const user = useSelector((state: RootState) => state.auth.user );
    console.log(user);
    
    //if no user, show "loading", we will do something else later
    if (!user) {
        return <p>Loading...</p>; // or redirect to login
      }
    
    

    return (
        <div className="container">
            {/* if user role_id = 1 show the admin component, if not show the user component*/}
            {user.role_id === 1 ? <AdminHomepage /> : <UserHomepage />}
        </div>
    )

}