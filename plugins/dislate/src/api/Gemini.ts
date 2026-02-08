import { settings } from "..";

const BASE = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "gemini-2.5-flash";

export const Gemini = {
  async translate(text: string, targetLang: string) {
    const key = settings.gemini_key?.trim();
    if (!key) throw new Error("NO_GEMINI_KEY");

    const res = await fetch(
      `${BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `Translate to ${targetLang}. Output only translation.\n\n${text}` }
              ]
            }
          ],
          generationConfig: { temperature: 0.2 }
        })
      }
    );

    const json = await res.json();
    const out =
      json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("")?.trim();

    if (!out) throw new Error("NO_OUTPUT");
    return { text: out };
  }
};
