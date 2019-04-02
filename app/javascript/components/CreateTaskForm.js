import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import Moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Button from './Elements/Button'
import ContentRow from "./Blocks/ContentRow"
import Form from './Blocks/CreateItemForm/Index'

export default function CreateTaskForm(props) {
    const [dueToday, setDueToday] = useState(false)
    const [dueTomorrow, setDueTomorrow] = useState(false)
    const [dueCustom, setDueCustom] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(null)
    const [inputFocus, setInputFocus] = useState(null)

    const handleToday = event => {
        setDueToday(!dueToday);
        setDueTomorrow(false);
        setDueCustom(false);
        props.setDueDate(Moment.utc().endOf('day').toString())
    }
    
    const handleTomorrow = event => {
        setDueTomorrow(!dueTomorrow)
        setDueToday(false)
        setDueCustom(false)
        props.setDueDate(Moment.utc().endOf('day').add(2, 'day').toString())
    }

    const handleProjectClick = id => {
        props.setProjectId(id)
    }

    const handleFocus = () => {
        setInputFocus(true)
    }

    const handleBlur = () => {
        setInputFocus(false)
    }

    const handleClick = event => {
        setShowDatePicker(!showDatePicker)
    }

    const handleDateClick = (date, {selected}) => {
        setDueTomorrow(false)
        setDueToday(false)
        setDueCustom(true)
        setShowDatePicker(false)
        props.setDueDate(date.toString())
    }

    const handleClear = event => {
        event.preventDefault()
        props.handleClear()
    }

    const { newItem, handleInput, addNewItem, currentMode, projects, dueDate } = props
    return (
        <div>
            <Form onSubmit={addNewItem} active = {newItem.name.length > 0 || inputFocus} onFocus={handleFocus} onBlur={handleBlur}>
                <Form.SubmitButton><i className="fas fa-plus"></i></Form.SubmitButton>
                {currentMode === "create task" ? <Form.ClearButton onClick={handleClear}><i className="fas fa-times"></i></Form.ClearButton> : ""}
                <Form.Input type="text" 
                onChange={handleInput} 
                placeholder={currentMode === "tasks" ? "What do you need done?" : "New project name" }
                value={newItem.name} />

                {currentMode === "create task" ? 
                    <div className="new-task-extension">
                        <p>
                            Due Date:
                        </p>
                        <ContentRow threeCol={true} marginBottom={true}>
                            <Button onClick={handleToday} active={dueToday}>
                                Today
                            </Button>
                        <Button onClick={handleTomorrow} active={dueTomorrow}>
                                Tomorrow
                            </Button>
                                <Button onClick={handleClick}> 
                                    {dueCustom ? `${Moment(dueDate).format('DD MMMM')}` : "Custom..."}
                                    <div></div>
                                </Button>
                                {showDatePicker ? 
                                    <div className="datepicker-wrapper">
                                        <DayPicker
                                        selectedDays={dueDate}
                                        onDayClick={handleDateClick}
                                        />
                                        <input className="hidden" value={dueDate} name="due-date" readOnly/>
                                    </div>
                                    : 
                                    ""
                                    } 
                        </ContentRow>
                        <div className="project-list__wrap">
                            <p>Assign to project: </p>
                            {projects.map(project => <div key={project.id} className="project-wrap">
                            <Form.Check isSelected={props.newItem.projectId === project.id}
                            onClick={() => handleProjectClick(project.id)}/>
                            
                            <p>{project.name}</p>
                            </div>)}
                        </div>
                        <Button onClick={addNewItem}>Save</Button>   
                    </div>
                     
                    :
                    ""
                }
                
            </Form>
        </div>
    )
}