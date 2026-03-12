import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as f,j as v,a as gn,R as yn,b as jr,c as Ir}from"./client-vbRJSMsA.js";import{g as Dr}from"./_commonjsHelpers-Cpj98o6Y.js";/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var zt="popstate";function Jt(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function $r(e={}){function t(r,o){var c;let i=(c=o.state)==null?void 0:c.masked,{pathname:a,search:l,hash:s}=i||r.location;return ct("",{pathname:a,search:l,hash:s},o.state&&o.state.usr||null,o.state&&o.state.key||"default",i?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,o){return typeof o=="string"?o:Ce(o)}return Fr(t,n,null,e)}function A(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function U(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Br(){return Math.random().toString(36).substring(2,10)}function Vt(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ct(e,t,n=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?ge(t):t,state:n,key:t&&t.key||r||Br(),unstable_mask:o}}function Ce({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function ge(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Fr(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:i=!1}=r,a=o.history,l="POP",s=null,c=u();c==null&&(c=0,a.replaceState({...a.state,idx:c},""));function u(){return(a.state||{idx:null}).idx}function d(){l="POP";let w=u(),h=w==null?null:w-c;c=w,s&&s({action:l,location:y.location,delta:h})}function p(w,h){l="PUSH";let b=Jt(w)?w:ct(y.location,w,h);c=u()+1;let E=Vt(b,c),C=y.createHref(b.unstable_mask||b);try{a.pushState(E,"",C)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(C)}i&&s&&s({action:l,location:y.location,delta:1})}function m(w,h){l="REPLACE";let b=Jt(w)?w:ct(y.location,w,h);c=u();let E=Vt(b,c),C=y.createHref(b.unstable_mask||b);a.replaceState(E,"",C),i&&s&&s({action:l,location:y.location,delta:0})}function g(w){return _r(w)}let y={get action(){return l},get location(){return e(o,a)},listen(w){if(s)throw new Error("A history only accepts one active listener");return o.addEventListener(zt,d),s=w,()=>{o.removeEventListener(zt,d),s=null}},createHref(w){return t(o,w)},createURL:g,encodeLocation(w){let h=g(w);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:p,replace:m,go(w){return a.go(w)}};return y}function _r(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),A(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:Ce(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function xn(e,t,n="/"){return Hr(e,t,n,!1)}function Hr(e,t,n,r){let o=typeof t=="string"?ge(t):t,i=K(o.pathname||"/",n);if(i==null)return null;let a=vn(e);Wr(a);let l=null;for(let s=0;l==null&&s<a.length;++s){let c=Kr(i);l=Gr(a[s],c,r)}return l}function vn(e,t=[],n=[],r="",o=!1){let i=(a,l,s=o,c)=>{let u={relativePath:c===void 0?a.path||"":c,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};if(u.relativePath.startsWith("/")){if(!u.relativePath.startsWith(r)&&s)return;A(u.relativePath.startsWith(r),`Absolute route path "${u.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(r.length)}let d=Z([r,u.relativePath]),p=n.concat(u);a.children&&a.children.length>0&&(A(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),vn(a.children,t,p,d,s)),!(a.path==null&&!a.index)&&t.push({path:d,score:Zr(d,a.index),routesMeta:p})};return e.forEach((a,l)=>{var s;if(a.path===""||!((s=a.path)!=null&&s.includes("?")))i(a,l);else for(let c of wn(a.path))i(a,l,!0,c)}),t}function wn(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let a=wn(r.join("/")),l=[];return l.push(...a.map(s=>s===""?i:[i,s].join("/"))),o&&l.push(...a),l.map(s=>e.startsWith("/")&&s===""?"/":s)}function Wr(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:qr(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Ur=/^:[\w-]+$/,zr=3,Jr=2,Vr=1,Yr=10,Xr=-2,Yt=e=>e==="*";function Zr(e,t){let n=e.split("/"),r=n.length;return n.some(Yt)&&(r+=Xr),t&&(r+=Jr),n.filter(o=>!Yt(o)).reduce((o,i)=>o+(Ur.test(i)?zr:i===""?Vr:Yr),r)}function qr(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function Gr(e,t,n=!1){let{routesMeta:r}=e,o={},i="/",a=[];for(let l=0;l<r.length;++l){let s=r[l],c=l===r.length-1,u=i==="/"?t:t.slice(i.length)||"/",d=He({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},u),p=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=He({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},u)),!d)return null;Object.assign(o,d.params),a.push({params:o,pathname:Z([i,d.pathname]),pathnameBase:ro(Z([i,d.pathnameBase])),route:p}),d.pathnameBase!=="/"&&(i=Z([i,d.pathnameBase]))}return a}function He(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Qr(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:r.reduce((c,{paramName:u,isOptional:d},p)=>{if(u==="*"){let g=l[p]||"";a=i.slice(0,i.length-g.length).replace(/(.)\/+$/,"$1")}const m=l[p];return d&&!m?c[u]=void 0:c[u]=(m||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:a,pattern:e}}function Qr(e,t=!1,n=!0){U(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,s,c,u)=>{if(r.push({paramName:l,isOptional:s!=null}),s){let d=u.charAt(c+a.length);return d&&d!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Kr(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function K(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var eo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function to(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?ge(e):e,i;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?i=Xt(n.substring(1),"/"):i=Xt(n,t)):i=t,{pathname:i,search:oo(r),hash:io(o)}}function Xt(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function nt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function no(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function xt(e){let t=no(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Ve(e,t,n,r=!1){let o;typeof e=="string"?o=ge(e):(o={...e},A(!o.pathname||!o.pathname.includes("?"),nt("?","pathname","search",o)),A(!o.pathname||!o.pathname.includes("#"),nt("#","pathname","hash",o)),A(!o.search||!o.search.includes("#"),nt("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,l;if(a==null)l=n;else{let d=t.length-1;if(!r&&a.startsWith("..")){let p=a.split("/");for(;p[0]==="..";)p.shift(),d-=1;o.pathname=p.join("/")}l=d>=0?t[d]:"/"}let s=to(o,l),c=a&&a!=="/"&&a.endsWith("/"),u=(i||a===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(c||u)&&(s.pathname+="/"),s}var Z=e=>e.join("/").replace(/\/\/+/g,"/"),ro=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),oo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,io=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,ao=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function so(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function lo(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var bn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Rn(e,t){let n=e;if(typeof n!="string"||!eo.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,o=!1;if(bn)try{let i=new URL(window.location.href),a=n.startsWith("//")?new URL(i.protocol+n):new URL(n),l=K(a.pathname,t);a.origin===i.origin&&l!=null?n=l+a.search+a.hash:o=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var En=["POST","PUT","PATCH","DELETE"];new Set(En);var co=["GET",...En];new Set(co);var ye=f.createContext(null);ye.displayName="DataRouter";var Ye=f.createContext(null);Ye.displayName="DataRouterState";var uo=f.createContext(!1),Cn=f.createContext({isTransitioning:!1});Cn.displayName="ViewTransition";var fo=f.createContext(new Map);fo.displayName="Fetchers";var po=f.createContext(null);po.displayName="Await";var H=f.createContext(null);H.displayName="Navigation";var Pe=f.createContext(null);Pe.displayName="Location";var V=f.createContext({outlet:null,matches:[],isDataRoute:!1});V.displayName="Route";var vt=f.createContext(null);vt.displayName="RouteError";var kn="REACT_ROUTER_ERROR",mo="REDIRECT",ho="ROUTE_ERROR_RESPONSE";function go(e){if(e.startsWith(`${kn}:${mo}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function yo(e){if(e.startsWith(`${kn}:${ho}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new ao(t.status,t.statusText,t.data)}catch{}}function xo(e,{relative:t}={}){A(xe(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=f.useContext(H),{hash:o,pathname:i,search:a}=Le(e,{relative:t}),l=i;return n!=="/"&&(l=i==="/"?n:Z([n,i])),r.createHref({pathname:l,search:a,hash:o})}function xe(){return f.useContext(Pe)!=null}function ne(){return A(xe(),"useLocation() may be used only in the context of a <Router> component."),f.useContext(Pe).location}var Sn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Pn(e){f.useContext(H).static||f.useLayoutEffect(e)}function wt(){let{isDataRoute:e}=f.useContext(V);return e?No():vo()}function vo(){A(xe(),"useNavigate() may be used only in the context of a <Router> component.");let e=f.useContext(ye),{basename:t,navigator:n}=f.useContext(H),{matches:r}=f.useContext(V),{pathname:o}=ne(),i=JSON.stringify(xt(r)),a=f.useRef(!1);return Pn(()=>{a.current=!0}),f.useCallback((s,c={})=>{if(U(a.current,Sn),!a.current)return;if(typeof s=="number"){n.go(s);return}let u=Ve(s,JSON.parse(i),o,c.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:Z([t,u.pathname])),(c.replace?n.replace:n.push)(u,c.state,c)},[t,n,i,o,e])}f.createContext(null);function wo(){let{matches:e}=f.useContext(V),t=e[e.length-1];return t?t.params:{}}function Le(e,{relative:t}={}){let{matches:n}=f.useContext(V),{pathname:r}=ne(),o=JSON.stringify(xt(n));return f.useMemo(()=>Ve(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function bo(e,t){return Ln(e,t)}function Ln(e,t,n){var w;A(xe(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=f.useContext(H),{matches:o}=f.useContext(V),i=o[o.length-1],a=i?i.params:{},l=i?i.pathname:"/",s=i?i.pathnameBase:"/",c=i&&i.route;{let h=c&&c.path||"";An(l,!c||h.endsWith("*")||h.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${h}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${h}"> to <Route path="${h==="/"?"*":`${h}/*`}">.`)}let u=ne(),d;if(t){let h=typeof t=="string"?ge(t):t;A(s==="/"||((w=h.pathname)==null?void 0:w.startsWith(s)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${s}" but pathname "${h.pathname}" was given in the \`location\` prop.`),d=h}else d=u;let p=d.pathname||"/",m=p;if(s!=="/"){let h=s.replace(/^\//,"").split("/");m="/"+p.replace(/^\//,"").split("/").slice(h.length).join("/")}let g=xn(e,{pathname:m});U(c||g!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),U(g==null||g[g.length-1].route.element!==void 0||g[g.length-1].route.Component!==void 0||g[g.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let y=So(g&&g.map(h=>Object.assign({},h,{params:Object.assign({},a,h.params),pathname:Z([s,r.encodeLocation?r.encodeLocation(h.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?s:Z([s,r.encodeLocation?r.encodeLocation(h.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:h.pathnameBase])})),o,n);return t&&y?f.createElement(Pe.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...d},navigationType:"POP"}},y):y}function Ro(){let e=To(),t=so(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=f.createElement(f.Fragment,null,f.createElement("p",null,"💿 Hey developer 👋"),f.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",f.createElement("code",{style:i},"ErrorBoundary")," or"," ",f.createElement("code",{style:i},"errorElement")," prop on your route.")),f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),n?f.createElement("pre",{style:o},n):null,a)}var Eo=f.createElement(Ro,null),Mn=class extends f.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=yo(e.digest);n&&(e=n)}let t=e!==void 0?f.createElement(V.Provider,{value:this.props.routeContext},f.createElement(vt.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?f.createElement(Co,{error:e},t):t}};Mn.contextType=uo;var rt=new WeakMap;function Co({children:e,error:t}){let{basename:n}=f.useContext(H);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=go(t.digest);if(r){let o=rt.get(t);if(o)throw o;let i=Rn(r.location,n);if(bn&&!rt.get(t))if(i.isExternal||r.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const a=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:r.replace}));throw rt.set(t,a),a}return f.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function ko({routeContext:e,match:t,children:n}){let r=f.useContext(ye);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),f.createElement(V.Provider,{value:e},n)}function So(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,i=r==null?void 0:r.errors;if(i!=null){let u=o.findIndex(d=>d.route.id&&(i==null?void 0:i[d.route.id])!==void 0);A(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,u+1))}let a=!1,l=-1;if(n&&r){a=r.renderFallback;for(let u=0;u<o.length;u++){let d=o[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(l=u),d.route.id){let{loaderData:p,errors:m}=r,g=d.route.loader&&!p.hasOwnProperty(d.route.id)&&(!m||m[d.route.id]===void 0);if(d.route.lazy||g){n.isStatic&&(a=!0),l>=0?o=o.slice(0,l+1):o=[o[0]];break}}}}let s=n==null?void 0:n.onError,c=r&&s?(u,d)=>{var p,m;s(u,{location:r.location,params:((m=(p=r.matches)==null?void 0:p[0])==null?void 0:m.params)??{},unstable_pattern:lo(r.matches),errorInfo:d})}:void 0;return o.reduceRight((u,d,p)=>{let m,g=!1,y=null,w=null;r&&(m=i&&d.route.id?i[d.route.id]:void 0,y=d.route.errorElement||Eo,a&&(l<0&&p===0?(An("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,w=null):l===p&&(g=!0,w=d.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,p+1)),b=()=>{let E;return m?E=y:g?E=w:d.route.Component?E=f.createElement(d.route.Component,null):d.route.element?E=d.route.element:E=u,f.createElement(ko,{match:d,routeContext:{outlet:u,matches:h,isDataRoute:r!=null},children:E})};return r&&(d.route.ErrorBoundary||d.route.errorElement||p===0)?f.createElement(Mn,{location:r.location,revalidation:r.revalidation,component:y,error:m,children:b(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:c}):b()},null)}function bt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Po(e){let t=f.useContext(ye);return A(t,bt(e)),t}function Lo(e){let t=f.useContext(Ye);return A(t,bt(e)),t}function Mo(e){let t=f.useContext(V);return A(t,bt(e)),t}function Rt(e){let t=Mo(e),n=t.matches[t.matches.length-1];return A(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ao(){return Rt("useRouteId")}function To(){var r;let e=f.useContext(vt),t=Lo("useRouteError"),n=Rt("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function No(){let{router:e}=Po("useNavigate"),t=Rt("useNavigate"),n=f.useRef(!1);return Pn(()=>{n.current=!0}),f.useCallback(async(o,i={})=>{U(n.current,Sn),n.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Zt={};function An(e,t,n){!t&&!Zt[e]&&(Zt[e]=!0,U(!1,n))}f.memo(Oo);function Oo({routes:e,future:t,state:n,isStatic:r,onError:o}){return Ln(e,void 0,{state:n,isStatic:r,onError:o})}function jo({to:e,replace:t,state:n,relative:r}){A(xe(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=f.useContext(H);U(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=f.useContext(V),{pathname:a}=ne(),l=wt(),s=Ve(e,xt(i),a,r==="path"),c=JSON.stringify(s);return f.useEffect(()=>{l(JSON.parse(c),{replace:t,state:n,relative:r})},[l,c,r,t,n]),null}function ut(e){A(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Io({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:i=!1,unstable_useTransitions:a}){A(!xe(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),s=f.useMemo(()=>({basename:l,navigator:o,static:i,unstable_useTransitions:a,future:{}}),[l,o,i,a]);typeof n=="string"&&(n=ge(n));let{pathname:c="/",search:u="",hash:d="",state:p=null,key:m="default",unstable_mask:g}=n,y=f.useMemo(()=>{let w=K(c,l);return w==null?null:{location:{pathname:w,search:u,hash:d,state:p,key:m,unstable_mask:g},navigationType:r}},[l,c,u,d,p,m,r,g]);return U(y!=null,`<Router basename="${l}"> is not able to match the URL "${c}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),y==null?null:f.createElement(H.Provider,{value:s},f.createElement(Pe.Provider,{children:t,value:y}))}function Do({children:e,location:t}){return bo(dt(e),t)}function dt(e,t=[]){let n=[];return f.Children.forEach(e,(r,o)=>{if(!f.isValidElement(r))return;let i=[...t,o];if(r.type===f.Fragment){n.push.apply(n,dt(r.props.children,i));return}A(r.type===ut,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),A(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=dt(r.props.children,i)),n.push(a)}),n}var Be="get",Fe="application/x-www-form-urlencoded";function Xe(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function $o(e){return Xe(e)&&e.tagName.toLowerCase()==="button"}function Bo(e){return Xe(e)&&e.tagName.toLowerCase()==="form"}function Fo(e){return Xe(e)&&e.tagName.toLowerCase()==="input"}function _o(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ho(e,t){return e.button===0&&(!t||t==="_self")&&!_o(e)}var Ie=null;function Wo(){if(Ie===null)try{new FormData(document.createElement("form"),0),Ie=!1}catch{Ie=!0}return Ie}var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ot(e){return e!=null&&!Uo.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fe}"`),null):e}function zo(e,t){let n,r,o,i,a;if(Bo(e)){let l=e.getAttribute("action");r=l?K(l,t):null,n=e.getAttribute("method")||Be,o=ot(e.getAttribute("enctype"))||Fe,i=new FormData(e)}else if($o(e)||Fo(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||l.getAttribute("action");if(r=s?K(s,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||Be,o=ot(e.getAttribute("formenctype"))||ot(l.getAttribute("enctype"))||Fe,i=new FormData(l,e),!Wo()){let{name:c,type:u,value:d}=e;if(u==="image"){let p=c?`${c}.`:"";i.append(`${p}x`,"0"),i.append(`${p}y`,"0")}else c&&i.append(c,d)}}else{if(Xe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Be,r=null,o=Fe,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Et(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Jo(e,t,n,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:t&&K(o.pathname,t)==="/"?o.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:o.pathname=`${o.pathname.replace(/\/$/,"")}.${r}`,o}async function Vo(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yo(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Xo(e,t,n){let r=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await Vo(i,n);return a.links?a.links():[]}return[]}));return Qo(r.flat(1).filter(Yo).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function qt(e,t,n,r,o,i){let a=(s,c)=>n[c]?s.route.id!==n[c].route.id:!0,l=(s,c)=>{var u;return n[c].pathname!==s.pathname||((u=n[c].route.path)==null?void 0:u.endsWith("*"))&&n[c].params["*"]!==s.params["*"]};return i==="assets"?t.filter((s,c)=>a(s,c)||l(s,c)):i==="data"?t.filter((s,c)=>{var d;let u=r.routes[s.route.id];if(!u||!u.hasLoader)return!1;if(a(s,c)||l(s,c))return!0;if(s.route.shouldRevalidate){let p=s.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:s.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function Zo(e,t,{includeHydrateFallback:n}={}){return qo(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function qo(e){return[...new Set(e)]}function Go(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Qo(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let i=JSON.stringify(Go(o));return n.has(i)||(n.add(i),r.push({key:i,link:o})),r},[])}function Tn(){let e=f.useContext(ye);return Et(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Ko(){let e=f.useContext(Ye);return Et(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ct=f.createContext(void 0);Ct.displayName="FrameworkContext";function Nn(){let e=f.useContext(Ct);return Et(e,"You must render this element inside a <HydratedRouter> element"),e}function ei(e,t){let n=f.useContext(Ct),[r,o]=f.useState(!1),[i,a]=f.useState(!1),{onFocus:l,onBlur:s,onMouseEnter:c,onMouseLeave:u,onTouchStart:d}=t,p=f.useRef(null);f.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=h=>{h.forEach(b=>{a(b.isIntersecting)})},w=new IntersectionObserver(y,{threshold:.5});return p.current&&w.observe(p.current),()=>{w.disconnect()}}},[e]),f.useEffect(()=>{if(r){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[r]);let m=()=>{o(!0)},g=()=>{o(!1),a(!1)};return n?e!=="intent"?[i,p,{}]:[i,p,{onFocus:Re(l,m),onBlur:Re(s,g),onMouseEnter:Re(c,m),onMouseLeave:Re(u,g),onTouchStart:Re(d,m)}]:[!1,p,{}]}function Re(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ti({page:e,...t}){let{router:n}=Tn(),r=f.useMemo(()=>xn(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?f.createElement(ri,{page:e,matches:r,...t}):null}function ni(e){let{manifest:t,routeModules:n}=Nn(),[r,o]=f.useState([]);return f.useEffect(()=>{let i=!1;return Xo(e,t,n).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,n]),r}function ri({page:e,matches:t,...n}){let r=ne(),{future:o,manifest:i,routeModules:a}=Nn(),{basename:l}=Tn(),{loaderData:s,matches:c}=Ko(),u=f.useMemo(()=>qt(e,t,c,i,r,"data"),[e,t,c,i,r]),d=f.useMemo(()=>qt(e,t,c,i,r,"assets"),[e,t,c,i,r]),p=f.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let y=new Set,w=!1;if(t.forEach(b=>{var C;let E=i.routes[b.route.id];!E||!E.hasLoader||(!u.some(k=>k.route.id===b.route.id)&&b.route.id in s&&((C=a[b.route.id])!=null&&C.shouldRevalidate)||E.hasClientLoader?w=!0:y.add(b.route.id))}),y.size===0)return[];let h=Jo(e,l,o.unstable_trailingSlashAwareDataRequests,"data");return w&&y.size>0&&h.searchParams.set("_routes",t.filter(b=>y.has(b.route.id)).map(b=>b.route.id).join(",")),[h.pathname+h.search]},[l,o.unstable_trailingSlashAwareDataRequests,s,r,i,u,t,e,a]),m=f.useMemo(()=>Zo(d,i),[d,i]),g=ni(d);return f.createElement(f.Fragment,null,p.map(y=>f.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...n})),m.map(y=>f.createElement("link",{key:y,rel:"modulepreload",href:y,...n})),g.map(({key:y,link:w})=>f.createElement("link",{key:y,nonce:n.nonce,...w,crossOrigin:w.crossOrigin??n.crossOrigin})))}function oi(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var ii=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ii&&(window.__reactRouterVersion="7.13.1")}catch{}function ai({basename:e,children:t,unstable_useTransitions:n,window:r}){let o=f.useRef();o.current==null&&(o.current=$r({window:r,v5Compat:!0}));let i=o.current,[a,l]=f.useState({action:i.action,location:i.location}),s=f.useCallback(c=>{n===!1?l(c):f.startTransition(()=>l(c))},[n]);return f.useLayoutEffect(()=>i.listen(s),[i,s]),f.createElement(Io,{basename:e,children:t,location:a.location,navigationType:a.action,navigator:i,unstable_useTransitions:n})}var On=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,jn=f.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:i,replace:a,unstable_mask:l,state:s,target:c,to:u,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:m,...g},y){let{basename:w,navigator:h,unstable_useTransitions:b}=f.useContext(H),E=typeof u=="string"&&On.test(u),C=Rn(u,w);u=C.to;let k=xo(u,{relative:o}),x=ne(),R=null;if(l){let O=Ve(l,[],x.unstable_mask?x.unstable_mask.pathname:"/",!0);w!=="/"&&(O.pathname=O.pathname==="/"?w:Z([w,O.pathname])),R=h.createHref(O)}let[S,T,L]=ei(r,g),D=ui(u,{replace:a,unstable_mask:l,state:s,target:c,preventScrollReset:d,relative:o,viewTransition:p,unstable_defaultShouldRevalidate:m,unstable_useTransitions:b});function $(O){t&&t(O),O.defaultPrevented||D(O)}let N=!(C.isExternal||i),M=f.createElement("a",{...g,...L,href:(N?R:void 0)||C.absoluteURL||k,onClick:N?$:t,ref:oi(y,T),target:c,"data-discover":!E&&n==="render"?"true":void 0});return S&&!E?f.createElement(f.Fragment,null,M,f.createElement(ti,{page:k})):M});jn.displayName="Link";var si=f.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:i,to:a,viewTransition:l,children:s,...c},u){let d=Le(a,{relative:c.relative}),p=ne(),m=f.useContext(Ye),{navigator:g,basename:y}=f.useContext(H),w=m!=null&&hi(d)&&l===!0,h=g.encodeLocation?g.encodeLocation(d).pathname:d.pathname,b=p.pathname,E=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(b=b.toLowerCase(),E=E?E.toLowerCase():null,h=h.toLowerCase()),E&&y&&(E=K(E,y)||E);const C=h!=="/"&&h.endsWith("/")?h.length-1:h.length;let k=b===h||!o&&b.startsWith(h)&&b.charAt(C)==="/",x=E!=null&&(E===h||!o&&E.startsWith(h)&&E.charAt(h.length)==="/"),R={isActive:k,isPending:x,isTransitioning:w},S=k?t:void 0,T;typeof r=="function"?T=r(R):T=[r,k?"active":null,x?"pending":null,w?"transitioning":null].filter(Boolean).join(" ");let L=typeof i=="function"?i(R):i;return f.createElement(jn,{...c,"aria-current":S,className:T,ref:u,style:L,to:a,viewTransition:l},typeof s=="function"?s(R):s)});si.displayName="NavLink";var li=f.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:i,method:a=Be,action:l,onSubmit:s,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:p,...m},g)=>{let{unstable_useTransitions:y}=f.useContext(H),w=pi(),h=mi(l,{relative:c}),b=a.toLowerCase()==="get"?"get":"post",E=typeof l=="string"&&On.test(l),C=k=>{if(s&&s(k),k.defaultPrevented)return;k.preventDefault();let x=k.nativeEvent.submitter,R=(x==null?void 0:x.getAttribute("formmethod"))||a,S=()=>w(x||k.currentTarget,{fetcherKey:t,method:R,navigate:n,replace:o,state:i,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:p});y&&n!==!1?f.startTransition(()=>S()):S()};return f.createElement("form",{ref:g,method:b,action:h,onSubmit:r?s:C,...m,"data-discover":!E&&e==="render"?"true":void 0})});li.displayName="Form";function ci(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function In(e){let t=f.useContext(ye);return A(t,ci(e)),t}function ui(e,{target:t,replace:n,unstable_mask:r,state:o,preventScrollReset:i,relative:a,viewTransition:l,unstable_defaultShouldRevalidate:s,unstable_useTransitions:c}={}){let u=wt(),d=ne(),p=Le(e,{relative:a});return f.useCallback(m=>{if(Ho(m,t)){m.preventDefault();let g=n!==void 0?n:Ce(d)===Ce(p),y=()=>u(e,{replace:g,unstable_mask:r,state:o,preventScrollReset:i,relative:a,viewTransition:l,unstable_defaultShouldRevalidate:s});c?f.startTransition(()=>y()):y()}},[d,u,p,n,r,o,t,e,i,a,l,s,c])}var di=0,fi=()=>`__${String(++di)}__`;function pi(){let{router:e}=In("useSubmit"),{basename:t}=f.useContext(H),n=Ao(),r=e.fetch,o=e.navigate;return f.useCallback(async(i,a={})=>{let{action:l,method:s,encType:c,formData:u,body:d}=zo(i,t);if(a.navigate===!1){let p=a.fetcherKey||fi();await r(p,n,a.action||l,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:u,body:d,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await o(a.action||l,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:u,body:d,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,o,t,n])}function mi(e,{relative:t}={}){let{basename:n}=f.useContext(H),r=f.useContext(V);A(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),i={...Le(e||".",{relative:t})},a=ne();if(e==null){i.search=a.search;let l=new URLSearchParams(i.search),s=l.getAll("index");if(s.some(u=>u==="")){l.delete("index"),s.filter(d=>d).forEach(d=>l.append("index",d));let u=l.toString();i.search=u?`?${u}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:Z([n,i.pathname])),Ce(i)}function hi(e,{relative:t}={}){let n=f.useContext(Cn);A(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=In("useViewTransitionState"),o=Le(e,{relative:t});if(!n.isTransitioning)return!1;let i=K(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=K(n.nextLocation.pathname,r)||n.nextLocation.pathname;return He(o.pathname,a)!=null||He(o.pathname,i)!=null}const gi=({isActive:e,children:t,className:n="",...r})=>v.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${n}`,...r,children:t}),yi=e=>v.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:v.jsx("path",{d:"M20 6 9 17l-5-5"})}),xi=e=>v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[v.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),v.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function vi(e){const t=[],n=/\/\/.*$/gm;let r;for(;(r=n.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-string"});t.sort((l,s)=>l.start-s.start);let i="",a=0;for(const l of t){if(l.start<a)continue;const s=e.slice(a,l.start);i+=Gt(s);const c=e.slice(l.start,l.end);i+=`<span class="${l.className}">${Dn(c)}</span>`,a=l.end}return i+=Gt(e.slice(a)),i}function Dn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Gt(e){let t=Dn(e);return t=t.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),t=t.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),t=t.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),t=t.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),t=t.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(n,r,o)=>n.includes('class="')?n:`<span class="code-function">${r}</span>${o}`),t=t.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),t}function wi({code:e}){const[t,n]=f.useState(!1),r=f.useRef(null);f.useEffect(()=>{r.current&&(r.current.innerHTML=vi(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),n(!0),setTimeout(()=>n(!1),2e3)};return v.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[v.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[v.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),v.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:t?v.jsxs(v.Fragment,{children:[v.jsx(yi,{className:"h-3.5 w-3.5"}),v.jsx("span",{children:"Copied"})]}):v.jsxs(v.Fragment,{children:[v.jsx(xi,{className:"h-3.5 w-3.5"}),v.jsx("span",{children:"Copy"})]})})]}),v.jsx("div",{className:"overflow-x-auto p-4",children:v.jsx("pre",{className:"text-sm leading-relaxed",children:v.jsx("code",{ref:r,className:"font-mono"})})})]})}function Q(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function Qt(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function $n(...e){return t=>{let n=!1;const r=e.map(o=>{const i=Qt(o,t);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let o=0;o<r.length;o++){const i=r[o];typeof i=="function"?i():Qt(e[o],null)}}}}function fe(...e){return f.useCallback($n(...e),e)}function Bn(e,t=[]){let n=[];function r(i,a){const l=f.createContext(a),s=n.length;n=[...n,a];const c=d=>{var h;const{scope:p,children:m,...g}=d,y=((h=p==null?void 0:p[e])==null?void 0:h[s])||l,w=f.useMemo(()=>g,Object.values(g));return v.jsx(y.Provider,{value:w,children:m})};c.displayName=i+"Provider";function u(d,p){var y;const m=((y=p==null?void 0:p[e])==null?void 0:y[s])||l,g=f.useContext(m);if(g)return g;if(a!==void 0)return a;throw new Error(`\`${d}\` must be used within \`${i}\``)}return[c,u]}const o=()=>{const i=n.map(a=>f.createContext(a));return function(l){const s=(l==null?void 0:l[e])||i;return f.useMemo(()=>({[`__scope${e}`]:{...l,[e]:s}}),[l,s])}};return o.scopeName=e,[r,bi(o,...t)]}function bi(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(i){const a=r.reduce((l,{useScope:s,scopeName:c})=>{const d=s(i)[`__scope${c}`];return{...l,...d}},{});return f.useMemo(()=>({[`__scope${t.scopeName}`]:a}),[a])}};return n.scopeName=t.scopeName,n}function Ri(e){const t=Ei(e),n=f.forwardRef((r,o)=>{const{children:i,...a}=r,l=f.Children.toArray(i),s=l.find(ki);if(s){const c=s.props.children,u=l.map(d=>d===s?f.Children.count(c)>1?f.Children.only(null):f.isValidElement(c)?c.props.children:null:d);return v.jsx(t,{...a,ref:o,children:f.isValidElement(c)?f.cloneElement(c,void 0,u):null})}return v.jsx(t,{...a,ref:o,children:i})});return n.displayName=`${e}.Slot`,n}function Ei(e){const t=f.forwardRef((n,r)=>{const{children:o,...i}=n;if(f.isValidElement(o)){const a=Pi(o),l=Si(i,o.props);return o.type!==f.Fragment&&(l.ref=r?$n(r,a):a),f.cloneElement(o,l)}return f.Children.count(o)>1?f.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Fn=Symbol("radix.slottable");function Ci(e){const t=({children:n})=>v.jsx(v.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=Fn,t}function ki(e){return f.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Fn}function Si(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...l)=>{const s=i(...l);return o(...l),s}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}function Pi(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Li=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=Li.reduce((e,t)=>{const n=Ri(`Primitive.${t}`),r=f.forwardRef((o,i)=>{const{asChild:a,...l}=o,s=a?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),v.jsx(s,{...l,ref:i})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function Mi(e,t){e&&gn.flushSync(()=>e.dispatchEvent(t))}function Ze(e){const t=f.useRef(e);return f.useEffect(()=>{t.current=e}),f.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function Ai(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e);f.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var Ti="DismissableLayer",ft="dismissableLayer.update",Ni="dismissableLayer.pointerDownOutside",Oi="dismissableLayer.focusOutside",Kt,_n=f.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Hn=f.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:i,onInteractOutside:a,onDismiss:l,...s}=e,c=f.useContext(_n),[u,d]=f.useState(null),p=(u==null?void 0:u.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,m]=f.useState({}),g=fe(t,R=>d(R)),y=Array.from(c.layers),[w]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),h=y.indexOf(w),b=u?y.indexOf(u):-1,E=c.layersWithOutsidePointerEventsDisabled.size>0,C=b>=h,k=Di(R=>{const S=R.target,T=[...c.branches].some(L=>L.contains(S));!C||T||(o==null||o(R),a==null||a(R),R.defaultPrevented||l==null||l())},p),x=$i(R=>{const S=R.target;[...c.branches].some(L=>L.contains(S))||(i==null||i(R),a==null||a(R),R.defaultPrevented||l==null||l())},p);return Ai(R=>{b===c.layers.size-1&&(r==null||r(R),!R.defaultPrevented&&l&&(R.preventDefault(),l()))},p),f.useEffect(()=>{if(u)return n&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(Kt=p.body.style.pointerEvents,p.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(u)),c.layers.add(u),en(),()=>{n&&c.layersWithOutsidePointerEventsDisabled.size===1&&(p.body.style.pointerEvents=Kt)}},[u,p,n,c]),f.useEffect(()=>()=>{u&&(c.layers.delete(u),c.layersWithOutsidePointerEventsDisabled.delete(u),en())},[u,c]),f.useEffect(()=>{const R=()=>m({});return document.addEventListener(ft,R),()=>document.removeEventListener(ft,R)},[]),v.jsx(le.div,{...s,ref:g,style:{pointerEvents:E?C?"auto":"none":void 0,...e.style},onFocusCapture:Q(e.onFocusCapture,x.onFocusCapture),onBlurCapture:Q(e.onBlurCapture,x.onBlurCapture),onPointerDownCapture:Q(e.onPointerDownCapture,k.onPointerDownCapture)})});Hn.displayName=Ti;var ji="DismissableLayerBranch",Ii=f.forwardRef((e,t)=>{const n=f.useContext(_n),r=f.useRef(null),o=fe(t,r);return f.useEffect(()=>{const i=r.current;if(i)return n.branches.add(i),()=>{n.branches.delete(i)}},[n.branches]),v.jsx(le.div,{...e,ref:o})});Ii.displayName=ji;function Di(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e),r=f.useRef(!1),o=f.useRef(()=>{});return f.useEffect(()=>{const i=l=>{if(l.target&&!r.current){let s=function(){Wn(Ni,n,c,{discrete:!0})};const c={originalEvent:l};l.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=s,t.addEventListener("click",o.current,{once:!0})):s()}else t.removeEventListener("click",o.current);r.current=!1},a=window.setTimeout(()=>{t.addEventListener("pointerdown",i)},0);return()=>{window.clearTimeout(a),t.removeEventListener("pointerdown",i),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function $i(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e),r=f.useRef(!1);return f.useEffect(()=>{const o=i=>{i.target&&!r.current&&Wn(Oi,n,{originalEvent:i},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function en(){const e=new CustomEvent(ft);document.dispatchEvent(e)}function Wn(e,t,n,{discrete:r}){const o=n.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?Mi(o,i):o.dispatchEvent(i)}var ie=globalThis!=null&&globalThis.document?f.useLayoutEffect:()=>{},Bi=yn[" useId ".trim().toString()]||(()=>{}),Fi=0;function _i(e){const[t,n]=f.useState(Bi());return ie(()=>{n(r=>r??String(Fi++))},[e]),t?`radix-${t}`:""}const Hi=["top","right","bottom","left"],ae=Math.min,F=Math.max,We=Math.round,De=Math.floor,q=e=>({x:e,y:e}),Wi={left:"right",right:"left",bottom:"top",top:"bottom"};function pt(e,t,n){return F(e,ae(t,n))}function ee(e,t){return typeof e=="function"?e(t):e}function te(e){return e.split("-")[0]}function ve(e){return e.split("-")[1]}function kt(e){return e==="x"?"y":"x"}function St(e){return e==="y"?"height":"width"}function X(e){const t=e[0];return t==="t"||t==="b"?"y":"x"}function Pt(e){return kt(X(e))}function Ui(e,t,n){n===void 0&&(n=!1);const r=ve(e),o=Pt(e),i=St(o);let a=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(a=Ue(a)),[a,Ue(a)]}function zi(e){const t=Ue(e);return[mt(e),t,mt(t)]}function mt(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const tn=["left","right"],nn=["right","left"],Ji=["top","bottom"],Vi=["bottom","top"];function Yi(e,t,n){switch(e){case"top":case"bottom":return n?t?nn:tn:t?tn:nn;case"left":case"right":return t?Ji:Vi;default:return[]}}function Xi(e,t,n,r){const o=ve(e);let i=Yi(te(e),n==="start",r);return o&&(i=i.map(a=>a+"-"+o),t&&(i=i.concat(i.map(mt)))),i}function Ue(e){const t=te(e);return Wi[t]+e.slice(t.length)}function Zi(e){return{top:0,right:0,bottom:0,left:0,...e}}function Un(e){return typeof e!="number"?Zi(e):{top:e,right:e,bottom:e,left:e}}function ze(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function rn(e,t,n){let{reference:r,floating:o}=e;const i=X(t),a=Pt(t),l=St(a),s=te(t),c=i==="y",u=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,p=r[l]/2-o[l]/2;let m;switch(s){case"top":m={x:u,y:r.y-o.height};break;case"bottom":m={x:u,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:d};break;case"left":m={x:r.x-o.width,y:d};break;default:m={x:r.x,y:r.y}}switch(ve(t)){case"start":m[a]-=p*(n&&c?-1:1);break;case"end":m[a]+=p*(n&&c?-1:1);break}return m}async function qi(e,t){var n;t===void 0&&(t={});const{x:r,y:o,platform:i,rects:a,elements:l,strategy:s}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:p=!1,padding:m=0}=ee(t,e),g=Un(m),w=l[p?d==="floating"?"reference":"floating":d],h=ze(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(w)))==null||n?w:w.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:s})),b=d==="floating"?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,E=await(i.getOffsetParent==null?void 0:i.getOffsetParent(l.floating)),C=await(i.isElement==null?void 0:i.isElement(E))?await(i.getScale==null?void 0:i.getScale(E))||{x:1,y:1}:{x:1,y:1},k=ze(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:b,offsetParent:E,strategy:s}):b);return{top:(h.top-k.top+g.top)/C.y,bottom:(k.bottom-h.bottom+g.bottom)/C.y,left:(h.left-k.left+g.left)/C.x,right:(k.right-h.right+g.right)/C.x}}const Gi=50,Qi=async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:a}=n,l=a.detectOverflow?a:{...a,detectOverflow:qi},s=await(a.isRTL==null?void 0:a.isRTL(t));let c=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=rn(c,r,s),p=r,m=0;const g={};for(let y=0;y<i.length;y++){const w=i[y];if(!w)continue;const{name:h,fn:b}=w,{x:E,y:C,data:k,reset:x}=await b({x:u,y:d,initialPlacement:r,placement:p,strategy:o,middlewareData:g,rects:c,platform:l,elements:{reference:e,floating:t}});u=E??u,d=C??d,g[h]={...g[h],...k},x&&m<Gi&&(m++,typeof x=="object"&&(x.placement&&(p=x.placement),x.rects&&(c=x.rects===!0?await a.getElementRects({reference:e,floating:t,strategy:o}):x.rects),{x:u,y:d}=rn(c,p,s)),y=-1)}return{x:u,y:d,placement:p,strategy:o,middlewareData:g}},Ki=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:i,platform:a,elements:l,middlewareData:s}=t,{element:c,padding:u=0}=ee(e,t)||{};if(c==null)return{};const d=Un(u),p={x:n,y:r},m=Pt(o),g=St(m),y=await a.getDimensions(c),w=m==="y",h=w?"top":"left",b=w?"bottom":"right",E=w?"clientHeight":"clientWidth",C=i.reference[g]+i.reference[m]-p[m]-i.floating[g],k=p[m]-i.reference[m],x=await(a.getOffsetParent==null?void 0:a.getOffsetParent(c));let R=x?x[E]:0;(!R||!await(a.isElement==null?void 0:a.isElement(x)))&&(R=l.floating[E]||i.floating[g]);const S=C/2-k/2,T=R/2-y[g]/2-1,L=ae(d[h],T),D=ae(d[b],T),$=L,N=R-y[g]-D,M=R/2-y[g]/2+S,O=pt($,M,N),j=!s.arrow&&ve(o)!=null&&M!==O&&i.reference[g]/2-(M<$?L:D)-y[g]/2<0,I=j?M<$?M-$:M-N:0;return{[m]:p[m]+I,data:{[m]:O,centerOffset:M-O-I,...j&&{alignmentOffset:I}},reset:j}}}),ea=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:i,rects:a,initialPlacement:l,platform:s,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...w}=ee(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const h=te(o),b=X(l),E=te(l)===l,C=await(s.isRTL==null?void 0:s.isRTL(c.floating)),k=p||(E||!y?[Ue(l)]:zi(l)),x=g!=="none";!p&&x&&k.push(...Xi(l,y,g,C));const R=[l,...k],S=await s.detectOverflow(t,w),T=[];let L=((r=i.flip)==null?void 0:r.overflows)||[];if(u&&T.push(S[h]),d){const M=Ui(o,a,C);T.push(S[M[0]],S[M[1]])}if(L=[...L,{placement:o,overflows:T}],!T.every(M=>M<=0)){var D,$;const M=(((D=i.flip)==null?void 0:D.index)||0)+1,O=R[M];if(O&&(!(d==="alignment"?b!==X(O):!1)||L.every(P=>X(P.placement)===b?P.overflows[0]>0:!0)))return{data:{index:M,overflows:L},reset:{placement:O}};let j=($=L.filter(I=>I.overflows[0]<=0).sort((I,P)=>I.overflows[1]-P.overflows[1])[0])==null?void 0:$.placement;if(!j)switch(m){case"bestFit":{var N;const I=(N=L.filter(P=>{if(x){const B=X(P.placement);return B===b||B==="y"}return!0}).map(P=>[P.placement,P.overflows.filter(B=>B>0).reduce((B,Y)=>B+Y,0)]).sort((P,B)=>P[1]-B[1])[0])==null?void 0:N[0];I&&(j=I);break}case"initialPlacement":j=l;break}if(o!==j)return{reset:{placement:j}}}return{}}}};function on(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function an(e){return Hi.some(t=>e[t]>=0)}const ta=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n,platform:r}=t,{strategy:o="referenceHidden",...i}=ee(e,t);switch(o){case"referenceHidden":{const a=await r.detectOverflow(t,{...i,elementContext:"reference"}),l=on(a,n.reference);return{data:{referenceHiddenOffsets:l,referenceHidden:an(l)}}}case"escaped":{const a=await r.detectOverflow(t,{...i,altBoundary:!0}),l=on(a,n.floating);return{data:{escapedOffsets:l,escaped:an(l)}}}default:return{}}}}},zn=new Set(["left","top"]);async function na(e,t){const{placement:n,platform:r,elements:o}=e,i=await(r.isRTL==null?void 0:r.isRTL(o.floating)),a=te(n),l=ve(n),s=X(n)==="y",c=zn.has(a)?-1:1,u=i&&s?-1:1,d=ee(t,e);let{mainAxis:p,crossAxis:m,alignmentAxis:g}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&typeof g=="number"&&(m=l==="end"?g*-1:g),s?{x:m*u,y:p*c}:{x:p*c,y:m*u}}const ra=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:i,placement:a,middlewareData:l}=t,s=await na(t,e);return a===((n=l.offset)==null?void 0:n.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:o+s.x,y:i+s.y,data:{...s,placement:a}}}}},oa=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o,platform:i}=t,{mainAxis:a=!0,crossAxis:l=!1,limiter:s={fn:h=>{let{x:b,y:E}=h;return{x:b,y:E}}},...c}=ee(e,t),u={x:n,y:r},d=await i.detectOverflow(t,c),p=X(te(o)),m=kt(p);let g=u[m],y=u[p];if(a){const h=m==="y"?"top":"left",b=m==="y"?"bottom":"right",E=g+d[h],C=g-d[b];g=pt(E,g,C)}if(l){const h=p==="y"?"top":"left",b=p==="y"?"bottom":"right",E=y+d[h],C=y-d[b];y=pt(E,y,C)}const w=s.fn({...t,[m]:g,[p]:y});return{...w,data:{x:w.x-n,y:w.y-r,enabled:{[m]:a,[p]:l}}}}}},ia=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:o,rects:i,middlewareData:a}=t,{offset:l=0,mainAxis:s=!0,crossAxis:c=!0}=ee(e,t),u={x:n,y:r},d=X(o),p=kt(d);let m=u[p],g=u[d];const y=ee(l,t),w=typeof y=="number"?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(s){const E=p==="y"?"height":"width",C=i.reference[p]-i.floating[E]+w.mainAxis,k=i.reference[p]+i.reference[E]-w.mainAxis;m<C?m=C:m>k&&(m=k)}if(c){var h,b;const E=p==="y"?"width":"height",C=zn.has(te(o)),k=i.reference[d]-i.floating[E]+(C&&((h=a.offset)==null?void 0:h[d])||0)+(C?0:w.crossAxis),x=i.reference[d]+i.reference[E]+(C?0:((b=a.offset)==null?void 0:b[d])||0)-(C?w.crossAxis:0);g<k?g=k:g>x&&(g=x)}return{[p]:m,[d]:g}}}},aa=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:o,rects:i,platform:a,elements:l}=t,{apply:s=()=>{},...c}=ee(e,t),u=await a.detectOverflow(t,c),d=te(o),p=ve(o),m=X(o)==="y",{width:g,height:y}=i.floating;let w,h;d==="top"||d==="bottom"?(w=d,h=p===(await(a.isRTL==null?void 0:a.isRTL(l.floating))?"start":"end")?"left":"right"):(h=d,w=p==="end"?"top":"bottom");const b=y-u.top-u.bottom,E=g-u.left-u.right,C=ae(y-u[w],b),k=ae(g-u[h],E),x=!t.middlewareData.shift;let R=C,S=k;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(S=E),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(R=b),x&&!p){const L=F(u.left,0),D=F(u.right,0),$=F(u.top,0),N=F(u.bottom,0);m?S=g-2*(L!==0||D!==0?L+D:F(u.left,u.right)):R=y-2*($!==0||N!==0?$+N:F(u.top,u.bottom))}await s({...t,availableWidth:S,availableHeight:R});const T=await a.getDimensions(l.floating);return g!==T.width||y!==T.height?{reset:{rects:!0}}:{}}}};function qe(){return typeof window<"u"}function we(e){return Jn(e)?(e.nodeName||"").toLowerCase():"#document"}function _(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function G(e){var t;return(t=(Jn(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Jn(e){return qe()?e instanceof Node||e instanceof _(e).Node:!1}function z(e){return qe()?e instanceof Element||e instanceof _(e).Element:!1}function re(e){return qe()?e instanceof HTMLElement||e instanceof _(e).HTMLElement:!1}function sn(e){return!qe()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof _(e).ShadowRoot}function Me(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=J(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&o!=="inline"&&o!=="contents"}function sa(e){return/^(table|td|th)$/.test(we(e))}function Ge(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const la=/transform|translate|scale|rotate|perspective|filter/,ca=/paint|layout|strict|content/,ce=e=>!!e&&e!=="none";let it;function Lt(e){const t=z(e)?J(e):e;return ce(t.transform)||ce(t.translate)||ce(t.scale)||ce(t.rotate)||ce(t.perspective)||!Mt()&&(ce(t.backdropFilter)||ce(t.filter))||la.test(t.willChange||"")||ca.test(t.contain||"")}function ua(e){let t=se(e);for(;re(t)&&!me(t);){if(Lt(t))return t;if(Ge(t))return null;t=se(t)}return null}function Mt(){return it==null&&(it=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),it}function me(e){return/^(html|body|#document)$/.test(we(e))}function J(e){return _(e).getComputedStyle(e)}function Qe(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function se(e){if(we(e)==="html")return e;const t=e.assignedSlot||e.parentNode||sn(e)&&e.host||G(e);return sn(t)?t.host:t}function Vn(e){const t=se(e);return me(t)?e.ownerDocument?e.ownerDocument.body:e.body:re(t)&&Me(t)?t:Vn(t)}function ke(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=Vn(e),i=o===((r=e.ownerDocument)==null?void 0:r.body),a=_(o);if(i){const l=ht(a);return t.concat(a,a.visualViewport||[],Me(o)?o:[],l&&n?ke(l):[])}else return t.concat(o,ke(o,[],n))}function ht(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Yn(e){const t=J(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=re(e),i=o?e.offsetWidth:n,a=o?e.offsetHeight:r,l=We(n)!==i||We(r)!==a;return l&&(n=i,r=a),{width:n,height:r,$:l}}function At(e){return z(e)?e:e.contextElement}function pe(e){const t=At(e);if(!re(t))return q(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:i}=Yn(t);let a=(i?We(n.width):n.width)/r,l=(i?We(n.height):n.height)/o;return(!a||!Number.isFinite(a))&&(a=1),(!l||!Number.isFinite(l))&&(l=1),{x:a,y:l}}const da=q(0);function Xn(e){const t=_(e);return!Mt()||!t.visualViewport?da:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function fa(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==_(e)?!1:t}function de(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),i=At(e);let a=q(1);t&&(r?z(r)&&(a=pe(r)):a=pe(e));const l=fa(i,n,r)?Xn(i):q(0);let s=(o.left+l.x)/a.x,c=(o.top+l.y)/a.y,u=o.width/a.x,d=o.height/a.y;if(i){const p=_(i),m=r&&z(r)?_(r):r;let g=p,y=ht(g);for(;y&&r&&m!==g;){const w=pe(y),h=y.getBoundingClientRect(),b=J(y),E=h.left+(y.clientLeft+parseFloat(b.paddingLeft))*w.x,C=h.top+(y.clientTop+parseFloat(b.paddingTop))*w.y;s*=w.x,c*=w.y,u*=w.x,d*=w.y,s+=E,c+=C,g=_(y),y=ht(g)}}return ze({width:u,height:d,x:s,y:c})}function Ke(e,t){const n=Qe(e).scrollLeft;return t?t.left+n:de(G(e)).left+n}function Zn(e,t){const n=e.getBoundingClientRect(),r=n.left+t.scrollLeft-Ke(e,n),o=n.top+t.scrollTop;return{x:r,y:o}}function pa(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const i=o==="fixed",a=G(r),l=t?Ge(t.floating):!1;if(r===a||l&&i)return n;let s={scrollLeft:0,scrollTop:0},c=q(1);const u=q(0),d=re(r);if((d||!d&&!i)&&((we(r)!=="body"||Me(a))&&(s=Qe(r)),d)){const m=de(r);c=pe(r),u.x=m.x+r.clientLeft,u.y=m.y+r.clientTop}const p=a&&!d&&!i?Zn(a,s):q(0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-s.scrollLeft*c.x+u.x+p.x,y:n.y*c.y-s.scrollTop*c.y+u.y+p.y}}function ma(e){return Array.from(e.getClientRects())}function ha(e){const t=G(e),n=Qe(e),r=e.ownerDocument.body,o=F(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=F(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-n.scrollLeft+Ke(e);const l=-n.scrollTop;return J(r).direction==="rtl"&&(a+=F(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:a,y:l}}const ln=25;function ga(e,t){const n=_(e),r=G(e),o=n.visualViewport;let i=r.clientWidth,a=r.clientHeight,l=0,s=0;if(o){i=o.width,a=o.height;const u=Mt();(!u||u&&t==="fixed")&&(l=o.offsetLeft,s=o.offsetTop)}const c=Ke(r);if(c<=0){const u=r.ownerDocument,d=u.body,p=getComputedStyle(d),m=u.compatMode==="CSS1Compat"&&parseFloat(p.marginLeft)+parseFloat(p.marginRight)||0,g=Math.abs(r.clientWidth-d.clientWidth-m);g<=ln&&(i-=g)}else c<=ln&&(i+=c);return{width:i,height:a,x:l,y:s}}function ya(e,t){const n=de(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=re(e)?pe(e):q(1),a=e.clientWidth*i.x,l=e.clientHeight*i.y,s=o*i.x,c=r*i.y;return{width:a,height:l,x:s,y:c}}function cn(e,t,n){let r;if(t==="viewport")r=ga(e,n);else if(t==="document")r=ha(G(e));else if(z(t))r=ya(t,n);else{const o=Xn(e);r={x:t.x-o.x,y:t.y-o.y,width:t.width,height:t.height}}return ze(r)}function qn(e,t){const n=se(e);return n===t||!z(n)||me(n)?!1:J(n).position==="fixed"||qn(n,t)}function xa(e,t){const n=t.get(e);if(n)return n;let r=ke(e,[],!1).filter(l=>z(l)&&we(l)!=="body"),o=null;const i=J(e).position==="fixed";let a=i?se(e):e;for(;z(a)&&!me(a);){const l=J(a),s=Lt(a);!s&&l.position==="fixed"&&(o=null),(i?!s&&!o:!s&&l.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||Me(a)&&!s&&qn(e,a))?r=r.filter(u=>u!==a):o=l,a=se(a)}return t.set(e,r),r}function va(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const a=[...n==="clippingAncestors"?Ge(t)?[]:xa(t,this._c):[].concat(n),r],l=cn(t,a[0],o);let s=l.top,c=l.right,u=l.bottom,d=l.left;for(let p=1;p<a.length;p++){const m=cn(t,a[p],o);s=F(m.top,s),c=ae(m.right,c),u=ae(m.bottom,u),d=F(m.left,d)}return{width:c-d,height:u-s,x:d,y:s}}function wa(e){const{width:t,height:n}=Yn(e);return{width:t,height:n}}function ba(e,t,n){const r=re(t),o=G(t),i=n==="fixed",a=de(e,!0,i,t);let l={scrollLeft:0,scrollTop:0};const s=q(0);function c(){s.x=Ke(o)}if(r||!r&&!i)if((we(t)!=="body"||Me(o))&&(l=Qe(t)),r){const m=de(t,!0,i,t);s.x=m.x+t.clientLeft,s.y=m.y+t.clientTop}else o&&c();i&&!r&&o&&c();const u=o&&!r&&!i?Zn(o,l):q(0),d=a.left+l.scrollLeft-s.x-u.x,p=a.top+l.scrollTop-s.y-u.y;return{x:d,y:p,width:a.width,height:a.height}}function at(e){return J(e).position==="static"}function un(e,t){if(!re(e)||J(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return G(e)===n&&(n=n.ownerDocument.body),n}function Gn(e,t){const n=_(e);if(Ge(e))return n;if(!re(e)){let o=se(e);for(;o&&!me(o);){if(z(o)&&!at(o))return o;o=se(o)}return n}let r=un(e,t);for(;r&&sa(r)&&at(r);)r=un(r,t);return r&&me(r)&&at(r)&&!Lt(r)?n:r||ua(e)||n}const Ra=async function(e){const t=this.getOffsetParent||Gn,n=this.getDimensions,r=await n(e.floating);return{reference:ba(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ea(e){return J(e).direction==="rtl"}const Ca={convertOffsetParentRelativeRectToViewportRelativeRect:pa,getDocumentElement:G,getClippingRect:va,getOffsetParent:Gn,getElementRects:Ra,getClientRects:ma,getDimensions:wa,getScale:pe,isElement:z,isRTL:Ea};function Qn(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ka(e,t){let n=null,r;const o=G(e);function i(){var l;clearTimeout(r),(l=n)==null||l.disconnect(),n=null}function a(l,s){l===void 0&&(l=!1),s===void 0&&(s=1),i();const c=e.getBoundingClientRect(),{left:u,top:d,width:p,height:m}=c;if(l||t(),!p||!m)return;const g=De(d),y=De(o.clientWidth-(u+p)),w=De(o.clientHeight-(d+m)),h=De(u),E={rootMargin:-g+"px "+-y+"px "+-w+"px "+-h+"px",threshold:F(0,ae(1,s))||1};let C=!0;function k(x){const R=x[0].intersectionRatio;if(R!==s){if(!C)return a();R?a(!1,R):r=setTimeout(()=>{a(!1,1e-7)},1e3)}R===1&&!Qn(c,e.getBoundingClientRect())&&a(),C=!1}try{n=new IntersectionObserver(k,{...E,root:o.ownerDocument})}catch{n=new IntersectionObserver(k,E)}n.observe(e)}return a(!0),i}function Sa(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:s=!1}=r,c=At(e),u=o||i?[...c?ke(c):[],...t?ke(t):[]]:[];u.forEach(h=>{o&&h.addEventListener("scroll",n,{passive:!0}),i&&h.addEventListener("resize",n)});const d=c&&l?ka(c,n):null;let p=-1,m=null;a&&(m=new ResizeObserver(h=>{let[b]=h;b&&b.target===c&&m&&t&&(m.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var E;(E=m)==null||E.observe(t)})),n()}),c&&!s&&m.observe(c),t&&m.observe(t));let g,y=s?de(e):null;s&&w();function w(){const h=de(e);y&&!Qn(y,h)&&n(),y=h,g=requestAnimationFrame(w)}return n(),()=>{var h;u.forEach(b=>{o&&b.removeEventListener("scroll",n),i&&b.removeEventListener("resize",n)}),d==null||d(),(h=m)==null||h.disconnect(),m=null,s&&cancelAnimationFrame(g)}}const Pa=ra,La=oa,Ma=ea,Aa=aa,Ta=ta,dn=Ki,Na=ia,Oa=(e,t,n)=>{const r=new Map,o={platform:Ca,...n},i={...o.platform,_c:r};return Qi(e,t,{...o,platform:i})};var ja=typeof document<"u",Ia=function(){},_e=ja?f.useLayoutEffect:Ia;function Je(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!Je(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;r--!==0;){const i=o[r];if(!(i==="_owner"&&e.$$typeof)&&!Je(e[i],t[i]))return!1}return!0}return e!==e&&t!==t}function Kn(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function fn(e,t){const n=Kn(e);return Math.round(t*n)/n}function st(e){const t=f.useRef(e);return _e(()=>{t.current=e}),t}function Da(e){e===void 0&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:i,floating:a}={},transform:l=!0,whileElementsMounted:s,open:c}=e,[u,d]=f.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[p,m]=f.useState(r);Je(p,r)||m(r);const[g,y]=f.useState(null),[w,h]=f.useState(null),b=f.useCallback(P=>{P!==x.current&&(x.current=P,y(P))},[]),E=f.useCallback(P=>{P!==R.current&&(R.current=P,h(P))},[]),C=i||g,k=a||w,x=f.useRef(null),R=f.useRef(null),S=f.useRef(u),T=s!=null,L=st(s),D=st(o),$=st(c),N=f.useCallback(()=>{if(!x.current||!R.current)return;const P={placement:t,strategy:n,middleware:p};D.current&&(P.platform=D.current),Oa(x.current,R.current,P).then(B=>{const Y={...B,isPositioned:$.current!==!1};M.current&&!Je(S.current,Y)&&(S.current=Y,gn.flushSync(()=>{d(Y)}))})},[p,t,n,D,$]);_e(()=>{c===!1&&S.current.isPositioned&&(S.current.isPositioned=!1,d(P=>({...P,isPositioned:!1})))},[c]);const M=f.useRef(!1);_e(()=>(M.current=!0,()=>{M.current=!1}),[]),_e(()=>{if(C&&(x.current=C),k&&(R.current=k),C&&k){if(L.current)return L.current(C,k,N);N()}},[C,k,N,L,T]);const O=f.useMemo(()=>({reference:x,floating:R,setReference:b,setFloating:E}),[b,E]),j=f.useMemo(()=>({reference:C,floating:k}),[C,k]),I=f.useMemo(()=>{const P={position:n,left:0,top:0};if(!j.floating)return P;const B=fn(j.floating,u.x),Y=fn(j.floating,u.y);return l?{...P,transform:"translate("+B+"px, "+Y+"px)",...Kn(j.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:B,top:Y}},[n,l,j.floating,u.x,u.y]);return f.useMemo(()=>({...u,update:N,refs:O,elements:j,floatingStyles:I}),[u,N,O,j,I])}const $a=e=>{function t(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:e,fn(n){const{element:r,padding:o}=typeof e=="function"?e(n):e;return r&&t(r)?r.current!=null?dn({element:r.current,padding:o}).fn(n):{}:r?dn({element:r,padding:o}).fn(n):{}}}},Ba=(e,t)=>{const n=Pa(e);return{name:n.name,fn:n.fn,options:[e,t]}},Fa=(e,t)=>{const n=La(e);return{name:n.name,fn:n.fn,options:[e,t]}},_a=(e,t)=>({fn:Na(e).fn,options:[e,t]}),Ha=(e,t)=>{const n=Ma(e);return{name:n.name,fn:n.fn,options:[e,t]}},Wa=(e,t)=>{const n=Aa(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ua=(e,t)=>{const n=Ta(e);return{name:n.name,fn:n.fn,options:[e,t]}},za=(e,t)=>{const n=$a(e);return{name:n.name,fn:n.fn,options:[e,t]}};var Ja="Arrow",er=f.forwardRef((e,t)=>{const{children:n,width:r=10,height:o=5,...i}=e;return v.jsx(le.svg,{...i,ref:t,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:v.jsx("polygon",{points:"0,0 30,0 15,10"})})});er.displayName=Ja;var Va=er;function Ya(e){const[t,n]=f.useState(void 0);return ie(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const i=o[0];let a,l;if("borderBoxSize"in i){const s=i.borderBoxSize,c=Array.isArray(s)?s[0]:s;a=c.inlineSize,l=c.blockSize}else a=e.offsetWidth,l=e.offsetHeight;n({width:a,height:l})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}var Tt="Popper",[tr,nr]=Bn(Tt),[Xa,rr]=tr(Tt),or=e=>{const{__scopePopper:t,children:n}=e,[r,o]=f.useState(null);return v.jsx(Xa,{scope:t,anchor:r,onAnchorChange:o,children:n})};or.displayName=Tt;var ir="PopperAnchor",ar=f.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...o}=e,i=rr(ir,n),a=f.useRef(null),l=fe(t,a),s=f.useRef(null);return f.useEffect(()=>{const c=s.current;s.current=(r==null?void 0:r.current)||a.current,c!==s.current&&i.onAnchorChange(s.current)}),r?null:v.jsx(le.div,{...o,ref:l})});ar.displayName=ir;var Nt="PopperContent",[Za,qa]=tr(Nt),sr=f.forwardRef((e,t)=>{var $t,Bt,Ft,_t,Ht,Wt;const{__scopePopper:n,side:r="bottom",sideOffset:o=0,align:i="center",alignOffset:a=0,arrowPadding:l=0,avoidCollisions:s=!0,collisionBoundary:c=[],collisionPadding:u=0,sticky:d="partial",hideWhenDetached:p=!1,updatePositionStrategy:m="optimized",onPlaced:g,...y}=e,w=rr(Nt,n),[h,b]=f.useState(null),E=fe(t,be=>b(be)),[C,k]=f.useState(null),x=Ya(C),R=(x==null?void 0:x.width)??0,S=(x==null?void 0:x.height)??0,T=r+(i!=="center"?"-"+i:""),L=typeof u=="number"?u:{top:0,right:0,bottom:0,left:0,...u},D=Array.isArray(c)?c:[c],$=D.length>0,N={padding:L,boundary:D.filter(Qa),altBoundary:$},{refs:M,floatingStyles:O,placement:j,isPositioned:I,middlewareData:P}=Da({strategy:"fixed",placement:T,whileElementsMounted:(...be)=>Sa(...be,{animationFrame:m==="always"}),elements:{reference:w.anchor},middleware:[Ba({mainAxis:o+S,alignmentAxis:a}),s&&Fa({mainAxis:!0,crossAxis:!1,limiter:d==="partial"?_a():void 0,...N}),s&&Ha({...N}),Wa({...N,apply:({elements:be,rects:Ut,availableWidth:Ar,availableHeight:Tr})=>{const{width:Nr,height:Or}=Ut.reference,je=be.floating.style;je.setProperty("--radix-popper-available-width",`${Ar}px`),je.setProperty("--radix-popper-available-height",`${Tr}px`),je.setProperty("--radix-popper-anchor-width",`${Nr}px`),je.setProperty("--radix-popper-anchor-height",`${Or}px`)}}),C&&za({element:C,padding:l}),Ka({arrowWidth:R,arrowHeight:S}),p&&Ua({strategy:"referenceHidden",...N})]}),[B,Y]=ur(j),Oe=Ze(g);ie(()=>{I&&(Oe==null||Oe())},[I,Oe]);const kr=($t=P.arrow)==null?void 0:$t.x,Sr=(Bt=P.arrow)==null?void 0:Bt.y,Pr=((Ft=P.arrow)==null?void 0:Ft.centerOffset)!==0,[Lr,Mr]=f.useState();return ie(()=>{h&&Mr(window.getComputedStyle(h).zIndex)},[h]),v.jsx("div",{ref:M.setFloating,"data-radix-popper-content-wrapper":"",style:{...O,transform:I?O.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Lr,"--radix-popper-transform-origin":[(_t=P.transformOrigin)==null?void 0:_t.x,(Ht=P.transformOrigin)==null?void 0:Ht.y].join(" "),...((Wt=P.hide)==null?void 0:Wt.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:v.jsx(Za,{scope:n,placedSide:B,onArrowChange:k,arrowX:kr,arrowY:Sr,shouldHideArrow:Pr,children:v.jsx(le.div,{"data-side":B,"data-align":Y,...y,ref:E,style:{...y.style,animation:I?void 0:"none"}})})})});sr.displayName=Nt;var lr="PopperArrow",Ga={top:"bottom",right:"left",bottom:"top",left:"right"},cr=f.forwardRef(function(t,n){const{__scopePopper:r,...o}=t,i=qa(lr,r),a=Ga[i.placedSide];return v.jsx("span",{ref:i.onArrowChange,style:{position:"absolute",left:i.arrowX,top:i.arrowY,[a]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[i.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[i.placedSide],visibility:i.shouldHideArrow?"hidden":void 0},children:v.jsx(Va,{...o,ref:n,style:{...o.style,display:"block"}})})});cr.displayName=lr;function Qa(e){return e!==null}var Ka=e=>({name:"transformOrigin",options:e,fn(t){var w,h,b;const{placement:n,rects:r,middlewareData:o}=t,a=((w=o.arrow)==null?void 0:w.centerOffset)!==0,l=a?0:e.arrowWidth,s=a?0:e.arrowHeight,[c,u]=ur(n),d={start:"0%",center:"50%",end:"100%"}[u],p=(((h=o.arrow)==null?void 0:h.x)??0)+l/2,m=(((b=o.arrow)==null?void 0:b.y)??0)+s/2;let g="",y="";return c==="bottom"?(g=a?d:`${p}px`,y=`${-s}px`):c==="top"?(g=a?d:`${p}px`,y=`${r.floating.height+s}px`):c==="right"?(g=`${-s}px`,y=a?d:`${m}px`):c==="left"&&(g=`${r.floating.width+s}px`,y=a?d:`${m}px`),{data:{x:g,y}}}});function ur(e){const[t,n="center"]=e.split("-");return[t,n]}var es=or,ts=ar,ns=sr,rs=cr,os="Portal",dr=f.forwardRef((e,t)=>{var l;const{container:n,...r}=e,[o,i]=f.useState(!1);ie(()=>i(!0),[]);const a=n||o&&((l=globalThis==null?void 0:globalThis.document)==null?void 0:l.body);return a?jr.createPortal(v.jsx(le.div,{...r,ref:t}),a):null});dr.displayName=os;function is(e,t){return f.useReducer((n,r)=>t[n][r]??n,e)}var Ot=e=>{const{present:t,children:n}=e,r=as(t),o=typeof n=="function"?n({present:r.isPresent}):f.Children.only(n),i=fe(r.ref,ss(o));return typeof n=="function"||r.isPresent?f.cloneElement(o,{ref:i}):null};Ot.displayName="Presence";function as(e){const[t,n]=f.useState(),r=f.useRef(null),o=f.useRef(e),i=f.useRef("none"),a=e?"mounted":"unmounted",[l,s]=is(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return f.useEffect(()=>{const c=$e(r.current);i.current=l==="mounted"?c:"none"},[l]),ie(()=>{const c=r.current,u=o.current;if(u!==e){const p=i.current,m=$e(c);e?s("MOUNT"):m==="none"||(c==null?void 0:c.display)==="none"?s("UNMOUNT"):s(u&&p!==m?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,s]),ie(()=>{if(t){let c;const u=t.ownerDocument.defaultView??window,d=m=>{const y=$e(r.current).includes(CSS.escape(m.animationName));if(m.target===t&&y&&(s("ANIMATION_END"),!o.current)){const w=t.style.animationFillMode;t.style.animationFillMode="forwards",c=u.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=w)})}},p=m=>{m.target===t&&(i.current=$e(r.current))};return t.addEventListener("animationstart",p),t.addEventListener("animationcancel",d),t.addEventListener("animationend",d),()=>{u.clearTimeout(c),t.removeEventListener("animationstart",p),t.removeEventListener("animationcancel",d),t.removeEventListener("animationend",d)}}else s("ANIMATION_END")},[t,s]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:f.useCallback(c=>{r.current=c?getComputedStyle(c):null,n(c)},[])}}function $e(e){return(e==null?void 0:e.animationName)||"none"}function ss(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var ls=yn[" useInsertionEffect ".trim().toString()]||ie;function cs({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,i,a]=us({defaultProp:t,onChange:n}),l=e!==void 0,s=l?e:o;{const u=f.useRef(e!==void 0);f.useEffect(()=>{const d=u.current;d!==l&&console.warn(`${r} is changing from ${d?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),u.current=l},[l,r])}const c=f.useCallback(u=>{var d;if(l){const p=ds(u)?u(e):u;p!==e&&((d=a.current)==null||d.call(a,p))}else i(u)},[l,e,i,a]);return[s,c]}function us({defaultProp:e,onChange:t}){const[n,r]=f.useState(e),o=f.useRef(n),i=f.useRef(t);return ls(()=>{i.current=t},[t]),f.useEffect(()=>{var a;o.current!==n&&((a=i.current)==null||a.call(i,n),o.current=n)},[n,o]),[n,r,i]}function ds(e){return typeof e=="function"}var fs=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),ps="VisuallyHidden",fr=f.forwardRef((e,t)=>v.jsx(le.span,{...e,ref:t,style:{...fs,...e.style}}));fr.displayName=ps;var ms=fr,[et]=Bn("Tooltip",[nr]),tt=nr(),pr="TooltipProvider",hs=700,gt="tooltip.open",[gs,jt]=et(pr),mr=e=>{const{__scopeTooltip:t,delayDuration:n=hs,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:i}=e,a=f.useRef(!0),l=f.useRef(!1),s=f.useRef(0);return f.useEffect(()=>{const c=s.current;return()=>window.clearTimeout(c)},[]),v.jsx(gs,{scope:t,isOpenDelayedRef:a,delayDuration:n,onOpen:f.useCallback(()=>{window.clearTimeout(s.current),a.current=!1},[]),onClose:f.useCallback(()=>{window.clearTimeout(s.current),s.current=window.setTimeout(()=>a.current=!0,r)},[r]),isPointerInTransitRef:l,onPointerInTransitChange:f.useCallback(c=>{l.current=c},[]),disableHoverableContent:o,children:i})};mr.displayName=pr;var Se="Tooltip",[ys,Ae]=et(Se),hr=e=>{const{__scopeTooltip:t,children:n,open:r,defaultOpen:o,onOpenChange:i,disableHoverableContent:a,delayDuration:l}=e,s=jt(Se,e.__scopeTooltip),c=tt(t),[u,d]=f.useState(null),p=_i(),m=f.useRef(0),g=a??s.disableHoverableContent,y=l??s.delayDuration,w=f.useRef(!1),[h,b]=cs({prop:r,defaultProp:o??!1,onChange:R=>{R?(s.onOpen(),document.dispatchEvent(new CustomEvent(gt))):s.onClose(),i==null||i(R)},caller:Se}),E=f.useMemo(()=>h?w.current?"delayed-open":"instant-open":"closed",[h]),C=f.useCallback(()=>{window.clearTimeout(m.current),m.current=0,w.current=!1,b(!0)},[b]),k=f.useCallback(()=>{window.clearTimeout(m.current),m.current=0,b(!1)},[b]),x=f.useCallback(()=>{window.clearTimeout(m.current),m.current=window.setTimeout(()=>{w.current=!0,b(!0),m.current=0},y)},[y,b]);return f.useEffect(()=>()=>{m.current&&(window.clearTimeout(m.current),m.current=0)},[]),v.jsx(es,{...c,children:v.jsx(ys,{scope:t,contentId:p,open:h,stateAttribute:E,trigger:u,onTriggerChange:d,onTriggerEnter:f.useCallback(()=>{s.isOpenDelayedRef.current?x():C()},[s.isOpenDelayedRef,x,C]),onTriggerLeave:f.useCallback(()=>{g?k():(window.clearTimeout(m.current),m.current=0)},[k,g]),onOpen:C,onClose:k,disableHoverableContent:g,children:n})})};hr.displayName=Se;var yt="TooltipTrigger",gr=f.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=Ae(yt,n),i=jt(yt,n),a=tt(n),l=f.useRef(null),s=fe(t,l,o.onTriggerChange),c=f.useRef(!1),u=f.useRef(!1),d=f.useCallback(()=>c.current=!1,[]);return f.useEffect(()=>()=>document.removeEventListener("pointerup",d),[d]),v.jsx(ts,{asChild:!0,...a,children:v.jsx(le.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:s,onPointerMove:Q(e.onPointerMove,p=>{p.pointerType!=="touch"&&!u.current&&!i.isPointerInTransitRef.current&&(o.onTriggerEnter(),u.current=!0)}),onPointerLeave:Q(e.onPointerLeave,()=>{o.onTriggerLeave(),u.current=!1}),onPointerDown:Q(e.onPointerDown,()=>{o.open&&o.onClose(),c.current=!0,document.addEventListener("pointerup",d,{once:!0})}),onFocus:Q(e.onFocus,()=>{c.current||o.onOpen()}),onBlur:Q(e.onBlur,o.onClose),onClick:Q(e.onClick,o.onClose)})})});gr.displayName=yt;var It="TooltipPortal",[xs,vs]=et(It,{forceMount:void 0}),yr=e=>{const{__scopeTooltip:t,forceMount:n,children:r,container:o}=e,i=Ae(It,t);return v.jsx(xs,{scope:t,forceMount:n,children:v.jsx(Ot,{present:n||i.open,children:v.jsx(dr,{asChild:!0,container:o,children:r})})})};yr.displayName=It;var he="TooltipContent",xr=f.forwardRef((e,t)=>{const n=vs(he,e.__scopeTooltip),{forceMount:r=n.forceMount,side:o="top",...i}=e,a=Ae(he,e.__scopeTooltip);return v.jsx(Ot,{present:r||a.open,children:a.disableHoverableContent?v.jsx(vr,{side:o,...i,ref:t}):v.jsx(ws,{side:o,...i,ref:t})})}),ws=f.forwardRef((e,t)=>{const n=Ae(he,e.__scopeTooltip),r=jt(he,e.__scopeTooltip),o=f.useRef(null),i=fe(t,o),[a,l]=f.useState(null),{trigger:s,onClose:c}=n,u=o.current,{onPointerInTransitChange:d}=r,p=f.useCallback(()=>{l(null),d(!1)},[d]),m=f.useCallback((g,y)=>{const w=g.currentTarget,h={x:g.clientX,y:g.clientY},b=Cs(h,w.getBoundingClientRect()),E=ks(h,b),C=Ss(y.getBoundingClientRect()),k=Ls([...E,...C]);l(k),d(!0)},[d]);return f.useEffect(()=>()=>p(),[p]),f.useEffect(()=>{if(s&&u){const g=w=>m(w,u),y=w=>m(w,s);return s.addEventListener("pointerleave",g),u.addEventListener("pointerleave",y),()=>{s.removeEventListener("pointerleave",g),u.removeEventListener("pointerleave",y)}}},[s,u,m,p]),f.useEffect(()=>{if(a){const g=y=>{const w=y.target,h={x:y.clientX,y:y.clientY},b=(s==null?void 0:s.contains(w))||(u==null?void 0:u.contains(w)),E=!Ps(h,a);b?p():E&&(p(),c())};return document.addEventListener("pointermove",g),()=>document.removeEventListener("pointermove",g)}},[s,u,a,c,p]),v.jsx(vr,{...e,ref:i})}),[bs,Rs]=et(Se,{isInside:!1}),Es=Ci("TooltipContent"),vr=f.forwardRef((e,t)=>{const{__scopeTooltip:n,children:r,"aria-label":o,onEscapeKeyDown:i,onPointerDownOutside:a,...l}=e,s=Ae(he,n),c=tt(n),{onClose:u}=s;return f.useEffect(()=>(document.addEventListener(gt,u),()=>document.removeEventListener(gt,u)),[u]),f.useEffect(()=>{if(s.trigger){const d=p=>{const m=p.target;m!=null&&m.contains(s.trigger)&&u()};return window.addEventListener("scroll",d,{capture:!0}),()=>window.removeEventListener("scroll",d,{capture:!0})}},[s.trigger,u]),v.jsx(Hn,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:i,onPointerDownOutside:a,onFocusOutside:d=>d.preventDefault(),onDismiss:u,children:v.jsxs(ns,{"data-state":s.stateAttribute,...c,...l,ref:t,style:{...l.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[v.jsx(Es,{children:r}),v.jsx(bs,{scope:n,isInside:!0,children:v.jsx(ms,{id:s.contentId,role:"tooltip",children:o||r})})]})})});xr.displayName=he;var wr="TooltipArrow",br=f.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=tt(n);return Rs(wr,n).isInside?null:v.jsx(rs,{...o,...r,ref:t})});br.displayName=wr;function Cs(e,t){const n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),i=Math.abs(t.left-e.x);switch(Math.min(n,r,o,i)){case i:return"left";case o:return"right";case n:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function ks(e,t,n=5){const r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return r}function Ss(e){const{top:t,right:n,bottom:r,left:o}=e;return[{x:o,y:t},{x:n,y:t},{x:n,y:r},{x:o,y:r}]}function Ps(e,t){const{x:n,y:r}=e;let o=!1;for(let i=0,a=t.length-1;i<t.length;a=i++){const l=t[i],s=t[a],c=l.x,u=l.y,d=s.x,p=s.y;u>r!=p>r&&n<(d-c)*(r-u)/(p-u)+c&&(o=!o)}return o}function Ls(e){const t=e.slice();return t.sort((n,r)=>n.x<r.x?-1:n.x>r.x?1:n.y<r.y?-1:n.y>r.y?1:0),Ms(t)}function Ms(e){if(e.length<=1)return e.slice();const t=[];for(let r=0;r<e.length;r++){const o=e[r];for(;t.length>=2;){const i=t[t.length-1],a=t[t.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))t.pop();else break}t.push(o)}t.pop();const n=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;n.length>=2;){const i=n[n.length-1],a=n[n.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))n.pop();else break}n.push(o)}return n.pop(),t.length===1&&n.length===1&&t[0].x===n[0].x&&t[0].y===n[0].y?t:t.concat(n)}var As=mr,Ts=hr,Ns=gr,Os=yr,js=xr,Is=br;const Ds=({children:e})=>v.jsx(As,{delayDuration:200,children:e}),Dt=({content:e,children:t})=>v.jsxs(Ts,{children:[v.jsx(Ns,{asChild:!0,children:t}),v.jsx(Os,{children:v.jsxs(js,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,v.jsx(Is,{className:"fill-secondary",width:8,height:4})]})})]}),$s=({value:e,className:t="",...n})=>v.jsxs("form",{action:"https://codesandbox.io/api/v1/sandboxes/define",method:"POST",target:"_blank",children:[v.jsx("input",{type:"hidden",name:"parameters",value:e}),v.jsx(Dt,{content:"Edit example on codesandbox",children:v.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...n,children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),v.jsx("polyline",{points:"7.5 4.21 12 6.81 16.5 4.21"}),v.jsx("polyline",{points:"7.5 19.79 7.5 14.6 3 12"}),v.jsx("polyline",{points:"21 12 16.5 14.6 16.5 19.79"}),v.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),v.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})})})]}),Bs=()=>v.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:v.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function Fs({children:e,path:t}){return v.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[t&&v.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:v.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:t})}),v.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const Rr=f.forwardRef(({isActive:e,children:t,className:n="",...r},o)=>v.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:t}));Rr.displayName="Link";const _s=({files:e,template:t="typescript",className:n="",...r})=>v.jsxs("form",{action:"https://stackblitz.com/run",method:"POST",target:"_blank",children:[v.jsx("input",{type:"hidden",name:"project[title]",value:"Joymap Example"}),v.jsx("input",{type:"hidden",name:"project[template]",value:t}),Object.entries(e).map(([o,i])=>i.isBinary?null:v.jsx("input",{type:"hidden",name:`project[files][${o}]`,value:i.content},o)),v.jsx(Dt,{content:"Edit example on stackblitz",children:v.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:v.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:v.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})]}),Hs="/joymap/assets/logo-BXshXfNv.png";var Er={exports:{}};(function(e){var t=function(){var n=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={};function a(s,c){if(!i[s]){i[s]={};for(var u=0;u<s.length;u++)i[s][s.charAt(u)]=u}return i[s][c]}var l={compressToBase64:function(s){if(s==null)return"";var c=l._compress(s,6,function(u){return r.charAt(u)});switch(c.length%4){default:case 0:return c;case 1:return c+"===";case 2:return c+"==";case 3:return c+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:l._decompress(s.length,32,function(c){return a(r,s.charAt(c))})},compressToUTF16:function(s){return s==null?"":l._compress(s,15,function(c){return n(c+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:l._decompress(s.length,16384,function(c){return s.charCodeAt(c)-32})},compressToUint8Array:function(s){for(var c=l.compress(s),u=new Uint8Array(c.length*2),d=0,p=c.length;d<p;d++){var m=c.charCodeAt(d);u[d*2]=m>>>8,u[d*2+1]=m%256}return u},decompressFromUint8Array:function(s){if(s==null)return l.decompress(s);for(var c=new Array(s.length/2),u=0,d=c.length;u<d;u++)c[u]=s[u*2]*256+s[u*2+1];var p=[];return c.forEach(function(m){p.push(n(m))}),l.decompress(p.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":l._compress(s,6,function(c){return o.charAt(c)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),l._decompress(s.length,32,function(c){return a(o,s.charAt(c))}))},compress:function(s){return l._compress(s,16,function(c){return n(c)})},_compress:function(s,c,u){if(s==null)return"";var d,p,m={},g={},y="",w="",h="",b=2,E=3,C=2,k=[],x=0,R=0,S;for(S=0;S<s.length;S+=1)if(y=s.charAt(S),Object.prototype.hasOwnProperty.call(m,y)||(m[y]=E++,g[y]=!0),w=h+y,Object.prototype.hasOwnProperty.call(m,w))h=w;else{if(Object.prototype.hasOwnProperty.call(g,h)){if(h.charCodeAt(0)<256){for(d=0;d<C;d++)x=x<<1,R==c-1?(R=0,k.push(u(x)),x=0):R++;for(p=h.charCodeAt(0),d=0;d<8;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1}else{for(p=1,d=0;d<C;d++)x=x<<1|p,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=0;for(p=h.charCodeAt(0),d=0;d<16;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1}b--,b==0&&(b=Math.pow(2,C),C++),delete g[h]}else for(p=m[h],d=0;d<C;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1;b--,b==0&&(b=Math.pow(2,C),C++),m[w]=E++,h=String(y)}if(h!==""){if(Object.prototype.hasOwnProperty.call(g,h)){if(h.charCodeAt(0)<256){for(d=0;d<C;d++)x=x<<1,R==c-1?(R=0,k.push(u(x)),x=0):R++;for(p=h.charCodeAt(0),d=0;d<8;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1}else{for(p=1,d=0;d<C;d++)x=x<<1|p,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=0;for(p=h.charCodeAt(0),d=0;d<16;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1}b--,b==0&&(b=Math.pow(2,C),C++),delete g[h]}else for(p=m[h],d=0;d<C;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1;b--,b==0&&(b=Math.pow(2,C),C++)}for(p=2,d=0;d<C;d++)x=x<<1|p&1,R==c-1?(R=0,k.push(u(x)),x=0):R++,p=p>>1;for(;;)if(x=x<<1,R==c-1){k.push(u(x));break}else R++;return k.join("")},decompress:function(s){return s==null?"":s==""?null:l._decompress(s.length,32768,function(c){return s.charCodeAt(c)})},_decompress:function(s,c,u){var d=[],p=4,m=4,g=3,y="",w=[],h,b,E,C,k,x,R,S={val:u(0),position:c,index:1};for(h=0;h<3;h+=1)d[h]=h;for(E=0,k=Math.pow(2,2),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;switch(E){case 0:for(E=0,k=Math.pow(2,8),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;R=n(E);break;case 1:for(E=0,k=Math.pow(2,16),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;R=n(E);break;case 2:return""}for(d[3]=R,b=R,w.push(R);;){if(S.index>s)return"";for(E=0,k=Math.pow(2,g),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;switch(R=E){case 0:for(E=0,k=Math.pow(2,8),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;d[m++]=n(E),R=m-1,p--;break;case 1:for(E=0,k=Math.pow(2,16),x=1;x!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),E|=(C>0?1:0)*x,x<<=1;d[m++]=n(E),R=m-1,p--;break;case 2:return w.join("")}if(p==0&&(p=Math.pow(2,g),g++),d[R])y=d[R];else if(R===m)y=b+b.charAt(0);else return null;w.push(y),d[m++]=b+y.charAt(0),p--,b=y,p==0&&(p=Math.pow(2,g),g++)}}};return l}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Er);var Ws=Er.exports;const Us=Dr(Ws),zs="2.2.4",Js={lodash:"^4.17.21"},Vs={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},oe={version:zs,dependencies:Js,devDependencies:Vs},{devDependencies:ue,version:Ys}=oe,Xs=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/public\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L2.png'"]];function W(e){return Xs.reduce((t,[n,r])=>t.replaceAll(n,r),e)}const Te={isBinary:!1,content:JSON.stringify({compilerOptions:{target:"esnext",module:"commonjs",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}})};function Ne({dependencies:e={},devDependencies:t={},hasLodash:n=!0,hasReact:r=!1,reactScripts:o=!1}={}){return JSON.stringify({main:"./index.ts",dependencies:{joymap:oe.version,tslib:"latest",...n?{lodash:oe.dependencies.lodash}:{},...r?{react:oe.devDependencies.react,"react-dom":oe.devDependencies["react-dom"]}:{},...e},devDependencies:{...n?{"@types/lodash":oe.devDependencies["@types/lodash"]}:{},...r?{"@types/react":oe.devDependencies["@types/react"],"@types/react-dom":oe.devDependencies["@types/react-dom"]}:{},...o?{"react-scripts":"latest"}:{parcel:"latest"},...t},...o?{scripts:{start:"react-scripts start",build:"react-scripts build"}}:{}})}function Ee(e){const t=JSON.stringify({files:e});return Us.compressToBase64(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Zs=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
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
`,qs=`import { LoremIpsum } from 'lorem-ipsum';\r
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
`,Gs=`body {
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

`,Qs=`import React, { useEffect, useState } from 'react';\r
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
`,Ks=`<!doctype html>\r
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
`,el=`import './Editor';\r
`,tl={"Editor.tsx":{content:W(Qs),isBinary:!1},"commands.ts":{content:W(qs),isBinary:!1},"custom.css":{content:W(Gs),isBinary:!1},"index.ts":{content:W(el),isBinary:!1},"index.html":{content:Ks,isBinary:!1},"ckHelpers.ts":{content:W(Zs),isBinary:!1},"package.json":{isBinary:!1,content:Ne({hasLodash:!1,hasReact:!0,reactScripts:!0,dependencies:{"@ckeditor/ckeditor5-react":ue["@ckeditor/ckeditor5-react"],ckeditor5:ue.ckeditor5,"lorem-ipsum":ue["lorem-ipsum"]}})},"tsconfig.json":Te},nl=`body {\r
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
`,rl=`<!doctype html>\r
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
`,ol=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,pn={"index.ts":{content:W(ol),isBinary:!1},"Fighting.css":{content:nl,isBinary:!1},"index.html":{content:rl,isBinary:!1},"package.json":{isBinary:!1,content:Ne({hasLodash:!0,hasReact:!1})},"tsconfig.json":Te},il=`<!doctype html>\r
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
`,al=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,sl=`.main-container {\r
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
`,ll=`import { InputResult, Mapper } from 'joymap';\r
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
`,mn={"index.ts":{content:W(al),isBinary:!1},"utils.ts":{content:W(ll),isBinary:!1},"Log.css":{content:sl,isBinary:!1},"index.html":{content:il,isBinary:!1},"package.json":{isBinary:!1,content:Ne({hasLodash:!0,hasReact:!1})},"tsconfig.json":Te},cl=`import React, { ReactNode, useState } from 'react';\r
import { QueryModule } from 'joymap';\r
\r
import gamepadUrl from '@/public/assets/gamepad.png';\r
import l1Url from '@/public/assets/L1.png';\r
import l2Url from '@/public/assets/L2.png';\r
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
`,ul=`<!doctype html>\r
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
`,dl=`import './Main';\r
`,fl=`import React, { useEffect, useState } from 'react';\r
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
`,pl={"index.ts":{content:W(dl),isBinary:!1},"Main.tsx":{content:W(fl),isBinary:!1},"Gamepad.tsx":{content:W(cl),isBinary:!1},"index.html":{content:ul,isBinary:!1},"package.json":{isBinary:!1,content:Ne({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":ue["color-hash"],tinycolor2:ue.tinycolor2},devDependencies:{"@types/color-hash":ue["@types/color-hash"],"@types/tinycolor2":ue["@types/tinycolor2"]}})},"tsconfig.json":Te},ml=`<!doctype html>\r
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
`,hl=`// Simple canvas example that doesn't use any other library nor ES6 features\r
import { createJoymap, createQueryModule, QueryModule } from 'joymap';\r
\r
import gamepadUrl from '@/public/assets/gamepad.png';\r
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
  color?: Color;\r
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
  color: Color;\r
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
function createTintedSprite(color: string) {\r
  const c = document.createElement('canvas');\r
  c.width = gamepadImage.width;\r
  c.height = gamepadImage.height;\r
\r
  const ctx = c.getContext('2d')!;\r
\r
  ctx.drawImage(gamepadImage, 0, 0);\r
  ctx.globalCompositeOperation = 'multiply';\r
  ctx.fillStyle = color;\r
  ctx.fillRect(0, 0, c.width, c.height);\r
\r
  ctx.globalCompositeOperation = 'destination-in';\r
  ctx.drawImage(gamepadImage, 0, 0);\r
  ctx.globalCompositeOperation = 'source-over';\r
  return c;\r
}\r
\r
// Get the canvas context so we can draw on it\r
const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(\r
  '2d',\r
) as CanvasRenderingContext2D;\r
\r
const colorList = ['#debabd', '#debad5', '#bad5de', '#baded6', '#d6bade'] as const;\r
type Color = (typeof colorList)[number];\r
let colorSprites: Record<Color, HTMLCanvasElement>;\r
\r
gamepadImage.onload = () => {\r
  colorSprites = {} as Record<Color, HTMLCanvasElement>;\r
\r
  for (let key of colorList) {\r
    colorSprites[key] = createTintedSprite(key);\r
  }\r
};\r
\r
let charCounter = 0;\r
\r
function createCharacter(\r
  padId: string,\r
  { width, height }: { width: number; height: number },\r
): Character {\r
  const color = colorList[charCounter];\r
  charCounter = (charCounter + 1) % colorList.length;\r
\r
  return {\r
    module: createQueryModule({ padId, autoConnect: false }),\r
    color,\r
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
function drawElement(ctx: CanvasRenderingContext2D, element: Element, image: CanvasImageSource) {\r
  const { x, y, angle, rotationOffset, width, height } = element;\r
\r
  // Rotate whole canvas\r
  ctx.translate(x, y);\r
  ctx.rotate(angle + rotationOffset);\r
  ctx.translate(-x, -y);\r
\r
  // Draw straight image onto the rotated canvas\r
  ctx.drawImage(image, x - width * 0.5, y - height * 0.5, width, height);\r
\r
  // Unrotate canvas to straighten it and leave the image rotated instead\r
  ctx.translate(x, y);\r
  ctx.rotate(-angle - rotationOffset);\r
  ctx.translate(-x, -y);\r
}\r
\r
const joymap = createJoymap({\r
  onPoll: function onPoll() {\r
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
\r
      drawElement(ctx, bullet, gamepadImage);\r
    });\r
\r
    characters.forEach((c) => {\r
      if (c.module.isConnected()) {\r
        updateCharacter(c, bullets);\r
        drawElement(ctx, c, colorSprites[c.color]);\r
      }\r
    });\r
  },\r
});\r
\r
joymap.start();\r
`,hn={"index.ts":{content:W(hl),isBinary:!1},"index.html":{content:ml,isBinary:!1},"package.json":{isBinary:!1,content:Ne({hasLodash:!1,hasReact:!1})},"tsconfig.json":Te},lt={readme:{html:"examples/pages/Readme/index.html",title:"Readme",tags:[]},react:{html:"examples/pages/React/index.html",title:"React Example",gitPath:"tree/master/examples/pages/React",codesandbox:Ee(pl),tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",title:"Fighting Example",gitPath:"tree/master/examples/pages/Fighting",codesandbox:Ee(pn),stackblitz:pn,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",title:"Rumble Example",gitPath:"tree/master/examples/pages/Rumble",codesandbox:Ee(hn),stackblitz:hn,tags:["queryModule","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",title:"Log Example",gitPath:"tree/master/examples/pages/Log",codesandbox:Ee(mn),stackblitz:mn,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",title:"Editor Example",gitPath:"tree/master/examples/pages/Editor",codesandbox:Ee(tl),tags:["eventModule","react"],description:"A text editor example that binds gamepad buttons to keyboard events."}};function gl(){const{page:e}=wo(),t=wt(),n=Object.keys(lt).includes(e??"")?e:"readme",r=i=>t(`/examples/${i}`),o=lt[n];return o?v.jsx(Ds,{children:v.jsxs("div",{className:"flex h-screen flex-col",children:[v.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:v.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:v.jsx("img",{src:Hs})}),v.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),v.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:v.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(lt).map(i=>{const a=i===n;return v.jsx(gi,{role:"tab",onClick:()=>r(i),isActive:a,children:i},i)})})})]})}),v.jsx("main",{className:"flex w-full flex-1 flex-col",children:v.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[v.jsxs("div",{className:"mb-6",children:[v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("div",{className:"flex flex-wrap gap-3",children:o.tags.map(i=>v.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:i},i))}),v.jsxs("div",{className:"flex justify-end",children:[!!o.codesandbox&&v.jsx($s,{value:o.codesandbox}),!!o.stackblitz&&v.jsx(_s,{files:o.stackblitz}),o.gitPath&&v.jsx(Dt,{content:"View example on github",children:v.jsx(Rr,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${o.gitPath}`,children:v.jsx(Bs,{})})})]})]}),v.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:o.description})]}),o.code&&v.jsx(wi,{code:o.code}),v.jsx(Fs,{path:n==="readme"?"README.md":o.html.replace(/\/index\.html$/,"/"),children:v.jsx("iframe",{src:`/${o.html}`,className:"relative block h-full w-full"},o.html)})]})}),v.jsx("footer",{className:"border-t border-border py-4",children:v.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:v.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",Ys]})})})]})}):null}const Cr=document.createElement("div");document.body.appendChild(Cr);const yl=Ir(Cr);yl.render(v.jsx(ai,{children:v.jsxs(Do,{children:[v.jsx(ut,{path:"/examples/:page",element:v.jsx(gl,{})}),v.jsx(ut,{path:"/",element:v.jsx(jo,{to:"/examples/readme",replace:!0})})]})}));
//# sourceMappingURL=main-CGOGFdki.js.map
