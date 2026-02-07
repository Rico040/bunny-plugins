import { getAssetIDByName } from "@vendetta/ui/assets";
import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { useProxy } from "@vendetta/storage";
import { settings } from "..";

const { FormRow } = Forms;
const { ScrollView } = ReactNative;

export default () => {
  useProxy(settings);

  return (
    <ScrollView style={{ flex: 1 }}>
      <FormRow
        label="DeepL"
        trailing={() => <FormRow.Arrow />}
        onPress={() => {
          if (settings.translator == 0) return;
          settings.translator = 0;
          showToast(`Saved Translator to DeepL`, getAssetIDByName("check"));
        }}
      />

      <FormRow
        label="Google Translate"
        trailing={() => <FormRow.Arrow />}
        onPress={() => {
          if (settings.translator == 1) return;
          settings.translator = 1;
          showToast(
            `Saved Translator to Google Translate`,
            getAssetIDByName("check")
          );
        }}
      />

      {/* ✅ NEW: Gemini */}
      <FormRow
        label="Gemini (Google AI)"
        trailing={() => <FormRow.Arrow />}
        onPress={() => {
          if (settings.translator == 2) return;
          settings.translator = 2;
          showToast(`Saved Translator to Gemini`, getAssetIDByName("check"));
        }}
      />

      {/* ✅ NEW: Gemini API Key (each user sets their own) */}
      <FormRow
        label="Gemini API Key"
        subLabel={settings.gemini_key ? "Key set" : "Tap to set your API key"}
        trailing={() => <FormRow.Arrow />}
        onPress={() => {
          const key = prompt("Paste your Gemini API Key");
          if (!key) return;
          settings.gemini_key = key.trim();
          showToast("Gemini API Key saved", getAssetIDByName("check"));
        }}
      />
    </ScrollView>
  );
};
