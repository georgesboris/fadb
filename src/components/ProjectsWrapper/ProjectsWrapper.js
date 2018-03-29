import React from "react"
import Project from "../Project/Project"
import ProjectsList from "../ProjectsList/ProjectsList"
import styled from "styled-components"

/**
 * Styles
 */

const Wrapper = styled.div`
  display: flex;
  max-width: 140rem;
  margin-left: 5.4rem;
`

const NavWrapper = styled.aside`
  flex-shrink: 0;
  width: 20%;
  max-width: 28rem;
`

const ProjectWrapper = styled.main`
  flex-grow: 1;
`

/**
 * Main Component
 */

const ProjectsWrapper = ({ project, projects }) => {
  return (
    <Wrapper>
      <NavWrapper>
        <ProjectsList projects={projects} />
      </NavWrapper>
      <ProjectWrapper>{project && <Project {...project} />}</ProjectWrapper>
    </Wrapper>
  )
}

export default ProjectsWrapper
