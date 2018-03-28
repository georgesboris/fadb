// react
import React from "react"
import Downshift from "downshift"
import styled from "styled-components"

/**
 * Styles
 */

const colorInactive = "#999"
const colorInactiveBg = "#f5f5f5"

const colorActive = "#dadada"
const colorActiveBg = "#000"

const Wrapper = styled.div`
  position: relative;
  overflow: visible;
`

const Button = styled.button`
  position: relative;

  display: block;
  width: 100%;
  padding: 0.6rem 2rem;
  border: none;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;

  background: ${props => (props.active ? colorActiveBg : colorInactiveBg)};
  color: ${props => (props.active ? colorActive : colorInactive)};

  &::before,
  &::after {
    content: " ";

    position: absolute;
    right: 2rem;

    display: block;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid transparent;
  }

  &::after {
    top: 0.9rem;
    border-top-color: ${props =>
      props.active ? colorActiveBg : colorInactiveBg};
  }

  &::before {
    top: 1.1rem;
    border-top-color: ${props => (props.active ? colorActive : colorInactive)};
  }

  &:hover {
    background: black;
    color: white;

    &::after {
      border-top-color: black;
    }

    &::before {
      border-top-color: white;
    }
  }
`

const ListWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: 0.4rem;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.2);
`

const ItemWrapper = styled.div`
  padding: 0.6rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
`

const Select = ({ items = [], value, onChange }) => {
  return (
    <Downshift
      onChange={onChange}
      render={({
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex,
        getToggleButtonProps,
        getRootProps
      }) => (
        <Wrapper {...getRootProps({ refKey: "innerRef" })}>
          <Button active={!!value} {...getToggleButtonProps()}>
            {value || "Filtro"}
          </Button>
          {isOpen && (
            <ListWrapper>
              {items.map((item, index) => (
                <ItemWrapper
                  {...getItemProps({ item })}
                  key={item}
                  style={{
                    backgroundColor:
                      highlightedIndex === index || selectedItem === item
                        ? "black"
                        : "white",
                    color:
                      highlightedIndex === index || selectedItem === item
                        ? "white"
                        : "black"
                  }}
                >
                  {item}
                </ItemWrapper>
              ))}
            </ListWrapper>
          )}
        </Wrapper>
      )}
    />
  )
}

export default Select
