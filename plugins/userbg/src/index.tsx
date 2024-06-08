import { logger } from "@vendetta"
import { findByProps } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
import { safeFetch } from "@vendetta/utils"
import { showToast } from "@vendetta/ui/toasts"

import Settings from "./Settings"

interface userBGData {
    endpoint: string;
    bucket: string;
    prefix: string;
    users: Record<string, string>;
}

const getUserBannerURL = findByProps("default", "getUserBannerURL")

let data: userBGData
let unpatch: () => void

export const fetchData = async () => {
    try {
        data = await (await safeFetch("https://usrbg.is-hardly.online/users", { cache: "no-store" })).json()
        return data
    } catch (e) {
        logger.error("Failed to fetch userBG data", e)
    }
}

export const onLoad = async () => {
    await fetchData()
    if (!data) return showToast("Failed to load DB")
    const { endpoint, bucket, prefix, users } = data;
    unpatch = after("getUserBannerURL", getUserBannerURL, ([user]) => {
        const customBanner = Object.entries(users).find(([userId, etag]) => userId === user?.id)
        if (user?.banner === undefined && customBanner) {
            const [userId, etag] = customBanner;
            return `${endpoint}/${bucket}/${prefix}${userId}?${etag}`
        }
    })
}

export const onUnload = () => unpatch?.()

export const settings = Settings