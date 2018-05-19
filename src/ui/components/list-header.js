import React from "react";

export default class ListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (this.props.subscribe) {
            this.props.subscribe(this);
        }
    }
    setContent(content) {
        this.setState({ content });
    }
    render() {
        return <span className="border list-header font-weight-bold">{this.state.content}</span>;
    }
}
