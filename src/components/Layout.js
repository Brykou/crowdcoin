import React from "react";
import { Menu, Container, Icon, Popup } from "semantic-ui-react";
import Link from "next/link";

const Layout = ({ children, ...otherProps }) => {
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
