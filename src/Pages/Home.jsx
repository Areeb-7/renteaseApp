import React, { useState, useEffect, createContext } from "react";
import { differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import CarList from "../components/CarList";
import Car from "../components/Car";
import ReviewComponent from "../components/ReviewComponent";
import Marquee from "react-fast-marquee";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import Steps from "../components/Steps";
import CarRentalAd from "../components/CarRentalAd";
import FaqComponent from "../components/FaqComponent";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import SketchfabEmbed from './SketchfabEmbed';

export const HourContext = createContext();

const Home = () => {
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [pickUpDateTime, setPickUpDateTime] = useState("");
    const [dropOffLocation, setDropOffLocation] = useState("");
    const [dropOffDateTime, setDropOffDateTime] = useState("");
    const [hoursDifference, setHoursDifference] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const currentDateTime = new Date().toISOString().slice(0, 16);
        setPickUpDateTime(currentDateTime);
        setDropOffDateTime(currentDateTime);

        fetchUsersData();

        // Inject Botpress scripts
        const injectScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
        injectScript.async = true;
        document.body.appendChild(injectScript);

        const configScript = document.createElement("script");
        configScript.src = "https://mediafiles.botpress.cloud/eb6f4087-e0f4-45d7-a7ae-765b02aaf7bb/webchat/v2/config.js";
        configScript.async = true;
        document.body.appendChild(configScript);

        return () => {
            document.body.removeChild(injectScript);
            document.body.removeChild(configScript);
        };
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                const users = await response.json();
                const user = users[0];
                setCurrentUser(user);
                setIsLoggedIn(user?.isLoggedIn);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const calculateHoursDifference = () => {
        if (pickUpDateTime && dropOffDateTime) {
            const pickUpDate = new Date(pickUpDateTime);
            const dropOffDate = new Date(dropOffDateTime);
            const diffHours = differenceInHours(dropOffDate, pickUpDate);
            setHoursDifference(diffHours);
        } else {
            setHoursDifference(null);
        }
    };

    const handleFindVehicle = async () => {
        if (isLoggedIn && currentUser) {
            calculateHoursDifference();

            const bookingData = {
                bookingId: "",
                pickUpLocation,
                dropOffLocation,
                pickUpDateTime,
                dropOffDateTime,
                hoursDifference,
                status: "scheduled",
                carName: "",
                userId: currentUser?.id,
            };

            try {
                const response = await fetch("http://localhost:3000/booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                });
                if (response.ok) {
                    console.log("Booking created successfully");
                    navigate("/search");
                } else {
                    console.error("Failed to create booking");
                }
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        } else {
            alert("Please register yourself with us :)");
            navigate("/register");
        }
    };

    return (
        <>
            <HourContext.Provider value={{ hoursDifference, setHoursDifference }}>
                <Navbar />
                <div className={styles.home_head}>
                    <div className={styles.hero_section}>
                        <h1>Looking for a <span className={styles.highlight}>vehicle</span>? You're at the right place.</h1>
                        <div className={styles.home_container}>
                            <div className={styles.input_group}>
                                <label>Pick Up Location:</label>
                                <input
                                    type="text"
                                    value={pickUpLocation}
                                    onChange={(e) => setPickUpLocation(e.target.value)}
                                    className={styles.input_field}
                                    placeholder="From: Address"
                                />
                            </div>
                            <div className={styles.input_group2}>
                                <label>Pick Up Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    value={pickUpDateTime}
                                    onChange={(e) => setPickUpDateTime(e.target.value)}
                                    className={styles.input_field}
                                />
                            </div>
                            <div className={styles.input_group}>
                                <label>Drop Off Location:</label>
                                <input
                                    type="text"
                                    value={dropOffLocation}
                                    onChange={(e) => setDropOffLocation(e.target.value)}
                                    className={styles.input_field}
                                    placeholder="To: Address"
                                />
                            </div>
                            <div className={styles.input_group2}>
                                <label>Drop Off Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    value={dropOffDateTime}
                                    onChange={(e) => setDropOffDateTime(e.target.value)}
                                    className={styles.input_field}
                                />
                            </div>
                            <button
                                onClick={handleFindVehicle}
                                className={styles.calculate_button}
                            >
                                Find a Vehicle
                            </button>
                        </div>
                    </div>
                </div>
                <Marquee className={styles.mar}>
                    <h1 className={styles.marh}>Suv</h1>
                    <h1 className={styles.marh}>Sedan</h1>
                    <h1 className={styles.marh}>Hatchback</h1>
                </Marquee>
                <Feature />
                <Steps />
                <CarRentalAd />
                <CarList />
                <ReviewComponent />
      <SketchfabEmbed />
                <FaqComponent />
                <Contact />
                <AboutUs />

            </HourContext.Provider>
        </>
    );
};

export default Home;