import styled from "styled-components"
import Input from "./Input"
import Label from "./Label"

const StyledForm = styled.form `
    margin-bottom: 1.5rem;
`

StyledForm.Input = Input
StyledForm.Label = Label

export default StyledForm