import { logger } from "@vendetta"
import { registerCommand } from "@vendetta/commands"
import { ApplicationCommandInputType, ApplicationCommandType, ApplicationCommandOptionType } from "../../../../ApplicationCommandTypes"
import { showToast } from "@vendetta/ui/toasts"
import { getAssetIDByName } from "@vendetta/ui/assets"
import { Codeblock } from "@vendetta/ui/components"
import { showConfirmationAlert } from "@vendetta/ui/alerts"
import { findByProps } from "@vendetta/metro"
import { settings } from ".."

import { DeepLLangs} from "../lang"
import { DeepL, GTranslate } from "../api"

const ClydeUtils = findByProps("sendBotMessage")
const langOptionsDeepL = Object.entries(DeepLLangs).map(([key, value]) => ({
    name: key,
    displayName: key,
    value: value
}))

// TODO: Make command option somehow vary with different translators
// const langOptionsGTranslate = Object.entries(GTranslate).map(([key, value]) => ({
//     name: key,
//     displayName: key,
//     value: value
// }))
// const langOptions = settings?.translator === 1 ? langOptionsGTranslate : langOptionsDeepL;

export default () => registerCommand({
    name: "translate",
    displayName: "translate",
    description: "Send a message using Dislate in any language chosen.",
    displayDescription: "Send a message using Dislate in any language chosen.",
    applicationId: "-1",
    type: ApplicationCommandType.CHAT as number,
    inputType: ApplicationCommandInputType.BUILT_IN_TEXT as number,
    options: [
        {
            name: "text",
            displayName: "text",
            description: "The text/message for Dislate to translate. Please note some formatting of mentions and emojis may break due to the API.",
            displayDescription: "The text/message for Dislate to translate. Please note some formatting of mentions and emojis may break due to the API.",
            type: ApplicationCommandOptionType.STRING as number,
            required: true
        },
        {
            name: "language",
            displayName: "language",
            description: "The language that Dislate will translate the text into. This can be any language from the list.",
            displayDescription: "The language that Dislate will translate the text into. This can be any language from the list.",
            type: ApplicationCommandOptionType.STRING as number,
            // @ts-ignore
            choices: [...langOptionsDeepL],
            required: true
        }
    ],
    async execute(args, ctx) {
        const [text, lang] = args
        try {
            var content
            switch(settings.translator) {
                case 0:
                    content = await DeepL.translate(text.value, undefined, lang.value)
                    break
                case 1:
                    content = await GTranslate.translate(text.value, undefined, lang.value)
                    break
            }
            return await new Promise((resolve): void => showConfirmationAlert({
                title: "Are you sure you want to send it?",
                content: (
                    <Codeblock>
                        {content.text}
                    </Codeblock>
                    ),
                confirmText: "Yep, send it!",
                onConfirm: () => resolve({ content: content.text }),
                cancelText: "Nope, don't send it"
            }))
        } catch (e) {
            logger.error(e)
            return ClydeUtils.sendBotMessage(ctx.channel.id, "Failed to translate message. Please check Debug Logs for more info.")
        }
    }
})