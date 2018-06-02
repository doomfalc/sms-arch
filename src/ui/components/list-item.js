import React from "react";

export default function ListItem(props) {
    const content = props.format(props.item);
    const className = props.className || "";

    return (<li
      className={className}
      key={props.id}
      onClick={e => props.onItemClick(props.item, e)}
    >{content}</li>);
}
