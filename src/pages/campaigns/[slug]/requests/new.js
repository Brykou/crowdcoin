import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header, Button, Form, Input } from "semantic-ui-react";
import Breadcrumb from "../../../../components/Breadcrumb";
import getCampaign from "../../../../util/campaign";
import web3 from "../../../../util/web3";
import useNotification from "../../../../util/notification";

const NewRequest = ({ address }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { setSuccess, setError, dismissNotification } = useNotification();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    dismissNotification();
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = getCampaign(address);
      await campaign.methods
        .createRequest(description, web3.utils.toWei(amount, "ether"), recipient)
        .send({ from: accounts[0] });
      setSuccess("Request successfully created");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Breadcrumb
        sections={[
          { title: "Campaign", href: "/campaigns/[slug]", as: `/campaigns/${address}` },
          { title: "Requests", href: "/campaigns/[slug]/requests", as: `/campaigns/${address}/requests` },
          { title: "New request", isActive: true },
        ]}
      />
      <Header as="h1">Create a request</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="description">Description</label>
          <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="amount">Amount of Ether</label>
          <Input
            id="amount"
            type="text"
            label="ether"
            labelPosition="right"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="receipient">Recipient</label>
          <Input id="receipient" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </Form.Field>
        <Button color="green" type="submit" disabled={isLoading} loading={isLoading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      address: slug,
    },
  };
}

NewRequest.propTypes = {
  address: PropTypes.string.isRequired,
};

export default NewRequest;
