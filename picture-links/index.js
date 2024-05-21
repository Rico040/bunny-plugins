(function(y,d,s,m){"use strict";const{Pressable:f}=d.findByProps("Button","Text","View"),B=d.findByName("ProfileBanner",!1),I=d.findByName("HeaderAvatar",!1),{openMediaModal:E}=d.findByProps("openMediaModal"),{hideActionSheet:P}=d.findByProps("hideActionSheet"),{getChannelId:S}=d.findByStoreName("SelectedChannelStore"),{getGuildId:R}=d.findByStoreName("SelectedGuildStore");function b(r){return new Promise(function(t,e){m.ReactNative.Image.getSize(r,function(i,n){return t({width:i,height:n})},function(i){return e(i)})})}async function c(r,t){const{width:e,height:i}=await b(r);P(),E({initialSources:[{uri:r,sourceURI:r,width:e,height:i,guildId:R(),channelId:S()}],initialIndex:0,originLayout:{width:0,height:0,x:t.pageX,y:t.pageY,resizeMode:"fill"}})}const w=s.after("default",I,function(r,t){let[{user:e,style:i,guildId:n}]=r;var o,a;const l=((o=e.guildMemberAvatars)===null||o===void 0?void 0:o[n])&&`https://cdn.discordapp.com/guilds/${n}/users/${e.id}/avatars/${e.guildMemberAvatars[n]}.png?size=4096`,u=e==null||(a=e.getAvatarURL)===null||a===void 0?void 0:a.call(e,!1,4096,!0);if(!u)return t;const v=typeof u=="number"?`https://cdn.discordapp.com/embed/avatars/${Number(BigInt(e.id)>>22n)%6}.png`:u?.replace(".webp",".png");return delete t.props.style,React.createElement(f,{onPress:function(g){let{nativeEvent:h}=g;return c(v,h)},onLongPress:function(g){let{nativeEvent:h}=g;return l&&c(l,h)},style:i},t)}),z=s.after("default",B,function(r,t){let[{bannerSource:e}]=r;if(typeof e?.uri!="string"||!t)return t;const i=e.uri.replace(/(?:\?size=\d{3,4})?$/,"?size=4096").replace(".webp",".png");return React.createElement(f,{onPress:function(n){let{nativeEvent:o}=n;return c(i,o)}},t)});var p;if(typeof d.findByName("GuildIcon").prototype.render<"u"){const r=d.findByName("GuildIcon");p=s.after("render",r.prototype,function(t,e){var i,n,o,a;if(((i=this.props)===null||i===void 0?void 0:i.size)!=="XLARGE")return;const l=(a=this.props)===null||a===void 0||(o=a.guild)===null||o===void 0||(n=o.getIconURL)===null||n===void 0?void 0:n.call(o,4096);return l?React.createElement(f,{onPress:function(u){let{nativeEvent:v}=u;return c(l,v)}},e):e})}else{const r=d.findByName("GuildIcon",!1);p=s.after("default",r,function(t,e){let[{size:i,guild:n}]=t;if(i!=="XLARGE"||n?.icon==null)return;var o="png";n?.icon.includes("a_")&&(o="gif");const a=`https://cdn.discordapp.com/icons/${n?.id}/${n?.icon}.${o}?size=4096`;return React.createElement(f,{onPress:function(l){let{nativeEvent:u}=l;return c(a,u)}},e)})}function A(){w(),z(),p()}return y.onUnload=A,y})({},vendetta.metro,vendetta.patcher,vendetta.metro.common);
