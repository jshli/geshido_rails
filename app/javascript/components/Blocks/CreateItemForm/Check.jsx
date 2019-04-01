import styled from "styled-components"

const Check = styled.div`
    border: 2px black solid;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1000px;
    padding: 0;
    transition: all ease 0.3s;
    ${({isSelected}) => isSelected && `
        background: black; 
    `}
`
export default Check