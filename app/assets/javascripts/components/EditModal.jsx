class EditModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.state = {
            task: this.props.task,
            history: "",
        }
    }

    handleSubmit(e) {
        e.preventDefault();
    }
    deleteTask(e) {
        e.preventDefault();
    } 
    handleExit() {
        
    }
    // componentWillMount() {
    //     const url = `/api/timers/${this.state.task.id}`
    //     fetch(url)
    // }

    render() {
        const { task } = this.props;
        return(
            <div className="edit-modal">
                <form className="edit-wrap">
                    <div className='utility-menu'>
                        <button>Save</button>
                        <div className='content-wrap'>
                            <a><i class="fas fa-flag"></i></a>
                            <form onSubmit={this.deleteTask}>
                                <button><i className="fas fa-trash"></i></button>
                            </form>
                            <a onClick={this.handleExit} href=""><i class="fas fa-times"></i></a>
                        </div>
                    </div>
                    <div className='content-wrap'>
                        <input type="checkbox" name="is_completed" id=""/>
                        <input className="task-name" type="text" name="name" placeholder={task.name} />
                    </div>
                    <p>Project name</p>
                        <div className='content-wrap'>
                            <p>0 minutes so far</p>
                            <div className='content-wrap'>
                                <input type="date"  name="start_date"/>
                                <label>Start Date</label>
                            </div>
                            <div className='content-wrap'>
                                <input type="date" name="due_date"/>
                                <label>Due Date</label>
                            </div>
                        </div>
                    <div className="divider"></div>
                    <div className='content-wrap'>
                        <i class="fas fa-align-left"></i>
                        <textarea placeholder={task.description} placeholder={task.description === null ? "Description" : task.description}></textarea>
                    </div>
                </form>
                
            </div>
        )
    }
}