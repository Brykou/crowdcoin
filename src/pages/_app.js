import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { NotificationProvider } from "../util/notification";
import "semantic-ui-css/semantic.min.css";

const CustomApp = ({ Component, pageProps }) => {
  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
};
CustomApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default CustomApp;
