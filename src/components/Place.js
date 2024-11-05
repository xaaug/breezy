import React from "react";
import styles from "../styles/Place.module.css";

const Place = ({ time, location, date, day }) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.time}>{time}</p>
          <h2 className={styles.location}>{location}</h2>
        <p className={styles.date}><span className={styles.day}>{day}</span>{date}</p>
      </div>
    </>
  );
};

export default Place;
