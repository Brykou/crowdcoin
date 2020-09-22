import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Breadcrumb } from "semantic-ui-react";

const Bc = ({ sections }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Section>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Breadcrumb.Divider />
      </Breadcrumb.Section>
      {sections.map((section, index) => (
        <Breadcrumb.Section key={section.title} active={section.isActive}>
          {section.href && section.as ? (
            <Link href={section.href} as={section.as}>
              <a>{section.title}</a>
            </Link>
          ) : (
            <span>{section.title}</span>
          )}
          {index < sections.length - 1 && <Breadcrumb.Divider />}
        </Breadcrumb.Section>
      ))}
    </Breadcrumb>
  );
};

Bc.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      as: PropTypes.string,
      title: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ).isRequired,
};

export default Bc;
