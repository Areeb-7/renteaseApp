import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import { Link, useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
const Login = () => {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const [showGetStarted, setShowGetStarted] = useState(false);

    const handleInputChange = (e) => {
        setMobile(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setShowGetStarted(false); // Reset the "Get Started" button visibility

        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                const users = await response.json();
                console.log(users);

                // Check if there is already a logged-in user
                const loggedInUser = users.find((user) => user.isLoggedIn);
                if (loggedInUser) {
                    setMessage("You are already logged in.");
                    navigate("/"); // Navigate to home page
                    return;
                }

                // Proceed with login attempt if no one is logged in
                const user = users.find((user) => user.mobile === mobile);
                if (user) {
                    await updateUserLoginStatus(user.id, true);
                    setMessage("Logged in successfully!");
                    setShowGetStarted(false); // Hide the "Get Started" button
                    navigate("/");
                } else {
                    setMessage("Account not found.");
                    setShowGetStarted(true); // Show the "Get Started" button
                }
            } else {
                setMessage("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setMessage("An error occurred while fetching user data.");
        }
    };

    const updateUserLoginStatus = async (userId, status) => {
        try {
            // Fetch existing user data
            const userResponse = await fetch(
                `http://localhost:3000/users/${userId}`
            );
            if (userResponse.ok) {
                const userData = await userResponse.json();

                // Update only the isLoggedIn property
                const updatedUserData = { ...userData, isLoggedIn: status };

                // Send the updated user data back to the server
                const updateResponse = await fetch(
                    `http://localhost:3000/users/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedUserData),
                    }
                );

                if (!updateResponse.ok) {
                    console.error("Failed to update user login status");
                    setMessage("Failed to update login status.");
                }
            } else {
                console.error("Failed to fetch user details for updating");
                setMessage("Failed to fetch user details for updating.");
            }
        } catch (error) {
            console.error("Error updating user login status:", error);
            setMessage("An error occurred while updating login status.");
        }
    };

    return (
      <>
        <div className={styles.loginContainer}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number."
                        required
                        className={styles.inputGroup}
                    />
                </div>
                
                <button type="submit" className={styles.loginButton}>
                    Login
                </button>
                {message && <p className={styles.loginMessage}>{message}</p>}
                {showGetStarted && (
                    <Link to="/register" className={styles.getStartedLink}>
                        <button type="button" className={styles.getStartedButton}>
                            Get Started
                        </button>
                    </Link>
                )}
                <div className={styles.socialLoginContainer}>
                    <hr className={styles.line} />
                    <div className={styles.signUpWith}>Sign Up with</div>
                    <div className={styles.socialLoginIcons}>
                        <div className={styles.socialIconBox}>
                            <button type="button" className={styles.socialLoginButton}>
                                <a
                                    href="https://www.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLoginLink}
                                >
                                    <img
                                        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" // replace with actual URL
                                        alt="Google Logo"
                                        className={styles.socialIcon2}
                                    />
                                    <span className={styles.socialText}>Google</span>
                                </a>
                            </button>
                        </div>
                        <div className={styles.socialIconBox}>
                            <button type="button" className={styles.socialLoginButton}>
                                <a
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLoginLink}
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" // replace with actual URL
                                        alt="Facebook Logo"
                                        className={styles.socialIcon}
                                    />
                                    <span className={styles.socialText}>Facebook</span>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <AboutUs/>
        </>
    );
};

export default Login;
