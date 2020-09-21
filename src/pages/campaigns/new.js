import React, { useState } from "react";
import { Form, Header, Input, Button, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import factory from "../../util/factory";
import web3 from "../../util/web3";

const New = () => {
  const [minContribution, setMinContribution] = useState("100");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage({
        header: "Info",
        content: "You will be redirected after the transaction has been completed (~20 sec).",
        info: true,
      });
      await factory.methods.createCampaign(minContribution).send({ from: accounts[0] });
      router.push("/");
    } catch (err) {
      setMessage({ header: "Oops", content: err.message, negative: true });
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
        {message && <Message {...message} />}
      </Form>
    </div>
  );
};

export default New;
