import React from "react";
import styles from "../styles/Element.module.css";

const Element = ({ elementIcon, elementType, elementValue, elementBg }) => {

  const elementBackground = {
    backgroundColor : elementBg
  }

  return (
    <div className={styles.element}>
      {/* TODO: Style the element container color to be a darker shade of the condition colors */}
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
