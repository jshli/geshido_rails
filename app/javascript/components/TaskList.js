import React, {useState} from "react"
import Task from './Task'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


export default function TaskList(props) {
 
    const { tasks, markTaskComplete, setActiveTask, currentSortMode, currentFilterMode } = props
    
    
    const SortableItem = SortableElement(({value}) => <li>{value}</li>);

    const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
        </ul>
    );
    });

    
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
