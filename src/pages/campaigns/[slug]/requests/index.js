import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Header, Button, Icon, Table } from "semantic-ui-react";
import Breadcrumb from "../../../../components/Breadcrumb";
import getCampaign from "../../../../util/campaign";
import web3 from "../../../../util/web3";
import useNotification from "../../../../util/notification";

const Requests = ({ address, requests, approversCount }) => {
  const { setSuccess, setError, dismissNotification } = useNotification();

  const onApprove = async (index) => {
    dismissNotification();
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaign(address);
      await campaign.methods.approveRequest(index).send({ from: accounts[0] });
      setSuccess("Your approval has been added");
    } catch (err) {
      setError(err.message);
    }
  };

  const onFinalize = async (index) => {
    dismissNotification();
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaign(address);
      await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
      setSuccess("The request has been finalized");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Breadcrumb
        sections={[
          { title: "Campaign", href: "/campaigns/[slug]", as: `/campaigns/${address}` },
          { title: "Requests", isActive: true },
        ]}
      />
      <Header as="h1">Requests</Header>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{`Found ${requests.length} requests`}</span>
        <Link href="/campaigns/[slug]/requests/new" as={`/campaigns/${address}/requests/new`} passHref>
          <Button primary icon labelPosition="right">
            Add Request
            <Icon name="add circle" />
          </Button>
        </Link>
      </div>
      <Table textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approvals</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map((request, index) => {
            const readyToFinalize = request.approvalCount >= approversCount / 2;
            return (
              <Table.Row
                key={request.description}
                positive={!request.isCompleted && readyToFinalize}
                disabled={request.isCompleted}
              >
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(request.value, "ether")}</Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                <Table.Cell>{`${request.approvalCount}/${approversCount}`}</Table.Cell>
                <Table.Cell>
                  {!request.isCompleted && (
                    <Button basic color="green" onClick={() => onApprove(index)}>
                      Approve
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {!request.isCompleted ? (
                    <Button basic color="teal" disabled={!readyToFinalize} onClick={() => onFinalize(index)}>
                      Finalize
                    </Button>
                  ) : (
                    <Icon name="checkmark" />
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  const campaign = getCampaign(slug);

  // At this time solidity doesn't support returning an array of struct
  // So we need to retrieve each request one by one
  const requestCount = parseInt(await campaign.methods.getRequestsCounts().call(), 10);
  const approversCount = await campaign.methods.approversCount().call();
  const requests = (
    await Promise.all([...Array(requestCount)].map((_, index) => campaign.methods.requests(index).call()))
  ).map((request) => ({
    description: request.description,
    value: request.value,
    recipient: request.recipient,
    isCompleted: request.isCompleted,
    approvalCount: request.approvalCount,
  })); // Map to remove non serialisable fields

  return {
    props: {
      address: slug,
      requests,
      approversCount,
    },
  };
}

Requests.propTypes = {
  address: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  approversCount: PropTypes.string.isRequired,
};

export default Requests;
