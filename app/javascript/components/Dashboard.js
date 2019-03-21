import React from "react"
import Sidebar from "./Sidebar"
import TaskList from "./TaskList"
import EditModal from "./EditModal"
import ProjectList from "./ProjectList"
import Axios from 'axios'
import CreateInput from "./CreateInput";

class Dashboard extends React.Component {
    constructor(props){
        super(props) 
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.state = {
            user: JSON.parse(this.props.user),
            projects: JSON.parse(this.props.projects),
            tasks: JSON.parse(this.props.tasks),
            userInput: "",
            activeTask: "",
            isInputActive: false,
            currentMode: this.props.currentMode,
            greeting: this.props.greeting,
            subheading: this.props.subheading
        }
    }

    userInput = event => {
        console.log(event.target.value)
        this.setState({
            userInput: event.target.value
        })
    }

    setActiveTask = task => {
        if (this.state.activeTask !== ""){
            let url = `/tasks/${this.state.activeTask}`
            const previousTask = this.state.tasks.filter(task => task.id === this.state.activeTask).pop();
            Axios.put(url,{
                name: previousTask.name,
                description: previousTask.description,
                start_date: previousTask.start_date,
                due_date: previousTask.due_date
        })
        .then(res => this.setState({
            activeTask: task.id
        }))  
        } else {
            this.setState({
                activeTask: task.id
            })
        }
    }

    clearActiveTask = () => {
        let url = `/tasks/${this.state.activeTask}`
        const task = this.state.tasks.filter(task => task.id === this.state.activeTask).pop();
        Axios.put(url,{
            name: task.name,
            description: task.description,
            start_date: task.start_date,
            due_date: task.due_date
        })
        .then(res => this.setState({
            activeTask: ""
        }))
    }

    editTask = (field, value) => {
        const activeTask = this.state.activeTask
        this.setState({
            tasks: this.state.tasks.map(function(t){
                if (t.id === activeTask){
                    return {...t, [field]: value}
                } else {
                    return t;
                }
            })
        })
    }

    handleFocus = () => {
        this.setState({
            isInputActive: !this.state.isInputActive
        })
    }

    addNewItem = event => {
        event.preventDefault();
        event.target.value = "";
        if (this.state.currentMode === "tasks"){
            let url = '/tasks'
            const data = {name: this.state.userInput, user_id: this.state.user.id, is_completed: false}
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
        } else if (this.state.currentMode === "create project") {
            let url = '/projects'
            Axios.post(url, {
                name: this.state.userInput, 
                user_id: this.state.user.id
            })
            .then(res => console.log(res))
        }
    }

    deleteTask(task) {
        const url = `/tasks/${this.state.activeTask}`
    Axios.delete(url)
        .then(this.setState({
            tasks: this.state.tasks.filter(t => t.id != this.state.activeTask)
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
        const {user, projects, tasks, activeTask, isInputActive, currentMode} = this.state;
        if (currentMode == "tasks") {
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
                        <CreateInput
                        greeting={this.state.greeting}
                        subheading={this.state.subheading} 
                        user={user}
                        userInput={this.userInput}
                        addNewItem={this.addNewItem}
                        isInputActive={isInputActive}
                        handleFocus={this.handleFocus} 
                        />
                        <TaskList user={user} 
                        projects={projects} 
                        tasks={tasks} 
                        setActiveTask = {this.setActiveTask}
                        markTaskComplete={this.markTaskComplete}
                        />
                    </main>
                    {activeTask ? <EditModal task={tasks.filter(task => task.id === activeTask).pop()} setActiveTask={this.setActiveTask} clearActiveTask={this.clearActiveTask} deleteTask={() => this.deleteTask(activeTask)} editTask={this.editTask}/> : "" }
                </section>

            )
        } else if (currentMode == "create project"){
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className="main--full">
                        <CreateInput
                        greeting={this.state.greeting}
                        subheading={this.state.subheading} 
                        user={user}
                        userInput={this.userInput}
                        addNewItem={this.addNewItem}
                        isInputActive={isInputActive}
                        handleFocus={this.handleFocus} 
                        />
                    </main>
                </section>
            )
        } else {
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
                        <CreateInput
                        greeting={this.state.greeting}
                        subheading={this.state.subheading} 
                        user={user}
                        userInput={this.userInput}
                        addNewItem={this.addNewItem}
                        isInputActive={isInputActive}
                        handleFocus={this.handleFocus} 
                        />
                        <ProjectList user={user} 
                        projects={projects} 
                        tasks={tasks} 
                        setActiveTask = {this.setActiveTask}
                        markTaskComplete={this.markTaskComplete}
                        />
                    </main>
                    {activeTask ? <EditModal task={tasks.filter(task => task.id === activeTask).pop()} setActiveTask={this.setActiveTask} clearActiveTask={this.clearActiveTask} deleteTask={() => this.deleteTask(activeTask)} editTask={this.editTask}/> : "" }
                </section>
            )
        }
    }
}
export default Dashboard