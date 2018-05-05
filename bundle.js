!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=10)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,i){this.width=t,this.height=e,this.pos=i}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.canvas=t,this.pos={x:0,y:0},this.lastClicked={x:0,y:0},this.down=!1,window.addEventListener("mousedown",this.mousedown.bind(this)),window.addEventListener("mouseup",this.mouseup.bind(this)),window.addEventListener("mousemove",this.mousemove.bind(this))}getMousePos(t){const e=this.canvas.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}mousedown(t){this.down=!0,this.lastClicked=this.getMousePos(t),this.onClick&&this.onClick()}mouseup(t){this.down=!1,this.onRelease&&this.onRelease()}mousemove(t){this.pos=this.getMousePos(t)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0);e.default=class extends s.default{constructor(){super(...arguments),this.angle=0,this.intensity=500}update(t,e){const i=e.pos.x-this.pos.x,s=e.pos.y-this.pos.y,n=Math.atan2(s,i);this.angle=-(.5*Math.PI-n)}draw(t){const e=this.pos.y+this.intensity,i=t.createLinearGradient(this.pos.x,e,this.pos.x,e+this.height);i.addColorStop(0,"rgba(142,214,255, 0.7)"),i.addColorStop(1,"rgba(0, 0, 0, 0)"),this.drawTriangle(t,this.pos.x,e,this.width,this.height,i)}drawTriangle(t,e,i,s,n,o){t.save(),t.beginPath(),t.arc(this.pos.x,this.pos.y,1,0,2*Math.PI),t.strokeStyle="#ff0000",t.stroke(),t.closePath(),t.restore(),t.save(),t.translate(this.pos.x,this.pos.y),t.rotate(this.angle),t.translate(-this.pos.x,-this.pos.y),t.beginPath(),t.moveTo(this.pos.x,this.pos.y),t.lineTo(e+s/2,i+n),t.lineTo(e-s/2,i+n),t.closePath(),t.fillStyle=o,t.fill(),t.restore()}}},function(t,e){function i(t){if(t&&"object"==typeof t){var e=t.which||t.keyCode||t.charCode;e&&(t=e)}if("number"==typeof t)return r[t];var i,o=String(t);return(i=s[o.toLowerCase()])?i:(i=n[o.toLowerCase()])||(1===o.length?o.charCodeAt(0):void 0)}i.isEventKey=function(t,e){if(t&&"object"==typeof t){var i=t.which||t.keyCode||t.charCode;if(null===i||void 0===i)return!1;if("string"==typeof e){var o;if(o=s[e.toLowerCase()])return o===i;if(o=n[e.toLowerCase()])return o===i}else if("number"==typeof e)return e===i;return!1}};var s=(e=t.exports=i).code=e.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},n=e.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};
/*!
 * Programatically add the following
 */
for(o=97;o<123;o++)s[String.fromCharCode(o)]=o-32;for(var o=48;o<58;o++)s[o-48]=o;for(o=1;o<13;o++)s["f"+o]=o+111;for(o=0;o<10;o++)s["numpad "+o]=o+96;var r=e.names=e.title={};for(o in s)r[s[o]]=o;for(var a in n)s[a]=n[a]},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(3),n={};window.addEventListener("keydown",t=>{n[s(event)]=!0}),window.addEventListener("keyup",t=>{n[s(event)]=!1}),e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0),n=i(4),o=i(2);e.default=class extends s.default{constructor(t,e){super(0,0,e),this.light=new o.default(380,500,{x:0,y:0}),this.targetY=10,this.buoyancy=.2,this.balast=.5,this.img=new Image,this.img.src="./assets/player.svg",this.img.onload=(()=>{const e=this.img.width*t,i=this.img.height*t;this.width=e,this.height=i})}update(t,e,i){n.default.space&&this.pos.y+this.height<e&&(this.pos.y+=this.balast*t),this.pos.y>this.targetY&&(this.pos.y-=this.buoyancy*t),this.light.pos.x=this.pos.x+(this.width-25),this.light.pos.y=this.pos.y+(this.height/2+20),this.light.update(t,i)}draw(t){this.light.draw(t),t.save(),t.fillStyle="#595d63",t.strokeStyle="#595d63",t.lineWidth=3,t.beginPath(),t.drawImage(this.img,this.pos.x,this.pos.y,this.width,this.height),t.stroke(),t.fill(),t.closePath(),t.restore()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0);var n;!function(t){t[t.Shark=0]="Shark",t[t.BigFish=1]="BigFish"}(n=e.EnemyType||(e.EnemyType={}));e.default=class extends s.default{constructor(t,e){let i=0,s=0;switch(e){case n.Shark:i=200,s=30;break;case n.BigFish:i=200,s=200}super(i,s,t)}update(t){}draw(t){t.save(),t.fillStyle="#ffa500",t.beginPath(),t.rect(this.pos.x,this.pos.y,this.width,this.height),t.stroke(),t.fill(),t.restore()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0);e.default=class extends s.default{constructor(t,e,i){super(t,e,i),this.indicatorLineEnd={x:135,y:135},this.indicatorAngle=285}update(t,e){let i=this.indicatorAngle+.03;this.indicatorAngle=i,this.indicatorLineEnd.x=this.pos.x+Math.cos(i)*this.width*.45,this.indicatorLineEnd.y=this.pos.y+Math.sin(i)*this.width*.45,this.bleeps=e.map(t=>t.pos)}draw(t){t.save(),t.fillStyle="rgba(0, 0, 0, 0.6)",t.strokeStyle="#5fc345",t.lineWidth=3,t.beginPath(),t.arc(this.pos.x,this.pos.y,.45*this.width,0,2*Math.PI),t.stroke(),t.fill(),t.beginPath(),t.arc(this.pos.x,this.pos.y,.35*this.width,0,2*Math.PI),t.stroke(),t.beginPath(),t.arc(this.pos.x,this.pos.y,.25*this.width,0,2*Math.PI),t.stroke(),t.beginPath(),t.arc(this.pos.x,this.pos.y,.15*this.width,0,2*Math.PI),t.stroke(),t.beginPath(),t.arc(this.pos.x,this.pos.y,.05*this.width,0,2*Math.PI),t.stroke(),t.beginPath(),t.moveTo(this.pos.x,this.pos.y),t.lineTo(this.indicatorLineEnd.x,this.indicatorLineEnd.y),t.stroke(),this.bleeps&&this.bleeps.forEach(e=>{t.fillStyle="#5fc345",t.beginPath(),t.arc(e.x,e.y,.005*this.width,0,2*Math.PI),t.fill()}),t.restore()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(7),n=i(6),o=i(5),r=i(1),a=document.getElementById("canvas"),h=a.getContext("2d"),d=new o.default(.11,{x:400,y:10}),u=new s.default(300,300,{x:200,y:300}),c=new r.default(a),l=[new n.default({x:300,y:200},n.EnemyType.Shark),new n.default({x:10,y:10},n.EnemyType.BigFish)];function p(){a.width=window.innerWidth,a.height=window.innerHeight,u&&(u.pos.x=window.innerWidth-150,u.pos.y=window.innerHeight-150)}window.addEventListener("resize",p,!1),e.update=function(t){u.update(t,l),d.update(t,a.height,c),l.forEach(e=>{e.update(t)})},e.draw=function(t){h.clearRect(0,0,a.width,a.height),d.draw(h),u.draw(h),l.forEach(t=>{t.draw(h)})},p()},function(t,e,i){var s,n;
/**
 * mainloop.js 1.0.3-20170529
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */!function(o){function r(t){if(a=P(r),!(t<u+g)){for(d+=t-u,u=t,E(t,d),t>f+p&&(c=l*w*1e3/(t-f)+(1-l)*c,f=t,w=0),w++,y=0;d>=h;)if(L(h),d-=h,++y>=240){b=!0;break}S(d/h),_(c,b),b=!1}}var a,h=1e3/60,d=0,u=0,c=60,l=.9,p=1e3,f=0,w=0,y=0,g=0,m=!1,v=!1,b=!1,x="object"==typeof window?window:o,P=x.requestAnimationFrame||function(){var t,e,i=Date.now();return function(s){return t=Date.now(),e=Math.max(0,h-(t-i)),i=t+e,setTimeout(function(){s(t+e)},e)}}(),k=x.cancelAnimationFrame||clearTimeout,M=function(){},E=M,L=M,S=M,_=M;o.MainLoop={getSimulationTimestep:function(){return h},setSimulationTimestep:function(t){return h=t,this},getFPS:function(){return c},getMaxAllowedFPS:function(){return 1e3/g},setMaxAllowedFPS:function(t){return void 0===t&&(t=1/0),0===t?this.stop():g=1e3/t,this},resetFrameDelta:function(){var t=d;return d=0,t},setBegin:function(t){return E=t||E,this},setUpdate:function(t){return L=t||L,this},setDraw:function(t){return S=t||S,this},setEnd:function(t){return _=t||_,this},start:function(){return v||(v=!0,a=P(function(t){S(1),m=!0,u=t,f=t,w=0,a=P(r)})),this},stop:function(){return m=!1,v=!1,k(a),this},isRunning:function(){return m}},s=o.MainLoop,void 0===(n="function"==typeof s?s.call(e,i,e,t):s)||(t.exports=n)}(this)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(9),n=i(8),o=s;function r(){n.draw(o.getFPS())}window.addEventListener("focus",()=>{o.start()}),window.addEventListener("blur",()=>{o.stop()}),document.addEventListener("DOMContentLoaded",()=>{o.setUpdate(n.update).setDraw(r).start()})}]);
//# sourceMappingURL=bundle.js.map