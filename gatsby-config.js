module.exports = {
  plugins: [
    /**
     * General setup
     */
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    /**
     * Markdown handling
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/projects`,
        name: "projects"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/pages`,
        name: "pages"
      }
    },
    "gatsby-transformer-remark",
    /**
     * CMS handling
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/media/`,
        name: `media`
      }
    },
    "gatsby-plugin-netlify-cms",
    /**
     * Image handling
     */
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    /**
     * Handles netlify caching
     */
    "gatsby-plugin-netlify"
  ]
}
