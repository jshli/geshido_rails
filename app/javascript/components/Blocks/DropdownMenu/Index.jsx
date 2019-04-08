import styled from "styled-components"

import Link from "./Link"
import Menu from "./Menu"
import Selector from "./Selector"
import Label from "./Label"
import Separator from "./Separator"

const Dropdown = styled.div `
    position: relative;
`
Dropdown.Link = Link
Dropdown.Menu = Menu
Dropdown.Selector = Selector
Dropdown.Label = Label
Dropdown.Separator = Separator

export default Dropdown