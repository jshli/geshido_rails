import React from "react"
import Task from './Task'
export default function TaskList(props) {
    
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         tasks:nextProps.tasks
    //     })
    // }
    // handleSubmit(event){
    //     event.preventDefault()
    //     this.props.addNewTask()
    // }

 
    const { tasks, markTaskComplete, setActiveTask } = props
    // const { tasks } = this.props
    return (
        <div>
            {tasks.map(task => <Task key={task.id} task={task} markTaskComplete={() => markTaskComplete(task)} setActiveTask={() => setActiveTask(task)}/>)}
        </div>
    )
}
