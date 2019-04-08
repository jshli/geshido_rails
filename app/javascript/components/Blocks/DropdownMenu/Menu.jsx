import styled from "styled-components"

const Menu = styled.div `
    position: absolute;
    display: ${props => props.menuOpen ? "flex" : "none"};
    flex-direction: column;
    right: 0;
    background: white;
    z-index: 2;
    box-shadow: 0 20px 40px rgba(0,0,0,0.10);

    ${({fullWidth}) => fullWidth && `
        width: 100%
    `}
`
    

export default Menu