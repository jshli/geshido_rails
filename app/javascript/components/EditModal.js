import React from "react"
import Axios from "axios"
import moment from "moment"
export default class EditModal extends React.Component {
    constructor(props) {
        super(props)
        this.deleteTask = this.deleteTask.bind(this)
        this.state = {
            task: this.props.task,
        }
    }

    handleChange = event => {
        const editedTask = {...this.state.task}
        editedTask[event.target.name] = event.target.value
        this.setState({
            task: editedTask
        })
        this.props.editTask(this.state.task)
    }

    deleteTask(e) {
        e.preventDefault();
        this.props.deleteTask()
    } 
    handleExit = () => {
        this.props.clearActiveTask()
    }

    // componentWillMount() {
    //     const url = `/api/timers/${this.state.task.id}`
    //     if (this.state.task) {
    //         Axios.get(url)
    //         .then(res => this.setState({
    //             history: [...this.state.history, res]
    //         }))
    //     }
    // }

    render() {
        const { task } = this.state;
        return(
            <div className='edit-modal'>
                <div className="edit-wrap">
                    <div className='utility-menu'>
                        <div className='content-wrap'>
                            <a><i className="fas fa-flag"></i></a>
                            <form onSubmit={this.deleteTask}>
                                <button className="delete-btn"><i className="fas fa-trash"></i></button>
                            </form>
                            <a onClick={this.handleExit} href=""><i className="fas fa-times"></i></a>
                        </div>
                    </div>
                <form>
                <button>Save</button>
                    <div className='content-wrap'>
                        <input onChange={this.handleChange} type="checkbox" name="is_completed" id=""/>
                        <input onChange={this.handleChange} className="task-name" type="text" name="name" defaultValue={task.name}  />
                    </div>
                    <p>Project name</p>
                        <div className='content-wrap'>
                            <p>0 minutes so far</p>
                            <div className='content-wrap'>
                                <input onChange={this.handleChange} type="date"  name="start_date" />
                                <label>Start Date</label>
                            </div>
                            <div className='content-wrap'>
                                <input onChange={this.handleChange} type="date" name="due_date" />
                                <label>Due Date</label>
                            </div>
                        </div>
                    <div className="divider"></div>
                    <div className='content-wrap'>
                        <i className="fas fa-align-left"></i>
                        <textarea placeholder={task.description} placeholder={task.description === null ? "Description" : task.description}></textarea>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}