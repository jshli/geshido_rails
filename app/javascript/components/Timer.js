import React, {useState} from "react"
import Moment from "moment"
import classNames from 'classnames'
import TimerClock from './TimerClock'

export default function Timer(props) {
    
    const { currentTimer } = props
    // currentTimer ? updateTime(currentTimer.start_time) : ""
    return (
        <div className="timer-wrap">
            <i onClick={props.toggleTimer} 
                className={classNames("far fa-clock", {
                    "active" : currentTimer
                })}></i>
            {currentTimer ? <TimerClock currentTimer={currentTimer}/> : ""}
        </div>
    )
}
