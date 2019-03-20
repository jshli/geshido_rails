import React from "react"
import Sidebar from "./Sidebar"
import TaskList from "./TaskList"
import EditModal from "./EditModal"
import Axios from 'axios'

class Dashboard extends React.Component {
    constructor(props){
        super(props) 
        this.addNewTask = this.addNewTask.bind(this);
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.taskInput = this.taskInput.bind(this)
        this.state = {
            user: JSON.parse(this.props.user),
            projects: JSON.parse(this.props.projects),
            tasks: JSON.parse(this.props.tasks),
            taskInput: "",
            activeTask: "",
        }
    }

    taskInput(event){
        this.setState({
            taskInput: event.target.value
        })
    }

    setActiveTask = (task) => {
        this.setState({
            activeTask: task
        })  
    }

    clearActiveTask = () => {
        this.setState({
            activeTask: ""
        })

    }

    editTask = data => {
        const activeTask = this.state.activeTask
        const url = `/tasks/${this.state.activeTask.id}`
        this.setState({
            tasks: this.state.tasks.map(function(t){
                if (t.id === activeTask.id){
                    t = data;
                }
                return t;
            })
        })
        Axios({
            method: 'put',
            url: url,
            data: data,
        })
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

    deleteTask(task) {
        const url = `/tasks/${task.id}`
        Axios.delete(url)
        .then(this.setState({
            tasks: this.state.tasks.filter(t => t != task)
        }))
        .then(this.setState({
            activeTask: ""
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
        const {user, projects, tasks, activeTask} = this.state;
        return (
            <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                <Sidebar projects={projects} />
                <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
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
                    setActiveTask = {this.setActiveTask}
                    markTaskComplete={this.markTaskComplete}
                    />
                </main>
        {activeTask ? <EditModal task={activeTask} setActiveTask={this.setActiveTask} clearActiveTask={this.clearActiveTask} deleteTask={() => this.deleteTask(activeTask)} editTask={this.editTask}/> : "" }
            </section>
        )
    }
}
export default Dashboard