import React from "react";

export default function ListItem(props) {
    const content = props.format(props.item);
    const className = props.className || "";
    const clickParams = props.clickParams ? props.clickParams(props.item) : { id: props.item.id };

    return (<li
      className={className}
      key={props.id}
      onClick={e => props.onItemClick(clickParams, e)}
    >{content}</li>);
}
