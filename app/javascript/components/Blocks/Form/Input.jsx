import styled from "styled-components"

const Input = styled.input`
    width: 100%;
    height: 1.5rem;
    box-shadow: none;
    margin-bottom: 1.5rem;
    font-weight: bold;
    border-bottom: #ECECEC solid 1px;
    padding: 1.5rem 1rem;
    transition: all ease 0.3s;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    &:focus {
        outline: none;
        border-left: black solid 2px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.10);
    }
`



export default Input