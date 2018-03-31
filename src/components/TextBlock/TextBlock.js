// react
import React from "react"
import styled from "styled-components"

const Wrapper = styled.p`
  max-width: 40rem;
  font-family: inherit;
  font-size: 1.4rem;
  line-height: 1.4em;
  padding-bottom: 4rem;
`

const FormattedWrapper = Wrapper.withComponent("pre")

const TextBlock = ({ children, formatted, style }) =>
  formatted ? (
    <FormattedWrapper style={style}>{children}</FormattedWrapper>
  ) : (
    <Wrapper style={style}>{children}</Wrapper>
  )

export default TextBlock
