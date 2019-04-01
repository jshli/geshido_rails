import React, {useState, useEffect } from "react"
import classNames from 'classnames'
import Timer from './Timer'
import Axios from "axios"
import Moment from "moment"

import Check from "./Elements/Check"
import {TaskItem, CheckColumn, DetailsColumn, TimerColumn} from "./Blocks/TaskItem/Index"
import ContentRow from "./Blocks/ContentRow"


const TIMERS = [];
const PROJECT = "";
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

export default function Task(props) {
    const [isCompleted, setIsCompleted] = useState(props.task.is_completed)
    //does this need to be a state??
    const [currentTimer, setCurrentTimer] = useState(null)
    const [currentProject, setCurrentProject] = useState(PROJECT)
    const [totalTime, updateTotalTime] = useState(props.task.total_time)

    const currentTimerId = props.task.current_timer_id

    const markTaskComplete = (e) => {
        e.preventDefault();
        setIsCompleted(!isCompleted)
        props.markTaskComplete()
    }

    useEffect(() => {
        if (currentTimerId) {
            const fetchCurrentTimer = async() => {
                const url = `/timers/${currentTimerId}`
                const result = await Axios.get(url, {
                    cancelToken: source.token
                })
                setCurrentTimer(result.data)
            }
            fetchCurrentTimer();
            return () => {
                source.cancel
            }
        }
    }, [props.task.current_timer_id])

    useEffect(() => {
        if (props.task.project_id) {
            const fetchProject = async() => {
                const url = `/api/projects/${props.task.project_id}`
                const result = await Axios.get(url, {
                    cancelToken: source.token
                })
                setCurrentProject(result.data)
            }
            fetchProject()
            return () => {
                source.cancel
            }
        } else {
            setCurrentProject(null)
        } 
    }, [props.task.project_id])


    //this only updates on server and within this state. Can we hold 
    const toggleTimer = () => {
        if (!currentTimer){
            const url = `/timers`
            Axios.post(url, {
                user_id: props.task.user_id,
                task_id: props.task.id
            })
            .then(res => {
                setCurrentTimer(res.data)
                props.editTask("current_timer_id", res.data.id, props.task.id)
            })
        } 
        else {
            const url = `/timers/${currentTimer.id}/stop`
            Axios.put(url)
            .then(res => updateTotalTime(totalTime + res.data.total_time))
            .then(setCurrentTimer(null))
            props.editTask("current_timer_id", null, props.task.id)
        }
       
    }
    
    const formatTime = minutes => {
        let hours = Math.floor(minutes / 60)
        let rest = minutes % 60
        return minutes > 60 ? `${hours} h ${("0" + rest).slice(-2)} m` : `${rest} m`
    }

    const handleClick = () => {
        props.setActiveTask()
    }

    const { task } = props
    return (
        <TaskItem>
            <CheckColumn onSubmit={markTaskComplete}>
                <Check isCompleted={task.is_completed}/>
            </CheckColumn>
            <DetailsColumn onClick={handleClick} isCompleted={isCompleted}>
                {currentProject ? <TaskItem.Text>{currentProject.name}</TaskItem.Text> : ""}
                <TaskItem.Title>{`${task.name}`}</TaskItem.Title>
                <ContentRow>
                    {task.due_date ? <TaskItem.Text>{"Due " + Moment(task.due_date).startOf('day').fromNow()}</TaskItem.Text>: "" }
                    {totalTime ? <TaskItem.Text>{formatTime(totalTime)} spent so far</TaskItem.Text> : ""}
                </ContentRow>
            </DetailsColumn>
            <TimerColumn >
                <Timer toggleTimer={toggleTimer} currentTimer={currentTimer}/>
            </TimerColumn>
        </TaskItem>
    )
}