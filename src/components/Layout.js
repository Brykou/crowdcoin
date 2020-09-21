import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import Link from "next/link";
import style from "../styles/layout.module.css";

const Layout = ({ children, ...otherProps }) => {
  return (
    <Container className={style.layout} {...otherProps}>
      <Menu as="nav" style={{ marginBottom: "32px" }}>
        <Menu.Item>
          <Link href="/">
            <a>CrowdCoin</a>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link href="/campaigns/new">
            <a className={style.addCampaign}>
              <Icon name="plus" />
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </Container>
  );
};

export default Layout;
