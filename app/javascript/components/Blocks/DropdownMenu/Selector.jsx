import styled from "styled-components"

const Selector = styled.div `
    border: ${props => props.menuOpen ? "1px solid black" : "1px solid rgba(0, 0, 0, 0.1)"};
    padding: 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    margin: 0 1.5rem;
    transition: all 0.3s ease;
    min-width: 25ch;
    margin-bottom: 1.5rem;
    ${({fullWidth}) => fullWidth && `
        width: 100%;
        border: none;
        color: black !important;
        font-size: 1.25rem;
        margin: 0 0 1.5rem 0;
        padding: 0;
    `}
    cursor: pointer;
    > p {
        margin-bottom: 0;
        color: black;
    }
`

const LargeSelector = styled(Selector) `
    margin: 0 0 1.5rem 0;
    border: none;
    font-size: 1.25rem;
    color: black;
    padding: 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    transition: all 0.3s ease;
    width: 100%;
`


export default Selector