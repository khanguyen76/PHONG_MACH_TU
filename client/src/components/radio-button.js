import { Component } from "react";
import { React, useState } from "react";

class Radio extends Component {
    constructor() {
        super()
        this.state = {
            selectedValue: ''
        }
    }

    render() {
        //const [selectedValue, setSelectedValue] = useState()
        const onSelectChange = (value) => {
            //setSelectedValue(value)
            this.setState({ selectedValue: value })
            this.props.changed(value)
            console.log("onChange value=" + value + " selectedValue=" + this.state.selectedValue)
        }
        return (
            <div className={this.props.className ? this.props.className : ""}>
                <div className="radio-btn-container" style={{ display: "flex" }}>
                    {
                        this.props.options.map((option) => {
                            return <div className="rad-button">
                                <input checked={this.state.selectedValue == option.value || this.props.value == option.value} onChange={() => onSelectChange(option.value)} value={option.value} type="radio" />
                                <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        })
                    }
                </div>
            </div>

        )
    }
}
export default Radio