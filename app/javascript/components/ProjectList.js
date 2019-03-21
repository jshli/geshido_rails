import React from "react"
import ProjectCard from "./ProjectCard"

import Axios from 'axios'

export default function ProjectList(props) {
    const { tasks, projects, user } = props
    // const { tasks } = this.props
    return (
        <div className="project-list">
            <a className="project-card new-project-link" href="/project/new">
                <div className="circle"></div>
            </a>
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    )
} 