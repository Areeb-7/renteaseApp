import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CarDetails.module.css"; // Import CSS module
import Review from "./Review";
import Booking from "./Booking"; // Import Booking component
import Navbarcomp from "../components/Navbarcomp";
import AboutUs from "../components/AboutUs";
const CarDetails = () => {
    const { id } = useParams(); // Get car ID from URL params
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch car details
                const carResponse = await fetch(
                    `http://localhost:3000/cars/${id}`
                );
                if (!carResponse.ok) {
                    throw new Error("Failed to fetch car data");
                }
                const carData = await carResponse.json();
                setCarData(carData);
                setMainImage(carData.images.image1); // Set initial main image
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!carData) {
        return <div>No car data found</div>;
    }

    return (
        <>
         <Navbarcomp/>

        <div className={styles["car-details-container"]}>

            <div className={styles["header-image"]}>
                <p>Car Details</p>
            </div>

            <div className={styles["car-details-card"]}>
                <div className={styles["carousel"]}>
                    <div>
                        <img className={styles["large-image"]} src={mainImage} alt="Main" />
                    </div>
                    <div className={styles["thumbnails"]}>
                        <img
                            className={styles["small-image"]}
                            src={carData.images.image1}
                            alt="Car 1"
                            onClick={() => handleThumbnailClick(carData.images.image1)}
                        />
                        <img
                            className={styles["small-image"]}
                            src={carData.images.image2}
                            alt="Car 2"
                            onClick={() => handleThumbnailClick(carData.images.image2)}
                        />
                        <img
                            className={styles["small-image"]}
                            src={carData.images.image3}
                            alt="Car 3"
                            onClick={() => handleThumbnailClick(carData.images.image3)}
                        />
                        <img
                            className={styles["small-image"]}
                            src={carData.images.image4}
                            alt="Car 4"
                            onClick={() => handleThumbnailClick(carData.images.image4)}
                        />
                    </div>
                    <div className={styles["customer-reviews"]}>
                        <h3>Reviews</h3>
                        <div className={styles["review"]}>
                            <Review />
                        </div>
                    </div>
                </div>
                <div className={styles["car-details"]}>
                    <div className={styles["specifications"]}>
                        <h3 id={styles["b"]}>{carData.name}</h3>
                        <b>Specifications</b>
                        <div className={styles["spec-item"]}>
                            <span>Model</span>
                            <span>{carData.model}</span>
                        </div>
                        <hr />
                        <div className={styles["spec-item"]}>
                            <span>Year</span>
                            <span>{carData.year}</span>
                        </div>
                        <hr />
                        <div className={styles["spec-item"]}>
                            <span>Seater</span>
                            <span>{carData.seater}</span>
                        </div>
                        <hr />
                        <div className={styles["spec-item"]}>
                            <span>Fuel Type</span>
                            <span>{carData.fuelType}</span>
                        </div>
                        <hr />
                        <div className={styles["spec-item"]}>
                            <span>Transmission</span>
                            <span>{carData.transmission}</span>
                        </div>
                        <hr />
                        <div className={styles["spec-item"]}>
                            <span>Car Location</span>
                            <span>{carData.location.carLocation}</span>
                        </div>
                        <hr />
                        <div className={styles["features"]}>
                            <h3>Features</h3>
                            <ul>
                                <li className={styles["feature-item"]}>
                                    {carData.features.feature1}
                                </li>
                                <li className={styles["feature-item"]}>
                                    {carData.features.feature2}
                                </li>
                                <li className={styles["feature-item"]}>
                                    {carData.features.feature3}
                                </li>
                                <li className={styles["feature-item"]}>
                                    {carData.features.feature4}
                                </li>
                                <li className={styles["feature-item"]}>
                                    {carData.features.feature5}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles["booking-detail"]}>
                    <div className={styles["daily-rate"]}>
                        <h5>Daily Rate</h5>
                        ₹{carData.pricing}
                    </div>
                    <Booking carId={id} carPrice={carData.pricing} />
                </div>
            </div>
        </div>
        <AboutUs/>
        </>
    );
};

export default CarDetails;
