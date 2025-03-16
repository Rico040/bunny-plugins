(function(l,h,i,v,a,o,r,m){"use strict";var p=i.findByStoreName("GuildStore"),u=i.findByStoreName("UserSettingsProtoStore"),S=i.findByProps("ActionSheet")?.ActionSheet??i.find(s=>s?.render?.name==="ActionSheet"),{hideActionSheet:d}=i.findByProps("hideActionSheet"),{downloadMediaAsset:A}=i.findByProps("downloadMediaAsset"),y=i.findByProps("favoriteSticker","unfavoriteSticker"),n={marginBottom:10},B=h.before("render",S,([s])=>{var f=v.findInReactTree(s,t=>Array.isArray(t?.children)),e=v.findInReactTree(s,t=>typeof t?.sticker=="object"&&t?.sticker?.hasOwnProperty("guild_id"))?.sticker,k=u.frecencyWithoutFetchingLatest?.favoriteStickers?.stickerIds;if(!(!f||!e)){var c=!!k?.find(t=>t===e.id),g=`https://discord.com/stickers/${e.id}.png`;f.children[1]=React.createElement(React.Fragment,null,Object.values(p.getGuilds()).find(t=>t.id===e.guild_id)&&React.createElement(a.Button,{text:c?"Remove from Favorites":"Add to Favorites",color:c?"red":"brand",style:n,size:"small",onPress:()=>(c?y.unfavoriteSticker(e.id):y.favoriteSticker(e.id),d(),o.showToast(c?"Removed from Favorites":"Added to Favorites",r.getAssetIDByName("Check")))}),React.createElement(a.Button,{text:"Copy ID to clipboard",color:"brand",size:"small",style:n,onPress:()=>(m.clipboard.setString(e.id),d(),o.showToast(`Copied ${e.name}'s ID to clipboard`,r.getAssetIDByName("ic_copy_message_link")))}),React.createElement(a.Button,{text:"Copy URL to clipboard",color:"brand",size:"small",style:n,onPress:()=>(m.clipboard.setString(g),d(),o.showToast(`Copied ${e.name}'s URL to clipboard`,r.getAssetIDByName("ic_copy_message_link")))}),React.createElement(a.Button,{text:"Save image",color:"brand",size:"small",style:n,onPress:()=>(A(g,0),d(),o.showToast(`Saved ${e.name}'s image`,r.getAssetIDByName("toast_image_saved")))}))}}),b=()=>B();return l.onUnload=b,l})({},vendetta.patcher,vendetta.metro,vendetta.utils,vendetta.ui.components,vendetta.ui.toasts,vendetta.ui.assets,vendetta.metro.common);
