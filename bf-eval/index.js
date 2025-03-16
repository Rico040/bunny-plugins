(function(u,d,y){"use strict";function c(a,e,i,t,n,s,r){try{var h=a[s](r),o=h.value}catch(C){i(C);return}h.done?e(o):Promise.resolve(o).then(t,n)}function v(a){return function(){var e=this,i=arguments;return new Promise(function(t,n){var s=a.apply(e,i);function r(o){c(s,t,n,r,h,"next",o)}function h(o){c(s,t,n,r,h,"throw",o)}r(void 0)})}}function m(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function f(a,e){for(var i=0;i<e.length;i++){var t=e[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(a,t.key,t)}}function b(a,e,i){return e&&f(a.prototype,e),i&&f(a,i),a}var k=function(){function a(e,i="",t=3e4){if(m(this,a),!e)throw new Error("No program to interpret.");this.program=e,this.input=i,this.size=t,this.array=new Array(t).fill(0),this.p=0,this.i=0,this.done=!1,this.events={},this.loops={},this.mod=(n,s)=>(s+=1,(n%s+s)%s)}return b(a,[{key:"on",value:function(e,i){this.events[e]||(this.events[e]=[]),this.events[e].push(i)}},{key:"emit",value:function(e,...i){if(this.events[e])for(var t in this.events[e])this.events[e][t](...i)}},{key:"step",value:function(){var e=this.program,i=!1;if(this.done||e[this.i]===void 0){this.done||this.emit("done"),this.done=!0;return}switch(e[this.i]){case">":this.p++,this.p=this.mod(this.p,this.size);break;case"<":this.p--,this.p=this.mod(this.p,this.size);break;case"+":this.array[this.p]=this.array[this.p]+1&255;break;case"-":this.array[this.p]=this.array[this.p]-1&255;break;case".":if(!String.fromCharCode(this.array[this.p]))break;this.emit("out",String.fromCharCode(this.array[this.p]));break;case",":if(this.emit("in"),this.input[this.char]===void 0){this.array[this.p]=0;break}this.array[this.p]=this.input[this.char++].charCodeAt(0);break;case"[":for(var t=this.i,n=0;;){if(t++,!e[t])throw new Error("Out of bounds.");if(e[t]==="["&&n++,this.program[t]==="]")if(n===0){this.array[this.p]===0?this.i=t:this.loops[t]=this.i;break}else n--}break;case"]":this.array[this.p]!==0?this.i=this.loops[this.i]:this.loops[this.i];break;default:i=!0}i||this.emit("tick"),this.i++}},{key:"init",value:function(e=1e3){var i=()=>{for(var t=0;t<e;t++)this.step();this.done||requestAnimationFrame(i)};i()}}]),a}(),{sendBotMessage:g}=y.findByProps("sendBotMessage"),l,w={onLoad:()=>{l=d.registerCommand({name:"bfeval",displayName:"bfeval",displayDescription:"Evaluate brainfuck code.",description:"Evaluate brainfuck code.",options:[{name:"code",description:"Code to evaluate.",type:3,required:!0,displayName:"code",displayDescription:"Code to evaluate."},{name:"ephemeral",displayName:"ephemeral",description:"Make outputs only be seen by you (default: true)",displayDescription:"Make outputs only be seen by you (default: true)",type:5,required:!1}],execute:_,applicationId:"-1",inputType:1,type:1})},onUnload:()=>{l()}};function _(a,e){return p.apply(this,arguments)}function p(){return p=v(function*(a,e){var i=new Map(a.map(r=>[r.name,r])),t=i.get("code").value,n=new k(t),s="";if(n.on("out",r=>s+=r),n.init(),i.get("ephemeral")?.value===!1)return{content:s};g(e.channel.id,s)}),p.apply(this,arguments)}return u.default=w,Object.defineProperty(u,"__esModule",{value:!0}),u})({},vendetta.commands,vendetta.metro);
