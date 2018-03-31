// react
import React from "react"
import Downshift from "downshift"
import styled from "styled-components"

/**
 * Styles
 */

const colorInactive = "#999"
const colorInactiveBg = "#f5f5f5"

const colorActive = "white"
const colorActiveBg = "black"

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
  z-index: 1;
  top: 100%;
  margin-top: 0.8rem;
  left: 0.4rem;
  right: 0.4rem;
  padding: 0.4rem;
  background: white;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.2);
`

const SectionHeader = styled.div`
  padding: 0.6rem 1.2rem;
  color: #999;
`

const ItemWrapper = styled.div`
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;
`

/**
 * Main Component
 */

const Select = ({ items = [], value, placeholder, onChange }) => {
  return (
    <Downshift
      onChange={onChange}
      itemToString={x => (x ? x.label : "null")}
      render={({
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex,
        getToggleButtonProps,
        getRootProps
      }) => (
        <Wrapper {...getRootProps({ refKey: "innerRef" })}>
          <Button active={!!value.value} {...getToggleButtonProps()}>
            {!!value.value ? value.label : placeholder || "…"}
          </Button>
          {isOpen && (
            <ListWrapper>
              {items.map((item, index) => (
                <div key={item.value}>
                  {index > 0 &&
                    items[index - 1].section !== item.section &&
                    item.section !== undefined && (
                      <SectionHeader>{item.section}</SectionHeader>
                    )}
                  <ItemWrapper
                    {...getItemProps({ item })}
                    style={{
                      fontWeight: selectedItem === item ? "bold" : "normal",
                      backgroundColor:
                        highlightedIndex === index ? "#f5f5f5" : "white"
                    }}
                  >
                    {item.label}
                  </ItemWrapper>
                </div>
              ))}
            </ListWrapper>
          )}
        </Wrapper>
      )}
    />
  )
}

export default Select
