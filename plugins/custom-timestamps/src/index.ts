import { storage } from "@vendetta/plugin";
import patchRowManager from "./patches/rowManager";
import Settings from "./ui/pages/Settings";

let patches = [];

export default {
    onLoad: () => {
        storage.selected ??= "calendar"
        storage.customFormat ??= "dddd, MMMM Do YYYY, h:mm:ss a"

        patches.push(patchRowManager())
    },
    onUnload: () => {
        patches.forEach(p => p())
    },
    settings: Settings,
}
