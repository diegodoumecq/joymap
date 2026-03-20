import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as u,j as y,a as St,R as Rt,b as Xr,c as Gr}from"./client-vbRJSMsA.js";import{l as Jr}from"./logo-DjnJeyrZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Kn="popstate";function et(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function qr(e={}){function n(r,o){var c;let a=(c=o.state)==null?void 0:c.masked,{pathname:i,search:s,hash:l}=a||r.location;return fn("",{pathname:i,search:s,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default",a?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function t(r,o){return typeof o=="string"?o:ke(o)}return Qr(n,t,null,e)}function I(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function W(e,n){if(!e){typeof console<"u"&&console.warn(n);try{throw new Error(n)}catch{}}}function Zr(){return Math.random().toString(36).substring(2,10)}function nt(e,n){return{usr:e.state,key:e.key,idx:n,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function fn(e,n,t=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof n=="string"?ye(n):n,state:t,key:n&&n.key||r||Zr(),unstable_mask:o}}function ke({pathname:e="/",search:n="",hash:t=""}){return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),t&&t!=="#"&&(e+=t.charAt(0)==="#"?t:"#"+t),e}function ye(e){let n={};if(e){let t=e.indexOf("#");t>=0&&(n.hash=e.substring(t),e=e.substring(0,t));let r=e.indexOf("?");r>=0&&(n.search=e.substring(r),e=e.substring(0,r)),e&&(n.pathname=e)}return n}function Qr(e,n,t,r={}){let{window:o=document.defaultView,v5Compat:a=!1}=r,i=o.history,s="POP",l=null,c=d();c==null&&(c=0,i.replaceState({...i.state,idx:c},""));function d(){return(i.state||{idx:null}).idx}function m(){s="POP";let b=d(),x=b==null?null:b-c;c=b,l&&l({action:s,location:g.location,delta:x})}function p(b,x){s="PUSH";let v=et(b)?b:fn(g.location,b,x);c=d()+1;let w=nt(v,c),E=g.createHref(v.unstable_mask||v);try{i.pushState(w,"",E)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;o.location.assign(E)}a&&l&&l({action:s,location:g.location,delta:1})}function f(b,x){s="REPLACE";let v=et(b)?b:fn(g.location,b,x);c=d();let w=nt(v,c),E=g.createHref(v.unstable_mask||v);i.replaceState(w,"",E),a&&l&&l({action:s,location:g.location,delta:0})}function h(b){return Kr(b)}let g={get action(){return s},get location(){return e(o,i)},listen(b){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(Kn,m),l=b,()=>{o.removeEventListener(Kn,m),l=null}},createHref(b){return n(o,b)},createURL:h,encodeLocation(b){let x=h(b);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:p,replace:f,go(b){return i.go(b)}};return g}function Kr(e,n=!1){let t="http://localhost";typeof window<"u"&&(t=window.location.origin!=="null"?window.location.origin:window.location.href),I(t,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ke(e);return r=r.replace(/ $/,"%20"),!n&&r.startsWith("//")&&(r=t+r),new URL(r,t)}function kt(e,n,t="/"){return eo(e,n,t,!1)}function eo(e,n,t,r){let o=typeof n=="string"?ye(n):n,a=ee(o.pathname||"/",t);if(a==null)return null;let i=Mt(e);no(i);let s=null;for(let l=0;s==null&&l<i.length;++l){let c=po(a);s=uo(i[l],c,r)}return s}function Mt(e,n=[],t=[],r="",o=!1){let a=(i,s,l=o,c)=>{let d={relativePath:c===void 0?i.path||"":c,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&l)return;I(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let m=J([r,d.relativePath]),p=t.concat(d);i.children&&i.children.length>0&&(I(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),Mt(i.children,n,p,m,l)),!(i.path==null&&!i.index)&&n.push({path:m,score:lo(m,i.index),routesMeta:p})};return e.forEach((i,s)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))a(i,s);else for(let c of Lt(i.path))a(i,s,!0,c)}),n}function Lt(e){let n=e.split("/");if(n.length===0)return[];let[t,...r]=n,o=t.endsWith("?"),a=t.replace(/\?$/,"");if(r.length===0)return o?[a,""]:[a];let i=Lt(r.join("/")),s=[];return s.push(...i.map(l=>l===""?a:[a,l].join("/"))),o&&s.push(...i),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function no(e){e.sort((n,t)=>n.score!==t.score?t.score-n.score:co(n.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}var to=/^:[\w-]+$/,ro=3,oo=2,ao=1,io=10,so=-2,tt=e=>e==="*";function lo(e,n){let t=e.split("/"),r=t.length;return t.some(tt)&&(r+=so),n&&(r+=oo),t.filter(o=>!tt(o)).reduce((o,a)=>o+(to.test(a)?ro:a===""?ao:io),r)}function co(e,n){return e.length===n.length&&e.slice(0,-1).every((r,o)=>r===n[o])?e[e.length-1]-n[n.length-1]:0}function uo(e,n,t=!1){let{routesMeta:r}=e,o={},a="/",i=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,d=a==="/"?n:n.slice(a.length)||"/",m=We({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),p=l.route;if(!m&&c&&t&&!r[r.length-1].route.index&&(m=We({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},d)),!m)return null;Object.assign(o,m.params),i.push({params:o,pathname:J([a,m.pathname]),pathnameBase:xo(J([a,m.pathnameBase])),route:p}),m.pathnameBase!=="/"&&(a=J([a,m.pathnameBase]))}return i}function We(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[t,r]=mo(e.path,e.caseSensitive,e.end),o=n.match(t);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((c,{paramName:d,isOptional:m},p)=>{if(d==="*"){let h=s[p]||"";i=a.slice(0,a.length-h.length).replace(/(.)\/+$/,"$1")}const f=s[p];return m&&!f?c[d]=void 0:c[d]=(f||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:i,pattern:e}}function mo(e,n=!1,t=!0){W(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,l,c,d)=>{if(r.push({paramName:s,isOptional:l!=null}),l){let m=d.charAt(c+i.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,n?void 0:"i"),r]}function po(e){try{return e.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(n){return W(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`),e}}function ee(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let t=n.endsWith("/")?n.length-1:n.length,r=e.charAt(t);return r&&r!=="/"?null:e.slice(t)||"/"}var fo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function ho(e,n="/"){let{pathname:t,search:r="",hash:o=""}=typeof e=="string"?ye(e):e,a;return t?(t=t.replace(/\/\/+/g,"/"),t.startsWith("/")?a=rt(t.substring(1),"/"):a=rt(t,n)):a=n,{pathname:a,search:bo(r),hash:yo(o)}}function rt(e,n){let t=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function an(e,n,t,r){return`Cannot include a '${e}' character in a manually specified \`to.${n}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function go(e){return e.filter((n,t)=>t===0||n.route.path&&n.route.path.length>0)}function Cn(e){let n=go(e);return n.map((t,r)=>r===n.length-1?t.pathname:t.pathnameBase)}function Ge(e,n,t,r=!1){let o;typeof e=="string"?o=ye(e):(o={...e},I(!o.pathname||!o.pathname.includes("?"),an("?","pathname","search",o)),I(!o.pathname||!o.pathname.includes("#"),an("#","pathname","hash",o)),I(!o.search||!o.search.includes("#"),an("#","search","hash",o)));let a=e===""||o.pathname==="",i=a?"/":o.pathname,s;if(i==null)s=t;else{let m=n.length-1;if(!r&&i.startsWith("..")){let p=i.split("/");for(;p[0]==="..";)p.shift(),m-=1;o.pathname=p.join("/")}s=m>=0?n[m]:"/"}let l=ho(o,s),c=i&&i!=="/"&&i.endsWith("/"),d=(a||i===".")&&t.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}var J=e=>e.join("/").replace(/\/\/+/g,"/"),xo=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),bo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,yo=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,vo=class{constructor(e,n,t,r=!1){this.status=e,this.statusText=n||"",this.internal=r,t instanceof Error?(this.data=t.toString(),this.error=t):this.data=t}};function wo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Eo(e){return e.map(n=>n.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Pt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Tt(e,n){let t=e;if(typeof t!="string"||!fo.test(t))return{absoluteURL:void 0,isExternal:!1,to:t};let r=t,o=!1;if(Pt)try{let a=new URL(window.location.href),i=t.startsWith("//")?new URL(a.protocol+t):new URL(t),s=ee(i.pathname,n);i.origin===a.origin&&s!=null?t=s+i.search+i.hash:o=!0}catch{W(!1,`<Link to="${t}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:t}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var It=["POST","PUT","PATCH","DELETE"];new Set(It);var Co=["GET",...It];new Set(Co);var ve=u.createContext(null);ve.displayName="DataRouter";var Je=u.createContext(null);Je.displayName="DataRouterState";var So=u.createContext(!1),At=u.createContext({isTransitioning:!1});At.displayName="ViewTransition";var Ro=u.createContext(new Map);Ro.displayName="Fetchers";var ko=u.createContext(null);ko.displayName="Await";var U=u.createContext(null);U.displayName="Navigation";var Pe=u.createContext(null);Pe.displayName="Location";var Y=u.createContext({outlet:null,matches:[],isDataRoute:!1});Y.displayName="Route";var Sn=u.createContext(null);Sn.displayName="RouteError";var Nt="REACT_ROUTER_ERROR",Mo="REDIRECT",Lo="ROUTE_ERROR_RESPONSE";function Po(e){if(e.startsWith(`${Nt}:${Mo}:{`))try{let n=JSON.parse(e.slice(28));if(typeof n=="object"&&n&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.location=="string"&&typeof n.reloadDocument=="boolean"&&typeof n.replace=="boolean")return n}catch{}}function To(e){if(e.startsWith(`${Nt}:${Lo}:{`))try{let n=JSON.parse(e.slice(40));if(typeof n=="object"&&n&&typeof n.status=="number"&&typeof n.statusText=="string")return new vo(n.status,n.statusText,n.data)}catch{}}function Io(e,{relative:n}={}){I(we(),"useHref() may be used only in the context of a <Router> component.");let{basename:t,navigator:r}=u.useContext(U),{hash:o,pathname:a,search:i}=Te(e,{relative:n}),s=a;return t!=="/"&&(s=a==="/"?t:J([t,a])),r.createHref({pathname:s,search:i,hash:o})}function we(){return u.useContext(Pe)!=null}function re(){return I(we(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(Pe).location}var Ot="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function jt(e){u.useContext(U).static||u.useLayoutEffect(e)}function Rn(){let{isDataRoute:e}=u.useContext(Y);return e?Vo():Ao()}function Ao(){I(we(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(ve),{basename:n,navigator:t}=u.useContext(U),{matches:r}=u.useContext(Y),{pathname:o}=re(),a=JSON.stringify(Cn(r)),i=u.useRef(!1);return jt(()=>{i.current=!0}),u.useCallback((l,c={})=>{if(W(i.current,Ot),!i.current)return;if(typeof l=="number"){t.go(l);return}let d=Ge(l,JSON.parse(a),o,c.relative==="path");e==null&&n!=="/"&&(d.pathname=d.pathname==="/"?n:J([n,d.pathname])),(c.replace?t.replace:t.push)(d,c.state,c)},[n,t,a,o,e])}u.createContext(null);function No(){let{matches:e}=u.useContext(Y),n=e[e.length-1];return n?n.params:{}}function Te(e,{relative:n}={}){let{matches:t}=u.useContext(Y),{pathname:r}=re(),o=JSON.stringify(Cn(t));return u.useMemo(()=>Ge(e,JSON.parse(o),r,n==="path"),[e,o,r,n])}function Oo(e,n){return Dt(e,n)}function Dt(e,n,t){var b;I(we(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=u.useContext(U),{matches:o}=u.useContext(Y),a=o[o.length-1],i=a?a.params:{},s=a?a.pathname:"/",l=a?a.pathnameBase:"/",c=a&&a.route;{let x=c&&c.path||"";$t(s,!c||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let d=re(),m;if(n){let x=typeof n=="string"?ye(n):n;I(l==="/"||((b=x.pathname)==null?void 0:b.startsWith(l)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),m=x}else m=d;let p=m.pathname||"/",f=p;if(l!=="/"){let x=l.replace(/^\//,"").split("/");f="/"+p.replace(/^\//,"").split("/").slice(x.length).join("/")}let h=kt(e,{pathname:f});W(c||h!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),W(h==null||h[h.length-1].route.element!==void 0||h[h.length-1].route.Component!==void 0||h[h.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=Ho(h&&h.map(x=>Object.assign({},x,{params:Object.assign({},i,x.params),pathname:J([l,r.encodeLocation?r.encodeLocation(x.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:J([l,r.encodeLocation?r.encodeLocation(x.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathnameBase])})),o,t);return n&&g?u.createElement(Pe.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...m},navigationType:"POP"}},g):g}function jo(){let e=zo(),n=wo(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),t=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},a={padding:"2px 4px",backgroundColor:r},i=null;return console.error("Error handled by React Router default ErrorBoundary:",e),i=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:a},"ErrorBoundary")," or"," ",u.createElement("code",{style:a},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},n),t?u.createElement("pre",{style:o},t):null,i)}var Do=u.createElement(jo,null),Ft=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){this.props.onError?this.props.onError(e,n):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const t=To(e.digest);t&&(e=t)}let n=e!==void 0?u.createElement(Y.Provider,{value:this.props.routeContext},u.createElement(Sn.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?u.createElement(Fo,{error:e},n):n}};Ft.contextType=So;var sn=new WeakMap;function Fo({children:e,error:n}){let{basename:t}=u.useContext(U);if(typeof n=="object"&&n&&"digest"in n&&typeof n.digest=="string"){let r=Po(n.digest);if(r){let o=sn.get(n);if(o)throw o;let a=Tt(r.location,t);if(Pt&&!sn.get(n))if(a.isExternal||r.reloadDocument)window.location.href=a.absoluteURL||a.to;else{const i=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:r.replace}));throw sn.set(n,i),i}return u.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a.absoluteURL||a.to}`})}}return e}function $o({routeContext:e,match:n,children:t}){let r=u.useContext(ve);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),u.createElement(Y.Provider,{value:e},t)}function Ho(e,n=[],t){let r=t==null?void 0:t.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(n.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,a=r==null?void 0:r.errors;if(a!=null){let d=o.findIndex(m=>m.route.id&&(a==null?void 0:a[m.route.id])!==void 0);I(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,d+1))}let i=!1,s=-1;if(t&&r){i=r.renderFallback;for(let d=0;d<o.length;d++){let m=o[d];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(s=d),m.route.id){let{loaderData:p,errors:f}=r,h=m.route.loader&&!p.hasOwnProperty(m.route.id)&&(!f||f[m.route.id]===void 0);if(m.route.lazy||h){t.isStatic&&(i=!0),s>=0?o=o.slice(0,s+1):o=[o[0]];break}}}}let l=t==null?void 0:t.onError,c=r&&l?(d,m)=>{var p,f;l(d,{location:r.location,params:((f=(p=r.matches)==null?void 0:p[0])==null?void 0:f.params)??{},unstable_pattern:Eo(r.matches),errorInfo:m})}:void 0;return o.reduceRight((d,m,p)=>{let f,h=!1,g=null,b=null;r&&(f=a&&m.route.id?a[m.route.id]:void 0,g=m.route.errorElement||Do,i&&(s<0&&p===0?($t("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),h=!0,b=null):s===p&&(h=!0,b=m.route.hydrateFallbackElement||null)));let x=n.concat(o.slice(0,p+1)),v=()=>{let w;return f?w=g:h?w=b:m.route.Component?w=u.createElement(m.route.Component,null):m.route.element?w=m.route.element:w=d,u.createElement($o,{match:m,routeContext:{outlet:d,matches:x,isDataRoute:r!=null},children:w})};return r&&(m.route.ErrorBoundary||m.route.errorElement||p===0)?u.createElement(Ft,{location:r.location,revalidation:r.revalidation,component:g,error:f,children:v(),routeContext:{outlet:null,matches:x,isDataRoute:!0},onError:c}):v()},null)}function kn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Bo(e){let n=u.useContext(ve);return I(n,kn(e)),n}function _o(e){let n=u.useContext(Je);return I(n,kn(e)),n}function Uo(e){let n=u.useContext(Y);return I(n,kn(e)),n}function Mn(e){let n=Uo(e),t=n.matches[n.matches.length-1];return I(t.route.id,`${e} can only be used on routes that contain a unique "id"`),t.route.id}function Wo(){return Mn("useRouteId")}function zo(){var r;let e=u.useContext(Sn),n=_o("useRouteError"),t=Mn("useRouteError");return e!==void 0?e:(r=n.errors)==null?void 0:r[t]}function Vo(){let{router:e}=Bo("useNavigate"),n=Mn("useNavigate"),t=u.useRef(!1);return jt(()=>{t.current=!0}),u.useCallback(async(o,a={})=>{W(t.current,Ot),t.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:n,...a}))},[e,n])}var ot={};function $t(e,n,t){!n&&!ot[e]&&(ot[e]=!0,W(!1,t))}u.memo(Yo);function Yo({routes:e,future:n,state:t,isStatic:r,onError:o}){return Dt(e,void 0,{state:t,isStatic:r,onError:o})}function Xo({to:e,replace:n,state:t,relative:r}){I(we(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=u.useContext(U);W(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:a}=u.useContext(Y),{pathname:i}=re(),s=Rn(),l=Ge(e,Cn(a),i,r==="path"),c=JSON.stringify(l);return u.useEffect(()=>{s(JSON.parse(c),{replace:n,state:t,relative:r})},[s,c,r,n,t]),null}function hn(e){I(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Go({basename:e="/",children:n=null,location:t,navigationType:r="POP",navigator:o,static:a=!1,unstable_useTransitions:i}){I(!we(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),l=u.useMemo(()=>({basename:s,navigator:o,static:a,unstable_useTransitions:i,future:{}}),[s,o,a,i]);typeof t=="string"&&(t=ye(t));let{pathname:c="/",search:d="",hash:m="",state:p=null,key:f="default",unstable_mask:h}=t,g=u.useMemo(()=>{let b=ee(c,s);return b==null?null:{location:{pathname:b,search:d,hash:m,state:p,key:f,unstable_mask:h},navigationType:r}},[s,c,d,m,p,f,r,h]);return W(g!=null,`<Router basename="${s}"> is not able to match the URL "${c}${d}${m}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:u.createElement(U.Provider,{value:l},u.createElement(Pe.Provider,{children:n,value:g}))}function Jo({children:e,location:n}){return Oo(gn(e),n)}function gn(e,n=[]){let t=[];return u.Children.forEach(e,(r,o)=>{if(!u.isValidElement(r))return;let a=[...n,o];if(r.type===u.Fragment){t.push.apply(t,gn(r.props.children,a));return}I(r.type===hn,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),I(!r.props.index||!r.props.children,"An index route cannot have child routes.");let i={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=gn(r.props.children,a)),t.push(i)}),t}var He="get",Be="application/x-www-form-urlencoded";function qe(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function qo(e){return qe(e)&&e.tagName.toLowerCase()==="button"}function Zo(e){return qe(e)&&e.tagName.toLowerCase()==="form"}function Qo(e){return qe(e)&&e.tagName.toLowerCase()==="input"}function Ko(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ea(e,n){return e.button===0&&(!n||n==="_self")&&!Ko(e)}var je=null;function na(){if(je===null)try{new FormData(document.createElement("form"),0),je=!1}catch{je=!0}return je}var ta=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ln(e){return e!=null&&!ta.has(e)?(W(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Be}"`),null):e}function ra(e,n){let t,r,o,a,i;if(Zo(e)){let s=e.getAttribute("action");r=s?ee(s,n):null,t=e.getAttribute("method")||He,o=ln(e.getAttribute("enctype"))||Be,a=new FormData(e)}else if(qo(e)||Qo(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||s.getAttribute("action");if(r=l?ee(l,n):null,t=e.getAttribute("formmethod")||s.getAttribute("method")||He,o=ln(e.getAttribute("formenctype"))||ln(s.getAttribute("enctype"))||Be,a=new FormData(s,e),!na()){let{name:c,type:d,value:m}=e;if(d==="image"){let p=c?`${c}.`:"";a.append(`${p}x`,"0"),a.append(`${p}y`,"0")}else c&&a.append(c,m)}}else{if(qe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');t=He,r=null,o=Be,i=e}return a&&o==="text/plain"&&(i=a,a=void 0),{action:r,method:t.toLowerCase(),encType:o,formData:a,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Ln(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function oa(e,n,t,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return t?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:n&&ee(o.pathname,n)==="/"?o.pathname=`${n.replace(/\/$/,"")}/_root.${r}`:o.pathname=`${o.pathname.replace(/\/$/,"")}.${r}`,o}async function aa(e,n){if(e.id in n)return n[e.id];try{let t=await import(e.module);return n[e.id]=t,t}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ia(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function sa(e,n,t){let r=await Promise.all(e.map(async o=>{let a=n.routes[o.route.id];if(a){let i=await aa(a,t);return i.links?i.links():[]}return[]}));return da(r.flat(1).filter(ia).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function at(e,n,t,r,o,a){let i=(l,c)=>t[c]?l.route.id!==t[c].route.id:!0,s=(l,c)=>{var d;return t[c].pathname!==l.pathname||((d=t[c].route.path)==null?void 0:d.endsWith("*"))&&t[c].params["*"]!==l.params["*"]};return a==="assets"?n.filter((l,c)=>i(l,c)||s(l,c)):a==="data"?n.filter((l,c)=>{var m;let d=r.routes[l.route.id];if(!d||!d.hasLoader)return!1;if(i(l,c)||s(l,c))return!0;if(l.route.shouldRevalidate){let p=l.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((m=t[0])==null?void 0:m.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function la(e,n,{includeHydrateFallback:t}={}){return ca(e.map(r=>{let o=n.routes[r.route.id];if(!o)return[];let a=[o.module];return o.clientActionModule&&(a=a.concat(o.clientActionModule)),o.clientLoaderModule&&(a=a.concat(o.clientLoaderModule)),t&&o.hydrateFallbackModule&&(a=a.concat(o.hydrateFallbackModule)),o.imports&&(a=a.concat(o.imports)),a}).flat(1))}function ca(e){return[...new Set(e)]}function ua(e){let n={},t=Object.keys(e).sort();for(let r of t)n[r]=e[r];return n}function da(e,n){let t=new Set;return new Set(n),e.reduce((r,o)=>{let a=JSON.stringify(ua(o));return t.has(a)||(t.add(a),r.push({key:a,link:o})),r},[])}function Ht(){let e=u.useContext(ve);return Ln(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ma(){let e=u.useContext(Je);return Ln(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Pn=u.createContext(void 0);Pn.displayName="FrameworkContext";function Bt(){let e=u.useContext(Pn);return Ln(e,"You must render this element inside a <HydratedRouter> element"),e}function pa(e,n){let t=u.useContext(Pn),[r,o]=u.useState(!1),[a,i]=u.useState(!1),{onFocus:s,onBlur:l,onMouseEnter:c,onMouseLeave:d,onTouchStart:m}=n,p=u.useRef(null);u.useEffect(()=>{if(e==="render"&&i(!0),e==="viewport"){let g=x=>{x.forEach(v=>{i(v.isIntersecting)})},b=new IntersectionObserver(g,{threshold:.5});return p.current&&b.observe(p.current),()=>{b.disconnect()}}},[e]),u.useEffect(()=>{if(r){let g=setTimeout(()=>{i(!0)},100);return()=>{clearTimeout(g)}}},[r]);let f=()=>{o(!0)},h=()=>{o(!1),i(!1)};return t?e!=="intent"?[a,p,{}]:[a,p,{onFocus:Re(s,f),onBlur:Re(l,h),onMouseEnter:Re(c,f),onMouseLeave:Re(d,h),onTouchStart:Re(m,f)}]:[!1,p,{}]}function Re(e,n){return t=>{e&&e(t),t.defaultPrevented||n(t)}}function fa({page:e,...n}){let{router:t}=Ht(),r=u.useMemo(()=>kt(t.routes,e,t.basename),[t.routes,e,t.basename]);return r?u.createElement(ga,{page:e,matches:r,...n}):null}function ha(e){let{manifest:n,routeModules:t}=Bt(),[r,o]=u.useState([]);return u.useEffect(()=>{let a=!1;return sa(e,n,t).then(i=>{a||o(i)}),()=>{a=!0}},[e,n,t]),r}function ga({page:e,matches:n,...t}){let r=re(),{future:o,manifest:a,routeModules:i}=Bt(),{basename:s}=Ht(),{loaderData:l,matches:c}=ma(),d=u.useMemo(()=>at(e,n,c,a,r,"data"),[e,n,c,a,r]),m=u.useMemo(()=>at(e,n,c,a,r,"assets"),[e,n,c,a,r]),p=u.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let g=new Set,b=!1;if(n.forEach(v=>{var E;let w=a.routes[v.route.id];!w||!w.hasLoader||(!d.some(C=>C.route.id===v.route.id)&&v.route.id in l&&((E=i[v.route.id])!=null&&E.shouldRevalidate)||w.hasClientLoader?b=!0:g.add(v.route.id))}),g.size===0)return[];let x=oa(e,s,o.unstable_trailingSlashAwareDataRequests,"data");return b&&g.size>0&&x.searchParams.set("_routes",n.filter(v=>g.has(v.route.id)).map(v=>v.route.id).join(",")),[x.pathname+x.search]},[s,o.unstable_trailingSlashAwareDataRequests,l,r,a,d,n,e,i]),f=u.useMemo(()=>la(m,a),[m,a]),h=ha(m);return u.createElement(u.Fragment,null,p.map(g=>u.createElement("link",{key:g,rel:"prefetch",as:"fetch",href:g,...t})),f.map(g=>u.createElement("link",{key:g,rel:"modulepreload",href:g,...t})),h.map(({key:g,link:b})=>u.createElement("link",{key:g,nonce:t.nonce,...b,crossOrigin:b.crossOrigin??t.crossOrigin})))}function xa(...e){return n=>{e.forEach(t=>{typeof t=="function"?t(n):t!=null&&(t.current=n)})}}var ba=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ba&&(window.__reactRouterVersion="7.13.1")}catch{}function ya({basename:e,children:n,unstable_useTransitions:t,window:r}){let o=u.useRef();o.current==null&&(o.current=qr({window:r,v5Compat:!0}));let a=o.current,[i,s]=u.useState({action:a.action,location:a.location}),l=u.useCallback(c=>{t===!1?s(c):u.startTransition(()=>s(c))},[t]);return u.useLayoutEffect(()=>a.listen(l),[a,l]),u.createElement(Go,{basename:e,children:n,location:i.location,navigationType:i.action,navigator:a,unstable_useTransitions:t})}var _t=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ut=u.forwardRef(function({onClick:n,discover:t="render",prefetch:r="none",relative:o,reloadDocument:a,replace:i,unstable_mask:s,state:l,target:c,to:d,preventScrollReset:m,viewTransition:p,unstable_defaultShouldRevalidate:f,...h},g){let{basename:b,navigator:x,unstable_useTransitions:v}=u.useContext(U),w=typeof d=="string"&&_t.test(d),E=Tt(d,b);d=E.to;let C=Io(d,{relative:o}),R=re(),S=null;if(s){let O=Ge(s,[],R.unstable_mask?R.unstable_mask.pathname:"/",!0);b!=="/"&&(O.pathname=O.pathname==="/"?b:J([b,O.pathname])),S=x.createHref(O)}let[M,A,P]=pa(r,h),F=Ca(d,{replace:i,unstable_mask:s,state:l,target:c,preventScrollReset:m,relative:o,viewTransition:p,unstable_defaultShouldRevalidate:f,unstable_useTransitions:v});function $(O){n&&n(O),O.defaultPrevented||F(O)}let N=!(E.isExternal||a),T=u.createElement("a",{...h,...P,href:(N?S:void 0)||E.absoluteURL||C,onClick:N?$:n,ref:xa(g,A),target:c,"data-discover":!w&&t==="render"?"true":void 0});return M&&!w?u.createElement(u.Fragment,null,T,u.createElement(fa,{page:C})):T});Ut.displayName="Link";var va=u.forwardRef(function({"aria-current":n="page",caseSensitive:t=!1,className:r="",end:o=!1,style:a,to:i,viewTransition:s,children:l,...c},d){let m=Te(i,{relative:c.relative}),p=re(),f=u.useContext(Je),{navigator:h,basename:g}=u.useContext(U),b=f!=null&&La(m)&&s===!0,x=h.encodeLocation?h.encodeLocation(m).pathname:m.pathname,v=p.pathname,w=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),w=w?w.toLowerCase():null,x=x.toLowerCase()),w&&g&&(w=ee(w,g)||w);const E=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let C=v===x||!o&&v.startsWith(x)&&v.charAt(E)==="/",R=w!=null&&(w===x||!o&&w.startsWith(x)&&w.charAt(x.length)==="/"),S={isActive:C,isPending:R,isTransitioning:b},M=C?n:void 0,A;typeof r=="function"?A=r(S):A=[r,C?"active":null,R?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let P=typeof a=="function"?a(S):a;return u.createElement(Ut,{...c,"aria-current":M,className:A,ref:d,style:P,to:i,viewTransition:s},typeof l=="function"?l(S):l)});va.displayName="NavLink";var wa=u.forwardRef(({discover:e="render",fetcherKey:n,navigate:t,reloadDocument:r,replace:o,state:a,method:i=He,action:s,onSubmit:l,relative:c,preventScrollReset:d,viewTransition:m,unstable_defaultShouldRevalidate:p,...f},h)=>{let{unstable_useTransitions:g}=u.useContext(U),b=ka(),x=Ma(s,{relative:c}),v=i.toLowerCase()==="get"?"get":"post",w=typeof s=="string"&&_t.test(s),E=C=>{if(l&&l(C),C.defaultPrevented)return;C.preventDefault();let R=C.nativeEvent.submitter,S=(R==null?void 0:R.getAttribute("formmethod"))||i,M=()=>b(R||C.currentTarget,{fetcherKey:n,method:S,navigate:t,replace:o,state:a,relative:c,preventScrollReset:d,viewTransition:m,unstable_defaultShouldRevalidate:p});g&&t!==!1?u.startTransition(()=>M()):M()};return u.createElement("form",{ref:h,method:v,action:x,onSubmit:r?l:E,...f,"data-discover":!w&&e==="render"?"true":void 0})});wa.displayName="Form";function Ea(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Wt(e){let n=u.useContext(ve);return I(n,Ea(e)),n}function Ca(e,{target:n,replace:t,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l,unstable_useTransitions:c}={}){let d=Rn(),m=re(),p=Te(e,{relative:i});return u.useCallback(f=>{if(ea(f,n)){f.preventDefault();let h=t!==void 0?t:ke(m)===ke(p),g=()=>d(e,{replace:h,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l});c?u.startTransition(()=>g()):g()}},[m,d,p,t,r,o,n,e,a,i,s,l,c])}var Sa=0,Ra=()=>`__${String(++Sa)}__`;function ka(){let{router:e}=Wt("useSubmit"),{basename:n}=u.useContext(U),t=Wo(),r=e.fetch,o=e.navigate;return u.useCallback(async(a,i={})=>{let{action:s,method:l,encType:c,formData:d,body:m}=ra(a,n);if(i.navigate===!1){let p=i.fetcherKey||Ra();await r(p,t,i.action||s,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:m,formMethod:i.method||l,formEncType:i.encType||c,flushSync:i.flushSync})}else await o(i.action||s,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:m,formMethod:i.method||l,formEncType:i.encType||c,replace:i.replace,state:i.state,fromRouteId:t,flushSync:i.flushSync,viewTransition:i.viewTransition})},[r,o,n,t])}function Ma(e,{relative:n}={}){let{basename:t}=u.useContext(U),r=u.useContext(Y);I(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),a={...Te(e||".",{relative:n})},i=re();if(e==null){a.search=i.search;let s=new URLSearchParams(a.search),l=s.getAll("index");if(l.some(d=>d==="")){s.delete("index"),l.filter(m=>m).forEach(m=>s.append("index",m));let d=s.toString();a.search=d?`?${d}`:""}}return(!e||e===".")&&o.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),t!=="/"&&(a.pathname=a.pathname==="/"?t:J([t,a.pathname])),ke(a)}function La(e,{relative:n}={}){let t=u.useContext(At);I(t!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Wt("useViewTransitionState"),o=Te(e,{relative:n});if(!t.isTransitioning)return!1;let a=ee(t.currentLocation.pathname,r)||t.currentLocation.pathname,i=ee(t.nextLocation.pathname,r)||t.nextLocation.pathname;return We(o.pathname,i)!=null||We(o.pathname,a)!=null}const Pa=({isActive:e,children:n,className:t="",...r})=>y.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${t}`,...r,children:n}),Ta=e=>y.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:y.jsx("path",{d:"M20 6 9 17l-5-5"})}),Ia=e=>y.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[y.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),y.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function Aa(e){const n=[],t=/\/\/.*$/gm;let r;for(;(r=t.exec(e))!==null;)n.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)n.push({start:r.index,end:r.index+r[0].length,className:"code-string"});n.sort((s,l)=>s.start-l.start);let a="",i=0;for(const s of n){if(s.start<i)continue;const l=e.slice(i,s.start);a+=it(l);const c=e.slice(s.start,s.end);a+=`<span class="${s.className}">${zt(c)}</span>`,i=s.end}return a+=it(e.slice(i)),a}function zt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function it(e){let n=zt(e);return n=n.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),n=n.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),n=n.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),n=n.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),n=n.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(t,r,o)=>t.includes('class="')?t:`<span class="code-function">${r}</span>${o}`),n=n.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),n}function Na({code:e}){const[n,t]=u.useState(!1),r=u.useRef(null);u.useEffect(()=>{r.current&&(r.current.innerHTML=Aa(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),t(!0),setTimeout(()=>t(!1),2e3)};return y.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[y.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[y.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),y.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:n?y.jsxs(y.Fragment,{children:[y.jsx(Ta,{className:"h-3.5 w-3.5"}),y.jsx("span",{children:"Copied"})]}):y.jsxs(y.Fragment,{children:[y.jsx(Ia,{className:"h-3.5 w-3.5"}),y.jsx("span",{children:"Copy"})]})})]}),y.jsx("div",{className:"overflow-x-auto p-4",children:y.jsx("pre",{className:"text-sm leading-relaxed",children:y.jsx("code",{ref:r,className:"font-mono"})})})]})}const Oa=()=>y.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:y.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function ja({children:e,path:n}){return y.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[n&&y.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:y.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:n})}),y.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const Vt=u.forwardRef(({isActive:e,children:n,className:t="",...r},o)=>y.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...r,children:n}));Vt.displayName="Link";const Da=500,Fa=20,$a=300,Ha="https://stackblitz.com",st=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],Ba=["project","search","ports","settings"],_a=["light","dark"],Ua=["editor","preview"],lt={clickToLoad:e=>ce("ctl",e),devToolsHeight:e=>ct("devtoolsheight",e),forceEmbedLayout:e=>ce("embed",e),hideDevTools:e=>ce("hidedevtools",e),hideExplorer:e=>ce("hideExplorer",e),hideNavigation:e=>ce("hideNavigation",e),openFile:e=>De("file",e),showSidebar:e=>Wa("showSidebar",e),sidebarView:e=>cn("sidebarView",e,Ba),startScript:e=>De("startScript",e),terminalHeight:e=>ct("terminalHeight",e),theme:e=>cn("theme",e,_a),view:e=>cn("view",e,Ua),zenMode:e=>ce("zenMode",e),organization:e=>`${De("orgName",e==null?void 0:e.name)}&${De("orgProvider",e==null?void 0:e.provider)}`,crossOriginIsolated:e=>ce("corp",e)};function Yt(e={}){const n=Object.entries(e).map(([t,r])=>r!=null&&lt.hasOwnProperty(t)?lt[t](r):"").filter(Boolean);return n.length?`?${n.join("&")}`:""}function ce(e,n){return n===!0?`${e}=1`:""}function Wa(e,n){return typeof n=="boolean"?`${e}=${n?"1":"0"}`:""}function ct(e,n){if(typeof n=="number"&&!Number.isNaN(n)){const t=Math.min(100,Math.max(0,n));return`${e}=${encodeURIComponent(Math.round(t))}`}return""}function cn(e,n="",t=[]){return t.includes(n)?`${e}=${encodeURIComponent(n)}`:""}function De(e,n){return(Array.isArray(n)?n:[n]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function Xt(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function Tn(e,n){return`${Gt(n)}${e}${Yt(n)}`}function In(e,n){const t={forceEmbedLayout:!0};return n&&typeof n=="object"&&Object.assign(t,n),`${Gt(t)}${e}${Yt(t)}`}function Gt(e={}){return(typeof e.origin=="string"?e.origin:Ha).replace(/\/$/,"")}function An(e,n,t){if(!n||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(n.id=e.id),e.className&&(n.className=e.className),za(n,t),Va(e,n,t),e.replaceWith(n)}function Nn(e){if(typeof e=="string"){const n=document.getElementById(e);if(!n)throw new Error(`Could not find element with id '${e}'`);return n}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function On(e){return e&&e.newWindow===!1?"_self":"_blank"}function za(e,n={}){const t=Object.hasOwnProperty.call(n,"height")?`${n.height}`:`${$a}`,r=Object.hasOwnProperty.call(n,"width")?`${n.width}`:void 0;e.setAttribute("height",t),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}function Va(e,n,t={}){var o,a;const r=((a=(o=e.allow)==null?void 0:o.split(";"))==null?void 0:a.map(i=>i.trim()))??[];t.crossOriginIsolated&&!r.includes("cross-origin-isolated")&&r.push("cross-origin-isolated"),r.length>0&&(n.allow=r.join("; "))}class Ya{constructor(n){this.pending={},this.port=n,this.port.onmessage=this.messageListener.bind(this)}request({type:n,payload:t}){return new Promise((r,o)=>{const a=Xt();this.pending[a]={resolve:r,reject:o},this.port.postMessage({type:n,payload:{...t,__reqid:a}})})}messageListener(n){var s;if(typeof((s=n.data.payload)==null?void 0:s.__reqid)!="string")return;const{type:t,payload:r}=n.data,{__reqid:o,__success:a,__error:i}=r;this.pending[o]&&(a?this.pending[o].resolve(this.cleanResult(r)):this.pending[o].reject(i?`${t}: ${i}`:t),delete this.pending[o])}cleanResult(n){const t={...n};return delete t.__reqid,delete t.__success,delete t.__error,Object.keys(t).length?t:null}}class Xa{constructor(n,t){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new Ya(n),Object.defineProperty(this.preview,"origin",{value:typeof t.previewOrigin=="string"?t.previewOrigin:null,writable:!1})}applyFsDiff(n){const t=r=>r!==null&&typeof r=="object";if(!t(n)||!t(n.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(n.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:n})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const _e=[];class Ga{constructor(n){this.id=Xt(),this.element=n,this.pending=new Promise((t,r)=>{const o=({data:c,ports:d})=>{(c==null?void 0:c.action)==="SDK_INIT_SUCCESS"&&c.id===this.id&&(this.vm=new Xa(d[0],c.payload),t(this.vm),i())},a=()=>{var c;(c=this.element.contentWindow)==null||c.postMessage({action:"SDK_INIT",id:this.id},"*")};function i(){window.clearInterval(l),window.removeEventListener("message",o)}window.addEventListener("message",o),a();let s=0;const l=window.setInterval(()=>{if(this.vm){i();return}if(s>=Fa){i(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),_e.forEach((c,d)=>{c.id===this.id&&_e.splice(d,1)});return}s++,a()},Da)}),_e.push(this)}}const Ja=e=>{const n=e instanceof Element?"element":"id";return _e.find(t=>t[n]===e)??null};function qa(e,n){const t=document.createElement("input");return t.type="hidden",t.name=e,t.value=n,t}function Za(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function Jt({template:e,title:n,description:t,dependencies:r,files:o,settings:a}){if(!st.includes(e)){const c=st.map(d=>`'${d}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${c}`)}const i=[],s=(c,d,m="")=>{i.push(qa(c,typeof d=="string"?d:m))};s("project[title]",n),typeof t=="string"&&t.length>0&&s("project[description]",t),s("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):s("project[dependencies]",JSON.stringify(r))),a&&s("project[settings]",JSON.stringify(a)),Object.entries(o).forEach(([c,d])=>{s(`project[files][${Za(c)}]`,d)});const l=document.createElement("form");return l.method="POST",l.setAttribute("style","display:none!important;"),l.append(...i),l}function Qa(e,n){const t=Jt(e);return t.action=In("/run",n),t.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${t.outerHTML}
  <script>document.getElementById('${t.id}').submit();<\/script>
</body>
</html>`}function Ka(e,n){const t=Jt(e);t.action=Tn("/run",n),t.target=On(n),document.body.appendChild(t),t.submit(),document.body.removeChild(t)}function Ze(e){return e!=null&&e.contentWindow?(Ja(e)??new Ga(e)).pending:Promise.reject("Provided element is not an iframe.")}function ei(e,n){Ka(e,n)}function ni(e,n){const t=Tn(`/edit/${e}`,n),r=On(n);window.open(t,r)}function ti(e,n){const t=Tn(`/github/${e}`,n),r=On(n);window.open(t,r)}function ri(e,n,t){var i;const r=Nn(e),o=Qa(n,t),a=document.createElement("iframe");return An(r,a,t),(i=a.contentDocument)==null||i.write(o),Ze(a)}function oi(e,n,t){const r=Nn(e),o=document.createElement("iframe");return o.src=In(`/edit/${n}`,t),An(r,o,t),Ze(o)}function ai(e,n,t){const r=Nn(e),o=document.createElement("iframe");return o.src=In(`/github/${n}`,t),An(r,o,t),Ze(o)}const ii={connect:Ze,embedGithubProject:ai,embedProject:ri,embedProjectId:oi,openGithubProject:ti,openProject:ei,openProjectId:ni};function K(e,n,{checkForDefaultPrevented:t=!0}={}){return function(o){if(e==null||e(o),t===!1||!o.defaultPrevented)return n==null?void 0:n(o)}}function ut(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function qt(...e){return n=>{let t=!1;const r=e.map(o=>{const a=ut(o,n);return!t&&typeof a=="function"&&(t=!0),a});if(t)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():ut(e[o],null)}}}}function pe(...e){return u.useCallback(qt(...e),e)}function Zt(e,n=[]){let t=[];function r(a,i){const s=u.createContext(i),l=t.length;t=[...t,i];const c=m=>{var x;const{scope:p,children:f,...h}=m,g=((x=p==null?void 0:p[e])==null?void 0:x[l])||s,b=u.useMemo(()=>h,Object.values(h));return y.jsx(g.Provider,{value:b,children:f})};c.displayName=a+"Provider";function d(m,p){var g;const f=((g=p==null?void 0:p[e])==null?void 0:g[l])||s,h=u.useContext(f);if(h)return h;if(i!==void 0)return i;throw new Error(`\`${m}\` must be used within \`${a}\``)}return[c,d]}const o=()=>{const a=t.map(i=>u.createContext(i));return function(s){const l=(s==null?void 0:s[e])||a;return u.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return o.scopeName=e,[r,si(o,...n)]}function si(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const i=r.reduce((s,{useScope:l,scopeName:c})=>{const m=l(a)[`__scope${c}`];return{...s,...m}},{});return u.useMemo(()=>({[`__scope${n.scopeName}`]:i}),[i])}};return t.scopeName=n.scopeName,t}function li(e){const n=ci(e),t=u.forwardRef((r,o)=>{const{children:a,...i}=r,s=u.Children.toArray(a),l=s.find(di);if(l){const c=l.props.children,d=s.map(m=>m===l?u.Children.count(c)>1?u.Children.only(null):u.isValidElement(c)?c.props.children:null:m);return y.jsx(n,{...i,ref:o,children:u.isValidElement(c)?u.cloneElement(c,void 0,d):null})}return y.jsx(n,{...i,ref:o,children:a})});return t.displayName=`${e}.Slot`,t}function ci(e){const n=u.forwardRef((t,r)=>{const{children:o,...a}=t;if(u.isValidElement(o)){const i=pi(o),s=mi(a,o.props);return o.type!==u.Fragment&&(s.ref=r?qt(r,i):i),u.cloneElement(o,s)}return u.Children.count(o)>1?u.Children.only(null):null});return n.displayName=`${e}.SlotClone`,n}var Qt=Symbol("radix.slottable");function ui(e){const n=({children:t})=>y.jsx(y.Fragment,{children:t});return n.displayName=`${e}.Slottable`,n.__radixId=Qt,n}function di(e){return u.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Qt}function mi(e,n){const t={...n};for(const r in n){const o=e[r],a=n[r];/^on[A-Z]/.test(r)?o&&a?t[r]=(...s)=>{const l=a(...s);return o(...s),l}:o&&(t[r]=o):r==="style"?t[r]={...o,...a}:r==="className"&&(t[r]=[o,a].filter(Boolean).join(" "))}return{...e,...t}}function pi(e){var r,o;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var fi=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=fi.reduce((e,n)=>{const t=li(`Primitive.${n}`),r=u.forwardRef((o,a)=>{const{asChild:i,...s}=o,l=i?t:n;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),y.jsx(l,{...s,ref:a})});return r.displayName=`Primitive.${n}`,{...e,[n]:r}},{});function hi(e,n){e&&St.flushSync(()=>e.dispatchEvent(n))}function Qe(e){const n=u.useRef(e);return u.useEffect(()=>{n.current=e}),u.useMemo(()=>(...t)=>{var r;return(r=n.current)==null?void 0:r.call(n,...t)},[])}function gi(e,n=globalThis==null?void 0:globalThis.document){const t=Qe(e);u.useEffect(()=>{const r=o=>{o.key==="Escape"&&t(o)};return n.addEventListener("keydown",r,{capture:!0}),()=>n.removeEventListener("keydown",r,{capture:!0})},[t,n])}var xi="DismissableLayer",xn="dismissableLayer.update",bi="dismissableLayer.pointerDownOutside",yi="dismissableLayer.focusOutside",dt,Kt=u.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),er=u.forwardRef((e,n)=>{const{disableOutsidePointerEvents:t=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:i,onDismiss:s,...l}=e,c=u.useContext(Kt),[d,m]=u.useState(null),p=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,f]=u.useState({}),h=pe(n,S=>m(S)),g=Array.from(c.layers),[b]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),x=g.indexOf(b),v=d?g.indexOf(d):-1,w=c.layersWithOutsidePointerEventsDisabled.size>0,E=v>=x,C=Ei(S=>{const M=S.target,A=[...c.branches].some(P=>P.contains(M));!E||A||(o==null||o(S),i==null||i(S),S.defaultPrevented||s==null||s())},p),R=Ci(S=>{const M=S.target;[...c.branches].some(P=>P.contains(M))||(a==null||a(S),i==null||i(S),S.defaultPrevented||s==null||s())},p);return gi(S=>{v===c.layers.size-1&&(r==null||r(S),!S.defaultPrevented&&s&&(S.preventDefault(),s()))},p),u.useEffect(()=>{if(d)return t&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(dt=p.body.style.pointerEvents,p.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(d)),c.layers.add(d),mt(),()=>{t&&c.layersWithOutsidePointerEventsDisabled.size===1&&(p.body.style.pointerEvents=dt)}},[d,p,t,c]),u.useEffect(()=>()=>{d&&(c.layers.delete(d),c.layersWithOutsidePointerEventsDisabled.delete(d),mt())},[d,c]),u.useEffect(()=>{const S=()=>f({});return document.addEventListener(xn,S),()=>document.removeEventListener(xn,S)},[]),y.jsx(le.div,{...l,ref:h,style:{pointerEvents:w?E?"auto":"none":void 0,...e.style},onFocusCapture:K(e.onFocusCapture,R.onFocusCapture),onBlurCapture:K(e.onBlurCapture,R.onBlurCapture),onPointerDownCapture:K(e.onPointerDownCapture,C.onPointerDownCapture)})});er.displayName=xi;var vi="DismissableLayerBranch",wi=u.forwardRef((e,n)=>{const t=u.useContext(Kt),r=u.useRef(null),o=pe(n,r);return u.useEffect(()=>{const a=r.current;if(a)return t.branches.add(a),()=>{t.branches.delete(a)}},[t.branches]),y.jsx(le.div,{...e,ref:o})});wi.displayName=vi;function Ei(e,n=globalThis==null?void 0:globalThis.document){const t=Qe(e),r=u.useRef(!1),o=u.useRef(()=>{});return u.useEffect(()=>{const a=s=>{if(s.target&&!r.current){let l=function(){nr(bi,t,c,{discrete:!0})};const c={originalEvent:s};s.pointerType==="touch"?(n.removeEventListener("click",o.current),o.current=l,n.addEventListener("click",o.current,{once:!0})):l()}else n.removeEventListener("click",o.current);r.current=!1},i=window.setTimeout(()=>{n.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(i),n.removeEventListener("pointerdown",a),n.removeEventListener("click",o.current)}},[n,t]),{onPointerDownCapture:()=>r.current=!0}}function Ci(e,n=globalThis==null?void 0:globalThis.document){const t=Qe(e),r=u.useRef(!1);return u.useEffect(()=>{const o=a=>{a.target&&!r.current&&nr(yi,t,{originalEvent:a},{discrete:!1})};return n.addEventListener("focusin",o),()=>n.removeEventListener("focusin",o)},[n,t]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function mt(){const e=new CustomEvent(xn);document.dispatchEvent(e)}function nr(e,n,t,{discrete:r}){const o=t.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:t});n&&o.addEventListener(e,n,{once:!0}),r?hi(o,a):o.dispatchEvent(a)}var ae=globalThis!=null&&globalThis.document?u.useLayoutEffect:()=>{},Si=Rt[" useId ".trim().toString()]||(()=>{}),Ri=0;function ki(e){const[n,t]=u.useState(Si());return ae(()=>{t(r=>r??String(Ri++))},[e]),n?`radix-${n}`:""}const Mi=["top","right","bottom","left"],ie=Math.min,B=Math.max,ze=Math.round,Fe=Math.floor,q=e=>({x:e,y:e}),Li={left:"right",right:"left",bottom:"top",top:"bottom"};function bn(e,n,t){return B(e,ie(n,t))}function ne(e,n){return typeof e=="function"?e(n):e}function te(e){return e.split("-")[0]}function Ee(e){return e.split("-")[1]}function jn(e){return e==="x"?"y":"x"}function Dn(e){return e==="y"?"height":"width"}function G(e){const n=e[0];return n==="t"||n==="b"?"y":"x"}function Fn(e){return jn(G(e))}function Pi(e,n,t){t===void 0&&(t=!1);const r=Ee(e),o=Fn(e),a=Dn(o);let i=o==="x"?r===(t?"end":"start")?"right":"left":r==="start"?"bottom":"top";return n.reference[a]>n.floating[a]&&(i=Ve(i)),[i,Ve(i)]}function Ti(e){const n=Ve(e);return[yn(e),n,yn(n)]}function yn(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const pt=["left","right"],ft=["right","left"],Ii=["top","bottom"],Ai=["bottom","top"];function Ni(e,n,t){switch(e){case"top":case"bottom":return t?n?ft:pt:n?pt:ft;case"left":case"right":return n?Ii:Ai;default:return[]}}function Oi(e,n,t,r){const o=Ee(e);let a=Ni(te(e),t==="start",r);return o&&(a=a.map(i=>i+"-"+o),n&&(a=a.concat(a.map(yn)))),a}function Ve(e){const n=te(e);return Li[n]+e.slice(n.length)}function ji(e){return{top:0,right:0,bottom:0,left:0,...e}}function tr(e){return typeof e!="number"?ji(e):{top:e,right:e,bottom:e,left:e}}function Ye(e){const{x:n,y:t,width:r,height:o}=e;return{width:r,height:o,top:t,left:n,right:n+r,bottom:t+o,x:n,y:t}}function ht(e,n,t){let{reference:r,floating:o}=e;const a=G(n),i=Fn(n),s=Dn(i),l=te(n),c=a==="y",d=r.x+r.width/2-o.width/2,m=r.y+r.height/2-o.height/2,p=r[s]/2-o[s]/2;let f;switch(l){case"top":f={x:d,y:r.y-o.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:m};break;case"left":f={x:r.x-o.width,y:m};break;default:f={x:r.x,y:r.y}}switch(Ee(n)){case"start":f[i]-=p*(t&&c?-1:1);break;case"end":f[i]+=p*(t&&c?-1:1);break}return f}async function Di(e,n){var t;n===void 0&&(n={});const{x:r,y:o,platform:a,rects:i,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:m="floating",altBoundary:p=!1,padding:f=0}=ne(n,e),h=tr(f),b=s[p?m==="floating"?"reference":"floating":m],x=Ye(await a.getClippingRect({element:(t=await(a.isElement==null?void 0:a.isElement(b)))==null||t?b:b.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(s.floating)),boundary:c,rootBoundary:d,strategy:l})),v=m==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,w=await(a.getOffsetParent==null?void 0:a.getOffsetParent(s.floating)),E=await(a.isElement==null?void 0:a.isElement(w))?await(a.getScale==null?void 0:a.getScale(w))||{x:1,y:1}:{x:1,y:1},C=Ye(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:v,offsetParent:w,strategy:l}):v);return{top:(x.top-C.top+h.top)/E.y,bottom:(C.bottom-x.bottom+h.bottom)/E.y,left:(x.left-C.left+h.left)/E.x,right:(C.right-x.right+h.right)/E.x}}const Fi=50,$i=async(e,n,t)=>{const{placement:r="bottom",strategy:o="absolute",middleware:a=[],platform:i}=t,s=i.detectOverflow?i:{...i,detectOverflow:Di},l=await(i.isRTL==null?void 0:i.isRTL(n));let c=await i.getElementRects({reference:e,floating:n,strategy:o}),{x:d,y:m}=ht(c,r,l),p=r,f=0;const h={};for(let g=0;g<a.length;g++){const b=a[g];if(!b)continue;const{name:x,fn:v}=b,{x:w,y:E,data:C,reset:R}=await v({x:d,y:m,initialPlacement:r,placement:p,strategy:o,middlewareData:h,rects:c,platform:s,elements:{reference:e,floating:n}});d=w??d,m=E??m,h[x]={...h[x],...C},R&&f<Fi&&(f++,typeof R=="object"&&(R.placement&&(p=R.placement),R.rects&&(c=R.rects===!0?await i.getElementRects({reference:e,floating:n,strategy:o}):R.rects),{x:d,y:m}=ht(c,p,l)),g=-1)}return{x:d,y:m,placement:p,strategy:o,middlewareData:h}},Hi=e=>({name:"arrow",options:e,async fn(n){const{x:t,y:r,placement:o,rects:a,platform:i,elements:s,middlewareData:l}=n,{element:c,padding:d=0}=ne(e,n)||{};if(c==null)return{};const m=tr(d),p={x:t,y:r},f=Fn(o),h=Dn(f),g=await i.getDimensions(c),b=f==="y",x=b?"top":"left",v=b?"bottom":"right",w=b?"clientHeight":"clientWidth",E=a.reference[h]+a.reference[f]-p[f]-a.floating[h],C=p[f]-a.reference[f],R=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c));let S=R?R[w]:0;(!S||!await(i.isElement==null?void 0:i.isElement(R)))&&(S=s.floating[w]||a.floating[h]);const M=E/2-C/2,A=S/2-g[h]/2-1,P=ie(m[x],A),F=ie(m[v],A),$=P,N=S-g[h]-F,T=S/2-g[h]/2+M,O=bn($,T,N),j=!l.arrow&&Ee(o)!=null&&T!==O&&a.reference[h]/2-(T<$?P:F)-g[h]/2<0,D=j?T<$?T-$:T-N:0;return{[f]:p[f]+D,data:{[f]:O,centerOffset:T-O-D,...j&&{alignmentOffset:D}},reset:j}}}),Bi=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(n){var t,r;const{placement:o,middlewareData:a,rects:i,initialPlacement:s,platform:l,elements:c}=n,{mainAxis:d=!0,crossAxis:m=!0,fallbackPlacements:p,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:g=!0,...b}=ne(e,n);if((t=a.arrow)!=null&&t.alignmentOffset)return{};const x=te(o),v=G(s),w=te(s)===s,E=await(l.isRTL==null?void 0:l.isRTL(c.floating)),C=p||(w||!g?[Ve(s)]:Ti(s)),R=h!=="none";!p&&R&&C.push(...Oi(s,g,h,E));const S=[s,...C],M=await l.detectOverflow(n,b),A=[];let P=((r=a.flip)==null?void 0:r.overflows)||[];if(d&&A.push(M[x]),m){const T=Pi(o,i,E);A.push(M[T[0]],M[T[1]])}if(P=[...P,{placement:o,overflows:A}],!A.every(T=>T<=0)){var F,$;const T=(((F=a.flip)==null?void 0:F.index)||0)+1,O=S[T];if(O&&(!(m==="alignment"?v!==G(O):!1)||P.every(k=>G(k.placement)===v?k.overflows[0]>0:!0)))return{data:{index:T,overflows:P},reset:{placement:O}};let j=($=P.filter(D=>D.overflows[0]<=0).sort((D,k)=>D.overflows[1]-k.overflows[1])[0])==null?void 0:$.placement;if(!j)switch(f){case"bestFit":{var N;const D=(N=P.filter(k=>{if(R){const H=G(k.placement);return H===v||H==="y"}return!0}).map(k=>[k.placement,k.overflows.filter(H=>H>0).reduce((H,X)=>H+X,0)]).sort((k,H)=>k[1]-H[1])[0])==null?void 0:N[0];D&&(j=D);break}case"initialPlacement":j=s;break}if(o!==j)return{reset:{placement:j}}}return{}}}};function gt(e,n){return{top:e.top-n.height,right:e.right-n.width,bottom:e.bottom-n.height,left:e.left-n.width}}function xt(e){return Mi.some(n=>e[n]>=0)}const _i=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(n){const{rects:t,platform:r}=n,{strategy:o="referenceHidden",...a}=ne(e,n);switch(o){case"referenceHidden":{const i=await r.detectOverflow(n,{...a,elementContext:"reference"}),s=gt(i,t.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:xt(s)}}}case"escaped":{const i=await r.detectOverflow(n,{...a,altBoundary:!0}),s=gt(i,t.floating);return{data:{escapedOffsets:s,escaped:xt(s)}}}default:return{}}}}},rr=new Set(["left","top"]);async function Ui(e,n){const{placement:t,platform:r,elements:o}=e,a=await(r.isRTL==null?void 0:r.isRTL(o.floating)),i=te(t),s=Ee(t),l=G(t)==="y",c=rr.has(i)?-1:1,d=a&&l?-1:1,m=ne(n,e);let{mainAxis:p,crossAxis:f,alignmentAxis:h}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return s&&typeof h=="number"&&(f=s==="end"?h*-1:h),l?{x:f*d,y:p*c}:{x:p*c,y:f*d}}const Wi=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(n){var t,r;const{x:o,y:a,placement:i,middlewareData:s}=n,l=await Ui(n,e);return i===((t=s.offset)==null?void 0:t.placement)&&(r=s.arrow)!=null&&r.alignmentOffset?{}:{x:o+l.x,y:a+l.y,data:{...l,placement:i}}}}},zi=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(n){const{x:t,y:r,placement:o,platform:a}=n,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:x=>{let{x:v,y:w}=x;return{x:v,y:w}}},...c}=ne(e,n),d={x:t,y:r},m=await a.detectOverflow(n,c),p=G(te(o)),f=jn(p);let h=d[f],g=d[p];if(i){const x=f==="y"?"top":"left",v=f==="y"?"bottom":"right",w=h+m[x],E=h-m[v];h=bn(w,h,E)}if(s){const x=p==="y"?"top":"left",v=p==="y"?"bottom":"right",w=g+m[x],E=g-m[v];g=bn(w,g,E)}const b=l.fn({...n,[f]:h,[p]:g});return{...b,data:{x:b.x-t,y:b.y-r,enabled:{[f]:i,[p]:s}}}}}},Vi=function(e){return e===void 0&&(e={}),{options:e,fn(n){const{x:t,y:r,placement:o,rects:a,middlewareData:i}=n,{offset:s=0,mainAxis:l=!0,crossAxis:c=!0}=ne(e,n),d={x:t,y:r},m=G(o),p=jn(m);let f=d[p],h=d[m];const g=ne(s,n),b=typeof g=="number"?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(l){const w=p==="y"?"height":"width",E=a.reference[p]-a.floating[w]+b.mainAxis,C=a.reference[p]+a.reference[w]-b.mainAxis;f<E?f=E:f>C&&(f=C)}if(c){var x,v;const w=p==="y"?"width":"height",E=rr.has(te(o)),C=a.reference[m]-a.floating[w]+(E&&((x=i.offset)==null?void 0:x[m])||0)+(E?0:b.crossAxis),R=a.reference[m]+a.reference[w]+(E?0:((v=i.offset)==null?void 0:v[m])||0)-(E?b.crossAxis:0);h<C?h=C:h>R&&(h=R)}return{[p]:f,[m]:h}}}},Yi=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(n){var t,r;const{placement:o,rects:a,platform:i,elements:s}=n,{apply:l=()=>{},...c}=ne(e,n),d=await i.detectOverflow(n,c),m=te(o),p=Ee(o),f=G(o)==="y",{width:h,height:g}=a.floating;let b,x;m==="top"||m==="bottom"?(b=m,x=p===(await(i.isRTL==null?void 0:i.isRTL(s.floating))?"start":"end")?"left":"right"):(x=m,b=p==="end"?"top":"bottom");const v=g-d.top-d.bottom,w=h-d.left-d.right,E=ie(g-d[b],v),C=ie(h-d[x],w),R=!n.middlewareData.shift;let S=E,M=C;if((t=n.middlewareData.shift)!=null&&t.enabled.x&&(M=w),(r=n.middlewareData.shift)!=null&&r.enabled.y&&(S=v),R&&!p){const P=B(d.left,0),F=B(d.right,0),$=B(d.top,0),N=B(d.bottom,0);f?M=h-2*(P!==0||F!==0?P+F:B(d.left,d.right)):S=g-2*($!==0||N!==0?$+N:B(d.top,d.bottom))}await l({...n,availableWidth:M,availableHeight:S});const A=await i.getDimensions(s.floating);return h!==A.width||g!==A.height?{reset:{rects:!0}}:{}}}};function Ke(){return typeof window<"u"}function Ce(e){return or(e)?(e.nodeName||"").toLowerCase():"#document"}function _(e){var n;return(e==null||(n=e.ownerDocument)==null?void 0:n.defaultView)||window}function Z(e){var n;return(n=(or(e)?e.ownerDocument:e.document)||window.document)==null?void 0:n.documentElement}function or(e){return Ke()?e instanceof Node||e instanceof _(e).Node:!1}function z(e){return Ke()?e instanceof Element||e instanceof _(e).Element:!1}function oe(e){return Ke()?e instanceof HTMLElement||e instanceof _(e).HTMLElement:!1}function bt(e){return!Ke()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof _(e).ShadowRoot}function Ie(e){const{overflow:n,overflowX:t,overflowY:r,display:o}=V(e);return/auto|scroll|overlay|hidden|clip/.test(n+r+t)&&o!=="inline"&&o!=="contents"}function Xi(e){return/^(table|td|th)$/.test(Ce(e))}function en(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const Gi=/transform|translate|scale|rotate|perspective|filter/,Ji=/paint|layout|strict|content/,ue=e=>!!e&&e!=="none";let un;function $n(e){const n=z(e)?V(e):e;return ue(n.transform)||ue(n.translate)||ue(n.scale)||ue(n.rotate)||ue(n.perspective)||!Hn()&&(ue(n.backdropFilter)||ue(n.filter))||Gi.test(n.willChange||"")||Ji.test(n.contain||"")}function qi(e){let n=se(e);for(;oe(n)&&!xe(n);){if($n(n))return n;if(en(n))return null;n=se(n)}return null}function Hn(){return un==null&&(un=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),un}function xe(e){return/^(html|body|#document)$/.test(Ce(e))}function V(e){return _(e).getComputedStyle(e)}function nn(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function se(e){if(Ce(e)==="html")return e;const n=e.assignedSlot||e.parentNode||bt(e)&&e.host||Z(e);return bt(n)?n.host:n}function ar(e){const n=se(e);return xe(n)?e.ownerDocument?e.ownerDocument.body:e.body:oe(n)&&Ie(n)?n:ar(n)}function Me(e,n,t){var r;n===void 0&&(n=[]),t===void 0&&(t=!0);const o=ar(e),a=o===((r=e.ownerDocument)==null?void 0:r.body),i=_(o);if(a){const s=vn(i);return n.concat(i,i.visualViewport||[],Ie(o)?o:[],s&&t?Me(s):[])}else return n.concat(o,Me(o,[],t))}function vn(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ir(e){const n=V(e);let t=parseFloat(n.width)||0,r=parseFloat(n.height)||0;const o=oe(e),a=o?e.offsetWidth:t,i=o?e.offsetHeight:r,s=ze(t)!==a||ze(r)!==i;return s&&(t=a,r=i),{width:t,height:r,$:s}}function Bn(e){return z(e)?e:e.contextElement}function ge(e){const n=Bn(e);if(!oe(n))return q(1);const t=n.getBoundingClientRect(),{width:r,height:o,$:a}=ir(n);let i=(a?ze(t.width):t.width)/r,s=(a?ze(t.height):t.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!s||!Number.isFinite(s))&&(s=1),{x:i,y:s}}const Zi=q(0);function sr(e){const n=_(e);return!Hn()||!n.visualViewport?Zi:{x:n.visualViewport.offsetLeft,y:n.visualViewport.offsetTop}}function Qi(e,n,t){return n===void 0&&(n=!1),!t||n&&t!==_(e)?!1:n}function me(e,n,t,r){n===void 0&&(n=!1),t===void 0&&(t=!1);const o=e.getBoundingClientRect(),a=Bn(e);let i=q(1);n&&(r?z(r)&&(i=ge(r)):i=ge(e));const s=Qi(a,t,r)?sr(a):q(0);let l=(o.left+s.x)/i.x,c=(o.top+s.y)/i.y,d=o.width/i.x,m=o.height/i.y;if(a){const p=_(a),f=r&&z(r)?_(r):r;let h=p,g=vn(h);for(;g&&r&&f!==h;){const b=ge(g),x=g.getBoundingClientRect(),v=V(g),w=x.left+(g.clientLeft+parseFloat(v.paddingLeft))*b.x,E=x.top+(g.clientTop+parseFloat(v.paddingTop))*b.y;l*=b.x,c*=b.y,d*=b.x,m*=b.y,l+=w,c+=E,h=_(g),g=vn(h)}}return Ye({width:d,height:m,x:l,y:c})}function tn(e,n){const t=nn(e).scrollLeft;return n?n.left+t:me(Z(e)).left+t}function lr(e,n){const t=e.getBoundingClientRect(),r=t.left+n.scrollLeft-tn(e,t),o=t.top+n.scrollTop;return{x:r,y:o}}function Ki(e){let{elements:n,rect:t,offsetParent:r,strategy:o}=e;const a=o==="fixed",i=Z(r),s=n?en(n.floating):!1;if(r===i||s&&a)return t;let l={scrollLeft:0,scrollTop:0},c=q(1);const d=q(0),m=oe(r);if((m||!m&&!a)&&((Ce(r)!=="body"||Ie(i))&&(l=nn(r)),m)){const f=me(r);c=ge(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}const p=i&&!m&&!a?lr(i,l):q(0);return{width:t.width*c.x,height:t.height*c.y,x:t.x*c.x-l.scrollLeft*c.x+d.x+p.x,y:t.y*c.y-l.scrollTop*c.y+d.y+p.y}}function es(e){return Array.from(e.getClientRects())}function ns(e){const n=Z(e),t=nn(e),r=e.ownerDocument.body,o=B(n.scrollWidth,n.clientWidth,r.scrollWidth,r.clientWidth),a=B(n.scrollHeight,n.clientHeight,r.scrollHeight,r.clientHeight);let i=-t.scrollLeft+tn(e);const s=-t.scrollTop;return V(r).direction==="rtl"&&(i+=B(n.clientWidth,r.clientWidth)-o),{width:o,height:a,x:i,y:s}}const yt=25;function ts(e,n){const t=_(e),r=Z(e),o=t.visualViewport;let a=r.clientWidth,i=r.clientHeight,s=0,l=0;if(o){a=o.width,i=o.height;const d=Hn();(!d||d&&n==="fixed")&&(s=o.offsetLeft,l=o.offsetTop)}const c=tn(r);if(c<=0){const d=r.ownerDocument,m=d.body,p=getComputedStyle(m),f=d.compatMode==="CSS1Compat"&&parseFloat(p.marginLeft)+parseFloat(p.marginRight)||0,h=Math.abs(r.clientWidth-m.clientWidth-f);h<=yt&&(a-=h)}else c<=yt&&(a+=c);return{width:a,height:i,x:s,y:l}}function rs(e,n){const t=me(e,!0,n==="fixed"),r=t.top+e.clientTop,o=t.left+e.clientLeft,a=oe(e)?ge(e):q(1),i=e.clientWidth*a.x,s=e.clientHeight*a.y,l=o*a.x,c=r*a.y;return{width:i,height:s,x:l,y:c}}function vt(e,n,t){let r;if(n==="viewport")r=ts(e,t);else if(n==="document")r=ns(Z(e));else if(z(n))r=rs(n,t);else{const o=sr(e);r={x:n.x-o.x,y:n.y-o.y,width:n.width,height:n.height}}return Ye(r)}function cr(e,n){const t=se(e);return t===n||!z(t)||xe(t)?!1:V(t).position==="fixed"||cr(t,n)}function os(e,n){const t=n.get(e);if(t)return t;let r=Me(e,[],!1).filter(s=>z(s)&&Ce(s)!=="body"),o=null;const a=V(e).position==="fixed";let i=a?se(e):e;for(;z(i)&&!xe(i);){const s=V(i),l=$n(i);!l&&s.position==="fixed"&&(o=null),(a?!l&&!o:!l&&s.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||Ie(i)&&!l&&cr(e,i))?r=r.filter(d=>d!==i):o=s,i=se(i)}return n.set(e,r),r}function as(e){let{element:n,boundary:t,rootBoundary:r,strategy:o}=e;const i=[...t==="clippingAncestors"?en(n)?[]:os(n,this._c):[].concat(t),r],s=vt(n,i[0],o);let l=s.top,c=s.right,d=s.bottom,m=s.left;for(let p=1;p<i.length;p++){const f=vt(n,i[p],o);l=B(f.top,l),c=ie(f.right,c),d=ie(f.bottom,d),m=B(f.left,m)}return{width:c-m,height:d-l,x:m,y:l}}function is(e){const{width:n,height:t}=ir(e);return{width:n,height:t}}function ss(e,n,t){const r=oe(n),o=Z(n),a=t==="fixed",i=me(e,!0,a,n);let s={scrollLeft:0,scrollTop:0};const l=q(0);function c(){l.x=tn(o)}if(r||!r&&!a)if((Ce(n)!=="body"||Ie(o))&&(s=nn(n)),r){const f=me(n,!0,a,n);l.x=f.x+n.clientLeft,l.y=f.y+n.clientTop}else o&&c();a&&!r&&o&&c();const d=o&&!r&&!a?lr(o,s):q(0),m=i.left+s.scrollLeft-l.x-d.x,p=i.top+s.scrollTop-l.y-d.y;return{x:m,y:p,width:i.width,height:i.height}}function dn(e){return V(e).position==="static"}function wt(e,n){if(!oe(e)||V(e).position==="fixed")return null;if(n)return n(e);let t=e.offsetParent;return Z(e)===t&&(t=t.ownerDocument.body),t}function ur(e,n){const t=_(e);if(en(e))return t;if(!oe(e)){let o=se(e);for(;o&&!xe(o);){if(z(o)&&!dn(o))return o;o=se(o)}return t}let r=wt(e,n);for(;r&&Xi(r)&&dn(r);)r=wt(r,n);return r&&xe(r)&&dn(r)&&!$n(r)?t:r||qi(e)||t}const ls=async function(e){const n=this.getOffsetParent||ur,t=this.getDimensions,r=await t(e.floating);return{reference:ss(e.reference,await n(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function cs(e){return V(e).direction==="rtl"}const us={convertOffsetParentRelativeRectToViewportRelativeRect:Ki,getDocumentElement:Z,getClippingRect:as,getOffsetParent:ur,getElementRects:ls,getClientRects:es,getDimensions:is,getScale:ge,isElement:z,isRTL:cs};function dr(e,n){return e.x===n.x&&e.y===n.y&&e.width===n.width&&e.height===n.height}function ds(e,n){let t=null,r;const o=Z(e);function a(){var s;clearTimeout(r),(s=t)==null||s.disconnect(),t=null}function i(s,l){s===void 0&&(s=!1),l===void 0&&(l=1),a();const c=e.getBoundingClientRect(),{left:d,top:m,width:p,height:f}=c;if(s||n(),!p||!f)return;const h=Fe(m),g=Fe(o.clientWidth-(d+p)),b=Fe(o.clientHeight-(m+f)),x=Fe(d),w={rootMargin:-h+"px "+-g+"px "+-b+"px "+-x+"px",threshold:B(0,ie(1,l))||1};let E=!0;function C(R){const S=R[0].intersectionRatio;if(S!==l){if(!E)return i();S?i(!1,S):r=setTimeout(()=>{i(!1,1e-7)},1e3)}S===1&&!dr(c,e.getBoundingClientRect())&&i(),E=!1}try{t=new IntersectionObserver(C,{...w,root:o.ownerDocument})}catch{t=new IntersectionObserver(C,w)}t.observe(e)}return i(!0),a}function ms(e,n,t,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,c=Bn(e),d=o||a?[...c?Me(c):[],...n?Me(n):[]]:[];d.forEach(x=>{o&&x.addEventListener("scroll",t,{passive:!0}),a&&x.addEventListener("resize",t)});const m=c&&s?ds(c,t):null;let p=-1,f=null;i&&(f=new ResizeObserver(x=>{let[v]=x;v&&v.target===c&&f&&n&&(f.unobserve(n),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var w;(w=f)==null||w.observe(n)})),t()}),c&&!l&&f.observe(c),n&&f.observe(n));let h,g=l?me(e):null;l&&b();function b(){const x=me(e);g&&!dr(g,x)&&t(),g=x,h=requestAnimationFrame(b)}return t(),()=>{var x;d.forEach(v=>{o&&v.removeEventListener("scroll",t),a&&v.removeEventListener("resize",t)}),m==null||m(),(x=f)==null||x.disconnect(),f=null,l&&cancelAnimationFrame(h)}}const ps=Wi,fs=zi,hs=Bi,gs=Yi,xs=_i,Et=Hi,bs=Vi,ys=(e,n,t)=>{const r=new Map,o={platform:us,...t},a={...o.platform,_c:r};return $i(e,n,{...o,platform:a})};var vs=typeof document<"u",ws=function(){},Ue=vs?u.useLayoutEffect:ws;function Xe(e,n){if(e===n)return!0;if(typeof e!=typeof n)return!1;if(typeof e=="function"&&e.toString()===n.toString())return!0;let t,r,o;if(e&&n&&typeof e=="object"){if(Array.isArray(e)){if(t=e.length,t!==n.length)return!1;for(r=t;r--!==0;)if(!Xe(e[r],n[r]))return!1;return!0}if(o=Object.keys(e),t=o.length,t!==Object.keys(n).length)return!1;for(r=t;r--!==0;)if(!{}.hasOwnProperty.call(n,o[r]))return!1;for(r=t;r--!==0;){const a=o[r];if(!(a==="_owner"&&e.$$typeof)&&!Xe(e[a],n[a]))return!1}return!0}return e!==e&&n!==n}function mr(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Ct(e,n){const t=mr(e);return Math.round(n*t)/t}function mn(e){const n=u.useRef(e);return Ue(()=>{n.current=e}),n}function Es(e){e===void 0&&(e={});const{placement:n="bottom",strategy:t="absolute",middleware:r=[],platform:o,elements:{reference:a,floating:i}={},transform:s=!0,whileElementsMounted:l,open:c}=e,[d,m]=u.useState({x:0,y:0,strategy:t,placement:n,middlewareData:{},isPositioned:!1}),[p,f]=u.useState(r);Xe(p,r)||f(r);const[h,g]=u.useState(null),[b,x]=u.useState(null),v=u.useCallback(k=>{k!==R.current&&(R.current=k,g(k))},[]),w=u.useCallback(k=>{k!==S.current&&(S.current=k,x(k))},[]),E=a||h,C=i||b,R=u.useRef(null),S=u.useRef(null),M=u.useRef(d),A=l!=null,P=mn(l),F=mn(o),$=mn(c),N=u.useCallback(()=>{if(!R.current||!S.current)return;const k={placement:n,strategy:t,middleware:p};F.current&&(k.platform=F.current),ys(R.current,S.current,k).then(H=>{const X={...H,isPositioned:$.current!==!1};T.current&&!Xe(M.current,X)&&(M.current=X,St.flushSync(()=>{m(X)}))})},[p,n,t,F,$]);Ue(()=>{c===!1&&M.current.isPositioned&&(M.current.isPositioned=!1,m(k=>({...k,isPositioned:!1})))},[c]);const T=u.useRef(!1);Ue(()=>(T.current=!0,()=>{T.current=!1}),[]),Ue(()=>{if(E&&(R.current=E),C&&(S.current=C),E&&C){if(P.current)return P.current(E,C,N);N()}},[E,C,N,P,A]);const O=u.useMemo(()=>({reference:R,floating:S,setReference:v,setFloating:w}),[v,w]),j=u.useMemo(()=>({reference:E,floating:C}),[E,C]),D=u.useMemo(()=>{const k={position:t,left:0,top:0};if(!j.floating)return k;const H=Ct(j.floating,d.x),X=Ct(j.floating,d.y);return s?{...k,transform:"translate("+H+"px, "+X+"px)",...mr(j.floating)>=1.5&&{willChange:"transform"}}:{position:t,left:H,top:X}},[t,s,j.floating,d.x,d.y]);return u.useMemo(()=>({...d,update:N,refs:O,elements:j,floatingStyles:D}),[d,N,O,j,D])}const Cs=e=>{function n(t){return{}.hasOwnProperty.call(t,"current")}return{name:"arrow",options:e,fn(t){const{element:r,padding:o}=typeof e=="function"?e(t):e;return r&&n(r)?r.current!=null?Et({element:r.current,padding:o}).fn(t):{}:r?Et({element:r,padding:o}).fn(t):{}}}},Ss=(e,n)=>{const t=ps(e);return{name:t.name,fn:t.fn,options:[e,n]}},Rs=(e,n)=>{const t=fs(e);return{name:t.name,fn:t.fn,options:[e,n]}},ks=(e,n)=>({fn:bs(e).fn,options:[e,n]}),Ms=(e,n)=>{const t=hs(e);return{name:t.name,fn:t.fn,options:[e,n]}},Ls=(e,n)=>{const t=gs(e);return{name:t.name,fn:t.fn,options:[e,n]}},Ps=(e,n)=>{const t=xs(e);return{name:t.name,fn:t.fn,options:[e,n]}},Ts=(e,n)=>{const t=Cs(e);return{name:t.name,fn:t.fn,options:[e,n]}};var Is="Arrow",pr=u.forwardRef((e,n)=>{const{children:t,width:r=10,height:o=5,...a}=e;return y.jsx(le.svg,{...a,ref:n,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?t:y.jsx("polygon",{points:"0,0 30,0 15,10"})})});pr.displayName=Is;var As=pr;function Ns(e){const[n,t]=u.useState(void 0);return ae(()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const a=o[0];let i,s;if("borderBoxSize"in a){const l=a.borderBoxSize,c=Array.isArray(l)?l[0]:l;i=c.inlineSize,s=c.blockSize}else i=e.offsetWidth,s=e.offsetHeight;t({width:i,height:s})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else t(void 0)},[e]),n}var _n="Popper",[fr,hr]=Zt(_n),[Os,gr]=fr(_n),xr=e=>{const{__scopePopper:n,children:t}=e,[r,o]=u.useState(null);return y.jsx(Os,{scope:n,anchor:r,onAnchorChange:o,children:t})};xr.displayName=_n;var br="PopperAnchor",yr=u.forwardRef((e,n)=>{const{__scopePopper:t,virtualRef:r,...o}=e,a=gr(br,t),i=u.useRef(null),s=pe(n,i),l=u.useRef(null);return u.useEffect(()=>{const c=l.current;l.current=(r==null?void 0:r.current)||i.current,c!==l.current&&a.onAnchorChange(l.current)}),r?null:y.jsx(le.div,{...o,ref:s})});yr.displayName=br;var Un="PopperContent",[js,Ds]=fr(Un),vr=u.forwardRef((e,n)=>{var Yn,Xn,Gn,Jn,qn,Zn;const{__scopePopper:t,side:r="bottom",sideOffset:o=0,align:a="center",alignOffset:i=0,arrowPadding:s=0,avoidCollisions:l=!0,collisionBoundary:c=[],collisionPadding:d=0,sticky:m="partial",hideWhenDetached:p=!1,updatePositionStrategy:f="optimized",onPlaced:h,...g}=e,b=gr(Un,t),[x,v]=u.useState(null),w=pe(n,Se=>v(Se)),[E,C]=u.useState(null),R=Ns(E),S=(R==null?void 0:R.width)??0,M=(R==null?void 0:R.height)??0,A=r+(a!=="center"?"-"+a:""),P=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},F=Array.isArray(c)?c:[c],$=F.length>0,N={padding:P,boundary:F.filter($s),altBoundary:$},{refs:T,floatingStyles:O,placement:j,isPositioned:D,middlewareData:k}=Es({strategy:"fixed",placement:A,whileElementsMounted:(...Se)=>ms(...Se,{animationFrame:f==="always"}),elements:{reference:b.anchor},middleware:[Ss({mainAxis:o+M,alignmentAxis:i}),l&&Rs({mainAxis:!0,crossAxis:!1,limiter:m==="partial"?ks():void 0,...N}),l&&Ms({...N}),Ls({...N,apply:({elements:Se,rects:Qn,availableWidth:Wr,availableHeight:zr})=>{const{width:Vr,height:Yr}=Qn.reference,Oe=Se.floating.style;Oe.setProperty("--radix-popper-available-width",`${Wr}px`),Oe.setProperty("--radix-popper-available-height",`${zr}px`),Oe.setProperty("--radix-popper-anchor-width",`${Vr}px`),Oe.setProperty("--radix-popper-anchor-height",`${Yr}px`)}}),E&&Ts({element:E,padding:s}),Hs({arrowWidth:S,arrowHeight:M}),p&&Ps({strategy:"referenceHidden",...N})]}),[H,X]=Cr(j),Ne=Qe(h);ae(()=>{D&&(Ne==null||Ne())},[D,Ne]);const $r=(Yn=k.arrow)==null?void 0:Yn.x,Hr=(Xn=k.arrow)==null?void 0:Xn.y,Br=((Gn=k.arrow)==null?void 0:Gn.centerOffset)!==0,[_r,Ur]=u.useState();return ae(()=>{x&&Ur(window.getComputedStyle(x).zIndex)},[x]),y.jsx("div",{ref:T.setFloating,"data-radix-popper-content-wrapper":"",style:{...O,transform:D?O.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:_r,"--radix-popper-transform-origin":[(Jn=k.transformOrigin)==null?void 0:Jn.x,(qn=k.transformOrigin)==null?void 0:qn.y].join(" "),...((Zn=k.hide)==null?void 0:Zn.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:y.jsx(js,{scope:t,placedSide:H,onArrowChange:C,arrowX:$r,arrowY:Hr,shouldHideArrow:Br,children:y.jsx(le.div,{"data-side":H,"data-align":X,...g,ref:w,style:{...g.style,animation:D?void 0:"none"}})})})});vr.displayName=Un;var wr="PopperArrow",Fs={top:"bottom",right:"left",bottom:"top",left:"right"},Er=u.forwardRef(function(n,t){const{__scopePopper:r,...o}=n,a=Ds(wr,r),i=Fs[a.placedSide];return y.jsx("span",{ref:a.onArrowChange,style:{position:"absolute",left:a.arrowX,top:a.arrowY,[i]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[a.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[a.placedSide],visibility:a.shouldHideArrow?"hidden":void 0},children:y.jsx(As,{...o,ref:t,style:{...o.style,display:"block"}})})});Er.displayName=wr;function $s(e){return e!==null}var Hs=e=>({name:"transformOrigin",options:e,fn(n){var b,x,v;const{placement:t,rects:r,middlewareData:o}=n,i=((b=o.arrow)==null?void 0:b.centerOffset)!==0,s=i?0:e.arrowWidth,l=i?0:e.arrowHeight,[c,d]=Cr(t),m={start:"0%",center:"50%",end:"100%"}[d],p=(((x=o.arrow)==null?void 0:x.x)??0)+s/2,f=(((v=o.arrow)==null?void 0:v.y)??0)+l/2;let h="",g="";return c==="bottom"?(h=i?m:`${p}px`,g=`${-l}px`):c==="top"?(h=i?m:`${p}px`,g=`${r.floating.height+l}px`):c==="right"?(h=`${-l}px`,g=i?m:`${f}px`):c==="left"&&(h=`${r.floating.width+l}px`,g=i?m:`${f}px`),{data:{x:h,y:g}}}});function Cr(e){const[n,t="center"]=e.split("-");return[n,t]}var Bs=xr,_s=yr,Us=vr,Ws=Er,zs="Portal",Sr=u.forwardRef((e,n)=>{var s;const{container:t,...r}=e,[o,a]=u.useState(!1);ae(()=>a(!0),[]);const i=t||o&&((s=globalThis==null?void 0:globalThis.document)==null?void 0:s.body);return i?Xr.createPortal(y.jsx(le.div,{...r,ref:n}),i):null});Sr.displayName=zs;function Vs(e,n){return u.useReducer((t,r)=>n[t][r]??t,e)}var Wn=e=>{const{present:n,children:t}=e,r=Ys(n),o=typeof t=="function"?t({present:r.isPresent}):u.Children.only(t),a=pe(r.ref,Xs(o));return typeof t=="function"||r.isPresent?u.cloneElement(o,{ref:a}):null};Wn.displayName="Presence";function Ys(e){const[n,t]=u.useState(),r=u.useRef(null),o=u.useRef(e),a=u.useRef("none"),i=e?"mounted":"unmounted",[s,l]=Vs(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return u.useEffect(()=>{const c=$e(r.current);a.current=s==="mounted"?c:"none"},[s]),ae(()=>{const c=r.current,d=o.current;if(d!==e){const p=a.current,f=$e(c);e?l("MOUNT"):f==="none"||(c==null?void 0:c.display)==="none"?l("UNMOUNT"):l(d&&p!==f?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,l]),ae(()=>{if(n){let c;const d=n.ownerDocument.defaultView??window,m=f=>{const g=$e(r.current).includes(CSS.escape(f.animationName));if(f.target===n&&g&&(l("ANIMATION_END"),!o.current)){const b=n.style.animationFillMode;n.style.animationFillMode="forwards",c=d.setTimeout(()=>{n.style.animationFillMode==="forwards"&&(n.style.animationFillMode=b)})}},p=f=>{f.target===n&&(a.current=$e(r.current))};return n.addEventListener("animationstart",p),n.addEventListener("animationcancel",m),n.addEventListener("animationend",m),()=>{d.clearTimeout(c),n.removeEventListener("animationstart",p),n.removeEventListener("animationcancel",m),n.removeEventListener("animationend",m)}}else l("ANIMATION_END")},[n,l]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:u.useCallback(c=>{r.current=c?getComputedStyle(c):null,t(c)},[])}}function $e(e){return(e==null?void 0:e.animationName)||"none"}function Xs(e){var r,o;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var Gs=Rt[" useInsertionEffect ".trim().toString()]||ae;function Js({prop:e,defaultProp:n,onChange:t=()=>{},caller:r}){const[o,a,i]=qs({defaultProp:n,onChange:t}),s=e!==void 0,l=s?e:o;{const d=u.useRef(e!==void 0);u.useEffect(()=>{const m=d.current;m!==s&&console.warn(`${r} is changing from ${m?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=s},[s,r])}const c=u.useCallback(d=>{var m;if(s){const p=Zs(d)?d(e):d;p!==e&&((m=i.current)==null||m.call(i,p))}else a(d)},[s,e,a,i]);return[l,c]}function qs({defaultProp:e,onChange:n}){const[t,r]=u.useState(e),o=u.useRef(t),a=u.useRef(n);return Gs(()=>{a.current=n},[n]),u.useEffect(()=>{var i;o.current!==t&&((i=a.current)==null||i.call(a,t),o.current=t)},[t,o]),[t,r,a]}function Zs(e){return typeof e=="function"}var Qs=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),Ks="VisuallyHidden",Rr=u.forwardRef((e,n)=>y.jsx(le.span,{...e,ref:n,style:{...Qs,...e.style}}));Rr.displayName=Ks;var el=Rr,[rn]=Zt("Tooltip",[hr]),on=hr(),kr="TooltipProvider",nl=700,wn="tooltip.open",[tl,zn]=rn(kr),Mr=e=>{const{__scopeTooltip:n,delayDuration:t=nl,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:a}=e,i=u.useRef(!0),s=u.useRef(!1),l=u.useRef(0);return u.useEffect(()=>{const c=l.current;return()=>window.clearTimeout(c)},[]),y.jsx(tl,{scope:n,isOpenDelayedRef:i,delayDuration:t,onOpen:u.useCallback(()=>{window.clearTimeout(l.current),i.current=!1},[]),onClose:u.useCallback(()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>i.current=!0,r)},[r]),isPointerInTransitRef:s,onPointerInTransitChange:u.useCallback(c=>{s.current=c},[]),disableHoverableContent:o,children:a})};Mr.displayName=kr;var Le="Tooltip",[rl,Ae]=rn(Le),Lr=e=>{const{__scopeTooltip:n,children:t,open:r,defaultOpen:o,onOpenChange:a,disableHoverableContent:i,delayDuration:s}=e,l=zn(Le,e.__scopeTooltip),c=on(n),[d,m]=u.useState(null),p=ki(),f=u.useRef(0),h=i??l.disableHoverableContent,g=s??l.delayDuration,b=u.useRef(!1),[x,v]=Js({prop:r,defaultProp:o??!1,onChange:S=>{S?(l.onOpen(),document.dispatchEvent(new CustomEvent(wn))):l.onClose(),a==null||a(S)},caller:Le}),w=u.useMemo(()=>x?b.current?"delayed-open":"instant-open":"closed",[x]),E=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,b.current=!1,v(!0)},[v]),C=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,v(!1)},[v]),R=u.useCallback(()=>{window.clearTimeout(f.current),f.current=window.setTimeout(()=>{b.current=!0,v(!0),f.current=0},g)},[g,v]);return u.useEffect(()=>()=>{f.current&&(window.clearTimeout(f.current),f.current=0)},[]),y.jsx(Bs,{...c,children:y.jsx(rl,{scope:n,contentId:p,open:x,stateAttribute:w,trigger:d,onTriggerChange:m,onTriggerEnter:u.useCallback(()=>{l.isOpenDelayedRef.current?R():E()},[l.isOpenDelayedRef,R,E]),onTriggerLeave:u.useCallback(()=>{h?C():(window.clearTimeout(f.current),f.current=0)},[C,h]),onOpen:E,onClose:C,disableHoverableContent:h,children:t})})};Lr.displayName=Le;var En="TooltipTrigger",Pr=u.forwardRef((e,n)=>{const{__scopeTooltip:t,...r}=e,o=Ae(En,t),a=zn(En,t),i=on(t),s=u.useRef(null),l=pe(n,s,o.onTriggerChange),c=u.useRef(!1),d=u.useRef(!1),m=u.useCallback(()=>c.current=!1,[]);return u.useEffect(()=>()=>document.removeEventListener("pointerup",m),[m]),y.jsx(_s,{asChild:!0,...i,children:y.jsx(le.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:l,onPointerMove:K(e.onPointerMove,p=>{p.pointerType!=="touch"&&!d.current&&!a.isPointerInTransitRef.current&&(o.onTriggerEnter(),d.current=!0)}),onPointerLeave:K(e.onPointerLeave,()=>{o.onTriggerLeave(),d.current=!1}),onPointerDown:K(e.onPointerDown,()=>{o.open&&o.onClose(),c.current=!0,document.addEventListener("pointerup",m,{once:!0})}),onFocus:K(e.onFocus,()=>{c.current||o.onOpen()}),onBlur:K(e.onBlur,o.onClose),onClick:K(e.onClick,o.onClose)})})});Pr.displayName=En;var Vn="TooltipPortal",[ol,al]=rn(Vn,{forceMount:void 0}),Tr=e=>{const{__scopeTooltip:n,forceMount:t,children:r,container:o}=e,a=Ae(Vn,n);return y.jsx(ol,{scope:n,forceMount:t,children:y.jsx(Wn,{present:t||a.open,children:y.jsx(Sr,{asChild:!0,container:o,children:r})})})};Tr.displayName=Vn;var be="TooltipContent",Ir=u.forwardRef((e,n)=>{const t=al(be,e.__scopeTooltip),{forceMount:r=t.forceMount,side:o="top",...a}=e,i=Ae(be,e.__scopeTooltip);return y.jsx(Wn,{present:r||i.open,children:i.disableHoverableContent?y.jsx(Ar,{side:o,...a,ref:n}):y.jsx(il,{side:o,...a,ref:n})})}),il=u.forwardRef((e,n)=>{const t=Ae(be,e.__scopeTooltip),r=zn(be,e.__scopeTooltip),o=u.useRef(null),a=pe(n,o),[i,s]=u.useState(null),{trigger:l,onClose:c}=t,d=o.current,{onPointerInTransitChange:m}=r,p=u.useCallback(()=>{s(null),m(!1)},[m]),f=u.useCallback((h,g)=>{const b=h.currentTarget,x={x:h.clientX,y:h.clientY},v=ul(x,b.getBoundingClientRect()),w=dl(x,v),E=ml(g.getBoundingClientRect()),C=fl([...w,...E]);s(C),m(!0)},[m]);return u.useEffect(()=>()=>p(),[p]),u.useEffect(()=>{if(l&&d){const h=b=>f(b,d),g=b=>f(b,l);return l.addEventListener("pointerleave",h),d.addEventListener("pointerleave",g),()=>{l.removeEventListener("pointerleave",h),d.removeEventListener("pointerleave",g)}}},[l,d,f,p]),u.useEffect(()=>{if(i){const h=g=>{const b=g.target,x={x:g.clientX,y:g.clientY},v=(l==null?void 0:l.contains(b))||(d==null?void 0:d.contains(b)),w=!pl(x,i);v?p():w&&(p(),c())};return document.addEventListener("pointermove",h),()=>document.removeEventListener("pointermove",h)}},[l,d,i,c,p]),y.jsx(Ar,{...e,ref:a})}),[sl,ll]=rn(Le,{isInside:!1}),cl=ui("TooltipContent"),Ar=u.forwardRef((e,n)=>{const{__scopeTooltip:t,children:r,"aria-label":o,onEscapeKeyDown:a,onPointerDownOutside:i,...s}=e,l=Ae(be,t),c=on(t),{onClose:d}=l;return u.useEffect(()=>(document.addEventListener(wn,d),()=>document.removeEventListener(wn,d)),[d]),u.useEffect(()=>{if(l.trigger){const m=p=>{const f=p.target;f!=null&&f.contains(l.trigger)&&d()};return window.addEventListener("scroll",m,{capture:!0}),()=>window.removeEventListener("scroll",m,{capture:!0})}},[l.trigger,d]),y.jsx(er,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:a,onPointerDownOutside:i,onFocusOutside:m=>m.preventDefault(),onDismiss:d,children:y.jsxs(Us,{"data-state":l.stateAttribute,...c,...s,ref:n,style:{...s.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[y.jsx(cl,{children:r}),y.jsx(sl,{scope:t,isInside:!0,children:y.jsx(el,{id:l.contentId,role:"tooltip",children:o||r})})]})})});Ir.displayName=be;var Nr="TooltipArrow",Or=u.forwardRef((e,n)=>{const{__scopeTooltip:t,...r}=e,o=on(t);return ll(Nr,t).isInside?null:y.jsx(Ws,{...o,...r,ref:n})});Or.displayName=Nr;function ul(e,n){const t=Math.abs(n.top-e.y),r=Math.abs(n.bottom-e.y),o=Math.abs(n.right-e.x),a=Math.abs(n.left-e.x);switch(Math.min(t,r,o,a)){case a:return"left";case o:return"right";case t:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function dl(e,n,t=5){const r=[];switch(n){case"top":r.push({x:e.x-t,y:e.y+t},{x:e.x+t,y:e.y+t});break;case"bottom":r.push({x:e.x-t,y:e.y-t},{x:e.x+t,y:e.y-t});break;case"left":r.push({x:e.x+t,y:e.y-t},{x:e.x+t,y:e.y+t});break;case"right":r.push({x:e.x-t,y:e.y-t},{x:e.x-t,y:e.y+t});break}return r}function ml(e){const{top:n,right:t,bottom:r,left:o}=e;return[{x:o,y:n},{x:t,y:n},{x:t,y:r},{x:o,y:r}]}function pl(e,n){const{x:t,y:r}=e;let o=!1;for(let a=0,i=n.length-1;a<n.length;i=a++){const s=n[a],l=n[i],c=s.x,d=s.y,m=l.x,p=l.y;d>r!=p>r&&t<(m-c)*(r-d)/(p-d)+c&&(o=!o)}return o}function fl(e){const n=e.slice();return n.sort((t,r)=>t.x<r.x?-1:t.x>r.x?1:t.y<r.y?-1:t.y>r.y?1:0),hl(n)}function hl(e){if(e.length<=1)return e.slice();const n=[];for(let r=0;r<e.length;r++){const o=e[r];for(;n.length>=2;){const a=n[n.length-1],i=n[n.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))n.pop();else break}n.push(o)}n.pop();const t=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;t.length>=2;){const a=t[t.length-1],i=t[t.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))t.pop();else break}t.push(o)}return t.pop(),n.length===1&&t.length===1&&n[0].x===t[0].x&&n[0].y===t[0].y?n:n.concat(t)}var gl=Mr,xl=Lr,bl=Pr,yl=Tr,vl=Ir,wl=Or;const El=({children:e})=>y.jsx(gl,{delayDuration:200,children:e}),jr=({content:e,children:n})=>y.jsxs(xl,{children:[y.jsx(bl,{asChild:!0,children:n}),y.jsx(yl,{children:y.jsxs(vl,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,y.jsx(wl,{className:"fill-secondary",width:8,height:4})]})})]}),Cl=({files:e,title:n="Joymap Example",className:t="",...r})=>{const o=()=>{ii.openProject({title:n,template:"node",files:e},{newWindow:!0})};return y.jsx(jr,{content:"Edit example on stackblitz",children:y.jsx("button",{type:"button",onClick:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${t}`,...r,children:y.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:y.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})},Sl="2.2.4",Rl={lodash:"^4.17.21"},kl={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",phaser:"^3.85.0",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},Q={version:Sl,dependencies:Rl,devDependencies:kl},{devDependencies:de,version:Ml}=Q,Ll=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/examples\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L2.png'"],[new RegExp("logoUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/logo.png'"]];function L(e){return Ll.reduce((n,[t,r])=>n.replaceAll(t,r),e)}const fe=JSON.stringify({compilerOptions:{target:"ESNext",module:"ESNext",moduleResolution:"node",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}}),Dr=`
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
  })
`;function he({dependencies:e={},hasLodash:n=!0,hasReact:t=!1}={}){return JSON.stringify({main:"./index.ts",scripts:{start:"vite",build:"tsc -b && vite build"},dependencies:{joymap:Q.version,typescript:"~5.9.3",vite:"^8.0.0",...n?{lodash:Q.dependencies.lodash,"@types/lodash":Q.devDependencies["@types/lodash"]}:{},...t?{react:Q.devDependencies.react,"react-dom":Q.devDependencies["react-dom"],"@types/react":Q.devDependencies["@types/react"],"@types/react-dom":Q.devDependencies["@types/react-dom"],"@vitejs/plugin-react":"^6.0.1"}:{},...e}})}const Pl=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
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
`,Tl=`import { LoremIpsum } from 'lorem-ipsum';\r
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
`,Il=`body {
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

`,Al=`import React, { useEffect, useState } from 'react';\r
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
`,Nl=`<!doctype html>\r
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
`,Ol=`import './Editor';\r
`,jl={"Editor.tsx":L(Al),"commands.ts":L(Tl),"custom.css":L(Il),"index.ts":L(Ol),"index.html":Nl,"ckHelpers.ts":L(Pl),"package.json":he({hasLodash:!1,hasReact:!0,dependencies:{"@ckeditor/ckeditor5-react":de["@ckeditor/ckeditor5-react"],ckeditor5:de.ckeditor5,"lorem-ipsum":de["lorem-ipsum"]}}),"tsconfig.json":fe,"vite.config.ts":Dr},Dl=`body {\r
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
`,Fl=`<!doctype html>\r
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
`,$l=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,Hl={"index.ts":L($l),"Fighting.css":Dl,"index.html":Fl,"package.json":he({hasLodash:!0,hasReact:!1}),"tsconfig.json":fe},Bl=`<!doctype html>\r
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
`,_l=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,Ul=`.main-container {\r
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
`,Wl=`import { InputResult, Mapper } from 'joymap';\r
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
`,zl={"index.ts":L(_l),"utils.ts":L(Wl),"Log.css":Ul,"index.html":Bl,"package.json":he({hasLodash:!0,hasReact:!1}),"tsconfig.json":fe},Vl=`import { PIXEL_ART_SIZE } from './pixelArt';\r
\r
export let currentColumns = PIXEL_ART_SIZE;\r
export let currentRows = PIXEL_ART_SIZE;\r
\r
export function setCanvasDimensions(columns: number, rows: number) {\r
  currentColumns = columns;\r
  currentRows = rows;\r
}\r
\r
export function renderCheckboxesToCanvas(canvas: HTMLCanvasElement, pixelSize: number = 2) {\r
  const ctx = canvas.getContext('2d');\r
  if (!ctx) return;\r
\r
  const onColor = (document.getElementById('color-on') as HTMLInputElement)?.value || '#5700fa';\r
  const offColor = (document.getElementById('color-off') as HTMLInputElement)?.value || '#ffffff';\r
\r
  canvas.width = currentColumns * pixelSize;\r
  canvas.height = currentRows * pixelSize;\r
  canvas.style.width = \`\${canvas.width}px\`;\r
  canvas.style.height = \`\${canvas.height}px\`;\r
\r
  const checkboxes = document.querySelectorAll<HTMLInputElement>('.pixel');\r
\r
  checkboxes.forEach((checkbox) => {\r
    const index = parseInt(checkbox.dataset.index || '0');\r
    const x = index % currentColumns;\r
    const y = Math.floor(index / currentColumns);\r
\r
    ctx.fillStyle = checkbox.checked ? onColor : offColor;\r
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);\r
  });\r
}\r
\r
export function attachCanvasUpdater(canvas: HTMLCanvasElement) {\r
  const update = () => renderCheckboxesToCanvas(canvas);\r
\r
  document.querySelectorAll<HTMLInputElement>('.pixel').forEach((cb) => {\r
    cb.removeEventListener('change', update);\r
    cb.addEventListener('change', update);\r
  });\r
\r
  update();\r
}\r
`,Yl=`export type ColorEditorState = {\r
  element: HTMLInputElement | null;\r
  originalValue: string;\r
  mode: 'view' | 'edit';\r
};\r
\r
export const colorEditor: ColorEditorState = { element: null, originalValue: '', mode: 'view' };\r
\r
let currentHSL = { h: 0, s: 0, l: 0 };\r
\r
function hslToHex(h: number, s: number, l: number): string {\r
  s /= 100;\r
  l /= 100;\r
\r
  const c = (1 - Math.abs(2 * l - 1)) * s;\r
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));\r
  const m = l - c / 2;\r
\r
  let r = 0,\r
    g = 0,\r
    b = 0;\r
\r
  if (h < 60) {\r
    r = c;\r
    g = x;\r
    b = 0;\r
  } else if (h < 120) {\r
    r = x;\r
    g = c;\r
    b = 0;\r
  } else if (h < 180) {\r
    r = 0;\r
    g = c;\r
    b = x;\r
  } else if (h < 240) {\r
    r = 0;\r
    g = x;\r
    b = c;\r
  } else if (h < 300) {\r
    r = x;\r
    g = 0;\r
    b = c;\r
  } else {\r
    r = c;\r
    g = 0;\r
    b = x;\r
  }\r
\r
  r = Math.round((r + m) * 255);\r
  g = Math.round((g + m) * 255);\r
  b = Math.round((b + m) * 255);\r
\r
  return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;\r
}\r
\r
function hexToHsl(hex: string): [number, number, number] {\r
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  if (!result) return [0, 100, 50];\r
\r
  let r = parseInt(result[1], 16) / 255;\r
  let g = parseInt(result[2], 16) / 255;\r
  let b = parseInt(result[3], 16) / 255;\r
\r
  const max = Math.max(r, g, b);\r
  const min = Math.min(r, g, b);\r
  let h = 0;\r
  let s = 0;\r
  const l = (max + min) / 2;\r
\r
  if (max !== min) {\r
    const d = max - min;\r
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);\r
    switch (max) {\r
      case r:\r
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;\r
        break;\r
      case g:\r
        h = ((b - r) / d + 2) / 6;\r
        break;\r
      case b:\r
        h = ((r - g) / d + 4) / 6;\r
        break;\r
    }\r
  }\r
\r
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];\r
}\r
\r
export function updateColorLabel() {\r
  let label = document.getElementById('color-label');\r
  if (!label) {\r
    label = document.createElement('span');\r
    label.id = 'color-label';\r
    label.className =\r
      'fixed rounded border border-purple-500 bg-gray-800 px-2 py-1 text-sm text-white';\r
    label.style.display = 'none';\r
    document.body.appendChild(label);\r
  }\r
\r
  if (colorEditor.element && colorEditor.mode === 'edit') {\r
    const { h, s, l } = currentHSL;\r
    label.textContent = \`H:\${h}° S:\${s}% L:\${l}%\`;\r
    label.style.display = 'block';\r
\r
    const rect = colorEditor.element.getBoundingClientRect();\r
    label.style.left = \`\${rect.right + 8}px\`;\r
    label.style.top = \`\${rect.top}px\`;\r
  } else {\r
    label.style.display = 'none';\r
  }\r
}\r
\r
export function toggleColorEditor(element: HTMLInputElement) {\r
  if (colorEditor.mode === 'edit') {\r
    colorEditor.mode = 'view';\r
    colorEditor.element = null;\r
  } else {\r
    colorEditor.mode = 'edit';\r
    colorEditor.element = element;\r
    colorEditor.originalValue = element.value;\r
    const [h, s, l] = hexToHsl(element.value);\r
    currentHSL = { h, s, l };\r
  }\r
  updateColorLabel();\r
}\r
\r
export function cancelColorEditor() {\r
  if (colorEditor.mode === 'edit' && colorEditor.element) {\r
    colorEditor.element.value = colorEditor.originalValue;\r
    const [h, s, l] = hexToHsl(colorEditor.originalValue);\r
    currentHSL = { h, s, l };\r
    colorEditor.mode = 'view';\r
    colorEditor.element = null;\r
    updateColorLabel();\r
  }\r
}\r
\r
export function handleColorDirection(\r
  element: HTMLInputElement,\r
  direction: 'up' | 'down' | 'left' | 'right',\r
) {\r
  const { h, s, l } = currentHSL;\r
\r
  let newH = h;\r
  let newL = l;\r
\r
  if (direction === 'up') {\r
    newH = (h + 1) % 360;\r
  } else if (direction === 'down') {\r
    newH = (h - 1 + 360) % 360;\r
  } else if (direction === 'right') {\r
    newL = Math.min(100, l + 1);\r
  } else if (direction === 'left') {\r
    newL = Math.max(0, l - 1);\r
  }\r
\r
  let effectiveS = s;\r
  if (newL <= 15 || newL >= 85) {\r
    effectiveS = 100;\r
  }\r
\r
  currentHSL = { h: newH, s: effectiveS, l: newL };\r
  element.value = hslToHex(newH, effectiveS, newL);\r
  element.dispatchEvent(new Event('input', { bubbles: true }));\r
  updateColorLabel();\r
}\r
\r
export function handleColorFocusOut(e: FocusEvent) {\r
  const target = e.target;\r
  if (target instanceof HTMLInputElement && target.type === 'color') {\r
    if (colorEditor.mode === 'edit') {\r
      colorEditor.mode = 'view';\r
      colorEditor.element = null;\r
      updateColorLabel();\r
    }\r
  }\r
}\r
\r
export function handleColorClick() {\r
  if (colorEditor.mode === 'edit') {\r
    colorEditor.mode = 'view';\r
    colorEditor.element = null;\r
    updateColorLabel();\r
  }\r
}\r
`,Xl=`export type DateEditorState = {\r
  element: HTMLInputElement | null;\r
  originalValue: string;\r
  mode: 'view' | 'edit';\r
};\r
\r
export const dateEditor: DateEditorState = { element: null, originalValue: '', mode: 'view' };\r
\r
export function toggleDateEditor(element: HTMLInputElement) {\r
  if (dateEditor.mode === 'edit') {\r
    dateEditor.mode = 'view';\r
    dateEditor.element = null;\r
  } else {\r
    dateEditor.mode = 'edit';\r
    dateEditor.element = element;\r
    dateEditor.originalValue = element.value;\r
  }\r
}\r
\r
export function cancelDateEditor() {\r
  if (dateEditor.mode === 'edit' && dateEditor.element) {\r
    dateEditor.element.value = dateEditor.originalValue;\r
    dateEditor.mode = 'view';\r
    dateEditor.element = null;\r
  }\r
}\r
\r
export function handleDateFocusOut(e: FocusEvent) {\r
  if (e.target instanceof HTMLInputElement && e.target.type === 'date') {\r
    if (dateEditor.mode === 'edit') {\r
      dateEditor.mode = 'view';\r
      dateEditor.element = null;\r
    }\r
  }\r
}\r
\r
function setDateValue(current: HTMLInputElement, date: Date) {\r
  const year = date.getFullYear();\r
  const month = String(date.getMonth() + 1).padStart(2, '0');\r
  const day = String(date.getDate()).padStart(2, '0');\r
  current.value = \`\${year}-\${month}-\${day}\`;\r
  current.dispatchEvent(new Event('input', { bubbles: true }));\r
}\r
\r
function parseDate(value: string): Date | null {\r
  if (!value) {\r
    const today = new Date();\r
    const year = today.getFullYear();\r
    const month = String(today.getMonth() + 1).padStart(2, '0');\r
    const day = String(today.getDate()).padStart(2, '0');\r
    value = \`\${year}-\${month}-\${day}\`;\r
  }\r
\r
  const [year, month, day] = value.split('-').map(Number);\r
  const date = new Date(year, month - 1, day);\r
  return isNaN(date.getTime()) ? null : date;\r
}\r
\r
export function adjustDateByDay(direction: 'up' | 'down') {\r
  if (!dateEditor.element || dateEditor.mode !== 'edit') return;\r
\r
  const date = parseDate(dateEditor.element.value);\r
  if (!date) return;\r
\r
  if (direction === 'up') {\r
    date.setDate(date.getDate() + 1);\r
  } else {\r
    date.setDate(date.getDate() - 1);\r
  }\r
\r
  setDateValue(dateEditor.element, date);\r
}\r
\r
export function adjustDateByMonth(direction: 'left' | 'right') {\r
  if (!dateEditor.element || dateEditor.mode !== 'edit') return;\r
\r
  const date = parseDate(dateEditor.element.value);\r
  if (!date) return;\r
\r
  if (direction === 'right') {\r
    date.setMonth(date.getMonth() + 1);\r
  } else {\r
    date.setMonth(date.getMonth() - 1);\r
  }\r
\r
  setDateValue(dateEditor.element, date);\r
}\r
`,Gl=`import { colorEditor, handleColorDirection } from './colorEditor';\r
import { adjustDateByDay, adjustDateByMonth, dateEditor } from './dateEditor';\r
import { numberEditor } from './numberEditor';\r
import { handleRangeDirection, rangeEditor } from './rangeEditor';\r
import { handleSelectDirection } from './selectEditor';\r
\r
export type Direction = 'right' | 'left' | 'down' | 'up';\r
\r
export function getFocusableElements() {\r
  return Array.from(\r
    document.querySelectorAll<HTMLElement>(\r
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',\r
    ),\r
  ).filter((el) => !el.hasAttribute('disabled'));\r
}\r
\r
export function getNextFocus(\r
  direction: Direction,\r
  focusables: HTMLElement[],\r
  current: HTMLElement,\r
) {\r
  const currPos = current.getBoundingClientRect();\r
  const currCenterX = currPos.x + currPos.width / 2;\r
  const currCenterY = currPos.y + currPos.height / 2;\r
\r
  const candidates: { el: HTMLElement; dx: number; dy: number; perp: number }[] = [];\r
\r
  for (const el of focusables) {\r
    if (el === current) continue;\r
    const elPos = el.getBoundingClientRect();\r
    const elCenterX = elPos.x + elPos.width / 2;\r
    const elCenterY = elPos.y + elPos.height / 2;\r
\r
    const dx = elCenterX - currCenterX;\r
    const dy = elCenterY - currCenterY;\r
\r
    if (direction === 'right' && dx <= 0) continue;\r
    if (direction === 'left' && dx >= 0) continue;\r
    if (direction === 'down' && dy <= 0) continue;\r
    if (direction === 'up' && dy >= 0) continue;\r
\r
    const overlaps =\r
      direction === 'right' || direction === 'left'\r
        ? elPos.top < currPos.bottom && elPos.bottom > currPos.top\r
        : elPos.left < currPos.right && elPos.right > currPos.left;\r
\r
    if (overlaps) {\r
      const perp = direction === 'right' || direction === 'left' ? Math.abs(dy) : Math.abs(dx);\r
      candidates.push({ el, dx, dy, perp });\r
    }\r
  }\r
\r
  if (candidates.length === 0) return null;\r
\r
  candidates.sort((a, b) => {\r
    const aAxis = direction === 'right' || direction === 'left' ? Math.abs(a.dx) : Math.abs(a.dy);\r
    const bAxis = direction === 'right' || direction === 'left' ? Math.abs(b.dx) : Math.abs(b.dy);\r
    if (aAxis !== bAxis) return aAxis - bAxis;\r
    return a.perp - b.perp;\r
  });\r
\r
  return candidates[0].el;\r
}\r
\r
export function moveFocus(direction: Direction) {\r
  const current = document.activeElement as HTMLElement;\r
\r
  const TEXT_INPUT_TYPES = ['text', 'password', 'search', 'url', 'tel', ''];\r
\r
  const isTextLikeInput = (el: Element): el is HTMLInputElement | HTMLTextAreaElement =>\r
    el instanceof HTMLTextAreaElement ||\r
    (el instanceof HTMLInputElement && TEXT_INPUT_TYPES.includes(el.type));\r
\r
  if (isTextLikeInput(current)) {\r
    const moved = moveCursor(current as HTMLInputElement | HTMLTextAreaElement, direction);\r
    if (moved === true) return;\r
    if (moved === null) return;\r
    const focusables = getFocusableElements();\r
    const next = getNextFocus(direction, focusables, current);\r
    next?.focus();\r
    return;\r
  }\r
\r
  if (\r
    current instanceof HTMLInputElement &&\r
    current.type === 'date' &&\r
    dateEditor.mode === 'edit'\r
  ) {\r
    if (direction === 'up' || direction === 'down') {\r
      adjustDateByDay(direction);\r
    } else {\r
      adjustDateByMonth(direction);\r
    }\r
    return;\r
  }\r
\r
  if (current instanceof HTMLSelectElement) {\r
    if (handleSelectDirection(current, direction)) {\r
      return;\r
    }\r
  }\r
\r
  if (\r
    current instanceof HTMLInputElement &&\r
    current.type === 'color' &&\r
    colorEditor.mode === 'edit'\r
  ) {\r
    handleColorDirection(current, direction);\r
    return;\r
  }\r
\r
  if (\r
    current instanceof HTMLInputElement &&\r
    current.type === 'range' &&\r
    rangeEditor.mode === 'edit'\r
  ) {\r
    handleRangeDirection(current, direction);\r
    return;\r
  }\r
\r
  if (\r
    current instanceof HTMLInputElement &&\r
    current.type === 'number' &&\r
    numberEditor.mode === 'edit'\r
  ) {\r
    return;\r
  }\r
\r
  const focusables = getFocusableElements();\r
  const next = getNextFocus(direction, focusables, current);\r
  next?.focus();\r
}\r
\r
function moveCursor(\r
  element: HTMLInputElement | HTMLTextAreaElement,\r
  direction: Direction,\r
): boolean | null {\r
  if (!element.isConnected) return null;\r
\r
  const hasSelectionSupport =\r
    element instanceof HTMLTextAreaElement ||\r
    (element instanceof HTMLInputElement &&\r
      ['text', 'email', 'password', 'search', 'url', 'tel'].includes(element.type));\r
\r
  if (!hasSelectionSupport) {\r
    return null;\r
  }\r
  const start = element.selectionStart ?? 0;\r
  const length = element.value.length;\r
\r
  if (direction === 'left') {\r
    if (start === 0) return false;\r
    element.setSelectionRange(start - 1, start - 1);\r
    return true;\r
  } else if (direction === 'right') {\r
    if (start >= length) return false;\r
    element.setSelectionRange(start + 1, start + 1);\r
    return true;\r
  } else if (direction === 'up') {\r
    const beforeCursor = element.value.substring(0, start);\r
    if (!beforeCursor.includes('\\n')) return false;\r
    const lastNewline = beforeCursor.lastIndexOf('\\n');\r
    element.setSelectionRange(lastNewline + 1, lastNewline + 1);\r
    return true;\r
  } else if (direction === 'down') {\r
    const afterCursor = element.value.substring(start);\r
    if (!afterCursor.includes('\\n')) return false;\r
    const nextNewline = afterCursor.indexOf('\\n');\r
    element.setSelectionRange(start + nextNewline + 1, start + nextNewline + 1);\r
    return true;\r
  }\r
  return false;\r
}\r
\r
export function tabNext() {\r
  const focusables = getFocusableElements();\r
  const current = document.activeElement as HTMLElement;\r
  const currentIndex = focusables.indexOf(current);\r
  const nextIndex = (currentIndex + 1) % focusables.length;\r
  focusables[nextIndex]?.focus();\r
}\r
\r
export function tabPrev() {\r
  const focusables = getFocusableElements();\r
  const current = document.activeElement as HTMLElement;\r
  const currentIndex = focusables.indexOf(current);\r
  const prevIndex = (currentIndex - 1 + focusables.length) % focusables.length;\r
  focusables[prevIndex]?.focus();\r
}\r
\r
function isScrollable(element: HTMLElement): boolean {\r
  const style = window.getComputedStyle(element);\r
  const overflow = style.overflow;\r
  const overflowY = style.overflowY;\r
  const overflowX = style.overflowX;\r
  return (\r
    overflow === 'auto' ||\r
    overflow === 'scroll' ||\r
    overflowY === 'auto' ||\r
    overflowY === 'scroll' ||\r
    overflowX === 'auto' ||\r
    overflowX === 'scroll'\r
  );\r
}\r
\r
function getScrollableAncestor(element: HTMLElement): HTMLElement | null {\r
  let current: HTMLElement | null = element.parentElement;\r
  while (current) {\r
    if (isScrollable(current)) {\r
      return current;\r
    }\r
    current = current.parentElement;\r
  }\r
  return null;\r
}\r
\r
function getFocusablesInContainer(container: HTMLElement): HTMLElement[] {\r
  return Array.from(\r
    container.querySelectorAll<HTMLElement>(\r
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',\r
    ),\r
  ).filter((el) => !el.hasAttribute('disabled') && el.style.display !== 'none');\r
}\r
\r
export function focusBeforeContainer() {\r
  const current = document.activeElement as HTMLElement;\r
  const scrollableAncestor = getScrollableAncestor(current);\r
\r
  if (!scrollableAncestor) {\r
    const focusables = getFocusableElements();\r
    focusables[0]?.focus();\r
    return;\r
  }\r
\r
  const allFocusables = getFocusableElements();\r
  const containerFocusables = getFocusablesInContainer(scrollableAncestor);\r
  const containerIndex = allFocusables.indexOf(containerFocusables[0]);\r
\r
  if (containerIndex > 0) {\r
    allFocusables[containerIndex - 1]?.focus();\r
  } else {\r
    tabPrev();\r
  }\r
}\r
\r
export function focusAfterContainer() {\r
  const current = document.activeElement as HTMLElement;\r
  const scrollableAncestor = getScrollableAncestor(current);\r
\r
  if (!scrollableAncestor) {\r
    const focusables = getFocusableElements();\r
    focusables[focusables.length - 1]?.focus();\r
    return;\r
  }\r
\r
  const allFocusables = getFocusableElements();\r
  const containerFocusables = getFocusablesInContainer(scrollableAncestor);\r
  const lastContainerIndex = allFocusables.indexOf(\r
    containerFocusables[containerFocusables.length - 1],\r
  );\r
\r
  if (lastContainerIndex < allFocusables.length - 1) {\r
    allFocusables[lastContainerIndex + 1]?.focus();\r
  } else {\r
    tabNext();\r
  }\r
}\r
`,Jl=`export function urlToCheckboxMatrix(\r
  url: string,\r
  size?: { width: number; height: number },\r
  threshold: number = 128,\r
): Promise<number[][]> {\r
  return new Promise((resolve, reject) => {\r
    const img = new Image();\r
\r
    // ⚠️ Important for cross-origin images\r
    img.crossOrigin = 'anonymous';\r
\r
    img.onload = () => {\r
      const canvas = document.createElement('canvas');\r
      const ctx = canvas.getContext('2d');\r
\r
      if (!ctx) {\r
        reject('Canvas not supported');\r
        return;\r
      }\r
\r
      const width = size?.width || img.width;\r
      const height = size?.height || img.height;\r
\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      // Draw image (resize if needed)\r
      ctx.drawImage(img, 0, 0, width, height);\r
\r
      const { data } = ctx.getImageData(0, 0, width, height);\r
\r
      const result: number[][] = [];\r
\r
      for (let y = 0; y < height; y++) {\r
        const row: number[] = [];\r
\r
        for (let x = 0; x < width; x++) {\r
          const i = (y * width + x) * 4;\r
\r
          const r = data[i];\r
          const g = data[i + 1];\r
          const b = data[i + 2];\r
\r
          // Convert to grayscale\r
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;\r
\r
          // Threshold to 1 or 0\r
          row.push(gray < threshold ? 1 : 0);\r
        }\r
\r
        result.push(row);\r
      }\r
\r
      resolve(result);\r
    };\r
\r
    img.onerror = () => reject('Failed to load image');\r
\r
    img.src = url;\r
  });\r
}\r
\r
export interface ImageMatrix {\r
  matrix: number[][];\r
  columns: number;\r
  rows: number;\r
}\r
\r
export async function loadImageAsMatrix(\r
  file: File,\r
  maxSize: number = 60,\r
  threshold: number = 128,\r
): Promise<ImageMatrix> {\r
  return new Promise((resolve, reject) => {\r
    const img = new Image();\r
\r
    img.onload = () => {\r
      const aspectRatio = img.width / img.height;\r
\r
      let columns: number;\r
      let rows: number;\r
\r
      if (aspectRatio >= 1) {\r
        columns = maxSize;\r
        rows = Math.round(maxSize / aspectRatio);\r
      } else {\r
        columns = Math.round(maxSize * aspectRatio);\r
        rows = maxSize;\r
      }\r
\r
      const canvas = document.createElement('canvas');\r
      const ctx = canvas.getContext('2d');\r
\r
      if (!ctx) {\r
        reject('Canvas not supported');\r
        return;\r
      }\r
\r
      canvas.width = columns;\r
      canvas.height = rows;\r
\r
      ctx.fillStyle = '#ffffff';\r
      ctx.fillRect(0, 0, columns, rows);\r
\r
      const scale = Math.min(columns / img.width, rows / img.height);\r
      const scaledWidth = img.width * scale;\r
      const scaledHeight = img.height * scale;\r
      const offsetX = (columns - scaledWidth) / 2;\r
      const offsetY = (rows - scaledHeight) / 2;\r
\r
      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);\r
\r
      const { data } = ctx.getImageData(0, 0, columns, rows);\r
\r
      const matrix: number[][] = [];\r
\r
      for (let y = 0; y < rows; y++) {\r
        const row: number[] = [];\r
        for (let x = 0; x < columns; x++) {\r
          const i = (y * columns + x) * 4;\r
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];\r
          row.push(gray < threshold ? 1 : 0);\r
        }\r
        matrix.push(row);\r
      }\r
\r
      resolve({ matrix, columns, rows });\r
    };\r
\r
    img.onerror = () => reject('Failed to load image');\r
    img.src = URL.createObjectURL(file);\r
  });\r
}\r
`,ql=`<!doctype html>\r
<html>\r
  <head>\r
    <meta charset="utf-8" />\r
    <title>Joymap - Navigation</title>\r
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>\r
    <style>\r
      body {\r
        background-color: #1a1a1a;\r
        color: #ddd;\r
        padding: 1rem;\r
      }\r
      :focus {\r
        outline: 3px solid #a78bfa;\r
        outline-offset: 2px;\r
      }\r
      section {\r
        margin-bottom: 2rem;\r
        padding: 1rem;\r
        border-radius: 0.5rem;\r
        background-color: #2a2a2a;\r
      }\r
      .pixel {\r
        appearance: none;\r
        width: 20px;\r
        height: 20px;\r
        background-color: #444;\r
        cursor: pointer;\r
        border: 1px solid #333;\r
      }\r
      .pixel:checked {\r
        background-color: #a78bfa;\r
      }\r
      .pixel:focus {\r
        outline: 2px solid #fff;\r
        outline-offset: -2px;\r
      }\r
      select[size] {\r
        width: 100%;\r
      }\r
      @keyframes bounce {\r
        /* Idle */\r
        0% {\r
          transform: translateY(0);\r
        }\r
\r
        /* Anticipation (dip down + squash) */\r
        10% {\r
          transform: translateY(8px);\r
          animation-timing-function: cubic-bezier(0.6, -0.3, 0.7, 0);\r
        }\r
\r
        /* Explosive takeoff (stretch) */\r
        25% {\r
          transform: translateY(-0px);\r
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.3, 1);\r
        }\r
\r
        /* Peak (hang time) */\r
        45% {\r
          transform: translateY(-10px);\r
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\r
        }\r
        /* Impact (big squash) */\r
        85% {\r
          transform: translateY(0);\r
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);\r
        }\r
      }\r
      .bounce-once {\r
        animation: bounce 0.3s;\r
      }\r
      @keyframes btn-burst {\r
        0% {\r
          width: 100%;\r
          height: 100%;\r
          opacity: 0.6;\r
        }\r
        100% {\r
          width: calc(100% + 40px);\r
          height: calc(100% + 40px);\r
          opacity: 0;\r
        }\r
      }\r
      .btn {\r
        position: relative;\r
      }\r
      .btn::before {\r
        content: '';\r
        position: absolute;\r
        top: 50%;\r
        left: 50%;\r
        transform: translate(-50%, -50%);\r
        border-radius: inherit;\r
        background-color: rgba(255, 255, 255, 0.3);\r
        width: 100%;\r
        height: 100%;\r
        opacity: 0;\r
      }\r
      .btn-burst::before {\r
        animation: btn-burst 0.4s ease-out forwards;\r
      }\r
      .mic-icon {\r
        position: fixed;\r
        bottom: 20px;\r
        right: 20px;\r
        width: 50px;\r
        height: 50px;\r
        background-color: #a78bfa;\r
        border-radius: 50%;\r
        display: none;\r
        align-items: center;\r
        justify-content: center;\r
        z-index: 9999;\r
        animation: mic-pulse 1s infinite;\r
      }\r
      .mic-icon svg {\r
        width: 24px;\r
        height: 24px;\r
        fill: white;\r
      }\r
      @keyframes mic-pulse {\r
        0%,\r
        100% {\r
          transform: scale(1);\r
          opacity: 1;\r
        }\r
        50% {\r
          transform: scale(1.1);\r
          opacity: 0.8;\r
        }\r
      }\r
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="mic-icon" class="mic-icon">\r
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\r
        <path\r
          d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"\r
        />\r
        <path\r
          d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"\r
        />\r
      </svg>\r
    </div>\r
    <div id="app">\r
      <h1 class="mb-2 text-3xl font-bold">Gamepad Navigation Demo</h1>\r
\r
      <section>\r
        <h2 class="mb-2 text-lg font-semibold text-purple-400">Controls</h2>\r
        <ul class="space-y-1 text-sm text-gray-400">\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">D-pad</kbd> - Navigate focus\r
            spatially / Move text cursor\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">L1</kbd> /\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">R1</kbd> - Previous / Next\r
            (Tab-like)\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">L2</kbd> /\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">R2</kbd> - Focus before/after\r
            scrollable container\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">X</kbd> - Click / Editor Mode\r
            Toggle / Hold <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">X</kbd> for\r
            voice-to-text\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">Square</kbd> - Cancel /\r
            Delete character / Uncheck checkbox\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">Right Stick</kbd> - Scroll\r
            the focused container (vertical & horizontal)\r
          </li>\r
        </ul>\r
\r
        <h3 class="mt-4 mb-1 text-sm font-semibold text-purple-400">Editor Mode</h3>\r
        <ul class="space-y-1 text-sm text-gray-400">\r
          <li><strong>Date Input:</strong> D-pad up/down = day, left/right = month</li>\r
          <li><strong>Color Picker:</strong> D-pad up/down = hue, left/right = luminance</li>\r
          <li><strong>Range Input:</strong> D-pad left/right = ±1, up/down = ±10</li>\r
          <li>\r
            <strong>Number Input:</strong> D-pad up/down changes value (respects step/min/max)\r
          </li>\r
        </ul>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Buttons</h2>\r
        <div class="flex flex-wrap gap-2">\r
          <button class="btn rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 1\r
          </button>\r
          <button class="btn rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 2\r
          </button>\r
          <button class="btn rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 3\r
          </button>\r
          <button class="btn rounded bg-gray-600 px-4 py-2" disabled>Disabled Button</button>\r
          <button class="btn rounded bg-green-600 px-4 py-2 transition-colors hover:bg-green-500">\r
            Button 4\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Horizontal Gallery</h2>\r
        <div class="flex gap-4 overflow-x-auto p-2 pb-4" style="max-width: 100%">\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-pink-500 to-rose-500 transition-colors hover:from-pink-400 hover:to-rose-400"\r
          >\r
            <span class="block font-semibold">Card 1</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-violet-500 to-purple-500 transition-colors hover:from-violet-400 hover:to-purple-400"\r
          >\r
            <span class="block font-semibold">Card 2</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-blue-500 to-cyan-500 transition-colors hover:from-blue-400 hover:to-cyan-400"\r
          >\r
            <span class="block font-semibold">Card 3</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-emerald-500 to-teal-500 transition-colors hover:from-emerald-400 hover:to-teal-400"\r
          >\r
            <span class="block font-semibold">Card 4</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-amber-500 to-orange-500 transition-colors hover:from-amber-400 hover:to-orange-400"\r
          >\r
            <span class="block font-semibold">Card 5</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-red-500 to-rose-600 transition-colors hover:from-red-400 hover:to-rose-500"\r
          >\r
            <span class="block font-semibold">Card 6</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-fuchsia-500 to-pink-500 transition-colors hover:from-fuchsia-400 hover:to-pink-400"\r
          >\r
            <span class="block font-semibold">Card 7</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-indigo-500 to-blue-500 transition-colors hover:from-indigo-400 hover:to-blue-400"\r
          >\r
            <span class="block font-semibold">Card 8</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-cyan-500 to-teal-500 transition-colors hover:from-cyan-400 hover:to-teal-400"\r
          >\r
            <span class="block font-semibold">Card 9</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-green-500 to-emerald-500 transition-colors hover:from-green-400 hover:to-emerald-400"\r
          >\r
            <span class="block font-semibold">Card 10</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-lime-500 to-yellow-500 transition-colors hover:from-lime-400 hover:to-yellow-400"\r
          >\r
            <span class="block font-semibold">Card 11</span>\r
          </button>\r
          <button\r
            class="card h-24 w-40 shrink-0 rounded bg-linear-to-br from-orange-500 to-yellow-500 transition-colors hover:from-orange-400 hover:to-yellow-400"\r
          >\r
            <span class="block font-semibold">Card 12</span>\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Form Elements</h2>\r
        <div class="flex flex-wrap items-center gap-4">\r
          <input\r
            type="text"\r
            placeholder="Text input"\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          />\r
          <input\r
            type="text"\r
            inputmode="email"\r
            placeholder="Email input"\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          />\r
          <input type="checkbox" id="check1" class="h-5 w-5 accent-purple-500" />\r
          <label for="check1">Checkbox</label>\r
          <input type="checkbox" id="check2" class="h-5 w-5 accent-purple-500" />\r
          <label for="check2">Another checkbox</label>\r
          <div class="inline-block w-48">\r
            <select\r
              class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
            >\r
              <option>Select option</option>\r
              <option>Option 1</option>\r
              <option>Option 2</option>\r
            </select>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">More Form Inputs</h2>\r
        <div class="flex flex-wrap items-center gap-6">\r
          <label class="flex items-center gap-2"\r
            ><input type="radio" name="radio1" class="accent-purple-500" /><span\r
              >Radio 1</span\r
            ></label\r
          >\r
          <label class="flex items-center gap-2"\r
            ><input type="radio" name="radio1" class="accent-purple-500" /><span\r
              >Radio 2</span\r
            ></label\r
          >\r
          <label class="flex items-center gap-2"\r
            ><input type="radio" name="radio1" class="accent-purple-500" /><span\r
              >Radio 3</span\r
            ></label\r
          >\r
          <label class="flex items-center gap-2"\r
            ><input\r
              type="color"\r
              value="#a78bfa"\r
              class="h-10 w-10 cursor-pointer rounded accent-purple-500"\r
          /></label>\r
          <label class="flex items-center gap-2"\r
            ><span id="range-label">Range</span\r
            ><input type="range" min="0" max="100" class="accent-purple-500"\r
          /></label>\r
          <label class="flex items-center gap-2"\r
            ><span>Date:</span\r
            ><input type="date" class="rounded border border-gray-600 bg-gray-700 px-3 py-2"\r
          /></label>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 id="pixel-art-heading" class="mb-2 text-xl font-semibold">Checkbox Art</h2>\r
        <div class="mb-4 flex items-center gap-4">\r
          <label class="flex items-center gap-2">\r
            On:\r
            <input type="color" id="color-on" value="#5700fa" />\r
          </label>\r
          <label class="flex items-center gap-2">\r
            Off:\r
            <input type="color" id="color-off" value="#00005a" />\r
          </label>\r
          <label class="flex items-center gap-2">\r
            Threshold:\r
            <input\r
              type="number"\r
              id="threshold-input"\r
              value="128"\r
              min="0"\r
              max="255"\r
              class="w-16 rounded border border-gray-600 bg-gray-700 px-2 py-1"\r
            />\r
          </label>\r
          <input type="file" id="image-upload" accept="image/*" class="hidden" />\r
          <button id="load-image-btn" class="btn rounded bg-purple-600 px-4 py-2">\r
            Load Image\r
          </button>\r
          <button id="save-image-btn" class="btn rounded bg-purple-600 px-4 py-2">\r
            Save Image\r
          </button>\r
        </div>\r
        <div class="flex gap-4">\r
          <div id="pixel-art" class="h-96 w-96 overflow-auto"></div>\r
          <canvas\r
            id="pixel-canvas"\r
            class="border border-gray-600"\r
            style="width: 120px; height: 120px"\r
          ></canvas>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Textarea & Focus States</h2>\r
        <div class="flex max-w-xl flex-col gap-4">\r
          <textarea\r
            placeholder="Type something here..."\r
            rows="3"\r
            class="resize-none rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          ></textarea>\r
          <input\r
            type="password"\r
            placeholder="Password"\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          />\r
        </div>\r
      </section>\r
\r
      <footer class="mt-8 border-t border-gray-700 pt-4">\r
        <div class="flex flex-wrap gap-4 text-sm text-gray-500">\r
          <a href="#" class="hover:text-purple-400">Privacy Policy</a>\r
          <a href="#" class="hover:text-purple-400">Terms of Service</a>\r
          <a href="#" class="hover:text-purple-400">Contact</a>\r
          <span>© 2024 Joymap</span>\r
        </div>\r
      </footer>\r
    </div>\r
    <script type="module" src="./index.ts"><\/script>\r
  </body>\r
</html>\r
`,Zl=`import { createEventModule, createJoymap, StickResult } from 'joymap';\r
\r
import {\r
  attachCanvasUpdater,\r
  renderCheckboxesToCanvas,\r
  setCanvasDimensions,\r
} from './canvasRenderer';\r
import { cancelColorEditor, handleColorFocusOut, toggleColorEditor } from './colorEditor';\r
import { cancelDateEditor, handleDateFocusOut, toggleDateEditor } from './dateEditor';\r
import {\r
  Direction,\r
  focusAfterContainer,\r
  focusBeforeContainer,\r
  moveFocus,\r
  tabNext,\r
  tabPrev,\r
} from './focusUtils';\r
import { loadImageAsMatrix } from './imgToCheckboxes';\r
import {\r
  cancelNumberEditor,\r
  decrementNumber,\r
  handleNumberFocusOut,\r
  incrementNumber,\r
  numberEditor,\r
  toggleNumberEditor,\r
} from './numberEditor';\r
import {\r
  generateCheckboxesFromMatrix,\r
  generatePixelArtContainer,\r
  PIXEL_ART_SIZE,\r
} from './pixelArt';\r
import { cancelRangeEditor, handleRangeFocusOut, toggleRangeEditor } from './rangeEditor';\r
import { handleRepeat, resetRepeatState } from './repeatUtils';\r
import { scrollElement } from './scrollUtils';\r
import { handleSelectClick, handleSelectFocusOut, toggleSelect } from './selectEditor';\r
import { initVoiceRecognition, startListening, stopListening } from './voiceUtils';\r
\r
function capitalize(s: string): string {\r
  return s.charAt(0).toUpperCase() + s.slice(1);\r
}\r
\r
const joymap = createJoymap();\r
const module = createEventModule();\r
joymap.addModule(module);\r
\r
function addDpadEvents(direction: Direction) {\r
  module.addEvent(\`dpad\${capitalize(direction)}.pressed\`, (result) => {\r
    if (result[0].justChanged) {\r
      moveFocus(direction);\r
    } else {\r
      handleRepeat(direction, () => moveFocus(direction));\r
    }\r
  });\r
\r
  module.addEvent(\`dpad\${capitalize(direction)}.released\`, () => {\r
    resetRepeatState(direction);\r
  });\r
}\r
\r
['right', 'left', 'up', 'down'].forEach((d) => addDpadEvents(d as Direction));\r
\r
module.addEvent('dpadUp.pressed', (result) => {\r
  if (numberEditor.mode === 'edit') {\r
    if (result[0].justChanged) {\r
      incrementNumber();\r
    } else {\r
      handleRepeat('numberUp', incrementNumber);\r
    }\r
  }\r
});\r
\r
module.addEvent('dpadUp.released', () => {\r
  resetRepeatState('numberUp');\r
});\r
\r
module.addEvent('dpadDown.pressed', (result) => {\r
  if (numberEditor.mode === 'edit') {\r
    if (result[0].justChanged) {\r
      decrementNumber();\r
    } else {\r
      handleRepeat('numberDown', decrementNumber);\r
    }\r
  }\r
});\r
\r
module.addEvent('dpadDown.released', () => {\r
  resetRepeatState('numberDown');\r
});\r
\r
module.addEvent('R1.pressed', (result) => {\r
  if (result[0].justChanged) {\r
    tabNext();\r
  } else {\r
    handleRepeat('tabNext', tabNext);\r
  }\r
});\r
\r
module.addEvent('R1.released', () => {\r
  resetRepeatState('tabNext');\r
});\r
\r
module.addEvent('L1.pressed', (result) => {\r
  if (result[0].justChanged) {\r
    tabPrev();\r
  } else {\r
    handleRepeat('tabPrev', tabPrev);\r
  }\r
});\r
\r
module.addEvent('L1.released', () => {\r
  resetRepeatState('tabPrev');\r
});\r
\r
module.addEvent('R2.justPressed', () => {\r
  focusAfterContainer();\r
});\r
\r
module.addEvent('L2.justPressed', () => {\r
  focusBeforeContainer();\r
});\r
\r
module.addEvent('A.justPressed', () => {\r
  const current = document.activeElement as HTMLElement;\r
\r
  if (current instanceof HTMLInputElement && current.type === 'color') {\r
    toggleColorEditor(current);\r
    return;\r
  }\r
\r
  if (current instanceof HTMLInputElement && current.type === 'range') {\r
    toggleRangeEditor(current);\r
    return;\r
  }\r
\r
  if (current instanceof HTMLInputElement && current.type === 'number') {\r
    toggleNumberEditor(current);\r
    return;\r
  }\r
\r
  if (current instanceof HTMLInputElement && current.type === 'date') {\r
    toggleDateEditor(current);\r
    return;\r
  }\r
\r
  if (current instanceof HTMLSelectElement) {\r
    toggleSelect(current);\r
    return;\r
  }\r
\r
  if (current.classList.contains('card')) {\r
    current.click();\r
    return;\r
  }\r
\r
  if (\r
    (current instanceof HTMLInputElement &&\r
      (current.type === 'text' || current.type === 'email' || !current.type)) ||\r
    current instanceof HTMLTextAreaElement\r
  ) {\r
    current.click();\r
    return;\r
  }\r
\r
  current?.click();\r
});\r
\r
function isTextInput(element: HTMLElement): boolean {\r
  return (\r
    (element instanceof HTMLInputElement &&\r
      (element.type === 'text' || element.type === 'email' || !element.type)) ||\r
    element instanceof HTMLTextAreaElement\r
  );\r
}\r
\r
module.addEvent('A.justPressed', () => {\r
  const current = document.activeElement as HTMLElement;\r
  if (isTextInput(current)) {\r
    startListening();\r
  }\r
});\r
\r
module.addEvent('A.justReleased', () => {\r
  stopListening();\r
});\r
\r
module.addEvent('B.justPressed', () => {\r
  const current = document.activeElement as HTMLElement;\r
  if (current instanceof HTMLSelectElement) {\r
    toggleSelect(current);\r
  }\r
  cancelColorEditor();\r
  cancelRangeEditor();\r
  cancelNumberEditor();\r
  cancelDateEditor();\r
});\r
\r
function deleteChar() {\r
  const current = document.activeElement as HTMLElement;\r
\r
  if (\r
    (current instanceof HTMLInputElement &&\r
      (current.type === 'text' || current.type === 'email' || !current.type)) ||\r
    current instanceof HTMLTextAreaElement\r
  ) {\r
    const start = current.selectionStart ?? 0;\r
    if (start > 0) {\r
      const value = current.value;\r
      current.value = value.substring(0, start - 1) + value.substring(start);\r
      current.setSelectionRange(start - 1, start - 1);\r
      current.dispatchEvent(new Event('input', { bubbles: true }));\r
    }\r
  }\r
}\r
\r
function uncheckFocused() {\r
  const current = document.activeElement as HTMLElement;\r
  if (current instanceof HTMLInputElement && current.type === 'checkbox' && current.checked) {\r
    current.checked = false;\r
    current.dispatchEvent(new Event('change', { bubbles: true }));\r
  }\r
}\r
\r
module.addEvent('X.pressed', (result) => {\r
  uncheckFocused();\r
  if (result[0].justChanged) {\r
    deleteChar();\r
  } else {\r
    handleRepeat('delete', deleteChar);\r
  }\r
});\r
\r
module.addEvent('X.released', () => {\r
  resetRepeatState('delete');\r
});\r
\r
document.addEventListener('focusout', (e) => {\r
  handleSelectFocusOut(e);\r
  handleColorFocusOut(e);\r
  handleRangeFocusOut(e);\r
  handleNumberFocusOut(e);\r
  handleDateFocusOut(e);\r
});\r
\r
document.addEventListener('click', (e) => {\r
  handleSelectClick();\r
\r
  const target = e.target as HTMLElement;\r
  const card = target.closest('.card') as HTMLElement | null;\r
  if (card) {\r
    if (!card.classList.contains('bounce-once')) {\r
      card.classList.add('bounce-once');\r
    }\r
    card.addEventListener(\r
      'animationend',\r
      () => {\r
        card.classList.remove('bounce-once');\r
      },\r
      { once: true },\r
    );\r
  }\r
\r
  const btn = target.closest('.btn') as HTMLElement | null;\r
  if (btn) {\r
    btn.classList.remove('btn-burst');\r
    void btn.offsetWidth;\r
    btn.classList.add('btn-burst');\r
  }\r
});\r
\r
module.addEvent('R.pressed', (result) => {\r
  const stickResult = result[0] as StickResult;\r
  const [x, y] = stickResult.value;\r
  const current = document.activeElement as HTMLElement;\r
\r
  if (y < -0.2) {\r
    const amount = y * 10;\r
    if (!scrollElement(current, 'y', amount)) {\r
      window.scrollBy({ top: amount, behavior: 'instant' });\r
    }\r
  } else if (y > 0.2) {\r
    const amount = y * 10;\r
    if (!scrollElement(current, 'y', amount)) {\r
      window.scrollBy({ top: amount, behavior: 'instant' });\r
    }\r
  }\r
\r
  if (x < -0.2) {\r
    const amount = x * 10;\r
    if (!scrollElement(current, 'x', amount)) {\r
      window.scrollBy({ left: amount, behavior: 'instant' });\r
    }\r
  } else if (x > 0.2) {\r
    const amount = x * 10;\r
    if (!scrollElement(current, 'x', amount)) {\r
      window.scrollBy({ left: amount, behavior: 'instant' });\r
    }\r
  }\r
});\r
\r
generatePixelArtContainer().then((art: string) => {\r
  const pixelArtContainer = document.getElementById('pixel-art');\r
  if (pixelArtContainer) {\r
    pixelArtContainer.innerHTML = art;\r
  }\r
\r
  const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;\r
  if (canvas) {\r
    attachCanvasUpdater(canvas);\r
\r
    const colorOn = document.getElementById('color-on') as HTMLInputElement;\r
    const colorOff = document.getElementById('color-off') as HTMLInputElement;\r
    colorOn?.addEventListener('input', () => renderCheckboxesToCanvas(canvas));\r
    colorOff?.addEventListener('input', () => renderCheckboxesToCanvas(canvas));\r
  }\r
});\r
\r
const fileInput = document.getElementById('image-upload') as HTMLInputElement;\r
const loadBtn = document.getElementById('load-image-btn');\r
\r
loadBtn?.addEventListener('click', () => {\r
  fileInput?.click();\r
});\r
\r
fileInput?.addEventListener('change', async () => {\r
  const file = fileInput.files?.[0];\r
  if (!file) return;\r
\r
  try {\r
    const thresholdInput = document.getElementById('threshold-input') as HTMLInputElement;\r
    const threshold = parseInt(thresholdInput?.value || '128', 10);\r
\r
    const { matrix, columns, rows } = await loadImageAsMatrix(file, 60, threshold);\r
\r
    setCanvasDimensions(columns, rows);\r
\r
    const pixelArtContainer = document.getElementById('pixel-art');\r
    if (pixelArtContainer) {\r
      pixelArtContainer.innerHTML = generateCheckboxesFromMatrix(matrix, columns, rows);\r
    }\r
\r
    const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;\r
    if (canvas) {\r
      attachCanvasUpdater(canvas);\r
      renderCheckboxesToCanvas(canvas);\r
    }\r
\r
    const heading = document.getElementById('pixel-art-heading');\r
    if (heading) {\r
      heading.textContent = \`Checkbox Art (\${columns}x\${rows})\`;\r
    }\r
  } catch (error) {\r
    console.error('Failed to load image:', error);\r
  }\r
\r
  fileInput.value = '';\r
});\r
\r
const saveBtn = document.getElementById('save-image-btn');\r
\r
saveBtn?.addEventListener('click', () => {\r
  const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;\r
  if (!canvas) return;\r
\r
  const link = document.createElement('a');\r
  link.download = 'pixel-art.png';\r
  link.href = canvas.toDataURL('image/png');\r
  link.click();\r
});\r
\r
const pixelArtHeading = document.getElementById('pixel-art-heading');\r
if (pixelArtHeading) {\r
  pixelArtHeading.textContent = \`Checkbox Art (\${PIXEL_ART_SIZE}x\${PIXEL_ART_SIZE})\`;\r
}\r
\r
initVoiceRecognition();\r
\r
joymap.start();\r
`,Ql=`export type NumberEditorState = {\r
  element: HTMLInputElement | null;\r
  originalValue: string;\r
  mode: 'view' | 'edit';\r
};\r
\r
export const numberEditor: NumberEditorState = { element: null, originalValue: '', mode: 'view' };\r
\r
export function toggleNumberEditor(element: HTMLInputElement) {\r
  if (numberEditor.mode === 'edit') {\r
    numberEditor.mode = 'view';\r
    numberEditor.element = null;\r
  } else {\r
    numberEditor.mode = 'edit';\r
    numberEditor.element = element;\r
    numberEditor.originalValue = element.value;\r
  }\r
}\r
\r
export function cancelNumberEditor() {\r
  if (numberEditor.mode === 'edit' && numberEditor.element) {\r
    numberEditor.element.value = numberEditor.originalValue;\r
    numberEditor.mode = 'view';\r
    numberEditor.element = null;\r
  }\r
}\r
\r
export function incrementNumber() {\r
  if (!numberEditor.element) return;\r
  const element = numberEditor.element;\r
  const step = parseFloat(element.step) || 1;\r
  const max = parseFloat(element.max) || Infinity;\r
  let value = parseFloat(element.value) || 0;\r
  value = Math.min(max, value + step);\r
  element.value = value.toString();\r
  element.dispatchEvent(new Event('input', { bubbles: true }));\r
}\r
\r
export function decrementNumber() {\r
  if (!numberEditor.element) return;\r
  const element = numberEditor.element;\r
  const step = parseFloat(element.step) || 1;\r
  const min = parseFloat(element.min) || -Infinity;\r
  let value = parseFloat(element.value) || 0;\r
  value = Math.max(min, value - step);\r
  element.value = value.toString();\r
  element.dispatchEvent(new Event('input', { bubbles: true }));\r
}\r
\r
export function handleNumberFocusOut(e: FocusEvent) {\r
  if (e.target instanceof HTMLInputElement && e.target.type === 'number') {\r
    if (numberEditor.mode === 'edit') {\r
      numberEditor.mode = 'view';\r
      numberEditor.element = null;\r
    }\r
  }\r
}\r
`,Kl=`import logoUrl from '@/examples/assets/logo.png';\r
import { urlToCheckboxMatrix } from './imgToCheckboxes';\r
\r
export const PIXEL_ART_SIZE = 60;\r
\r
export const pixelArtGridPromise = urlToCheckboxMatrix(logoUrl, {\r
  width: PIXEL_ART_SIZE,\r
  height: PIXEL_ART_SIZE,\r
});\r
\r
export async function generatePixelArtContainer() {\r
  const pixelArtGrid = await pixelArtGridPromise;\r
  return generateCheckboxesFromMatrix(pixelArtGrid, PIXEL_ART_SIZE, PIXEL_ART_SIZE);\r
}\r
\r
export function generateCheckboxesFromMatrix(\r
  matrix: number[][],\r
  columns: number,\r
  rows: number,\r
): string {\r
  let html = \`<div class="grid gap-0" style="grid-template-columns: repeat(\${columns}, 20px);">\`;\r
\r
  for (let y = 0; y < rows; y++) {\r
    for (let x = 0; x < columns; x++) {\r
      const checked = matrix[y][x] === 1 ? 'checked' : '';\r
      html += \`<input type="checkbox" class="pixel" data-index="\${y * columns + x}" \${checked} />\`;\r
    }\r
  }\r
\r
  html += '</div>';\r
\r
  return html;\r
}\r
`,ec=`export type RangeEditorState = {\r
  element: HTMLInputElement | null;\r
  originalValue: number;\r
  mode: 'view' | 'edit';\r
};\r
\r
export const rangeEditor: RangeEditorState = { element: null, originalValue: 0, mode: 'view' };\r
\r
export function updateRangeLabel() {\r
  const label = document.getElementById('range-label');\r
  if (!label) return;\r
\r
  if (rangeEditor.element && rangeEditor.mode === 'edit') {\r
    label.textContent = \`Range: \${rangeEditor.element.value}\`;\r
  } else {\r
    label.textContent = 'Range';\r
  }\r
}\r
\r
export function toggleRangeEditor(element: HTMLInputElement) {\r
  if (rangeEditor.mode === 'edit') {\r
    rangeEditor.mode = 'view';\r
    rangeEditor.element = null;\r
  } else {\r
    rangeEditor.mode = 'edit';\r
    rangeEditor.element = element;\r
    rangeEditor.originalValue = parseInt(element.value) || 0;\r
  }\r
  updateRangeLabel();\r
}\r
\r
export function cancelRangeEditor() {\r
  if (rangeEditor.mode === 'edit' && rangeEditor.element) {\r
    rangeEditor.element.value = rangeEditor.originalValue.toString();\r
    rangeEditor.mode = 'view';\r
    rangeEditor.element = null;\r
    updateRangeLabel();\r
  }\r
}\r
\r
export function handleRangeDirection(\r
  element: HTMLInputElement,\r
  direction: 'up' | 'down' | 'left' | 'right',\r
) {\r
  const min = parseInt(element.min) || 0;\r
  const max = parseInt(element.max) || 100;\r
  let value = parseInt(element.value) || 0;\r
\r
  if (direction === 'right') {\r
    value = Math.min(max, value + 1);\r
  } else if (direction === 'left') {\r
    value = Math.max(min, value - 1);\r
  } else if (direction === 'up') {\r
    value = Math.min(max, value + 10);\r
  } else if (direction === 'down') {\r
    value = Math.max(min, value - 10);\r
  }\r
\r
  element.value = value.toString();\r
  updateRangeLabel();\r
}\r
\r
export function handleRangeFocusOut(e: FocusEvent) {\r
  const target = e.target;\r
  if (target instanceof HTMLInputElement && target.type === 'range') {\r
    if (rangeEditor.mode === 'edit') {\r
      rangeEditor.mode = 'view';\r
      rangeEditor.element = null;\r
      updateRangeLabel();\r
    }\r
  }\r
}\r
\r
export function handleRangeClick() {\r
  if (rangeEditor.mode === 'edit') {\r
    rangeEditor.mode = 'view';\r
    rangeEditor.element = null;\r
    updateRangeLabel();\r
  }\r
}\r
`,nc=`export const INITIAL_DELAY = 400;\r
export const REPEAT_RATE = 33;\r
\r
type RepeatState = {\r
  lastTriggerTime: number;\r
  isRepeating: boolean;\r
};\r
\r
const repeatStates: Record<string, RepeatState> = {};\r
\r
function getOrCreateState(key: string): RepeatState {\r
  if (!repeatStates[key]) {\r
    repeatStates[key] = { lastTriggerTime: 0, isRepeating: false };\r
  }\r
  return repeatStates[key];\r
}\r
\r
export function handleRepeat(key: string, moveFn: () => void) {\r
  const state = getOrCreateState(key);\r
  const now = performance.now();\r
\r
  if (state.lastTriggerTime === 0) {\r
    state.lastTriggerTime = now;\r
    return;\r
  }\r
\r
  const elapsed = now - state.lastTriggerTime;\r
  const threshold = state.isRepeating ? REPEAT_RATE : INITIAL_DELAY;\r
\r
  if (elapsed >= threshold) {\r
    moveFn();\r
    state.lastTriggerTime = now;\r
    state.isRepeating = true;\r
  }\r
}\r
\r
export function resetRepeatState(key: string) {\r
  const state = repeatStates[key];\r
  if (state) {\r
    state.lastTriggerTime = 0;\r
    state.isRepeating = false;\r
  }\r
}\r
`,tc=`export function getScrollableAncestor(\r
  element: HTMLElement,\r
  direction: 'x' | 'y',\r
): HTMLElement | null {\r
  let current: HTMLElement | null = element.parentElement;\r
\r
  while (current) {\r
    const style = window.getComputedStyle(current);\r
    const overflow = direction === 'x' ? style.overflowX : style.overflowY;\r
\r
    if (overflow === 'auto' || overflow === 'scroll') {\r
      const scrollPos = direction === 'x' ? current.scrollLeft : current.scrollTop;\r
      const maxScroll =\r
        direction === 'x'\r
          ? current.scrollWidth - current.clientWidth\r
          : current.scrollHeight - current.clientHeight;\r
      const canScroll = scrollPos > 0 || scrollPos < maxScroll;\r
\r
      if (canScroll) {\r
        return current;\r
      }\r
    }\r
\r
    current = current.parentElement;\r
  }\r
\r
  return null;\r
}\r
\r
export function scrollElement(element: HTMLElement, direction: 'x' | 'y', amount: number): boolean {\r
  const scrollable = getScrollableAncestor(element, direction);\r
  if (scrollable) {\r
    scrollable.scrollBy({\r
      [direction === 'x' ? 'left' : 'top']: amount,\r
      behavior: 'instant',\r
    });\r
    return true;\r
  }\r
  return false;\r
}\r
`,rc=`export function expandSelect(select: HTMLSelectElement) {\r
  select.size = select.options.length;\r
}\r
\r
export function collapseSelect(select: HTMLSelectElement) {\r
  select.size = 1;\r
}\r
\r
export function toggleSelect(select: HTMLSelectElement) {\r
  if (select.size > 1) {\r
    collapseSelect(select);\r
  } else {\r
    expandSelect(select);\r
  }\r
}\r
\r
export function handleSelectDirection(\r
  select: HTMLSelectElement,\r
  direction: 'up' | 'down' | 'left' | 'right',\r
): boolean {\r
  if (!isSelectExpanded(select)) {\r
    return false;\r
  }\r
\r
  if (direction === 'down') {\r
    const nextIndex = Math.min(select.selectedIndex + 1, select.options.length - 1);\r
    select.selectedIndex = nextIndex;\r
    return true;\r
  } else if (direction === 'up') {\r
    const prevIndex = Math.max(select.selectedIndex - 1, 0);\r
    select.selectedIndex = prevIndex;\r
    return true;\r
  }\r
  return false;\r
}\r
\r
export function isSelectExpanded(select: HTMLSelectElement): boolean {\r
  return select.size > 1;\r
}\r
\r
export function handleSelectFocusOut(e: FocusEvent) {\r
  const target = e.target;\r
  if (target instanceof HTMLSelectElement && isSelectExpanded(target)) {\r
    collapseSelect(target);\r
  }\r
}\r
\r
export function handleSelectClick() {\r
  const select = document.activeElement;\r
  if (select instanceof HTMLSelectElement && isSelectExpanded(select)) {\r
    collapseSelect(select);\r
  }\r
}\r
`,oc=`interface SpeechRecognitionEvent extends Event {\r
  results: SpeechRecognitionResultList;\r
  resultIndex: number;\r
}\r
\r
interface SpeechRecognitionResultList {\r
  length: number;\r
  item(index: number): SpeechRecognitionResult;\r
  [index: number]: SpeechRecognitionResult;\r
}\r
\r
interface SpeechRecognitionResult {\r
  length: number;\r
  item(index: number): SpeechRecognitionAlternative;\r
  [index: number]: SpeechRecognitionAlternative;\r
  isFinal: boolean;\r
}\r
\r
interface SpeechRecognitionAlternative {\r
  transcript: string;\r
  confidence: number;\r
}\r
\r
interface SpeechRecognitionErrorEvent extends Event {\r
  error: string;\r
}\r
\r
interface ISpeechRecognition extends EventTarget {\r
  continuous: boolean;\r
  interimResults: boolean;\r
  lang: string;\r
  onresult: ((event: SpeechRecognitionEvent) => void) | null;\r
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;\r
  onend: (() => void) | null;\r
  start(): void;\r
  stop(): void;\r
}\r
\r
declare global {\r
  interface Window {\r
    SpeechRecognition: new () => ISpeechRecognition;\r
    webkitSpeechRecognition: new () => ISpeechRecognition;\r
  }\r
}\r
\r
let recognition: ISpeechRecognition | null = null;\r
\r
export function initVoiceRecognition() {\r
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;\r
  if (!SpeechRecognitionCtor) {\r
    console.warn('Speech recognition not supported');\r
    return null;\r
  }\r
\r
  recognition = new SpeechRecognitionCtor();\r
  recognition.continuous = true;\r
  recognition.interimResults = true;\r
\r
  recognition.onresult = (event: SpeechRecognitionEvent) => {\r
    const current = document.activeElement;\r
    if (!(current instanceof HTMLInputElement) && !(current instanceof HTMLTextAreaElement)) {\r
      return;\r
    }\r
\r
    let transcript = '';\r
\r
    for (let i = event.resultIndex; i < event.results.length; i++) {\r
      const result = event.results[i];\r
      transcript += result[0].transcript;\r
    }\r
\r
    if (transcript) {\r
      insertTextAtCursor(current, transcript);\r
    }\r
  };\r
\r
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {\r
    const current = document.activeElement;\r
    if (!(current instanceof HTMLInputElement) && !(current instanceof HTMLTextAreaElement)) {\r
      return;\r
    }\r
\r
    if (event.error === 'network') {\r
      insertTextAtCursor(current, '[Speech not available - check network or try Chrome]');\r
    } else if (event.error !== 'no-speech') {\r
      insertTextAtCursor(current, \`[\${event.error}]\`);\r
    }\r
  };\r
\r
  return recognition;\r
}\r
\r
export function startListening() {\r
  if (!recognition) return;\r
\r
  showMicIcon();\r
\r
  try {\r
    recognition.start();\r
  } catch (e) {\r
    hideMicIcon();\r
  }\r
}\r
\r
export function stopListening() {\r
  hideMicIcon();\r
\r
  if (recognition) {\r
    try {\r
      recognition.stop();\r
    } catch (e) {\r
      void e;\r
    }\r
  }\r
}\r
\r
function insertTextAtCursor(element: HTMLInputElement | HTMLTextAreaElement, text: string) {\r
  if (!element.isConnected || !('selectionStart' in element)) return;\r
\r
  try {\r
    const normalizedText = text.replace(/[\\r\\n]+/g, ' ').trim() + ' ';\r
\r
    const start = element.selectionStart ?? element.value.length;\r
    const end = element.selectionEnd ?? element.value.length;\r
    const before = element.value.substring(0, start);\r
    const after = element.value.substring(end);\r
    element.value = before + normalizedText + after;\r
    element.selectionStart = element.selectionEnd = start + normalizedText.length;\r
    element.dispatchEvent(new Event('input', { bubbles: true }));\r
  } catch {\r
    // Element may have become invalid (e.g., detached from DOM)\r
  }\r
}\r
\r
function showMicIcon() {\r
  const icon = document.getElementById('mic-icon');\r
  if (icon) {\r
    icon.style.display = 'flex';\r
  }\r
}\r
\r
function hideMicIcon() {\r
  const icon = document.getElementById('mic-icon');\r
  if (icon) {\r
    icon.style.display = 'none';\r
  }\r
}\r
`,ac={"index.ts":L(Zl),"index.html":ql,"canvasRenderer.ts":L(Vl),"colorEditor.ts":L(Yl),"dateEditor.ts":L(Xl),"focusUtils.ts":L(Gl),"numberEditor.ts":L(Ql),"rangeEditor.ts":L(ec),"selectEditor.ts":L(rc),"repeatUtils.ts":L(nc),"scrollUtils.ts":L(tc),"pixelArt.ts":L(Kl),"imgToCheckboxes.ts":L(Jl),"voiceUtils.ts":L(oc),"package.json":he({hasLodash:!1,hasReact:!1}),"tsconfig.json":fe},ic=`import Phaser from 'phaser';\r
\r
export class Background {\r
  private gridLines: { sprite: Phaser.GameObjects.TileSprite; speed: number }[] = [];\r
  private gradientOverlay!: Phaser.GameObjects.Graphics;\r
\r
  create(scene: Phaser.Scene) {\r
    scene.cameras.main.setBackgroundColor('#000000');\r
\r
    const depths = [0.2, 0.3, 0.4, 0.5];\r
    depths.forEach((speed) => {\r
      const key = 'grid-' + speed;\r
      const size = Math.floor(80 + speed * 40);\r
\r
      const graphics = scene.make.graphics();\r
      graphics.lineStyle(10 * speed, 0xa78bfa, Math.min(0.8, speed * 2));\r
\r
      graphics.lineBetween(0, 0, size, size);\r
\r
      graphics.generateTexture(key, size, size);\r
      graphics.destroy();\r
\r
      const sprite = scene.add.tileSprite(400, 300, 800, 600, key);\r
      sprite.tileScaleX = 1;\r
      sprite.tileScaleY = 1;\r
      this.gridLines.push({ sprite, speed: speed * 0.5 });\r
    });\r
\r
    this.gradientOverlay = scene.add.graphics();\r
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
  }\r
\r
  update() {\r
    this.gridLines.forEach(({ sprite, speed }) => {\r
      sprite.tilePositionY += speed;\r
    });\r
  }\r
}\r
`,sc=`<!doctype html>\r
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
`,lc=`import { createJoymap } from 'joymap';\r
import Phaser from 'phaser';\r
\r
import { MainScene } from './MainScene';\r
\r
const config: Phaser.Types.Core.GameConfig = {\r
  type: Phaser.AUTO,\r
  width: 800,\r
  height: 600,\r
  parent: 'app',\r
  backgroundColor: '#1a0032',\r
  scene: [MainScene],\r
  physics: {\r
    default: 'matter',\r
    matter: {\r
      gravity: { x: 0, y: 1 },\r
      debug: false,\r
    },\r
  },\r
};\r
\r
document.fonts.load('16px Audiowide').then(() => {\r
  setTimeout(() => {\r
    const game = new Phaser.Game(config);\r
\r
    const joymap = createJoymap();\r
\r
    game.scene.start('MainScene', { joymap });\r
\r
    joymap.start();\r
  }, 100);\r
});\r
`,cc=`import { createQueryModule, Joymap, QueryModule } from 'joymap';\r
import Phaser from 'phaser';\r
\r
import { Background } from './Background';\r
import { Menu } from './Menu';\r
\r
export class MainScene extends Phaser.Scene {\r
  private cans: Phaser.GameObjects.Text[] = [];\r
  private background = new Background();\r
  private menu = new Menu();\r
  private gamepadModule: QueryModule | null = null;\r
  private joymap: Joymap | null = null;\r
\r
  constructor() {\r
    super({ key: 'MainScene' });\r
  }\r
\r
  init(data: { joymap: Joymap }) {\r
    this.joymap = data.joymap;\r
  }\r
\r
  setupGamepad(joymapInstance: Joymap) {\r
    this.joymap = joymapInstance;\r
  }\r
\r
  create() {\r
    this.background.create(this);\r
    this.menu.create(this, () => this.spawnEmojis());\r
\r
    const floor = this.add.rectangle(400, 610, 800, 20, 0x000000);\r
    this.matter.add.gameObject(floor, { isStatic: true, restitution: 0.5 });\r
\r
    const leftWall = this.add.rectangle(-10, 300, 20, 600, 0x000000);\r
    this.matter.add.gameObject(leftWall, { isStatic: true, restitution: 0.5 });\r
\r
    const rightWall = this.add.rectangle(810, 300, 20, 600, 0x000000);\r
    this.matter.add.gameObject(rightWall, { isStatic: true, restitution: 0.5 });\r
  }\r
\r
  update() {\r
    this.background.update();\r
\r
    if (this.joymap) {\r
      const unusedIds = this.joymap.getUnusedPadIds();\r
\r
      if (unusedIds.length > 0 && !this.gamepadModule) {\r
        this.gamepadModule = createQueryModule({ padId: unusedIds[0] });\r
        this.joymap.addModule(this.gamepadModule);\r
      }\r
\r
      if (this.gamepadModule && !this.gamepadModule.isConnected()) {\r
        this.gamepadModule = null;\r
      }\r
    }\r
\r
    this.menu.update(this, this.gamepadModule);\r
  }\r
\r
  private spawnEmojis() {\r
    const x = Phaser.Math.Between(350, 450);\r
    const y = 380;\r
    const rand = Math.random();\r
\r
    if (rand > 0.98) {\r
      this.spawnBin(x, y);\r
    } else if (rand > 0.7) {\r
      this.spawnBean(x, y);\r
    } else {\r
      this.spawnCan(x, y);\r
    }\r
  }\r
\r
  private spawnCan(x: number, y: number) {\r
    const can = this.add.text(x, y, '🥫', { fontSize: '48px' }).setOrigin(0.5, 0.5);\r
    can.setDepth(10);\r
\r
    this.matter.add.gameObject(can, {\r
      shape: { type: 'rectangle', width: 24, height: 42 },\r
      restitution: 0.5,\r
      friction: 0.1,\r
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },\r
      torque: Phaser.Math.FloatBetween(-1, 1),\r
    });\r
\r
    can.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));\r
    this.cans.push(can);\r
  }\r
\r
  private spawnBean(x: number, y: number) {\r
    const bean = this.add.text(x, y, '🫘', { fontSize: '48px' }).setOrigin(0.5, 0.5);\r
    bean.setDepth(10);\r
\r
    this.matter.add.gameObject(bean, {\r
      shape: { type: 'circle', radius: 18 },\r
      restitution: 0.7,\r
      friction: 0.1,\r
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },\r
      torque: Phaser.Math.FloatBetween(-1, 1),\r
    });\r
\r
    bean.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));\r
    this.cans.push(bean);\r
  }\r
\r
  private spawnBin(x: number, y: number) {\r
    const bin = this.add\r
      .text(x, y, '🗑️', { fontSize: '48px', padding: { y: 5 } })\r
      .setOrigin(0.5, 0.5);\r
    bin.setDepth(10);\r
\r
    this.matter.add.gameObject(bin, {\r
      shape: { type: 'rectangle', width: 40, height: 52 },\r
      restitution: 0.5,\r
      friction: 0.1,\r
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },\r
      torque: Phaser.Math.FloatBetween(-1, 1),\r
    });\r
\r
    bin.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));\r
    this.cans.push(bin);\r
  }\r
}\r
`,uc=`import { QueryModule } from 'joymap';\r
import Phaser from 'phaser';\r
\r
export const menuItems = ['New Game', 'Options', 'Beans', 'Quit'];\r
\r
export class Menu {\r
  private textObjects: Phaser.GameObjects.Text[] = [];\r
  private statusText!: Phaser.GameObjects.Text;\r
  private echoes: { text: Phaser.GameObjects.Text; offset: number }[] = [];\r
  private currentTween: Phaser.Tweens.Tween | null = null;\r
  private onBeansSelected: (() => void) | null = null;\r
  public selectedIndex = 0;\r
\r
  create(scene: Phaser.Scene, onBeansSelected: () => void) {\r
    this.onBeansSelected = onBeansSelected;\r
\r
    scene.add\r
      .text(400, 100, 'PHASER MENU', {\r
        fontSize: '72px',\r
        fontFamily: 'Audiowide',\r
        fontStyle: 'normal',\r
        color: '#ffffffdd',\r
      })\r
      .setOrigin(0.5);\r
\r
    this.statusText = scene.add\r
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
      const text = scene.add\r
        .text(400, 250 + index * 60, item, {\r
          fontSize: '32px',\r
          fontFamily: 'Audiowide',\r
          fontStyle: 'normal',\r
          padding: { x: 12, y: 4 },\r
          color: index === this.selectedIndex ? '#5700fa' : '#a78bfa',\r
        })\r
        .setOrigin(0.5)\r
        .setInteractive({ useHandCursor: true })\r
        .on('pointerover', () => {\r
          text.setColor('#8000fa');\r
        })\r
        .on('pointerout', () => {\r
          text.setColor(index === this.selectedIndex ? '#5700fa' : '#a78bfa');\r
        })\r
        .on('pointerdown', () => {\r
          this.selectedIndex = index;\r
          this.updateSelection(scene);\r
          this.confirmSelection();\r
        });\r
\r
      this.textObjects.push(text);\r
    });\r
\r
    this.updateSelection(scene);\r
\r
    scene.input.keyboard?.on('keydown-UP', () => {\r
      this.selectedIndex = (this.selectedIndex - 1 + menuItems.length) % menuItems.length;\r
      this.updateSelection(scene);\r
    });\r
\r
    scene.input.keyboard?.on('keydown-DOWN', () => {\r
      this.selectedIndex = (this.selectedIndex + 1) % menuItems.length;\r
      this.updateSelection(scene);\r
    });\r
\r
    scene.input.keyboard?.on('keydown-ENTER', () => {\r
      this.confirmSelection();\r
    });\r
  }\r
\r
  update(scene: Phaser.Scene, gamepadModule: QueryModule | null) {\r
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
\r
    if (gamepadModule) {\r
      const up = gamepadModule.getButton('dpadUp');\r
      const down = gamepadModule.getButton('dpadDown');\r
      const a = gamepadModule.getButton('A');\r
      const leftStick = gamepadModule.getStick('L');\r
\r
      if (\r
        (up.justChanged && up.pressed) ||\r
        (leftStick.justChanged && leftStick.pressed && leftStick.value[1] < -0.5)\r
      ) {\r
        this.selectedIndex = (this.selectedIndex - 1 + menuItems.length) % menuItems.length;\r
        this.updateSelection(scene);\r
      }\r
\r
      if (\r
        (down.justChanged && down.pressed) ||\r
        (leftStick.justChanged && leftStick.pressed && leftStick.value[1] > 0.5)\r
      ) {\r
        this.selectedIndex = (this.selectedIndex + 1) % menuItems.length;\r
        this.updateSelection(scene);\r
      }\r
\r
      if (a.justChanged && a.pressed) {\r
        this.confirmSelection();\r
      }\r
    }\r
  }\r
\r
  private confirmSelection() {\r
    const selected = menuItems[this.selectedIndex];\r
    this.statusText.setText(\`Selected: \${selected}!\`);\r
\r
    if (this.selectedIndex === 2) {\r
      this.onBeansSelected?.();\r
    }\r
  }\r
\r
  private updateSelection(scene: Phaser.Scene) {\r
    if (this.currentTween) {\r
      this.currentTween.stop();\r
    }\r
\r
    this.echoes.forEach((e) => e.text.destroy());\r
    this.echoes = [];\r
\r
    this.textObjects.forEach((text, index) => {\r
      if (index === this.selectedIndex) {\r
        text.setColor('#5700fa');\r
        this.currentTween = scene.tweens.add({\r
          targets: text,\r
          scale: 1.1,\r
          duration: 400,\r
          ease: 'Back.easeOut',\r
        });\r
        this.spawnEcho(scene);\r
      } else {\r
        text.setColor('#a78bfa');\r
        scene.tweens.add({\r
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
  private spawnEcho(scene: Phaser.Scene) {\r
    const x = 400;\r
    const y = 250 + this.selectedIndex * 60;\r
\r
    for (let i = 0; i < 5; i++) {\r
      const echo = scene.add\r
        .text(x, y, menuItems[this.selectedIndex], {\r
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
}\r
`,dc={"index.ts":L(lc),"index.html":sc,"MainScene.ts":L(cc),"Menu.ts":L(uc),"Background.ts":L(ic),"package.json":he({hasLodash:!1,hasReact:!1,dependencies:{phaser:Q.devDependencies.phaser}}),"tsconfig.json":fe},mc=`import React, { ReactNode, useState } from 'react';\r
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
`,pc=`<!doctype html>\r
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
`,fc=`import './Main';\r
`,hc=`import React, { useEffect, useState } from 'react';\r
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
`,gc={"index.ts":L(fc),"Main.tsx":L(hc),"Gamepad.tsx":L(mc),"index.html":pc,"package.json":he({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":de["color-hash"],tinycolor2:de.tinycolor2,"@types/color-hash":de["@types/color-hash"],"@types/tinycolor2":de["@types/tinycolor2"]}}),"tsconfig.json":fe,"vite.config.ts":Dr},xc=`<!doctype html>\r
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
`,bc=`// Simple canvas example that doesn't use any other library nor ES6 features\r
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
interface GameObj {\r
  color?: Color;\r
  x: number;\r
  y: number;\r
  angle: number;\r
  rotationOffset: number;\r
  width: number;\r
  height: number;\r
}\r
\r
interface Character extends GameObj {\r
  module: QueryModule;\r
  timeoutSmall: number;\r
  timeoutBig: number;\r
  timeoutSpinning: number;\r
  timeoutChaos: number;\r
  color: Color;\r
}\r
\r
interface Bullet extends GameObj {\r
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
function drawElement(ctx: CanvasRenderingContext2D, element: GameObj, image: CanvasImageSource) {\r
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
`,yc={"index.ts":L(bc),"index.html":xc,"package.json":he({hasLodash:!1,hasReact:!1}),"tsconfig.json":fe},pn={readme:{html:"examples/pages/Readme/index.html",tags:[]},react:{html:"examples/pages/React/index.html",gitPath:"tree/master/examples/pages/React",stackblitz:gc,tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",gitPath:"tree/master/examples/pages/Fighting",stackblitz:Hl,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",gitPath:"tree/master/examples/pages/Rumble",stackblitz:yc,tags:["queryModule","game","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",gitPath:"tree/master/examples/pages/Log",stackblitz:zl,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",gitPath:"tree/master/examples/pages/Editor",stackblitz:jl,tags:["eventModule","react","WYSIWYG"],description:"A text editor example that binds gamepad buttons to keyboard events."},phaser:{html:"examples/pages/Phaser/index.html",gitPath:"tree/master/examples/pages/Phaser",stackblitz:dc,tags:["queryModule","game","phaser"],description:"A Phaser game menu demonstrating a game menu with joymap."},nav:{html:"examples/pages/Navigation/index.html",gitPath:"tree/master/examples/pages/Navigation",stackblitz:ac,tags:["eventModule","plain html","accesibility"],description:"Navigate any website using a gamepad with spatial focus detection and section skipping."}};function vc(){const{page:e}=No(),n=Rn(),t=Object.keys(pn).includes(e??"")?e:"readme",r=a=>n(`/examples/${a}`),o=pn[t];return o?y.jsx(El,{children:y.jsxs("div",{className:"flex h-screen flex-col",children:[y.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:y.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[y.jsxs("div",{className:"flex items-center gap-2",children:[y.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:y.jsx("img",{src:Jr})}),y.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),y.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:y.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(pn).map(a=>{const i=a===t;return y.jsx(Pa,{role:"tab",onClick:()=>r(a),isActive:i,children:a},a)})})})]})}),y.jsx("main",{className:"flex w-full flex-1 flex-col",children:y.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[y.jsxs("div",{className:"mb-6",children:[y.jsxs("div",{className:"flex items-center justify-between",children:[y.jsx("div",{className:"flex flex-wrap gap-3",children:o.tags.map(a=>y.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:a},a))}),y.jsxs("div",{className:"flex justify-end",children:[o.stackblitz&&y.jsx(Cl,{files:o.stackblitz}),o.gitPath&&y.jsx(jr,{content:"View example on github",children:y.jsx(Vt,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${o.gitPath}`,children:y.jsx(Oa,{})})})]})]}),y.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:o.description})]}),o.code&&y.jsx(Na,{code:o.code}),y.jsx(ja,{path:t==="readme"?"README.md":o.html.replace(/\/index\.html$/,"/"),children:y.jsx("iframe",{src:`/joymap/${o.html}`,className:"relative block h-full w-full"},o.html)})]})}),y.jsx("footer",{className:"border-t border-border py-4",children:y.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:y.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",Ml]})})})]})}):null}const Fr=document.createElement("div");document.body.appendChild(Fr);const wc=Gr(Fr);wc.render(y.jsx(ya,{basename:"/joymap/",children:y.jsxs(Jo,{children:[y.jsx(hn,{path:"/examples/:page",element:y.jsx(vc,{})}),y.jsx(hn,{path:"/",element:y.jsx(Xo,{to:"/examples/readme",replace:!0})})]})}));
//# sourceMappingURL=main-CmLQD7j_.js.map
