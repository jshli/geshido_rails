import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group'

import { TasksContext } from "./Dashboard"


export default function Tooltip(props) {

    const Box = styled.div`
        position: absolute;
        margin-top: 0.5rem;
        color: white;
        background-color: black;
        padding: 0.5rem;
        font-size: 1rem;
        text-align: center;
        width: max-content;
        transform: translate(-50%);
        left: 50%;
        transition: opacity 0.3s;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        z-index: 5;
        >p {
            margin-bottom: 0;
            color:white;
        }
        &.fade-enter {
        opacity: 0;
        }

        &.fade-enter-active {
            opacity: 1;
        }


        &.fade-exit {
            opacity: 1;
        }

        &.fade-exit-active {
            opacity: 0;
        }`
    return (
        <TasksContext.Consumer>
            {({ tasks }) => (
            <CSSTransition in={props.active} classNames="fade" timeout={300} unmountOnExit>
                {() => <Box >
                    <p>{`${tasks.filter(task => task.is_completed).length} tasks out of ${tasks.length} completed`  }</p>
                        </Box>
                }
                </CSSTransition>
                )}
        </TasksContext.Consumer>

    )
}