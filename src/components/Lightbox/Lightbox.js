import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

/**
 * Styles
 */

const fadeIn = keyframes`
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 4rem;
  display: flex;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.4s;
  cursor: pointer;
`

const Image = styled.img`
  margin: auto;
  max-width: 100%;
  height: 2000px;
  background: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);
  cursor: default;
`

/**
 * Main component
 */

class Lightbox extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired
      })
    ).isRequired,
    activeIndex: PropTypes.number,
    onChangeActiveIndex: PropTypes.func.isRequired
  }

  render() {
    const { images, activeIndex, onChangeActiveIndex } = this.props
    return activeIndex !== null &&
      activeIndex >= 0 &&
      activeIndex < images.length ? (
      <Wrapper onClick={() => onChangeActiveIndex(null)}>
        <Image
          src={images[activeIndex].src}
          onClick={e => e.stopPropagation()}
        />
      </Wrapper>
    ) : null
  }
}

export default Lightbox
