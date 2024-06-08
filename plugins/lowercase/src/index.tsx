import { ReactNative as RN } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";


const unpatchText = before("render", RN.Text, ([x]) => {
    const existingStyle = RN.StyleSheet.flatten(x.style) ?? {};
    const newStyle = {
        ...existingStyle,
        textTransform: 'lowercase'
    };
    x.style = newStyle;
})


export function onUnload() {
    unpatchText();
}