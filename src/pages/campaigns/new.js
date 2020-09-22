import React, { useState } from "react";
import { Form, Header, Input, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import factory from "../../util/factory";
import web3 from "../../util/web3";
import useNotification from "../../util/notification";

const NewCampaign = () => {
  const [minContribution, setMinContribution] = useState("100");
  const [isLoading, setIsLoading] = useState(false);
  const { setInfo, setError, dismissNotification } = useNotification();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    dismissNotification();
    try {
      const accounts = await web3.eth.getAccounts();
      setInfo("You will be redirected after the transaction has been completed (~20 sec).");
      await factory.methods.createCampaign(minContribution).send({ from: accounts[0] });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Header as="h1">Create a new campaign</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="min-contribution">Minimum contribution</label>
          <Input
            id="min-contribution"
            type="number"
            min="0"
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Button color="green" type="submit" disabled={isLoading} loading={isLoading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default NewCampaign;
