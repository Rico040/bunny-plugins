import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const nitroInfo = findByProps("canUseEmojisEverywhere");

export default [
	instead("canUseEmojisEverywhere", nitroInfo, () => true),
	instead("canUseAnimatedEmojis", nitroInfo, () => true),
];
