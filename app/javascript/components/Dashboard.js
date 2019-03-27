import React from "react"
import Sidebar from "./Sidebar"
import TaskList from "./TaskList"
import EditModal from "./EditModal"
import ProjectList from "./ProjectList"
import Greeter from "./Greeter"
import Axios from 'axios'
import CreateInputForm from "./CreateTaskForm";

const FILTER_MODES = ["All", "Completed Only", "Uncompleted Only"]
const SORT_MODES = ["Newest", "Oldest", "Alphabetical"]

class Dashboard extends React.Component {
    constructor(props){
        super(props) 
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.state = {
            user: JSON.parse(this.props.user),
            projects: JSON.parse(this.props.projects),
            tasks: JSON.parse(this.props.tasks),
            input: "",
            dueDate:"",
            activeTask: "",
            currentMode: this.props.currentMode,
            greeting: this.props.greeting,
            subheading: this.props.subheading,
            currentSortMode: "Newest",
            currentFilterMode: "All"
        }
    }


    handleInput = event => {
        this.setState({
            input: event.target.value
        })
    }


    changeSortMode = mode => {
        this.setState({
            currentSortMode:mode
        })
    }

    changeFilterMode = mode => {
        this.setState({
            currentFilterMode: mode
        })
    }

    componentDidUpdate(prevState) {
        const {currentMode, input} = this.state
        if (input !== prevState && input.length > 0 && currentMode === "tasks") {
            this.setState({
                currentMode: "create task"
            })
        } else if (input !== prevState && input.length < 1 && currentMode === "create task") {
            this.setState({
                currentMode: "tasks"
            })
        }
    }


    setActiveTask = task => {
        if (this.state.activeTask !== ""){
            let url = `/tasks/${this.state.activeTask}`
            const previousTask = this.state.tasks.filter(task => task.id === this.state.activeTask).pop();
            Axios.put(url,{
                name: previousTask.name,
                description: previousTask.description,
                start_date: previousTask.start_date,
                due_date: previousTask.due_date,
                is_completed: task.is_completed,
                project_id: task.project_id
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
            due_date: task.due_date,
            is_completed: task.is_completed,
            project_id: task.project_id
        })
        .then(res => console.log(res))
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

    setDueDate = value => {
        this.setState({
            dueDate: value
        })
    }

    addNewItem = event => {
        event.preventDefault();
        this.setState({
            input: ""
        })
        if (this.state.currentMode === "create task"){
            let url = '/tasks'
            const data = {name: this.state.input, user_id: this.state.user.id, is_completed: false, due_date: this.state.dueDate}
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
            .then(() => this.sortTasks(this.state.tasks))
        } else if (this.state.currentMode === "create project") {
            let url = '/projects'
            Axios.post(url, {
                name: this.state.input, 
                user_id: this.state.user.id
            }).then(res => this.setState({

            }))
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
        const {user, projects, tasks, activeTask, isInputActive, currentMode, currentSortMode,currentFilterMode, greeting, subheading, input, dueDate} = this.state;
        if (currentMode == "tasks" || currentMode == "create task") {
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
                        <div>
                            {currentMode == "tasks" ?
                                <Greeter 
                                greeting={greeting}
                                subheading={subheading} 
                                user={user}
                                sortModes={SORT_MODES}
                                filterModes={FILTER_MODES}
                                currentSortMode={currentSortMode}
                                currentMode = {currentMode}
                                currentFilterMode={currentFilterMode}
                                changeSortMode={this.changeSortMode}
                                changeFilterMode={this.changeFilterMode}
                                tasks={tasks}
                                />
                            :
                            ""}
                            <CreateInputForm 
                            greeting={greeting}
                            subheading={subheading} 
                            user={user}
                            handleInput={this.handleInput}
                            input = {input}
                            addNewItem={this.addNewItem}
                            isInputActive={isInputActive}
                            currentMode = {currentMode}
                            projects = {projects}
                            dueDate = {dueDate}
                            setDueDate = {this.setDueDate}
                            />
                        </div>
                        {currentMode === "tasks" ?
                            <TaskList user={user} 
                            projects={projects} 
                            tasks={tasks} 
                            setActiveTask = {this.setActiveTask}
                            markTaskComplete={this.markTaskComplete}
                            currentSortMode = {currentSortMode}
                            currentFilterMode = {currentFilterMode}
                            />
                        :
                        "" }
                        
                    </main>
                    {activeTask ? <EditModal task={tasks.filter(task => task.id === activeTask).pop()} 
                    setActiveTask={this.setActiveTask} 
                    clearActiveTask={this.clearActiveTask} 
                    deleteTask={() => this.deleteTask(activeTask)} 
                    editTask={this.editTask}
                    projects={projects}
                    /> : "" }
                </section>

            )
        } else if (currentMode == "create project"){
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className="main--full">
                        <div>
                            <Greeter 
                            greeting="Create a new project"
                            subheading="What are we creating today?"
                            user={user}
                            sortModes={SORT_MODES}
                            filterModes={FILTER_MODES}
                            currentSortMode={currentSortMode}
                            currentFilterMode={currentFilterMode}
                            changeSortMode={this.changeSortMode}
                            changeFilterMode={this.changeFilterMode}
                            tasks={tasks}
                            currentMode={currentMode}
                            />
                            <CreateInputForm
                            greeting={greeting}
                            subheading={subheading} 
                            user={user}
                            handleInput={this.handleInput}
                            input = {input}
                            addNewItem={this.addNewItem}
                            isInputActive={isInputActive}
                            />
                        </div>
                    </main>
                </section>
            )
        } else if (currentMode == "projects") {
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
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
        } else {
            return (
                <section className={`dashboard ${activeTask !== "" ? `dashboard--3col`: ``}`}>
                    <Sidebar projects={projects} />
                    <main className={`${activeTask === "" ? "main" : "main--shrink"}`}>
                        <CreateInputForm
                        greeting={greeting}
                        subheading={subheading} 
                        user={user}
                        handleInput={this.handleInput}
                        input = {input}
                        addNewItem={this.addNewItem}
                        isInputActive={isInputActive}
                        currentMode = {currentMode}
                        projects = {projects}
                        />
                    </main>
                </section>
            )
        }
    }
}
export default Dashboard