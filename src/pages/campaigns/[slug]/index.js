import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Header, Grid, Button } from "semantic-ui-react";
import Contribute from "../../../components/Contribute";
import getCampaign from "../../../util/campaign";
import web3 from "../../../util/web3";

const Campaign = ({ campaign, address }) => {
  return (
    <div>
      <Header as="h1">{`Campaign ${address}`}</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group>
              <Card
                header={campaign.manager}
                meta="Address of the manager"
                description="The manager created this campaign and can create requests to withdraw money"
                style={{ overflowWrap: "break-word" }}
              />
              <Card
                header={campaign.minimumContribution}
                meta="Minimum contribution (Wei)"
                description="Contributors must provide at least this amout of Wei"
              />
              <Card
                header={campaign.requestsCount}
                meta="Number of requests"
                description="Requests to withdraw money from the contract (Must be approved by contributors)"
              />
              <Card
                header={campaign.approversCount}
                meta="Number of contributors"
                description="Number of people who have already donated to this campaign"
              />
              <Card
                header={web3.utils.fromWei(campaign.balance, "ether")}
                meta="Campaign balance (Ether)"
                description="Amount of Ether available on this campaign"
              />
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <Contribute address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href="/campaigns/[slug]/requests" as={`/campaigns/${address}/requests`} passHref>
              <Button>See requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  const contract = await getCampaign(slug);
  const campaign = await contract.methods.getSummary().call();

  return {
    props: {
      campaign: {
        minimumContribution: campaign[0],
        balance: campaign[1],
        requestsCount: campaign[2],
        approversCount: campaign[3],
        manager: campaign[4],
      },
      address: slug,
    },
  };
}

Campaign.propTypes = {
  campaign: PropTypes.shape({
    minimumContribution: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    requestsCount: PropTypes.string.isRequired,
    approversCount: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
  }).isRequired,
  address: PropTypes.string.isRequired,
};

export default Campaign;
