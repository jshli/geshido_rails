import React from "react"
import Axios from "axios"
import moment from "moment"

export default function EditModal(props){
   

    const handleChange = event => {
        props.editTask(event.target.name, event.target.value)
    }

    const deleteTask = (e) =>{
        e.preventDefault();
        props.deleteTask()
    } 

    const handleExit = () => {
        props.clearActiveTask()
    }


    // componentWillMount() {
    //     const url = `/api/timers/${this.state.task.id}`
    //     if (this.state.task) {
    //         Axios.get(url)
    //         .then(res => this.setState({
               
    //         }))
    //     }
    // }

        const { task } = props;
        console.log(task)
        return(
            <div className='edit-modal'>
                <div className="edit-wrap">
                    <div className='utility-menu'>
                        <div className='content-wrap'>
                            <a><i className="fas fa-flag"></i></a>
                            <form onSubmit={deleteTask}>
                                <button className="delete-btn"><i className="fas fa-trash"></i></button>
                            </form>
                            <a onClick={handleExit} href=""><i className="fas fa-times"></i></a>
                        </div>
                    </div>
                <form>
                <button>Save</button>
                    <div className='content-wrap'>
                        <input onChange={handleChange} type="checkbox" name="is_completed" id=""/>
                        <input onChange={handleChange} className="task-name" type="text" name="name"  value={task.name}  />
                    </div>
                    <p>Project name</p>
                        <div className='content-wrap'>
                            <p>0 minutes so far</p>
                            <div className='content-wrap'>
                                <input onChange={handleChange} type="date"  name="start_date" />
                                <label>Start Date</label>
                            </div>
                            <div className='content-wrap'>
                                <input onChange={handleChange} type="date" name="due_date" />
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
