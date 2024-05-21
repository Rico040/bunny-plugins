import { findByName } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components";

const { FormRow } = Forms;
const RowCheckmark = findByName("RowCheckmark");

export function SelectableRow({ label, subLabel, selected, onPress }) {
    return <FormRow label={label} subLabel={subLabel} trailing={<RowCheckmark selected={selected} />} onPress={onPress} />
}
