import fs from "fs";
import path from "path";
import P from "bluebird";
import R from "ramda";

const readFile = P.promisify(fs.readFile);

export default class Archive {
    constructor(parser) {
        this.parser = parser;
    }

    async load(fileName) {
        const buffer = await readFile(fileName);
        const document = this.parser(buffer.toString());
        const children = R.path(["root", "children"], document);
        const aggregated = this.aggregate(children);

        console.log(aggregated.smsthread);

        return {
            smses: aggregated.sms,
            threads: aggregated.smsthread
        };
    }

    aggregate(xmlNodes) {
        const types = ["sms", "smsthread"];

        return xmlNodes.reduce((reduced, xmlNode) => {
            const nodeType = xmlNode.name.toLowerCase();
            if (!types.includes(nodeType)) {
                return reduced;
            }
            if (!reduced[nodeType]) {
                reduced[nodeType] = [];
            }
            reduced[nodeType].push(this.reduceOneEntity(xmlNode));
            return reduced;
        }, {});
    }

    // Reduce all the xml nodes for one SMS or thread into a regular JS object
    reduceOneEntity(item) {
        return item.children.reduce((reduced, child) => {
            reduced[child.name.toLowerCase()] = child.content;
            return reduced;
        }, {});
    }
};
