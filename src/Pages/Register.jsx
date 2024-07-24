import React, { useState, useEffect } from "react";
import styles from  "./Register.module.css";
import { useNavigate } from "react-router-dom";
import Navbarcomp from "../components/Navbarcomp";
import AboutUs from "../components/AboutUs";


const Register = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        gender: "",
        city: "",
        profileImagePath: "", // Holds image path
        isLoggedIn: false, // Add isLoggedIn property with default value false
    });

    const [previewUrl, setPreviewUrl] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch existing users when the component mounts
        fetchExistingUsers();
    }, []);

    const fetchExistingUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error("Failed to fetch existing users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                profileImagePath: `src/assets/${file.name}`,
            });
            const previewURL = URL.createObjectURL(file);
            setPreviewUrl(previewURL);
        }
    };

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            profileImagePath: "", // Clear image path
        });
        setPreviewUrl("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if user already exists
        const existingUser = users.find(
            (user) => user.mobile === formData.mobile
        );
        if (existingUser) {
            alert("User already registered!");
            navigate("/login");
        } else {
            console.log(formData);
            // Prepare form data for submission
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    alert("Form submitted successfully!");
                    fetchExistingUsers(); // Refresh the user list
                    // Clear form
                    setFormData({
                        name: "",
                        mobile: "",
                        email: "",
                        gender: "",
                        city: "",
                        profileImagePath: "", // Clear image path
                        isLoggedIn: false, // Reset to default value
                    });
                    setPreviewUrl("");
                    navigate("/login");
                } else {
                    alert("Failed to submit form");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <>
            <Navbarcomp />
            <section className={styles.section}>

                <form onSubmit={handleSubmit} className={styles.form_container}>
<h1>Register Now</h1>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            pattern="[0-9]{10}"
                            title="Enter a 10-digit mobile number."
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,6}"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="profileImage">Profile Image:</label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {previewUrl && (
                        <div className={styles.image_preview}>
                            <img
                                src={previewUrl}
                                alt="Image Preview"
                                className={styles.image}
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className={styles.remove_button}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                    <button type="submit" className={styles.button_submit}>
                        Submit
                    </button>

                </form>
                </section>
<AboutUs/>
        </>
    );
};

export default Register;
