import classNames from "classnames";
import React from "react";
import ReactDOM from "react-dom";

export default class ConfigPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        if (this.props.subscribe) {
            this.props.subscribe(this);
        }
    }

    toggle() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const classes = classNames({
            "config-pop": true,
            "show": this.state.visible
        });
        const browse = () => {
            this.props.browse();
            this.setState({visible: false});
        };
        return <div className={classes}>
                <button onClick={() => browse()}>Open archive</button>
            </div>
    }
}