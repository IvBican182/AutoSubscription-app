import {  useSelector } from "react-redux";
import { useAppDispatch } from "../Redux/store";
import { RootState } from "../Redux/store";
import { fetchUsers } from "../Redux/userSlice";
import { useEffect } from "react";

export default function Homepage() {
    const dispatch = useAppDispatch();

    const users = useSelector((state: RootState) => state.users.users )
    
    function fetch() {
        dispatch(fetchUsers());
    }

    useEffect(() => {
        fetch();
        console.log(users);
    }, []);

    
    

    return (
        <div className="container">
        <div className="total-budget">
            <div className="sum">
                <span>Amount of money from transactions</span>
                <button>Transaction details</button> 
            </div>
        </div>
        <div>
            <button>Create new transaction</button>
            <button>Create new subscription</button>
        </div>
        <div>
            <button>View current transactions</button>
            <button>View current subscriptions</button>
        </div>
        <div>
            <p>users:</p>
            <ul>{users.map((user: any) => {
            return <li key={user.id}>{user.first_name}</li>
             })}
            </ul>
        </div>
        </div>
    )

}