import React, { useState } from 'react';
import styles from './FaqComponent.module.css'; // Import CSS module for styling

const FaqComponent = () => {
    const faqData = [
        {
            question: 'How do I get started with Car Rental ?',
            answer:
                'We offer a wide range of vehicles to suit your needs, all insured and maintained to the highest standards. Enjoy a seamless booking experience and exceptional customer service with us. Rent with confidence and hit the road today!',
        },
        {
            question: 'What is a rental car security deposit?',
            answer:
                'A rental car security deposit is an amount of money that a car rental company holds on your credit card or requires in cash at the start of the rental period. This deposit is used as a guarantee against any potential damage, extra charges, or violations that may occur during the rental. It is usually refunded in full if the car is returned in the same condition and without any additional fees.',
        },
        {
            question: 'Is it possible to extend my rental period?',
            answer:
                'Yes, it is usually possible to extend your rental period. Contact the rental company as soon as you know you need more time to avoid any penalties or issues. They will adjust your rental agreement and inform you of any additional charges.',
        },
        {
            question: 'Can I cancel or modify my reservation?',
            answer:
                'Yes, you can usually cancel or modify your reservation. Policies vary by rental company, so check the specific terms and conditions of your booking. Some companies may charge a fee for cancellations or modifications, especially if done close to the pick-up date.',
        },
        {
            question:'For how long can I keep the car?',
            answer:
            'You can customise your usage period while booking the car. Your monthly fee will vary based on your usage period (the longer it is, the lesser the fee).If you decide to extend the usage period while you are using the car, you can do that too.',

        },
        {
            question:'Can I install my own accessories?',
            answer:
            'Yes, you can install your own accessories, but you will need to inform us beforehand and get an email confirmation from us. You will install these accessories at your own cost. While returning the car, if the accessory can be removed without materially altering the quality and performance of the car, you can remove it. Else, you will need to return the car with the accessory. Please note that any accessories that can render the manufacture warranty null and void (either partially or fully) are absolutely prohibited',  

        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Splitting faqData into two columns
    const firstColumn = faqData.slice(0, Math.ceil(faqData.length / 2));
    const secondColumn = faqData.slice(Math.ceil(faqData.length / 2));

    return (
        <div className={styles.faqContainer}>
            <h2 className={styles.centerStyle}>Any Questions ?</h2>
            <div className={styles.faqList}>
                <div className={styles.row}>
                    {/* First Column */}
                    <div className={styles.column}>
                        {firstColumn.map((faq, index) => (
                            <div key={index} className={styles.faqItem}>
                                <div
                                    className={`${styles.faqQuestion} ${
                                        activeIndex === index ? styles.active : ''
                                    }`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    <span className={styles.arrow}>
                                        {activeIndex === index ? '▲' : '▼'}
                                    </span>
                                </div>
                                {activeIndex === index && (
                                    <div className={styles.faqAnswer}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Second Column */}
                    <div className={styles.column}>
                        {secondColumn.map((faq, index) => (
                            <div key={index} className={styles.faqItem}>
                                <div
                                    className={`${styles.faqQuestion} ${
                                        activeIndex === index + firstColumn.length ? styles.active : ''
                                    }`}
                                    onClick={() => toggleFaq(index + firstColumn.length)}
                                >
                                    {faq.question}
                                    <span className={styles.arrow}>
                                        {activeIndex === index + firstColumn.length ? '▲' : '▼'}
                                    </span>
                                </div>
                                {activeIndex === index + firstColumn.length && (
                                    <div className={styles.faqAnswer}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqComponent;
