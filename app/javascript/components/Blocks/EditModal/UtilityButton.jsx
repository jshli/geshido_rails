import styled from "styled-components"

const UtilityButton = styled.button `
    border: none;
    color: rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    padding: 0;
    &:hover {
        color: ${props => props.hoverColor};
    }
`

export default UtilityButton