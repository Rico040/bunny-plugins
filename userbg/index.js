(function(l,p,w,b,E,g,n,f,D){"use strict";function m(e,a,d,s,c,i,t){try{var o=e[i](t),r=o.value}catch(B){d(B);return}o.done?a(r):Promise.resolve(r).then(s,c)}function h(e){return function(){var a=this,d=arguments;return new Promise(function(s,c){var i=e.apply(a,d);function t(r){m(i,s,c,t,o,"next",r)}function o(r){m(i,s,c,t,o,"throw",r)}t(void 0)})}}var{ScrollView:F}=D.General,{FormSection:U,FormRow:u}=D.Forms,_=()=>n.React.createElement(F,null,n.React.createElement(U,null,n.React.createElement(u,{label:"Discord Server",leading:n.React.createElement(u.Icon,{source:f.getAssetIDByName("Discord")}),trailing:u.Arrow,onPress:()=>n.url.openDeeplink("https://discord.gg/TeRQEPb")}),n.React.createElement(u,{label:"Reload DB",leading:n.React.createElement(u.Icon,{source:f.getAssetIDByName("ic_message_retry")}),onPress:h(function*(){var e=yield y();return e?g.showToast("Reloaded DB",f.getAssetIDByName("check")):g.showToast("Failed to reload DB",f.getAssetIDByName("small"))})}))),I=w.findByProps("default","getUserBannerURL"),v,R,y=function(){var e=h(function*(){try{return v=yield(yield E.safeFetch("https://usrbg.is-hardly.online/users",{cache:"no-store"})).json(),v}catch(a){p.logger.error("Failed to fetch userBG data",a)}});return function(){return e.apply(this,arguments)}}(),P=function(){var e=h(function*(){if(yield y(),!v)return g.showToast("Failed to load DB");var{endpoint:a,bucket:d,prefix:s,users:c}=v;R=b.after("getUserBannerURL",I,([i])=>{var t=Object.entries(c).find(([B,L])=>B===i?.id);if(i?.banner===void 0&&t){var[o,r]=t;return`${a}/${d}/${s}${o}?${r}`}})});return function(){return e.apply(this,arguments)}}(),A=()=>R?.(),$=_;return l.fetchData=y,l.onLoad=P,l.onUnload=A,l.settings=$,l})({},vendetta,vendetta.metro,vendetta.patcher,vendetta.utils,vendetta.ui.toasts,vendetta.metro.common,vendetta.ui.assets,vendetta.ui.components);
