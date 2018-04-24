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
        return (<div className="col border thread-col">
          <div className="row font-weight-bold">{this.state.content}</div>
        </div>);
    }
}
