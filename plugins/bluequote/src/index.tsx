import { before, after } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets"
import { findInReactTree } from "@vendetta/utils"
import { findByProps, findByName } from "@vendetta/metro"
import { React } from "@vendetta/metro/common"
import { Forms } from "@vendetta/ui/components"

const LazyActionSheet = findByProps("openLazy", "hideActionSheet")
const ChatInput = findByName("ChatInput");
const { FormRow, FormIcon } = Forms

const unpatch = before("openLazy", LazyActionSheet, ([component, key, msg]) => {
    const message = msg?.message
    if (key !== "MessageLongPressActionSheet" || !message) return
    component.then(instance => {
        const unpatch = after("default", instance, (_, component) => {
            React.useEffect(() => () => { unpatch() }, [])
            const buttons = findInReactTree(component, x => x?.[0]?.type?.name === "ButtonRow")
            if (!buttons) return

            buttons.unshift(
                <FormRow
                    label="Quote"
                    leading={<FormIcon style={{ opacity: 1 }} source={getAssetIDByName("ic_arrow")} />}
                    onPress={() => {
                        ChatInput.props.text = "Test";
                    }}
                />
            )
        })
    })
})

export const onUnload = () => unpatch()