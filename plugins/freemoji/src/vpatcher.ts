// https://github.com/Vendicated/its-called-vendetta-cause-its-owned-by-ven-plugins/blob/main/shared/vendetta-wrappers.ts
import { after as vAfter, before as vBefore, instead as vInstead } from "@vendetta/patcher";

export const unpatches = [] as Array<() => boolean>;

function wrapCb<F extends Function>(type: string, name: string, cb: F): F {
    return function () {
        try {
            return cb.apply(this, arguments);
        } catch (err) {
            console.error(`Error while running ${type} callback for ${name}:`, err);
        }
    } as any as F;
}

export const before: (...args: Parameters<typeof vBefore>) => void = (name, obj, cb, once) => {
    unpatches.push(vBefore(name, obj, wrapCb("before", name, cb), once));
};

export const after: (...args: Parameters<typeof vAfter>) => void = (name, obj, cb, once) => {
    unpatches.push(vAfter(name, obj, wrapCb("after", name, cb), once));
};

export const instead: (...args: Parameters<typeof vInstead>) => void = (name, obj, cb, once) => {
    unpatches.push(vInstead(name, obj, wrapCb("instead", name, cb), once));
};

export const unpatchAll = () => unpatches.forEach(u => u());