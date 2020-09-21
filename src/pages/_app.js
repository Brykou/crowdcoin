import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import "semantic-ui-css/semantic.min.css";

const CustomApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
CustomApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default CustomApp;
