import { findByProps } from "@vendetta/metro";
import { instead } from "../vpatcher";

const nitroInfo = findByProps("canUseEmojisEverywhere");

export default [
	instead("canUseEmojisEverywhere", nitroInfo, () => true),
	instead("canUseAnimatedEmojis", nitroInfo, () => true),
];