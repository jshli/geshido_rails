import React, { useState, useEffect, useRef} from "react"
import classNames from 'classnames'
import RadialChart from './RadialChart'
import DropdownMenu from './DropdownMenu'

export default function TaskUtilitiesMenu(props) {
    const [hover, setHover] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    const getCompletionPercentage = () => {
        const completedTasks = props.tasks.filter(task => task.is_completed);
        return completedTasks.length / props.tasks.length * 100
    }

    const node = useRef()

    const handleClick = event => {
        if (!node.current.contains(event.target)){
            setMenuOpen(false)
        } else {
            return
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
          };
    }, []);

    return (
        <div className="utilities-wrap">
            <div ref={node} className="dropdown-wrap" onClick={handleClick}>
                <i onClick = {() => setMenuOpen(!menuOpen)} className={classNames(`fas fa-ellipsis-h`, {
                    'hover': hover,
                    'hover':!hover,
                    'pressed': menuOpen 
                })}>
                </i>
                <div className={classNames("dropdown-menu", {
                    'dropdown-menu--active' : menuOpen
                })}
                >
                    <p>Sorting</p>
                    {props.sortModes.map((mode, index) => {
                        return (
                            <a onClick={() => props.changeSortMode(mode)} key={index}> 
                                {props.currentSortMode === mode ? <i className="fas fa-circle"></i> : ""}
                                {mode} 
                            </a>
                        )
                    })}
                <div className="divider"></div>
                <p>Filters</p>
                    <DropdownMenu 
                    data={props.filterModes}
                    handleClick={props.changeFilterMode}
                    activeOption={props.currentFilterMode}
                    showIndicator={true}
                    />
                </div>
            </div>
            <RadialChart
            progress={getCompletionPercentage()}
            color="#000000"/>
        </div>
    )
}



