import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";

const ChatBanner = findByName("ChatBanner", false)

export default () => after("default", ChatBanner, (args, ret) => {
    if (!ret) return
    let NewMessagesChatBar = findInReactTree(ret, (c) => c.type.name === "NewMessagesChatBar")
    if (!NewMessagesChatBar) return

    after("type", NewMessagesChatBar, ([{ unreadCount, oldestUnreadTimestamp }], ret) => {
        const unreadText = findInReactTree(ret, (c) => c.props && c.props.variant && c.props.color)
    }, true)
})
