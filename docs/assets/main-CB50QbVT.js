import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as u,j as w,a as Rn,R as Sn,b as Gr,c as qr}from"./client-vbRJSMsA.js";import"./_commonjsHelpers-Cpj98o6Y.js";/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Zt="popstate";function Kt(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function Yr(e={}){function t(r,o){var c;let i=(c=o.state)==null?void 0:c.masked,{pathname:a,search:s,hash:l}=i||r.location;return mt("",{pathname:a,search:s,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default",i?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,o){return typeof o=="string"?o:ke(o)}return Qr(t,n,null,e)}function I(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function U(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Xr(){return Math.random().toString(36).substring(2,10)}function en(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function mt(e,t,n=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?ye(t):t,state:n,key:t&&t.key||r||Xr(),unstable_mask:o}}function ke({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function ye(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Qr(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:i=!1}=r,a=o.history,s="POP",l=null,c=d();c==null&&(c=0,a.replaceState({...a.state,idx:c},""));function d(){return(a.state||{idx:null}).idx}function p(){s="POP";let x=d(),y=x==null?null:x-c;c=x,l&&l({action:s,location:g.location,delta:y})}function m(x,y){s="PUSH";let v=Kt(x)?x:mt(g.location,x,y);c=d()+1;let b=en(v,c),E=g.createHref(v.unstable_mask||v);try{a.pushState(b,"",E)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;o.location.assign(E)}i&&l&&l({action:s,location:g.location,delta:1})}function f(x,y){s="REPLACE";let v=Kt(x)?x:mt(g.location,x,y);c=d();let b=en(v,c),E=g.createHref(v.unstable_mask||v);a.replaceState(b,"",E),i&&l&&l({action:s,location:g.location,delta:0})}function h(x){return Zr(x)}let g={get action(){return s},get location(){return e(o,a)},listen(x){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(Zt,p),l=x,()=>{o.removeEventListener(Zt,p),l=null}},createHref(x){return t(o,x)},createURL:h,encodeLocation(x){let y=h(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:m,replace:f,go(x){return a.go(x)}};return g}function Zr(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),I(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ke(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function kn(e,t,n="/"){return Kr(e,t,n,!1)}function Kr(e,t,n,r){let o=typeof t=="string"?ye(t):t,i=ee(o.pathname||"/",n);if(i==null)return null;let a=Pn(e);eo(a);let s=null;for(let l=0;s==null&&l<a.length;++l){let c=po(i);s=co(a[l],c,r)}return s}function Pn(e,t=[],n=[],r="",o=!1){let i=(a,s,l=o,c)=>{let d={relativePath:c===void 0?a.path||"":c,caseSensitive:a.caseSensitive===!0,childrenIndex:s,route:a};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&l)return;I(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let p=Y([r,d.relativePath]),m=n.concat(d);a.children&&a.children.length>0&&(I(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Pn(a.children,t,m,p,l)),!(a.path==null&&!a.index)&&t.push({path:p,score:so(p,a.index),routesMeta:m})};return e.forEach((a,s)=>{var l;if(a.path===""||!((l=a.path)!=null&&l.includes("?")))i(a,s);else for(let c of Mn(a.path))i(a,s,!0,c)}),t}function Mn(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let a=Mn(r.join("/")),s=[];return s.push(...a.map(l=>l===""?i:[i,l].join("/"))),o&&s.push(...a),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function eo(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:lo(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var to=/^:[\w-]+$/,no=3,ro=2,oo=1,io=10,ao=-2,tn=e=>e==="*";function so(e,t){let n=e.split("/"),r=n.length;return n.some(tn)&&(r+=ao),t&&(r+=ro),n.filter(o=>!tn(o)).reduce((o,i)=>o+(to.test(i)?no:i===""?oo:io),r)}function lo(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function co(e,t,n=!1){let{routesMeta:r}=e,o={},i="/",a=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,d=i==="/"?t:t.slice(i.length)||"/",p=Ue({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),m=l.route;if(!p&&c&&n&&!r[r.length-1].route.index&&(p=Ue({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},d)),!p)return null;Object.assign(o,p.params),a.push({params:o,pathname:Y([i,p.pathname]),pathnameBase:go(Y([i,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(i=Y([i,p.pathnameBase]))}return a}function Ue(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=uo(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((c,{paramName:d,isOptional:p},m)=>{if(d==="*"){let h=s[m]||"";a=i.slice(0,i.length-h.length).replace(/(.)\/+$/,"$1")}const f=s[m];return p&&!f?c[d]=void 0:c[d]=(f||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:a,pattern:e}}function uo(e,t=!1,n=!0){U(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,s,l,c,d)=>{if(r.push({paramName:s,isOptional:l!=null}),l){let p=d.charAt(c+a.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function po(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ee(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var mo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function fo(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?ye(e):e,i;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?i=nn(n.substring(1),"/"):i=nn(n,t)):i=t,{pathname:i,search:yo(r),hash:xo(o)}}function nn(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function it(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ho(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Et(e){let t=ho(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function qe(e,t,n,r=!1){let o;typeof e=="string"?o=ye(e):(o={...e},I(!o.pathname||!o.pathname.includes("?"),it("?","pathname","search",o)),I(!o.pathname||!o.pathname.includes("#"),it("#","pathname","hash",o)),I(!o.search||!o.search.includes("#"),it("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,s;if(a==null)s=n;else{let p=t.length-1;if(!r&&a.startsWith("..")){let m=a.split("/");for(;m[0]==="..";)m.shift(),p-=1;o.pathname=m.join("/")}s=p>=0?t[p]:"/"}let l=fo(o,s),c=a&&a!=="/"&&a.endsWith("/"),d=(i||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}var Y=e=>e.join("/").replace(/\/\/+/g,"/"),go=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),yo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xo=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,wo=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function vo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function bo(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Ln=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function In(e,t){let n=e;if(typeof n!="string"||!mo.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,o=!1;if(Ln)try{let i=new URL(window.location.href),a=n.startsWith("//")?new URL(i.protocol+n):new URL(n),s=ee(a.pathname,t);a.origin===i.origin&&s!=null?n=s+a.search+a.hash:o=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Tn=["POST","PUT","PATCH","DELETE"];new Set(Tn);var Eo=["GET",...Tn];new Set(Eo);var xe=u.createContext(null);xe.displayName="DataRouter";var Ye=u.createContext(null);Ye.displayName="DataRouterState";var Co=u.createContext(!1),On=u.createContext({isTransitioning:!1});On.displayName="ViewTransition";var Ro=u.createContext(new Map);Ro.displayName="Fetchers";var So=u.createContext(null);So.displayName="Await";var W=u.createContext(null);W.displayName="Navigation";var Le=u.createContext(null);Le.displayName="Location";var J=u.createContext({outlet:null,matches:[],isDataRoute:!1});J.displayName="Route";var Ct=u.createContext(null);Ct.displayName="RouteError";var jn="REACT_ROUTER_ERROR",ko="REDIRECT",Po="ROUTE_ERROR_RESPONSE";function Mo(e){if(e.startsWith(`${jn}:${ko}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Lo(e){if(e.startsWith(`${jn}:${Po}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new wo(t.status,t.statusText,t.data)}catch{}}function Io(e,{relative:t}={}){I(we(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=u.useContext(W),{hash:o,pathname:i,search:a}=Ie(e,{relative:t}),s=i;return n!=="/"&&(s=i==="/"?n:Y([n,i])),r.createHref({pathname:s,search:a,hash:o})}function we(){return u.useContext(Le)!=null}function re(){return I(we(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(Le).location}var Nn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function An(e){u.useContext(W).static||u.useLayoutEffect(e)}function Rt(){let{isDataRoute:e}=u.useContext(J);return e?zo():To()}function To(){I(we(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(xe),{basename:t,navigator:n}=u.useContext(W),{matches:r}=u.useContext(J),{pathname:o}=re(),i=JSON.stringify(Et(r)),a=u.useRef(!1);return An(()=>{a.current=!0}),u.useCallback((l,c={})=>{if(U(a.current,Nn),!a.current)return;if(typeof l=="number"){n.go(l);return}let d=qe(l,JSON.parse(i),o,c.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Y([t,d.pathname])),(c.replace?n.replace:n.push)(d,c.state,c)},[t,n,i,o,e])}u.createContext(null);function Oo(){let{matches:e}=u.useContext(J),t=e[e.length-1];return t?t.params:{}}function Ie(e,{relative:t}={}){let{matches:n}=u.useContext(J),{pathname:r}=re(),o=JSON.stringify(Et(n));return u.useMemo(()=>qe(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function jo(e,t){return $n(e,t)}function $n(e,t,n){var x;I(we(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=u.useContext(W),{matches:o}=u.useContext(J),i=o[o.length-1],a=i?i.params:{},s=i?i.pathname:"/",l=i?i.pathnameBase:"/",c=i&&i.route;{let y=c&&c.path||"";Fn(s,!c||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let d=re(),p;if(t){let y=typeof t=="string"?ye(t):t;I(l==="/"||((x=y.pathname)==null?void 0:x.startsWith(l)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${y.pathname}" was given in the \`location\` prop.`),p=y}else p=d;let m=p.pathname||"/",f=m;if(l!=="/"){let y=l.replace(/^\//,"").split("/");f="/"+m.replace(/^\//,"").split("/").slice(y.length).join("/")}let h=kn(e,{pathname:f});U(c||h!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),U(h==null||h[h.length-1].route.element!==void 0||h[h.length-1].route.Component!==void 0||h[h.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=Fo(h&&h.map(y=>Object.assign({},y,{params:Object.assign({},a,y.params),pathname:Y([l,r.encodeLocation?r.encodeLocation(y.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?l:Y([l,r.encodeLocation?r.encodeLocation(y.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:y.pathnameBase])})),o,n);return t&&g?u.createElement(Le.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...p},navigationType:"POP"}},g):g}function No(){let e=Uo(),t=vo(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:i},"ErrorBoundary")," or"," ",u.createElement("code",{style:i},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:o},n):null,a)}var Ao=u.createElement(No,null),Dn=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=Lo(e.digest);n&&(e=n)}let t=e!==void 0?u.createElement(J.Provider,{value:this.props.routeContext},u.createElement(Ct.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?u.createElement($o,{error:e},t):t}};Dn.contextType=Co;var at=new WeakMap;function $o({children:e,error:t}){let{basename:n}=u.useContext(W);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=Mo(t.digest);if(r){let o=at.get(t);if(o)throw o;let i=In(r.location,n);if(Ln&&!at.get(t))if(i.isExternal||r.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const a=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:r.replace}));throw at.set(t,a),a}return u.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function Do({routeContext:e,match:t,children:n}){let r=u.useContext(xe);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement(J.Provider,{value:e},n)}function Fo(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,i=r==null?void 0:r.errors;if(i!=null){let d=o.findIndex(p=>p.route.id&&(i==null?void 0:i[p.route.id])!==void 0);I(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,d+1))}let a=!1,s=-1;if(n&&r){a=r.renderFallback;for(let d=0;d<o.length;d++){let p=o[d];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(s=d),p.route.id){let{loaderData:m,errors:f}=r,h=p.route.loader&&!m.hasOwnProperty(p.route.id)&&(!f||f[p.route.id]===void 0);if(p.route.lazy||h){n.isStatic&&(a=!0),s>=0?o=o.slice(0,s+1):o=[o[0]];break}}}}let l=n==null?void 0:n.onError,c=r&&l?(d,p)=>{var m,f;l(d,{location:r.location,params:((f=(m=r.matches)==null?void 0:m[0])==null?void 0:f.params)??{},unstable_pattern:bo(r.matches),errorInfo:p})}:void 0;return o.reduceRight((d,p,m)=>{let f,h=!1,g=null,x=null;r&&(f=i&&p.route.id?i[p.route.id]:void 0,g=p.route.errorElement||Ao,a&&(s<0&&m===0?(Fn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),h=!0,x=null):s===m&&(h=!0,x=p.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,m+1)),v=()=>{let b;return f?b=g:h?b=x:p.route.Component?b=u.createElement(p.route.Component,null):p.route.element?b=p.route.element:b=d,u.createElement(Do,{match:p,routeContext:{outlet:d,matches:y,isDataRoute:r!=null},children:b})};return r&&(p.route.ErrorBoundary||p.route.errorElement||m===0)?u.createElement(Dn,{location:r.location,revalidation:r.revalidation,component:g,error:f,children:v(),routeContext:{outlet:null,matches:y,isDataRoute:!0},onError:c}):v()},null)}function St(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function _o(e){let t=u.useContext(xe);return I(t,St(e)),t}function Bo(e){let t=u.useContext(Ye);return I(t,St(e)),t}function Ho(e){let t=u.useContext(J);return I(t,St(e)),t}function kt(e){let t=Ho(e),n=t.matches[t.matches.length-1];return I(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Wo(){return kt("useRouteId")}function Uo(){var r;let e=u.useContext(Ct),t=Bo("useRouteError"),n=kt("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function zo(){let{router:e}=_o("useNavigate"),t=kt("useNavigate"),n=u.useRef(!1);return An(()=>{n.current=!0}),u.useCallback(async(o,i={})=>{U(n.current,Nn),n.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var rn={};function Fn(e,t,n){!t&&!rn[e]&&(rn[e]=!0,U(!1,n))}u.memo(Vo);function Vo({routes:e,future:t,state:n,isStatic:r,onError:o}){return $n(e,void 0,{state:n,isStatic:r,onError:o})}function Jo({to:e,replace:t,state:n,relative:r}){I(we(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=u.useContext(W);U(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=u.useContext(J),{pathname:a}=re(),s=Rt(),l=qe(e,Et(i),a,r==="path"),c=JSON.stringify(l);return u.useEffect(()=>{s(JSON.parse(c),{replace:t,state:n,relative:r})},[s,c,r,t,n]),null}function ft(e){I(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Go({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:i=!1,unstable_useTransitions:a}){I(!we(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),l=u.useMemo(()=>({basename:s,navigator:o,static:i,unstable_useTransitions:a,future:{}}),[s,o,i,a]);typeof n=="string"&&(n=ye(n));let{pathname:c="/",search:d="",hash:p="",state:m=null,key:f="default",unstable_mask:h}=n,g=u.useMemo(()=>{let x=ee(c,s);return x==null?null:{location:{pathname:x,search:d,hash:p,state:m,key:f,unstable_mask:h},navigationType:r}},[s,c,d,p,m,f,r,h]);return U(g!=null,`<Router basename="${s}"> is not able to match the URL "${c}${d}${p}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:u.createElement(W.Provider,{value:l},u.createElement(Le.Provider,{children:t,value:g}))}function qo({children:e,location:t}){return jo(ht(e),t)}function ht(e,t=[]){let n=[];return u.Children.forEach(e,(r,o)=>{if(!u.isValidElement(r))return;let i=[...t,o];if(r.type===u.Fragment){n.push.apply(n,ht(r.props.children,i));return}I(r.type===ft,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),I(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=ht(r.props.children,i)),n.push(a)}),n}var _e="get",Be="application/x-www-form-urlencoded";function Xe(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function Yo(e){return Xe(e)&&e.tagName.toLowerCase()==="button"}function Xo(e){return Xe(e)&&e.tagName.toLowerCase()==="form"}function Qo(e){return Xe(e)&&e.tagName.toLowerCase()==="input"}function Zo(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ko(e,t){return e.button===0&&(!t||t==="_self")&&!Zo(e)}var Ae=null;function ei(){if(Ae===null)try{new FormData(document.createElement("form"),0),Ae=!1}catch{Ae=!0}return Ae}var ti=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function st(e){return e!=null&&!ti.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Be}"`),null):e}function ni(e,t){let n,r,o,i,a;if(Xo(e)){let s=e.getAttribute("action");r=s?ee(s,t):null,n=e.getAttribute("method")||_e,o=st(e.getAttribute("enctype"))||Be,i=new FormData(e)}else if(Yo(e)||Qo(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||s.getAttribute("action");if(r=l?ee(l,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||_e,o=st(e.getAttribute("formenctype"))||st(s.getAttribute("enctype"))||Be,i=new FormData(s,e),!ei()){let{name:c,type:d,value:p}=e;if(d==="image"){let m=c?`${c}.`:"";i.append(`${m}x`,"0"),i.append(`${m}y`,"0")}else c&&i.append(c,p)}}else{if(Xe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=_e,r=null,o=Be,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Pt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ri(e,t,n,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:t&&ee(o.pathname,t)==="/"?o.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:o.pathname=`${o.pathname.replace(/\/$/,"")}.${r}`,o}async function oi(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ii(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ai(e,t,n){let r=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await oi(i,n);return a.links?a.links():[]}return[]}));return ui(r.flat(1).filter(ii).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function on(e,t,n,r,o,i){let a=(l,c)=>n[c]?l.route.id!==n[c].route.id:!0,s=(l,c)=>{var d;return n[c].pathname!==l.pathname||((d=n[c].route.path)==null?void 0:d.endsWith("*"))&&n[c].params["*"]!==l.params["*"]};return i==="assets"?t.filter((l,c)=>a(l,c)||s(l,c)):i==="data"?t.filter((l,c)=>{var p;let d=r.routes[l.route.id];if(!d||!d.hasLoader)return!1;if(a(l,c)||s(l,c))return!0;if(l.route.shouldRevalidate){let m=l.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function si(e,t,{includeHydrateFallback:n}={}){return li(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function li(e){return[...new Set(e)]}function ci(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function ui(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let i=JSON.stringify(ci(o));return n.has(i)||(n.add(i),r.push({key:i,link:o})),r},[])}function _n(){let e=u.useContext(xe);return Pt(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function di(){let e=u.useContext(Ye);return Pt(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Mt=u.createContext(void 0);Mt.displayName="FrameworkContext";function Bn(){let e=u.useContext(Mt);return Pt(e,"You must render this element inside a <HydratedRouter> element"),e}function pi(e,t){let n=u.useContext(Mt),[r,o]=u.useState(!1),[i,a]=u.useState(!1),{onFocus:s,onBlur:l,onMouseEnter:c,onMouseLeave:d,onTouchStart:p}=t,m=u.useRef(null);u.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let g=y=>{y.forEach(v=>{a(v.isIntersecting)})},x=new IntersectionObserver(g,{threshold:.5});return m.current&&x.observe(m.current),()=>{x.disconnect()}}},[e]),u.useEffect(()=>{if(r){let g=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(g)}}},[r]);let f=()=>{o(!0)},h=()=>{o(!1),a(!1)};return n?e!=="intent"?[i,m,{}]:[i,m,{onFocus:Se(s,f),onBlur:Se(l,h),onMouseEnter:Se(c,f),onMouseLeave:Se(d,h),onTouchStart:Se(p,f)}]:[!1,m,{}]}function Se(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function mi({page:e,...t}){let{router:n}=_n(),r=u.useMemo(()=>kn(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?u.createElement(hi,{page:e,matches:r,...t}):null}function fi(e){let{manifest:t,routeModules:n}=Bn(),[r,o]=u.useState([]);return u.useEffect(()=>{let i=!1;return ai(e,t,n).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,n]),r}function hi({page:e,matches:t,...n}){let r=re(),{future:o,manifest:i,routeModules:a}=Bn(),{basename:s}=_n(),{loaderData:l,matches:c}=di(),d=u.useMemo(()=>on(e,t,c,i,r,"data"),[e,t,c,i,r]),p=u.useMemo(()=>on(e,t,c,i,r,"assets"),[e,t,c,i,r]),m=u.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let g=new Set,x=!1;if(t.forEach(v=>{var E;let b=i.routes[v.route.id];!b||!b.hasLoader||(!d.some(C=>C.route.id===v.route.id)&&v.route.id in l&&((E=a[v.route.id])!=null&&E.shouldRevalidate)||b.hasClientLoader?x=!0:g.add(v.route.id))}),g.size===0)return[];let y=ri(e,s,o.unstable_trailingSlashAwareDataRequests,"data");return x&&g.size>0&&y.searchParams.set("_routes",t.filter(v=>g.has(v.route.id)).map(v=>v.route.id).join(",")),[y.pathname+y.search]},[s,o.unstable_trailingSlashAwareDataRequests,l,r,i,d,t,e,a]),f=u.useMemo(()=>si(p,i),[p,i]),h=fi(p);return u.createElement(u.Fragment,null,m.map(g=>u.createElement("link",{key:g,rel:"prefetch",as:"fetch",href:g,...n})),f.map(g=>u.createElement("link",{key:g,rel:"modulepreload",href:g,...n})),h.map(({key:g,link:x})=>u.createElement("link",{key:g,nonce:n.nonce,...x,crossOrigin:x.crossOrigin??n.crossOrigin})))}function gi(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var yi=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{yi&&(window.__reactRouterVersion="7.13.1")}catch{}function xi({basename:e,children:t,unstable_useTransitions:n,window:r}){let o=u.useRef();o.current==null&&(o.current=Yr({window:r,v5Compat:!0}));let i=o.current,[a,s]=u.useState({action:i.action,location:i.location}),l=u.useCallback(c=>{n===!1?s(c):u.startTransition(()=>s(c))},[n]);return u.useLayoutEffect(()=>i.listen(l),[i,l]),u.createElement(Go,{basename:e,children:t,location:a.location,navigationType:a.action,navigator:i,unstable_useTransitions:n})}var Hn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Wn=u.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:i,replace:a,unstable_mask:s,state:l,target:c,to:d,preventScrollReset:p,viewTransition:m,unstable_defaultShouldRevalidate:f,...h},g){let{basename:x,navigator:y,unstable_useTransitions:v}=u.useContext(W),b=typeof d=="string"&&Hn.test(d),E=In(d,x);d=E.to;let C=Io(d,{relative:o}),S=re(),R=null;if(s){let j=qe(s,[],S.unstable_mask?S.unstable_mask.pathname:"/",!0);x!=="/"&&(j.pathname=j.pathname==="/"?x:Y([x,j.pathname])),R=y.createHref(j)}let[P,T,M]=pi(r,h),$=Ei(d,{replace:a,unstable_mask:s,state:l,target:c,preventScrollReset:p,relative:o,viewTransition:m,unstable_defaultShouldRevalidate:f,unstable_useTransitions:v});function D(j){t&&t(j),j.defaultPrevented||$(j)}let O=!(E.isExternal||i),L=u.createElement("a",{...h,...M,href:(O?R:void 0)||E.absoluteURL||C,onClick:O?D:t,ref:gi(g,T),target:c,"data-discover":!b&&n==="render"?"true":void 0});return P&&!b?u.createElement(u.Fragment,null,L,u.createElement(mi,{page:C})):L});Wn.displayName="Link";var wi=u.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:i,to:a,viewTransition:s,children:l,...c},d){let p=Ie(a,{relative:c.relative}),m=re(),f=u.useContext(Ye),{navigator:h,basename:g}=u.useContext(W),x=f!=null&&Pi(p)&&s===!0,y=h.encodeLocation?h.encodeLocation(p).pathname:p.pathname,v=m.pathname,b=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;n||(v=v.toLowerCase(),b=b?b.toLowerCase():null,y=y.toLowerCase()),b&&g&&(b=ee(b,g)||b);const E=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let C=v===y||!o&&v.startsWith(y)&&v.charAt(E)==="/",S=b!=null&&(b===y||!o&&b.startsWith(y)&&b.charAt(y.length)==="/"),R={isActive:C,isPending:S,isTransitioning:x},P=C?t:void 0,T;typeof r=="function"?T=r(R):T=[r,C?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let M=typeof i=="function"?i(R):i;return u.createElement(Wn,{...c,"aria-current":P,className:T,ref:d,style:M,to:a,viewTransition:s},typeof l=="function"?l(R):l)});wi.displayName="NavLink";var vi=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:i,method:a=_e,action:s,onSubmit:l,relative:c,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:m,...f},h)=>{let{unstable_useTransitions:g}=u.useContext(W),x=Si(),y=ki(s,{relative:c}),v=a.toLowerCase()==="get"?"get":"post",b=typeof s=="string"&&Hn.test(s),E=C=>{if(l&&l(C),C.defaultPrevented)return;C.preventDefault();let S=C.nativeEvent.submitter,R=(S==null?void 0:S.getAttribute("formmethod"))||a,P=()=>x(S||C.currentTarget,{fetcherKey:t,method:R,navigate:n,replace:o,state:i,relative:c,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:m});g&&n!==!1?u.startTransition(()=>P()):P()};return u.createElement("form",{ref:h,method:v,action:y,onSubmit:r?l:E,...f,"data-discover":!b&&e==="render"?"true":void 0})});vi.displayName="Form";function bi(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Un(e){let t=u.useContext(xe);return I(t,bi(e)),t}function Ei(e,{target:t,replace:n,unstable_mask:r,state:o,preventScrollReset:i,relative:a,viewTransition:s,unstable_defaultShouldRevalidate:l,unstable_useTransitions:c}={}){let d=Rt(),p=re(),m=Ie(e,{relative:a});return u.useCallback(f=>{if(Ko(f,t)){f.preventDefault();let h=n!==void 0?n:ke(p)===ke(m),g=()=>d(e,{replace:h,unstable_mask:r,state:o,preventScrollReset:i,relative:a,viewTransition:s,unstable_defaultShouldRevalidate:l});c?u.startTransition(()=>g()):g()}},[p,d,m,n,r,o,t,e,i,a,s,l,c])}var Ci=0,Ri=()=>`__${String(++Ci)}__`;function Si(){let{router:e}=Un("useSubmit"),{basename:t}=u.useContext(W),n=Wo(),r=e.fetch,o=e.navigate;return u.useCallback(async(i,a={})=>{let{action:s,method:l,encType:c,formData:d,body:p}=ni(i,t);if(a.navigate===!1){let m=a.fetcherKey||Ri();await r(m,n,a.action||s,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:d,body:p,formMethod:a.method||l,formEncType:a.encType||c,flushSync:a.flushSync})}else await o(a.action||s,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:d,body:p,formMethod:a.method||l,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,o,t,n])}function ki(e,{relative:t}={}){let{basename:n}=u.useContext(W),r=u.useContext(J);I(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),i={...Ie(e||".",{relative:t})},a=re();if(e==null){i.search=a.search;let s=new URLSearchParams(i.search),l=s.getAll("index");if(l.some(d=>d==="")){s.delete("index"),l.filter(p=>p).forEach(p=>s.append("index",p));let d=s.toString();i.search=d?`?${d}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:Y([n,i.pathname])),ke(i)}function Pi(e,{relative:t}={}){let n=u.useContext(On);I(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Un("useViewTransitionState"),o=Ie(e,{relative:t});if(!n.isTransitioning)return!1;let i=ee(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=ee(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ue(o.pathname,a)!=null||Ue(o.pathname,i)!=null}const Mi=({isActive:e,children:t,className:n="",...r})=>w.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${n}`,...r,children:t}),Li=e=>w.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:w.jsx("path",{d:"M20 6 9 17l-5-5"})}),Ii=e=>w.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[w.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),w.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function Ti(e){const t=[],n=/\/\/.*$/gm;let r;for(;(r=n.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-string"});t.sort((s,l)=>s.start-l.start);let i="",a=0;for(const s of t){if(s.start<a)continue;const l=e.slice(a,s.start);i+=an(l);const c=e.slice(s.start,s.end);i+=`<span class="${s.className}">${zn(c)}</span>`,a=s.end}return i+=an(e.slice(a)),i}function zn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function an(e){let t=zn(e);return t=t.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),t=t.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),t=t.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),t=t.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),t=t.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(n,r,o)=>n.includes('class="')?n:`<span class="code-function">${r}</span>${o}`),t=t.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),t}function Oi({code:e}){const[t,n]=u.useState(!1),r=u.useRef(null);u.useEffect(()=>{r.current&&(r.current.innerHTML=Ti(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),n(!0),setTimeout(()=>n(!1),2e3)};return w.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[w.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[w.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),w.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:t?w.jsxs(w.Fragment,{children:[w.jsx(Li,{className:"h-3.5 w-3.5"}),w.jsx("span",{children:"Copied"})]}):w.jsxs(w.Fragment,{children:[w.jsx(Ii,{className:"h-3.5 w-3.5"}),w.jsx("span",{children:"Copy"})]})})]}),w.jsx("div",{className:"overflow-x-auto p-4",children:w.jsx("pre",{className:"text-sm leading-relaxed",children:w.jsx("code",{ref:r,className:"font-mono"})})})]})}const ji=()=>w.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:w.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function Ni({children:e,path:t}){return w.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[t&&w.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:w.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:t})}),w.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const Vn=u.forwardRef(({isActive:e,children:t,className:n="",...r},o)=>w.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:t}));Vn.displayName="Link";const Ai=500,$i=20,Di=300,Fi="https://stackblitz.com",sn=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],_i=["project","search","ports","settings"],Bi=["light","dark"],Hi=["editor","preview"],ln={clickToLoad:e=>ce("ctl",e),devToolsHeight:e=>cn("devtoolsheight",e),forceEmbedLayout:e=>ce("embed",e),hideDevTools:e=>ce("hidedevtools",e),hideExplorer:e=>ce("hideExplorer",e),hideNavigation:e=>ce("hideNavigation",e),openFile:e=>$e("file",e),showSidebar:e=>Wi("showSidebar",e),sidebarView:e=>lt("sidebarView",e,_i),startScript:e=>$e("startScript",e),terminalHeight:e=>cn("terminalHeight",e),theme:e=>lt("theme",e,Bi),view:e=>lt("view",e,Hi),zenMode:e=>ce("zenMode",e),organization:e=>`${$e("orgName",e==null?void 0:e.name)}&${$e("orgProvider",e==null?void 0:e.provider)}`,crossOriginIsolated:e=>ce("corp",e)};function Jn(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&ln.hasOwnProperty(n)?ln[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function ce(e,t){return t===!0?`${e}=1`:""}function Wi(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function cn(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function lt(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function $e(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function Gn(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function Lt(e,t){return`${qn(t)}${e}${Jn(t)}`}function It(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${qn(n)}${e}${Jn(n)}`}function qn(e={}){return(typeof e.origin=="string"?e.origin:Fi).replace(/\/$/,"")}function Tt(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),Ui(t,n),zi(e,t,n),e.replaceWith(t)}function Ot(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function jt(e){return e&&e.newWindow===!1?"_self":"_blank"}function Ui(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${Di}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}function zi(e,t,n={}){var o,i;const r=((i=(o=e.allow)==null?void 0:o.split(";"))==null?void 0:i.map(a=>a.trim()))??[];n.crossOriginIsolated&&!r.includes("cross-origin-isolated")&&r.push("cross-origin-isolated"),r.length>0&&(t.allow=r.join("; "))}class Vi{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,o)=>{const i=Gn();this.pending[i]={resolve:r,reject:o},this.port.postMessage({type:t,payload:{...n,__reqid:i}})})}messageListener(t){var s;if(typeof((s=t.data.payload)==null?void 0:s.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:o,__success:i,__error:a}=r;this.pending[o]&&(i?this.pending[o].resolve(this.cleanResult(r)):this.pending[o].reject(a?`${n}: ${a}`:n),delete this.pending[o])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class Ji{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new Vi(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const He=[];class Gi{constructor(t){this.id=Gn(),this.element=t,this.pending=new Promise((n,r)=>{const o=({data:c,ports:d})=>{(c==null?void 0:c.action)==="SDK_INIT_SUCCESS"&&c.id===this.id&&(this.vm=new Ji(d[0],c.payload),n(this.vm),a())},i=()=>{var c;(c=this.element.contentWindow)==null||c.postMessage({action:"SDK_INIT",id:this.id},"*")};function a(){window.clearInterval(l),window.removeEventListener("message",o)}window.addEventListener("message",o),i();let s=0;const l=window.setInterval(()=>{if(this.vm){a();return}if(s>=$i){a(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),He.forEach((c,d)=>{c.id===this.id&&He.splice(d,1)});return}s++,i()},Ai)}),He.push(this)}}const qi=e=>{const t=e instanceof Element?"element":"id";return He.find(n=>n[t]===e)??null};function Yi(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function Xi(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function Yn({template:e,title:t,description:n,dependencies:r,files:o,settings:i}){if(!sn.includes(e)){const c=sn.map(d=>`'${d}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${c}`)}const a=[],s=(c,d,p="")=>{a.push(Yi(c,typeof d=="string"?d:p))};s("project[title]",t),typeof n=="string"&&n.length>0&&s("project[description]",n),s("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):s("project[dependencies]",JSON.stringify(r))),i&&s("project[settings]",JSON.stringify(i)),Object.entries(o).forEach(([c,d])=>{s(`project[files][${Xi(c)}]`,d)});const l=document.createElement("form");return l.method="POST",l.setAttribute("style","display:none!important;"),l.append(...a),l}function Qi(e,t){const n=Yn(e);return n.action=It("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function Zi(e,t){const n=Yn(e);n.action=Lt("/run",t),n.target=jt(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function Qe(e){return e!=null&&e.contentWindow?(qi(e)??new Gi(e)).pending:Promise.reject("Provided element is not an iframe.")}function Ki(e,t){Zi(e,t)}function ea(e,t){const n=Lt(`/edit/${e}`,t),r=jt(t);window.open(n,r)}function ta(e,t){const n=Lt(`/github/${e}`,t),r=jt(t);window.open(n,r)}function na(e,t,n){var a;const r=Ot(e),o=Qi(t,n),i=document.createElement("iframe");return Tt(r,i,n),(a=i.contentDocument)==null||a.write(o),Qe(i)}function ra(e,t,n){const r=Ot(e),o=document.createElement("iframe");return o.src=It(`/edit/${t}`,n),Tt(r,o,n),Qe(o)}function oa(e,t,n){const r=Ot(e),o=document.createElement("iframe");return o.src=It(`/github/${t}`,n),Tt(r,o,n),Qe(o)}const ia={connect:Qe,embedGithubProject:oa,embedProject:na,embedProjectId:ra,openGithubProject:ta,openProject:Ki,openProjectId:ea};function K(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function un(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Xn(...e){return t=>{let n=!1;const r=e.map(o=>{const i=un(o,t);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let o=0;o<r.length;o++){const i=r[o];typeof i=="function"?i():un(e[o],null)}}}}function me(...e){return u.useCallback(Xn(...e),e)}function Qn(e,t=[]){let n=[];function r(i,a){const s=u.createContext(a),l=n.length;n=[...n,a];const c=p=>{var y;const{scope:m,children:f,...h}=p,g=((y=m==null?void 0:m[e])==null?void 0:y[l])||s,x=u.useMemo(()=>h,Object.values(h));return w.jsx(g.Provider,{value:x,children:f})};c.displayName=i+"Provider";function d(p,m){var g;const f=((g=m==null?void 0:m[e])==null?void 0:g[l])||s,h=u.useContext(f);if(h)return h;if(a!==void 0)return a;throw new Error(`\`${p}\` must be used within \`${i}\``)}return[c,d]}const o=()=>{const i=n.map(a=>u.createContext(a));return function(s){const l=(s==null?void 0:s[e])||i;return u.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return o.scopeName=e,[r,aa(o,...t)]}function aa(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(i){const a=r.reduce((s,{useScope:l,scopeName:c})=>{const p=l(i)[`__scope${c}`];return{...s,...p}},{});return u.useMemo(()=>({[`__scope${t.scopeName}`]:a}),[a])}};return n.scopeName=t.scopeName,n}function sa(e){const t=la(e),n=u.forwardRef((r,o)=>{const{children:i,...a}=r,s=u.Children.toArray(i),l=s.find(ua);if(l){const c=l.props.children,d=s.map(p=>p===l?u.Children.count(c)>1?u.Children.only(null):u.isValidElement(c)?c.props.children:null:p);return w.jsx(t,{...a,ref:o,children:u.isValidElement(c)?u.cloneElement(c,void 0,d):null})}return w.jsx(t,{...a,ref:o,children:i})});return n.displayName=`${e}.Slot`,n}function la(e){const t=u.forwardRef((n,r)=>{const{children:o,...i}=n;if(u.isValidElement(o)){const a=pa(o),s=da(i,o.props);return o.type!==u.Fragment&&(s.ref=r?Xn(r,a):a),u.cloneElement(o,s)}return u.Children.count(o)>1?u.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Zn=Symbol("radix.slottable");function ca(e){const t=({children:n})=>w.jsx(w.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=Zn,t}function ua(e){return u.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Zn}function da(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...s)=>{const l=i(...s);return o(...s),l}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}function pa(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var ma=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=ma.reduce((e,t)=>{const n=sa(`Primitive.${t}`),r=u.forwardRef((o,i)=>{const{asChild:a,...s}=o,l=a?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),w.jsx(l,{...s,ref:i})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function fa(e,t){e&&Rn.flushSync(()=>e.dispatchEvent(t))}function Ze(e){const t=u.useRef(e);return u.useEffect(()=>{t.current=e}),u.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function ha(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e);u.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var ga="DismissableLayer",gt="dismissableLayer.update",ya="dismissableLayer.pointerDownOutside",xa="dismissableLayer.focusOutside",dn,Kn=u.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),er=u.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:i,onInteractOutside:a,onDismiss:s,...l}=e,c=u.useContext(Kn),[d,p]=u.useState(null),m=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,f]=u.useState({}),h=me(t,R=>p(R)),g=Array.from(c.layers),[x]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),y=g.indexOf(x),v=d?g.indexOf(d):-1,b=c.layersWithOutsidePointerEventsDisabled.size>0,E=v>=y,C=ba(R=>{const P=R.target,T=[...c.branches].some(M=>M.contains(P));!E||T||(o==null||o(R),a==null||a(R),R.defaultPrevented||s==null||s())},m),S=Ea(R=>{const P=R.target;[...c.branches].some(M=>M.contains(P))||(i==null||i(R),a==null||a(R),R.defaultPrevented||s==null||s())},m);return ha(R=>{v===c.layers.size-1&&(r==null||r(R),!R.defaultPrevented&&s&&(R.preventDefault(),s()))},m),u.useEffect(()=>{if(d)return n&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(dn=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(d)),c.layers.add(d),pn(),()=>{n&&c.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=dn)}},[d,m,n,c]),u.useEffect(()=>()=>{d&&(c.layers.delete(d),c.layersWithOutsidePointerEventsDisabled.delete(d),pn())},[d,c]),u.useEffect(()=>{const R=()=>f({});return document.addEventListener(gt,R),()=>document.removeEventListener(gt,R)},[]),w.jsx(le.div,{...l,ref:h,style:{pointerEvents:b?E?"auto":"none":void 0,...e.style},onFocusCapture:K(e.onFocusCapture,S.onFocusCapture),onBlurCapture:K(e.onBlurCapture,S.onBlurCapture),onPointerDownCapture:K(e.onPointerDownCapture,C.onPointerDownCapture)})});er.displayName=ga;var wa="DismissableLayerBranch",va=u.forwardRef((e,t)=>{const n=u.useContext(Kn),r=u.useRef(null),o=me(t,r);return u.useEffect(()=>{const i=r.current;if(i)return n.branches.add(i),()=>{n.branches.delete(i)}},[n.branches]),w.jsx(le.div,{...e,ref:o})});va.displayName=wa;function ba(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e),r=u.useRef(!1),o=u.useRef(()=>{});return u.useEffect(()=>{const i=s=>{if(s.target&&!r.current){let l=function(){tr(ya,n,c,{discrete:!0})};const c={originalEvent:s};s.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=l,t.addEventListener("click",o.current,{once:!0})):l()}else t.removeEventListener("click",o.current);r.current=!1},a=window.setTimeout(()=>{t.addEventListener("pointerdown",i)},0);return()=>{window.clearTimeout(a),t.removeEventListener("pointerdown",i),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Ea(e,t=globalThis==null?void 0:globalThis.document){const n=Ze(e),r=u.useRef(!1);return u.useEffect(()=>{const o=i=>{i.target&&!r.current&&tr(xa,n,{originalEvent:i},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function pn(){const e=new CustomEvent(gt);document.dispatchEvent(e)}function tr(e,t,n,{discrete:r}){const o=n.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?fa(o,i):o.dispatchEvent(i)}var ie=globalThis!=null&&globalThis.document?u.useLayoutEffect:()=>{},Ca=Sn[" useId ".trim().toString()]||(()=>{}),Ra=0;function Sa(e){const[t,n]=u.useState(Ca());return ie(()=>{n(r=>r??String(Ra++))},[e]),t?`radix-${t}`:""}const ka=["top","right","bottom","left"],ae=Math.min,B=Math.max,ze=Math.round,De=Math.floor,X=e=>({x:e,y:e}),Pa={left:"right",right:"left",bottom:"top",top:"bottom"};function yt(e,t,n){return B(e,ae(t,n))}function te(e,t){return typeof e=="function"?e(t):e}function ne(e){return e.split("-")[0]}function ve(e){return e.split("-")[1]}function Nt(e){return e==="x"?"y":"x"}function At(e){return e==="y"?"height":"width"}function q(e){const t=e[0];return t==="t"||t==="b"?"y":"x"}function $t(e){return Nt(q(e))}function Ma(e,t,n){n===void 0&&(n=!1);const r=ve(e),o=$t(e),i=At(o);let a=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(a=Ve(a)),[a,Ve(a)]}function La(e){const t=Ve(e);return[xt(e),t,xt(t)]}function xt(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const mn=["left","right"],fn=["right","left"],Ia=["top","bottom"],Ta=["bottom","top"];function Oa(e,t,n){switch(e){case"top":case"bottom":return n?t?fn:mn:t?mn:fn;case"left":case"right":return t?Ia:Ta;default:return[]}}function ja(e,t,n,r){const o=ve(e);let i=Oa(ne(e),n==="start",r);return o&&(i=i.map(a=>a+"-"+o),t&&(i=i.concat(i.map(xt)))),i}function Ve(e){const t=ne(e);return Pa[t]+e.slice(t.length)}function Na(e){return{top:0,right:0,bottom:0,left:0,...e}}function nr(e){return typeof e!="number"?Na(e):{top:e,right:e,bottom:e,left:e}}function Je(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function hn(e,t,n){let{reference:r,floating:o}=e;const i=q(t),a=$t(t),s=At(a),l=ne(t),c=i==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,m=r[s]/2-o[s]/2;let f;switch(l){case"top":f={x:d,y:r.y-o.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:p};break;case"left":f={x:r.x-o.width,y:p};break;default:f={x:r.x,y:r.y}}switch(ve(t)){case"start":f[a]-=m*(n&&c?-1:1);break;case"end":f[a]+=m*(n&&c?-1:1);break}return f}async function Aa(e,t){var n;t===void 0&&(t={});const{x:r,y:o,platform:i,rects:a,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=te(t,e),h=nr(f),x=s[m?p==="floating"?"reference":"floating":p],y=Je(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(x)))==null||n?x:x.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(s.floating)),boundary:c,rootBoundary:d,strategy:l})),v=p==="floating"?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,b=await(i.getOffsetParent==null?void 0:i.getOffsetParent(s.floating)),E=await(i.isElement==null?void 0:i.isElement(b))?await(i.getScale==null?void 0:i.getScale(b))||{x:1,y:1}:{x:1,y:1},C=Je(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:v,offsetParent:b,strategy:l}):v);return{top:(y.top-C.top+h.top)/E.y,bottom:(C.bottom-y.bottom+h.bottom)/E.y,left:(y.left-C.left+h.left)/E.x,right:(C.right-y.right+h.right)/E.x}}const $a=50,Da=async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:a}=n,s=a.detectOverflow?a:{...a,detectOverflow:Aa},l=await(a.isRTL==null?void 0:a.isRTL(t));let c=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:d,y:p}=hn(c,r,l),m=r,f=0;const h={};for(let g=0;g<i.length;g++){const x=i[g];if(!x)continue;const{name:y,fn:v}=x,{x:b,y:E,data:C,reset:S}=await v({x:d,y:p,initialPlacement:r,placement:m,strategy:o,middlewareData:h,rects:c,platform:s,elements:{reference:e,floating:t}});d=b??d,p=E??p,h[y]={...h[y],...C},S&&f<$a&&(f++,typeof S=="object"&&(S.placement&&(m=S.placement),S.rects&&(c=S.rects===!0?await a.getElementRects({reference:e,floating:t,strategy:o}):S.rects),{x:d,y:p}=hn(c,m,l)),g=-1)}return{x:d,y:p,placement:m,strategy:o,middlewareData:h}},Fa=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:i,platform:a,elements:s,middlewareData:l}=t,{element:c,padding:d=0}=te(e,t)||{};if(c==null)return{};const p=nr(d),m={x:n,y:r},f=$t(o),h=At(f),g=await a.getDimensions(c),x=f==="y",y=x?"top":"left",v=x?"bottom":"right",b=x?"clientHeight":"clientWidth",E=i.reference[h]+i.reference[f]-m[f]-i.floating[h],C=m[f]-i.reference[f],S=await(a.getOffsetParent==null?void 0:a.getOffsetParent(c));let R=S?S[b]:0;(!R||!await(a.isElement==null?void 0:a.isElement(S)))&&(R=s.floating[b]||i.floating[h]);const P=E/2-C/2,T=R/2-g[h]/2-1,M=ae(p[y],T),$=ae(p[v],T),D=M,O=R-g[h]-$,L=R/2-g[h]/2+P,j=yt(D,L,O),N=!l.arrow&&ve(o)!=null&&L!==j&&i.reference[h]/2-(L<D?M:$)-g[h]/2<0,A=N?L<D?L-D:L-O:0;return{[f]:m[f]+A,data:{[f]:j,centerOffset:L-j-A,...N&&{alignmentOffset:A}},reset:N}}}),_a=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:i,rects:a,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:g=!0,...x}=te(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const y=ne(o),v=q(s),b=ne(s)===s,E=await(l.isRTL==null?void 0:l.isRTL(c.floating)),C=m||(b||!g?[Ve(s)]:La(s)),S=h!=="none";!m&&S&&C.push(...ja(s,g,h,E));const R=[s,...C],P=await l.detectOverflow(t,x),T=[];let M=((r=i.flip)==null?void 0:r.overflows)||[];if(d&&T.push(P[y]),p){const L=Ma(o,a,E);T.push(P[L[0]],P[L[1]])}if(M=[...M,{placement:o,overflows:T}],!T.every(L=>L<=0)){var $,D;const L=((($=i.flip)==null?void 0:$.index)||0)+1,j=R[L];if(j&&(!(p==="alignment"?v!==q(j):!1)||M.every(k=>q(k.placement)===v?k.overflows[0]>0:!0)))return{data:{index:L,overflows:M},reset:{placement:j}};let N=(D=M.filter(A=>A.overflows[0]<=0).sort((A,k)=>A.overflows[1]-k.overflows[1])[0])==null?void 0:D.placement;if(!N)switch(f){case"bestFit":{var O;const A=(O=M.filter(k=>{if(S){const F=q(k.placement);return F===v||F==="y"}return!0}).map(k=>[k.placement,k.overflows.filter(F=>F>0).reduce((F,G)=>F+G,0)]).sort((k,F)=>k[1]-F[1])[0])==null?void 0:O[0];A&&(N=A);break}case"initialPlacement":N=s;break}if(o!==N)return{reset:{placement:N}}}return{}}}};function gn(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function yn(e){return ka.some(t=>e[t]>=0)}const Ba=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n,platform:r}=t,{strategy:o="referenceHidden",...i}=te(e,t);switch(o){case"referenceHidden":{const a=await r.detectOverflow(t,{...i,elementContext:"reference"}),s=gn(a,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:yn(s)}}}case"escaped":{const a=await r.detectOverflow(t,{...i,altBoundary:!0}),s=gn(a,n.floating);return{data:{escapedOffsets:s,escaped:yn(s)}}}default:return{}}}}},rr=new Set(["left","top"]);async function Ha(e,t){const{placement:n,platform:r,elements:o}=e,i=await(r.isRTL==null?void 0:r.isRTL(o.floating)),a=ne(n),s=ve(n),l=q(n)==="y",c=rr.has(a)?-1:1,d=i&&l?-1:1,p=te(t,e);let{mainAxis:m,crossAxis:f,alignmentAxis:h}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return s&&typeof h=="number"&&(f=s==="end"?h*-1:h),l?{x:f*d,y:m*c}:{x:m*c,y:f*d}}const Wa=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:i,placement:a,middlewareData:s}=t,l=await Ha(t,e);return a===((n=s.offset)==null?void 0:n.placement)&&(r=s.arrow)!=null&&r.alignmentOffset?{}:{x:o+l.x,y:i+l.y,data:{...l,placement:a}}}}},Ua=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o,platform:i}=t,{mainAxis:a=!0,crossAxis:s=!1,limiter:l={fn:y=>{let{x:v,y:b}=y;return{x:v,y:b}}},...c}=te(e,t),d={x:n,y:r},p=await i.detectOverflow(t,c),m=q(ne(o)),f=Nt(m);let h=d[f],g=d[m];if(a){const y=f==="y"?"top":"left",v=f==="y"?"bottom":"right",b=h+p[y],E=h-p[v];h=yt(b,h,E)}if(s){const y=m==="y"?"top":"left",v=m==="y"?"bottom":"right",b=g+p[y],E=g-p[v];g=yt(b,g,E)}const x=l.fn({...t,[f]:h,[m]:g});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:a,[m]:s}}}}}},za=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:o,rects:i,middlewareData:a}=t,{offset:s=0,mainAxis:l=!0,crossAxis:c=!0}=te(e,t),d={x:n,y:r},p=q(o),m=Nt(p);let f=d[m],h=d[p];const g=te(s,t),x=typeof g=="number"?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(l){const b=m==="y"?"height":"width",E=i.reference[m]-i.floating[b]+x.mainAxis,C=i.reference[m]+i.reference[b]-x.mainAxis;f<E?f=E:f>C&&(f=C)}if(c){var y,v;const b=m==="y"?"width":"height",E=rr.has(ne(o)),C=i.reference[p]-i.floating[b]+(E&&((y=a.offset)==null?void 0:y[p])||0)+(E?0:x.crossAxis),S=i.reference[p]+i.reference[b]+(E?0:((v=a.offset)==null?void 0:v[p])||0)-(E?x.crossAxis:0);h<C?h=C:h>S&&(h=S)}return{[m]:f,[p]:h}}}},Va=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:o,rects:i,platform:a,elements:s}=t,{apply:l=()=>{},...c}=te(e,t),d=await a.detectOverflow(t,c),p=ne(o),m=ve(o),f=q(o)==="y",{width:h,height:g}=i.floating;let x,y;p==="top"||p==="bottom"?(x=p,y=m===(await(a.isRTL==null?void 0:a.isRTL(s.floating))?"start":"end")?"left":"right"):(y=p,x=m==="end"?"top":"bottom");const v=g-d.top-d.bottom,b=h-d.left-d.right,E=ae(g-d[x],v),C=ae(h-d[y],b),S=!t.middlewareData.shift;let R=E,P=C;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(P=b),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(R=v),S&&!m){const M=B(d.left,0),$=B(d.right,0),D=B(d.top,0),O=B(d.bottom,0);f?P=h-2*(M!==0||$!==0?M+$:B(d.left,d.right)):R=g-2*(D!==0||O!==0?D+O:B(d.top,d.bottom))}await l({...t,availableWidth:P,availableHeight:R});const T=await a.getDimensions(s.floating);return h!==T.width||g!==T.height?{reset:{rects:!0}}:{}}}};function Ke(){return typeof window<"u"}function be(e){return or(e)?(e.nodeName||"").toLowerCase():"#document"}function H(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Q(e){var t;return(t=(or(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function or(e){return Ke()?e instanceof Node||e instanceof H(e).Node:!1}function z(e){return Ke()?e instanceof Element||e instanceof H(e).Element:!1}function oe(e){return Ke()?e instanceof HTMLElement||e instanceof H(e).HTMLElement:!1}function xn(e){return!Ke()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof H(e).ShadowRoot}function Te(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=V(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&o!=="inline"&&o!=="contents"}function Ja(e){return/^(table|td|th)$/.test(be(e))}function et(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const Ga=/transform|translate|scale|rotate|perspective|filter/,qa=/paint|layout|strict|content/,ue=e=>!!e&&e!=="none";let ct;function Dt(e){const t=z(e)?V(e):e;return ue(t.transform)||ue(t.translate)||ue(t.scale)||ue(t.rotate)||ue(t.perspective)||!Ft()&&(ue(t.backdropFilter)||ue(t.filter))||Ga.test(t.willChange||"")||qa.test(t.contain||"")}function Ya(e){let t=se(e);for(;oe(t)&&!he(t);){if(Dt(t))return t;if(et(t))return null;t=se(t)}return null}function Ft(){return ct==null&&(ct=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),ct}function he(e){return/^(html|body|#document)$/.test(be(e))}function V(e){return H(e).getComputedStyle(e)}function tt(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function se(e){if(be(e)==="html")return e;const t=e.assignedSlot||e.parentNode||xn(e)&&e.host||Q(e);return xn(t)?t.host:t}function ir(e){const t=se(e);return he(t)?e.ownerDocument?e.ownerDocument.body:e.body:oe(t)&&Te(t)?t:ir(t)}function Pe(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=ir(e),i=o===((r=e.ownerDocument)==null?void 0:r.body),a=H(o);if(i){const s=wt(a);return t.concat(a,a.visualViewport||[],Te(o)?o:[],s&&n?Pe(s):[])}else return t.concat(o,Pe(o,[],n))}function wt(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ar(e){const t=V(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=oe(e),i=o?e.offsetWidth:n,a=o?e.offsetHeight:r,s=ze(n)!==i||ze(r)!==a;return s&&(n=i,r=a),{width:n,height:r,$:s}}function _t(e){return z(e)?e:e.contextElement}function fe(e){const t=_t(e);if(!oe(t))return X(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:i}=ar(t);let a=(i?ze(n.width):n.width)/r,s=(i?ze(n.height):n.height)/o;return(!a||!Number.isFinite(a))&&(a=1),(!s||!Number.isFinite(s))&&(s=1),{x:a,y:s}}const Xa=X(0);function sr(e){const t=H(e);return!Ft()||!t.visualViewport?Xa:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Qa(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==H(e)?!1:t}function pe(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),i=_t(e);let a=X(1);t&&(r?z(r)&&(a=fe(r)):a=fe(e));const s=Qa(i,n,r)?sr(i):X(0);let l=(o.left+s.x)/a.x,c=(o.top+s.y)/a.y,d=o.width/a.x,p=o.height/a.y;if(i){const m=H(i),f=r&&z(r)?H(r):r;let h=m,g=wt(h);for(;g&&r&&f!==h;){const x=fe(g),y=g.getBoundingClientRect(),v=V(g),b=y.left+(g.clientLeft+parseFloat(v.paddingLeft))*x.x,E=y.top+(g.clientTop+parseFloat(v.paddingTop))*x.y;l*=x.x,c*=x.y,d*=x.x,p*=x.y,l+=b,c+=E,h=H(g),g=wt(h)}}return Je({width:d,height:p,x:l,y:c})}function nt(e,t){const n=tt(e).scrollLeft;return t?t.left+n:pe(Q(e)).left+n}function lr(e,t){const n=e.getBoundingClientRect(),r=n.left+t.scrollLeft-nt(e,n),o=n.top+t.scrollTop;return{x:r,y:o}}function Za(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const i=o==="fixed",a=Q(r),s=t?et(t.floating):!1;if(r===a||s&&i)return n;let l={scrollLeft:0,scrollTop:0},c=X(1);const d=X(0),p=oe(r);if((p||!p&&!i)&&((be(r)!=="body"||Te(a))&&(l=tt(r)),p)){const f=pe(r);c=fe(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}const m=a&&!p&&!i?lr(a,l):X(0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-l.scrollLeft*c.x+d.x+m.x,y:n.y*c.y-l.scrollTop*c.y+d.y+m.y}}function Ka(e){return Array.from(e.getClientRects())}function es(e){const t=Q(e),n=tt(e),r=e.ownerDocument.body,o=B(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=B(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-n.scrollLeft+nt(e);const s=-n.scrollTop;return V(r).direction==="rtl"&&(a+=B(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:a,y:s}}const wn=25;function ts(e,t){const n=H(e),r=Q(e),o=n.visualViewport;let i=r.clientWidth,a=r.clientHeight,s=0,l=0;if(o){i=o.width,a=o.height;const d=Ft();(!d||d&&t==="fixed")&&(s=o.offsetLeft,l=o.offsetTop)}const c=nt(r);if(c<=0){const d=r.ownerDocument,p=d.body,m=getComputedStyle(p),f=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,h=Math.abs(r.clientWidth-p.clientWidth-f);h<=wn&&(i-=h)}else c<=wn&&(i+=c);return{width:i,height:a,x:s,y:l}}function ns(e,t){const n=pe(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=oe(e)?fe(e):X(1),a=e.clientWidth*i.x,s=e.clientHeight*i.y,l=o*i.x,c=r*i.y;return{width:a,height:s,x:l,y:c}}function vn(e,t,n){let r;if(t==="viewport")r=ts(e,n);else if(t==="document")r=es(Q(e));else if(z(t))r=ns(t,n);else{const o=sr(e);r={x:t.x-o.x,y:t.y-o.y,width:t.width,height:t.height}}return Je(r)}function cr(e,t){const n=se(e);return n===t||!z(n)||he(n)?!1:V(n).position==="fixed"||cr(n,t)}function rs(e,t){const n=t.get(e);if(n)return n;let r=Pe(e,[],!1).filter(s=>z(s)&&be(s)!=="body"),o=null;const i=V(e).position==="fixed";let a=i?se(e):e;for(;z(a)&&!he(a);){const s=V(a),l=Dt(a);!l&&s.position==="fixed"&&(o=null),(i?!l&&!o:!l&&s.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||Te(a)&&!l&&cr(e,a))?r=r.filter(d=>d!==a):o=s,a=se(a)}return t.set(e,r),r}function os(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const a=[...n==="clippingAncestors"?et(t)?[]:rs(t,this._c):[].concat(n),r],s=vn(t,a[0],o);let l=s.top,c=s.right,d=s.bottom,p=s.left;for(let m=1;m<a.length;m++){const f=vn(t,a[m],o);l=B(f.top,l),c=ae(f.right,c),d=ae(f.bottom,d),p=B(f.left,p)}return{width:c-p,height:d-l,x:p,y:l}}function is(e){const{width:t,height:n}=ar(e);return{width:t,height:n}}function as(e,t,n){const r=oe(t),o=Q(t),i=n==="fixed",a=pe(e,!0,i,t);let s={scrollLeft:0,scrollTop:0};const l=X(0);function c(){l.x=nt(o)}if(r||!r&&!i)if((be(t)!=="body"||Te(o))&&(s=tt(t)),r){const f=pe(t,!0,i,t);l.x=f.x+t.clientLeft,l.y=f.y+t.clientTop}else o&&c();i&&!r&&o&&c();const d=o&&!r&&!i?lr(o,s):X(0),p=a.left+s.scrollLeft-l.x-d.x,m=a.top+s.scrollTop-l.y-d.y;return{x:p,y:m,width:a.width,height:a.height}}function ut(e){return V(e).position==="static"}function bn(e,t){if(!oe(e)||V(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return Q(e)===n&&(n=n.ownerDocument.body),n}function ur(e,t){const n=H(e);if(et(e))return n;if(!oe(e)){let o=se(e);for(;o&&!he(o);){if(z(o)&&!ut(o))return o;o=se(o)}return n}let r=bn(e,t);for(;r&&Ja(r)&&ut(r);)r=bn(r,t);return r&&he(r)&&ut(r)&&!Dt(r)?n:r||Ya(e)||n}const ss=async function(e){const t=this.getOffsetParent||ur,n=this.getDimensions,r=await n(e.floating);return{reference:as(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ls(e){return V(e).direction==="rtl"}const cs={convertOffsetParentRelativeRectToViewportRelativeRect:Za,getDocumentElement:Q,getClippingRect:os,getOffsetParent:ur,getElementRects:ss,getClientRects:Ka,getDimensions:is,getScale:fe,isElement:z,isRTL:ls};function dr(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function us(e,t){let n=null,r;const o=Q(e);function i(){var s;clearTimeout(r),(s=n)==null||s.disconnect(),n=null}function a(s,l){s===void 0&&(s=!1),l===void 0&&(l=1),i();const c=e.getBoundingClientRect(),{left:d,top:p,width:m,height:f}=c;if(s||t(),!m||!f)return;const h=De(p),g=De(o.clientWidth-(d+m)),x=De(o.clientHeight-(p+f)),y=De(d),b={rootMargin:-h+"px "+-g+"px "+-x+"px "+-y+"px",threshold:B(0,ae(1,l))||1};let E=!0;function C(S){const R=S[0].intersectionRatio;if(R!==l){if(!E)return a();R?a(!1,R):r=setTimeout(()=>{a(!1,1e-7)},1e3)}R===1&&!dr(c,e.getBoundingClientRect())&&a(),E=!1}try{n=new IntersectionObserver(C,{...b,root:o.ownerDocument})}catch{n=new IntersectionObserver(C,b)}n.observe(e)}return a(!0),i}function ds(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,c=_t(e),d=o||i?[...c?Pe(c):[],...t?Pe(t):[]]:[];d.forEach(y=>{o&&y.addEventListener("scroll",n,{passive:!0}),i&&y.addEventListener("resize",n)});const p=c&&s?us(c,n):null;let m=-1,f=null;a&&(f=new ResizeObserver(y=>{let[v]=y;v&&v.target===c&&f&&t&&(f.unobserve(t),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var b;(b=f)==null||b.observe(t)})),n()}),c&&!l&&f.observe(c),t&&f.observe(t));let h,g=l?pe(e):null;l&&x();function x(){const y=pe(e);g&&!dr(g,y)&&n(),g=y,h=requestAnimationFrame(x)}return n(),()=>{var y;d.forEach(v=>{o&&v.removeEventListener("scroll",n),i&&v.removeEventListener("resize",n)}),p==null||p(),(y=f)==null||y.disconnect(),f=null,l&&cancelAnimationFrame(h)}}const ps=Wa,ms=Ua,fs=_a,hs=Va,gs=Ba,En=Fa,ys=za,xs=(e,t,n)=>{const r=new Map,o={platform:cs,...n},i={...o.platform,_c:r};return Da(e,t,{...o,platform:i})};var ws=typeof document<"u",vs=function(){},We=ws?u.useLayoutEffect:vs;function Ge(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!Ge(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;r--!==0;){const i=o[r];if(!(i==="_owner"&&e.$$typeof)&&!Ge(e[i],t[i]))return!1}return!0}return e!==e&&t!==t}function pr(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Cn(e,t){const n=pr(e);return Math.round(t*n)/n}function dt(e){const t=u.useRef(e);return We(()=>{t.current=e}),t}function bs(e){e===void 0&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:i,floating:a}={},transform:s=!0,whileElementsMounted:l,open:c}=e,[d,p]=u.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[m,f]=u.useState(r);Ge(m,r)||f(r);const[h,g]=u.useState(null),[x,y]=u.useState(null),v=u.useCallback(k=>{k!==S.current&&(S.current=k,g(k))},[]),b=u.useCallback(k=>{k!==R.current&&(R.current=k,y(k))},[]),E=i||h,C=a||x,S=u.useRef(null),R=u.useRef(null),P=u.useRef(d),T=l!=null,M=dt(l),$=dt(o),D=dt(c),O=u.useCallback(()=>{if(!S.current||!R.current)return;const k={placement:t,strategy:n,middleware:m};$.current&&(k.platform=$.current),xs(S.current,R.current,k).then(F=>{const G={...F,isPositioned:D.current!==!1};L.current&&!Ge(P.current,G)&&(P.current=G,Rn.flushSync(()=>{p(G)}))})},[m,t,n,$,D]);We(()=>{c===!1&&P.current.isPositioned&&(P.current.isPositioned=!1,p(k=>({...k,isPositioned:!1})))},[c]);const L=u.useRef(!1);We(()=>(L.current=!0,()=>{L.current=!1}),[]),We(()=>{if(E&&(S.current=E),C&&(R.current=C),E&&C){if(M.current)return M.current(E,C,O);O()}},[E,C,O,M,T]);const j=u.useMemo(()=>({reference:S,floating:R,setReference:v,setFloating:b}),[v,b]),N=u.useMemo(()=>({reference:E,floating:C}),[E,C]),A=u.useMemo(()=>{const k={position:n,left:0,top:0};if(!N.floating)return k;const F=Cn(N.floating,d.x),G=Cn(N.floating,d.y);return s?{...k,transform:"translate("+F+"px, "+G+"px)",...pr(N.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:F,top:G}},[n,s,N.floating,d.x,d.y]);return u.useMemo(()=>({...d,update:O,refs:j,elements:N,floatingStyles:A}),[d,O,j,N,A])}const Es=e=>{function t(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:e,fn(n){const{element:r,padding:o}=typeof e=="function"?e(n):e;return r&&t(r)?r.current!=null?En({element:r.current,padding:o}).fn(n):{}:r?En({element:r,padding:o}).fn(n):{}}}},Cs=(e,t)=>{const n=ps(e);return{name:n.name,fn:n.fn,options:[e,t]}},Rs=(e,t)=>{const n=ms(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ss=(e,t)=>({fn:ys(e).fn,options:[e,t]}),ks=(e,t)=>{const n=fs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ps=(e,t)=>{const n=hs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ms=(e,t)=>{const n=gs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ls=(e,t)=>{const n=Es(e);return{name:n.name,fn:n.fn,options:[e,t]}};var Is="Arrow",mr=u.forwardRef((e,t)=>{const{children:n,width:r=10,height:o=5,...i}=e;return w.jsx(le.svg,{...i,ref:t,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:w.jsx("polygon",{points:"0,0 30,0 15,10"})})});mr.displayName=Is;var Ts=mr;function Os(e){const[t,n]=u.useState(void 0);return ie(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const i=o[0];let a,s;if("borderBoxSize"in i){const l=i.borderBoxSize,c=Array.isArray(l)?l[0]:l;a=c.inlineSize,s=c.blockSize}else a=e.offsetWidth,s=e.offsetHeight;n({width:a,height:s})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}var Bt="Popper",[fr,hr]=Qn(Bt),[js,gr]=fr(Bt),yr=e=>{const{__scopePopper:t,children:n}=e,[r,o]=u.useState(null);return w.jsx(js,{scope:t,anchor:r,onAnchorChange:o,children:n})};yr.displayName=Bt;var xr="PopperAnchor",wr=u.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...o}=e,i=gr(xr,n),a=u.useRef(null),s=me(t,a),l=u.useRef(null);return u.useEffect(()=>{const c=l.current;l.current=(r==null?void 0:r.current)||a.current,c!==l.current&&i.onAnchorChange(l.current)}),r?null:w.jsx(le.div,{...o,ref:s})});wr.displayName=xr;var Ht="PopperContent",[Ns,As]=fr(Ht),vr=u.forwardRef((e,t)=>{var Vt,Jt,Gt,qt,Yt,Xt;const{__scopePopper:n,side:r="bottom",sideOffset:o=0,align:i="center",alignOffset:a=0,arrowPadding:s=0,avoidCollisions:l=!0,collisionBoundary:c=[],collisionPadding:d=0,sticky:p="partial",hideWhenDetached:m=!1,updatePositionStrategy:f="optimized",onPlaced:h,...g}=e,x=gr(Ht,n),[y,v]=u.useState(null),b=me(t,Re=>v(Re)),[E,C]=u.useState(null),S=Os(E),R=(S==null?void 0:S.width)??0,P=(S==null?void 0:S.height)??0,T=r+(i!=="center"?"-"+i:""),M=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},$=Array.isArray(c)?c:[c],D=$.length>0,O={padding:M,boundary:$.filter(Ds),altBoundary:D},{refs:L,floatingStyles:j,placement:N,isPositioned:A,middlewareData:k}=bs({strategy:"fixed",placement:T,whileElementsMounted:(...Re)=>ds(...Re,{animationFrame:f==="always"}),elements:{reference:x.anchor},middleware:[Cs({mainAxis:o+P,alignmentAxis:a}),l&&Rs({mainAxis:!0,crossAxis:!1,limiter:p==="partial"?Ss():void 0,...O}),l&&ks({...O}),Ps({...O,apply:({elements:Re,rects:Qt,availableWidth:Ur,availableHeight:zr})=>{const{width:Vr,height:Jr}=Qt.reference,Ne=Re.floating.style;Ne.setProperty("--radix-popper-available-width",`${Ur}px`),Ne.setProperty("--radix-popper-available-height",`${zr}px`),Ne.setProperty("--radix-popper-anchor-width",`${Vr}px`),Ne.setProperty("--radix-popper-anchor-height",`${Jr}px`)}}),E&&Ls({element:E,padding:s}),Fs({arrowWidth:R,arrowHeight:P}),m&&Ms({strategy:"referenceHidden",...O})]}),[F,G]=Cr(N),je=Ze(h);ie(()=>{A&&(je==null||je())},[A,je]);const Fr=(Vt=k.arrow)==null?void 0:Vt.x,_r=(Jt=k.arrow)==null?void 0:Jt.y,Br=((Gt=k.arrow)==null?void 0:Gt.centerOffset)!==0,[Hr,Wr]=u.useState();return ie(()=>{y&&Wr(window.getComputedStyle(y).zIndex)},[y]),w.jsx("div",{ref:L.setFloating,"data-radix-popper-content-wrapper":"",style:{...j,transform:A?j.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Hr,"--radix-popper-transform-origin":[(qt=k.transformOrigin)==null?void 0:qt.x,(Yt=k.transformOrigin)==null?void 0:Yt.y].join(" "),...((Xt=k.hide)==null?void 0:Xt.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:w.jsx(Ns,{scope:n,placedSide:F,onArrowChange:C,arrowX:Fr,arrowY:_r,shouldHideArrow:Br,children:w.jsx(le.div,{"data-side":F,"data-align":G,...g,ref:b,style:{...g.style,animation:A?void 0:"none"}})})})});vr.displayName=Ht;var br="PopperArrow",$s={top:"bottom",right:"left",bottom:"top",left:"right"},Er=u.forwardRef(function(t,n){const{__scopePopper:r,...o}=t,i=As(br,r),a=$s[i.placedSide];return w.jsx("span",{ref:i.onArrowChange,style:{position:"absolute",left:i.arrowX,top:i.arrowY,[a]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[i.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[i.placedSide],visibility:i.shouldHideArrow?"hidden":void 0},children:w.jsx(Ts,{...o,ref:n,style:{...o.style,display:"block"}})})});Er.displayName=br;function Ds(e){return e!==null}var Fs=e=>({name:"transformOrigin",options:e,fn(t){var x,y,v;const{placement:n,rects:r,middlewareData:o}=t,a=((x=o.arrow)==null?void 0:x.centerOffset)!==0,s=a?0:e.arrowWidth,l=a?0:e.arrowHeight,[c,d]=Cr(n),p={start:"0%",center:"50%",end:"100%"}[d],m=(((y=o.arrow)==null?void 0:y.x)??0)+s/2,f=(((v=o.arrow)==null?void 0:v.y)??0)+l/2;let h="",g="";return c==="bottom"?(h=a?p:`${m}px`,g=`${-l}px`):c==="top"?(h=a?p:`${m}px`,g=`${r.floating.height+l}px`):c==="right"?(h=`${-l}px`,g=a?p:`${f}px`):c==="left"&&(h=`${r.floating.width+l}px`,g=a?p:`${f}px`),{data:{x:h,y:g}}}});function Cr(e){const[t,n="center"]=e.split("-");return[t,n]}var _s=yr,Bs=wr,Hs=vr,Ws=Er,Us="Portal",Rr=u.forwardRef((e,t)=>{var s;const{container:n,...r}=e,[o,i]=u.useState(!1);ie(()=>i(!0),[]);const a=n||o&&((s=globalThis==null?void 0:globalThis.document)==null?void 0:s.body);return a?Gr.createPortal(w.jsx(le.div,{...r,ref:t}),a):null});Rr.displayName=Us;function zs(e,t){return u.useReducer((n,r)=>t[n][r]??n,e)}var Wt=e=>{const{present:t,children:n}=e,r=Vs(t),o=typeof n=="function"?n({present:r.isPresent}):u.Children.only(n),i=me(r.ref,Js(o));return typeof n=="function"||r.isPresent?u.cloneElement(o,{ref:i}):null};Wt.displayName="Presence";function Vs(e){const[t,n]=u.useState(),r=u.useRef(null),o=u.useRef(e),i=u.useRef("none"),a=e?"mounted":"unmounted",[s,l]=zs(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return u.useEffect(()=>{const c=Fe(r.current);i.current=s==="mounted"?c:"none"},[s]),ie(()=>{const c=r.current,d=o.current;if(d!==e){const m=i.current,f=Fe(c);e?l("MOUNT"):f==="none"||(c==null?void 0:c.display)==="none"?l("UNMOUNT"):l(d&&m!==f?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,l]),ie(()=>{if(t){let c;const d=t.ownerDocument.defaultView??window,p=f=>{const g=Fe(r.current).includes(CSS.escape(f.animationName));if(f.target===t&&g&&(l("ANIMATION_END"),!o.current)){const x=t.style.animationFillMode;t.style.animationFillMode="forwards",c=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=x)})}},m=f=>{f.target===t&&(i.current=Fe(r.current))};return t.addEventListener("animationstart",m),t.addEventListener("animationcancel",p),t.addEventListener("animationend",p),()=>{d.clearTimeout(c),t.removeEventListener("animationstart",m),t.removeEventListener("animationcancel",p),t.removeEventListener("animationend",p)}}else l("ANIMATION_END")},[t,l]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:u.useCallback(c=>{r.current=c?getComputedStyle(c):null,n(c)},[])}}function Fe(e){return(e==null?void 0:e.animationName)||"none"}function Js(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Gs=Sn[" useInsertionEffect ".trim().toString()]||ie;function qs({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,i,a]=Ys({defaultProp:t,onChange:n}),s=e!==void 0,l=s?e:o;{const d=u.useRef(e!==void 0);u.useEffect(()=>{const p=d.current;p!==s&&console.warn(`${r} is changing from ${p?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=s},[s,r])}const c=u.useCallback(d=>{var p;if(s){const m=Xs(d)?d(e):d;m!==e&&((p=a.current)==null||p.call(a,m))}else i(d)},[s,e,i,a]);return[l,c]}function Ys({defaultProp:e,onChange:t}){const[n,r]=u.useState(e),o=u.useRef(n),i=u.useRef(t);return Gs(()=>{i.current=t},[t]),u.useEffect(()=>{var a;o.current!==n&&((a=i.current)==null||a.call(i,n),o.current=n)},[n,o]),[n,r,i]}function Xs(e){return typeof e=="function"}var Qs=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),Zs="VisuallyHidden",Sr=u.forwardRef((e,t)=>w.jsx(le.span,{...e,ref:t,style:{...Qs,...e.style}}));Sr.displayName=Zs;var Ks=Sr,[rt]=Qn("Tooltip",[hr]),ot=hr(),kr="TooltipProvider",el=700,vt="tooltip.open",[tl,Ut]=rt(kr),Pr=e=>{const{__scopeTooltip:t,delayDuration:n=el,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:i}=e,a=u.useRef(!0),s=u.useRef(!1),l=u.useRef(0);return u.useEffect(()=>{const c=l.current;return()=>window.clearTimeout(c)},[]),w.jsx(tl,{scope:t,isOpenDelayedRef:a,delayDuration:n,onOpen:u.useCallback(()=>{window.clearTimeout(l.current),a.current=!1},[]),onClose:u.useCallback(()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>a.current=!0,r)},[r]),isPointerInTransitRef:s,onPointerInTransitChange:u.useCallback(c=>{s.current=c},[]),disableHoverableContent:o,children:i})};Pr.displayName=kr;var Me="Tooltip",[nl,Oe]=rt(Me),Mr=e=>{const{__scopeTooltip:t,children:n,open:r,defaultOpen:o,onOpenChange:i,disableHoverableContent:a,delayDuration:s}=e,l=Ut(Me,e.__scopeTooltip),c=ot(t),[d,p]=u.useState(null),m=Sa(),f=u.useRef(0),h=a??l.disableHoverableContent,g=s??l.delayDuration,x=u.useRef(!1),[y,v]=qs({prop:r,defaultProp:o??!1,onChange:R=>{R?(l.onOpen(),document.dispatchEvent(new CustomEvent(vt))):l.onClose(),i==null||i(R)},caller:Me}),b=u.useMemo(()=>y?x.current?"delayed-open":"instant-open":"closed",[y]),E=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,x.current=!1,v(!0)},[v]),C=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,v(!1)},[v]),S=u.useCallback(()=>{window.clearTimeout(f.current),f.current=window.setTimeout(()=>{x.current=!0,v(!0),f.current=0},g)},[g,v]);return u.useEffect(()=>()=>{f.current&&(window.clearTimeout(f.current),f.current=0)},[]),w.jsx(_s,{...c,children:w.jsx(nl,{scope:t,contentId:m,open:y,stateAttribute:b,trigger:d,onTriggerChange:p,onTriggerEnter:u.useCallback(()=>{l.isOpenDelayedRef.current?S():E()},[l.isOpenDelayedRef,S,E]),onTriggerLeave:u.useCallback(()=>{h?C():(window.clearTimeout(f.current),f.current=0)},[C,h]),onOpen:E,onClose:C,disableHoverableContent:h,children:n})})};Mr.displayName=Me;var bt="TooltipTrigger",Lr=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=Oe(bt,n),i=Ut(bt,n),a=ot(n),s=u.useRef(null),l=me(t,s,o.onTriggerChange),c=u.useRef(!1),d=u.useRef(!1),p=u.useCallback(()=>c.current=!1,[]);return u.useEffect(()=>()=>document.removeEventListener("pointerup",p),[p]),w.jsx(Bs,{asChild:!0,...a,children:w.jsx(le.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:l,onPointerMove:K(e.onPointerMove,m=>{m.pointerType!=="touch"&&!d.current&&!i.isPointerInTransitRef.current&&(o.onTriggerEnter(),d.current=!0)}),onPointerLeave:K(e.onPointerLeave,()=>{o.onTriggerLeave(),d.current=!1}),onPointerDown:K(e.onPointerDown,()=>{o.open&&o.onClose(),c.current=!0,document.addEventListener("pointerup",p,{once:!0})}),onFocus:K(e.onFocus,()=>{c.current||o.onOpen()}),onBlur:K(e.onBlur,o.onClose),onClick:K(e.onClick,o.onClose)})})});Lr.displayName=bt;var zt="TooltipPortal",[rl,ol]=rt(zt,{forceMount:void 0}),Ir=e=>{const{__scopeTooltip:t,forceMount:n,children:r,container:o}=e,i=Oe(zt,t);return w.jsx(rl,{scope:t,forceMount:n,children:w.jsx(Wt,{present:n||i.open,children:w.jsx(Rr,{asChild:!0,container:o,children:r})})})};Ir.displayName=zt;var ge="TooltipContent",Tr=u.forwardRef((e,t)=>{const n=ol(ge,e.__scopeTooltip),{forceMount:r=n.forceMount,side:o="top",...i}=e,a=Oe(ge,e.__scopeTooltip);return w.jsx(Wt,{present:r||a.open,children:a.disableHoverableContent?w.jsx(Or,{side:o,...i,ref:t}):w.jsx(il,{side:o,...i,ref:t})})}),il=u.forwardRef((e,t)=>{const n=Oe(ge,e.__scopeTooltip),r=Ut(ge,e.__scopeTooltip),o=u.useRef(null),i=me(t,o),[a,s]=u.useState(null),{trigger:l,onClose:c}=n,d=o.current,{onPointerInTransitChange:p}=r,m=u.useCallback(()=>{s(null),p(!1)},[p]),f=u.useCallback((h,g)=>{const x=h.currentTarget,y={x:h.clientX,y:h.clientY},v=cl(y,x.getBoundingClientRect()),b=ul(y,v),E=dl(g.getBoundingClientRect()),C=ml([...b,...E]);s(C),p(!0)},[p]);return u.useEffect(()=>()=>m(),[m]),u.useEffect(()=>{if(l&&d){const h=x=>f(x,d),g=x=>f(x,l);return l.addEventListener("pointerleave",h),d.addEventListener("pointerleave",g),()=>{l.removeEventListener("pointerleave",h),d.removeEventListener("pointerleave",g)}}},[l,d,f,m]),u.useEffect(()=>{if(a){const h=g=>{const x=g.target,y={x:g.clientX,y:g.clientY},v=(l==null?void 0:l.contains(x))||(d==null?void 0:d.contains(x)),b=!pl(y,a);v?m():b&&(m(),c())};return document.addEventListener("pointermove",h),()=>document.removeEventListener("pointermove",h)}},[l,d,a,c,m]),w.jsx(Or,{...e,ref:i})}),[al,sl]=rt(Me,{isInside:!1}),ll=ca("TooltipContent"),Or=u.forwardRef((e,t)=>{const{__scopeTooltip:n,children:r,"aria-label":o,onEscapeKeyDown:i,onPointerDownOutside:a,...s}=e,l=Oe(ge,n),c=ot(n),{onClose:d}=l;return u.useEffect(()=>(document.addEventListener(vt,d),()=>document.removeEventListener(vt,d)),[d]),u.useEffect(()=>{if(l.trigger){const p=m=>{const f=m.target;f!=null&&f.contains(l.trigger)&&d()};return window.addEventListener("scroll",p,{capture:!0}),()=>window.removeEventListener("scroll",p,{capture:!0})}},[l.trigger,d]),w.jsx(er,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:i,onPointerDownOutside:a,onFocusOutside:p=>p.preventDefault(),onDismiss:d,children:w.jsxs(Hs,{"data-state":l.stateAttribute,...c,...s,ref:t,style:{...s.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[w.jsx(ll,{children:r}),w.jsx(al,{scope:n,isInside:!0,children:w.jsx(Ks,{id:l.contentId,role:"tooltip",children:o||r})})]})})});Tr.displayName=ge;var jr="TooltipArrow",Nr=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=ot(n);return sl(jr,n).isInside?null:w.jsx(Ws,{...o,...r,ref:t})});Nr.displayName=jr;function cl(e,t){const n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),i=Math.abs(t.left-e.x);switch(Math.min(n,r,o,i)){case i:return"left";case o:return"right";case n:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function ul(e,t,n=5){const r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return r}function dl(e){const{top:t,right:n,bottom:r,left:o}=e;return[{x:o,y:t},{x:n,y:t},{x:n,y:r},{x:o,y:r}]}function pl(e,t){const{x:n,y:r}=e;let o=!1;for(let i=0,a=t.length-1;i<t.length;a=i++){const s=t[i],l=t[a],c=s.x,d=s.y,p=l.x,m=l.y;d>r!=m>r&&n<(p-c)*(r-d)/(m-d)+c&&(o=!o)}return o}function ml(e){const t=e.slice();return t.sort((n,r)=>n.x<r.x?-1:n.x>r.x?1:n.y<r.y?-1:n.y>r.y?1:0),fl(t)}function fl(e){if(e.length<=1)return e.slice();const t=[];for(let r=0;r<e.length;r++){const o=e[r];for(;t.length>=2;){const i=t[t.length-1],a=t[t.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))t.pop();else break}t.push(o)}t.pop();const n=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;n.length>=2;){const i=n[n.length-1],a=n[n.length-2];if((i.x-a.x)*(o.y-a.y)>=(i.y-a.y)*(o.x-a.x))n.pop();else break}n.push(o)}return n.pop(),t.length===1&&n.length===1&&t[0].x===n[0].x&&t[0].y===n[0].y?t:t.concat(n)}var hl=Pr,gl=Mr,yl=Lr,xl=Ir,wl=Tr,vl=Nr;const bl=({children:e})=>w.jsx(hl,{delayDuration:200,children:e}),Ar=({content:e,children:t})=>w.jsxs(gl,{children:[w.jsx(yl,{asChild:!0,children:t}),w.jsx(xl,{children:w.jsxs(wl,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,w.jsx(vl,{className:"fill-secondary",width:8,height:4})]})})]}),El=({files:e,title:t="Joymap Example",className:n="",...r})=>{const o=()=>{ia.openProject({title:t,template:"node",files:e},{newWindow:!0})};return w.jsx(Ar,{content:"Edit example on stackblitz",children:w.jsx("button",{type:"button",onClick:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:w.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:w.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})},Cl="/joymap/assets/logo-BXshXfNv.png",Rl="2.2.4",Sl={lodash:"^4.17.21"},kl={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",phaser:"^3.85.0",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},Z={version:Rl,dependencies:Sl,devDependencies:kl},{devDependencies:de,version:Pl}=Z,Ml=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/examples\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L2.png'"]];function _(e){return Ml.reduce((t,[n,r])=>t.replaceAll(n,r),e)}const Ee=JSON.stringify({compilerOptions:{target:"ESNext",module:"ESNext",moduleResolution:"node",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}}),$r=`
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
  })
`;function Ce({dependencies:e={},hasLodash:t=!0,hasReact:n=!1}={}){return JSON.stringify({main:"./index.ts",scripts:{start:"vite",build:"tsc -b && vite build"},dependencies:{joymap:Z.version,typescript:"~5.9.3",vite:"^8.0.0",...t?{lodash:Z.dependencies.lodash,"@types/lodash":Z.devDependencies["@types/lodash"]}:{},...n?{react:Z.devDependencies.react,"react-dom":Z.devDependencies["react-dom"],"@types/react":Z.devDependencies["@types/react"],"@types/react-dom":Z.devDependencies["@types/react-dom"],"@vitejs/plugin-react":"^6.0.1"}:{},...e}})}const Ll=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
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
`,Il=`import { LoremIpsum } from 'lorem-ipsum';\r
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
`,Tl=`body {
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

`,Ol=`import React, { useEffect, useState } from 'react';\r
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
`,jl=`<!doctype html>\r
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
`,Nl=`import './Editor';\r
`,Al={"Editor.tsx":_(Ol),"commands.ts":_(Il),"custom.css":_(Tl),"index.ts":_(Nl),"index.html":jl,"ckHelpers.ts":_(Ll),"package.json":Ce({hasLodash:!1,hasReact:!0,dependencies:{"@ckeditor/ckeditor5-react":de["@ckeditor/ckeditor5-react"],ckeditor5:de.ckeditor5,"lorem-ipsum":de["lorem-ipsum"]}}),"tsconfig.json":Ee,"vite.config.ts":$r},$l=`body {\r
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
`,Dl=`<!doctype html>\r
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
`,Fl=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,_l={"index.ts":_(Fl),"Fighting.css":$l,"index.html":Dl,"package.json":Ce({hasLodash:!0,hasReact:!1}),"tsconfig.json":Ee},Bl=`<!doctype html>\r
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
`,Hl=`import { createJoymap, createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,Wl=`.main-container {\r
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
`,Ul=`import { InputResult, Mapper } from 'joymap';\r
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
`,zl={"index.ts":_(Hl),"utils.ts":_(Ul),"Log.css":Wl,"index.html":Bl,"package.json":Ce({hasLodash:!0,hasReact:!1}),"tsconfig.json":Ee},Vl=`import Phaser from 'phaser';\r
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
`,Jl=`<!doctype html>\r
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
`,Gl=`import { createJoymap } from 'joymap';\r
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
`,ql=`import { createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,Yl=`import { QueryModule } from 'joymap';\r
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
`,Xl={"index.ts":_(Gl),"index.html":Jl,"MainScene.ts":_(ql),"Menu.ts":_(Yl),"Background.ts":_(Vl),"package.json":Ce({hasLodash:!1,hasReact:!1,dependencies:{phaser:Z.devDependencies.phaser}}),"tsconfig.json":Ee},Ql=`import React, { ReactNode, useState } from 'react';\r
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
`,Zl=`<!doctype html>\r
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
`,Kl=`import './Main';\r
`,ec=`import React, { useEffect, useState } from 'react';\r
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
`,tc={"index.ts":_(Kl),"Main.tsx":_(ec),"Gamepad.tsx":_(Ql),"index.html":Zl,"package.json":Ce({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":de["color-hash"],tinycolor2:de.tinycolor2,"@types/color-hash":de["@types/color-hash"],"@types/tinycolor2":de["@types/tinycolor2"]}}),"tsconfig.json":Ee,"vite.config.ts":$r},nc=`<!doctype html>\r
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
`,rc=`// Simple canvas example that doesn't use any other library nor ES6 features\r
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
`,oc={"index.ts":_(rc),"index.html":nc,"package.json":Ce({hasLodash:!1,hasReact:!1}),"tsconfig.json":Ee},pt={readme:{html:"examples/pages/Readme/index.html",title:"Readme",tags:[]},react:{html:"examples/pages/React/index.html",title:"React Example",gitPath:"tree/master/examples/pages/React",stackblitz:tc,tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",title:"Fighting Example",gitPath:"tree/master/examples/pages/Fighting",stackblitz:_l,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",title:"Rumble Example",gitPath:"tree/master/examples/pages/Rumble",stackblitz:oc,tags:["queryModule","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",title:"Log Example",gitPath:"tree/master/examples/pages/Log",stackblitz:zl,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",title:"Editor Example",gitPath:"tree/master/examples/pages/Editor",stackblitz:Al,tags:["eventModule","react"],description:"A text editor example that binds gamepad buttons to keyboard events."},phaser:{html:"examples/pages/Phaser/index.html",title:"Phaser Example",gitPath:"tree/master/examples/pages/Phaser",stackblitz:Xl,tags:["queryModule","phaser"],description:"A Phaser game menu demonstrating gamepad navigation with joymap."}};function ic(){const{page:e}=Oo(),t=Rt(),n=Object.keys(pt).includes(e??"")?e:"readme",r=i=>t(`/examples/${i}`),o=pt[n];return o?w.jsx(bl,{children:w.jsxs("div",{className:"flex h-screen flex-col",children:[w.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:w.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[w.jsxs("div",{className:"flex items-center gap-2",children:[w.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:w.jsx("img",{src:Cl})}),w.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),w.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:w.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(pt).map(i=>{const a=i===n;return w.jsx(Mi,{role:"tab",onClick:()=>r(i),isActive:a,children:i},i)})})})]})}),w.jsx("main",{className:"flex w-full flex-1 flex-col",children:w.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[w.jsxs("div",{className:"mb-6",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("div",{className:"flex flex-wrap gap-3",children:o.tags.map(i=>w.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:i},i))}),w.jsxs("div",{className:"flex justify-end",children:[o.stackblitz&&w.jsx(El,{files:o.stackblitz}),o.gitPath&&w.jsx(Ar,{content:"View example on github",children:w.jsx(Vn,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${o.gitPath}`,children:w.jsx(ji,{})})})]})]}),w.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:o.description})]}),o.code&&w.jsx(Oi,{code:o.code}),w.jsx(Ni,{path:n==="readme"?"README.md":o.html.replace(/\/index\.html$/,"/"),children:w.jsx("iframe",{src:`/joymap/${o.html}`,className:"relative block h-full w-full"},o.html)})]})}),w.jsx("footer",{className:"border-t border-border py-4",children:w.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:w.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",Pl]})})})]})}):null}const Dr=document.createElement("div");document.body.appendChild(Dr);const ac=qr(Dr);ac.render(w.jsx(xi,{basename:"/joymap/",children:w.jsxs(qo,{children:[w.jsx(ft,{path:"/examples/:page",element:w.jsx(ic,{})}),w.jsx(ft,{path:"/",element:w.jsx(Jo,{to:"/examples/readme",replace:!0})})]})}));
//# sourceMappingURL=main-CB50QbVT.js.map
