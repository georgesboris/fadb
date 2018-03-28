// react
import React from "react"
import Link from "gatsby-link"
// etc
import styled from "styled-components"
import logoUrl from "./images/logo-fadb.png"

/**
 * Styles
 */

const Title = styled.h1`
  line-height: 0rem;
  margin-bottom: 2rem;

  a {
    display: inline-block;
    overflow: auto;
  }

  img {
    float: left;
    height: 3rem;
  }
`

const NavList = styled.ol`
  display: flex;
  align-items: center;
  margin-left: -2rem;
`

const NavItem = styled.li`
  a {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    background: ${props => (props.active ? "black" : "white")};
    color: ${props => (props.active ? "white" : "black")};
    text-decoration: none;
  }

  &:hover a {
    background: black;
    color: white;
  }
`

/**
 * Main component
 */

const Header = () => (
  <header>
    <Title>
      <Link style={{ display: "inline-block", overflow: "auto" }} to="/">
        <img style={{ float: "left" }} src={logoUrl} />
      </Link>
    </Title>

    <nav>
      <NavList>
        {[["/", "info"], ["/projects", "projetos"]].map(([path, name]) => (
          <NavItem key={path}>
            <Link
              to={path}
              exact
              activeStyle={{
                color: "white",
                background: "black"
              }}
            >
              {name}
            </Link>
          </NavItem>
        ))}
      </NavList>
    </nav>
  </header>
)

export default Header
