import { ReactNative as RN } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets"
import { storage } from "@vendetta/plugin";

const { FormSection, FormRadioRow, FormSwitchRow } = Forms;

const sizeOptions = {
    Tiny: 16,
    Small: 32,
    Medium: 48,
    Big: 56,
    Large: 64,
    Huge: 96,
    Jumbo: 128,
}

const previewUri = "https://cdn.discordapp.com/emojis/926602689213767680.webp";

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Settings" titleStyleType="no_border">
                <FormSwitchRow
                    label="Force Freemoji"
                    subLabel="Explicitly force Freemoji even if you have nitro (useful for testing)"
                    leading={<Forms.FormIcon source={getAssetIDByName("img_nitro_emojis")} />}
                    value={storage.forceMoji}
                    onValueChange={ () => {storage.forceMoji = !storage.forceMoji;}}
                    note=""
                />
                <FormSwitchRow
                    label="Hyperlink emoji"
                    subLabel="Hyperlinks emoji link to be less distractive"
                    leading={<Forms.FormIcon source={getAssetIDByName("ic_link")} />}
                    value={storage.hyperlink}
                    onValueChange={ () => {storage.hyperlink = !storage.hyperlink;}}
                    note=""
                />
                <Forms.FormRow
                    label="Custom Hyperlink text"
                    leading={<Forms.FormIcon source={getAssetIDByName("ic_link")} />}
                />
                <Forms.FormInput
                    title=""
                    placeholder="Put text here. Leave empty to use emoji's name."
                    value={storage.customHyperLinkString}
                    onChange={( x: string ) => storage.customHyperLinkString = x}
                    style={{ marginTop: -25, marginHorizontal: 12 }}
                />
            </FormSection>
            <FormSection title="Emoji Size" >
                {Object.entries(sizeOptions).map(([name, size]) => <FormRadioRow
                    label={name}
                    subLabel={size}
                    selected={storage.emojiSize === size}
                    onPress={() => {
                        storage.emojiSize = size;
                    }}
                />)}
            </FormSection>
            <FormSection title="Preview">
                <RN.Image
                    source={{ 
                        uri: `${previewUri}?size=${storage.emojiSize}`,
                        width: storage.emojiSize,
                        height: storage.emojiSize 
                    }}
                />
            </FormSection>
        </RN.ScrollView>
    )
}
