import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MyOrders.module.css"; // Ensure this path is correct
import Navbarcomp from "../components/Navbarcomp";
import AboutUs from "../components/AboutUs";
const MyOrders = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState({
        completed: [],
        cancelled: [],
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/booking?userId=${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const bookingsData = await response.json();
                categorizeBookings(bookingsData);
            } catch (error) {
                console.error("Error fetching bookings:", error.message);
            }
        };

        fetchBookings();
    }, [id]);

    const categorizeBookings = (bookingsData) => {
        const completed = [];
        const cancelled = [];

        bookingsData.forEach((booking) => {
            if (booking.status === "completed") {
                completed.push(booking);
            } else if (booking.status === "cancelled") {
                cancelled.push(booking);
            }
        });

        setBookings({
            completed,
            cancelled,
        });
    };
    console.log(bookings)

    return (
        <>
        <Navbarcomp/>
        <div className={styles.header_image}>
                <p>My Orders</p>
            </div>
        <div className={styles.container}>
            <h2 className={styles.heading}>My Orders</h2>
            <div className={styles.orders}>
                {bookings.completed.length > 0 && (
                    <div className={styles.category}>
                        <h3 className={styles.categoryHeading}>
                            Completed Orders
                        </h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Car Name</th>
                                    <th>Pick Up Location</th>
                                    <th>Drop Off Location</th>
                                    <th>Pick Up Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.completed.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.carName}</td>
                                        <td>{booking.pickUpLocation}</td>
                                        <td>{booking.dropOffLocation}</td>
                                        <td>{booking.pickUpDateTime}</td>
                                        <td>{booking.dropOffDateTime}</td>
                                        <td
                                            className={styles.statusCompleted}
                                        >
                                            Completed
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {bookings.cancelled.length > 0 && (
                    <div className={styles.category}>
                        <h3 className={styles.categoryHeading}>
                            Cancelled Orders
                        </h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Car Name</th>
                                    <th>Pick Up Location</th>
                                    <th>Drop Off Location</th>
                                    <th>Pick Up Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.cancelled.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.carName}</td>
                                        <td>{booking.pickUpLocation}</td>
                                        <td>{booking.dropOffLocation}</td>
                                        <td>{booking.pickUpDateTime}</td>
                                        <td>{booking.dropOffDateTime}</td>
                                        <td
                                            className={styles.statusCancelled}
                                        >
                                            Cancelled
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        <AboutUs/>
        </>
    );
};

export default MyOrders;
