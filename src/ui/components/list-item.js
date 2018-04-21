import React from "react";

export default function ListItem(props) {
    const content = props.format(props.content);
    const borderClass = props.border || "";
    return  <li className={borderClass} key={props.id} onClick={e => props.onItemClick(props.id, e)}>{content}</li>;
};
