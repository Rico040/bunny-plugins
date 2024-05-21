import { findByName } from "@vendetta/metro";
import { moment } from "@vendetta/metro/common";
import { after, before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import renderTimestamp from "../lib/renderTimestamp";

const RowManager = findByName("RowManager")

const patchRowManagerBefore = () => before("generate", RowManager.prototype, ([row]) => {
    if (row.rowType === 1) {
        if (storage.separateMessages) row.isFirst = true
        row.message.__customTimestamp = renderTimestamp(row.message.timestamp)
    } else if (row.rowType === "day") {
        row.text = renderTimestamp(moment(row.text, "LL"))
    }
})

const patchRowManagerAfter = () => after("generate", RowManager.prototype, ([row], { message }) => {
    if (row.rowType !== 1) return
    if (row.message.__customTimestamp &&
        message.state === "SENT" &&
        message.timestamp) message.timestamp = row.message.__customTimestamp
})

export default function patchRowManager() {
    const patches = new Array<Function>;

    patches.push(patchRowManagerBefore())
    patches.push(patchRowManagerAfter())

    return () => patches.forEach(p => p());
}
