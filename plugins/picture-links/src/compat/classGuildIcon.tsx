import { findByProps, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { openModal } from "../index";

const { Pressable } = findByProps("Button", "Text", "View");
const GuildIcon = findByName("GuildIcon");

export const unpatchGuildIcon = after("render", GuildIcon.prototype, function (_, res) {
  if (this.props?.size !== "XLARGE") return;
  const url = this.props?.guild?.getIconURL?.(4096);
  if (!url) return res;

  return (
    <Pressable onPress={({ nativeEvent }) => openModal(url, nativeEvent)}>
      {res}
    </Pressable>
  );
});