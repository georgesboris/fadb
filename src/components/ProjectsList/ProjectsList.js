import React, { Component } from "react"
import Link from "gatsby-link"
import Select from "../Select/Select"
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * Styles
 */

const Wrapper = styled.div``

const FiltersWrapper = styled.section`
  padding-bottom: 3.4rem;
`

const ProjectListWrapper = styled.section``
const ProjectListItem = styled(Link)`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

/**
 * Main Component
 */

class ProjectsList extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }

  state = {
    filter: null
  }

  render() {
    const { projects } = this.props
    const { filter } = this.state
    return (
      <Wrapper>
        <FiltersWrapper>
          <Select
            value={filter}
            items={["2016", "2017", "2018"]}
            onChange={filter => this.setState({ filter })}
          />
        </FiltersWrapper>

        <ProjectListWrapper>
          <ul>
            {projects.map(project => {
              const { slug, title } = project
              return (
                <li key={slug}>
                  <ProjectListItem
                    exact
                    to={`/projects/${slug}`}
                    activeStyle={{
                      color: "white",
                      background: "black"
                    }}
                  >
                    {title}
                  </ProjectListItem>
                </li>
              )
            })}
          </ul>
        </ProjectListWrapper>
      </Wrapper>
    )
  }
}

export default ProjectsList

export const query = graphql`
  fragment AllProjectsFragment on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
    }
  }
`
