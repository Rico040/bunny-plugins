(function(t,o,i,a,d){"use strict";const c=d.findByProps("openLazy","hideActionSheet");let n;function l(e){console.log("[ActionSheetFinder] Found ActionSheet: "+e),o.showToast("[ActionSheetFinder] Found ActionSheet: "+e,a.getAssetIDByName("Check"))}var r={onLoad(){var e=this;console.log("[ActionSheetFinder] Hello world!"),n=i.before("openLazy",c,function(s){let[u]=s;return console.log(e),l(u)})},onUnload:n};return t.default=r,Object.defineProperty(t,"__esModule",{value:!0}),t})({},vendetta.ui.toasts,vendetta.patcher,vendetta.ui.assets,vendetta.metro);