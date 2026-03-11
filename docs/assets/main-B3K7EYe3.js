import"./modulepreload-polyfill-B5Qt9EMX.js";import{j as h,r as m,a as Pn,R as jn,b as Pt,c as jt}from"./client-vbRJSMsA.js";import{g as Lt}from"./_commonjsHelpers-Cpj98o6Y.js";const Ot=({isActive:e,children:n,className:t="",...r})=>h.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${t}`,...r,children:n}),Nt=e=>h.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:h.jsx("path",{d:"M20 6 9 17l-5-5"})}),Tt=e=>h.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[h.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),h.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function It(e){const n=[],t=/\/\/.*$/gm;let r;for(;(r=t.exec(e))!==null;)n.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)n.push({start:r.index,end:r.index+r[0].length,className:"code-string"});n.sort((c,s)=>c.start-s.start);let i="",a=0;for(const c of n){if(c.start<a)continue;const s=e.slice(a,c.start);i+=dn(s);const l=e.slice(c.start,c.end);i+=`<span class="${c.className}">${Ln(l)}</span>`,a=c.end}return i+=dn(e.slice(a)),i}function Ln(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dn(e){let n=Ln(e);return n=n.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),n=n.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),n=n.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),n=n.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),n=n.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(t,r,o)=>t.includes('class="')?t:`<span class="code-function">${r}</span>${o}`),n=n.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),n}function Dt({code:e}){const[n,t]=m.useState(!1),r=m.useRef(null);m.useEffect(()=>{r.current&&(r.current.innerHTML=It(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),t(!0),setTimeout(()=>t(!1),2e3)};return h.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[h.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[h.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),h.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:n?h.jsxs(h.Fragment,{children:[h.jsx(Nt,{className:"h-3.5 w-3.5"}),h.jsx("span",{children:"Copied"})]}):h.jsxs(h.Fragment,{children:[h.jsx(Tt,{className:"h-3.5 w-3.5"}),h.jsx("span",{children:"Copy"})]})})]}),h.jsx("div",{className:"overflow-x-auto p-4",children:h.jsx("pre",{className:"text-sm leading-relaxed",children:h.jsx("code",{ref:r,className:"font-mono"})})})]})}function Y(e,n,{checkForDefaultPrevented:t=!0}={}){return function(o){if(e==null||e(o),t===!1||!o.defaultPrevented)return n==null?void 0:n(o)}}function un(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function On(...e){return n=>{let t=!1;const r=e.map(o=>{const i=un(o,n);return!t&&typeof i=="function"&&(t=!0),i});if(t)return()=>{for(let o=0;o<r.length;o++){const i=r[o];typeof i=="function"?i():un(e[o],null)}}}}function ie(...e){return m.useCallback(On(...e),e)}function Nn(e,n=[]){let t=[];function r(i,a){const c=m.createContext(a),s=t.length;t=[...t,a];const l=u=>{var b;const{scope:p,children:f,...x}=u,w=((b=p==null?void 0:p[e])==null?void 0:b[s])||c,C=m.useMemo(()=>x,Object.values(x));return h.jsx(w.Provider,{value:C,children:f})};l.displayName=i+"Provider";function d(u,p){var w;const f=((w=p==null?void 0:p[e])==null?void 0:w[s])||c,x=m.useContext(f);if(x)return x;if(a!==void 0)return a;throw new Error(`\`${u}\` must be used within \`${i}\``)}return[l,d]}const o=()=>{const i=t.map(a=>m.createContext(a));return function(c){const s=(c==null?void 0:c[e])||i;return m.useMemo(()=>({[`__scope${e}`]:{...c,[e]:s}}),[c,s])}};return o.scopeName=e,[r,Bt(o,...n)]}function Bt(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(i){const a=r.reduce((c,{useScope:s,scopeName:l})=>{const u=s(i)[`__scope${l}`];return{...c,...u}},{});return m.useMemo(()=>({[`__scope${n.scopeName}`]:a}),[a])}};return t.scopeName=n.scopeName,t}function $t(e){const n=Ft(e),t=m.forwardRef((r,o)=>{const{children:i,...a}=r,c=m.Children.toArray(i),s=c.find(Ht);if(s){const l=s.props.children,d=c.map(u=>u===s?m.Children.count(l)>1?m.Children.only(null):m.isValidElement(l)?l.props.children:null:u);return h.jsx(n,{...a,ref:o,children:m.isValidElement(l)?m.cloneElement(l,void 0,d):null})}return h.jsx(n,{...a,ref:o,children:i})});return t.displayName=`${e}.Slot`,t}function Ft(e){const n=m.forwardRef((t,r)=>{const{children:o,...i}=t;if(m.isValidElement(o)){const a=Ut(o),c=Wt(i,o.props);return o.type!==m.Fragment&&(c.ref=r?On(r,a):a),m.cloneElement(o,c)}return m.Children.count(o)>1?m.Children.only(null):null});return n.displayName=`${e}.SlotClone`,n}var Tn=Symbol("radix.slottable");function _t(e){const n=({children:t})=>h.jsx(h.Fragment,{children:t});return n.displayName=`${e}.Slottable`,n.__radixId=Tn,n}function Ht(e){return m.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Tn}function Wt(e,n){const t={...n};for(const r in n){const o=e[r],i=n[r];/^on[A-Z]/.test(r)?o&&i?t[r]=(...c)=>{const s=i(...c);return o(...c),s}:o&&(t[r]=o):r==="style"?t[r]={...o,...i}:r==="className"&&(t[r]=[o,i].filter(Boolean).join(" "))}return{...e,...t}}function Ut(e){var r,o;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var zt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],ne=zt.reduce((e,n)=>{const t=$t(`Primitive.${n}`),r=m.forwardRef((o,i)=>{const{asChild:a,...c}=o,s=a?t:n;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),h.jsx(s,{...c,ref:i})});return r.displayName=`Primitive.${n}`,{...e,[n]:r}},{});function Xt(e,n){e&&Pn.flushSync(()=>e.dispatchEvent(n))}function Ae(e){const n=m.useRef(e);return m.useEffect(()=>{n.current=e}),m.useMemo(()=>(...t)=>{var r;return(r=n.current)==null?void 0:r.call(n,...t)},[])}function Zt(e,n=globalThis==null?void 0:globalThis.document){const t=Ae(e);m.useEffect(()=>{const r=o=>{o.key==="Escape"&&t(o)};return n.addEventListener("keydown",r,{capture:!0}),()=>n.removeEventListener("keydown",r,{capture:!0})},[t,n])}var Yt="DismissableLayer",$e="dismissableLayer.update",Jt="dismissableLayer.pointerDownOutside",Vt="dismissableLayer.focusOutside",pn,In=m.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Dn=m.forwardRef((e,n)=>{const{disableOutsidePointerEvents:t=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:i,onInteractOutside:a,onDismiss:c,...s}=e,l=m.useContext(In),[d,u]=m.useState(null),p=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,f]=m.useState({}),x=ie(n,y=>u(y)),w=Array.from(l.layers),[C]=[...l.layersWithOutsidePointerEventsDisabled].slice(-1),b=w.indexOf(C),k=d?w.indexOf(d):-1,R=l.layersWithOutsidePointerEventsDisabled.size>0,v=k>=b,S=Gt(y=>{const E=y.target,N=[...l.branches].some(A=>A.contains(E));!v||N||(o==null||o(y),a==null||a(y),y.defaultPrevented||c==null||c())},p),g=Kt(y=>{const E=y.target;[...l.branches].some(A=>A.contains(E))||(i==null||i(y),a==null||a(y),y.defaultPrevented||c==null||c())},p);return Zt(y=>{k===l.layers.size-1&&(r==null||r(y),!y.defaultPrevented&&c&&(y.preventDefault(),c()))},p),m.useEffect(()=>{if(d)return t&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(pn=p.body.style.pointerEvents,p.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(d)),l.layers.add(d),mn(),()=>{t&&l.layersWithOutsidePointerEventsDisabled.size===1&&(p.body.style.pointerEvents=pn)}},[d,p,t,l]),m.useEffect(()=>()=>{d&&(l.layers.delete(d),l.layersWithOutsidePointerEventsDisabled.delete(d),mn())},[d,l]),m.useEffect(()=>{const y=()=>f({});return document.addEventListener($e,y),()=>document.removeEventListener($e,y)},[]),h.jsx(ne.div,{...s,ref:x,style:{pointerEvents:R?v?"auto":"none":void 0,...e.style},onFocusCapture:Y(e.onFocusCapture,g.onFocusCapture),onBlurCapture:Y(e.onBlurCapture,g.onBlurCapture),onPointerDownCapture:Y(e.onPointerDownCapture,S.onPointerDownCapture)})});Dn.displayName=Yt;var qt="DismissableLayerBranch",Qt=m.forwardRef((e,n)=>{const t=m.useContext(In),r=m.useRef(null),o=ie(n,r);return m.useEffect(()=>{const i=r.current;if(i)return t.branches.add(i),()=>{t.branches.delete(i)}},[t.branches]),h.jsx(ne.div,{...e,ref:o})});Qt.displayName=qt;function Gt(e,n=globalThis==null?void 0:globalThis.document){const t=Ae(e),r=m.useRef(!1),o=m.useRef(()=>{});return m.useEffect(()=>{const i=c=>{if(c.target&&!r.current){let s=function(){Bn(Jt,t,l,{discrete:!0})};const l={originalEvent:c};c.pointerType==="touch"?(n.removeEventListener("click",o.current),o.current=s,n.addEventListener("click",o.current,{once:!0})):s()}else n.removeEventListener("click",o.current);r.current=!1},a=window.setTimeout(()=>{n.addEventListener("pointerdown",i)},0);return()=>{window.clearTimeout(a),n.removeEventListener("pointerdown",i),n.removeEventListener("click",o.current)}},[n,t]),{onPointerDownCapture:()=>r.current=!0}}function Kt(e,n=globalThis==null?void 0:globalThis.document){const t=Ae(e),r=m.useRef(!1);return m.useEffect(()=>{const o=i=>{i.target&&!r.current&&Bn(Vt,t,{originalEvent:i},{discrete:!1})};return n.addEventListener("focusin",o),()=>n.removeEventListener("focusin",o)},[n,t]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function mn(){const e=new CustomEvent($e);document.dispatchEvent(e)}function Bn(e,n,t,{discrete:r}){const o=t.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:t});n&&o.addEventListener(e,n,{once:!0}),r?Xt(o,i):o.dispatchEvent(i)}var G=globalThis!=null&&globalThis.document?m.useLayoutEffect:()=>{},er=jn[" useId ".trim().toString()]||(()=>{}),nr=0;function tr(e){const[n,t]=m.useState(er());return G(()=>{t(r=>r??String(nr++))},[e]),n?`radix-${n}`:""}const rr=["top","right","bottom","left"],K=Math.min,$=Math.max,Ee=Math.round,ve=Math.floor,X=e=>({x:e,y:e}),or={left:"right",right:"left",bottom:"top",top:"bottom"};function Fe(e,n,t){return $(e,K(n,t))}function J(e,n){return typeof e=="function"?e(n):e}function V(e){return e.split("-")[0]}function ce(e){return e.split("-")[1]}function ze(e){return e==="x"?"y":"x"}function Xe(e){return e==="y"?"height":"width"}function z(e){const n=e[0];return n==="t"||n==="b"?"y":"x"}function Ze(e){return ze(z(e))}function ir(e,n,t){t===void 0&&(t=!1);const r=ce(e),o=Ze(e),i=Xe(o);let a=o==="x"?r===(t?"end":"start")?"right":"left":r==="start"?"bottom":"top";return n.reference[i]>n.floating[i]&&(a=Re(a)),[a,Re(a)]}function sr(e){const n=Re(e);return[_e(e),n,_e(n)]}function _e(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const fn=["left","right"],hn=["right","left"],ar=["top","bottom"],lr=["bottom","top"];function cr(e,n,t){switch(e){case"top":case"bottom":return t?n?hn:fn:n?fn:hn;case"left":case"right":return n?ar:lr;default:return[]}}function dr(e,n,t,r){const o=ce(e);let i=cr(V(e),t==="start",r);return o&&(i=i.map(a=>a+"-"+o),n&&(i=i.concat(i.map(_e)))),i}function Re(e){const n=V(e);return or[n]+e.slice(n.length)}function ur(e){return{top:0,right:0,bottom:0,left:0,...e}}function $n(e){return typeof e!="number"?ur(e):{top:e,right:e,bottom:e,left:e}}function Se(e){const{x:n,y:t,width:r,height:o}=e;return{width:r,height:o,top:t,left:n,right:n+r,bottom:t+o,x:n,y:t}}function gn(e,n,t){let{reference:r,floating:o}=e;const i=z(n),a=Ze(n),c=Xe(a),s=V(n),l=i==="y",d=r.x+r.width/2-o.width/2,u=r.y+r.height/2-o.height/2,p=r[c]/2-o[c]/2;let f;switch(s){case"top":f={x:d,y:r.y-o.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:u};break;case"left":f={x:r.x-o.width,y:u};break;default:f={x:r.x,y:r.y}}switch(ce(n)){case"start":f[a]-=p*(t&&l?-1:1);break;case"end":f[a]+=p*(t&&l?-1:1);break}return f}async function pr(e,n){var t;n===void 0&&(n={});const{x:r,y:o,platform:i,rects:a,elements:c,strategy:s}=e,{boundary:l="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:p=!1,padding:f=0}=J(n,e),x=$n(f),C=c[p?u==="floating"?"reference":"floating":u],b=Se(await i.getClippingRect({element:(t=await(i.isElement==null?void 0:i.isElement(C)))==null||t?C:C.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(c.floating)),boundary:l,rootBoundary:d,strategy:s})),k=u==="floating"?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,R=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c.floating)),v=await(i.isElement==null?void 0:i.isElement(R))?await(i.getScale==null?void 0:i.getScale(R))||{x:1,y:1}:{x:1,y:1},S=Se(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:k,offsetParent:R,strategy:s}):k);return{top:(b.top-S.top+x.top)/v.y,bottom:(S.bottom-b.bottom+x.bottom)/v.y,left:(b.left-S.left+x.left)/v.x,right:(S.right-b.right+x.right)/v.x}}const mr=50,fr=async(e,n,t)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:a}=t,c=a.detectOverflow?a:{...a,detectOverflow:pr},s=await(a.isRTL==null?void 0:a.isRTL(n));let l=await a.getElementRects({reference:e,floating:n,strategy:o}),{x:d,y:u}=gn(l,r,s),p=r,f=0;const x={};for(let w=0;w<i.length;w++){const C=i[w];if(!C)continue;const{name:b,fn:k}=C,{x:R,y:v,data:S,reset:g}=await k({x:d,y:u,initialPlacement:r,placement:p,strategy:o,middlewareData:x,rects:l,platform:c,elements:{reference:e,floating:n}});d=R??d,u=v??u,x[b]={...x[b],...S},g&&f<mr&&(f++,typeof g=="object"&&(g.placement&&(p=g.placement),g.rects&&(l=g.rects===!0?await a.getElementRects({reference:e,floating:n,strategy:o}):g.rects),{x:d,y:u}=gn(l,p,s)),w=-1)}return{x:d,y:u,placement:p,strategy:o,middlewareData:x}},hr=e=>({name:"arrow",options:e,async fn(n){const{x:t,y:r,placement:o,rects:i,platform:a,elements:c,middlewareData:s}=n,{element:l,padding:d=0}=J(e,n)||{};if(l==null)return{};const u=$n(d),p={x:t,y:r},f=Ze(o),x=Xe(f),w=await a.getDimensions(l),C=f==="y",b=C?"top":"left",k=C?"bottom":"right",R=C?"clientHeight":"clientWidth",v=i.reference[x]+i.reference[f]-p[f]-i.floating[x],S=p[f]-i.reference[f],g=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l));let y=g?g[R]:0;(!y||!await(a.isElement==null?void 0:a.isElement(g)))&&(y=c.floating[R]||i.floating[x]);const E=v/2-S/2,N=y/2-w[x]/2-1,A=K(u[b],N),I=K(u[k],N),D=A,j=y-w[x]-I,P=y/2-w[x]/2+E,B=Fe(D,P,j),L=!s.arrow&&ce(o)!=null&&P!==B&&i.reference[x]/2-(P<D?A:I)-w[x]/2<0,O=L?P<D?P-D:P-j:0;return{[f]:p[f]+O,data:{[f]:B,centerOffset:P-B-O,...L&&{alignmentOffset:O}},reset:L}}}),gr=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(n){var t,r;const{placement:o,middlewareData:i,rects:a,initialPlacement:c,platform:s,elements:l}=n,{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:p,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:w=!0,...C}=J(e,n);if((t=i.arrow)!=null&&t.alignmentOffset)return{};const b=V(o),k=z(c),R=V(c)===c,v=await(s.isRTL==null?void 0:s.isRTL(l.floating)),S=p||(R||!w?[Re(c)]:sr(c)),g=x!=="none";!p&&g&&S.push(...dr(c,w,x,v));const y=[c,...S],E=await s.detectOverflow(n,C),N=[];let A=((r=i.flip)==null?void 0:r.overflows)||[];if(d&&N.push(E[b]),u){const P=ir(o,a,v);N.push(E[P[0]],E[P[1]])}if(A=[...A,{placement:o,overflows:N}],!N.every(P=>P<=0)){var I,D;const P=(((I=i.flip)==null?void 0:I.index)||0)+1,B=y[P];if(B&&(!(u==="alignment"?k!==z(B):!1)||A.every(M=>z(M.placement)===k?M.overflows[0]>0:!0)))return{data:{index:P,overflows:A},reset:{placement:B}};let L=(D=A.filter(O=>O.overflows[0]<=0).sort((O,M)=>O.overflows[1]-M.overflows[1])[0])==null?void 0:D.placement;if(!L)switch(f){case"bestFit":{var j;const O=(j=A.filter(M=>{if(g){const T=z(M.placement);return T===k||T==="y"}return!0}).map(M=>[M.placement,M.overflows.filter(T=>T>0).reduce((T,U)=>T+U,0)]).sort((M,T)=>M[1]-T[1])[0])==null?void 0:j[0];O&&(L=O);break}case"initialPlacement":L=c;break}if(o!==L)return{reset:{placement:L}}}return{}}}};function xn(e,n){return{top:e.top-n.height,right:e.right-n.width,bottom:e.bottom-n.height,left:e.left-n.width}}function yn(e){return rr.some(n=>e[n]>=0)}const xr=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(n){const{rects:t,platform:r}=n,{strategy:o="referenceHidden",...i}=J(e,n);switch(o){case"referenceHidden":{const a=await r.detectOverflow(n,{...i,elementContext:"reference"}),c=xn(a,t.reference);return{data:{referenceHiddenOffsets:c,referenceHidden:yn(c)}}}case"escaped":{const a=await r.detectOverflow(n,{...i,altBoundary:!0}),c=xn(a,t.floating);return{data:{escapedOffsets:c,escaped:yn(c)}}}default:return{}}}}},Fn=new Set(["left","top"]);async function yr(e,n){const{placement:t,platform:r,elements:o}=e,i=await(r.isRTL==null?void 0:r.isRTL(o.floating)),a=V(t),c=ce(t),s=z(t)==="y",l=Fn.has(a)?-1:1,d=i&&s?-1:1,u=J(n,e);let{mainAxis:p,crossAxis:f,alignmentAxis:x}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof x=="number"&&(f=c==="end"?x*-1:x),s?{x:f*d,y:p*l}:{x:p*l,y:f*d}}const wr=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(n){var t,r;const{x:o,y:i,placement:a,middlewareData:c}=n,s=await yr(n,e);return a===((t=c.offset)==null?void 0:t.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:o+s.x,y:i+s.y,data:{...s,placement:a}}}}},br=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(n){const{x:t,y:r,placement:o,platform:i}=n,{mainAxis:a=!0,crossAxis:c=!1,limiter:s={fn:b=>{let{x:k,y:R}=b;return{x:k,y:R}}},...l}=J(e,n),d={x:t,y:r},u=await i.detectOverflow(n,l),p=z(V(o)),f=ze(p);let x=d[f],w=d[p];if(a){const b=f==="y"?"top":"left",k=f==="y"?"bottom":"right",R=x+u[b],v=x-u[k];x=Fe(R,x,v)}if(c){const b=p==="y"?"top":"left",k=p==="y"?"bottom":"right",R=w+u[b],v=w-u[k];w=Fe(R,w,v)}const C=s.fn({...n,[f]:x,[p]:w});return{...C,data:{x:C.x-t,y:C.y-r,enabled:{[f]:a,[p]:c}}}}}},vr=function(e){return e===void 0&&(e={}),{options:e,fn(n){const{x:t,y:r,placement:o,rects:i,middlewareData:a}=n,{offset:c=0,mainAxis:s=!0,crossAxis:l=!0}=J(e,n),d={x:t,y:r},u=z(o),p=ze(u);let f=d[p],x=d[u];const w=J(c,n),C=typeof w=="number"?{mainAxis:w,crossAxis:0}:{mainAxis:0,crossAxis:0,...w};if(s){const R=p==="y"?"height":"width",v=i.reference[p]-i.floating[R]+C.mainAxis,S=i.reference[p]+i.reference[R]-C.mainAxis;f<v?f=v:f>S&&(f=S)}if(l){var b,k;const R=p==="y"?"width":"height",v=Fn.has(V(o)),S=i.reference[u]-i.floating[R]+(v&&((b=a.offset)==null?void 0:b[u])||0)+(v?0:C.crossAxis),g=i.reference[u]+i.reference[R]+(v?0:((k=a.offset)==null?void 0:k[u])||0)-(v?C.crossAxis:0);x<S?x=S:x>g&&(x=g)}return{[p]:f,[u]:x}}}},kr=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(n){var t,r;const{placement:o,rects:i,platform:a,elements:c}=n,{apply:s=()=>{},...l}=J(e,n),d=await a.detectOverflow(n,l),u=V(o),p=ce(o),f=z(o)==="y",{width:x,height:w}=i.floating;let C,b;u==="top"||u==="bottom"?(C=u,b=p===(await(a.isRTL==null?void 0:a.isRTL(c.floating))?"start":"end")?"left":"right"):(b=u,C=p==="end"?"top":"bottom");const k=w-d.top-d.bottom,R=x-d.left-d.right,v=K(w-d[C],k),S=K(x-d[b],R),g=!n.middlewareData.shift;let y=v,E=S;if((t=n.middlewareData.shift)!=null&&t.enabled.x&&(E=R),(r=n.middlewareData.shift)!=null&&r.enabled.y&&(y=k),g&&!p){const A=$(d.left,0),I=$(d.right,0),D=$(d.top,0),j=$(d.bottom,0);f?E=x-2*(A!==0||I!==0?A+I:$(d.left,d.right)):y=w-2*(D!==0||j!==0?D+j:$(d.top,d.bottom))}await s({...n,availableWidth:E,availableHeight:y});const N=await a.getDimensions(c.floating);return x!==N.width||w!==N.height?{reset:{rects:!0}}:{}}}};function Pe(){return typeof window<"u"}function de(e){return _n(e)?(e.nodeName||"").toLowerCase():"#document"}function F(e){var n;return(e==null||(n=e.ownerDocument)==null?void 0:n.defaultView)||window}function Z(e){var n;return(n=(_n(e)?e.ownerDocument:e.document)||window.document)==null?void 0:n.documentElement}function _n(e){return Pe()?e instanceof Node||e instanceof F(e).Node:!1}function H(e){return Pe()?e instanceof Element||e instanceof F(e).Element:!1}function q(e){return Pe()?e instanceof HTMLElement||e instanceof F(e).HTMLElement:!1}function wn(e){return!Pe()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof F(e).ShadowRoot}function he(e){const{overflow:n,overflowX:t,overflowY:r,display:o}=W(e);return/auto|scroll|overlay|hidden|clip/.test(n+r+t)&&o!=="inline"&&o!=="contents"}function Cr(e){return/^(table|td|th)$/.test(de(e))}function je(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const Er=/transform|translate|scale|rotate|perspective|filter/,Rr=/paint|layout|strict|content/,te=e=>!!e&&e!=="none";let Ie;function Ye(e){const n=H(e)?W(e):e;return te(n.transform)||te(n.translate)||te(n.scale)||te(n.rotate)||te(n.perspective)||!Je()&&(te(n.backdropFilter)||te(n.filter))||Er.test(n.willChange||"")||Rr.test(n.contain||"")}function Sr(e){let n=ee(e);for(;q(n)&&!ae(n);){if(Ye(n))return n;if(je(n))return null;n=ee(n)}return null}function Je(){return Ie==null&&(Ie=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Ie}function ae(e){return/^(html|body|#document)$/.test(de(e))}function W(e){return F(e).getComputedStyle(e)}function Le(e){return H(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ee(e){if(de(e)==="html")return e;const n=e.assignedSlot||e.parentNode||wn(e)&&e.host||Z(e);return wn(n)?n.host:n}function Hn(e){const n=ee(e);return ae(n)?e.ownerDocument?e.ownerDocument.body:e.body:q(n)&&he(n)?n:Hn(n)}function me(e,n,t){var r;n===void 0&&(n=[]),t===void 0&&(t=!0);const o=Hn(e),i=o===((r=e.ownerDocument)==null?void 0:r.body),a=F(o);if(i){const c=He(a);return n.concat(a,a.visualViewport||[],he(o)?o:[],c&&t?me(c):[])}else return n.concat(o,me(o,[],t))}function He(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Wn(e){const n=W(e);let t=parseFloat(n.width)||0,r=parseFloat(n.height)||0;const o=q(e),i=o?e.offsetWidth:t,a=o?e.offsetHeight:r,c=Ee(t)!==i||Ee(r)!==a;return c&&(t=i,r=a),{width:t,height:r,$:c}}function Ve(e){return H(e)?e:e.contextElement}function se(e){const n=Ve(e);if(!q(n))return X(1);const t=n.getBoundingClientRect(),{width:r,height:o,$:i}=Wn(n);let a=(i?Ee(t.width):t.width)/r,c=(i?Ee(t.height):t.height)/o;return(!a||!Number.isFinite(a))&&(a=1),(!c||!Number.isFinite(c))&&(c=1),{x:a,y:c}}const Mr=X(0);function Un(e){const n=F(e);return!Je()||!n.visualViewport?Mr:{x:n.visualViewport.offsetLeft,y:n.visualViewport.offsetTop}}function Ar(e,n,t){return n===void 0&&(n=!1),!t||n&&t!==F(e)?!1:n}function oe(e,n,t,r){n===void 0&&(n=!1),t===void 0&&(t=!1);const o=e.getBoundingClientRect(),i=Ve(e);let a=X(1);n&&(r?H(r)&&(a=se(r)):a=se(e));const c=Ar(i,t,r)?Un(i):X(0);let s=(o.left+c.x)/a.x,l=(o.top+c.y)/a.y,d=o.width/a.x,u=o.height/a.y;if(i){const p=F(i),f=r&&H(r)?F(r):r;let x=p,w=He(x);for(;w&&r&&f!==x;){const C=se(w),b=w.getBoundingClientRect(),k=W(w),R=b.left+(w.clientLeft+parseFloat(k.paddingLeft))*C.x,v=b.top+(w.clientTop+parseFloat(k.paddingTop))*C.y;s*=C.x,l*=C.y,d*=C.x,u*=C.y,s+=R,l+=v,x=F(w),w=He(x)}}return Se({width:d,height:u,x:s,y:l})}function Oe(e,n){const t=Le(e).scrollLeft;return n?n.left+t:oe(Z(e)).left+t}function zn(e,n){const t=e.getBoundingClientRect(),r=t.left+n.scrollLeft-Oe(e,t),o=t.top+n.scrollTop;return{x:r,y:o}}function Pr(e){let{elements:n,rect:t,offsetParent:r,strategy:o}=e;const i=o==="fixed",a=Z(r),c=n?je(n.floating):!1;if(r===a||c&&i)return t;let s={scrollLeft:0,scrollTop:0},l=X(1);const d=X(0),u=q(r);if((u||!u&&!i)&&((de(r)!=="body"||he(a))&&(s=Le(r)),u)){const f=oe(r);l=se(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}const p=a&&!u&&!i?zn(a,s):X(0);return{width:t.width*l.x,height:t.height*l.y,x:t.x*l.x-s.scrollLeft*l.x+d.x+p.x,y:t.y*l.y-s.scrollTop*l.y+d.y+p.y}}function jr(e){return Array.from(e.getClientRects())}function Lr(e){const n=Z(e),t=Le(e),r=e.ownerDocument.body,o=$(n.scrollWidth,n.clientWidth,r.scrollWidth,r.clientWidth),i=$(n.scrollHeight,n.clientHeight,r.scrollHeight,r.clientHeight);let a=-t.scrollLeft+Oe(e);const c=-t.scrollTop;return W(r).direction==="rtl"&&(a+=$(n.clientWidth,r.clientWidth)-o),{width:o,height:i,x:a,y:c}}const bn=25;function Or(e,n){const t=F(e),r=Z(e),o=t.visualViewport;let i=r.clientWidth,a=r.clientHeight,c=0,s=0;if(o){i=o.width,a=o.height;const d=Je();(!d||d&&n==="fixed")&&(c=o.offsetLeft,s=o.offsetTop)}const l=Oe(r);if(l<=0){const d=r.ownerDocument,u=d.body,p=getComputedStyle(u),f=d.compatMode==="CSS1Compat"&&parseFloat(p.marginLeft)+parseFloat(p.marginRight)||0,x=Math.abs(r.clientWidth-u.clientWidth-f);x<=bn&&(i-=x)}else l<=bn&&(i+=l);return{width:i,height:a,x:c,y:s}}function Nr(e,n){const t=oe(e,!0,n==="fixed"),r=t.top+e.clientTop,o=t.left+e.clientLeft,i=q(e)?se(e):X(1),a=e.clientWidth*i.x,c=e.clientHeight*i.y,s=o*i.x,l=r*i.y;return{width:a,height:c,x:s,y:l}}function vn(e,n,t){let r;if(n==="viewport")r=Or(e,t);else if(n==="document")r=Lr(Z(e));else if(H(n))r=Nr(n,t);else{const o=Un(e);r={x:n.x-o.x,y:n.y-o.y,width:n.width,height:n.height}}return Se(r)}function Xn(e,n){const t=ee(e);return t===n||!H(t)||ae(t)?!1:W(t).position==="fixed"||Xn(t,n)}function Tr(e,n){const t=n.get(e);if(t)return t;let r=me(e,[],!1).filter(c=>H(c)&&de(c)!=="body"),o=null;const i=W(e).position==="fixed";let a=i?ee(e):e;for(;H(a)&&!ae(a);){const c=W(a),s=Ye(a);!s&&c.position==="fixed"&&(o=null),(i?!s&&!o:!s&&c.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||he(a)&&!s&&Xn(e,a))?r=r.filter(d=>d!==a):o=c,a=ee(a)}return n.set(e,r),r}function Ir(e){let{element:n,boundary:t,rootBoundary:r,strategy:o}=e;const a=[...t==="clippingAncestors"?je(n)?[]:Tr(n,this._c):[].concat(t),r],c=vn(n,a[0],o);let s=c.top,l=c.right,d=c.bottom,u=c.left;for(let p=1;p<a.length;p++){const f=vn(n,a[p],o);s=$(f.top,s),l=K(f.right,l),d=K(f.bottom,d),u=$(f.left,u)}return{width:l-u,height:d-s,x:u,y:s}}function Dr(e){const{width:n,height:t}=Wn(e);return{width:n,height:t}}function Br(e,n,t){const r=q(n),o=Z(n),i=t==="fixed",a=oe(e,!0,i,n);let c={scrollLeft:0,scrollTop:0};const s=X(0);function l(){s.x=Oe(o)}if(r||!r&&!i)if((de(n)!=="body"||he(o))&&(c=Le(n)),r){const f=oe(n,!0,i,n);s.x=f.x+n.clientLeft,s.y=f.y+n.clientTop}else o&&l();i&&!r&&o&&l();const d=o&&!r&&!i?zn(o,c):X(0),u=a.left+c.scrollLeft-s.x-d.x,p=a.top+c.scrollTop-s.y-d.y;return{x:u,y:p,width:a.width,height:a.height}}function De(e){return W(e).position==="static"}function kn(e,n){if(!q(e)||W(e).position==="fixed")return null;if(n)return n(e);let t=e.offsetParent;return Z(e)===t&&(t=t.ownerDocument.body),t}function Zn(e,n){const t=F(e);if(je(e))return t;if(!q(e)){let o=ee(e);for(;o&&!ae(o);){if(H(o)&&!De(o))return o;o=ee(o)}return t}let r=kn(e,n);for(;r&&Cr(r)&&De(r);)r=kn(r,n);return r&&ae(r)&&De(r)&&!Ye(r)?t:r||Sr(e)||t}const $r=async function(e){const n=this.getOffsetParent||Zn,t=this.getDimensions,r=await t(e.floating);return{reference:Br(e.reference,await n(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Fr(e){return W(e).direction==="rtl"}const _r={convertOffsetParentRelativeRectToViewportRelativeRect:Pr,getDocumentElement:Z,getClippingRect:Ir,getOffsetParent:Zn,getElementRects:$r,getClientRects:jr,getDimensions:Dr,getScale:se,isElement:H,isRTL:Fr};function Yn(e,n){return e.x===n.x&&e.y===n.y&&e.width===n.width&&e.height===n.height}function Hr(e,n){let t=null,r;const o=Z(e);function i(){var c;clearTimeout(r),(c=t)==null||c.disconnect(),t=null}function a(c,s){c===void 0&&(c=!1),s===void 0&&(s=1),i();const l=e.getBoundingClientRect(),{left:d,top:u,width:p,height:f}=l;if(c||n(),!p||!f)return;const x=ve(u),w=ve(o.clientWidth-(d+p)),C=ve(o.clientHeight-(u+f)),b=ve(d),R={rootMargin:-x+"px "+-w+"px "+-C+"px "+-b+"px",threshold:$(0,K(1,s))||1};let v=!0;function S(g){const y=g[0].intersectionRatio;if(y!==s){if(!v)return a();y?a(!1,y):r=setTimeout(()=>{a(!1,1e-7)},1e3)}y===1&&!Yn(l,e.getBoundingClientRect())&&a(),v=!1}try{t=new IntersectionObserver(S,{...R,root:o.ownerDocument})}catch{t=new IntersectionObserver(S,R)}t.observe(e)}return a(!0),i}function Wr(e,n,t,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:s=!1}=r,l=Ve(e),d=o||i?[...l?me(l):[],...n?me(n):[]]:[];d.forEach(b=>{o&&b.addEventListener("scroll",t,{passive:!0}),i&&b.addEventListener("resize",t)});const u=l&&c?Hr(l,t):null;let p=-1,f=null;a&&(f=new ResizeObserver(b=>{let[k]=b;k&&k.target===l&&f&&n&&(f.unobserve(n),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var R;(R=f)==null||R.observe(n)})),t()}),l&&!s&&f.observe(l),n&&f.observe(n));let x,w=s?oe(e):null;s&&C();function C(){const b=oe(e);w&&!Yn(w,b)&&t(),w=b,x=requestAnimationFrame(C)}return t(),()=>{var b;d.forEach(k=>{o&&k.removeEventListener("scroll",t),i&&k.removeEventListener("resize",t)}),u==null||u(),(b=f)==null||b.disconnect(),f=null,s&&cancelAnimationFrame(x)}}const Ur=wr,zr=br,Xr=gr,Zr=kr,Yr=xr,Cn=hr,Jr=vr,Vr=(e,n,t)=>{const r=new Map,o={platform:_r,...t},i={...o.platform,_c:r};return fr(e,n,{...o,platform:i})};var qr=typeof document<"u",Qr=function(){},Ce=qr?m.useLayoutEffect:Qr;function Me(e,n){if(e===n)return!0;if(typeof e!=typeof n)return!1;if(typeof e=="function"&&e.toString()===n.toString())return!0;let t,r,o;if(e&&n&&typeof e=="object"){if(Array.isArray(e)){if(t=e.length,t!==n.length)return!1;for(r=t;r--!==0;)if(!Me(e[r],n[r]))return!1;return!0}if(o=Object.keys(e),t=o.length,t!==Object.keys(n).length)return!1;for(r=t;r--!==0;)if(!{}.hasOwnProperty.call(n,o[r]))return!1;for(r=t;r--!==0;){const i=o[r];if(!(i==="_owner"&&e.$$typeof)&&!Me(e[i],n[i]))return!1}return!0}return e!==e&&n!==n}function Jn(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function En(e,n){const t=Jn(e);return Math.round(n*t)/t}function Be(e){const n=m.useRef(e);return Ce(()=>{n.current=e}),n}function Gr(e){e===void 0&&(e={});const{placement:n="bottom",strategy:t="absolute",middleware:r=[],platform:o,elements:{reference:i,floating:a}={},transform:c=!0,whileElementsMounted:s,open:l}=e,[d,u]=m.useState({x:0,y:0,strategy:t,placement:n,middlewareData:{},isPositioned:!1}),[p,f]=m.useState(r);Me(p,r)||f(r);const[x,w]=m.useState(null),[C,b]=m.useState(null),k=m.useCallback(M=>{M!==g.current&&(g.current=M,w(M))},[]),R=m.useCallback(M=>{M!==y.current&&(y.current=M,b(M))},[]),v=i||x,S=a||C,g=m.useRef(null),y=m.useRef(null),E=m.useRef(d),N=s!=null,A=Be(s),I=Be(o),D=Be(l),j=m.useCallback(()=>{if(!g.current||!y.current)return;const M={placement:n,strategy:t,middleware:p};I.current&&(M.platform=I.current),Vr(g.current,y.current,M).then(T=>{const U={...T,isPositioned:D.current!==!1};P.current&&!Me(E.current,U)&&(E.current=U,Pn.flushSync(()=>{u(U)}))})},[p,n,t,I,D]);Ce(()=>{l===!1&&E.current.isPositioned&&(E.current.isPositioned=!1,u(M=>({...M,isPositioned:!1})))},[l]);const P=m.useRef(!1);Ce(()=>(P.current=!0,()=>{P.current=!1}),[]),Ce(()=>{if(v&&(g.current=v),S&&(y.current=S),v&&S){if(A.current)return A.current(v,S,j);j()}},[v,S,j,A,N]);const B=m.useMemo(()=>({reference:g,floating:y,setReference:k,setFloating:R}),[k,R]),L=m.useMemo(()=>({reference:v,floating:S}),[v,S]),O=m.useMemo(()=>{const M={position:t,left:0,top:0};if(!L.floating)return M;const T=En(L.floating,d.x),U=En(L.floating,d.y);return c?{...M,transform:"translate("+T+"px, "+U+"px)",...Jn(L.floating)>=1.5&&{willChange:"transform"}}:{position:t,left:T,top:U}},[t,c,L.floating,d.x,d.y]);return m.useMemo(()=>({...d,update:j,refs:B,elements:L,floatingStyles:O}),[d,j,B,L,O])}const Kr=e=>{function n(t){return{}.hasOwnProperty.call(t,"current")}return{name:"arrow",options:e,fn(t){const{element:r,padding:o}=typeof e=="function"?e(t):e;return r&&n(r)?r.current!=null?Cn({element:r.current,padding:o}).fn(t):{}:r?Cn({element:r,padding:o}).fn(t):{}}}},eo=(e,n)=>{const t=Ur(e);return{name:t.name,fn:t.fn,options:[e,n]}},no=(e,n)=>{const t=zr(e);return{name:t.name,fn:t.fn,options:[e,n]}},to=(e,n)=>({fn:Jr(e).fn,options:[e,n]}),ro=(e,n)=>{const t=Xr(e);return{name:t.name,fn:t.fn,options:[e,n]}},oo=(e,n)=>{const t=Zr(e);return{name:t.name,fn:t.fn,options:[e,n]}},io=(e,n)=>{const t=Yr(e);return{name:t.name,fn:t.fn,options:[e,n]}},so=(e,n)=>{const t=Kr(e);return{name:t.name,fn:t.fn,options:[e,n]}};var ao="Arrow",Vn=m.forwardRef((e,n)=>{const{children:t,width:r=10,height:o=5,...i}=e;return h.jsx(ne.svg,{...i,ref:n,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?t:h.jsx("polygon",{points:"0,0 30,0 15,10"})})});Vn.displayName=ao;var lo=Vn;function co(e){const[n,t]=m.useState(void 0);return G(()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const i=o[0];let a,c;if("borderBoxSize"in i){const s=i.borderBoxSize,l=Array.isArray(s)?s[0]:s;a=l.inlineSize,c=l.blockSize}else a=e.offsetWidth,c=e.offsetHeight;t({width:a,height:c})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else t(void 0)},[e]),n}var qe="Popper",[qn,Qn]=Nn(qe),[uo,Gn]=qn(qe),Kn=e=>{const{__scopePopper:n,children:t}=e,[r,o]=m.useState(null);return h.jsx(uo,{scope:n,anchor:r,onAnchorChange:o,children:t})};Kn.displayName=qe;var et="PopperAnchor",nt=m.forwardRef((e,n)=>{const{__scopePopper:t,virtualRef:r,...o}=e,i=Gn(et,t),a=m.useRef(null),c=ie(n,a),s=m.useRef(null);return m.useEffect(()=>{const l=s.current;s.current=(r==null?void 0:r.current)||a.current,l!==s.current&&i.onAnchorChange(s.current)}),r?null:h.jsx(ne.div,{...o,ref:c})});nt.displayName=et;var Qe="PopperContent",[po,mo]=qn(Qe),tt=m.forwardRef((e,n)=>{var tn,rn,on,sn,an,ln;const{__scopePopper:t,side:r="bottom",sideOffset:o=0,align:i="center",alignOffset:a=0,arrowPadding:c=0,avoidCollisions:s=!0,collisionBoundary:l=[],collisionPadding:d=0,sticky:u="partial",hideWhenDetached:p=!1,updatePositionStrategy:f="optimized",onPlaced:x,...w}=e,C=Gn(Qe,t),[b,k]=m.useState(null),R=ie(n,ue=>k(ue)),[v,S]=m.useState(null),g=co(v),y=(g==null?void 0:g.width)??0,E=(g==null?void 0:g.height)??0,N=r+(i!=="center"?"-"+i:""),A=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},I=Array.isArray(l)?l:[l],D=I.length>0,j={padding:A,boundary:I.filter(ho),altBoundary:D},{refs:P,floatingStyles:B,placement:L,isPositioned:O,middlewareData:M}=Gr({strategy:"fixed",placement:N,whileElementsMounted:(...ue)=>Wr(...ue,{animationFrame:f==="always"}),elements:{reference:C.anchor},middleware:[eo({mainAxis:o+E,alignmentAxis:a}),s&&no({mainAxis:!0,crossAxis:!1,limiter:u==="partial"?to():void 0,...j}),s&&ro({...j}),oo({...j,apply:({elements:ue,rects:cn,availableWidth:Rt,availableHeight:St})=>{const{width:Mt,height:At}=cn.reference,be=ue.floating.style;be.setProperty("--radix-popper-available-width",`${Rt}px`),be.setProperty("--radix-popper-available-height",`${St}px`),be.setProperty("--radix-popper-anchor-width",`${Mt}px`),be.setProperty("--radix-popper-anchor-height",`${At}px`)}}),v&&so({element:v,padding:c}),go({arrowWidth:y,arrowHeight:E}),p&&io({strategy:"referenceHidden",...j})]}),[T,U]=it(L),we=Ae(x);G(()=>{O&&(we==null||we())},[O,we]);const bt=(tn=M.arrow)==null?void 0:tn.x,vt=(rn=M.arrow)==null?void 0:rn.y,kt=((on=M.arrow)==null?void 0:on.centerOffset)!==0,[Ct,Et]=m.useState();return G(()=>{b&&Et(window.getComputedStyle(b).zIndex)},[b]),h.jsx("div",{ref:P.setFloating,"data-radix-popper-content-wrapper":"",style:{...B,transform:O?B.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Ct,"--radix-popper-transform-origin":[(sn=M.transformOrigin)==null?void 0:sn.x,(an=M.transformOrigin)==null?void 0:an.y].join(" "),...((ln=M.hide)==null?void 0:ln.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:h.jsx(po,{scope:t,placedSide:T,onArrowChange:S,arrowX:bt,arrowY:vt,shouldHideArrow:kt,children:h.jsx(ne.div,{"data-side":T,"data-align":U,...w,ref:R,style:{...w.style,animation:O?void 0:"none"}})})})});tt.displayName=Qe;var rt="PopperArrow",fo={top:"bottom",right:"left",bottom:"top",left:"right"},ot=m.forwardRef(function(n,t){const{__scopePopper:r,...o}=n,i=mo(rt,r),a=fo[i.placedSide];return h.jsx("span",{ref:i.onArrowChange,style:{position:"absolute",left:i.arrowX,top:i.arrowY,[a]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[i.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[i.placedSide],visibility:i.shouldHideArrow?"hidden":void 0},children:h.jsx(lo,{...o,ref:t,style:{...o.style,display:"block"}})})});ot.displayName=rt;function ho(e){return e!==null}var go=e=>({name:"transformOrigin",options:e,fn(n){var C,b,k;const{placement:t,rects:r,middlewareData:o}=n,a=((C=o.arrow)==null?void 0:C.centerOffset)!==0,c=a?0:e.arrowWidth,s=a?0:e.arrowHeight,[l,d]=it(t),u={start:"0%",center:"50%",end:"100%"}[d],p=(((b=o.arrow)==null?void 0:b.x)??0)+c/2,f=(((k=o.arrow)==null?void 0:k.y)??0)+s/2;let x="",w="";return l==="bottom"?(x=a?u:`${p}px`,w=`${-s}px`):l==="top"?(x=a?u:`${p}px`,w=`${r.floating.height+s}px`):l==="right"?(x=`${-s}px`,w=a?u:`${f}px`):l==="left"&&(x=`${r.floating.width+s}px`,w=a?u:`${f}px`),{data:{x,y:w}}}});function it(e){const[n,t="center"]=e.split("-");return[n,t]}var xo=Kn,yo=nt,wo=tt,bo=ot,vo="Portal",st=m.forwardRef((e,n)=>{var c;const{container:t,...r}=e,[o,i]=m.useState(!1);G(()=>i(!0),[]);const a=t||o&&((c=globalThis==null?void 0:globalThis.document)==null?void 0:c.body);return a?Pt.createPortal(h.jsx(ne.div,{...r,ref:n}),a):null});st.displayName=vo;function ko(e,n){return m.useReducer((t,r)=>n[t][r]??t,e)}var Ge=e=>{const{present:n,children:t}=e,r=Co(n),o=typeof t=="function"?t({present:r.isPresent}):m.Children.only(t),i=ie(r.ref,Eo(o));return typeof t=="function"||r.isPresent?m.cloneElement(o,{ref:i}):null};Ge.displayName="Presence";function Co(e){const[n,t]=m.useState(),r=m.useRef(null),o=m.useRef(e),i=m.useRef("none"),a=e?"mounted":"unmounted",[c,s]=ko(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return m.useEffect(()=>{const l=ke(r.current);i.current=c==="mounted"?l:"none"},[c]),G(()=>{const l=r.current,d=o.current;if(d!==e){const p=i.current,f=ke(l);e?s("MOUNT"):f==="none"||(l==null?void 0:l.display)==="none"?s("UNMOUNT"):s(d&&p!==f?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,s]),G(()=>{if(n){let l;const d=n.ownerDocument.defaultView??window,u=f=>{const w=ke(r.current).includes(CSS.escape(f.animationName));if(f.target===n&&w&&(s("ANIMATION_END"),!o.current)){const C=n.style.animationFillMode;n.style.animationFillMode="forwards",l=d.setTimeout(()=>{n.style.animationFillMode==="forwards"&&(n.style.animationFillMode=C)})}},p=f=>{f.target===n&&(i.current=ke(r.current))};return n.addEventListener("animationstart",p),n.addEventListener("animationcancel",u),n.addEventListener("animationend",u),()=>{d.clearTimeout(l),n.removeEventListener("animationstart",p),n.removeEventListener("animationcancel",u),n.removeEventListener("animationend",u)}}else s("ANIMATION_END")},[n,s]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:m.useCallback(l=>{r.current=l?getComputedStyle(l):null,t(l)},[])}}function ke(e){return(e==null?void 0:e.animationName)||"none"}function Eo(e){var r,o;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var Ro=jn[" useInsertionEffect ".trim().toString()]||G;function So({prop:e,defaultProp:n,onChange:t=()=>{},caller:r}){const[o,i,a]=Mo({defaultProp:n,onChange:t}),c=e!==void 0,s=c?e:o;{const d=m.useRef(e!==void 0);m.useEffect(()=>{const u=d.current;u!==c&&console.warn(`${r} is changing from ${u?"controlled":"uncontrolled"} to ${c?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=c},[c,r])}const l=m.useCallback(d=>{var u;if(c){const p=Ao(d)?d(e):d;p!==e&&((u=a.current)==null||u.call(a,p))}else i(d)},[c,e,i,a]);return[s,l]}function Mo({defaultProp:e,onChange:n}){const[t,r]=m.useState(e),o=m.useRef(t),i=m.useRef(n);return Ro(()=>{i.current=n},[n]),m.useEffect(()=>{var a;o.current!==t&&((a=i.current)==null||a.call(i,t),o.current=t)},[t,o]),[t,r,i]}function Ao(e){return typeof e=="function"}var Po=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),jo="VisuallyHidden",at=m.forwardRef((e,n)=>h.jsx(ne.span,{...e,ref:n,style:{...Po,...e.style}}));at.displayName=jo;var Lo=at,[Ne]=Nn("Tooltip",[Qn]),Te=Qn(),lt="TooltipProvider",Oo=700,We="tooltip.open",[No,Ke]=Ne(lt),ct=e=>{const{__scopeTooltip:n,delayDuration:t=Oo,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:i}=e,a=m.useRef(!0),c=m.useRef(!1),s=m.useRef(0);return m.useEffect(()=>{const l=s.current;return()=>window.clearTimeout(l)},[]),h.jsx(No,{scope:n,isOpenDelayedRef:a,delayDuration:t,onOpen:m.useCallback(()=>{window.clearTimeout(s.current),a.current=!1},[]),onClose:m.useCallback(()=>{window.clearTimeout(s.current),s.current=window.setTimeout(()=>a.current=!0,r)},[r]),isPointerInTransitRef:c,onPointerInTransitChange:m.useCallback(l=>{c.current=l},[]),disableHoverableContent:o,children:i})};ct.displayName=lt;var fe="Tooltip",[To,ge]=Ne(fe),dt=e=>{const{__scopeTooltip:n,children:t,open:r,defaultOpen:o,onOpenChange:i,disableHoverableContent:a,delayDuration:c}=e,s=Ke(fe,e.__scopeTooltip),l=Te(n),[d,u]=m.useState(null),p=tr(),f=m.useRef(0),x=a??s.disableHoverableContent,w=c??s.delayDuration,C=m.useRef(!1),[b,k]=So({prop:r,defaultProp:o??!1,onChange:y=>{y?(s.onOpen(),document.dispatchEvent(new CustomEvent(We))):s.onClose(),i==null||i(y)},caller:fe}),R=m.useMemo(()=>b?C.current?"delayed-open":"instant-open":"closed",[b]),v=m.useCallback(()=>{window.clearTimeout(f.current),f.current=0,C.current=!1,k(!0)},[k]),S=m.useCallback(()=>{window.clearTimeout(f.current),f.current=0,k(!1)},[k]),g=m.useCallback(()=>{window.clearTimeout(f.current),f.current=window.setTimeout(()=>{C.current=!0,k(!0),f.current=0},w)},[w,k]);return m.useEffect(()=>()=>{f.current&&(window.clearTimeout(f.current),f.current=0)},[]),h.jsx(xo,{...l,children:h.jsx(To,{scope:n,contentId:p,open:b,stateAttribute:R,trigger:d,onTriggerChange:u,onTriggerEnter:m.useCallback(()=>{s.isOpenDelayedRef.current?g():v()},[s.isOpenDelayedRef,g,v]),onTriggerLeave:m.useCallback(()=>{x?S():(window.clearTimeout(f.current),f.current=0)},[S,x]),onOpen:v,onClose:S,disableHoverableContent:x,children:t})})};dt.displayName=fe;var Ue="TooltipTrigger",ut=m.forwardRef((e,n)=>{const{__scopeTooltip:t,...r}=e,o=ge(Ue,t),i=Ke(Ue,t),a=Te(t),c=m.useRef(null),s=ie(n,c,o.onTriggerChange),l=m.useRef(!1),d=m.useRef(!1),u=m.useCallback(()=>l.current=!1,[]);return m.useEffect(()=>()=>document.removeEventListener("pointerup",u),[u]),h.jsx(yo,{asChild:!0,...a,children:h.jsx(ne.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:s,onPointerMove:Y(e.onPointerMove,p=>{p.pointerType!=="touch"&&!d.current&&!i.isPointerInTransitRef.current&&(o.onTriggerEnter(),d.current=!0)}),onPointerLeave:Y(e.onPointerLeave,()=>{o.onTriggerLeave(),d.current=!1}),onPointerDown:Y(e.onPointerDown,()=>{o.open&&o.onClose(),l.current=!0,document.addEventListener("pointerup",u,{once:!0})}),onFocus:Y(e.onFocus,()=>{l.current||o.onOpen()}),onBlur:Y(e.onBlur,o.onClose),onClick:Y(e.onClick,o.onClose)})})});ut.displayName=Ue;var en="TooltipPortal",[Io,Do]=Ne(en,{forceMount:void 0}),pt=e=>{const{__scopeTooltip:n,forceMount:t,children:r,container:o}=e,i=ge(en,n);return h.jsx(Io,{scope:n,forceMount:t,children:h.jsx(Ge,{present:t||i.open,children:h.jsx(st,{asChild:!0,container:o,children:r})})})};pt.displayName=en;var le="TooltipContent",mt=m.forwardRef((e,n)=>{const t=Do(le,e.__scopeTooltip),{forceMount:r=t.forceMount,side:o="top",...i}=e,a=ge(le,e.__scopeTooltip);return h.jsx(Ge,{present:r||a.open,children:a.disableHoverableContent?h.jsx(ft,{side:o,...i,ref:n}):h.jsx(Bo,{side:o,...i,ref:n})})}),Bo=m.forwardRef((e,n)=>{const t=ge(le,e.__scopeTooltip),r=Ke(le,e.__scopeTooltip),o=m.useRef(null),i=ie(n,o),[a,c]=m.useState(null),{trigger:s,onClose:l}=t,d=o.current,{onPointerInTransitChange:u}=r,p=m.useCallback(()=>{c(null),u(!1)},[u]),f=m.useCallback((x,w)=>{const C=x.currentTarget,b={x:x.clientX,y:x.clientY},k=Ho(b,C.getBoundingClientRect()),R=Wo(b,k),v=Uo(w.getBoundingClientRect()),S=Xo([...R,...v]);c(S),u(!0)},[u]);return m.useEffect(()=>()=>p(),[p]),m.useEffect(()=>{if(s&&d){const x=C=>f(C,d),w=C=>f(C,s);return s.addEventListener("pointerleave",x),d.addEventListener("pointerleave",w),()=>{s.removeEventListener("pointerleave",x),d.removeEventListener("pointerleave",w)}}},[s,d,f,p]),m.useEffect(()=>{if(a){const x=w=>{const C=w.target,b={x:w.clientX,y:w.clientY},k=(s==null?void 0:s.contains(C))||(d==null?void 0:d.contains(C)),R=!zo(b,a);k?p():R&&(p(),l())};return document.addEventListener("pointermove",x),()=>document.removeEventListener("pointermove",x)}},[s,d,a,l,p]),h.jsx(ft,{...e,ref:i})}),[$o,Fo]=Ne(fe,{isInside:!1}),_o=_t("TooltipContent"),ft=m.forwardRef((e,n)=>{const{__scopeTooltip:t,children:r,"aria-label":o,onEscapeKeyDown:i,onPointerDownOutside:a,...c}=e,s=ge(le,t),l=Te(t),{onClose:d}=s;return m.useEffect(()=>(document.addEventListener(We,d),()=>document.removeEventListener(We,d)),[d]),m.useEffect(()=>{if(s.trigger){const u=p=>{const f=p.target;f!=null&&f.contains(s.trigger)&&d()};return window.addEventListener("scroll",u,{capture:!0}),()=>window.removeEventListener("scroll",u,{capture:!0})}},[s.trigger,d]),h.jsx(Dn,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:i,onPointerDownOutside:a,onFocusOutside:u=>u.preventDefault(),onDismiss:d,children:h.jsxs(wo,{"data-state":s.stateAttribute,...l,...c,ref:n,style:{...c.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[h.jsx(_o,{children:r}),h.jsx($o,{scope:t,isInside:!0,children:h.jsx(Lo,{id:s.contentId,role:"tooltip",children:o||r})})]})})});mt.displayName=le;var ht="TooltipArrow",gt=m.forwardRef((e,n)=>{const{__scopeTooltip:t,...r}=e,o=Te(t);return Fo(ht,t).isInside?null:h.jsx(bo,{...o,...r,ref:n})});gt.displayName=ht;function Ho(e,n){const t=Math.abs(n.top-e.y),r=Math.abs(n.bottom-e.y),o=Math.abs(n.right-e.x),i=Math.abs(n.left-e.x);switch(Math.min(t,r,o,i)){case i:return"left";case o:return"right";case t:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function Wo(e,n,t=5){const r=[];switch(n){case"top":r.push({x:e.x-t,y:e.y+t},{x:e.x+t,y:e.y+t});break;case"bottom":r.push({x:e.x-t,y:e.y-t},{x:e.x+t,y:e.y-t});break;case"left":r.push({x:e.x+t,y:e.y-t},{x:e.x+t,y:e.y+t});break;case"right":r.push({x:e.x-t,y:e.y-t},{x:e.x-t,y:e.y+t});break}return r}function Uo(e){const{top:n,right:t,bottom:r,left:o}=e;return[{x:o,y:n},{x:t,y:n},{x:t,y:r},{x:o,y:r}]}function zo(e,n){const{x:t,y:r}=e;let o=!1;for(let i=0,a=n.length-1;i<n.length;a=i++){const c=n[i],s=n[a],l=c.x,d=c.y,u=s.x,p=s.y;d>r!=p>r&&t<(u-l)*(r-d)/(p-d)+l&&(o=!o)}return o}function Xo(e){const n=e.slice();return n.sort((t,r)=>t.x<r.x?-1:t.x>r.x?1:t.y<r.y?-1:t.y>r.y?1:0),Zo(n)}function Zo(e){if(e.length<=1)return e.slice();const n=[];for(let r=0;r<e.length;r++){const o=e[r];for(;n.length>=2;){const i=n[n.length-1],a=n[n.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))n.pop();else break}n.push(o)}n.pop();const t=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;t.length>=2;){const i=t[t.length-1],a=t[t.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))t.pop();else break}t.push(o)}return t.pop(),n.length===1&&t.length===1&&n[0].x===t[0].x&&n[0].y===t[0].y?n:n.concat(t)}var Yo=ct,Jo=dt,Vo=ut,qo=pt,Qo=mt,Go=gt;const Ko=({children:e})=>h.jsx(Yo,{delayDuration:200,children:e}),nn=({content:e,children:n})=>h.jsxs(Jo,{children:[h.jsx(Vo,{asChild:!0,children:n}),h.jsx(qo,{children:h.jsxs(Qo,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,h.jsx(Go,{className:"fill-secondary",width:8,height:4})]})})]}),ei=({value:e,className:n="",...t})=>h.jsxs("form",{action:"https://codesandbox.io/api/v1/sandboxes/define",method:"POST",target:"_blank",children:[h.jsx("input",{type:"hidden",name:"parameters",value:e}),h.jsx(nn,{content:"Edit example on codesandbox",children:h.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...t,children:h.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),h.jsx("polyline",{points:"7.5 4.21 12 6.81 16.5 4.21"}),h.jsx("polyline",{points:"7.5 19.79 7.5 14.6 3 12"}),h.jsx("polyline",{points:"21 12 16.5 14.6 16.5 19.79"}),h.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),h.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})})})]}),ni=()=>h.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:h.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function ti({children:e,path:n}){return h.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[n&&h.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:h.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:n})}),h.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const xt=m.forwardRef(({isActive:e,children:n,className:t="",...r},o)=>h.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...r,children:n}));xt.displayName="Link";const ri=({files:e,template:n="typescript",className:t="",...r})=>h.jsxs("form",{action:"https://stackblitz.com/run",method:"POST",target:"_blank",children:[h.jsx("input",{type:"hidden",name:"project[title]",value:"Joymap Example"}),h.jsx("input",{type:"hidden",name:"project[template]",value:n}),Object.entries(e).map(([o,i])=>i.isBinary?null:h.jsx("input",{type:"hidden",name:`project[files][${o}]`,value:i.content},o)),h.jsx(nn,{content:"Edit example on stackblitz",children:h.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...r,children:h.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:h.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})]}),oi="/joymap/assets/logo-BXshXfNv.png";var yt={exports:{}};(function(e){var n=function(){var t=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={};function a(s,l){if(!i[s]){i[s]={};for(var d=0;d<s.length;d++)i[s][s.charAt(d)]=d}return i[s][l]}var c={compressToBase64:function(s){if(s==null)return"";var l=c._compress(s,6,function(d){return r.charAt(d)});switch(l.length%4){default:case 0:return l;case 1:return l+"===";case 2:return l+"==";case 3:return l+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:c._decompress(s.length,32,function(l){return a(r,s.charAt(l))})},compressToUTF16:function(s){return s==null?"":c._compress(s,15,function(l){return t(l+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:c._decompress(s.length,16384,function(l){return s.charCodeAt(l)-32})},compressToUint8Array:function(s){for(var l=c.compress(s),d=new Uint8Array(l.length*2),u=0,p=l.length;u<p;u++){var f=l.charCodeAt(u);d[u*2]=f>>>8,d[u*2+1]=f%256}return d},decompressFromUint8Array:function(s){if(s==null)return c.decompress(s);for(var l=new Array(s.length/2),d=0,u=l.length;d<u;d++)l[d]=s[d*2]*256+s[d*2+1];var p=[];return l.forEach(function(f){p.push(t(f))}),c.decompress(p.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":c._compress(s,6,function(l){return o.charAt(l)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),c._decompress(s.length,32,function(l){return a(o,s.charAt(l))}))},compress:function(s){return c._compress(s,16,function(l){return t(l)})},_compress:function(s,l,d){if(s==null)return"";var u,p,f={},x={},w="",C="",b="",k=2,R=3,v=2,S=[],g=0,y=0,E;for(E=0;E<s.length;E+=1)if(w=s.charAt(E),Object.prototype.hasOwnProperty.call(f,w)||(f[w]=R++,x[w]=!0),C=b+w,Object.prototype.hasOwnProperty.call(f,C))b=C;else{if(Object.prototype.hasOwnProperty.call(x,b)){if(b.charCodeAt(0)<256){for(u=0;u<v;u++)g=g<<1,y==l-1?(y=0,S.push(d(g)),g=0):y++;for(p=b.charCodeAt(0),u=0;u<8;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1}else{for(p=1,u=0;u<v;u++)g=g<<1|p,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=0;for(p=b.charCodeAt(0),u=0;u<16;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1}k--,k==0&&(k=Math.pow(2,v),v++),delete x[b]}else for(p=f[b],u=0;u<v;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1;k--,k==0&&(k=Math.pow(2,v),v++),f[C]=R++,b=String(w)}if(b!==""){if(Object.prototype.hasOwnProperty.call(x,b)){if(b.charCodeAt(0)<256){for(u=0;u<v;u++)g=g<<1,y==l-1?(y=0,S.push(d(g)),g=0):y++;for(p=b.charCodeAt(0),u=0;u<8;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1}else{for(p=1,u=0;u<v;u++)g=g<<1|p,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=0;for(p=b.charCodeAt(0),u=0;u<16;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1}k--,k==0&&(k=Math.pow(2,v),v++),delete x[b]}else for(p=f[b],u=0;u<v;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1;k--,k==0&&(k=Math.pow(2,v),v++)}for(p=2,u=0;u<v;u++)g=g<<1|p&1,y==l-1?(y=0,S.push(d(g)),g=0):y++,p=p>>1;for(;;)if(g=g<<1,y==l-1){S.push(d(g));break}else y++;return S.join("")},decompress:function(s){return s==null?"":s==""?null:c._decompress(s.length,32768,function(l){return s.charCodeAt(l)})},_decompress:function(s,l,d){var u=[],p=4,f=4,x=3,w="",C=[],b,k,R,v,S,g,y,E={val:d(0),position:l,index:1};for(b=0;b<3;b+=1)u[b]=b;for(R=0,S=Math.pow(2,2),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;switch(R){case 0:for(R=0,S=Math.pow(2,8),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;y=t(R);break;case 1:for(R=0,S=Math.pow(2,16),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;y=t(R);break;case 2:return""}for(u[3]=y,k=y,C.push(y);;){if(E.index>s)return"";for(R=0,S=Math.pow(2,x),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;switch(y=R){case 0:for(R=0,S=Math.pow(2,8),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;u[f++]=t(R),y=f-1,p--;break;case 1:for(R=0,S=Math.pow(2,16),g=1;g!=S;)v=E.val&E.position,E.position>>=1,E.position==0&&(E.position=l,E.val=d(E.index++)),R|=(v>0?1:0)*g,g<<=1;u[f++]=t(R),y=f-1,p--;break;case 2:return C.join("")}if(p==0&&(p=Math.pow(2,x),x++),u[y])w=u[y];else if(y===f)w=k+k.charAt(0);else return null;C.push(w),u[f++]=k+w.charAt(0),p--,k=w,p==0&&(p=Math.pow(2,x),x++)}}};return c}();e!=null?e.exports=n:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return n})})(yt);var ii=yt.exports;const si=Lt(ii),ai="2.2.4",li={lodash:"^4.17.21"},ci={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},Q={version:ai,dependencies:li,devDependencies:ci},{devDependencies:re,version:di}=Q,ui=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/public\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("bulletUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/bullet.png'"],[new RegExp("smallBulletUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/smallBullet.png'"],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L2.png'"]];function _(e){return ui.reduce((n,[t,r])=>n.replaceAll(t,r),e)}const xe={isBinary:!1,content:JSON.stringify({compilerOptions:{target:"esnext",module:"commonjs",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}})};function ye({dependencies:e={},devDependencies:n={},hasLodash:t=!0,hasReact:r=!1,reactScripts:o=!1}={}){return JSON.stringify({main:"./index.ts",dependencies:{joymap:Q.version,tslib:"latest",...t?{lodash:Q.dependencies.lodash}:{},...r?{react:Q.devDependencies.react,"react-dom":Q.devDependencies["react-dom"]}:{},...e},devDependencies:{...t?{"@types/lodash":Q.devDependencies["@types/lodash"]}:{},...r?{"@types/react":Q.devDependencies["@types/react"],"@types/react-dom":Q.devDependencies["@types/react-dom"]}:{},...o?{"react-scripts":"latest"}:{parcel:"latest"},...n},...o?{scripts:{start:"react-scripts start",build:"react-scripts build"}}:{}})}function pe(e){const n=JSON.stringify({files:e});return si.compressToBase64(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const pi=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
\r
import { CommandValue } from './commands';\r
\r
export function setCursor(model: Model | undefined, direction?: CommandValue) {\r
  model?.change((writer) => {\r
    if (direction === 'backward' || direction === 'forward') {\r
      writer.model.modifySelection(writer.model.document.selection, { direction });\r
\r
      const curr =\r
        direction === 'backward'\r
          ? writer.model.document.selection.getFirstPosition()\r
          : writer.model.document.selection.getLastPosition();\r
      if (curr) {\r
        writer.setSelection(writer.createPositionFromPath(curr.root, curr.path));\r
      }\r
    } else {\r
      const root = model.document.getRoot();\r
      if (root) {\r
        writer.setSelection(writer.createPositionAt(root, direction === 'downward' ? 'end' : 0));\r
      }\r
    }\r
  });\r
}\r
\r
export function setSelection(model: Model | undefined, direction?: CommandValue) {\r
  model?.change((writer) => {\r
    if (direction === 'backward' || direction === 'forward') {\r
      writer.model.modifySelection(writer.model.document.selection, { direction });\r
    } else {\r
      const root = model.document.getRoot();\r
      if (root) {\r
        const start =\r
          direction === 'downward'\r
            ? writer.model.document.selection.getFirstPosition()\r
            : writer.createPositionAt(root, 0);\r
        const end =\r
          direction === 'downward'\r
            ? writer.createPositionAt(root, 'end')\r
            : writer.model.document.selection.getLastPosition();\r
        const range = writer.createRange(start!, end || undefined);\r
\r
        writer.setSelection(range);\r
      }\r
    }\r
  });\r
}\r
\r
export function executeCommand(editor: ClassicEditor, commandName: string, value?: CommandValue) {\r
  if (commandName === 'move') {\r
    setCursor(editor.model, value);\r
  } else if (commandName === 'select') {\r
    setSelection(editor.model, value);\r
  } else {\r
    if (value) {\r
      editor.execute(commandName, typeof value === 'function' ? value() : value);\r
    } else {\r
      editor.execute(commandName);\r
    }\r
  }\r
}\r
`,mi=`import { LoremIpsum } from 'lorem-ipsum';\r
\r
const lorem = new LoremIpsum({\r
  sentencesPerParagraph: {\r
    max: 8,\r
    min: 4,\r
  },\r
  wordsPerSentence: {\r
    max: 16,\r
    min: 4,\r
  },\r
});\r
\r
type CommandName =\r
  | 'move'\r
  | 'select'\r
  | 'input'\r
  | 'delete'\r
  | 'forwardDelete'\r
  | 'numberedList'\r
  | 'bulletedList'\r
  | 'enter'\r
  | 'bold'\r
  | 'italic'\r
  | 'blockQuote'\r
  | 'undo'\r
  | 'redo';\r
\r
export type CommandPrimitive = string | { text: string };\r
export type CommandValue = CommandPrimitive | (() => CommandPrimitive);\r
export type Command = [CommandName] | [CommandName, CommandValue];\r
\r
export const commands: Record<string, [Command, Command, Command, Command]> = {\r
  dpadUp: [\r
    ['move', 'upward'],\r
    ['select', 'upward'],\r
    ['input', { text: '👆' }],\r
    ['input', { text: '👍' }],\r
  ],\r
  dpadDown: [\r
    ['move', 'downward'],\r
    ['select', 'downward'],\r
    ['input', { text: '👇' }],\r
    ['input', { text: '👎' }],\r
  ],\r
  dpadLeft: [\r
    ['move', 'backward'],\r
    ['select', 'backward'],\r
    ['input', { text: '👈' }],\r
    ['input', { text: '🤛' }],\r
  ],\r
  dpadRight: [\r
    ['move', 'forward'],\r
    ['select', 'forward'],\r
    ['input', { text: '👉' }],\r
    ['input', { text: '🤜' }],\r
  ],\r
  A: [\r
    ['input', { text: '😂' }],\r
    ['input', { text: '🤣' }],\r
    ['input', { text: '❤️' }],\r
    ['input', { text: '😍' }],\r
  ],\r
  B: [\r
    ['input', { text: '😊' }],\r
    ['input', { text: '🤪' }],\r
    ['input', { text: '😭' }],\r
    ['input', { text: '🙏' }],\r
  ],\r
  X: [['delete'], ['forwardDelete'], ['numberedList'], ['bulletedList']],\r
  Y: [['enter'], ['bold'], ['italic'], ['blockQuote']],\r
  start: [\r
    ['input', { text: '💩' }],\r
    ['input', { text: '🔥' }],\r
    ['input', { text: '🤔' }],\r
    ['input', { text: '✔' }],\r
  ],\r
  select: [\r
    ['undo'],\r
    ['redo'],\r
    ['input', () => ({ text: \` \${lorem.generateWords(1)}\` })],\r
    ['input', () => ({ text: \` \${lorem.generateSentences(1)}\` })],\r
  ],\r
  home: [\r
    ['input', { text: '🍑' }],\r
    ['input', { text: '🍆' }],\r
    ['input', { text: '🍌' }],\r
    ['input', { text: '🦠' }],\r
  ],\r
};\r
`,fi=`body {
  color: #eee;
  background-color: #282828;
}

h1,
h2,
h3 {
  color: #ddd;
}

:root {
  /* Helper variables to avoid duplication in the colors. */

  --ck-custom-foreground: hsl(255, 3%, 18%);
  --ck-custom-border: hsl(300, 1%, 22%);
  --ck-custom-white: hsl(0, 0%, 100%);

  /* -- Overrides generic colors. ------------------------------------------------------------- */

  --ck-content-font-color: var(--ck-custom-white);

  --ck-color-base-background: hsl(270, 1%, 29%);
  --ck-color-base-border: hsl(240, 4%, 24%);

  --ck-color-focus-border: hsl(208, 90%, 62%);
  --ck-color-text: hsl(0, 0%, 98%);
  --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
  --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);

  /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

  --ck-color-button-default-hover-background: hsl(270, 1%, 22%);
  --ck-color-button-default-active-background: hsl(270, 2%, 20%);
  --ck-color-button-default-active-shadow: hsl(270, 2%, 23%);

  --ck-color-button-on-background: var(--ck-custom-foreground);
  --ck-color-button-on-hover-background: hsl(255, 4%, 16%);
  --ck-color-button-on-active-background: hsl(255, 4%, 14%);
  --ck-color-button-on-active-shadow: hsl(240, 3%, 19%);
  --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

  --ck-color-button-action-background: hsl(168, 76%, 42%);
  --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
  --ck-color-button-action-active-background: hsl(168, 76%, 36%);
  --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
  --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
  --ck-color-button-action-text: var(--ck-custom-white);

  --ck-color-button-save: hsl(120, 100%, 46%);
  --ck-color-button-cancel: hsl(15, 100%, 56%);

  /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

  --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

  /* -- Overrides the default .ck-dialog class colors. ----------------------------------- */

  --ck-color-dialog-form-header-border: var(--ck-custom-border);

  /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

  --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
  --ck-color-split-button-hover-border: var(--ck-custom-foreground);

  /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

  --ck-color-input-border: hsl(257, 3%, 43%);
  --ck-color-input-text: hsl(0, 0%, 98%);
  --ck-color-input-disabled-background: hsl(255, 4%, 21%);
  --ck-color-input-disabled-border: hsl(250, 3%, 38%);
  --ck-color-input-disabled-text: hsl(0, 0%, 78%);

  /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

  --ck-color-list-button-hover-background: var(--ck-custom-foreground);
  --ck-color-list-button-on-background: hsl(208, 88%, 52%);
  --ck-color-list-button-on-text: var(--ck-custom-white);

  /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

  --ck-color-panel-border: var(--ck-custom-border);

  /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

  --ck-color-toolbar-border: var(--ck-custom-border);

  /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

  --ck-color-tooltip-background: hsl(252, 7%, 14%);
  --ck-color-tooltip-text: hsl(0, 0%, 93%);

  /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

  --ck-content-color-image-caption-background: hsl(0, 0%, 97%);
  --ck-content-color-image-caption-text: hsl(0, 0%, 20%);

  /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

  --ck-color-widget-blurred-border: hsl(0, 0%, 87%);
  --ck-color-widget-hover-border: hsl(43, 100%, 68%);
  --ck-color-widget-editable-focus-background: var(--ck-custom-white);

  /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

  --ck-color-link-default: hsl(190, 100%, 75%);
}

/* Improve displaying links. */
.ck.ck-editor__editable a {
  color: hsl(210, 100%, 63%);
}

/* Improve displaying code blocks. */
.ck-content pre {
  color: hsl(0, 0%, 91%);
  border-color: hsl(0, 0%, 77%);
}

`,hi=`import React, { useEffect, useState } from 'react';\r
import { CKEditor } from '@ckeditor/ckeditor5-react';\r
import { Bold, ClassicEditor, Essentials, Italic, List, Paragraph } from 'ckeditor5';\r
import { createEventModule, createJoymap, StickResult } from 'joymap';\r
import { createRoot } from 'react-dom/client';\r
\r
import 'ckeditor5/ckeditor5.css';\r
import './custom.css';\r
\r
import { executeCommand } from './ckHelpers';\r
import { commands } from './commands';\r
\r
const joymap = createJoymap();\r
const module = createEventModule();\r
joymap.addModule(module);\r
\r
const initialData = \`\r
  <h2>To <i>enhance</i> your experience, please connect a gamepad.</h2>\r
  <p>You can move the text cursor, select, print emojis and much much more from the comfort of your gamepad.</p>\r
  <p>Alternatively you can do all those things with a keyboard but that's boring.</p>\r
  <p>The buttons used in this demo are the following: Dpad, Face buttons (X, Y, A & B), R1, L1, Start, Select and Home.</p>\r
\`;\r
\r
function getInputIndex(value1: boolean, value2: boolean) {\r
  if (value1 && value2) {\r
    return 3;\r
  }\r
\r
  if (!value1 && value2) {\r
    return 2;\r
  }\r
\r
  if (value1 && !value2) {\r
    return 1;\r
  }\r
\r
  return 0;\r
}\r
\r
function hookCompositeEvents(editor: ClassicEditor) {\r
  Object.entries(commands).forEach(([inputName, commandParams]) => {\r
    let delayCount = 0;\r
    let prevCommand = -1;\r
    module.addEvent(\`\${inputName} || (\${inputName} && (L1 || R1))\`, ([input, L1, R1]: any[]) => {\r
      if (editor) {\r
        const i = getInputIndex(L1.pressed, R1.pressed);\r
\r
        if (delayCount > 40 || input.justChanged) {\r
          if (i !== prevCommand) {\r
            delayCount = 0;\r
          }\r
          executeCommand(editor, commandParams[i][0], commandParams[i][1]);\r
          prevCommand = i;\r
        }\r
        delayCount += 1;\r
      }\r
    });\r
\r
    module.addEvent(\`\${inputName}.justReleased\`, () => {\r
      delayCount = 0;\r
    });\r
  });\r
}\r
\r
function getRad(coordinates: number[]) {\r
  return Math.atan2(coordinates[1], coordinates[0]);\r
}\r
\r
function getDist(coordinates: number[]) {\r
  return Math.sqrt(coordinates[0] ** 2 + coordinates[1] ** 2);\r
}\r
\r
const fontFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];\r
const angleRange = 360 / fontFamilies.length;\r
\r
function Main() {\r
  const [editor, setEditor] = useState<ClassicEditor | null>();\r
  const [intensity, setIntensity] = useState(0);\r
  const [angle, setAngle] = useState(0);\r
  const [font, setFont] = useState('inherit');\r
\r
  useEffect(() => {\r
    if (editor) {\r
      hookCompositeEvents(editor);\r
\r
      module.addEvent('R', ([RStick]) => {\r
        setIntensity(getDist((RStick as StickResult).value));\r
        setAngle(getRad((RStick as StickResult).value));\r
      });\r
\r
      module.addEvent('L', ([LStick]) => {\r
        const deg = 180 + (getRad((LStick as StickResult).value) * 180) / Math.PI;\r
        const activation = getDist((LStick as StickResult).value);\r
        if (activation > 0.9) {\r
          setFont(fontFamilies[Math.floor(deg / angleRange)]);\r
        }\r
      });\r
\r
      editor.editing.view.focus();\r
\r
      joymap.start();\r
\r
      return () => joymap.stop();\r
    }\r
    return;\r
  }, [editor]);\r
\r
  return (\r
    <div\r
      style={{\r
        paddingLeft: '2rem',\r
        paddingRight: '2rem',\r
        fontFamily: font,\r
      }}\r
    >\r
      <header\r
        style={{\r
          textAlign: 'center',\r
          transform: \`rotate3d(\${1 - intensity}, \${intensity ** -2}, \${intensity}, \${angle}rad)\`,\r
        }}\r
      >\r
        <h3>EventModule-based example using CKEditor5.</h3>\r
      </header>\r
      <section>\r
        <CKEditor\r
          editor={ClassicEditor}\r
          config={{\r
            plugins: [Essentials, Paragraph, Bold, Italic, List],\r
            toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'numberedList', 'bulletedList'],\r
            initialData,\r
          }}\r
          onReady={(editor) => {\r
            setEditor(editor);\r
          }}\r
        />\r
      </section>\r
    </div>\r
  );\r
}\r
\r
const element = document.createElement('div');\r
document.body.appendChild(element);\r
\r
const root = createRoot(element);\r
root.render(<Main />);\r
`,gi=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Editor</title>\r
    <link rel="icon" type="image/png" href="/joymap/assets/logo.png" />\r
  </head>\r
\r
  <body>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,xi=`import './Editor';\r
`,yi={"Editor.tsx":{content:_(hi),isBinary:!1},"commands.ts":{content:_(mi),isBinary:!1},"custom.css":{content:_(fi),isBinary:!1},"index.ts":{content:_(xi),isBinary:!1},"index.html":{content:gi,isBinary:!1},"ckHelpers.ts":{content:_(pi),isBinary:!1},"package.json":{isBinary:!1,content:ye({hasLodash:!1,hasReact:!0,reactScripts:!0,dependencies:{"@ckeditor/ckeditor5-react":re["@ckeditor/ckeditor5-react"],ckeditor5:re.ckeditor5,"lorem-ipsum":re["lorem-ipsum"]}})},"tsconfig.json":xe},wi=`body {\r
  background-color: #282828;\r
  color: #ddd;\r
  padding: 1rem;\r
  font-family:\r
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\r
    'Noto Color Emoji';\r
}\r
\r
.main-container {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  padding-left: 2rem;\r
  padding-right: 2rem;\r
}\r
\r
.fighting-example {\r
  color: black;\r
  width: 100%;\r
  max-width: 1000px;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  flex-direction: column;\r
}\r
\r
.fighting-example .unplugged {\r
  align-items: center;\r
  justify-content: center;\r
  width: 100%;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.fighting-example .module {\r
  margin-bottom: 2rem;\r
  width: 100%;\r
}\r
\r
.fighting-example .module .name {\r
  text-align: center;\r
  background: #39cccc;\r
  margin: 0.5rem 0;\r
  padding: 0.5rem 0;\r
}\r
\r
.fighting-example .module .inputs {\r
  display: flex;\r
  flex-wrap: wrap;\r
}\r
\r
.fighting-example .module .inputs div {\r
  margin-left: 0.5rem;\r
  margin-bottom: 0.5rem;\r
  padding: 0.25rem 0.5rem;\r
  width: 2.5rem;\r
  text-align: center;\r
}\r
\r
.fighting-example .module .inputs .L {\r
  background-color: #aaaabb;\r
}\r
\r
.fighting-example .module .inputs .R {\r
  background-color: #ccccaa;\r
}\r
\r
.fighting-example .module .inputs .D {\r
  background-color: #bbaacc;\r
}\r
\r
.fighting-example .module .inputs .L3 {\r
  background-color: #aaaa55;\r
}\r
\r
.fighting-example .module .inputs .L2 {\r
  background-color: #bbddff;\r
}\r
\r
.fighting-example .module .inputs .L1 {\r
  background-color: #bbddff;\r
}\r
\r
.fighting-example .module .inputs .R3 {\r
  background-color: #aaaa55;\r
}\r
\r
.fighting-example .module .inputs .R2 {\r
  background-color: #bbee99;\r
}\r
\r
.fighting-example .module .inputs .R1 {\r
  background-color: #bbee99;\r
}\r
\r
.fighting-example .module .inputs .A {\r
  background-color: #ffbbaa;\r
}\r
\r
.fighting-example .module .inputs .B {\r
  background-color: #ffbbaa;\r
}\r
\r
.fighting-example .module .inputs .X {\r
  background-color: #ffbbaa;\r
}\r
\r
.fighting-example .module .inputs .Y {\r
  background-color: #ffbbaa;\r
}\r
\r
.fighting-example .module .inputs .start {\r
  background-color: #aaaaaa;\r
}\r
\r
.fighting-example .module .inputs .select {\r
  background-color: #aaaaaa;\r
}\r
\r
.fighting-example .module .inputs .home {\r
  background-color: #aaaaaa;\r
}\r
`,bi=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Fighting</title>\r
  </head>\r
\r
  <body>\r
    <div id="app"></div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,vi=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
import { compact, concat, filter, flow, forEach, reduce, takeRight } from 'lodash/fp';\r
\r
import './Fighting.css';\r
\r
// TODO: change this example to the event module since it makes more sense\r
// TODO: remove lodash\r
\r
interface Player {\r
  id: string;\r
  module: QueryModule;\r
  history: string[];\r
}\r
\r
const arrows = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘', '→'];\r
const dpadButtons = ['dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight'];\r
const buttons = ['L3', 'L2', 'L1', 'R3', 'R2', 'R1', 'A', 'B', 'X', 'Y'];\r
\r
const players: Player[] = [];\r
const MAX_MOVES = 13;\r
\r
// Populate the app div with some basic html\r
const app = document.getElementById('app')!;\r
app.innerHTML = \`\r
  <div class="main-container" >\r
    <header>\r
      <h3>Display gamepad input like a fighting game's training mode</h3>\r
    </header>\r
    <div class="fighting-example">\r
      <div class="unplugged">\r
        <h3 style="color: white">Waiting for gamepad/s to be connected</h3>\r
      </div>\r
    </div>\r
  </div>\r
\`;\r
\r
function getArrow([x, y]: number[]) {\r
  const radians = Math.atan2(y * -1, x);\r
  if (radians < 0) {\r
    return arrows[8 + Math.round((radians * 4) / Math.PI)];\r
  }\r
  return arrows[Math.round((radians * 4) / Math.PI)];\r
}\r
\r
function createDpadMapper(module: QueryModule) {\r
  let prevArrow: string | null = null;\r
  module.setMapper('dpad', ({ getButtons }) => {\r
    const d = getButtons(...dpadButtons);\r
    const x = d.dpadLeft.pressed ? -1 : d.dpadRight.pressed ? 1 : 0;\r
    const y = d.dpadUp.pressed ? -1 : d.dpadDown.pressed ? 1 : 0;\r
\r
    if (x !== 0 || y !== 0) {\r
      const arrow = getArrow([x, y]);\r
\r
      if (prevArrow === arrow) {\r
        return false;\r
      }\r
\r
      prevArrow = arrow;\r
      return \`D\${arrow}\`;\r
    }\r
\r
    prevArrow = null;\r
    return false;\r
  });\r
}\r
\r
function createStickMapper(module: QueryModule, stickName: string) {\r
  let prevArrow: string | null = null;\r
  module.setMapper(stickName, (m) => {\r
    const { pressed, value } = m.getStick(stickName);\r
    if (pressed) {\r
      const arrow = getArrow(value);\r
\r
      if (prevArrow === arrow) {\r
        return false;\r
      }\r
\r
      prevArrow = arrow;\r
      return stickName + arrow;\r
    }\r
\r
    prevArrow = null;\r
    return false;\r
  });\r
}\r
\r
function createPlayer(joymap: Joymap, padId: string) {\r
  const history: string[] = [];\r
  const module: QueryModule = createQueryModule({ padId });\r
  joymap.addModule(module);\r
\r
  createStickMapper(module, 'L');\r
  createStickMapper(module, 'R');\r
  createDpadMapper(module);\r
\r
  const element = document.createElement('section');\r
  element.className = 'module';\r
  element.innerHTML = \`\r
        <div class="name">Gamepad: \${padId}</div>\r
        <div class="inputs" id="\${padId}">Waiting for inputs...</div>\`;\r
\r
  const mainElement = document.querySelector('.fighting-example') as HTMLElement;\r
  mainElement.appendChild(element);\r
\r
  const unplugged = document.querySelector('.unplugged');\r
  if (unplugged) {\r
    mainElement.removeChild(unplugged);\r
  }\r
\r
  return {\r
    id: padId,\r
    module,\r
    history,\r
  };\r
}\r
\r
// Initial joymap setup\r
const joymap = createJoymap({\r
  onPoll() {\r
    const unusedIds = joymap.getUnusedPadIds();\r
\r
    if (unusedIds.length > 0) {\r
      forEach((padId) => players.push(createPlayer(joymap, padId)), unusedIds);\r
    }\r
\r
    forEach((player) => {\r
      const buttonStates = player.module.getButtons(...buttons);\r
      const mapperStates = player.module.getAllMappers();\r
      player.history = flow(\r
        Object.keys,\r
        filter((name) => buttonStates[name].pressed && buttonStates[name].justChanged),\r
        concat(compact(Object.values(mapperStates))),\r
        concat(player.history),\r
        takeRight(MAX_MOVES),\r
      )(buttonStates);\r
\r
      const newRender = reduce(\r
        (result, value) => {\r
          const className = value.replace(/[^\\x00-\\x7F]/g, '');\r
          return \`\${result} <div class="\${className}">\${value}</div>\`;\r
        },\r
        '',\r
        player.history,\r
      );\r
\r
      const el = document.getElementById(player.id) as HTMLElement;\r
      if (el.innerHTML !== newRender) {\r
        el.innerHTML = newRender;\r
      }\r
    }, players);\r
  },\r
});\r
\r
joymap.start();\r
`,Rn={"index.ts":{content:_(vi),isBinary:!1},"Fighting.css":{content:wi,isBinary:!1},"index.html":{content:bi,isBinary:!1},"package.json":{isBinary:!1,content:ye({hasLodash:!0,hasReact:!1})},"tsconfig.json":xe},ki=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Log</title>\r
    <style>\r
      body {\r
        background-color: #282828;\r
        color: #ddd;\r
        padding: 1rem;\r
        font-family:\r
          ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',\r
          'Segoe UI Symbol', 'Noto Color Emoji';\r
      }\r
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="app"></div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,Ci=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
import { compact, forEach, join } from 'lodash/fp';\r
\r
import { countPressed, renderRows, stringifyInputs, stringifyMappers } from './utils';\r
\r
import './Log.css';\r
\r
// Populate the app div with some basic html\r
const app = document.getElementById('app') as HTMLElement;\r
app.innerHTML = \`\r
  <div class="main-container">\r
    <header>\r
      <h3>Let's log all gamepad inputs</h3>\r
    </header>\r
    <div class="log-example">\r
      <div class="log">\r
      </div>\r
      <div class="unplugged">\r
        <h3>Waiting for gamepad/s to be connected</h3>\r
      </div>\r
    </div>\r
  </div>\r
\`;\r
\r
function log(info: string) {\r
  const logElement = document.querySelector('.log')!;\r
  const first = logElement.firstChild as HTMLElement;\r
\r
  if (first && first.children && first.children[1].innerHTML === info) {\r
    const count = parseInt(first.children[0].innerHTML, 10);\r
    first.children[0].innerHTML = \`\${count + 1} frames\`;\r
  } else {\r
    const element = document.createElement('div');\r
    element.className = 'log-line';\r
    element.innerHTML = \`<span class="log-count">1 frame</span><span>\${info}</span>\`;\r
\r
    logElement.insertBefore(element, logElement.firstChild);\r
    if (logElement.children.length > 20 && logElement.lastChild) {\r
      logElement.removeChild(logElement.lastChild);\r
    }\r
  }\r
}\r
\r
function setupModule(joymap: Joymap, padId: string) {\r
  const m = createQueryModule({ padId });\r
  joymap.addModule(m);\r
\r
  // Set custom buttons\r
  m.setButton('Jump', m.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));\r
  m.setButton('Shoot', m.getButtonIndexes('B'));\r
  m.setButton('LookUp', m.getButtonIndexes('dpadUp'));\r
  m.setButton('LookDown', m.getButtonIndexes('dpadDown'));\r
  m.setButton('LookLeft', m.getButtonIndexes('dpadLeft'));\r
  m.setButton('LookRight', m.getButtonIndexes('dpadRight'));\r
  m.setButton('StickAverage', m.getStickIndexes('L', 'R'));\r
\r
  // Set mappers\r
  m.setMapper('Move', (module) => module.getStick('L').pressed);\r
  m.setMapper('Point', (module) => module.getStick('R').pressed);\r
  m.setMapper('MoveANDPoint', (module) => countPressed(module.getSticks('R', 'L')) === 2);\r
  m.setMapper('MoveXORPoint', (module) => !!(module.getMapper('Move') ^ module.getMapper('Point')));\r
  m.setMapper('CountFace', (module) => countPressed(module.getButtons('A', 'B', 'X', 'Y')));\r
  m.setMapper('CountAll', (module) => {\r
    const buttonCount = countPressed(module.getAllButtons());\r
    const stickCount = countPressed(module.getAllSticks());\r
\r
    if (buttonCount || stickCount) {\r
      return \`Btn:\${buttonCount} Sticks:\${stickCount}\`;\r
    }\r
\r
    return null;\r
  });\r
\r
  const element = document.createElement('section');\r
  element.className = 'module';\r
  const id = m.getPadId();\r
  element.innerHTML = \`\r
    <div class="name">Gamepad: \${id}</div>\r
    <div id="\${id}">Waiting for inputs...</div>\r
  \`;\r
  const mainElement = document.querySelector('.log-example') as HTMLElement;\r
  mainElement.insertBefore(element, mainElement.firstChild);\r
\r
  const unplugged = document.querySelector('.unplugged');\r
  if (unplugged) {\r
    mainElement.removeChild(unplugged);\r
  }\r
}\r
\r
// Flags used to show/hide output separated by input type\r
const showButtons = true;\r
const showSticks = true;\r
const showMappers = true;\r
\r
// Initial joymap setup\r
const joymap = createJoymap({\r
  onPoll() {\r
    const unusedIds = joymap.getUnusedPadIds();\r
\r
    if (unusedIds.length > 0) {\r
      forEach((padId) => setupModule(joymap, padId), unusedIds);\r
    }\r
\r
    forEach((module) => {\r
      const compilation = [\r
        !showButtons ? '' : stringifyInputs(module.getAllButtons()),\r
        !showSticks ? '' : stringifyInputs(module.getAllSticks()),\r
        !showMappers ? '' : stringifyMappers(module.getAllMappers()),\r
      ];\r
\r
      const stringOutput = join(', ', compact(compilation));\r
\r
      if (stringOutput) {\r
        log(stringOutput);\r
\r
        const padElement = document.getElementById(module.getPadId() || '') as HTMLElement;\r
        padElement.innerHTML = renderRows(\r
          compact([\r
            !showButtons\r
              ? null\r
              : {\r
                  inputType: 'buttons',\r
                  compilation: compilation[0],\r
                  displayName: 'Buttons',\r
                },\r
            !showSticks\r
              ? null\r
              : {\r
                  inputType: 'sticks',\r
                  compilation: compilation[1],\r
                  displayName: 'Sticks',\r
                },\r
            !showMappers\r
              ? null\r
              : {\r
                  inputType: 'mappers',\r
                  compilation: compilation[2],\r
                  displayName: 'Mappers',\r
                },\r
          ]),\r
        );\r
      }\r
    }, joymap.getModules() as QueryModule[]);\r
  },\r
});\r
\r
joymap.start();\r
`,Ei=`.main-container {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
}\r
\r
header {\r
  text-align: center;\r
}\r
\r
.log-example {\r
  width: 100%;\r
  max-width: 1000px;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  flex-direction: column;\r
}\r
\r
.log-example .log {\r
  width: 100%;\r
}\r
\r
.log-example .log .log-line {\r
  border-bottom: solid 1px;\r
  padding-bottom: 0.5rem;\r
  margin-bottom: 0.5rem;\r
}\r
\r
.log-example .log .log-count {\r
  background-color: black;\r
  color: white;\r
  border-radius: 4rem;\r
  padding-right: 0.5rem;\r
  padding-left: 0.5rem;\r
  margin-left: 0.5rem;\r
}\r
\r
.log-example .module {\r
  padding-bottom: 1.5rem;\r
  width: 100%;\r
}\r
\r
.log-example .module .name {\r
  color: black;\r
  text-align: center;\r
  background: #39cccc;\r
  margin: 0.5rem 0;\r
  padding: 0.5rem 0;\r
}\r
\r
.log-example .row {\r
  display: flex;\r
  align-items: center;\r
  padding: 0.5rem;\r
  width: 100%;\r
  border-bottom: solid 1px rgba(200, 200, 200, 0.3);\r
  flex-wrap: wrap;\r
}\r
\r
.log-example .input-type {\r
  margin: 0.5rem;\r
  padding: 0.5rem;\r
}\r
\r
.log-example .buttons {\r
  background-color: rgba(200, 200, 200, 0.2);\r
  margin: 0.5rem;\r
  padding: 0.5rem;\r
}\r
\r
.log-example .sticks {\r
  background-color: rgba(100, 200, 200, 0.2);\r
  margin: 0.5rem;\r
  padding: 0.5rem;\r
}\r
\r
.log-example .mappers {\r
  background-color: rgba(200, 200, 200, 0.2);\r
  margin: 0.5rem;\r
  padding: 0.5rem;\r
}\r
`,Ri=`import { InputResult, Mapper } from 'joymap';\r
import { compact, flow, join, map, reduce, split } from 'lodash/fp';\r
\r
// Utility function to count the number of pressed inputs of the given collection\r
export function countPressed(inputs: Record<string, { pressed: boolean }>) {\r
  return reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, inputs);\r
}\r
\r
// Utility function to render to HTML all inputs divided by type\r
export function renderRows(\r
  params: Array<{\r
    displayName: string;\r
    inputType: string;\r
    compilation: string;\r
  }>,\r
) {\r
  return reduce(\r
    (result, { displayName, inputType, compilation }) => \`\${result}\r
      <div class="row">\r
        <span class="input-type">\${displayName}:</span>\r
        \${flow(\r
          split(', '),\r
          compact,\r
          map((value) => \`<span class="\${inputType}">\${value}</span>\`),\r
          join(''),\r
        )(compilation)}\r
      </div>\`,\r
    '',\r
    params,\r
  );\r
}\r
\r
// Utility function to print the state of all activated inputs of a type\r
export function stringifyInputs(inputs: Record<string, InputResult>) {\r
  return reduce(\r
    (result, inputName) => {\r
      const input = inputs[inputName];\r
\r
      if (input.pressed || input.justChanged) {\r
        if (input.type === 'button') {\r
          return \`\${result} \${inputName}: \${input.pressed ? 'pressed' : 'released'}(\${\r
            Math.round(input.value * 100) / 100\r
          }),\`;\r
        }\r
\r
        const [x, y] = input.value;\r
        return \`\${result} \${inputName}: \${input.pressed ? 'pressed' : 'released'}(x: \${\r
          Math.round(x * 100) / 100\r
        }, y: \${Math.round(y * 100) / 100}),\`;\r
      }\r
\r
      return result;\r
    },\r
    '',\r
    Object.keys(inputs),\r
  ).slice(0, -1);\r
}\r
\r
export function stringifyMappers(mappers: Record<string, Mapper>) {\r
  return reduce(\r
    (result, inputName) => {\r
      const mapper = mappers[inputName];\r
\r
      if (mapper) {\r
        return \`\${result} \${inputName}: (\${mapper}),\`;\r
      }\r
\r
      return result;\r
    },\r
    '',\r
    Object.keys(mappers),\r
  ).slice(0, -1);\r
}\r
`,Sn={"index.ts":{content:_(Ci),isBinary:!1},"utils.ts":{content:_(Ri),isBinary:!1},"Log.css":{content:Ei,isBinary:!1},"index.html":{content:ki,isBinary:!1},"package.json":{isBinary:!1,content:ye({hasLodash:!0,hasReact:!1})},"tsconfig.json":xe},Si=`import React, { ReactNode, useState } from 'react';\r
import gamepadUrl from '@/public/assets/gamepad.png';\r
import l1Url from '@/public/assets/L1.png';\r
import l2Url from '@/public/assets/L2.png';\r
import { QueryModule } from 'joymap';\r
\r
export const digitalInputs = {\r
  A: {\r
    borderRadius: '30px',\r
    top: '100px',\r
    right: '45px',\r
    width: '30px',\r
    height: '30px',\r
    transform: 'translate(-25px, 49px)',\r
  },\r
  B: {\r
    borderRadius: '30px',\r
    top: '100px',\r
    right: '45px',\r
    width: '30px',\r
    height: '30px',\r
    transform: 'translateY(25px)',\r
  },\r
  X: {\r
    borderRadius: '30px',\r
    top: '100px',\r
    right: '45px',\r
    width: '30px',\r
    height: '30px',\r
    transform: 'translate(-50px, 25px)',\r
  },\r
  Y: {\r
    borderRadius: '30px',\r
    top: '100px',\r
    right: '45px',\r
    width: '30px',\r
    height: '30px',\r
    transform: 'translateX(-25px)',\r
  },\r
  dpadLeft: {\r
    borderRadius: '10px',\r
    top: '100px',\r
    left: '45px',\r
    width: '40px',\r
    height: '30px',\r
    transform: 'translateY(30px)',\r
  },\r
  dpadRight: {\r
    borderRadius: '10px',\r
    top: '100px',\r
    left: '45px',\r
    width: '40px',\r
    height: '30px',\r
    transform: 'translate(55px, 30px)',\r
  },\r
  dpadDown: {\r
    borderRadius: '10px',\r
    top: '100px',\r
    left: '45px',\r
    width: '30px',\r
    height: '40px',\r
    transform: 'translate(32px, 50px)',\r
  },\r
  dpadUp: {\r
    borderRadius: '10px',\r
    top: '100px',\r
    left: '45px',\r
    width: '30px',\r
    height: '40px',\r
    transform: 'translateX(30px)',\r
  },\r
  start: {\r
    borderRadius: '10px',\r
    top: '106px',\r
    right: '170px',\r
    width: '30px',\r
    height: '30px',\r
  },\r
  select: {\r
    borderRadius: '10px',\r
    top: '106px',\r
    left: '170px',\r
    width: '30px',\r
    height: '30px',\r
  },\r
  home: {\r
    borderRadius: '10px',\r
    top: '144px',\r
    left: '223px',\r
    width: '40px',\r
    height: '40px',\r
  },\r
} as const;\r
type DigitalNames = keyof typeof digitalInputs;\r
\r
const analogInputs = {\r
  L: { left: '150px' },\r
  R: { right: '150px' },\r
} as const;\r
type AnalogNames = keyof typeof analogInputs;\r
\r
const shoulderInputs = {\r
  L2: { backgroundImage: \`url(\${l2Url})\` },\r
  L1: { backgroundImage: \`url(\${l1Url})\` },\r
  R2: { transform: 'scaleX(-1)', backgroundImage: \`url(\${l2Url})\` },\r
  R1: { transform: 'scaleX(-1)', backgroundImage: \`url(\${l1Url})\` },\r
} as const;\r
type ShoulderNames = keyof typeof shoulderInputs;\r
\r
interface GamepadProps {\r
  backgroundColor: string;\r
  pressedColor: string;\r
  module: QueryModule;\r
  name: string;\r
  children: ReactNode;\r
}\r
\r
interface ButtonProps {\r
  pressedColor: string;\r
  module: QueryModule;\r
  setWaitingFor: (value: string | null) => void;\r
}\r
\r
function Stick({\r
  inputName,\r
  pressedColor,\r
  module,\r
  setWaitingFor,\r
}: ButtonProps & { inputName: AnalogNames }) {\r
  const [x, y] = module.getStick(inputName).value;\r
  const { pressed } = module.getButton(\`\${inputName}3\`);\r
  const inputStyle = analogInputs[inputName];\r
\r
  return (\r
    <div\r
      className="absolute bottom-13.25 z-15 h-12.5 w-12.5 cursor-pointer rounded-[40px] border-[3px] border-black bg-gray-500"\r
      style={{\r
        ...inputStyle,\r
        transform: \`translate(\${x * 15}px, \${y * 15}px)\`,\r
        backgroundColor: pressed ? pressedColor : 'gray',\r
      }}\r
      onClick={() => {\r
        if (module.isConnected()) {\r
          module.stickBindOnPress(inputName, () => setWaitingFor(null));\r
          setWaitingFor(inputName);\r
        }\r
      }}\r
    />\r
  );\r
}\r
\r
function Digital({\r
  inputName,\r
  pressedColor,\r
  module,\r
  setWaitingFor,\r
}: ButtonProps & { inputName: DigitalNames }) {\r
  const { pressed } = module.getButton(inputName);\r
  const inputStyle = digitalInputs[inputName];\r
\r
  return (\r
    <div\r
      className="absolute cursor-pointer"\r
      style={{\r
        backgroundColor: pressed ? pressedColor : 'gray',\r
        ...inputStyle,\r
      }}\r
      onClick={() => {\r
        if (module.isConnected()) {\r
          module.buttonBindOnPress(inputName, () => setWaitingFor(null));\r
          setWaitingFor(inputName);\r
        }\r
      }}\r
    />\r
  );\r
}\r
\r
function Shoulder({ inputName, module }: { inputName: ShoulderNames; module: QueryModule }) {\r
  const { value } = module.getButton(inputName);\r
  const inputStyle = shoulderInputs[inputName];\r
\r
  return (\r
    <div className="absolute h-full w-full" style={{ transform: \`translateY(\${value * 10}px)\` }}>\r
      <div className="-mt-2.5 h-full w-full" style={inputStyle} />\r
    </div>\r
  );\r
}\r
\r
export default function Gamepad({\r
  backgroundColor,\r
  pressedColor,\r
  module,\r
  name,\r
  children,\r
}: GamepadProps) {\r
  const [waitingFor, setWaitingFor] = useState<string | null>(null);\r
  const isDisconnected = !module.isConnected();\r
  const filter = isDisconnected ? 'brightness(40%)' : 'none';\r
\r
  return (\r
    <div\r
      style={{\r
        position: 'relative',\r
        flex: 1,\r
        display: 'flex',\r
        justifyContent: 'center',\r
        alignItems: 'center',\r
        flexDirection: 'column',\r
        padding: '1.5rem',\r
        maxWidth: '50%',\r
        border: '4px dashed rgba(0, 0, 0, 0.5)',\r
        minWidth: '500px',\r
        backgroundColor: waitingFor ? 'red' : backgroundColor,\r
        filter,\r
      }}\r
    >\r
      <div style={{ position: 'relative', width: '484px', height: '300px', overflow: 'hidden' }}>\r
        <span\r
          style={{\r
            position: 'absolute',\r
            top: '60px',\r
            width: '100%',\r
            textAlign: 'center',\r
            zIndex: 15,\r
            fontSize: '2rem',\r
            color: pressedColor,\r
          }}\r
        >\r
          {name}\r
        </span>\r
        <img\r
          style={{\r
            position: 'absolute',\r
            width: '100%',\r
            height: '100%',\r
            zIndex: 10,\r
            pointerEvents: 'none',\r
          }}\r
          src={gamepadUrl}\r
        />\r
        {Object.keys(shoulderInputs).map((inputName) => (\r
          <Shoulder key={inputName} inputName={inputName as ShoulderNames} module={module} />\r
        ))}\r
        {Object.keys(analogInputs).map((inputName) => (\r
          <Stick\r
            key={inputName}\r
            inputName={inputName as AnalogNames}\r
            pressedColor={pressedColor}\r
            module={module}\r
            setWaitingFor={setWaitingFor}\r
          />\r
        ))}\r
        {Object.keys(digitalInputs).map((inputName) => (\r
          <Digital\r
            key={inputName}\r
            inputName={inputName as DigitalNames}\r
            pressedColor={pressedColor}\r
            module={module}\r
            setWaitingFor={setWaitingFor}\r
          />\r
        ))}\r
      </div>\r
      {!!waitingFor && (\r
        <div\r
          style={{\r
            position: 'absolute',\r
            display: 'flex',\r
            justifyContent: 'center',\r
            alignItems: 'center',\r
            width: '100%',\r
            height: '100%',\r
            zIndex: 30,\r
            color: 'white',\r
            fontSize: '3rem',\r
            background: 'rgba(0, 0, 0, 0.5)',\r
          }}\r
          onClick={() => {\r
            module.cancelListen();\r
            setWaitingFor(null);\r
          }}\r
        >\r
          Rebinding {waitingFor}\r
        </div>\r
      )}\r
      {children}\r
    </div>\r
  );\r
}\r
`,Mi=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - React</title>\r
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>\r
    <style>\r
      body {\r
        background-color: #282828;\r
        color: #ddd;\r
        padding: 1rem;\r
      }\r
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="app"></div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,Ai=`import './Main';\r
`,Pi=`import React, { useEffect, useState } from 'react';\r
import ColorHash from 'color-hash';\r
import { createJoymap, createQueryModule, QueryModule } from 'joymap';\r
import { createRoot } from 'react-dom/client';\r
import tinycolor from 'tinycolor2';\r
\r
import Gamepad from './Gamepad';\r
\r
interface Player {\r
  name: string;\r
  module: QueryModule;\r
  color: string;\r
}\r
\r
const joymap = createJoymap();\r
const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });\r
\r
const names = ['James', 'Juan', 'John', 'Jim'];\r
\r
// Create a list of players to render\r
const players: Player[] = names.map((name) => {\r
  const module = createQueryModule();\r
  joymap.addModule(module);\r
\r
  return {\r
    name,\r
    module,\r
    color: colorHash.hex(name),\r
  };\r
});\r
\r
// Invert both of the first player's sticks\r
// players[0].module.invertSticks([true, true], 'L', 'R');\r
\r
function Main() {\r
  const [, updateState] = useState(true);\r
\r
  useEffect(() => {\r
    joymap.setOnPoll(() => updateState((s) => !s));\r
    joymap.start();\r
\r
    return joymap.stop;\r
  }, []);\r
\r
  return (\r
    <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>\r
      <header style={{ textAlign: 'center' }}>\r
        <h3>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</h3>\r
      </header>\r
      <section className="mt-4 flex w-full flex-row flex-wrap justify-center gap-4">\r
        {players.map(({ module, name, color }) => (\r
          <Gamepad\r
            key={name}\r
            name={name}\r
            module={module}\r
            backgroundColor={color}\r
            pressedColor={\`#\${tinycolor(color).darken(20).toHex()}\`}\r
          >\r
            <span\r
              style={{\r
                background: '#00000033',\r
                padding: '0.5rem 1rem 0.5rem 1rem',\r
                borderRadius: 20,\r
                color: '#FFF',\r
              }}\r
            >\r
              {module.getPadId() || 'Player has no gamepad assigned'}\r
            </span>\r
          </Gamepad>\r
        ))}\r
      </section>\r
    </div>\r
  );\r
}\r
\r
// Render the root component onto the app html container\r
const root = createRoot(document.getElementById('app')!);\r
root.render(<Main />);\r
`,ji={"index.ts":{content:_(Ai),isBinary:!1},"Main.tsx":{content:_(Pi),isBinary:!1},"Gamepad.tsx":{content:_(Si),isBinary:!1},"index.html":{content:Mi,isBinary:!1},"package.json":{isBinary:!1,content:ye({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":re["color-hash"],tinycolor2:re.tinycolor2},devDependencies:{"@types/color-hash":re["@types/color-hash"],"@types/tinycolor2":re["@types/tinycolor2"]}})},"tsconfig.json":xe},Li=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Rumble</title>\r
    <style>\r
      body {\r
        background-color: #282828;\r
        color: #ddd;\r
        padding: 1rem;\r
      }\r
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="app"></div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,Oi=`// Simple canvas example that doesn't use any other library nor ES6 features\r
import bulletUrl from '@/public/assets/bullet.png';\r
import gamepadUrl from '@/public/assets/gamepad.png';\r
import smallBulletUrl from '@/public/assets/smallBullet.png';\r
import { createJoymap, createQueryModule, QueryModule } from 'joymap';\r
import { uniqueId } from 'lodash/fp';\r
\r
const SIZE = {\r
  width: window.innerWidth,\r
  height: window.innerHeight,\r
  centerX: window.innerWidth * 0.5,\r
  centerY: window.innerHeight * 0.5,\r
};\r
\r
window.addEventListener('resize', () => {\r
  SIZE.width = window.innerWidth;\r
  SIZE.height = window.innerHeight;\r
  SIZE.centerX = window.innerWidth * 0.5;\r
  SIZE.centerY = window.innerHeight * 0.5;\r
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;\r
  canvas.width = SIZE.width;\r
  canvas.height = SIZE.height;\r
});\r
\r
interface Element {\r
  id?: string;\r
  x: number;\r
  y: number;\r
  angle: number;\r
  rotationOffset: number;\r
  width: number;\r
  height: number;\r
}\r
\r
interface Character extends Element {\r
  module: QueryModule;\r
  timeoutSmall: number;\r
  timeoutBig: number;\r
  timeoutSpinning: number;\r
  timeoutChaos: number;\r
}\r
\r
interface Bullet extends Element {\r
  speed: number;\r
  type: 'small' | 'big' | 'spinning' | 'chaos';\r
}\r
\r
const quickFire = 200;\r
const normalFire = 300;\r
const slowFire = 2000;\r
\r
function updateCharacter(character: Character, bullets: Bullet[]) {\r
  const sticks = character.module.getSticks('L', 'R');\r
  const fire = character.module.getButton('R1');\r
  const fireReallyHard = character.module.getButton('R2');\r
  const spinningFire = character.module.getButton('L1');\r
  const chaosFire = character.module.getButton('L2');\r
  const { L, R } = sticks;\r
\r
  // Move the character itself\r
  character.x += L.value[0] * 5;\r
  character.y += L.value[1] * 5;\r
\r
  // Don't assign a new angle if the stick isn't being used\r
  if (R.pressed) {\r
    character.angle = Math.atan2(R.value[1], R.value[0]) + Math.PI * 0.5;\r
  }\r
\r
  const now = Date.now();\r
\r
  if (L.pressed) {\r
    character.module.addRumble(\r
      {\r
        duration: 100,\r
        strongMagnitude: 0,\r
        weakMagnitude: 0.15 * Math.sqrt(L.value[0] ** 2 + L.value[1] ** 2),\r
      },\r
      'humming engines channel',\r
    );\r
  }\r
\r
  if (fire.pressed && now - character.timeoutSmall >= quickFire) {\r
    character.timeoutSmall = now;\r
    bullets.push({\r
      x: character.x,\r
      y: character.y,\r
      angle: character.angle - Math.PI * 0.5,\r
      width: 181 * (Math.random() * 0.3 + 0.3),\r
      height: 87 * (Math.random() * 0.3 + 0.3),\r
      type: 'small',\r
      speed: 20,\r
      rotationOffset: 0,\r
    });\r
\r
    character.module.addRumble(\r
      {\r
        duration: 100,\r
        strongMagnitude: 0,\r
        weakMagnitude: 0.4,\r
      },\r
      'quickfire',\r
    );\r
  }\r
\r
  if (chaosFire.pressed && now - character.timeoutChaos >= normalFire) {\r
    character.timeoutChaos = now;\r
    bullets.push({\r
      x: character.x,\r
      y: character.y,\r
      angle: character.angle - Math.PI * 0.5,\r
      width: 181 * (Math.random() * 0.3 + 0.1),\r
      height: 87 * (Math.random() * 0.3 + 0.1),\r
      type: 'chaos',\r
      speed: 10,\r
      rotationOffset: 0,\r
    });\r
\r
    character.module.addRumble(\r
      [\r
        {\r
          duration: 40,\r
          strongMagnitude: 0.1,\r
          weakMagnitude: 1,\r
        },\r
        40,\r
        {\r
          duration: 80,\r
          strongMagnitude: 0,\r
          weakMagnitude: 0.4,\r
        },\r
        {\r
          duration: 80,\r
          strongMagnitude: 1,\r
          weakMagnitude: 0,\r
        },\r
      ],\r
      'chaosFire',\r
    );\r
  }\r
\r
  if (spinningFire.pressed && now - character.timeoutSpinning >= quickFire) {\r
    character.timeoutSpinning = now;\r
    bullets.push({\r
      x: character.x,\r
      y: character.y,\r
      angle: character.angle - Math.PI * 0.5,\r
      width: 181 * (Math.random() * 0.3 + 0.3),\r
      height: 87 * (Math.random() * 0.3 + 0.3),\r
      type: 'spinning',\r
      speed: 15,\r
      rotationOffset: 0,\r
    });\r
\r
    character.module.addRumble(\r
      {\r
        duration: 100,\r
        strongMagnitude: 0,\r
        weakMagnitude: 1,\r
      },\r
      'spinningFire',\r
    );\r
  }\r
\r
  if (fireReallyHard.pressed && now - character.timeoutBig >= slowFire) {\r
    character.timeoutBig = now;\r
    bullets.push({\r
      x: character.x,\r
      y: character.y,\r
      angle: character.angle - Math.PI * 0.5,\r
      width: 374 * (Math.random() * 0.3 + 0.7),\r
      height: 152 * (Math.random() * 0.3 + 0.7),\r
      type: 'big',\r
      speed: 8,\r
      rotationOffset: 0,\r
    });\r
\r
    character.module.addRumble(\r
      {\r
        duration: 300,\r
        strongMagnitude: 1,\r
        weakMagnitude: 1,\r
      },\r
      'bigBoom',\r
    );\r
  }\r
}\r
\r
function createCharacter(\r
  padId: string,\r
  { width, height }: { width: number; height: number },\r
): Character {\r
  return {\r
    module: createQueryModule({ padId, autoConnect: false }),\r
    id: uniqueId(''),\r
    x: Math.random() * width,\r
    y: Math.random() * height,\r
    angle: Math.random() * 2 * Math.PI,\r
    width: 242,\r
    height: 150,\r
    timeoutSmall: Date.now(),\r
    timeoutBig: Date.now(),\r
    timeoutSpinning: Date.now(),\r
    timeoutChaos: Date.now(),\r
    rotationOffset: 0,\r
  };\r
}\r
\r
const characters: Character[] = [];\r
let bullets: Bullet[] = [];\r
\r
const app = document.getElementById('app') as HTMLElement;\r
app.innerHTML = \`\r
  <article style="text-align: center;">\r
    <canvas\r
      id="canvas"\r
      style="position: absolute; width: 100%; height: 100%; left: 0; right: 0; bottom: 0; top: 0;"\r
      width="\${SIZE.width}"\r
      height="\${SIZE.height}"\r
    />\r
  </article>\r
\`;\r
\r
const gamepadImage = new Image();\r
gamepadImage.src = gamepadUrl;\r
\r
const bulletImage = new Image();\r
bulletImage.src = bulletUrl;\r
\r
const smallBulletImage = new Image();\r
smallBulletImage.src = smallBulletUrl;\r
\r
function drawElement(ctx: CanvasRenderingContext2D, element: Element, image: HTMLImageElement) {\r
  const { x, y, angle, rotationOffset, width, height, id } = element;\r
\r
  // Rotate whole canvas\r
  ctx.translate(x, y);\r
  ctx.rotate(angle + rotationOffset);\r
  ctx.translate(-x, -y);\r
\r
  // Draw straight image onto the rotated canvas\r
  ctx.drawImage(image, x - width * 0.5, y - height * 0.5, width, height);\r
  if (id) {\r
    ctx.font = '48px serif';\r
    ctx.strokeText(id, x - 15, y);\r
  }\r
\r
  // Unrotate canvas to straighten it and leave the image rotated instead\r
  ctx.translate(x, y);\r
  ctx.rotate(-angle - rotationOffset);\r
  ctx.translate(-x, -y);\r
}\r
\r
const joymap = createJoymap({\r
  onPoll: function onPoll() {\r
    // Get the canvas context so we can draw on it\r
    const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(\r
      '2d',\r
    ) as CanvasRenderingContext2D;\r
\r
    // Clear canvas by drawing background color and then the welcome messages\r
    ctx.fillStyle = '#282828';\r
    ctx.fillRect(0, 0, SIZE.width, SIZE.height);\r
    ctx.strokeStyle = '#FFF';\r
    ctx.fillStyle = '#FFF';\r
    ctx.textAlign = 'center';\r
    ctx.textBaseline = 'middle';\r
    ctx.font = '48px serif';\r
    if (characters.length === 0) {\r
      ctx.fillText(\`Let's get ready\`, SIZE.centerX, SIZE.centerY - 48);\r
      ctx.fillText(\`To haptic feedback\`, SIZE.centerX, SIZE.centerY);\r
      ctx.fillText(\`Please connect gamepad/s\`, SIZE.centerX, SIZE.centerY + 48);\r
    } else {\r
      ctx.fillText(\`Use sticks to move and aim\`, SIZE.centerX, SIZE.centerY - 48);\r
      ctx.fillText(\`Shoulders and triggers to shoot\`, SIZE.centerX, SIZE.centerY);\r
    }\r
    const unusedIds = joymap.getUnusedPadIds();\r
\r
    if (unusedIds.length > 0) {\r
      unusedIds.forEach((padId) => {\r
        const c = createCharacter(padId, SIZE);\r
        joymap.addModule(c.module);\r
\r
        characters.push(c);\r
      });\r
    }\r
\r
    bullets = bullets.filter(\r
      (bullet) =>\r
        bullet.x + bullet.width > 0 &&\r
        bullet.x - bullet.width < SIZE.width &&\r
        bullet.y + bullet.height > 0 &&\r
        bullet.y - bullet.height < SIZE.height,\r
    );\r
\r
    bullets.forEach((bullet) => {\r
      bullet.x += bullet.speed * Math.cos(bullet.angle);\r
      bullet.y += bullet.speed * Math.sin(bullet.angle);\r
      if (bullet.type === 'spinning') {\r
        bullet.rotationOffset += Math.PI * 0.05;\r
      }\r
      if (bullet.type === 'chaos') {\r
        bullet.angle += Math.PI * 0.2 * Math.random() - Math.PI * 0.1;\r
      }\r
      const sprite = (() => {\r
        if (bullet.type === 'small') {\r
          return smallBulletImage;\r
        }\r
        if (bullet.type === 'big') {\r
          return bulletImage;\r
        }\r
        if (bullet.type === 'spinning') {\r
          return gamepadImage;\r
        }\r
\r
        return smallBulletImage;\r
      })();\r
\r
      drawElement(ctx, bullet, sprite);\r
    });\r
\r
    characters.forEach((c) => {\r
      if (c.module.isConnected()) {\r
        updateCharacter(c, bullets);\r
        drawElement(ctx, c, gamepadImage);\r
      }\r
    });\r
  },\r
});\r
\r
joymap.start();\r
`,Mn={"index.ts":{content:_(Oi),isBinary:!1},"index.html":{content:Li,isBinary:!1},"package.json":{isBinary:!1,content:ye({hasLodash:!0,hasReact:!1})},"tsconfig.json":xe},An={readme:{html:"examples/pages/Readme/index.html",title:"Readme",tags:[]},react:{html:"examples/pages/React/index.html",title:"React Example",gitPath:"tree/master/examples/pages/React",codesandbox:pe(ji),tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",title:"Fighting Example",gitPath:"tree/master/examples/pages/Fighting",codesandbox:pe(Rn),stackblitz:Rn,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",title:"Rumble Example",gitPath:"tree/master/examples/pages/Rumble",codesandbox:pe(Mn),stackblitz:Mn,tags:["queryModule","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",title:"Log Example",gitPath:"tree/master/examples/pages/Log",codesandbox:pe(Sn),stackblitz:Sn,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",title:"Editor Example",gitPath:"tree/master/examples/pages/Editor",codesandbox:pe(yi),tags:["eventModule","react"],description:"A text editor example that binds gamepad buttons to keyboard events."}};function Ni(){const[e,n]=m.useState("readme"),t=An[e];return t?h.jsx(Ko,{children:h.jsxs("div",{className:"flex h-screen flex-col",children:[h.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:h.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:h.jsx("img",{src:oi})}),h.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),h.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:h.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(An).map(r=>{const o=r===e;return h.jsx(Ot,{role:"tab",onClick:()=>n(r),isActive:o,children:r},r)})})})]})}),h.jsx("main",{className:"flex w-full flex-1 flex-col",children:h.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[h.jsxs("div",{className:"mb-6",children:[h.jsxs("div",{className:"flex items-center justify-between",children:[h.jsx("div",{className:"flex flex-wrap gap-3",children:t.tags.map(r=>h.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:r},r))}),h.jsxs("div",{className:"flex justify-end",children:[!!t.codesandbox&&h.jsx(ei,{value:t.codesandbox}),!!t.stackblitz&&h.jsx(ri,{files:t.stackblitz}),t.gitPath&&h.jsx(nn,{content:"View example on github",children:h.jsx(xt,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${t.gitPath}`,children:h.jsx(ni,{})})})]})]}),h.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:t.description})]}),t.code&&h.jsx(Dt,{code:t.code}),h.jsx(ti,{path:e==="readme"?"README.md":t.html.replace(/\/index\.html$/,"/"),children:h.jsx("iframe",{src:t.html,className:"relative block h-full w-full"},t.html)})]})}),h.jsx("footer",{className:"border-t border-border py-4",children:h.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:h.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",di]})})})]})}):null}const wt=document.createElement("div");document.body.appendChild(wt);const Ti=jt(wt);Ti.render(h.jsx(Ni,{}));
//# sourceMappingURL=main-B3K7EYe3.js.map
