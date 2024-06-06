import { showToast } from "@vendetta/ui/toasts"
import { before } from '@vendetta/patcher';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { findByProps } from "@vendetta/metro";

const LazyActionSheet = findByProps("openLazy", "hideActionSheet");

function SheetOutput(text) {
   console.log("[ActionSheetFinder] Found ActionSheet: " + text); 
   showToast("[ActionSheetFinder] Found ActionSheet: " + text, getAssetIDByName("Check"))
}

const unpatchOpenLazy = before("openLazy", LazyActionSheet, ([_, key]) => {
   // console.log(this)
   return SheetOutput(key);
});

export default {
   onLoad: () => {
        console.log("[ActionSheetFinder] Hello world!")
   },
   onUnload: () => {unpatchOpenLazy()}
};