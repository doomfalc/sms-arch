import React from "react";
import { remote } from "electron";

import { ConfigPop } from "./components/index.js";

const dialog = remote.dialog;

export default class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPop: false
        };
        this.browse = this.browse.bind(this);
    }

    async browse() {
        await dialog.showOpenDialog(([ filename ]) => this.props.dispatcher.publish("load-file", filename, true));
        this.setState({ showPop: false });
    }

    render() {
        const pop = this.state.showPop ? <ConfigPop key="pop" browse={this.browse} /> : undefined;
        return [
            <input key="icon"
                type="image"
                src="../assets/baseline_settings_black_36dp.png"
                width="32"
                height="32"
                onClick={() => this.setState(state => {
                    return { showPop: !state.showPop };
                })} />,
            pop
        ]
    }
}