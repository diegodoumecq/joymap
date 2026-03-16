import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as p,j as v,a as gn,R as xn,b as Ir,c as Nr}from"./client-vbRJSMsA.js";import{g as Dr}from"./_commonjsHelpers-Cpj98o6Y.js";/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var zt="popstate";function Jt(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function $r(e={}){function t(r,o){var c;let a=(c=o.state)==null?void 0:c.masked,{pathname:i,search:l,hash:s}=a||r.location;return ct("",{pathname:i,search:l,hash:s},o.state&&o.state.usr||null,o.state&&o.state.key||"default",a?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,o){return typeof o=="string"?o:Se(o)}return Fr(t,n,null,e)}function A(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function U(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Br(){return Math.random().toString(36).substring(2,10)}function Vt(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ct(e,t,n=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?xe(t):t,state:n,key:t&&t.key||r||Br(),unstable_mask:o}}function Se({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function xe(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Fr(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:a=!1}=r,i=o.history,l="POP",s=null,c=u();c==null&&(c=0,i.replaceState({...i.state,idx:c},""));function u(){return(i.state||{idx:null}).idx}function d(){l="POP";let w=u(),h=w==null?null:w-c;c=w,s&&s({action:l,location:x.location,delta:h})}function f(w,h){l="PUSH";let b=Jt(w)?w:ct(x.location,w,h);c=u()+1;let R=Vt(b,c),C=x.createHref(b.unstable_mask||b);try{i.pushState(R,"",C)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(C)}a&&s&&s({action:l,location:x.location,delta:1})}function m(w,h){l="REPLACE";let b=Jt(w)?w:ct(x.location,w,h);c=u();let R=Vt(b,c),C=x.createHref(b.unstable_mask||b);i.replaceState(R,"",C),a&&s&&s({action:l,location:x.location,delta:0})}function g(w){return _r(w)}let x={get action(){return l},get location(){return e(o,i)},listen(w){if(s)throw new Error("A history only accepts one active listener");return o.addEventListener(zt,d),s=w,()=>{o.removeEventListener(zt,d),s=null}},createHref(w){return t(o,w)},createURL:g,encodeLocation(w){let h=g(w);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:f,replace:m,go(w){return i.go(w)}};return x}function _r(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),A(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:Se(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function yn(e,t,n="/"){return Hr(e,t,n,!1)}function Hr(e,t,n,r){let o=typeof t=="string"?xe(t):t,a=ee(o.pathname||"/",n);if(a==null)return null;let i=vn(e);Wr(i);let l=null;for(let s=0;l==null&&s<i.length;++s){let c=Kr(a);l=qr(i[s],c,r)}return l}function vn(e,t=[],n=[],r="",o=!1){let a=(i,l,s=o,c)=>{let u={relativePath:c===void 0?i.path||"":c,caseSensitive:i.caseSensitive===!0,childrenIndex:l,route:i};if(u.relativePath.startsWith("/")){if(!u.relativePath.startsWith(r)&&s)return;A(u.relativePath.startsWith(r),`Absolute route path "${u.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(r.length)}let d=G([r,u.relativePath]),f=n.concat(u);i.children&&i.children.length>0&&(A(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),vn(i.children,t,f,d,s)),!(i.path==null&&!i.index)&&t.push({path:d,score:Gr(d,i.index),routesMeta:f})};return e.forEach((i,l)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))a(i,l);else for(let c of wn(i.path))a(i,l,!0,c)}),t}function wn(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return o?[a,""]:[a];let i=wn(r.join("/")),l=[];return l.push(...i.map(s=>s===""?a:[a,s].join("/"))),o&&l.push(...i),l.map(s=>e.startsWith("/")&&s===""?"/":s)}function Wr(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Zr(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Ur=/^:[\w-]+$/,zr=3,Jr=2,Vr=1,Yr=10,Xr=-2,Yt=e=>e==="*";function Gr(e,t){let n=e.split("/"),r=n.length;return n.some(Yt)&&(r+=Xr),t&&(r+=Jr),n.filter(o=>!Yt(o)).reduce((o,a)=>o+(Ur.test(a)?zr:a===""?Vr:Yr),r)}function Zr(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function qr(e,t,n=!1){let{routesMeta:r}=e,o={},a="/",i=[];for(let l=0;l<r.length;++l){let s=r[l],c=l===r.length-1,u=a==="/"?t:t.slice(a.length)||"/",d=He({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},u),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=He({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},u)),!d)return null;Object.assign(o,d.params),i.push({params:o,pathname:G([a,d.pathname]),pathnameBase:ro(G([a,d.pathnameBase])),route:f}),d.pathnameBase!=="/"&&(a=G([a,d.pathnameBase]))}return i}function He(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Qr(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:r.reduce((c,{paramName:u,isOptional:d},f)=>{if(u==="*"){let g=l[f]||"";i=a.slice(0,a.length-g.length).replace(/(.)\/+$/,"$1")}const m=l[f];return d&&!m?c[u]=void 0:c[u]=(m||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:i,pattern:e}}function Qr(e,t=!1,n=!0){U(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,l,s,c,u)=>{if(r.push({paramName:l,isOptional:s!=null}),s){let d=u.charAt(c+i.length);return d&&d!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Kr(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ee(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var eo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function to(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?xe(e):e,a;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?a=Xt(n.substring(1),"/"):a=Xt(n,t)):a=t,{pathname:a,search:oo(r),hash:ao(o)}}function Xt(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function nt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function no(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function yt(e){let t=no(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Ve(e,t,n,r=!1){let o;typeof e=="string"?o=xe(e):(o={...e},A(!o.pathname||!o.pathname.includes("?"),nt("?","pathname","search",o)),A(!o.pathname||!o.pathname.includes("#"),nt("#","pathname","hash",o)),A(!o.search||!o.search.includes("#"),nt("#","search","hash",o)));let a=e===""||o.pathname==="",i=a?"/":o.pathname,l;if(i==null)l=n;else{let d=t.length-1;if(!r&&i.startsWith("..")){let f=i.split("/");for(;f[0]==="..";)f.shift(),d-=1;o.pathname=f.join("/")}l=d>=0?t[d]:"/"}let s=to(o,l),c=i&&i!=="/"&&i.endsWith("/"),u=(a||i===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(c||u)&&(s.pathname+="/"),s}var G=e=>e.join("/").replace(/\/\/+/g,"/"),ro=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),oo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ao=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,io=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function so(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function lo(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var bn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function En(e,t){let n=e;if(typeof n!="string"||!eo.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,o=!1;if(bn)try{let a=new URL(window.location.href),i=n.startsWith("//")?new URL(a.protocol+n):new URL(n),l=ee(i.pathname,t);i.origin===a.origin&&l!=null?n=l+i.search+i.hash:o=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Rn=["POST","PUT","PATCH","DELETE"];new Set(Rn);var co=["GET",...Rn];new Set(co);var ye=p.createContext(null);ye.displayName="DataRouter";var Ye=p.createContext(null);Ye.displayName="DataRouterState";var uo=p.createContext(!1),Cn=p.createContext({isTransitioning:!1});Cn.displayName="ViewTransition";var po=p.createContext(new Map);po.displayName="Fetchers";var fo=p.createContext(null);fo.displayName="Await";var W=p.createContext(null);W.displayName="Navigation";var Le=p.createContext(null);Le.displayName="Location";var V=p.createContext({outlet:null,matches:[],isDataRoute:!1});V.displayName="Route";var vt=p.createContext(null);vt.displayName="RouteError";var kn="REACT_ROUTER_ERROR",mo="REDIRECT",ho="ROUTE_ERROR_RESPONSE";function go(e){if(e.startsWith(`${kn}:${mo}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function xo(e){if(e.startsWith(`${kn}:${ho}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new io(t.status,t.statusText,t.data)}catch{}}function yo(e,{relative:t}={}){A(ve(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=p.useContext(W),{hash:o,pathname:a,search:i}=Ae(e,{relative:t}),l=a;return n!=="/"&&(l=a==="/"?n:G([n,a])),r.createHref({pathname:l,search:i,hash:o})}function ve(){return p.useContext(Le)!=null}function re(){return A(ve(),"useLocation() may be used only in the context of a <Router> component."),p.useContext(Le).location}var Sn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Pn(e){p.useContext(W).static||p.useLayoutEffect(e)}function wt(){let{isDataRoute:e}=p.useContext(V);return e?To():vo()}function vo(){A(ve(),"useNavigate() may be used only in the context of a <Router> component.");let e=p.useContext(ye),{basename:t,navigator:n}=p.useContext(W),{matches:r}=p.useContext(V),{pathname:o}=re(),a=JSON.stringify(yt(r)),i=p.useRef(!1);return Pn(()=>{i.current=!0}),p.useCallback((s,c={})=>{if(U(i.current,Sn),!i.current)return;if(typeof s=="number"){n.go(s);return}let u=Ve(s,JSON.parse(a),o,c.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:G([t,u.pathname])),(c.replace?n.replace:n.push)(u,c.state,c)},[t,n,a,o,e])}p.createContext(null);function wo(){let{matches:e}=p.useContext(V),t=e[e.length-1];return t?t.params:{}}function Ae(e,{relative:t}={}){let{matches:n}=p.useContext(V),{pathname:r}=re(),o=JSON.stringify(yt(n));return p.useMemo(()=>Ve(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function bo(e,t){return Mn(e,t)}function Mn(e,t,n){var w;A(ve(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=p.useContext(W),{matches:o}=p.useContext(V),a=o[o.length-1],i=a?a.params:{},l=a?a.pathname:"/",s=a?a.pathnameBase:"/",c=a&&a.route;{let h=c&&c.path||"";An(l,!c||h.endsWith("*")||h.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${h}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${h}"> to <Route path="${h==="/"?"*":`${h}/*`}">.`)}let u=re(),d;if(t){let h=typeof t=="string"?xe(t):t;A(s==="/"||((w=h.pathname)==null?void 0:w.startsWith(s)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${s}" but pathname "${h.pathname}" was given in the \`location\` prop.`),d=h}else d=u;let f=d.pathname||"/",m=f;if(s!=="/"){let h=s.replace(/^\//,"").split("/");m="/"+f.replace(/^\//,"").split("/").slice(h.length).join("/")}let g=yn(e,{pathname:m});U(c||g!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),U(g==null||g[g.length-1].route.element!==void 0||g[g.length-1].route.Component!==void 0||g[g.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let x=So(g&&g.map(h=>Object.assign({},h,{params:Object.assign({},i,h.params),pathname:G([s,r.encodeLocation?r.encodeLocation(h.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?s:G([s,r.encodeLocation?r.encodeLocation(h.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:h.pathnameBase])})),o,n);return t&&x?p.createElement(Le.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...d},navigationType:"POP"}},x):x}function Eo(){let e=Oo(),t=so(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},a={padding:"2px 4px",backgroundColor:r},i=null;return console.error("Error handled by React Router default ErrorBoundary:",e),i=p.createElement(p.Fragment,null,p.createElement("p",null,"💿 Hey developer 👋"),p.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",p.createElement("code",{style:a},"ErrorBoundary")," or"," ",p.createElement("code",{style:a},"errorElement")," prop on your route.")),p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),n?p.createElement("pre",{style:o},n):null,i)}var Ro=p.createElement(Eo,null),Ln=class extends p.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=xo(e.digest);n&&(e=n)}let t=e!==void 0?p.createElement(V.Provider,{value:this.props.routeContext},p.createElement(vt.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?p.createElement(Co,{error:e},t):t}};Ln.contextType=uo;var rt=new WeakMap;function Co({children:e,error:t}){let{basename:n}=p.useContext(W);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=go(t.digest);if(r){let o=rt.get(t);if(o)throw o;let a=En(r.location,n);if(bn&&!rt.get(t))if(a.isExternal||r.reloadDocument)window.location.href=a.absoluteURL||a.to;else{const i=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:r.replace}));throw rt.set(t,i),i}return p.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a.absoluteURL||a.to}`})}}return e}function ko({routeContext:e,match:t,children:n}){let r=p.useContext(ye);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(V.Provider,{value:e},n)}function So(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,a=r==null?void 0:r.errors;if(a!=null){let u=o.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);A(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,u+1))}let i=!1,l=-1;if(n&&r){i=r.renderFallback;for(let u=0;u<o.length;u++){let d=o[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(l=u),d.route.id){let{loaderData:f,errors:m}=r,g=d.route.loader&&!f.hasOwnProperty(d.route.id)&&(!m||m[d.route.id]===void 0);if(d.route.lazy||g){n.isStatic&&(i=!0),l>=0?o=o.slice(0,l+1):o=[o[0]];break}}}}let s=n==null?void 0:n.onError,c=r&&s?(u,d)=>{var f,m;s(u,{location:r.location,params:((m=(f=r.matches)==null?void 0:f[0])==null?void 0:m.params)??{},unstable_pattern:lo(r.matches),errorInfo:d})}:void 0;return o.reduceRight((u,d,f)=>{let m,g=!1,x=null,w=null;r&&(m=a&&d.route.id?a[d.route.id]:void 0,x=d.route.errorElement||Ro,i&&(l<0&&f===0?(An("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,w=null):l===f&&(g=!0,w=d.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,f+1)),b=()=>{let R;return m?R=x:g?R=w:d.route.Component?R=p.createElement(d.route.Component,null):d.route.element?R=d.route.element:R=u,p.createElement(ko,{match:d,routeContext:{outlet:u,matches:h,isDataRoute:r!=null},children:R})};return r&&(d.route.ErrorBoundary||d.route.errorElement||f===0)?p.createElement(Ln,{location:r.location,revalidation:r.revalidation,component:x,error:m,children:b(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:c}):b()},null)}function bt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Po(e){let t=p.useContext(ye);return A(t,bt(e)),t}function Mo(e){let t=p.useContext(Ye);return A(t,bt(e)),t}function Lo(e){let t=p.useContext(V);return A(t,bt(e)),t}function Et(e){let t=Lo(e),n=t.matches[t.matches.length-1];return A(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ao(){return Et("useRouteId")}function Oo(){var r;let e=p.useContext(vt),t=Mo("useRouteError"),n=Et("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function To(){let{router:e}=Po("useNavigate"),t=Et("useNavigate"),n=p.useRef(!1);return Pn(()=>{n.current=!0}),p.useCallback(async(o,a={})=>{U(n.current,Sn),n.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:t,...a}))},[e,t])}var Gt={};function An(e,t,n){!t&&!Gt[e]&&(Gt[e]=!0,U(!1,n))}p.memo(jo);function jo({routes:e,future:t,state:n,isStatic:r,onError:o}){return Mn(e,void 0,{state:n,isStatic:r,onError:o})}function Io({to:e,replace:t,state:n,relative:r}){A(ve(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=p.useContext(W);U(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:a}=p.useContext(V),{pathname:i}=re(),l=wt(),s=Ve(e,yt(a),i,r==="path"),c=JSON.stringify(s);return p.useEffect(()=>{l(JSON.parse(c),{replace:t,state:n,relative:r})},[l,c,r,t,n]),null}function ut(e){A(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function No({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:a=!1,unstable_useTransitions:i}){A(!ve(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),s=p.useMemo(()=>({basename:l,navigator:o,static:a,unstable_useTransitions:i,future:{}}),[l,o,a,i]);typeof n=="string"&&(n=xe(n));let{pathname:c="/",search:u="",hash:d="",state:f=null,key:m="default",unstable_mask:g}=n,x=p.useMemo(()=>{let w=ee(c,l);return w==null?null:{location:{pathname:w,search:u,hash:d,state:f,key:m,unstable_mask:g},navigationType:r}},[l,c,u,d,f,m,r,g]);return U(x!=null,`<Router basename="${l}"> is not able to match the URL "${c}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),x==null?null:p.createElement(W.Provider,{value:s},p.createElement(Le.Provider,{children:t,value:x}))}function Do({children:e,location:t}){return bo(dt(e),t)}function dt(e,t=[]){let n=[];return p.Children.forEach(e,(r,o)=>{if(!p.isValidElement(r))return;let a=[...t,o];if(r.type===p.Fragment){n.push.apply(n,dt(r.props.children,a));return}A(r.type===ut,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),A(!r.props.index||!r.props.children,"An index route cannot have child routes.");let i={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=dt(r.props.children,a)),n.push(i)}),n}var Be="get",Fe="application/x-www-form-urlencoded";function Xe(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function $o(e){return Xe(e)&&e.tagName.toLowerCase()==="button"}function Bo(e){return Xe(e)&&e.tagName.toLowerCase()==="form"}function Fo(e){return Xe(e)&&e.tagName.toLowerCase()==="input"}function _o(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ho(e,t){return e.button===0&&(!t||t==="_self")&&!_o(e)}var Ne=null;function Wo(){if(Ne===null)try{new FormData(document.createElement("form"),0),Ne=!1}catch{Ne=!0}return Ne}var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ot(e){return e!=null&&!Uo.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fe}"`),null):e}function zo(e,t){let n,r,o,a,i;if(Bo(e)){let l=e.getAttribute("action");r=l?ee(l,t):null,n=e.getAttribute("method")||Be,o=ot(e.getAttribute("enctype"))||Fe,a=new FormData(e)}else if($o(e)||Fo(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||l.getAttribute("action");if(r=s?ee(s,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||Be,o=ot(e.getAttribute("formenctype"))||ot(l.getAttribute("enctype"))||Fe,a=new FormData(l,e),!Wo()){let{name:c,type:u,value:d}=e;if(u==="image"){let f=c?`${c}.`:"";a.append(`${f}x`,"0"),a.append(`${f}y`,"0")}else c&&a.append(c,d)}}else{if(Xe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Be,r=null,o=Fe,i=e}return a&&o==="text/plain"&&(i=a,a=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:a,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Rt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Jo(e,t,n,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:t&&ee(o.pathname,t)==="/"?o.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:o.pathname=`${o.pathname.replace(/\/$/,"")}.${r}`,o}async function Vo(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yo(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Xo(e,t,n){let r=await Promise.all(e.map(async o=>{let a=t.routes[o.route.id];if(a){let i=await Vo(a,n);return i.links?i.links():[]}return[]}));return Qo(r.flat(1).filter(Yo).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Zt(e,t,n,r,o,a){let i=(s,c)=>n[c]?s.route.id!==n[c].route.id:!0,l=(s,c)=>{var u;return n[c].pathname!==s.pathname||((u=n[c].route.path)==null?void 0:u.endsWith("*"))&&n[c].params["*"]!==s.params["*"]};return a==="assets"?t.filter((s,c)=>i(s,c)||l(s,c)):a==="data"?t.filter((s,c)=>{var d;let u=r.routes[s.route.id];if(!u||!u.hasLoader)return!1;if(i(s,c)||l(s,c))return!0;if(s.route.shouldRevalidate){let f=s.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:s.params,defaultShouldRevalidate:!0});if(typeof f=="boolean")return f}return!0}):[]}function Go(e,t,{includeHydrateFallback:n}={}){return Zo(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let a=[o.module];return o.clientActionModule&&(a=a.concat(o.clientActionModule)),o.clientLoaderModule&&(a=a.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(a=a.concat(o.hydrateFallbackModule)),o.imports&&(a=a.concat(o.imports)),a}).flat(1))}function Zo(e){return[...new Set(e)]}function qo(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Qo(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let a=JSON.stringify(qo(o));return n.has(a)||(n.add(a),r.push({key:a,link:o})),r},[])}function On(){let e=p.useContext(ye);return Rt(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Ko(){let e=p.useContext(Ye);return Rt(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ct=p.createContext(void 0);Ct.displayName="FrameworkContext";function Tn(){let e=p.useContext(Ct);return Rt(e,"You must render this element inside a <HydratedRouter> element"),e}function ea(e,t){let n=p.useContext(Ct),[r,o]=p.useState(!1),[a,i]=p.useState(!1),{onFocus:l,onBlur:s,onMouseEnter:c,onMouseLeave:u,onTouchStart:d}=t,f=p.useRef(null);p.useEffect(()=>{if(e==="render"&&i(!0),e==="viewport"){let x=h=>{h.forEach(b=>{i(b.isIntersecting)})},w=new IntersectionObserver(x,{threshold:.5});return f.current&&w.observe(f.current),()=>{w.disconnect()}}},[e]),p.useEffect(()=>{if(r){let x=setTimeout(()=>{i(!0)},100);return()=>{clearTimeout(x)}}},[r]);let m=()=>{o(!0)},g=()=>{o(!1),i(!1)};return n?e!=="intent"?[a,f,{}]:[a,f,{onFocus:ke(l,m),onBlur:ke(s,g),onMouseEnter:ke(c,m),onMouseLeave:ke(u,g),onTouchStart:ke(d,m)}]:[!1,f,{}]}function ke(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ta({page:e,...t}){let{router:n}=On(),r=p.useMemo(()=>yn(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?p.createElement(ra,{page:e,matches:r,...t}):null}function na(e){let{manifest:t,routeModules:n}=Tn(),[r,o]=p.useState([]);return p.useEffect(()=>{let a=!1;return Xo(e,t,n).then(i=>{a||o(i)}),()=>{a=!0}},[e,t,n]),r}function ra({page:e,matches:t,...n}){let r=re(),{future:o,manifest:a,routeModules:i}=Tn(),{basename:l}=On(),{loaderData:s,matches:c}=Ko(),u=p.useMemo(()=>Zt(e,t,c,a,r,"data"),[e,t,c,a,r]),d=p.useMemo(()=>Zt(e,t,c,a,r,"assets"),[e,t,c,a,r]),f=p.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let x=new Set,w=!1;if(t.forEach(b=>{var C;let R=a.routes[b.route.id];!R||!R.hasLoader||(!u.some(k=>k.route.id===b.route.id)&&b.route.id in s&&((C=i[b.route.id])!=null&&C.shouldRevalidate)||R.hasClientLoader?w=!0:x.add(b.route.id))}),x.size===0)return[];let h=Jo(e,l,o.unstable_trailingSlashAwareDataRequests,"data");return w&&x.size>0&&h.searchParams.set("_routes",t.filter(b=>x.has(b.route.id)).map(b=>b.route.id).join(",")),[h.pathname+h.search]},[l,o.unstable_trailingSlashAwareDataRequests,s,r,a,u,t,e,i]),m=p.useMemo(()=>Go(d,a),[d,a]),g=na(d);return p.createElement(p.Fragment,null,f.map(x=>p.createElement("link",{key:x,rel:"prefetch",as:"fetch",href:x,...n})),m.map(x=>p.createElement("link",{key:x,rel:"modulepreload",href:x,...n})),g.map(({key:x,link:w})=>p.createElement("link",{key:x,nonce:n.nonce,...w,crossOrigin:w.crossOrigin??n.crossOrigin})))}function oa(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var aa=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{aa&&(window.__reactRouterVersion="7.13.1")}catch{}function ia({basename:e,children:t,unstable_useTransitions:n,window:r}){let o=p.useRef();o.current==null&&(o.current=$r({window:r,v5Compat:!0}));let a=o.current,[i,l]=p.useState({action:a.action,location:a.location}),s=p.useCallback(c=>{n===!1?l(c):p.startTransition(()=>l(c))},[n]);return p.useLayoutEffect(()=>a.listen(s),[a,s]),p.createElement(No,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:a,unstable_useTransitions:n})}var jn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,In=p.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:a,replace:i,unstable_mask:l,state:s,target:c,to:u,preventScrollReset:d,viewTransition:f,unstable_defaultShouldRevalidate:m,...g},x){let{basename:w,navigator:h,unstable_useTransitions:b}=p.useContext(W),R=typeof u=="string"&&jn.test(u),C=En(u,w);u=C.to;let k=yo(u,{relative:o}),y=re(),E=null;if(l){let j=Ve(l,[],y.unstable_mask?y.unstable_mask.pathname:"/",!0);w!=="/"&&(j.pathname=j.pathname==="/"?w:G([w,j.pathname])),E=h.createHref(j)}let[S,O,M]=ea(r,g),D=ua(u,{replace:i,unstable_mask:l,state:s,target:c,preventScrollReset:d,relative:o,viewTransition:f,unstable_defaultShouldRevalidate:m,unstable_useTransitions:b});function $(j){t&&t(j),j.defaultPrevented||D(j)}let T=!(C.isExternal||a),L=p.createElement("a",{...g,...M,href:(T?E:void 0)||C.absoluteURL||k,onClick:T?$:t,ref:oa(x,O),target:c,"data-discover":!R&&n==="render"?"true":void 0});return S&&!R?p.createElement(p.Fragment,null,L,p.createElement(ta,{page:k})):L});In.displayName="Link";var sa=p.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:a,to:i,viewTransition:l,children:s,...c},u){let d=Ae(i,{relative:c.relative}),f=re(),m=p.useContext(Ye),{navigator:g,basename:x}=p.useContext(W),w=m!=null&&ha(d)&&l===!0,h=g.encodeLocation?g.encodeLocation(d).pathname:d.pathname,b=f.pathname,R=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(b=b.toLowerCase(),R=R?R.toLowerCase():null,h=h.toLowerCase()),R&&x&&(R=ee(R,x)||R);const C=h!=="/"&&h.endsWith("/")?h.length-1:h.length;let k=b===h||!o&&b.startsWith(h)&&b.charAt(C)==="/",y=R!=null&&(R===h||!o&&R.startsWith(h)&&R.charAt(h.length)==="/"),E={isActive:k,isPending:y,isTransitioning:w},S=k?t:void 0,O;typeof r=="function"?O=r(E):O=[r,k?"active":null,y?"pending":null,w?"transitioning":null].filter(Boolean).join(" ");let M=typeof a=="function"?a(E):a;return p.createElement(In,{...c,"aria-current":S,className:O,ref:u,style:M,to:i,viewTransition:l},typeof s=="function"?s(E):s)});sa.displayName="NavLink";var la=p.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:a,method:i=Be,action:l,onSubmit:s,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...m},g)=>{let{unstable_useTransitions:x}=p.useContext(W),w=fa(),h=ma(l,{relative:c}),b=i.toLowerCase()==="get"?"get":"post",R=typeof l=="string"&&jn.test(l),C=k=>{if(s&&s(k),k.defaultPrevented)return;k.preventDefault();let y=k.nativeEvent.submitter,E=(y==null?void 0:y.getAttribute("formmethod"))||i,S=()=>w(y||k.currentTarget,{fetcherKey:t,method:E,navigate:n,replace:o,state:a,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});x&&n!==!1?p.startTransition(()=>S()):S()};return p.createElement("form",{ref:g,method:b,action:h,onSubmit:r?s:C,...m,"data-discover":!R&&e==="render"?"true":void 0})});la.displayName="Form";function ca(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Nn(e){let t=p.useContext(ye);return A(t,ca(e)),t}function ua(e,{target:t,replace:n,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:l,unstable_defaultShouldRevalidate:s,unstable_useTransitions:c}={}){let u=wt(),d=re(),f=Ae(e,{relative:i});return p.useCallback(m=>{if(Ho(m,t)){m.preventDefault();let g=n!==void 0?n:Se(d)===Se(f),x=()=>u(e,{replace:g,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:l,unstable_defaultShouldRevalidate:s});c?p.startTransition(()=>x()):x()}},[d,u,f,n,r,o,t,e,a,i,l,s,c])}var da=0,pa=()=>`__${String(++da)}__`;function fa(){let{router:e}=Nn("useSubmit"),{basename:t}=p.useContext(W),n=Ao(),r=e.fetch,o=e.navigate;return p.useCallback(async(a,i={})=>{let{action:l,method:s,encType:c,formData:u,body:d}=zo(a,t);if(i.navigate===!1){let f=i.fetcherKey||pa();await r(f,n,i.action||l,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:u,body:d,formMethod:i.method||s,formEncType:i.encType||c,flushSync:i.flushSync})}else await o(i.action||l,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:u,body:d,formMethod:i.method||s,formEncType:i.encType||c,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[r,o,t,n])}function ma(e,{relative:t}={}){let{basename:n}=p.useContext(W),r=p.useContext(V);A(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),a={...Ae(e||".",{relative:t})},i=re();if(e==null){a.search=i.search;let l=new URLSearchParams(a.search),s=l.getAll("index");if(s.some(u=>u==="")){l.delete("index"),s.filter(d=>d).forEach(d=>l.append("index",d));let u=l.toString();a.search=u?`?${u}`:""}}return(!e||e===".")&&o.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(a.pathname=a.pathname==="/"?n:G([n,a.pathname])),Se(a)}function ha(e,{relative:t}={}){let n=p.useContext(Cn);A(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Nn("useViewTransitionState"),o=Ae(e,{relative:t});if(!n.isTransitioning)return!1;let a=ee(n.currentLocation.pathname,r)||n.currentLocation.pathname,i=ee(n.nextLocation.pathname,r)||n.nextLocation.pathname;return He(o.pathname,i)!=null||He(o.pathname,a)!=null}const ga=({isActive:e,children:t,className:n="",...r})=>v.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${n}`,...r,children:t}),xa=e=>v.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:v.jsx("path",{d:"M20 6 9 17l-5-5"})}),ya=e=>v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[v.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),v.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function va(e){const t=[],n=/\/\/.*$/gm;let r;for(;(r=n.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-string"});t.sort((l,s)=>l.start-s.start);let a="",i=0;for(const l of t){if(l.start<i)continue;const s=e.slice(i,l.start);a+=qt(s);const c=e.slice(l.start,l.end);a+=`<span class="${l.className}">${Dn(c)}</span>`,i=l.end}return a+=qt(e.slice(i)),a}function Dn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function qt(e){let t=Dn(e);return t=t.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),t=t.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),t=t.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),t=t.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),t=t.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(n,r,o)=>n.includes('class="')?n:`<span class="code-function">${r}</span>${o}`),t=t.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),t}function wa({code:e}){const[t,n]=p.useState(!1),r=p.useRef(null);p.useEffect(()=>{r.current&&(r.current.innerHTML=va(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),n(!0),setTimeout(()=>n(!1),2e3)};return v.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[v.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[v.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),v.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:t?v.jsxs(v.Fragment,{children:[v.jsx(xa,{className:"h-3.5 w-3.5"}),v.jsx("span",{children:"Copied"})]}):v.jsxs(v.Fragment,{children:[v.jsx(ya,{className:"h-3.5 w-3.5"}),v.jsx("span",{children:"Copy"})]})})]}),v.jsx("div",{className:"overflow-x-auto p-4",children:v.jsx("pre",{className:"text-sm leading-relaxed",children:v.jsx("code",{ref:r,className:"font-mono"})})})]})}function K(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function Qt(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function $n(...e){return t=>{let n=!1;const r=e.map(o=>{const a=Qt(o,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():Qt(e[o],null)}}}}function pe(...e){return p.useCallback($n(...e),e)}function Bn(e,t=[]){let n=[];function r(a,i){const l=p.createContext(i),s=n.length;n=[...n,i];const c=d=>{var h;const{scope:f,children:m,...g}=d,x=((h=f==null?void 0:f[e])==null?void 0:h[s])||l,w=p.useMemo(()=>g,Object.values(g));return v.jsx(x.Provider,{value:w,children:m})};c.displayName=a+"Provider";function u(d,f){var x;const m=((x=f==null?void 0:f[e])==null?void 0:x[s])||l,g=p.useContext(m);if(g)return g;if(i!==void 0)return i;throw new Error(`\`${d}\` must be used within \`${a}\``)}return[c,u]}const o=()=>{const a=n.map(i=>p.createContext(i));return function(l){const s=(l==null?void 0:l[e])||a;return p.useMemo(()=>({[`__scope${e}`]:{...l,[e]:s}}),[l,s])}};return o.scopeName=e,[r,ba(o,...t)]}function ba(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const i=r.reduce((l,{useScope:s,scopeName:c})=>{const d=s(a)[`__scope${c}`];return{...l,...d}},{});return p.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return n.scopeName=t.scopeName,n}function Ea(e){const t=Ra(e),n=p.forwardRef((r,o)=>{const{children:a,...i}=r,l=p.Children.toArray(a),s=l.find(ka);if(s){const c=s.props.children,u=l.map(d=>d===s?p.Children.count(c)>1?p.Children.only(null):p.isValidElement(c)?c.props.children:null:d);return v.jsx(t,{...i,ref:o,children:p.isValidElement(c)?p.cloneElement(c,void 0,u):null})}return v.jsx(t,{...i,ref:o,children:a})});return n.displayName=`${e}.Slot`,n}function Ra(e){const t=p.forwardRef((n,r)=>{const{children:o,...a}=n;if(p.isValidElement(o)){const i=Pa(o),l=Sa(a,o.props);return o.type!==p.Fragment&&(l.ref=r?$n(r,i):i),p.cloneElement(o,l)}return p.Children.count(o)>1?p.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Fn=Symbol("radix.slottable");function Ca(e){const t=({children:n})=>v.jsx(v.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=Fn,t}function ka(e){return p.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Fn}function Sa(e,t){const n={...t};for(const r in t){const o=e[r],a=t[r];/^on[A-Z]/.test(r)?o&&a?n[r]=(...l)=>{const s=a(...l);return o(...l),s}:o&&(n[r]=o):r==="style"?n[r]={...o,...a}:r==="className"&&(n[r]=[o,a].filter(Boolean).join(" "))}return{...e,...n}}function Pa(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Ma=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=Ma.reduce((e,t)=>{const n=Ea(`Primitive.${t}`),r=p.forwardRef((o,a)=>{const{asChild:i,...l}=o,s=i?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),v.jsx(s,{...l,ref:a})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function La(e,t){e&&gn.flushSync(()=>e.dispatchEvent(t))}function Ge(e){const t=p.useRef(e);return p.useEffect(()=>{t.current=e}),p.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function Aa(e,t=globalThis==null?void 0:globalThis.document){const n=Ge(e);p.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var Oa="DismissableLayer",pt="dismissableLayer.update",Ta="dismissableLayer.pointerDownOutside",ja="dismissableLayer.focusOutside",Kt,_n=p.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Hn=p.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:i,onDismiss:l,...s}=e,c=p.useContext(_n),[u,d]=p.useState(null),f=(u==null?void 0:u.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,m]=p.useState({}),g=pe(t,E=>d(E)),x=Array.from(c.layers),[w]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),h=x.indexOf(w),b=u?x.indexOf(u):-1,R=c.layersWithOutsidePointerEventsDisabled.size>0,C=b>=h,k=Da(E=>{const S=E.target,O=[...c.branches].some(M=>M.contains(S));!C||O||(o==null||o(E),i==null||i(E),E.defaultPrevented||l==null||l())},f),y=$a(E=>{const S=E.target;[...c.branches].some(M=>M.contains(S))||(a==null||a(E),i==null||i(E),E.defaultPrevented||l==null||l())},f);return Aa(E=>{b===c.layers.size-1&&(r==null||r(E),!E.defaultPrevented&&l&&(E.preventDefault(),l()))},f),p.useEffect(()=>{if(u)return n&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(Kt=f.body.style.pointerEvents,f.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(u)),c.layers.add(u),en(),()=>{n&&c.layersWithOutsidePointerEventsDisabled.size===1&&(f.body.style.pointerEvents=Kt)}},[u,f,n,c]),p.useEffect(()=>()=>{u&&(c.layers.delete(u),c.layersWithOutsidePointerEventsDisabled.delete(u),en())},[u,c]),p.useEffect(()=>{const E=()=>m({});return document.addEventListener(pt,E),()=>document.removeEventListener(pt,E)},[]),v.jsx(le.div,{...s,ref:g,style:{pointerEvents:R?C?"auto":"none":void 0,...e.style},onFocusCapture:K(e.onFocusCapture,y.onFocusCapture),onBlurCapture:K(e.onBlurCapture,y.onBlurCapture),onPointerDownCapture:K(e.onPointerDownCapture,k.onPointerDownCapture)})});Hn.displayName=Oa;var Ia="DismissableLayerBranch",Na=p.forwardRef((e,t)=>{const n=p.useContext(_n),r=p.useRef(null),o=pe(t,r);return p.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),v.jsx(le.div,{...e,ref:o})});Na.displayName=Ia;function Da(e,t=globalThis==null?void 0:globalThis.document){const n=Ge(e),r=p.useRef(!1),o=p.useRef(()=>{});return p.useEffect(()=>{const a=l=>{if(l.target&&!r.current){let s=function(){Wn(Ta,n,c,{discrete:!0})};const c={originalEvent:l};l.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=s,t.addEventListener("click",o.current,{once:!0})):s()}else t.removeEventListener("click",o.current);r.current=!1},i=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(i),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function $a(e,t=globalThis==null?void 0:globalThis.document){const n=Ge(e),r=p.useRef(!1);return p.useEffect(()=>{const o=a=>{a.target&&!r.current&&Wn(ja,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function en(){const e=new CustomEvent(pt);document.dispatchEvent(e)}function Wn(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?La(o,a):o.dispatchEvent(a)}var ae=globalThis!=null&&globalThis.document?p.useLayoutEffect:()=>{},Ba=xn[" useId ".trim().toString()]||(()=>{}),Fa=0;function _a(e){const[t,n]=p.useState(Ba());return ae(()=>{n(r=>r??String(Fa++))},[e]),t?`radix-${t}`:""}const Ha=["top","right","bottom","left"],ie=Math.min,F=Math.max,We=Math.round,De=Math.floor,Z=e=>({x:e,y:e}),Wa={left:"right",right:"left",bottom:"top",top:"bottom"};function ft(e,t,n){return F(e,ie(t,n))}function te(e,t){return typeof e=="function"?e(t):e}function ne(e){return e.split("-")[0]}function we(e){return e.split("-")[1]}function kt(e){return e==="x"?"y":"x"}function St(e){return e==="y"?"height":"width"}function X(e){const t=e[0];return t==="t"||t==="b"?"y":"x"}function Pt(e){return kt(X(e))}function Ua(e,t,n){n===void 0&&(n=!1);const r=we(e),o=Pt(e),a=St(o);let i=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[a]>t.floating[a]&&(i=Ue(i)),[i,Ue(i)]}function za(e){const t=Ue(e);return[mt(e),t,mt(t)]}function mt(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const tn=["left","right"],nn=["right","left"],Ja=["top","bottom"],Va=["bottom","top"];function Ya(e,t,n){switch(e){case"top":case"bottom":return n?t?nn:tn:t?tn:nn;case"left":case"right":return t?Ja:Va;default:return[]}}function Xa(e,t,n,r){const o=we(e);let a=Ya(ne(e),n==="start",r);return o&&(a=a.map(i=>i+"-"+o),t&&(a=a.concat(a.map(mt)))),a}function Ue(e){const t=ne(e);return Wa[t]+e.slice(t.length)}function Ga(e){return{top:0,right:0,bottom:0,left:0,...e}}function Un(e){return typeof e!="number"?Ga(e):{top:e,right:e,bottom:e,left:e}}function ze(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function rn(e,t,n){let{reference:r,floating:o}=e;const a=X(t),i=Pt(t),l=St(i),s=ne(t),c=a==="y",u=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,f=r[l]/2-o[l]/2;let m;switch(s){case"top":m={x:u,y:r.y-o.height};break;case"bottom":m={x:u,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:d};break;case"left":m={x:r.x-o.width,y:d};break;default:m={x:r.x,y:r.y}}switch(we(t)){case"start":m[i]-=f*(n&&c?-1:1);break;case"end":m[i]+=f*(n&&c?-1:1);break}return m}async function Za(e,t){var n;t===void 0&&(t={});const{x:r,y:o,platform:a,rects:i,elements:l,strategy:s}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:f=!1,padding:m=0}=te(t,e),g=Un(m),w=l[f?d==="floating"?"reference":"floating":d],h=ze(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(w)))==null||n?w:w.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:s})),b=d==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,R=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l.floating)),C=await(a.isElement==null?void 0:a.isElement(R))?await(a.getScale==null?void 0:a.getScale(R))||{x:1,y:1}:{x:1,y:1},k=ze(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:b,offsetParent:R,strategy:s}):b);return{top:(h.top-k.top+g.top)/C.y,bottom:(k.bottom-h.bottom+g.bottom)/C.y,left:(h.left-k.left+g.left)/C.x,right:(k.right-h.right+g.right)/C.x}}const qa=50,Qa=async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:a=[],platform:i}=n,l=i.detectOverflow?i:{...i,detectOverflow:Za},s=await(i.isRTL==null?void 0:i.isRTL(t));let c=await i.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=rn(c,r,s),f=r,m=0;const g={};for(let x=0;x<a.length;x++){const w=a[x];if(!w)continue;const{name:h,fn:b}=w,{x:R,y:C,data:k,reset:y}=await b({x:u,y:d,initialPlacement:r,placement:f,strategy:o,middlewareData:g,rects:c,platform:l,elements:{reference:e,floating:t}});u=R??u,d=C??d,g[h]={...g[h],...k},y&&m<qa&&(m++,typeof y=="object"&&(y.placement&&(f=y.placement),y.rects&&(c=y.rects===!0?await i.getElementRects({reference:e,floating:t,strategy:o}):y.rects),{x:u,y:d}=rn(c,f,s)),x=-1)}return{x:u,y:d,placement:f,strategy:o,middlewareData:g}},Ka=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:a,platform:i,elements:l,middlewareData:s}=t,{element:c,padding:u=0}=te(e,t)||{};if(c==null)return{};const d=Un(u),f={x:n,y:r},m=Pt(o),g=St(m),x=await i.getDimensions(c),w=m==="y",h=w?"top":"left",b=w?"bottom":"right",R=w?"clientHeight":"clientWidth",C=a.reference[g]+a.reference[m]-f[m]-a.floating[g],k=f[m]-a.reference[m],y=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c));let E=y?y[R]:0;(!E||!await(i.isElement==null?void 0:i.isElement(y)))&&(E=l.floating[R]||a.floating[g]);const S=C/2-k/2,O=E/2-x[g]/2-1,M=ie(d[h],O),D=ie(d[b],O),$=M,T=E-x[g]-D,L=E/2-x[g]/2+S,j=ft($,L,T),I=!s.arrow&&we(o)!=null&&L!==j&&a.reference[g]/2-(L<$?M:D)-x[g]/2<0,N=I?L<$?L-$:L-T:0;return{[m]:f[m]+N,data:{[m]:j,centerOffset:L-j-N,...I&&{alignmentOffset:N}},reset:I}}}),ei=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:a,rects:i,initialPlacement:l,platform:s,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:x=!0,...w}=te(e,t);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const h=ne(o),b=X(l),R=ne(l)===l,C=await(s.isRTL==null?void 0:s.isRTL(c.floating)),k=f||(R||!x?[Ue(l)]:za(l)),y=g!=="none";!f&&y&&k.push(...Xa(l,x,g,C));const E=[l,...k],S=await s.detectOverflow(t,w),O=[];let M=((r=a.flip)==null?void 0:r.overflows)||[];if(u&&O.push(S[h]),d){const L=Ua(o,i,C);O.push(S[L[0]],S[L[1]])}if(M=[...M,{placement:o,overflows:O}],!O.every(L=>L<=0)){var D,$;const L=(((D=a.flip)==null?void 0:D.index)||0)+1,j=E[L];if(j&&(!(d==="alignment"?b!==X(j):!1)||M.every(P=>X(P.placement)===b?P.overflows[0]>0:!0)))return{data:{index:L,overflows:M},reset:{placement:j}};let I=($=M.filter(N=>N.overflows[0]<=0).sort((N,P)=>N.overflows[1]-P.overflows[1])[0])==null?void 0:$.placement;if(!I)switch(m){case"bestFit":{var T;const N=(T=M.filter(P=>{if(y){const B=X(P.placement);return B===b||B==="y"}return!0}).map(P=>[P.placement,P.overflows.filter(B=>B>0).reduce((B,Y)=>B+Y,0)]).sort((P,B)=>P[1]-B[1])[0])==null?void 0:T[0];N&&(I=N);break}case"initialPlacement":I=l;break}if(o!==I)return{reset:{placement:I}}}return{}}}};function on(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function an(e){return Ha.some(t=>e[t]>=0)}const ti=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n,platform:r}=t,{strategy:o="referenceHidden",...a}=te(e,t);switch(o){case"referenceHidden":{const i=await r.detectOverflow(t,{...a,elementContext:"reference"}),l=on(i,n.reference);return{data:{referenceHiddenOffsets:l,referenceHidden:an(l)}}}case"escaped":{const i=await r.detectOverflow(t,{...a,altBoundary:!0}),l=on(i,n.floating);return{data:{escapedOffsets:l,escaped:an(l)}}}default:return{}}}}},zn=new Set(["left","top"]);async function ni(e,t){const{placement:n,platform:r,elements:o}=e,a=await(r.isRTL==null?void 0:r.isRTL(o.floating)),i=ne(n),l=we(n),s=X(n)==="y",c=zn.has(i)?-1:1,u=a&&s?-1:1,d=te(t,e);let{mainAxis:f,crossAxis:m,alignmentAxis:g}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&typeof g=="number"&&(m=l==="end"?g*-1:g),s?{x:m*u,y:f*c}:{x:f*c,y:m*u}}const ri=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:a,placement:i,middlewareData:l}=t,s=await ni(t,e);return i===((n=l.offset)==null?void 0:n.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:o+s.x,y:a+s.y,data:{...s,placement:i}}}}},oi=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o,platform:a}=t,{mainAxis:i=!0,crossAxis:l=!1,limiter:s={fn:h=>{let{x:b,y:R}=h;return{x:b,y:R}}},...c}=te(e,t),u={x:n,y:r},d=await a.detectOverflow(t,c),f=X(ne(o)),m=kt(f);let g=u[m],x=u[f];if(i){const h=m==="y"?"top":"left",b=m==="y"?"bottom":"right",R=g+d[h],C=g-d[b];g=ft(R,g,C)}if(l){const h=f==="y"?"top":"left",b=f==="y"?"bottom":"right",R=x+d[h],C=x-d[b];x=ft(R,x,C)}const w=s.fn({...t,[m]:g,[f]:x});return{...w,data:{x:w.x-n,y:w.y-r,enabled:{[m]:i,[f]:l}}}}}},ai=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:o,rects:a,middlewareData:i}=t,{offset:l=0,mainAxis:s=!0,crossAxis:c=!0}=te(e,t),u={x:n,y:r},d=X(o),f=kt(d);let m=u[f],g=u[d];const x=te(l,t),w=typeof x=="number"?{mainAxis:x,crossAxis:0}:{mainAxis:0,crossAxis:0,...x};if(s){const R=f==="y"?"height":"width",C=a.reference[f]-a.floating[R]+w.mainAxis,k=a.reference[f]+a.reference[R]-w.mainAxis;m<C?m=C:m>k&&(m=k)}if(c){var h,b;const R=f==="y"?"width":"height",C=zn.has(ne(o)),k=a.reference[d]-a.floating[R]+(C&&((h=i.offset)==null?void 0:h[d])||0)+(C?0:w.crossAxis),y=a.reference[d]+a.reference[R]+(C?0:((b=i.offset)==null?void 0:b[d])||0)-(C?w.crossAxis:0);g<k?g=k:g>y&&(g=y)}return{[f]:m,[d]:g}}}},ii=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:o,rects:a,platform:i,elements:l}=t,{apply:s=()=>{},...c}=te(e,t),u=await i.detectOverflow(t,c),d=ne(o),f=we(o),m=X(o)==="y",{width:g,height:x}=a.floating;let w,h;d==="top"||d==="bottom"?(w=d,h=f===(await(i.isRTL==null?void 0:i.isRTL(l.floating))?"start":"end")?"left":"right"):(h=d,w=f==="end"?"top":"bottom");const b=x-u.top-u.bottom,R=g-u.left-u.right,C=ie(x-u[w],b),k=ie(g-u[h],R),y=!t.middlewareData.shift;let E=C,S=k;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(S=R),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(E=b),y&&!f){const M=F(u.left,0),D=F(u.right,0),$=F(u.top,0),T=F(u.bottom,0);m?S=g-2*(M!==0||D!==0?M+D:F(u.left,u.right)):E=x-2*($!==0||T!==0?$+T:F(u.top,u.bottom))}await s({...t,availableWidth:S,availableHeight:E});const O=await i.getDimensions(l.floating);return g!==O.width||x!==O.height?{reset:{rects:!0}}:{}}}};function Ze(){return typeof window<"u"}function be(e){return Jn(e)?(e.nodeName||"").toLowerCase():"#document"}function H(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function q(e){var t;return(t=(Jn(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Jn(e){return Ze()?e instanceof Node||e instanceof H(e).Node:!1}function z(e){return Ze()?e instanceof Element||e instanceof H(e).Element:!1}function oe(e){return Ze()?e instanceof HTMLElement||e instanceof H(e).HTMLElement:!1}function sn(e){return!Ze()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof H(e).ShadowRoot}function Oe(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=J(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&o!=="inline"&&o!=="contents"}function si(e){return/^(table|td|th)$/.test(be(e))}function qe(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const li=/transform|translate|scale|rotate|perspective|filter/,ci=/paint|layout|strict|content/,ce=e=>!!e&&e!=="none";let at;function Mt(e){const t=z(e)?J(e):e;return ce(t.transform)||ce(t.translate)||ce(t.scale)||ce(t.rotate)||ce(t.perspective)||!Lt()&&(ce(t.backdropFilter)||ce(t.filter))||li.test(t.willChange||"")||ci.test(t.contain||"")}function ui(e){let t=se(e);for(;oe(t)&&!he(t);){if(Mt(t))return t;if(qe(t))return null;t=se(t)}return null}function Lt(){return at==null&&(at=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),at}function he(e){return/^(html|body|#document)$/.test(be(e))}function J(e){return H(e).getComputedStyle(e)}function Qe(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function se(e){if(be(e)==="html")return e;const t=e.assignedSlot||e.parentNode||sn(e)&&e.host||q(e);return sn(t)?t.host:t}function Vn(e){const t=se(e);return he(t)?e.ownerDocument?e.ownerDocument.body:e.body:oe(t)&&Oe(t)?t:Vn(t)}function Pe(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=Vn(e),a=o===((r=e.ownerDocument)==null?void 0:r.body),i=H(o);if(a){const l=ht(i);return t.concat(i,i.visualViewport||[],Oe(o)?o:[],l&&n?Pe(l):[])}else return t.concat(o,Pe(o,[],n))}function ht(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Yn(e){const t=J(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=oe(e),a=o?e.offsetWidth:n,i=o?e.offsetHeight:r,l=We(n)!==a||We(r)!==i;return l&&(n=a,r=i),{width:n,height:r,$:l}}function At(e){return z(e)?e:e.contextElement}function me(e){const t=At(e);if(!oe(t))return Z(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:a}=Yn(t);let i=(a?We(n.width):n.width)/r,l=(a?We(n.height):n.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!l||!Number.isFinite(l))&&(l=1),{x:i,y:l}}const di=Z(0);function Xn(e){const t=H(e);return!Lt()||!t.visualViewport?di:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function pi(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==H(e)?!1:t}function de(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),a=At(e);let i=Z(1);t&&(r?z(r)&&(i=me(r)):i=me(e));const l=pi(a,n,r)?Xn(a):Z(0);let s=(o.left+l.x)/i.x,c=(o.top+l.y)/i.y,u=o.width/i.x,d=o.height/i.y;if(a){const f=H(a),m=r&&z(r)?H(r):r;let g=f,x=ht(g);for(;x&&r&&m!==g;){const w=me(x),h=x.getBoundingClientRect(),b=J(x),R=h.left+(x.clientLeft+parseFloat(b.paddingLeft))*w.x,C=h.top+(x.clientTop+parseFloat(b.paddingTop))*w.y;s*=w.x,c*=w.y,u*=w.x,d*=w.y,s+=R,c+=C,g=H(x),x=ht(g)}}return ze({width:u,height:d,x:s,y:c})}function Ke(e,t){const n=Qe(e).scrollLeft;return t?t.left+n:de(q(e)).left+n}function Gn(e,t){const n=e.getBoundingClientRect(),r=n.left+t.scrollLeft-Ke(e,n),o=n.top+t.scrollTop;return{x:r,y:o}}function fi(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const a=o==="fixed",i=q(r),l=t?qe(t.floating):!1;if(r===i||l&&a)return n;let s={scrollLeft:0,scrollTop:0},c=Z(1);const u=Z(0),d=oe(r);if((d||!d&&!a)&&((be(r)!=="body"||Oe(i))&&(s=Qe(r)),d)){const m=de(r);c=me(r),u.x=m.x+r.clientLeft,u.y=m.y+r.clientTop}const f=i&&!d&&!a?Gn(i,s):Z(0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-s.scrollLeft*c.x+u.x+f.x,y:n.y*c.y-s.scrollTop*c.y+u.y+f.y}}function mi(e){return Array.from(e.getClientRects())}function hi(e){const t=q(e),n=Qe(e),r=e.ownerDocument.body,o=F(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=F(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+Ke(e);const l=-n.scrollTop;return J(r).direction==="rtl"&&(i+=F(t.clientWidth,r.clientWidth)-o),{width:o,height:a,x:i,y:l}}const ln=25;function gi(e,t){const n=H(e),r=q(e),o=n.visualViewport;let a=r.clientWidth,i=r.clientHeight,l=0,s=0;if(o){a=o.width,i=o.height;const u=Lt();(!u||u&&t==="fixed")&&(l=o.offsetLeft,s=o.offsetTop)}const c=Ke(r);if(c<=0){const u=r.ownerDocument,d=u.body,f=getComputedStyle(d),m=u.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,g=Math.abs(r.clientWidth-d.clientWidth-m);g<=ln&&(a-=g)}else c<=ln&&(a+=c);return{width:a,height:i,x:l,y:s}}function xi(e,t){const n=de(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,a=oe(e)?me(e):Z(1),i=e.clientWidth*a.x,l=e.clientHeight*a.y,s=o*a.x,c=r*a.y;return{width:i,height:l,x:s,y:c}}function cn(e,t,n){let r;if(t==="viewport")r=gi(e,n);else if(t==="document")r=hi(q(e));else if(z(t))r=xi(t,n);else{const o=Xn(e);r={x:t.x-o.x,y:t.y-o.y,width:t.width,height:t.height}}return ze(r)}function Zn(e,t){const n=se(e);return n===t||!z(n)||he(n)?!1:J(n).position==="fixed"||Zn(n,t)}function yi(e,t){const n=t.get(e);if(n)return n;let r=Pe(e,[],!1).filter(l=>z(l)&&be(l)!=="body"),o=null;const a=J(e).position==="fixed";let i=a?se(e):e;for(;z(i)&&!he(i);){const l=J(i),s=Mt(i);!s&&l.position==="fixed"&&(o=null),(a?!s&&!o:!s&&l.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||Oe(i)&&!s&&Zn(e,i))?r=r.filter(u=>u!==i):o=l,i=se(i)}return t.set(e,r),r}function vi(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const i=[...n==="clippingAncestors"?qe(t)?[]:yi(t,this._c):[].concat(n),r],l=cn(t,i[0],o);let s=l.top,c=l.right,u=l.bottom,d=l.left;for(let f=1;f<i.length;f++){const m=cn(t,i[f],o);s=F(m.top,s),c=ie(m.right,c),u=ie(m.bottom,u),d=F(m.left,d)}return{width:c-d,height:u-s,x:d,y:s}}function wi(e){const{width:t,height:n}=Yn(e);return{width:t,height:n}}function bi(e,t,n){const r=oe(t),o=q(t),a=n==="fixed",i=de(e,!0,a,t);let l={scrollLeft:0,scrollTop:0};const s=Z(0);function c(){s.x=Ke(o)}if(r||!r&&!a)if((be(t)!=="body"||Oe(o))&&(l=Qe(t)),r){const m=de(t,!0,a,t);s.x=m.x+t.clientLeft,s.y=m.y+t.clientTop}else o&&c();a&&!r&&o&&c();const u=o&&!r&&!a?Gn(o,l):Z(0),d=i.left+l.scrollLeft-s.x-u.x,f=i.top+l.scrollTop-s.y-u.y;return{x:d,y:f,width:i.width,height:i.height}}function it(e){return J(e).position==="static"}function un(e,t){if(!oe(e)||J(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return q(e)===n&&(n=n.ownerDocument.body),n}function qn(e,t){const n=H(e);if(qe(e))return n;if(!oe(e)){let o=se(e);for(;o&&!he(o);){if(z(o)&&!it(o))return o;o=se(o)}return n}let r=un(e,t);for(;r&&si(r)&&it(r);)r=un(r,t);return r&&he(r)&&it(r)&&!Mt(r)?n:r||ui(e)||n}const Ei=async function(e){const t=this.getOffsetParent||qn,n=this.getDimensions,r=await n(e.floating);return{reference:bi(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ri(e){return J(e).direction==="rtl"}const Ci={convertOffsetParentRelativeRectToViewportRelativeRect:fi,getDocumentElement:q,getClippingRect:vi,getOffsetParent:qn,getElementRects:Ei,getClientRects:mi,getDimensions:wi,getScale:me,isElement:z,isRTL:Ri};function Qn(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ki(e,t){let n=null,r;const o=q(e);function a(){var l;clearTimeout(r),(l=n)==null||l.disconnect(),n=null}function i(l,s){l===void 0&&(l=!1),s===void 0&&(s=1),a();const c=e.getBoundingClientRect(),{left:u,top:d,width:f,height:m}=c;if(l||t(),!f||!m)return;const g=De(d),x=De(o.clientWidth-(u+f)),w=De(o.clientHeight-(d+m)),h=De(u),R={rootMargin:-g+"px "+-x+"px "+-w+"px "+-h+"px",threshold:F(0,ie(1,s))||1};let C=!0;function k(y){const E=y[0].intersectionRatio;if(E!==s){if(!C)return i();E?i(!1,E):r=setTimeout(()=>{i(!1,1e-7)},1e3)}E===1&&!Qn(c,e.getBoundingClientRect())&&i(),C=!1}try{n=new IntersectionObserver(k,{...R,root:o.ownerDocument})}catch{n=new IntersectionObserver(k,R)}n.observe(e)}return i(!0),a}function Si(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:s=!1}=r,c=At(e),u=o||a?[...c?Pe(c):[],...t?Pe(t):[]]:[];u.forEach(h=>{o&&h.addEventListener("scroll",n,{passive:!0}),a&&h.addEventListener("resize",n)});const d=c&&l?ki(c,n):null;let f=-1,m=null;i&&(m=new ResizeObserver(h=>{let[b]=h;b&&b.target===c&&m&&t&&(m.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var R;(R=m)==null||R.observe(t)})),n()}),c&&!s&&m.observe(c),t&&m.observe(t));let g,x=s?de(e):null;s&&w();function w(){const h=de(e);x&&!Qn(x,h)&&n(),x=h,g=requestAnimationFrame(w)}return n(),()=>{var h;u.forEach(b=>{o&&b.removeEventListener("scroll",n),a&&b.removeEventListener("resize",n)}),d==null||d(),(h=m)==null||h.disconnect(),m=null,s&&cancelAnimationFrame(g)}}const Pi=ri,Mi=oi,Li=ei,Ai=ii,Oi=ti,dn=Ka,Ti=ai,ji=(e,t,n)=>{const r=new Map,o={platform:Ci,...n},a={...o.platform,_c:r};return Qa(e,t,{...o,platform:a})};var Ii=typeof document<"u",Ni=function(){},_e=Ii?p.useLayoutEffect:Ni;function Je(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!Je(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;r--!==0;){const a=o[r];if(!(a==="_owner"&&e.$$typeof)&&!Je(e[a],t[a]))return!1}return!0}return e!==e&&t!==t}function Kn(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function pn(e,t){const n=Kn(e);return Math.round(t*n)/n}function st(e){const t=p.useRef(e);return _e(()=>{t.current=e}),t}function Di(e){e===void 0&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:a,floating:i}={},transform:l=!0,whileElementsMounted:s,open:c}=e,[u,d]=p.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[f,m]=p.useState(r);Je(f,r)||m(r);const[g,x]=p.useState(null),[w,h]=p.useState(null),b=p.useCallback(P=>{P!==y.current&&(y.current=P,x(P))},[]),R=p.useCallback(P=>{P!==E.current&&(E.current=P,h(P))},[]),C=a||g,k=i||w,y=p.useRef(null),E=p.useRef(null),S=p.useRef(u),O=s!=null,M=st(s),D=st(o),$=st(c),T=p.useCallback(()=>{if(!y.current||!E.current)return;const P={placement:t,strategy:n,middleware:f};D.current&&(P.platform=D.current),ji(y.current,E.current,P).then(B=>{const Y={...B,isPositioned:$.current!==!1};L.current&&!Je(S.current,Y)&&(S.current=Y,gn.flushSync(()=>{d(Y)}))})},[f,t,n,D,$]);_e(()=>{c===!1&&S.current.isPositioned&&(S.current.isPositioned=!1,d(P=>({...P,isPositioned:!1})))},[c]);const L=p.useRef(!1);_e(()=>(L.current=!0,()=>{L.current=!1}),[]),_e(()=>{if(C&&(y.current=C),k&&(E.current=k),C&&k){if(M.current)return M.current(C,k,T);T()}},[C,k,T,M,O]);const j=p.useMemo(()=>({reference:y,floating:E,setReference:b,setFloating:R}),[b,R]),I=p.useMemo(()=>({reference:C,floating:k}),[C,k]),N=p.useMemo(()=>{const P={position:n,left:0,top:0};if(!I.floating)return P;const B=pn(I.floating,u.x),Y=pn(I.floating,u.y);return l?{...P,transform:"translate("+B+"px, "+Y+"px)",...Kn(I.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:B,top:Y}},[n,l,I.floating,u.x,u.y]);return p.useMemo(()=>({...u,update:T,refs:j,elements:I,floatingStyles:N}),[u,T,j,I,N])}const $i=e=>{function t(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:e,fn(n){const{element:r,padding:o}=typeof e=="function"?e(n):e;return r&&t(r)?r.current!=null?dn({element:r.current,padding:o}).fn(n):{}:r?dn({element:r,padding:o}).fn(n):{}}}},Bi=(e,t)=>{const n=Pi(e);return{name:n.name,fn:n.fn,options:[e,t]}},Fi=(e,t)=>{const n=Mi(e);return{name:n.name,fn:n.fn,options:[e,t]}},_i=(e,t)=>({fn:Ti(e).fn,options:[e,t]}),Hi=(e,t)=>{const n=Li(e);return{name:n.name,fn:n.fn,options:[e,t]}},Wi=(e,t)=>{const n=Ai(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ui=(e,t)=>{const n=Oi(e);return{name:n.name,fn:n.fn,options:[e,t]}},zi=(e,t)=>{const n=$i(e);return{name:n.name,fn:n.fn,options:[e,t]}};var Ji="Arrow",er=p.forwardRef((e,t)=>{const{children:n,width:r=10,height:o=5,...a}=e;return v.jsx(le.svg,{...a,ref:t,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:v.jsx("polygon",{points:"0,0 30,0 15,10"})})});er.displayName=Ji;var Vi=er;function Yi(e){const[t,n]=p.useState(void 0);return ae(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const a=o[0];let i,l;if("borderBoxSize"in a){const s=a.borderBoxSize,c=Array.isArray(s)?s[0]:s;i=c.inlineSize,l=c.blockSize}else i=e.offsetWidth,l=e.offsetHeight;n({width:i,height:l})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}var Ot="Popper",[tr,nr]=Bn(Ot),[Xi,rr]=tr(Ot),or=e=>{const{__scopePopper:t,children:n}=e,[r,o]=p.useState(null);return v.jsx(Xi,{scope:t,anchor:r,onAnchorChange:o,children:n})};or.displayName=Ot;var ar="PopperAnchor",ir=p.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...o}=e,a=rr(ar,n),i=p.useRef(null),l=pe(t,i),s=p.useRef(null);return p.useEffect(()=>{const c=s.current;s.current=(r==null?void 0:r.current)||i.current,c!==s.current&&a.onAnchorChange(s.current)}),r?null:v.jsx(le.div,{...o,ref:l})});ir.displayName=ar;var Tt="PopperContent",[Gi,Zi]=tr(Tt),sr=p.forwardRef((e,t)=>{var $t,Bt,Ft,_t,Ht,Wt;const{__scopePopper:n,side:r="bottom",sideOffset:o=0,align:a="center",alignOffset:i=0,arrowPadding:l=0,avoidCollisions:s=!0,collisionBoundary:c=[],collisionPadding:u=0,sticky:d="partial",hideWhenDetached:f=!1,updatePositionStrategy:m="optimized",onPlaced:g,...x}=e,w=rr(Tt,n),[h,b]=p.useState(null),R=pe(t,Ce=>b(Ce)),[C,k]=p.useState(null),y=Yi(C),E=(y==null?void 0:y.width)??0,S=(y==null?void 0:y.height)??0,O=r+(a!=="center"?"-"+a:""),M=typeof u=="number"?u:{top:0,right:0,bottom:0,left:0,...u},D=Array.isArray(c)?c:[c],$=D.length>0,T={padding:M,boundary:D.filter(Qi),altBoundary:$},{refs:L,floatingStyles:j,placement:I,isPositioned:N,middlewareData:P}=Di({strategy:"fixed",placement:O,whileElementsMounted:(...Ce)=>Si(...Ce,{animationFrame:m==="always"}),elements:{reference:w.anchor},middleware:[Bi({mainAxis:o+S,alignmentAxis:i}),s&&Fi({mainAxis:!0,crossAxis:!1,limiter:d==="partial"?_i():void 0,...T}),s&&Hi({...T}),Wi({...T,apply:({elements:Ce,rects:Ut,availableWidth:Ar,availableHeight:Or})=>{const{width:Tr,height:jr}=Ut.reference,Ie=Ce.floating.style;Ie.setProperty("--radix-popper-available-width",`${Ar}px`),Ie.setProperty("--radix-popper-available-height",`${Or}px`),Ie.setProperty("--radix-popper-anchor-width",`${Tr}px`),Ie.setProperty("--radix-popper-anchor-height",`${jr}px`)}}),C&&zi({element:C,padding:l}),Ki({arrowWidth:E,arrowHeight:S}),f&&Ui({strategy:"referenceHidden",...T})]}),[B,Y]=ur(I),je=Ge(g);ae(()=>{N&&(je==null||je())},[N,je]);const kr=($t=P.arrow)==null?void 0:$t.x,Sr=(Bt=P.arrow)==null?void 0:Bt.y,Pr=((Ft=P.arrow)==null?void 0:Ft.centerOffset)!==0,[Mr,Lr]=p.useState();return ae(()=>{h&&Lr(window.getComputedStyle(h).zIndex)},[h]),v.jsx("div",{ref:L.setFloating,"data-radix-popper-content-wrapper":"",style:{...j,transform:N?j.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Mr,"--radix-popper-transform-origin":[(_t=P.transformOrigin)==null?void 0:_t.x,(Ht=P.transformOrigin)==null?void 0:Ht.y].join(" "),...((Wt=P.hide)==null?void 0:Wt.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:v.jsx(Gi,{scope:n,placedSide:B,onArrowChange:k,arrowX:kr,arrowY:Sr,shouldHideArrow:Pr,children:v.jsx(le.div,{"data-side":B,"data-align":Y,...x,ref:R,style:{...x.style,animation:N?void 0:"none"}})})})});sr.displayName=Tt;var lr="PopperArrow",qi={top:"bottom",right:"left",bottom:"top",left:"right"},cr=p.forwardRef(function(t,n){const{__scopePopper:r,...o}=t,a=Zi(lr,r),i=qi[a.placedSide];return v.jsx("span",{ref:a.onArrowChange,style:{position:"absolute",left:a.arrowX,top:a.arrowY,[i]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[a.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[a.placedSide],visibility:a.shouldHideArrow?"hidden":void 0},children:v.jsx(Vi,{...o,ref:n,style:{...o.style,display:"block"}})})});cr.displayName=lr;function Qi(e){return e!==null}var Ki=e=>({name:"transformOrigin",options:e,fn(t){var w,h,b;const{placement:n,rects:r,middlewareData:o}=t,i=((w=o.arrow)==null?void 0:w.centerOffset)!==0,l=i?0:e.arrowWidth,s=i?0:e.arrowHeight,[c,u]=ur(n),d={start:"0%",center:"50%",end:"100%"}[u],f=(((h=o.arrow)==null?void 0:h.x)??0)+l/2,m=(((b=o.arrow)==null?void 0:b.y)??0)+s/2;let g="",x="";return c==="bottom"?(g=i?d:`${f}px`,x=`${-s}px`):c==="top"?(g=i?d:`${f}px`,x=`${r.floating.height+s}px`):c==="right"?(g=`${-s}px`,x=i?d:`${m}px`):c==="left"&&(g=`${r.floating.width+s}px`,x=i?d:`${m}px`),{data:{x:g,y:x}}}});function ur(e){const[t,n="center"]=e.split("-");return[t,n]}var es=or,ts=ir,ns=sr,rs=cr,os="Portal",dr=p.forwardRef((e,t)=>{var l;const{container:n,...r}=e,[o,a]=p.useState(!1);ae(()=>a(!0),[]);const i=n||o&&((l=globalThis==null?void 0:globalThis.document)==null?void 0:l.body);return i?Ir.createPortal(v.jsx(le.div,{...r,ref:t}),i):null});dr.displayName=os;function as(e,t){return p.useReducer((n,r)=>t[n][r]??n,e)}var jt=e=>{const{present:t,children:n}=e,r=is(t),o=typeof n=="function"?n({present:r.isPresent}):p.Children.only(n),a=pe(r.ref,ss(o));return typeof n=="function"||r.isPresent?p.cloneElement(o,{ref:a}):null};jt.displayName="Presence";function is(e){const[t,n]=p.useState(),r=p.useRef(null),o=p.useRef(e),a=p.useRef("none"),i=e?"mounted":"unmounted",[l,s]=as(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return p.useEffect(()=>{const c=$e(r.current);a.current=l==="mounted"?c:"none"},[l]),ae(()=>{const c=r.current,u=o.current;if(u!==e){const f=a.current,m=$e(c);e?s("MOUNT"):m==="none"||(c==null?void 0:c.display)==="none"?s("UNMOUNT"):s(u&&f!==m?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,s]),ae(()=>{if(t){let c;const u=t.ownerDocument.defaultView??window,d=m=>{const x=$e(r.current).includes(CSS.escape(m.animationName));if(m.target===t&&x&&(s("ANIMATION_END"),!o.current)){const w=t.style.animationFillMode;t.style.animationFillMode="forwards",c=u.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=w)})}},f=m=>{m.target===t&&(a.current=$e(r.current))};return t.addEventListener("animationstart",f),t.addEventListener("animationcancel",d),t.addEventListener("animationend",d),()=>{u.clearTimeout(c),t.removeEventListener("animationstart",f),t.removeEventListener("animationcancel",d),t.removeEventListener("animationend",d)}}else s("ANIMATION_END")},[t,s]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:p.useCallback(c=>{r.current=c?getComputedStyle(c):null,n(c)},[])}}function $e(e){return(e==null?void 0:e.animationName)||"none"}function ss(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var ls=xn[" useInsertionEffect ".trim().toString()]||ae;function cs({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,a,i]=us({defaultProp:t,onChange:n}),l=e!==void 0,s=l?e:o;{const u=p.useRef(e!==void 0);p.useEffect(()=>{const d=u.current;d!==l&&console.warn(`${r} is changing from ${d?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),u.current=l},[l,r])}const c=p.useCallback(u=>{var d;if(l){const f=ds(u)?u(e):u;f!==e&&((d=i.current)==null||d.call(i,f))}else a(u)},[l,e,a,i]);return[s,c]}function us({defaultProp:e,onChange:t}){const[n,r]=p.useState(e),o=p.useRef(n),a=p.useRef(t);return ls(()=>{a.current=t},[t]),p.useEffect(()=>{var i;o.current!==n&&((i=a.current)==null||i.call(a,n),o.current=n)},[n,o]),[n,r,a]}function ds(e){return typeof e=="function"}var ps=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),fs="VisuallyHidden",pr=p.forwardRef((e,t)=>v.jsx(le.span,{...e,ref:t,style:{...ps,...e.style}}));pr.displayName=fs;var ms=pr,[et]=Bn("Tooltip",[nr]),tt=nr(),fr="TooltipProvider",hs=700,gt="tooltip.open",[gs,It]=et(fr),mr=e=>{const{__scopeTooltip:t,delayDuration:n=hs,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:a}=e,i=p.useRef(!0),l=p.useRef(!1),s=p.useRef(0);return p.useEffect(()=>{const c=s.current;return()=>window.clearTimeout(c)},[]),v.jsx(gs,{scope:t,isOpenDelayedRef:i,delayDuration:n,onOpen:p.useCallback(()=>{window.clearTimeout(s.current),i.current=!1},[]),onClose:p.useCallback(()=>{window.clearTimeout(s.current),s.current=window.setTimeout(()=>i.current=!0,r)},[r]),isPointerInTransitRef:l,onPointerInTransitChange:p.useCallback(c=>{l.current=c},[]),disableHoverableContent:o,children:a})};mr.displayName=fr;var Me="Tooltip",[xs,Te]=et(Me),hr=e=>{const{__scopeTooltip:t,children:n,open:r,defaultOpen:o,onOpenChange:a,disableHoverableContent:i,delayDuration:l}=e,s=It(Me,e.__scopeTooltip),c=tt(t),[u,d]=p.useState(null),f=_a(),m=p.useRef(0),g=i??s.disableHoverableContent,x=l??s.delayDuration,w=p.useRef(!1),[h,b]=cs({prop:r,defaultProp:o??!1,onChange:E=>{E?(s.onOpen(),document.dispatchEvent(new CustomEvent(gt))):s.onClose(),a==null||a(E)},caller:Me}),R=p.useMemo(()=>h?w.current?"delayed-open":"instant-open":"closed",[h]),C=p.useCallback(()=>{window.clearTimeout(m.current),m.current=0,w.current=!1,b(!0)},[b]),k=p.useCallback(()=>{window.clearTimeout(m.current),m.current=0,b(!1)},[b]),y=p.useCallback(()=>{window.clearTimeout(m.current),m.current=window.setTimeout(()=>{w.current=!0,b(!0),m.current=0},x)},[x,b]);return p.useEffect(()=>()=>{m.current&&(window.clearTimeout(m.current),m.current=0)},[]),v.jsx(es,{...c,children:v.jsx(xs,{scope:t,contentId:f,open:h,stateAttribute:R,trigger:u,onTriggerChange:d,onTriggerEnter:p.useCallback(()=>{s.isOpenDelayedRef.current?y():C()},[s.isOpenDelayedRef,y,C]),onTriggerLeave:p.useCallback(()=>{g?k():(window.clearTimeout(m.current),m.current=0)},[k,g]),onOpen:C,onClose:k,disableHoverableContent:g,children:n})})};hr.displayName=Me;var xt="TooltipTrigger",gr=p.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=Te(xt,n),a=It(xt,n),i=tt(n),l=p.useRef(null),s=pe(t,l,o.onTriggerChange),c=p.useRef(!1),u=p.useRef(!1),d=p.useCallback(()=>c.current=!1,[]);return p.useEffect(()=>()=>document.removeEventListener("pointerup",d),[d]),v.jsx(ts,{asChild:!0,...i,children:v.jsx(le.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:s,onPointerMove:K(e.onPointerMove,f=>{f.pointerType!=="touch"&&!u.current&&!a.isPointerInTransitRef.current&&(o.onTriggerEnter(),u.current=!0)}),onPointerLeave:K(e.onPointerLeave,()=>{o.onTriggerLeave(),u.current=!1}),onPointerDown:K(e.onPointerDown,()=>{o.open&&o.onClose(),c.current=!0,document.addEventListener("pointerup",d,{once:!0})}),onFocus:K(e.onFocus,()=>{c.current||o.onOpen()}),onBlur:K(e.onBlur,o.onClose),onClick:K(e.onClick,o.onClose)})})});gr.displayName=xt;var Nt="TooltipPortal",[ys,vs]=et(Nt,{forceMount:void 0}),xr=e=>{const{__scopeTooltip:t,forceMount:n,children:r,container:o}=e,a=Te(Nt,t);return v.jsx(ys,{scope:t,forceMount:n,children:v.jsx(jt,{present:n||a.open,children:v.jsx(dr,{asChild:!0,container:o,children:r})})})};xr.displayName=Nt;var ge="TooltipContent",yr=p.forwardRef((e,t)=>{const n=vs(ge,e.__scopeTooltip),{forceMount:r=n.forceMount,side:o="top",...a}=e,i=Te(ge,e.__scopeTooltip);return v.jsx(jt,{present:r||i.open,children:i.disableHoverableContent?v.jsx(vr,{side:o,...a,ref:t}):v.jsx(ws,{side:o,...a,ref:t})})}),ws=p.forwardRef((e,t)=>{const n=Te(ge,e.__scopeTooltip),r=It(ge,e.__scopeTooltip),o=p.useRef(null),a=pe(t,o),[i,l]=p.useState(null),{trigger:s,onClose:c}=n,u=o.current,{onPointerInTransitChange:d}=r,f=p.useCallback(()=>{l(null),d(!1)},[d]),m=p.useCallback((g,x)=>{const w=g.currentTarget,h={x:g.clientX,y:g.clientY},b=Cs(h,w.getBoundingClientRect()),R=ks(h,b),C=Ss(x.getBoundingClientRect()),k=Ms([...R,...C]);l(k),d(!0)},[d]);return p.useEffect(()=>()=>f(),[f]),p.useEffect(()=>{if(s&&u){const g=w=>m(w,u),x=w=>m(w,s);return s.addEventListener("pointerleave",g),u.addEventListener("pointerleave",x),()=>{s.removeEventListener("pointerleave",g),u.removeEventListener("pointerleave",x)}}},[s,u,m,f]),p.useEffect(()=>{if(i){const g=x=>{const w=x.target,h={x:x.clientX,y:x.clientY},b=(s==null?void 0:s.contains(w))||(u==null?void 0:u.contains(w)),R=!Ps(h,i);b?f():R&&(f(),c())};return document.addEventListener("pointermove",g),()=>document.removeEventListener("pointermove",g)}},[s,u,i,c,f]),v.jsx(vr,{...e,ref:a})}),[bs,Es]=et(Me,{isInside:!1}),Rs=Ca("TooltipContent"),vr=p.forwardRef((e,t)=>{const{__scopeTooltip:n,children:r,"aria-label":o,onEscapeKeyDown:a,onPointerDownOutside:i,...l}=e,s=Te(ge,n),c=tt(n),{onClose:u}=s;return p.useEffect(()=>(document.addEventListener(gt,u),()=>document.removeEventListener(gt,u)),[u]),p.useEffect(()=>{if(s.trigger){const d=f=>{const m=f.target;m!=null&&m.contains(s.trigger)&&u()};return window.addEventListener("scroll",d,{capture:!0}),()=>window.removeEventListener("scroll",d,{capture:!0})}},[s.trigger,u]),v.jsx(Hn,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:a,onPointerDownOutside:i,onFocusOutside:d=>d.preventDefault(),onDismiss:u,children:v.jsxs(ns,{"data-state":s.stateAttribute,...c,...l,ref:t,style:{...l.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[v.jsx(Rs,{children:r}),v.jsx(bs,{scope:n,isInside:!0,children:v.jsx(ms,{id:s.contentId,role:"tooltip",children:o||r})})]})})});yr.displayName=ge;var wr="TooltipArrow",br=p.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=tt(n);return Es(wr,n).isInside?null:v.jsx(rs,{...o,...r,ref:t})});br.displayName=wr;function Cs(e,t){const n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),a=Math.abs(t.left-e.x);switch(Math.min(n,r,o,a)){case a:return"left";case o:return"right";case n:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function ks(e,t,n=5){const r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return r}function Ss(e){const{top:t,right:n,bottom:r,left:o}=e;return[{x:o,y:t},{x:n,y:t},{x:n,y:r},{x:o,y:r}]}function Ps(e,t){const{x:n,y:r}=e;let o=!1;for(let a=0,i=t.length-1;a<t.length;i=a++){const l=t[a],s=t[i],c=l.x,u=l.y,d=s.x,f=s.y;u>r!=f>r&&n<(d-c)*(r-u)/(f-u)+c&&(o=!o)}return o}function Ms(e){const t=e.slice();return t.sort((n,r)=>n.x<r.x?-1:n.x>r.x?1:n.y<r.y?-1:n.y>r.y?1:0),Ls(t)}function Ls(e){if(e.length<=1)return e.slice();const t=[];for(let r=0;r<e.length;r++){const o=e[r];for(;t.length>=2;){const a=t[t.length-1],i=t[t.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))t.pop();else break}t.push(o)}t.pop();const n=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;n.length>=2;){const a=n[n.length-1],i=n[n.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))n.pop();else break}n.push(o)}return n.pop(),t.length===1&&n.length===1&&t[0].x===n[0].x&&t[0].y===n[0].y?t:t.concat(n)}var As=mr,Os=hr,Ts=gr,js=xr,Is=yr,Ns=br;const Ds=({children:e})=>v.jsx(As,{delayDuration:200,children:e}),Dt=({content:e,children:t})=>v.jsxs(Os,{children:[v.jsx(Ts,{asChild:!0,children:t}),v.jsx(js,{children:v.jsxs(Is,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,v.jsx(Ns,{className:"fill-secondary",width:8,height:4})]})})]}),$s=({value:e,className:t="",...n})=>v.jsxs("form",{action:"https://codesandbox.io/api/v1/sandboxes/define",method:"POST",target:"_blank",children:[v.jsx("input",{type:"hidden",name:"parameters",value:e}),v.jsx(Dt,{content:"Edit example on codesandbox",children:v.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...n,children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),v.jsx("polyline",{points:"7.5 4.21 12 6.81 16.5 4.21"}),v.jsx("polyline",{points:"7.5 19.79 7.5 14.6 3 12"}),v.jsx("polyline",{points:"21 12 16.5 14.6 16.5 19.79"}),v.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),v.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})})})]}),Bs=()=>v.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:v.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function Fs({children:e,path:t}){return v.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[t&&v.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:v.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:t})}),v.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const Er=p.forwardRef(({isActive:e,children:t,className:n="",...r},o)=>v.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:t}));Er.displayName="Link";const _s=({files:e,template:t="typescript",className:n="",...r})=>v.jsxs("form",{action:"https://stackblitz.com/run",method:"POST",target:"_blank",children:[v.jsx("input",{type:"hidden",name:"project[title]",value:"Joymap Example"}),v.jsx("input",{type:"hidden",name:"project[template]",value:t}),Object.entries(e).map(([o,a])=>a.isBinary?null:v.jsx("input",{type:"hidden",name:`project[files][${o}]`,value:a.content},o)),v.jsx(Dt,{content:"Edit example on stackblitz",children:v.jsx("button",{type:"submit",className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:v.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:v.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})]}),Hs="/joymap/assets/logo-BXshXfNv.png";var Rr={exports:{}};(function(e){var t=function(){var n=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",a={};function i(s,c){if(!a[s]){a[s]={};for(var u=0;u<s.length;u++)a[s][s.charAt(u)]=u}return a[s][c]}var l={compressToBase64:function(s){if(s==null)return"";var c=l._compress(s,6,function(u){return r.charAt(u)});switch(c.length%4){default:case 0:return c;case 1:return c+"===";case 2:return c+"==";case 3:return c+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:l._decompress(s.length,32,function(c){return i(r,s.charAt(c))})},compressToUTF16:function(s){return s==null?"":l._compress(s,15,function(c){return n(c+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:l._decompress(s.length,16384,function(c){return s.charCodeAt(c)-32})},compressToUint8Array:function(s){for(var c=l.compress(s),u=new Uint8Array(c.length*2),d=0,f=c.length;d<f;d++){var m=c.charCodeAt(d);u[d*2]=m>>>8,u[d*2+1]=m%256}return u},decompressFromUint8Array:function(s){if(s==null)return l.decompress(s);for(var c=new Array(s.length/2),u=0,d=c.length;u<d;u++)c[u]=s[u*2]*256+s[u*2+1];var f=[];return c.forEach(function(m){f.push(n(m))}),l.decompress(f.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":l._compress(s,6,function(c){return o.charAt(c)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),l._decompress(s.length,32,function(c){return i(o,s.charAt(c))}))},compress:function(s){return l._compress(s,16,function(c){return n(c)})},_compress:function(s,c,u){if(s==null)return"";var d,f,m={},g={},x="",w="",h="",b=2,R=3,C=2,k=[],y=0,E=0,S;for(S=0;S<s.length;S+=1)if(x=s.charAt(S),Object.prototype.hasOwnProperty.call(m,x)||(m[x]=R++,g[x]=!0),w=h+x,Object.prototype.hasOwnProperty.call(m,w))h=w;else{if(Object.prototype.hasOwnProperty.call(g,h)){if(h.charCodeAt(0)<256){for(d=0;d<C;d++)y=y<<1,E==c-1?(E=0,k.push(u(y)),y=0):E++;for(f=h.charCodeAt(0),d=0;d<8;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1}else{for(f=1,d=0;d<C;d++)y=y<<1|f,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=0;for(f=h.charCodeAt(0),d=0;d<16;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1}b--,b==0&&(b=Math.pow(2,C),C++),delete g[h]}else for(f=m[h],d=0;d<C;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1;b--,b==0&&(b=Math.pow(2,C),C++),m[w]=R++,h=String(x)}if(h!==""){if(Object.prototype.hasOwnProperty.call(g,h)){if(h.charCodeAt(0)<256){for(d=0;d<C;d++)y=y<<1,E==c-1?(E=0,k.push(u(y)),y=0):E++;for(f=h.charCodeAt(0),d=0;d<8;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1}else{for(f=1,d=0;d<C;d++)y=y<<1|f,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=0;for(f=h.charCodeAt(0),d=0;d<16;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1}b--,b==0&&(b=Math.pow(2,C),C++),delete g[h]}else for(f=m[h],d=0;d<C;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1;b--,b==0&&(b=Math.pow(2,C),C++)}for(f=2,d=0;d<C;d++)y=y<<1|f&1,E==c-1?(E=0,k.push(u(y)),y=0):E++,f=f>>1;for(;;)if(y=y<<1,E==c-1){k.push(u(y));break}else E++;return k.join("")},decompress:function(s){return s==null?"":s==""?null:l._decompress(s.length,32768,function(c){return s.charCodeAt(c)})},_decompress:function(s,c,u){var d=[],f=4,m=4,g=3,x="",w=[],h,b,R,C,k,y,E,S={val:u(0),position:c,index:1};for(h=0;h<3;h+=1)d[h]=h;for(R=0,k=Math.pow(2,2),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;switch(R){case 0:for(R=0,k=Math.pow(2,8),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;E=n(R);break;case 1:for(R=0,k=Math.pow(2,16),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;E=n(R);break;case 2:return""}for(d[3]=E,b=E,w.push(E);;){if(S.index>s)return"";for(R=0,k=Math.pow(2,g),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;switch(E=R){case 0:for(R=0,k=Math.pow(2,8),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;d[m++]=n(R),E=m-1,f--;break;case 1:for(R=0,k=Math.pow(2,16),y=1;y!=k;)C=S.val&S.position,S.position>>=1,S.position==0&&(S.position=c,S.val=u(S.index++)),R|=(C>0?1:0)*y,y<<=1;d[m++]=n(R),E=m-1,f--;break;case 2:return w.join("")}if(f==0&&(f=Math.pow(2,g),g++),d[E])x=d[E];else if(E===m)x=b+b.charAt(0);else return null;w.push(x),d[m++]=b+x.charAt(0),f--,b=x,f==0&&(f=Math.pow(2,g),g++)}}};return l}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Rr);var Ws=Rr.exports;const Us=Dr(Ws),zs="2.2.4",Js={lodash:"^4.17.21"},Vs={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",phaser:"^3.85.0",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},Q={version:zs,dependencies:Js,devDependencies:Vs},{devDependencies:ue,version:Ys}=Q,Xs=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/public\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L2.png'"]];function _(e){return Xs.reduce((t,[n,r])=>t.replaceAll(n,r),e)}const Ee={isBinary:!1,content:JSON.stringify({compilerOptions:{target:"esnext",module:"commonjs",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}})};function Re({dependencies:e={},devDependencies:t={},hasLodash:n=!0,hasReact:r=!1,reactScripts:o=!1}={}){return JSON.stringify({main:"./index.ts",dependencies:{joymap:Q.version,tslib:"latest",...n?{lodash:Q.dependencies.lodash}:{},...r?{react:Q.devDependencies.react,"react-dom":Q.devDependencies["react-dom"]}:{},...e},devDependencies:{...n?{"@types/lodash":Q.devDependencies["@types/lodash"]}:{},...r?{"@types/react":Q.devDependencies["@types/react"],"@types/react-dom":Q.devDependencies["@types/react-dom"]}:{},...o?{"react-scripts":"latest"}:{parcel:"latest"},...t},...o?{scripts:{start:"react-scripts start",build:"react-scripts build"}}:{}})}function fe(e){const t=JSON.stringify({files:e});return Us.compressToBase64(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Gs=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
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
`,Zs=`import { LoremIpsum } from 'lorem-ipsum';\r
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
`,qs=`body {
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
  </head>\r
\r
  <body>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,el=`import './Editor';\r
`,tl={"Editor.tsx":{content:_(Qs),isBinary:!1},"commands.ts":{content:_(Zs),isBinary:!1},"custom.css":{content:_(qs),isBinary:!1},"index.ts":{content:_(el),isBinary:!1},"index.html":{content:Ks,isBinary:!1},"ckHelpers.ts":{content:_(Gs),isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!1,hasReact:!0,reactScripts:!0,dependencies:{"@ckeditor/ckeditor5-react":ue["@ckeditor/ckeditor5-react"],ckeditor5:ue.ckeditor5,"lorem-ipsum":ue["lorem-ipsum"]}})},"tsconfig.json":Ee},nl=`body {\r
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
`,fn={"index.ts":{content:_(ol),isBinary:!1},"Fighting.css":{content:nl,isBinary:!1},"index.html":{content:rl,isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!0,hasReact:!1})},"tsconfig.json":Ee},al=`<!doctype html>\r
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
`,il=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,mn={"index.ts":{content:_(il),isBinary:!1},"utils.ts":{content:_(ll),isBinary:!1},"Log.css":{content:sl,isBinary:!1},"index.html":{content:al,isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!0,hasReact:!1})},"tsconfig.json":Ee},cl=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Phaser</title>\r
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />\r
    <style>\r
      body {\r
        background-color: #1a1a2e;\r
        margin: 0;\r
        padding: 0;\r
        display: flex;\r
        justify-content: center;\r
        align-items: center;\r
        min-height: 100vh;\r
      }\r
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="app"></div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,ul=`import { createJoymap, createQueryModule, QueryModule } from 'joymap';\r
import Phaser from 'phaser';\r
\r
const menuItems = ['New Game', 'Options', 'Beans', 'Quit'];\r
let selectedIndex = 0;\r
let gamepadModule: QueryModule | null = null;\r
\r
class MenuScene extends Phaser.Scene {\r
  private textObjects: Phaser.GameObjects.Text[] = [];\r
  private statusText!: Phaser.GameObjects.Text;\r
  instructionsText!: Phaser.GameObjects.Text;\r
  private gridLines: { sprite: Phaser.GameObjects.TileSprite; speed: number }[] = [];\r
  private gradientOverlay!: Phaser.GameObjects.Graphics;\r
  private echoes: { text: Phaser.GameObjects.Text; offset: number }[] = [];\r
  private cans: Phaser.GameObjects.Text[] = [];\r
  private currentTween: Phaser.Tweens.Tween | null = null;\r
\r
  constructor() {\r
    super({ key: 'MenuScene' });\r
  }\r
\r
  create() {\r
    // Background\r
    this.cameras.main.setBackgroundColor('#000000');\r
\r
    const depths = [0.2, 0.3, 0.4, 0.5];\r
    depths.forEach((speed) => {\r
      const key = 'grid-' + speed;\r
      const size = Math.floor(80 + speed * 40);\r
\r
      const graphics = this.make.graphics();\r
      graphics.lineStyle(10 * speed, 0xa78bfa, Math.min(0.8, speed * 2));\r
\r
      graphics.lineBetween(0, 0, size, size);\r
\r
      graphics.generateTexture(key, size, size);\r
      graphics.destroy();\r
\r
      const sprite = this.add.tileSprite(400, 300, 800, 600, key);\r
      sprite.tileScaleX = 1;\r
      sprite.tileScaleY = 1;\r
      this.gridLines.push({ sprite, speed: speed * 0.5 });\r
    });\r
\r
    this.gradientOverlay = this.add.graphics();\r
    const gradientSteps = 20;\r
    for (let i = 0; i < gradientSteps; i++) {\r
      const t = i / gradientSteps;\r
      const r = Math.floor(Phaser.Math.Interpolation.Linear([26, 0], t));\r
      const g = Math.floor(Phaser.Math.Interpolation.Linear([0, 0], t));\r
      const b = Math.floor(Phaser.Math.Interpolation.Linear([50, 0], t));\r
      const color = (r << 16) | (g << 8) | b;\r
\r
      this.gradientOverlay.fillStyle(color, 0.9);\r
      this.gradientOverlay.fillRect(0, (i / gradientSteps) * 600, 800, 600 / gradientSteps + 1);\r
    }\r
\r
    // Text\r
    this.add\r
      .text(400, 100, 'PHASER MENU', {\r
        fontSize: '72px',\r
        fontFamily: 'Audiowide',\r
        fontStyle: 'normal',\r
        color: '#ffffffdd',\r
      })\r
      .setOrigin(0.5);\r
\r
    this.statusText = this.add\r
      .text(400, 550, 'Connect a gamepad, mouse or use arrow keys to navigate', {\r
        fontSize: '18px',\r
        fontFamily: 'Audiowide',\r
        fontStyle: 'normal',\r
        padding: { x: 8, y: 4 },\r
        color: '#888888',\r
      })\r
      .setOrigin(0.5);\r
\r
    menuItems.forEach((item, index) => {\r
      const text = this.add\r
        .text(400, 250 + index * 60, item, {\r
          fontSize: '32px',\r
          fontFamily: 'Audiowide',\r
          fontStyle: 'normal',\r
          padding: { x: 12, y: 4 },\r
          color: index === selectedIndex ? '#5700fa' : '#a78bfa',\r
        })\r
        .setOrigin(0.5)\r
        .setInteractive({ useHandCursor: true })\r
        .on('pointerover', function () {\r
          text.setColor('#8000fa');\r
        })\r
        .on('pointerout', function () {\r
          text.setColor(index === selectedIndex ? '#5700fa' : '#a78bfa');\r
        })\r
        .on('pointerdown', () => {\r
          selectedIndex = index;\r
          this.updateSelection();\r
          const selected = menuItems[selectedIndex];\r
          this.statusText.setText(\`Selected: \${selected}!\`);\r
        });\r
\r
      this.textObjects.push(text);\r
    });\r
\r
    const floor = this.add.rectangle(400, 610, 800, 20, 0x000000);\r
    this.matter.add.gameObject(floor, { isStatic: true, restitution: 0.5 });\r
\r
    const leftWall = this.add.rectangle(-10, 300, 20, 600, 0x000000);\r
    this.matter.add.gameObject(leftWall, { isStatic: true, restitution: 0.5 });\r
\r
    const rightWall = this.add.rectangle(810, 300, 20, 600, 0x000000);\r
    this.matter.add.gameObject(rightWall, { isStatic: true, restitution: 0.5 });\r
\r
    this.updateSelection();\r
\r
    this.input.keyboard?.on('keydown-UP', () => {\r
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;\r
      this.updateSelection();\r
    });\r
\r
    this.input.keyboard?.on('keydown-DOWN', () => {\r
      selectedIndex = (selectedIndex + 1) % menuItems.length;\r
      this.updateSelection();\r
    });\r
\r
    this.input.keyboard?.on('keydown-ENTER', () => {\r
      const selected = menuItems[selectedIndex];\r
      this.statusText.setText(\`Selected: \${selected}!\`);\r
    });\r
  }\r
\r
  update() {\r
    this.gridLines.forEach(({ sprite, speed }) => {\r
      sprite.tilePositionY += speed;\r
    });\r
\r
    this.updateEchoes();\r
\r
    if (!gamepadModule || !gamepadModule.isConnected()) {\r
      return;\r
    }\r
\r
    const up = gamepadModule.getButton('dpadUp');\r
    const down = gamepadModule.getButton('dpadDown');\r
    const a = gamepadModule.getButton('A');\r
    const leftStick = gamepadModule.getStick('L');\r
\r
    if (\r
      (up.justChanged && up.pressed) ||\r
      (leftStick.justChanged && leftStick.pressed && leftStick.value[1] < -0.5)\r
    ) {\r
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;\r
      this.updateSelection();\r
    }\r
\r
    if (\r
      (down.justChanged && down.pressed) ||\r
      (leftStick.justChanged && leftStick.pressed && leftStick.value[1] > 0.5)\r
    ) {\r
      selectedIndex = (selectedIndex + 1) % menuItems.length;\r
      this.updateSelection();\r
    }\r
\r
    if (a.justChanged && a.pressed) {\r
      const selected = menuItems[selectedIndex];\r
      this.statusText.setText(\`Selected: \${selected}!\`);\r
    }\r
  }\r
\r
  private updateSelection() {\r
    if (this.currentTween) {\r
      this.currentTween.stop();\r
    }\r
\r
    this.textObjects.forEach((text, index) => {\r
      text.setColor(index === selectedIndex ? '#5700fa' : '#a78bfa');\r
    });\r
\r
    this.echoes.forEach((e) => e.text.destroy());\r
    this.echoes = [];\r
\r
    this.textObjects.forEach((text, index) => {\r
      if (index === selectedIndex) {\r
        this.currentTween = this.tweens.add({\r
          targets: text,\r
          scale: 1.1,\r
          duration: 400,\r
          ease: 'Back.easeOut',\r
        });\r
        this.spawnEcho(text.text);\r
\r
        if (index === 2) {\r
          this.spawnCans();\r
        }\r
      } else {\r
        this.tweens.add({\r
          targets: text,\r
          scale: 1,\r
          from: 1.1,\r
          duration: 150,\r
          ease: 'Back.easeOut',\r
        });\r
      }\r
    });\r
  }\r
\r
  private spawnEcho(text: string) {\r
    const x = 400;\r
    const y = 250 + selectedIndex * 60;\r
\r
    for (let i = 0; i < 5; i++) {\r
      const echo = this.add\r
        .text(x, y, text, {\r
          fontSize: '32px',\r
          fontFamily: 'Audiowide',\r
          fontStyle: 'normal',\r
          color: '#FFF',\r
        })\r
        .setOrigin(0.5)\r
        .setDepth(-1);\r
\r
      this.echoes.push({ text: echo, offset: i * 10 });\r
    }\r
  }\r
\r
  private updateEchoes() {\r
    this.echoes.forEach((echo) => {\r
      echo.offset += 1;\r
\r
      const alpha = Math.max(0, 1 - echo.offset * 0.025);\r
      const scaleOffset = echo.offset * 0.02;\r
\r
      echo.text.setAlpha(alpha);\r
      echo.text.setScale(1.2 + scaleOffset);\r
\r
      if (alpha <= 0) {\r
        echo.offset = 0;\r
      }\r
    });\r
  }\r
\r
  private spawnCans() {\r
    const x = Phaser.Math.Between(350, 450);\r
    const y = 380;\r
\r
    const can = this.add.text(x, y, '🥫', { fontSize: '48px' }).setOrigin(0.5, 0.5);\r
    can.setDepth(10);\r
\r
    this.matter.add.gameObject(can, {\r
      shape: { type: 'rectangle', width: 24, height: 32 },\r
      restitution: 0.5,\r
      friction: 0.1,\r
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },\r
      torque: Phaser.Math.FloatBetween(-1, 1),\r
    });\r
\r
    can.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));\r
\r
    this.cans.push(can);\r
  }\r
}\r
\r
const config: Phaser.Types.Core.GameConfig = {\r
  type: Phaser.AUTO,\r
  width: 800,\r
  height: 600,\r
  parent: 'app',\r
  backgroundColor: '#1a0032',\r
  scene: [MenuScene],\r
  physics: {\r
    default: 'matter',\r
    matter: {\r
      gravity: { x: 0, y: 1 },\r
      debug: false,\r
    },\r
  },\r
};\r
\r
new Phaser.Game(config);\r
\r
const joymap = createJoymap({\r
  onPoll() {\r
    const unusedIds = joymap.getUnusedPadIds();\r
\r
    if (unusedIds.length > 0 && !gamepadModule) {\r
      gamepadModule = createQueryModule({ padId: unusedIds[0] });\r
      joymap.addModule(gamepadModule);\r
    }\r
\r
    if (gamepadModule && !gamepadModule.isConnected()) {\r
      gamepadModule = null;\r
    }\r
  },\r
});\r
\r
joymap.start();\r
`,dl={"index.ts":{content:_(ul),isBinary:!1},"index.html":{content:cl,isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!1,hasReact:!1,devDependencies:{phaser:Q.devDependencies.phaser}})},"tsconfig.json":Ee},pl=`import React, { ReactNode, useState } from 'react';\r
import { QueryModule } from 'joymap';\r
\r
import gamepadUrl from '@/examples/assets/gamepad.png';\r
import l1Url from '@/examples/assets/L1.png';\r
import l2Url from '@/examples/assets/L2.png';\r
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
`,fl=`<!doctype html>\r
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
`,ml=`import './Main';\r
`,hl=`import React, { useEffect, useState } from 'react';\r
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
`,gl={"index.ts":{content:_(ml),isBinary:!1},"Main.tsx":{content:_(hl),isBinary:!1},"Gamepad.tsx":{content:_(pl),isBinary:!1},"index.html":{content:fl,isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":ue["color-hash"],tinycolor2:ue.tinycolor2},devDependencies:{"@types/color-hash":ue["@types/color-hash"],"@types/tinycolor2":ue["@types/tinycolor2"]}})},"tsconfig.json":Ee},xl=`<!doctype html>\r
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
`,yl=`// Simple canvas example that doesn't use any other library nor ES6 features\r
import { createJoymap, createQueryModule, QueryModule } from 'joymap';\r
\r
import gamepadUrl from '@/examples/assets/gamepad.png';\r
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
`,hn={"index.ts":{content:_(yl),isBinary:!1},"index.html":{content:xl,isBinary:!1},"package.json":{isBinary:!1,content:Re({hasLodash:!1,hasReact:!1})},"tsconfig.json":Ee},lt={readme:{html:"examples/pages/Readme/index.html",title:"Readme",tags:[]},react:{html:"examples/pages/React/index.html",title:"React Example",gitPath:"tree/master/examples/pages/React",codesandbox:fe(gl),tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",title:"Fighting Example",gitPath:"tree/master/examples/pages/Fighting",codesandbox:fe(fn),stackblitz:fn,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",title:"Rumble Example",gitPath:"tree/master/examples/pages/Rumble",codesandbox:fe(hn),stackblitz:hn,tags:["queryModule","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",title:"Log Example",gitPath:"tree/master/examples/pages/Log",codesandbox:fe(mn),stackblitz:mn,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",title:"Editor Example",gitPath:"tree/master/examples/pages/Editor",codesandbox:fe(tl),tags:["eventModule","react"],description:"A text editor example that binds gamepad buttons to keyboard events."},phaser:{html:"examples/pages/Phaser/index.html",title:"Phaser Example",gitPath:"tree/master/examples/pages/Phaser",codesandbox:fe(dl),tags:["queryModule","phaser"],description:"A Phaser game menu demonstrating gamepad navigation with joymap."}};function vl(){const{page:e}=wo(),t=wt(),n=Object.keys(lt).includes(e??"")?e:"readme",r=a=>t(`/examples/${a}`),o=lt[n];return o?v.jsx(Ds,{children:v.jsxs("div",{className:"flex h-screen flex-col",children:[v.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:v.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:v.jsx("img",{src:Hs})}),v.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),v.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:v.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(lt).map(a=>{const i=a===n;return v.jsx(ga,{role:"tab",onClick:()=>r(a),isActive:i,children:a},a)})})})]})}),v.jsx("main",{className:"flex w-full flex-1 flex-col",children:v.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[v.jsxs("div",{className:"mb-6",children:[v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("div",{className:"flex flex-wrap gap-3",children:o.tags.map(a=>v.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:a},a))}),v.jsxs("div",{className:"flex justify-end",children:[!!o.codesandbox&&v.jsx($s,{value:o.codesandbox}),!!o.stackblitz&&v.jsx(_s,{files:o.stackblitz}),o.gitPath&&v.jsx(Dt,{content:"View example on github",children:v.jsx(Er,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${o.gitPath}`,children:v.jsx(Bs,{})})})]})]}),v.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:o.description})]}),o.code&&v.jsx(wa,{code:o.code}),v.jsx(Fs,{path:n==="readme"?"README.md":o.html.replace(/\/index\.html$/,"/"),children:v.jsx("iframe",{src:`/joymap/${o.html}`,className:"relative block h-full w-full"},o.html)})]})}),v.jsx("footer",{className:"border-t border-border py-4",children:v.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:v.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",Ys]})})})]})}):null}const Cr=document.createElement("div");document.body.appendChild(Cr);const wl=Nr(Cr);wl.render(v.jsx(ia,{basename:"/joymap/",children:v.jsxs(Do,{children:[v.jsx(ut,{path:"/examples/:page",element:v.jsx(vl,{})}),v.jsx(ut,{path:"/",element:v.jsx(Io,{to:"/examples/readme",replace:!0})})]})}));
//# sourceMappingURL=main-BEF-aly_.js.map
