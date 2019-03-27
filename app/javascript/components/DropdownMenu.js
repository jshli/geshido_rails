import React, {useState, useEffect, useRef} from "react"
import classNames from 'classnames'

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

    

    return (
        <div ref={dropdown} onClick={handleClick} className="selector-wrap">
            <div onClick={() => setMenuOpen(!menuOpen)} className={classNames("selector", {
                "selector--active" : menuOpen
            })}>
                <p>{props.activeOption ? `${props.activeOption}` : "Select One..."}</p>
                <i className="fas fa-chevron-down"></i>
            </div>
            <div className={classNames("dropdown-menu", {
                'dropdown-menu--active' : menuOpen
            })}>
                {props.handleNone ? <a onClick={() => props.handleClick("")}>None</a> : ""}
                {props.data.map((option, index) => {
                    if (typeof option === "object") {
                        return (
                            <a onClick={() => props.handleClick(option)} key={index}>
                                {props.activeOption === option.name? <i className="fas fa-circle"></i> : ""}
                                {option.name}
                            </a>
                        )
                    } else {
                        return (
                            <a onClick={() => props.handleClick(option)} key={index}>
                                {props.activeOption === option ? <i className="fas fa-circle"></i> : ""}
                                {option}
                            </a>
                        )
                    }
                })}
            </div>
        </div>
    )
}