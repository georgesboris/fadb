import React from "react"
import ProjectsWrapper from "../components/ProjectsWrapper/ProjectsWrapper"

export default function ProjectTemplate({ data }) {
  return <ProjectsWrapper projects={[]} />
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
    project: markdownRemark(
      fields: { collection: { eq: "projects" }, slug: { eq: $slug } }
    ) {
      ...ProjectFragment
    }
    allProjects: allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
    ) {
      edges {
        node {
          ...AllProjectsFragment
        }
      }
    }
  }
`
