import styled from "styled-components"

const Card = styled.div`
    width: 100%;
    padding: 1.5rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    transition: all ease 0.3s;
    cursor: pointer;
    background: white;
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.1)
    }
`
export default Card