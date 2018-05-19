import React from "react";
import ListItem from "./list-item.js";

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items || [],
        };
        if (this.props.subscribe) {
            this.props.subscribe(this);
        }
    }
    setItems(items) {
        this.setState({ items });
    }
    render() {
        const rows = this.state.items.map(item =>
          (<ListItem
            key={item.id}
            id={item.id}
            clickParams={this.props.clickParams}
            onItemClick={this.props.onItemClick}
            item={item}
            className={this.props.itemClassName}
            format={this.props.format} />),
        );
        return <ul>{rows}</ul>;
    }
}
