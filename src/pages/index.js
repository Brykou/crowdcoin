import React from "react";
import PropTypes from "prop-types";
import factory from "../util/factory";

const Home = ({ campaigns }) => {
  return (
    <div>
      <h1>Campaigns</h1>
      <p>{campaigns}</p>
    </div>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getCampaigns().call();
  return {
    props: { campaigns },
  };
}

Home.propTypes = {
  campaigns: PropTypes.array.isRequired,
};

export default Home;
