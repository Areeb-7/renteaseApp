import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./BookingDone.module.css"; // Import your CSS module for styling

const BookingDone = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [assignedDriver, setAssignedDriver] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/booking/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch booking details");
                }
                const bookingData = await response.json();
                setBooking(bookingData);

                if (bookingData.driver) {
                    const driversResponse = await fetch(
                        `http://localhost:3000/drivers`
                    );
                    if (!driversResponse.ok) {
                        throw new Error("Failed to fetch drivers");
                    }
                    const driversData = await driversResponse.json();
                    const randomDriver =
                        driversData[
                            Math.floor(Math.random() * driversData.length)
                        ];
                    setAssignedDriver(randomDriver);
                }
            } catch (error) {
                console.error("Error fetching booking details:", error.message);
            }
        };

        fetchBookingDetails();
    }, [id]);

    const handleDone = async () => {
        try {
            const updatedDriver = assignedDriver
                ? assignedDriver.name
                : "No driver";
            const response = await fetch(
                `http://localhost:3000/booking/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ driver: updatedDriver }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update booking details");
            }

            navigate("/home"); // Navigate back to the home page
        } catch (error) {
            console.error("Error updating booking details:", error.message);
        }
    };

    return (
        <>
        <div className={styles.section}>
        <div className={styles.container}>
            <h2 className={styles.successMessage}>
                Booking Completed Successfully!
            </h2>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWzRSF0Hl2KSwmr9NopxVmaks0mHqfHY6ag&s"
                alt="Booking Successful"
                className={styles.successImage}
                
            />
<h2 className={styles.successMessage}>
                 Driver 
            </h2>
            {assignedDriver && (
                <div className={styles.driverCard}>
                    <img
                        src={assignedDriver.imageURL}
                        alt={assignedDriver.name}
                        className={styles.driverImage}
                    />
                    <div className={styles.driverDetails}>
                        <div className={styles.driverName}>
                            {assignedDriver.name}
                        </div>
                        <div className={styles.driverState}>
                            {assignedDriver.state}
                        </div>
                        <div className={styles.driverFeedback}>
                            <p>{assignedDriver.feedback.comment}</p>
                            <div className={styles.rating}>
                                <span className={styles.ratingIcon}>
                                    {assignedDriver.feedback.rating}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={handleDone} className={styles.doneButton}>
                Done
            </button>
        </div>
        </div>
        </>
    );
};

export default BookingDone;