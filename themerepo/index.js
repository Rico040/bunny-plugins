(function(r,o,t,s,l,e){"use strict";function n(){return s.useProxy(t.storage),React.createElement(e.General.ScrollView,{style:{flex:1}},React.createElement(e.Forms.FormSection,{title:"Settings"},React.createElement(e.Forms.FormSwitchRow,{label:"Automatically apply theme",subLabel:"Applys theme after installing it from browser",leading:React.createElement(e.Forms.FormIcon,{source:l.getAssetIDByName("ic_pencil_24px")}),value:t.storage.autoapply??!1,onValueChange:a=>{t.storage.autoapply=a},note:""}),React.createElement(e.Forms.FormRow,{label:"Custom repo URL",subLabel:"Fetches different repo beside plugin's repo itself",leading:React.createElement(e.Forms.FormIcon,{source:l.getAssetIDByName("ic_link")})}),React.createElement(e.Forms.FormInput,{title:"",keyboardType:"url",placeholder:"https://github.com/Rico040/ThemeRepo/raw/master/repo.json",value:t.storage.customrepourl,onChange:a=>t.storage.customrepourl=a,style:{marginTop:-25,marginHorizontal:12}})))}var c={onLoad:()=>{o.logger.log("Hello world!")},onUnload:()=>{o.logger.log("Goodbye, world.")},settings:n};return r.default=c,Object.defineProperty(r,"__esModule",{value:!0}),r})({},vendetta,vendetta.plugin,vendetta.storage,vendetta.ui.assets,vendetta.ui.components);
