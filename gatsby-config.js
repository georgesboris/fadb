module.exports = {
  siteMetadata: {
    title: "FADB"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/projects`,
        name: "markdown-pages"
      }
    },
    "gatsby-transformer-remark"
  ]
}
