import React from "react";
import styles from "../styles/Weather.module.css";
import Element from "./Element";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

const Weather = ({ temp, condition, wind, humidity, bgColor }) => {
  return (
    <div className={styles.container}>
      <div className={styles.temp}>
        <h2>{temp}°</h2>
        <p>{condition}</p>
      </div>

      <div className={styles.elements}>
        <Element elementIcon={ <FontAwesomeIcon icon={faWind} />} elementType='Wind' elementValue={wind + ' km/h'} elementBg={bgColor}/>
        <Element elementIcon={ <FontAwesomeIcon icon={faDroplet} />} elementType='Humidity' elementValue={humidity + ' %'} elementBg={bgColor}/>
      </div>
    </div>
  );
};

export default Weather;
