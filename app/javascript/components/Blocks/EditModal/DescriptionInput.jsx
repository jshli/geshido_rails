import styled from 'styled-components'

const DescriptionInput = styled.textarea `
    width: 100%;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: all ease 0.3s;
    min-height: 6rem;
    color: rgba(0,0,0,0.75);
    &:active, &:focus{
        border-left: 3px solid black;
        border: 1px solid rgba(0,0,0,0.1);
        color: black;
    }
`

export default DescriptionInput