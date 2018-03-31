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
 * Helpers
 */

const getProjectCategoriesObj = project =>
  project.categories.split(",").reduce((acc, category) => {
    const parsedCategory = category.trim()
    if (parsedCategory) {
      acc[parsedCategory] = true
    }
    return acc
  }, {})

const getProjectsYearsAndCategories = projects => {
  if (!projects) {
    return {
      years: [],
      categories: []
    }
  }

  const { years, categories } = projects.reduce(
    (acc, project) => ({
      years: {
        ...acc.years,
        [project.date]: true
      },
      categories: {
        ...acc.categories,
        ...getProjectCategoriesObj(project)
      }
    }),
    { years: {}, categories: {} }
  )

  return {
    years: Object.keys(years).sort(),
    categories: Object.keys(categories).sort()
  }
}

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
    filter: null,
    years: [],
    categories: []
  }

  componentDidMount() {
    this.setState(getProjectsYearsAndCategories(this.props.projects))
  }

  render() {
    const { projects } = this.props
    const { filter, years, categories } = this.state
    return (
      <Wrapper>
        <FiltersWrapper>
          <Select
            value={filter}
            items={[...years, ...categories]}
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
      date(formatString: "YYYY")
    }
  }
`
