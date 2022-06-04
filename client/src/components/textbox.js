import React from "react";
import { Component } from "react";

class TextBox extends Component {

    render() {
        return (
            <div>
                <input type="text"
                    onChange={this.props.onChangeValue}
                    autoComplete="off"
                />
            </div>
        )
    }
}
export default TextBox