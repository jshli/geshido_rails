class TaskList extends React.Component {
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
        const { user, tasks, markTaskComplete, setEditModal } = this.props
        return (
            <div>
                {tasks.map(task => <Task key={task.id} data={task} markTaskComplete={() => markTaskComplete(task)} setEditModal={() => setEditModal(task)}/>)}
            </div>
        )
    }
}