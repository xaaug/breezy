import React from "react";
import styles from '../styles/Quote.module.css'

const Quote = ({ quote, uv, uvColor }) => {

    const colorStyle = {
        backgroundColor: uvColor,
    }

  return (
    <div className={styles.container}>
        <h1>{quote}</h1>
        {uv > 0 && <div className={styles.uvContainer}>
            <p>UV:</p>
            <p style={colorStyle}>{uv}</p>
        </div>}
    </div>
  );
};

export default Quote;
