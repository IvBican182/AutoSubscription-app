import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { RootState } from "../Redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";


export default function Navbar() {
    const dispatch = useDispatch();
    const isToken = useSelector((state: RootState) => state.auth.token);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-2">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                {isToken && (
                        <>
                            <li className="nav-item active">
                                <NavLink to ="/home" className="homepage">HOME <span className="sr-only">(current)</span></NavLink>
                            </li>
                            {/* Groups Link - Visible only when logged in */}
                            <li className="nav-item">
                                <NavLink to="/groups" className="nav-link">GROUPS</NavLink>
                            </li>
                            {/* Sign Out Link - Visible only when logged in */}
                            <li className="nav-item">
                                <NavLink to="/login" className="auth"><button onClick={() => dispatch(logout())} className="nav-link">Sign Out</button></NavLink>
                            </li>
                        </>
                    )}

                    {/* Sign In Link - Visible only when not logged in */}
                    {!isToken && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login" className="auth"><span className="nav-link">Sign In</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signUp" className="auth"><span className="nav-link">Sign Up</span></NavLink>
                            </li>
                        </>
                    )}
            </ul>
        </div>
    </nav>
    )

}