import React from "react";

export default function ListItem(props) {
    const content = props.format(props.item);
    const borderClass = props.border || "";
    const clickParams = props.clickParams ? props.clickParams(props.item) : { id: props.item.id };

    return (<li
      className={borderClass}
      key={props.id}
      onClick={e => props.onItemClick(clickParams, e)}
    >{content}</li>);
}
