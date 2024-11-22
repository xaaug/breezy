import React from "react";
import styles from "../styles/Place.module.css";

const Place = ({ time, location, date, day, dayColor }) => {
  const dayTextStyle  = {
    color: dayColor,
    marginRight: '.5rem',
    fontWeight: 400,
    letterSpacing: .5
  }
  return (
    <>
      <div className={styles.container}>
        <p className={styles.time}>{time}</p>
          <h2 className={styles.location}>{location}</h2>
        <p className={styles.date}><span style={dayTextStyle}>{day}</span>{date}</p>
      </div>
    </>
  );
};

export default Place;
