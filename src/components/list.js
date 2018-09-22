import React from "react";
import ListItem from "./list-item.js";

export default function List(props) {
    const rows = props.items.map(item =>
        (<ListItem
            key={item.id}
            id={item.id}
            onItemClick={props.onItemClick}
            item={item}
            className={props.itemClassName}
            format={props.format} />),
    );
    return <ul>{rows}</ul>;
}
