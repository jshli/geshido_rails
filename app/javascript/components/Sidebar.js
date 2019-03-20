import React from "react"
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render () {
        const { projects } = this.props
        return (
            <aside>
                <div className="border"></div>
                <a href="/tasks" className="a--current-page">
                    <i className="fas fa-tasks"></i>
                    <p>Tasks</p>
                </a>
                <a href="">
                    <i className="fas fa-chart-pie"></i>
                    <p>Timelogs</p>
                </a>
                <a href="">
                    <p>Projects</p>
                    <i className="fas fa-plus"></i>
                </a>
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
}

