import { findByProps } from "@vendetta/metro";
import { before } from "../vpatcher";
import modifyIfNeeded from "../msgProcessor";

const messageModule = findByProps("sendMessage", "receiveMessage");
const uploadModule = findByProps("uploadLocalFiles");

export default [
	before("sendMessage", messageModule, (args) => modifyIfNeeded(args[1])),
	before("uploadLocalFiles", uploadModule, (args) => modifyIfNeeded(args[0].parsedMessage)),
];