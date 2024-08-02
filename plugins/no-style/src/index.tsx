import { ReactNative as RN } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";
import { id } from "@vendetta/plugin";
import { stopPlugin } from "@vendetta/plugins";
import { storage } from "@vendetta/plugin";

// unstyled
const unstyle = {};
storage.firstTime ??= true;

let unpatchText: () => boolean; 
let unpatchView: () => boolean;

export default {
    onLoad: () => {
        // don't start plugin immediately 
        if (storage.firstTime == true) {
            stopPlugin(id);
            storage.firstTime = false;
        } else {
            unpatchText = before("render", RN.Text, ([x]) => {    
                x.style = unstyle;
            })
            unpatchView = before("render", RN.View, ([x]) => {
                x.style = unstyle;
            })
        }
    },
    onUnload: () => {
        unpatchText();
        unpatchView();
    }
}