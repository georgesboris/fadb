// react
import React from "react"
import Link from "gatsby-link"
import Project from "../components/Project/Project"
import Select from "../components/Select/Select"
// etc
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

const FiltersWrapper = styled.section`
  padding-bottom: 3.4rem;
`

const ProjectListWrapper = styled.section``
const ProjectListItem = styled.a`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

const ProjectWrapper = styled.main`
  flex-grow: 1;
`

/**
 * Main component
 */

class PageProjects extends React.Component {
  state = {
    filter: null
  }

  render() {
    const { filter } = this.state
    return (
      <Wrapper>
        <NavWrapper>
          <FiltersWrapper>
            <Select
              value={filter}
              items={["2016", "2017", "2018"]}
              onChange={filter => this.setState({ filter })}
            />
          </FiltersWrapper>

          <ProjectListWrapper>
            <ul>
              {["Residência Tatuapé", "Prédio na Lapa"].map(o => (
                <li key={o}>
                  <ProjectListItem>{o}</ProjectListItem>
                </li>
              ))}
            </ul>
          </ProjectListWrapper>
        </NavWrapper>

        <ProjectWrapper>
          {[
            {
              title: "Residência Tatuapé",
              year: "2016",
              meta: `
            Flavio Bragaia\n
            Juliano Ijichi Machado\n
            Leonardo Klis\n
            Tarsila Mantovani\n
          `,
              description: `
            Quando fomos procurados para desenvolver este projeto, a ideia era
            apenas terminar a construção de uma residência que, depois de três
            problemáticos anos em obras, estava incompleta. Nos primeiros passos
            so processo, foram identificadas uma série de necessidades de
            intervenções sobre o existente para que a obra pudesse avançar e ser
            terminada. O projeto buscou as melhores soluções, tendo em vista o
            controle do tempo e dos custos da nova empreitada. A casa, com ótima
            ventilação e iluminação naturais, recebe um casal e dois filhos, seus
            animais de estimação e frequentes visitantes, além de uma série de
            objetos de grande valor sentimental para os proprietários.
          `,
              pictures: [
                {
                  url: "https://source.unsplash.com/random/400x200"
                },
                {
                  url: "https://source.unsplash.com/random/400x200"
                },
                {
                  url: "https://source.unsplash.com/random/400x200"
                }
              ]
            }
          ].map((project, i) => <Project key={i} {...project} />)}
        </ProjectWrapper>
      </Wrapper>
    )
  }
}

export default PageProjects
