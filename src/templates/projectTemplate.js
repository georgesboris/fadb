import React from "react"
import ProjectsWrapper from "../components/ProjectsWrapper/ProjectsWrapper"

export default function ProjectTemplate({ data }) {
  return (
    <ProjectsWrapper
      project={{
        ...data.project.fields,
        ...data.project.frontmatter
      }}
      projects={data.allProjects.edges.map(edge => ({
        ...edge.node.fields,
        ...edge.node.frontmatter
      }))}
    />
  )
}

export const query = graphql`
  query ProjectPageQuery($title: String!) {
    project: markdownRemark(frontmatter: { title: { eq: $title } }) {
      ...ProjectFragment
    }
    allProjects: allMarkdownRemark {
      edges {
        node {
          ...AllProjectsFragment
        }
      }
    }
  }
`
