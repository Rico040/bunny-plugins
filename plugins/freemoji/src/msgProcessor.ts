import { findByStoreName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { Message } from "./def";
const { getCustomEmojiById } = findByStoreName("EmojiStore");
const { getGuildId } = findByStoreName("SelectedGuildStore");

// https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
const hasEmotesRegex = /<a?:(\w+):(\d+)>/i;

function extractUnusableEmojis(messageString: string, size: number) {
	const emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/gi);

	for (const emojiString of emojiStrings) {
		// Fetch required info about the emoji
		const emoji = getCustomEmojiById(emojiString[2]);

		// Check emoji usability
		if (
			emoji.guildId != getGuildId() ||
			emoji.animated
		) {
			// Add to emotes to send
			// Hacky fix, someone on discord removed url property for emoji
			// I dunno if webp works everywhere
			const ext = "webp";
			let baseUrl = `https://cdn.discordapp.com/emojis/${emojiString[2]}.${ext}?size=${size}&quality=lossless&name=${emojiString[1]}`;
			if (emoji.animated) {
    			baseUrl += "&animated=true";
			}

			const replacement = storage.hyperlink
  				? `[${emojiString[1]}](${baseUrl})`
  				: baseUrl;

			messageString = messageString.replace(emojiString[0], replacement);
		}
	}
	
	return { 
        newContent: messageString.trim()
    };
}

export default function modifyIfNeeded(msg: Message) {
	if (!msg.content.match(hasEmotesRegex)) return;
	if (!storage.forceMoji) { if (storage.haveNitro) return; }

	// Find all emojis from the captured message string and return object with ~~emojiURLS and~~ content
	const { newContent } = extractUnusableEmojis(msg.content, storage.emojiSize);

	msg.content = newContent;

	// if (extractedEmojis.length > 0) {
	// 	if (storage.hyperlink === true) { 
	// 		msg.content += " " + extractedEmojis.join(" "); 
	// 	} else { 
	// 		msg.content += "\n" + extractedEmojis.join("\n"); 
	// 	}
	// }

	// Set invalidEmojis to empty to prevent Discord yelling to you about you not having nitro
	msg.invalidEmojis = [];
};
