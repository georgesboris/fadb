const path = require("path")
const slug = require("slug")

/**
 * Create project pages
 */

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `slug`,
      value: slug(node.frontmatter.title, { lower: true })
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const projectTemplate = path.resolve(`src/templates/projectTemplate.js`)
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug } = node.fields
      const { title } = node.frontmatter
      createPage({
        path: `/projects/${slug}`,
        component: projectTemplate,
        context: { title }
      })
    })
  })
}
