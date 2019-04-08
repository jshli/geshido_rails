import React, { useState, useEffect, useRef} from "react"
import classNames from 'classnames'

import RadialChart from './RadialChart'
import DropdownMenu from './DropdownMenu'
import Dropdown from "./Blocks/DropdownMenu/Index"
import ContentRow from './Blocks/ContentRow'

export default function TaskUtilitiesMenu(props) {
    const [hover, setHover] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

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
        <ContentRow>
            <Dropdown ref={node} onClick={handleClick}>
                <i onClick = {() => setMenuOpen(!menuOpen)} className={classNames(`fas fa-ellipsis-h`, {
                    'hover': hover,
                    'hover':!hover,
                    'pressed': menuOpen 
                })}>
                </i>
                <Dropdown.Menu menuOpen={menuOpen}>
                    <Dropdown.Label>Sorting</Dropdown.Label>
                    {props.sortModes.map((mode, index) => {
                        return (
                            <Dropdown.Link onClick={() => props.changeSortMode(mode)} key={index}> 
                                {props.currentSortMode === mode ? <i className="fas fa-circle"></i> : ""}
                                {mode} 
                            </Dropdown.Link>
                        )
                    })}
                <Dropdown.Separator/>
                <Dropdown.Label>Filters</Dropdown.Label>
                    <DropdownMenu 
                    data={props.filterModes}
                    handleClick={props.changeFilterMode}
                    activeOption={props.currentFilterMode}
                    showIndicator={true}
                    />
                </Dropdown.Menu>
            </Dropdown>
            <RadialChart
            progress={getCompletionPercentage()}
            color="#000000"/>
        </ContentRow>
    )
}



