import React from "react";
import { Component } from "react";

class Select extends Component {
    render() {
        return (
            <div>
                <select className={this.props.className ? this.props.className : ""} value={this.props.value} onChange={this.props.onChange}>
                    {this.props.options.map((option) => {
                        return <option key={option.id}>{option}</option>;
                    })}
                </select>
            </div>
        )
    }
}
export default Select