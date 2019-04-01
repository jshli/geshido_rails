import styled from "styled-components"

import NameInput from './NameInput'
import DescriptionInput from './DescriptionInput'
import Logs from './Logs'
import Utilities from './Utilities'
import UtilitiesButton from './UtilityButton'

const ModalColumn = styled.div`
    padding: 3rem 0 0 2rem;
`

const Modal = styled.div `
    position: sticky;
    top: 1rem;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-top: 3px solid black;
`

Modal.NameInput = NameInput
Modal.DescriptionInput = DescriptionInput
Modal.Logs = Logs
Modal.Utilities = Utilities
Modal.UtilitiesButton = UtilitiesButton

export {ModalColumn, Modal}