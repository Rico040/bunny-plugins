import { showToast } from "@vendetta/ui/toasts"
import { before } from '@vendetta/patcher';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { findByProps } from "@vendetta/metro";

const LazyActionSheet = findByProps("openLazy", "hideActionSheet");
let unpatchOpenLazy: () => boolean;

function SheetOutput(text) {
   console.log("[ActionSheetFinder] Found ActionSheet: " + text); 
   showToast("[ActionSheetFinder] Found ActionSheet: " + text, getAssetIDByName("Check"))
}


export default {
   onLoad() {
        console.log("[ActionSheetFinder] Hello world!")
        unpatchOpenLazy = before('openLazy', LazyActionSheet, ([key]) => {
            console.log(this)
            return SheetOutput(key);
        });
   },
   onUnload: unpatchOpenLazy
};