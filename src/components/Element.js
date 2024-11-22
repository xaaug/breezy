import React from "react";
import styles from "../styles/Element.module.css";

const Element = ({ elementIcon, elementType, elementValue, elementBg }) => {

  const elementBackground = {
    backgroundColor : elementBg
  }

  return (
    <div className={styles.element}>
      <div style={elementBackground}>
       {elementIcon}
        <p>{elementType}</p>
      </div>

      <div>
        <p>{elementValue}</p>
      </div>
    </div>
  );
};

export default Element;
