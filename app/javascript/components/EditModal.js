import React, { useState, useEffect, useRef} from "react"
import Axios from "axios"
import Moment from "moment"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DropdownMenu from './DropdownMenu'
import {Modal, ModalColumn} from "./Blocks/EditModal/Index"
import ContentRow from "./Blocks/ContentRow"
import Check from "./Elements/Check"
import {Divider} from "./Elements/Divider"

const CancelToken = Axios.CancelToken;
const source = CancelToken.source()

export default function EditModal(props){
    const [logs, setLogs] = useState([])
    const [taskProject, setTaskProject] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            const url = `/api/logs/${props.task.id}`
            const result = await Axios.get(url, {
                cancelToken:source.token
            });
            setLogs(result.data)
        }
        fetchData();
        return () => {
            source.cancel
        }
    }, [props.task.current_timer_id, props.task.is_completed])

    useEffect(() => {
        if (props.task.project_id) {
            const fetchProject = async() => {
                    const url = `/api/projects/${props.task.project_id}`
                    const result = await Axios.get(url, {
                        cancelToken:source.token
                    })
                    setTaskProject(result.data)
                }
            fetchProject()
            return () => {
                source.cancel
            }
        } else {
            setTaskProject("")
        }
    }, [props.task.project_id])

    const handleChange = event => {
        props.editTask(event.target.name, event.target.value)
    }

    const editProject = project => {
        props.editTask("project_id", `${project ? project.id : ""}`)
    }

    const handleCheck = e => {
        e.preventDefault()
        props.editTask("is_completed", !props.task.is_completed)
    }

    const handleDayClick = day => {
        props.editTask("due_date", Moment(day).utc().endOf('day').toString())

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
        <ModalColumn>
            <Modal>
                <Modal.Utilities>
                    <ContentRow>
                        <form onSubmit={deleteTask}>
                            <Modal.UtilitiesButton hoverColor={"#ED2551"}><i className="fas fa-trash"></i></Modal.UtilitiesButton>
                        </form>
                        <a onClick={handleExit} href=""><i className="fas fa-times"></i></a>
                    </ContentRow>
                </Modal.Utilities>
            <form onSubmit={handleSubmit}>
                <ContentRow>
                    <Check onClick={handleCheck} isCompleted = {task.is_completed}/>
                    <Modal.NameInput onChange={handleChange} type="text" name="name"  value={task.name}  />
                </ContentRow>
                <div>
                    <p>Project</p>
                    <DropdownMenu 
                        data={props.projects}
                        activeOption={taskProject ? taskProject.name : "None"}
                        handleNone={true}
                        handleClick={editProject}
                        fullWidth={true}
                    />
                </div>
                    <ContentRow>
                        <p>{formatTime(task.total_time)} so far</p>
                        
                        <ContentRow>
                            <DayPickerInput  
                            onDayChange={handleDayClick}
                            inputProps={{ 
                                name: 'due_date', 
                                value: `${task.due_date}`,  
                                placeholder:`${task.due_date ? Moment(task.due_date).format('DD MMMM') : `Select Due Date`}` 
                            }}
                                />
                            <label>Due Date</label>
                        </ContentRow>
                    </ContentRow>
                <Divider />
                <ContentRow alignStart={true}>
                    <i className="fas fa-align-left"></i>
                    <Modal.DescriptionInput onChange={handleChange} placeholder={task.description === null ? "Description" : ""} name="description" value={task.description !== null ? task.description: ""} > </Modal.DescriptionInput>
                </ContentRow>
                <Divider />
                <Modal.Logs>
                    {logs.map(log => {
                        return <p key={log.id}>{`${log.description}. ${Moment(log.created_at).format("dddd, MMMM Do")}`} </p>
                    }).reverse()}
                </Modal.Logs>
            </form>
            </Modal>
        </ModalColumn>
        )
    }
