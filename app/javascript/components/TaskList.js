import React, {useState} from "react"
import Task from './Task'
export default function TaskList(props) {
 
    const { tasks, markTaskComplete, setActiveTask, currentSortMode, currentFilterMode } = props

    if (tasks.length < 1) {
        return(
            <div className="empty-list">
                <p>Hey, looks like you're done for the day.</p>
            </div>
        )
    } else {
        return (
            <div>
                {tasks
                .sort((a,b) => {
                    if (currentSortMode === "Newest") {
                            return new Date(b.created_at) - new Date(a.created_at)
                    } else if (currentSortMode === "Alphabetical") {
                            return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1

                    } else {
                            return new Date(a.created_at) - new Date(b.created_at)
                        }
                    }) 
                .filter(task => {
                    if (currentFilterMode === "All") {
                        return task
                    } else if (currentFilterMode === "Completed Only") {
                        return task.is_completed
                    } else if (currentFilterMode === "Uncompleted Only") {
                        return !task.is_completed
                    }
                })
                .map(task => <Task key={task.id} 
                    task={task} 
                    editTask = {props.editTask}
                    markTaskComplete={() => markTaskComplete(task)} 
                    setActiveTask={() => setActiveTask(task)}/>)
                }
            </div>
        )
    }
}
