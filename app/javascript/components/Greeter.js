import React, { useState, useEffect, useRef} from "react"
import classNames from 'classnames';
import TaskUtilitiesMenu from './TaskUtilitiesMenu'

export default function Greeter(props) {

    const {user, greeting, subheading} = props
    
    return (
        <div>
            <div className="greeting-header-wrap">
                <h1>{`${greeting}`}</h1>
                {props.currentMode === "tasks" ? 
                    <TaskUtilitiesMenu 
                        currentSortMode = {props.currentSortMode}
                        currentFilterMode = {props.currentFilterMode}
                        changeFilterMode = {props.changeFilterMode}
                        changeSortMode = {props.changeSortMode}
                        sortModes = {props.sortModes}
                        filterModes = {props.filterModes}
                        tasks = {props.tasks}
                    />
                : 
                
                ""}
            </div>
            <p>{subheading}</p>
        </div>
    )
}
            