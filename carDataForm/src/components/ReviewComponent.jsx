import React, { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./ReviewComponent.module.css";

const ReviewComponent = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews(); // Fetch reviews when component mounts
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars"); // Replace with your actual endpoint for reviews
            if (response.ok) {
                const data = await response.json();
                // Limit to 8 reviews
                const limitedReviews = data.slice(0, 8);
                setReviews(limitedReviews);
            } else {
                console.error("Failed to fetch reviews");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <div className={styles.reviewContainer}>
                <div className={styles.carouselText2}>
                <p>HEAR FROM OUR GUESTS</p>
                </div>

            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                interval={5000}
                showStatus={false} // Hide status indicator
                emulateTouch
                swipeable
                centerMode
                centerSlidePercentage={25.33}
                className={styles.fullWidthCarousel} // Custom class for full width
            >
                {reviews.map((review, index) => (
                    <div key={index} className={styles.reviewCard}>
                        <div className={styles.cardContent}>
                            <img
                                src={review.reviews[0].userimage}
                                alt="User"
                                className={styles.userImage}
                            />
                            <div className={styles.reviewDetails}>
                                <h3>{review.reviews[0].username}</h3>
                                <p>{review.reviews[0].review}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ReviewComponent;