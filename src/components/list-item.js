import React from "react";

const noop = () => undefined;

export default function ListItem(props) {
    const content = props.format(props.item);
    const className = props.className || "";
    const onClick = props.onItemClick ? e => props.onItemClick(props.item, e) : noop;

    return <li className={className} key={props.id} onClick={onClick}>
        {content}
    </li>;
}
