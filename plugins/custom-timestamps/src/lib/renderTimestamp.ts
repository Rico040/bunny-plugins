import type { moment } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { Mode } from "../ui/pages/Settings";

export default function renderTimestamp(timestamp: typeof moment.fn, mode: Mode["key"] = storage.selected): string {
    switch (mode) {
        case "calendar":
            return timestamp.calendar();
        case "relative":
            return timestamp.fromNow();
        case "iso":
            return timestamp.toISOString();
        case "custom":
            return timestamp.format(storage.customFormat);
    }
}
