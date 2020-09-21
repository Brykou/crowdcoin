import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "semantic-ui-react";
import web3 from "../util/web3";
import getCampaign from "../util/campaign";
import useNotification from "../util/notification";

const Contribute = ({ address }) => {
  const [contribution, setContribution] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const { setError, dismissNotification } = useNotification();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    dismissNotification();

    try {
      const campaign = getCampaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei(contribution, "ether") });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label htmlFor="contribution">Contribute</label>
        <Input
          id="contribution"
          type="text"
          label="ether"
          labelPosition="right"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
        />
      </Form.Field>
      <Button primary type="submit" disabled={isLoading} loading={isLoading}>
        Contribute
      </Button>
    </Form>
  );
};

Contribute.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Contribute;
