/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Breakpoints from '@semcore/breakpoints';
import './layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteQueries {
      contentfulRepairWindows {
        childContentfulRepairWindowsContactJsonNode {
          tel
          description
          fullName
          location
        }
      }
    }
  `);

  const dataHeader = {
    ...data.contentfulRepairWindows
      .childContentfulRepairWindowsContactJsonNode,
  };

  return (
    <Breakpoints>
      <Header data={dataHeader} />
      {children}
      {/* <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer> */}
    </Breakpoints>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
