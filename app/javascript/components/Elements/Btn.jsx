import styled from 'styled-components'

const Btn = styled.a`
    padding: 1rem 2.5rem;
    position: relative;
    font-size: 1rem;
    margin-top: 1rem;
    border: none;
    display: inline-block;
    border: 1px solid black;
    color: ${props => props.primary ? "white" : "black"};
    transition: all ease 0.3s;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.primary ? "black" : "white"};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        color: ${props => props.primary ? "black" :"white"};
        background-color: ${props => props.primary ? "white": "black"};
        border: none;
    }
`

export default Btn