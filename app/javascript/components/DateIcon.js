import React from "react"
import styled from "styled-components"
import DayPicker from "react-day-picker";

const Icon = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
`
const Day = styled.p`
    font-size: 0.5rem;
`

export default function DateIcon(props){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = days[new Date().getDay()]
    const date = new Date().getDate()

    return (
        <Icon>
            <Day>{day}</Day>
            <p>{date}</p>
        </Icon>
    )
   
}