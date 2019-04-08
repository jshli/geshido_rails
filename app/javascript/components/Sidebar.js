import React from "react"
export default function Sidebar(props){
    
    const { projects } = props
    return (
        <aside>
            <div className="border"></div>
            <a href="/tasks" >
                <i className="fas fa-tasks"></i>
                <p>Tasks</p>
            </a>
            <a href="">
                <i className="fas fa-chart-pie"></i>
                <p>Timelogs</p>
            </a>
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
                <a key={`${project.id}`} href ="">
                    <p >{`${project.name}`}</p>
                </a>
                ))
                }
        </aside>
    )
}

