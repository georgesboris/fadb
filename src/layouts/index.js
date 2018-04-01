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
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  a:focus, input:focus, button:focus {
    outline: none;
  }

  html {
    font-size: 62.5%;
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  }

  li {
    list-style-type: none;
  }

  h1 {
    font-weight: normal;
  }
`

const Container = styled.div`
  padding: 2rem;
`

const Main = styled.main`
  padding-top: 2rem;
`

/**
 * Main component
 */

const Layout = ({ children, data }) => {
  const {
    site_title: title,
    site_description: description,
    site_tags: tags
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
      />
      <Header />
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
      }
    }
  }
`
