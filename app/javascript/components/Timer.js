import React from "react"
import Moment from "moment"
export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    updateTime = timeStamp => {
        setInterval(function() {
            return Moment().diff(timeStamp, Moment())
        },
            1000)

    }

    render() {
        const { toggleTimer, currentTimer} = this.props
        return (
            <div className="timer-wrap">
                <i onClick={toggleTimer} className={`far fa-clock ${currentTimer ? `active` : ""}`}></i>
                {currentTimer ? <p className="time">{this.updateTime(currentTimer.data.start_time)}</p> : ""}
            </div>
        )
    }
}