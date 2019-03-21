import React from "react"
import Timer from './Timer'
import Axios from "axios"
import Moment from "moment"
export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            task: this.props.task,
            isComplete: this.props.task.is_completed,
            currentTimer: null,
            timers: [],
            totalTime: this.props.task.total_time
        }
    }
    markTaskComplete(e) {
        e.preventDefault();
        this.props.markTaskComplete()
    }

    
    componentDidMount() {
        const url = `/api/timers/${this.state.task.id}`
        Axios.get(url)
        .then(res => this.setState({
            timers: [...this.state.timers, res.data]
        }))
        if (this.state.task.current_timer_id !== null) {
            const timerUrl = `/timers/${this.state.task.current_timer_id}`
            Axios.get(timerUrl)
            .then(res => this.setState({
                currentTimer: res
            }))
        }
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isComplete: nextProps.task.is_completed})
    }


    toggleTimer = () => {
        if (this.state.currentTimer === null || this.state.currentTimer === false){
            const url = `/timers`
            Axios.post(url, {
                user_id: this.state.task.user_id,
                task_id: this.state.task.id
            })
            .then(res => this.setState({
                currentTimer: res
            }))
        } 
        else {
            const url = `/timers/${this.state.currentTimer.data.id}/stop`
            Axios.put(url, {
                timer: this.state.task.id
            })
            .then(res => this.setState({
                totalTime: this.state.totalTime + res.data.total_time
            }))
            .then(res => this.setState({
                currentTimer: null
            }))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.task !== prevProps.task){
            this.setState({
                task: this.props.task
            })
        }
    }
    
    formatTime = minutes => {
        let hours = Math.floor(minutes / 60)
        let rest = minutes % 60
        return minutes > 60 ? `${hours} h ${("0" + rest).slice(-2)} m` : `${rest} m`
    }


    handleClick() {
        this.props.setActiveTask()
    }
    render() {
        const { task, isComplete, currentTimer, totalTime } = this.state
        return (
            <div className={`task-item ${isComplete ? `task-item--completed` : ""}` }>
                <form onSubmit={this.markTaskComplete} className="check-box">
                    <button className={`check ${isComplete ? `check--completed` : ""}`}></button>
                </form>
                <div onClick={this.handleClick} className="details__wrap">
                    <div className="text-wrap">
                        <h4>{`${task.name}`}</h4>
                        <div className="small-details-grid">
                                {task.due_date ? <div><p>{"Due " + Moment(task.due_date).startOf('day').fromNow()}</p> </div> : "" }
                            <div>
                                {totalTime ? <p>{this.formatTime(totalTime)} spent so far</p> : ""}
                            </div>
                        </div>
                    </div>
                    <Timer toggleTimer={this.toggleTimer} currentTimer={currentTimer}/>
                </div>
            </div>
        )
    }
}