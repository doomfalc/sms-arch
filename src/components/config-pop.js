import React from "react";

export default function ConfigPop(props) {
    return <div className="config-pop">
        <button onClick={props.browse}>Open archive</button>
    </div>;
}
