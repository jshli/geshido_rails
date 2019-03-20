import React from "react"
import Task from './Task'
export default class TaskList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            tasks: this.props.tasks,
            markTaskComplete: this.props.markTaskComplete,
            setActiveTask: this.props.setActiveTask
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tasks:nextProps.tasks
        })
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.addNewTask()
    }

    render() {
        const { user, tasks, markTaskComplete, setActiveTask } = this.state
        return (
            <div>
                {tasks.map(task => <Task key={task.id} task={task} markTaskComplete={() => markTaskComplete(task)} setActiveTask={() => setActiveTask(task)}/>)}
            </div>
        )
    }
}