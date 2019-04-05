import React from "react"

import TaskUtilitiesMenu from './TaskUtilitiesMenu'

import { UserContext } from "./Dashboard"

export default function Greeter(props) {

    const {greeting, subheading} = props
    
    return (
        <UserContext.Consumer>
            {({ user }) => (
                <div>
                    <div className="greeting-header-wrap">
                        <h1>{`${greeting}, ${user.first_name} `}</h1>
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
                </div>)}
        </UserContext.Consumer>
    )
}
            