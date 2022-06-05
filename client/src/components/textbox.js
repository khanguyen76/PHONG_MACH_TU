import React from "react";
import { Component } from "react";

class TextBox extends Component {

    render() {
        return (
            <div>
                <input
                    className={this.props.className ? this.props.className : ""}
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChangeValue}
                    autoComplete="off"
                />
            </div>
        )
    }
}
export default TextBox