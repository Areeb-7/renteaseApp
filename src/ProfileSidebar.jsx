// ProfileSidebar.js
import React, { useState, useEffect } from "react";
import styles from "./ProfileSidebar.module.css";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ userId, isProfilePage }) => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        profileImagePath: "",
        isLoggedIn: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/users/${userId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                console.log(userData);
                if (!userData.isLoggedIn) {
                    throw new Error("No logged-in user found");
                }
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchUserData();
    }, [userId]);

    // Handle sign-out logic
    const handleSignOut = async () => {
        try {
            // Update user's isLoggedIn status to false on the server
            const response = await fetch(
                `http://localhost:3000/users/${userId}`,
                {
                    method: "PATCH", // or "PUT", depending on your API
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isLoggedIn: false }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update user status");
            }

            // Navigate to the home page after successful sign-out
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img
                    src={userData.profileImagePath}
                    alt="Profile"
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.options}>
                <p className={styles.username}>{userData.name}</p>
                <ul className={styles.nav}>
                    <li className={styles.navItem}>
                        {isProfilePage ? (
                            <a
                                onClick={() => {
                                    navigate(`/orders/${userData.id}`);
                                }}
                                className={styles.navLink}
                            >
                                My Orders
                            </a>
                        ) : (
                            <span className={styles.disabledNavLink}>
                                My Orders
                            </span>
                        )}
                    </li>
                    <li className={styles.navItem}>
                        {isProfilePage ? (
                            <button
                                className={styles.signOutButton}
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                className={styles.disabledSignOutButton}
                                disabled
                            >
                                Sign Out
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileSidebar;