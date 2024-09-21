import { useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { fetchUsers } from "../Redux/userSlice";
import { RootState } from "../Redux/store";
import { useEffect } from "react";

export default function AdminHomepage() {
    const dispatch = useAppDispatch();

    const users = useSelector((state: RootState) => state.users.users )
    
    function fetch() {
        dispatch(fetchUsers());
    }

    useEffect(() => {
        fetch();
        console.log(users);
    }, []);

    return(
        <div className="container">
        <div className="total-budget">
            <div className="sum">
                <span>Amount of money from transactions</span>
                <button>Transaction details</button> 
            </div>
        </div>
        <div>
            <button>Create new subscription</button>
        </div>
        <div>
            <button>View current subscriptions</button>
        </div>
        <div>
            {/* <p>users:</p>
            <ul>{users.map((user: any) => {
            return <li key={user.id}>{user.first_name}</li>
             })}
            </ul> */}
        </div>
        </div>
    )
}