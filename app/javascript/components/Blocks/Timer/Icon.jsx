import styled from "styled-components"

const Icon = styled.i `
    color: ${props => props.isActive ? "#ED2551" : "black"};
    transition: all ease-out 0.5s;
    transform: ${props => props.isActive ? "translateX(-3rem)" : "translate(0px)"};
`

export default Icon