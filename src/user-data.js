import { app } from "electron";
import fs from "fs";
import path from "path";
import P from "bluebird";

const readFile = P.promisify(fs.readFile);
const writeFile = P.promisify(fs.writeFile);

const storagePath = path.join(app.getPath("userData"), "sms-arch.user.json");

async function load() {
    try
    {
        const content = await readFile(storagePath);
        return content ? JSON.parse(content.toString()) : {};
    }
    catch (error) {
        console.log(error);
    }
}

async function write(content) {
    await writeFile(storagePath, Buffer.from(JSON.stringify(content), "utf8"))
}

export { load, write };

//export default class UserData {};

