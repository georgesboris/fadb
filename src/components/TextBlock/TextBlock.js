// react
import React from "react"
import styled from "styled-components"

const Wrapper = styled.p`
  max-width: 40rem;
  font-size: 1.4rem;
  line-height: 1.4em;
  padding-bottom: 4rem;
`

const TextBlock = ({ children, style }) => {
  return <Wrapper style={style}>{children}</Wrapper>
}

export default TextBlock
