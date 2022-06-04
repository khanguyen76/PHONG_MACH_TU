import React from "react";
import { Component } from "react";
import { render } from "react-native-web";

class Select extends Component {
    render() {
        return (
            <div>
                <select onChange={this.props.onChange}>
                    {this.props.options.map((option) => {
                        console.log("option="+option)
                        return <option>{option}</option>;
                    })}
                </select>
            </div>
        )
    }
}
export default Select