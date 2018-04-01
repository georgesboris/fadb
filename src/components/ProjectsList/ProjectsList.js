import React, { Component } from "react"
import Link from "gatsby-link"
import Select from "../Select/Select"
import Divider from "../Divider/Divider"
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * Styles
 */

const Wrapper = styled.div``

const FiltersWrapper = styled.section`
  padding-bottom: 0.4rem;
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
    years: Object.keys(years)
      .sort()
      .map(year => ({
        value: year,
        label: year,
        section: "Por ano"
      })),
    categories: Object.keys(categories)
      .sort()
      .map(category => ({
        value: category,
        label: category,
        section: "Por tipologia"
      }))
  }
}

/**
 * Main Component
 */

class ProjectsList extends Component {
  static defaultFilter = { value: null, label: "Exibir todos" }

  static propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }

  state = {
    filter: ProjectsList.defaultFilter,
    years: [],
    categories: []
  }

  componentDidMount() {
    this.setState(getProjectsYearsAndCategories(this.props.projects))
  }

  render() {
    const { projects } = this.props
    const { filter, years, categories } = this.state

    const filteredProjects = !!filter.value
      ? filter.section === "por ano"
        ? projects.filter(project => project.date === filter.value)
        : projects.filter(
            project => project.categories.indexOf(filter.value) !== -1
          )
      : projects

    return (
      <Wrapper>
        <FiltersWrapper>
          <Select
            value={filter}
            placeholder="Filtros"
            items={[ProjectsList.defaultFilter, ...years, ...categories]}
            onChange={filter => {
              this.setState({ filter })
            }}
          />
        </FiltersWrapper>

        <ProjectListWrapper>
          <ul>
            {filteredProjects.map(project => {
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

// export const query = graphql`
//   fragment AllProjectsFragment on MarkdownRemark {
//     fields {
//       slug
//     }
//     frontmatter {
//       title
//       date(formatString: "YYYY")
//       categories
//     }
//   }
// `
