import styled from "styled-components"

//Generic component that creates columns for content that need to go next to each other

const ContentRow = styled.div `
    display: grid;
    grid-auto-flow: column;
    align-items: ${props => props.alignStart ? "start" : "center"};
    grid-column-gap: 1rem;
    grid-template-columns: ${props => props.threeCol ? "repeat(3,min-content)" : "auto 1fr"};
    margin-bottom: ${props => props.marginBottom ? "2rem" : ""};
    > p {
        margin-bottom: 0;
    }
`

export default ContentRow