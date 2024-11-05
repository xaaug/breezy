import React from "react";
import { bouncy } from "ldrs";

bouncy.register();

const Loader = () => {
  const loaderStyles = {
    height: "100vh",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div style={loaderStyles}>
      <l-bouncy size="45" speed="1.75" color="black" ></l-bouncy>
    </div>
  );
};

export default Loader;
