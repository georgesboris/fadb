// react
import React from "react"
import Link from "gatsby-link"
import ProjectsWrapper from "../components/ProjectsWrapper/ProjectsWrapper"

/**
 * Main component
 */

export default function PageProjects({ data }) {
  return <ProjectsWrapper projects={[]} />
  return (
    <ProjectsWrapper
      projects={data.allProjects.edges.map(edge => ({
        ...edge.node.fields,
        ...edge.node.frontmatter
      }))}
    />
  )
}

/**
 * Queries
 */

// export const query = graphql`
//   query ProjectsPageQuery {
//     allProjects: allMarkdownRemark {
//       edges {
//         node {
//           ...AllProjectsFragment
//         }
//       }
//     }
//   }
// `
