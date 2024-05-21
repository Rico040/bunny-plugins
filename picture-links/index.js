(function(y,a,f,m){"use strict";const{Pressable:p}=a.findByProps("Button","Text","View"),B=a.findByName("ProfileBanner",!1),I=a.findByName("HeaderAvatar",!1),{openMediaModal:S}=a.findByProps("openMediaModal"),{hideActionSheet:E}=a.findByProps("hideActionSheet"),{getChannelId:P}=a.findByStoreName("SelectedChannelStore"),{getGuildId:b}=a.findByStoreName("SelectedGuildStore");function A(r){return new Promise(function(t,e){m.ReactNative.Image.getSize(r,function(i,n){return t({width:i,height:n})},function(i){return e(i)})})}async function c(r,t){const{width:e,height:i}=await A(r);E(),S({initialSources:[{uri:r,sourceURI:r,width:e,height:i,guildId:b(),channelId:P()}],initialIndex:0,originLayout:{width:0,height:0,x:t.pageX,y:t.pageY,resizeMode:"fill"}})}const R=f.after("default",I,function(r,t){let[{user:e,style:i,guildId:n}]=r;var o,d,l="png";e.guildMemberAvatars[n].includes("a_")&&(l="gif");const u=((o=e.guildMemberAvatars)===null||o===void 0?void 0:o[n])&&`https://cdn.discordapp.com/guilds/${n}/users/${e.id}/avatars/${e.guildMemberAvatars[n]}.${l}?size=4096`,s=e==null||(d=e.getAvatarURL)===null||d===void 0?void 0:d.call(e,!1,4096,!0);if(!s)return t;console.log("Guild Specific Avatar: ",u);const G=typeof s=="number"?`https://cdn.discordapp.com/embed/avatars/${Number(BigInt(e.id)>>22n)%6}.png`:s?.replace(".webp",".png");return delete t.props.style,React.createElement(p,{onPress:function(g){let{nativeEvent:h}=g;return c(G,h)},onLongPress:function(g){let{nativeEvent:h}=g;return u&&c(u,h)},style:i},t)}),w=f.after("default",B,function(r,t){let[{bannerSource:e}]=r;if(typeof e?.uri!="string"||!t)return t;const i=e.uri.replace(/(?:\?size=\d{3,4})?$/,"?size=4096").replace(".webp",".png");return React.createElement(p,{onPress:function(n){let{nativeEvent:o}=n;return c(i,o)}},t)});var v;if(typeof a.findByName("GuildIcon").prototype.render<"u"){const r=a.findByName("GuildIcon");v=f.after("render",r.prototype,function(t,e){var i,n,o,d;if(((i=this.props)===null||i===void 0?void 0:i.size)!=="XLARGE")return;const l=(d=this.props)===null||d===void 0||(o=d.guild)===null||o===void 0||(n=o.getIconURL)===null||n===void 0?void 0:n.call(o,4096);return l?React.createElement(p,{onPress:function(u){let{nativeEvent:s}=u;return c(l,s)}},e):e})}else{const r=a.findByName("GuildIcon",!1);v=f.after("default",r,function(t,e){let[{size:i,guild:n}]=t;if(i!=="XLARGE"||n?.icon==null)return;var o="png";n?.icon.includes("a_")&&(o="gif");const d=`https://cdn.discordapp.com/icons/${n?.id}/${n?.icon}.${o}?size=4096`;return React.createElement(p,{onPress:function(l){let{nativeEvent:u}=l;return c(d,u)}},e)})}function z(){R(),w(),v()}return y.onUnload=z,y})({},vendetta.metro,vendetta.patcher,vendetta.metro.common);
