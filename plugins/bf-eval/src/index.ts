import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { Brainfuck } from "./brainfuck";

const { sendBotMessage } = findByProps("sendBotMessage");

let command;
export default {
    onLoad: () => {
        command = registerCommand({
        name: "bfeval",
        displayName: "bfeval",
        displayDescription: "Evaluate brainfuck code.",
        description: "Evaluate brainfuck code.",
            options: [
                {
                    name: "code",
                    description: "Code to evaluate.",
                    type: 3,
                    required: true,
                    displayName: "code",
                    displayDescription: "Code to evaluate.",
                },
                {
                    name: "ephemeral",
                    displayName: "ephemeral",
                    description: "Make outputs only be seen by you (default: true)",
                    displayDescription: "Make outputs only be seen by you (default: true)",
                    type: 5,
                    required: false,
                }
            ],
    execute: pcommand,
     // @ts-ignore
    applicationId: "-1",
    inputType: 1,
    type: 1,
        });
    },

    onUnload: () => {
        command();
    },
};

async function pcommand(args, ctx) {
    const options = new Map(args.map((option) => [option.name, option]));
    const program = options.get("code").value;
    const bf = new Brainfuck(program);
    let out = "";

    bf.on("out", o => out += o);
    // bf.on("done", () => console.log(out));
    bf.init();
    if (options.get("ephemeral")?.value === false) {
        return { content: out };
    } else {
        sendBotMessage(ctx.channel.id, out);
    }
}
