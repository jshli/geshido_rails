import React from "react"
export default class FormInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const labelToString = str => {
            return str.toLowerCase().split(" ").join("_")
        }
        return (
            <div>
                <label>{this.props.label}</label>
                <input name={labelToString(this.props.label)} type={this.props.type}></input>
            </div>
        )
    }
}