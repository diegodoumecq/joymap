import"./modulepreload-polyfill-B5Qt9EMX.js";import{c as g,f as d}from"./JoyMap-y1N8a_BF.js";import{c as h}from"./query-OwjzrAPW.js";import"./_commonjsHelpers-Cpj98o6Y.js";const p=["→","↗","↑","↖","←","↙","↓","↘","→"],M=["dpadUp","dpadDown","dpadLeft","dpadRight"],v=["L3","L2","L1","R3","R2","R1","A","B","X","Y"],u=[],y=13,w=document.getElementById("app");w.innerHTML=`
  <div class="main-container" >
    <header>
      <h3>Display gamepad input like a fighting game's training mode</h3>
    </header>
    <div class="fighting-example">
      <div class="unplugged">
        <h3 style="color: white">Waiting for gamepad/s to be connected</h3>
      </div>
    </div>
  </div>
`;function m([r,e]){const t=Math.atan2(e*-1,r);return t<0?p[8+Math.round(t*4/Math.PI)]:p[Math.round(t*4/Math.PI)]}function L(r){let e=null;r.setMapper("dpad",({getButtons:t})=>{const s=t(...M),o=s.dpadLeft.pressed?-1:s.dpadRight.pressed?1:0,a=s.dpadUp.pressed?-1:s.dpadDown.pressed?1:0;if(o!==0||a!==0){const n=m([o,a]);return e===n?!1:(e=n,`D${n}`)}return e=null,!1})}function l(r,e){let t=null;r.setMapper(e,s=>{const{pressed:o,value:a}=s.getStick(e);if(o){const n=m(a);return t===n?!1:(t=n,e+n)}return t=null,!1})}function R(r,e){const t=[],s=h({padId:e});r.addModule(s),l(s,"L"),l(s,"R"),L(s);const o=document.createElement("section");o.className="module",o.innerHTML=`
        <div class="name">Gamepad: ${e}</div>
        <div class="inputs" id="${e}">Waiting for inputs...</div>`;const a=document.querySelector(".fighting-example");a.appendChild(o);const n=document.querySelector(".unplugged");return n&&a.removeChild(n),{id:e,module:s,history:t}}const c=g({onPoll(){const r=c.getUnusedPadIds();r.length>0&&d.forEach(e=>u.push(R(c,e)),r),d.forEach(e=>{const t=e.module.getButtons(...v),s=e.module.getAllMappers();e.history=d.flow(Object.keys,d.filter(n=>t[n].pressed&&t[n].justChanged),d.concat(d.compact(Object.values(s))),d.concat(e.history),d.takeRight(y))(t);const o=d.reduce((n,i)=>{const f=i.replace(/[^\x00-\x7F]/g,"");return`${n} <div class="${f}">${i}</div>`},"",e.history),a=document.getElementById(e.id);a.innerHTML!==o&&(a.innerHTML=o)},u)}});c.start();
//# sourceMappingURL=fighting-DZG2xMnu.js.map
