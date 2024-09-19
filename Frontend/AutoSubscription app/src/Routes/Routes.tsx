import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Homepage from "../Pages/Homepage";
import GroupsPage from "../Pages/GroupsPage";
import App from "../App";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";




export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/home", element: <Homepage /> },
            { path: "/groups", element: <GroupsPage /> },
            { path: "/login", element: <Login /> },
            { path: "/signUp", element: <SignUp /> },
            
            
        ]
    }
]);