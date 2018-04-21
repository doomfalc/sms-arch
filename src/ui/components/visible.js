import classNames from "classnames";
import React from "react";

export default class Visible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: this.props.visible};
        this.component = this.props.component;
        if (this.props.subscribe) {
            this.props.subscribe(this);
        }
    }

    hide() {
        this.setState({visible: false})
    }

    show() {
        this.setState({visible: true})
    }

    render() {
        const classes = classNames({
            "hidden": !this.state.visible
        });
        return <div className={classes}>{this.component}</div>;
    }
}