(function(t,a,i,e,s){"use strict";var n={};e.storage.firstTime??=!0;var d,o,v={onLoad:()=>{e.storage.firstTime==!0?(s.stopPlugin(e.id),e.storage.firstTime=!1):(d=i.before("render",a.ReactNative.Text,([r])=>{r.style=n}),o=i.before("render",a.ReactNative.View,([r])=>{r.style=n}))},onUnload:()=>{d(),o()}};return t.default=v,Object.defineProperty(t,"__esModule",{value:!0}),t})({},vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.plugins);
