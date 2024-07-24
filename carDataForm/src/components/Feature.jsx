import React, { useRef, useState, useEffect } from 'react';
import styles from './Features.module.css';
import { useSpring, animated } from 'react-spring';
import '@fontsource/metropolis'; // Defaults to weight 400.

const Feature = ({ icon, title, description }) => {
  return (
    <div className={styles.feature}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <span>
        <p>{description}</p>
      </span>
    </div>
  );
};

const Features = () => {
  const [isVisible, setIsVisible] = useState({
    leftColumn: false,
    rightColumn: false,
    carContainer: false,
  });

  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const carContainerRef = useRef(null);

  const leftColumnAnimation = useSpring({
    opacity: isVisible.leftColumn ? 1 : 0,
    transform: isVisible.leftColumn ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 200, friction: 30 },
  });

  const rightColumnAnimation = useSpring({
    opacity: isVisible.rightColumn ? 1 : 0,
    transform: isVisible.rightColumn ? 'translateX(0%)' : 'translateX(100%)',
    config: { tension: 200, friction: 30 },
  });

  const carContainerAnimation = useSpring({
    opacity: isVisible.carContainer ? 1 : 0,
    transform: isVisible.carContainer ? 'translateY(0%)' : 'translateY(-100%)',
    config: { tension: 80, friction: 40 },
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          switch (entry.target) {
            case leftColumnRef.current:
              setIsVisible(prev => ({ ...prev, leftColumn: true }));
              break;
            case rightColumnRef.current:
              setIsVisible(prev => ({ ...prev, rightColumn: true }));
              break;
            case carContainerRef.current:
              setIsVisible(prev => ({ ...prev, carContainer: true }));
              break;
            default:
              break;
          }
        }
      });
    }, observerOptions);

    if (leftColumnRef.current) observer.observe(leftColumnRef.current);
    if (rightColumnRef.current) observer.observe(rightColumnRef.current);
    if (carContainerRef.current) observer.observe(carContainerRef.current);

    return () => {
      if (leftColumnRef.current) observer.unobserve(leftColumnRef.current);
      if (rightColumnRef.current) observer.unobserve(rightColumnRef.current);
      if (carContainerRef.current) observer.unobserve(carContainerRef.current);
    };
  }, []);

  return (
    <div className={styles.featuresContainer}>
      <h2>Why Choose Us</h2>
      <h1>Our Features</h1>
      <span className={styles.introText}>
        <p>Discover a world of convenience, safety, and customization, paving the way for unforgettable adventures and seamless mobility solutions.</p>
      </span>

      <div className={styles.features}>
        <div className={styles.column} ref={leftColumnRef}>
          <animated.div style={leftColumnAnimation} className={styles.featuresColumn}>
          <Feature  title="🚗 Free Pick-Up & Drop-Off" description="Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience." />
            <Feature  title="🏆 First class services" description="Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation." />
          </animated.div>
        </div>
        <div className={styles.column} ref={carContainerRef}>
          <animated.div style={carContainerAnimation} className={styles.carContainer}>
            <img className={styles.carImage} src="https://www.madebydesignesia.com/themes/rentaly/images/misc/car.png" alt="Car" />
          </animated.div>
        </div>
        <div className={styles.column} ref={rightColumnRef}>
          <animated.div style={rightColumnAnimation} className={styles.featuresColumn1}>
            <Feature  title="🏷️ Quality at Minimum Expense" description="Unlocking affordable brilliance with elevating quality while minimizing costs for maximum value." />
            <Feature  title="🛠️ 24/7 road assistance" description="Reliable support when you need it most, keeping you on the move with confidence and peace of mind." />
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
