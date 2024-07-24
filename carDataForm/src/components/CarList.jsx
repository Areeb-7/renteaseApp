import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Car from "./Car";
import styles from "./CarList.module.css";

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars");
            if (response.ok) {
                const data = await response.json();
                setCars(data.slice(0, 6)); // Only take the first 6 cars for display
            } else {
                console.error("Failed to fetch cars");
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    return (
        <div className={styles.carListContainer}>
                <p className={styles.carouselText1}>Enjoy Your Ride</p>
                <div className={styles.carouselText2}>
                <p>Our Vehicle Fleet</p>
                </div>
                <div className={styles.carouselText3}>

                <p>Driving your dreams to reality with an exquisite fleet of versatile vehicles for unforgettable journeys.</p>                </div>

            <div className={styles.carouselContainer}>
                <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={5000}
                    showStatus={false} // Hide status indicator
                    emulateTouch
                    swipeable
                    centerMode
                    centerSlidePercentage={30.33} // Adjust percentage for number of visible slides
                >
                    {cars.map((car) => (
                        <div key={car.id}>
                            <Car
                                imageUrl={car.images.image1}
                                type={car.type}
                                name={car.name}
                                fuelType={car.fuelType}
                                seater={car.seater}
                                pricePerHour={car.pricing}
                                carId={car.id}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CarList;
