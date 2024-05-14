import { findByProps, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { openModal } from "../index";

const { Pressable } = findByProps("Button", "Text", "View");
const GuildIcon = findByName("GuildIcon");

export const unpatchGuildIcon = after("default", GuildIcon, ([{ size, guild }], res) => {
    if (size !== "XLARGE" || guild?.icon == null) return;
    var ext = "png"
    if (guild?.icon.includes('a_')) { ext = "gif"; }
    const url = `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${ext}?size=4096`

    return (
        <Pressable onPress={({ nativeEvent }) => openModal(url, nativeEvent)}>
            {res}
        </Pressable>
    );
});