class Task extends React.Component {
    constructor(props) {
        super(props)
        this.markTaskComplete = this.markTaskComplete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            task: this.props.data,
        }
    }
    markTaskComplete(e) {
        e.preventDefault();
        this.props.markTaskComplete()
    }
    
    handleClick() {
        this.props.setEditModal()
    }
    render() {
        const { task } = this.state
        const isComplete = task.is_completed
        return (
            <div className={`task-item ${isComplete ? `task-item--completed` : ""}` }>
                <form onSubmit={this.markTaskComplete} className="check-box">
                    <button className={`check ${isComplete ? `check--completed` : ""}`}></button>
                </form>
                <div onClick={this.handleClick} className="details__wrap">
                    <h4>{`${task.name}`}</h4>
                </div>
            </div>
        )
    }
}