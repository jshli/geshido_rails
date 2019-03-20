import React from "react"
export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { toggleTimer, currentTimer} = this.props
        return (
            <div className="timer-wrap">
                <i onClick={toggleTimer} className={`far fa-clock ${currentTimer ? `active` : ""}`}></i>
            </div>
        )
    }
}