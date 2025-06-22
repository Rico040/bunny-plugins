import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import modifyIfNeeded from "../msgProcessor";

const messageModule = findByProps("sendMessage", "receiveMessage");
const uploadModule = findByProps("uploadLocalFiles");

export default [
	before("sendMessage", messageModule, (args) => modifyIfNeeded(args[1])),
	...(uploadModule ? [before("uploadLocalFiles", uploadModule, (args) => modifyIfNeeded(args[0].parsedMessage))] : []),
	// since 284, uploadModule doesn't exist
];
