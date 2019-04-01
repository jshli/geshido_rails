import React, {useState, useEffect, useRef} from "react"
import classNames from 'classnames'
import Dropdown from "./Blocks/DropdownMenu/Index"

export default function DropdownMenu(props) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeOption, setActiveOption] = useState(props.activeOption)
    const dropdown = useRef()

    const handleClick = event => {
        if (!dropdown.current.contains(event.target)){
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

    useEffect(() => {
        setActiveOption(props.activeOption)
    })
    const handleNoneClick = () => {
        setActiveOption("None")
        props.handleClick()
    }

    const handleOptionClick = option => {
        typeof option === "object" ? setActiveOption(option.name) : setActiveOption(option)
        props.handleClick(option)
    }
    

    return (
        <Dropdown ref={dropdown} onClick={handleClick} >
            <Dropdown.Selector onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} fullWidth={props.fullWidth}>
                <p>{props.activeOption ? `${activeOption}` : "Select One..."}</p>
                <i className="fas fa-chevron-down"></i>
            </Dropdown.Selector>
            <Dropdown.Menu menuOpen={menuOpen} fullWidth={props.fullWidth}>
                {props.handleNone ? <Dropdown.Link onClick={handleNoneClick}>None</Dropdown.Link> : ""}
                {props.data.map((option, index) => {
                    if (typeof option === "object") {
                        return (
                            <Dropdown.Link onClick={() => handleOptionClick(option)} key={index}>
                                {activeOption === option.name? <i className="fas fa-circle"></i> : ""}
                                {option.name}
                            </Dropdown.Link>
                        )
                    } else {
                        return (
                            <Dropdown.Link onClick={() => handleOptionClick(option)} key={index}>
                                {props.activeOption === option ? <i className="fas fa-circle"></i> : ""}
                                {option}
                            </Dropdown.Link>
                        )
                    }
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}