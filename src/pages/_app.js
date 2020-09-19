import React from "react";
import PropTypes from "prop-types";
import "../styles/globals.css";

const CustomApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
CustomApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default CustomApp;
