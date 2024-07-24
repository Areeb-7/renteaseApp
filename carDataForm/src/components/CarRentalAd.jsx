import React, { useRef, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import styles from './CarRentalAd.module.css';

const CarRentalAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const countUpRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }

    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.carRentalAd} ref={countUpRef}>
      <div className={styles.headerContent}>
        <div className={`${styles.headerContentRow} ${!isVisible ? styles.fadeOut : ''}`}>
          <h2>Wide Range of Commercial Cars for any occasion.</h2>
          <p className={`${styles.para} ${!isVisible ? styles.fadeOut : ''}`}>
            At our car rental agency, we believe that everyone deserves to experience the pleasure of driving a reliable and comfortable vehicle, regardless of their budget. We have curated a diverse fleet of well-maintained cars, ranging from sleek sedans to spacious SUVs, all at competitive prices. With our streamlined rental process, you can quickly and conveniently reserve your desired vehicle. Whether you need transportation for a business trip, family vacation, or simply want to enjoy a weekend getaway, we have flexible rental options to accommodate your schedule.
          </p>
        </div>
      </div>
      <div className={styles.highlights}>
        <div className={styles.highlight}>
          <h2>
            {isVisible ? (
              <CountUp start={0} end={25000} duration={2} delay={1} suffix="+" />
            ) : (
              <span>0+</span>
            )}
          </h2>
          <h6>Verified Cars</h6>
        </div>
        <div className={styles.highlight}>
          <h2>
            {isVisible ? (
              <CountUp start={0} end={20000} duration={2} delay={1} suffix="+" />
            ) : (
              <span>0+</span>
            )}
          </h2>
          <h6>Trusted Hosts</h6>
        </div>
        <div className={styles.highlight}>
          <h2>
            {isVisible ? (
              <CountUp start={0} end={2} duration={3} delay={1} suffix=" Billion +" />
            ) : (
              <span>0+</span>
            )}
          </h2>
          <h6>KMs Driven</h6>
        </div>
        <div className={styles.highlight}>
          <h2>
            {isVisible ? (
              <CountUp start={0} end={38} duration={3} delay={1} suffix=" +" />
            ) : (
              <span>12+</span>
            )}
          </h2>
          <h6>Cities And Counting...</h6>
        </div>
      </div>
    </div>
  );
};

export default CarRentalAd;
