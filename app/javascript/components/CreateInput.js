import React from 'react'

export default function CreateInput(props) {

    const { user, userInput, addNewItem, handleFocus, isInputActive, currentMode, greeting, subheading } = props
    return (
        <div>
            <h1>{`${greeting}, ${user.first_name}`}</h1>
            <p>{subheading}</p>
            <form onSubmit={addNewItem} className={`task-input-form ${isInputActive ? 'task-input-form--active' : ""}`}>
                <button className="add-btn"><i className="fas fa-plus"></i></button>
                <input className="task-input" type="text" onChange={userInput} onFocus={handleFocus} onBlur={handleFocus} placeholder="What do you need done?" />
            </form>
        </div>
    )
}