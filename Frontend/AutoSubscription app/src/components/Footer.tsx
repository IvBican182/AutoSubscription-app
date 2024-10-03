import git_logo from "../assets/git-logo.png";
import styles from "./Footer.module.css";

//footer component with my details
export default function Footer() {
    return (
        <div className={styles.footer}>
            <a className={styles.link}>
                <img src={git_logo} alt="github logo"/>
                <p>Developed by IvBican182</p>
            </a>
            <p className={styles.copyright}>© Copyright 2024 Ivan Bićanić. All rights reserved.</p>
        </div>
    )
}