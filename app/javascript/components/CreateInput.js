import React from 'react'
import Moment from 'moment'

export default function CreateInput(props) {

    const { user, userInput, addNewItem, handleFocus, isInputActive, currentMode, greeting, subheading, projects } = props
    return (
        <div>
            <div className="greeting-wrap">
                <h1>{`${greeting}, ${user.first_name}`}</h1>
                {currentMode === "tasks" ?
                <div>
                    <div className="radial-graph"></div>
                </div>
                :
                ""}
            </div>
            <p>{subheading}</p>
            <form onSubmit={addNewItem} className={`task-input-form ${isInputActive ? 'task-input-form--active' : ""}`}>
                <button className="add-btn"><i className="fas fa-plus"></i></button>
                <input className="task-input" type="text" onChange={userInput} onFocus={handleFocus} onBlur={handleFocus} placeholder="What do you need done?" />
                {currentMode === "create task" ? 
                    <div className="new-task-extension">
                        <p>
                            Due Date:
                        </p>
                        <div className='due-date-grouping'>
                            <button>Today</button>
                            <button>Tomorrow</button>
                            <button>Custom...</button>
                        </div>
                            <p>Projects: </p>
                            {projects.map(project => <div className="project-wrap"><div className = "check"></div><p>{project.name}</p></div>)}
                        
                    </div>
                    :
                    ""
                }   
            </form>
        </div>
    )
}