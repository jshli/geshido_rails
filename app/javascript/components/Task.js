import React, {useState, useEffect} from "react"
import classNames from 'classnames'
import Timer from './Timer'
import Axios from "axios"
import Moment from "moment"

const TIMERS = [];
const PROJECT = "";

export default function Task(props) {
    const [isComplete, setIsComplete] = useState(props.task.is_completed)
    const [currentTimerId, setCurrentTimerId] = useState(props.task.current_timer_id)
    const [currentTimer, setCurrentTimer] = useState(null)
    const [timers, setTimers] = useState(TIMERS)
    const [currentProject, setCurrentProject] = useState(PROJECT)
    const [totalTime, updateTotalTime] = useState(props.task.total_time)

    const markTaskComplete = (e) => {
        e.preventDefault();
        setIsComplete(!isComplete)
        props.markTaskComplete()
    }

    useEffect(() => {
        const fetchTimers = async() => {
            const url = `/api/timers/${props.task.id}`
            const result = await Axios.get(url);
            setTimers(result.data)
        }
        fetchTimers();
    }, [props, setTimers])

    useEffect(() => {
        if (currentTimerId !== null) {
            const fetchCurrentTimer = async() => {
                const url = `/timers/${currentTimerId}`
                const result = await Axios.get(url)
                setCurrentTimer(result.data)
            }
            fetchCurrentTimer()
        }
    }, [props, setCurrentTimer])

    useEffect(() => {
        if (props.task.project_id !== null) {
            const fetchProject = async() => {
                const url = `/api/projects/${props.task.project_id}`
                const result = await Axios.get(url)
                setCurrentProject(result.data)
            }
            fetchProject()
        }
    }, [props, setCurrentProject])


    const toggleTimer = () => {
        if (!currentTimer){
            const url = `/timers`
            Axios.post(url, {
                user_id: props.task.user_id,
                task_id: props.task.id
            })
            .then(res => setCurrentTimer(res.data))
        } 
        else {
            const url = `/timers/${currentTimer.id}/stop`
            Axios.put(url, {
                // timer: props.task.id
            })
            .then(res => updateTotalTime(totalTime + res.data.total_time))
            .then(res => console.log(res))
            .then(setCurrentTimer(null))
            .then(setCurrentTimerId(null))
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

    const { task, project } = props
    return (
        <div className={`task-item ${isComplete ? `task-item--completed` : ""}` }>
            <form onSubmit={markTaskComplete} className="check-box">
                <button className={`check ${isComplete ? `check--completed` : ""}`}></button>
            </form>
            <div className="details__wrap">
                <div onClick={handleClick} className="text-wrap">
                    {currentProject ? <p>{currentProject.name}</p> : ""}
                    <h4>{`${task.name}`}</h4>
                    <div className="small-details-grid">
                            {task.due_date ? <div><p>{"Due " + Moment(task.due_date).startOf('day').fromNow()}</p> </div> : "" }
                        <div>
                            {totalTime ? <p>{formatTime(totalTime)} spent so far</p> : ""}
                        </div>
                    </div>
                </div>
                <Timer toggleTimer={toggleTimer} currentTimer={currentTimer}/>
            </div>
        </div>
    )
}