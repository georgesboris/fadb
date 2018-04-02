const path = require("path")
const slug = require("slug")

/**
 * Helpers
 */

function getNodeCollection(node) {
  return node.fileAbsolutePath.split("/").slice(-2, -1)[0]
}

function getNodePagePath(node) {
  return node.fields.collection !== "pages"
    ? `/${node.fields.collection}/${node.fields.slug}`
    : `/${node.fields.slug}`
}

/**
 * Create collection and slug fields
 */

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `collection`,
      value: getNodeCollection(node)
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug(node.frontmatter.title, { lower: true })
    })
  }
}

/**
 * Create pages
 */

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
            frontmatter {
              template
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
      const { template } = node.frontmatter
      if (template) {
        createPage({
          path: getNodePagePath(node),
          component: path.resolve(`src/templates/${template}.js`),
          context: { slug }
        })
      }
    })
  })
}
