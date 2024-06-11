import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets"
import { Forms, General } from "@vendetta/ui/components";
import { settings } from ".";

export default function Settings() {
    useProxy(storage);

    return (
        <General.ScrollView style={{ flex: 1 }}>
            <Forms.FormSection title="Settings">
                <Forms.FormRow
                    label="Sound URL"
                    leading={<Forms.FormIcon source={getAssetIDByName("ic_link")} />}
                />
                <Forms.FormInput
                    title=""
                    keyboardType="url"
                    placeholder="https://link.to/sound.mp3"
                    value={settings.customUrl}
                    onChange={( x: string ) => settings.customUrl = x}
                    style={{ marginTop: -25, marginHorizontal: 12 }}
                />
            </Forms.FormSection>
        </General.ScrollView>
    );
}