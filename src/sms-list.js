import moment from "moment";
import React from "react";

import { List } from "./components/";

const me = sms => sms.status === "3";

function formatSms(sms) {
    const smsMoment = moment(sms.time, "M/DD/YYYY h:mm:ss A");
    const classes = me(sms)
        ? { body: "sms-body sms-body0", border: "border border-primary" }
        : { body: "sms-body sms-body1", border: "border border-secondary" };

    return (<div>
        <div className="float-left">{smsMoment.format("MM/DD")}</div>
        <div>{smsMoment.format("ddd HH:mm")}</div>
        <div className={classes.body}>
            <div className={classes.border}>{sms.body}</div>
        </div>
    </div>);
}

export default function SmsList(props) {
    return <List items={props.smses} format={formatSms} />
}