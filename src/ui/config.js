import Dispatcher from "./dispatcher";
import { ConfigPop } from "./ui/components/index.js";
import { ipcRenderer, remote } from "electron";
import P from "bluebird";
import React from "react";
import ReactDOM from "react-dom";

const dialog = remote.dialog;

ipcRenderer.on("init", function (event) {
    const browse = async () => {
        await P.try(() => dialog.showOpenDialog(([filename]) => dispatcher.notify("load-file", filename, true)));
    };

    ReactDOM.render(
        <div>
            <input type="image" src="assets/settings.png" width="32" height="32" onClick={() => dispatcher.notify("toggle-config")} />
            <ConfigPop subscribe={c => dispatcher.attach("toggle-config", () => c.toggle())} browse={browse} />
        </div>,
        document.querySelector("#config")
    );

    dispatcher.notify("initialized", { config: true });
});