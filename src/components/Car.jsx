import React from "react";
import styles from "./Car.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGasPump, faCogs, faCar } from '@fortawesome/free-solid-svg-icons';

const Car = (props) => {
    let navigate = useNavigate();

    function handleRent(id) {
        navigate(`/booking/${id}`);
    }

    return (
        <div className={styles.carCard}>
            <img src={props.imageUrl} alt="Car" className={styles.carImage} />
            <div className={styles.carDetails}>
                <div className={styles.carInfo}>
                    <h3>{props.name}</h3>
                </div>
                <div className={styles.carSpecs}>
                    <div className={styles.carSpecItem}>
                        <FontAwesomeIcon icon={faUser} className={styles.iconUser} />
                        <p>{props.seater}</p>
                    </div>
                    <div className={styles.carSpecItem}>
                        <FontAwesomeIcon icon={faGasPump} className={styles.iconFuel} />
                        <p>{props.fuelType}</p>
                    </div>
                    {/* <div className={styles.carSpecItem}>
                        <p>{props.transmission}</p>
                    </div> */}
                    <div className={styles.carSpecItem}>
                        <FontAwesomeIcon icon={faCar} className={styles.iconType} />
                        <p>{props.type}</p>
                    </div>
                </div>
                <div className={styles.carPricing}>
                    <p className={styles.pricePerHour}>&#8377;{props.pricePerHour}</p>
                    <button
                        className={styles.rentButton}
                        onClick={() => {
                            handleRent(props.carId);
                        }}
                    >
                        Rent 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Car;
