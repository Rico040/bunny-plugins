import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { settings } from "../index"; // استيراد الإعدادات

const ActionSheet = findByProps("openLazy", "hideActionSheet");

// دالة الترجمة باستخدام Gemini
async function translateWithGemini(text: string, targetLang: string, apiKey: string): Promise<string> {
    if (!apiKey) return "⚠️ Error: Please set your Gemini API Key in settings.";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Translate the following text to ${targetLang} only, without explanations: ${text}` }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Translation Failed";
    } catch (e) {
        console.error(e);
        return "❌ Network Error";
    }
}

export default function patchActionSheet() {
    return after("openLazy", ActionSheet, ([component, args, actionMessage]) => {
        const message = args?.message || actionMessage;
        if (!message || !message.content) return;

        component.then(instance => {
            const buttons = instance.props?.buttons;
            if (!buttons) return;

            // زر الترجمة
            const translateButton = {
                label: "Translate with Gemini",
                icon: getAssetIDByName("ic_google_translate"),
                onPress: async () => {
                    showToast("Translating...", getAssetIDByName("ic_sync"));
                    
                    const translatedText = await translateWithGemini(
                        message.content, 
                        settings.target_lang || "ar", 
                        settings.gemini_key
                    );

                    showToast(translatedText, getAssetIDByName("Check"));
                }
            };

            buttons.unshift(translateButton);
        });
    });
}
