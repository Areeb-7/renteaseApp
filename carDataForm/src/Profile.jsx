import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css"; // Import your CSS module for styling
import ProfileSidebar from "./ProfileSidebar";
import Navbarcomp from "./components/Navbarcomp";
import AboutUs from "./components/AboutUs";
const Profile = () => {
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        mobile: "",
        email: "",
        gender: "",
        city: "",
        profileImagePath: "",
        isLoggedIn: false,
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/users?isLoggedIn=true"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userDataList = await response.json();
                if (userDataList.length === 0) {
                    throw new Error("No logged-in user found");
                }
                const loggedInUser = userDataList[0]; // Assuming there's only one logged-in user
                setUserData(loggedInUser);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/users/${userData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update user data");
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error.message);
        }
    };
    console.log(userData.id);

    return (
        <>
        <Navbarcomp/>
        <div className={styles.header_image}>
                <p>Profile</p>
            </div>
            <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.profileForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={userData.mobile}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        {!isEditing ? (
                            <button
                                className={styles.editButton}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    className={styles.updateButton}
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    </div>
                </div>
                </div>

            <ProfileSidebar userId={userData.id} isProfilePage={true} />
            <AboutUs/>

        </>
    );
};

export default Profile;