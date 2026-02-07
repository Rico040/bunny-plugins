import { storage } from "@vendetta/plugin"
import patchActionSheet from "./patches/ActionSheet"  
import patchCommands from "./patches/Commands"
import Settings from "./settings"

export const settings: {
    source_lang?: string
    target_lang?: string
    translator?: number
    immersive_enabled?: boolean
    gemini_key?: string        // ✅ زيدنا هذا
} = storage

settings.target_lang ??= "en"
settings.translator ??= 1
settings.immersive_enabled ??= true
settings.gemini_key ??= ""    // ✅ وزيدنا هذا

let patches = []

export default {
    onLoad: () => patches = [
        patchActionSheet(),
        patchCommands()
    ],
    onUnload: () => { for (const unpatch of patches) unpatch() },
    settings: Settings
}
