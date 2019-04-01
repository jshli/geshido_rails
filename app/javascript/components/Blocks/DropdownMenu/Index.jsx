import styled from "styled-components"

import Link from "./Link"
import Menu from "./Menu"
import Selector from "./Selector"
import Label from "./Label"

const Dropdown = styled.div `
    position: relative;
`
Dropdown.Link = Link
Dropdown.Menu = Menu
Dropdown.Selector = Selector
Dropdown.Label = Label


export default Dropdown