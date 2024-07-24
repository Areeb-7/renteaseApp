import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import normalLogo from "../assets/logo2.png"; // Adjust the path to your normal logo file
import scrolledLogo from "../assets/logo1.png"; // Adjust the path to your scrolled logo file
import styles from "./Navbarcomp.module.css";
import { Link, useLocation, useNavigate} from "react-router-dom"; // Use Link from react-router-dom for better navigation

const Navbarcomp = () => {
    const [scrolled, setScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [navbarTop, setNavbarTop] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrolled = currentScrollPos > 100; // Adjust the value as needed
            setScrolled(isScrolled);

            if (currentScrollPos > 600) {
                if (currentScrollPos > prevScrollPos) {
                    setNavbarTop("-100px"); // Move navbar off-screen smoothly
                } else {
                    setNavbarTop("0"); // Bring navbar back on-screen smoothly
                }
            } else {
                setNavbarTop("0"); // Reset navbar position
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/users");
                if (response.ok) {
                    const users = await response.json();
                    const loggedInUser = users.find((user) => user.isLoggedIn);
                    if (loggedInUser) {
                        setLoggedInUser(loggedInUser);
                    }
                } else {
                    console.error("Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`} style={{ top: navbarTop }}>
            <div className={styles.navbarLeft}>
                <Link to="/home" className={activeLink === "/home" ? styles.active : ""} onClick={() => setActiveLink("/home")}>Home</Link>
                <Link to="/drivers" className={activeLink === "/drivers" ? styles.active : ""} onClick={() => setActiveLink("/drivers")}>Drivers</Link>
                <Link to="#about" className={activeLink === "#about" ? styles.active : ""} onClick={() => setActiveLink("#about")}>About Us</Link>
            </div>
            <div className={styles.navbarLogo}>
                <Link to="/home">
                    <img
                        src={scrolled ? scrolledLogo : normalLogo}
                        alt="Logo"
                        className={styles.logoImg}
                    />
                </Link>
            </div>
            <div className={styles.navbarRight}>
                <Link to="/search">
                    <div className={styles.searchContainer}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                    </div>
                </Link>
                {loggedInUser ? (
                    <span  onClick={()=>{
                        navigate("/profile")
                    }} className={styles.userName}>{loggedInUser.name}</span>
                ) : (
                    <div className={styles.signContainer}>
                        <a href="/login">Log In</a>
                        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbarcomp;
