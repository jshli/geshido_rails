import React from "react"
import Axios from 'axios'

import Card from "./Blocks/ProjectCard/Index"

export default function ProjectCard(props) {
    return (
        <Card onClick={() => props.setActiveProject(props.project)}>
            <h2>{props.project.name}</h2>
            <p>7 out of 10 tasks completed</p>
        </Card>
    )
} 