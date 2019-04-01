import styled from "styled-components"
import Button from "../../Elements/Button"

const Link = styled(Button) `
    padding: 1rem 1.5rem;
    display: grid;
    grid-column-gap: 0.5rem;
    grid-auto-flow: column;
    align-items: center;
    grid-template-columns: max-content auto;
    border: none;
    width: 100%;
    text-align: left;
    > i {
        font-size: 4px;
    }
`



export default Link