import { ReactNative as RN } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";


const unpatchText = before("render", RN.Text, ([x]) => {
    x.style = {
        textTransform: 'lowercase'
    };
    const style = RN.StyleSheet.flatten(x.style) ?? {};
    console.log(x.style)
})


export function onUnload() {
    unpatchText()
}