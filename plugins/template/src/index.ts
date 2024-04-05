import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";
import patcher from "./stuff/patcher";

export const pluginsURL =
    "https://vd-plugins.github.io/proxy/plugins-full.json";

export default {
    onLoad: () => {
        logger.log("Hello world!");
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}