import React from "react"
import Moment from "moment"


export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elapsedTime: "",
            intervalId: ""
        }
    }
   
    updateTime = timeStamp => {
        let startTime = timeStamp;
        if (this.interval) return; 
        setInterval(() => {
            let currentTime = Moment()
            let seconds = (Moment(currentTime.diff(startTime, 'seconds')));
            let hours = Math.floor(seconds / 3600);
            seconds %= 3600;
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            this.setState({
                elapsedTime: `${hours}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
            })
        },1000)
        // this.setState({
        //     intervalId : intervalId
        // })
    }

    startTimer = () => {
        this.props.toggleTimer()
        // this.updateTime(this.props.currentTimer.data.start_time)
    }

    clearTimer = () => {
        clearInterval(this.interval);
        this.setState({
            elapsedTime: ""
        })
        this.props.toggleTimer();
    }
    
    
    render() {
        const { toggleTimer, currentTimer} = this.props
        const { intervalId } = this.state
        this.props.currentTimer ? this.updateTime(currentTimer.data.start_time) : ""
        return (
            <div className="timer-wrap">
                <i onClick={currentTimer ? this.clearTimer : this.startTimer} className={`far fa-clock ${currentTimer ? `active` : ""}`}></i>
                {currentTimer ? <p className="time">{`${this.state.elapsedTime}`}</p> : ""}
            </div>
        )
    }
}