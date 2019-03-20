import React from "react"
import Task from './Task'
export default class TaskList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
        }
    }


    handleSubmit(event){
        event.preventDefault()
        this.props.addNewTask()
    }

    render() {
        const { user, tasks, markTaskComplete, setActiveTask } = this.props
        return (
            <div>
                {tasks.map(task => <Task key={task.id} data={task} markTaskComplete={() => markTaskComplete(task)} setActiveTask={() => setActiveTask(task)}/>)}
            </div>
        )
    }
}