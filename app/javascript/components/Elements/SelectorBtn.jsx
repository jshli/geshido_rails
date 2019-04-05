import styled from 'styled-components'

import Btn from "./Btn"

const SelectorBtn = styled(Btn) `
    color: ${props => props.active ? "white" : "black"};
    align-self: flex-start;
    background-color: ${props => props.active ? "black" : "white"};
    &:hover {
        color: white;
        background-color: black
    }
`

export default SelectorBtn