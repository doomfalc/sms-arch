import moment from "moment";
import React from "react";

import { List } from "./components/";

const dateFormat = "MM/DD/YYYY h:mm:ss a";

function formatThread(thread) {
    const threadMoment = moment(thread.time, dateFormat);
    return (<div className="row">
        <div className="col border header-col">
            <div>{threadMoment.format("MM/DD")}</div>
        </div>
        <div className="col border thread-col">
            <div className="row font-weight-bold">{thread.displayname}</div>
            <div className="row">{thread.snippet}</div>
        </div>
    </div>);
}

export default function ThreadList(props) {
    return <List items={props.threads}
        format={formatThread}
        itemClassName="thread-item"
        onItemClick={props.onThreadClick} />
}