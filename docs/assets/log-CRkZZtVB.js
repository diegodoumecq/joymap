import"./modulepreload-polyfill-B5Qt9EMX.js";import{f as o,c as m}from"./JoyMap-C454OjxF.js";import{c as f}from"./query-DOvG8e8T.js";import"./_commonjsHelpers-Cpj98o6Y.js";function c(s){return o.reduce((t,{pressed:e})=>t+(e?1:0),0,s)}function h(s){return o.reduce((t,{displayName:e,inputType:n,compilation:r})=>`${t}
      <div class="row">
        <span class="input-type">${e}:</span>
        ${o.flow(o.split(", "),o.compact,o.map(a=>`<span class="${n}">${a}</span>`),o.join(""))(r)}
      </div>`,"",s)}function g(s){return o.reduce((t,e)=>{const n=s[e];if(n.pressed||n.justChanged){if(n.type==="button")return`${t} ${e}: ${n.pressed?"pressed":"released"}(${Math.round(n.value*100)/100}),`;const[r,a]=n.value;return`${t} ${e}: ${n.pressed?"pressed":"released"}(x: ${Math.round(r*100)/100}, y: ${Math.round(a*100)/100}),`}return t},"",Object.keys(s)).slice(0,-1)}function M(s){return o.reduce((t,e)=>{const n=s[e];return n?`${t} ${e}: (${n}),`:t},"",Object.keys(s)).slice(0,-1)}const v=document.getElementById("app");v.innerHTML=`
  <div class="main-container">
    <header>
      <h3>Let's log all gamepad inputs</h3>
    </header>
    <div class="log-example">
      <div class="log">
      </div>
      <div class="unplugged">
        <h3>Waiting for gamepad/s to be connected</h3>
      </div>
    </div>
  </div>
`;function B(s){const t=document.querySelector(".log"),e=t.firstChild;if(e&&e.children&&e.children[1].innerHTML===s){const n=parseInt(e.children[0].innerHTML,10);e.children[0].innerHTML=`${n+1} frames`}else{const n=document.createElement("div");n.className="log-line",n.innerHTML=`<span class="log-count">1 frame</span><span>${s}</span>`,t.insertBefore(n,t.firstChild),t.children.length>20&&t.lastChild&&t.removeChild(t.lastChild)}}function $(s,t){const e=f({padId:t});s.addModule(e),e.setButton("Jump",e.getButtonIndexes("A","X","Y","L2","R2")),e.setButton("Shoot",e.getButtonIndexes("B")),e.setButton("LookUp",e.getButtonIndexes("dpadUp")),e.setButton("LookDown",e.getButtonIndexes("dpadDown")),e.setButton("LookLeft",e.getButtonIndexes("dpadLeft")),e.setButton("LookRight",e.getButtonIndexes("dpadRight")),e.setButton("StickAverage",e.getStickIndexes("L","R")),e.setMapper("Move",i=>i.getStick("L").pressed),e.setMapper("Point",i=>i.getStick("R").pressed),e.setMapper("MoveANDPoint",i=>c(i.getSticks("R","L"))===2),e.setMapper("MoveXORPoint",i=>!!(i.getMapper("Move")^i.getMapper("Point"))),e.setMapper("CountFace",i=>c(i.getButtons("A","B","X","Y"))),e.setMapper("CountAll",i=>{const l=c(i.getAllButtons()),u=c(i.getAllSticks());return l||u?`Btn:${l} Sticks:${u}`:null});const n=document.createElement("section");n.className="module";const r=e.getPadId();n.innerHTML=`
    <div class="name">Gamepad: ${r}</div>
    <div id="${r}">Waiting for inputs...</div>
  `;const a=document.querySelector(".log-example");a.insertBefore(n,a.firstChild);const p=document.querySelector(".unplugged");p&&a.removeChild(p)}const d=m({onPoll(){const s=d.getUnusedPadIds();s.length>0&&o.forEach(t=>$(d,t),s),o.forEach(t=>{const e=[g(t.getAllButtons()),g(t.getAllSticks()),M(t.getAllMappers())],n=o.join(", ",o.compact(e));if(n){B(n);const r=document.getElementById(t.getPadId()||"");r.innerHTML=h(o.compact([{inputType:"buttons",compilation:e[0],displayName:"Buttons"},{inputType:"sticks",compilation:e[1],displayName:"Sticks"},{inputType:"mappers",compilation:e[2],displayName:"Mappers"}]))}},d.getModules())}});d.start();
//# sourceMappingURL=log-CRkZZtVB.js.map
