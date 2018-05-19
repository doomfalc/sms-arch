import { ipcRenderer, remote } from "electron";
import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { List, ListHeader, Visible } from "./ui/components/";

const dispatcher = remote.getGlobal("dispatcher");
const me = sms => sms.status === "3";

function formatSms(sms) {
    const smsMoment = moment(sms.time);
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

function formatThread(thread) {
    const threadMoment = moment(thread.time);
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

function attachSmsVisibility(button) {
    dispatcher.attach("back", () => button.hide());
    dispatcher.attach("show-sms", () => button.show());
}

function attachSmsListItems(smsList) {
    dispatcher.attach("show-sms", ({ items }) => smsList.setItems(items));
}

function attachSmsHeader(smsHeader) {
    dispatcher.attach("show-sms", ({ name }) => smsHeader.setContent(name));
}

function attachThreadList(list) {
    dispatcher.attach("back", () => list.show());
    dispatcher.attach("show-sms", () => list.hide());
}

function populateLists({ smses, threads }) {
    const smsesByThreads = smses.reduce((output, sms) => {
        if (!output[sms.threadid]) {
            /* eslint-disable no-param-reassign */
            output[sms.threadid] = [];
            /* eslint-enable no-param-reassign */
        }
        output[sms.threadid].push(sms);
        return output;
    }, {});

    const onThreadClick = ({ id, name }) => dispatcher.notify("show-sms", { items: smsesByThreads[id], name });

    const threadList = (<List
      items={threads}
      format={formatThread}
      itemClassName="thread-item"
      clickParams={item => ({ id: item.id, name: item.displayname })}
      onItemClick={onThreadClick} />);

    const smsList = (<List
      format={formatSms}
      border="border"
      subscribe={l => attachSmsListItems(l)} />);

    const header = <ListHeader subscribe={attachSmsHeader} />;

    const backButton = <input type="image" src="assets/arrow64.png" height="32" width="64" onClick={() => dispatcher.notify("back")} />;

    ReactDOM.render(
      <Visible component={threadList} subscribe={attachThreadList} visible />,
      document.querySelector("#threads"),
    );
    ReactDOM.render(
      <Visible component={smsList} subscribe={attachSmsVisibility} visible={false} />,
      document.querySelector("#smses"),
    );
    ReactDOM.render(
      <Visible component={backButton} subscribe={attachSmsVisibility} visible={false} />,
      document.querySelector("#back"),
    );
    ReactDOM.render(
      <Visible component={header} subscribe={attachSmsVisibility} visible={false} />,
      document.querySelector("#header"),
    );
}

ipcRenderer.on("init", () => {
    dispatcher.attach("archive-loaded", populateLists);
    dispatcher.notify("initialized", { list: true });
});
