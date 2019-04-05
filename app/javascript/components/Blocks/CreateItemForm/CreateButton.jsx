import styled from "styled-components"

const CreateButton = styled.button `
    border: none;
    background: none;
    position: absolute;
    height: 100%;
    font-size: 1rem;
    max-height: 5rem;
    transition: all ease 0.3s;
    &:hover {
        transform: scale(1.05)
    }
`

export default CreateButton