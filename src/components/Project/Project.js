// react
import React from "react"
import TextBlock from "../TextBlock/TextBlock"
// etc
import styled from "styled-components"

/**
 * Styles
 */

const Wrapper = styled.article`
  display: flex;
`

const ProjectInfoWrapper = styled.section`
  flex-shrink: 0;
  width: 35%;
  max-width: 32rem;
  padding: 0 2rem;
`

const ProjectHeader = styled.header`
  margin-bottom: 4rem;
`

const ProjectTitle = styled.h1`
  font-size: 2rem;
`

const ProjectDate = styled.time`
  font-size: 1.2rem;
`

const ProjectPicturesWrapper = styled.section`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  margin-top: -0.5rem;
`

const ProjectPictureWrapper = styled.div`
  display: flex;
  width: 50%;
  padding: 0.5rem;
`
const ProjectPicture = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  opacity: 0.95;
  transition: opacity 0.4s, box-shadow 0.4s;

  &:hover {
    opacity: 1;
    box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.2);
  }
`

/**
 * Main component
 */

const Project = ({ title, date, meta, description, pictures }) => {
  return (
    <Wrapper>
      <ProjectInfoWrapper>
        <ProjectHeader>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDate>{date}</ProjectDate>
        </ProjectHeader>
        <TextBlock>{meta}</TextBlock>
        <TextBlock>{description}</TextBlock>
      </ProjectInfoWrapper>
      <ProjectPicturesWrapper>
        {pictures &&
          pictures.map((picture, i) => (
            <ProjectPictureWrapper key={i}>
              <ProjectPicture src={picture.url} />
            </ProjectPictureWrapper>
          ))}
      </ProjectPicturesWrapper>
    </Wrapper>
  )
}

export default Project

/**
 * Query
 */

export const query = graphql`
  fragment ProjectFragment on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "YYYY")
      meta
      description
      images {
        image
      }
    }
  }
`
