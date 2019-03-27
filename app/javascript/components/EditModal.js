import React, { useState, useEffect} from "react"
import Axios from "axios"
import Moment from "moment"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DropdownMenu from './DropdownMenu'

const LOGS = []; 
const PROJECT = ""
export default function EditModal(props){
    const [logs, setLogs] = useState(LOGS)
    const [taskProject, setTaskProject] = useState(PROJECT)

    useEffect(() => {
        const fetchData = async() =>{
            const url = `/api/logs/${props.task.id}`
            const result = await Axios.get(url);
            setLogs(result.data)
        }
        fetchData();
    }, [props, setLogs])

    useEffect(() => {
        if (props.task.project_id) {
            const fetchProject = async() => {
                    const url = `/api/projects/${props.task.project_id}`
                    const result = await Axios.get(url)
                    setTaskProject(result.data)
                }
            fetchProject()
        }
    }, [props, setTaskProject])

    const handleChange = event => {
        props.editTask(event.target.name, event.target.value)
    }

    const editProject = project => {
        props.editTask("project_id", `${project ? project.id : ""}`)
    }

    const handleCheck = () => {
        props.editTask("is_completed", !props.task.is_completed)
    }

    const handleDayClick = day => {
        props.editTask("due_date", day)
    }

    const deleteTask = (e) =>{
        e.preventDefault();
        props.deleteTask()
    } 

    const handleExit = (event) => {
        event.preventDefault()
        props.clearActiveTask()
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        props.clearActiveTask()
    }

    const formatTime = minutes => {
        let hours = Math.floor(minutes / 60)
        let rest = minutes % 60
        return minutes > 60 ? `${hours} h ${("0" + rest).slice(-2)} m` : `${("0" + rest).slice(-2)} m`
    }
    
    const { task } = props;

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
            <form onSubmit={handleSubmit}>
                <div className='content-wrap'>
                    <div onClick={handleCheck} className={`check ${task.is_completed ? `check--completed` : "" }`}>
                        {/* <input onChange={handleChange} type="checkbox" name="is_completed" id="" checked = {task.is_completed ? true : false }/> */}
                    </div>
                    <input onChange={handleChange} className="task-name" type="text" name="name"  value={task.name}  />
                </div>
                <div>
                    <p>Project</p>
                    <DropdownMenu 
                        data={props.projects}
                        activeOption={taskProject ? taskProject.name : "None"}
                        handleNone={true}
                        handleClick={editProject}
                        
                    />
                </div>
                    <div className='content-wrap'>
                        <p>{formatTime(task.total_time)} minutes so far</p>
                        
                        <div className='content-wrap'>
                            <DayPickerInput  
                            onDayChange={handleDayClick}
                            inputProps={{ 
                                name: 'due_date', 
                                value: `${task.due_date}`,  
                                placeholder:`${task.due_date ? Moment(task.due_date).format('DD MMMM') : `Select Due Date`}` }}
                                />
                            {/* <input onChange={handleChange} type="date" name="due_date" value={task.due_date} /> */}
                            <label>Due Date</label>
                        </div>
                    </div>
                <div className="divider"></div>
                <div className='content-wrap'>
                    <i className="fas fa-align-left"></i>
                    <textarea onChange={handleChange} placeholder={task.description === null ? "Description" : ""} name="description" value={task.description !== null ? task.description: ""}></textarea>
                </div>
                <div className="divider"></div>
                <div className="logs-wrap">
                    {logs.map(log => {
                        return <p key={log.id}>{`${log.description}. ${Moment(log.created_at).format("dddd, MMMM Do")}`} </p>
                    }).reverse()}
                </div>
            </form>
            </div>
        </div>
        )
    }
