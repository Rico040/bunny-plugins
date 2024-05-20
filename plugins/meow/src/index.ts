import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { Message } from "./def";

const messageModule = findByProps("sendMessage", "receiveMessage");
const uploadModule = findByProps("uploadLocalFiles");
const hasEmotesRegex = /<a?:(\w+):(\d+)>/i;

const catSounds = ['meow', 'nya', 'mrrp', 'mrow', '🐱']

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modify(msg: Message) {
    var newContent = msg.content
    if (getRandomInt(1,4) === 1 || msg.content.match(hasEmotesRegex)) {
        newContent = msg.content.replaceAll(/<a?:(\w+):(\d+)>/gi, '🐱');
    }
    if (getRandomInt(1,8) === 1) {
        let words = newContent.split(" "); 
        let randomIndex = Math.floor(Math.random() * words.length); 
        words[randomIndex] = '🐱'; 
        newContent = words.join(" ");
    }
    if (getRandomInt(1,4) === 1) {
        let words = newContent.split(" ")
        let randomIndex = Math.floor(Math.random() * words.length);
        words.splice(randomIndex, 0, catSounds[Math.floor(Math.random() * catSounds.length)])
        if (getRandomInt(1,3) === 1) words[randomIndex] += '~'
        newContent = words.join(" ")
        if (getRandomInt(1,2) === 1) newContent += '~'
    }

	msg.content = newContent;

	msg.invalidEmojis = [];
};

const unpatchMeowing = before("sendMessage", messageModule, (args) => modify(args[1]));
const unpatchMeowing2 = before("uploadLocalFiles", uploadModule, (args) => modify(args[0].parsedMessage));

export function onUnload() {
    unpatchMeowing()
    unpatchMeowing2
}
