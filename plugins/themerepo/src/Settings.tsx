import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets"
import { Forms, General } from "@vendetta/ui/components";

export default function Settings() {
    useProxy(storage);

    return (
        <General.ScrollView style={{ flex: 1 }}>
            <Forms.FormSection title="Settings">
                <Forms.FormSwitchRow
                    label="Automatically apply theme"
                    subLabel="Applys theme after installing it from browser"
                    leading={<Forms.FormIcon source={getAssetIDByName("ic_pencil_24px")} />}
                    value={storage.autoapply ?? false}
                    onValueChange={ (value: boolean) => {
                        storage.autoapply = value;
                    }}
                    note=""
                />
                <Forms.FormRow
                    label="Custom repo URL"
                    subLabel="Fetches different repo beside plugin's repo itself"
                    leading={<Forms.FormIcon source={getAssetIDByName("ic_link")} />}
                />
                <Forms.FormInput
                    title=""
                    keyboardType="url"
                    placeholder="https://github.com/Rico040/ThemeRepo/raw/master/repo.json"
                    value={storage.customrepourl}
                    onChange={( x: string ) => storage.customrepourl = x}
                    style={{ marginTop: -25, marginHorizontal: 12 }}
                />
            </Forms.FormSection>
        </General.ScrollView>
    );
}