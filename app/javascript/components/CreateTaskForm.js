import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import Moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function CreateTaskForm(props) {
    const [dueToday, setDueToday] = useState(false)
    const [dueTomorrow, setDueTomorrow] = useState(false)
    const [dueCustom, setDueCustom] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(null)
    const [inputFocus, setInputFocus] = useState(null)

    const handleToday = event => {
        const now = Moment()
        setDueToday(true);
        setDueTomorrow(false);
        setDueCustom(false);
        props.setDueDate(now.endOf('day').toString())
    }
    
    const handleTomorrow = event => {
        const now = Moment()
        setDueTomorrow(true)
        setDueToday(false)
        setDueCustom(false)
        props.setDueDate(now.endOf('day').add(1, 'day').toString())
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

    const { user, input, handleInput, addNewItem, currentMode, projects, dueDate } = props
    return (
        <div>
            <form onSubmit={addNewItem} className={classNames('task-input-form',{
                'task-input-form--active' : input.length > 1 || inputFocus
            })} onFocus={handleFocus} onBlur={handleBlur}>
                <button className="add-btn"><i className="fas fa-plus"></i></button>
                <input className="task-input" type="text" onChange={handleInput} 
                placeholder="What do you need done?" 
                value={input} />
                
                {currentMode === "create task" ? 
                    <div className="new-task-extension">
                        <p>
                            Due Date:
                        </p>
                        <div className='due-date-grouping'>
                            <a onClick={handleToday} className={classNames('button', {
                                'button--active':dueToday
                            })}>
                                Today
                            </a>
                        <a onClick={handleTomorrow} className={classNames('button', {
                                'button--active':dueTomorrow
                            })}>
                                Tomorrow
                            </a>
                            <div className="custom-date__wrapper">
                                <div className={classNames('button', {
                                    'button--active':dueCustom
                                })} onClick={handleClick}> 
                                    {dueCustom ? `${Moment(dueDate).format('DD MMMM')}` : "Custom..."}
                                </div>
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
                            </div>
                        </div>
                            <p>Projects: </p>
                            {projects.map(project => <div key={project.id} className="project-wrap"><div className = "check"></div><p>{project.name}</p></div>)}
                        <button className="button">Save</button>   
                    </div>
                     
                    :
                    ""
                }
                
            </form>
        </div>
    )
}