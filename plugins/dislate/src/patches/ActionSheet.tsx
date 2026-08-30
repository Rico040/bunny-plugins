import { findByProps, findByStoreName } from "@vendetta/metro"
import { FluxDispatcher, React, ReactNative, stylesheet } from "@vendetta/metro/common"
import { before, after } from "@vendetta/patcher"
import { semanticColors } from "@vendetta/ui"
import { getAssetIDByName } from "@vendetta/ui/assets"
import { Forms } from "@vendetta/ui/components"
import { findInReactTree } from "@vendetta/utils"
import { settings } from ".."

import { DeepL, GTranslate } from "../api"
import { showToast } from "@vendetta/ui/toasts"
import { logger } from "@vendetta"

const LazyActionSheet = findByProps("openLazy", "hideActionSheet")
const ActionSheetRow = findByProps("ActionSheetRow")?.ActionSheetRow ?? Forms.FormRow
const MessageStore = findByStoreName("MessageStore")
const ChannelStore = findByStoreName("ChannelStore")
const separator = "\n"

const styles = stylesheet.createThemedStyleSheet({
    iconComponent: {
        width: 24,
        height: 24,
        tintColor: semanticColors.INTERACTIVE_NORMAL
    }
})

let cachedData: object[] = []

export default () => before("openLazy", LazyActionSheet, ([component, key, msg]) => {
    const message = msg?.message
    if (key !== "MessageLongPressActionSheet" || !message) return

    component.then((instance: any) => {
        const unpatch = after("default", instance, (_: any, component: any) => {
            React.useEffect(() => () => { unpatch() }, [])

            // Safely locate action sheet row groups to prevent Metro index crashes
            const groups: any[] = findInReactTree(
                component,
                (c: any) => Array.isArray(c) && c[0]?.type?.name === "ActionSheetRowGroup"
            )

            const originalMessage = MessageStore.getMessage(
                message.channel_id,
                message.id
            )
            if (!originalMessage?.content && !message.content) return

            const messageId = originalMessage?.id ?? message.id
            const messageContent = originalMessage?.content ?? message.content
            const existingCachedObject = cachedData.find((o: any) => Object.keys(o)[0] === messageId)

            const translateType = existingCachedObject ? "Revert" : "Translate"
            const icon = translateType === "Translate" ? getAssetIDByName("LanguageIcon") : getAssetIDByName("ic_highlight")

            const translate = async () => {
                LazyActionSheet.hideActionSheet()
                try {
                    const target_lang = settings.target_lang
                    const isTranslated = translateType === "Translate"
                    const isImmersive = settings.immersive_enabled

                    if (!originalMessage) return

                    const emojiRegex = /<(a?):\w+:\d+>|<@!?\d+>|<#\d+>/g
                    const placeholders: string[] = []
                    const textToTranslate = messageContent.replace(emojiRegex, (match: string) => {
                        placeholders.push(match)
                        return ` [[${placeholders.length - 1}]] `
                    })
                    
                    let translateResult
                    switch(settings.translator) {
                        case 0:
                            translateResult = await DeepL.translate(textToTranslate, undefined, target_lang, !isTranslated)
                            break
                        case 1:
                            translateResult = await GTranslate.translate(textToTranslate, undefined, target_lang, !isTranslated)
                            break
                    }

                    let translatedText = translateResult.text
                    placeholders.forEach((original, index) => {
                        const pRegex = new RegExp(`\\[\\[\\s*${index}\\s*\\]\\]`, 'g')
                        translatedText = translatedText.replace(pRegex, original)
                    })

                    const finalContent = isTranslated
                        ? (isImmersive
                            ? `${messageContent}${separator}${translatedText.trim()} \`[${target_lang?.toLowerCase()}]\``
                            : `${translatedText.trim()} \`[${target_lang?.toLowerCase()}]\``)
                        : (existingCachedObject as any)[messageId]

                    FluxDispatcher.dispatch({
                        type: "MESSAGE_UPDATE",
                        message: {
                            id: messageId,
                            channel_id: originalMessage.channel_id,
                            guild_id: ChannelStore.getChannel(originalMessage.channel_id)?.guild_id,
                            content: finalContent,
                        },
                        log_edit: false,
                        otherPluginBypass: true
                    })

                    if (isTranslated) {
                        cachedData.unshift({ [messageId]: messageContent })
                    } else {
                        cachedData = cachedData.filter((e: any) => e !== existingCachedObject)
                    }
                } catch (e) {
                    showToast("Failed to translate message. Please check Debug Logs for more info.", getAssetIDByName("Small"))
                    logger.error(e)
                }
            }

            const translateRow = React.createElement(ActionSheetRow, {
                label: `${translateType} Message`,
                icon: React.createElement(ActionSheetRow.Icon, {
                    source: icon,
                    IconComponent: () => (
                        <ReactNative.Image
                            resizeMode="cover"
                            style={styles.iconComponent}
                            source={icon}
                        />
                    )
                }),
                onPress: translate
            })

            // Inject into the first valid ActionSheetRow array inside groups
            if (groups?.length) {
                for (let gi = 0; gi < groups.length; gi++) {
                    const groupChildren: any[] = findInReactTree(
                        groups[gi],
                        (c: any) => Array.isArray(c) && c.some((child: any) => child?.type?.name === "ActionSheetRow")
                    )
                    if (groupChildren) {
                        groupChildren.unshift(translateRow)
                        return
                    }
                }
            }

            // Fallback injection if tree searching fails
            const buttons = findInReactTree(component, (x: any) => Array.isArray(x) && x[0]?.type?.name === "ActionSheetRow")
            if (buttons) {
                buttons.unshift(translateRow)
            }
        })
    }).catch((err: any) => {
        logger.error("[Translate] Failed to open LazyActionSheet:", err)
    })
})
