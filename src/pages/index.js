import React from "react"
import Link from "gatsby-link"
import TextBlock from "../components/TextBlock/TextBlock"

/**
 * Main component
 */

const PageHome = props => {
  const { info_pt, info_en, contact } = data.info.frontmatter
  return (
    <div>
      <TextBlock>{info_pt}</TextBlock>
      <TextBlock style={{ fontStyle: "italic" }}>{info_en}</TextBlock>
      <TextBlock>{contact}</TextBlock>
    </div>
  )
}

export default PageHome

/**
 * Query
 */

export const query = graphql`
  query InfoPageQuery {
    info: markdownRemark(
      fields: { collection: { eq: "pages" }, slug: { eq: "info" } }
    ) {
      frontmatter {
        info_pt
        info_en
        contact
      }
    }
  }
`
