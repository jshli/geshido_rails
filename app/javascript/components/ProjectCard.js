import React from "react"
import SideBar from './Sidebar'
import Axios from 'axios'

export default function ProjectCard(props) {
    return (
        <div className="project-card">
            <h2>{props.project.name}</h2>
            <p></p>
        </div>
    )
} 