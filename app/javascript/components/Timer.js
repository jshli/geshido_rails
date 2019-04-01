import React, {useState} from "react"
import Moment from "moment"
import classNames from 'classnames'
import TimerClock from './TimerClock'

import TimerItem from './Blocks/Timer/Index'

export default function Timer(props) {
    
    const { currentTimer } = props
    // currentTimer ? updateTime(currentTimer.start_time) : ""
    return (
        <TimerItem>
            <TimerItem.Icon className="far fa-clock" onClick={props.toggleTimer} isActive={currentTimer}/>
            {currentTimer ? <TimerClock currentTimer={currentTimer}/> : ""}
        </TimerItem>
    )
}
