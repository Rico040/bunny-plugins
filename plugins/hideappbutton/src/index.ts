import { logger } from "@vendetta";
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const ChatInput = findByName("ChatInput");

const patch = after("render", ChatInput.prototype, (...args) => {
  try {
    args[1].props.children[2].props.children.props.children[1].props.isAppLauncherEnabled = false;
  } catch (e) {
    logger.error("Failed to hide voice message button", e);
  }
});

export const onUnload = () => patch();