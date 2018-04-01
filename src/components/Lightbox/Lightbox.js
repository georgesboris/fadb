import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import FaAngleLeft from "react-icons/lib/fa/angle-left"
import FaAngleRight from "react-icons/lib/fa/angle-right"
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

const Button = styled.button`
  position: fixed;
  top: 50%;
  left: ${props => (props.right ? "auto" : "0.4rem")};
  right: ${props => (props.right ? "0.4rem" : "auto")};
  background: transparent;
  border: none;
  box-shadow: none;
  color: white;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:active {
    transition: none;
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`

const Image = styled.img`
  margin: auto;
  max-width: 100%;
  height: auto;
  background: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);
  cursor: default;
`

/**
 * Helpers
 */

const c = fn => e => {
  e.stopPropagation()
  fn && fn(e)
}

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

  onClickPrev = () => {
    const { activeIndex, images, onChangeActiveIndex } = this.props
    if (images.length) {
      this.props.onChangeActiveIndex(
        activeIndex > 0 ? activeIndex - 1 : images.length - 1
      )
    }
  }

  onClickNext = () => {
    const { activeIndex, images, onChangeActiveIndex } = this.props
    if (images.length) {
      this.props.onChangeActiveIndex(
        activeIndex < images.length - 1 ? activeIndex + 1 : 0
      )
    }
  }

  render() {
    const { images, activeIndex, onChangeActiveIndex } = this.props
    return activeIndex !== null &&
      activeIndex >= 0 &&
      activeIndex < images.length ? (
      <Wrapper onClick={() => onChangeActiveIndex(null)}>
        <Button onClick={c(this.onClickPrev)}>
          <FaAngleLeft size={30} />
        </Button>
        <Button right onClick={c(this.onClickNext)}>
          <FaAngleRight size={30} />
        </Button>
        <Image src={images[activeIndex].src} onClick={c()} />
      </Wrapper>
    ) : null
  }
}

export default Lightbox
