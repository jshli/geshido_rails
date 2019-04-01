import styled from "styled-components"

const ClearButton = styled.a`
    border: none;
    background: none;
    position: absolute;
    height: 100%;
    font-size: 1rem;
    max-height: 5rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;
    &:hover {
        transform: scale(1.05)
    }
`

export default ClearButton