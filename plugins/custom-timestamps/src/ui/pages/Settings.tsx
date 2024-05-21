import { moment } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";
import renderTimestamp from "../../lib/renderTimestamp";
import { CustomTimeInputRow } from "../components/CustomTimeInputRow";
import { SelectableRow } from "../components/SelectableRow";

const { ScrollView } = General;
const { FormSection, FormDivider, FormSwitchRow } = Forms;

export interface Mode {
    label: string;
    key: "calendar" | "relative" | "custom" | "iso";
    renderExtra?: (selected: boolean) => JSX.Element;
}

let modes: Mode[] = [
    {
        label: "Calendar",
        key: "calendar"
    },
    {
        label: "Relative",
        key: "relative"
    },
    {
        label: "ISO 8601",
        key: "iso"
    },
    {
        label: "Custom",
        key: "custom",
        renderExtra: (selected) => <CustomTimeInputRow value={storage.customFormat} onChangeText={(t) => storage.customFormat = t} placeholder="dddd, MMMM Do YYYY, h:mm:ss a" disabled={!selected} />
    }
]

export default function Settings() {
    useProxy(storage)

    return <ScrollView>
        <FormSection title="Mode">
            {modes.map(({ label, key, renderExtra }, i) => <>
                <SelectableRow label={label} subLabel={renderTimestamp(moment(), key)} selected={storage.selected === key} onPress={() => storage.selected = key} />
                {renderExtra && renderExtra(storage.selected === key)}
                {i !== modes.length - 1 && <FormDivider />}
            </>
            )}
        </FormSection>
        <FormSection>
            <FormSwitchRow
                label="Separate messages"
                subLabel="Always shows username, avatar and timestamp for each message"
                value={storage.separateMessages}
                onValueChange={(v: boolean) => {
                    storage.separateMessages = v;
                }}
            />
        </FormSection>
    </ScrollView>
}
