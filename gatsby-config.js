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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/media`,
        name: "media"
      }
    },
    `gatsby-transformer-remark`,
    /**
     * Image handling
     */
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    /**
     * CMS handling
     */
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    /**
     * Handles netlify caching
     */
    "gatsby-plugin-netlify"
  ]
}
