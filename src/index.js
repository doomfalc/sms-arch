import { app, BrowserWindow } from "electron";
import xml from "xml-parser";
import Archive from "./archive";
import Dispatcher from "./dispatcher";
import * as userData from "./user-data";

const windows = {};
const dispatcher = new Dispatcher();
const initialized = {};

global.dispatcher = dispatcher;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
    app.quit();
}

const loadFile = async (filePath, save) => {
    const archive = await new Archive(xml).load(filePath);

    if (archive && save) {
        userData.write({ path: filePath });
    }
    dispatcher.notify("archive-loaded", archive);
};


dispatcher.attach("load-file", loadFile);
dispatcher.attach("initialized", async (ui) => {
    initialized.list |= ui.list;
    initialized.config |= ui.config;

    if (initialized.list && initialized.config) {
        const storedData = await userData.load();
        if (storedData && storedData.path) {
            await loadFile(storedData.path, false);
        } else {
            dispatcher.notify("toggle-config");
        }
    }
});

const openListWindow = (mainWindow) => {
    mainWindow.webContents.on("did-finish-load", async () => {
        mainWindow.webContents.send("init");
    });
};

const createWindow = (target, action) => {
    if (windows[target]) {
        windows[target] = null;
    }
    // Create the browser window.
    const window = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // and load the index.html of the app.
    window.loadURL(`file://${__dirname}/${target}`);

    // Open the DevTools.
    window.webContents.openDevTools();

    // Emitted when the window is closed.
    window.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        windows[target] = null;
    });
    windows[target] = window;

    if (action) {
        action(window);
    }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => createWindow("index.html", openListWindow));

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windows.length === 0) {
        createWindow("index.html", openListWindow);
    }
});
