import React, { useState, useEffect, useRef } from 'react';
import styles from './Steps.module.css';

const Steps = () => {
  const [showSteps, setShowSteps] = useState(false); // State to control visibility

  const steps = [
    {
      number: 1,
      title: "Choose a vehicle",
      content: "Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination."
    },
    {
      number: 6,
      title: "Pick location & date",
      content: "Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences."
    },
    {
      number: 3,
      title: "Make a booking",
      content: "Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence."
    },
    {
      number: 8,
      title: "Sit back & relax",
      content: "Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled with comfort."
    },
    {
      number: 5,
      title: "Choose a vehicle",
      content: "Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination."
    },
    {
      number: 2,
      title: "Pick location & date",
      content: "Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences."
    },
    {
      number: 7,
      title: "Make a booking",
      content: "Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence."
    },
    {
      number: 4,
      title: "Sit back & relax",
      content: "Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled with comfort."
    }
  ];

  const stepRefs = useRef([]);

  useEffect(() => {
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.fadeInUp);
        } else {
          entry.target.classList.remove(styles.fadeInUp);
        }
      });
    }, options);

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);


 
  return (
    <div className={styles.stepsContainer}>
      <h1>Make It Happen In 8 Steps</h1>


      <div className={styles.stepsWrapper}>
        <div className={styles.stepRow}>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[0].number === 5 || steps[0].number === 6 || steps[0].number === 7 || steps[0].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[0] = el)}
          >
            <div className={styles.stepNumber}>{steps[0].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[0].title}</h3>
              <p>{steps[0].content}</p>
            </div>
          </div>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[4].number === 5 || steps[4].number === 6 || steps[4].number === 7 || steps[4].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[4] = el)}
          >
            <div className={styles.stepNumber}>{steps[4].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[4].title}</h3>
              <p>{steps[4].content}</p>
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.stepRow}>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[1].number === 5 || steps[1].number === 6 || steps[1].number === 7 || steps[1].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[1] = el)}
          >
            <div className={styles.stepNumber}>{steps[1].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[1].title}</h3>
              <p>{steps[1].content}</p>
            </div>
          </div>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[5].number === 5 || steps[5].number === 6 || steps[5].number === 7 || steps[5].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[5] = el)}
          >
            <div className={styles.stepNumber}>{steps[5].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[5].title}</h3>
              <p>{steps[5].content}</p>
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.stepRow}>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[2].number === 5 || steps[2].number === 6 || steps[2].number === 7 || steps[2].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[2] = el)}
          >
            <div className={styles.stepNumber}>{steps[2].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[2].title}</h3>
              <p>{steps[2].content}</p>
            </div>
          </div>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[6].number === 5 || steps[6].number === 6 || steps[6].number === 7 || steps[6].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[6] = el)}
          >
            <div className={styles.stepNumber}>{steps[6].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[6].title}</h3>
              <p>{steps[6].content}</p>
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.stepRow}>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[3].number === 5 || steps[3].number === 6 || steps[3].number === 7 || steps[3].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[3] = el)}
          >
            <div className={styles.stepNumber}>{steps[3].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[3].title}</h3>
              <p>{steps[3].content}</p>
            </div>
          </div>
          <div
            className={`${styles.step} ${styles.sideBySide} ${steps[7].number === 5 || steps[7].number === 6 || steps[7].number === 7 || steps[7].number === 8 ? styles.hidden : ''}`}
            ref={el => (stepRefs.current[7] = el)}
          >
            <div className={styles.stepNumber}>{steps[7].number}</div>
            <div className={styles.stepContent}>
              <h3>{steps[7].title}</h3>
              <p>{steps[7].content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
