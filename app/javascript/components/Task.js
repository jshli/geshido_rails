import React from "react"
import Timer from './Timer'
import Axios from "axios"
export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            task: this.props.task,
            isComplete: this.props.task.is_completed,
            currentTimer: this.props.task.current_timer_id,
            timers: []
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
            const url = `/timers/${this.state.currentTimer}/stop`
            Axios.put(url, {
                timer: this.state.task.id
            })
            .then(res => this.setState({
                currentTimer: null
            }))
        }
        // console.log(this.state.timer)
    }
   

    handleClick() {
        this.props.setActiveTask()
    }
    render() {
        const { task, isComplete, currentTimer } = this.state
        return (
            <div className={`task-item ${isComplete ? `task-item--completed` : ""}` }>
                <form onSubmit={this.markTaskComplete} className="check-box">
                    <button className={`check ${isComplete ? `check--completed` : ""}`}></button>
                </form>
                <div onClick={this.handleClick} className="details__wrap">
                    <div className="text-wrap">
                        <h4>{`${task.name}`}</h4>
                    </div>
                    <Timer toggleTimer={this.toggleTimer} currentTimer={currentTimer}/>
                </div>
            </div>
        )
    }
}