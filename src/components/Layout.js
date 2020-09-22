import React, { useEffect } from "react";
import { Menu, Container, Icon, Popup } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../util/web3";
import useNotification from "../util/notification";

const Layout = ({ children, ...otherProps }) => {
  const { setWarning } = useNotification();
  useEffect(() => {
    (async () => {
      const network = await web3.eth.net.getNetworkType();
      if (network !== "ropsten") {
        setWarning("This app only works on the Ropsten network. Change your network in Metamask.");
      }

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setWarning(
          "No Ethereum account available. Make sure you have Metamask installed if you want to interact with this app."
        );
      }
    })();
  }, [setWarning]);
  return (
    <Container style={{ marginTop: "16px", marginBottom: "16px" }} {...otherProps}>
      <Menu as="nav" style={{ marginBottom: "32px" }}>
        <Menu.Item>
          <Link href="/">
            <a>CrowdCoin</a>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Popup
            content="Create a new campaign"
            position="bottom center"
            /* prettier-ignore */
            trigger={(
              <div>
                <Link href="/campaigns/new">
                  <a>
                    <Icon name="plus" size="large" />
                  </a>
                </Link>
              </div>
            )}
          />
        </Menu.Item>
      </Menu>
      {children}
    </Container>
  );
};

export default Layout;
