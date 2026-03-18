import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as u,j as b,a as Cn,R as Sn,b as Gr,c as Yr}from"./client-vbRJSMsA.js";import"./_commonjsHelpers-Cpj98o6Y.js";/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Qt="popstate";function Kt(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function qr(e={}){function t(r,o){var c;let a=(c=o.state)==null?void 0:c.masked,{pathname:i,search:s,hash:l}=a||r.location;return mt("",{pathname:i,search:s,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default",a?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,o){return typeof o=="string"?o:ke(o)}return Zr(t,n,null,e)}function L(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function U(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Xr(){return Math.random().toString(36).substring(2,10)}function en(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function mt(e,t,n=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?be(t):t,state:n,key:t&&t.key||r||Xr(),unstable_mask:o}}function ke({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function be(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Zr(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:a=!1}=r,i=o.history,s="POP",l=null,c=d();c==null&&(c=0,i.replaceState({...i.state,idx:c},""));function d(){return(i.state||{idx:null}).idx}function p(){s="POP";let x=d(),y=x==null?null:x-c;c=x,l&&l({action:s,location:g.location,delta:y})}function m(x,y){s="PUSH";let v=Kt(x)?x:mt(g.location,x,y);c=d()+1;let w=en(v,c),E=g.createHref(v.unstable_mask||v);try{i.pushState(w,"",E)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;o.location.assign(E)}a&&l&&l({action:s,location:g.location,delta:1})}function f(x,y){s="REPLACE";let v=Kt(x)?x:mt(g.location,x,y);c=d();let w=en(v,c),E=g.createHref(v.unstable_mask||v);i.replaceState(w,"",E),a&&l&&l({action:s,location:g.location,delta:0})}function h(x){return Qr(x)}let g={get action(){return s},get location(){return e(o,i)},listen(x){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(Qt,p),l=x,()=>{o.removeEventListener(Qt,p),l=null}},createHref(x){return t(o,x)},createURL:h,encodeLocation(x){let y=h(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:m,replace:f,go(x){return i.go(x)}};return g}function Qr(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),L(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ke(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function kn(e,t,n="/"){return Kr(e,t,n,!1)}function Kr(e,t,n,r){let o=typeof t=="string"?be(t):t,a=ee(o.pathname||"/",n);if(a==null)return null;let i=Pn(e);eo(i);let s=null;for(let l=0;s==null&&l<i.length;++l){let c=po(a);s=co(i[l],c,r)}return s}function Pn(e,t=[],n=[],r="",o=!1){let a=(i,s,l=o,c)=>{let d={relativePath:c===void 0?i.path||"":c,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&l)return;L(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let p=q([r,d.relativePath]),m=n.concat(d);i.children&&i.children.length>0&&(L(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Pn(i.children,t,m,p,l)),!(i.path==null&&!i.index)&&t.push({path:p,score:so(p,i.index),routesMeta:m})};return e.forEach((i,s)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))a(i,s);else for(let c of Mn(i.path))a(i,s,!0,c)}),t}function Mn(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return o?[a,""]:[a];let i=Mn(r.join("/")),s=[];return s.push(...i.map(l=>l===""?a:[a,l].join("/"))),o&&s.push(...i),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function eo(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:lo(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var to=/^:[\w-]+$/,no=3,ro=2,oo=1,ao=10,io=-2,tn=e=>e==="*";function so(e,t){let n=e.split("/"),r=n.length;return n.some(tn)&&(r+=io),t&&(r+=ro),n.filter(o=>!tn(o)).reduce((o,a)=>o+(to.test(a)?no:a===""?oo:ao),r)}function lo(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function co(e,t,n=!1){let{routesMeta:r}=e,o={},a="/",i=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,d=a==="/"?t:t.slice(a.length)||"/",p=Ue({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),m=l.route;if(!p&&c&&n&&!r[r.length-1].route.index&&(p=Ue({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},d)),!p)return null;Object.assign(o,p.params),i.push({params:o,pathname:q([a,p.pathname]),pathnameBase:go(q([a,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(a=q([a,p.pathnameBase]))}return i}function Ue(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=uo(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((c,{paramName:d,isOptional:p},m)=>{if(d==="*"){let h=s[m]||"";i=a.slice(0,a.length-h.length).replace(/(.)\/+$/,"$1")}const f=s[m];return p&&!f?c[d]=void 0:c[d]=(f||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:i,pattern:e}}function uo(e,t=!1,n=!0){U(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,l,c,d)=>{if(r.push({paramName:s,isOptional:l!=null}),l){let p=d.charAt(c+i.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function po(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ee(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var mo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function fo(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?be(e):e,a;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?a=nn(n.substring(1),"/"):a=nn(n,t)):a=t,{pathname:a,search:yo(r),hash:xo(o)}}function nn(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function at(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ho(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Et(e){let t=ho(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Ye(e,t,n,r=!1){let o;typeof e=="string"?o=be(e):(o={...e},L(!o.pathname||!o.pathname.includes("?"),at("?","pathname","search",o)),L(!o.pathname||!o.pathname.includes("#"),at("#","pathname","hash",o)),L(!o.search||!o.search.includes("#"),at("#","search","hash",o)));let a=e===""||o.pathname==="",i=a?"/":o.pathname,s;if(i==null)s=n;else{let p=t.length-1;if(!r&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),p-=1;o.pathname=m.join("/")}s=p>=0?t[p]:"/"}let l=fo(o,s),c=i&&i!=="/"&&i.endsWith("/"),d=(a||i===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}var q=e=>e.join("/").replace(/\/\/+/g,"/"),go=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),yo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xo=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,bo=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function vo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function wo(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Tn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Ln(e,t){let n=e;if(typeof n!="string"||!mo.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,o=!1;if(Tn)try{let a=new URL(window.location.href),i=n.startsWith("//")?new URL(a.protocol+n):new URL(n),s=ee(i.pathname,t);i.origin===a.origin&&s!=null?n=s+i.search+i.hash:o=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var An=["POST","PUT","PATCH","DELETE"];new Set(An);var Eo=["GET",...An];new Set(Eo);var ve=u.createContext(null);ve.displayName="DataRouter";var qe=u.createContext(null);qe.displayName="DataRouterState";var Ro=u.createContext(!1),In=u.createContext({isTransitioning:!1});In.displayName="ViewTransition";var Co=u.createContext(new Map);Co.displayName="Fetchers";var So=u.createContext(null);So.displayName="Await";var W=u.createContext(null);W.displayName="Navigation";var Te=u.createContext(null);Te.displayName="Location";var J=u.createContext({outlet:null,matches:[],isDataRoute:!1});J.displayName="Route";var Rt=u.createContext(null);Rt.displayName="RouteError";var jn="REACT_ROUTER_ERROR",ko="REDIRECT",Po="ROUTE_ERROR_RESPONSE";function Mo(e){if(e.startsWith(`${jn}:${ko}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function To(e){if(e.startsWith(`${jn}:${Po}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new bo(t.status,t.statusText,t.data)}catch{}}function Lo(e,{relative:t}={}){L(we(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=u.useContext(W),{hash:o,pathname:a,search:i}=Le(e,{relative:t}),s=a;return n!=="/"&&(s=a==="/"?n:q([n,a])),r.createHref({pathname:s,search:i,hash:o})}function we(){return u.useContext(Te)!=null}function re(){return L(we(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(Te).location}var Nn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function On(e){u.useContext(W).static||u.useLayoutEffect(e)}function Ct(){let{isDataRoute:e}=u.useContext(J);return e?zo():Ao()}function Ao(){L(we(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(ve),{basename:t,navigator:n}=u.useContext(W),{matches:r}=u.useContext(J),{pathname:o}=re(),a=JSON.stringify(Et(r)),i=u.useRef(!1);return On(()=>{i.current=!0}),u.useCallback((l,c={})=>{if(U(i.current,Nn),!i.current)return;if(typeof l=="number"){n.go(l);return}let d=Ye(l,JSON.parse(a),o,c.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:q([t,d.pathname])),(c.replace?n.replace:n.push)(d,c.state,c)},[t,n,a,o,e])}u.createContext(null);function Io(){let{matches:e}=u.useContext(J),t=e[e.length-1];return t?t.params:{}}function Le(e,{relative:t}={}){let{matches:n}=u.useContext(J),{pathname:r}=re(),o=JSON.stringify(Et(n));return u.useMemo(()=>Ye(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function jo(e,t){return Dn(e,t)}function Dn(e,t,n){var x;L(we(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=u.useContext(W),{matches:o}=u.useContext(J),a=o[o.length-1],i=a?a.params:{},s=a?a.pathname:"/",l=a?a.pathnameBase:"/",c=a&&a.route;{let y=c&&c.path||"";Fn(s,!c||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let d=re(),p;if(t){let y=typeof t=="string"?be(t):t;L(l==="/"||((x=y.pathname)==null?void 0:x.startsWith(l)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${y.pathname}" was given in the \`location\` prop.`),p=y}else p=d;let m=p.pathname||"/",f=m;if(l!=="/"){let y=l.replace(/^\//,"").split("/");f="/"+m.replace(/^\//,"").split("/").slice(y.length).join("/")}let h=kn(e,{pathname:f});U(c||h!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),U(h==null||h[h.length-1].route.element!==void 0||h[h.length-1].route.Component!==void 0||h[h.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=Fo(h&&h.map(y=>Object.assign({},y,{params:Object.assign({},i,y.params),pathname:q([l,r.encodeLocation?r.encodeLocation(y.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?l:q([l,r.encodeLocation?r.encodeLocation(y.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:y.pathnameBase])})),o,n);return t&&g?u.createElement(Te.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...p},navigationType:"POP"}},g):g}function No(){let e=Uo(),t=vo(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},a={padding:"2px 4px",backgroundColor:r},i=null;return console.error("Error handled by React Router default ErrorBoundary:",e),i=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:a},"ErrorBoundary")," or"," ",u.createElement("code",{style:a},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:o},n):null,i)}var Oo=u.createElement(No,null),$n=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=To(e.digest);n&&(e=n)}let t=e!==void 0?u.createElement(J.Provider,{value:this.props.routeContext},u.createElement(Rt.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?u.createElement(Do,{error:e},t):t}};$n.contextType=Ro;var it=new WeakMap;function Do({children:e,error:t}){let{basename:n}=u.useContext(W);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=Mo(t.digest);if(r){let o=it.get(t);if(o)throw o;let a=Ln(r.location,n);if(Tn&&!it.get(t))if(a.isExternal||r.reloadDocument)window.location.href=a.absoluteURL||a.to;else{const i=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:r.replace}));throw it.set(t,i),i}return u.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a.absoluteURL||a.to}`})}}return e}function $o({routeContext:e,match:t,children:n}){let r=u.useContext(ve);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement(J.Provider,{value:e},n)}function Fo(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,a=r==null?void 0:r.errors;if(a!=null){let d=o.findIndex(p=>p.route.id&&(a==null?void 0:a[p.route.id])!==void 0);L(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,d+1))}let i=!1,s=-1;if(n&&r){i=r.renderFallback;for(let d=0;d<o.length;d++){let p=o[d];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(s=d),p.route.id){let{loaderData:m,errors:f}=r,h=p.route.loader&&!m.hasOwnProperty(p.route.id)&&(!f||f[p.route.id]===void 0);if(p.route.lazy||h){n.isStatic&&(i=!0),s>=0?o=o.slice(0,s+1):o=[o[0]];break}}}}let l=n==null?void 0:n.onError,c=r&&l?(d,p)=>{var m,f;l(d,{location:r.location,params:((f=(m=r.matches)==null?void 0:m[0])==null?void 0:f.params)??{},unstable_pattern:wo(r.matches),errorInfo:p})}:void 0;return o.reduceRight((d,p,m)=>{let f,h=!1,g=null,x=null;r&&(f=a&&p.route.id?a[p.route.id]:void 0,g=p.route.errorElement||Oo,i&&(s<0&&m===0?(Fn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),h=!0,x=null):s===m&&(h=!0,x=p.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,m+1)),v=()=>{let w;return f?w=g:h?w=x:p.route.Component?w=u.createElement(p.route.Component,null):p.route.element?w=p.route.element:w=d,u.createElement($o,{match:p,routeContext:{outlet:d,matches:y,isDataRoute:r!=null},children:w})};return r&&(p.route.ErrorBoundary||p.route.errorElement||m===0)?u.createElement($n,{location:r.location,revalidation:r.revalidation,component:g,error:f,children:v(),routeContext:{outlet:null,matches:y,isDataRoute:!0},onError:c}):v()},null)}function St(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function _o(e){let t=u.useContext(ve);return L(t,St(e)),t}function Bo(e){let t=u.useContext(qe);return L(t,St(e)),t}function Ho(e){let t=u.useContext(J);return L(t,St(e)),t}function kt(e){let t=Ho(e),n=t.matches[t.matches.length-1];return L(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Wo(){return kt("useRouteId")}function Uo(){var r;let e=u.useContext(Rt),t=Bo("useRouteError"),n=kt("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function zo(){let{router:e}=_o("useNavigate"),t=kt("useNavigate"),n=u.useRef(!1);return On(()=>{n.current=!0}),u.useCallback(async(o,a={})=>{U(n.current,Nn),n.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:t,...a}))},[e,t])}var rn={};function Fn(e,t,n){!t&&!rn[e]&&(rn[e]=!0,U(!1,n))}u.memo(Vo);function Vo({routes:e,future:t,state:n,isStatic:r,onError:o}){return Dn(e,void 0,{state:n,isStatic:r,onError:o})}function Jo({to:e,replace:t,state:n,relative:r}){L(we(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=u.useContext(W);U(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:a}=u.useContext(J),{pathname:i}=re(),s=Ct(),l=Ye(e,Et(a),i,r==="path"),c=JSON.stringify(l);return u.useEffect(()=>{s(JSON.parse(c),{replace:t,state:n,relative:r})},[s,c,r,t,n]),null}function ft(e){L(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Go({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:a=!1,unstable_useTransitions:i}){L(!we(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),l=u.useMemo(()=>({basename:s,navigator:o,static:a,unstable_useTransitions:i,future:{}}),[s,o,a,i]);typeof n=="string"&&(n=be(n));let{pathname:c="/",search:d="",hash:p="",state:m=null,key:f="default",unstable_mask:h}=n,g=u.useMemo(()=>{let x=ee(c,s);return x==null?null:{location:{pathname:x,search:d,hash:p,state:m,key:f,unstable_mask:h},navigationType:r}},[s,c,d,p,m,f,r,h]);return U(g!=null,`<Router basename="${s}"> is not able to match the URL "${c}${d}${p}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:u.createElement(W.Provider,{value:l},u.createElement(Te.Provider,{children:t,value:g}))}function Yo({children:e,location:t}){return jo(ht(e),t)}function ht(e,t=[]){let n=[];return u.Children.forEach(e,(r,o)=>{if(!u.isValidElement(r))return;let a=[...t,o];if(r.type===u.Fragment){n.push.apply(n,ht(r.props.children,a));return}L(r.type===ft,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),L(!r.props.index||!r.props.children,"An index route cannot have child routes.");let i={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=ht(r.props.children,a)),n.push(i)}),n}var _e="get",Be="application/x-www-form-urlencoded";function Xe(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function qo(e){return Xe(e)&&e.tagName.toLowerCase()==="button"}function Xo(e){return Xe(e)&&e.tagName.toLowerCase()==="form"}function Zo(e){return Xe(e)&&e.tagName.toLowerCase()==="input"}function Qo(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ko(e,t){return e.button===0&&(!t||t==="_self")&&!Qo(e)}var Oe=null;function ea(){if(Oe===null)try{new FormData(document.createElement("form"),0),Oe=!1}catch{Oe=!0}return Oe}var ta=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function st(e){return e!=null&&!ta.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Be}"`),null):e}function na(e,t){let n,r,o,a,i;if(Xo(e)){let s=e.getAttribute("action");r=s?ee(s,t):null,n=e.getAttribute("method")||_e,o=st(e.getAttribute("enctype"))||Be,a=new FormData(e)}else if(qo(e)||Zo(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||s.getAttribute("action");if(r=l?ee(l,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||_e,o=st(e.getAttribute("formenctype"))||st(s.getAttribute("enctype"))||Be,a=new FormData(s,e),!ea()){let{name:c,type:d,value:p}=e;if(d==="image"){let m=c?`${c}.`:"";a.append(`${m}x`,"0"),a.append(`${m}y`,"0")}else c&&a.append(c,p)}}else{if(Xe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=_e,r=null,o=Be,i=e}return a&&o==="text/plain"&&(i=a,a=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:a,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Pt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ra(e,t,n,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:t&&ee(o.pathname,t)==="/"?o.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:o.pathname=`${o.pathname.replace(/\/$/,"")}.${r}`,o}async function oa(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function aa(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ia(e,t,n){let r=await Promise.all(e.map(async o=>{let a=t.routes[o.route.id];if(a){let i=await oa(a,n);return i.links?i.links():[]}return[]}));return ua(r.flat(1).filter(aa).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function on(e,t,n,r,o,a){let i=(l,c)=>n[c]?l.route.id!==n[c].route.id:!0,s=(l,c)=>{var d;return n[c].pathname!==l.pathname||((d=n[c].route.path)==null?void 0:d.endsWith("*"))&&n[c].params["*"]!==l.params["*"]};return a==="assets"?t.filter((l,c)=>i(l,c)||s(l,c)):a==="data"?t.filter((l,c)=>{var p;let d=r.routes[l.route.id];if(!d||!d.hasLoader)return!1;if(i(l,c)||s(l,c))return!0;if(l.route.shouldRevalidate){let m=l.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function sa(e,t,{includeHydrateFallback:n}={}){return la(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let a=[o.module];return o.clientActionModule&&(a=a.concat(o.clientActionModule)),o.clientLoaderModule&&(a=a.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(a=a.concat(o.hydrateFallbackModule)),o.imports&&(a=a.concat(o.imports)),a}).flat(1))}function la(e){return[...new Set(e)]}function ca(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function ua(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let a=JSON.stringify(ca(o));return n.has(a)||(n.add(a),r.push({key:a,link:o})),r},[])}function _n(){let e=u.useContext(ve);return Pt(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function da(){let e=u.useContext(qe);return Pt(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Mt=u.createContext(void 0);Mt.displayName="FrameworkContext";function Bn(){let e=u.useContext(Mt);return Pt(e,"You must render this element inside a <HydratedRouter> element"),e}function pa(e,t){let n=u.useContext(Mt),[r,o]=u.useState(!1),[a,i]=u.useState(!1),{onFocus:s,onBlur:l,onMouseEnter:c,onMouseLeave:d,onTouchStart:p}=t,m=u.useRef(null);u.useEffect(()=>{if(e==="render"&&i(!0),e==="viewport"){let g=y=>{y.forEach(v=>{i(v.isIntersecting)})},x=new IntersectionObserver(g,{threshold:.5});return m.current&&x.observe(m.current),()=>{x.disconnect()}}},[e]),u.useEffect(()=>{if(r){let g=setTimeout(()=>{i(!0)},100);return()=>{clearTimeout(g)}}},[r]);let f=()=>{o(!0)},h=()=>{o(!1),i(!1)};return n?e!=="intent"?[a,m,{}]:[a,m,{onFocus:Se(s,f),onBlur:Se(l,h),onMouseEnter:Se(c,f),onMouseLeave:Se(d,h),onTouchStart:Se(p,f)}]:[!1,m,{}]}function Se(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ma({page:e,...t}){let{router:n}=_n(),r=u.useMemo(()=>kn(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?u.createElement(ha,{page:e,matches:r,...t}):null}function fa(e){let{manifest:t,routeModules:n}=Bn(),[r,o]=u.useState([]);return u.useEffect(()=>{let a=!1;return ia(e,t,n).then(i=>{a||o(i)}),()=>{a=!0}},[e,t,n]),r}function ha({page:e,matches:t,...n}){let r=re(),{future:o,manifest:a,routeModules:i}=Bn(),{basename:s}=_n(),{loaderData:l,matches:c}=da(),d=u.useMemo(()=>on(e,t,c,a,r,"data"),[e,t,c,a,r]),p=u.useMemo(()=>on(e,t,c,a,r,"assets"),[e,t,c,a,r]),m=u.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let g=new Set,x=!1;if(t.forEach(v=>{var E;let w=a.routes[v.route.id];!w||!w.hasLoader||(!d.some(R=>R.route.id===v.route.id)&&v.route.id in l&&((E=i[v.route.id])!=null&&E.shouldRevalidate)||w.hasClientLoader?x=!0:g.add(v.route.id))}),g.size===0)return[];let y=ra(e,s,o.unstable_trailingSlashAwareDataRequests,"data");return x&&g.size>0&&y.searchParams.set("_routes",t.filter(v=>g.has(v.route.id)).map(v=>v.route.id).join(",")),[y.pathname+y.search]},[s,o.unstable_trailingSlashAwareDataRequests,l,r,a,d,t,e,i]),f=u.useMemo(()=>sa(p,a),[p,a]),h=fa(p);return u.createElement(u.Fragment,null,m.map(g=>u.createElement("link",{key:g,rel:"prefetch",as:"fetch",href:g,...n})),f.map(g=>u.createElement("link",{key:g,rel:"modulepreload",href:g,...n})),h.map(({key:g,link:x})=>u.createElement("link",{key:g,nonce:n.nonce,...x,crossOrigin:x.crossOrigin??n.crossOrigin})))}function ga(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var ya=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ya&&(window.__reactRouterVersion="7.13.1")}catch{}function xa({basename:e,children:t,unstable_useTransitions:n,window:r}){let o=u.useRef();o.current==null&&(o.current=qr({window:r,v5Compat:!0}));let a=o.current,[i,s]=u.useState({action:a.action,location:a.location}),l=u.useCallback(c=>{n===!1?s(c):u.startTransition(()=>s(c))},[n]);return u.useLayoutEffect(()=>a.listen(l),[a,l]),u.createElement(Go,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:a,unstable_useTransitions:n})}var Hn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Wn=u.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:a,replace:i,unstable_mask:s,state:l,target:c,to:d,preventScrollReset:p,viewTransition:m,unstable_defaultShouldRevalidate:f,...h},g){let{basename:x,navigator:y,unstable_useTransitions:v}=u.useContext(W),w=typeof d=="string"&&Hn.test(d),E=Ln(d,x);d=E.to;let R=Lo(d,{relative:o}),S=re(),C=null;if(s){let j=Ye(s,[],S.unstable_mask?S.unstable_mask.pathname:"/",!0);x!=="/"&&(j.pathname=j.pathname==="/"?x:q([x,j.pathname])),C=y.createHref(j)}let[P,A,M]=pa(r,h),D=Ea(d,{replace:i,unstable_mask:s,state:l,target:c,preventScrollReset:p,relative:o,viewTransition:m,unstable_defaultShouldRevalidate:f,unstable_useTransitions:v});function $(j){t&&t(j),j.defaultPrevented||D(j)}let I=!(E.isExternal||a),T=u.createElement("a",{...h,...M,href:(I?C:void 0)||E.absoluteURL||R,onClick:I?$:t,ref:ga(g,A),target:c,"data-discover":!w&&n==="render"?"true":void 0});return P&&!w?u.createElement(u.Fragment,null,T,u.createElement(ma,{page:R})):T});Wn.displayName="Link";var ba=u.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:a,to:i,viewTransition:s,children:l,...c},d){let p=Le(i,{relative:c.relative}),m=re(),f=u.useContext(qe),{navigator:h,basename:g}=u.useContext(W),x=f!=null&&Pa(p)&&s===!0,y=h.encodeLocation?h.encodeLocation(p).pathname:p.pathname,v=m.pathname,w=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;n||(v=v.toLowerCase(),w=w?w.toLowerCase():null,y=y.toLowerCase()),w&&g&&(w=ee(w,g)||w);const E=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let R=v===y||!o&&v.startsWith(y)&&v.charAt(E)==="/",S=w!=null&&(w===y||!o&&w.startsWith(y)&&w.charAt(y.length)==="/"),C={isActive:R,isPending:S,isTransitioning:x},P=R?t:void 0,A;typeof r=="function"?A=r(C):A=[r,R?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let M=typeof a=="function"?a(C):a;return u.createElement(Wn,{...c,"aria-current":P,className:A,ref:d,style:M,to:i,viewTransition:s},typeof l=="function"?l(C):l)});ba.displayName="NavLink";var va=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:a,method:i=_e,action:s,onSubmit:l,relative:c,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:m,...f},h)=>{let{unstable_useTransitions:g}=u.useContext(W),x=Sa(),y=ka(s,{relative:c}),v=i.toLowerCase()==="get"?"get":"post",w=typeof s=="string"&&Hn.test(s),E=R=>{if(l&&l(R),R.defaultPrevented)return;R.preventDefault();let S=R.nativeEvent.submitter,C=(S==null?void 0:S.getAttribute("formmethod"))||i,P=()=>x(S||R.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:o,state:a,relative:c,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:m});g&&n!==!1?u.startTransition(()=>P()):P()};return u.createElement("form",{ref:h,method:v,action:y,onSubmit:r?l:E,...f,"data-discover":!w&&e==="render"?"true":void 0})});va.displayName="Form";function wa(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Un(e){let t=u.useContext(ve);return L(t,wa(e)),t}function Ea(e,{target:t,replace:n,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l,unstable_useTransitions:c}={}){let d=Ct(),p=re(),m=Le(e,{relative:i});return u.useCallback(f=>{if(Ko(f,t)){f.preventDefault();let h=n!==void 0?n:ke(p)===ke(m),g=()=>d(e,{replace:h,unstable_mask:r,state:o,preventScrollReset:a,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l});c?u.startTransition(()=>g()):g()}},[p,d,m,n,r,o,t,e,a,i,s,l,c])}var Ra=0,Ca=()=>`__${String(++Ra)}__`;function Sa(){let{router:e}=Un("useSubmit"),{basename:t}=u.useContext(W),n=Wo(),r=e.fetch,o=e.navigate;return u.useCallback(async(a,i={})=>{let{action:s,method:l,encType:c,formData:d,body:p}=na(a,t);if(i.navigate===!1){let m=i.fetcherKey||Ca();await r(m,n,i.action||s,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:p,formMethod:i.method||l,formEncType:i.encType||c,flushSync:i.flushSync})}else await o(i.action||s,{unstable_defaultShouldRevalidate:i.unstable_defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:p,formMethod:i.method||l,formEncType:i.encType||c,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[r,o,t,n])}function ka(e,{relative:t}={}){let{basename:n}=u.useContext(W),r=u.useContext(J);L(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),a={...Le(e||".",{relative:t})},i=re();if(e==null){a.search=i.search;let s=new URLSearchParams(a.search),l=s.getAll("index");if(l.some(d=>d==="")){s.delete("index"),l.filter(p=>p).forEach(p=>s.append("index",p));let d=s.toString();a.search=d?`?${d}`:""}}return(!e||e===".")&&o.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(a.pathname=a.pathname==="/"?n:q([n,a.pathname])),ke(a)}function Pa(e,{relative:t}={}){let n=u.useContext(In);L(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Un("useViewTransitionState"),o=Le(e,{relative:t});if(!n.isTransitioning)return!1;let a=ee(n.currentLocation.pathname,r)||n.currentLocation.pathname,i=ee(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ue(o.pathname,i)!=null||Ue(o.pathname,a)!=null}const Ma=({isActive:e,children:t,className:n="",...r})=>b.jsx("button",{type:"button","aria-selected":e,className:`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${e?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"} ${n}`,...r,children:t}),Ta=e=>b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:b.jsx("path",{d:"M20 6 9 17l-5-5"})}),La=e=>b.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...e,children:[b.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),b.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]});function Aa(e){const t=[],n=/\/\/.*$/gm;let r;for(;(r=n.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-comment"});const o=/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;for(;(r=o.exec(e))!==null;)t.push({start:r.index,end:r.index+r[0].length,className:"code-string"});t.sort((s,l)=>s.start-l.start);let a="",i=0;for(const s of t){if(s.start<i)continue;const l=e.slice(i,s.start);a+=an(l);const c=e.slice(s.start,s.end);a+=`<span class="${s.className}">${zn(c)}</span>`,i=s.end}return a+=an(e.slice(i)),a}function zn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function an(e){let t=zn(e);return t=t.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,'<span class="code-keyword">$1</span>'),t=t.replace(/\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,'<span class="code-builtin">$1</span>'),t=t.replace(/\b(\d+\.?\d*)\b/g,'<span class="code-number">$1</span>'),t=t.replace(/\.([a-zA-Z_]\w*)(\s*\()/g,'.<span class="code-method">$1</span>$2'),t=t.replace(/\b([a-zA-Z_]\w*)(\s*\()/g,(n,r,o)=>n.includes('class="')?n:`<span class="code-function">${r}</span>${o}`),t=t.replace(/=&gt;/g,'<span class="code-keyword">=&gt;</span>'),t}function Ia({code:e}){const[t,n]=u.useState(!1),r=u.useRef(null);u.useEffect(()=>{r.current&&(r.current.innerHTML=Aa(e))},[e]);const o=async()=>{await navigator.clipboard.writeText(e),n(!0),setTimeout(()=>n(!1),2e3)};return b.jsxs("div",{className:"group relative overflow-hidden rounded-lg border border-border bg-secondary/50",children:[b.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2",children:[b.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:"Javascript"}),b.jsx("button",{onClick:o,className:"flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground","aria-label":"Copy code",children:t?b.jsxs(b.Fragment,{children:[b.jsx(Ta,{className:"h-3.5 w-3.5"}),b.jsx("span",{children:"Copied"})]}):b.jsxs(b.Fragment,{children:[b.jsx(La,{className:"h-3.5 w-3.5"}),b.jsx("span",{children:"Copy"})]})})]}),b.jsx("div",{className:"overflow-x-auto p-4",children:b.jsx("pre",{className:"text-sm leading-relaxed",children:b.jsx("code",{ref:r,className:"font-mono"})})})]})}const ja=()=>b.jsx("svg",{"aria-hidden":"true",focusable:"false",className:"octicon octicon-mark-github",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",display:"inline-block",overflow:"visible",children:b.jsx("path",{d:"M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"})});function Na({children:e,path:t}){return b.jsxs("div",{className:"flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary",children:[t&&b.jsx("div",{className:"flex items-center border-b border-border bg-muted px-4 py-2",children:b.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:t})}),b.jsx("div",{className:"min-h-0 w-full flex-1",children:e})]})}const Vn=u.forwardRef(({isActive:e,children:t,className:n="",...r},o)=>b.jsx("a",{ref:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:t}));Vn.displayName="Link";const Oa=500,Da=20,$a=300,Fa="https://stackblitz.com",sn=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],_a=["project","search","ports","settings"],Ba=["light","dark"],Ha=["editor","preview"],ln={clickToLoad:e=>ce("ctl",e),devToolsHeight:e=>cn("devtoolsheight",e),forceEmbedLayout:e=>ce("embed",e),hideDevTools:e=>ce("hidedevtools",e),hideExplorer:e=>ce("hideExplorer",e),hideNavigation:e=>ce("hideNavigation",e),openFile:e=>De("file",e),showSidebar:e=>Wa("showSidebar",e),sidebarView:e=>lt("sidebarView",e,_a),startScript:e=>De("startScript",e),terminalHeight:e=>cn("terminalHeight",e),theme:e=>lt("theme",e,Ba),view:e=>lt("view",e,Ha),zenMode:e=>ce("zenMode",e),organization:e=>`${De("orgName",e==null?void 0:e.name)}&${De("orgProvider",e==null?void 0:e.provider)}`,crossOriginIsolated:e=>ce("corp",e)};function Jn(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&ln.hasOwnProperty(n)?ln[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function ce(e,t){return t===!0?`${e}=1`:""}function Wa(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function cn(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function lt(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function De(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function Gn(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function Tt(e,t){return`${Yn(t)}${e}${Jn(t)}`}function Lt(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${Yn(n)}${e}${Jn(n)}`}function Yn(e={}){return(typeof e.origin=="string"?e.origin:Fa).replace(/\/$/,"")}function At(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),Ua(t,n),za(e,t,n),e.replaceWith(t)}function It(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function jt(e){return e&&e.newWindow===!1?"_self":"_blank"}function Ua(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${$a}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}function za(e,t,n={}){var o,a;const r=((a=(o=e.allow)==null?void 0:o.split(";"))==null?void 0:a.map(i=>i.trim()))??[];n.crossOriginIsolated&&!r.includes("cross-origin-isolated")&&r.push("cross-origin-isolated"),r.length>0&&(t.allow=r.join("; "))}class Va{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,o)=>{const a=Gn();this.pending[a]={resolve:r,reject:o},this.port.postMessage({type:t,payload:{...n,__reqid:a}})})}messageListener(t){var s;if(typeof((s=t.data.payload)==null?void 0:s.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:o,__success:a,__error:i}=r;this.pending[o]&&(a?this.pending[o].resolve(this.cleanResult(r)):this.pending[o].reject(i?`${n}: ${i}`:n),delete this.pending[o])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class Ja{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new Va(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const He=[];class Ga{constructor(t){this.id=Gn(),this.element=t,this.pending=new Promise((n,r)=>{const o=({data:c,ports:d})=>{(c==null?void 0:c.action)==="SDK_INIT_SUCCESS"&&c.id===this.id&&(this.vm=new Ja(d[0],c.payload),n(this.vm),i())},a=()=>{var c;(c=this.element.contentWindow)==null||c.postMessage({action:"SDK_INIT",id:this.id},"*")};function i(){window.clearInterval(l),window.removeEventListener("message",o)}window.addEventListener("message",o),a();let s=0;const l=window.setInterval(()=>{if(this.vm){i();return}if(s>=Da){i(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),He.forEach((c,d)=>{c.id===this.id&&He.splice(d,1)});return}s++,a()},Oa)}),He.push(this)}}const Ya=e=>{const t=e instanceof Element?"element":"id";return He.find(n=>n[t]===e)??null};function qa(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function Xa(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function qn({template:e,title:t,description:n,dependencies:r,files:o,settings:a}){if(!sn.includes(e)){const c=sn.map(d=>`'${d}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${c}`)}const i=[],s=(c,d,p="")=>{i.push(qa(c,typeof d=="string"?d:p))};s("project[title]",t),typeof n=="string"&&n.length>0&&s("project[description]",n),s("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):s("project[dependencies]",JSON.stringify(r))),a&&s("project[settings]",JSON.stringify(a)),Object.entries(o).forEach(([c,d])=>{s(`project[files][${Xa(c)}]`,d)});const l=document.createElement("form");return l.method="POST",l.setAttribute("style","display:none!important;"),l.append(...i),l}function Za(e,t){const n=qn(e);return n.action=Lt("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function Qa(e,t){const n=qn(e);n.action=Tt("/run",t),n.target=jt(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function Ze(e){return e!=null&&e.contentWindow?(Ya(e)??new Ga(e)).pending:Promise.reject("Provided element is not an iframe.")}function Ka(e,t){Qa(e,t)}function ei(e,t){const n=Tt(`/edit/${e}`,t),r=jt(t);window.open(n,r)}function ti(e,t){const n=Tt(`/github/${e}`,t),r=jt(t);window.open(n,r)}function ni(e,t,n){var i;const r=It(e),o=Za(t,n),a=document.createElement("iframe");return At(r,a,n),(i=a.contentDocument)==null||i.write(o),Ze(a)}function ri(e,t,n){const r=It(e),o=document.createElement("iframe");return o.src=Lt(`/edit/${t}`,n),At(r,o,n),Ze(o)}function oi(e,t,n){const r=It(e),o=document.createElement("iframe");return o.src=Lt(`/github/${t}`,n),At(r,o,n),Ze(o)}const ai={connect:Ze,embedGithubProject:oi,embedProject:ni,embedProjectId:ri,openGithubProject:ti,openProject:Ka,openProjectId:ei};function K(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function un(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Xn(...e){return t=>{let n=!1;const r=e.map(o=>{const a=un(o,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():un(e[o],null)}}}}function me(...e){return u.useCallback(Xn(...e),e)}function Zn(e,t=[]){let n=[];function r(a,i){const s=u.createContext(i),l=n.length;n=[...n,i];const c=p=>{var y;const{scope:m,children:f,...h}=p,g=((y=m==null?void 0:m[e])==null?void 0:y[l])||s,x=u.useMemo(()=>h,Object.values(h));return b.jsx(g.Provider,{value:x,children:f})};c.displayName=a+"Provider";function d(p,m){var g;const f=((g=m==null?void 0:m[e])==null?void 0:g[l])||s,h=u.useContext(f);if(h)return h;if(i!==void 0)return i;throw new Error(`\`${p}\` must be used within \`${a}\``)}return[c,d]}const o=()=>{const a=n.map(i=>u.createContext(i));return function(s){const l=(s==null?void 0:s[e])||a;return u.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return o.scopeName=e,[r,ii(o,...t)]}function ii(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const i=r.reduce((s,{useScope:l,scopeName:c})=>{const p=l(a)[`__scope${c}`];return{...s,...p}},{});return u.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return n.scopeName=t.scopeName,n}function si(e){const t=li(e),n=u.forwardRef((r,o)=>{const{children:a,...i}=r,s=u.Children.toArray(a),l=s.find(ui);if(l){const c=l.props.children,d=s.map(p=>p===l?u.Children.count(c)>1?u.Children.only(null):u.isValidElement(c)?c.props.children:null:p);return b.jsx(t,{...i,ref:o,children:u.isValidElement(c)?u.cloneElement(c,void 0,d):null})}return b.jsx(t,{...i,ref:o,children:a})});return n.displayName=`${e}.Slot`,n}function li(e){const t=u.forwardRef((n,r)=>{const{children:o,...a}=n;if(u.isValidElement(o)){const i=pi(o),s=di(a,o.props);return o.type!==u.Fragment&&(s.ref=r?Xn(r,i):i),u.cloneElement(o,s)}return u.Children.count(o)>1?u.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Qn=Symbol("radix.slottable");function ci(e){const t=({children:n})=>b.jsx(b.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=Qn,t}function ui(e){return u.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Qn}function di(e,t){const n={...t};for(const r in t){const o=e[r],a=t[r];/^on[A-Z]/.test(r)?o&&a?n[r]=(...s)=>{const l=a(...s);return o(...s),l}:o&&(n[r]=o):r==="style"?n[r]={...o,...a}:r==="className"&&(n[r]=[o,a].filter(Boolean).join(" "))}return{...e,...n}}function pi(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var mi=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=mi.reduce((e,t)=>{const n=si(`Primitive.${t}`),r=u.forwardRef((o,a)=>{const{asChild:i,...s}=o,l=i?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),b.jsx(l,{...s,ref:a})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function fi(e,t){e&&Cn.flushSync(()=>e.dispatchEvent(t))}function Qe(e){const t=u.useRef(e);return u.useEffect(()=>{t.current=e}),u.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function hi(e,t=globalThis==null?void 0:globalThis.document){const n=Qe(e);u.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var gi="DismissableLayer",gt="dismissableLayer.update",yi="dismissableLayer.pointerDownOutside",xi="dismissableLayer.focusOutside",dn,Kn=u.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),er=u.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:i,onDismiss:s,...l}=e,c=u.useContext(Kn),[d,p]=u.useState(null),m=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,f]=u.useState({}),h=me(t,C=>p(C)),g=Array.from(c.layers),[x]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),y=g.indexOf(x),v=d?g.indexOf(d):-1,w=c.layersWithOutsidePointerEventsDisabled.size>0,E=v>=y,R=wi(C=>{const P=C.target,A=[...c.branches].some(M=>M.contains(P));!E||A||(o==null||o(C),i==null||i(C),C.defaultPrevented||s==null||s())},m),S=Ei(C=>{const P=C.target;[...c.branches].some(M=>M.contains(P))||(a==null||a(C),i==null||i(C),C.defaultPrevented||s==null||s())},m);return hi(C=>{v===c.layers.size-1&&(r==null||r(C),!C.defaultPrevented&&s&&(C.preventDefault(),s()))},m),u.useEffect(()=>{if(d)return n&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(dn=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(d)),c.layers.add(d),pn(),()=>{n&&c.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=dn)}},[d,m,n,c]),u.useEffect(()=>()=>{d&&(c.layers.delete(d),c.layersWithOutsidePointerEventsDisabled.delete(d),pn())},[d,c]),u.useEffect(()=>{const C=()=>f({});return document.addEventListener(gt,C),()=>document.removeEventListener(gt,C)},[]),b.jsx(le.div,{...l,ref:h,style:{pointerEvents:w?E?"auto":"none":void 0,...e.style},onFocusCapture:K(e.onFocusCapture,S.onFocusCapture),onBlurCapture:K(e.onBlurCapture,S.onBlurCapture),onPointerDownCapture:K(e.onPointerDownCapture,R.onPointerDownCapture)})});er.displayName=gi;var bi="DismissableLayerBranch",vi=u.forwardRef((e,t)=>{const n=u.useContext(Kn),r=u.useRef(null),o=me(t,r);return u.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),b.jsx(le.div,{...e,ref:o})});vi.displayName=bi;function wi(e,t=globalThis==null?void 0:globalThis.document){const n=Qe(e),r=u.useRef(!1),o=u.useRef(()=>{});return u.useEffect(()=>{const a=s=>{if(s.target&&!r.current){let l=function(){tr(yi,n,c,{discrete:!0})};const c={originalEvent:s};s.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=l,t.addEventListener("click",o.current,{once:!0})):l()}else t.removeEventListener("click",o.current);r.current=!1},i=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(i),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Ei(e,t=globalThis==null?void 0:globalThis.document){const n=Qe(e),r=u.useRef(!1);return u.useEffect(()=>{const o=a=>{a.target&&!r.current&&tr(xi,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function pn(){const e=new CustomEvent(gt);document.dispatchEvent(e)}function tr(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?fi(o,a):o.dispatchEvent(a)}var ae=globalThis!=null&&globalThis.document?u.useLayoutEffect:()=>{},Ri=Sn[" useId ".trim().toString()]||(()=>{}),Ci=0;function Si(e){const[t,n]=u.useState(Ri());return ae(()=>{n(r=>r??String(Ci++))},[e]),t?`radix-${t}`:""}const ki=["top","right","bottom","left"],ie=Math.min,B=Math.max,ze=Math.round,$e=Math.floor,X=e=>({x:e,y:e}),Pi={left:"right",right:"left",bottom:"top",top:"bottom"};function yt(e,t,n){return B(e,ie(t,n))}function te(e,t){return typeof e=="function"?e(t):e}function ne(e){return e.split("-")[0]}function Ee(e){return e.split("-")[1]}function Nt(e){return e==="x"?"y":"x"}function Ot(e){return e==="y"?"height":"width"}function Y(e){const t=e[0];return t==="t"||t==="b"?"y":"x"}function Dt(e){return Nt(Y(e))}function Mi(e,t,n){n===void 0&&(n=!1);const r=Ee(e),o=Dt(e),a=Ot(o);let i=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[a]>t.floating[a]&&(i=Ve(i)),[i,Ve(i)]}function Ti(e){const t=Ve(e);return[xt(e),t,xt(t)]}function xt(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}const mn=["left","right"],fn=["right","left"],Li=["top","bottom"],Ai=["bottom","top"];function Ii(e,t,n){switch(e){case"top":case"bottom":return n?t?fn:mn:t?mn:fn;case"left":case"right":return t?Li:Ai;default:return[]}}function ji(e,t,n,r){const o=Ee(e);let a=Ii(ne(e),n==="start",r);return o&&(a=a.map(i=>i+"-"+o),t&&(a=a.concat(a.map(xt)))),a}function Ve(e){const t=ne(e);return Pi[t]+e.slice(t.length)}function Ni(e){return{top:0,right:0,bottom:0,left:0,...e}}function nr(e){return typeof e!="number"?Ni(e):{top:e,right:e,bottom:e,left:e}}function Je(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function hn(e,t,n){let{reference:r,floating:o}=e;const a=Y(t),i=Dt(t),s=Ot(i),l=ne(t),c=a==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,m=r[s]/2-o[s]/2;let f;switch(l){case"top":f={x:d,y:r.y-o.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:p};break;case"left":f={x:r.x-o.width,y:p};break;default:f={x:r.x,y:r.y}}switch(Ee(t)){case"start":f[i]-=m*(n&&c?-1:1);break;case"end":f[i]+=m*(n&&c?-1:1);break}return f}async function Oi(e,t){var n;t===void 0&&(t={});const{x:r,y:o,platform:a,rects:i,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=te(t,e),h=nr(f),x=s[m?p==="floating"?"reference":"floating":p],y=Je(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(x)))==null||n?x:x.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(s.floating)),boundary:c,rootBoundary:d,strategy:l})),v=p==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,w=await(a.getOffsetParent==null?void 0:a.getOffsetParent(s.floating)),E=await(a.isElement==null?void 0:a.isElement(w))?await(a.getScale==null?void 0:a.getScale(w))||{x:1,y:1}:{x:1,y:1},R=Je(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:v,offsetParent:w,strategy:l}):v);return{top:(y.top-R.top+h.top)/E.y,bottom:(R.bottom-y.bottom+h.bottom)/E.y,left:(y.left-R.left+h.left)/E.x,right:(R.right-y.right+h.right)/E.x}}const Di=50,$i=async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:a=[],platform:i}=n,s=i.detectOverflow?i:{...i,detectOverflow:Oi},l=await(i.isRTL==null?void 0:i.isRTL(t));let c=await i.getElementRects({reference:e,floating:t,strategy:o}),{x:d,y:p}=hn(c,r,l),m=r,f=0;const h={};for(let g=0;g<a.length;g++){const x=a[g];if(!x)continue;const{name:y,fn:v}=x,{x:w,y:E,data:R,reset:S}=await v({x:d,y:p,initialPlacement:r,placement:m,strategy:o,middlewareData:h,rects:c,platform:s,elements:{reference:e,floating:t}});d=w??d,p=E??p,h[y]={...h[y],...R},S&&f<Di&&(f++,typeof S=="object"&&(S.placement&&(m=S.placement),S.rects&&(c=S.rects===!0?await i.getElementRects({reference:e,floating:t,strategy:o}):S.rects),{x:d,y:p}=hn(c,m,l)),g=-1)}return{x:d,y:p,placement:m,strategy:o,middlewareData:h}},Fi=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:a,platform:i,elements:s,middlewareData:l}=t,{element:c,padding:d=0}=te(e,t)||{};if(c==null)return{};const p=nr(d),m={x:n,y:r},f=Dt(o),h=Ot(f),g=await i.getDimensions(c),x=f==="y",y=x?"top":"left",v=x?"bottom":"right",w=x?"clientHeight":"clientWidth",E=a.reference[h]+a.reference[f]-m[f]-a.floating[h],R=m[f]-a.reference[f],S=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c));let C=S?S[w]:0;(!C||!await(i.isElement==null?void 0:i.isElement(S)))&&(C=s.floating[w]||a.floating[h]);const P=E/2-R/2,A=C/2-g[h]/2-1,M=ie(p[y],A),D=ie(p[v],A),$=M,I=C-g[h]-D,T=C/2-g[h]/2+P,j=yt($,T,I),N=!l.arrow&&Ee(o)!=null&&T!==j&&a.reference[h]/2-(T<$?M:D)-g[h]/2<0,O=N?T<$?T-$:T-I:0;return{[f]:m[f]+O,data:{[f]:j,centerOffset:T-j-O,...N&&{alignmentOffset:O}},reset:N}}}),_i=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:a,rects:i,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:g=!0,...x}=te(e,t);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const y=ne(o),v=Y(s),w=ne(s)===s,E=await(l.isRTL==null?void 0:l.isRTL(c.floating)),R=m||(w||!g?[Ve(s)]:Ti(s)),S=h!=="none";!m&&S&&R.push(...ji(s,g,h,E));const C=[s,...R],P=await l.detectOverflow(t,x),A=[];let M=((r=a.flip)==null?void 0:r.overflows)||[];if(d&&A.push(P[y]),p){const T=Mi(o,i,E);A.push(P[T[0]],P[T[1]])}if(M=[...M,{placement:o,overflows:A}],!A.every(T=>T<=0)){var D,$;const T=(((D=a.flip)==null?void 0:D.index)||0)+1,j=C[T];if(j&&(!(p==="alignment"?v!==Y(j):!1)||M.every(k=>Y(k.placement)===v?k.overflows[0]>0:!0)))return{data:{index:T,overflows:M},reset:{placement:j}};let N=($=M.filter(O=>O.overflows[0]<=0).sort((O,k)=>O.overflows[1]-k.overflows[1])[0])==null?void 0:$.placement;if(!N)switch(f){case"bestFit":{var I;const O=(I=M.filter(k=>{if(S){const _=Y(k.placement);return _===v||_==="y"}return!0}).map(k=>[k.placement,k.overflows.filter(_=>_>0).reduce((_,G)=>_+G,0)]).sort((k,_)=>k[1]-_[1])[0])==null?void 0:I[0];O&&(N=O);break}case"initialPlacement":N=s;break}if(o!==N)return{reset:{placement:N}}}return{}}}};function gn(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function yn(e){return ki.some(t=>e[t]>=0)}const Bi=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n,platform:r}=t,{strategy:o="referenceHidden",...a}=te(e,t);switch(o){case"referenceHidden":{const i=await r.detectOverflow(t,{...a,elementContext:"reference"}),s=gn(i,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:yn(s)}}}case"escaped":{const i=await r.detectOverflow(t,{...a,altBoundary:!0}),s=gn(i,n.floating);return{data:{escapedOffsets:s,escaped:yn(s)}}}default:return{}}}}},rr=new Set(["left","top"]);async function Hi(e,t){const{placement:n,platform:r,elements:o}=e,a=await(r.isRTL==null?void 0:r.isRTL(o.floating)),i=ne(n),s=Ee(n),l=Y(n)==="y",c=rr.has(i)?-1:1,d=a&&l?-1:1,p=te(t,e);let{mainAxis:m,crossAxis:f,alignmentAxis:h}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return s&&typeof h=="number"&&(f=s==="end"?h*-1:h),l?{x:f*d,y:m*c}:{x:m*c,y:f*d}}const Wi=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:a,placement:i,middlewareData:s}=t,l=await Hi(t,e);return i===((n=s.offset)==null?void 0:n.placement)&&(r=s.arrow)!=null&&r.alignmentOffset?{}:{x:o+l.x,y:a+l.y,data:{...l,placement:i}}}}},Ui=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o,platform:a}=t,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:y=>{let{x:v,y:w}=y;return{x:v,y:w}}},...c}=te(e,t),d={x:n,y:r},p=await a.detectOverflow(t,c),m=Y(ne(o)),f=Nt(m);let h=d[f],g=d[m];if(i){const y=f==="y"?"top":"left",v=f==="y"?"bottom":"right",w=h+p[y],E=h-p[v];h=yt(w,h,E)}if(s){const y=m==="y"?"top":"left",v=m==="y"?"bottom":"right",w=g+p[y],E=g-p[v];g=yt(w,g,E)}const x=l.fn({...t,[f]:h,[m]:g});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:i,[m]:s}}}}}},zi=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:o,rects:a,middlewareData:i}=t,{offset:s=0,mainAxis:l=!0,crossAxis:c=!0}=te(e,t),d={x:n,y:r},p=Y(o),m=Nt(p);let f=d[m],h=d[p];const g=te(s,t),x=typeof g=="number"?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(l){const w=m==="y"?"height":"width",E=a.reference[m]-a.floating[w]+x.mainAxis,R=a.reference[m]+a.reference[w]-x.mainAxis;f<E?f=E:f>R&&(f=R)}if(c){var y,v;const w=m==="y"?"width":"height",E=rr.has(ne(o)),R=a.reference[p]-a.floating[w]+(E&&((y=i.offset)==null?void 0:y[p])||0)+(E?0:x.crossAxis),S=a.reference[p]+a.reference[w]+(E?0:((v=i.offset)==null?void 0:v[p])||0)-(E?x.crossAxis:0);h<R?h=R:h>S&&(h=S)}return{[m]:f,[p]:h}}}},Vi=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:o,rects:a,platform:i,elements:s}=t,{apply:l=()=>{},...c}=te(e,t),d=await i.detectOverflow(t,c),p=ne(o),m=Ee(o),f=Y(o)==="y",{width:h,height:g}=a.floating;let x,y;p==="top"||p==="bottom"?(x=p,y=m===(await(i.isRTL==null?void 0:i.isRTL(s.floating))?"start":"end")?"left":"right"):(y=p,x=m==="end"?"top":"bottom");const v=g-d.top-d.bottom,w=h-d.left-d.right,E=ie(g-d[x],v),R=ie(h-d[y],w),S=!t.middlewareData.shift;let C=E,P=R;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(P=w),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!m){const M=B(d.left,0),D=B(d.right,0),$=B(d.top,0),I=B(d.bottom,0);f?P=h-2*(M!==0||D!==0?M+D:B(d.left,d.right)):C=g-2*($!==0||I!==0?$+I:B(d.top,d.bottom))}await l({...t,availableWidth:P,availableHeight:C});const A=await i.getDimensions(s.floating);return h!==A.width||g!==A.height?{reset:{rects:!0}}:{}}}};function Ke(){return typeof window<"u"}function Re(e){return or(e)?(e.nodeName||"").toLowerCase():"#document"}function H(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Z(e){var t;return(t=(or(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function or(e){return Ke()?e instanceof Node||e instanceof H(e).Node:!1}function z(e){return Ke()?e instanceof Element||e instanceof H(e).Element:!1}function oe(e){return Ke()?e instanceof HTMLElement||e instanceof H(e).HTMLElement:!1}function xn(e){return!Ke()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof H(e).ShadowRoot}function Ae(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=V(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&o!=="inline"&&o!=="contents"}function Ji(e){return/^(table|td|th)$/.test(Re(e))}function et(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}const Gi=/transform|translate|scale|rotate|perspective|filter/,Yi=/paint|layout|strict|content/,ue=e=>!!e&&e!=="none";let ct;function $t(e){const t=z(e)?V(e):e;return ue(t.transform)||ue(t.translate)||ue(t.scale)||ue(t.rotate)||ue(t.perspective)||!Ft()&&(ue(t.backdropFilter)||ue(t.filter))||Gi.test(t.willChange||"")||Yi.test(t.contain||"")}function qi(e){let t=se(e);for(;oe(t)&&!ye(t);){if($t(t))return t;if(et(t))return null;t=se(t)}return null}function Ft(){return ct==null&&(ct=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),ct}function ye(e){return/^(html|body|#document)$/.test(Re(e))}function V(e){return H(e).getComputedStyle(e)}function tt(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function se(e){if(Re(e)==="html")return e;const t=e.assignedSlot||e.parentNode||xn(e)&&e.host||Z(e);return xn(t)?t.host:t}function ar(e){const t=se(e);return ye(t)?e.ownerDocument?e.ownerDocument.body:e.body:oe(t)&&Ae(t)?t:ar(t)}function Pe(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=ar(e),a=o===((r=e.ownerDocument)==null?void 0:r.body),i=H(o);if(a){const s=bt(i);return t.concat(i,i.visualViewport||[],Ae(o)?o:[],s&&n?Pe(s):[])}else return t.concat(o,Pe(o,[],n))}function bt(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ir(e){const t=V(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=oe(e),a=o?e.offsetWidth:n,i=o?e.offsetHeight:r,s=ze(n)!==a||ze(r)!==i;return s&&(n=a,r=i),{width:n,height:r,$:s}}function _t(e){return z(e)?e:e.contextElement}function ge(e){const t=_t(e);if(!oe(t))return X(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:a}=ir(t);let i=(a?ze(n.width):n.width)/r,s=(a?ze(n.height):n.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!s||!Number.isFinite(s))&&(s=1),{x:i,y:s}}const Xi=X(0);function sr(e){const t=H(e);return!Ft()||!t.visualViewport?Xi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Zi(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==H(e)?!1:t}function pe(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),a=_t(e);let i=X(1);t&&(r?z(r)&&(i=ge(r)):i=ge(e));const s=Zi(a,n,r)?sr(a):X(0);let l=(o.left+s.x)/i.x,c=(o.top+s.y)/i.y,d=o.width/i.x,p=o.height/i.y;if(a){const m=H(a),f=r&&z(r)?H(r):r;let h=m,g=bt(h);for(;g&&r&&f!==h;){const x=ge(g),y=g.getBoundingClientRect(),v=V(g),w=y.left+(g.clientLeft+parseFloat(v.paddingLeft))*x.x,E=y.top+(g.clientTop+parseFloat(v.paddingTop))*x.y;l*=x.x,c*=x.y,d*=x.x,p*=x.y,l+=w,c+=E,h=H(g),g=bt(h)}}return Je({width:d,height:p,x:l,y:c})}function nt(e,t){const n=tt(e).scrollLeft;return t?t.left+n:pe(Z(e)).left+n}function lr(e,t){const n=e.getBoundingClientRect(),r=n.left+t.scrollLeft-nt(e,n),o=n.top+t.scrollTop;return{x:r,y:o}}function Qi(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const a=o==="fixed",i=Z(r),s=t?et(t.floating):!1;if(r===i||s&&a)return n;let l={scrollLeft:0,scrollTop:0},c=X(1);const d=X(0),p=oe(r);if((p||!p&&!a)&&((Re(r)!=="body"||Ae(i))&&(l=tt(r)),p)){const f=pe(r);c=ge(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}const m=i&&!p&&!a?lr(i,l):X(0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-l.scrollLeft*c.x+d.x+m.x,y:n.y*c.y-l.scrollTop*c.y+d.y+m.y}}function Ki(e){return Array.from(e.getClientRects())}function es(e){const t=Z(e),n=tt(e),r=e.ownerDocument.body,o=B(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=B(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+nt(e);const s=-n.scrollTop;return V(r).direction==="rtl"&&(i+=B(t.clientWidth,r.clientWidth)-o),{width:o,height:a,x:i,y:s}}const bn=25;function ts(e,t){const n=H(e),r=Z(e),o=n.visualViewport;let a=r.clientWidth,i=r.clientHeight,s=0,l=0;if(o){a=o.width,i=o.height;const d=Ft();(!d||d&&t==="fixed")&&(s=o.offsetLeft,l=o.offsetTop)}const c=nt(r);if(c<=0){const d=r.ownerDocument,p=d.body,m=getComputedStyle(p),f=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,h=Math.abs(r.clientWidth-p.clientWidth-f);h<=bn&&(a-=h)}else c<=bn&&(a+=c);return{width:a,height:i,x:s,y:l}}function ns(e,t){const n=pe(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,a=oe(e)?ge(e):X(1),i=e.clientWidth*a.x,s=e.clientHeight*a.y,l=o*a.x,c=r*a.y;return{width:i,height:s,x:l,y:c}}function vn(e,t,n){let r;if(t==="viewport")r=ts(e,n);else if(t==="document")r=es(Z(e));else if(z(t))r=ns(t,n);else{const o=sr(e);r={x:t.x-o.x,y:t.y-o.y,width:t.width,height:t.height}}return Je(r)}function cr(e,t){const n=se(e);return n===t||!z(n)||ye(n)?!1:V(n).position==="fixed"||cr(n,t)}function rs(e,t){const n=t.get(e);if(n)return n;let r=Pe(e,[],!1).filter(s=>z(s)&&Re(s)!=="body"),o=null;const a=V(e).position==="fixed";let i=a?se(e):e;for(;z(i)&&!ye(i);){const s=V(i),l=$t(i);!l&&s.position==="fixed"&&(o=null),(a?!l&&!o:!l&&s.position==="static"&&!!o&&(o.position==="absolute"||o.position==="fixed")||Ae(i)&&!l&&cr(e,i))?r=r.filter(d=>d!==i):o=s,i=se(i)}return t.set(e,r),r}function os(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const i=[...n==="clippingAncestors"?et(t)?[]:rs(t,this._c):[].concat(n),r],s=vn(t,i[0],o);let l=s.top,c=s.right,d=s.bottom,p=s.left;for(let m=1;m<i.length;m++){const f=vn(t,i[m],o);l=B(f.top,l),c=ie(f.right,c),d=ie(f.bottom,d),p=B(f.left,p)}return{width:c-p,height:d-l,x:p,y:l}}function as(e){const{width:t,height:n}=ir(e);return{width:t,height:n}}function is(e,t,n){const r=oe(t),o=Z(t),a=n==="fixed",i=pe(e,!0,a,t);let s={scrollLeft:0,scrollTop:0};const l=X(0);function c(){l.x=nt(o)}if(r||!r&&!a)if((Re(t)!=="body"||Ae(o))&&(s=tt(t)),r){const f=pe(t,!0,a,t);l.x=f.x+t.clientLeft,l.y=f.y+t.clientTop}else o&&c();a&&!r&&o&&c();const d=o&&!r&&!a?lr(o,s):X(0),p=i.left+s.scrollLeft-l.x-d.x,m=i.top+s.scrollTop-l.y-d.y;return{x:p,y:m,width:i.width,height:i.height}}function ut(e){return V(e).position==="static"}function wn(e,t){if(!oe(e)||V(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return Z(e)===n&&(n=n.ownerDocument.body),n}function ur(e,t){const n=H(e);if(et(e))return n;if(!oe(e)){let o=se(e);for(;o&&!ye(o);){if(z(o)&&!ut(o))return o;o=se(o)}return n}let r=wn(e,t);for(;r&&Ji(r)&&ut(r);)r=wn(r,t);return r&&ye(r)&&ut(r)&&!$t(r)?n:r||qi(e)||n}const ss=async function(e){const t=this.getOffsetParent||ur,n=this.getDimensions,r=await n(e.floating);return{reference:is(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ls(e){return V(e).direction==="rtl"}const cs={convertOffsetParentRelativeRectToViewportRelativeRect:Qi,getDocumentElement:Z,getClippingRect:os,getOffsetParent:ur,getElementRects:ss,getClientRects:Ki,getDimensions:as,getScale:ge,isElement:z,isRTL:ls};function dr(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function us(e,t){let n=null,r;const o=Z(e);function a(){var s;clearTimeout(r),(s=n)==null||s.disconnect(),n=null}function i(s,l){s===void 0&&(s=!1),l===void 0&&(l=1),a();const c=e.getBoundingClientRect(),{left:d,top:p,width:m,height:f}=c;if(s||t(),!m||!f)return;const h=$e(p),g=$e(o.clientWidth-(d+m)),x=$e(o.clientHeight-(p+f)),y=$e(d),w={rootMargin:-h+"px "+-g+"px "+-x+"px "+-y+"px",threshold:B(0,ie(1,l))||1};let E=!0;function R(S){const C=S[0].intersectionRatio;if(C!==l){if(!E)return i();C?i(!1,C):r=setTimeout(()=>{i(!1,1e-7)},1e3)}C===1&&!dr(c,e.getBoundingClientRect())&&i(),E=!1}try{n=new IntersectionObserver(R,{...w,root:o.ownerDocument})}catch{n=new IntersectionObserver(R,w)}n.observe(e)}return i(!0),a}function ds(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,c=_t(e),d=o||a?[...c?Pe(c):[],...t?Pe(t):[]]:[];d.forEach(y=>{o&&y.addEventListener("scroll",n,{passive:!0}),a&&y.addEventListener("resize",n)});const p=c&&s?us(c,n):null;let m=-1,f=null;i&&(f=new ResizeObserver(y=>{let[v]=y;v&&v.target===c&&f&&t&&(f.unobserve(t),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var w;(w=f)==null||w.observe(t)})),n()}),c&&!l&&f.observe(c),t&&f.observe(t));let h,g=l?pe(e):null;l&&x();function x(){const y=pe(e);g&&!dr(g,y)&&n(),g=y,h=requestAnimationFrame(x)}return n(),()=>{var y;d.forEach(v=>{o&&v.removeEventListener("scroll",n),a&&v.removeEventListener("resize",n)}),p==null||p(),(y=f)==null||y.disconnect(),f=null,l&&cancelAnimationFrame(h)}}const ps=Wi,ms=Ui,fs=_i,hs=Vi,gs=Bi,En=Fi,ys=zi,xs=(e,t,n)=>{const r=new Map,o={platform:cs,...n},a={...o.platform,_c:r};return $i(e,t,{...o,platform:a})};var bs=typeof document<"u",vs=function(){},We=bs?u.useLayoutEffect:vs;function Ge(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!Ge(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;r--!==0;){const a=o[r];if(!(a==="_owner"&&e.$$typeof)&&!Ge(e[a],t[a]))return!1}return!0}return e!==e&&t!==t}function pr(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Rn(e,t){const n=pr(e);return Math.round(t*n)/n}function dt(e){const t=u.useRef(e);return We(()=>{t.current=e}),t}function ws(e){e===void 0&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:a,floating:i}={},transform:s=!0,whileElementsMounted:l,open:c}=e,[d,p]=u.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[m,f]=u.useState(r);Ge(m,r)||f(r);const[h,g]=u.useState(null),[x,y]=u.useState(null),v=u.useCallback(k=>{k!==S.current&&(S.current=k,g(k))},[]),w=u.useCallback(k=>{k!==C.current&&(C.current=k,y(k))},[]),E=a||h,R=i||x,S=u.useRef(null),C=u.useRef(null),P=u.useRef(d),A=l!=null,M=dt(l),D=dt(o),$=dt(c),I=u.useCallback(()=>{if(!S.current||!C.current)return;const k={placement:t,strategy:n,middleware:m};D.current&&(k.platform=D.current),xs(S.current,C.current,k).then(_=>{const G={..._,isPositioned:$.current!==!1};T.current&&!Ge(P.current,G)&&(P.current=G,Cn.flushSync(()=>{p(G)}))})},[m,t,n,D,$]);We(()=>{c===!1&&P.current.isPositioned&&(P.current.isPositioned=!1,p(k=>({...k,isPositioned:!1})))},[c]);const T=u.useRef(!1);We(()=>(T.current=!0,()=>{T.current=!1}),[]),We(()=>{if(E&&(S.current=E),R&&(C.current=R),E&&R){if(M.current)return M.current(E,R,I);I()}},[E,R,I,M,A]);const j=u.useMemo(()=>({reference:S,floating:C,setReference:v,setFloating:w}),[v,w]),N=u.useMemo(()=>({reference:E,floating:R}),[E,R]),O=u.useMemo(()=>{const k={position:n,left:0,top:0};if(!N.floating)return k;const _=Rn(N.floating,d.x),G=Rn(N.floating,d.y);return s?{...k,transform:"translate("+_+"px, "+G+"px)",...pr(N.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:_,top:G}},[n,s,N.floating,d.x,d.y]);return u.useMemo(()=>({...d,update:I,refs:j,elements:N,floatingStyles:O}),[d,I,j,N,O])}const Es=e=>{function t(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:e,fn(n){const{element:r,padding:o}=typeof e=="function"?e(n):e;return r&&t(r)?r.current!=null?En({element:r.current,padding:o}).fn(n):{}:r?En({element:r,padding:o}).fn(n):{}}}},Rs=(e,t)=>{const n=ps(e);return{name:n.name,fn:n.fn,options:[e,t]}},Cs=(e,t)=>{const n=ms(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ss=(e,t)=>({fn:ys(e).fn,options:[e,t]}),ks=(e,t)=>{const n=fs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ps=(e,t)=>{const n=hs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ms=(e,t)=>{const n=gs(e);return{name:n.name,fn:n.fn,options:[e,t]}},Ts=(e,t)=>{const n=Es(e);return{name:n.name,fn:n.fn,options:[e,t]}};var Ls="Arrow",mr=u.forwardRef((e,t)=>{const{children:n,width:r=10,height:o=5,...a}=e;return b.jsx(le.svg,{...a,ref:t,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:b.jsx("polygon",{points:"0,0 30,0 15,10"})})});mr.displayName=Ls;var As=mr;function Is(e){const[t,n]=u.useState(void 0);return ae(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const a=o[0];let i,s;if("borderBoxSize"in a){const l=a.borderBoxSize,c=Array.isArray(l)?l[0]:l;i=c.inlineSize,s=c.blockSize}else i=e.offsetWidth,s=e.offsetHeight;n({width:i,height:s})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}var Bt="Popper",[fr,hr]=Zn(Bt),[js,gr]=fr(Bt),yr=e=>{const{__scopePopper:t,children:n}=e,[r,o]=u.useState(null);return b.jsx(js,{scope:t,anchor:r,onAnchorChange:o,children:n})};yr.displayName=Bt;var xr="PopperAnchor",br=u.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...o}=e,a=gr(xr,n),i=u.useRef(null),s=me(t,i),l=u.useRef(null);return u.useEffect(()=>{const c=l.current;l.current=(r==null?void 0:r.current)||i.current,c!==l.current&&a.onAnchorChange(l.current)}),r?null:b.jsx(le.div,{...o,ref:s})});br.displayName=xr;var Ht="PopperContent",[Ns,Os]=fr(Ht),vr=u.forwardRef((e,t)=>{var Vt,Jt,Gt,Yt,qt,Xt;const{__scopePopper:n,side:r="bottom",sideOffset:o=0,align:a="center",alignOffset:i=0,arrowPadding:s=0,avoidCollisions:l=!0,collisionBoundary:c=[],collisionPadding:d=0,sticky:p="partial",hideWhenDetached:m=!1,updatePositionStrategy:f="optimized",onPlaced:h,...g}=e,x=gr(Ht,n),[y,v]=u.useState(null),w=me(t,Ce=>v(Ce)),[E,R]=u.useState(null),S=Is(E),C=(S==null?void 0:S.width)??0,P=(S==null?void 0:S.height)??0,A=r+(a!=="center"?"-"+a:""),M=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},D=Array.isArray(c)?c:[c],$=D.length>0,I={padding:M,boundary:D.filter($s),altBoundary:$},{refs:T,floatingStyles:j,placement:N,isPositioned:O,middlewareData:k}=ws({strategy:"fixed",placement:A,whileElementsMounted:(...Ce)=>ds(...Ce,{animationFrame:f==="always"}),elements:{reference:x.anchor},middleware:[Rs({mainAxis:o+P,alignmentAxis:i}),l&&Cs({mainAxis:!0,crossAxis:!1,limiter:p==="partial"?Ss():void 0,...I}),l&&ks({...I}),Ps({...I,apply:({elements:Ce,rects:Zt,availableWidth:Ur,availableHeight:zr})=>{const{width:Vr,height:Jr}=Zt.reference,Ne=Ce.floating.style;Ne.setProperty("--radix-popper-available-width",`${Ur}px`),Ne.setProperty("--radix-popper-available-height",`${zr}px`),Ne.setProperty("--radix-popper-anchor-width",`${Vr}px`),Ne.setProperty("--radix-popper-anchor-height",`${Jr}px`)}}),E&&Ts({element:E,padding:s}),Fs({arrowWidth:C,arrowHeight:P}),m&&Ms({strategy:"referenceHidden",...I})]}),[_,G]=Rr(N),je=Qe(h);ae(()=>{O&&(je==null||je())},[O,je]);const Fr=(Vt=k.arrow)==null?void 0:Vt.x,_r=(Jt=k.arrow)==null?void 0:Jt.y,Br=((Gt=k.arrow)==null?void 0:Gt.centerOffset)!==0,[Hr,Wr]=u.useState();return ae(()=>{y&&Wr(window.getComputedStyle(y).zIndex)},[y]),b.jsx("div",{ref:T.setFloating,"data-radix-popper-content-wrapper":"",style:{...j,transform:O?j.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Hr,"--radix-popper-transform-origin":[(Yt=k.transformOrigin)==null?void 0:Yt.x,(qt=k.transformOrigin)==null?void 0:qt.y].join(" "),...((Xt=k.hide)==null?void 0:Xt.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:b.jsx(Ns,{scope:n,placedSide:_,onArrowChange:R,arrowX:Fr,arrowY:_r,shouldHideArrow:Br,children:b.jsx(le.div,{"data-side":_,"data-align":G,...g,ref:w,style:{...g.style,animation:O?void 0:"none"}})})})});vr.displayName=Ht;var wr="PopperArrow",Ds={top:"bottom",right:"left",bottom:"top",left:"right"},Er=u.forwardRef(function(t,n){const{__scopePopper:r,...o}=t,a=Os(wr,r),i=Ds[a.placedSide];return b.jsx("span",{ref:a.onArrowChange,style:{position:"absolute",left:a.arrowX,top:a.arrowY,[i]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[a.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[a.placedSide],visibility:a.shouldHideArrow?"hidden":void 0},children:b.jsx(As,{...o,ref:n,style:{...o.style,display:"block"}})})});Er.displayName=wr;function $s(e){return e!==null}var Fs=e=>({name:"transformOrigin",options:e,fn(t){var x,y,v;const{placement:n,rects:r,middlewareData:o}=t,i=((x=o.arrow)==null?void 0:x.centerOffset)!==0,s=i?0:e.arrowWidth,l=i?0:e.arrowHeight,[c,d]=Rr(n),p={start:"0%",center:"50%",end:"100%"}[d],m=(((y=o.arrow)==null?void 0:y.x)??0)+s/2,f=(((v=o.arrow)==null?void 0:v.y)??0)+l/2;let h="",g="";return c==="bottom"?(h=i?p:`${m}px`,g=`${-l}px`):c==="top"?(h=i?p:`${m}px`,g=`${r.floating.height+l}px`):c==="right"?(h=`${-l}px`,g=i?p:`${f}px`):c==="left"&&(h=`${r.floating.width+l}px`,g=i?p:`${f}px`),{data:{x:h,y:g}}}});function Rr(e){const[t,n="center"]=e.split("-");return[t,n]}var _s=yr,Bs=br,Hs=vr,Ws=Er,Us="Portal",Cr=u.forwardRef((e,t)=>{var s;const{container:n,...r}=e,[o,a]=u.useState(!1);ae(()=>a(!0),[]);const i=n||o&&((s=globalThis==null?void 0:globalThis.document)==null?void 0:s.body);return i?Gr.createPortal(b.jsx(le.div,{...r,ref:t}),i):null});Cr.displayName=Us;function zs(e,t){return u.useReducer((n,r)=>t[n][r]??n,e)}var Wt=e=>{const{present:t,children:n}=e,r=Vs(t),o=typeof n=="function"?n({present:r.isPresent}):u.Children.only(n),a=me(r.ref,Js(o));return typeof n=="function"||r.isPresent?u.cloneElement(o,{ref:a}):null};Wt.displayName="Presence";function Vs(e){const[t,n]=u.useState(),r=u.useRef(null),o=u.useRef(e),a=u.useRef("none"),i=e?"mounted":"unmounted",[s,l]=zs(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return u.useEffect(()=>{const c=Fe(r.current);a.current=s==="mounted"?c:"none"},[s]),ae(()=>{const c=r.current,d=o.current;if(d!==e){const m=a.current,f=Fe(c);e?l("MOUNT"):f==="none"||(c==null?void 0:c.display)==="none"?l("UNMOUNT"):l(d&&m!==f?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,l]),ae(()=>{if(t){let c;const d=t.ownerDocument.defaultView??window,p=f=>{const g=Fe(r.current).includes(CSS.escape(f.animationName));if(f.target===t&&g&&(l("ANIMATION_END"),!o.current)){const x=t.style.animationFillMode;t.style.animationFillMode="forwards",c=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=x)})}},m=f=>{f.target===t&&(a.current=Fe(r.current))};return t.addEventListener("animationstart",m),t.addEventListener("animationcancel",p),t.addEventListener("animationend",p),()=>{d.clearTimeout(c),t.removeEventListener("animationstart",m),t.removeEventListener("animationcancel",p),t.removeEventListener("animationend",p)}}else l("ANIMATION_END")},[t,l]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:u.useCallback(c=>{r.current=c?getComputedStyle(c):null,n(c)},[])}}function Fe(e){return(e==null?void 0:e.animationName)||"none"}function Js(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Gs=Sn[" useInsertionEffect ".trim().toString()]||ae;function Ys({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,a,i]=qs({defaultProp:t,onChange:n}),s=e!==void 0,l=s?e:o;{const d=u.useRef(e!==void 0);u.useEffect(()=>{const p=d.current;p!==s&&console.warn(`${r} is changing from ${p?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=s},[s,r])}const c=u.useCallback(d=>{var p;if(s){const m=Xs(d)?d(e):d;m!==e&&((p=i.current)==null||p.call(i,m))}else a(d)},[s,e,a,i]);return[l,c]}function qs({defaultProp:e,onChange:t}){const[n,r]=u.useState(e),o=u.useRef(n),a=u.useRef(t);return Gs(()=>{a.current=t},[t]),u.useEffect(()=>{var i;o.current!==n&&((i=a.current)==null||i.call(a,n),o.current=n)},[n,o]),[n,r,a]}function Xs(e){return typeof e=="function"}var Zs=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),Qs="VisuallyHidden",Sr=u.forwardRef((e,t)=>b.jsx(le.span,{...e,ref:t,style:{...Zs,...e.style}}));Sr.displayName=Qs;var Ks=Sr,[rt]=Zn("Tooltip",[hr]),ot=hr(),kr="TooltipProvider",el=700,vt="tooltip.open",[tl,Ut]=rt(kr),Pr=e=>{const{__scopeTooltip:t,delayDuration:n=el,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:a}=e,i=u.useRef(!0),s=u.useRef(!1),l=u.useRef(0);return u.useEffect(()=>{const c=l.current;return()=>window.clearTimeout(c)},[]),b.jsx(tl,{scope:t,isOpenDelayedRef:i,delayDuration:n,onOpen:u.useCallback(()=>{window.clearTimeout(l.current),i.current=!1},[]),onClose:u.useCallback(()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>i.current=!0,r)},[r]),isPointerInTransitRef:s,onPointerInTransitChange:u.useCallback(c=>{s.current=c},[]),disableHoverableContent:o,children:a})};Pr.displayName=kr;var Me="Tooltip",[nl,Ie]=rt(Me),Mr=e=>{const{__scopeTooltip:t,children:n,open:r,defaultOpen:o,onOpenChange:a,disableHoverableContent:i,delayDuration:s}=e,l=Ut(Me,e.__scopeTooltip),c=ot(t),[d,p]=u.useState(null),m=Si(),f=u.useRef(0),h=i??l.disableHoverableContent,g=s??l.delayDuration,x=u.useRef(!1),[y,v]=Ys({prop:r,defaultProp:o??!1,onChange:C=>{C?(l.onOpen(),document.dispatchEvent(new CustomEvent(vt))):l.onClose(),a==null||a(C)},caller:Me}),w=u.useMemo(()=>y?x.current?"delayed-open":"instant-open":"closed",[y]),E=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,x.current=!1,v(!0)},[v]),R=u.useCallback(()=>{window.clearTimeout(f.current),f.current=0,v(!1)},[v]),S=u.useCallback(()=>{window.clearTimeout(f.current),f.current=window.setTimeout(()=>{x.current=!0,v(!0),f.current=0},g)},[g,v]);return u.useEffect(()=>()=>{f.current&&(window.clearTimeout(f.current),f.current=0)},[]),b.jsx(_s,{...c,children:b.jsx(nl,{scope:t,contentId:m,open:y,stateAttribute:w,trigger:d,onTriggerChange:p,onTriggerEnter:u.useCallback(()=>{l.isOpenDelayedRef.current?S():E()},[l.isOpenDelayedRef,S,E]),onTriggerLeave:u.useCallback(()=>{h?R():(window.clearTimeout(f.current),f.current=0)},[R,h]),onOpen:E,onClose:R,disableHoverableContent:h,children:n})})};Mr.displayName=Me;var wt="TooltipTrigger",Tr=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=Ie(wt,n),a=Ut(wt,n),i=ot(n),s=u.useRef(null),l=me(t,s,o.onTriggerChange),c=u.useRef(!1),d=u.useRef(!1),p=u.useCallback(()=>c.current=!1,[]);return u.useEffect(()=>()=>document.removeEventListener("pointerup",p),[p]),b.jsx(Bs,{asChild:!0,...i,children:b.jsx(le.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:l,onPointerMove:K(e.onPointerMove,m=>{m.pointerType!=="touch"&&!d.current&&!a.isPointerInTransitRef.current&&(o.onTriggerEnter(),d.current=!0)}),onPointerLeave:K(e.onPointerLeave,()=>{o.onTriggerLeave(),d.current=!1}),onPointerDown:K(e.onPointerDown,()=>{o.open&&o.onClose(),c.current=!0,document.addEventListener("pointerup",p,{once:!0})}),onFocus:K(e.onFocus,()=>{c.current||o.onOpen()}),onBlur:K(e.onBlur,o.onClose),onClick:K(e.onClick,o.onClose)})})});Tr.displayName=wt;var zt="TooltipPortal",[rl,ol]=rt(zt,{forceMount:void 0}),Lr=e=>{const{__scopeTooltip:t,forceMount:n,children:r,container:o}=e,a=Ie(zt,t);return b.jsx(rl,{scope:t,forceMount:n,children:b.jsx(Wt,{present:n||a.open,children:b.jsx(Cr,{asChild:!0,container:o,children:r})})})};Lr.displayName=zt;var xe="TooltipContent",Ar=u.forwardRef((e,t)=>{const n=ol(xe,e.__scopeTooltip),{forceMount:r=n.forceMount,side:o="top",...a}=e,i=Ie(xe,e.__scopeTooltip);return b.jsx(Wt,{present:r||i.open,children:i.disableHoverableContent?b.jsx(Ir,{side:o,...a,ref:t}):b.jsx(al,{side:o,...a,ref:t})})}),al=u.forwardRef((e,t)=>{const n=Ie(xe,e.__scopeTooltip),r=Ut(xe,e.__scopeTooltip),o=u.useRef(null),a=me(t,o),[i,s]=u.useState(null),{trigger:l,onClose:c}=n,d=o.current,{onPointerInTransitChange:p}=r,m=u.useCallback(()=>{s(null),p(!1)},[p]),f=u.useCallback((h,g)=>{const x=h.currentTarget,y={x:h.clientX,y:h.clientY},v=cl(y,x.getBoundingClientRect()),w=ul(y,v),E=dl(g.getBoundingClientRect()),R=ml([...w,...E]);s(R),p(!0)},[p]);return u.useEffect(()=>()=>m(),[m]),u.useEffect(()=>{if(l&&d){const h=x=>f(x,d),g=x=>f(x,l);return l.addEventListener("pointerleave",h),d.addEventListener("pointerleave",g),()=>{l.removeEventListener("pointerleave",h),d.removeEventListener("pointerleave",g)}}},[l,d,f,m]),u.useEffect(()=>{if(i){const h=g=>{const x=g.target,y={x:g.clientX,y:g.clientY},v=(l==null?void 0:l.contains(x))||(d==null?void 0:d.contains(x)),w=!pl(y,i);v?m():w&&(m(),c())};return document.addEventListener("pointermove",h),()=>document.removeEventListener("pointermove",h)}},[l,d,i,c,m]),b.jsx(Ir,{...e,ref:a})}),[il,sl]=rt(Me,{isInside:!1}),ll=ci("TooltipContent"),Ir=u.forwardRef((e,t)=>{const{__scopeTooltip:n,children:r,"aria-label":o,onEscapeKeyDown:a,onPointerDownOutside:i,...s}=e,l=Ie(xe,n),c=ot(n),{onClose:d}=l;return u.useEffect(()=>(document.addEventListener(vt,d),()=>document.removeEventListener(vt,d)),[d]),u.useEffect(()=>{if(l.trigger){const p=m=>{const f=m.target;f!=null&&f.contains(l.trigger)&&d()};return window.addEventListener("scroll",p,{capture:!0}),()=>window.removeEventListener("scroll",p,{capture:!0})}},[l.trigger,d]),b.jsx(er,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:a,onPointerDownOutside:i,onFocusOutside:p=>p.preventDefault(),onDismiss:d,children:b.jsxs(Hs,{"data-state":l.stateAttribute,...c,...s,ref:t,style:{...s.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[b.jsx(ll,{children:r}),b.jsx(il,{scope:n,isInside:!0,children:b.jsx(Ks,{id:l.contentId,role:"tooltip",children:o||r})})]})})});Ar.displayName=xe;var jr="TooltipArrow",Nr=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=ot(n);return sl(jr,n).isInside?null:b.jsx(Ws,{...o,...r,ref:t})});Nr.displayName=jr;function cl(e,t){const n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),a=Math.abs(t.left-e.x);switch(Math.min(n,r,o,a)){case a:return"left";case o:return"right";case n:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function ul(e,t,n=5){const r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return r}function dl(e){const{top:t,right:n,bottom:r,left:o}=e;return[{x:o,y:t},{x:n,y:t},{x:n,y:r},{x:o,y:r}]}function pl(e,t){const{x:n,y:r}=e;let o=!1;for(let a=0,i=t.length-1;a<t.length;i=a++){const s=t[a],l=t[i],c=s.x,d=s.y,p=l.x,m=l.y;d>r!=m>r&&n<(p-c)*(r-d)/(m-d)+c&&(o=!o)}return o}function ml(e){const t=e.slice();return t.sort((n,r)=>n.x<r.x?-1:n.x>r.x?1:n.y<r.y?-1:n.y>r.y?1:0),fl(t)}function fl(e){if(e.length<=1)return e.slice();const t=[];for(let r=0;r<e.length;r++){const o=e[r];for(;t.length>=2;){const a=t[t.length-1],i=t[t.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))t.pop();else break}t.push(o)}t.pop();const n=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;n.length>=2;){const a=n[n.length-1],i=n[n.length-2];if((a.x-i.x)*(o.y-i.y)>=(a.y-i.y)*(o.x-i.x))n.pop();else break}n.push(o)}return n.pop(),t.length===1&&n.length===1&&t[0].x===n[0].x&&t[0].y===n[0].y?t:t.concat(n)}var hl=Pr,gl=Mr,yl=Tr,xl=Lr,bl=Ar,vl=Nr;const wl=({children:e})=>b.jsx(hl,{delayDuration:200,children:e}),Or=({content:e,children:t})=>b.jsxs(gl,{children:[b.jsx(yl,{asChild:!0,children:t}),b.jsx(xl,{children:b.jsxs(bl,{className:"z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground",sideOffset:5,children:[e,b.jsx(vl,{className:"fill-secondary",width:8,height:4})]})})]}),El=({files:e,title:t="Joymap Example",className:n="",...r})=>{const o=()=>{ai.openProject({title:t,template:"node",files:e},{newWindow:!0})};return b.jsx(Or,{content:"Edit example on stackblitz",children:b.jsx("button",{type:"button",onClick:o,className:`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${n}`,...r,children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 16 16",children:b.jsx("path",{d:"M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z",fill:"currentColor"})})})})},Rl="/joymap/assets/logo-BXshXfNv.png",Cl="2.2.4",Sl={lodash:"^4.17.21"},kl={"@ckeditor/ckeditor5-react":"^9.0.0","@types/color-hash":"^1.0.5","@types/lodash":"^4.17.24","@types/react":"^18.3.0","@types/react-dom":"^18.3.0","@types/tinycolor2":"^1.4.6",ckeditor5:"43.3.1","color-hash":"^2.0.2","lorem-ipsum":"^2.0.4",phaser:"^3.85.0",react:"^18.3.0","react-dom":"^18.3.0",tinycolor2:"^1.6.0"},Q={version:Cl,dependencies:Sl,devDependencies:kl},{devDependencies:de,version:Pl}=Q,Ml=[[/^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/examples\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,""],[new RegExp("gamepadUrl","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/gamepad.png'"],[new RegExp("l1Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L1.png'"],[new RegExp("l2Url","g"),"'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L2.png'"]];function F(e){return Ml.reduce((t,[n,r])=>t.replaceAll(n,r),e)}const fe=JSON.stringify({compilerOptions:{target:"ESNext",module:"ESNext",moduleResolution:"node",importHelpers:!0,sourceMap:!0,allowSyntheticDefaultImports:!0,rootDir:"./",lib:["esnext","dom"],strict:!0,alwaysStrict:!0,allowJs:!0,baseUrl:"./",jsx:"react",esModuleInterop:!0}}),Dr=`
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
  })
`;function he({dependencies:e={},hasLodash:t=!0,hasReact:n=!1}={}){return JSON.stringify({main:"./index.ts",scripts:{start:"vite",build:"tsc -b && vite build"},dependencies:{joymap:Q.version,typescript:"~5.9.3",vite:"^8.0.0",...t?{lodash:Q.dependencies.lodash,"@types/lodash":Q.devDependencies["@types/lodash"]}:{},...n?{react:Q.devDependencies.react,"react-dom":Q.devDependencies["react-dom"],"@types/react":Q.devDependencies["@types/react"],"@types/react-dom":Q.devDependencies["@types/react-dom"],"@vitejs/plugin-react":"^6.0.1"}:{},...e}})}const Tl=`import { ClassicEditor, Model } from 'ckeditor5/dist';\r
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
`,Ll=`import { LoremIpsum } from 'lorem-ipsum';\r
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
`,Al=`body {
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

`,Il=`import React, { useEffect, useState } from 'react';\r
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
`,Ol={"Editor.tsx":F(Il),"commands.ts":F(Ll),"custom.css":F(Al),"index.ts":F(Nl),"index.html":jl,"ckHelpers.ts":F(Tl),"package.json":he({hasLodash:!1,hasReact:!0,dependencies:{"@ckeditor/ckeditor5-react":de["@ckeditor/ckeditor5-react"],ckeditor5:de.ckeditor5,"lorem-ipsum":de["lorem-ipsum"]}}),"tsconfig.json":fe,"vite.config.ts":Dr},Dl=`body {\r
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
`,$l=`<!doctype html>\r
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
`,_l={"index.ts":F(Fl),"Fighting.css":Dl,"index.html":$l,"package.json":he({hasLodash:!0,hasReact:!1}),"tsconfig.json":fe},Bl=`<!doctype html>\r
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
`,zl={"index.ts":F(Hl),"utils.ts":F(Ul),"Log.css":Wl,"index.html":Bl,"package.json":he({hasLodash:!0,hasReact:!1}),"tsconfig.json":fe},Vl=`<!doctype html>\r
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
    </style>\r
  </head>\r
\r
  <body>\r
    <div id="app">\r
      <h1 class="mb-2 text-3xl font-bold">Gamepad Navigation Demo</h1>\r
\r
      <section>\r
        <h2 class="mb-2 text-lg font-semibold text-purple-400">Controls</h2>\r
        <ul class="space-y-1 text-sm text-gray-400">\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">D-pad</kbd> - Navigate\r
            spatially (up/down/left/right)\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">L1</kbd> /\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">R1</kbd> - Previous / Next\r
            (Tab-like)\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">A</kbd> - Click / Activate\r
          </li>\r
          <li>\r
            <kbd class="rounded bg-gray-700 px-2 py-0.5 text-gray-300">Right Stick</kbd> - Scroll\r
            (vertical & horizontal)\r
          </li>\r
        </ul>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Buttons</h2>\r
        <div class="flex flex-wrap gap-2">\r
          <button class="rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 1\r
          </button>\r
          <button class="rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 2\r
          </button>\r
          <button class="rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-500">\r
            Button 3\r
          </button>\r
          <button class="rounded bg-gray-600 px-4 py-2" disabled>Disabled Button</button>\r
          <button class="rounded bg-green-600 px-4 py-2 transition-colors hover:bg-green-500">\r
            Button 4\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 class="mb-2 text-xl font-semibold">Horizontal Gallery</h2>\r
        <div class="flex gap-4 overflow-x-auto pb-4" style="max-width: 100%">\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-pink-500 to-rose-500 transition-colors hover:from-pink-400 hover:to-rose-400"\r
          >\r
            <span class="block font-semibold">Card 1</span>\r
          </button>\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-violet-500 to-purple-500 transition-colors hover:from-violet-400 hover:to-purple-400"\r
          >\r
            <span class="block font-semibold">Card 2</span>\r
          </button>\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-blue-500 to-cyan-500 transition-colors hover:from-blue-400 hover:to-cyan-400"\r
          >\r
            <span class="block font-semibold">Card 3</span>\r
          </button>\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-emerald-500 to-teal-500 transition-colors hover:from-emerald-400 hover:to-teal-400"\r
          >\r
            <span class="block font-semibold">Card 4</span>\r
          </button>\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-amber-500 to-orange-500 transition-colors hover:from-amber-400 hover:to-orange-400"\r
          >\r
            <span class="block font-semibold">Card 5</span>\r
          </button>\r
          <button\r
            class="h-24 w-40 shrink-0 rounded bg-gradient-to-br from-red-500 to-rose-600 transition-colors hover:from-red-400 hover:to-rose-500"\r
          >\r
            <span class="block font-semibold">Card 6</span>\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 id="focusables-heading" class="mb-2 text-xl font-semibold">Form Elements</h2>\r
        <div class="flex flex-wrap items-center gap-4">\r
          <input\r
            type="text"\r
            placeholder="Text input"\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          />\r
          <input\r
            type="email"\r
            placeholder="Email input"\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          />\r
          <input type="checkbox" id="check1" class="h-5 w-5 accent-purple-500" />\r
          <label for="check1">Checkbox</label>\r
          <input type="checkbox" id="check2" class="h-5 w-5 accent-purple-500" />\r
          <label for="check2">Another checkbox</label>\r
          <select\r
            class="rounded border border-gray-600 bg-gray-700 px-3 py-2 focus:border-purple-500"\r
          >\r
            <option>Select option</option>\r
            <option>Option 1</option>\r
            <option>Option 2</option>\r
          </select>\r
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
            ><span>Color:</span\r
            ><input type="color" class="h-10 w-10 cursor-pointer rounded accent-purple-500"\r
          /></label>\r
          <label class="flex items-center gap-2"\r
            ><span>Range:</span><input type="range" min="0" max="100" class="accent-purple-500"\r
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
        <div id="pixel-art" class="h-96 w-96 overflow-auto"></div>\r
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
`,Jl=`import { createEventModule, createJoymap, StickResult } from 'joymap';\r
\r
import { generatePixelArtContainer, PIXEL_ART_SIZE } from './pixelArt';\r
\r
type Direction = 'right' | 'left' | 'down' | 'up';\r
\r
const INITIAL_DELAY = 400;\r
const REPEAT_RATE = 33;\r
\r
type RepeatState = {\r
  lastTriggerTime: number;\r
  isRepeating: boolean;\r
};\r
\r
const repeatStates: Record<Direction | 'tabNext' | 'tabPrev', RepeatState> = {\r
  right: { lastTriggerTime: 0, isRepeating: false },\r
  left: { lastTriggerTime: 0, isRepeating: false },\r
  up: { lastTriggerTime: 0, isRepeating: false },\r
  down: { lastTriggerTime: 0, isRepeating: false },\r
  tabNext: { lastTriggerTime: 0, isRepeating: false },\r
  tabPrev: { lastTriggerTime: 0, isRepeating: false },\r
};\r
\r
const focusablesHeading = document.getElementById('focusables-heading') as HTMLElement | null;\r
\r
function getNextFocus(direction: Direction, focusables: HTMLElement[], current: HTMLElement) {\r
  let best: HTMLElement | null = null;\r
  let bestScore = Infinity;\r
\r
  for (const el of focusables) {\r
    if (el === current) continue;\r
    const currPos = current.getBoundingClientRect();\r
    const elPos = el.getBoundingClientRect();\r
\r
    const dx = elPos.x - currPos.x;\r
    const dy = elPos.y - currPos.y;\r
\r
    // reject elements not in that direction\r
    if (direction === 'right' && dx <= 0) continue;\r
    if (direction === 'left' && dx >= 0) continue;\r
    if (direction === 'down' && dy <= 0) continue;\r
    if (direction === 'up' && dy >= 0) continue;\r
\r
    // Euclidean distance\r
    const distance = Math.sqrt(dx * dx + dy * dy);\r
\r
    // perpendicular distance to the direction\r
    let perpendicular = 0;\r
    if (direction === 'right' || direction === 'left') perpendicular = Math.abs(dy);\r
    if (direction === 'up' || direction === 'down') perpendicular = Math.abs(dx);\r
\r
    // weight perpendicular distance\r
    const score = distance + perpendicular * 2; // 2 = penalty factor\r
\r
    if (score < bestScore) {\r
      bestScore = score;\r
      best = el;\r
    }\r
  }\r
\r
  return best;\r
}\r
\r
function getFocusableElements() {\r
  return Array.from(\r
    document.querySelectorAll<HTMLElement>(\r
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',\r
    ),\r
  ).filter((el) => !el.hasAttribute('disabled'));\r
}\r
\r
function getScrollableAncestor(element: HTMLElement): HTMLElement | null {\r
  let current: HTMLElement | null = element.parentElement;\r
\r
  while (current) {\r
    const style = window.getComputedStyle(current);\r
    const overflowX = style.getPropertyValue('overflow-x');\r
    const overflowY = style.getPropertyValue('overflow-y');\r
\r
    if (\r
      overflowX === 'auto' ||\r
      overflowX === 'scroll' ||\r
      overflowY === 'auto' ||\r
      overflowY === 'scroll'\r
    ) {\r
      return current;\r
    }\r
\r
    current = current.parentElement;\r
  }\r
\r
  return null;\r
}\r
\r
function moveFocus(direction: Direction) {\r
  const focusables = getFocusableElements();\r
  const current = document.activeElement as HTMLElement;\r
  const next = getNextFocus(direction, focusables, current);\r
  next?.focus();\r
}\r
\r
function tabNext() {\r
  const focusables = getFocusableElements();\r
  const current = document.activeElement as HTMLElement;\r
  const currentIndex = focusables.indexOf(current);\r
  const nextIndex = (currentIndex + 1) % focusables.length;\r
  focusables[nextIndex]?.focus();\r
}\r
\r
function tabPrev() {\r
  const focusables = getFocusableElements();\r
  const current = document.activeElement as HTMLElement;\r
  const currentIndex = focusables.indexOf(current);\r
  const prevIndex = (currentIndex - 1 + focusables.length) % focusables.length;\r
  focusables[prevIndex]?.focus();\r
}\r
\r
function handleRepeat(key: keyof typeof repeatStates, moveFn: () => void) {\r
  const state = repeatStates[key];\r
  const now = performance.now();\r
  const elapsed = now - state.lastTriggerTime;\r
  const threshold = state.lastTriggerTime === 0 ? INITIAL_DELAY : REPEAT_RATE;\r
\r
  if (elapsed >= threshold) {\r
    moveFn();\r
    state.lastTriggerTime = now;\r
    state.isRepeating = state.lastTriggerTime > 0;\r
    updateHeading();\r
  }\r
}\r
\r
function updateHeading() {\r
  const isRepeating = Object.values(repeatStates).some((s) => s.isRepeating);\r
  if (focusablesHeading) {\r
    focusablesHeading.textContent = isRepeating ? 'Form Elements [repeating]' : 'Form Elements';\r
  }\r
}\r
\r
const joymap = createJoymap();\r
const module = createEventModule();\r
joymap.addModule(module);\r
\r
module.addEvent('dpadRight.justPressed', () => {\r
  repeatStates.right.lastTriggerTime = 0;\r
  moveFocus('right');\r
});\r
\r
module.addEvent('dpadRight.pressed', () => {\r
  handleRepeat('right', () => moveFocus('right'));\r
});\r
\r
module.addEvent('dpadRight.released', () => {\r
  repeatStates.right.lastTriggerTime = 0;\r
  repeatStates.right.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('dpadLeft.justPressed', () => {\r
  repeatStates.left.lastTriggerTime = 0;\r
  moveFocus('left');\r
});\r
\r
module.addEvent('dpadLeft.pressed', () => {\r
  handleRepeat('left', () => moveFocus('left'));\r
});\r
\r
module.addEvent('dpadLeft.released', () => {\r
  repeatStates.left.lastTriggerTime = 0;\r
  repeatStates.left.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('dpadUp.justPressed', () => {\r
  repeatStates.up.lastTriggerTime = 0;\r
  moveFocus('up');\r
});\r
\r
module.addEvent('dpadUp.pressed', () => {\r
  handleRepeat('up', () => moveFocus('up'));\r
});\r
\r
module.addEvent('dpadUp.released', () => {\r
  repeatStates.up.lastTriggerTime = 0;\r
  repeatStates.up.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('dpadDown.justPressed', () => {\r
  repeatStates.down.lastTriggerTime = 0;\r
  moveFocus('down');\r
});\r
\r
module.addEvent('dpadDown.pressed', () => {\r
  handleRepeat('down', () => moveFocus('down'));\r
});\r
\r
module.addEvent('dpadDown.released', () => {\r
  repeatStates.down.lastTriggerTime = 0;\r
  repeatStates.down.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('R1.justPressed', () => {\r
  repeatStates.tabNext.lastTriggerTime = 0;\r
  tabNext();\r
});\r
\r
module.addEvent('R1.pressed', () => {\r
  handleRepeat('tabNext', tabNext);\r
});\r
\r
module.addEvent('R1.released', () => {\r
  repeatStates.tabNext.lastTriggerTime = 0;\r
  repeatStates.tabNext.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('L1.justPressed', () => {\r
  repeatStates.tabPrev.lastTriggerTime = 0;\r
  tabPrev();\r
});\r
\r
module.addEvent('L1.pressed', () => {\r
  handleRepeat('tabPrev', tabPrev);\r
});\r
\r
module.addEvent('L1.released', () => {\r
  repeatStates.tabPrev.lastTriggerTime = 0;\r
  repeatStates.tabPrev.isRepeating = false;\r
  updateHeading();\r
});\r
\r
module.addEvent('A.justPressed', () => {\r
  const current = document.activeElement as HTMLElement;\r
  current?.click();\r
});\r
\r
module.addEvent('R.pressed', (result) => {\r
  const stickResult = result[0] as StickResult;\r
  const [x, y] = stickResult.value;\r
  const current = document.activeElement as HTMLElement;\r
  const scrollableAncestor = getScrollableAncestor(current);\r
\r
  // Vertical scrolling\r
  if (y < -0.2) {\r
    const scrollAmount = y * 10;\r
    if (scrollableAncestor) {\r
      scrollableAncestor.scrollBy({ top: scrollAmount, behavior: 'instant' });\r
    } else {\r
      window.scrollBy({ top: scrollAmount, behavior: 'instant' });\r
    }\r
  }\r
  if (y > 0.2) {\r
    const scrollAmount = y * 10;\r
    if (scrollableAncestor) {\r
      scrollableAncestor.scrollBy({ top: scrollAmount, behavior: 'instant' });\r
    } else {\r
      window.scrollBy({ top: scrollAmount, behavior: 'instant' });\r
    }\r
  }\r
\r
  // Horizontal scrolling\r
  if (x < -0.2) {\r
    const scrollAmount = x * 10;\r
    if (scrollableAncestor) {\r
      scrollableAncestor.scrollBy({ left: scrollAmount, behavior: 'instant' });\r
    } else {\r
      window.scrollBy({ left: scrollAmount, behavior: 'instant' });\r
    }\r
  }\r
  if (x > 0.2) {\r
    const scrollAmount = x * 10;\r
    if (scrollableAncestor) {\r
      scrollableAncestor.scrollBy({ left: scrollAmount, behavior: 'instant' });\r
    } else {\r
      window.scrollBy({ left: scrollAmount, behavior: 'instant' });\r
    }\r
  }\r
});\r
\r
generatePixelArtContainer().then((art) => {\r
  const pixelArtContainer = document.getElementById('pixel-art');\r
  if (pixelArtContainer) {\r
    pixelArtContainer.innerHTML = art;\r
  }\r
});\r
\r
const pixelArtHeading = document.getElementById('pixel-art-heading');\r
if (pixelArtHeading) {\r
  pixelArtHeading.textContent = \`Checkbox Art (\${PIXEL_ART_SIZE}x\${PIXEL_ART_SIZE})\`;\r
}\r
\r
joymap.start();\r
`,Gl={"index.ts":F(Jl),"index.html":Vl,"package.json":he({hasLodash:!1,hasReact:!1}),"tsconfig.json":fe},Yl=`import Phaser from 'phaser';\r
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
`,ql=`<!doctype html>\r
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
`,Xl=`import { createJoymap } from 'joymap';\r
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
`,Zl=`import { createQueryModule, Joymap, QueryModule } from 'joymap';\r
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
`,Ql=`import { QueryModule } from 'joymap';\r
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
`,Kl={"index.ts":F(Xl),"index.html":ql,"MainScene.ts":F(Zl),"Menu.ts":F(Ql),"Background.ts":F(Yl),"package.json":he({hasLodash:!1,hasReact:!1,dependencies:{phaser:Q.devDependencies.phaser}}),"tsconfig.json":fe},ec=`import React, { ReactNode, useState } from 'react';\r
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
`,tc=`<!doctype html>\r
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
`,nc=`import './Main';\r
`,rc=`import React, { useEffect, useState } from 'react';\r
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
`,oc={"index.ts":F(nc),"Main.tsx":F(rc),"Gamepad.tsx":F(ec),"index.html":tc,"package.json":he({hasLodash:!1,hasReact:!0,dependencies:{"color-hash":de["color-hash"],tinycolor2:de.tinycolor2,"@types/color-hash":de["@types/color-hash"],"@types/tinycolor2":de["@types/tinycolor2"]}}),"tsconfig.json":fe,"vite.config.ts":Dr},ac=`<!doctype html>\r
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
`,ic=`// Simple canvas example that doesn't use any other library nor ES6 features\r
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
`,sc={"index.ts":F(ic),"index.html":ac,"package.json":he({hasLodash:!1,hasReact:!1}),"tsconfig.json":fe},pt={readme:{html:"examples/pages/Readme/index.html",tags:[]},react:{html:"examples/pages/React/index.html",gitPath:"tree/master/examples/pages/React",stackblitz:oc,tags:["queryModule","react"],description:"A React component that visualizes gamepad input in real-time with button and stick visualization."},fighting:{html:"examples/pages/Fighting/index.html",gitPath:"tree/master/examples/pages/Fighting",stackblitz:_l,tags:["queryModule"],description:"A fighting game demo with fast input handling and combo detection."},rumble:{html:"examples/pages/Rumble/index.html",gitPath:"tree/master/examples/pages/Rumble",stackblitz:sc,tags:["queryModule","game","canvas"],description:"Demonstrates gamepad vibration/rumble effects on supported controllers."},log:{html:"examples/pages/Log/index.html",gitPath:"tree/master/examples/pages/Log",stackblitz:zl,tags:["queryModule","html","console"],description:"Displays all gamepad events in a scrollable log for debugging."},editor:{html:"examples/pages/Editor/index.html",gitPath:"tree/master/examples/pages/Editor",stackblitz:Ol,tags:["eventModule","react","WYSIWYG"],description:"A text editor example that binds gamepad buttons to keyboard events."},phaser:{html:"examples/pages/Phaser/index.html",gitPath:"tree/master/examples/pages/Phaser",stackblitz:Kl,tags:["queryModule","game","phaser"],description:"A Phaser game menu demonstrating a game menu with joymap."},nav:{html:"examples/pages/Navigation/index.html",gitPath:"tree/master/examples/pages/Navigation",stackblitz:Gl,tags:["eventModule","plain html","accesibility"],description:"Navigate any website using a gamepad with spatial focus detection and section skipping."}};function lc(){const{page:e}=Io(),t=Ct(),n=Object.keys(pt).includes(e??"")?e:"readme",r=a=>t(`/examples/${a}`),o=pt[n];return o?b.jsx(wl,{children:b.jsxs("div",{className:"flex h-screen flex-col",children:[b.jsx("header",{className:"sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm",children:b.jsxs("div",{className:"mx-auto flex max-w-5xl items-center gap-3 px-4 py-4",children:[b.jsxs("div",{className:"flex items-center gap-2",children:[b.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-md bg-primary",children:b.jsx("img",{src:Rl})}),b.jsx("h1",{className:"text-lg font-semibold tracking-tight text-foreground",children:"Joymap Examples"})]}),b.jsx("div",{className:"mx-auto flex max-w-5xl self-stretch",children:b.jsx("nav",{className:"scrollbar-hide flex items-center gap-2 overflow-x-auto px-2",role:"tablist","aria-label":"Filter by category",children:Object.keys(pt).map(a=>{const i=a===n;return b.jsx(Ma,{role:"tab",onClick:()=>r(a),isActive:i,children:a},a)})})})]})}),b.jsx("main",{className:"flex w-full flex-1 flex-col",children:b.jsxs("div",{className:"mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4",children:[b.jsxs("div",{className:"mb-6",children:[b.jsxs("div",{className:"flex items-center justify-between",children:[b.jsx("div",{className:"flex flex-wrap gap-3",children:o.tags.map(a=>b.jsx("span",{className:"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground",children:a},a))}),b.jsxs("div",{className:"flex justify-end",children:[o.stackblitz&&b.jsx(El,{files:o.stackblitz}),o.gitPath&&b.jsx(Or,{content:"View example on github",children:b.jsx(Vn,{target:"_blank",href:`https://github.com/diegodoumecq/joymap/${o.gitPath}`,children:b.jsx(ja,{})})})]})]}),b.jsx("p",{className:"mt-2 leading-relaxed text-pretty text-muted-foreground",children:o.description})]}),o.code&&b.jsx(Ia,{code:o.code}),b.jsx(Na,{path:n==="readme"?"README.md":o.html.replace(/\/index\.html$/,"/"),children:b.jsx("iframe",{src:`/joymap/${o.html}`,className:"relative block h-full w-full"},o.html)})]})}),b.jsx("footer",{className:"border-t border-border py-4",children:b.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-4",children:b.jsxs("span",{className:"font-mono text-xs text-muted-foreground",children:["v",Pl]})})})]})}):null}const $r=document.createElement("div");document.body.appendChild($r);const cc=Yr($r);cc.render(b.jsx(xa,{basename:"/joymap/",children:b.jsxs(Yo,{children:[b.jsx(ft,{path:"/examples/:page",element:b.jsx(lc,{})}),b.jsx(ft,{path:"/",element:b.jsx(Jo,{to:"/examples/readme",replace:!0})})]})}));
//# sourceMappingURL=main-BKUBe4oF.js.map
