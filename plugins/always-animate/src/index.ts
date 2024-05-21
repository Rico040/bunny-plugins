import {before, after} from "@vendetta/patcher";
import {findByName, findByProps} from "@vendetta/metro";
import {findInReactTree} from "@vendetta/utils";

const Avatar = findByProps("getStatusSize");
const DisplayBanner = findByName("DisplayBanner", false);
const ImageResolver = findByProps("getAvatarDecorationURL", "default");
const RowManager = findByName("RowManager");

const patches: Function[] = [];

export const onLoad = () => {
    // Guild Icons
    if (typeof findByName("GuildIcon").prototype.render !== "undefined") {
        const GuildIcon = findByName("GuildIcon"); 
        patches.push(
            before("render", GuildIcon.prototype, function () {
                 this.props.animate = true;
            })
        );
    } else {
        const GuildIcon = findByName("GuildIcon", false);
        patches.push(
            before("default", GuildIcon, ([props]) => {
                 props.animate = true;
            })
        );
    }

    // Avatars (not used by chat)
    patches.push(
        before("type", Avatar.default, function ([props]) {
            props.animate = true;
        })
    );

    // Profile Banners (bypasses GIF playback option)
    patches.push(
        after("default", DisplayBanner, function (args, ret) {
            const ClickWrapperProps = findInReactTree(
                ret,
                (x) => x.accessibilityRole == "image" && x.onPress != null
            );
            const Banner = findInReactTree(
                ClickWrapperProps,
                (x) => x.type?.name == "ProfileBanner"
            );
            if (
                Banner &&
                Banner.key.endsWith("-false") &&
                Banner.props.bannerSource?.uri?.indexOf("/a_") > -1
            ) {
                ClickWrapperProps.onPress();
            }
        })
    );

    // Catch-all
    patches.push(
        before("getAvatarDecorationURL", ImageResolver, ([props]) => {
            props.canAnimate = true;
        })
    );
    patches.push(
        before("getUserAvatarURL", ImageResolver, (args) => {
            args[1] = true;
        })
    );
    patches.push(
        before("getGuildMemberAvatarURLSimple", ImageResolver, ([props]) => {
            props.canAnimate = true;
        })
    );

    // Chat (iOS only?)
    patches.push(
        after("generate", RowManager.prototype, ([row], ret) => {
            if (row.rowType !== 1) return;

            const {message} = ret;
            if (message.avatarURL?.indexOf("a_") > -1) {
                message.avatarURL = message.avatarURL.replace(".webp", ".gif");
            }
        })
    );
};

export const onUnload = () => {
    for (const unpatch of patches) {
        unpatch?.();
    }
};