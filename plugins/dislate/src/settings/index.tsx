import { getAssetIDByName } from "@vendetta/ui/assets"
import { React, ReactNative, stylesheet, constants, NavigationNative, url } from "@vendetta/metro/common"
import { semanticColors } from "@vendetta/ui"
import { Forms } from "@vendetta/ui/components"
import { manifest } from "@vendetta/plugin"
import { useProxy } from "@vendetta/storage"

import { settings } from ".."
import TargetLang from "./TargetLang"
import TranslatorPage from "./TranslatorPage"

const { ScrollView, Text } = ReactNative
const { FormRow, FormSwitchRow } = Forms

const styles = stylesheet.createThemedStyleSheet({
    subheaderText: {
        color: semanticColors.HEADER_SECONDARY,
        textAlign: 'center',
        margin: 10,
        marginBottom: 50,
        letterSpacing: 0.25,
        fontFamily: constants.Fonts.PRIMARY_BOLD,
        fontSize: 14
    }
})

export default () => {
    const navigation = NavigationNative.useNavigation()
    useProxy(settings)

    return (
        <ScrollView>
            <FormSwitchRow
                label={"Immersive Translation"}
                subLabel={"Display both original and translation"}
                leading={<FormRow.Icon source={getAssetIDByName("ic_chat_bubble_filled_24px")} />}
                value={settings.immersive_enabled ?? true} // Default enabled
                onValueChange={(v) => {
                    settings.immersive_enabled = v
                }}
            />

            <FormRow
                label={"Translate to"}
                subLabel={settings.target_lang?.toLowerCase()}
                leading={<FormRow.Icon source={getAssetIDByName("ic_activity_24px")} />}
                trailing={() => <FormRow.Arrow />}
                onPress={() => navigation.push("VendettaCustomPage", {
                    title: "Translate to",
                    render: TargetLang,
                })}
            />
            <FormRow
                label={"Translator"}
                subLabel={settings.translator ? "Google Translate" : "DeepL"}
                leading={<FormRow.Icon source={getAssetIDByName("ic_locale_24px")} />}
                trailing={() => <FormRow.Arrow />}
                onPress={() => navigation.push("VendettaCustomPage", {
                    title: "Translator",
                    render: TranslatorPage,
                })}
            />

            <Text style={styles.subheaderText} onPress={() => url.openURL("https://github.com/Rico040/bunny-plugins")}>
                {`Build: (${manifest.hash.substring(0, 7)})`}
            </Text>
        </ScrollView>
    )
}