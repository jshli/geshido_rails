import React from "react"
import styled from "styled-components"

import DateIcon from "./DateIcon"

const Link = styled.a`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    color: rgba(0,0,0,0.5);
    >p {
        margin-bottom: 0;
        }
`

export default function Sidebar(props){
    
    const { projects } = props
    return (
        <aside>
            <div className="border"></div>
            <Link href="/today" >
                <DateIcon/>
                <p>Today</p>
            </Link>
            <Link href="/tasks" >
                <i className="fas fa-tasks"></i>
                <p>All Tasks</p>
            </Link>
            <Link href="">
                <i className="fas fa-chart-pie"></i>
                <p>Timelogs</p>
            </Link>
            <div className="project-link">
                <a href="/projects" >
                    <p>Projects</p>
                </a>
                <a href="/projects/new">
                    <i className="fas fa-plus"></i>
                </a>
                
            </div>
        
            {projects.map(project => 
                (
                <Link key={`${project.id}`} href ="">
                    <p >{`${project.name}`}</p>
                </Link>
                ))
                }
        </aside>
    )
}

