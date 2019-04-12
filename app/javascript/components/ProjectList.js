import React from "react"
import Axios from 'axios'
import styled from "styled-components"

import ProjectCard from "./ProjectCard"
import Card from "./Blocks/ProjectCard/Index"

const AddProjectBtn = styled(Card)`
    box-shadow: none;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow: none;
    }
`
const AddLink = styled.a`
    height: 2rem;
    width: 2rem;
    background-color: black; 
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
    transition: all ease 0.3s;
    &:hover{
        box-shadow: 0 10px 20px rgba(0,0,0,0.25)
    }
`

export default function ProjectList(props) {
    const { tasks, projects, user } = props
    // const { tasks } = this.props
    return (
        <div className="project-list">
            <AddProjectBtn >
                <AddLink href="/projects/new"><i className="fas fa-plus"></i></AddLink>
            </AddProjectBtn>
        {projects.map(project => <ProjectCard key={project.id} project={project} setActiveProject={props.setActiveProject}/>)}
        </div>
    )
} 