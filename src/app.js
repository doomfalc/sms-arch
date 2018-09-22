import { ipcRenderer, remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";

import Config from "./config";
import { Header } from "./components";
import SmsList from "./sms-list";
import ThreadList from "./thread-list";


const dispatcher = remote.getGlobal("dispatcher");

function getSmsesByThread(allSmses) {
    return allSmses.reduce((output, sms) => {
        if (!output[sms.threadid]) {
            output[sms.threadid] = []; // eslint-disable-line no-param-reassign
        }
        output[sms.threadid].push(sms);
        return output;
    }, {});
}

function getContent(threads, smses) {
    return smses && smses.length ? { smses } : { threads };
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            smses: [],
        };

        dispatcher.subscribe("archive-loaded", archive => {
            this.setState({ threads: archive.threads });
            this.smsesByThread = getSmsesByThread(archive.smses);
        });

        this.loadSmses = this.loadSmses.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({ smses: undefined, author: undefined });
    }

    loadSmses({ id, displayname }) {
        this.setState({
            smses: this.smsesByThread[id],
            author: displayname,
        })
    }

    render() {
        const { threads, smses } = getContent(this.state.threads, this.state.smses);
        const threadContent = threads && <ThreadList threads={threads} onThreadClick={this.loadSmses} />
        const smsContent = smses && <SmsList smses={smses} />
        const author = smsContent && <Header content={this.state.author} />
        const back = smsContent
            && <input type="image"
                src="../assets/baseline_arrow_back_black_36dp.png"
                width="32"
                height="32"
                onClick={this.reset} />

        return <div>
            <div className="menu">
                <div id="config"><Config dispatcher={dispatcher} /></div>
                <div id="back">{back}</div>
                <div id="header">{author}</div>
            </div>
            <div className="float-none clearfix main">
                <div id="threads">{threadContent}</div>
                <div id="smses">{smsContent}</div>
            </div>
        </div>
    }
}

ipcRenderer.on("init", () => {
    dispatcher.publish("initialized");
});

ReactDOM.render(<App />, document.querySelector("#app"));

