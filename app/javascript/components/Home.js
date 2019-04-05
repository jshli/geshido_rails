import React from 'react'
import styled from "styled-components"

import Container from "./Elements/Container"
import Btn from "./Elements/Btn"

const Hero = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: url('https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    background-size: cover;
    color: white;
    >p {
        color: white !important;
    }
`

export default function Home(props){
    return (
        <Hero>
            <Container>
                <h1>Task management and time tracking that doesn't get in the way</h1>
                <p>Geshido is a task manager and time tracker built for freelancers, solo founders and productivity geeks.</p>
                <Btn primary={true}>Sign Up</Btn>
            </Container>
        </Hero>
    )
}