import styled from 'styled-components'

const Button = styled.a `
    padding: 1rem 2.5rem;
    background-color: white;
    position: relative;
    font-size: 1rem;
    border: none;
    border: 1px solid black;
    color: ${props => props.active ? "white" : "black"};
    transition: all ease 0.3s;
    align-self: flex-start;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.active ? "black" : "white"};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        color: white;
        background-color: black
    }
`

export default Button