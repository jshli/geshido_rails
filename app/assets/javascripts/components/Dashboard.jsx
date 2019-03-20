
class Dashboard extends React.Component {
    constructor(props){
        super(props) 
        this.addNewTask = this.addNewTask.bind(this);
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.taskInput = this.taskInput.bind(this)
        this.setEditModal = this.setEditModal.bind(this)
        this.state = {
            user: JSON.parse(this.props.user),
            projects: JSON.parse(this.props.projects),
            tasks: JSON.parse(this.props.tasks),
            timers: JSON.parse(this.props.timers),
            taskInput: "",
            editModal: "",
        }
    }

    taskInput(event){
        this.setState({
            taskInput: event.target.value
        })
    }

    setEditModal(task) {
        this.setState({
            editModal: task
        }, () => console.log(this.state.editModal))
       
    }

    addNewTask() {
        let url = '/tasks'
        const data = {name: this.state.taskInput, user_id: this.state.user.id, is_completed: false}
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => this.setState({
            tasks: [...this.state.tasks, res]
        }))
    }


    markTaskComplete(task) {
        let url = `/tasks/${task.id}/complete`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => this.state.tasks.map(function(t){
            if (t === task) {
                t.is_completed = !t.is_completed
            }
            return t;
        })).then(tasks => this.setState({tasks: tasks}))
    }


    render () {
        const {user, projects, tasks, editModal} = this.state;
        return (
            <section className={`dashboard ${editModal !== "" ? `dashboard--3col`: ``}`}>
                <Sidebar projects={projects} />
                <main className={`${editModal === "" ? "main" : "main--shrink"}`}>
                <h1>Welcome back, {`${user.first_name}`}</h1>
                <p>Let's get productive.</p>
                <form onSubmit={this.addNewTask}>
                    <button className="add-btn"><i className="fas fa-plus"></i></button>
                    <input className="task-input" type="text" onChange={this.taskInput} placeholder="Add a new task" />
                </form>
                    <TaskList user={user} 
                    projects={projects} 
                    tasks={tasks} 
                    addNewTask={() => this.addNewTask()} 
                    taskInput={this.taskInput}
                    setEditModal = {this.setEditModal}
                    markTaskComplete={this.markTaskComplete}
                    />
                </main>
                <EditModal task={editModal} />
            </section>
        )
    }
}