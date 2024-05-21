import { findByProps } from "@vendetta/metro";

const { ClearButtonVisibility, default: InputView } = findByProps("ClearButtonVisibility");

export function CustomTimeInputRow({ value, onChangeText, placeholder, disabled }) {
    return <InputView
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        clearButtonVisibility={ClearButtonVisibility.WITH_CONTENT}
        showBorder={false}
        showTopContainer={false}
        disabled={disabled}
        style={{ paddingHorizontal: 15, paddingVertical: 13 }}
    />
}
