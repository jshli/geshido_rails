import styled from "styled-components"

const Icon = styled.i `
    color: ${props => props.isActive ? "#5C4B7C" : "black"};
    transition: all ease-out 0.5s;
    transform: ${props => props.isActive ? "translateX(-3rem)" : "translate(0px)"};
`

export default Icon