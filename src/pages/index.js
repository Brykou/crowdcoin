import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button, Icon, Header } from "semantic-ui-react";
import factory from "../util/factory";

const Home = ({ campaigns }) => {
  return (
    <div>
      <Header as="h1">Campaigns</Header>
      {campaigns.map((campaign) => (
        <Card key={campaign} fluid>
          <Card.Content>
            <Card.Header>{campaign}</Card.Header>
            <Card.Description>
              <Link href="/campaigns/[slug]" as={`/campaigns/${campaign}`}>
                <a>{campaign}</a>
              </Link>
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
      <Link href="/campaigns/new">
        <Button primary icon labelPosition="left">
          Create Campaign
          <Icon name="add circle" />
        </Button>
      </Link>
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
  /* Array of campaigns addresses */
  campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Home;
