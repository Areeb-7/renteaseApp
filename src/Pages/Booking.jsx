import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.css";

const Booking = ({ carId, carPrice }) => {
    const [pickupDateTime, setPickupDateTime] = useState("");
    const [dropoffDateTime, setDropoffDateTime] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [hireDriver, setHireDriver] = useState(false);
    const [homeDelivery, setHomeDelivery] = useState(false);
    const [carName, setCarName] = useState("");
    const [bookingId, setBookingId] = useState(null);
    const [hoursDifference, setHoursDifference] = useState(0);
    const [carPricePerHour, setCarPricePerHour] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch logged-in user
                const usersResponse = await fetch(
                    `http://localhost:3000/users?isLoggedIn=true`
                );
                if (!usersResponse.ok) {
                    throw new Error("Failed to fetch users data");
                }
                const usersData = await usersResponse.json();
                if (usersData.length === 0) {
                    throw new Error("No logged-in user found");
                }
                const loggedInUser = usersData[0];

                // Fetch bookings for the logged-in user
                const bookingsResponse = await fetch(
                    `http://localhost:3000/booking?userId=${loggedInUser.id}`
                );
                if (!bookingsResponse.ok) {
                    throw new Error("Failed to fetch booking data");
                }
                const bookings = await bookingsResponse.json();

                // Find the latest "scheduled" booking
                const scheduledBookings = bookings
                    .filter((booking) => booking.status === "scheduled")
                    .sort(
                        (a, b) =>
                            new Date(b.pickUpDateTime) -
                            new Date(a.pickUpDateTime)
                    );

                const latestBooking =
                    scheduledBookings.length > 0 ? scheduledBookings[0] : null;

                if (latestBooking) {
                    setBookingId(latestBooking.id);

                    const pickupDateTime = new Date(
                        latestBooking.pickUpDateTime
                    );
                    const dropoffDateTime = new Date(
                        latestBooking.dropOffDateTime
                    );

                    setPickupDateTime(
                        pickupDateTime.toLocaleString("en-US", {
                            timeZone: "Asia/Kolkata",
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    );
                    setDropoffDateTime(
                        dropoffDateTime.toLocaleString("en-US", {
                            timeZone: "Asia/Kolkata",
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    );

                    setPickupLocation(latestBooking.pickUpLocation);
                    setDropoffLocation(latestBooking.dropOffLocation);

                    // Fetch car data
                    const carResponse = await fetch(
                        `http://localhost:3000/cars/${carId}`
                    );
                    if (!carResponse.ok) {
                        throw new Error("Failed to fetch car data");
                    }
                    const carData = await carResponse.json();
                    setCarName(carData.name);

                    const hoursDiff = calculateHoursDifference(
                        latestBooking.pickUpDateTime,
                        latestBooking.dropOffDateTime
                    );
                    setHoursDifference(hoursDiff);

                    const pricePerHour = parseFloat(
                        carPrice.replace(/\D/g, "")
                    );
                    setCarPricePerHour(pricePerHour);

                    const initialTotalPrice = calculateTotalPrice(
                        pricePerHour,
                        hoursDiff,
                        latestBooking.driver || false,
                        homeDelivery
                    );
                    setTotalPrice(initialTotalPrice);

                    setHireDriver(latestBooking.driver || false);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, [carId, carPrice, homeDelivery]);

    const calculateHoursDifference = (pickup, dropoff) => {
        const pickupDate = new Date(pickup);
        const dropoffDate = new Date(dropoff);
        const difference = Math.abs(dropoffDate - pickupDate);
        return Math.ceil(difference / (1000 * 60 * 60));
    };

    const calculateTotalPrice = (
        pricePerHour,
        hoursDifference,
        driver,
        delivery
    ) => {
        let total = pricePerHour * hoursDifference;
        if (driver) {
            total += hoursDifference * 100; // Add 100 times the number of hours
        }
        if (delivery) {
            total += 150; // Adding 150 for home delivery
        }
        return total.toFixed(2);
    };

    const handleHireDriver = async () => {
        const newHireDriver = !hireDriver; // Toggle the hireDriver state

        try {
            const response = await fetch(
                `http://localhost:3000/booking/${bookingId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        driver: newHireDriver,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update booking with driver");
            }

            // Update the hireDriver state
            setHireDriver(newHireDriver);

            // Update the total price based on the new hireDriver state
            const updatedPrice = calculateTotalPrice(
                carPricePerHour,
                hoursDifference,
                newHireDriver,
                homeDelivery
            );

            setTotalPrice(updatedPrice); // Update total price state
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleHomeDelivery = () => {
        const newHomeDelivery = !homeDelivery;
        setHomeDelivery(newHomeDelivery);

        const updatedPrice = calculateTotalPrice(
            carPricePerHour,
            hoursDifference,
            hireDriver,
            newHomeDelivery
        );
        setTotalPrice(updatedPrice);
    };

    const handleBooking = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/booking/${bookingId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pickUpDateTime: pickupDateTime,
                        dropOffDateTime: dropoffDateTime,
                        pickUpLocation: pickupLocation,
                        dropOffLocation: dropoffLocation,
                        totalPrice,
                        carName,
                        status: "completed",
                        driver: hireDriver,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update booking");
            }
            alert("Booking Updated!");
            navigate(`/success/${bookingId}`)
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleCancelBooking = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/booking/${bookingId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "cancelled",
                        pickUpDateTime:pickupDateTime,
                        dropOffDateTime:dropoffDateTime,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update booking status");
            }
            alert("Booking Status Updated to Cancelled!");
            navigate("/");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className={styles["sidebar"]}>
            <h3>Booking Details</h3>
            <p className={styles["car-name"]}>Car: {carName}</p>

            <div className={styles["detail-item"]}>
                <label>Pickup Date:</label>
                <p className={styles["detail-value"]}>{pickupDateTime}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Dropoff Date:</label>
                <p className={styles["detail-value"]}>{dropoffDateTime}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Pickup Location:</label>
                <p className={styles["detail-value"]}>{pickupLocation}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Dropoff Location:</label>
                <p className={styles["detail-value"]}>{dropoffLocation}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Number of Hours:</label>
                <p className={styles["detail-value"]}>{hoursDifference}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Price Per Hour:</label>
                <p className={styles["detail-value"]}>
                    &#8377;{carPricePerHour}
                </p>
            </div>

            <div className={styles["option-buttons"]}>
                <button
                    className={hireDriver ? styles["selected"] : ""}
                    onClick={handleHireDriver}
                >
                    {hireDriver ? "Unhire Driver" : "Hire a Driver"}
                </button>
                <button
                    className={homeDelivery ? styles["selected"] : ""}
                    onClick={handleHomeDelivery}
                >
                    Home Delivery
                </button>
            </div>

            <div className={styles["total-price"]}>
                Total Price: &#8377;{totalPrice}
            </div>

            <button className={styles["book-button"]} onClick={handleBooking}>
                Complete Booking
            </button>
            <button
                className={styles["cancel-button"]}
                onClick={handleCancelBooking}
            >
                Cancel Booking
            </button>
        </div>
    );
};

export default Booking;