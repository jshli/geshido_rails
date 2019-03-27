import React from "react"
import Moment from "moment"

export default class TimerClock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            intervalId: "",
            elapsedTime: ""
        }
    }

    componentDidMount() {
        const intervalId = setInterval(this.updateTime, 1000)
        this.setState({
            intervalId: intervalId
        })
    }

    updateTime = () => {
        const {intervalId, elapsedTime} = this.state
        let startTime = this.props.currentTimer.start_time
        let currentTime = Moment()
        let seconds = (Moment(currentTime.diff(startTime, 'seconds')));
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        this.setState({
            elapsedTime: `${hours}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    render() {
        return (
            <p className="time">{`${this.state.elapsedTime}`}</p>
        )
    }
}