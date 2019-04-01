import styled from "styled-components"

import ClearButton from "./ClearButton"
import Input from "./Input"
import SubmitButton from "./SubmitButton"
import Check from "./Check"

const Form = styled.form `
    position: relative;
    opacity: ${props => props.active ? "1.0" : "0.5"};
    transition: all ease 0.3s;
    margin-top: 1rem;
`

Form.ClearButton = ClearButton
Form.Input = Input
Form.SubmitButton = SubmitButton
Form.ClearButton = ClearButton
Form.Check = Check

export default Form

