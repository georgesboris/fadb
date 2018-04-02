// react
import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header/Header"
// etc
import styled, { injectGlobal } from "styled-components"
import PropTypes from "prop-types"

/**
 * Styles
 */

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ::selection {
    color: white; 
    background: black;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  }

  li {
    list-style-type: none;
  }

  h1 {
    font-weight: normal;
  }

  a:focus, input:focus, button:focus {
    outline: none;
  }
`

const Container = styled.div`
  padding: 2rem;
`

const Main = styled.main`
  padding-top: 4rem;
`

/**
 * Main component
 */

const Layout = ({ children, data }) => {
  const {
    site_title: title,
    site_description: description,
    site_tags: tags,
    site_logo: logo
  } = data.settings.frontmatter
  return (
    <Container>
      <Helmet
        title={title}
        meta={[
          { name: "description", content: description },
          {
            name: "keywords",
            content: tags
          }
        ]}
        link={[
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro"
          }
        ]}
      />
      <Header logo={logo} />
      <Main>{children()}</Main>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.func
}

export default Layout

/**
 * Query
 */

export const query = graphql`
  query SiteDataQuery {
    settings: markdownRemark(frontmatter: { title: { eq: "settings" } }) {
      frontmatter {
        site_title
        site_description
        site_tags
        site_logo
      }
    }
  }
`
