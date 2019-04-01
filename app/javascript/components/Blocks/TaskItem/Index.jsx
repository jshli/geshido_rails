import styled from "styled-components"

import Text from './Text'
import Title from './Title'

const TaskItem = styled.div`
    display: grid;
    grid-template-columns: 10% auto 20%;
    transition: all ease 0.3s;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    cursor: pointer;

    &:hover {
        border-left: 3px solid black;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
`
const CheckColumn = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const DetailsColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1.5rem 3rem;
    flex-direction: column;
    transition: all ease 0.3s;
    ${({isCompleted}) => isCompleted && `
        text-decoration: line-through;
        opacity: 0.5;
    `}
`


TaskItem.Text = Text;
TaskItem.Title = Title;

const TimerColumn = styled(CheckColumn)`
`;

export {TaskItem, CheckColumn, DetailsColumn, TimerColumn}