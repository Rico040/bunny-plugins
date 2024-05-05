import { storage } from "@vendetta/plugin";
import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";

// Default settings
storage.emojiSize ??= 48;

// Migration code, used to be string containing a number but is now just a number
if (typeof storage.emojiSize === "string") storage.emojiSize = parseInt(storage.emojiSize);

const patches = [
    ...nitroChecks,
    ...sendMessage,
];

export const onUnload = () => patches.forEach(p => p());
export { default as settings } from "./Settings";