var bu=Object.defineProperty;var vu=(n,t,e)=>t in n?bu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var q=(n,t,e)=>vu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Es=globalThis,za=Es.ShadowRoot&&(Es.ShadyCSS===void 0||Es.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ha=Symbol(),Vr=new WeakMap;let Tc=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ha)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(za&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Vr.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Vr.set(e,t))}return t}toString(){return this.cssText}};const xu=n=>new Tc(typeof n=="string"?n:n+"",void 0,Ha),Yt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new Tc(e,n,Ha)},wu=(n,t)=>{if(za)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=Es.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},Ur=za?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return xu(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ku,defineProperty:_u,getOwnPropertyDescriptor:Su,getOwnPropertyNames:Du,getOwnPropertySymbols:Cu,getPrototypeOf:Eu}=Object,Xe=globalThis,Yr=Xe.trustedTypes,Mu=Yr?Yr.emptyScript:"",zo=Xe.reactiveElementPolyfillSupport,bi=(n,t)=>n,ia={toAttribute(n,t){switch(t){case Boolean:n=n?Mu:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Pc=(n,t)=>!ku(n,t),qr={attribute:!0,type:String,converter:ia,reflect:!1,useDefault:!1,hasChanged:Pc};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Xe.litPropertyMetadata??(Xe.litPropertyMetadata=new WeakMap);let Ln=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=qr){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&_u(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=Su(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){const r=s==null?void 0:s.call(this);o==null||o.call(this,a),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qr}static _$Ei(){if(this.hasOwnProperty(bi("elementProperties")))return;const t=Eu(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(bi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(bi("properties"))){const e=this.properties,i=[...Du(e),...Cu(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(Ur(s))}else t!==void 0&&e.push(Ur(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wu(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:ia).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){var o,a;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)==null?void 0:o.fromAttribute)!==void 0?r.converter:ia;this._$Em=s,this[s]=c.fromAttribute(e,r.type)??((a=this._$Ej)==null?void 0:a.get(s))??null,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const o=this.constructor,a=this[t];if(i??(i=o.getPropertyOptions(t)),!((i.hasChanged??Pc)(a,e)||i.useDefault&&i.reflect&&a===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:r}=a,c=this[o];r!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,a,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Ln.elementStyles=[],Ln.shadowRootOptions={mode:"open"},Ln[bi("elementProperties")]=new Map,Ln[bi("finalized")]=new Map,zo==null||zo({ReactiveElement:Ln}),(Xe.reactiveElementVersions??(Xe.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vi=globalThis,Bs=vi.trustedTypes,Kr=Bs?Bs.createPolicy("lit-html",{createHTML:n=>n}):void 0,Oc="$lit$",Ve=`lit$${Math.random().toFixed(9).slice(2)}$`,Fc="?"+Ve,$u=`<${Fc}>`,Sn=document,Di=()=>Sn.createComment(""),Ci=n=>n===null||typeof n!="object"&&typeof n!="function",ja=Array.isArray,Au=n=>ja(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Ho=`[ 	
\f\r]`,ai=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xr=/-->/g,Gr=/>/g,hn=RegExp(`>|${Ho}(?:([^\\s"'>=/]+)(${Ho}*=${Ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jr=/'/g,Qr=/"/g,Ic=/^(?:script|style|textarea|title)$/i,Tu=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),W=Tu(1),zn=Symbol.for("lit-noChange"),Vt=Symbol.for("lit-nothing"),Zr=new WeakMap,vn=Sn.createTreeWalker(Sn,129);function Rc(n,t){if(!ja(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kr!==void 0?Kr.createHTML(t):t}const Pu=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",a=ai;for(let r=0;r<e;r++){const c=n[r];let u,h,p=-1,y=0;for(;y<c.length&&(a.lastIndex=y,h=a.exec(c),h!==null);)y=a.lastIndex,a===ai?h[1]==="!--"?a=Xr:h[1]!==void 0?a=Gr:h[2]!==void 0?(Ic.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=hn):h[3]!==void 0&&(a=hn):a===hn?h[0]===">"?(a=s??ai,p=-1):h[1]===void 0?p=-2:(p=a.lastIndex-h[2].length,u=h[1],a=h[3]===void 0?hn:h[3]==='"'?Qr:Jr):a===Qr||a===Jr?a=hn:a===Xr||a===Gr?a=ai:(a=hn,s=void 0);const g=a===hn&&n[r+1].startsWith("/>")?" ":"";o+=a===ai?c+$u:p>=0?(i.push(u),c.slice(0,p)+Oc+c.slice(p)+Ve+g):c+Ve+(p===-2?r:g)}return[Rc(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Ei{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,a=0;const r=t.length-1,c=this.parts,[u,h]=Pu(t,e);if(this.el=Ei.createElement(u,i),vn.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=vn.nextNode())!==null&&c.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Oc)){const y=h[a++],g=s.getAttribute(p).split(Ve),x=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:x[2],strings:g,ctor:x[1]==="."?Fu:x[1]==="?"?Iu:x[1]==="@"?Ru:Ks}),s.removeAttribute(p)}else p.startsWith(Ve)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(Ic.test(s.tagName)){const p=s.textContent.split(Ve),y=p.length-1;if(y>0){s.textContent=Bs?Bs.emptyScript:"";for(let g=0;g<y;g++)s.append(p[g],Di()),vn.nextNode(),c.push({type:2,index:++o});s.append(p[y],Di())}}}else if(s.nodeType===8)if(s.data===Fc)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(Ve,p+1))!==-1;)c.push({type:7,index:o}),p+=Ve.length-1}o++}}static createElement(t,e){const i=Sn.createElement("template");return i.innerHTML=t,i}}function Hn(n,t,e=n,i){var a,r;if(t===zn)return t;let s=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const o=Ci(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((r=s==null?void 0:s._$AO)==null||r.call(s,!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=Hn(n,s._$AS(n,t.values),s,i)),t}class Ou{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??Sn).importNode(e,!0);vn.currentNode=s;let o=vn.nextNode(),a=0,r=0,c=i[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Ri(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Lu(o,this,t)),this._$AV.push(u),c=i[++r]}a!==(c==null?void 0:c.index)&&(o=vn.nextNode(),a++)}return vn.currentNode=Sn,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Ri{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Vt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Hn(this,t,e),Ci(t)?t===Vt||t==null||t===""?(this._$AH!==Vt&&this._$AR(),this._$AH=Vt):t!==this._$AH&&t!==zn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Au(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Vt&&Ci(this._$AH)?this._$AA.nextSibling.data=t:this.T(Sn.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ei.createElement(Rc(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const a=new Ou(s,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=Zr.get(t.strings);return e===void 0&&Zr.set(t.strings,e=new Ei(t)),e}k(t){ja(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Ri(this.O(Di()),this.O(Di()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ks{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Vt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Vt}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(o===void 0)t=Hn(this,t,e,0),a=!Ci(t)||t!==this._$AH&&t!==zn,a&&(this._$AH=t);else{const r=t;let c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Hn(this,r[i+c],e,c),u===zn&&(u=this._$AH[c]),a||(a=!Ci(u)||u!==this._$AH[c]),u===Vt?t=Vt:t!==Vt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Fu extends Ks{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vt?void 0:t}}class Iu extends Ks{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Vt)}}class Ru extends Ks{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Hn(this,t,e,0)??Vt)===zn)return;const i=this._$AH,s=t===Vt&&i!==Vt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Vt&&(i===Vt||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Lu{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Hn(this,t)}}const jo=vi.litHtmlPolyfillSupport;jo==null||jo(Ei,Ri),(vi.litHtmlVersions??(vi.litHtmlVersions=[])).push("3.3.0");const Wa=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new Ri(t.insertBefore(Di(),o),o,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=globalThis;class Nt extends Ln{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wa(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return zn}}var Ac;Nt._$litElement$=!0,Nt.finalized=!0,(Ac=wn.litElementHydrateSupport)==null||Ac.call(wn,{LitElement:Nt});const Wo=wn.litElementPolyfillSupport;Wo==null||Wo({LitElement:Nt});(wn.litElementVersions??(wn.litElementVersions=[])).push("4.2.0");const Bu=["week","summary","spend","history","settings"],Nu="week";class zu{constructor(){this.currentRoute="week",this.listeners=[],window.addEventListener("hashchange",()=>this.handleRouteChange())}handleRouteChange(){let t=window.location.hash.substring(1);if((!t||!Bu.includes(t))&&(t=Nu,window.location.hash!==`#${t}`)){this.navigate(t);return}this.currentRoute=t,this.notifyListeners()}navigate(t){window.location.hash=t}addListener(t){this.listeners.push(t)}removeListener(t){this.listeners=this.listeners.filter(e=>e!==t)}notifyListeners(){this.listeners.forEach(t=>t(this.currentRoute))}}const Hu=new zu;var ju=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wu(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ms={exports:{}},Vu=Ms.exports,tl;function Uu(){return tl||(tl=1,function(n,t){(function(e,i){n.exports=i()})(Vu,function(){var e=function(l,d){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(f,m){f.__proto__=m}||function(f,m){for(var b in m)Object.prototype.hasOwnProperty.call(m,b)&&(f[b]=m[b])})(l,d)},i=function(){return(i=Object.assign||function(l){for(var d,f=1,m=arguments.length;f<m;f++)for(var b in d=arguments[f])Object.prototype.hasOwnProperty.call(d,b)&&(l[b]=d[b]);return l}).apply(this,arguments)};function s(l,d,f){for(var m,b=0,v=d.length;b<v;b++)!m&&b in d||((m=m||Array.prototype.slice.call(d,0,b))[b]=d[b]);return l.concat(m||Array.prototype.slice.call(d))}var o=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:ju,a=Object.keys,r=Array.isArray;function c(l,d){return typeof d!="object"||a(d).forEach(function(f){l[f]=d[f]}),l}typeof Promise>"u"||o.Promise||(o.Promise=Promise);var u=Object.getPrototypeOf,h={}.hasOwnProperty;function p(l,d){return h.call(l,d)}function y(l,d){typeof d=="function"&&(d=d(u(l))),(typeof Reflect>"u"?a:Reflect.ownKeys)(d).forEach(function(f){x(l,f,d[f])})}var g=Object.defineProperty;function x(l,d,f,m){g(l,d,c(f&&p(f,"get")&&typeof f.get=="function"?{get:f.get,set:f.set,configurable:!0}:{value:f,configurable:!0,writable:!0},m))}function w(l){return{from:function(d){return l.prototype=Object.create(d.prototype),x(l.prototype,"constructor",l),{extend:y.bind(null,l.prototype)}}}}var S=Object.getOwnPropertyDescriptor,O=[].slice;function A(l,d,f){return O.call(l,d,f)}function j(l,d){return d(l)}function N(l){if(!l)throw new Error("Assertion Failed")}function C(l){o.setImmediate?setImmediate(l):setTimeout(l,0)}function I(l,d){if(typeof d=="string"&&p(l,d))return l[d];if(!d)return l;if(typeof d!="string"){for(var f=[],m=0,b=d.length;m<b;++m){var v=I(l,d[m]);f.push(v)}return f}var k=d.indexOf(".");if(k!==-1){var _=l[d.substr(0,k)];return _==null?void 0:I(_,d.substr(k+1))}}function V(l,d,f){if(l&&d!==void 0&&!("isFrozen"in Object&&Object.isFrozen(l)))if(typeof d!="string"&&"length"in d){N(typeof f!="string"&&"length"in f);for(var m=0,b=d.length;m<b;++m)V(l,d[m],f[m])}else{var v,k,_=d.indexOf(".");_!==-1?(v=d.substr(0,_),(k=d.substr(_+1))===""?f===void 0?r(l)&&!isNaN(parseInt(v))?l.splice(v,1):delete l[v]:l[v]=f:V(_=!(_=l[v])||!p(l,v)?l[v]={}:_,k,f)):f===void 0?r(l)&&!isNaN(parseInt(d))?l.splice(d,1):delete l[d]:l[d]=f}}function U(l){var d,f={};for(d in l)p(l,d)&&(f[d]=l[d]);return f}var K=[].concat;function et(l){return K.apply([],l)}var en="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(et([8,16,32,64].map(function(l){return["Int","Uint","Float"].map(function(d){return d+l+"Array"})}))).filter(function(l){return o[l]}),Q=new Set(en.map(function(l){return o[l]})),ot=null;function dt(l){return ot=new WeakMap,l=function d(f){if(!f||typeof f!="object")return f;var m=ot.get(f);if(m)return m;if(r(f)){m=[],ot.set(f,m);for(var b=0,v=f.length;b<v;++b)m.push(d(f[b]))}else if(Q.has(f.constructor))m=f;else{var k,_=u(f);for(k in m=_===Object.prototype?{}:Object.create(_),ot.set(f,m),f)p(f,k)&&(m[k]=d(f[k]))}return m}(l),ot=null,l}var wt={}.toString;function ct(l){return wt.call(l).slice(8,-1)}var bt=typeof Symbol<"u"?Symbol.iterator:"@@iterator",Ct=typeof bt=="symbol"?function(l){var d;return l!=null&&(d=l[bt])&&d.apply(l)}:function(){return null};function kt(l,d){return d=l.indexOf(d),0<=d&&l.splice(d,1),0<=d}var _t={};function Ht(l){var d,f,m,b;if(arguments.length===1){if(r(l))return l.slice();if(this===_t&&typeof l=="string")return[l];if(b=Ct(l)){for(f=[];!(m=b.next()).done;)f.push(m.value);return f}if(l==null)return[l];if(typeof(d=l.length)!="number")return[l];for(f=new Array(d);d--;)f[d]=l[d];return f}for(d=arguments.length,f=new Array(d);d--;)f[d]=arguments[d];return f}var ye=typeof Symbol<"u"?function(l){return l[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},Kn=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],ue=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(Kn),be={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function qt(l,d){this.name=l,this.message=d}function ve(l,d){return l+". Errors: "+Object.keys(d).map(function(f){return d[f].toString()}).filter(function(f,m,b){return b.indexOf(f)===m}).join(`
`)}function xe(l,d,f,m){this.failures=d,this.failedKeys=m,this.successCount=f,this.message=ve(l,d)}function ee(l,d){this.name="BulkError",this.failures=Object.keys(d).map(function(f){return d[f]}),this.failuresByPos=d,this.message=ve(l,this.failures)}w(qt).from(Error).extend({toString:function(){return this.name+": "+this.message}}),w(xe).from(qt),w(ee).from(qt);var no=ue.reduce(function(l,d){return l[d]=d+"Error",l},{}),Hd=qt,lt=ue.reduce(function(l,d){var f=d+"Error";function m(b,v){this.name=f,b?typeof b=="string"?(this.message="".concat(b).concat(v?`
 `+v:""),this.inner=v||null):typeof b=="object"&&(this.message="".concat(b.name," ").concat(b.message),this.inner=b):(this.message=be[d]||f,this.inner=null)}return w(m).from(Hd),l[d]=m,l},{});lt.Syntax=SyntaxError,lt.Type=TypeError,lt.Range=RangeError;var dr=Kn.reduce(function(l,d){return l[d+"Error"]=lt[d],l},{}),Ni=ue.reduce(function(l,d){return["Syntax","Type","Range"].indexOf(d)===-1&&(l[d+"Error"]=lt[d]),l},{});function Et(){}function Yn(l){return l}function jd(l,d){return l==null||l===Yn?d:function(f){return d(l(f))}}function tn(l,d){return function(){l.apply(this,arguments),d.apply(this,arguments)}}function Wd(l,d){return l===Et?d:function(){var f=l.apply(this,arguments);f!==void 0&&(arguments[0]=f);var m=this.onsuccess,b=this.onerror;this.onsuccess=null,this.onerror=null;var v=d.apply(this,arguments);return m&&(this.onsuccess=this.onsuccess?tn(m,this.onsuccess):m),b&&(this.onerror=this.onerror?tn(b,this.onerror):b),v!==void 0?v:f}}function Vd(l,d){return l===Et?d:function(){l.apply(this,arguments);var f=this.onsuccess,m=this.onerror;this.onsuccess=this.onerror=null,d.apply(this,arguments),f&&(this.onsuccess=this.onsuccess?tn(f,this.onsuccess):f),m&&(this.onerror=this.onerror?tn(m,this.onerror):m)}}function Ud(l,d){return l===Et?d:function(f){var m=l.apply(this,arguments);c(f,m);var b=this.onsuccess,v=this.onerror;return this.onsuccess=null,this.onerror=null,f=d.apply(this,arguments),b&&(this.onsuccess=this.onsuccess?tn(b,this.onsuccess):b),v&&(this.onerror=this.onerror?tn(v,this.onerror):v),m===void 0?f===void 0?void 0:f:c(m,f)}}function Yd(l,d){return l===Et?d:function(){return d.apply(this,arguments)!==!1&&l.apply(this,arguments)}}function io(l,d){return l===Et?d:function(){var f=l.apply(this,arguments);if(f&&typeof f.then=="function"){for(var m=this,b=arguments.length,v=new Array(b);b--;)v[b]=arguments[b];return f.then(function(){return d.apply(m,v)})}return d.apply(this,arguments)}}Ni.ModifyError=xe,Ni.DexieError=qt,Ni.BulkError=ee;var we=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function ur(l){we=l}var qn={},hr=100,en=typeof Promise>"u"?[]:function(){var l=Promise.resolve();if(typeof crypto>"u"||!crypto.subtle)return[l,u(l),l];var d=crypto.subtle.digest("SHA-512",new Uint8Array([0]));return[d,u(d),l]}(),Kn=en[0],ue=en[1],en=en[2],ue=ue&&ue.then,nn=Kn&&Kn.constructor,so=!!en,Xn=function(l,d){Gn.push([l,d]),zi&&(queueMicrotask(Kd),zi=!1)},oo=!0,zi=!0,sn=[],Hi=[],ao=Yn,Le={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:Et,pgp:!1,env:{},finalize:Et},rt=Le,Gn=[],on=0,ji=[];function it(l){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var d=this._PSD=rt;if(typeof l!="function"){if(l!==qn)throw new TypeError("Not a function");return this._state=arguments[1],this._value=arguments[2],void(this._state===!1&&lo(this,this._value))}this._state=null,this._value=null,++d.ref,function f(m,b){try{b(function(v){if(m._state===null){if(v===m)throw new TypeError("A promise cannot be resolved with itself.");var k=m._lib&&Mn();v&&typeof v.then=="function"?f(m,function(_,E){v instanceof it?v._then(_,E):v.then(_,E)}):(m._state=!0,m._value=v,pr(m)),k&&$n()}},lo.bind(null,m))}catch(v){lo(m,v)}}(this,l)}var ro={get:function(){var l=rt,d=Yi;function f(m,b){var v=this,k=!l.global&&(l!==rt||d!==Yi),_=k&&!Ne(),E=new it(function($,F){co(v,new fr(mr(m,l,k,_),mr(b,l,k,_),$,F,l))});return this._consoleTask&&(E._consoleTask=this._consoleTask),E}return f.prototype=qn,f},set:function(l){x(this,"then",l&&l.prototype===qn?ro:{get:function(){return l},set:ro.set})}};function fr(l,d,f,m,b){this.onFulfilled=typeof l=="function"?l:null,this.onRejected=typeof d=="function"?d:null,this.resolve=f,this.reject=m,this.psd=b}function lo(l,d){var f,m;Hi.push(d),l._state===null&&(f=l._lib&&Mn(),d=ao(d),l._state=!1,l._value=d,m=l,sn.some(function(b){return b._value===m._value})||sn.push(m),pr(l),f&&$n())}function pr(l){var d=l._listeners;l._listeners=[];for(var f=0,m=d.length;f<m;++f)co(l,d[f]);var b=l._PSD;--b.ref||b.finalize(),on===0&&(++on,Xn(function(){--on==0&&uo()},[]))}function co(l,d){if(l._state!==null){var f=l._state?d.onFulfilled:d.onRejected;if(f===null)return(l._state?d.resolve:d.reject)(l._value);++d.psd.ref,++on,Xn(qd,[f,l,d])}else l._listeners.push(d)}function qd(l,d,f){try{var m,b=d._value;!d._state&&Hi.length&&(Hi=[]),m=we&&d._consoleTask?d._consoleTask.run(function(){return l(b)}):l(b),d._state||Hi.indexOf(b)!==-1||function(v){for(var k=sn.length;k;)if(sn[--k]._value===v._value)return sn.splice(k,1)}(d),f.resolve(m)}catch(v){f.reject(v)}finally{--on==0&&uo(),--f.psd.ref||f.psd.finalize()}}function Kd(){an(Le,function(){Mn()&&$n()})}function Mn(){var l=oo;return zi=oo=!1,l}function $n(){var l,d,f;do for(;0<Gn.length;)for(l=Gn,Gn=[],f=l.length,d=0;d<f;++d){var m=l[d];m[0].apply(null,m[1])}while(0<Gn.length);zi=oo=!0}function uo(){var l=sn;sn=[],l.forEach(function(m){m._PSD.onunhandled.call(null,m._value,m)});for(var d=ji.slice(0),f=d.length;f;)d[--f]()}function Wi(l){return new it(qn,!1,l)}function Pt(l,d){var f=rt;return function(){var m=Mn(),b=rt;try{return ze(f,!0),l.apply(this,arguments)}catch(v){d&&d(v)}finally{ze(b,!1),m&&$n()}}}y(it.prototype,{then:ro,_then:function(l,d){co(this,new fr(null,null,l,d,rt))},catch:function(l){if(arguments.length===1)return this.then(null,l);var d=l,f=arguments[1];return typeof d=="function"?this.then(null,function(m){return(m instanceof d?f:Wi)(m)}):this.then(null,function(m){return(m&&m.name===d?f:Wi)(m)})},finally:function(l){return this.then(function(d){return it.resolve(l()).then(function(){return d})},function(d){return it.resolve(l()).then(function(){return Wi(d)})})},timeout:function(l,d){var f=this;return l<1/0?new it(function(m,b){var v=setTimeout(function(){return b(new lt.Timeout(d))},l);f.then(m,b).finally(clearTimeout.bind(null,v))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&x(it.prototype,Symbol.toStringTag,"Dexie.Promise"),Le.env=gr(),y(it,{all:function(){var l=Ht.apply(null,arguments).map(qi);return new it(function(d,f){l.length===0&&d([]);var m=l.length;l.forEach(function(b,v){return it.resolve(b).then(function(k){l[v]=k,--m||d(l)},f)})})},resolve:function(l){return l instanceof it?l:l&&typeof l.then=="function"?new it(function(d,f){l.then(d,f)}):new it(qn,!0,l)},reject:Wi,race:function(){var l=Ht.apply(null,arguments).map(qi);return new it(function(d,f){l.map(function(m){return it.resolve(m).then(d,f)})})},PSD:{get:function(){return rt},set:function(l){return rt=l}},totalEchoes:{get:function(){return Yi}},newPSD:Be,usePSD:an,scheduler:{get:function(){return Xn},set:function(l){Xn=l}},rejectionMapper:{get:function(){return ao},set:function(l){ao=l}},follow:function(l,d){return new it(function(f,m){return Be(function(b,v){var k=rt;k.unhandleds=[],k.onunhandled=v,k.finalize=tn(function(){var _,E=this;_=function(){E.unhandleds.length===0?b():v(E.unhandleds[0])},ji.push(function $(){_(),ji.splice(ji.indexOf($),1)}),++on,Xn(function(){--on==0&&uo()},[])},k.finalize),l()},d,f,m)})}}),nn&&(nn.allSettled&&x(it,"allSettled",function(){var l=Ht.apply(null,arguments).map(qi);return new it(function(d){l.length===0&&d([]);var f=l.length,m=new Array(f);l.forEach(function(b,v){return it.resolve(b).then(function(k){return m[v]={status:"fulfilled",value:k}},function(k){return m[v]={status:"rejected",reason:k}}).then(function(){return--f||d(m)})})})}),nn.any&&typeof AggregateError<"u"&&x(it,"any",function(){var l=Ht.apply(null,arguments).map(qi);return new it(function(d,f){l.length===0&&f(new AggregateError([]));var m=l.length,b=new Array(m);l.forEach(function(v,k){return it.resolve(v).then(function(_){return d(_)},function(_){b[k]=_,--m||f(new AggregateError(b))})})})}),nn.withResolvers&&(it.withResolvers=nn.withResolvers));var jt={awaits:0,echoes:0,id:0},Xd=0,Vi=[],Ui=0,Yi=0,Gd=0;function Be(l,d,f,m){var b=rt,v=Object.create(b);return v.parent=b,v.ref=0,v.global=!1,v.id=++Gd,Le.env,v.env=so?{Promise:it,PromiseProp:{value:it,configurable:!0,writable:!0},all:it.all,race:it.race,allSettled:it.allSettled,any:it.any,resolve:it.resolve,reject:it.reject}:{},d&&c(v,d),++b.ref,v.finalize=function(){--this.parent.ref||this.parent.finalize()},m=an(v,l,f,m),v.ref===0&&v.finalize(),m}function An(){return jt.id||(jt.id=++Xd),++jt.awaits,jt.echoes+=hr,jt.id}function Ne(){return!!jt.awaits&&(--jt.awaits==0&&(jt.id=0),jt.echoes=jt.awaits*hr,!0)}function qi(l){return jt.echoes&&l&&l.constructor===nn?(An(),l.then(function(d){return Ne(),d},function(d){return Ne(),Rt(d)})):l}function Jd(){var l=Vi[Vi.length-1];Vi.pop(),ze(l,!1)}function ze(l,d){var f,m=rt;(d?!jt.echoes||Ui++&&l===rt:!Ui||--Ui&&l===rt)||queueMicrotask(d?(function(b){++Yi,jt.echoes&&--jt.echoes!=0||(jt.echoes=jt.awaits=jt.id=0),Vi.push(rt),ze(b,!0)}).bind(null,l):Jd),l!==rt&&(rt=l,m===Le&&(Le.env=gr()),so&&(f=Le.env.Promise,d=l.env,(m.global||l.global)&&(Object.defineProperty(o,"Promise",d.PromiseProp),f.all=d.all,f.race=d.race,f.resolve=d.resolve,f.reject=d.reject,d.allSettled&&(f.allSettled=d.allSettled),d.any&&(f.any=d.any))))}function gr(){var l=o.Promise;return so?{Promise:l,PromiseProp:Object.getOwnPropertyDescriptor(o,"Promise"),all:l.all,race:l.race,allSettled:l.allSettled,any:l.any,resolve:l.resolve,reject:l.reject}:{}}function an(l,d,f,m,b){var v=rt;try{return ze(l,!0),d(f,m,b)}finally{ze(v,!1)}}function mr(l,d,f,m){return typeof l!="function"?l:function(){var b=rt;f&&An(),ze(d,!0);try{return l.apply(this,arguments)}finally{ze(b,!1),m&&queueMicrotask(Ne)}}}function ho(l){Promise===nn&&jt.echoes===0?Ui===0?l():enqueueNativeMicroTask(l):setTimeout(l,0)}(""+ue).indexOf("[native code]")===-1&&(An=Ne=Et);var Rt=it.reject,rn="￿",Ee="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",yr="String expected.",Tn=[],Ki="__dbnames",fo="readonly",po="readwrite";function ln(l,d){return l?d?function(){return l.apply(this,arguments)&&d.apply(this,arguments)}:l:d}var br={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function Xi(l){return typeof l!="string"||/\./.test(l)?function(d){return d}:function(d){return d[l]===void 0&&l in d&&delete(d=dt(d))[l],d}}function vr(){throw lt.Type()}function xt(l,d){try{var f=xr(l),m=xr(d);if(f!==m)return f==="Array"?1:m==="Array"?-1:f==="binary"?1:m==="binary"?-1:f==="string"?1:m==="string"?-1:f==="Date"?1:m!=="Date"?NaN:-1;switch(f){case"number":case"Date":case"string":return d<l?1:l<d?-1:0;case"binary":return function(b,v){for(var k=b.length,_=v.length,E=k<_?k:_,$=0;$<E;++$)if(b[$]!==v[$])return b[$]<v[$]?-1:1;return k===_?0:k<_?-1:1}(wr(l),wr(d));case"Array":return function(b,v){for(var k=b.length,_=v.length,E=k<_?k:_,$=0;$<E;++$){var F=xt(b[$],v[$]);if(F!==0)return F}return k===_?0:k<_?-1:1}(l,d)}}catch{}return NaN}function xr(l){var d=typeof l;return d!="object"?d:ArrayBuffer.isView(l)?"binary":(l=ct(l),l==="ArrayBuffer"?"binary":l)}function wr(l){return l instanceof Uint8Array?l:ArrayBuffer.isView(l)?new Uint8Array(l.buffer,l.byteOffset,l.byteLength):new Uint8Array(l)}var kr=($t.prototype._trans=function(l,d,f){var m=this._tx||rt.trans,b=this.name,v=we&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(l==="readonly"?"read":"write"," ").concat(this.name));function k($,F,D){if(!D.schema[b])throw new lt.NotFound("Table "+b+" not part of transaction");return d(D.idbtrans,D)}var _=Mn();try{var E=m&&m.db._novip===this.db._novip?m===rt.trans?m._promise(l,k,f):Be(function(){return m._promise(l,k,f)},{trans:m,transless:rt.transless||rt}):function $(F,D,L,M){if(F.idbdb&&(F._state.openComplete||rt.letThrough||F._vip)){var P=F._createTransaction(D,L,F._dbSchema);try{P.create(),F._state.PR1398_maxLoop=3}catch(R){return R.name===no.InvalidState&&F.isOpen()&&0<--F._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),F.close({disableAutoOpen:!1}),F.open().then(function(){return $(F,D,L,M)})):Rt(R)}return P._promise(D,function(R,T){return Be(function(){return rt.trans=P,M(R,T,P)})}).then(function(R){if(D==="readwrite")try{P.idbtrans.commit()}catch{}return D==="readonly"?R:P._completion.then(function(){return R})})}if(F._state.openComplete)return Rt(new lt.DatabaseClosed(F._state.dbOpenError));if(!F._state.isBeingOpened){if(!F._state.autoOpen)return Rt(new lt.DatabaseClosed);F.open().catch(Et)}return F._state.dbReadyPromise.then(function(){return $(F,D,L,M)})}(this.db,l,[this.name],k);return v&&(E._consoleTask=v,E=E.catch(function($){return console.trace($),Rt($)})),E}finally{_&&$n()}},$t.prototype.get=function(l,d){var f=this;return l&&l.constructor===Object?this.where(l).first(d):l==null?Rt(new lt.Type("Invalid argument to Table.get()")):this._trans("readonly",function(m){return f.core.get({trans:m,key:l}).then(function(b){return f.hook.reading.fire(b)})}).then(d)},$t.prototype.where=function(l){if(typeof l=="string")return new this.db.WhereClause(this,l);if(r(l))return new this.db.WhereClause(this,"[".concat(l.join("+"),"]"));var d=a(l);if(d.length===1)return this.where(d[0]).equals(l[d[0]]);var f=this.schema.indexes.concat(this.schema.primKey).filter(function(_){if(_.compound&&d.every(function($){return 0<=_.keyPath.indexOf($)})){for(var E=0;E<d.length;++E)if(d.indexOf(_.keyPath[E])===-1)return!1;return!0}return!1}).sort(function(_,E){return _.keyPath.length-E.keyPath.length})[0];if(f&&this.db._maxKey!==rn){var v=f.keyPath.slice(0,d.length);return this.where(v).equals(v.map(function(E){return l[E]}))}!f&&we&&console.warn("The query ".concat(JSON.stringify(l)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(d.join("+"),"]"));var m=this.schema.idxByName;function b(_,E){return xt(_,E)===0}var k=d.reduce(function(D,E){var $=D[0],F=D[1],D=m[E],L=l[E];return[$||D,$||!D?ln(F,D&&D.multi?function(M){return M=I(M,E),r(M)&&M.some(function(P){return b(L,P)})}:function(M){return b(L,I(M,E))}):F]},[null,null]),v=k[0],k=k[1];return v?this.where(v.name).equals(l[v.keyPath]).filter(k):f?this.filter(k):this.where(d).equals("")},$t.prototype.filter=function(l){return this.toCollection().and(l)},$t.prototype.count=function(l){return this.toCollection().count(l)},$t.prototype.offset=function(l){return this.toCollection().offset(l)},$t.prototype.limit=function(l){return this.toCollection().limit(l)},$t.prototype.each=function(l){return this.toCollection().each(l)},$t.prototype.toArray=function(l){return this.toCollection().toArray(l)},$t.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},$t.prototype.orderBy=function(l){return new this.db.Collection(new this.db.WhereClause(this,r(l)?"[".concat(l.join("+"),"]"):l))},$t.prototype.reverse=function(){return this.toCollection().reverse()},$t.prototype.mapToClass=function(l){var d,f=this.db,m=this.name;function b(){return d!==null&&d.apply(this,arguments)||this}(this.schema.mappedClass=l).prototype instanceof vr&&(function(E,$){if(typeof $!="function"&&$!==null)throw new TypeError("Class extends value "+String($)+" is not a constructor or null");function F(){this.constructor=E}e(E,$),E.prototype=$===null?Object.create($):(F.prototype=$.prototype,new F)}(b,d=l),Object.defineProperty(b.prototype,"db",{get:function(){return f},enumerable:!1,configurable:!0}),b.prototype.table=function(){return m},l=b);for(var v=new Set,k=l.prototype;k;k=u(k))Object.getOwnPropertyNames(k).forEach(function(E){return v.add(E)});function _(E){if(!E)return E;var $,F=Object.create(l.prototype);for($ in E)if(!v.has($))try{F[$]=E[$]}catch{}return F}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=_,this.hook("reading",_),l},$t.prototype.defineClass=function(){return this.mapToClass(function(l){c(this,l)})},$t.prototype.add=function(l,d){var f=this,m=this.schema.primKey,b=m.auto,v=m.keyPath,k=l;return v&&b&&(k=Xi(v)(l)),this._trans("readwrite",function(_){return f.core.mutate({trans:_,type:"add",keys:d!=null?[d]:null,values:[k]})}).then(function(_){return _.numFailures?it.reject(_.failures[0]):_.lastResult}).then(function(_){if(v)try{V(l,v,_)}catch{}return _})},$t.prototype.update=function(l,d){return typeof l!="object"||r(l)?this.where(":id").equals(l).modify(d):(l=I(l,this.schema.primKey.keyPath),l===void 0?Rt(new lt.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(l).modify(d))},$t.prototype.put=function(l,d){var f=this,m=this.schema.primKey,b=m.auto,v=m.keyPath,k=l;return v&&b&&(k=Xi(v)(l)),this._trans("readwrite",function(_){return f.core.mutate({trans:_,type:"put",values:[k],keys:d!=null?[d]:null})}).then(function(_){return _.numFailures?it.reject(_.failures[0]):_.lastResult}).then(function(_){if(v)try{V(l,v,_)}catch{}return _})},$t.prototype.delete=function(l){var d=this;return this._trans("readwrite",function(f){return d.core.mutate({trans:f,type:"delete",keys:[l]})}).then(function(f){return f.numFailures?it.reject(f.failures[0]):void 0})},$t.prototype.clear=function(){var l=this;return this._trans("readwrite",function(d){return l.core.mutate({trans:d,type:"deleteRange",range:br})}).then(function(d){return d.numFailures?it.reject(d.failures[0]):void 0})},$t.prototype.bulkGet=function(l){var d=this;return this._trans("readonly",function(f){return d.core.getMany({keys:l,trans:f}).then(function(m){return m.map(function(b){return d.hook.reading.fire(b)})})})},$t.prototype.bulkAdd=function(l,d,f){var m=this,b=Array.isArray(d)?d:void 0,v=(f=f||(b?void 0:d))?f.allKeys:void 0;return this._trans("readwrite",function(k){var $=m.schema.primKey,_=$.auto,$=$.keyPath;if($&&b)throw new lt.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(b&&b.length!==l.length)throw new lt.InvalidArgument("Arguments objects and keys must have the same length");var E=l.length,$=$&&_?l.map(Xi($)):l;return m.core.mutate({trans:k,type:"add",keys:b,values:$,wantResults:v}).then(function(P){var D=P.numFailures,L=P.results,M=P.lastResult,P=P.failures;if(D===0)return v?L:M;throw new ee("".concat(m.name,".bulkAdd(): ").concat(D," of ").concat(E," operations failed"),P)})})},$t.prototype.bulkPut=function(l,d,f){var m=this,b=Array.isArray(d)?d:void 0,v=(f=f||(b?void 0:d))?f.allKeys:void 0;return this._trans("readwrite",function(k){var $=m.schema.primKey,_=$.auto,$=$.keyPath;if($&&b)throw new lt.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(b&&b.length!==l.length)throw new lt.InvalidArgument("Arguments objects and keys must have the same length");var E=l.length,$=$&&_?l.map(Xi($)):l;return m.core.mutate({trans:k,type:"put",keys:b,values:$,wantResults:v}).then(function(P){var D=P.numFailures,L=P.results,M=P.lastResult,P=P.failures;if(D===0)return v?L:M;throw new ee("".concat(m.name,".bulkPut(): ").concat(D," of ").concat(E," operations failed"),P)})})},$t.prototype.bulkUpdate=function(l){var d=this,f=this.core,m=l.map(function(k){return k.key}),b=l.map(function(k){return k.changes}),v=[];return this._trans("readwrite",function(k){return f.getMany({trans:k,keys:m,cache:"clone"}).then(function(_){var E=[],$=[];l.forEach(function(D,L){var M=D.key,P=D.changes,R=_[L];if(R){for(var T=0,B=Object.keys(P);T<B.length;T++){var z=B[T],H=P[z];if(z===d.schema.primKey.keyPath){if(xt(H,M)!==0)throw new lt.Constraint("Cannot update primary key in bulkUpdate()")}else V(R,z,H)}v.push(L),E.push(M),$.push(R)}});var F=E.length;return f.mutate({trans:k,type:"put",keys:E,values:$,updates:{keys:m,changeSpecs:b}}).then(function(D){var L=D.numFailures,M=D.failures;if(L===0)return F;for(var P=0,R=Object.keys(M);P<R.length;P++){var T,B=R[P],z=v[Number(B)];z!=null&&(T=M[B],delete M[B],M[z]=T)}throw new ee("".concat(d.name,".bulkUpdate(): ").concat(L," of ").concat(F," operations failed"),M)})})})},$t.prototype.bulkDelete=function(l){var d=this,f=l.length;return this._trans("readwrite",function(m){return d.core.mutate({trans:m,type:"delete",keys:l})}).then(function(k){var b=k.numFailures,v=k.lastResult,k=k.failures;if(b===0)return v;throw new ee("".concat(d.name,".bulkDelete(): ").concat(b," of ").concat(f," operations failed"),k)})},$t);function $t(){}function Jn(l){function d(k,_){if(_){for(var E=arguments.length,$=new Array(E-1);--E;)$[E-1]=arguments[E];return f[k].subscribe.apply(null,$),l}if(typeof k=="string")return f[k]}var f={};d.addEventType=v;for(var m=1,b=arguments.length;m<b;++m)v(arguments[m]);return d;function v(k,_,E){if(typeof k!="object"){var $;_=_||Yd;var F={subscribers:[],fire:E=E||Et,subscribe:function(D){F.subscribers.indexOf(D)===-1&&(F.subscribers.push(D),F.fire=_(F.fire,D))},unsubscribe:function(D){F.subscribers=F.subscribers.filter(function(L){return L!==D}),F.fire=F.subscribers.reduce(_,E)}};return f[k]=d[k]=F}a($=k).forEach(function(D){var L=$[D];if(r(L))v(D,$[D][0],$[D][1]);else{if(L!=="asap")throw new lt.InvalidArgument("Invalid event config");var M=v(D,Yn,function(){for(var P=arguments.length,R=new Array(P);P--;)R[P]=arguments[P];M.subscribers.forEach(function(T){C(function(){T.apply(null,R)})})})}})}}function Qn(l,d){return w(d).from({prototype:l}),d}function Pn(l,d){return!(l.filter||l.algorithm||l.or)&&(d?l.justLimit:!l.replayFilter)}function go(l,d){l.filter=ln(l.filter,d)}function mo(l,d,f){var m=l.replayFilter;l.replayFilter=m?function(){return ln(m(),d())}:d,l.justLimit=f&&!m}function Gi(l,d){if(l.isPrimKey)return d.primaryKey;var f=d.getIndexByKeyPath(l.index);if(!f)throw new lt.Schema("KeyPath "+l.index+" on object store "+d.name+" is not indexed");return f}function _r(l,d,f){var m=Gi(l,d.schema);return d.openCursor({trans:f,values:!l.keysOnly,reverse:l.dir==="prev",unique:!!l.unique,query:{index:m,range:l.range}})}function Ji(l,d,f,m){var b=l.replayFilter?ln(l.filter,l.replayFilter()):l.filter;if(l.or){var v={},k=function(_,E,$){var F,D;b&&!b(E,$,function(L){return E.stop(L)},function(L){return E.fail(L)})||((D=""+(F=E.primaryKey))=="[object ArrayBuffer]"&&(D=""+new Uint8Array(F)),p(v,D)||(v[D]=!0,d(_,E,$)))};return Promise.all([l.or._iterate(k,f),Sr(_r(l,m,f),l.algorithm,k,!l.keysOnly&&l.valueMapper)])}return Sr(_r(l,m,f),ln(l.algorithm,b),d,!l.keysOnly&&l.valueMapper)}function Sr(l,d,f,m){var b=Pt(m?function(v,k,_){return f(m(v),k,_)}:f);return l.then(function(v){if(v)return v.start(function(){var k=function(){return v.continue()};d&&!d(v,function(_){return k=_},function(_){v.stop(_),k=Et},function(_){v.fail(_),k=Et})||b(v.value,v,function(_){return k=_}),k()})})}var Zn=(Dr.prototype.execute=function(l){var d=this["@@propmod"];if(d.add!==void 0){var f=d.add;if(r(f))return s(s([],r(l)?l:[],!0),f).sort();if(typeof f=="number")return(Number(l)||0)+f;if(typeof f=="bigint")try{return BigInt(l)+f}catch{return BigInt(0)+f}throw new TypeError("Invalid term ".concat(f))}if(d.remove!==void 0){var m=d.remove;if(r(m))return r(l)?l.filter(function(b){return!m.includes(b)}).sort():[];if(typeof m=="number")return Number(l)-m;if(typeof m=="bigint")try{return BigInt(l)-m}catch{return BigInt(0)-m}throw new TypeError("Invalid subtrahend ".concat(m))}return f=(f=d.replacePrefix)===null||f===void 0?void 0:f[0],f&&typeof l=="string"&&l.startsWith(f)?d.replacePrefix[1]+l.substring(f.length):l},Dr);function Dr(l){this["@@propmod"]=l}var Qd=(St.prototype._read=function(l,d){var f=this._ctx;return f.error?f.table._trans(null,Rt.bind(null,f.error)):f.table._trans("readonly",l).then(d)},St.prototype._write=function(l){var d=this._ctx;return d.error?d.table._trans(null,Rt.bind(null,d.error)):d.table._trans("readwrite",l,"locked")},St.prototype._addAlgorithm=function(l){var d=this._ctx;d.algorithm=ln(d.algorithm,l)},St.prototype._iterate=function(l,d){return Ji(this._ctx,l,d,this._ctx.table.core)},St.prototype.clone=function(l){var d=Object.create(this.constructor.prototype),f=Object.create(this._ctx);return l&&c(f,l),d._ctx=f,d},St.prototype.raw=function(){return this._ctx.valueMapper=null,this},St.prototype.each=function(l){var d=this._ctx;return this._read(function(f){return Ji(d,l,f,d.table.core)})},St.prototype.count=function(l){var d=this;return this._read(function(f){var m=d._ctx,b=m.table.core;if(Pn(m,!0))return b.count({trans:f,query:{index:Gi(m,b.schema),range:m.range}}).then(function(k){return Math.min(k,m.limit)});var v=0;return Ji(m,function(){return++v,!1},f,b).then(function(){return v})}).then(l)},St.prototype.sortBy=function(l,d){var f=l.split(".").reverse(),m=f[0],b=f.length-1;function v(E,$){return $?v(E[f[$]],$-1):E[m]}var k=this._ctx.dir==="next"?1:-1;function _(E,$){return xt(v(E,b),v($,b))*k}return this.toArray(function(E){return E.sort(_)}).then(d)},St.prototype.toArray=function(l){var d=this;return this._read(function(f){var m=d._ctx;if(m.dir==="next"&&Pn(m,!0)&&0<m.limit){var b=m.valueMapper,v=Gi(m,m.table.core.schema);return m.table.core.query({trans:f,limit:m.limit,values:!0,query:{index:v,range:m.range}}).then(function(_){return _=_.result,b?_.map(b):_})}var k=[];return Ji(m,function(_){return k.push(_)},f,m.table.core).then(function(){return k})},l)},St.prototype.offset=function(l){var d=this._ctx;return l<=0||(d.offset+=l,Pn(d)?mo(d,function(){var f=l;return function(m,b){return f===0||(f===1?--f:b(function(){m.advance(f),f=0}),!1)}}):mo(d,function(){var f=l;return function(){return--f<0}})),this},St.prototype.limit=function(l){return this._ctx.limit=Math.min(this._ctx.limit,l),mo(this._ctx,function(){var d=l;return function(f,m,b){return--d<=0&&m(b),0<=d}},!0),this},St.prototype.until=function(l,d){return go(this._ctx,function(f,m,b){return!l(f.value)||(m(b),d)}),this},St.prototype.first=function(l){return this.limit(1).toArray(function(d){return d[0]}).then(l)},St.prototype.last=function(l){return this.reverse().first(l)},St.prototype.filter=function(l){var d;return go(this._ctx,function(f){return l(f.value)}),(d=this._ctx).isMatch=ln(d.isMatch,l),this},St.prototype.and=function(l){return this.filter(l)},St.prototype.or=function(l){return new this.db.WhereClause(this._ctx.table,l,this)},St.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},St.prototype.desc=function(){return this.reverse()},St.prototype.eachKey=function(l){var d=this._ctx;return d.keysOnly=!d.isMatch,this.each(function(f,m){l(m.key,m)})},St.prototype.eachUniqueKey=function(l){return this._ctx.unique="unique",this.eachKey(l)},St.prototype.eachPrimaryKey=function(l){var d=this._ctx;return d.keysOnly=!d.isMatch,this.each(function(f,m){l(m.primaryKey,m)})},St.prototype.keys=function(l){var d=this._ctx;d.keysOnly=!d.isMatch;var f=[];return this.each(function(m,b){f.push(b.key)}).then(function(){return f}).then(l)},St.prototype.primaryKeys=function(l){var d=this._ctx;if(d.dir==="next"&&Pn(d,!0)&&0<d.limit)return this._read(function(m){var b=Gi(d,d.table.core.schema);return d.table.core.query({trans:m,values:!1,limit:d.limit,query:{index:b,range:d.range}})}).then(function(m){return m.result}).then(l);d.keysOnly=!d.isMatch;var f=[];return this.each(function(m,b){f.push(b.primaryKey)}).then(function(){return f}).then(l)},St.prototype.uniqueKeys=function(l){return this._ctx.unique="unique",this.keys(l)},St.prototype.firstKey=function(l){return this.limit(1).keys(function(d){return d[0]}).then(l)},St.prototype.lastKey=function(l){return this.reverse().firstKey(l)},St.prototype.distinct=function(){var l=this._ctx,l=l.index&&l.table.schema.idxByName[l.index];if(!l||!l.multi)return this;var d={};return go(this._ctx,function(b){var m=b.primaryKey.toString(),b=p(d,m);return d[m]=!0,!b}),this},St.prototype.modify=function(l){var d=this,f=this._ctx;return this._write(function(m){var b,v,k;k=typeof l=="function"?l:(b=a(l),v=b.length,function(T){for(var B=!1,z=0;z<v;++z){var H=b[z],Y=l[H],X=I(T,H);Y instanceof Zn?(V(T,H,Y.execute(X)),B=!0):X!==Y&&(V(T,H,Y),B=!0)}return B});var _=f.table.core,D=_.schema.primaryKey,E=D.outbound,$=D.extractKey,F=200,D=d.db._options.modifyChunkSize;D&&(F=typeof D=="object"?D[_.name]||D["*"]||200:D);function L(T,H){var z=H.failures,H=H.numFailures;P+=T-H;for(var Y=0,X=a(z);Y<X.length;Y++){var tt=X[Y];M.push(z[tt])}}var M=[],P=0,R=[];return d.clone().primaryKeys().then(function(T){function B(H){var Y=Math.min(F,T.length-H);return _.getMany({trans:m,keys:T.slice(H,H+Y),cache:"immutable"}).then(function(X){for(var tt=[],G=[],J=E?[]:null,nt=[],Z=0;Z<Y;++Z){var st=X[Z],ht={value:dt(st),primKey:T[H+Z]};k.call(ht,ht.value,ht)!==!1&&(ht.value==null?nt.push(T[H+Z]):E||xt($(st),$(ht.value))===0?(G.push(ht.value),E&&J.push(T[H+Z])):(nt.push(T[H+Z]),tt.push(ht.value)))}return Promise.resolve(0<tt.length&&_.mutate({trans:m,type:"add",values:tt}).then(function(gt){for(var mt in gt.failures)nt.splice(parseInt(mt),1);L(tt.length,gt)})).then(function(){return(0<G.length||z&&typeof l=="object")&&_.mutate({trans:m,type:"put",keys:J,values:G,criteria:z,changeSpec:typeof l!="function"&&l,isAdditionalChunk:0<H}).then(function(gt){return L(G.length,gt)})}).then(function(){return(0<nt.length||z&&l===yo)&&_.mutate({trans:m,type:"delete",keys:nt,criteria:z,isAdditionalChunk:0<H}).then(function(gt){return L(nt.length,gt)})}).then(function(){return T.length>H+Y&&B(H+F)})})}var z=Pn(f)&&f.limit===1/0&&(typeof l!="function"||l===yo)&&{index:f.index,range:f.range};return B(0).then(function(){if(0<M.length)throw new xe("Error modifying one or more objects",M,P,R);return T.length})})})},St.prototype.delete=function(){var l=this._ctx,d=l.range;return Pn(l)&&(l.isPrimKey||d.type===3)?this._write(function(f){var m=l.table.core.schema.primaryKey,b=d;return l.table.core.count({trans:f,query:{index:m,range:b}}).then(function(v){return l.table.core.mutate({trans:f,type:"deleteRange",range:b}).then(function(k){var _=k.failures;if(k.lastResult,k.results,k=k.numFailures,k)throw new xe("Could not delete some values",Object.keys(_).map(function(E){return _[E]}),v-k);return v-k})})}):this.modify(yo)},St);function St(){}var yo=function(l,d){return d.value=null};function Zd(l,d){return l<d?-1:l===d?0:1}function tu(l,d){return d<l?-1:l===d?0:1}function ae(l,d,f){return l=l instanceof Er?new l.Collection(l):l,l._ctx.error=new(f||TypeError)(d),l}function On(l){return new l.Collection(l,function(){return Cr("")}).limit(0)}function Qi(l,d,f,m){var b,v,k,_,E,$,F,D=f.length;if(!f.every(function(P){return typeof P=="string"}))return ae(l,yr);function L(P){b=P==="next"?function(T){return T.toUpperCase()}:function(T){return T.toLowerCase()},v=P==="next"?function(T){return T.toLowerCase()}:function(T){return T.toUpperCase()},k=P==="next"?Zd:tu;var R=f.map(function(T){return{lower:v(T),upper:b(T)}}).sort(function(T,B){return k(T.lower,B.lower)});_=R.map(function(T){return T.upper}),E=R.map(function(T){return T.lower}),F=($=P)==="next"?"":m}L("next"),l=new l.Collection(l,function(){return He(_[0],E[D-1]+m)}),l._ondirectionchange=function(P){L(P)};var M=0;return l._addAlgorithm(function(P,R,T){var B=P.key;if(typeof B!="string")return!1;var z=v(B);if(d(z,E,M))return!0;for(var H=null,Y=M;Y<D;++Y){var X=function(tt,G,J,nt,Z,st){for(var ht=Math.min(tt.length,nt.length),gt=-1,mt=0;mt<ht;++mt){var re=G[mt];if(re!==nt[mt])return Z(tt[mt],J[mt])<0?tt.substr(0,mt)+J[mt]+J.substr(mt+1):Z(tt[mt],nt[mt])<0?tt.substr(0,mt)+nt[mt]+J.substr(mt+1):0<=gt?tt.substr(0,gt)+G[gt]+J.substr(gt+1):null;Z(tt[mt],re)<0&&(gt=mt)}return ht<nt.length&&st==="next"?tt+J.substr(tt.length):ht<tt.length&&st==="prev"?tt.substr(0,J.length):gt<0?null:tt.substr(0,gt)+nt[gt]+J.substr(gt+1)}(B,z,_[Y],E[Y],k,$);X===null&&H===null?M=Y+1:(H===null||0<k(H,X))&&(H=X)}return R(H!==null?function(){P.continue(H+F)}:T),!1}),l}function He(l,d,f,m){return{type:2,lower:l,upper:d,lowerOpen:f,upperOpen:m}}function Cr(l){return{type:1,lower:l,upper:l}}var Er=(Object.defineProperty(Wt.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Wt.prototype.between=function(l,d,f,m){f=f!==!1,m=m===!0;try{return 0<this._cmp(l,d)||this._cmp(l,d)===0&&(f||m)&&(!f||!m)?On(this):new this.Collection(this,function(){return He(l,d,!f,!m)})}catch{return ae(this,Ee)}},Wt.prototype.equals=function(l){return l==null?ae(this,Ee):new this.Collection(this,function(){return Cr(l)})},Wt.prototype.above=function(l){return l==null?ae(this,Ee):new this.Collection(this,function(){return He(l,void 0,!0)})},Wt.prototype.aboveOrEqual=function(l){return l==null?ae(this,Ee):new this.Collection(this,function(){return He(l,void 0,!1)})},Wt.prototype.below=function(l){return l==null?ae(this,Ee):new this.Collection(this,function(){return He(void 0,l,!1,!0)})},Wt.prototype.belowOrEqual=function(l){return l==null?ae(this,Ee):new this.Collection(this,function(){return He(void 0,l)})},Wt.prototype.startsWith=function(l){return typeof l!="string"?ae(this,yr):this.between(l,l+rn,!0,!0)},Wt.prototype.startsWithIgnoreCase=function(l){return l===""?this.startsWith(l):Qi(this,function(d,f){return d.indexOf(f[0])===0},[l],rn)},Wt.prototype.equalsIgnoreCase=function(l){return Qi(this,function(d,f){return d===f[0]},[l],"")},Wt.prototype.anyOfIgnoreCase=function(){var l=Ht.apply(_t,arguments);return l.length===0?On(this):Qi(this,function(d,f){return f.indexOf(d)!==-1},l,"")},Wt.prototype.startsWithAnyOfIgnoreCase=function(){var l=Ht.apply(_t,arguments);return l.length===0?On(this):Qi(this,function(d,f){return f.some(function(m){return d.indexOf(m)===0})},l,rn)},Wt.prototype.anyOf=function(){var l=this,d=Ht.apply(_t,arguments),f=this._cmp;try{d.sort(f)}catch{return ae(this,Ee)}if(d.length===0)return On(this);var m=new this.Collection(this,function(){return He(d[0],d[d.length-1])});m._ondirectionchange=function(v){f=v==="next"?l._ascending:l._descending,d.sort(f)};var b=0;return m._addAlgorithm(function(v,k,_){for(var E=v.key;0<f(E,d[b]);)if(++b===d.length)return k(_),!1;return f(E,d[b])===0||(k(function(){v.continue(d[b])}),!1)}),m},Wt.prototype.notEqual=function(l){return this.inAnyRange([[-1/0,l],[l,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Wt.prototype.noneOf=function(){var l=Ht.apply(_t,arguments);if(l.length===0)return new this.Collection(this);try{l.sort(this._ascending)}catch{return ae(this,Ee)}var d=l.reduce(function(f,m){return f?f.concat([[f[f.length-1][1],m]]):[[-1/0,m]]},null);return d.push([l[l.length-1],this.db._maxKey]),this.inAnyRange(d,{includeLowers:!1,includeUppers:!1})},Wt.prototype.inAnyRange=function(B,d){var f=this,m=this._cmp,b=this._ascending,v=this._descending,k=this._min,_=this._max;if(B.length===0)return On(this);if(!B.every(function(z){return z[0]!==void 0&&z[1]!==void 0&&b(z[0],z[1])<=0}))return ae(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",lt.InvalidArgument);var E=!d||d.includeLowers!==!1,$=d&&d.includeUppers===!0,F,D=b;function L(z,H){return D(z[0],H[0])}try{(F=B.reduce(function(z,H){for(var Y=0,X=z.length;Y<X;++Y){var tt=z[Y];if(m(H[0],tt[1])<0&&0<m(H[1],tt[0])){tt[0]=k(tt[0],H[0]),tt[1]=_(tt[1],H[1]);break}}return Y===X&&z.push(H),z},[])).sort(L)}catch{return ae(this,Ee)}var M=0,P=$?function(z){return 0<b(z,F[M][1])}:function(z){return 0<=b(z,F[M][1])},R=E?function(z){return 0<v(z,F[M][0])}:function(z){return 0<=v(z,F[M][0])},T=P,B=new this.Collection(this,function(){return He(F[0][0],F[F.length-1][1],!E,!$)});return B._ondirectionchange=function(z){D=z==="next"?(T=P,b):(T=R,v),F.sort(L)},B._addAlgorithm(function(z,H,Y){for(var X,tt=z.key;T(tt);)if(++M===F.length)return H(Y),!1;return!P(X=tt)&&!R(X)||(f._cmp(tt,F[M][1])===0||f._cmp(tt,F[M][0])===0||H(function(){D===b?z.continue(F[M][0]):z.continue(F[M][1])}),!1)}),B},Wt.prototype.startsWithAnyOf=function(){var l=Ht.apply(_t,arguments);return l.every(function(d){return typeof d=="string"})?l.length===0?On(this):this.inAnyRange(l.map(function(d){return[d,d+rn]})):ae(this,"startsWithAnyOf() only works with strings")},Wt);function Wt(){}function ke(l){return Pt(function(d){return ti(d),l(d.target.error),!1})}function ti(l){l.stopPropagation&&l.stopPropagation(),l.preventDefault&&l.preventDefault()}var ei="storagemutated",bo="x-storagemutated-1",je=Jn(null,ei),eu=(_e.prototype._lock=function(){return N(!rt.global),++this._reculock,this._reculock!==1||rt.global||(rt.lockOwnerFor=this),this},_e.prototype._unlock=function(){if(N(!rt.global),--this._reculock==0)for(rt.global||(rt.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var l=this._blockedFuncs.shift();try{an(l[1],l[0])}catch{}}return this},_e.prototype._locked=function(){return this._reculock&&rt.lockOwnerFor!==this},_e.prototype.create=function(l){var d=this;if(!this.mode)return this;var f=this.db.idbdb,m=this.db._state.dbOpenError;if(N(!this.idbtrans),!l&&!f)switch(m&&m.name){case"DatabaseClosedError":throw new lt.DatabaseClosed(m);case"MissingAPIError":throw new lt.MissingAPI(m.message,m);default:throw new lt.OpenFailed(m)}if(!this.active)throw new lt.TransactionInactive;return N(this._completion._state===null),(l=this.idbtrans=l||(this.db.core||f).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=Pt(function(b){ti(b),d._reject(l.error)}),l.onabort=Pt(function(b){ti(b),d.active&&d._reject(new lt.Abort(l.error)),d.active=!1,d.on("abort").fire(b)}),l.oncomplete=Pt(function(){d.active=!1,d._resolve(),"mutatedParts"in l&&je.storagemutated.fire(l.mutatedParts)}),this},_e.prototype._promise=function(l,d,f){var m=this;if(l==="readwrite"&&this.mode!=="readwrite")return Rt(new lt.ReadOnly("Transaction is readonly"));if(!this.active)return Rt(new lt.TransactionInactive);if(this._locked())return new it(function(v,k){m._blockedFuncs.push([function(){m._promise(l,d,f).then(v,k)},rt])});if(f)return Be(function(){var v=new it(function(k,_){m._lock();var E=d(k,_,m);E&&E.then&&E.then(k,_)});return v.finally(function(){return m._unlock()}),v._lib=!0,v});var b=new it(function(v,k){var _=d(v,k,m);_&&_.then&&_.then(v,k)});return b._lib=!0,b},_e.prototype._root=function(){return this.parent?this.parent._root():this},_e.prototype.waitFor=function(l){var d,f=this._root(),m=it.resolve(l);f._waitingFor?f._waitingFor=f._waitingFor.then(function(){return m}):(f._waitingFor=m,f._waitingQueue=[],d=f.idbtrans.objectStore(f.storeNames[0]),function v(){for(++f._spinCount;f._waitingQueue.length;)f._waitingQueue.shift()();f._waitingFor&&(d.get(-1/0).onsuccess=v)}());var b=f._waitingFor;return new it(function(v,k){m.then(function(_){return f._waitingQueue.push(Pt(v.bind(null,_)))},function(_){return f._waitingQueue.push(Pt(k.bind(null,_)))}).finally(function(){f._waitingFor===b&&(f._waitingFor=null)})})},_e.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new lt.Abort))},_e.prototype.table=function(l){var d=this._memoizedTables||(this._memoizedTables={});if(p(d,l))return d[l];var f=this.schema[l];if(!f)throw new lt.NotFound("Table "+l+" not part of transaction");return f=new this.db.Table(l,f,this),f.core=this.db.core.table(l),d[l]=f},_e);function _e(){}function vo(l,d,f,m,b,v,k){return{name:l,keyPath:d,unique:f,multi:m,auto:b,compound:v,src:(f&&!k?"&":"")+(m?"*":"")+(b?"++":"")+Mr(d)}}function Mr(l){return typeof l=="string"?l:l?"["+[].join.call(l,"+")+"]":""}function xo(l,d,f){return{name:l,primKey:d,indexes:f,mappedClass:null,idxByName:(m=function(b){return[b.name,b]},f.reduce(function(b,v,k){return k=m(v,k),k&&(b[k[0]]=k[1]),b},{}))};var m}var ni=function(l){try{return l.only([[]]),ni=function(){return[[]]},[[]]}catch{return ni=function(){return rn},rn}};function wo(l){return l==null?function(){}:typeof l=="string"?(d=l).split(".").length===1?function(f){return f[d]}:function(f){return I(f,d)}:function(f){return I(f,l)};var d}function $r(l){return[].slice.call(l)}var nu=0;function ii(l){return l==null?":id":typeof l=="string"?l:"[".concat(l.join("+"),"]")}function iu(l,d,E){function m(T){if(T.type===3)return null;if(T.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var M=T.lower,P=T.upper,R=T.lowerOpen,T=T.upperOpen;return M===void 0?P===void 0?null:d.upperBound(P,!!T):P===void 0?d.lowerBound(M,!!R):d.bound(M,P,!!R,!!T)}function b(L){var M,P=L.name;return{name:P,schema:L,mutate:function(R){var T=R.trans,B=R.type,z=R.keys,H=R.values,Y=R.range;return new Promise(function(X,tt){X=Pt(X);var G=T.objectStore(P),J=G.keyPath==null,nt=B==="put"||B==="add";if(!nt&&B!=="delete"&&B!=="deleteRange")throw new Error("Invalid operation type: "+B);var Z,st=(z||H||{length:1}).length;if(z&&H&&z.length!==H.length)throw new Error("Given keys array must have same length as given values array.");if(st===0)return X({numFailures:0,failures:{},results:[],lastResult:void 0});function ht(te){++re,ti(te)}var gt=[],mt=[],re=0;if(B==="deleteRange"){if(Y.type===4)return X({numFailures:re,failures:mt,results:[],lastResult:void 0});Y.type===3?gt.push(Z=G.clear()):gt.push(Z=G.delete(m(Y)))}else{var J=nt?J?[H,z]:[H,null]:[z,null],ut=J[0],Xt=J[1];if(nt)for(var Gt=0;Gt<st;++Gt)gt.push(Z=Xt&&Xt[Gt]!==void 0?G[B](ut[Gt],Xt[Gt]):G[B](ut[Gt])),Z.onerror=ht;else for(Gt=0;Gt<st;++Gt)gt.push(Z=G[B](ut[Gt])),Z.onerror=ht}function us(te){te=te.target.result,gt.forEach(function(un,No){return un.error!=null&&(mt[No]=un.error)}),X({numFailures:re,failures:mt,results:B==="delete"?z:gt.map(function(un){return un.result}),lastResult:te})}Z.onerror=function(te){ht(te),us(te)},Z.onsuccess=us})},getMany:function(R){var T=R.trans,B=R.keys;return new Promise(function(z,H){z=Pt(z);for(var Y,X=T.objectStore(P),tt=B.length,G=new Array(tt),J=0,nt=0,Z=function(gt){gt=gt.target,G[gt._pos]=gt.result,++nt===J&&z(G)},st=ke(H),ht=0;ht<tt;++ht)B[ht]!=null&&((Y=X.get(B[ht]))._pos=ht,Y.onsuccess=Z,Y.onerror=st,++J);J===0&&z(G)})},get:function(R){var T=R.trans,B=R.key;return new Promise(function(z,H){z=Pt(z);var Y=T.objectStore(P).get(B);Y.onsuccess=function(X){return z(X.target.result)},Y.onerror=ke(H)})},query:(M=$,function(R){return new Promise(function(T,B){T=Pt(T);var z,H,Y,J=R.trans,X=R.values,tt=R.limit,Z=R.query,G=tt===1/0?void 0:tt,nt=Z.index,Z=Z.range,J=J.objectStore(P),nt=nt.isPrimaryKey?J:J.index(nt.name),Z=m(Z);if(tt===0)return T({result:[]});M?((G=X?nt.getAll(Z,G):nt.getAllKeys(Z,G)).onsuccess=function(st){return T({result:st.target.result})},G.onerror=ke(B)):(z=0,H=!X&&"openKeyCursor"in nt?nt.openKeyCursor(Z):nt.openCursor(Z),Y=[],H.onsuccess=function(st){var ht=H.result;return ht?(Y.push(X?ht.value:ht.primaryKey),++z===tt?T({result:Y}):void ht.continue()):T({result:Y})},H.onerror=ke(B))})}),openCursor:function(R){var T=R.trans,B=R.values,z=R.query,H=R.reverse,Y=R.unique;return new Promise(function(X,tt){X=Pt(X);var nt=z.index,G=z.range,J=T.objectStore(P),J=nt.isPrimaryKey?J:J.index(nt.name),nt=H?Y?"prevunique":"prev":Y?"nextunique":"next",Z=!B&&"openKeyCursor"in J?J.openKeyCursor(m(G),nt):J.openCursor(m(G),nt);Z.onerror=ke(tt),Z.onsuccess=Pt(function(st){var ht,gt,mt,re,ut=Z.result;ut?(ut.___id=++nu,ut.done=!1,ht=ut.continue.bind(ut),gt=(gt=ut.continuePrimaryKey)&&gt.bind(ut),mt=ut.advance.bind(ut),re=function(){throw new Error("Cursor not stopped")},ut.trans=T,ut.stop=ut.continue=ut.continuePrimaryKey=ut.advance=function(){throw new Error("Cursor not started")},ut.fail=Pt(tt),ut.next=function(){var Xt=this,Gt=1;return this.start(function(){return Gt--?Xt.continue():Xt.stop()}).then(function(){return Xt})},ut.start=function(Xt){function Gt(){if(Z.result)try{Xt()}catch(te){ut.fail(te)}else ut.done=!0,ut.start=function(){throw new Error("Cursor behind last entry")},ut.stop()}var us=new Promise(function(te,un){te=Pt(te),Z.onerror=ke(un),ut.fail=un,ut.stop=function(No){ut.stop=ut.continue=ut.continuePrimaryKey=ut.advance=re,te(No)}});return Z.onsuccess=Pt(function(te){Z.onsuccess=Gt,Gt()}),ut.continue=ht,ut.continuePrimaryKey=gt,ut.advance=mt,Gt(),us},X(ut)):X(null)},tt)})},count:function(R){var T=R.query,B=R.trans,z=T.index,H=T.range;return new Promise(function(Y,X){var tt=B.objectStore(P),G=z.isPrimaryKey?tt:tt.index(z.name),tt=m(H),G=tt?G.count(tt):G.count();G.onsuccess=Pt(function(J){return Y(J.target.result)}),G.onerror=ke(X)})}}}var v,k,_,F=(k=E,_=$r((v=l).objectStoreNames),{schema:{name:v.name,tables:_.map(function(L){return k.objectStore(L)}).map(function(L){var M=L.keyPath,T=L.autoIncrement,P=r(M),R={},T={name:L.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:M==null,compound:P,keyPath:M,autoIncrement:T,unique:!0,extractKey:wo(M)},indexes:$r(L.indexNames).map(function(B){return L.index(B)}).map(function(Y){var z=Y.name,H=Y.unique,X=Y.multiEntry,Y=Y.keyPath,X={name:z,compound:r(Y),keyPath:Y,unique:H,multiEntry:X,extractKey:wo(Y)};return R[ii(Y)]=X}),getIndexByKeyPath:function(B){return R[ii(B)]}};return R[":id"]=T.primaryKey,M!=null&&(R[ii(M)]=T.primaryKey),T})},hasGetAll:0<_.length&&"getAll"in k.objectStore(_[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)}),E=F.schema,$=F.hasGetAll,F=E.tables.map(b),D={};return F.forEach(function(L){return D[L.name]=L}),{stack:"dbcore",transaction:l.transaction.bind(l),table:function(L){if(!D[L])throw new Error("Table '".concat(L,"' not found"));return D[L]},MIN_KEY:-1/0,MAX_KEY:ni(d),schema:E}}function su(l,d,f,m){var b=f.IDBKeyRange;return f.indexedDB,{dbcore:(m=iu(d,b,m),l.dbcore.reduce(function(v,k){return k=k.create,i(i({},v),k(v))},m))}}function Zi(l,m){var f=m.db,m=su(l._middlewares,f,l._deps,m);l.core=m.dbcore,l.tables.forEach(function(b){var v=b.name;l.core.schema.tables.some(function(k){return k.name===v})&&(b.core=l.core.table(v),l[v]instanceof l.Table&&(l[v].core=b.core))})}function ts(l,d,f,m){f.forEach(function(b){var v=m[b];d.forEach(function(k){var _=function E($,F){return S($,F)||($=u($))&&E($,F)}(k,b);(!_||"value"in _&&_.value===void 0)&&(k===l.Transaction.prototype||k instanceof l.Transaction?x(k,b,{get:function(){return this.table(b)},set:function(E){g(this,b,{value:E,writable:!0,configurable:!0,enumerable:!0})}}):k[b]=new l.Table(b,v))})})}function ko(l,d){d.forEach(function(f){for(var m in f)f[m]instanceof l.Table&&delete f[m]})}function ou(l,d){return l._cfg.version-d._cfg.version}function au(l,d,f,m){var b=l._dbSchema;f.objectStoreNames.contains("$meta")&&!b.$meta&&(b.$meta=xo("$meta",Tr("")[0],[]),l._storeNames.push("$meta"));var v=l._createTransaction("readwrite",l._storeNames,b);v.create(f),v._completion.catch(m);var k=v._reject.bind(v),_=rt.transless||rt;Be(function(){return rt.trans=v,rt.transless=_,d!==0?(Zi(l,f),$=d,((E=v).storeNames.includes("$meta")?E.table("$meta").get("version").then(function(F){return F??$}):it.resolve($)).then(function(F){return L=F,M=v,P=f,R=[],F=(D=l)._versions,T=D._dbSchema=ns(0,D.idbdb,P),(F=F.filter(function(B){return B._cfg.version>=L})).length!==0?(F.forEach(function(B){R.push(function(){var z=T,H=B._cfg.dbschema;is(D,z,P),is(D,H,P),T=D._dbSchema=H;var Y=_o(z,H);Y.add.forEach(function(nt){So(P,nt[0],nt[1].primKey,nt[1].indexes)}),Y.change.forEach(function(nt){if(nt.recreate)throw new lt.Upgrade("Not yet support for changing primary key");var Z=P.objectStore(nt.name);nt.add.forEach(function(st){return es(Z,st)}),nt.change.forEach(function(st){Z.deleteIndex(st.name),es(Z,st)}),nt.del.forEach(function(st){return Z.deleteIndex(st)})});var X=B._cfg.contentUpgrade;if(X&&B._cfg.version>L){Zi(D,P),M._memoizedTables={};var tt=U(H);Y.del.forEach(function(nt){tt[nt]=z[nt]}),ko(D,[D.Transaction.prototype]),ts(D,[D.Transaction.prototype],a(tt),tt),M.schema=tt;var G,J=ye(X);return J&&An(),Y=it.follow(function(){var nt;(G=X(M))&&J&&(nt=Ne.bind(null,null),G.then(nt,nt))}),G&&typeof G.then=="function"?it.resolve(G):Y.then(function(){return G})}}),R.push(function(z){var H,Y,X=B._cfg.dbschema;H=X,Y=z,[].slice.call(Y.db.objectStoreNames).forEach(function(tt){return H[tt]==null&&Y.db.deleteObjectStore(tt)}),ko(D,[D.Transaction.prototype]),ts(D,[D.Transaction.prototype],D._storeNames,D._dbSchema),M.schema=D._dbSchema}),R.push(function(z){D.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(D.idbdb.version/10)===B._cfg.version?(D.idbdb.deleteObjectStore("$meta"),delete D._dbSchema.$meta,D._storeNames=D._storeNames.filter(function(H){return H!=="$meta"})):z.objectStore("$meta").put(B._cfg.version,"version"))})}),function B(){return R.length?it.resolve(R.shift()(M.idbtrans)).then(B):it.resolve()}().then(function(){Ar(T,P)})):it.resolve();var D,L,M,P,R,T}).catch(k)):(a(b).forEach(function(F){So(f,F,b[F].primKey,b[F].indexes)}),Zi(l,f),void it.follow(function(){return l.on.populate.fire(v)}).catch(k));var E,$})}function ru(l,d){Ar(l._dbSchema,d),d.db.version%10!=0||d.objectStoreNames.contains("$meta")||d.db.createObjectStore("$meta").add(Math.ceil(d.db.version/10-1),"version");var f=ns(0,l.idbdb,d);is(l,l._dbSchema,d);for(var m=0,b=_o(f,l._dbSchema).change;m<b.length;m++){var v=function(k){if(k.change.length||k.recreate)return console.warn("Unable to patch indexes of table ".concat(k.name," because it has changes on the type of index or primary key.")),{value:void 0};var _=d.objectStore(k.name);k.add.forEach(function(E){we&&console.debug("Dexie upgrade patch: Creating missing index ".concat(k.name,".").concat(E.src)),es(_,E)})}(b[m]);if(typeof v=="object")return v.value}}function _o(l,d){var f,m={del:[],add:[],change:[]};for(f in l)d[f]||m.del.push(f);for(f in d){var b=l[f],v=d[f];if(b){var k={name:f,def:v,recreate:!1,del:[],add:[],change:[]};if(""+(b.primKey.keyPath||"")!=""+(v.primKey.keyPath||"")||b.primKey.auto!==v.primKey.auto)k.recreate=!0,m.change.push(k);else{var _=b.idxByName,E=v.idxByName,$=void 0;for($ in _)E[$]||k.del.push($);for($ in E){var F=_[$],D=E[$];F?F.src!==D.src&&k.change.push(D):k.add.push(D)}(0<k.del.length||0<k.add.length||0<k.change.length)&&m.change.push(k)}}else m.add.push([f,v])}return m}function So(l,d,f,m){var b=l.db.createObjectStore(d,f.keyPath?{keyPath:f.keyPath,autoIncrement:f.auto}:{autoIncrement:f.auto});return m.forEach(function(v){return es(b,v)}),b}function Ar(l,d){a(l).forEach(function(f){d.db.objectStoreNames.contains(f)||(we&&console.debug("Dexie: Creating missing table",f),So(d,f,l[f].primKey,l[f].indexes))})}function es(l,d){l.createIndex(d.name,d.keyPath,{unique:d.unique,multiEntry:d.multi})}function ns(l,d,f){var m={};return A(d.objectStoreNames,0).forEach(function(b){for(var v=f.objectStore(b),k=vo(Mr($=v.keyPath),$||"",!0,!1,!!v.autoIncrement,$&&typeof $!="string",!0),_=[],E=0;E<v.indexNames.length;++E){var F=v.index(v.indexNames[E]),$=F.keyPath,F=vo(F.name,$,!!F.unique,!!F.multiEntry,!1,$&&typeof $!="string",!1);_.push(F)}m[b]=xo(b,k,_)}),m}function is(l,d,f){for(var m=f.db.objectStoreNames,b=0;b<m.length;++b){var v=m[b],k=f.objectStore(v);l._hasGetAll="getAll"in k;for(var _=0;_<k.indexNames.length;++_){var E=k.indexNames[_],$=k.index(E).keyPath,F=typeof $=="string"?$:"["+A($).join("+")+"]";!d[v]||($=d[v].idxByName[F])&&($.name=E,delete d[v].idxByName[F],d[v].idxByName[E]=$)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&o.WorkerGlobalScope&&o instanceof o.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(l._hasGetAll=!1)}function Tr(l){return l.split(",").map(function(d,f){var m=(d=d.trim()).replace(/([&*]|\+\+)/g,""),b=/^\[/.test(m)?m.match(/^\[(.*)\]$/)[1].split("+"):m;return vo(m,b||null,/\&/.test(d),/\*/.test(d),/\+\+/.test(d),r(b),f===0)})}var lu=(ss.prototype._parseStoresSpec=function(l,d){a(l).forEach(function(f){if(l[f]!==null){var m=Tr(l[f]),b=m.shift();if(b.unique=!0,b.multi)throw new lt.Schema("Primary key cannot be multi-valued");m.forEach(function(v){if(v.auto)throw new lt.Schema("Only primary key can be marked as autoIncrement (++)");if(!v.keyPath)throw new lt.Schema("Index must have a name and cannot be an empty string")}),d[f]=xo(f,b,m)}})},ss.prototype.stores=function(f){var d=this.db;this._cfg.storesSource=this._cfg.storesSource?c(this._cfg.storesSource,f):f;var f=d._versions,m={},b={};return f.forEach(function(v){c(m,v._cfg.storesSource),b=v._cfg.dbschema={},v._parseStoresSpec(m,b)}),d._dbSchema=b,ko(d,[d._allTables,d,d.Transaction.prototype]),ts(d,[d._allTables,d,d.Transaction.prototype,this._cfg.tables],a(b),b),d._storeNames=a(b),this},ss.prototype.upgrade=function(l){return this._cfg.contentUpgrade=io(this._cfg.contentUpgrade||Et,l),this},ss);function ss(){}function Do(l,d){var f=l._dbNamesDB;return f||(f=l._dbNamesDB=new Me(Ki,{addons:[],indexedDB:l,IDBKeyRange:d})).version(1).stores({dbnames:"name"}),f.table("dbnames")}function Co(l){return l&&typeof l.databases=="function"}function Eo(l){return Be(function(){return rt.letThrough=!0,l()})}function Mo(l){return!("from"in l)}var Kt=function(l,d){if(!this){var f=new Kt;return l&&"d"in l&&c(f,l),f}c(this,arguments.length?{d:1,from:l,to:1<arguments.length?d:l}:{d:0})};function si(l,d,f){var m=xt(d,f);if(!isNaN(m)){if(0<m)throw RangeError();if(Mo(l))return c(l,{from:d,to:f,d:1});var b=l.l,m=l.r;if(xt(f,l.from)<0)return b?si(b,d,f):l.l={from:d,to:f,d:1,l:null,r:null},Or(l);if(0<xt(d,l.to))return m?si(m,d,f):l.r={from:d,to:f,d:1,l:null,r:null},Or(l);xt(d,l.from)<0&&(l.from=d,l.l=null,l.d=m?m.d+1:1),0<xt(f,l.to)&&(l.to=f,l.r=null,l.d=l.l?l.l.d+1:1),f=!l.r,b&&!l.l&&oi(l,b),m&&f&&oi(l,m)}}function oi(l,d){Mo(d)||function f(m,E){var v=E.from,k=E.to,_=E.l,E=E.r;si(m,v,k),_&&f(m,_),E&&f(m,E)}(l,d)}function Pr(l,d){var f=os(d),m=f.next();if(m.done)return!1;for(var b=m.value,v=os(l),k=v.next(b.from),_=k.value;!m.done&&!k.done;){if(xt(_.from,b.to)<=0&&0<=xt(_.to,b.from))return!0;xt(b.from,_.from)<0?b=(m=f.next(_.from)).value:_=(k=v.next(b.from)).value}return!1}function os(l){var d=Mo(l)?null:{s:0,n:l};return{next:function(f){for(var m=0<arguments.length;d;)switch(d.s){case 0:if(d.s=1,m)for(;d.n.l&&xt(f,d.n.from)<0;)d={up:d,n:d.n.l,s:1};else for(;d.n.l;)d={up:d,n:d.n.l,s:1};case 1:if(d.s=2,!m||xt(f,d.n.to)<=0)return{value:d.n,done:!1};case 2:if(d.n.r){d.s=3,d={up:d,n:d.n.r,s:0};continue}case 3:d=d.up}return{done:!0}}}}function Or(l){var d,f,m=(((d=l.r)===null||d===void 0?void 0:d.d)||0)-(((f=l.l)===null||f===void 0?void 0:f.d)||0),b=1<m?"r":m<-1?"l":"";b&&(d=b=="r"?"l":"r",f=i({},l),m=l[b],l.from=m.from,l.to=m.to,l[b]=m[b],f[b]=m[d],(l[d]=f).d=Fr(f)),l.d=Fr(l)}function Fr(f){var d=f.r,f=f.l;return(d?f?Math.max(d.d,f.d):d.d:f?f.d:0)+1}function as(l,d){return a(d).forEach(function(f){l[f]?oi(l[f],d[f]):l[f]=function m(b){var v,k,_={};for(v in b)p(b,v)&&(k=b[v],_[v]=!k||typeof k!="object"||Q.has(k.constructor)?k:m(k));return _}(d[f])}),l}function $o(l,d){return l.all||d.all||Object.keys(l).some(function(f){return d[f]&&Pr(d[f],l[f])})}y(Kt.prototype,((ue={add:function(l){return oi(this,l),this},addKey:function(l){return si(this,l,l),this},addKeys:function(l){var d=this;return l.forEach(function(f){return si(d,f,f)}),this},hasKey:function(l){var d=os(this).next(l).value;return d&&xt(d.from,l)<=0&&0<=xt(d.to,l)}})[bt]=function(){return os(this)},ue));var cn={},Ao={},To=!1;function rs(l){as(Ao,l),To||(To=!0,setTimeout(function(){To=!1,Po(Ao,!(Ao={}))},0))}function Po(l,d){d===void 0&&(d=!1);var f=new Set;if(l.all)for(var m=0,b=Object.values(cn);m<b.length;m++)Ir(k=b[m],l,f,d);else for(var v in l){var k,_=/^idb\:\/\/(.*)\/(.*)\//.exec(v);_&&(v=_[1],_=_[2],(k=cn["idb://".concat(v,"/").concat(_)])&&Ir(k,l,f,d))}f.forEach(function(E){return E()})}function Ir(l,d,f,m){for(var b=[],v=0,k=Object.entries(l.queries.query);v<k.length;v++){for(var _=k[v],E=_[0],$=[],F=0,D=_[1];F<D.length;F++){var L=D[F];$o(d,L.obsSet)?L.subscribers.forEach(function(T){return f.add(T)}):m&&$.push(L)}m&&b.push([E,$])}if(m)for(var M=0,P=b;M<P.length;M++){var R=P[M],E=R[0],$=R[1];l.queries.query[E]=$}}function cu(l){var d=l._state,f=l._deps.indexedDB;if(d.isBeingOpened||l.idbdb)return d.dbReadyPromise.then(function(){return d.dbOpenError?Rt(d.dbOpenError):l});d.isBeingOpened=!0,d.dbOpenError=null,d.openComplete=!1;var m=d.openCanceller,b=Math.round(10*l.verno),v=!1;function k(){if(d.openCanceller!==m)throw new lt.DatabaseClosed("db.open() was cancelled")}function _(){return new it(function(L,M){if(k(),!f)throw new lt.MissingAPI;var P=l.name,R=d.autoSchema||!b?f.open(P):f.open(P,b);if(!R)throw new lt.MissingAPI;R.onerror=ke(M),R.onblocked=Pt(l._fireOnBlocked),R.onupgradeneeded=Pt(function(T){var B;F=R.transaction,d.autoSchema&&!l._options.allowEmptyDB?(R.onerror=ti,F.abort(),R.result.close(),(B=f.deleteDatabase(P)).onsuccess=B.onerror=Pt(function(){M(new lt.NoSuchDatabase("Database ".concat(P," doesnt exist")))})):(F.onerror=ke(M),T=T.oldVersion>Math.pow(2,62)?0:T.oldVersion,D=T<1,l.idbdb=R.result,v&&ru(l,F),au(l,T/10,F,M))},M),R.onsuccess=Pt(function(){F=null;var T,B,z,H,Y,X=l.idbdb=R.result,tt=A(X.objectStoreNames);if(0<tt.length)try{var G=X.transaction((H=tt).length===1?H[0]:H,"readonly");if(d.autoSchema)B=X,z=G,(T=l).verno=B.version/10,z=T._dbSchema=ns(0,B,z),T._storeNames=A(B.objectStoreNames,0),ts(T,[T._allTables],a(z),z);else if(is(l,l._dbSchema,G),((Y=_o(ns(0,(Y=l).idbdb,G),Y._dbSchema)).add.length||Y.change.some(function(J){return J.add.length||J.change.length}))&&!v)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),X.close(),b=X.version+1,v=!0,L(_());Zi(l,G)}catch{}Tn.push(l),X.onversionchange=Pt(function(J){d.vcFired=!0,l.on("versionchange").fire(J)}),X.onclose=Pt(function(J){l.on("close").fire(J)}),D&&(Y=l._deps,G=P,X=Y.indexedDB,Y=Y.IDBKeyRange,Co(X)||G===Ki||Do(X,Y).put({name:G}).catch(Et)),L()},M)}).catch(function(L){switch(L==null?void 0:L.name){case"UnknownError":if(0<d.PR1398_maxLoop)return d.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),_();break;case"VersionError":if(0<b)return b=0,_()}return it.reject(L)})}var E,$=d.dbReadyResolve,F=null,D=!1;return it.race([m,(typeof navigator>"u"?it.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(L){function M(){return indexedDB.databases().finally(L)}E=setInterval(M,100),M()}).finally(function(){return clearInterval(E)}):Promise.resolve()).then(_)]).then(function(){return k(),d.onReadyBeingFired=[],it.resolve(Eo(function(){return l.on.ready.fire(l.vip)})).then(function L(){if(0<d.onReadyBeingFired.length){var M=d.onReadyBeingFired.reduce(io,Et);return d.onReadyBeingFired=[],it.resolve(Eo(function(){return M(l.vip)})).then(L)}})}).finally(function(){d.openCanceller===m&&(d.onReadyBeingFired=null,d.isBeingOpened=!1)}).catch(function(L){d.dbOpenError=L;try{F&&F.abort()}catch{}return m===d.openCanceller&&l._close(),Rt(L)}).finally(function(){d.openComplete=!0,$()}).then(function(){var L;return D&&(L={},l.tables.forEach(function(M){M.schema.indexes.forEach(function(P){P.name&&(L["idb://".concat(l.name,"/").concat(M.name,"/").concat(P.name)]=new Kt(-1/0,[[[]]]))}),L["idb://".concat(l.name,"/").concat(M.name,"/")]=L["idb://".concat(l.name,"/").concat(M.name,"/:dels")]=new Kt(-1/0,[[[]]])}),je(ei).fire(L),Po(L,!0)),l})}function Oo(l){function d(v){return l.next(v)}var f=b(d),m=b(function(v){return l.throw(v)});function b(v){return function(E){var _=v(E),E=_.value;return _.done?E:E&&typeof E.then=="function"?E.then(f,m):r(E)?Promise.all(E).then(f,m):f(E)}}return b(d)()}function ls(l,d,f){for(var m=r(l)?l.slice():[l],b=0;b<f;++b)m.push(d);return m}var du={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(l){return i(i({},l),{table:function(d){var f=l.table(d),m=f.schema,b={},v=[];function k(D,L,M){var P=ii(D),R=b[P]=b[P]||[],T=D==null?0:typeof D=="string"?1:D.length,B=0<L,B=i(i({},M),{name:B?"".concat(P,"(virtual-from:").concat(M.name,")"):M.name,lowLevelIndex:M,isVirtual:B,keyTail:L,keyLength:T,extractKey:wo(D),unique:!B&&M.unique});return R.push(B),B.isPrimaryKey||v.push(B),1<T&&k(T===2?D[0]:D.slice(0,T-1),L+1,M),R.sort(function(z,H){return z.keyTail-H.keyTail}),B}d=k(m.primaryKey.keyPath,0,m.primaryKey),b[":id"]=[d];for(var _=0,E=m.indexes;_<E.length;_++){var $=E[_];k($.keyPath,0,$)}function F(D){var L,M=D.query.index;return M.isVirtual?i(i({},D),{query:{index:M.lowLevelIndex,range:(L=D.query.range,M=M.keyTail,{type:L.type===1?2:L.type,lower:ls(L.lower,L.lowerOpen?l.MAX_KEY:l.MIN_KEY,M),lowerOpen:!0,upper:ls(L.upper,L.upperOpen?l.MIN_KEY:l.MAX_KEY,M),upperOpen:!0})}}):D}return i(i({},f),{schema:i(i({},m),{primaryKey:d,indexes:v,getIndexByKeyPath:function(D){return(D=b[ii(D)])&&D[0]}}),count:function(D){return f.count(F(D))},query:function(D){return f.query(F(D))},openCursor:function(D){var L=D.query.index,M=L.keyTail,P=L.isVirtual,R=L.keyLength;return P?f.openCursor(F(D)).then(function(B){return B&&T(B)}):f.openCursor(D);function T(B){return Object.create(B,{continue:{value:function(z){z!=null?B.continue(ls(z,D.reverse?l.MAX_KEY:l.MIN_KEY,M)):D.unique?B.continue(B.key.slice(0,R).concat(D.reverse?l.MIN_KEY:l.MAX_KEY,M)):B.continue()}},continuePrimaryKey:{value:function(z,H){B.continuePrimaryKey(ls(z,l.MAX_KEY,M),H)}},primaryKey:{get:function(){return B.primaryKey}},key:{get:function(){var z=B.key;return R===1?z[0]:z.slice(0,R)}},value:{get:function(){return B.value}}})}}})}})}};function Fo(l,d,f,m){return f=f||{},m=m||"",a(l).forEach(function(b){var v,k,_;p(d,b)?(v=l[b],k=d[b],typeof v=="object"&&typeof k=="object"&&v&&k?(_=ct(v))!==ct(k)?f[m+b]=d[b]:_==="Object"?Fo(v,k,f,m+b+"."):v!==k&&(f[m+b]=d[b]):v!==k&&(f[m+b]=d[b])):f[m+b]=void 0}),a(d).forEach(function(b){p(l,b)||(f[m+b]=d[b])}),f}function Io(l,d){return d.type==="delete"?d.keys:d.keys||d.values.map(l.extractKey)}var uu={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(l){return i(i({},l),{table:function(d){var f=l.table(d),m=f.schema.primaryKey;return i(i({},f),{mutate:function(b){var v=rt.trans,k=v.table(d).hook,_=k.deleting,E=k.creating,$=k.updating;switch(b.type){case"add":if(E.fire===Et)break;return v._promise("readwrite",function(){return F(b)},!0);case"put":if(E.fire===Et&&$.fire===Et)break;return v._promise("readwrite",function(){return F(b)},!0);case"delete":if(_.fire===Et)break;return v._promise("readwrite",function(){return F(b)},!0);case"deleteRange":if(_.fire===Et)break;return v._promise("readwrite",function(){return function D(L,M,P){return f.query({trans:L,values:!1,query:{index:m,range:M},limit:P}).then(function(R){var T=R.result;return F({type:"delete",keys:T,trans:L}).then(function(B){return 0<B.numFailures?Promise.reject(B.failures[0]):T.length<P?{failures:[],numFailures:0,lastResult:void 0}:D(L,i(i({},M),{lower:T[T.length-1],lowerOpen:!0}),P)})})}(b.trans,b.range,1e4)},!0)}return f.mutate(b);function F(D){var L,M,P,R=rt.trans,T=D.keys||Io(m,D);if(!T)throw new Error("Keys missing");return(D=D.type==="add"||D.type==="put"?i(i({},D),{keys:T}):i({},D)).type!=="delete"&&(D.values=s([],D.values)),D.keys&&(D.keys=s([],D.keys)),L=f,P=T,((M=D).type==="add"?Promise.resolve([]):L.getMany({trans:M.trans,keys:P,cache:"immutable"})).then(function(B){var z=T.map(function(H,Y){var X,tt,G,J=B[Y],nt={onerror:null,onsuccess:null};return D.type==="delete"?_.fire.call(nt,H,J,R):D.type==="add"||J===void 0?(X=E.fire.call(nt,H,D.values[Y],R),H==null&&X!=null&&(D.keys[Y]=H=X,m.outbound||V(D.values[Y],m.keyPath,H))):(X=Fo(J,D.values[Y]),(tt=$.fire.call(nt,X,H,J,R))&&(G=D.values[Y],Object.keys(tt).forEach(function(Z){p(G,Z)?G[Z]=tt[Z]:V(G,Z,tt[Z])}))),nt});return f.mutate(D).then(function(H){for(var Y=H.failures,X=H.results,tt=H.numFailures,H=H.lastResult,G=0;G<T.length;++G){var J=(X||T)[G],nt=z[G];J==null?nt.onerror&&nt.onerror(Y[G]):nt.onsuccess&&nt.onsuccess(D.type==="put"&&B[G]?D.values[G]:J)}return{failures:Y,results:X,numFailures:tt,lastResult:H}}).catch(function(H){return z.forEach(function(Y){return Y.onerror&&Y.onerror(H)}),Promise.reject(H)})})}}})}})}};function Rr(l,d,f){try{if(!d||d.keys.length<l.length)return null;for(var m=[],b=0,v=0;b<d.keys.length&&v<l.length;++b)xt(d.keys[b],l[v])===0&&(m.push(f?dt(d.values[b]):d.values[b]),++v);return m.length===l.length?m:null}catch{return null}}var hu={stack:"dbcore",level:-1,create:function(l){return{table:function(d){var f=l.table(d);return i(i({},f),{getMany:function(m){if(!m.cache)return f.getMany(m);var b=Rr(m.keys,m.trans._cache,m.cache==="clone");return b?it.resolve(b):f.getMany(m).then(function(v){return m.trans._cache={keys:m.keys,values:m.cache==="clone"?dt(v):v},v})},mutate:function(m){return m.type!=="add"&&(m.trans._cache=null),f.mutate(m)}})}}}};function Lr(l,d){return l.trans.mode==="readonly"&&!!l.subscr&&!l.trans.explicit&&l.trans.db._options.cache!=="disabled"&&!d.schema.primaryKey.outbound}function Br(l,d){switch(l){case"query":return d.values&&!d.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var fu={stack:"dbcore",level:0,name:"Observability",create:function(l){var d=l.schema.name,f=new Kt(l.MIN_KEY,l.MAX_KEY);return i(i({},l),{transaction:function(m,b,v){if(rt.subscr&&b!=="readonly")throw new lt.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(rt.querier));return l.transaction(m,b,v)},table:function(m){var b=l.table(m),v=b.schema,k=v.primaryKey,D=v.indexes,_=k.extractKey,E=k.outbound,$=k.autoIncrement&&D.filter(function(M){return M.compound&&M.keyPath.includes(k.keyPath)}),F=i(i({},b),{mutate:function(M){function P(Z){return Z="idb://".concat(d,"/").concat(m,"/").concat(Z),H[Z]||(H[Z]=new Kt)}var R,T,B,z=M.trans,H=M.mutatedParts||(M.mutatedParts={}),Y=P(""),X=P(":dels"),tt=M.type,nt=M.type==="deleteRange"?[M.range]:M.type==="delete"?[M.keys]:M.values.length<50?[Io(k,M).filter(function(Z){return Z}),M.values]:[],G=nt[0],J=nt[1],nt=M.trans._cache;return r(G)?(Y.addKeys(G),(nt=tt==="delete"||G.length===J.length?Rr(G,nt):null)||X.addKeys(G),(nt||J)&&(R=P,T=nt,B=J,v.indexes.forEach(function(Z){var st=R(Z.name||"");function ht(mt){return mt!=null?Z.extractKey(mt):null}function gt(mt){return Z.multiEntry&&r(mt)?mt.forEach(function(re){return st.addKey(re)}):st.addKey(mt)}(T||B).forEach(function(mt,Xt){var ut=T&&ht(T[Xt]),Xt=B&&ht(B[Xt]);xt(ut,Xt)!==0&&(ut!=null&&gt(ut),Xt!=null&&gt(Xt))})}))):G?(J={from:(J=G.lower)!==null&&J!==void 0?J:l.MIN_KEY,to:(J=G.upper)!==null&&J!==void 0?J:l.MAX_KEY},X.add(J),Y.add(J)):(Y.add(f),X.add(f),v.indexes.forEach(function(Z){return P(Z.name).add(f)})),b.mutate(M).then(function(Z){return!G||M.type!=="add"&&M.type!=="put"||(Y.addKeys(Z.results),$&&$.forEach(function(st){for(var ht=M.values.map(function(ut){return st.extractKey(ut)}),gt=st.keyPath.findIndex(function(ut){return ut===k.keyPath}),mt=0,re=Z.results.length;mt<re;++mt)ht[mt][gt]=Z.results[mt];P(st.name).addKeys(ht)})),z.mutatedParts=as(z.mutatedParts||{},H),Z})}}),D=function(P){var R=P.query,P=R.index,R=R.range;return[P,new Kt((P=R.lower)!==null&&P!==void 0?P:l.MIN_KEY,(R=R.upper)!==null&&R!==void 0?R:l.MAX_KEY)]},L={get:function(M){return[k,new Kt(M.key)]},getMany:function(M){return[k,new Kt().addKeys(M.keys)]},count:D,query:D,openCursor:D};return a(L).forEach(function(M){F[M]=function(P){var R=rt.subscr,T=!!R,B=Lr(rt,b)&&Br(M,P)?P.obsSet={}:R;if(T){var z=function(J){return J="idb://".concat(d,"/").concat(m,"/").concat(J),B[J]||(B[J]=new Kt)},H=z(""),Y=z(":dels"),R=L[M](P),T=R[0],R=R[1];if((M==="query"&&T.isPrimaryKey&&!P.values?Y:z(T.name||"")).add(R),!T.isPrimaryKey){if(M!=="count"){var X=M==="query"&&E&&P.values&&b.query(i(i({},P),{values:!1}));return b[M].apply(this,arguments).then(function(J){if(M==="query"){if(E&&P.values)return X.then(function(ht){return ht=ht.result,H.addKeys(ht),J});var nt=P.values?J.result.map(_):J.result;(P.values?H:Y).addKeys(nt)}else if(M==="openCursor"){var Z=J,st=P.values;return Z&&Object.create(Z,{key:{get:function(){return Y.addKey(Z.primaryKey),Z.key}},primaryKey:{get:function(){var ht=Z.primaryKey;return Y.addKey(ht),ht}},value:{get:function(){return st&&H.addKey(Z.primaryKey),Z.value}}})}return J})}Y.add(f)}}return b[M].apply(this,arguments)}}),F}})}};function Nr(l,d,f){if(f.numFailures===0)return d;if(d.type==="deleteRange")return null;var m=d.keys?d.keys.length:"values"in d&&d.values?d.values.length:1;return f.numFailures===m?null:(d=i({},d),r(d.keys)&&(d.keys=d.keys.filter(function(b,v){return!(v in f.failures)})),"values"in d&&r(d.values)&&(d.values=d.values.filter(function(b,v){return!(v in f.failures)})),d)}function Ro(l,d){return f=l,((m=d).lower===void 0||(m.lowerOpen?0<xt(f,m.lower):0<=xt(f,m.lower)))&&(l=l,(d=d).upper===void 0||(d.upperOpen?xt(l,d.upper)<0:xt(l,d.upper)<=0));var f,m}function zr(l,d,L,m,b,v){if(!L||L.length===0)return l;var k=d.query.index,_=k.multiEntry,E=d.query.range,$=m.schema.primaryKey.extractKey,F=k.extractKey,D=(k.lowLevelIndex||k).extractKey,L=L.reduce(function(M,P){var R=M,T=[];if(P.type==="add"||P.type==="put")for(var B=new Kt,z=P.values.length-1;0<=z;--z){var H,Y=P.values[z],X=$(Y);B.hasKey(X)||(H=F(Y),(_&&r(H)?H.some(function(Z){return Ro(Z,E)}):Ro(H,E))&&(B.addKey(X),T.push(Y)))}switch(P.type){case"add":var tt=new Kt().addKeys(d.values?M.map(function(st){return $(st)}):M),R=M.concat(d.values?T.filter(function(st){return st=$(st),!tt.hasKey(st)&&(tt.addKey(st),!0)}):T.map(function(st){return $(st)}).filter(function(st){return!tt.hasKey(st)&&(tt.addKey(st),!0)}));break;case"put":var G=new Kt().addKeys(P.values.map(function(st){return $(st)}));R=M.filter(function(st){return!G.hasKey(d.values?$(st):st)}).concat(d.values?T:T.map(function(st){return $(st)}));break;case"delete":var J=new Kt().addKeys(P.keys);R=M.filter(function(st){return!J.hasKey(d.values?$(st):st)});break;case"deleteRange":var nt=P.range;R=M.filter(function(st){return!Ro($(st),nt)})}return R},l);return L===l?l:(L.sort(function(M,P){return xt(D(M),D(P))||xt($(M),$(P))}),d.limit&&d.limit<1/0&&(L.length>d.limit?L.length=d.limit:l.length===d.limit&&L.length<d.limit&&(b.dirty=!0)),v?Object.freeze(L):L)}function Hr(l,d){return xt(l.lower,d.lower)===0&&xt(l.upper,d.upper)===0&&!!l.lowerOpen==!!d.lowerOpen&&!!l.upperOpen==!!d.upperOpen}function pu(l,d){return function(f,m,b,v){if(f===void 0)return m!==void 0?-1:0;if(m===void 0)return 1;if((m=xt(f,m))===0){if(b&&v)return 0;if(b)return 1;if(v)return-1}return m}(l.lower,d.lower,l.lowerOpen,d.lowerOpen)<=0&&0<=function(f,m,b,v){if(f===void 0)return m!==void 0?1:0;if(m===void 0)return-1;if((m=xt(f,m))===0){if(b&&v)return 0;if(b)return-1;if(v)return 1}return m}(l.upper,d.upper,l.upperOpen,d.upperOpen)}function gu(l,d,f,m){l.subscribers.add(f),m.addEventListener("abort",function(){var b,v;l.subscribers.delete(f),l.subscribers.size===0&&(b=l,v=d,setTimeout(function(){b.subscribers.size===0&&kt(v,b)},3e3))})}var mu={stack:"dbcore",level:0,name:"Cache",create:function(l){var d=l.schema.name;return i(i({},l),{transaction:function(f,m,b){var v,k,_=l.transaction(f,m,b);return m==="readwrite"&&(k=(v=new AbortController).signal,b=function(E){return function(){if(v.abort(),m==="readwrite"){for(var $=new Set,F=0,D=f;F<D.length;F++){var L=D[F],M=cn["idb://".concat(d,"/").concat(L)];if(M){var P=l.table(L),R=M.optimisticOps.filter(function(st){return st.trans===_});if(_._explicit&&E&&_.mutatedParts)for(var T=0,B=Object.values(M.queries.query);T<B.length;T++)for(var z=0,H=(tt=B[T]).slice();z<H.length;z++)$o((G=H[z]).obsSet,_.mutatedParts)&&(kt(tt,G),G.subscribers.forEach(function(st){return $.add(st)}));else if(0<R.length){M.optimisticOps=M.optimisticOps.filter(function(st){return st.trans!==_});for(var Y=0,X=Object.values(M.queries.query);Y<X.length;Y++)for(var tt,G,J,nt=0,Z=(tt=X[Y]).slice();nt<Z.length;nt++)(G=Z[nt]).res!=null&&_.mutatedParts&&(E&&!G.dirty?(J=Object.isFrozen(G.res),J=zr(G.res,G.req,R,P,G,J),G.dirty?(kt(tt,G),G.subscribers.forEach(function(st){return $.add(st)})):J!==G.res&&(G.res=J,G.promise=it.resolve({result:J}))):(G.dirty&&kt(tt,G),G.subscribers.forEach(function(st){return $.add(st)})))}}}$.forEach(function(st){return st()})}}},_.addEventListener("abort",b(!1),{signal:k}),_.addEventListener("error",b(!1),{signal:k}),_.addEventListener("complete",b(!0),{signal:k})),_},table:function(f){var m=l.table(f),b=m.schema.primaryKey;return i(i({},m),{mutate:function(v){var k=rt.trans;if(b.outbound||k.db._options.cache==="disabled"||k.explicit||k.idbtrans.mode!=="readwrite")return m.mutate(v);var _=cn["idb://".concat(d,"/").concat(f)];return _?(k=m.mutate(v),v.type!=="add"&&v.type!=="put"||!(50<=v.values.length||Io(b,v).some(function(E){return E==null}))?(_.optimisticOps.push(v),v.mutatedParts&&rs(v.mutatedParts),k.then(function(E){0<E.numFailures&&(kt(_.optimisticOps,v),(E=Nr(0,v,E))&&_.optimisticOps.push(E),v.mutatedParts&&rs(v.mutatedParts))}),k.catch(function(){kt(_.optimisticOps,v),v.mutatedParts&&rs(v.mutatedParts)})):k.then(function(E){var $=Nr(0,i(i({},v),{values:v.values.map(function(F,D){var L;return E.failures[D]?F:(F=(L=b.keyPath)!==null&&L!==void 0&&L.includes(".")?dt(F):i({},F),V(F,b.keyPath,E.results[D]),F)})}),E);_.optimisticOps.push($),queueMicrotask(function(){return v.mutatedParts&&rs(v.mutatedParts)})}),k):m.mutate(v)},query:function(v){if(!Lr(rt,m)||!Br("query",v))return m.query(v);var k=(($=rt.trans)===null||$===void 0?void 0:$.db._options.cache)==="immutable",D=rt,_=D.requery,E=D.signal,$=function(P,R,T,B){var z=cn["idb://".concat(P,"/").concat(R)];if(!z)return[];if(!(R=z.queries[T]))return[null,!1,z,null];var H=R[(B.query?B.query.index.name:null)||""];if(!H)return[null,!1,z,null];switch(T){case"query":var Y=H.find(function(X){return X.req.limit===B.limit&&X.req.values===B.values&&Hr(X.req.query.range,B.query.range)});return Y?[Y,!0,z,H]:[H.find(function(X){return("limit"in X.req?X.req.limit:1/0)>=B.limit&&(!B.values||X.req.values)&&pu(X.req.query.range,B.query.range)}),!1,z,H];case"count":return Y=H.find(function(X){return Hr(X.req.query.range,B.query.range)}),[Y,!!Y,z,H]}}(d,f,"query",v),F=$[0],D=$[1],L=$[2],M=$[3];return F&&D?F.obsSet=v.obsSet:(D=m.query(v).then(function(P){var R=P.result;if(F&&(F.res=R),k){for(var T=0,B=R.length;T<B;++T)Object.freeze(R[T]);Object.freeze(R)}else P.result=dt(R);return P}).catch(function(P){return M&&F&&kt(M,F),Promise.reject(P)}),F={obsSet:v.obsSet,promise:D,subscribers:new Set,type:"query",req:v,dirty:!1},M?M.push(F):(M=[F],(L=L||(cn["idb://".concat(d,"/").concat(f)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[v.query.index.name||""]=M)),gu(F,M,_,E),F.promise.then(function(P){return{result:zr(P.result,v,L==null?void 0:L.optimisticOps,m,F,k)}})}})}})}};function cs(l,d){return new Proxy(l,{get:function(f,m,b){return m==="db"?d:Reflect.get(f,m,b)}})}var Me=(Lt.prototype.version=function(l){if(isNaN(l)||l<.1)throw new lt.Type("Given version is not a positive number");if(l=Math.round(10*l)/10,this.idbdb||this._state.isBeingOpened)throw new lt.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,l);var d=this._versions,f=d.filter(function(m){return m._cfg.version===l})[0];return f||(f=new this.Version(l),d.push(f),d.sort(ou),f.stores({}),this._state.autoSchema=!1,f)},Lt.prototype._whenReady=function(l){var d=this;return this.idbdb&&(this._state.openComplete||rt.letThrough||this._vip)?l():new it(function(f,m){if(d._state.openComplete)return m(new lt.DatabaseClosed(d._state.dbOpenError));if(!d._state.isBeingOpened){if(!d._state.autoOpen)return void m(new lt.DatabaseClosed);d.open().catch(Et)}d._state.dbReadyPromise.then(f,m)}).then(l)},Lt.prototype.use=function(l){var d=l.stack,f=l.create,m=l.level,b=l.name;return b&&this.unuse({stack:d,name:b}),l=this._middlewares[d]||(this._middlewares[d]=[]),l.push({stack:d,create:f,level:m??10,name:b}),l.sort(function(v,k){return v.level-k.level}),this},Lt.prototype.unuse=function(l){var d=l.stack,f=l.name,m=l.create;return d&&this._middlewares[d]&&(this._middlewares[d]=this._middlewares[d].filter(function(b){return m?b.create!==m:!!f&&b.name!==f})),this},Lt.prototype.open=function(){var l=this;return an(Le,function(){return cu(l)})},Lt.prototype._close=function(){var l=this._state,d=Tn.indexOf(this);if(0<=d&&Tn.splice(d,1),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}l.isBeingOpened||(l.dbReadyPromise=new it(function(f){l.dbReadyResolve=f}),l.openCanceller=new it(function(f,m){l.cancelOpen=m}))},Lt.prototype.close=function(f){var d=(f===void 0?{disableAutoOpen:!0}:f).disableAutoOpen,f=this._state;d?(f.isBeingOpened&&f.cancelOpen(new lt.DatabaseClosed),this._close(),f.autoOpen=!1,f.dbOpenError=new lt.DatabaseClosed):(this._close(),f.autoOpen=this._options.autoOpen||f.isBeingOpened,f.openComplete=!1,f.dbOpenError=null)},Lt.prototype.delete=function(l){var d=this;l===void 0&&(l={disableAutoOpen:!0});var f=0<arguments.length&&typeof arguments[0]!="object",m=this._state;return new it(function(b,v){function k(){d.close(l);var _=d._deps.indexedDB.deleteDatabase(d.name);_.onsuccess=Pt(function(){var E,$,F;E=d._deps,$=d.name,F=E.indexedDB,E=E.IDBKeyRange,Co(F)||$===Ki||Do(F,E).delete($).catch(Et),b()}),_.onerror=ke(v),_.onblocked=d._fireOnBlocked}if(f)throw new lt.InvalidArgument("Invalid closeOptions argument to db.delete()");m.isBeingOpened?m.dbReadyPromise.then(k):k()})},Lt.prototype.backendDB=function(){return this.idbdb},Lt.prototype.isOpen=function(){return this.idbdb!==null},Lt.prototype.hasBeenClosed=function(){var l=this._state.dbOpenError;return l&&l.name==="DatabaseClosed"},Lt.prototype.hasFailed=function(){return this._state.dbOpenError!==null},Lt.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(Lt.prototype,"tables",{get:function(){var l=this;return a(this._allTables).map(function(d){return l._allTables[d]})},enumerable:!1,configurable:!0}),Lt.prototype.transaction=function(){var l=(function(d,f,m){var b=arguments.length;if(b<2)throw new lt.InvalidArgument("Too few arguments");for(var v=new Array(b-1);--b;)v[b-1]=arguments[b];return m=v.pop(),[d,et(v),m]}).apply(this,arguments);return this._transaction.apply(this,l)},Lt.prototype._transaction=function(l,d,f){var m=this,b=rt.trans;b&&b.db===this&&l.indexOf("!")===-1||(b=null);var v,k,_=l.indexOf("?")!==-1;l=l.replace("!","").replace("?","");try{if(k=d.map(function($){if($=$ instanceof m.Table?$.name:$,typeof $!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return $}),l=="r"||l===fo)v=fo;else{if(l!="rw"&&l!=po)throw new lt.InvalidArgument("Invalid transaction mode: "+l);v=po}if(b){if(b.mode===fo&&v===po){if(!_)throw new lt.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");b=null}b&&k.forEach(function($){if(b&&b.storeNames.indexOf($)===-1){if(!_)throw new lt.SubTransaction("Table "+$+" not included in parent transaction.");b=null}}),_&&b&&!b.active&&(b=null)}}catch($){return b?b._promise(null,function(F,D){D($)}):Rt($)}var E=(function $(F,D,L,M,P){return it.resolve().then(function(){var R=rt.transless||rt,T=F._createTransaction(D,L,F._dbSchema,M);if(T.explicit=!0,R={trans:T,transless:R},M)T.idbtrans=M.idbtrans;else try{T.create(),T.idbtrans._explicit=!0,F._state.PR1398_maxLoop=3}catch(H){return H.name===no.InvalidState&&F.isOpen()&&0<--F._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),F.close({disableAutoOpen:!1}),F.open().then(function(){return $(F,D,L,null,P)})):Rt(H)}var B,z=ye(P);return z&&An(),R=it.follow(function(){var H;(B=P.call(T,T))&&(z?(H=Ne.bind(null,null),B.then(H,H)):typeof B.next=="function"&&typeof B.throw=="function"&&(B=Oo(B)))},R),(B&&typeof B.then=="function"?it.resolve(B).then(function(H){return T.active?H:Rt(new lt.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):R.then(function(){return B})).then(function(H){return M&&T._resolve(),T._completion.then(function(){return H})}).catch(function(H){return T._reject(H),Rt(H)})})}).bind(null,this,v,k,b,f);return b?b._promise(v,E,"lock"):rt.trans?an(rt.transless,function(){return m._whenReady(E)}):this._whenReady(E)},Lt.prototype.table=function(l){if(!p(this._allTables,l))throw new lt.InvalidTable("Table ".concat(l," does not exist"));return this._allTables[l]},Lt);function Lt(l,d){var f=this;this._middlewares={},this.verno=0;var m=Lt.dependencies;this._options=d=i({addons:Lt.addons,autoOpen:!0,indexedDB:m.indexedDB,IDBKeyRange:m.IDBKeyRange,cache:"cloned"},d),this._deps={indexedDB:d.indexedDB,IDBKeyRange:d.IDBKeyRange},m=d.addons,this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this;var b,v,k,_,E,$={dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:Et,dbReadyPromise:null,cancelOpen:Et,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:d.autoOpen};$.dbReadyPromise=new it(function(D){$.dbReadyResolve=D}),$.openCanceller=new it(function(D,L){$.cancelOpen=L}),this._state=$,this.name=l,this.on=Jn(this,"populate","blocked","versionchange","close",{ready:[io,Et]}),this.on.ready.subscribe=j(this.on.ready.subscribe,function(D){return function(L,M){Lt.vip(function(){var P,R=f._state;R.openComplete?(R.dbOpenError||it.resolve().then(L),M&&D(L)):R.onReadyBeingFired?(R.onReadyBeingFired.push(L),M&&D(L)):(D(L),P=f,M||D(function T(){P.on.ready.unsubscribe(L),P.on.ready.unsubscribe(T)}))})}}),this.Collection=(b=this,Qn(Qd.prototype,function(B,T){this.db=b;var M=br,P=null;if(T)try{M=T()}catch(z){P=z}var R=B._ctx,T=R.table,B=T.hook.reading.fire;this._ctx={table:T,index:R.index,isPrimKey:!R.index||T.schema.primKey.keyPath&&R.index===T.schema.primKey.name,range:M,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:P,or:R.or,valueMapper:B!==Yn?B:null}})),this.Table=(v=this,Qn(kr.prototype,function(D,L,M){this.db=v,this._tx=M,this.name=D,this.schema=L,this.hook=v._allTables[D]?v._allTables[D].hook:Jn(null,{creating:[Wd,Et],reading:[jd,Yn],updating:[Ud,Et],deleting:[Vd,Et]})})),this.Transaction=(k=this,Qn(eu.prototype,function(D,L,M,P,R){var T=this;this.db=k,this.mode=D,this.storeNames=L,this.schema=M,this.chromeTransactionDurability=P,this.idbtrans=null,this.on=Jn(this,"complete","error","abort"),this.parent=R||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new it(function(B,z){T._resolve=B,T._reject=z}),this._completion.then(function(){T.active=!1,T.on.complete.fire()},function(B){var z=T.active;return T.active=!1,T.on.error.fire(B),T.parent?T.parent._reject(B):z&&T.idbtrans&&T.idbtrans.abort(),Rt(B)})})),this.Version=(_=this,Qn(lu.prototype,function(D){this.db=_,this._cfg={version:D,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(E=this,Qn(Er.prototype,function(D,L,M){if(this.db=E,this._ctx={table:D,index:L===":id"?null:L,or:M},this._cmp=this._ascending=xt,this._descending=function(P,R){return xt(R,P)},this._max=function(P,R){return 0<xt(P,R)?P:R},this._min=function(P,R){return xt(P,R)<0?P:R},this._IDBKeyRange=E._deps.IDBKeyRange,!this._IDBKeyRange)throw new lt.MissingAPI})),this.on("versionchange",function(D){0<D.newVersion?console.warn("Another connection wants to upgrade database '".concat(f.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(f.name,"'. Closing db now to resume the delete request.")),f.close({disableAutoOpen:!1})}),this.on("blocked",function(D){!D.newVersion||D.newVersion<D.oldVersion?console.warn("Dexie.delete('".concat(f.name,"') was blocked")):console.warn("Upgrade '".concat(f.name,"' blocked by other connection holding version ").concat(D.oldVersion/10))}),this._maxKey=ni(d.IDBKeyRange),this._createTransaction=function(D,L,M,P){return new f.Transaction(D,L,M,f._options.chromeTransactionDurability,P)},this._fireOnBlocked=function(D){f.on("blocked").fire(D),Tn.filter(function(L){return L.name===f.name&&L!==f&&!L._state.vcFired}).map(function(L){return L.on("versionchange").fire(D)})},this.use(hu),this.use(mu),this.use(fu),this.use(du),this.use(uu);var F=new Proxy(this,{get:function(D,L,M){if(L==="_vip")return!0;if(L==="table")return function(R){return cs(f.table(R),F)};var P=Reflect.get(D,L,M);return P instanceof kr?cs(P,F):L==="tables"?P.map(function(R){return cs(R,F)}):L==="_createTransaction"?function(){return cs(P.apply(this,arguments),F)}:P}});this.vip=F,m.forEach(function(D){return D(f)})}var ds,ue=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",yu=(Lo.prototype.subscribe=function(l,d,f){return this._subscribe(l&&typeof l!="function"?l:{next:l,error:d,complete:f})},Lo.prototype[ue]=function(){return this},Lo);function Lo(l){this._subscribe=l}try{ds={indexedDB:o.indexedDB||o.mozIndexedDB||o.webkitIndexedDB||o.msIndexedDB,IDBKeyRange:o.IDBKeyRange||o.webkitIDBKeyRange}}catch{ds={indexedDB:null,IDBKeyRange:null}}function jr(l){var d,f=!1,m=new yu(function(b){var v=ye(l),k,_=!1,E={},$={},F={get closed(){return _},unsubscribe:function(){_||(_=!0,k&&k.abort(),D&&je.storagemutated.unsubscribe(M))}};b.start&&b.start(F);var D=!1,L=function(){return ho(P)},M=function(R){as(E,R),$o($,E)&&L()},P=function(){var R,T,B;!_&&ds.indexedDB&&(E={},R={},k&&k.abort(),k=new AbortController,B=function(z){var H=Mn();try{v&&An();var Y=Be(l,z);return Y=v?Y.finally(Ne):Y}finally{H&&$n()}}(T={subscr:R,signal:k.signal,requery:L,querier:l,trans:null}),Promise.resolve(B).then(function(z){f=!0,d=z,_||T.signal.aborted||(E={},function(H){for(var Y in H)if(p(H,Y))return;return 1}($=R)||D||(je(ei,M),D=!0),ho(function(){return!_&&b.next&&b.next(z)}))},function(z){f=!1,["DatabaseClosedError","AbortError"].includes(z==null?void 0:z.name)||_||ho(function(){_||b.error&&b.error(z)})}))};return setTimeout(L,0),F});return m.hasValue=function(){return f},m.getValue=function(){return d},m}var dn=Me;function Bo(l){var d=We;try{We=!0,je.storagemutated.fire(l),Po(l,!0)}finally{We=d}}y(dn,i(i({},Ni),{delete:function(l){return new dn(l,{addons:[]}).delete()},exists:function(l){return new dn(l,{addons:[]}).open().then(function(d){return d.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(l){try{return d=dn.dependencies,f=d.indexedDB,d=d.IDBKeyRange,(Co(f)?Promise.resolve(f.databases()).then(function(m){return m.map(function(b){return b.name}).filter(function(b){return b!==Ki})}):Do(f,d).toCollection().primaryKeys()).then(l)}catch{return Rt(new lt.MissingAPI)}var d,f},defineClass:function(){return function(l){c(this,l)}},ignoreTransaction:function(l){return rt.trans?an(rt.transless,l):l()},vip:Eo,async:function(l){return function(){try{var d=Oo(l.apply(this,arguments));return d&&typeof d.then=="function"?d:it.resolve(d)}catch(f){return Rt(f)}}},spawn:function(l,d,f){try{var m=Oo(l.apply(f,d||[]));return m&&typeof m.then=="function"?m:it.resolve(m)}catch(b){return Rt(b)}},currentTransaction:{get:function(){return rt.trans||null}},waitFor:function(l,d){return d=it.resolve(typeof l=="function"?dn.ignoreTransaction(l):l).timeout(d||6e4),rt.trans?rt.trans.waitFor(d):d},Promise:it,debug:{get:function(){return we},set:function(l){ur(l)}},derive:w,extend:c,props:y,override:j,Events:Jn,on:je,liveQuery:jr,extendObservabilitySet:as,getByKeyPath:I,setByKeyPath:V,delByKeyPath:function(l,d){typeof d=="string"?V(l,d,void 0):"length"in d&&[].map.call(d,function(f){V(l,f,void 0)})},shallowClone:U,deepClone:dt,getObjectDiff:Fo,cmp:xt,asap:C,minKey:-1/0,addons:[],connections:Tn,errnames:no,dependencies:ds,cache:cn,semVer:"4.0.11",version:"4.0.11".split(".").map(function(l){return parseInt(l)}).reduce(function(l,d,f){return l+d/Math.pow(10,2*f)})})),dn.maxKey=ni(dn.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(je(ei,function(l){We||(l=new CustomEvent(bo,{detail:l}),We=!0,dispatchEvent(l),We=!1)}),addEventListener(bo,function(l){l=l.detail,We||Bo(l)}));var Fn,We=!1,Wr=function(){};return typeof BroadcastChannel<"u"&&((Wr=function(){(Fn=new BroadcastChannel(bo)).onmessage=function(l){return l.data&&Bo(l.data)}})(),typeof Fn.unref=="function"&&Fn.unref(),je(ei,function(l){We||Fn.postMessage(l)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(l){if(!Me.disableBfCache&&l.persisted){we&&console.debug("Dexie: handling persisted pagehide"),Fn!=null&&Fn.close();for(var d=0,f=Tn;d<f.length;d++)f[d].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(l){!Me.disableBfCache&&l.persisted&&(we&&console.debug("Dexie: handling persisted pageshow"),Wr(),Bo({all:new Kt(-1/0,[[]])}))})),it.rejectionMapper=function(l,d){return!l||l instanceof qt||l instanceof TypeError||l instanceof SyntaxError||!l.name||!dr[l.name]?l:(d=new dr[l.name](d||l.message,l),"stack"in l&&x(d,"stack",{get:function(){return this.inner.stack}}),d)},ur(we),i(Me,Object.freeze({__proto__:null,Dexie:Me,liveQuery:jr,Entity:vr,cmp:xt,PropModification:Zn,replacePrefix:function(l,d){return new Zn({replacePrefix:[l,d]})},add:function(l){return new Zn({add:l})},remove:function(l){return new Zn({remove:l})},default:Me,RangeSet:Kt,mergeRanges:oi,rangesOverlap:Pr}),{default:Me}),Me})}(Ms)),Ms.exports}var Yu=Uu();const sa=Wu(Yu),el=Symbol.for("Dexie"),Ns=globalThis[el]||(globalThis[el]=sa);if(sa.semVer!==Ns.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${sa.semVer} and ${Ns.semVer}`);const{liveQuery:Iy,mergeRanges:Ry,rangesOverlap:Ly,RangeSet:By,cmp:Ny,Entity:zy,PropModification:Hy,replacePrefix:jy,add:Wy,remove:Vy}=Ns,qu={id:1,hourlyRate:10,currency:"USD",showTips:!0,weeklyBudget:200,monthlyBudget:800,reminderTime:"19:00",theme:"system",defaultView:"week",enableDailyReminder:!0,weeklySummaryDay:"sunday",enableWeeklySummary:!1},nl=["Food","Transport","Entertainment","Shopping","Bills","Health","Other"],il=["Housing","Utilities","Subscriptions","Insurance","Loans","Memberships","Other"],sl=["Monthly","Quarterly","Yearly"],Bn=["#007aff","#34c759","#ff9500","#ff3b30","#5856d6","#ff2d55","#a2845e"],Ku=["Minimum","Custom","Full"],Xu={1:()=>{},4:async n=>{const t=await n.creditCards.toArray();for(const e of t)await n.creditCards.update(e.id,{reminderEnabled:!1,reminderDays:3,lastReminderSent:null});console.log("Migration to version 4 completed")},5:async n=>{const t=[{date:new Date(Date.now()-864e5).toISOString().split("T")[0],hours:8,rate:10,notes:"Regular shift",createdAt:new Date},{date:new Date(Date.now()-2592e5).toISOString().split("T")[0],hours:6,rate:10,notes:"Short shift",createdAt:new Date},{date:new Date(Date.now()-6048e5).toISOString().split("T")[0],hours:9,rate:10,notes:"Overtime shift",createdAt:new Date}],e=[{date:new Date(Date.now()-2*24*60*60*1e3).toISOString().split("T")[0],amount:80,description:"Payment for Monday shift",method:"cash",notes:"Weekly payment",createdAt:new Date},{date:new Date(Date.now()-9*24*60*60*1e3).toISOString().split("T")[0],amount:150,description:"Payment for last week",method:"bank",notes:"Direct deposit",createdAt:new Date}],i=[{date:new Date(Date.now()-1*24*60*60*1e3).toISOString().split("T")[0],amount:12.5,category:"Food",name:"Lunch",notes:"Sandwich and coffee",paymentMethod:"cash",isRecurring:!1,createdAt:new Date},{date:new Date(Date.now()-4*24*60*60*1e3).toISOString().split("T")[0],amount:35,category:"Transport",name:"Gas",notes:"Filled up the car",paymentMethod:"card-1",isRecurring:!1,createdAt:new Date},{date:new Date(Date.now()-6*24*60*60*1e3).toISOString().split("T")[0],amount:15.99,category:"Entertainment",name:"Movie ticket",notes:"Weekend movie",paymentMethod:"cash",isRecurring:!1,createdAt:new Date}];new Date(Date.now()+5*24*60*60*1e3).toISOString().split("T")[0],new Date(Date.now()-2*24*60*60*1e3).toISOString().split("T")[0];const s={name:"Main Credit Card",lastFourDigits:"1234",limit:2e3,currentBalance:450,dueDate:new Date(Date.now()+10*24*60*60*1e3).toISOString().split("T")[0],minimumPayment:25,apr:18.99,color:"#007aff",isActive:!0,reminderEnabled:!0,reminderDays:3,lastReminderSent:null},o={cardId:1,amount:50,date:new Date(Date.now()-15*24*60*60*1e3).toISOString().split("T")[0],type:"Custom",notes:"Monthly payment",createdAt:new Date};try{for(const r of t)await n.hours.add(r);for(const r of e)await n.payments.add(r);for(const r of i)await n.expenses.add(r);const a=await n.creditCards.add(s);o.cardId=a,await n.creditCardPayments.add(o),console.log("Migration to version 5 completed - Sample data added")}catch(a){console.error("Error adding sample data:",a)}}},at=new Ns("HourHaloDB");at.version(1).stores({weeks:"++id, totalHours, totalEarnings, totalTips",expenses:"++id, weekId, amount, category, date, createdAt",settings:"id"});at.version(2).stores({expenses:"++id, weekId, monthId, amount, category, date, name, notes, paymentMethod, isRecurring, createdAt"});at.version(3).stores({creditCards:"++id, name, lastFourDigits, limit, currentBalance, dueDate, minimumPayment, apr, color, isActive",fixedExpenses:"++id, name, amount, category, dueDate, recurrenceFrequency, isPaid, isActive, createdAt"});at.version(4).stores({creditCards:"++id, name, lastFourDigits, limit, currentBalance, dueDate, minimumPayment, apr, color, isActive, reminderEnabled, reminderDays, lastReminderSent",creditCardPayments:"++id, cardId, amount, date, type, notes, createdAt"});at.version(5).stores({hours:"++id, date, hours, rate, notes, createdAt",payments:"++id, date, amount, description, method, notes, createdAt"});Object.entries(Xu).forEach(([n,t])=>{at.version(parseInt(n)).upgrade(t)});async function Lc(){await at.settings.count()===0&&(await at.settings.add(qu),console.log("Database initialized with default settings"))}function Xs(){const n=new Date,t=n.getDay(),e=t===0?6:t-1,i=new Date(n);i.setDate(n.getDate()-e);const s=i.getFullYear(),o=String(i.getMonth()+1).padStart(2,"0"),a=String(i.getDate()).padStart(2,"0");return console.log(`Current date: ${n.toISOString().split("T")[0]}, Current day: ${t}, Monday date: ${s}-${o}-${a}`),`${s}-${o}-${a}`}async function Va(n=Xs()){const t=await at.weeks.get(n);if(!t){const e={id:n,days:{mon:{hours:0,tips:0},tue:{hours:0,tips:0},wed:{hours:0,tips:0},thu:{hours:0,tips:0},fri:{hours:0,tips:0},sat:{hours:0,tips:0},sun:{hours:0,tips:0}},notes:"",totalHours:0,totalTips:0,totalEarnings:0,createdAt:new Date};return await at.weeks.add(e),e}return t}const ol=Object.freeze(Object.defineProperty({__proto__:null,createWeek:Va,default:at,getCurrentWeekId:Xs,initializeDatabase:Lc},Symbol.toStringTag,{value:"Module"})),Bc="hour-halo-";function Gu(n,t){try{const e=JSON.stringify(t);return localStorage.setItem(`${Bc}${n}`,e),!0}catch(e){return console.error("Error saving to localStorage:",e),!1}}function Ju(n,t=null){try{const e=localStorage.getItem(`${Bc}${n}`);return e===null?t:JSON.parse(e)}catch(e){return console.error("Error loading from localStorage:",e),t}}function Qu(){return Ju("has-launched",!1)===!1}function Zu(){Gu("has-launched",!0)}function pt(n,t="USD"){return new Intl.NumberFormat("en-US",{style:"currency",currency:t}).format(n)}function oa(n){const t=n.split("-"),e=parseInt(t[0],10),i=parseInt(t[1],10)-1,s=parseInt(t[2],10),o=new Date(e,i,s),a=new Date(e,i,s+6),r=o.toLocaleString("en-US",{month:"short"}),c=a.toLocaleString("en-US",{month:"short"}),u=o.getDate(),h=a.getDate();return console.log(`Week range: ${r} ${u} - ${c} ${h} (${o.toDateString()} to ${a.toDateString()})`),r===c?`${r} ${u} - ${h}`:`${r} ${u} - ${c} ${h}`}function th(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}function Nc(n){const t=n==="dark"||n==="system"&&th();t?(document.documentElement.classList.add("dark"),document.documentElement.style.colorScheme="dark"):(document.documentElement.classList.remove("dark"),document.documentElement.style.colorScheme="light"),console.log(`Applied theme: ${n} (isDark: ${t})`)}function eh(n,t=!1){const e=new Date(n),i=e.getFullYear(),s=e.getMonth(),o=new Intl.DateTimeFormat("en-US",{month:"long"}).format(e);if(!t)return`${o} ${i}`;const a=new Date(i,s,1),r=new Date(i,s+1,0);return`${o} ${a.getDate()} - ${r.getDate()}, ${i}`}async function nh(){try{const n=await at.settings.get(1);return n?(n.hourlyRate=10,await at.settings.update(1,n),console.log("Hourly rate updated to $10.00/hr"),!0):!1}catch(n){return console.error("Error updating hourly rate:",n),!1}}async function ih(){try{const n=await at.settings.get(1);return console.log("Current theme setting:",n.theme),await at.settings.update(1,{theme:"light"}),console.log("Theme set to light mode"),document.documentElement.classList.remove("dark"),document.documentElement.style.colorScheme="light",!0}catch(n){return console.error("Error forcing light mode:",n),!1}}function ie(n,t="success",e=3e3){let i=document.getElementById("toast-container");i||(i=document.createElement("div"),i.id="toast-container",i.style.position="fixed",i.style.bottom="80px",i.style.left="0",i.style.right="0",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.zIndex="9999",i.style.pointerEvents="none",document.body.appendChild(i));const s=document.createElement("div");s.className="ios-toast",s.style.backgroundColor=t==="success"?"rgba(52, 199, 89, 0.9)":t==="error"?"rgba(255, 59, 48, 0.9)":"rgba(0, 122, 255, 0.9)",s.style.color="white",s.style.padding="10px 16px",s.style.borderRadius="8px",s.style.margin="8px",s.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)",s.style.backdropFilter="blur(10px)",s.style.maxWidth="90%",s.style.textAlign="center",s.style.fontWeight="500",s.style.fontSize="14px",s.style.transform="translateY(20px)",s.style.opacity="0",s.style.transition="transform 0.3s ease, opacity 0.3s ease",s.textContent=n,i.appendChild(s),setTimeout(()=>{s.style.transform="translateY(0)",s.style.opacity="1"},10),setTimeout(()=>{s.style.transform="translateY(20px)",s.style.opacity="0",setTimeout(()=>{i.contains(s)&&i.removeChild(s),i.children.length===0&&document.body.removeChild(i)},300)},e)}class aa extends Nt{constructor(){super(),this.open=!1,this.title="",this.message="",this.cancelText="Cancel",this.confirmText="OK",this.destructive=!1,this.forceLightMode=!0,this.isDarkMode=!1}connectedCallback(){super.connectedCallback(),this.checkDarkMode()}checkDarkMode(){if(this.forceLightMode){this.isDarkMode=!1;return}const t=document.documentElement.classList.contains("dark"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.isDarkMode=t||e}show(){this.checkDarkMode(),this.open=!0}hide(){this.open=!1}handleCancel(){this.hide(),this.dispatchEvent(new CustomEvent("alert-cancel",{bubbles:!0,composed:!0}))}handleConfirm(){this.hide(),this.dispatchEvent(new CustomEvent("alert-confirm",{bubbles:!0,composed:!0}))}render(){if(!this.open)return W``;const t=this.isDarkMode&&!this.forceLightMode?"dark-mode":"";return W`
      <div class="ios-alert-backdrop">
        <div class="ios-alert-content ${t}">
          <div class="ios-alert-header">
            <h3 class="ios-alert-title">${this.title}</h3>
            ${this.message?W`<p class="ios-alert-message">${this.message}</p>`:""}
          </div>
          <div class="ios-alert-buttons">
            ${this.cancelText?W`
              <button class="ios-alert-button cancel" @click=${this.handleCancel}>
                ${this.cancelText}
              </button>
            `:""}
            <button
              class="ios-alert-button ${this.destructive?"destructive":""}"
              @click=${this.handleConfirm}
            >
              ${this.confirmText}
            </button>
          </div>
        </div>
      </div>
    `}}q(aa,"properties",{open:{type:Boolean,reflect:!0},title:{type:String},message:{type:String},cancelText:{type:String},confirmText:{type:String},destructive:{type:Boolean},forceLightMode:{type:Boolean}}),q(aa,"styles",Yt`
    :host {
      display: block;
    }

    /* iOS-style alert backdrop */
    .ios-alert-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ios-fade-in 0.2s ease-out;
    }

    /* iOS-style alert content - Light Mode (default) */
    .ios-alert-content {
      background-color: #ffffff;
      border-radius: 14px;
      width: 270px;
      max-width: 90%;
      overflow: hidden;
      animation: ios-scale-in 0.2s ease-out;
      box-shadow: 0 4px 23px rgba(0, 0, 0, 0.2);
    }

    /* iOS-style alert header */
    .ios-alert-header {
      padding: 18px 16px 0px;
      text-align: center;
    }

    /* iOS-style alert title - Light Mode */
    .ios-alert-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style alert message - Light Mode */
    .ios-alert-message {
      font-size: 13px;
      color: #666666;
      margin: 8px 0 0;
      padding: 0;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style alert buttons container - Light Mode */
    .ios-alert-buttons {
      display: flex;
      flex-direction: column;
      margin-top: 18px;
      border-top: 1px solid rgba(60, 60, 67, 0.2);
    }

    /* iOS-style alert button - Light Mode */
    .ios-alert-button {
      padding: 12px;
      font-size: 17px;
      font-weight: 500;
      text-align: center;
      background: none;
      border: none;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #007aff;
      border-bottom: 1px solid rgba(60, 60, 67, 0.2);
    }

    .ios-alert-button:last-child {
      border-bottom: none;
    }

    .ios-alert-button.destructive {
      color: #ff3b30;
      font-weight: 600;
    }

    .ios-alert-button.cancel {
      font-weight: 600;
    }

    .ios-alert-button:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    /* Dark mode styles */
    .dark-mode .ios-alert-content {
      background-color: #1c1c1e;
    }

    .dark-mode .ios-alert-title {
      color: #ffffff;
    }

    .dark-mode .ios-alert-message {
      color: #98989f;
    }

    .dark-mode .ios-alert-buttons {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    .dark-mode .ios-alert-button {
      color: #0a84ff;
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .dark-mode .ios-alert-button.destructive {
      color: #ff453a;
    }

    .dark-mode .ios-alert-button:active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* iOS-style animations */
    @keyframes ios-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ios-scale-in {
      from { transform: scale(1.2); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `);customElements.define("ios-alert",aa);class ra extends Nt{constructor(){super(),this.day="",this.date="",this.hours=0,this.tips=0,this.hourlyRate=10,this.showTips=!0,this.currency="USD",this.editable=!0}get earnings(){return this.hours*this.hourlyRate}get totalEarnings(){return this.earnings+this.tips}get formattedDay(){return this.day.substring(0,3)}handleClick(){this.editable&&this.dispatchEvent(new CustomEvent("edit-hours",{detail:{day:this.day,date:this.date,hours:this.hours,tips:this.tips},bubbles:!0,composed:!0}))}render(){return W`
      <div
        class="hour-pill ${this.hours>0?"bg-blue-100 dark:bg-blue-900":"bg-gray-100 dark:bg-gray-800"}"
        @click=${this.handleClick}
      >
        <div class="flex items-center">
          <span class="font-bold">${this.formattedDay}</span>
          <span class="ml-2 text-xs opacity-70">${this.date}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="font-medium">${this.hours}h</span>
          ${this.showTips&&this.tips>0?W`
            <span class="text-xs text-green-600 dark:text-green-400">
              +${pt(this.tips,this.currency)}
            </span>
          `:""}
        </div>
      </div>
    `}}q(ra,"properties",{day:{type:String},date:{type:String},hours:{type:Number},tips:{type:Number},hourlyRate:{type:Number},showTips:{type:Boolean},currency:{type:String},editable:{type:Boolean}}),q(ra,"styles",Yt`
    :host {
      display: block;
    }
  `);customElements.define("hour-pill",ra);class la extends Nt{constructor(){super(),this.open=!1,this.title="",this.hideClose=!1}show(){this.open=!0}hide(){this.open=!1,this.dispatchEvent(new CustomEvent("modal-close",{bubbles:!0,composed:!0,detail:{closed:!0}}))}handleBackdropClick(t){t.target===t.currentTarget&&this.hide()}handleKeyDown(t){t.key==="Escape"&&this.hide()}updated(t){t.has("open")&&(this.open?(document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.body.style.overflow="hidden"):(document.removeEventListener("keydown",this.handleKeyDown.bind(this)),document.body.style.overflow=""))}render(){return this.open?W`
      <div class="ios-modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="ios-modal-content">

          <div class="ios-modal-header">
            <h3 class="ios-modal-title">${this.title}</h3>
            ${this.hideClose?"":W`
              <div class="ios-modal-close">
                <button
                  style="color: var(--ios-blue); background: none; border: none; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"
                  @click=${this.hide}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            `}
          </div>
          <div class="ios-modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `:W``}}q(la,"properties",{open:{type:Boolean,reflect:!0},title:{type:String},hideClose:{type:Boolean}}),q(la,"styles",Yt`
    :host {
      display: block;
    }

    /* iOS-style modal backdrop */
    .ios-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ios-fade-in 0.2s ease-out;
    }

    /* iOS-style modal content */
    .ios-modal-content {
      background-color: #ffffff;
      border-radius: 14px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: ios-slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15);
      margin: 0 16px;
    }

    /* iOS-style modal header */
    .ios-modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 16px 10px;
      position: relative;
      border-bottom: 1px solid rgba(60, 60, 67, 0.1);
    }

    /* iOS-style modal title */
    .ios-modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.01em;
    }

    /* iOS-style close button container */
    .ios-modal-close {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    /* iOS-style modal body */
    .ios-modal-body {
      padding: 0;
      background-color: white;
      overflow: hidden;
    }

    /* iOS-style modal footer */
    .ios-modal-footer {
      padding: 16px;
      display: flex !important;
      justify-content: space-between;
      width: 100%;
    }

    /* iOS-style animations */
    @keyframes ios-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ios-slide-up {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* We're forcing light mode for modals regardless of system theme */
    /* This ensures modals always use light mode styling */
  `);customElements.define("modal-dialog",la);class ca extends Nt{constructor(){super(),this.open=!1,this.isSaving=!1}handleCancel(){this.dispatchEvent(new CustomEvent("modal-cancel",{bubbles:!0,composed:!0}))}handleSave(){this.dispatchEvent(new CustomEvent("modal-save",{bubbles:!0,composed:!0}))}render(){return W`
      <button
        class="cancel-button"
        @click=${this.handleCancel}
        ?disabled=${this.isSaving}
      >
        Cancel
      </button>
      <button
        class="save-button"
        @click=${this.handleSave}
        ?disabled=${this.isSaving}
      >
        ${this.isSaving?W`
          <span class="spinner"></span>
          Saving...
        `:"Save"}
      </button>
    `}}q(ca,"properties",{open:{type:Boolean,reflect:!0},isSaving:{type:Boolean}}),q(ca,"styles",Yt`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      background-color: rgba(249, 249, 249, 0.94);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      transform: translateY(100%);
      transition: transform 0.3s ease-out;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.05);
      padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
    }

    :host([open]) {
      transform: translateY(0);
    }

    button {
      font-weight: 500;
      font-size: 17px;
      padding: 12px 20px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      transition: background-color 0.15s;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.01em;
    }

    button:active {
      background-color: rgba(0, 122, 255, 0.1);
    }

    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .cancel-button {
      color: #8e8e93;
      font-weight: 500;
    }

    .save-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--ios-blue, #007aff);
      background-color: rgba(0, 122, 255, 0.1);
      min-width: 100px;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: var(--ios-blue, #007aff);
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* We're forcing light mode for modals regardless of system theme */
    /* This ensures modal buttons always use light mode styling */
  `);customElements.define("modal-buttons",ca);class da extends Nt{constructor(){super(),this.weekId=Xs(),this.week=null,this.settings=null,this.editingDay="",this.editingDate="",this.editingDayKey="",this.editingHours=0,this.editingTips=0,this.isSaving=!1,this.isModalOpen=!1,this.initialLoad=!0;const e=new URLSearchParams(window.location.search).get("week");e&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&(this.weekId=e)}async connectedCallback(){super.connectedCallback(),this.settings=await at.settings.get(1),await this.loadWeek(),this.unsubscribe=at.weeks.hook("updating",(t,e,i)=>{e===this.weekId&&(console.log("Week data updated in database:",i),this.week={...i},this.requestUpdate())}),this.unsubscribeUpdated=at.weeks.hook("updated",(t,e)=>{t===this.weekId&&(console.log("Week data committed to database:",e),this.week={...e},this.requestUpdate())}),this.addEventListener("modal-close",()=>{this.isModalOpen=!1})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe&&this.unsubscribe(),this.unsubscribeUpdated&&this.unsubscribeUpdated()}async loadWeek(){let t=await at.weeks.get(this.weekId);t||(t=await Va(this.weekId)),t.days||(t.days={mon:{hours:0,tips:0},tue:{hours:0,tips:0},wed:{hours:0,tips:0},thu:{hours:0,tips:0},fri:{hours:0,tips:0},sat:{hours:0,tips:0},sun:{hours:0,tips:0}},await at.weeks.update(this.weekId,t)),this.week=t;const e=new URL(window.location);e.searchParams.set("week",this.weekId),window.history.pushState({},"",e),this.initialLoad?this.initialLoad=!1:ie(`Viewing week of ${oa(this.weekId)}`,"info"),console.log("Loaded week:",JSON.stringify(t))}get totalEarnings(){return this.week?this.week.totalHours*this.settings.hourlyRate+(this.settings.showTips?this.week.totalTips:0):0}handleEditHours(t){const{day:e,date:i,dayKey:s,hours:o,tips:a}=t.detail;console.log("Editing day:",e,"date:",i,"dayKey:",s,"hours:",o,"tips:",a),this.editingDay=e,this.editingDate=i,this.editingDayKey=s,this.editingHours=o,this.editingTips=a,this.isModalOpen=!0,this.shadowRoot.querySelector("modal-dialog").show()}async handleSaveHours(){if(this.week){this.isSaving=!0;try{const t=this.editingDayKey;if(console.log("Saving day:",this.editingDay,"date:",this.editingDate,"dayKey:",t,"hours:",this.editingHours,"tips:",this.editingTips),console.log("Current week data:",JSON.stringify(this.week)),!t)throw console.error("Invalid day key:",t),new Error("Invalid day key");const e={...this.week};e.days||(e.days={mon:{hours:0,tips:0},tue:{hours:0,tips:0},wed:{hours:0,tips:0},thu:{hours:0,tips:0},fri:{hours:0,tips:0},sat:{hours:0,tips:0},sun:{hours:0,tips:0}}),e.days[t]={hours:this.editingHours,tips:this.settings.showTips?this.editingTips:0},console.log("Updated week data:",JSON.stringify(e));let i=0,s=0;Object.values(e.days).forEach(a=>{i+=a.hours,s+=a.tips}),e.totalHours=i,e.totalTips=s,e.totalEarnings=i*this.settings.hourlyRate+s,await at.weeks.update(this.weekId,e),this.week=e,this.requestUpdate(),window.dispatchEvent(new CustomEvent("hour-halo-data-changed",{detail:{type:"hours-updated",weekId:this.weekId,day:this.editingDay,dayKey:t,hours:this.editingHours,tips:this.editingTips}})),ie(`Hours saved for ${this.editingDay}`,"success"),this.isModalOpen=!1,this.shadowRoot.querySelector("modal-dialog").hide()}catch(t){console.error("Error saving hours:",t),ie("Failed to save hours. Please try again.","error")}finally{this.isSaving=!1}}}handleHoursChange(t){this.editingHours=parseFloat(t.target.value)||0}handleTipsChange(t){this.editingTips=parseFloat(t.target.value)||0}handleClearWeek(){const t=document.createElement("ios-alert");t.title="Clear Week",t.message="Are you sure you want to clear all hours for this week?",t.cancelText="Cancel",t.confirmText="Clear",t.destructive=!0,t.addEventListener("alert-cancel",()=>{document.body.removeChild(t)}),t.addEventListener("alert-confirm",async()=>{document.body.removeChild(t),await this.clearWeekData()}),document.body.appendChild(t),t.show()}async clearWeekData(){const t={...this.week};Object.keys(t.days).forEach(e=>{t.days[e]={hours:0,tips:0}}),t.totalHours=0,t.totalTips=0,t.totalEarnings=0,await at.weeks.update(this.weekId,t),this.week=t,this.requestUpdate(),ie("Week cleared successfully","success")}async handlePreviousWeek(){const t=this.weekId.split("-"),e=parseInt(t[0],10),i=parseInt(t[1],10)-1,s=parseInt(t[2],10),o=new Date(e,i,s);o.setDate(o.getDate()-7);const a=o.getFullYear(),r=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0"),u=`${a}-${r}-${c}`;console.log(`Navigating from ${this.weekId} to previous week: ${u}`),this.weekId=u,await this.loadWeek()}async handleNextWeek(){const t=this.weekId.split("-"),e=parseInt(t[0],10),i=parseInt(t[1],10)-1,s=parseInt(t[2],10),o=new Date(e,i,s);o.setDate(o.getDate()+7);const a=o.getFullYear(),r=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0"),u=`${a}-${r}-${c}`;console.log(`Navigating from ${this.weekId} to next week: ${u}`),this.weekId=u,await this.loadWeek()}async handleCopyPreviousWeek(){const t=this.weekId.split("-"),e=parseInt(t[0],10),i=parseInt(t[1],10)-1,s=parseInt(t[2],10),o=new Date(e,i,s);o.setDate(o.getDate()-7);const a=o.getFullYear(),r=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0"),u=`${a}-${r}-${c}`;console.log(`Copying data from previous week: ${u}`);const h=await at.weeks.get(u);if(!h){const y=document.createElement("ios-alert");y.title="No Data Found",y.message="No data found for the previous week.",y.cancelText="",y.confirmText="OK",y.addEventListener("alert-confirm",()=>{document.body.removeChild(y)}),document.body.appendChild(y),y.show();return}const p=document.createElement("ios-alert");p.title="Copy Previous Week",p.message="This will copy all hours from the previous week. Continue?",p.cancelText="Cancel",p.confirmText="Copy",p.addEventListener("alert-cancel",()=>{document.body.removeChild(p)}),p.addEventListener("alert-confirm",async()=>{document.body.removeChild(p),await this.copyPreviousWeekData(h)}),document.body.appendChild(p),p.show()}async copyPreviousWeekData(t){const e={...this.week};e.days={...t.days},e.totalHours=t.totalHours,e.totalTips=t.totalTips,e.totalEarnings=t.totalHours*this.settings.hourlyRate+t.totalTips,await at.weeks.update(this.weekId,e),this.week=e,this.requestUpdate(),ie("Data copied from previous week","success")}render(){if(!this.week||!this.settings)return W`
        <div class="flex justify-center items-center h-full">
          <div class="ios-spinner"></div>
        </div>
      `;const t=oa(this.weekId);return W`
      <div class="ios-animate-slide-up" style="padding-bottom: 0; min-height: calc(100vh - 60px); display: flex; flex-direction: column;">
        <!-- Week header with date range -->
        <div class="week-header">
          <!-- iOS-style date navigation -->
          <div class="date-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div class="nav-arrow" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: rgba(142, 142, 147, 0.12); cursor: pointer;" @click=${this.handlePreviousWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; stroke: #8e8e93;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div class="date-range" style="font-size: 15px; font-weight: 600; color: #000000;">
              ${t}
            </div>
            <div class="nav-arrow" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: rgba(142, 142, 147, 0.12); cursor: pointer;" @click=${this.handleNextWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; stroke: #8e8e93;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <!-- Week actions with iOS-style icon buttons -->
          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; padding: 0 4px;">
            <!-- iOS-style Copy button with icon -->
            <button
              style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; font-size: 15px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: none; cursor: pointer; background-color: #e5f1ff; color: #007aff;"
              @click=${this.handleCopyPreviousWeek}
              title="Copy from previous week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <!-- iOS-style Clear button with icon (destructive action) -->
            <button
              style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; font-size: 15px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: none; cursor: pointer; background-color: #ffebeb; color: #ff3b30;"
              @click=${this.handleClearWeek}
              title="Clear week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Earnings summary -->
        <div class="earnings-display">
          <p class="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Total Earnings
          </p>
          <p class="earnings-amount">
            ${pt(this.totalEarnings,this.settings.currency)}
          </p>
          ${this.settings.showTips&&this.week.totalTips>0?W`
            <div class="inline-block mt-1 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <span class="text-xs font-medium" style="color: var(--ios-green);">
                Including ${pt(this.week.totalTips,this.settings.currency)} tips
              </span>
            </div>
          `:""}
          <div class="flex items-center justify-center mt-3 text-xs text-gray-500">
            <span class="font-medium">${this.week.totalHours}h</span>
            <span class="mx-1">•</span>
            <span>${pt(this.settings.hourlyRate,this.settings.currency)}/hr</span>
          </div>
        </div>

        <!-- Days section header - iOS style -->
        <div class="section-header">
          <div class="flex items-center">
            <h3 class="section-title">Daily Hours</h3>
            <div class="ml-2 section-badge">
              ${this.week.totalHours}h total
            </div>
          </div>
          <div class="edit-hint">
            Tap to edit
          </div>
        </div>

        <!-- Days of the week - iOS style unified list -->
        <div style="margin-bottom: 0; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); flex-grow: 1;" class="dark:bg-[#1c1c1e] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          ${(()=>{const e=[],i=this.weekId.split("-"),s=parseInt(i[0],10),o=parseInt(i[1],10)-1,a=parseInt(i[2],10);console.log(`Starting with Monday date: ${s}-${o+1}-${a}`);const r=[];for(let c=0;c<7;c++){const u=new Date(s,o,a+c),h=u.getFullYear(),p=String(u.getMonth()+1).padStart(2,"0"),y=String(u.getDate()).padStart(2,"0"),g=`${h}-${p}-${y}`,x=u.getDay(),S=["sun","mon","tue","wed","thu","fri","sat"][x];console.log(`Date: ${g}, Day: ${x}, DayName: ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][x]}`);const O=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][x],A=["S","M","T","W","T","F","S"][x];r.push({dayKey:S,dateStr:g,fullDayName:O,dayLetter:A})}for(const c of r){this.week.days||(this.week.days={mon:{hours:0,tips:0},tue:{hours:0,tips:0},wed:{hours:0,tips:0},thu:{hours:0,tips:0},fri:{hours:0,tips:0},sat:{hours:0,tips:0},sun:{hours:0,tips:0}});const u=this.week.days[c.dayKey]||{hours:0,tips:0};this.week.days[c.dayKey]=u;const h=u.hours>0,p=this.settings.showTips&&u.tips>0;e.push({...c,data:u,hasHours:h,hasTips:p})}return e.map(c=>W`
              <div
                class="ios-list-item"
                @click=${()=>this.handleEditHours({detail:{day:c.fullDayName,date:c.dateStr,dayKey:c.dayKey,hours:c.data.hours,tips:c.data.tips}})}
              >
                <div class="flex items-center">
                  <div class="day-circle ${c.hasHours?"day-active":"day-inactive"}">
                    <span class="text-sm">${c.dayLetter}</span>
                  </div>
                  <div>
                    <div style="font-size: 17px; font-weight: 500; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-white">
                      ${c.fullDayName}
                    </div>
                    <div style="font-size: 13px; color: #8e8e93; margin-top: 2px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      ${c.dateStr}
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-right mr-3">
                    ${c.hasHours?W`
                      <div style="font-size: 17px; font-weight: 500; color: #007aff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-[#0a84ff]">
                        ${c.data.hours}h
                      </div>
                      ${c.hasTips?W`
                        <div style="font-size: 13px; font-weight: 500; color: #34c759; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-[#30d158]">
                          +${pt(c.data.tips,this.settings.currency)}
                        </div>
                      `:""}
                    `:W`
                      <div style="font-size: 15px; color: #8e8e93; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        Tap to add
                      </div>
                    `}
                  </div>
                  <!-- iOS-style chevron -->
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#C7C7CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            `)})()}
        </div>

        <!-- iOS-style modal for editing hours -->
        <modal-dialog title="Edit Hours">
          <div style="padding-bottom: 70px;">
            <!-- Day header with iOS styling -->
            <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
              <div class="flex items-center">
                <div class="day-circle day-active w-8 h-8 mr-3" style="box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">
                  <span class="font-bold text-sm">
                    ${this.editingDay?this.editingDay.substring(0,1):""}
                  </span>
                </div>
                <div>
                  <div style="font-size: 17px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${this.editingDay}</div>
                  <div style="font-size: 13px; color: #8e8e93; margin-top: 2px;">${this.editingDate}</div>
                </div>
              </div>
            </div>

            <!-- Form sections with iOS styling -->
            <div>
              <!-- Hours section -->
              <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
                <div style="margin-bottom: 12px; display: flex; align-items: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #007aff; margin-right: 6px; min-width: 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style="font-size: 15px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Hours worked</span>
                </div>

                <div style="margin-bottom: 12px; position: relative;">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    style="width: 100%; padding: 12px 16px; font-size: 17px; font-weight: 500; border-radius: 10px; border: 1px solid rgba(60, 60, 67, 0.3); background-color: #ffffff; color: #000000; -webkit-appearance: none; -moz-appearance: textfield;"
                    .value=${this.editingHours}
                    @input=${this.handleHoursChange}
                  />
                  <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8e8e93; font-size: 15px; font-weight: 500; z-index: 1;">
                    hours
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; gap: 8px;">
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${()=>this.editingHours=0}
                  >
                    0h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${()=>this.editingHours=4}
                  >
                    4h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${()=>this.editingHours=8}
                  >
                    8h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${()=>this.editingHours=12}
                  >
                    12h
                  </button>
                </div>
              </div>

              <!-- Tips section -->
              ${this.settings.showTips?W`
                <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
                  <div style="margin-bottom: 12px; display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #34c759; margin-right: 6px; min-width: 16px;">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style="font-size: 15px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Tips received</span>
                  </div>

                  <div style="position: relative;">
                    <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8e8e93; font-size: 15px; font-weight: 500; z-index: 1;">
                      ${this.settings.currency==="USD"?"$":this.settings.currency}
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      style="width: 100%; padding: 12px 16px 12px 28px; font-size: 17px; font-weight: 500; border-radius: 10px; border: 1px solid rgba(60, 60, 67, 0.3); background-color: #ffffff; color: #000000; -webkit-appearance: none; -moz-appearance: textfield;"
                      .value=${this.editingTips}
                      @input=${this.handleTipsChange}
                    />
                  </div>
                </div>
              `:""}

              <!-- Earnings summary -->
              <div style="padding: 16px;">
                <div style="background-color: rgba(52, 199, 89, 0.1); border-radius: 12px; padding: 16px; text-align: center;">
                  <div style="font-size: 13px; color: #8e8e93; margin-bottom: 4px; font-weight: 500;">Earnings for this day</div>
                  <div style="font-size: 24px; font-weight: 700; color: #34c759; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    ${pt(this.editingHours*this.settings.hourlyRate+(this.settings.showTips?this.editingTips:0),this.settings.currency)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </modal-dialog>

        <!-- Modal buttons component -->
        <modal-buttons
          ?open=${this.isModalOpen}
          ?isSaving=${this.isSaving}
          @modal-cancel=${()=>{this.isModalOpen=!1,this.shadowRoot.querySelector("modal-dialog").hide()}}
          @modal-save=${this.handleSaveHours}
        ></modal-buttons>
      </div>
    `}}q(da,"properties",{weekId:{type:String},week:{type:Object},settings:{type:Object},editingDay:{type:String},editingDate:{type:String},editingDayKey:{type:String},editingHours:{type:Number},editingTips:{type:Number},isSaving:{type:Boolean},isModalOpen:{type:Boolean}}),q(da,"styles",Yt`
    :host {
      display: block;
    }

    .week-header {
      margin-bottom: 0.75rem;
      padding: 0.5rem;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .dark .week-header {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .ios-card {
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .dark .ios-card {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .ios-list-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(60, 60, 67, 0.1); /* iOS standard separator */
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
      background-color: white;
    }

    .ios-list-item:last-child {
      border-bottom: none;
    }

    .dark .ios-list-item {
      border-bottom-color: rgba(60, 60, 67, 0.3); /* iOS dark mode separator */
      background-color: #1c1c1e;
    }

    .ios-list-item:active {
      background-color: rgba(0, 0, 0, 0.05); /* iOS standard tap state */
    }

    .dark .ios-list-item:active {
      background-color: rgba(255, 255, 255, 0.05); /* iOS dark mode tap state */
    }

    .day-circle {
      width: 2rem;
      height: 2rem; /* Slightly smaller for iOS standard */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.875rem;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .day-active {
      background-color: #007aff; /* iOS blue */
      color: white; /* White text for better contrast */
    }

    .day-inactive {
      background-color: rgba(60, 60, 67, 0.1); /* iOS standard inactive state */
      color: #8e8e93;
    }

    .dark .day-active {
      background-color: #0a84ff; /* iOS dark mode blue */
      color: white;
    }

    .dark .day-inactive {
      background-color: rgba(60, 60, 67, 0.3); /* iOS dark mode inactive state */
      color: #8e8e93;
    }

    .earnings-display {
      text-align: center;
      padding: 1.25rem 1rem;
      border-radius: 12px;
      margin-bottom: 1rem;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .dark .earnings-display {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .earnings-amount {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--ios-green, #34c759);
      margin: 0.5rem 0;
    }

    .dark .earnings-amount {
      color: var(--ios-dark-green, #30d158);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      padding: 0 1rem;
      margin-top: 0.75rem;
    }

    .section-title {
      font-size: 1.25rem; /* iOS standard section header size */
      font-weight: 700; /* iOS standard section header weight */
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .dark .section-title {
      color: #ffffff;
    }

    .section-badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      background-color: rgba(60, 60, 67, 0.1); /* iOS standard badge background */
      color: #8e8e93;
      font-weight: 500;
    }

    .dark .section-badge {
      background-color: rgba(60, 60, 67, 0.3); /* iOS dark mode badge background */
    }

    .edit-hint {
      font-size: 0.875rem;
      color: #007aff; /* iOS blue for actionable text */
      font-weight: 500;
    }

    .dark .edit-hint {
      color: #0a84ff; /* iOS dark mode blue */
    }

    .ios-spinner {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: var(--ios-blue, #007aff);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `);customElements.define("week-view",da);/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Li(n){return n+.5|0}const Ue=(n,t,e)=>Math.max(Math.min(n,e),t);function hi(n){return Ue(Li(n*2.55),0,255)}function Ge(n){return Ue(Li(n*255),0,255)}function Pe(n){return Ue(Li(n/2.55)/100,0,1)}function al(n){return Ue(Li(n*100),0,100)}const he={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ua=[..."0123456789ABCDEF"],sh=n=>ua[n&15],oh=n=>ua[(n&240)>>4]+ua[n&15],hs=n=>(n&240)>>4===(n&15),ah=n=>hs(n.r)&&hs(n.g)&&hs(n.b)&&hs(n.a);function rh(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&he[n[1]]*17,g:255&he[n[2]]*17,b:255&he[n[3]]*17,a:t===5?he[n[4]]*17:255}:(t===7||t===9)&&(e={r:he[n[1]]<<4|he[n[2]],g:he[n[3]]<<4|he[n[4]],b:he[n[5]]<<4|he[n[6]],a:t===9?he[n[7]]<<4|he[n[8]]:255})),e}const lh=(n,t)=>n<255?t(n):"";function ch(n){var t=ah(n)?sh:oh;return n?"#"+t(n.r)+t(n.g)+t(n.b)+lh(n.a,t):void 0}const dh=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function zc(n,t,e){const i=t*Math.min(e,1-e),s=(o,a=(o+n/30)%12)=>e-i*Math.max(Math.min(a-3,9-a,1),-1);return[s(0),s(8),s(4)]}function uh(n,t,e){const i=(s,o=(s+n/60)%6)=>e-e*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function hh(n,t,e){const i=zc(n,1,.5);let s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)i[s]*=1-t-e,i[s]+=t;return i}function fh(n,t,e,i,s){return n===s?(t-e)/i+(t<e?6:0):t===s?(e-n)/i+2:(n-t)/i+4}function Ua(n){const e=n.r/255,i=n.g/255,s=n.b/255,o=Math.max(e,i,s),a=Math.min(e,i,s),r=(o+a)/2;let c,u,h;return o!==a&&(h=o-a,u=r>.5?h/(2-o-a):h/(o+a),c=fh(e,i,s,h,o),c=c*60+.5),[c|0,u||0,r]}function Ya(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(Ge)}function qa(n,t,e){return Ya(zc,n,t,e)}function ph(n,t,e){return Ya(hh,n,t,e)}function gh(n,t,e){return Ya(uh,n,t,e)}function Hc(n){return(n%360+360)%360}function mh(n){const t=dh.exec(n);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?hi(+t[5]):Ge(+t[5]));const s=Hc(+t[2]),o=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?i=ph(s,o,a):t[1]==="hsv"?i=gh(s,o,a):i=qa(s,o,a),{r:i[0],g:i[1],b:i[2],a:e}}function yh(n,t){var e=Ua(n);e[0]=Hc(e[0]+t),e=qa(e),n.r=e[0],n.g=e[1],n.b=e[2]}function bh(n){if(!n)return;const t=Ua(n),e=t[0],i=al(t[1]),s=al(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${s}%, ${Pe(n.a)})`:`hsl(${e}, ${i}%, ${s}%)`}const rl={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},ll={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function vh(){const n={},t=Object.keys(ll),e=Object.keys(rl);let i,s,o,a,r;for(i=0;i<t.length;i++){for(a=r=t[i],s=0;s<e.length;s++)o=e[s],r=r.replace(o,rl[o]);o=parseInt(ll[a],16),n[r]=[o>>16&255,o>>8&255,o&255]}return n}let fs;function xh(n){fs||(fs=vh(),fs.transparent=[0,0,0,0]);const t=fs[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const wh=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function kh(n){const t=wh.exec(n);let e=255,i,s,o;if(t){if(t[7]!==i){const a=+t[7];e=t[8]?hi(a):Ue(a*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?hi(i):Ue(i,0,255)),s=255&(t[4]?hi(s):Ue(s,0,255)),o=255&(t[6]?hi(o):Ue(o,0,255)),{r:i,g:s,b:o,a:e}}}function _h(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${Pe(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const Vo=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,In=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function Sh(n,t,e){const i=In(Pe(n.r)),s=In(Pe(n.g)),o=In(Pe(n.b));return{r:Ge(Vo(i+e*(In(Pe(t.r))-i))),g:Ge(Vo(s+e*(In(Pe(t.g))-s))),b:Ge(Vo(o+e*(In(Pe(t.b))-o))),a:n.a+e*(t.a-n.a)}}function ps(n,t,e){if(n){let i=Ua(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=qa(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function jc(n,t){return n&&Object.assign(t||{},n)}function cl(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=Ge(n[3]))):(t=jc(n,{r:0,g:0,b:0,a:1}),t.a=Ge(t.a)),t}function Dh(n){return n.charAt(0)==="r"?kh(n):mh(n)}class Mi{constructor(t){if(t instanceof Mi)return t;const e=typeof t;let i;e==="object"?i=cl(t):e==="string"&&(i=rh(t)||xh(t)||Dh(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=jc(this._rgb);return t&&(t.a=Pe(t.a)),t}set rgb(t){this._rgb=cl(t)}rgbString(){return this._valid?_h(this._rgb):void 0}hexString(){return this._valid?ch(this._rgb):void 0}hslString(){return this._valid?bh(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,c=i.a-s.a,u=((r*c===-1?r:(r+c)/(1+r*c))+1)/2;o=1-u,i.r=255&u*i.r+o*s.r+.5,i.g=255&u*i.g+o*s.g+.5,i.b=255&u*i.b+o*s.b+.5,i.a=a*i.a+(1-a)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=Sh(this._rgb,t._rgb,e)),this}clone(){return new Mi(this.rgb)}alpha(t){return this._rgb.a=Ge(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=Li(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return ps(this._rgb,2,t),this}darken(t){return ps(this._rgb,2,-t),this}saturate(t){return ps(this._rgb,1,t),this}desaturate(t){return ps(this._rgb,1,-t),this}rotate(t){return yh(this._rgb,t),this}}/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function $e(){}const Ch=(()=>{let n=0;return()=>n++})();function yt(n){return n==null}function Ot(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function vt(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function It(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function le(n,t){return It(n)?n:t}function ft(n,t){return typeof n>"u"?t:n}const Eh=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,Wc=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function Mt(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function Dt(n,t,e,i){let s,o,a;if(Ot(n))for(o=n.length,s=0;s<o;s++)t.call(e,n[s],s);else if(vt(n))for(a=Object.keys(n),o=a.length,s=0;s<o;s++)t.call(e,n[a[s]],a[s])}function zs(n,t){let e,i,s,o;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(s=n[e],o=t[e],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function Hs(n){if(Ot(n))return n.map(Hs);if(vt(n)){const t=Object.create(null),e=Object.keys(n),i=e.length;let s=0;for(;s<i;++s)t[e[s]]=Hs(n[e[s]]);return t}return n}function Vc(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function Mh(n,t,e,i){if(!Vc(n))return;const s=t[n],o=e[n];vt(s)&&vt(o)?$i(s,o,i):t[n]=Hs(o)}function $i(n,t,e){const i=Ot(t)?t:[t],s=i.length;if(!vt(n))return n;e=e||{};const o=e.merger||Mh;let a;for(let r=0;r<s;++r){if(a=i[r],!vt(a))continue;const c=Object.keys(a);for(let u=0,h=c.length;u<h;++u)o(c[u],n,a,e)}return n}function xi(n,t){return $i(n,t,{merger:$h})}function $h(n,t,e){if(!Vc(n))return;const i=t[n],s=e[n];vt(i)&&vt(s)?xi(i,s):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=Hs(s))}const dl={"":n=>n,x:n=>n.x,y:n=>n.y};function Ah(n){const t=n.split("."),e=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function Th(n){const t=Ah(n);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Je(n,t){return(dl[t]||(dl[t]=Th(t)))(n)}function Ka(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Ai=n=>typeof n<"u",Qe=n=>typeof n=="function",ul=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function Ph(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const Tt=Math.PI,At=2*Tt,Oh=At+Tt,js=Number.POSITIVE_INFINITY,Fh=Tt/180,Bt=Tt/2,fn=Tt/4,hl=Tt*2/3,Ye=Math.log10,Ce=Math.sign;function wi(n,t,e){return Math.abs(n-t)<e}function fl(n){const t=Math.round(n);n=wi(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor(Ye(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function Ih(n){const t=[],e=Math.sqrt(n);let i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((s,o)=>s-o).pop(),t}function Rh(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function jn(n){return!Rh(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function Lh(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function Uc(n,t,e){let i,s,o;for(i=0,s=n.length;i<s;i++)o=n[i][e],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function pe(n){return n*(Tt/180)}function Xa(n){return n*(180/Tt)}function pl(n){if(!It(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function Yc(n,t){const e=t.x-n.x,i=t.y-n.y,s=Math.sqrt(e*e+i*i);let o=Math.atan2(i,e);return o<-.5*Tt&&(o+=At),{angle:o,distance:s}}function ha(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function Bh(n,t){return(n-t+Oh)%At-Tt}function de(n){return(n%At+At)%At}function Ti(n,t,e,i){const s=de(n),o=de(t),a=de(e),r=de(o-s),c=de(a-s),u=de(s-o),h=de(s-a);return s===o||s===a||i&&o===a||r>c&&u<h}function Ut(n,t,e){return Math.max(t,Math.min(e,n))}function Nh(n){return Ut(n,-32768,32767)}function Oe(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function Ga(n,t,e){e=e||(a=>n[a]<t);let i=n.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,e(o)?s=o:i=o;return{lo:s,hi:i}}const Fe=(n,t,e,i)=>Ga(n,e,i?s=>{const o=n[s][t];return o<e||o===e&&n[s+1][t]===e}:s=>n[s][t]<e),zh=(n,t,e)=>Ga(n,e,i=>n[i][t]>=e);function Hh(n,t,e){let i=0,s=n.length;for(;i<s&&n[i]<t;)i++;for(;s>i&&n[s-1]>e;)s--;return i>0||s<n.length?n.slice(i,s):n}const qc=["push","pop","shift","splice","unshift"];function jh(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),qc.forEach(e=>{const i="_onData"+Ka(e),s=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...o){const a=s.apply(this,o);return n._chartjs.listeners.forEach(r=>{typeof r[i]=="function"&&r[i](...o)}),a}})})}function gl(n,t){const e=n._chartjs;if(!e)return;const i=e.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(qc.forEach(o=>{delete n[o]}),delete n._chartjs)}function Kc(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const Xc=function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame}();function Gc(n,t){let e=[],i=!1;return function(...s){e=s,i||(i=!0,Xc.call(window,()=>{i=!1,n.apply(t,e)}))}}function Wh(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}const Ja=n=>n==="start"?"left":n==="end"?"right":"center",Jt=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,Vh=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function Jc(n,t,e){const i=t.length;let s=0,o=i;if(n._sorted){const{iScale:a,vScale:r,_parsed:c}=n,u=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,h=a.axis,{min:p,max:y,minDefined:g,maxDefined:x}=a.getUserBounds();if(g){if(s=Math.min(Fe(c,h,p).lo,e?i:Fe(t,h,a.getPixelForValue(p)).lo),u){const w=c.slice(0,s+1).reverse().findIndex(S=>!yt(S[r.axis]));s-=Math.max(0,w)}s=Ut(s,0,i-1)}if(x){let w=Math.max(Fe(c,a.axis,y,!0).hi+1,e?0:Fe(t,h,a.getPixelForValue(y),!0).hi+1);if(u){const S=c.slice(w-1).findIndex(O=>!yt(O[r.axis]));w+=Math.max(0,S)}o=Ut(w,s,i)-s}else o=i-s}return{start:s,count:o}}function Qc(n){const{xScale:t,yScale:e,_scaleRanges:i}=n,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,s),o}const gs=n=>n===0||n===1,ml=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*At/e)),yl=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*At/e)+1,ki={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*Bt)+1,easeOutSine:n=>Math.sin(n*Bt),easeInOutSine:n=>-.5*(Math.cos(Tt*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>gs(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>gs(n)?n:ml(n,.075,.3),easeOutElastic:n=>gs(n)?n:yl(n,.075,.3),easeInOutElastic(n){return gs(n)?n:n<.5?.5*ml(n*2,.1125,.45):.5+.5*yl(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-ki.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?ki.easeInBounce(n*2)*.5:ki.easeOutBounce(n*2-1)*.5+.5};function Qa(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function bl(n){return Qa(n)?n:new Mi(n)}function Uo(n){return Qa(n)?n:new Mi(n).saturate(.5).darken(.1).hexString()}const Uh=["x","y","borderWidth","radius","tension"],Yh=["color","borderColor","backgroundColor"];function qh(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:Yh},numbers:{type:"number",properties:Uh}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Kh(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const vl=new Map;function Xh(n,t){t=t||{};const e=n+JSON.stringify(t);let i=vl.get(e);return i||(i=new Intl.NumberFormat(n,t),vl.set(e,i)),i}function Bi(n,t,e){return Xh(t,e).format(n)}const Zc={values(n){return Ot(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const i=this.chart.options.locale;let s,o=n;if(e.length>1){const u=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(u<1e-4||u>1e15)&&(s="scientific"),o=Gh(n,e)}const a=Ye(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),c={notation:s,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(c,this.options.ticks.format),Bi(n,i,c)},logarithmic(n,t,e){if(n===0)return"0";const i=e[t].significand||n/Math.pow(10,Math.floor(Ye(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?Zc.numeric.call(this,n,t,e):""}};function Gh(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Gs={formatters:Zc};function Jh(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Gs.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Dn=Object.create(null),fa=Object.create(null);function _i(n,t){if(!t)return n;const e=t.split(".");for(let i=0,s=e.length;i<s;++i){const o=e[i];n=n[o]||(n[o]=Object.create(null))}return n}function Yo(n,t,e){return typeof t=="string"?$i(_i(n,t),e):$i(_i(n,""),t)}class Qh{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Uo(s.backgroundColor),this.hoverBorderColor=(i,s)=>Uo(s.borderColor),this.hoverColor=(i,s)=>Uo(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Yo(this,t,e)}get(t){return _i(this,t)}describe(t,e){return Yo(fa,t,e)}override(t,e){return Yo(Dn,t,e)}route(t,e,i,s){const o=_i(this,t),a=_i(this,i),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const c=this[r],u=a[s];return vt(c)?Object.assign({},u,c):ft(c,u)},set(c){this[r]=c}}})}apply(t){t.forEach(e=>e(this))}}var Ft=new Qh({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[qh,Kh,Jh]);function Zh(n){return!n||yt(n.size)||yt(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function Ws(n,t,e,i,s){let o=t[s];return o||(o=t[s]=n.measureText(s).width,e.push(s)),o>i&&(i=o),i}function tf(n,t,e,i){i=i||{};let s=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},o=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let a=0;const r=e.length;let c,u,h,p,y;for(c=0;c<r;c++)if(p=e[c],p!=null&&!Ot(p))a=Ws(n,s,o,a,p);else if(Ot(p))for(u=0,h=p.length;u<h;u++)y=p[u],y!=null&&!Ot(y)&&(a=Ws(n,s,o,a,y));n.restore();const g=o.length/2;if(g>e.length){for(c=0;c<g;c++)delete s[o[c]];o.splice(0,g)}return a}function pn(n,t,e){const i=n.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*i)/i+s}function xl(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function pa(n,t,e,i){td(n,t,e,i,null)}function td(n,t,e,i,s){let o,a,r,c,u,h,p,y;const g=t.pointStyle,x=t.rotation,w=t.radius;let S=(x||0)*Fh;if(g&&typeof g=="object"&&(o=g.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(S),n.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),n.restore();return}if(!(isNaN(w)||w<=0)){switch(n.beginPath(),g){default:s?n.ellipse(e,i,s/2,w,0,0,At):n.arc(e,i,w,0,At),n.closePath();break;case"triangle":h=s?s/2:w,n.moveTo(e+Math.sin(S)*h,i-Math.cos(S)*w),S+=hl,n.lineTo(e+Math.sin(S)*h,i-Math.cos(S)*w),S+=hl,n.lineTo(e+Math.sin(S)*h,i-Math.cos(S)*w),n.closePath();break;case"rectRounded":u=w*.516,c=w-u,a=Math.cos(S+fn)*c,p=Math.cos(S+fn)*(s?s/2-u:c),r=Math.sin(S+fn)*c,y=Math.sin(S+fn)*(s?s/2-u:c),n.arc(e-p,i-r,u,S-Tt,S-Bt),n.arc(e+y,i-a,u,S-Bt,S),n.arc(e+p,i+r,u,S,S+Bt),n.arc(e-y,i+a,u,S+Bt,S+Tt),n.closePath();break;case"rect":if(!x){c=Math.SQRT1_2*w,h=s?s/2:c,n.rect(e-h,i-c,2*h,2*c);break}S+=fn;case"rectRot":p=Math.cos(S)*(s?s/2:w),a=Math.cos(S)*w,r=Math.sin(S)*w,y=Math.sin(S)*(s?s/2:w),n.moveTo(e-p,i-r),n.lineTo(e+y,i-a),n.lineTo(e+p,i+r),n.lineTo(e-y,i+a),n.closePath();break;case"crossRot":S+=fn;case"cross":p=Math.cos(S)*(s?s/2:w),a=Math.cos(S)*w,r=Math.sin(S)*w,y=Math.sin(S)*(s?s/2:w),n.moveTo(e-p,i-r),n.lineTo(e+p,i+r),n.moveTo(e+y,i-a),n.lineTo(e-y,i+a);break;case"star":p=Math.cos(S)*(s?s/2:w),a=Math.cos(S)*w,r=Math.sin(S)*w,y=Math.sin(S)*(s?s/2:w),n.moveTo(e-p,i-r),n.lineTo(e+p,i+r),n.moveTo(e+y,i-a),n.lineTo(e-y,i+a),S+=fn,p=Math.cos(S)*(s?s/2:w),a=Math.cos(S)*w,r=Math.sin(S)*w,y=Math.sin(S)*(s?s/2:w),n.moveTo(e-p,i-r),n.lineTo(e+p,i+r),n.moveTo(e+y,i-a),n.lineTo(e-y,i+a);break;case"line":a=s?s/2:Math.cos(S)*w,r=Math.sin(S)*w,n.moveTo(e-a,i-r),n.lineTo(e+a,i+r);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(S)*(s?s/2:w),i+Math.sin(S)*w);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function Ie(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Js(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function Qs(n){n.restore()}function ef(n,t,e,i,s){if(!t)return n.lineTo(e.x,e.y);if(s==="middle"){const o=(t.x+e.x)/2;n.lineTo(o,t.y),n.lineTo(o,e.y)}else s==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function nf(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function sf(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),yt(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function of(n,t,e,i,s){if(s.strikethrough||s.underline){const o=n.measureText(i),a=t-o.actualBoundingBoxLeft,r=t+o.actualBoundingBoxRight,c=e-o.actualBoundingBoxAscent,u=e+o.actualBoundingBoxDescent,h=s.strikethrough?(c+u)/2:u;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(a,h),n.lineTo(r,h),n.stroke()}}function af(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function Cn(n,t,e,i,s,o={}){const a=Ot(t)?t:[t],r=o.strokeWidth>0&&o.strokeColor!=="";let c,u;for(n.save(),n.font=s.string,sf(n,o),c=0;c<a.length;++c)u=a[c],o.backdrop&&af(n,o.backdrop),r&&(o.strokeColor&&(n.strokeStyle=o.strokeColor),yt(o.strokeWidth)||(n.lineWidth=o.strokeWidth),n.strokeText(u,e,i,o.maxWidth)),n.fillText(u,e,i,o.maxWidth),of(n,e,i,u,o),i+=Number(s.lineHeight);n.restore()}function Pi(n,t){const{x:e,y:i,w:s,h:o,radius:a}=t;n.arc(e+a.topLeft,i+a.topLeft,a.topLeft,1.5*Tt,Tt,!0),n.lineTo(e,i+o-a.bottomLeft),n.arc(e+a.bottomLeft,i+o-a.bottomLeft,a.bottomLeft,Tt,Bt,!0),n.lineTo(e+s-a.bottomRight,i+o),n.arc(e+s-a.bottomRight,i+o-a.bottomRight,a.bottomRight,Bt,0,!0),n.lineTo(e+s,i+a.topRight),n.arc(e+s-a.topRight,i+a.topRight,a.topRight,0,-Bt,!0),n.lineTo(e+a.topLeft,i)}const rf=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,lf=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function cf(n,t){const e=(""+n).match(rf);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const df=n=>+n||0;function Za(n,t){const e={},i=vt(t),s=i?Object.keys(t):t,o=vt(n)?i?a=>ft(n[a],n[t[a]]):a=>n[a]:()=>n;for(const a of s)e[a]=df(o(a));return e}function ed(n){return Za(n,{top:"y",right:"x",bottom:"y",left:"x"})}function kn(n){return Za(n,["topLeft","topRight","bottomLeft","bottomRight"])}function Zt(n){const t=ed(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function zt(n,t){n=n||{},t=t||Ft.font;let e=ft(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=ft(n.style,t.style);i&&!(""+i).match(lf)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:ft(n.family,t.family),lineHeight:cf(ft(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:ft(n.weight,t.weight),string:""};return s.string=Zh(s),s}function fi(n,t,e,i){let s,o,a;for(s=0,o=n.length;s<o;++s)if(a=n[s],a!==void 0&&a!==void 0)return a}function uf(n,t,e){const{min:i,max:s}=n,o=Wc(t,(s-i)/2),a=(r,c)=>e&&r===0?0:r+c;return{min:a(i,-Math.abs(o)),max:a(s,o)}}function Ze(n,t){return Object.assign(Object.create(n),t)}function tr(n,t=[""],e,i,s=()=>n[0]){const o=e||n;typeof i>"u"&&(i=od("_fallback",n));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:o,_fallback:i,_getTarget:s,override:r=>tr([r,...n],t,o,i)};return new Proxy(a,{deleteProperty(r,c){return delete r[c],delete r._keys,delete n[0][c],!0},get(r,c){return id(r,c,()=>vf(c,t,n,r))},getOwnPropertyDescriptor(r,c){return Reflect.getOwnPropertyDescriptor(r._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(r,c){return kl(r).includes(c)},ownKeys(r){return kl(r)},set(r,c,u){const h=r._storage||(r._storage=s());return r[c]=h[c]=u,delete r._keys,!0}})}function Wn(n,t,e,i){const s={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:nd(n,i),setContext:o=>Wn(n,o,e,i),override:o=>Wn(n.override(o),t,e,i)};return new Proxy(s,{deleteProperty(o,a){return delete o[a],delete n[a],!0},get(o,a,r){return id(o,a,()=>ff(o,a,r))},getOwnPropertyDescriptor(o,a){return o._descriptors.allKeys?Reflect.has(n,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,a)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(o,a){return Reflect.has(n,a)},ownKeys(){return Reflect.ownKeys(n)},set(o,a,r){return n[a]=r,delete o[a],!0}})}function nd(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=n;return{allKeys:s,scriptable:e,indexable:i,isScriptable:Qe(e)?e:()=>e,isIndexable:Qe(i)?i:()=>i}}const hf=(n,t)=>n?n+Ka(t):t,er=(n,t)=>vt(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function id(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const i=e();return n[t]=i,i}function ff(n,t,e){const{_proxy:i,_context:s,_subProxy:o,_descriptors:a}=n;let r=i[t];return Qe(r)&&a.isScriptable(t)&&(r=pf(t,r,n,e)),Ot(r)&&r.length&&(r=gf(t,r,n,a.isIndexable)),er(t,r)&&(r=Wn(r,s,o&&o[t],a)),r}function pf(n,t,e,i){const{_proxy:s,_context:o,_subProxy:a,_stack:r}=e;if(r.has(n))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+n);r.add(n);let c=t(o,a||i);return r.delete(n),er(n,c)&&(c=nr(s._scopes,s,n,c)),c}function gf(n,t,e,i){const{_proxy:s,_context:o,_subProxy:a,_descriptors:r}=e;if(typeof o.index<"u"&&i(n))return t[o.index%t.length];if(vt(t[0])){const c=t,u=s._scopes.filter(h=>h!==c);t=[];for(const h of c){const p=nr(u,s,n,h);t.push(Wn(p,o,a&&a[n],r))}}return t}function sd(n,t,e){return Qe(n)?n(t,e):n}const mf=(n,t)=>n===!0?t:typeof n=="string"?Je(t,n):void 0;function yf(n,t,e,i,s){for(const o of t){const a=mf(e,o);if(a){n.add(a);const r=sd(a._fallback,e,s);if(typeof r<"u"&&r!==e&&r!==i)return r}else if(a===!1&&typeof i<"u"&&e!==i)return null}return!1}function nr(n,t,e,i){const s=t._rootScopes,o=sd(t._fallback,e,i),a=[...n,...s],r=new Set;r.add(i);let c=wl(r,a,e,o||e,i);return c===null||typeof o<"u"&&o!==e&&(c=wl(r,a,o,c,i),c===null)?!1:tr(Array.from(r),[""],s,o,()=>bf(t,e,i))}function wl(n,t,e,i,s){for(;e;)e=yf(n,t,e,i,s);return e}function bf(n,t,e){const i=n._getTarget();t in i||(i[t]={});const s=i[t];return Ot(s)&&vt(e)?e:s||{}}function vf(n,t,e,i){let s;for(const o of t)if(s=od(hf(o,n),e),typeof s<"u")return er(n,s)?nr(e,i,n,s):s}function od(n,t){for(const e of t){if(!e)continue;const i=e[n];if(typeof i<"u")return i}}function kl(n){let t=n._keys;return t||(t=n._keys=xf(n._scopes)),t}function xf(n){const t=new Set;for(const e of n)for(const i of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function ad(n,t,e,i){const{iScale:s}=n,{key:o="r"}=this._parsing,a=new Array(i);let r,c,u,h;for(r=0,c=i;r<c;++r)u=r+e,h=t[u],a[r]={r:s.parse(Je(h,o),u)};return a}const wf=Number.EPSILON||1e-14,Vn=(n,t)=>t<n.length&&!n[t].skip&&n[t],rd=n=>n==="x"?"y":"x";function kf(n,t,e,i){const s=n.skip?t:n,o=t,a=e.skip?t:e,r=ha(o,s),c=ha(a,o);let u=r/(r+c),h=c/(r+c);u=isNaN(u)?0:u,h=isNaN(h)?0:h;const p=i*u,y=i*h;return{previous:{x:o.x-p*(a.x-s.x),y:o.y-p*(a.y-s.y)},next:{x:o.x+y*(a.x-s.x),y:o.y+y*(a.y-s.y)}}}function _f(n,t,e){const i=n.length;let s,o,a,r,c,u=Vn(n,0);for(let h=0;h<i-1;++h)if(c=u,u=Vn(n,h+1),!(!c||!u)){if(wi(t[h],0,wf)){e[h]=e[h+1]=0;continue}s=e[h]/t[h],o=e[h+1]/t[h],r=Math.pow(s,2)+Math.pow(o,2),!(r<=9)&&(a=3/Math.sqrt(r),e[h]=s*a*t[h],e[h+1]=o*a*t[h])}}function Sf(n,t,e="x"){const i=rd(e),s=n.length;let o,a,r,c=Vn(n,0);for(let u=0;u<s;++u){if(a=r,r=c,c=Vn(n,u+1),!r)continue;const h=r[e],p=r[i];a&&(o=(h-a[e])/3,r[`cp1${e}`]=h-o,r[`cp1${i}`]=p-o*t[u]),c&&(o=(c[e]-h)/3,r[`cp2${e}`]=h+o,r[`cp2${i}`]=p+o*t[u])}}function Df(n,t="x"){const e=rd(t),i=n.length,s=Array(i).fill(0),o=Array(i);let a,r,c,u=Vn(n,0);for(a=0;a<i;++a)if(r=c,c=u,u=Vn(n,a+1),!!c){if(u){const h=u[t]-c[t];s[a]=h!==0?(u[e]-c[e])/h:0}o[a]=r?u?Ce(s[a-1])!==Ce(s[a])?0:(s[a-1]+s[a])/2:s[a-1]:s[a]}_f(n,s,o),Sf(n,o,t)}function ms(n,t,e){return Math.max(Math.min(n,e),t)}function Cf(n,t){let e,i,s,o,a,r=Ie(n[0],t);for(e=0,i=n.length;e<i;++e)a=o,o=r,r=e<i-1&&Ie(n[e+1],t),o&&(s=n[e],a&&(s.cp1x=ms(s.cp1x,t.left,t.right),s.cp1y=ms(s.cp1y,t.top,t.bottom)),r&&(s.cp2x=ms(s.cp2x,t.left,t.right),s.cp2y=ms(s.cp2y,t.top,t.bottom)))}function Ef(n,t,e,i,s){let o,a,r,c;if(t.spanGaps&&(n=n.filter(u=>!u.skip)),t.cubicInterpolationMode==="monotone")Df(n,s);else{let u=i?n[n.length-1]:n[0];for(o=0,a=n.length;o<a;++o)r=n[o],c=kf(u,r,n[Math.min(o+1,a-(i?0:1))%a],t.tension),r.cp1x=c.previous.x,r.cp1y=c.previous.y,r.cp2x=c.next.x,r.cp2y=c.next.y,u=r}t.capBezierPoints&&Cf(n,e)}function ir(){return typeof window<"u"&&typeof document<"u"}function sr(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Vs(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}const Zs=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function Mf(n,t){return Zs(n).getPropertyValue(t)}const $f=["top","right","bottom","left"];function _n(n,t,e){const i={};e=e?"-"+e:"";for(let s=0;s<4;s++){const o=$f[s];i[o]=parseFloat(n[t+"-"+o+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const Af=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function Tf(n,t){const e=n.touches,i=e&&e.length?e[0]:n,{offsetX:s,offsetY:o}=i;let a=!1,r,c;if(Af(s,o,n.target))r=s,c=o;else{const u=t.getBoundingClientRect();r=i.clientX-u.left,c=i.clientY-u.top,a=!0}return{x:r,y:c,box:a}}function yn(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:i}=t,s=Zs(e),o=s.boxSizing==="border-box",a=_n(s,"padding"),r=_n(s,"border","width"),{x:c,y:u,box:h}=Tf(n,e),p=a.left+(h&&r.left),y=a.top+(h&&r.top);let{width:g,height:x}=t;return o&&(g-=a.width+r.width,x-=a.height+r.height),{x:Math.round((c-p)/g*e.width/i),y:Math.round((u-y)/x*e.height/i)}}function Pf(n,t,e){let i,s;if(t===void 0||e===void 0){const o=n&&sr(n);if(!o)t=n.clientWidth,e=n.clientHeight;else{const a=o.getBoundingClientRect(),r=Zs(o),c=_n(r,"border","width"),u=_n(r,"padding");t=a.width-u.width-c.width,e=a.height-u.height-c.height,i=Vs(r.maxWidth,o,"clientWidth"),s=Vs(r.maxHeight,o,"clientHeight")}}return{width:t,height:e,maxWidth:i||js,maxHeight:s||js}}const ys=n=>Math.round(n*10)/10;function Of(n,t,e,i){const s=Zs(n),o=_n(s,"margin"),a=Vs(s.maxWidth,n,"clientWidth")||js,r=Vs(s.maxHeight,n,"clientHeight")||js,c=Pf(n,t,e);let{width:u,height:h}=c;if(s.boxSizing==="content-box"){const y=_n(s,"border","width"),g=_n(s,"padding");u-=g.width+y.width,h-=g.height+y.height}return u=Math.max(0,u-o.width),h=Math.max(0,i?u/i:h-o.height),u=ys(Math.min(u,a,c.maxWidth)),h=ys(Math.min(h,r,c.maxHeight)),u&&!h&&(h=ys(u/2)),(t!==void 0||e!==void 0)&&i&&c.height&&h>c.height&&(h=c.height,u=ys(Math.floor(h*i))),{width:u,height:h}}function _l(n,t,e){const i=t||1,s=Math.floor(n.height*i),o=Math.floor(n.width*i);n.height=Math.floor(n.height),n.width=Math.floor(n.width);const a=n.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${n.height}px`,a.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||a.height!==s||a.width!==o?(n.currentDevicePixelRatio=i,a.height=s,a.width=o,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const Ff=function(){let n=!1;try{const t={get passive(){return n=!0,!1}};ir()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n}();function Sl(n,t){const e=Mf(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function bn(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function If(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function Rf(n,t,e,i){const s={x:n.cp2x,y:n.cp2y},o={x:t.cp1x,y:t.cp1y},a=bn(n,s,e),r=bn(s,o,e),c=bn(o,t,e),u=bn(a,r,e),h=bn(r,c,e);return bn(u,h,e)}const Lf=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},Bf=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function Nn(n,t,e){return n?Lf(t,e):Bf()}function ld(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function cd(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function dd(n){return n==="angle"?{between:Ti,compare:Bh,normalize:de}:{between:Oe,compare:(t,e)=>t-e,normalize:t=>t}}function Dl({start:n,end:t,count:e,loop:i,style:s}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:s}}function Nf(n,t,e){const{property:i,start:s,end:o}=e,{between:a,normalize:r}=dd(i),c=t.length;let{start:u,end:h,loop:p}=n,y,g;if(p){for(u+=c,h+=c,y=0,g=c;y<g&&a(r(t[u%c][i]),s,o);++y)u--,h--;u%=c,h%=c}return h<u&&(h+=c),{start:u,end:h,loop:p,style:n.style}}function ud(n,t,e){if(!e)return[n];const{property:i,start:s,end:o}=e,a=t.length,{compare:r,between:c,normalize:u}=dd(i),{start:h,end:p,loop:y,style:g}=Nf(n,t,e),x=[];let w=!1,S=null,O,A,j;const N=()=>c(s,j,O)&&r(s,j)!==0,C=()=>r(o,O)===0||c(o,j,O),I=()=>w||N(),V=()=>!w||C();for(let U=h,K=h;U<=p;++U)A=t[U%a],!A.skip&&(O=u(A[i]),O!==j&&(w=c(O,s,o),S===null&&I()&&(S=r(O,s)===0?U:K),S!==null&&V()&&(x.push(Dl({start:S,end:U,loop:y,count:a,style:g})),S=null),K=U,j=O));return S!==null&&x.push(Dl({start:S,end:p,loop:y,count:a,style:g})),x}function hd(n,t){const e=[],i=n.segments;for(let s=0;s<i.length;s++){const o=ud(i[s],n.points,t);o.length&&e.push(...o)}return e}function zf(n,t,e,i){let s=0,o=t-1;if(e&&!i)for(;s<t&&!n[s].skip;)s++;for(;s<t&&n[s].skip;)s++;for(s%=t,e&&(o+=s);o>s&&n[o%t].skip;)o--;return o%=t,{start:s,end:o}}function Hf(n,t,e,i){const s=n.length,o=[];let a=t,r=n[t],c;for(c=t+1;c<=e;++c){const u=n[c%s];u.skip||u.stop?r.skip||(i=!1,o.push({start:t%s,end:(c-1)%s,loop:i}),t=a=u.stop?c:null):(a=c,r.skip&&(t=c)),r=u}return a!==null&&o.push({start:t%s,end:a%s,loop:i}),o}function jf(n,t){const e=n.points,i=n.options.spanGaps,s=e.length;if(!s)return[];const o=!!n._loop,{start:a,end:r}=zf(e,s,o,i);if(i===!0)return Cl(n,[{start:a,end:r,loop:o}],e,t);const c=r<a?r+s:r,u=!!n._fullLoop&&a===0&&r===s-1;return Cl(n,Hf(e,a,c,u),e,t)}function Cl(n,t,e,i){return!i||!i.setContext||!e?t:Wf(n,t,e,i)}function Wf(n,t,e,i){const s=n._chart.getContext(),o=El(n.options),{_datasetIndex:a,options:{spanGaps:r}}=n,c=e.length,u=[];let h=o,p=t[0].start,y=p;function g(x,w,S,O){const A=r?-1:1;if(x!==w){for(x+=c;e[x%c].skip;)x-=A;for(;e[w%c].skip;)w+=A;x%c!==w%c&&(u.push({start:x%c,end:w%c,loop:S,style:O}),h=O,p=w%c)}}for(const x of t){p=r?p:x.start;let w=e[p%c],S;for(y=p+1;y<=x.end;y++){const O=e[y%c];S=El(i.setContext(Ze(s,{type:"segment",p0:w,p1:O,p0DataIndex:(y-1)%c,p1DataIndex:y%c,datasetIndex:a}))),Vf(S,h)&&g(p,y-1,x.loop,h),w=O,h=S}p<y-1&&g(p,y-1,x.loop,h)}return u}function El(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function Vf(n,t){if(!t)return!1;const e=[],i=function(s,o){return Qa(o)?(e.includes(o)||e.push(o),e.indexOf(o)):o};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function bs(n,t,e){return n.options.clip?n[e]:t[e]}function Uf(n,t){const{xScale:e,yScale:i}=n;return e&&i?{left:bs(e,t,"left"),right:bs(e,t,"right"),top:bs(i,t,"top"),bottom:bs(i,t,"bottom")}:t}function fd(n,t){const e=t._clip;if(e.disabled)return!1;const i=Uf(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Yf{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const o=e.listeners[s],a=e.duration;o.forEach(r=>r({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(i-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Xc.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let a=o.length-1,r=!1,c;for(;a>=0;--a)c=o[a],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),r=!0):(o[a]=o[o.length-1],o.pop());r&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=o.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Ae=new Yf;const Ml="transparent",qf={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const i=bl(n||Ml),s=i.valid&&bl(t||Ml);return s&&s.valid?s.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class Kf{constructor(t,e,i,s){const o=e[i];s=fi([t.to,s,o,t.from]);const a=fi([t.from,o,s]);this._active=!0,this._fn=t.fn||qf[t.type||typeof a],this._easing=ki[t.easing]||ki.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=a,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,a=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=fi([t.to,e,s,t.from]),this._from=fi([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,o=this._from,a=this._loop,r=this._to;let c;if(this._active=o!==r&&(a||e<i),!this._active){this._target[s]=r,this._notify(!0);return}if(e<0){this._target[s]=o;return}c=e/i%2,c=a&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[s]=this._fn(o,r,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][e]()}}class pd{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!vt(t))return;const e=Object.keys(Ft.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!vt(o))return;const a={};for(const r of e)a[r]=o[r];(Ot(o.properties)&&o.properties||[s]).forEach(r=>{(r===s||!i.has(r))&&i.set(r,a)})})}_animateOptions(t,e){const i=e.options,s=Gf(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&Xf(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,e){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),a=Object.keys(e),r=Date.now();let c;for(c=a.length-1;c>=0;--c){const u=a[c];if(u.charAt(0)==="$")continue;if(u==="options"){s.push(...this._animateOptions(t,e));continue}const h=e[u];let p=o[u];const y=i.get(u);if(p)if(y&&p.active()){p.update(y,h,r);continue}else p.cancel();if(!y||!y.duration){t[u]=h;continue}o[u]=p=new Kf(y,t,u,h),s.push(p)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return Ae.add(this._chart,i),!0}}function Xf(n,t){const e=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=n[i[s]];o&&o.active()&&e.push(o.wait())}return Promise.all(e)}function Gf(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function $l(n,t){const e=n&&n.options||{},i=e.reverse,s=e.min===void 0?t:0,o=e.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function Jf(n,t,e){if(e===!1)return!1;const i=$l(n,e),s=$l(t,e);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function Qf(n){let t,e,i,s;return vt(n)?(t=n.top,e=n.right,i=n.bottom,s=n.left):t=e=i=s=n,{top:t,right:e,bottom:i,left:s,disabled:n===!1}}function gd(n,t){const e=[],i=n._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)e.push(i[s].index);return e}function Al(n,t,e,i={}){const s=n.keys,o=i.mode==="single";let a,r,c,u;if(t===null)return;let h=!1;for(a=0,r=s.length;a<r;++a){if(c=+s[a],c===e){if(h=!0,i.all)continue;break}u=n.values[c],It(u)&&(o||t===0||Ce(t)===Ce(u))&&(t+=u)}return!h&&!i.all?0:t}function Zf(n,t){const{iScale:e,vScale:i}=t,s=e.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",a=Object.keys(n),r=new Array(a.length);let c,u,h;for(c=0,u=a.length;c<u;++c)h=a[c],r[c]={[s]:h,[o]:n[h]};return r}function qo(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function tp(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function ep(n){const{min:t,max:e,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function np(n,t,e){const i=n[t]||(n[t]={});return i[e]||(i[e]={})}function Tl(n,t,e,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=n[s.index];if(e&&o>0||!e&&o<0)return s.index}return null}function Pl(n,t){const{chart:e,_cachedMeta:i}=n,s=e._stacks||(e._stacks={}),{iScale:o,vScale:a,index:r}=i,c=o.axis,u=a.axis,h=tp(o,a,i),p=t.length;let y;for(let g=0;g<p;++g){const x=t[g],{[c]:w,[u]:S}=x,O=x._stacks||(x._stacks={});y=O[u]=np(s,h,w),y[r]=S,y._top=Tl(y,a,!0,i.type),y._bottom=Tl(y,a,!1,i.type);const A=y._visualValues||(y._visualValues={});A[r]=S}}function Ko(n,t){const e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function ip(n,t){return Ze(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function sp(n,t,e){return Ze(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function ri(n,t){const e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][e]===void 0)return;delete o[i][e],o[i]._visualValues!==void 0&&o[i]._visualValues[e]!==void 0&&delete o[i]._visualValues[e]}}}const Xo=n=>n==="reset"||n==="none",Ol=(n,t)=>t?n:Object.assign({},n),op=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:gd(e,!0),values:null};class ge{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=qo(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&ri(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(p,y,g,x)=>p==="x"?y:p==="r"?x:g,o=e.xAxisID=ft(i.xAxisID,Ko(t,"x")),a=e.yAxisID=ft(i.yAxisID,Ko(t,"y")),r=e.rAxisID=ft(i.rAxisID,Ko(t,"r")),c=e.indexAxis,u=e.iAxisID=s(c,o,a,r),h=e.vAxisID=s(c,a,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(u),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&gl(this._data,this),t._stacked&&ri(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(vt(e)){const s=this._cachedMeta;this._data=Zf(e,s)}else if(i!==e){if(i){gl(i,this);const s=this._cachedMeta;ri(s),s._parsed=[]}e&&Object.isExtensible(e)&&jh(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=e._stacked;e._stacked=qo(e.vScale,e),e.stack!==i.stack&&(s=!0,ri(e),e.stack=i.stack),this._resyncElements(t),(s||o!==e._stacked)&&(Pl(this,e._parsed),e._stacked=qo(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:a}=i,r=o.axis;let c=t===0&&e===s.length?!0:i._sorted,u=t>0&&i._parsed[t-1],h,p,y;if(this._parsing===!1)i._parsed=s,i._sorted=!0,y=s;else{Ot(s[t])?y=this.parseArrayData(i,s,t,e):vt(s[t])?y=this.parseObjectData(i,s,t,e):y=this.parsePrimitiveData(i,s,t,e);const g=()=>p[r]===null||u&&p[r]<u[r];for(h=0;h<e;++h)i._parsed[h+t]=p=y[h],c&&(g()&&(c=!1),u=p);i._sorted=c}a&&Pl(this,y)}parsePrimitiveData(t,e,i,s){const{iScale:o,vScale:a}=t,r=o.axis,c=a.axis,u=o.getLabels(),h=o===a,p=new Array(s);let y,g,x;for(y=0,g=s;y<g;++y)x=y+i,p[y]={[r]:h||o.parse(u[x],x),[c]:a.parse(e[x],x)};return p}parseArrayData(t,e,i,s){const{xScale:o,yScale:a}=t,r=new Array(s);let c,u,h,p;for(c=0,u=s;c<u;++c)h=c+i,p=e[h],r[c]={x:o.parse(p[0],h),y:a.parse(p[1],h)};return r}parseObjectData(t,e,i,s){const{xScale:o,yScale:a}=t,{xAxisKey:r="x",yAxisKey:c="y"}=this._parsing,u=new Array(s);let h,p,y,g;for(h=0,p=s;h<p;++h)y=h+i,g=e[y],u[h]={x:o.parse(Je(g,r),y),y:a.parse(Je(g,c),y)};return u}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,o=this._cachedMeta,a=e[t.axis],r={keys:gd(s,!0),values:e._stacks[t.axis]._visualValues};return Al(r,a,o.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const o=i[e.axis];let a=o===null?NaN:o;const r=s&&i._stacks[e.axis];s&&r&&(s.values=r,a=Al(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,a=s.length,r=this._getOtherScale(t),c=op(e,i,this.chart),u={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:p}=ep(r);let y,g;function x(){g=s[y];const w=g[r.axis];return!It(g[t.axis])||h>w||p<w}for(y=0;y<a&&!(!x()&&(this.updateRangeFromParsed(u,t,g,c),o));++y);if(o){for(y=a-1;y>=0;--y)if(!x()){this.updateRangeFromParsed(u,t,g,c);break}}return u}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,o,a;for(s=0,o=e.length;s<o;++s)a=e[s][t.axis],It(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Qf(ft(this.options.clip,Jf(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],o=e.chartArea,a=[],r=this._drawStart||0,c=this._drawCount||s.length-r,u=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,o,r,c),h=r;h<r+c;++h){const p=s[h];p.hidden||(p.active&&u?a.push(p):p.draw(t,o))}for(h=0;h<a.length;++h)a[h].draw(t,o)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];o=a.$context||(a.$context=sp(this.getContext(),t,a)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=ip(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s=e==="active",o=this._cachedDataOpts,a=t+"-"+e,r=o[a],c=this.enableOptionSharing&&Ai(i);if(r)return Ol(r,c);const u=this.chart.config,h=u.datasetElementScopeKeys(this._type,t),p=s?[`${t}Hover`,"hover",t,""]:[t,""],y=u.getOptionScopes(this.getDataset(),h),g=Object.keys(Ft.elements[t]),x=()=>this.getContext(i,s,e),w=u.resolveNamedOptions(y,g,x,p);return w.$shared&&(w.$shared=c,o[a]=Object.freeze(Ol(w,c))),w}_resolveAnimations(t,e,i){const s=this.chart,o=this._cachedDataOpts,a=`animation-${e}`,r=o[a];if(r)return r;let c;if(s.options.animation!==!1){const h=this.chart.config,p=h.datasetAnimationScopeKeys(this._type,e),y=h.getOptionScopes(this.getDataset(),p);c=h.createResolver(y,this.getContext(t,i,e))}const u=new pd(s,c&&c.animations);return c&&c._cacheable&&(o[a]=Object.freeze(u)),u}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Xo(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,o=this.getSharedOptions(i),a=this.includeOptions(e,o)||o!==s;return this.updateSharedOptions(o,e,i),{sharedOptions:o,includeOptions:a}}updateElement(t,e,i,s){Xo(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Xo(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const o=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[r,c,u]of this._syncList)this[r](c,u);this._syncList=[];const s=i.length,o=e.length,a=Math.min(o,s);a&&this.parse(0,a),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,e,i=!0){const s=this._cachedMeta,o=s.data,a=t+e;let r;const c=u=>{for(u.length+=e,r=u.length-1;r>=a;r--)u[r]=u[r-e]};for(c(o),r=t;r<a;++r)o[r]=new this.dataElementType;this._parsing&&c(s._parsed),this.parse(t,e),i&&this.updateElements(o,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&ri(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}q(ge,"defaults",{}),q(ge,"datasetElementType",null),q(ge,"dataElementType",null);function ap(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let i=[];for(let s=0,o=e.length;s<o;s++)i=i.concat(e[s].controller.getAllParsedValues(n));n._cache.$bar=Kc(i.sort((s,o)=>s-o))}return n._cache.$bar}function rp(n){const t=n.iScale,e=ap(t,n.type);let i=t._length,s,o,a,r;const c=()=>{a===32767||a===-32768||(Ai(r)&&(i=Math.min(i,Math.abs(a-r)||i)),r=a)};for(s=0,o=e.length;s<o;++s)a=t.getPixelForValue(e[s]),c();for(r=void 0,s=0,o=t.ticks.length;s<o;++s)a=t.getPixelForTick(s),c();return i}function lp(n,t,e,i){const s=e.barThickness;let o,a;return yt(s)?(o=t.min*e.categoryPercentage,a=e.barPercentage):(o=s*i,a=1),{chunk:o/i,ratio:a,start:t.pixels[n]-o/2}}function cp(n,t,e,i){const s=t.pixels,o=s[n];let a=n>0?s[n-1]:null,r=n<s.length-1?s[n+1]:null;const c=e.categoryPercentage;a===null&&(a=o-(r===null?t.end-t.start:r-o)),r===null&&(r=o+o-a);const u=o-(o-Math.min(a,r))/2*c;return{chunk:Math.abs(r-a)/2*c/i,ratio:e.barPercentage,start:u}}function dp(n,t,e,i){const s=e.parse(n[0],i),o=e.parse(n[1],i),a=Math.min(s,o),r=Math.max(s,o);let c=a,u=r;Math.abs(a)>Math.abs(r)&&(c=r,u=a),t[e.axis]=u,t._custom={barStart:c,barEnd:u,start:s,end:o,min:a,max:r}}function md(n,t,e,i){return Ot(n)?dp(n,t,e,i):t[e.axis]=e.parse(n,i),t}function Fl(n,t,e,i){const s=n.iScale,o=n.vScale,a=s.getLabels(),r=s===o,c=[];let u,h,p,y;for(u=e,h=e+i;u<h;++u)y=t[u],p={},p[s.axis]=r||s.parse(a[u],u),c.push(md(y,p,o,u));return c}function Go(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function up(n,t,e){return n!==0?Ce(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function hp(n){let t,e,i,s,o;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(s="end",o="start"):(s="start",o="end"),{start:e,end:i,reverse:t,top:s,bottom:o}}function fp(n,t,e,i){let s=t.borderSkipped;const o={};if(!s){n.borderSkipped=o;return}if(s===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:c,top:u,bottom:h}=hp(n);s==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?s=u:(e._bottom||0)===i?s=h:(o[Il(h,a,r,c)]=!0,s=u)),o[Il(s,a,r,c)]=!0,n.borderSkipped=o}function Il(n,t,e,i){return i?(n=pp(n,t,e),n=Rl(n,e,t)):n=Rl(n,t,e),n}function pp(n,t,e){return n===t?e:n===e?t:n}function Rl(n,t,e){return n==="start"?t:n==="end"?e:n}function gp(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class $s extends ge{parsePrimitiveData(t,e,i,s){return Fl(t,e,i,s)}parseArrayData(t,e,i,s){return Fl(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:o,vScale:a}=t,{xAxisKey:r="x",yAxisKey:c="y"}=this._parsing,u=o.axis==="x"?r:c,h=a.axis==="x"?r:c,p=[];let y,g,x,w;for(y=i,g=i+s;y<g;++y)w=e[y],x={},x[o.axis]=o.parse(Je(w,u),y),p.push(md(Je(w,h),x,a,y));return p}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const o=i._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,o=this.getParsed(t),a=o._custom,r=Go(a)?"["+a.start+", "+a.end+"]":""+s.getLabelForValue(o[s.axis]);return{label:""+i.getLabelForValue(o[i.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const o=s==="reset",{index:a,_cachedMeta:{vScale:r}}=this,c=r.getBasePixel(),u=r.isHorizontal(),h=this._getRuler(),{sharedOptions:p,includeOptions:y}=this._getSharedOptions(e,s);for(let g=e;g<e+i;g++){const x=this.getParsed(g),w=o||yt(x[r.axis])?{base:c,head:c}:this._calculateBarValuePixels(g),S=this._calculateBarIndexPixels(g,h),O=(x._stacks||{})[r.axis],A={horizontal:u,base:w.base,enableBorderRadius:!O||Go(x._custom)||a===O._top||a===O._bottom,x:u?w.head:S.center,y:u?S.center:w.head,height:u?S.size:Math.abs(w.size),width:u?Math.abs(w.size):S.size};y&&(A.options=p||this.resolveDataElementOptions(g,t[g].active?"active":s));const j=A.options||t[g].options;fp(A,j,O,a),gp(A,j,h.ratio),this.updateElement(t[g],g,A,s)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),o=i.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(e),c=r&&r[i.axis],u=h=>{const p=h._parsed.find(g=>g[i.axis]===c),y=p&&p[h.vScale.axis];if(yt(y)||isNaN(y))return!0};for(const h of s)if(!(e!==void 0&&u(h))&&((o===!1||a.indexOf(h.stack)===-1||o===void 0&&h.stack===void 0)&&a.push(h.stack),h.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getStackIndex(t,e,i){const s=this._getStacks(t,i),o=e!==void 0?s.indexOf(e):-1;return o===-1?s.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let o,a;for(o=0,a=e.data.length;o<a;++o)s.push(i.getPixelForValue(this.getParsed(o)[i.axis],o));const r=t.barThickness;return{min:r||rp(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:o,minBarLength:a}}=this,r=o||0,c=this.getParsed(t),u=c._custom,h=Go(u);let p=c[e.axis],y=0,g=i?this.applyStack(e,c,i):p,x,w;g!==p&&(y=g-p,g=p),h&&(p=u.barStart,g=u.barEnd-u.barStart,p!==0&&Ce(p)!==Ce(u.barEnd)&&(y=0),y+=p);const S=!yt(o)&&!h?o:y;let O=e.getPixelForValue(S);if(this.chart.getDataVisibility(t)?x=e.getPixelForValue(y+g):x=O,w=x-O,Math.abs(w)<a){w=up(w,e,r)*a,p===r&&(O-=w/2);const A=e.getPixelForDecimal(0),j=e.getPixelForDecimal(1),N=Math.min(A,j),C=Math.max(A,j);O=Math.max(Math.min(O,C),N),x=O+w,i&&!h&&(c._stacks[e.axis]._visualValues[s]=e.getValueForPixel(x)-e.getValueForPixel(O))}if(O===e.getPixelForValue(r)){const A=Ce(w)*e.getLineWidthForValue(r)/2;O+=A,w-=A}return{size:w,base:O,head:x,center:x+w/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,o=s.skipNull,a=ft(s.maxBarThickness,1/0);let r,c;if(e.grouped){const u=o?this._getStackCount(t):e.stackCount,h=s.barThickness==="flex"?cp(t,e,s,u):lp(t,e,s,u),p=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0);r=h.start+h.chunk*p+h.chunk/2,c=Math.min(a,h.chunk*h.ratio)}else r=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(a,e.min*e.ratio);return{base:r-c/2,head:r+c/2,center:r,size:c}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let o=0;for(;o<s;++o)this.getParsed(o)[e.axis]!==null&&!i[o].hidden&&i[o].draw(this._ctx)}}q($s,"id","bar"),q($s,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),q($s,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class As extends ge{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const o=super.parsePrimitiveData(t,e,i,s);for(let a=0;a<o.length;a++)o[a]._custom=this.resolveDataElementOptions(a+i).radius;return o}parseArrayData(t,e,i,s){const o=super.parseArrayData(t,e,i,s);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=ft(r[2],this.resolveDataElementOptions(a+i).radius)}return o}parseObjectData(t,e,i,s){const o=super.parseObjectData(t,e,i,s);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=ft(r&&r.r&&+r.r,this.resolveDataElementOptions(a+i).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,a=this.getParsed(t),r=s.getLabelForValue(a.x),c=o.getLabelForValue(a.y),u=a._custom;return{label:i[t]||"",value:"("+r+", "+c+(u?", "+u:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:c,includeOptions:u}=this._getSharedOptions(e,s),h=a.axis,p=r.axis;for(let y=e;y<e+i;y++){const g=t[y],x=!o&&this.getParsed(y),w={},S=w[h]=o?a.getPixelForDecimal(.5):a.getPixelForValue(x[h]),O=w[p]=o?r.getBasePixel():r.getPixelForValue(x[p]);w.skip=isNaN(S)||isNaN(O),u&&(w.options=c||this.resolveDataElementOptions(y,g.active?"active":s),o&&(w.options.radius=0)),this.updateElement(g,y,w,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const o=s.radius;return e!=="active"&&(s.radius=0),s.radius+=ft(i&&i._custom,o),s}}q(As,"id","bubble"),q(As,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),q(As,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function mp(n,t,e){let i=1,s=1,o=0,a=0;if(t<At){const r=n,c=r+t,u=Math.cos(r),h=Math.sin(r),p=Math.cos(c),y=Math.sin(c),g=(j,N,C)=>Ti(j,r,c,!0)?1:Math.max(N,N*e,C,C*e),x=(j,N,C)=>Ti(j,r,c,!0)?-1:Math.min(N,N*e,C,C*e),w=g(0,u,p),S=g(Bt,h,y),O=x(Tt,u,p),A=x(Tt+Bt,h,y);i=(w-O)/2,s=(S-A)/2,o=-(w+O)/2,a=-(S+A)/2}return{ratioX:i,ratioY:s,offsetX:o,offsetY:a}}class xn extends ge{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let o=c=>+i[c];if(vt(i[t])){const{key:c="value"}=this._parsing;o=u=>+Je(i[u],c)}let a,r;for(a=t,r=t+e;a<r;++a)s._parsed[a]=o(a)}}_getRotation(){return pe(this.options.rotation-90)}_getCircumference(){return pe(this.options.circumference)}_getRotationExtents(){let t=At,e=-At;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,o=s._getRotation(),a=s._getCircumference();t=Math.min(t,o),e=Math.max(e,o+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,o=s.data,a=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(i.width,i.height)-a)/2,0),c=Math.min(Eh(this.options.cutout,r),1),u=this._getRingWeight(this.index),{circumference:h,rotation:p}=this._getRotationExtents(),{ratioX:y,ratioY:g,offsetX:x,offsetY:w}=mp(p,h,c),S=(i.width-a)/y,O=(i.height-a)/g,A=Math.max(Math.min(S,O)/2,0),j=Wc(this.options.radius,A),N=Math.max(j*c,0),C=(j-N)/this._getVisibleDatasetWeightTotal();this.offsetX=x*j,this.offsetY=w*j,s.total=this.calculateTotal(),this.outerRadius=j-C*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-C*u,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,o=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*o/At)}updateElements(t,e,i,s){const o=s==="reset",a=this.chart,r=a.chartArea,u=a.options.animation,h=(r.left+r.right)/2,p=(r.top+r.bottom)/2,y=o&&u.animateScale,g=y?0:this.innerRadius,x=y?0:this.outerRadius,{sharedOptions:w,includeOptions:S}=this._getSharedOptions(e,s);let O=this._getRotation(),A;for(A=0;A<e;++A)O+=this._circumference(A,o);for(A=e;A<e+i;++A){const j=this._circumference(A,o),N=t[A],C={x:h+this.offsetX,y:p+this.offsetY,startAngle:O,endAngle:O+j,circumference:j,outerRadius:x,innerRadius:g};S&&(C.options=w||this.resolveDataElementOptions(A,N.active?"active":s)),O+=j,this.updateElement(N,A,C,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,s;for(s=0;s<e.length;s++){const o=t._parsed[s];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(i+=Math.abs(o))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?At*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Bi(e._parsed[t],i.options.locale);return{label:s[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,o,a,r,c;if(!t){for(s=0,o=i.data.datasets.length;s<o;++s)if(i.isDatasetVisible(s)){a=i.getDatasetMeta(s),t=a.data,r=a.controller;break}}if(!t)return 0;for(s=0,o=t.length;s<o;++s)c=r.resolveDataElementOptions(s),c.borderAlign!=="inner"&&(e=Math.max(e,c.borderWidth||0,c.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const o=this.resolveDataElementOptions(i);e=Math.max(e,o.offset||0,o.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(ft(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}q(xn,"id","doughnut"),q(xn,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),q(xn,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),q(xn,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((o,a)=>{const c=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:s,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class Ts extends ge{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=e,a=this.chart._animationsDisabled;let{start:r,count:c}=Jc(e,s,a);this._drawStart=r,this._drawCount=c,Qc(e)&&(r=0,c=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const u=this.resolveDatasetElementOptions(t);this.options.showLine||(u.borderWidth=0),u.segment=this.options.segment,this.updateElement(i,void 0,{animated:!a,options:u},t),this.updateElements(s,r,c,t)}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r,_stacked:c,_dataset:u}=this._cachedMeta,{sharedOptions:h,includeOptions:p}=this._getSharedOptions(e,s),y=a.axis,g=r.axis,{spanGaps:x,segment:w}=this.options,S=jn(x)?x:Number.POSITIVE_INFINITY,O=this.chart._animationsDisabled||o||s==="none",A=e+i,j=t.length;let N=e>0&&this.getParsed(e-1);for(let C=0;C<j;++C){const I=t[C],V=O?I:{};if(C<e||C>=A){V.skip=!0;continue}const U=this.getParsed(C),K=yt(U[g]),et=V[y]=a.getPixelForValue(U[y],C),Q=V[g]=o||K?r.getBasePixel():r.getPixelForValue(c?this.applyStack(r,U,c):U[g],C);V.skip=isNaN(et)||isNaN(Q)||K,V.stop=C>0&&Math.abs(U[y]-N[y])>S,w&&(V.parsed=U,V.raw=u.data[C]),p&&(V.options=h||this.resolveDataElementOptions(C,I.active?"active":s)),O||this.updateElement(I,C,V,s),N=U}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),a=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}q(Ts,"id","line"),q(Ts,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),q(Ts,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Si extends ge{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Bi(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:o}}parseObjectData(t,e,i,s){return ad.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const o=this.getParsed(s).r;!isNaN(o)&&this.chart.getDataVisibility(s)&&(o<e.min&&(e.min=o),o>e.max&&(e.max=o))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(s/2,0),a=Math.max(i.cutoutPercentage?o/100*i.cutoutPercentage:1,0),r=(o-a)/t.getVisibleDatasetCount();this.outerRadius=o-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,i,s){const o=s==="reset",a=this.chart,c=a.options.animation,u=this._cachedMeta.rScale,h=u.xCenter,p=u.yCenter,y=u.getIndexAngle(0)-.5*Tt;let g=y,x;const w=360/this.countVisibleElements();for(x=0;x<e;++x)g+=this._computeAngle(x,s,w);for(x=e;x<e+i;x++){const S=t[x];let O=g,A=g+this._computeAngle(x,s,w),j=a.getDataVisibility(x)?u.getDistanceFromCenterForValue(this.getParsed(x).r):0;g=A,o&&(c.animateScale&&(j=0),c.animateRotate&&(O=A=y));const N={x:h,y:p,innerRadius:0,outerRadius:j,startAngle:O,endAngle:A,options:this.resolveDataElementOptions(x,S.active?"active":s)};this.updateElement(S,x,N,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?pe(this.resolveDataElementOptions(t,e).angle||i):0}}q(Si,"id","polarArea"),q(Si,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),q(Si,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((o,a)=>{const c=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:s,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class ga extends xn{}q(ga,"id","pie"),q(ga,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class Ps extends ge{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return ad.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],o=e.iScale.getLabels();if(i.points=s,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:o.length===s.length,options:a};this.updateElement(i,void 0,r,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const o=this._cachedMeta.rScale,a=s==="reset";for(let r=e;r<e+i;r++){const c=t[r],u=this.resolveDataElementOptions(r,c.active?"active":s),h=o.getPointPositionForValue(r,this.getParsed(r).r),p=a?o.xCenter:h.x,y=a?o.yCenter:h.y,g={x:p,y,angle:h.angle,skip:isNaN(p)||isNaN(y),options:u};this.updateElement(c,r,g,s)}}}q(Ps,"id","radar"),q(Ps,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),q(Ps,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class Os extends ge{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,a=this.getParsed(t),r=s.getLabelForValue(a.x),c=o.getLabelForValue(a.y);return{label:i[t]||"",value:"("+r+", "+c+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:o,count:a}=Jc(e,i,s);if(this._drawStart=o,this._drawCount=a,Qc(e)&&(o=0,a=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:c}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!c._decimated,r.points=i;const u=this.resolveDatasetElementOptions(t);u.segment=this.options.segment,this.updateElement(r,void 0,{animated:!s,options:u},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,o,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r,_stacked:c,_dataset:u}=this._cachedMeta,h=this.resolveDataElementOptions(e,s),p=this.getSharedOptions(h),y=this.includeOptions(s,p),g=a.axis,x=r.axis,{spanGaps:w,segment:S}=this.options,O=jn(w)?w:Number.POSITIVE_INFINITY,A=this.chart._animationsDisabled||o||s==="none";let j=e>0&&this.getParsed(e-1);for(let N=e;N<e+i;++N){const C=t[N],I=this.getParsed(N),V=A?C:{},U=yt(I[x]),K=V[g]=a.getPixelForValue(I[g],N),et=V[x]=o||U?r.getBasePixel():r.getPixelForValue(c?this.applyStack(r,I,c):I[x],N);V.skip=isNaN(K)||isNaN(et)||U,V.stop=N>0&&Math.abs(I[g]-j[g])>O,S&&(V.parsed=I,V.raw=u.data[N]),y&&(V.options=p||this.resolveDataElementOptions(N,C.active?"active":s)),A||this.updateElement(C,N,V,s),j=I}this.updateSharedOptions(p,s,h)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let c=e.length-1;c>=0;--c)r=Math.max(r,e[c].size(this.resolveDataElementOptions(c))/2);return r>0&&r}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const o=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,o,a)/2}}q(Os,"id","scatter"),q(Os,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),q(Os,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var yp=Object.freeze({__proto__:null,BarController:$s,BubbleController:As,DoughnutController:xn,LineController:Ts,PieController:ga,PolarAreaController:Si,RadarController:Ps,ScatterController:Os});function gn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class or{constructor(t){q(this,"options");this.options=t||{}}static override(t){Object.assign(or.prototype,t)}init(){}formats(){return gn()}parse(){return gn()}format(){return gn()}add(){return gn()}diff(){return gn()}startOf(){return gn()}endOf(){return gn()}}var bp={_date:or};function vp(n,t,e,i){const{controller:s,data:o,_sorted:a}=n,r=s._cachedMeta.iScale,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&o.length){const u=r._reversePixels?zh:Fe;if(i){if(s._sharedOptions){const h=o[0],p=typeof h.getRange=="function"&&h.getRange(t);if(p){const y=u(o,t,e-p),g=u(o,t,e+p);return{lo:y.lo,hi:g.hi}}}}else{const h=u(o,t,e);if(c){const{vScale:p}=s._cachedMeta,{_parsed:y}=n,g=y.slice(0,h.lo+1).reverse().findIndex(w=>!yt(w[p.axis]));h.lo-=Math.max(0,g);const x=y.slice(h.hi).findIndex(w=>!yt(w[p.axis]));h.hi+=Math.max(0,x)}return h}}return{lo:0,hi:o.length-1}}function to(n,t,e,i,s){const o=n.getSortedVisibleDatasetMetas(),a=e[t];for(let r=0,c=o.length;r<c;++r){const{index:u,data:h}=o[r],{lo:p,hi:y}=vp(o[r],t,a,s);for(let g=p;g<=y;++g){const x=h[g];x.skip||i(x,u,g)}}}function xp(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,a=e?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(a,2))}}function Jo(n,t,e,i,s){const o=[];return!s&&!n.isPointInArea(t)||to(n,e,t,function(r,c,u){!s&&!Ie(r,n.chartArea,0)||r.inRange(t.x,t.y,i)&&o.push({element:r,datasetIndex:c,index:u})},!0),o}function wp(n,t,e,i){let s=[];function o(a,r,c){const{startAngle:u,endAngle:h}=a.getProps(["startAngle","endAngle"],i),{angle:p}=Yc(a,{x:t.x,y:t.y});Ti(p,u,h)&&s.push({element:a,datasetIndex:r,index:c})}return to(n,e,t,o),s}function kp(n,t,e,i,s,o){let a=[];const r=xp(e);let c=Number.POSITIVE_INFINITY;function u(h,p,y){const g=h.inRange(t.x,t.y,s);if(i&&!g)return;const x=h.getCenterPoint(s);if(!(!!o||n.isPointInArea(x))&&!g)return;const S=r(t,x);S<c?(a=[{element:h,datasetIndex:p,index:y}],c=S):S===c&&a.push({element:h,datasetIndex:p,index:y})}return to(n,e,t,u),a}function Qo(n,t,e,i,s,o){return!o&&!n.isPointInArea(t)?[]:e==="r"&&!i?wp(n,t,e,s):kp(n,t,e,i,s,o)}function Ll(n,t,e,i,s){const o=[],a=e==="x"?"inXRange":"inYRange";let r=!1;return to(n,e,t,(c,u,h)=>{c[a]&&c[a](t[e],s)&&(o.push({element:c,datasetIndex:u,index:h}),r=r||c.inRange(t.x,t.y,s))}),i&&!r?[]:o}var _p={modes:{index(n,t,e,i){const s=yn(t,n),o=e.axis||"x",a=e.includeInvisible||!1,r=e.intersect?Jo(n,s,o,i,a):Qo(n,s,o,!1,i,a),c=[];return r.length?(n.getSortedVisibleDatasetMetas().forEach(u=>{const h=r[0].index,p=u.data[h];p&&!p.skip&&c.push({element:p,datasetIndex:u.index,index:h})}),c):[]},dataset(n,t,e,i){const s=yn(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;let r=e.intersect?Jo(n,s,o,i,a):Qo(n,s,o,!1,i,a);if(r.length>0){const c=r[0].datasetIndex,u=n.getDatasetMeta(c).data;r=[];for(let h=0;h<u.length;++h)r.push({element:u[h],datasetIndex:c,index:h})}return r},point(n,t,e,i){const s=yn(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return Jo(n,s,o,i,a)},nearest(n,t,e,i){const s=yn(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return Qo(n,s,o,e.intersect,i,a)},x(n,t,e,i){const s=yn(t,n);return Ll(n,s,"x",e.intersect,i)},y(n,t,e,i){const s=yn(t,n);return Ll(n,s,"y",e.intersect,i)}}};const yd=["left","top","right","bottom"];function li(n,t){return n.filter(e=>e.pos===t)}function Bl(n,t){return n.filter(e=>yd.indexOf(e.pos)===-1&&e.box.axis===t)}function ci(n,t){return n.sort((e,i)=>{const s=t?i:e,o=t?e:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Sp(n){const t=[];let e,i,s,o,a,r;for(e=0,i=(n||[]).length;e<i;++e)s=n[e],{position:o,options:{stack:a,stackWeight:r=1}}=s,t.push({index:e,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:a&&o+a,stackWeight:r});return t}function Dp(n){const t={};for(const e of n){const{stack:i,pos:s,stackWeight:o}=e;if(!i||!yd.includes(s))continue;const a=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=o}return t}function Cp(n,t){const e=Dp(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,a,r;for(o=0,a=n.length;o<a;++o){r=n[o];const{fullSize:c}=r.box,u=e[r.stack],h=u&&r.stackWeight/u.weight;r.horizontal?(r.width=h?h*i:c&&t.availableWidth,r.height=s):(r.width=i,r.height=h?h*s:c&&t.availableHeight)}return e}function Ep(n){const t=Sp(n),e=ci(t.filter(u=>u.box.fullSize),!0),i=ci(li(t,"left"),!0),s=ci(li(t,"right")),o=ci(li(t,"top"),!0),a=ci(li(t,"bottom")),r=Bl(t,"x"),c=Bl(t,"y");return{fullSize:e,leftAndTop:i.concat(o),rightAndBottom:s.concat(c).concat(a).concat(r),chartArea:li(t,"chartArea"),vertical:i.concat(s).concat(c),horizontal:o.concat(a).concat(r)}}function Nl(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function bd(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function Mp(n,t,e,i){const{pos:s,box:o}=e,a=n.maxPadding;if(!vt(s)){e.size&&(n[s]-=e.size);const p=i[e.stack]||{size:0,count:1};p.size=Math.max(p.size,e.horizontal?o.height:o.width),e.size=p.size/p.count,n[s]+=e.size}o.getPadding&&bd(a,o.getPadding());const r=Math.max(0,t.outerWidth-Nl(a,n,"left","right")),c=Math.max(0,t.outerHeight-Nl(a,n,"top","bottom")),u=r!==n.w,h=c!==n.h;return n.w=r,n.h=c,e.horizontal?{same:u,other:h}:{same:h,other:u}}function $p(n){const t=n.maxPadding;function e(i){const s=Math.max(t[i]-n[i],0);return n[i]+=s,s}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function Ap(n,t){const e=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(a=>{o[a]=Math.max(t[a],e[a])}),o}return i(n?["left","right"]:["top","bottom"])}function pi(n,t,e,i){const s=[];let o,a,r,c,u,h;for(o=0,a=n.length,u=0;o<a;++o){r=n[o],c=r.box,c.update(r.width||t.w,r.height||t.h,Ap(r.horizontal,t));const{same:p,other:y}=Mp(t,e,r,i);u|=p&&s.length,h=h||y,c.fullSize||s.push(r)}return u&&pi(s,t,e,i)||h}function vs(n,t,e,i,s){n.top=e,n.left=t,n.right=t+i,n.bottom=e+s,n.width=i,n.height=s}function zl(n,t,e,i){const s=e.padding;let{x:o,y:a}=t;for(const r of n){const c=r.box,u=i[r.stack]||{placed:0,weight:1},h=r.stackWeight/u.weight||1;if(r.horizontal){const p=t.w*h,y=u.size||c.height;Ai(u.start)&&(a=u.start),c.fullSize?vs(c,s.left,a,e.outerWidth-s.right-s.left,y):vs(c,t.left+u.placed,a,p,y),u.start=a,u.placed+=p,a=c.bottom}else{const p=t.h*h,y=u.size||c.width;Ai(u.start)&&(o=u.start),c.fullSize?vs(c,o,s.top,y,e.outerHeight-s.bottom-s.top):vs(c,o,t.top+u.placed,y,p),u.start=o,u.placed+=p,o=c.right}}t.x=o,t.y=a}var Qt={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;const s=Zt(n.options.layout.padding),o=Math.max(t-s.width,0),a=Math.max(e-s.height,0),r=Ep(n.boxes),c=r.vertical,u=r.horizontal;Dt(n.boxes,w=>{typeof w.beforeLayout=="function"&&w.beforeLayout()});const h=c.reduce((w,S)=>S.box.options&&S.box.options.display===!1?w:w+1,0)||1,p=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/h,hBoxMaxHeight:a/2}),y=Object.assign({},s);bd(y,Zt(i));const g=Object.assign({maxPadding:y,w:o,h:a,x:s.left,y:s.top},s),x=Cp(c.concat(u),p);pi(r.fullSize,g,p,x),pi(c,g,p,x),pi(u,g,p,x)&&pi(c,g,p,x),$p(g),zl(r.leftAndTop,g,p,x),g.x+=g.w,g.y+=g.h,zl(r.rightAndBottom,g,p,x),n.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},Dt(r.chartArea,w=>{const S=w.box;Object.assign(S,n.chartArea),S.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class vd{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class Tp extends vd{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Fs="$chartjs",Pp={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Hl=n=>n===null||n==="";function Op(n,t){const e=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[Fs]={initial:{height:i,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Hl(s)){const o=Sl(n,"width");o!==void 0&&(n.width=o)}if(Hl(i))if(n.style.height==="")n.height=n.width/(t||2);else{const o=Sl(n,"height");o!==void 0&&(n.height=o)}return n}const xd=Ff?{passive:!0}:!1;function Fp(n,t,e){n&&n.addEventListener(t,e,xd)}function Ip(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,xd)}function Rp(n,t){const e=Pp[n.type]||n.type,{x:i,y:s}=yn(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function Us(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function Lp(n,t,e){const i=n.canvas,s=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Us(r.addedNodes,i),a=a&&!Us(r.removedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function Bp(n,t,e){const i=n.canvas,s=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Us(r.removedNodes,i),a=a&&!Us(r.addedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}const Oi=new Map;let jl=0;function wd(){const n=window.devicePixelRatio;n!==jl&&(jl=n,Oi.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function Np(n,t){Oi.size||window.addEventListener("resize",wd),Oi.set(n,t)}function zp(n){Oi.delete(n),Oi.size||window.removeEventListener("resize",wd)}function Hp(n,t,e){const i=n.canvas,s=i&&sr(i);if(!s)return;const o=Gc((r,c)=>{const u=s.clientWidth;e(r,c),u<s.clientWidth&&e()},window),a=new ResizeObserver(r=>{const c=r[0],u=c.contentRect.width,h=c.contentRect.height;u===0&&h===0||o(u,h)});return a.observe(s),Np(n,o),a}function Zo(n,t,e){e&&e.disconnect(),t==="resize"&&zp(n)}function jp(n,t,e){const i=n.canvas,s=Gc(o=>{n.ctx!==null&&e(Rp(o,n))},n);return Fp(i,t,s),s}class Wp extends vd{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Op(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[Fs])return!1;const i=e[Fs].initial;["height","width"].forEach(o=>{const a=i[o];yt(a)?e.removeAttribute(o):e.setAttribute(o,a)});const s=i.style||{};return Object.keys(s).forEach(o=>{e.style[o]=s[o]}),e.width=e.width,delete e[Fs],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),a={attach:Lp,detach:Bp,resize:Hp}[e]||jp;s[e]=a(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:Zo,detach:Zo,resize:Zo}[e]||Ip)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return Of(t,e,i,s)}isAttached(t){const e=t&&sr(t);return!!(e&&e.isConnected)}}function Vp(n){return!ir()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?Tp:Wp}class me{constructor(){q(this,"x");q(this,"y");q(this,"active",!1);q(this,"options");q(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return jn(this.x)&&jn(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}q(me,"defaults",{}),q(me,"defaultRoutes");function Up(n,t){const e=n.options.ticks,i=Yp(n),s=Math.min(e.maxTicksLimit||i,i),o=e.major.enabled?Kp(t):[],a=o.length,r=o[0],c=o[a-1],u=[];if(a>s)return Xp(t,u,o,a/s),u;const h=qp(o,t,s);if(a>0){let p,y;const g=a>1?Math.round((c-r)/(a-1)):null;for(xs(t,u,h,yt(g)?0:r-g,r),p=0,y=a-1;p<y;p++)xs(t,u,h,o[p],o[p+1]);return xs(t,u,h,c,yt(g)?t.length:c+g),u}return xs(t,u,h),u}function Yp(n){const t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),s=n._maxLength/e;return Math.floor(Math.min(i,s))}function qp(n,t,e){const i=Gp(n),s=t.length/e;if(!i)return Math.max(s,1);const o=Ih(i);for(let a=0,r=o.length-1;a<r;a++){const c=o[a];if(c>s)return c}return Math.max(s,1)}function Kp(n){const t=[];let e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function Xp(n,t,e,i){let s=0,o=e[0],a;for(i=Math.ceil(i),a=0;a<n.length;a++)a===o&&(t.push(n[a]),s++,o=e[s*i])}function xs(n,t,e,i,s){const o=ft(i,0),a=Math.min(ft(s,n.length),n.length);let r=0,c,u,h;for(e=Math.ceil(e),s&&(c=s-i,e=c/Math.floor(c/e)),h=o;h<0;)r++,h=Math.round(o+r*e);for(u=Math.max(o,0);u<a;u++)u===h&&(t.push(n[u]),r++,h=Math.round(o+r*e))}function Gp(n){const t=n.length;let e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}const Jp=n=>n==="left"?"right":n==="right"?"left":n,Wl=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,Vl=(n,t)=>Math.min(t||n,n);function Ul(n,t){const e=[],i=n.length/t,s=n.length;let o=0;for(;o<s;o+=i)e.push(n[Math.floor(o)]);return e}function Qp(n,t,e){const i=n.ticks.length,s=Math.min(t,i-1),o=n._startPixel,a=n._endPixel,r=1e-6;let c=n.getPixelForTick(s),u;if(!(e&&(i===1?u=Math.max(c-o,a-c):t===0?u=(n.getPixelForTick(1)-c)/2:u=(c-n.getPixelForTick(s-1))/2,c+=s<t?u:-u,c<o-r||c>a+r)))return c}function Zp(n,t){Dt(n,e=>{const i=e.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete e.data[i[o]];i.splice(0,s)}})}function di(n){return n.drawTicks?n.tickLength:0}function Yl(n,t){if(!n.display)return 0;const e=zt(n.font,t),i=Zt(n.padding);return(Ot(n.text)?n.text.length:1)*e.lineHeight+i.height}function tg(n,t){return Ze(n,{scale:t,type:"scale"})}function eg(n,t,e){return Ze(n,{tick:e,index:t,type:"tick"})}function ng(n,t,e){let i=Ja(n);return(e&&t!=="right"||!e&&t==="right")&&(i=Jp(i)),i}function ig(n,t,e,i){const{top:s,left:o,bottom:a,right:r,chart:c}=n,{chartArea:u,scales:h}=c;let p=0,y,g,x;const w=a-s,S=r-o;if(n.isHorizontal()){if(g=Jt(i,o,r),vt(e)){const O=Object.keys(e)[0],A=e[O];x=h[O].getPixelForValue(A)+w-t}else e==="center"?x=(u.bottom+u.top)/2+w-t:x=Wl(n,e,t);y=r-o}else{if(vt(e)){const O=Object.keys(e)[0],A=e[O];g=h[O].getPixelForValue(A)-S+t}else e==="center"?g=(u.left+u.right)/2-S+t:g=Wl(n,e,t);x=Jt(i,a,s),p=e==="left"?-Bt:Bt}return{titleX:g,titleY:x,maxWidth:y,rotation:p}}class En extends me{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=le(t,Number.POSITIVE_INFINITY),e=le(e,Number.NEGATIVE_INFINITY),i=le(i,Number.POSITIVE_INFINITY),s=le(s,Number.NEGATIVE_INFINITY),{min:le(t,i),max:le(e,s),minDefined:It(t),maxDefined:It(e)}}getMinMax(t){let{min:e,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),a;if(s&&o)return{min:e,max:i};const r=this.getMatchingVisibleMetas();for(let c=0,u=r.length;c<u;++c)a=r[c].controller.getMinMax(this,t),s||(e=Math.min(e,a.min)),o||(i=Math.max(i,a.max));return e=o&&e>i?i:e,i=s&&e>i?e:i,{min:le(e,le(i,e)),max:le(i,le(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Mt(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:o,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=uf(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=r<this.ticks.length;this._convertTicksToLabels(c?Ul(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=Up(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Mt(this.options.afterUpdate,[this])}beforeSetDimensions(){Mt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Mt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Mt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Mt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=Mt(e.callback,[o.value,i,t],this)}afterTickToLabelConversion(){Mt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Mt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=Vl(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,o=e.maxRotation;let a=s,r,c,u;if(!this._isVisible()||!e.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const h=this._getLabelSizes(),p=h.widest.width,y=h.highest.height,g=Ut(this.chart.width-p,0,this.maxWidth);r=t.offset?this.maxWidth/i:g/(i-1),p+6>r&&(r=g/(i-(t.offset?.5:1)),c=this.maxHeight-di(t.grid)-e.padding-Yl(t.title,this.chart.options.font),u=Math.sqrt(p*p+y*y),a=Xa(Math.min(Math.asin(Ut((h.highest.height+6)/r,-1,1)),Math.asin(Ut(c/u,-1,1))-Math.asin(Ut(y/u,-1,1)))),a=Math.max(s,Math.min(o,a))),this.labelRotation=a}afterCalculateLabelRotation(){Mt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Mt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:o}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const c=Yl(s,e.options.font);if(r?(t.width=this.maxWidth,t.height=di(o)+c):(t.height=this.maxHeight,t.width=di(o)+c),i.display&&this.ticks.length){const{first:u,last:h,widest:p,highest:y}=this._getLabelSizes(),g=i.padding*2,x=pe(this.labelRotation),w=Math.cos(x),S=Math.sin(x);if(r){const O=i.mirror?0:S*p.width+w*y.height;t.height=Math.min(this.maxHeight,t.height+O+g)}else{const O=i.mirror?0:w*p.width+S*y.height;t.width=Math.min(this.maxWidth,t.width+O+g)}this._calculatePadding(u,h,S,w)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:o,padding:a},position:r}=this.options,c=this.labelRotation!==0,u=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,p=this.right-this.getPixelForTick(this.ticks.length-1);let y=0,g=0;c?u?(y=s*t.width,g=i*e.height):(y=i*t.height,g=s*e.width):o==="start"?g=e.width:o==="end"?y=t.width:o!=="inner"&&(y=t.width/2,g=e.width/2),this.paddingLeft=Math.max((y-h+a)*this.width/(this.width-h),0),this.paddingRight=Math.max((g-p+a)*this.width/(this.width-p),0)}else{let h=e.height/2,p=t.height/2;o==="start"?(h=0,p=t.height):o==="end"&&(h=e.height,p=0),this.paddingTop=h+a,this.paddingBottom=p+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Mt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)yt(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=Ul(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:s,_longestTextCache:o}=this,a=[],r=[],c=Math.floor(e/Vl(e,i));let u=0,h=0,p,y,g,x,w,S,O,A,j,N,C;for(p=0;p<e;p+=c){if(x=t[p].label,w=this._resolveTickFontOptions(p),s.font=S=w.string,O=o[S]=o[S]||{data:{},gc:[]},A=w.lineHeight,j=N=0,!yt(x)&&!Ot(x))j=Ws(s,O.data,O.gc,j,x),N=A;else if(Ot(x))for(y=0,g=x.length;y<g;++y)C=x[y],!yt(C)&&!Ot(C)&&(j=Ws(s,O.data,O.gc,j,C),N+=A);a.push(j),r.push(N),u=Math.max(j,u),h=Math.max(N,h)}Zp(o,e);const I=a.indexOf(u),V=r.indexOf(h),U=K=>({width:a[K]||0,height:r[K]||0});return{first:U(0),last:U(e-1),widest:U(I),highest:U(V),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Nh(this._alignToPixels?pn(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=eg(this.getContext(),t,i))}return this.$context||(this.$context=tg(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=pe(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),o=this._getLabelSizes(),a=t.autoSkipPadding||0,r=o?o.widest.width+a:0,c=o?o.highest.height+a:0;return this.isHorizontal()?c*i>r*s?r/i:c/s:c*s<r*i?c/i:r/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:o,position:a,border:r}=s,c=o.offset,u=this.isHorizontal(),p=this.ticks.length+(c?1:0),y=di(o),g=[],x=r.setContext(this.getContext()),w=x.display?x.width:0,S=w/2,O=function(bt){return pn(i,bt,w)};let A,j,N,C,I,V,U,K,et,Q,ot,dt;if(a==="top")A=O(this.bottom),V=this.bottom-y,K=A-S,Q=O(t.top)+S,dt=t.bottom;else if(a==="bottom")A=O(this.top),Q=t.top,dt=O(t.bottom)-S,V=A+S,K=this.top+y;else if(a==="left")A=O(this.right),I=this.right-y,U=A-S,et=O(t.left)+S,ot=t.right;else if(a==="right")A=O(this.left),et=t.left,ot=O(t.right)-S,I=A+S,U=this.left+y;else if(e==="x"){if(a==="center")A=O((t.top+t.bottom)/2+.5);else if(vt(a)){const bt=Object.keys(a)[0],Ct=a[bt];A=O(this.chart.scales[bt].getPixelForValue(Ct))}Q=t.top,dt=t.bottom,V=A+S,K=V+y}else if(e==="y"){if(a==="center")A=O((t.left+t.right)/2);else if(vt(a)){const bt=Object.keys(a)[0],Ct=a[bt];A=O(this.chart.scales[bt].getPixelForValue(Ct))}I=A-S,U=I-y,et=t.left,ot=t.right}const wt=ft(s.ticks.maxTicksLimit,p),ct=Math.max(1,Math.ceil(p/wt));for(j=0;j<p;j+=ct){const bt=this.getContext(j),Ct=o.setContext(bt),kt=r.setContext(bt),_t=Ct.lineWidth,Ht=Ct.color,ye=kt.dash||[],be=kt.dashOffset,qt=Ct.tickWidth,ve=Ct.tickColor,xe=Ct.tickBorderDash||[],ee=Ct.tickBorderDashOffset;N=Qp(this,j,c),N!==void 0&&(C=pn(i,N,_t),u?I=U=et=ot=C:V=K=Q=dt=C,g.push({tx1:I,ty1:V,tx2:U,ty2:K,x1:et,y1:Q,x2:ot,y2:dt,width:_t,color:Ht,borderDash:ye,borderDashOffset:be,tickWidth:qt,tickColor:ve,tickBorderDash:xe,tickBorderDashOffset:ee}))}return this._ticksLength=p,this._borderValue=A,g}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:o}=i,a=this.isHorizontal(),r=this.ticks,{align:c,crossAlign:u,padding:h,mirror:p}=o,y=di(i.grid),g=y+h,x=p?-h:g,w=-pe(this.labelRotation),S=[];let O,A,j,N,C,I,V,U,K,et,Q,ot,dt="middle";if(s==="top")I=this.bottom-x,V=this._getXAxisLabelAlignment();else if(s==="bottom")I=this.top+x,V=this._getXAxisLabelAlignment();else if(s==="left"){const ct=this._getYAxisLabelAlignment(y);V=ct.textAlign,C=ct.x}else if(s==="right"){const ct=this._getYAxisLabelAlignment(y);V=ct.textAlign,C=ct.x}else if(e==="x"){if(s==="center")I=(t.top+t.bottom)/2+g;else if(vt(s)){const ct=Object.keys(s)[0],bt=s[ct];I=this.chart.scales[ct].getPixelForValue(bt)+g}V=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")C=(t.left+t.right)/2-g;else if(vt(s)){const ct=Object.keys(s)[0],bt=s[ct];C=this.chart.scales[ct].getPixelForValue(bt)}V=this._getYAxisLabelAlignment(y).textAlign}e==="y"&&(c==="start"?dt="top":c==="end"&&(dt="bottom"));const wt=this._getLabelSizes();for(O=0,A=r.length;O<A;++O){j=r[O],N=j.label;const ct=o.setContext(this.getContext(O));U=this.getPixelForTick(O)+o.labelOffset,K=this._resolveTickFontOptions(O),et=K.lineHeight,Q=Ot(N)?N.length:1;const bt=Q/2,Ct=ct.color,kt=ct.textStrokeColor,_t=ct.textStrokeWidth;let Ht=V;a?(C=U,V==="inner"&&(O===A-1?Ht=this.options.reverse?"left":"right":O===0?Ht=this.options.reverse?"right":"left":Ht="center"),s==="top"?u==="near"||w!==0?ot=-Q*et+et/2:u==="center"?ot=-wt.highest.height/2-bt*et+et:ot=-wt.highest.height+et/2:u==="near"||w!==0?ot=et/2:u==="center"?ot=wt.highest.height/2-bt*et:ot=wt.highest.height-Q*et,p&&(ot*=-1),w!==0&&!ct.showLabelBackdrop&&(C+=et/2*Math.sin(w))):(I=U,ot=(1-Q)*et/2);let ye;if(ct.showLabelBackdrop){const be=Zt(ct.backdropPadding),qt=wt.heights[O],ve=wt.widths[O];let xe=ot-be.top,ee=0-be.left;switch(dt){case"middle":xe-=qt/2;break;case"bottom":xe-=qt;break}switch(V){case"center":ee-=ve/2;break;case"right":ee-=ve;break;case"inner":O===A-1?ee-=ve:O>0&&(ee-=ve/2);break}ye={left:ee,top:xe,width:ve+be.width,height:qt+be.height,color:ct.backdropColor}}S.push({label:N,font:K,textOffset:ot,options:{rotation:w,color:Ct,strokeColor:kt,strokeWidth:_t,textAlign:Ht,textBaseline:dt,translation:[C,I],backdrop:ye}})}return S}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-pe(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,a=this._getLabelSizes(),r=t+o,c=a.widest.width;let u,h;return e==="left"?s?(h=this.right+o,i==="near"?u="left":i==="center"?(u="center",h+=c/2):(u="right",h+=c)):(h=this.right-r,i==="near"?u="right":i==="center"?(u="center",h-=c/2):(u="left",h=this.left)):e==="right"?s?(h=this.left+o,i==="near"?u="right":i==="center"?(u="center",h-=c/2):(u="left",h-=c)):(h=this.left+r,i==="near"?u="left":i==="center"?(u="center",h+=c/2):(u="right",h=this.right)):u="right",{textAlign:u,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:o,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,o,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,a;const r=(c,u,h)=>{!h.width||!h.color||(i.save(),i.lineWidth=h.width,i.strokeStyle=h.color,i.setLineDash(h.borderDash||[]),i.lineDashOffset=h.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(u.x,u.y),i.stroke(),i.restore())};if(e.display)for(o=0,a=s.length;o<a;++o){const c=s[o];e.drawOnChartArea&&r({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),e.drawTicks&&r({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),a=i.display?o.width:0;if(!a)return;const r=s.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let u,h,p,y;this.isHorizontal()?(u=pn(t,this.left,a)-a/2,h=pn(t,this.right,r)+r/2,p=y=c):(p=pn(t,this.top,a)-a/2,y=pn(t,this.bottom,r)+r/2,u=h=c),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(u,p),e.lineTo(h,y),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Js(i,s);const o=this.getLabelItems(t);for(const a of o){const r=a.options,c=a.font,u=a.label,h=a.textOffset;Cn(i,u,0,h,c,r)}s&&Qs(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const o=zt(i.font),a=Zt(i.padding),r=i.align;let c=o.lineHeight/2;e==="bottom"||e==="center"||vt(e)?(c+=a.bottom,Ot(i.text)&&(c+=o.lineHeight*(i.text.length-1))):c+=a.top;const{titleX:u,titleY:h,maxWidth:p,rotation:y}=ig(this,c,e,r);Cn(t,i.text,0,0,o,{color:i.color,maxWidth:p,rotation:y,textAlign:ng(r,e,s),textBaseline:"middle",translation:[u,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=ft(t.grid&&t.grid.z,-1),s=ft(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==En.prototype.draw?[{z:e,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,a;for(o=0,a=e.length;o<a;++o){const r=e[o];r[i]===this.id&&(!t||r.type===t)&&s.push(r)}return s}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return zt(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class ws{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;ag(e)&&(i=this.register(e));const s=this.items,o=t.id,a=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,sg(t,a,i),this.override&&Ft.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in Ft[s]&&(delete Ft[s][i],this.override&&delete Dn[i])}}function sg(n,t,e){const i=$i(Object.create(null),[e?Ft.get(e):{},Ft.get(t),n.defaults]);Ft.set(t,i),n.defaultRoutes&&og(t,n.defaultRoutes),n.descriptors&&Ft.describe(t,n.descriptors)}function og(n,t){Object.keys(t).forEach(e=>{const i=e.split("."),s=i.pop(),o=[n].concat(i).join("."),a=t[e].split("."),r=a.pop(),c=a.join(".");Ft.route(o,s,c,r)})}function ag(n){return"id"in n&&"defaults"in n}class rg{constructor(){this.controllers=new ws(ge,"datasets",!0),this.elements=new ws(me,"elements"),this.plugins=new ws(Object,"plugins"),this.scales=new ws(En,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):Dt(s,a=>{const r=i||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,e,i){const s=Ka(t);Mt(i["before"+s],[],i),e[t](i),Mt(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var De=new rg;class lg{constructor(){this._init=[]}notify(t,e,i,s){e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install"));const o=s?this._descriptors(t).filter(s):this._descriptors(t),a=this._notify(o,t,e,i);return e==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall")),a}_notify(t,e,i,s){s=s||{};for(const o of t){const a=o.plugin,r=a[i],c=[e,s,o.options];if(Mt(r,c,a)===!1&&s.cancelable)return!1}return!0}invalidate(){yt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=ft(i.options&&i.options.plugins,{}),o=cg(i);return s===!1&&!e?[]:ug(t,o,s,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(o,a)=>o.filter(r=>!a.some(c=>r.plugin.id===c.plugin.id));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function cg(n){const t={},e=[],i=Object.keys(De.plugins.items);for(let o=0;o<i.length;o++)e.push(De.getPlugin(i[o]));const s=n.plugins||[];for(let o=0;o<s.length;o++){const a=s[o];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function dg(n,t){return!t&&n===!1?null:n===!0?{}:n}function ug(n,{plugins:t,localIds:e},i,s){const o=[],a=n.getContext();for(const r of t){const c=r.id,u=dg(i[c],s);u!==null&&o.push({plugin:r,options:hg(n.config,{plugin:r,local:e[c]},u,a)})}return o}function hg(n,{plugin:t,local:e},i,s){const o=n.pluginScopeKeys(t),a=n.getOptionScopes(i,o);return e&&t.defaults&&a.push(t.defaults),n.createResolver(a,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ma(n,t){const e=Ft.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function fg(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function pg(n,t){return n===t?"_index_":"_value_"}function ql(n){if(n==="x"||n==="y"||n==="r")return n}function gg(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function ya(n,...t){if(ql(n))return n;for(const e of t){const i=e.axis||gg(e.position)||n.length>1&&ql(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function Kl(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function mg(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return Kl(n,"x",e[0])||Kl(n,"y",e[0])}return{}}function yg(n,t){const e=Dn[n.type]||{scales:{}},i=t.scales||{},s=ma(n.type,t),o=Object.create(null);return Object.keys(i).forEach(a=>{const r=i[a];if(!vt(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const c=ya(a,r,mg(a,n),Ft.scales[r.type]),u=pg(c,s),h=e.scales||{};o[a]=xi(Object.create(null),[{axis:c},r,h[c],h[u]])}),n.data.datasets.forEach(a=>{const r=a.type||n.type,c=a.indexAxis||ma(r,t),h=(Dn[r]||{}).scales||{};Object.keys(h).forEach(p=>{const y=fg(p,c),g=a[y+"AxisID"]||y;o[g]=o[g]||Object.create(null),xi(o[g],[{axis:y},i[g],h[p]])})}),Object.keys(o).forEach(a=>{const r=o[a];xi(r,[Ft.scales[r.type],Ft.scale])}),o}function kd(n){const t=n.options||(n.options={});t.plugins=ft(t.plugins,{}),t.scales=yg(n,t)}function _d(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function bg(n){return n=n||{},n.data=_d(n.data),kd(n),n}const Xl=new Map,Sd=new Set;function ks(n,t){let e=Xl.get(n);return e||(e=t(),Xl.set(n,e),Sd.add(e)),e}const ui=(n,t,e)=>{const i=Je(t,e);i!==void 0&&n.add(i)};class vg{constructor(t){this._config=bg(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=_d(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),kd(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return ks(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return ks(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return ks(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return ks(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return(!s||e)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:o}=this,a=this._cachedScopes(t,i),r=a.get(e);if(r)return r;const c=new Set;e.forEach(h=>{t&&(c.add(t),h.forEach(p=>ui(c,t,p))),h.forEach(p=>ui(c,s,p)),h.forEach(p=>ui(c,Dn[o]||{},p)),h.forEach(p=>ui(c,Ft,p)),h.forEach(p=>ui(c,fa,p))});const u=Array.from(c);return u.length===0&&u.push(Object.create(null)),Sd.has(e)&&a.set(e,u),u}chartOptionScopes(){const{options:t,type:e}=this;return[t,Dn[e]||{},Ft.datasets[e]||{},{type:e},Ft,fa]}resolveNamedOptions(t,e,i,s=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=Gl(this._resolverCache,t,s);let c=a;if(wg(a,e)){o.$shared=!1,i=Qe(i)?i():i;const u=this.createResolver(t,i,r);c=Wn(a,i,u)}for(const u of e)o[u]=c[u];return o}createResolver(t,e,i=[""],s){const{resolver:o}=Gl(this._resolverCache,t,i);return vt(e)?Wn(o,e,void 0,s):o}}function Gl(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));const s=e.join();let o=i.get(s);return o||(o={resolver:tr(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},i.set(s,o)),o}const xg=n=>vt(n)&&Object.getOwnPropertyNames(n).some(t=>Qe(n[t]));function wg(n,t){const{isScriptable:e,isIndexable:i}=nd(n);for(const s of t){const o=e(s),a=i(s),r=(a||o)&&n[s];if(o&&(Qe(r)||xg(r))||a&&Ot(r))return!0}return!1}var kg="4.4.9";const _g=["top","bottom","left","right","chartArea"];function Jl(n,t){return n==="top"||n==="bottom"||_g.indexOf(n)===-1&&t==="x"}function Ql(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function Zl(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),Mt(e&&e.onComplete,[n],t)}function Sg(n){const t=n.chart,e=t.options.animation;Mt(e&&e.onProgress,[n],t)}function Dd(n){return ir()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const Is={},tc=n=>{const t=Dd(n);return Object.values(Is).filter(e=>e.canvas===t).pop()};function Dg(n,t,e){const i=Object.keys(n);for(const s of i){const o=+s;if(o>=t){const a=n[s];delete n[s],(e>0||o>t)&&(n[o+e]=a)}}}function Cg(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}class se{static register(...t){De.add(...t),ec()}static unregister(...t){De.remove(...t),ec()}constructor(t,e){const i=this.config=new vg(e),s=Dd(t),o=tc(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||Vp(s)),this.platform.updateConfig(i);const r=this.platform.acquireContext(s,a.aspectRatio),c=r&&r.canvas,u=c&&c.height,h=c&&c.width;if(this.id=Ch(),this.ctx=r,this.canvas=c,this.width=h,this.height=u,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new lg,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Wh(p=>this.update(p),a.resizeDelay||0),this._dataChanges=[],Is[this.id]=this,!r||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Ae.listen(this,"complete",Zl),Ae.listen(this,"progress",Sg),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:o}=this;return yt(t)?e&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return De}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():_l(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return xl(this.canvas,this.ctx),this}stop(){return Ae.stop(this),this}resize(t,e){Ae.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(s,t,e,o),r=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,_l(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),Mt(i.onResize,[this,a],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};Dt(e,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce((a,r)=>(a[r]=!1,a),{});let o=[];e&&(o=o.concat(Object.keys(e).map(a=>{const r=e[a],c=ya(a,r),u=c==="r",h=c==="x";return{options:r,dposition:u?"chartArea":h?"bottom":"left",dtype:u?"radialLinear":h?"category":"linear"}}))),Dt(o,a=>{const r=a.options,c=r.id,u=ya(c,r),h=ft(r.type,a.dtype);(r.position===void 0||Jl(r.position,u)!==Jl(a.dposition))&&(r.position=a.dposition),s[c]=!0;let p=null;if(c in i&&i[c].type===h)p=i[c];else{const y=De.getScale(h);p=new y({id:c,type:h,ctx:this.ctx,chart:this}),i[p.id]=p}p.init(r,t)}),Dt(s,(a,r)=>{a||delete i[r]}),Dt(i,a=>{Qt.configure(this,a,a.options),Qt.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>e){for(let s=e;s<i;++s)this._destroyDatasetMeta(s);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(Ql("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,s)=>{e.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const o=e[i];let a=this.getDatasetMeta(i);const r=o.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=r,a.indexAxis=o.indexAxis||ma(r,this.options),a.order=o.order||0,a.index=i,a.label=""+o.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const c=De.getController(r),{datasetElementType:u,dataElementType:h}=Ft.datasets[r];Object.assign(c,{dataElementType:De.getElement(h),datasetElementType:u&&De.getElement(u)}),a.controller=new c(this,i),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){Dt(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let u=0,h=this.data.datasets.length;u<h;u++){const{controller:p}=this.getDatasetMeta(u),y=!s&&o.indexOf(p)===-1;p.buildOrUpdateElements(y),a=Math.max(+p.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),s||Dt(o,u=>{u.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Ql("z","_idx"));const{_active:r,_lastEvent:c}=this;c?this._eventHandler(c,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){Dt(this.scales,t=>{Qt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!ul(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of e){const a=i==="_removeElements"?-o:o;Dg(t,s,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=o=>new Set(t.filter(a=>a[0]===o).map((a,r)=>r+","+a.splice(1).join(","))),s=i(0);for(let o=1;o<e;o++)if(!ul(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Qt.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],Dt(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Qe(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Ae.has(this)?this.attached&&!Ae.running(this)&&Ae.start(this):(this.draw(),Zl({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,o;for(s=0,o=e.length;s<o;++s){const a=e[s];(!t||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=fd(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Js(e,s),t.controller.draw(),s&&Qs(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Ie(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const o=_p.modes[e];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Ze(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),a=o.controller._resolveAnimations(void 0,s);Ai(e)?(o.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),a.update(o,{visible:i}),this.update(r=>r.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Ae.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),xl(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete Is[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(o,a)=>{e.addEventListener(this,o,a),t[o]=a},s=(o,a,r)=>{o.offsetX=a,o.offsetY=r,this._eventHandler(o)};Dt(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(c,u)=>{e.addEventListener(this,c,u),t[c]=u},s=(c,u)=>{t[c]&&(e.removeEventListener(this,c,u),delete t[c])},o=(c,u)=>{this.canvas&&this.resize(c,u)};let a;const r=()=>{s("attach",r),this.attached=!0,this.resize(),i("resize",o),i("detach",a)};a=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",r)},e.isAttached(this.canvas)?r():a()}unbindEvents(){Dt(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},Dt(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let o,a,r,c;for(e==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),r=0,c=t.length;r<c;++r){a=t[r];const u=a&&this.getDatasetMeta(a.datasetIndex).controller;u&&u[s+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:o,index:a})=>{const r=this.getDatasetMeta(o);if(!r)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:r.data[a],index:a}});!zs(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const s=this.options.hover,o=(c,u)=>c.filter(h=>!u.some(p=>h.datasetIndex===p.datasetIndex&&h.index===p.index)),a=o(e,t),r=i?t:o(t,e);a.length&&this.updateHoverStyle(a,s.mode,!1),r.length&&s.mode&&this.updateHoverStyle(r,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:o}=this,a=e,r=this._getActiveElements(t,s,i,a),c=Ph(t),u=Cg(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Mt(o.onHover,[t,r,this],this),c&&Mt(o.onClick,[t,r,this],this));const h=!zs(r,s);return(h||e)&&(this._active=r,this._updateHoverStyles(r,s,e)),this._lastEvent=u,h}_getActiveElements(t,e,i,s){if(t.type==="mouseout")return[];if(!i)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}q(se,"defaults",Ft),q(se,"instances",Is),q(se,"overrides",Dn),q(se,"registry",De),q(se,"version",kg),q(se,"getChart",tc);function ec(){return Dt(se.instances,n=>n._plugins.invalidate())}function Eg(n,t,e){const{startAngle:i,pixelMargin:s,x:o,y:a,outerRadius:r,innerRadius:c}=t;let u=s/r;n.beginPath(),n.arc(o,a,r,i-u,e+u),c>s?(u=s/c,n.arc(o,a,c,e+u,i-u,!0)):n.arc(o,a,s,e+Bt,i-Bt),n.closePath(),n.clip()}function Mg(n){return Za(n,["outerStart","outerEnd","innerStart","innerEnd"])}function $g(n,t,e,i){const s=Mg(n.options.borderRadius),o=(e-t)/2,a=Math.min(o,i*t/2),r=c=>{const u=(e-Math.min(o,c))*i/2;return Ut(c,0,Math.min(o,u))};return{outerStart:r(s.outerStart),outerEnd:r(s.outerEnd),innerStart:Ut(s.innerStart,0,a),innerEnd:Ut(s.innerEnd,0,a)}}function Rn(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function Ys(n,t,e,i,s,o){const{x:a,y:r,startAngle:c,pixelMargin:u,innerRadius:h}=t,p=Math.max(t.outerRadius+i+e-u,0),y=h>0?h+i+e+u:0;let g=0;const x=s-c;if(i){const ct=h>0?h-i:0,bt=p>0?p-i:0,Ct=(ct+bt)/2,kt=Ct!==0?x*Ct/(Ct+i):x;g=(x-kt)/2}const w=Math.max(.001,x*p-e/Tt)/p,S=(x-w)/2,O=c+S+g,A=s-S-g,{outerStart:j,outerEnd:N,innerStart:C,innerEnd:I}=$g(t,y,p,A-O),V=p-j,U=p-N,K=O+j/V,et=A-N/U,Q=y+C,ot=y+I,dt=O+C/Q,wt=A-I/ot;if(n.beginPath(),o){const ct=(K+et)/2;if(n.arc(a,r,p,K,ct),n.arc(a,r,p,ct,et),N>0){const _t=Rn(U,et,a,r);n.arc(_t.x,_t.y,N,et,A+Bt)}const bt=Rn(ot,A,a,r);if(n.lineTo(bt.x,bt.y),I>0){const _t=Rn(ot,wt,a,r);n.arc(_t.x,_t.y,I,A+Bt,wt+Math.PI)}const Ct=(A-I/y+(O+C/y))/2;if(n.arc(a,r,y,A-I/y,Ct,!0),n.arc(a,r,y,Ct,O+C/y,!0),C>0){const _t=Rn(Q,dt,a,r);n.arc(_t.x,_t.y,C,dt+Math.PI,O-Bt)}const kt=Rn(V,O,a,r);if(n.lineTo(kt.x,kt.y),j>0){const _t=Rn(V,K,a,r);n.arc(_t.x,_t.y,j,O-Bt,K)}}else{n.moveTo(a,r);const ct=Math.cos(K)*p+a,bt=Math.sin(K)*p+r;n.lineTo(ct,bt);const Ct=Math.cos(et)*p+a,kt=Math.sin(et)*p+r;n.lineTo(Ct,kt)}n.closePath()}function Ag(n,t,e,i,s){const{fullCircles:o,startAngle:a,circumference:r}=t;let c=t.endAngle;if(o){Ys(n,t,e,i,c,s);for(let u=0;u<o;++u)n.fill();isNaN(r)||(c=a+(r%At||At))}return Ys(n,t,e,i,c,s),n.fill(),c}function Tg(n,t,e,i,s){const{fullCircles:o,startAngle:a,circumference:r,options:c}=t,{borderWidth:u,borderJoinStyle:h,borderDash:p,borderDashOffset:y}=c,g=c.borderAlign==="inner";if(!u)return;n.setLineDash(p||[]),n.lineDashOffset=y,g?(n.lineWidth=u*2,n.lineJoin=h||"round"):(n.lineWidth=u,n.lineJoin=h||"bevel");let x=t.endAngle;if(o){Ys(n,t,e,i,x,s);for(let w=0;w<o;++w)n.stroke();isNaN(r)||(x=a+(r%At||At))}g&&Eg(n,t,x),o||(Ys(n,t,e,i,x,s),n.stroke())}class gi extends me{constructor(e){super();q(this,"circumference");q(this,"endAngle");q(this,"fullCircles");q(this,"innerRadius");q(this,"outerRadius");q(this,"pixelMargin");q(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,s){const o=this.getProps(["x","y"],s),{angle:a,distance:r}=Yc(o,{x:e,y:i}),{startAngle:c,endAngle:u,innerRadius:h,outerRadius:p,circumference:y}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),g=(this.options.spacing+this.options.borderWidth)/2,x=ft(y,u-c),w=Ti(a,c,u)&&c!==u,S=x>=At||w,O=Oe(r,h+g,p+g);return S&&O}getCenterPoint(e){const{x:i,y:s,startAngle:o,endAngle:a,innerRadius:r,outerRadius:c}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:u,spacing:h}=this.options,p=(o+a)/2,y=(r+c+h+u)/2;return{x:i+Math.cos(p)*y,y:s+Math.sin(p)*y}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:s}=this,o=(i.offset||0)/4,a=(i.spacing||0)/2,r=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>At?Math.floor(s/At):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const c=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(c)*o,Math.sin(c)*o);const u=1-Math.sin(Math.min(Tt,s||0)),h=o*u;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,Ag(e,this,h,a,r),Tg(e,this,h,a,r),e.restore()}}q(gi,"id","arc"),q(gi,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0}),q(gi,"defaultRoutes",{backgroundColor:"backgroundColor"}),q(gi,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function Cd(n,t,e=t){n.lineCap=ft(e.borderCapStyle,t.borderCapStyle),n.setLineDash(ft(e.borderDash,t.borderDash)),n.lineDashOffset=ft(e.borderDashOffset,t.borderDashOffset),n.lineJoin=ft(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=ft(e.borderWidth,t.borderWidth),n.strokeStyle=ft(e.borderColor,t.borderColor)}function Pg(n,t,e){n.lineTo(e.x,e.y)}function Og(n){return n.stepped?ef:n.tension||n.cubicInterpolationMode==="monotone"?nf:Pg}function Ed(n,t,e={}){const i=n.length,{start:s=0,end:o=i-1}=e,{start:a,end:r}=t,c=Math.max(s,a),u=Math.min(o,r),h=s<a&&o<a||s>r&&o>r;return{count:i,start:c,loop:t.loop,ilen:u<c&&!h?i+u-c:u-c}}function Fg(n,t,e,i){const{points:s,options:o}=t,{count:a,start:r,loop:c,ilen:u}=Ed(s,e,i),h=Og(o);let{move:p=!0,reverse:y}=i||{},g,x,w;for(g=0;g<=u;++g)x=s[(r+(y?u-g:g))%a],!x.skip&&(p?(n.moveTo(x.x,x.y),p=!1):h(n,w,x,y,o.stepped),w=x);return c&&(x=s[(r+(y?u:0))%a],h(n,w,x,y,o.stepped)),!!c}function Ig(n,t,e,i){const s=t.points,{count:o,start:a,ilen:r}=Ed(s,e,i),{move:c=!0,reverse:u}=i||{};let h=0,p=0,y,g,x,w,S,O;const A=N=>(a+(u?r-N:N))%o,j=()=>{w!==S&&(n.lineTo(h,S),n.lineTo(h,w),n.lineTo(h,O))};for(c&&(g=s[A(0)],n.moveTo(g.x,g.y)),y=0;y<=r;++y){if(g=s[A(y)],g.skip)continue;const N=g.x,C=g.y,I=N|0;I===x?(C<w?w=C:C>S&&(S=C),h=(p*h+N)/++p):(j(),n.lineTo(N,C),x=I,p=0,w=S=C),O=C}j()}function ba(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Ig:Fg}function Rg(n){return n.stepped?If:n.tension||n.cubicInterpolationMode==="monotone"?Rf:bn}function Lg(n,t,e,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,i)&&s.closePath()),Cd(n,t.options),n.stroke(s)}function Bg(n,t,e,i){const{segments:s,options:o}=t,a=ba(t);for(const r of s)Cd(n,o,r.style),n.beginPath(),a(n,t,r,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}const Ng=typeof Path2D=="function";function zg(n,t,e,i){Ng&&!t.options.segment?Lg(n,t,e,i):Bg(n,t,e,i)}class qe extends me{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;Ef(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=jf(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],o=this.points,a=hd(this,{property:e,start:s,end:s});if(!a.length)return;const r=[],c=Rg(i);let u,h;for(u=0,h=a.length;u<h;++u){const{start:p,end:y}=a[u],g=o[p],x=o[y];if(g===x){r.push(g);continue}const w=Math.abs((s-g[e])/(x[e]-g[e])),S=c(g,x,w,i.stepped);S[e]=t[e],r.push(S)}return r.length===1?r[0]:r}pathSegment(t,e,i){return ba(this)(t,this,e,i)}path(t,e,i){const s=this.segments,o=ba(this);let a=this._loop;e=e||0,i=i||this.points.length-e;for(const r of s)a&=o(t,this,r,{start:e,end:e+i-1});return!!a}draw(t,e,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),zg(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}q(qe,"id","line"),q(qe,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),q(qe,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),q(qe,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function nc(n,t,e,i){const s=n.options,{[e]:o}=n.getProps([e],i);return Math.abs(t-o)<s.radius+s.hitRadius}class Rs extends me{constructor(e){super();q(this,"parsed");q(this,"skip");q(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,s){const o=this.options,{x:a,y:r}=this.getProps(["x","y"],s);return Math.pow(e-a,2)+Math.pow(i-r,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(e,i){return nc(this,e,"x",i)}inYRange(e,i){return nc(this,e,"y",i)}getCenterPoint(e){const{x:i,y:s}=this.getProps(["x","y"],e);return{x:i,y:s}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const s=i&&e.borderWidth||0;return(i+s)*2}draw(e,i){const s=this.options;this.skip||s.radius<.1||!Ie(this,i,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,pa(e,s,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}q(Rs,"id","point"),q(Rs,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),q(Rs,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Md(n,t){const{x:e,y:i,base:s,width:o,height:a}=n.getProps(["x","y","base","width","height"],t);let r,c,u,h,p;return n.horizontal?(p=a/2,r=Math.min(e,s),c=Math.max(e,s),u=i-p,h=i+p):(p=o/2,r=e-p,c=e+p,u=Math.min(i,s),h=Math.max(i,s)),{left:r,top:u,right:c,bottom:h}}function Ke(n,t,e,i){return n?0:Ut(t,e,i)}function Hg(n,t,e){const i=n.options.borderWidth,s=n.borderSkipped,o=ed(i);return{t:Ke(s.top,o.top,0,e),r:Ke(s.right,o.right,0,t),b:Ke(s.bottom,o.bottom,0,e),l:Ke(s.left,o.left,0,t)}}function jg(n,t,e){const{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),s=n.options.borderRadius,o=kn(s),a=Math.min(t,e),r=n.borderSkipped,c=i||vt(s);return{topLeft:Ke(!c||r.top||r.left,o.topLeft,0,a),topRight:Ke(!c||r.top||r.right,o.topRight,0,a),bottomLeft:Ke(!c||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Ke(!c||r.bottom||r.right,o.bottomRight,0,a)}}function Wg(n){const t=Md(n),e=t.right-t.left,i=t.bottom-t.top,s=Hg(n,e/2,i/2),o=jg(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:o},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,o.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(s.b,s.r))}}}}function ta(n,t,e,i){const s=t===null,o=e===null,r=n&&!(s&&o)&&Md(n,i);return r&&(s||Oe(t,r.left,r.right))&&(o||Oe(e,r.top,r.bottom))}function Vg(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function Ug(n,t){n.rect(t.x,t.y,t.w,t.h)}function ea(n,t,e={}){const i=n.x!==e.x?-t:0,s=n.y!==e.y?-t:0,o=(n.x+n.w!==e.x+e.w?t:0)-i,a=(n.y+n.h!==e.y+e.h?t:0)-s;return{x:n.x+i,y:n.y+s,w:n.w+o,h:n.h+a,radius:n.radius}}class Ls extends me{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:o,outer:a}=Wg(this),r=Vg(a.radius)?Pi:Ug;t.save(),(a.w!==o.w||a.h!==o.h)&&(t.beginPath(),r(t,ea(a,e,o)),t.clip(),r(t,ea(o,-e,a)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),r(t,ea(o,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return ta(this,t,e,i)}inXRange(t,e){return ta(this,t,null,e)}inYRange(t,e){return ta(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+s)/2:e,y:o?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}q(Ls,"id","bar"),q(Ls,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),q(Ls,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Yg=Object.freeze({__proto__:null,ArcElement:gi,BarElement:Ls,LineElement:qe,PointElement:Rs});const va=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],ic=va.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function $d(n){return va[n%va.length]}function Ad(n){return ic[n%ic.length]}function qg(n,t){return n.borderColor=$d(t),n.backgroundColor=Ad(t),++t}function Kg(n,t){return n.backgroundColor=n.data.map(()=>$d(t++)),t}function Xg(n,t){return n.backgroundColor=n.data.map(()=>Ad(t++)),t}function Gg(n){let t=0;return(e,i)=>{const s=n.getDatasetMeta(i).controller;s instanceof xn?t=Kg(e,t):s instanceof Si?t=Xg(e,t):s&&(t=qg(e,t))}}function sc(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function Jg(n){return n&&(n.borderColor||n.backgroundColor)}function Qg(){return Ft.borderColor!=="rgba(0,0,0,0.1)"||Ft.backgroundColor!=="rgba(0,0,0,0.1)"}var Zg={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:i},options:s}=n.config,{elements:o}=s,a=sc(i)||Jg(s)||o&&sc(o)||Qg();if(!e.forceOverride&&a)return;const r=Gg(n);i.forEach(r)}};function tm(n,t,e,i,s){const o=s.samples||i;if(o>=e)return n.slice(t,t+e);const a=[],r=(e-2)/(o-2);let c=0;const u=t+e-1;let h=t,p,y,g,x,w;for(a[c++]=n[h],p=0;p<o-2;p++){let S=0,O=0,A;const j=Math.floor((p+1)*r)+1+t,N=Math.min(Math.floor((p+2)*r)+1,e)+t,C=N-j;for(A=j;A<N;A++)S+=n[A].x,O+=n[A].y;S/=C,O/=C;const I=Math.floor(p*r)+1+t,V=Math.min(Math.floor((p+1)*r)+1,e)+t,{x:U,y:K}=n[h];for(g=x=-1,A=I;A<V;A++)x=.5*Math.abs((U-S)*(n[A].y-K)-(U-n[A].x)*(O-K)),x>g&&(g=x,y=n[A],w=A);a[c++]=y,h=w}return a[c++]=n[u],a}function em(n,t,e,i){let s=0,o=0,a,r,c,u,h,p,y,g,x,w;const S=[],O=t+e-1,A=n[t].x,N=n[O].x-A;for(a=t;a<t+e;++a){r=n[a],c=(r.x-A)/N*i,u=r.y;const C=c|0;if(C===h)u<x?(x=u,p=a):u>w&&(w=u,y=a),s=(o*s+r.x)/++o;else{const I=a-1;if(!yt(p)&&!yt(y)){const V=Math.min(p,y),U=Math.max(p,y);V!==g&&V!==I&&S.push({...n[V],x:s}),U!==g&&U!==I&&S.push({...n[U],x:s})}a>0&&I!==g&&S.push(n[I]),S.push(r),h=C,o=0,x=w=u,p=y=g=a}}return S}function Td(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function oc(n){n.data.datasets.forEach(t=>{Td(t)})}function nm(n,t){const e=t.length;let i=0,s;const{iScale:o}=n,{min:a,max:r,minDefined:c,maxDefined:u}=o.getUserBounds();return c&&(i=Ut(Fe(t,o.axis,a).lo,0,e-1)),u?s=Ut(Fe(t,o.axis,r).hi+1,i,e)-i:s=e-i,{start:i,count:s}}var im={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){oc(n);return}const i=n.width;n.data.datasets.forEach((s,o)=>{const{_data:a,indexAxis:r}=s,c=n.getDatasetMeta(o),u=a||s.data;if(fi([r,n.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const h=n.scales[c.xAxisID];if(h.type!=="linear"&&h.type!=="time"||n.options.parsing)return;let{start:p,count:y}=nm(c,u);const g=e.threshold||4*i;if(y<=g){Td(s);return}yt(a)&&(s._data=u,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(w){this._data=w}}));let x;switch(e.algorithm){case"lttb":x=tm(u,p,y,i,e);break;case"min-max":x=em(u,p,y,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=x})},destroy(n){oc(n)}};function sm(n,t,e){const i=n.segments,s=n.points,o=t.points,a=[];for(const r of i){let{start:c,end:u}=r;u=ar(c,u,s);const h=xa(e,s[c],s[u],r.loop);if(!t.segments){a.push({source:r,target:h,start:s[c],end:s[u]});continue}const p=hd(t,h);for(const y of p){const g=xa(e,o[y.start],o[y.end],y.loop),x=ud(r,s,g);for(const w of x)a.push({source:w,target:y,start:{[e]:ac(h,g,"start",Math.max)},end:{[e]:ac(h,g,"end",Math.min)}})}}return a}function xa(n,t,e,i){if(i)return;let s=t[n],o=e[n];return n==="angle"&&(s=de(s),o=de(o)),{property:n,start:s,end:o}}function om(n,t){const{x:e=null,y:i=null}=n||{},s=t.points,o=[];return t.segments.forEach(({start:a,end:r})=>{r=ar(a,r,s);const c=s[a],u=s[r];i!==null?(o.push({x:c.x,y:i}),o.push({x:u.x,y:i})):e!==null&&(o.push({x:e,y:c.y}),o.push({x:e,y:u.y}))}),o}function ar(n,t,e){for(;t>n;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function ac(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function Pd(n,t){let e=[],i=!1;return Ot(n)?(i=!0,e=n):e=om(n,t),e.length?new qe({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function rc(n){return n&&n.fill!==!1}function am(n,t,e){let s=n[t].fill;const o=[t];let a;if(!e)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!It(s))return s;if(a=n[s],!a)return!1;if(a.visible)return s;o.push(s),s=a.fill}return!1}function rm(n,t,e){const i=um(n);if(vt(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return It(s)&&Math.floor(s)===s?lm(i[0],t,s,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function lm(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function cm(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:vt(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function dm(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:vt(n)?i=n.value:i=t.getBaseValue(),i}function um(n){const t=n.options,e=t.fill;let i=ft(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function hm(n){const{scale:t,index:e,line:i}=n,s=[],o=i.segments,a=i.points,r=fm(t,e);r.push(Pd({x:null,y:t.bottom},i));for(let c=0;c<o.length;c++){const u=o[c];for(let h=u.start;h<=u.end;h++)pm(s,a[h],r)}return new qe({points:s,options:{}})}function fm(n,t){const e=[],i=n.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||e.unshift(o.dataset)}return e}function pm(n,t,e){const i=[];for(let s=0;s<e.length;s++){const o=e[s],{first:a,last:r,point:c}=gm(o,t,"x");if(!(!c||a&&r)){if(a)i.unshift(c);else if(n.push(c),!r)break}}n.push(...i)}function gm(n,t,e){const i=n.interpolate(t,e);if(!i)return{};const s=i[e],o=n.segments,a=n.points;let r=!1,c=!1;for(let u=0;u<o.length;u++){const h=o[u],p=a[h.start][e],y=a[h.end][e];if(Oe(s,p,y)){r=s===p,c=s===y;break}}return{first:r,last:c,point:i}}class Od{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:o,radius:a}=this;return e=e||{start:0,end:At},t.arc(s,o,a,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,o=t.angle;return{x:e+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function mm(n){const{chart:t,fill:e,line:i}=n;if(It(e))return ym(t,e);if(e==="stack")return hm(n);if(e==="shape")return!0;const s=bm(n);return s instanceof Od?s:Pd(s,i)}function ym(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function bm(n){return(n.scale||{}).getPointPositionForValue?xm(n):vm(n)}function vm(n){const{scale:t={},fill:e}=n,i=cm(e,t);if(It(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function xm(n){const{scale:t,fill:e}=n,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,a=dm(e,t,o),r=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,o);return new Od({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(a)})}for(let c=0;c<s;++c)r.push(t.getPointPositionForValue(c,a));return r}function na(n,t,e){const i=mm(t),{chart:s,index:o,line:a,scale:r,axis:c}=t,u=a.options,h=u.fill,p=u.backgroundColor,{above:y=p,below:g=p}=h||{},x=s.getDatasetMeta(o),w=fd(s,x);i&&a.points.length&&(Js(n,e),wm(n,{line:a,target:i,above:y,below:g,area:e,scale:r,axis:c,clip:w}),Qs(n))}function wm(n,t){const{line:e,target:i,above:s,below:o,area:a,scale:r,clip:c}=t,u=e._loop?"angle":t.axis;n.save(),u==="x"&&o!==s&&(lc(n,i,a.top),cc(n,{line:e,target:i,color:s,scale:r,property:u,clip:c}),n.restore(),n.save(),lc(n,i,a.bottom)),cc(n,{line:e,target:i,color:o,scale:r,property:u,clip:c}),n.restore()}function lc(n,t,e){const{segments:i,points:s}=t;let o=!0,a=!1;n.beginPath();for(const r of i){const{start:c,end:u}=r,h=s[c],p=s[ar(c,u,s)];o?(n.moveTo(h.x,h.y),o=!1):(n.lineTo(h.x,e),n.lineTo(h.x,h.y)),a=!!t.pathSegment(n,r,{move:a}),a?n.closePath():n.lineTo(p.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function cc(n,t){const{line:e,target:i,property:s,color:o,scale:a,clip:r}=t,c=sm(e,i,s);for(const{source:u,target:h,start:p,end:y}of c){const{style:{backgroundColor:g=o}={}}=u,x=i!==!0;n.save(),n.fillStyle=g,km(n,a,r,x&&xa(s,p,y)),n.beginPath();const w=!!e.pathSegment(n,u);let S;if(x){w?n.closePath():dc(n,i,y,s);const O=!!i.pathSegment(n,h,{move:w,reverse:!0});S=w&&O,S||dc(n,i,p,s)}n.closePath(),n.fill(S?"evenodd":"nonzero"),n.restore()}}function km(n,t,e,i){const s=t.chart.chartArea,{property:o,start:a,end:r}=i||{};if(o==="x"||o==="y"){let c,u,h,p;o==="x"?(c=a,u=s.top,h=r,p=s.bottom):(c=s.left,u=a,h=s.right,p=r),n.beginPath(),e&&(c=Math.max(c,e.left),h=Math.min(h,e.right),u=Math.max(u,e.top),p=Math.min(p,e.bottom)),n.rect(c,u,h-c,p-u),n.clip()}}function dc(n,t,e,i){const s=t.interpolate(e,i);s&&n.lineTo(s.x,s.y)}var _m={id:"filler",afterDatasetsUpdate(n,t,e){const i=(n.data.datasets||[]).length,s=[];let o,a,r,c;for(a=0;a<i;++a)o=n.getDatasetMeta(a),r=o.dataset,c=null,r&&r.options&&r instanceof qe&&(c={visible:n.isDatasetVisible(a),index:a,fill:rm(r,a,i),chart:n,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=c,s.push(c);for(a=0;a<i;++a)c=s[a],!(!c||c.fill===!1)&&(c.fill=am(s,a,e.propagate))},beforeDraw(n,t,e){const i=e.drawTime==="beforeDraw",s=n.getSortedVisibleDatasetMetas(),o=n.chartArea;for(let a=s.length-1;a>=0;--a){const r=s[a].$filler;r&&(r.line.updateControlPoints(o,r.axis),i&&r.fill&&na(n.ctx,r,o))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=n.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;rc(o)&&na(n.ctx,o,n.chartArea)}},beforeDatasetDraw(n,t,e){const i=t.meta.$filler;!rc(i)||e.drawTime!=="beforeDatasetDraw"||na(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const uc=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},Sm=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class hc extends me{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=Mt(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=zt(i.font),o=s.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:c}=uc(i,o);let u,h;e.font=s.string,this.isHorizontal()?(u=this.maxWidth,h=this._fitRows(a,o,r,c)+10):(h=this.maxHeight,u=this._fitCols(a,s,r,c)+10),this.width=Math.min(u,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:o,maxWidth:a,options:{labels:{padding:r}}}=this,c=this.legendHitBoxes=[],u=this.lineWidths=[0],h=s+r;let p=t;o.textAlign="left",o.textBaseline="middle";let y=-1,g=-h;return this.legendItems.forEach((x,w)=>{const S=i+e/2+o.measureText(x.text).width;(w===0||u[u.length-1]+S+2*r>a)&&(p+=h,u[u.length-(w>0?0:1)]=0,g+=h,y++),c[w]={left:0,top:g,row:y,width:S,height:s},u[u.length-1]+=S+r}),p}_fitCols(t,e,i,s){const{ctx:o,maxHeight:a,options:{labels:{padding:r}}}=this,c=this.legendHitBoxes=[],u=this.columnSizes=[],h=a-t;let p=r,y=0,g=0,x=0,w=0;return this.legendItems.forEach((S,O)=>{const{itemWidth:A,itemHeight:j}=Dm(i,e,o,S,s);O>0&&g+j+2*r>h&&(p+=y+r,u.push({width:y,height:g}),x+=y+r,w++,y=g=0),c[O]={left:x,top:g,col:w,width:A,height:j},y=Math.max(y,A),g+=j+r}),p+=y,u.push({width:y,height:g}),p}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:o}}=this,a=Nn(o,this.left,this.width);if(this.isHorizontal()){let r=0,c=Jt(i,this.left+s,this.right-this.lineWidths[r]);for(const u of e)r!==u.row&&(r=u.row,c=Jt(i,this.left+s,this.right-this.lineWidths[r])),u.top+=this.top+t+s,u.left=a.leftForLtr(a.x(c),u.width),c+=u.width+s}else{let r=0,c=Jt(i,this.top+t+s,this.bottom-this.columnSizes[r].height);for(const u of e)u.col!==r&&(r=u.col,c=Jt(i,this.top+t+s,this.bottom-this.columnSizes[r].height)),u.top=c,u.left+=this.left+s,u.left=a.leftForLtr(a.x(u.left),u.width),c+=u.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Js(t,this),this._draw(),Qs(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:o,labels:a}=t,r=Ft.color,c=Nn(t.rtl,this.left,this.width),u=zt(a.font),{padding:h}=a,p=u.size,y=p/2;let g;this.drawTitle(),s.textAlign=c.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=u.string;const{boxWidth:x,boxHeight:w,itemHeight:S}=uc(a,p),O=function(I,V,U){if(isNaN(x)||x<=0||isNaN(w)||w<0)return;s.save();const K=ft(U.lineWidth,1);if(s.fillStyle=ft(U.fillStyle,r),s.lineCap=ft(U.lineCap,"butt"),s.lineDashOffset=ft(U.lineDashOffset,0),s.lineJoin=ft(U.lineJoin,"miter"),s.lineWidth=K,s.strokeStyle=ft(U.strokeStyle,r),s.setLineDash(ft(U.lineDash,[])),a.usePointStyle){const et={radius:w*Math.SQRT2/2,pointStyle:U.pointStyle,rotation:U.rotation,borderWidth:K},Q=c.xPlus(I,x/2),ot=V+y;td(s,et,Q,ot,a.pointStyleWidth&&x)}else{const et=V+Math.max((p-w)/2,0),Q=c.leftForLtr(I,x),ot=kn(U.borderRadius);s.beginPath(),Object.values(ot).some(dt=>dt!==0)?Pi(s,{x:Q,y:et,w:x,h:w,radius:ot}):s.rect(Q,et,x,w),s.fill(),K!==0&&s.stroke()}s.restore()},A=function(I,V,U){Cn(s,U.text,I,V+S/2,u,{strikethrough:U.hidden,textAlign:c.textAlign(U.textAlign)})},j=this.isHorizontal(),N=this._computeTitleHeight();j?g={x:Jt(o,this.left+h,this.right-i[0]),y:this.top+h+N,line:0}:g={x:this.left+h,y:Jt(o,this.top+N+h,this.bottom-e[0].height),line:0},ld(this.ctx,t.textDirection);const C=S+h;this.legendItems.forEach((I,V)=>{s.strokeStyle=I.fontColor,s.fillStyle=I.fontColor;const U=s.measureText(I.text).width,K=c.textAlign(I.textAlign||(I.textAlign=a.textAlign)),et=x+y+U;let Q=g.x,ot=g.y;c.setWidth(this.width),j?V>0&&Q+et+h>this.right&&(ot=g.y+=C,g.line++,Q=g.x=Jt(o,this.left+h,this.right-i[g.line])):V>0&&ot+C>this.bottom&&(Q=g.x=Q+e[g.line].width+h,g.line++,ot=g.y=Jt(o,this.top+N+h,this.bottom-e[g.line].height));const dt=c.x(Q);if(O(dt,ot,I),Q=Vh(K,Q+x+y,j?Q+et:this.right,t.rtl),A(c.x(Q),ot,I),j)g.x+=et+h;else if(typeof I.text!="string"){const wt=u.lineHeight;g.y+=Fd(I,wt)+h}else g.y+=C}),cd(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=zt(e.font),s=Zt(e.padding);if(!e.display)return;const o=Nn(t.rtl,this.left,this.width),a=this.ctx,r=e.position,c=i.size/2,u=s.top+c;let h,p=this.left,y=this.width;if(this.isHorizontal())y=Math.max(...this.lineWidths),h=this.top+u,p=Jt(t.align,p,this.right-y);else{const x=this.columnSizes.reduce((w,S)=>Math.max(w,S.height),0);h=u+Jt(t.align,this.top,this.bottom-x-t.labels.padding-this._computeTitleHeight())}const g=Jt(r,p,p+y);a.textAlign=o.textAlign(Ja(r)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=i.string,Cn(a,e.text,g,h,i)}_computeTitleHeight(){const t=this.options.title,e=zt(t.font),i=Zt(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,o;if(Oe(t,this.left,this.right)&&Oe(e,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Oe(t,s.left,s.left+s.width)&&Oe(e,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!Mm(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=Sm(s,i);s&&!o&&Mt(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&Mt(e.onHover,[t,i,this],this)}else i&&Mt(e.onClick,[t,i,this],this)}}function Dm(n,t,e,i,s){const o=Cm(i,n,t,e),a=Em(s,i,t.lineHeight);return{itemWidth:o,itemHeight:a}}function Cm(n,t,e,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((o,a)=>o.length>a.length?o:a)),t+e.size/2+i.measureText(s).width}function Em(n,t,e){let i=n;return typeof t.text!="string"&&(i=Fd(t,e)),i}function Fd(n,t){const e=n.text?n.text.length:0;return t*e}function Mm(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var $m={id:"legend",_element:hc,start(n,t,e){const i=n.legend=new hc({ctx:n.ctx,options:e,chart:n});Qt.configure(n,i,e),Qt.addBox(n,i)},stop(n){Qt.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const i=n.legend;Qt.configure(n,i,e),i.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const i=t.datasetIndex,s=e.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:s,color:o,useBorderRadius:a,borderRadius:r}}=n.legend.options;return n._getSortedDatasetMetas().map(c=>{const u=c.controller.getStyle(e?0:void 0),h=Zt(u.borderWidth);return{text:t[c.index].label,fillStyle:u.backgroundColor,fontColor:o,hidden:!c.visible,lineCap:u.borderCapStyle,lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:u.borderColor,pointStyle:i||u.pointStyle,rotation:u.rotation,textAlign:s||u.textAlign,borderRadius:a&&(r||u.borderRadius),datasetIndex:c.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class rr extends me{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const s=Ot(i.text)?i.text.length:1;this._padding=Zt(i.padding);const o=s*zt(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:s,right:o,options:a}=this,r=a.align;let c=0,u,h,p;return this.isHorizontal()?(h=Jt(r,i,o),p=e+t,u=o-i):(a.position==="left"?(h=i+t,p=Jt(r,s,e),c=Tt*-.5):(h=o-t,p=Jt(r,e,s),c=Tt*.5),u=s-e),{titleX:h,titleY:p,maxWidth:u,rotation:c}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=zt(e.font),o=i.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:c,rotation:u}=this._drawArgs(o);Cn(t,e.text,0,0,i,{color:e.color,maxWidth:c,rotation:u,textAlign:Ja(e.align),textBaseline:"middle",translation:[a,r]})}}function Am(n,t){const e=new rr({ctx:n.ctx,options:t,chart:n});Qt.configure(n,e,t),Qt.addBox(n,e),n.titleBlock=e}var Tm={id:"title",_element:rr,start(n,t,e){Am(n,e)},stop(n){const t=n.titleBlock;Qt.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const i=n.titleBlock;Qt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const _s=new WeakMap;var Pm={id:"subtitle",start(n,t,e){const i=new rr({ctx:n.ctx,options:e,chart:n});Qt.configure(n,i,e),Qt.addBox(n,i),_s.set(n,i)},stop(n){Qt.removeBox(n,_s.get(n)),_s.delete(n)},beforeUpdate(n,t,e){const i=_s.get(n);Qt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const mi={average(n){if(!n.length)return!1;let t,e,i=new Set,s=0,o=0;for(t=0,e=n.length;t<e;++t){const r=n[t].element;if(r&&r.hasValue()){const c=r.tooltipPosition();i.add(c.x),s+=c.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((r,c)=>r+c)/i.size,y:s/o}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,a,r;for(o=0,a=n.length;o<a;++o){const c=n[o].element;if(c&&c.hasValue()){const u=c.getCenterPoint(),h=ha(t,u);h<s&&(s=h,r=c)}}if(r){const c=r.tooltipPosition();e=c.x,i=c.y}return{x:e,y:i}}};function Se(n,t){return t&&(Ot(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function Te(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function Om(n,t){const{element:e,datasetIndex:i,index:s}=t,o=n.getDatasetMeta(i).controller,{label:a,value:r}=o.getLabelAndValue(s);return{chart:n,label:a,parsed:o.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:r,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:e}}function fc(n,t){const e=n.chart.ctx,{body:i,footer:s,title:o}=n,{boxWidth:a,boxHeight:r}=t,c=zt(t.bodyFont),u=zt(t.titleFont),h=zt(t.footerFont),p=o.length,y=s.length,g=i.length,x=Zt(t.padding);let w=x.height,S=0,O=i.reduce((N,C)=>N+C.before.length+C.lines.length+C.after.length,0);if(O+=n.beforeBody.length+n.afterBody.length,p&&(w+=p*u.lineHeight+(p-1)*t.titleSpacing+t.titleMarginBottom),O){const N=t.displayColors?Math.max(r,c.lineHeight):c.lineHeight;w+=g*N+(O-g)*c.lineHeight+(O-1)*t.bodySpacing}y&&(w+=t.footerMarginTop+y*h.lineHeight+(y-1)*t.footerSpacing);let A=0;const j=function(N){S=Math.max(S,e.measureText(N).width+A)};return e.save(),e.font=u.string,Dt(n.title,j),e.font=c.string,Dt(n.beforeBody.concat(n.afterBody),j),A=t.displayColors?a+2+t.boxPadding:0,Dt(i,N=>{Dt(N.before,j),Dt(N.lines,j),Dt(N.after,j)}),A=0,e.font=h.string,Dt(n.footer,j),e.restore(),S+=x.width,{width:S,height:w}}function Fm(n,t){const{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function Im(n,t,e,i){const{x:s,width:o}=i,a=e.caretSize+e.caretPadding;if(n==="left"&&s+o+a>t.width||n==="right"&&s-o-a<0)return!0}function Rm(n,t,e,i){const{x:s,width:o}=e,{width:a,chartArea:{left:r,right:c}}=n;let u="center";return i==="center"?u=s<=(r+c)/2?"left":"right":s<=o/2?u="left":s>=a-o/2&&(u="right"),Im(u,n,t,e)&&(u="center"),u}function pc(n,t,e){const i=e.yAlign||t.yAlign||Fm(n,e);return{xAlign:e.xAlign||t.xAlign||Rm(n,t,e,i),yAlign:i}}function Lm(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function Bm(n,t,e){let{y:i,height:s}=n;return t==="top"?i+=e:t==="bottom"?i-=s+e:i-=s/2,i}function gc(n,t,e,i){const{caretSize:s,caretPadding:o,cornerRadius:a}=n,{xAlign:r,yAlign:c}=e,u=s+o,{topLeft:h,topRight:p,bottomLeft:y,bottomRight:g}=kn(a);let x=Lm(t,r);const w=Bm(t,c,u);return c==="center"?r==="left"?x+=u:r==="right"&&(x-=u):r==="left"?x-=Math.max(h,y)+s:r==="right"&&(x+=Math.max(p,g)+s),{x:Ut(x,0,i.width-t.width),y:Ut(w,0,i.height-t.height)}}function Ss(n,t,e){const i=Zt(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function mc(n){return Se([],Te(n))}function Nm(n,t,e){return Ze(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function yc(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const Id={beforeTitle:$e,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:$e,beforeBody:$e,beforeLabel:$e,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return yt(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:$e,afterBody:$e,beforeFooter:$e,footer:$e,afterFooter:$e};function ne(n,t,e,i){const s=n[t].call(e,i);return typeof s>"u"?Id[t].call(e,i):s}class wa extends me{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,o=new pd(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=Nm(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,s=ne(i,"beforeTitle",this,t),o=ne(i,"title",this,t),a=ne(i,"afterTitle",this,t);let r=[];return r=Se(r,Te(s)),r=Se(r,Te(o)),r=Se(r,Te(a)),r}getBeforeBody(t,e){return mc(ne(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return Dt(t,o=>{const a={before:[],lines:[],after:[]},r=yc(i,o);Se(a.before,Te(ne(r,"beforeLabel",this,o))),Se(a.lines,ne(r,"label",this,o)),Se(a.after,Te(ne(r,"afterLabel",this,o))),s.push(a)}),s}getAfterBody(t,e){return mc(ne(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=ne(i,"beforeFooter",this,t),o=ne(i,"footer",this,t),a=ne(i,"afterFooter",this,t);let r=[];return r=Se(r,Te(s)),r=Se(r,Te(o)),r=Se(r,Te(a)),r}_createItems(t){const e=this._active,i=this.chart.data,s=[],o=[],a=[];let r=[],c,u;for(c=0,u=e.length;c<u;++c)r.push(Om(this.chart,e[c]));return t.filter&&(r=r.filter((h,p,y)=>t.filter(h,p,y,i))),t.itemSort&&(r=r.sort((h,p)=>t.itemSort(h,p,i))),Dt(r,h=>{const p=yc(t.callbacks,h);s.push(ne(p,"labelColor",this,h)),o.push(ne(p,"labelPointStyle",this,h)),a.push(ne(p,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=a,this.dataPoints=r,r}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let o,a=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const r=mi[i.position].call(this,s,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const c=this._size=fc(this,i),u=Object.assign({},r,c),h=pc(this.chart,i,u),p=gc(i,u,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,o={opacity:1,x:p.x,y:p.y,width:c.width,height:c.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const o=this.getCaretPosition(t,i,s);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:o}=this,{caretSize:a,cornerRadius:r}=i,{topLeft:c,topRight:u,bottomLeft:h,bottomRight:p}=kn(r),{x:y,y:g}=t,{width:x,height:w}=e;let S,O,A,j,N,C;return o==="center"?(N=g+w/2,s==="left"?(S=y,O=S-a,j=N+a,C=N-a):(S=y+x,O=S+a,j=N-a,C=N+a),A=S):(s==="left"?O=y+Math.max(c,h)+a:s==="right"?O=y+x-Math.max(u,p)-a:O=this.caretX,o==="top"?(j=g,N=j-a,S=O-a,A=O+a):(j=g+w,N=j+a,S=O+a,A=O-a),C=j),{x1:S,x2:O,x3:A,y1:j,y2:N,y3:C}}drawTitle(t,e,i){const s=this.title,o=s.length;let a,r,c;if(o){const u=Nn(i.rtl,this.x,this.width);for(t.x=Ss(this,i.titleAlign,i),e.textAlign=u.textAlign(i.titleAlign),e.textBaseline="middle",a=zt(i.titleFont),r=i.titleSpacing,e.fillStyle=i.titleColor,e.font=a.string,c=0;c<o;++c)e.fillText(s[c],u.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,c+1===o&&(t.y+=i.titleMarginBottom-r)}}_drawColorBox(t,e,i,s,o){const a=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:c,boxWidth:u}=o,h=zt(o.bodyFont),p=Ss(this,"left",o),y=s.x(p),g=c<h.lineHeight?(h.lineHeight-c)/2:0,x=e.y+g;if(o.usePointStyle){const w={radius:Math.min(u,c)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},S=s.leftForLtr(y,u)+u/2,O=x+c/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,pa(t,w,S,O),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,pa(t,w,S,O)}else{t.lineWidth=vt(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const w=s.leftForLtr(y,u),S=s.leftForLtr(s.xPlus(y,1),u-2),O=kn(a.borderRadius);Object.values(O).some(A=>A!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,Pi(t,{x:w,y:x,w:u,h:c,radius:O}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),Pi(t,{x:S,y:x+1,w:u-2,h:c-2,radius:O}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(w,x,u,c),t.strokeRect(w,x,u,c),t.fillStyle=a.backgroundColor,t.fillRect(S,x+1,u-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:o,bodyAlign:a,displayColors:r,boxHeight:c,boxWidth:u,boxPadding:h}=i,p=zt(i.bodyFont);let y=p.lineHeight,g=0;const x=Nn(i.rtl,this.x,this.width),w=function(U){e.fillText(U,x.x(t.x+g),t.y+y/2),t.y+=y+o},S=x.textAlign(a);let O,A,j,N,C,I,V;for(e.textAlign=a,e.textBaseline="middle",e.font=p.string,t.x=Ss(this,S,i),e.fillStyle=i.bodyColor,Dt(this.beforeBody,w),g=r&&S!=="right"?a==="center"?u/2+h:u+2+h:0,N=0,I=s.length;N<I;++N){for(O=s[N],A=this.labelTextColors[N],e.fillStyle=A,Dt(O.before,w),j=O.lines,r&&j.length&&(this._drawColorBox(e,t,N,x,i),y=Math.max(p.lineHeight,c)),C=0,V=j.length;C<V;++C)w(j[C]),y=p.lineHeight;Dt(O.after,w)}g=0,y=p.lineHeight,Dt(this.afterBody,w),t.y-=o}drawFooter(t,e,i){const s=this.footer,o=s.length;let a,r;if(o){const c=Nn(i.rtl,this.x,this.width);for(t.x=Ss(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=c.textAlign(i.footerAlign),e.textBaseline="middle",a=zt(i.footerFont),e.fillStyle=i.footerColor,e.font=a.string,r=0;r<o;++r)e.fillText(s[r],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:o,yAlign:a}=this,{x:r,y:c}=t,{width:u,height:h}=i,{topLeft:p,topRight:y,bottomLeft:g,bottomRight:x}=kn(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(r+p,c),a==="top"&&this.drawCaret(t,e,i,s),e.lineTo(r+u-y,c),e.quadraticCurveTo(r+u,c,r+u,c+y),a==="center"&&o==="right"&&this.drawCaret(t,e,i,s),e.lineTo(r+u,c+h-x),e.quadraticCurveTo(r+u,c+h,r+u-x,c+h),a==="bottom"&&this.drawCaret(t,e,i,s),e.lineTo(r+g,c+h),e.quadraticCurveTo(r,c+h,r,c+h-g),a==="center"&&o==="left"&&this.drawCaret(t,e,i,s),e.lineTo(r,c+p),e.quadraticCurveTo(r,c,r+p,c),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const a=mi[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=fc(this,t),c=Object.assign({},a,this._size),u=pc(e,t,c),h=gc(t,c,u,e);(s._to!==h.x||o._to!==h.y)&&(this.xAlign=u.xAlign,this.yAlign=u.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=Zt(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,e),ld(t,e.textDirection),o.y+=a.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),cd(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map(({datasetIndex:r,index:c})=>{const u=this.chart.getDatasetMeta(r);if(!u)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:u.data[c],index:c}}),o=!zs(i,s),a=this._positionChanged(s,e);(o||a)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],a=this._getActiveElements(t,o,e,i),r=this._positionChanged(a,t),c=e||!zs(a,o)||r;return c&&(this._active=a,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),c}_getActiveElements(t,e,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:i,caretY:s,options:o}=this,a=mi[o.position].call(this,t,e);return a!==!1&&(i!==a.x||s!==a.y)}}q(wa,"positioners",mi);var zm={id:"tooltip",_element:wa,positioners:mi,afterInit(n,t,e){e&&(n.tooltip=new wa({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Id},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Hm=Object.freeze({__proto__:null,Colors:Zg,Decimation:im,Filler:_m,Legend:$m,SubTitle:Pm,Title:Tm,Tooltip:zm});const jm=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function Wm(n,t,e,i){const s=n.indexOf(t);if(s===-1)return jm(n,t,e,i);const o=n.lastIndexOf(t);return s!==o?e:s}const Vm=(n,t)=>n===null?null:Ut(Math.round(n),0,t);function bc(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class ka extends En{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:s,label:o}of e)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(yt(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:Wm(i,t,ft(e,t),this._addedLabels),Vm(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let a=t;a<=e;a++)s.push({value:a});return s}getLabelForValue(t){return bc.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}q(ka,"id","category"),q(ka,"defaults",{ticks:{callback:bc}});function Um(n,t){const e=[],{bounds:s,step:o,min:a,max:r,precision:c,count:u,maxTicks:h,maxDigits:p,includeBounds:y}=n,g=o||1,x=h-1,{min:w,max:S}=t,O=!yt(a),A=!yt(r),j=!yt(u),N=(S-w)/(p+1);let C=fl((S-w)/x/g)*g,I,V,U,K;if(C<1e-14&&!O&&!A)return[{value:w},{value:S}];K=Math.ceil(S/C)-Math.floor(w/C),K>x&&(C=fl(K*C/x/g)*g),yt(c)||(I=Math.pow(10,c),C=Math.ceil(C*I)/I),s==="ticks"?(V=Math.floor(w/C)*C,U=Math.ceil(S/C)*C):(V=w,U=S),O&&A&&o&&Lh((r-a)/o,C/1e3)?(K=Math.round(Math.min((r-a)/C,h)),C=(r-a)/K,V=a,U=r):j?(V=O?a:V,U=A?r:U,K=u-1,C=(U-V)/K):(K=(U-V)/C,wi(K,Math.round(K),C/1e3)?K=Math.round(K):K=Math.ceil(K));const et=Math.max(pl(C),pl(V));I=Math.pow(10,yt(c)?et:c),V=Math.round(V*I)/I,U=Math.round(U*I)/I;let Q=0;for(O&&(y&&V!==a?(e.push({value:a}),V<a&&Q++,wi(Math.round((V+Q*C)*I)/I,a,vc(a,N,n))&&Q++):V<a&&Q++);Q<K;++Q){const ot=Math.round((V+Q*C)*I)/I;if(A&&ot>r)break;e.push({value:ot})}return A&&y&&U!==r?e.length&&wi(e[e.length-1].value,r,vc(r,N,n))?e[e.length-1].value=r:e.push({value:r}):(!A||U===r)&&e.push({value:U}),e}function vc(n,t,{horizontal:e,minRotation:i}){const s=pe(i),o=(e?Math.sin(s):Math.cos(s))||.001,a=.75*t*(""+n).length;return Math.min(t/o,a)}class qs extends En{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return yt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const a=c=>s=e?s:c,r=c=>o=i?o:c;if(t){const c=Ce(s),u=Ce(o);c<0&&u<0?r(0):c>0&&u>0&&a(0)}if(s===o){let c=o===0?1:Math.abs(o*.05);r(o+c),t||a(s-c)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},o=this._range||this,a=Um(s,o);return t.bounds==="ticks"&&Uc(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Bi(t,this.chart.options.locale,this.options.ticks.format)}}class _a extends qs{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=It(t)?t:0,this.max=It(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=pe(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}q(_a,"id","linear"),q(_a,"defaults",{ticks:{callback:Gs.formatters.numeric}});const Fi=n=>Math.floor(Ye(n)),mn=(n,t)=>Math.pow(10,Fi(n)+t);function xc(n){return n/Math.pow(10,Fi(n))===1}function wc(n,t,e){const i=Math.pow(10,e),s=Math.floor(n/i);return Math.ceil(t/i)-s}function Ym(n,t){const e=t-n;let i=Fi(e);for(;wc(n,t,i)>10;)i++;for(;wc(n,t,i)<10;)i--;return Math.min(i,Fi(n))}function qm(n,{min:t,max:e}){t=le(n.min,t);const i=[],s=Fi(t);let o=Ym(t,e),a=o<0?Math.pow(10,Math.abs(o)):1;const r=Math.pow(10,o),c=s>o?Math.pow(10,s):0,u=Math.round((t-c)*a)/a,h=Math.floor((t-c)/r/10)*r*10;let p=Math.floor((u-h)/Math.pow(10,o)),y=le(n.min,Math.round((c+h+p*Math.pow(10,o))*a)/a);for(;y<e;)i.push({value:y,major:xc(y),significand:p}),p>=10?p=p<15?15:20:p++,p>=20&&(o++,p=2,a=o>=0?1:a),y=Math.round((c+h+p*Math.pow(10,o))*a)/a;const g=le(n.max,y);return i.push({value:g,major:xc(g),significand:p}),i}class Sa extends En{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=qs.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return It(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=It(t)?Math.max(0,t):null,this.max=It(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!It(this._userMin)&&(this.min=t===mn(this.min,0)?mn(this.min,-1):mn(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const o=r=>i=t?i:r,a=r=>s=e?s:r;i===s&&(i<=0?(o(1),a(10)):(o(mn(i,-1)),a(mn(s,1)))),i<=0&&o(mn(s,-1)),s<=0&&a(mn(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=qm(e,this);return t.bounds==="ticks"&&Uc(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":Bi(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Ye(t),this._valueRange=Ye(this.max)-Ye(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Ye(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}q(Sa,"id","logarithmic"),q(Sa,"defaults",{ticks:{callback:Gs.formatters.logarithmic,major:{enabled:!0}}});function Da(n){const t=n.ticks;if(t.display&&n.display){const e=Zt(t.backdropPadding);return ft(t.font&&t.font.size,Ft.font.size)+e.height}return 0}function Km(n,t,e){return e=Ot(e)?e:[e],{w:tf(n,t.string,e),h:e.length*t.lineHeight}}function kc(n,t,e,i,s){return n===i||n===s?{start:t-e/2,end:t+e/2}:n<i||n>s?{start:t-e,end:t}:{start:t,end:t+e}}function Xm(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],s=[],o=n._pointLabels.length,a=n.options.pointLabels,r=a.centerPointLabels?Tt/o:0;for(let c=0;c<o;c++){const u=a.setContext(n.getPointLabelContext(c));s[c]=u.padding;const h=n.getPointPosition(c,n.drawingArea+s[c],r),p=zt(u.font),y=Km(n.ctx,p,n._pointLabels[c]);i[c]=y;const g=de(n.getIndexAngle(c)+r),x=Math.round(Xa(g)),w=kc(x,h.x,y.w,0,180),S=kc(x,h.y,y.h,90,270);Gm(e,t,g,w,S)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=Zm(n,i,s)}function Gm(n,t,e,i,s){const o=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let r=0,c=0;i.start<t.l?(r=(t.l-i.start)/o,n.l=Math.min(n.l,t.l-r)):i.end>t.r&&(r=(i.end-t.r)/o,n.r=Math.max(n.r,t.r+r)),s.start<t.t?(c=(t.t-s.start)/a,n.t=Math.min(n.t,t.t-c)):s.end>t.b&&(c=(s.end-t.b)/a,n.b=Math.max(n.b,t.b+c))}function Jm(n,t,e){const i=n.drawingArea,{extra:s,additionalAngle:o,padding:a,size:r}=e,c=n.getPointPosition(t,i+s+a,o),u=Math.round(Xa(de(c.angle+Bt))),h=ny(c.y,r.h,u),p=ty(u),y=ey(c.x,r.w,p);return{visible:!0,x:c.x,y:h,textAlign:p,left:y,top:h,right:y+r.w,bottom:h+r.h}}function Qm(n,t){if(!t)return!0;const{left:e,top:i,right:s,bottom:o}=n;return!(Ie({x:e,y:i},t)||Ie({x:e,y:o},t)||Ie({x:s,y:i},t)||Ie({x:s,y:o},t))}function Zm(n,t,e){const i=[],s=n._pointLabels.length,o=n.options,{centerPointLabels:a,display:r}=o.pointLabels,c={extra:Da(o)/2,additionalAngle:a?Tt/s:0};let u;for(let h=0;h<s;h++){c.padding=e[h],c.size=t[h];const p=Jm(n,h,c);i.push(p),r==="auto"&&(p.visible=Qm(p,u),p.visible&&(u=p))}return i}function ty(n){return n===0||n===180?"center":n<180?"left":"right"}function ey(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function ny(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function iy(n,t,e){const{left:i,top:s,right:o,bottom:a}=e,{backdropColor:r}=t;if(!yt(r)){const c=kn(t.borderRadius),u=Zt(t.backdropPadding);n.fillStyle=r;const h=i-u.left,p=s-u.top,y=o-i+u.width,g=a-s+u.height;Object.values(c).some(x=>x!==0)?(n.beginPath(),Pi(n,{x:h,y:p,w:y,h:g,radius:c}),n.fill()):n.fillRect(h,p,y,g)}}function sy(n,t){const{ctx:e,options:{pointLabels:i}}=n;for(let s=t-1;s>=0;s--){const o=n._pointLabelItems[s];if(!o.visible)continue;const a=i.setContext(n.getPointLabelContext(s));iy(e,a,o);const r=zt(a.font),{x:c,y:u,textAlign:h}=o;Cn(e,n._pointLabels[s],c,u+r.lineHeight/2,r,{color:a.color,textAlign:h,textBaseline:"middle"})}}function Rd(n,t,e,i){const{ctx:s}=n;if(e)s.arc(n.xCenter,n.yCenter,t,0,At);else{let o=n.getPointPosition(0,t);s.moveTo(o.x,o.y);for(let a=1;a<i;a++)o=n.getPointPosition(a,t),s.lineTo(o.x,o.y)}}function oy(n,t,e,i,s){const o=n.ctx,a=t.circular,{color:r,lineWidth:c}=t;!a&&!i||!r||!c||e<0||(o.save(),o.strokeStyle=r,o.lineWidth=c,o.setLineDash(s.dash||[]),o.lineDashOffset=s.dashOffset,o.beginPath(),Rd(n,e,a,i),o.closePath(),o.stroke(),o.restore())}function ay(n,t,e){return Ze(n,{label:e,index:t,type:"pointLabel"})}class yi extends qs{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Zt(Da(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=It(t)&&!isNaN(t)?t:0,this.max=It(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Da(this.options))}generateTickLabels(t){qs.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const s=Mt(this.options.pointLabels.callback,[e,i],this);return s||s===0?s:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?Xm(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){const e=At/(this._pointLabels.length||1),i=this.options.startAngle||0;return de(t*e+pe(i))}getDistanceFromCenterForValue(t){if(yt(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(yt(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return ay(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-Bt+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:o}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),Rd(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:o}=e,a=this._pointLabels.length;let r,c,u;if(e.pointLabels.display&&sy(this,a),s.display&&this.ticks.forEach((h,p)=>{if(p!==0||p===0&&this.min<0){c=this.getDistanceFromCenterForValue(h.value);const y=this.getContext(p),g=s.setContext(y),x=o.setContext(y);oy(this,g,c,a,x)}}),i.display){for(t.save(),r=a-1;r>=0;r--){const h=i.setContext(this.getPointLabelContext(r)),{color:p,lineWidth:y}=h;!y||!p||(t.lineWidth=y,t.strokeStyle=p,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,c=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),u=this.getPointPosition(r,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(u.x,u.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let o,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,c)=>{if(c===0&&this.min>=0&&!e.reverse)return;const u=i.setContext(this.getContext(c)),h=zt(u.font);if(o=this.getDistanceFromCenterForValue(this.ticks[c].value),u.showLabelBackdrop){t.font=h.string,a=t.measureText(r.label).width,t.fillStyle=u.backdropColor;const p=Zt(u.backdropPadding);t.fillRect(-a/2-p.left,-o-h.size/2-p.top,a+p.width,h.size+p.height)}Cn(t,r.label,0,-o,h,{color:u.color,strokeColor:u.textStrokeColor,strokeWidth:u.textStrokeWidth})}),t.restore()}drawTitle(){}}q(yi,"id","radialLinear"),q(yi,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Gs.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),q(yi,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),q(yi,"descriptors",{angleLines:{_fallback:"grid"}});const eo={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},oe=Object.keys(eo);function _c(n,t){return n-t}function Sc(n,t){if(yt(t))return null;const e=n._adapter,{parser:i,round:s,isoWeekday:o}=n._parseOpts;let a=t;return typeof i=="function"&&(a=i(a)),It(a)||(a=typeof i=="string"?e.parse(a,i):e.parse(a)),a===null?null:(s&&(a=s==="week"&&(jn(o)||o===!0)?e.startOf(a,"isoWeek",o):e.startOf(a,s)),+a)}function Dc(n,t,e,i){const s=oe.length;for(let o=oe.indexOf(n);o<s-1;++o){const a=eo[oe[o]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(r*a.size))<=i)return oe[o]}return oe[s-1]}function ry(n,t,e,i,s){for(let o=oe.length-1;o>=oe.indexOf(e);o--){const a=oe[o];if(eo[a].common&&n._adapter.diff(s,i,a)>=t-1)return a}return oe[e?oe.indexOf(e):0]}function ly(n){for(let t=oe.indexOf(n)+1,e=oe.length;t<e;++t)if(eo[oe[t]].common)return oe[t]}function Cc(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:i,hi:s}=Ga(e,t),o=e[i]>=t?e[i]:e[s];n[o]=!0}}function cy(n,t,e,i){const s=n._adapter,o=+s.startOf(t[0].value,i),a=t[t.length-1].value;let r,c;for(r=o;r<=a;r=+s.add(r,1,i))c=e[r],c>=0&&(t[c].major=!0);return t}function Ec(n,t,e){const i=[],s={},o=t.length;let a,r;for(a=0;a<o;++a)r=t[a],s[r]=a,i.push({value:r,major:!1});return o===0||!e?i:cy(n,i,s,e)}class Ii extends En{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new bp._date(t.adapters.date);s.init(e),xi(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:Sc(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:a,maxDefined:r}=this.getUserBounds();function c(u){!a&&!isNaN(u.min)&&(s=Math.min(s,u.min)),!r&&!isNaN(u.max)&&(o=Math.max(o,u.max))}(!a||!r)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),s=It(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),o=It(o)&&!isNaN(o)?o:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,a=this.max,r=Hh(s,o,a);return this._unit=e.unit||(i.autoSkip?Dc(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):ry(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:ly(this._unit),this.initOffsets(s),t.reverse&&r.reverse(),Ec(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=Ut(e,0,a),i=Ut(i,0,a),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,o=s.time,a=o.unit||Dc(o.minUnit,e,i,this._getLabelCapacity(e)),r=ft(s.ticks.stepSize,1),c=a==="week"?o.isoWeekday:!1,u=jn(c)||c===!0,h={};let p=e,y,g;if(u&&(p=+t.startOf(p,"isoWeek",c)),p=+t.startOf(p,u?"day":a),t.diff(i,e,a)>1e5*r)throw new Error(e+" and "+i+" are too far apart with stepSize of "+r+" "+a);const x=s.ticks.source==="data"&&this.getDataTimestamps();for(y=p,g=0;y<i;y=+t.add(y,r,a),g++)Cc(h,y,x);return(y===i||s.bounds==="ticks"||g===1)&&Cc(h,y,x),Object.keys(h).sort(_c).map(w=>+w)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const s=this.options.time.displayFormats,o=this._unit,a=e||s[o];return this._adapter.format(t,a)}_tickFormatFunction(t,e,i,s){const o=this.options,a=o.ticks.callback;if(a)return Mt(a,[t,e,i],this);const r=o.time.displayFormats,c=this._unit,u=this._majorUnit,h=c&&r[c],p=u&&r[u],y=i[e],g=u&&p&&y&&y.major;return this._adapter.format(t,s||(g?p:h))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=pe(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(s),a=Math.sin(s),r=this._resolveTickFontOptions(0).size;return{w:i*o+r*a,h:i*a+r*o}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,o=this._tickFormatFunction(t,0,Ec(this,[t],this._majorUnit),s),a=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,i=s.length;e<i;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(Sc(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Kc(t.sort(_c))}}q(Ii,"id","time"),q(Ii,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Ds(n,t,e){let i=0,s=n.length-1,o,a,r,c;e?(t>=n[i].pos&&t<=n[s].pos&&({lo:i,hi:s}=Fe(n,"pos",t)),{pos:o,time:r}=n[i],{pos:a,time:c}=n[s]):(t>=n[i].time&&t<=n[s].time&&({lo:i,hi:s}=Fe(n,"time",t)),{time:o,pos:r}=n[i],{time:a,pos:c}=n[s]);const u=a-o;return u?r+(c-r)*(t-o)/u:r}class Ca extends Ii{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Ds(e,this.min),this._tableRange=Ds(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],o=[];let a,r,c,u,h;for(a=0,r=t.length;a<r;++a)u=t[a],u>=e&&u<=i&&s.push(u);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(a=0,r=s.length;a<r;++a)h=s[a+1],c=s[a-1],u=s[a],Math.round((h+c)/2)!==u&&o.push({time:u,pos:a/(r-1)});return o}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ds(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return Ds(this._table,i*this._tableRange+this._minPos,!0)}}q(Ca,"id","timeseries"),q(Ca,"defaults",Ii.defaults);var dy=Object.freeze({__proto__:null,CategoryScale:ka,LinearScale:_a,LogarithmicScale:Sa,RadialLinearScale:yi,TimeScale:Ii,TimeSeriesScale:Ca});const lr=[yp,Yg,Hm,dy];se.register(...lr);class Ea extends Nt{constructor(){super(),this.type="earnings",this.data=[],this.currency="USD",this.chart=null}firstUpdated(){this.renderChart()}updated(t){(t.has("data")||t.has("type"))&&this.renderChart()}renderChart(){if(console.log("Rendering chart with data:",this.data),!this.data||this.data.length===0){console.log("No data to render chart");return}const t=this.shadowRoot.querySelector("canvas");if(!t){console.error("Canvas element not found in shadow DOM");return}this.chart&&(console.log("Destroying existing chart"),this.chart.destroy()),console.log("Getting canvas context");const e=t.getContext("2d");let i,s;this.type==="earnings"?(i={labels:this.data.map(o=>o.day.substring(0,3)),datasets:[{label:"Earnings",data:this.data.map(o=>o.earnings),backgroundColor:"rgba(0, 122, 255, 0.5)",borderColor:"rgba(0, 122, 255, 1)",borderWidth:1,borderRadius:4,barThickness:16}]},s={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>new Intl.NumberFormat("en-US",{style:"currency",currency:this.currency}).format(o.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:o=>new Intl.NumberFormat("en-US",{style:"currency",currency:this.currency,maximumFractionDigits:0}).format(o)}}}}):(i={labels:this.data.map(o=>o.day.substring(0,3)),datasets:[{label:"Hours",data:this.data.map(o=>o.hours),backgroundColor:"rgba(52, 199, 89, 0.5)",borderColor:"rgba(52, 199, 89, 1)",borderWidth:1,borderRadius:4,barThickness:16}]},s={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>o.raw+" hours"}}},scales:{y:{beginAtZero:!0,ticks:{callback:o=>o+"h"}}}}),console.log("Creating chart with data:",i);try{this.chart=new se(e,{type:"bar",data:i,options:s}),console.log("Chart created successfully")}catch(o){console.error("Error creating chart:",o)}}render(){return W`<canvas></canvas>`}disconnectedCallback(){super.disconnectedCallback(),this.chart&&this.chart.destroy()}}q(Ea,"properties",{type:{type:String},data:{type:Array},currency:{type:String}}),q(Ea,"styles",Yt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `);customElements.define("summary-charts",Ea);se.register(...lr);class Ma extends Nt{constructor(){super(),this.data=[],this.currency="USD",this.chart=null}firstUpdated(){this.renderChart()}updated(t){t.has("data")&&this.renderChart()}renderChart(){if(console.log("Rendering expense pie chart with data:",this.data),!this.data||this.data.length===0){console.log("No data to render expense pie chart");return}const t=this.shadowRoot.querySelector("canvas");if(!t){console.error("Canvas element not found in shadow DOM");return}this.chart&&(console.log("Destroying existing chart"),this.chart.destroy()),console.log("Getting canvas context");const e=t.getContext("2d"),i={"Monthly Bills":"rgba(255, 149, 0, 0.8)","Everyday Spending":"rgba(52, 199, 89, 0.8)","Credit Cards":"rgba(255, 59, 48, 0.8)",Housing:"rgba(0, 122, 255, 0.8)",Utilities:"rgba(88, 86, 214, 0.8)",Transportation:"rgba(255, 204, 0, 0.8)",Food:"rgba(90, 200, 250, 0.8)",Entertainment:"rgba(255, 45, 85, 0.8)",Health:"rgba(175, 82, 222, 0.8)",Other:"rgba(142, 142, 147, 0.8)"},s={labels:this.data.map(a=>a.category),datasets:[{data:this.data.map(a=>a.amount),backgroundColor:this.data.map(a=>i[a.category]||"rgba(142, 142, 147, 0.7)"),borderColor:this.data.map(a=>{var r;return((r=i[a.category])==null?void 0:r.replace("0.7","1"))||"rgba(142, 142, 147, 1)"}),borderWidth:1,hoverOffset:4}]},o={responsive:!0,maintainAspectRatio:!1,cutout:"40%",radius:"90%",plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(255, 255, 255, 0.9)",titleColor:"#000",bodyColor:"#000",bodyFont:{family:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',size:14},padding:12,cornerRadius:8,boxPadding:6,borderColor:"rgba(0, 0, 0, 0.1)",borderWidth:1,callbacks:{label:a=>{const r=a.label||"",c=a.raw,u=a.dataset.data.reduce((p,y)=>p+y,0),h=Math.round(c/u*100);return`${r}: ${new Intl.NumberFormat("en-US",{style:"currency",currency:this.currency}).format(c)} (${h}%)`}}}},animation:{animateRotate:!0,animateScale:!0,duration:800,easing:"easeOutQuart"}};console.log("Creating pie chart with data:",s);try{this.chart=new se(e,{type:"pie",data:s,options:o}),console.log("Pie chart created successfully")}catch(a){console.error("Error creating pie chart:",a)}}render(){return W`<canvas></canvas>`}disconnectedCallback(){super.disconnectedCallback(),this.chart&&this.chart.destroy()}}q(Ma,"properties",{data:{type:Array},currency:{type:String}}),q(Ma,"styles",Yt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `);customElements.define("expense-pie-chart",Ma);class $a extends Nt{constructor(){super(),this.period="week",this.summaryData=null,this.isLoading=!0,this.settings={hourlyRate:10,currency:"USD",showTips:!0},this.currentDate=new Date}connectedCallback(){super.connectedCallback(),this.loadSettings(),this.loadSummaryData()}async loadSettings(){try{const t=await at.settings.get(1);t&&(this.settings=t)}catch(t){console.error("Error loading settings:",t)}}async loadSummaryData(){this.isLoading=!0;try{let t;this.period==="week"?t=await this.loadWeekData(this.currentDate):this.period==="month"?t=await this.loadMonthData(this.currentDate):this.period==="year"&&(t=await this.loadYearData(this.currentDate)),this.summaryData=t}catch(t){console.error("Error loading summary data:",t)}finally{this.isLoading=!1}}async loadLastMonthData(){console.log("Loading last month data");try{const t=new Date;t.setHours(0,0,0,0);const e=new Date(t.getFullYear(),t.getMonth(),1);e.setHours(0,0,0,0),console.log(`First day of current month: ${e.toISOString()}`);const i=new Date(e);i.setDate(i.getDate()-1);const s=new Date(i.getFullYear(),i.getMonth(),1);s.setHours(0,0,0,0);const o=s.getFullYear(),a=s.getMonth();console.log(`Last month is: ${o}-${a+1}`),console.log(`First day of last month: ${s.toISOString()}`),console.log(`Last day of last month: ${i.toISOString()}`);const r=await at.weeks.toArray();console.log(`Total weeks in database: ${r.length}`);let c=0,u=0,h=0;const p={};for(const N of r)if(console.log(`Checking week: ${N.id}`),N.days)for(const[C,I]of Object.entries(N.days))try{const V=this.getDayDateFromWeekAndDayKey(N.id,C);if(!V){console.log(`Skipping day ${C} - could not determine date`);continue}const U=new Date(V);U.setHours(0,0,0,0);const K=U.getMonth(),et=U.getFullYear();if(K===a&&et===o){console.log(`Including day ${C} (${U.toISOString()}) with hours: ${I.hours}`);const Q=I.hours||0,ot=I.tips||0;if(Q>0){c+=Q,u+=ot,h++;const dt=this.getDayNameFromKey(C);p[dt]||(p[dt]={hours:0,tips:0}),p[dt].hours+=Q,p[dt].tips+=ot}}else console.log(`Excluding day ${C} (${U.toISOString()}) - month: ${K+1}, year: ${et}, expected: ${a+1}/${o}`)}catch(V){console.error(`Error processing day ${C} in week ${N.id}:`,V)}console.log(`Last month totals - Hours: ${c}, Tips: ${u}, Days worked: ${h}`),console.log("Daily data for charts:",p);const y=h>0?c/h:0,g=c*this.settings.hourlyRate,x=g+(this.settings.showTips?u:0),w=h>0?x/h:0,S=Object.entries(p).map(([N,C])=>({day:N,hours:C.hours,earnings:C.hours*this.settings.hourlyRate+(this.settings.showTips?C.tips:0)})),O=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];return S.sort((N,C)=>O.indexOf(N.day)-O.indexOf(C.day)),{period:"lastMonth",dateRange:`Last Month (${["January","February","March","April","May","June","July","August","September","October","November","December"][a]} ${o})`,totalHours:c,totalEarnings:x,totalTips:u,basePay:g,daysWorked:h,avgHoursPerDay:y,avgEarningsPerDay:w,dailyData:S}}catch(t){return console.error("Error in loadLastMonthData:",t),this.createEmptySummaryData("lastMonth")}}async loadWeekData(t=new Date){const e=new Date(t),i=e.getDay(),s=e.getDate()-i+(i===0?-6:1),o=new Date(e);o.setDate(s),o.setHours(0,0,0,0);const a=o.toISOString().split("T")[0];console.log(`Loading week data for date: ${e.toISOString()}`),console.log(`Calculated Monday: ${o.toISOString()}`),console.log(`Week ID: ${a}`);const r=await at.weeks.get(a);console.log("Week data retrieved:",r);const c=new Date,u=o<c,h=o>c,p=oa(a);if(!r)return console.log("No week data found, returning empty data"),{...this.createEmptySummaryData(),period:"week",dateRange:u?`Past: ${p}`:h?`Future: ${p}`:p};const y=Object.values(r.days).filter(A=>A.hours>0).length,g=y>0?r.totalHours/y:0,x=y>0?(r.totalHours*this.settings.hourlyRate+(this.settings.showTips?r.totalTips:0))/y:0;console.log(`Days worked: ${y}, Avg hours: ${g}, Avg earnings: ${x}`);const w=Object.entries(r.days).map(([A,j])=>({dayKey:A,day:this.getDayNameFromKey(A),hours:j.hours||0,tips:j.tips||0,earnings:(j.hours||0)*this.settings.hourlyRate+(this.settings.showTips&&j.tips||0)})).sort((A,j)=>{const N={mon:0,tue:1,wed:2,thu:3,fri:4,sat:5,sun:6};return N[A.dayKey]-N[j.dayKey]});console.log("Daily data for charts:",w);const S=u?`Past: ${p}`:h?`Future: ${p}`:p;return console.log(`Date range: ${S}`),console.log("Expense data loading is temporarily disabled"),{period:"week",dateRange:S,totalHours:r.totalHours||0,totalEarnings:(r.totalHours||0)*this.settings.hourlyRate+(this.settings.showTips&&r.totalTips||0),totalTips:r.totalTips||0,basePay:(r.totalHours||0)*this.settings.hourlyRate,daysWorked:y,avgHoursPerDay:g,avgEarningsPerDay:x,dailyData:w}}async loadMonthData(t=new Date){const e=new Date(t),i=e.getFullYear(),s=e.getMonth();console.log(`Loading month data for: ${i}-${s+1} (${e.toISOString()})`);const o=await this.getWeeksInMonth(i,s);console.log(`Found ${o.length} weeks in month ${i}-${s+1}`);const a=new Date,r=a.getMonth(),c=a.getFullYear(),u=i<c||i===c&&s<r,h=i>c||i===c&&s>r,p=eh(new Date(i,s,1),!0),y=u?`Past: ${p}`:h?`Future: ${p}`:p;if(o.length===0)return console.log("No weeks found in month, returning empty data"),{...this.createEmptySummaryData(this.period==="lastMonth"?"lastMonth":"month"),dateRange:y};let g=0,x=0,w=0;const S={};for(const et of o)if(console.log(`Processing week: ${et.id}`),g+=et.totalHours||0,x+=et.totalTips||0,et.days)for(const[Q,ot]of Object.entries(et.days)){const dt=this.getDayDateFromWeekAndDayKey(et.id,Q);if(dt&&dt.getMonth()===s&&dt.getFullYear()===i){if(console.log(`Processing day ${Q} (${dt.toISOString()}) with hours: ${ot.hours}`),ot.hours>0){w++;const wt=this.getDayNameFromKey(Q);S[wt]||(S[wt]={hours:0,tips:0}),S[wt].hours+=ot.hours||0,S[wt].tips+=ot.tips||0}}else dt&&console.log(`Skipping day ${Q} (${dt.toISOString()}) as it's not in the target month`)}console.log(`Total hours: ${g}, Total tips: ${x}, Days worked: ${w}`),console.log("Daily data aggregated:",S);const O=w>0?g/w:0,A=g*this.settings.hourlyRate,j=A+(this.settings.showTips?x:0),N=w>0?j/w:0,C=Object.entries(S).map(([et,Q])=>({day:et,hours:Q.hours,earnings:Q.hours*this.settings.hourlyRate+(this.settings.showTips?Q.tips:0)})),I=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];C.sort((et,Q)=>I.indexOf(et.day)-I.indexOf(Q.day)),console.log("Sorted daily data for charts:",C);const V=this.period==="lastMonth";console.log(`Is last month view: ${V}`);const U=V?`Last Month (${p})`:y;return console.log(`Final date range: ${U}`),console.log("Expense data loading is temporarily disabled"),{period:V?"lastMonth":"month",dateRange:U,totalHours:g,totalEarnings:j,totalTips:x,basePay:A,daysWorked:w,avgHoursPerDay:O,avgEarningsPerDay:N,dailyData:C}}getDayDateFromWeekAndDayKey(t,e){try{const i=new Date(t),s={mon:0,tue:1,wed:2,thu:3,fri:4,sat:5,sun:6};if(s[e]===void 0)return console.error(`Invalid day key: ${e}`),null;const o=new Date(i);return o.setDate(i.getDate()+s[e]),o}catch(i){return console.error(`Error getting date for week ${t} and day ${e}:`,i),null}}async loadYearData(t=new Date){const i=new Date(t).getFullYear();console.log(`Loading year data for: ${i}`);const s=await at.weeks.toArray();console.log(`Total weeks in database: ${s.length}`);const a=new Date().getFullYear(),r=i<a,c=i>a,u=Array(12).fill(0),h=Array(12).fill(0),p=Array(12).fill(0),y=new Set;let g=0,x=0,w=0;for(const U of s)try{const K=new Date(U.id);if(U.days)for(const[et,Q]of Object.entries(U.days))try{const ot=this.getDayDateFromWeekAndDayKey(U.id,et);if(!ot){console.log(`Skipping day ${et} - could not determine date`);continue}if(ot.getFullYear()===i){const dt=ot.getMonth(),wt=Q.hours||0,ct=Q.tips||0;wt>0&&(g+=wt,x+=ct,w++,u[dt]+=wt,p[dt]+=ct,h[dt]+=wt*this.settings.hourlyRate+(this.settings.showTips?ct:0),y.add(dt))}}catch(ot){console.error(`Error processing day ${et} in week ${U.id}:`,ot)}}catch(K){console.error(`Error processing week ${U.id}:`,K)}console.log(`Year totals - Hours: ${g}, Tips: ${x}, Days worked: ${w}`);const S=w>0?g/w:0,O=g*this.settings.hourlyRate,A=O+(this.settings.showTips?x:0),j=w>0?A/w:0,C=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((U,K)=>({day:U,hours:u[K],earnings:h[K]})),I=r?`Past: ${i}`:c?`Future: ${i}`:`${i}`;return y.size===0?(console.log(`No data found for year ${i}, returning empty data`),{...this.createEmptySummaryData("year"),dateRange:I}):(console.log("Monthly data for charts:",C),console.log("Expense data loading is temporarily disabled"),{period:"year",dateRange:I,totalHours:g,totalEarnings:A,totalTips:x,basePay:O,daysWorked:w,avgHoursPerDay:S,avgEarningsPerDay:j,dailyData:C})}async getWeeksInMonth(t,e){console.log(`Getting weeks in month: ${t}-${e+1}`);const i=await at.weeks.toArray();console.log(`Total weeks in database: ${i.length}`);const s=i.filter(o=>{try{const a=new Date(o.id);for(let r=0;r<7;r++){const c=new Date(a);if(c.setDate(a.getDate()+r),c.getFullYear()===t&&c.getMonth()===e)return console.log(`Week ${o.id} has day ${c.toISOString()} in target month`),!0}return console.log(`Week ${o.id} has no days in target month ${t}-${e+1}`),!1}catch(a){return console.error(`Error processing week ${o.id}:`,a),!1}});return console.log(`Found ${s.length} weeks with days in month ${t}-${e+1}`),s}createEmptySummaryData(t="week"){const e=new Date().getFullYear(),i=[{category:"Monthly Bills",amount:0},{category:"Everyday Spending",amount:0},{category:"Credit Cards",amount:0}];return{period:t,dateRange:t==="week"?"This Week":t==="month"?"This Month":t==="year"?`${e}`:"No Data",totalHours:0,totalEarnings:0,totalTips:0,basePay:0,daysWorked:0,avgHoursPerDay:0,avgEarningsPerDay:0,totalExpenses:0,expenseCategories:i,dailyData:t==="year"?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(s=>({day:s,hours:0,earnings:0})):[]}}getDayNameFromKey(t){return{mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"}[t]||t}handlePeriodChange(t){console.log(`Changing period from ${this.period} to ${t}`),this.period!==t&&((this.period==="week"&&(t==="month"||t==="year")||this.period==="month"&&(t==="week"||t==="year")||this.period==="year"&&(t==="week"||t==="month"))&&(console.log("Resetting current date to today"),this.currentDate=new Date),this.period=t,this.loadSummaryData())}navigatePrevious(){if(console.log("Navigating to previous period:",this.period),console.log("Current date before navigation:",this.currentDate),this.period==="week"){const t=new Date(this.currentDate);t.setDate(t.getDate()-7),this.currentDate=t,console.log("New date after navigation:",this.currentDate),this.loadSummaryData()}else if(this.period==="month"){const t=new Date(this.currentDate);t.setMonth(t.getMonth()-1),this.currentDate=t,console.log("New date after navigation:",this.currentDate),this.loadSummaryData()}else if(this.period==="year"){const t=new Date(this.currentDate);t.setFullYear(t.getFullYear()-1),this.currentDate=t,console.log("New date after navigation:",this.currentDate),this.loadSummaryData()}}navigateNext(){if(console.log("Navigating to next period:",this.period),console.log("Current date before navigation:",this.currentDate),new Date().setHours(0,0,0,0),this.period==="week"){const e=new Date(this.currentDate);e.setDate(e.getDate()+7),console.log("New date after navigation:",e),console.log("Navigating to next week"),this.currentDate=e,this.loadSummaryData()}else if(this.period==="month"){const e=new Date(this.currentDate);e.setMonth(e.getMonth()+1);const i=e.getMonth(),s=e.getFullYear();console.log(`New month/year: ${i+1}/${s}`),console.log("Navigating to next month"),this.currentDate=e,this.loadSummaryData()}else if(this.period==="year"){const e=new Date(this.currentDate);e.setFullYear(e.getFullYear()+1);const i=e.getFullYear();console.log(`New year: ${i}`),console.log("Navigating to next year"),this.currentDate=e,this.loadSummaryData()}}render(){var t,e,i,s,o,a,r,c,u,h,p,y,g,x,w,S,O,A,j,N,C;return this.isLoading?W`
        <div class="loading">
          Loading summary data...
        </div>
      `:W`
      <!-- Period selector (iOS-style segmented control) -->
      <div class="period-selector">
        <div
          class="period-option ${this.period==="week"?"active":""}"
          @click=${()=>this.handlePeriodChange("week")}
        >
          Week
        </div>
        <div
          class="period-option ${this.period==="month"?"active":""}"
          @click=${()=>this.handlePeriodChange("month")}
        >
          Month
        </div>
        <div
          class="period-option ${this.period==="year"?"active":""}"
          @click=${()=>this.handlePeriodChange("year")}
        >
          Year
        </div>
      </div>

      <!-- Date navigation -->
      <div class="date-navigation">
        <div class="nav-arrow" @click=${()=>this.navigatePrevious()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div class="date-range ${(e=(t=this.summaryData)==null?void 0:t.dateRange)!=null&&e.includes("Future:")?"future-date":(s=(i=this.summaryData)==null?void 0:i.dateRange)!=null&&s.includes("Past:")?"past-date":""}">
          ${((o=this.summaryData)==null?void 0:o.dateRange)||"No data"}
        </div>
        <div class="nav-arrow" @click=${()=>this.navigateNext()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Earnings summary card -->
      <div class="summary-card ${(r=(a=this.summaryData)==null?void 0:a.dateRange)!=null&&r.includes("Future:")?"future-projection":""}">
        <div class="card-title">Total Earnings</div>
        <div class="amount-large">
          ${pt(((c=this.summaryData)==null?void 0:c.totalEarnings)||0,this.settings.currency)}
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Base Pay</div>
            <div class="breakdown-value">
              ${pt(((u=this.summaryData)==null?void 0:u.basePay)||0,this.settings.currency)}
            </div>
          </div>

          ${this.settings.showTips?W`
            <div class="breakdown-item">
              <div class="breakdown-label">Tips</div>
              <div class="breakdown-value">
                ${pt(((h=this.summaryData)==null?void 0:h.totalTips)||0,this.settings.currency)}
              </div>
            </div>
          `:""}

          <div class="breakdown-item">
            <div class="breakdown-label">Per Day</div>
            <div class="breakdown-value">
              ${pt(((p=this.summaryData)==null?void 0:p.avgEarningsPerDay)||0,this.settings.currency)}
            </div>
          </div>
        </div>

        <!-- Earnings chart -->
        <div class="chart-container">
          ${((g=(y=this.summaryData)==null?void 0:y.dailyData)==null?void 0:g.length)>0?W`<summary-charts
                type="earnings"
                .data=${this.summaryData.dailyData}
                currency=${this.settings.currency}
              ></summary-charts>`:W`<div class="placeholder-chart">
                No earnings data available
              </div>`}
        </div>
      </div>

      <!-- Hours summary card -->
      <div class="summary-card ${(w=(x=this.summaryData)==null?void 0:x.dateRange)!=null&&w.includes("Future:")?"future-projection":""}">
        <div class="card-title">Hours Worked</div>
        <div class="amount-large">
          ${((S=this.summaryData)==null?void 0:S.totalHours)||0}h
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Days Worked</div>
            <div class="breakdown-value">
              ${((O=this.summaryData)==null?void 0:O.daysWorked)||0}
            </div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Avg Per Day</div>
            <div class="breakdown-value">
              ${((j=(A=this.summaryData)==null?void 0:A.avgHoursPerDay)==null?void 0:j.toFixed(1))||0}h
            </div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Hourly Rate</div>
            <div class="breakdown-value">
              ${pt(this.settings.hourlyRate,this.settings.currency)}
            </div>
          </div>
        </div>

        <!-- Hours chart -->
        <div class="chart-container">
          ${((C=(N=this.summaryData)==null?void 0:N.dailyData)==null?void 0:C.length)>0?W`<summary-charts
                type="hours"
                .data=${this.summaryData.dailyData}
                currency=${this.settings.currency}
              ></summary-charts>`:W`<div class="placeholder-chart">
                No hours data available
              </div>`}
        </div>
      </div>

      <!-- Expenses summary card - temporarily disabled until we fix the data issue -->
      <!-- We'll re-enable this once we've fixed the underlying data issue -->
      ${""}
    `}}q($a,"properties",{period:{type:String},summaryData:{type:Object},isLoading:{type:Boolean},settings:{type:Object},currentDate:{type:Object}}),q($a,"styles",Yt`
    :host {
      display: block;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .period-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      padding: 2px;
    }

    .period-option {
      flex: 1;
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: #8e8e93;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .period-option.active {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .summary-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }

    /* Style for future projection cards */
    .future-projection {
      border: 2px solid rgba(0, 122, 255, 0.3);
    }

    .future-projection::before {
      content: "Projection";
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: #8e8e93;
      margin-bottom: 8px;
    }

    .amount-large {
      font-size: 32px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .amount-positive {
      color: #34c759;
    }

    .amount-negative {
      color: #ff3b30;
    }

    .breakdown {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .breakdown-item {
      text-align: center;
    }

    .breakdown-label {
      font-size: 13px;
      color: #8e8e93;
      margin-bottom: 4px;
    }

    .breakdown-value {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
    }

    .percentage {
      font-size: 13px;
      color: #8e8e93;
      margin-left: 4px;
    }

    .chart-container {
      height: 200px;
      margin-top: 16px;
      position: relative;
    }

    .placeholder-chart {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      color: #8e8e93;
      font-size: 15px;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .date-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .date-range {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    /* Style for future dates */
    .future-date {
      color: #007aff;
      font-weight: 700;
    }

    /* Style for past dates */
    .past-date {
      color: #8e8e93;
    }

    .nav-arrow {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(142, 142, 147, 0.12);
      cursor: pointer;
    }

    .nav-arrow svg {
      width: 16px;
      height: 16px;
      stroke: #8e8e93;
    }
  `);customElements.define("summary-view",$a);const Un="hour-halo-fixed-expenses";function Re(){try{const n=localStorage.getItem(Un);if(!n)return console.log("No fixed expenses found in localStorage"),[];const t=JSON.parse(n);return console.log("Fixed expenses from localStorage:",t),t}catch(n){return console.error("Error getting fixed expenses:",n),[]}}function Aa(n){try{const t=Re(),e=Date.now(),i={...n,id:e,createdAt:new Date().toISOString()};return t.push(i),localStorage.setItem(Un,JSON.stringify(t)),e}catch(t){return console.error("Error adding fixed expense:",t),null}}function uy(n,t){try{const e=Re(),i=e.findIndex(s=>s.id===n);return i===-1?!1:(e[i]={...e[i],...t},localStorage.setItem(Un,JSON.stringify(e)),!0)}catch(e){return console.error("Error updating fixed expense:",e),!1}}function hy(n){try{const e=Re().filter(i=>i.id!==n);return localStorage.setItem(Un,JSON.stringify(e)),!0}catch(t){return console.error("Error deleting fixed expense:",t),!1}}function fy(){try{return localStorage.removeItem(Un),!0}catch(n){return console.error("Error clearing fixed expenses:",n),!1}}function Ld(n){try{const t=Re(),e=t.findIndex(i=>i.id===n);return e===-1?!1:(t[e].isPaid=!t[e].isPaid,localStorage.setItem(Un,JSON.stringify(t)),!0)}catch(t){return console.error("Error toggling fixed expense paid status:",t),!1}}function py(){try{return Re().reduce((t,e)=>{const i=parseFloat(e.amount)||0;return t+i},0)}catch(n){return console.error("Error calculating total fixed expenses:",n),0}}async function Ta(){try{const n=await at.creditCards.toArray();return console.log("Credit cards from database:",n),n}catch(n){return console.error("Error getting credit cards:",n),[]}}async function fe(n){try{return await at.creditCards.get(n)}catch(t){return console.error(`Error getting credit card with ID ${n}:`,t),null}}async function Bd(n){try{const t={...n,limit:parseFloat(n.limit)||0,currentBalance:parseFloat(n.currentBalance)||0,minimumPayment:parseFloat(n.minimumPayment)||0,apr:parseFloat(n.apr)||0,reminderEnabled:n.reminderEnabled||!1,reminderDays:n.reminderDays||3,lastReminderSent:n.lastReminderSent||null,isActive:!0,createdAt:new Date().toISOString()};return await at.creditCards.add(t)}catch(t){throw console.error("Error adding credit card:",t),t}}async function ce(n,t){try{const e={...t};return"limit"in e&&(e.limit=parseFloat(e.limit)||0),"currentBalance"in e&&(e.currentBalance=parseFloat(e.currentBalance)||0),"minimumPayment"in e&&(e.minimumPayment=parseFloat(e.minimumPayment)||0),"apr"in e&&(e.apr=parseFloat(e.apr)||0),await at.creditCards.update(n,e),n}catch(e){throw console.error(`Error updating credit card with ID ${n}:`,e),e}}async function gy(n){try{await at.creditCardPayments.where("cardId").equals(n).delete(),await at.creditCards.delete(n)}catch(t){throw console.error(`Error deleting credit card with ID ${n}:`,t),t}}async function my(n){try{if(console.log("CREDIT CARD MANAGER: Recording payment:",n),console.log("CREDIT CARD MANAGER: Payment date:",n.date),console.log("CREDIT CARD MANAGER: Payment date type:",typeof n.date),!n.cardId||!n.amount||!n.date||!n.type)throw new Error("Missing required payment fields");const t={...n,amount:parseFloat(n.amount)||0,createdAt:new Date().toISOString()};console.log("CREDIT CARD MANAGER: Payment object to add to database:",t);const e=await at.creditCardPayments.add(t),i=await fe(n.cardId);if(i){const s=Math.max(0,i.currentBalance-n.amount);await ce(i.id,{currentBalance:s})}return e}catch(t){throw console.error("Error recording credit card payment:",t),t}}async function cr(n){try{console.log(`CREDIT CARD MANAGER: Getting payments for card ID ${n}`);const t=await at.creditCardPayments.where("cardId").equals(n).reverse().toArray();return console.log(`CREDIT CARD MANAGER: Found ${t.length} payments for card ID ${n}`),t.forEach((e,i)=>{if(console.log(`CREDIT CARD MANAGER: Payment ${i+1} date:`,e.date),console.log(`CREDIT CARD MANAGER: Payment ${i+1} date type:`,typeof e.date),e.date){const s=new Date(e.date);console.log(`CREDIT CARD MANAGER: Date object created from payment ${i+1} date:`,s),console.log("CREDIT CARD MANAGER: Date object toISOString:",s.toISOString()),console.log("CREDIT CARD MANAGER: Date object toLocaleDateString:",s.toLocaleDateString())}}),t}catch(t){return console.error(`Error getting payments for card ID ${n}:`,t),[]}}async function yy(n){try{const t=await at.creditCardPayments.get(n);if(t){const e=await fe(t.cardId);if(e){const i=e.currentBalance+t.amount;await ce(e.id,{currentBalance:i})}await at.creditCardPayments.delete(n)}}catch(t){throw console.error(`Error deleting payment with ID ${n}:`,t),t}}function by(n){return!n||!n.currentBalance||!n.apr?0:n.currentBalance*(n.apr/100)/12}function vy(n){return!n||!n.limit||n.limit<=0?0:Math.min(100,n.currentBalance/n.limit*100)}function Mc(n){if(!n)return{text:"No due date",status:"none"};const t=new Date;t.setHours(0,0,0,0);const e=new Date(n);e.setHours(0,0,0,0);const i=e-t,s=Math.ceil(i/(1e3*60*60*24)),o={month:"short",day:"numeric"},a=e.toLocaleDateString("en-US",o);let r="normal",c=`Due ${a}`;return s<0?(r="overdue",c=`Overdue (${a})`):s===0?(r="due-today",c="Due Today"):s<=3&&(r="due-soon",c=`Due ${a} (${s} days)`),{text:c,status:r}}async function xy(n={}){try{const t=new Date(Date.now()-2592e6),e=new Date,i=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),a=`${i}-${s}-${o}`,r=e.getFullYear(),c=String(e.getMonth()+1).padStart(2,"0"),u=String(e.getDate()).padStart(2,"0"),h=`${r}-${c}-${u}`;console.log(`Using local date range: ${a} to ${h}`);const p={startDate:a,endDate:h,types:["hour","tips","payment","expense","bill","card-payment"],limit:100,offset:0};console.log(`Default date range: ${a} to ${h}`);const y={...p,...n};console.log("HISTORY MANAGER: Getting transaction history with options:",y);let g=[];const x=await at.settings.get(1),w=(x==null?void 0:x.hourlyRate)||10;if(y.types.includes("hour")){console.log("HISTORY MANAGER: Fetching hours from Week tab...");try{const A=await at.weeks.toArray();console.log("HISTORY MANAGER: Found weeks:",A.length);let j=[],N=[];for(const C of A){if(!C||!C.days){console.log(`Skipping week ${(C==null?void 0:C.id)||"unknown"}: No days data`);continue}console.log(`Processing week: ${C.id}`);try{const[I,V,U]=C.id.split("-").map(Q=>parseInt(Q,10)),K=new Date(I,V-1,U);console.log(`Week starts on Monday: ${K.toDateString()}`);const et=[{key:"mon",name:"Monday",index:0},{key:"tue",name:"Tuesday",index:1},{key:"wed",name:"Wednesday",index:2},{key:"thu",name:"Thursday",index:3},{key:"fri",name:"Friday",index:4},{key:"sat",name:"Saturday",index:5},{key:"sun",name:"Sunday",index:6}];for(const{key:Q,name:ot,index:dt}of et){const wt=C.days[Q];if(!wt){console.log(`No data for ${ot}, skipping`);continue}const ct=parseFloat(wt.hours)||0,bt=parseFloat(wt.tips)||0;if(ct<=0){console.log(`Skipping ${ot}: No hours recorded`);continue}const Ct=new Date(K);Ct.setDate(K.getDate()+dt);let kt=Ct.toISOString().split("T")[0];try{const _t=kt.split("-"),Ht=parseInt(_t[0]),ye=parseInt(_t[1])-1,be=parseInt(_t[2]),qt=new Date(Date.UTC(Ht,ye,be));qt.setUTCDate(qt.getUTCDate()+1),kt=qt.toISOString().split("T")[0],console.log(`  Adjusted income date by adding one day: ${kt}`)}catch(_t){console.error(`  Error adjusting income date: ${_t}`)}if(console.log(`${ot} (${kt}): Hours=${ct}, Tips=${bt}`),kt>=y.startDate&&kt<=y.endDate){const _t=`${C.id}-${Q}`;j.push({id:`hour-${_t}`,type:"hour",date:kt,amount:ct*w,description:`Worked ${ct} hours on ${ot}`,category:"Income",details:{hours:ct,rate:w,notes:`Hours worked on ${ot}`},isIncome:!0,source:"week-tab"}),console.log(`✅ Added hours entry for ${kt}: ${ct} hours`),bt>0&&(N.push({id:`tips-${_t}`,type:"tips",date:kt,amount:bt,description:`Tips earned on ${ot}`,category:"Tips",details:{hours:ct,tips:bt,notes:`Tips earned on ${ot}`},isIncome:!0,source:"week-tab"}),console.log(`✅ Added tips entry for ${kt}: $${bt}`))}else console.log(`⏭️ Skipped ${kt}: Outside date range ${y.startDate} to ${y.endDate}`)}}catch(I){console.error(`Error processing week ${C.id}:`,I)}}console.log("HISTORY MANAGER: Hours transactions:",j.length),console.log("HISTORY MANAGER: Tips transactions:",N.length),g=[...g,...j,...N]}catch(A){console.error("HISTORY MANAGER: Error processing hours:",A)}}if(y.types.includes("expense")){console.log("HISTORY MANAGER: Fetching expenses from Spend tab...");const A=await at.expenses.toArray();console.log("HISTORY MANAGER: Found expenses:",A.length);const j=A.filter(C=>C.date>=y.startDate&&C.date<=y.endDate);console.log("HISTORY MANAGER: Filtered expenses:",j.length);const N=j.map(C=>{let I=C.date;console.log(`Processing expense: ${C.name}, Original date: ${I}`),I instanceof Date&&(I=I.toISOString().split("T")[0],console.log(`  Converted date object to UTC string: ${I}`)),I&&I.includes("T")&&(I=I.split("T")[0],console.log(`  Stripped time component: ${I}`)),(!I||!I.match(/^\d{4}-\d{2}-\d{2}$/))&&(console.warn(`  Invalid date format for expense ${C.id}: ${I}`),I=new Date().toISOString().split("T")[0],console.log(`  Using default UTC date: ${I}`));try{const V=I.split("-"),U=parseInt(V[0]),K=parseInt(V[1])-1,et=parseInt(V[2]),Q=new Date(Date.UTC(U,K,et));Q.setUTCDate(Q.getUTCDate()+1),I=Q.toISOString().split("T")[0],console.log(`  Adjusted date by adding one day: ${I}`)}catch(V){console.error(`  Error adjusting date: ${V}`)}return{id:`expense-${C.id}`,type:"expense",date:I,amount:parseFloat(C.amount)||0,description:C.name||"Expense",category:C.category||"Uncategorized",details:{paymentMethod:C.paymentMethod||"cash",notes:C.notes,weekId:C.weekId,monthId:C.monthId,isRecurring:C.isRecurring||!1},isIncome:!1,source:"spend-tab"}});console.log("HISTORY MANAGER: Expense transactions:",N.length),g=[...g,...N]}if(y.types.includes("bill")){console.log("HISTORY MANAGER: Fetching bills from Spend tab...");const A=Re();console.log("HISTORY MANAGER: Found fixed expenses:",A.length);const j=A.filter(C=>C.dueDate>=y.startDate&&C.dueDate<=y.endDate&&C.isActive!==!1);console.log("HISTORY MANAGER: Filtered fixed expenses:",j.length);const N=j.map(C=>{let I=C.dueDate;console.log(`Processing fixed expense: ${C.name}, Original date: ${I}`),I instanceof Date&&(I=I.toISOString().split("T")[0],console.log(`  Converted date object to UTC string: ${I}`)),I&&I.includes("T")&&(I=I.split("T")[0],console.log(`  Stripped time component: ${I}`)),(!I||!I.match(/^\d{4}-\d{2}-\d{2}$/))&&(console.warn(`  Invalid date format for fixed expense ${C.id}: ${I}`),I=new Date().toISOString().split("T")[0],console.log(`  Using default UTC date: ${I}`));try{const V=I.split("-"),U=parseInt(V[0]),K=parseInt(V[1])-1,et=parseInt(V[2]),Q=new Date(Date.UTC(U,K,et));Q.setUTCDate(Q.getUTCDate()+1),I=Q.toISOString().split("T")[0],console.log(`  Adjusted date by adding one day: ${I}`)}catch(V){console.error(`  Error adjusting date: ${V}`)}return{id:`bill-${C.id}`,type:"bill",date:I,amount:parseFloat(C.amount)||0,description:C.name||"Monthly Bill",category:C.category||"Bills",details:{paymentMethod:C.paymentMethod||"cash",isPaid:C.isPaid||!1,recurrenceFrequency:C.recurrenceFrequency||"Monthly",isActive:C.isActive!==!1},isIncome:!1,source:"spend-tab"}});console.log("HISTORY MANAGER: Bill transactions:",N.length),g=[...g,...N]}if(y.types.includes("payment")){console.log("HISTORY MANAGER: Fetching payments...");try{const A=await at.payments.toArray();console.log("HISTORY MANAGER: Found payments:",A.length);const j=A.filter(C=>C.date>=y.startDate&&C.date<=y.endDate);console.log("HISTORY MANAGER: Filtered payments:",j.length);const N=j.map(C=>{let I=C.date;console.log(`Processing payment: ${C.description}, Original date: ${I}`),I instanceof Date&&(I=I.toISOString().split("T")[0],console.log(`  Converted date object to UTC string: ${I}`)),I&&I.includes("T")&&(I=I.split("T")[0],console.log(`  Stripped time component: ${I}`)),(!I||!I.match(/^\d{4}-\d{2}-\d{2}$/))&&(console.warn(`  Invalid date format for payment ${C.id}: ${I}`),I=new Date().toISOString().split("T")[0],console.log(`  Using default UTC date: ${I}`));try{const V=I.split("-"),U=parseInt(V[0]),K=parseInt(V[1])-1,et=parseInt(V[2]),Q=new Date(Date.UTC(U,K,et));Q.setUTCDate(Q.getUTCDate()+1),I=Q.toISOString().split("T")[0],console.log(`  Adjusted date by adding one day: ${I}`)}catch(V){console.error(`  Error adjusting date: ${V}`)}return{id:`payment-${C.id}`,type:"payment",date:I,amount:parseFloat(C.amount)||0,description:C.description||"Payment",category:"Income",details:{method:C.method||"cash",notes:C.notes},isIncome:!0,source:"payment"}});console.log("HISTORY MANAGER: Payment transactions:",N.length),g=[...g,...N]}catch(A){console.error("HISTORY MANAGER: Error processing payments:",A)}}if(y.types.includes("card-payment")){console.log("HISTORY MANAGER: Fetching credit card payments from Spend tab...");const A=await Ta();console.log("HISTORY MANAGER: Found credit cards:",A.length);let j=[];for(const N of A)if(N.isActive!==!1){const C=await cr(N.id);console.log(`HISTORY MANAGER: Found payments for card ${N.name}:`,C.length);const I=C.filter(U=>U.date>=y.startDate&&U.date<=y.endDate);console.log(`HISTORY MANAGER: Filtered payments for card ${N.name}:`,I.length);const V=I.map(U=>{let K=U.date;console.log(`Processing card payment for ${N.name}, Original date: ${K}`),K instanceof Date&&(K=K.toISOString().split("T")[0],console.log(`  Converted date object to UTC string: ${K}`)),K&&K.includes("T")&&(K=K.split("T")[0],console.log(`  Stripped time component: ${K}`)),(!K||!K.match(/^\d{4}-\d{2}-\d{2}$/))&&(console.warn(`  Invalid date format for card payment ${U.id}: ${K}`),K=new Date().toISOString().split("T")[0],console.log(`  Using default UTC date: ${K}`));try{if(console.log(`  Original payment date: ${K}`),!K.match(/^\d{4}-\d{2}-\d{2}$/)){console.warn(`  Invalid date format: ${K}, using default`);const ct=new Date,bt=ct.getFullYear(),Ct=String(ct.getMonth()+1).padStart(2,"0"),kt=String(ct.getDate()).padStart(2,"0");K=`${bt}-${Ct}-${kt}`}const et=K.split("-"),Q=parseInt(et[0]),ot=parseInt(et[1])-1,dt=parseInt(et[2]),wt=new Date(Date.UTC(Q,ot,dt));wt.setUTCDate(wt.getUTCDate()+1),K=wt.toISOString().split("T")[0],console.log(`  Adjusted date by adding one day: ${K}`)}catch(et){console.error(`  Error processing card payment date: ${et}`)}return{id:`card-payment-${U.id}`,type:"card-payment",date:K,amount:parseFloat(U.amount)||0,description:`${U.type||"Credit Card"} Payment - ${N.name}`,category:"Credit Card Payment",details:{cardId:N.id,cardName:N.name,lastFourDigits:N.lastFourDigits,paymentType:U.type,notes:U.notes,color:N.color},isIncome:!1,source:"spend-tab"}});j=[...j,...V]}console.log("HISTORY MANAGER: Card payment transactions:",j.length),g=[...g,...j]}g.sort((A,j)=>new Date(j.date)-new Date(A.date)),y.limit&&(g=g.slice(y.offset,y.offset+y.limit)),console.log("HISTORY MANAGER: Final transactions count:",g.length);const S=g.reduce((A,j)=>(A[j.type]=(A[j.type]||0)+1,A),{});console.log("HISTORY MANAGER: Transaction summary by type:",S);const O=g.filter(A=>A.isIncome);return console.log(`HISTORY MANAGER: Income transactions (${O.length}):`),O.forEach(A=>{console.log(`  - ${A.date}: ${A.description} - ${A.amount}`)}),g}catch(t){return console.error("HISTORY MANAGER: Error fetching transaction history:",t),[]}}function wy(n,t={}){if(!n||!n.length)return[];console.log("Filtering transactions with filters:",t),console.log("Transactions before filtering:",n);const e=n.filter(i=>t.types&&t.types.length&&!t.types.includes(i.type)?(console.log(`Filtering out transaction ${i.id} because type ${i.type} is not in ${t.types}`),!1):t.category&&i.category!==t.category?(console.log(`Filtering out transaction ${i.id} because category ${i.category} is not ${t.category}`),!1):t.isIncome!==void 0&&i.isIncome!==t.isIncome?(console.log(`Filtering out transaction ${i.id} because isIncome ${i.isIncome} is not ${t.isIncome}`),!1):t.startDate&&i.date<t.startDate?(console.log(`Filtering out transaction ${i.id} because date ${i.date} is before ${t.startDate}`),!1):t.endDate&&i.date>t.endDate?(console.log(`Filtering out transaction ${i.id} because date ${i.date} is after ${t.endDate}`),!1):t.paymentMethod&&i.details&&i.details.paymentMethod!==t.paymentMethod?(console.log(`Filtering out transaction ${i.id} because paymentMethod ${i.details.paymentMethod} is not ${t.paymentMethod}`),!1):!0);return console.log("Transactions after filtering:",e),e}function ky(n,t){if(!t||!t.trim()||!n||!n.length)return n;const e=t.trim().toLowerCase();return n.filter(i=>!!(i.description&&i.description.toLowerCase().includes(e)||i.category&&i.category.toLowerCase().includes(e)||i.details&&i.details.notes&&i.details.notes.toLowerCase().includes(e)))}function _y(n){if(!n||!n.length)return[];const t={};return n.forEach(e=>{t[e.date]||(t[e.date]=[]),t[e.date].push(e)}),Object.keys(t).sort((e,i)=>new Date(i)-new Date(e)).map(e=>({date:e,transactions:t[e]}))}function Sy(n){if(!n||!n.length)return{totalIncome:0,totalExpenses:0,netBalance:0,categories:{},paymentMethods:{}};const t={totalIncome:0,totalExpenses:0,netBalance:0,categories:{},paymentMethods:{}};return n.forEach(e=>{e.isIncome?t.totalIncome+=parseFloat(e.amount)||0:t.totalExpenses+=parseFloat(e.amount)||0;const i=e.category||"Uncategorized";if(t.categories[i]||(t.categories[i]=0),t.categories[i]+=parseFloat(e.amount)||0,e.details&&e.details.paymentMethod){const s=e.details.paymentMethod;t.paymentMethods[s]||(t.paymentMethods[s]=0),t.paymentMethods[s]+=parseFloat(e.amount)||0}}),t.netBalance=t.totalIncome-t.totalExpenses,t}function Dy(n,t="transaction-history.csv"){if(!n||!n.length){console.error("No transactions to export");return}try{const e=["Date","Type","Description","Category","Amount","Income/Expense","Payment Method","Notes"],i=n.map(c=>{var u,h;return[c.date,c.type,c.description,c.category,c.amount.toFixed(2),c.isIncome?"Income":"Expense",((u=c.details)==null?void 0:u.paymentMethod)||"",((h=c.details)==null?void 0:h.notes)||""]}),s=[e.join(","),...i.map(c=>c.join(","))].join(`
`),o=new Blob([s],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a"),r=URL.createObjectURL(o);a.setAttribute("href",r),a.setAttribute("download",t),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)}catch(e){console.error("Error exporting transactions:",e)}}async function Cy(){try{console.log("Clearing sample payments...");const t=(await at.payments.toArray()).filter(e=>e.description==="Payment for Monday shift"||e.description==="Payment for last week").map(e=>e.id);return console.log(`Found ${t.length} sample payments to delete:`,t),t.length>0?(await at.payments.bulkDelete(t),console.log("Sample payments deleted successfully!")):console.log("No sample payments found."),window.dispatchEvent(new CustomEvent("hour-halo-data-changed",{detail:{type:"payments",action:"delete"}})),!0}catch(n){return console.error("Error clearing sample payments:",n),!1}}class Pa extends Nt{constructor(){super(),this.transactions=[],this.groupedTransactions=[],this.isLoading=!0;const t=new Date;t.setFullYear(t.getFullYear()+1),this.dateRange={startDate:new Date(Date.now()-30*24*60*60*1e3).toISOString().split("T")[0],endDate:t.toISOString().split("T")[0]},this.searchQuery="",this.activeFilter="all",this.activeDateRange="month",this.summaryStats={totalIncome:0,totalExpenses:0,netBalance:0},this.showDetailModal=!1,this.selectedTransaction=null,this.isClearing=!1,this.showClearConfirmation=!1,this.handleDateRangeChange("month")}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.loadTransactions()}setupEventListeners(){window.addEventListener("hour-halo-data-changed",t=>{console.log("HISTORY TAB: Data change detected:",t.detail),this.loadTransactions()}),window.addEventListener("hashchange",()=>{window.location.hash==="#history"&&(console.log("HISTORY TAB: Tab selected, refreshing data"),setTimeout(()=>{this.loadTransactions()},100))}),window.location.hash==="#history"&&(console.log("HISTORY TAB: Already on history tab, loading data"),setTimeout(()=>{this.loadTransactions()},100)),window.addEventListener("keydown",t=>{window.location.hash==="#history"&&(t.ctrlKey||t.metaKey)&&t.shiftKey&&t.key==="C"&&(console.log("Developer shortcut detected: Clearing sample data"),this.showClearSampleDataConfirmation(),t.preventDefault())})}async loadTransactions(){this.isLoading=!0,console.log("HISTORY TAB: Loading transactions..."),console.log("HISTORY TAB: Date range:",this.dateRange);try{const t=await xy({startDate:this.dateRange.startDate,endDate:this.dateRange.endDate,types:["hour","tips","payment","expense","bill","card-payment"]});console.log("HISTORY TAB: Loaded transactions:",t.length);const e=t.filter(s=>s.isIncome);console.log(`HISTORY TAB: Income transactions (${e.length}):`),e.forEach(s=>{console.log(`  - ${s.date}: ${s.description} - ${s.amount}`)});const i=t.reduce((s,o)=>(s[o.type]=(s[o.type]||0)+1,s),{});console.log("HISTORY TAB: Transactions by type:",i),this.transactions=t,this.applyFilters(),this.summaryStats=Sy(this.transactions),console.log("HISTORY TAB: Grouped transactions count:",this.groupedTransactions.length),this.groupedTransactions.forEach(s=>{console.log(`Group for date ${s.date}: ${s.transactions.length} transactions`)}),window.dispatchEvent(new CustomEvent("history-data-loaded",{detail:{count:t.length,dateRange:this.dateRange}}))}catch(t){console.error("HISTORY TAB: Error loading transactions:",t),this.transactions=[],this.groupedTransactions=[]}finally{this.isLoading=!1,this.requestUpdate()}}applyFilters(){let t=[...this.transactions];if(this.activeFilter!=="all"){const e={income:{isIncome:!0},expenses:{isIncome:!1},hours:{types:["hour"]},tips:{types:["tips"]},payments:{types:["payment"]},bills:{types:["bill"]}};console.log("Applying filter:",this.activeFilter,e[this.activeFilter]),t=wy(t,e[this.activeFilter]||{})}this.searchQuery&&(t=ky(t,this.searchQuery)),this.groupedTransactions=_y(t)}handleFilterChange(t){console.log("Changing filter to:",t),this.activeFilter=t,this.applyFilters(),this.requestUpdate()}handleSearchInput(t){console.log("Search query:",t.target.value),this.searchQuery=t.target.value,this.applyFilters(),this.requestUpdate()}handleDateRangeChange(t){console.log("Setting active date range to:",t),this.activeDateRange=t;const e=new Date,i=new Date;i.setFullYear(i.getFullYear()+1);const s=i.toISOString().split("T")[0];switch(t){case"week":const o=new Date;o.setDate(o.getDate()-7),this.dateRange={startDate:o.toISOString().split("T")[0],endDate:s};break;case"month":const a=new Date;a.setDate(a.getDate()-30),this.dateRange={startDate:a.toISOString().split("T")[0],endDate:s};break;case"quarter":const r=new Date;r.setDate(r.getDate()-90),this.dateRange={startDate:r.toISOString().split("T")[0],endDate:s};break;case"year":const c=new Date;c.setDate(c.getDate()-365),this.dateRange={startDate:c.toISOString().split("T")[0],endDate:s};break;case"future":this.dateRange={startDate:e.toISOString().split("T")[0],endDate:s};break;case"all":const u=new Date(2020,0,1);this.dateRange={startDate:u.toISOString().split("T")[0],endDate:s};break}console.log("Date range set to:",this.dateRange),this.requestUpdate(),this.loadTransactions()}openTransactionDetail(t){this.selectedTransaction=t,this.showDetailModal=!0}closeTransactionDetail(){this.showDetailModal=!1,this.selectedTransaction=null}exportTransactions(){let t=[];if(this.groupedTransactions&&this.groupedTransactions.length?this.groupedTransactions.forEach(o=>{o.transactions&&o.transactions.length&&(t=[...t,...o.transactions])}):t=this.transactions,!t.length){alert("No transactions to export");return}const e=new Date(this.dateRange.startDate).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=new Date(this.dateRange.endDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),s=`hour-halo-transactions-${e}-to-${i}.csv`;Dy(t,s)}showClearSampleDataConfirmation(){this.showClearConfirmation=!0,this.requestUpdate()}cancelClearSampleData(){this.showClearConfirmation=!1,this.requestUpdate()}async clearSampleData(){this.isClearing=!0,this.showClearConfirmation=!1,this.requestUpdate();try{await Cy(),await this.loadTransactions(),console.log("Sample data cleared successfully")}catch(t){console.error("Error clearing sample data:",t)}finally{this.isClearing=!1,this.requestUpdate()}}formatDate(t){return t?new Date(t).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}):""}getTransactionIcon(t){if(t.type==="card-payment"&&t.details&&t.details.color)return W`<span class="icon card-payment-icon" style="color: ${t.details.color}">💳</span>`;const e={hour:"⏱️",tips:"💸",payment:"💰",expense:"🛒",bill:"📝","card-payment":"💳"};return W`<span class="icon ${t.type}-icon">${e[t.type]||"📋"}</span>`}getTransactionTypeName(t){return{hour:"Hours Worked",tips:"Tips Earned",payment:"Payment Received",expense:"Expense",bill:"Monthly Bill","card-payment":"Credit Card Payment"}[t]||"Transaction"}render(){return this.isLoading?W`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading transactions...</span>
        </div>
      `:W`
      <div class="container">
        <!-- Transaction Detail Modal -->
        ${this.showDetailModal&&this.selectedTransaction?W`
          <div class="modal-backdrop" @click=${this.closeTransactionDetail}>
            <div class="modal-content" @click=${t=>t.stopPropagation()}>
              <div class="modal-header">
                <h3 class="modal-title">Transaction Details</h3>
              </div>
              <div class="modal-body">
                <div class="detail-icon">
                  ${this.getTransactionIcon(this.selectedTransaction)}
                </div>
                <div class="detail-amount ${this.selectedTransaction.isIncome?"income":"expense"}">
                  ${this.selectedTransaction.isIncome?"+":"-"}${pt(this.selectedTransaction.amount||0)}
                </div>
                <div class="detail-description">
                  ${this.selectedTransaction.description}
                </div>

                <div class="detail-section">
                  <div class="detail-row">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${this.formatDate(this.selectedTransaction.date)}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Category</div>
                    <div class="detail-value">${this.selectedTransaction.category}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Type</div>
                    <div class="detail-value">${this.getTransactionTypeName(this.selectedTransaction.type)}</div>
                  </div>
                  ${this.selectedTransaction.details&&this.selectedTransaction.details.paymentMethod?W`
                    <div class="detail-row">
                      <div class="detail-label">Payment Method</div>
                      <div class="detail-value">
                        ${this.selectedTransaction.details.paymentMethod.startsWith("card-")?W`💳 ${this.selectedTransaction.details.cardName||"Credit Card"} ${this.selectedTransaction.details.lastFourDigits?`(${this.selectedTransaction.details.lastFourDigits})`:""}`:this.selectedTransaction.details.paymentMethod==="cash"?"💵 Cash":this.selectedTransaction.details.paymentMethod==="bank"?"🏦 Bank Transfer":this.selectedTransaction.details.paymentMethod}
                      </div>
                    </div>
                  `:""}
                  ${this.selectedTransaction.details&&this.selectedTransaction.details.hours?W`
                    <div class="detail-row">
                      <div class="detail-label">Hours Worked</div>
                      <div class="detail-value">${this.selectedTransaction.details.hours}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">Hourly Rate</div>
                      <div class="detail-value">${pt(this.selectedTransaction.details.rate||0)}</div>
                    </div>
                  `:""}
                  ${this.selectedTransaction.type==="card-payment"&&this.selectedTransaction.details&&this.selectedTransaction.details.paymentType?W`
                    <div class="detail-row">
                      <div class="detail-label">Payment Type</div>
                      <div class="detail-value">${this.selectedTransaction.details.paymentType}</div>
                    </div>
                  `:""}

                  ${this.selectedTransaction.details&&this.selectedTransaction.details.isPaid!==void 0?W`
                    <div class="detail-row">
                      <div class="detail-label">Payment Status</div>
                      <div class="detail-value">${this.selectedTransaction.details.isPaid?"✅ Paid":"⏳ Pending"}</div>
                    </div>
                  `:""}

                  ${this.selectedTransaction.details&&this.selectedTransaction.details.recurrenceFrequency?W`
                    <div class="detail-row">
                      <div class="detail-label">Recurrence</div>
                      <div class="detail-value">${this.selectedTransaction.details.recurrenceFrequency}</div>
                    </div>
                  `:""}

                  ${this.selectedTransaction.details&&this.selectedTransaction.details.notes?W`
                    <div class="detail-row">
                      <div class="detail-label">Notes</div>
                      <div class="detail-value notes">${this.selectedTransaction.details.notes}</div>
                    </div>
                  `:""}
                </div>
              </div>
              <div class="modal-footer">
                <button class="modal-button cancel-button" @click=${this.closeTransactionDetail}>
                  Close
                </button>
              </div>
            </div>
          </div>
        `:""}

        <div class="header">
          <div class="title">History</div>
          <div style="display: flex; gap: 8px;">
            <!-- Clear Sample button hidden for regular users, but kept in code for developers -->
            <!-- Uncomment the following div to enable the Clear Sample button when needed
            <div class="export-button" @click=${this.showClearSampleDataConfirmation}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              <span>Clear Sample</span>
            </div>
            -->
            <div class="export-button" @click=${this.exportTransactions}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Export</span>
            </div>
          </div>
        </div>

        <!-- Clear Sample Data Confirmation Dialog -->
        ${this.showClearConfirmation?W`
          <div class="modal-backdrop" @click=${this.cancelClearSampleData}>
            <div class="modal-content" @click=${t=>t.stopPropagation()}>
              <div class="modal-header">
                <h3 class="modal-title">Clear Sample Data</h3>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to clear the sample payment data?</p>
                <p>This will remove the following sample payments:</p>
                <ul>
                  <li>Payment for Monday shift ($80.00)</li>
                  <li>Payment for last week ($150.00)</li>
                </ul>
              </div>
              <div class="modal-footer">
                <button class="modal-button cancel-button" @click=${this.cancelClearSampleData}>
                  Cancel
                </button>
                <button class="modal-button" style="color: #ff3b30;" @click=${this.clearSampleData}>
                  ${this.isClearing?W`
                    <span class="ios-spinner"></span>
                    Clearing...
                  `:"Clear Sample Data"}
                </button>
              </div>
            </div>
          </div>
        `:""}

        <!-- Search Bar -->
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input
            type="text"
            class="search-input"
            placeholder="Search transactions"
            .value=${this.searchQuery}
            @input=${this.handleSearchInput}
          >
        </div>

        <!-- Date Range Selector -->
        <div class="date-range-selector">
          <div class="date-range-title">Time Period</div>
          <div class="date-range-options">
            <div
              class="date-range-option ${this.activeDateRange==="week"?"active":""}"
              @click=${()=>this.handleDateRangeChange("week")}
            >
              Last 7 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange==="month"?"active":""}"
              @click=${()=>this.handleDateRangeChange("month")}
            >
              Last 30 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange==="quarter"?"active":""}"
              @click=${()=>this.handleDateRangeChange("quarter")}
            >
              Last 90 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange==="year"?"active":""}"
              @click=${()=>this.handleDateRangeChange("year")}
            >
              Last Year
            </div>
            <div
              class="date-range-option ${this.activeDateRange==="future"?"active":""}"
              @click=${()=>this.handleDateRangeChange("future")}
            >
              Upcoming
            </div>
            <div
              class="date-range-option ${this.activeDateRange==="all"?"active":""}"
              @click=${()=>this.handleDateRangeChange("all")}
            >
              All Time
            </div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <div
            class="filter-option ${this.activeFilter==="all"?"active":""}"
            @click=${()=>this.handleFilterChange("all")}
          >
            All
          </div>
          <div
            class="filter-option ${this.activeFilter==="income"?"active":""}"
            @click=${()=>this.handleFilterChange("income")}
          >
            Income
          </div>
          <div
            class="filter-option ${this.activeFilter==="expenses"?"active":""}"
            @click=${()=>this.handleFilterChange("expenses")}
          >
            Expenses
          </div>
          <div
            class="filter-option ${this.activeFilter==="hours"?"active":""}"
            @click=${()=>this.handleFilterChange("hours")}
          >
            Hours
          </div>
          <div
            class="filter-option ${this.activeFilter==="tips"?"active":""}"
            @click=${()=>this.handleFilterChange("tips")}
          >
            Tips
          </div>
          <div
            class="filter-option ${this.activeFilter==="payments"?"active":""}"
            @click=${()=>this.handleFilterChange("payments")}
          >
            Payments
          </div>
          <div
            class="filter-option ${this.activeFilter==="bills"?"active":""}"
            @click=${()=>this.handleFilterChange("bills")}
          >
            Bills
          </div>
        </div>

        <!-- Summary Card -->
        <div class="summary-card">
          <div class="summary-title">Summary</div>
          <div class="summary-row">
            <div class="summary-label">Income</div>
            <div class="summary-value positive">
              ${pt(this.summaryStats.totalIncome||0)}
            </div>
          </div>
          <div class="summary-row">
            <div class="summary-label">Expenses</div>
            <div class="summary-value negative">
              ${pt(this.summaryStats.totalExpenses||0)}
            </div>
          </div>
          <div class="summary-row">
            <div class="summary-label">Net Balance</div>
            <div class="summary-value ${this.summaryStats.netBalance>=0?"positive":"negative"}">
              ${pt(this.summaryStats.netBalance||0)}
            </div>
          </div>
        </div>

        <!-- Transaction List -->
        ${this.groupedTransactions.length===0?W`
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div>No transactions found</div>
            <div>Try adjusting your filters or search query</div>
          </div>
        `:W`
          ${this.groupedTransactions.map(t=>W`
            <div class="date-header">
              ${this.formatDate(t.date)}
            </div>
            ${t.transactions.map(e=>W`
              <div class="transaction-item" @click=${()=>this.openTransactionDetail(e)}>
                <div class="transaction-icon">
                  ${this.getTransactionIcon(e)}
                </div>
                <div class="transaction-info">
                  <div class="transaction-description">
                    ${e.description}
                  </div>
                  <div class="transaction-category">
                    ${e.category}
                    ${e.details&&e.details.paymentMethod&&e.details.paymentMethod.startsWith("card-")?W`
                      <span class="payment-method">
                        💳 Card
                      </span>
                    `:e.details&&e.details.paymentMethod==="cash"?W`
                      <span class="payment-method">
                        💵 Cash
                      </span>
                    `:""}
                  </div>
                </div>
                <div class="transaction-amount ${e.isIncome?"income":"expense"}">
                  ${e.isIncome?"+":"-"}${pt(e.amount||0)}
                </div>
              </div>
            `)}
          `)}
        `}
      </div>
    `}}q(Pa,"properties",{transactions:{type:Array},groupedTransactions:{type:Array},isLoading:{type:Boolean},dateRange:{type:Object},searchQuery:{type:String},activeFilter:{type:String},summaryStats:{type:Object},showDetailModal:{type:Boolean},selectedTransaction:{type:Object},activeDateRange:{type:String},isClearing:{type:Boolean},showClearConfirmation:{type:Boolean}}),q(Pa,"styles",Yt`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
      margin-bottom: 80px;
    }

    .header {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
    }

    .export-button {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background-color: #f2f2f7;
      border-radius: 16px;
      font-size: 14px;
      color: #007aff;
      cursor: pointer;
    }

    .export-button svg {
      margin-right: 4px;
      color: #007aff;
    }

    .export-button:hover {
      background-color: #e5e5ea;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 10px;
      padding: 8px 12px;
      margin-bottom: 16px;
    }

    .search-icon {
      color: #8e8e93;
      margin-right: 8px;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 16px;
      color: #000000;
      outline: none;
    }

    .filter-bar {
      display: flex;
      overflow-x: auto;
      margin-bottom: 16px;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }

    .filter-option {
      flex: 0 0 auto;
      padding: 8px 16px;
      margin-right: 8px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 16px;
      font-size: 14px;
      color: #8e8e93;
      white-space: nowrap;
    }

    .filter-option.active {
      background-color: #007aff;
      color: white;
    }

    .date-range-selector {
      margin-bottom: 16px;
    }

    .date-range-title {
      font-size: 14px;
      font-weight: 600;
      color: #8e8e93;
      margin-bottom: 8px;
    }

    .date-range-options {
      display: flex;
      overflow-x: auto;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }

    .date-range-option {
      flex: 0 0 auto;
      padding: 8px 16px;
      margin-right: 8px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 16px;
      font-size: 14px;
      color: #8e8e93;
      white-space: nowrap;
      cursor: pointer;
    }

    .date-range-option.active {
      background-color: #007aff;
      color: white;
    }

    /* Modal styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 340px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
    }

    .modal-body {
      padding: 16px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-end;
    }

    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
    }

    .cancel-button {
      color: #8e8e93;
    }

    /* Transaction detail styles */
    .detail-icon {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background-color: rgba(142, 142, 147, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 24px;
    }

    .detail-amount {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
    }

    .detail-description {
      font-size: 18px;
      text-align: center;
      margin-bottom: 24px;
      color: #000000;
    }

    .detail-section {
      background-color: #f2f2f7;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-size: 15px;
      color: #8e8e93;
    }

    .detail-value {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      text-align: right;
    }

    .detail-value.notes {
      white-space: pre-wrap;
      text-align: left;
      margin-top: 8px;
      font-weight: normal;
    }

    .summary-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .summary-title {
      font-size: 14px;
      font-weight: 600;
      color: #8e8e93;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .summary-label {
      font-size: 15px;
      color: #000000;
    }

    .summary-value {
      font-size: 15px;
      font-weight: 600;
    }

    .summary-value.positive {
      color: #34c759;
    }

    .summary-value.negative {
      color: #ff3b30;
    }

    .date-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .transaction-item {
      background-color: #ffffff;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .transaction-item {
      display: flex;
      align-items: center;
    }

    .transaction-icon {
      width: 36px;
      height: 36px;
      border-radius: 18px;
      background-color: rgba(142, 142, 147, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-size: 18px;
    }

    .transaction-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .transaction-description {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 4px;
    }

    .transaction-category {
      font-size: 13px;
      color: #8e8e93;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    .payment-method {
      display: inline-flex;
      align-items: center;
      background-color: #f2f2f7;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: 4px;
      font-size: 11px;
    }

    .transaction-amount {
      font-size: 15px;
      font-weight: 600;
      margin-left: 12px;
    }

    .transaction-amount.income {
      color: #34c759;
    }

    .transaction-amount.expense {
      color: #ff3b30;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .ios-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(0, 122, 255, 0.2);
      border-top-color: rgba(0, 122, 255, 1);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
      text-align: center;
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #8e8e93;
    }
  `);customElements.define("history-view",Pa);class Oa extends Nt{constructor(){super(),this.settings=null,this.isLoading=!0,this.activeModal=null,this.modalData={}}connectedCallback(){super.connectedCallback(),this.loadSettings()}async loadSettings(){try{const t=await at.settings.get(1);t&&(this.settings=t),this.isLoading=!1}catch(t){console.error("Error loading settings:",t),this.isLoading=!1}}async saveSettings(t){try{await at.settings.update(1,t),this.settings=t,ie("Settings saved","success")}catch(e){console.error("Error saving settings:",e),ie("Failed to save settings","error")}}handleToggle(t){const e={...this.settings};e[t]=!e[t],this.saveSettings(e)}openModal(t,e={}){this.activeModal=t,this.modalData=e}closeModal(){this.activeModal=null,this.modalData={}}handleSelection(t){if(!this.activeModal)return;const e={...this.settings};switch(this.activeModal){case"theme":e.theme=t,Nc(t);break;case"currency":e.currency=t;break;case"defaultView":e.defaultView=t;break;case"reminderTime":e.reminderTime=t;break}this.saveSettings(e),this.closeModal()}async handleHourlyRateChange(){const t=this.settings.hourlyRate;this.openModal("hourlyRate",{currentValue:t})}saveHourlyRate(t){const e=parseFloat(t);if(isNaN(e)||e<0){ie("Please enter a valid hourly rate","error");return}const i={...this.settings};i.hourlyRate=e,this.saveSettings(i),this.closeModal()}async handleWeeklyBudgetChange(){const t=this.settings.weeklyBudget;this.openModal("weeklyBudget",{currentValue:t})}saveWeeklyBudget(t){const e=parseFloat(t);if(isNaN(e)||e<0){ie("Please enter a valid budget amount","error");return}const i={...this.settings};i.weeklyBudget=e,this.saveSettings(i),this.closeModal()}async handleMonthlyBudgetChange(){const t=this.settings.monthlyBudget||800;this.openModal("monthlyBudget",{currentValue:t})}saveMonthlyBudget(t){const e=parseFloat(t);if(isNaN(e)||e<0){ie("Please enter a valid budget amount","error");return}const i={...this.settings};i.monthlyBudget=e,this.saveSettings(i),this.closeModal()}handleClearData(){this.openModal("clearData")}async confirmClearData(){try{await at.weeks.clear(),await at.expenses.clear(),ie("All data has been cleared","success"),this.closeModal(),setTimeout(()=>{window.location.reload()},1500)}catch(t){console.error("Error clearing data:",t),ie("Failed to clear data","error"),this.closeModal()}}async handleExportData(){try{const t=await at.weeks.toArray(),e=await at.expenses.toArray();let i=`Week ID,Total Hours,Total Tips,Total Earnings
`;t.forEach(p=>{i+=`${p.id},${p.totalHours},${p.totalTips},${p.totalEarnings}
`});let s=`ID,Week ID,Amount,Category,Date,Created At
`;e.forEach(p=>{s+=`${p.id},${p.weekId},${p.amount},${p.category},${p.date},${p.createdAt}
`});const o=new Blob([i],{type:"text/csv"}),a=new Blob([s],{type:"text/csv"}),r=URL.createObjectURL(o),c=URL.createObjectURL(a),u=document.createElement("a");u.href=r,u.download="hour-halo-weeks.csv",document.body.appendChild(u),u.click(),document.body.removeChild(u);const h=document.createElement("a");h.href=c,h.download="hour-halo-expenses.csv",document.body.appendChild(h),h.click(),document.body.removeChild(h),ie("Data exported successfully","success")}catch(t){console.error("Error exporting data:",t),ie("Failed to export data","error")}}renderModal(){if(!this.activeModal)return null;switch(this.activeModal){case"theme":return this.renderSelectionModal("Theme",[{value:"light",label:"Light"},{value:"dark",label:"Dark"},{value:"system",label:"System (Auto)"}],this.settings.theme);case"currency":return this.renderSelectionModal("Currency",[{value:"USD",label:"US Dollar ($)"},{value:"EUR",label:"Euro (€)"},{value:"GBP",label:"British Pound (£)"},{value:"CAD",label:"Canadian Dollar (C$)"},{value:"AUD",label:"Australian Dollar (A$)"},{value:"JPY",label:"Japanese Yen (¥)"}],this.settings.currency);case"defaultView":return this.renderSelectionModal("Default Tab",[{value:"week",label:"Week"},{value:"summary",label:"Summary"},{value:"spend",label:"Spend"},{value:"history",label:"History"}],this.settings.defaultView||"week");case"reminderTime":return this.renderTimeSelectionModal();case"hourlyRate":return this.renderInputModal("Hourly Rate","number",this.modalData.currentValue,"Enter your hourly rate",t=>this.saveHourlyRate(t));case"weeklyBudget":return this.renderInputModal("Weekly Budget","number",this.modalData.currentValue,"Enter your weekly budget",t=>this.saveWeeklyBudget(t));case"monthlyBudget":return this.renderInputModal("Monthly Budget","number",this.modalData.currentValue,"Enter your monthly budget",t=>this.saveMonthlyBudget(t));case"clearData":return this.renderConfirmationModal("Clear All Data","This will permanently delete all your hours, earnings, and expenses data. This action cannot be undone.","Clear Data",()=>this.confirmClearData());default:return null}}renderSelectionModal(t,e,i){return W`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${s=>s.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${t}</h3>
          </div>
          <div class="modal-body">
            ${e.map(s=>W`
              <div
                class="modal-option ${s.value===i?"selected":""}"
                @click=${()=>this.handleSelection(s.value)}
              >
                ${s.label}
                ${s.value===i?W`
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                `:""}
              </div>
            `)}
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    `}renderTimeSelectionModal(){const t=[];for(let e=0;e<24;e++)for(let i of[0,30]){const s=e.toString().padStart(2,"0"),o=i.toString().padStart(2,"0"),a=`${s}:${o}`,r=e%12||12,c=e<12?"AM":"PM",u=`${r}:${o==="00"?"00":o} ${c}`;t.push({value:a,label:u})}return this.renderSelectionModal("Reminder Time",t,this.settings.reminderTime)}renderInputModal(t,e,i,s,o){return W`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${a=>a.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${t}</h3>
          </div>
          <div class="modal-body" style="padding: 16px;">
            <input
              type="${e}"
              class="input-field"
              placeholder="${s}"
              .value=${i}
              id="modalInput"
              step="${e==="number"?"0.01":"1"}"
              min="0"
            />
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
            <button
              class="modal-button confirm-button"
              @click=${()=>{const a=this.shadowRoot.querySelector("#modalInput");o(a.value)}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderConfirmationModal(t,e,i,s){return W`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${o=>o.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${t}</h3>
          </div>
          <div class="modal-body" style="padding: 16px;">
            <p>${e}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
            <button class="modal-button danger-button" @click=${s}>${i}</button>
          </div>
        </div>
      </div>
    `}render(){return this.isLoading?W`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading settings...</span>
        </div>
      `:W`
      <div class="settings-container">
        <!-- Earnings Settings -->
        <div class="settings-section">
          <div class="section-header">Earnings</div>
          <div class="settings-group">
            <div class="settings-item" @click=${this.handleHourlyRateChange}>
              <div class="item-label">Hourly Rate</div>
              <div class="item-value">
                ${pt(this.settings.hourlyRate,this.settings.currency)}/hr
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${()=>this.openModal("currency")}>
              <div class="item-label">Currency</div>
              <div class="item-value">
                ${this.settings.currency}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item">
              <div class="item-label">Show Tips</div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  ?checked=${this.settings.showTips}
                  @change=${()=>this.handleToggle("showTips")}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item" @click=${this.handleWeeklyBudgetChange}>
              <div class="item-label">Weekly Budget</div>
              <div class="item-value">
                ${pt(this.settings.weeklyBudget,this.settings.currency)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${this.handleMonthlyBudgetChange}>
              <div class="item-label">Monthly Budget</div>
              <div class="item-value">
                ${pt(this.settings.monthlyBudget||800,this.settings.currency)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div class="settings-section">
          <div class="section-header">Appearance</div>
          <div class="settings-group">
            <div class="settings-item" @click=${()=>this.openModal("theme")}>
              <div class="item-label">Theme</div>
              <div class="item-value">
                ${this.settings.theme==="light"?"Light":this.settings.theme==="dark"?"Dark":"System"}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${()=>this.openModal("defaultView")}>
              <div class="item-label">Default Tab</div>
              <div class="item-value">
                ${this.settings.defaultView?this.settings.defaultView.charAt(0).toUpperCase()+this.settings.defaultView.slice(1):"Week"}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div class="settings-section">
          <div class="section-header">Notifications</div>
          <div class="settings-group">
            <div class="settings-item">
              <div class="item-label">Daily Reminder</div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  ?checked=${this.settings.enableDailyReminder}
                  @change=${()=>this.handleToggle("enableDailyReminder")}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item" @click=${()=>this.openModal("reminderTime")}>
              <div class="item-label">Reminder Time</div>
              <div class="item-value">
                ${this.formatTime(this.settings.reminderTime)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Management -->
        <div class="settings-section">
          <div class="section-header">Data</div>
          <div class="settings-group">
            <div class="settings-item" @click=${this.handleExportData}>
              <div class="item-label">Export Data</div>
              <div class="item-value">
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${this.handleClearData}>
              <div class="item-label danger-text">Clear All Data</div>
              <div class="item-value">
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="settings-section">
          <div class="section-header">About</div>
          <div class="settings-group">
            <div class="settings-item">
              <div class="item-label">Version</div>
              <div class="item-value">1.0.0</div>
            </div>
            <div class="settings-item">
              <div class="item-label">Made with ❤️ by Hour Halo Team</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      ${this.renderModal()}
    `}formatTime(t){if(!t)return"";const[e,i]=t.split(":"),s=parseInt(e,10),o=i,a=s<12?"AM":"PM";return`${s%12||12}:${o} ${a}`}}q(Oa,"properties",{settings:{type:Object},isLoading:{type:Boolean},activeModal:{type:String},modalData:{type:Object}}),q(Oa,"styles",Yt`
    :host {
      display: block;
    }

    .settings-container {
      padding-bottom: 100px;
    }

    .settings-section {
      margin-bottom: 32px;
    }

    .section-header {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      margin: 0 16px 8px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .settings-group {
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .settings-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .settings-item:last-child {
      border-bottom: none;
    }

    .item-label {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }

    .item-value {
      font-size: 16px;
      font-weight: 400;
      color: #8e8e93;
      display: flex;
      align-items: center;
    }

    .chevron {
      margin-left: 8px;
      width: 7px;
      height: 12px;
      color: #c7c7cc;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 51px;
      height: 31px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e9e9eb;
      transition: .4s;
      border-radius: 34px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 27px;
      width: 27px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    input:checked + .toggle-slider {
      background-color: #34c759;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }

    .danger-text {
      color: #ff3b30;
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 340px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .modal-body {
      max-height: 60vh;
      overflow-y: auto;
    }

    .modal-option {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      font-size: 16px;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .modal-option.selected {
      color: #007aff;
    }

    .modal-option:last-child {
      border-bottom: none;
    }

    .modal-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
    }

    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .cancel-button {
      color: #8e8e93;
    }

    .confirm-button {
      color: #007aff;
    }

    .danger-button {
      color: #ff3b30;
    }

    .input-field {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-bottom: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .ios-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(0, 122, 255, 0.2);
      border-top-color: rgba(0, 122, 255, 1);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `);customElements.define("settings-view",Oa);const Ey="modulepreload",My=function(n){return"/hour-halo/"+n},$c={},Cs=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let a=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=a(e.map(u=>{if(u=My(u),u in $c)return;$c[u]=!0;const h=u.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const y=document.createElement("link");if(y.rel=h?"stylesheet":Ey,h||(y.as="script"),y.crossOrigin="",y.href=u,c&&y.setAttribute("nonce",c),document.head.appendChild(y),h)return new Promise((g,x)=>{y.addEventListener("load",g),y.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return s.then(a=>{for(const r of a||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})};class Fa extends Nt{constructor(){super(),this.status="Diagnostic view loaded successfully",this.error="",window.addEventListener("error",t=>{this.error=`Error: ${t.message} at ${t.filename}:${t.lineno}`,this.requestUpdate()})}connectedCallback(){super.connectedCallback(),console.log("Diagnostic view connected")}checkDatabase(){try{Cs(()=>Promise.resolve().then(()=>ol),void 0).then(t=>{t.default.settings.get(1).then(i=>{i?this.status=`Database check: OK. Settings found: ${JSON.stringify(i)}`:this.status="Database check: Settings not found"}).catch(i=>{this.status=`Database error: ${i.message}`})})}catch(t){this.status=`Import error: ${t.message}`}}navigateToWeek(){window.location.hash="week"}navigateToSummary(){window.location.hash="summary"}navigateToSettings(){window.location.hash="settings"}async clearExpenseData(){try{await(await Cs(()=>import("./sample-data-Cy42Fbun.js"),[])).clearAllExpenseData()?this.status="All expense data cleared successfully!":this.status="Failed to clear expense data."}catch(t){this.status=`Error clearing expense data: ${t.message}`}}async addSampleExpenseData(){try{await(await Cs(()=>import("./sample-data-Cy42Fbun.js"),[])).addSampleExpenseData()?this.status="Sample expense data added successfully!":this.status="Failed to add sample expense data."}catch(t){this.status=`Error adding sample expense data: ${t.message}`}}async debugHoursData(){try{this.status="Analyzing hours data...";const e=await(await Cs(async()=>{const{default:s}=await Promise.resolve().then(()=>ol);return{default:s}},void 0)).default.weeks.toArray();let i=`Found ${e.length} weeks:

`;for(const s of e){if(i+=`Week: ${s.id}, Total Hours: ${s.totalHours}, Total Tips: ${s.totalTips}
`,!s.days){i+=`  No days data for this week
`;continue}const o=["mon","tue","wed","thu","fri","sat","sun"],a=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];o.forEach((r,c)=>{const u=s.days[r];if(!u){i+=`  ${a[c]}: No data
`;return}const h=u.hours||0,p=u.tips||0,y=new Date(s.id),g=new Date(y);g.setDate(y.getDate()+c);const x=g.toISOString().split("T")[0];i+=`  ${a[c]} (${x}): Hours=${h}, Tips=${p}
`}),i+=`
`}this.status=i}catch(t){this.status=`Error debugging hours data: ${t.message}`}}render(){return W`
      <div class="diagnostic-container">
        <h2>Hour Halo Diagnostic Tool</h2>

        <div class="status ${this.error?"error":"success"}">
          ${this.error||this.status}
        </div>

        <div>
          <button @click=${this.checkDatabase}>Check Database</button>
          <button @click=${this.navigateToWeek}>Go to Week</button>
          <button @click=${this.navigateToSummary}>Go to Summary</button>
          <button @click=${this.navigateToSettings}>Go to Settings</button>
        </div>

        <h3>Expense Data Tools</h3>
        <div>
          <button @click=${this.clearExpenseData} style="background-color: #ff3b30;">Clear All Expense Data</button>
          <button @click=${this.addSampleExpenseData} style="background-color: #34c759;">Add Sample Expense Data</button>
        </div>

        <h3>Hours Data Tools</h3>
        <div>
          <button @click=${this.debugHoursData} style="background-color: #007aff;">Debug Hours Data</button>
        </div>
      </div>
    `}}q(Fa,"styles",Yt`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .diagnostic-container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      color: #007aff;
    }

    .status {
      margin-bottom: 16px;
      padding: 8px;
      border-radius: 8px;
      background-color: #f2f2f7;
    }

    .success {
      background-color: #e5fff0;
      color: #34c759;
    }

    .error {
      background-color: #fff0f0;
      color: #ff3b30;
    }

    button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  `),q(Fa,"properties",{status:{type:String},error:{type:String}});customElements.define("diagnostic-view",Fa);class Nd extends Nt{render(){return W`
      <div class="container">
        <h2>Spend</h2>
        
        <div class="budget-card">
          <div class="budget-amount">$200.00</div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div>$60.00 spent · $140.00 left</div>
        </div>
        
        <div>
          <p>This is a simplified version of the Spend tab for testing.</p>
          <p>No expenses to display yet.</p>
        </div>
        
        <button class="add-button">Add Expense</button>
      </div>
    `}}q(Nd,"styles",Yt`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      color: #007aff;
    }
    
    .budget-card {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .budget-amount {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .progress-bar {
      height: 8px;
      background-color: #e5e5ea;
      border-radius: 4px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      width: 30%;
      background-color: #34c759;
      border-radius: 4px;
    }
    
    .add-button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 16px;
    }
  `);customElements.define("spend-view-simple",Nd);class Ia extends Nt{constructor(){super(),this.open=!1,this.card=null;const t=new Date,e=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),o=`${e}-${i}-${s}`;this.payment={amount:"",date:o,type:"Custom",notes:""},this.settings={currency:"USD"},this.isSaving=!1}connectedCallback(){super.connectedCallback(),this.style.colorScheme="light"}show(t,e={currency:"USD"}){this.card=t,this.settings=e;const i=new Date,s=i.getFullYear(),o=String(i.getMonth()+1).padStart(2,"0"),a=String(i.getDate()).padStart(2,"0"),r=`${s}-${o}-${a}`;this.payment={amount:t.minimumPayment||"",date:r,type:"Minimum",notes:""},this.style.colorScheme="light",setTimeout(()=>{const c=this.shadowRoot.querySelector(".modal-content");if(c){c.style.backgroundColor="#ffffff",this.shadowRoot.querySelectorAll(".form-label").forEach(w=>w.style.color="#3a3a3c");const h=this.shadowRoot.querySelector(".modal-title");h&&(h.style.color="#000000"),this.shadowRoot.querySelectorAll(".form-input").forEach(w=>{w.style.backgroundColor="#f2f2f7",w.style.color="#000000"}),this.shadowRoot.querySelectorAll(".payment-option").forEach(w=>{w.style.backgroundColor="#ffffff",w.style.color=w.classList.contains("selected")?"#007aff":"#000000"});const g=this.shadowRoot.querySelector(".card-info");if(g){g.style.backgroundColor="#ffffff";const w=g.querySelector(".card-name");w&&(w.style.color="#000000");const S=g.querySelector(".card-balance");S&&(S.style.color="#3a3a3c")}const x=this.shadowRoot.querySelector(".modal-footer");x&&(x.style.backgroundColor="#f9f9f9")}},10),this.open=!0}hide(){this.open=!1,this.isSaving=!1}handleInputChange(t,e){e==="date"?(console.log("CARD PAYMENT MODAL: Date input changed to:",t.target.value),this.payment={...this.payment,[e]:t.target.value},console.log("CARD PAYMENT MODAL: Updated payment date:",this.payment.date)):this.payment={...this.payment,[e]:t.target.value}}selectPaymentType(t){let e=this.payment.amount;t==="Minimum"?e=this.card.minimumPayment||0:t==="Full"&&(e=this.card.currentBalance||0),this.payment={...this.payment,type:t,amount:e.toString()}}async handleSave(){if(!(!this.payment.amount||!this.payment.date)){this.isSaving=!0;try{console.log("CARD PAYMENT MODAL: Payment date before saving:",this.payment.date),console.log("CARD PAYMENT MODAL: Payment date type:",typeof this.payment.date);const t=new Date(this.payment.date);console.log("CARD PAYMENT MODAL: Date object created from payment date:",t),console.log("CARD PAYMENT MODAL: Date object toISOString:",t.toISOString()),console.log("CARD PAYMENT MODAL: Date object toLocaleDateString:",t.toLocaleDateString());const e={...this.payment,cardId:this.card.id,amount:parseFloat(this.payment.amount)};console.log("CARD PAYMENT MODAL: Payment object to save:",e),await my(e),this.hide(),this.dispatchEvent(new CustomEvent("payment-saved",{bubbles:!0,composed:!0,detail:{success:!0}}))}catch(t){console.error("Error saving payment:",t),this.isSaving=!1}}}handleCancel(){this.hide()}handleBackdropClick(t){t.target===t.currentTarget&&!this.isSaving&&this.hide()}render(){var t;return!this.open||!this.card?W``:W`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">Record Payment</div>
          </div>
          <div class="modal-body">
            <!-- Card info -->
            <div class="card-info">
              <div class="card-name">${this.card.name}</div>
              <div class="card-balance">
                Current Balance: ${pt(this.card.currentBalance,((t=this.settings)==null?void 0:t.currency)||"USD")}
              </div>
            </div>

            <!-- Payment type selection -->
            <div class="form-group">
              <label class="form-label">Payment Type</label>
              <div class="payment-options">
                ${Ku.map(e=>W`
                  <div
                    class="payment-option ${this.payment.type===e?"selected":""}"
                    @click=${()=>this.selectPaymentType(e)}
                  >
                    ${e}
                  </div>
                `)}
              </div>
            </div>

            <!-- Payment amount -->
            <div class="form-group">
              <label class="form-label">Payment Amount</label>
              <input
                type="number"
                class="form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                .value=${this.payment.amount}
                @input=${e=>this.handleInputChange(e,"amount")}
              />
            </div>

            <!-- Payment date -->
            <div class="form-group">
              <label class="form-label">Payment Date</label>
              <input
                type="date"
                class="form-input"
                .value=${this.payment.date}
                @input=${e=>this.handleInputChange(e,"date")}
              />
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label class="form-label">Notes (Optional)</label>
              <input
                type="text"
                class="form-input"
                placeholder="Add notes about this payment"
                .value=${this.payment.notes}
                @input=${e=>this.handleInputChange(e,"notes")}
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="modal-button cancel-button"
              @click=${this.handleCancel}
              ?disabled=${this.isSaving}
            >
              Cancel
            </button>
            <button
              class="modal-button save-button"
              @click=${this.handleSave}
              ?disabled=${this.isSaving||!this.payment.amount||!this.payment.date}
            >
              ${this.isSaving?W`
                <span class="spinner"></span>
                Saving...
              `:"Save"}
            </button>
          </div>
        </div>
      </div>
    `}}q(Ia,"properties",{open:{type:Boolean},card:{type:Object},payment:{type:Object},settings:{type:Object},isSaving:{type:Boolean}}),q(Ia,"styles",Yt`
    :host {
      display: block;
    }

    /* iOS-style modal backdrop */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade-in 0.2s ease-out;
    }

    /* iOS-style modal content */
    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    /* iOS-style modal header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* iOS-style modal title */
    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style modal body */
    .modal-body {
      padding: 16px;
    }

    /* iOS-style modal footer */
    .modal-footer {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    /* iOS-style form group */
    .form-group {
      margin-bottom: 16px;
    }

    /* iOS-style form label */
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #3a3a3c;
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style form input */
    .form-input {
      display: block;
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      background-color: #f2f2f7;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-appearance: none;
      appearance: none;
    }

    .form-input:focus {
      outline: none;
      background-color: #e9e9eb;
    }

    /* iOS-style payment options */
    .payment-options {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .payment-option {
      flex: 1;
      padding: 12px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #ffffff;
    }

    .payment-option.selected {
      border-color: #007aff;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
    }

    /* iOS-style buttons */
    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .cancel-button {
      color: #007aff;
      opacity: 0.8;
    }

    .save-button {
      color: #007aff;
      font-weight: 600;
    }

    .save-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Card info section */
    .card-info {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
    }

    .card-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-balance {
      font-size: 14px;
      color: #3a3a3c;
    }

    /* Spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: #007aff;
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Dark mode styles - DISABLED to force light mode for this component */
    /*
    @media (prefers-color-scheme: dark) {
      .modal-content {
        background-color: #1c1c1e;
      }

      .modal-title {
        color: #ffffff;
      }

      .form-label {
        color: #8e8e93;
      }

      .form-input {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .payment-option {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .payment-option.selected {
        background-color: rgba(10, 132, 255, 0.2);
        border-color: #0a84ff;
        color: #0a84ff;
      }

      .card-info {
        background-color: #2c2c2e;
      }

      .card-balance {
        color: #8e8e93;
      }

      .modal-header, .modal-footer {
        border-color: rgba(255, 255, 255, 0.1);
      }
    }
    */
  `);customElements.define("credit-card-payment-modal",Ia);class Ra extends Nt{constructor(){super(),this.cardId=null,this.payments=[],this.settings={currency:"USD"},this.isLoading=!1,this.showDeleteConfirmation=!1,this.pendingDeleteId=null}connectedCallback(){super.connectedCallback(),this.cardId&&this.loadPayments(),this.updateComplete.then(()=>{this.setupSwipeToDelete()})}updated(t){t.has("cardId")&&this.cardId&&this.loadPayments(),t.has("payments")&&this.updateComplete.then(()=>{this.setupSwipeToDelete()})}async loadPayments(){if(this.cardId){this.isLoading=!0;try{this.payments=await cr(this.cardId)}catch(t){console.error("Error loading payments:",t),this.payments=[]}finally{this.isLoading=!1}}}setupSwipeToDelete(){console.log("Setting up swipe-to-delete for payments"),setTimeout(()=>{const t=this.shadowRoot.querySelectorAll(".payment-item");console.log(`Found ${t.length} payment items`),t.forEach(e=>{const i=e.querySelector(".payment-content"),s=e.querySelector(".delete-action"),o=e.querySelector(".delete-button"),a=parseInt(e.dataset.id);if(console.log(`Setting up swipe for payment ID: ${a}`),!i||!s||!a){console.log("Missing required elements for swipe-to-delete");return}e._swipeHandlers||(e._swipeHandlers={}),e._swipeHandlers.touchStart&&(e.removeEventListener("touchstart",e._swipeHandlers.touchStart),e.removeEventListener("mousedown",e._swipeHandlers.touchStart)),e._swipeHandlers.touchMove&&(e.removeEventListener("touchmove",e._swipeHandlers.touchMove),e.removeEventListener("mousemove",e._swipeHandlers.touchMove)),e._swipeHandlers.touchEnd&&(e.removeEventListener("touchend",e._swipeHandlers.touchEnd),e.removeEventListener("mouseup",e._swipeHandlers.touchEnd),e.removeEventListener("mouseleave",e._swipeHandlers.touchEnd));let r=0,c=0,u=!1;const h=80;e._swipeHandlers.touchStart=p=>{r=p.type==="touchstart"?p.touches[0].clientX:p.clientX,u=!0,i&&(i.style.transition="none")},e._swipeHandlers.touchMove=p=>{if(!u||!i)return;c=p.type==="touchmove"?p.touches[0].clientX:p.clientX;const y=c-r;if(y<0){const g=Math.max(y,-80);i.style.transform=`translateX(${g}px)`}},e._swipeHandlers.touchEnd=()=>{if(!u||!i)return;if(u=!1,i.style.transition="transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",c-r<-80/2){i.style.transform=`translateX(-${h}px)`;const y=g=>{e.contains(g.target)||(i.style.transform="translateX(0)",document.removeEventListener("click",y),document.removeEventListener("touchstart",y))};setTimeout(()=>{document.addEventListener("click",y),document.addEventListener("touchstart",y)},10)}else i.style.transform="translateX(0)"},e.addEventListener("touchstart",e._swipeHandlers.touchStart,{passive:!0}),e.addEventListener("touchmove",e._swipeHandlers.touchMove,{passive:!0}),e.addEventListener("touchend",e._swipeHandlers.touchEnd),e.addEventListener("mousedown",e._swipeHandlers.touchStart),e.addEventListener("mousemove",e._swipeHandlers.touchMove),e.addEventListener("mouseup",e._swipeHandlers.touchEnd),e.addEventListener("mouseleave",e._swipeHandlers.touchEnd),o&&(e._swipeHandlers.deleteClick&&o.removeEventListener("click",e._swipeHandlers.deleteClick),e._swipeHandlers.deleteClick=p=>{p.stopPropagation(),this.confirmDelete(a)},o.addEventListener("click",e._swipeHandlers.deleteClick))})},200)}confirmDelete(t){this.pendingDeleteId=t,this.showDeleteConfirmation=!0}cancelDelete(){this.showDeleteConfirmation=!1,this.pendingDeleteId=null}async deletePayment(){if(this.pendingDeleteId)try{await yy(this.pendingDeleteId),this.showDeleteConfirmation=!1,this.pendingDeleteId=null,this.loadPayments(),this.dispatchEvent(new CustomEvent("payment-deleted",{bubbles:!0,composed:!0}))}catch(t){console.error("Error deleting payment:",t)}}formatDate(t){if(!t)return"";console.log("PAYMENT HISTORY: Formatting date string:",t),console.log("PAYMENT HISTORY: Date string type:",typeof t);try{const s=t.split("-");if(s.length===3){const o=parseInt(s[0]),a=parseInt(s[1])-1,r=parseInt(s[2]);console.log(`PAYMENT HISTORY: Date components - Year: ${o}, Month: ${a+1}, Day: ${r}`);const c=new Date(Date.UTC(o,a,r));c.setUTCDate(c.getUTCDate()+1),console.log("PAYMENT HISTORY: Adjusted date object:",c),console.log("PAYMENT HISTORY: Adjusted date toISOString:",c.toISOString());const u=c.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return console.log("PAYMENT HISTORY: Formatted date:",u),u}}catch(s){console.error("PAYMENT HISTORY: Error formatting date:",s)}return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}render(){return W`
      <div class="payment-history-container">
        <div class="payment-history-header">Payment History</div>

        ${this.isLoading?W`
          <div class="loading-indicator">
            <span class="spinner"></span>
            Loading payments...
          </div>
        `:W`
          ${this.payments.length===0?W`
            <div class="empty-state">
              No payments recorded yet
            </div>
          `:W`
            <div class="payment-list">
              ${this.payments.map(t=>{var e;return W`
                <div class="payment-item" data-id="${t.id}">
                  <div class="payment-content">
                    <div class="payment-info">
                      <div class="payment-date">${this.formatDate(t.date)}</div>
                      <div class="payment-type">${t.type||"Minimum"} Payment</div>
                      ${t.notes?W`<div class="payment-notes">${t.notes}</div>`:""}
                    </div>
                    <div class="payment-amount">
                      -${pt(t.amount,((e=this.settings)==null?void 0:e.currency)||"USD")}
                    </div>
                  </div>
                  <div class="delete-action">
                    <button class="delete-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              `})}
            </div>
          `}
        `}

        ${this.showDeleteConfirmation?W`
          <div class="confirmation-backdrop" @click=${this.cancelDelete}></div>
          <div class="confirmation-dialog">
            <div class="confirmation-title">Delete Payment</div>
            <div class="confirmation-message">
              Are you sure you want to delete this payment? This will add the payment amount back to your card balance.
            </div>
            <div class="confirmation-buttons">
              <button class="confirmation-button delete-button" @click=${this.deletePayment}>
                Delete
              </button>
              <button class="confirmation-button cancel-button" @click=${this.cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        `:""}
      </div>
    `}}q(Ra,"properties",{cardId:{type:Number},payments:{type:Array},settings:{type:Object},isLoading:{type:Boolean},showDeleteConfirmation:{type:Boolean},pendingDeleteId:{type:Number}}),q(Ra,"styles",Yt`
    :host {
      display: block;
    }

    .payment-history-container {
      margin-top: 16px;
    }

    .payment-history-header {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .payment-list {
      border-radius: 12px;
      overflow: hidden;
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .payment-item {
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .payment-item:last-child {
      border-bottom: none;
    }

    .payment-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      padding: 16px;
    }

    .swipeable-item {
      position: relative;
      overflow: hidden;
    }

    .payment-info {
      flex: 1;
    }

    .payment-date {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      color: #000000;
    }

    .payment-type {
      font-size: 13px;
      color: #8e8e93;
    }

    .payment-amount {
      font-size: 16px;
      font-weight: 600;
      color: #34c759;
    }

    .payment-notes {
      font-size: 13px;
      color: #8e8e93;
      margin-top: 4px;
    }

    .delete-action {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff3b30;
      width: 80px;
      z-index: 0;
    }

    .delete-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: white;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .delete-button svg {
      margin-bottom: 4px;
      width: 20px;
      height: 20px;
      stroke: white;
    }

    .delete-button span {
      font-size: 12px;
    }

    .empty-state {
      padding: 32px 16px;
      text-align: center;
      color: #8e8e93;
      font-size: 15px;
    }

    .loading-indicator {
      padding: 16px;
      text-align: center;
      color: #8e8e93;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #007aff;
      animation: spin 0.8s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* iOS-style confirmation dialog */
    .confirmation-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #f2f2f7;
      border-radius: 14px;
      width: 270px;
      overflow: hidden;
      z-index: 10000;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }

    .confirmation-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      z-index: 9999;
    }

    .confirmation-title {
      text-align: center;
      padding: 16px;
      font-size: 17px;
      font-weight: 600;
      color: #000000;
    }

    .confirmation-message {
      text-align: center;
      padding: 0 16px 16px;
      font-size: 13px;
      color: #3a3a3c;
    }

    .confirmation-buttons {
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .confirmation-button {
      padding: 16px;
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      background: none;
      border: none;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .confirmation-button:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .confirmation-button.delete-button {
      color: #ff3b30;
      font-weight: 600;
    }

    .confirmation-button.cancel-button {
      color: #007aff;
    }

    /* We're removing dark mode styles for now to ensure consistent appearance */
  `);customElements.define("credit-card-payment-history",Ra);class La extends Nt{constructor(){super(),this.open=!1,this.isEditing=!1,this.card={name:"",lastFourDigits:"",limit:"",currentBalance:"",dueDate:"",minimumPayment:"",apr:"",color:Bn[0],reminderEnabled:!1,reminderDays:3,isActive:!0},this.isSaving=!1}connectedCallback(){super.connectedCallback(),this.style.colorScheme="light"}show(t=null){t?(this.card={...t},this.isEditing=!0):(this.card={name:"",lastFourDigits:"",limit:"",currentBalance:"",dueDate:"",minimumPayment:"",apr:"",color:Bn[0],reminderEnabled:!1,reminderDays:3,isActive:!0},this.isEditing=!1),this.style.colorScheme="light",setTimeout(()=>{const e=this.shadowRoot.querySelector(".modal-content");if(e){e.style.backgroundColor="#ffffff",this.shadowRoot.querySelectorAll(".form-label").forEach(r=>r.style.color="#3a3a3c");const s=this.shadowRoot.querySelector(".modal-title");s&&(s.style.color="#000000"),this.shadowRoot.querySelectorAll(".form-input").forEach(r=>{r.style.backgroundColor="#f2f2f7",r.style.color="#000000"});const a=this.shadowRoot.querySelector(".modal-footer");a&&(a.style.backgroundColor="#f9f9f9")}},10),this.open=!0}hide(){this.open=!1,this.isSaving=!1}handleInputChange(t,e){this.card={...this.card,[e]:t.target.value}}selectCardColor(t){this.card={...this.card,color:t}}toggleReminder(t){this.card={...this.card,reminderEnabled:t.target.checked}}selectReminderDays(t){this.card={...this.card,reminderDays:t}}async handleSave(){if(this.card.name){this.isSaving=!0;try{this.isEditing?await ce(this.card.id,this.card):await Bd(this.card),this.hide(),this.dispatchEvent(new CustomEvent("card-saved",{bubbles:!0,composed:!0,detail:{success:!0}}))}catch(t){console.error("Error saving card:",t),this.isSaving=!1}}}handleCancel(){this.hide()}handleBackdropClick(t){t.target===t.currentTarget&&!this.isSaving&&this.hide()}render(){return this.open?W`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">${this.isEditing?"Edit":"Add"} Credit Card</div>
          </div>
          <div class="modal-body">
            <!-- Card name input -->
            <div class="form-group">
              <label class="form-label">Card Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g., Chase Sapphire"
                .value=${this.card.name}
                @input=${t=>this.handleInputChange(t,"name")}
              />
            </div>

            <!-- Last 4 digits input -->
            <div class="form-group">
              <label class="form-label">Last 4 Digits</label>
              <input
                type="text"
                class="form-input"
                placeholder="1234"
                maxlength="4"
                pattern="[0-9]{4}"
                .value=${this.card.lastFourDigits}
                @input=${t=>this.handleInputChange(t,"lastFourDigits")}
              />
            </div>

            <!-- Credit limit input -->
            <div class="form-group">
              <label class="form-label">Credit Limit</label>
              <input
                type="number"
                class="form-input"
                placeholder="5000.00"
                min="0"
                step="0.01"
                .value=${this.card.limit}
                @input=${t=>this.handleInputChange(t,"limit")}
              />
            </div>

            <!-- Current balance input -->
            <div class="form-group">
              <label class="form-label">Current Balance</label>
              <input
                type="number"
                class="form-input"
                placeholder="1500.00"
                min="0"
                step="0.01"
                .value=${this.card.currentBalance}
                @input=${t=>this.handleInputChange(t,"currentBalance")}
              />
            </div>

            <!-- Due date input -->
            <div class="form-group">
              <label class="form-label">Payment Due Date</label>
              <input
                type="date"
                class="form-input"
                .value=${this.card.dueDate}
                @input=${t=>this.handleInputChange(t,"dueDate")}
              />
            </div>

            <!-- Minimum payment input -->
            <div class="form-group">
              <label class="form-label">Minimum Payment</label>
              <input
                type="number"
                class="form-input"
                placeholder="35.00"
                min="0"
                step="0.01"
                .value=${this.card.minimumPayment}
                @input=${t=>this.handleInputChange(t,"minimumPayment")}
              />
            </div>

            <!-- APR input -->
            <div class="form-group">
              <label class="form-label">APR (%)</label>
              <input
                type="number"
                class="form-input"
                placeholder="19.99"
                min="0"
                step="0.01"
                .value=${this.card.apr}
                @input=${t=>this.handleInputChange(t,"apr")}
              />
            </div>

            <!-- Card color selection -->
            <div class="form-group">
              <label class="form-label">Card Color</label>
              <div class="color-options-container">
                ${Bn.map(t=>W`
                  <div
                    class="color-option ${this.card.color===t?"selected":""}"
                    style="background-color: ${t}"
                    @click=${()=>this.selectCardColor(t)}
                  ></div>
                `)}
              </div>
            </div>

            <!-- Payment reminder settings -->
            <div class="reminder-section">
              <div class="reminder-header">Payment Reminders</div>

              <div class="toggle-row">
                <div class="toggle-label">Enable Payment Reminders</div>
                <label class="toggle-switch">
                  <input
                    type="checkbox"
                    ?checked=${this.card.reminderEnabled}
                    @change=${this.toggleReminder}
                  >
                  <span class="toggle-slider"></span>
                </label>
              </div>

              ${this.card.reminderEnabled?W`
                <div class="form-group">
                  <label class="form-label">Remind me</label>
                  <div class="days-before-selector">
                    ${[3,5,7,10].map(t=>W`
                      <div
                        class="days-option ${this.card.reminderDays===t?"selected":""}"
                        @click=${()=>this.selectReminderDays(t)}
                      >
                        ${t} days before
                      </div>
                    `)}
                  </div>
                </div>
              `:""}
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="modal-button cancel-button"
              @click=${this.handleCancel}
              ?disabled=${this.isSaving}
            >
              Cancel
            </button>
            <button
              class="modal-button save-button"
              @click=${this.handleSave}
              ?disabled=${this.isSaving||!this.card.name}
            >
              ${this.isSaving?W`
                <span class="spinner"></span>
                Saving...
              `:"Save"}
            </button>
          </div>
        </div>
      </div>
    `:W``}}q(La,"properties",{open:{type:Boolean},isEditing:{type:Boolean},card:{type:Object},isSaving:{type:Boolean}}),q(La,"styles",Yt`
    :host {
      display: block;
    }

    /* iOS-style modal backdrop */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade-in 0.2s ease-out;
    }

    /* iOS-style modal content */
    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    /* iOS-style modal header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* iOS-style modal title */
    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style modal body */
    .modal-body {
      padding: 16px;
    }

    /* iOS-style modal footer */
    .modal-footer {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    /* iOS-style form group */
    .form-group {
      margin-bottom: 16px;
    }

    /* iOS-style form label */
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #3a3a3c;
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style form input */
    .form-input {
      display: block;
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      background-color: #f2f2f7;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-appearance: none;
      appearance: none;
    }

    .form-input:focus {
      outline: none;
      background-color: #e9e9eb;
    }

    /* iOS-style color options */
    .color-options-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .color-option {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s;
    }

    .color-option.selected {
      border-color: #000000;
      transform: scale(1.1);
    }

    /* iOS-style buttons */
    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .cancel-button {
      color: #007aff;
      opacity: 0.8;
    }

    .save-button {
      color: #007aff;
      font-weight: 600;
    }

    .save-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Reminder section */
    .reminder-section {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .reminder-header {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000000;
    }

    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .toggle-label {
      font-size: 14px;
      color: #3a3a3c;
    }

    /* iOS-style toggle switch */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 51px;
      height: 31px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e9e9eb;
      transition: .4s;
      border-radius: 34px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 27px;
      width: 27px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    input:checked + .toggle-slider {
      background-color: #34c759;
    }

    input:focus + .toggle-slider {
      box-shadow: 0 0 1px #34c759;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }

    /* Days before selector */
    .days-before-selector {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }

    .days-option {
      flex: 1;
      padding: 8px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #ffffff;
    }

    .days-option.selected {
      border-color: #007aff;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
    }

    /* Spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: #007aff;
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Dark mode styles - DISABLED to force light mode for this component */
    /*
    @media (prefers-color-scheme: dark) {
      .modal-content {
        background-color: #1c1c1e;
      }

      .modal-title {
        color: #ffffff;
      }

      .form-label {
        color: #8e8e93;
      }

      .form-input {
        background-color: #2c2c2e;
        color: #ffffff;
      }

      .form-input:focus {
        background-color: #3a3a3c;
      }

      .color-option.selected {
        border-color: #ffffff;
      }

      .modal-header, .modal-footer {
        border-color: rgba(255, 255, 255, 0.1);
      }

      .modal-footer {
        background-color: #1c1c1e;
      }

      .reminder-section {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .reminder-header {
        color: #ffffff;
      }

      .toggle-label {
        color: #8e8e93;
      }

      .toggle-slider {
        background-color: #3a3a3c;
      }

      .toggle-slider:before {
        background-color: #8e8e93;
      }

      input:checked + .toggle-slider {
        background-color: #30d158;
      }

      .days-option {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .days-option.selected {
        background-color: rgba(10, 132, 255, 0.2);
        border-color: #0a84ff;
        color: #0a84ff;
      }
    }
    */
  `);customElements.define("credit-card-edit-form",La);se.register(...lr);class Ba extends Nt{constructor(){super(),this.activeView="weekly",this.weekId=this.getCurrentWeekId(),this.monthId=this.getCurrentMonthId(),this.expenses=[],this.groupedExpenses=[],this.fixedExpenses=[],this.creditCards=[],this.creditCardPayments=[],this.settings={weeklyBudget:200,monthlyBudget:800,currency:"USD"},this.isLoading=!0,this.showAddExpenseForm=!1,this.showAddCardForm=!1,this.showAddFixedExpenseForm=!1,this.showEditFixedExpenseForm=!1,this.showEditExpenseForm=!1,this.showEditCardForm=!1,this.showPaymentModal=!1,this.showDeleteConfirmation=!1,this.pendingDeleteId=null,this.pendingDeleteType=null,this.selectedCardId=null,this.selectedCardTab="overview",this.editingFixedExpense=null,this.editingFixedExpenseId=null,this.editingExpense=null,this.editingExpenseId=null,this.editingCard=null,this.categoryChart=null,this.dailyChart=null,this.spendingStats={totalSpent:0,avgPerDay:0,topCategory:"",topCategoryAmount:0,mostExpensiveDay:"",mostExpensiveAmount:0},this.openAddFixedExpenseForm=this.openAddFixedExpenseForm.bind(this),this.closeAddFixedExpenseForm=this.closeAddFixedExpenseForm.bind(this),this.handleFixedExpenseInputChange=this.handleFixedExpenseInputChange.bind(this),this.selectFixedExpenseCategory=this.selectFixedExpenseCategory.bind(this),this.saveFixedExpense=this.saveFixedExpense.bind(this),this.confirmDelete=this.confirmDelete.bind(this),this.closeDeleteConfirmation=this.closeDeleteConfirmation.bind(this),this.openEditExpenseForm=this.openEditExpenseForm.bind(this),this.closeEditExpenseForm=this.closeEditExpenseForm.bind(this),this.handleEditExpenseInputChange=this.handleEditExpenseInputChange.bind(this),this.selectEditExpenseCategory=this.selectEditExpenseCategory.bind(this),this.saveEditExpense=this.saveEditExpense.bind(this),this.openAddCardForm=this.openAddCardForm.bind(this),this.closeAddCardForm=this.closeAddCardForm.bind(this),this.openEditCardForm=this.openEditCardForm.bind(this),this.closeEditCardForm=this.closeEditCardForm.bind(this),this.selectCard=this.selectCard.bind(this),this.clearSelectedCard=this.clearSelectedCard.bind(this),this.selectCardTab=this.selectCardTab.bind(this),this.openPaymentModal=this.openPaymentModal.bind(this),this.handlePaymentSaved=this.handlePaymentSaved.bind(this),this.newExpense={name:"",amount:"",category:"",date:new Date().toISOString().split("T")[0]},this.newCreditCard={name:"",lastFourDigits:"",limit:"",currentBalance:"",dueDate:"",minimumPayment:"",apr:"",color:Bn[0],reminderEnabled:!1,reminderDays:3,isActive:!0},this.newFixedExpense={name:"",amount:"",category:"",dueDate:"",recurrenceFrequency:"Monthly",isPaid:!1,isActive:!0,paymentMethod:"cash"}}connectedCallback(){super.connectedCallback(),this.loadSettings(),this.loadData(),this.updateComplete.then(()=>{this.setupSwipeToDelete()})}setupSwipeToDelete(){setTimeout(()=>{this.shadowRoot.querySelectorAll(".swipeable-item").forEach(e=>{let i=null,s="fixed";if(e.id&&(e.id.startsWith("variable-expense-")?(i=parseInt(e.id.replace("variable-expense-","")),s="variable"):(i=parseInt(e.id.replace("expense-","")),s="fixed")),!i)return;let o=0,a=0,r=!1;const c=e.querySelector(".fixed-expense-content")||e.querySelector(".expense-content");e.querySelector(".delete-action");const u=90,h=e.querySelector(".delete-button");if(h){const x=h.cloneNode(!0);h.parentNode&&h.parentNode.replaceChild(x,h),x.addEventListener("click",w=>{w.stopPropagation(),s==="fixed"?this.deleteFixedExpense(i):this.deleteVariableExpense(i)})}c&&(c.style.transform="translateX(0)");const p=x=>{x.target.closest(".toggle-switch")||x.target.closest(".payment-status")||(o=x.type==="touchstart"?x.touches[0].clientX:x.clientX,r=!0,c&&(c.style.transition="none"))},y=x=>{if(!r||!c)return;a=x.type==="touchmove"?x.touches[0].clientX:x.clientX;const w=a-o;if(w<0){const S=Math.max(w,-90);c.style.transform=`translateX(${S}px)`}},g=()=>{if(!r||!c)return;if(r=!1,c.style.transition="transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",a-o<-90/2){c.style.transform=`translateX(-${u}px)`;const w=S=>{e.contains(S.target)||(c.style.transform="translateX(0)",document.removeEventListener("click",w),document.removeEventListener("touchstart",w))};setTimeout(()=>{document.addEventListener("click",w),document.addEventListener("touchstart",w)},10)}else c.style.transform="translateX(0)"};e.removeEventListener("touchstart",p),e.removeEventListener("touchmove",y),e.removeEventListener("touchend",g),e.removeEventListener("touchcancel",g),e.removeEventListener("mousedown",p),e.removeEventListener("mousemove",y),e.removeEventListener("mouseup",g),e.removeEventListener("mouseleave",g),e.addEventListener("touchstart",p),e.addEventListener("touchmove",y),e.addEventListener("touchend",g),e.addEventListener("touchcancel",g),e.addEventListener("mousedown",p),e.addEventListener("mousemove",y),e.addEventListener("mouseup",g),e.addEventListener("mouseleave",g)})},300)}async loadSettings(){try{const t=await at.settings.get(1);t&&(this.settings=t)}catch(t){console.error("Error loading settings:",t)}}async loadData(){this.isLoading=!0;try{this.activeView==="weekly"?await this.loadWeekData():this.activeView==="monthly"?await this.loadMonthData():this.activeView==="credit"&&await this.loadCreditCardData()}catch(t){console.error("Error loading data:",t),this.expenses=[],this.groupedExpenses=[],this.creditCards=[]}finally{this.isLoading=!1}}async loadCreditCardData(){try{if(this.creditCards=await Ta(),this.creditCards||(this.creditCards=[]),this.fixedExpenses=Re(),this.selectedCardId){const t=await at.expenses.where("paymentMethod").equals(`card-${this.selectedCardId}`).toArray(),e=this.convertFixedExpensesToTransactions(this.fixedExpenses,this.selectedCardId);this.expenses=[...t,...e],this.groupExpensesByDate(),this.creditCardPayments=await cr(this.selectedCardId),console.log(`Loaded ${t.length} variable transactions and ${e.length} fixed transactions for card ID ${this.selectedCardId}`)}else this.activeView==="weekly"?await this.loadWeekData():this.activeView==="monthly"?await this.loadMonthData():(this.expenses=[],this.groupedExpenses=[]),this.creditCardPayments=[]}catch(t){console.error("Error loading credit card data:",t),this.creditCards=[],this.expenses=[],this.groupedExpenses=[],this.creditCardPayments=[],this.fixedExpenses=[]}}async loadWeekData(){try{this.expenses=await at.expenses.where("weekId").equals(this.weekId).toArray(),this.groupExpensesByDate()}catch(t){console.error("Error loading week data:",t),this.expenses=[],this.groupedExpenses=[]}}async loadMonthData(){try{console.log("Loading month data for:",this.monthId),this.expenses=await at.expenses.where("monthId").equals(this.monthId).toArray(),console.log("Loaded expenses:",this.expenses),this.fixedExpenses=Re(),console.log("Loaded fixed expenses from localStorage:",this.fixedExpenses),this.groupExpensesByDate()}catch(t){console.error("Error loading month data:",t),console.error("Error details:",t.stack),this.expenses=[],this.fixedExpenses=[],this.groupedExpenses=[]}}groupExpensesByDate(){const t={};if(!this.expenses||this.expenses.length===0){this.groupedExpenses=[];return}console.log("Grouping expenses by date:",this.expenses),this.expenses.forEach(e=>{const i=e.date;console.log("Processing expense with date:",i,e),t[i]||(t[i]=[]),t[i].push(e)}),console.log("Grouped expenses by date:",t),this.groupedExpenses=Object.entries(t).sort(([e],[i])=>{const s=new Date(e),o=new Date(i);return console.log(`Comparing dates: ${e} (${s}) vs ${i} (${o})`),o-s}).map(([e,i])=>({date:e,expenses:i})),console.log("Final grouped expenses:",this.groupedExpenses)}getCurrentWeekId(){const t=new Date,e=t.getDay(),i=t.getDate()-e+(e===0?-6:1),s=new Date(t);return s.setDate(i),s.toISOString().split("T")[0]}getCurrentMonthId(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`}handleViewChange(t){this.activeView!==t&&(this.activeView=t,this.loadData())}navigatePrevious(){if(this.activeView==="weekly"){const[t,e,i]=this.weekId.split("-").map(Number),s=new Date(t,e-1,i);s.setDate(s.getDate()-7),this.weekId=s.toISOString().split("T")[0],this.loadWeekData()}else if(this.activeView==="monthly"){const[t,e]=this.monthId.split("-").map(Number),i=e===1?12:e-1,s=e===1?t-1:t;this.monthId=`${s}-${String(i).padStart(2,"0")}`,this.loadMonthData()}}navigateNext(){const t=new Date;if(this.activeView==="weekly"){const[e,i,s]=this.weekId.split("-").map(Number),o=new Date(e,i-1,s),a=new Date(o);a.setDate(a.getDate()+7),a<=t&&(this.weekId=a.toISOString().split("T")[0],this.loadWeekData())}else if(this.activeView==="monthly"){const[e,i]=this.monthId.split("-").map(Number),s=i===12?1:i+1,o=i===12?e+1:e;new Date(o,s-1,1)<=t&&(this.monthId=`${o}-${String(s).padStart(2,"0")}`,this.loadMonthData())}}getDateRangeText(){if(this.activeView==="weekly"){const[t,e,i]=this.weekId.split("-").map(Number),s=new Date(t,e-1,i),o=new Date(s);o.setDate(o.getDate()+6);const a=s.toLocaleString("en-US",{month:"short"}),r=o.toLocaleString("en-US",{month:"short"}),c=s.getDate(),u=o.getDate();return a===r?`${a} ${c} - ${u}`:`${a} ${c} - ${r} ${u}`}else if(this.activeView==="monthly"){const[t,e]=this.monthId.split("-").map(Number);return new Date(t,e-1,1).toLocaleString("en-US",{month:"long",year:"numeric"})}return""}formatDate(t){if(console.log("Formatting date:",t),!t)return console.error("Invalid date string:",t),"Unknown Date";let e;try{if(t.includes("-")){const[r,c,u]=t.split("-").map(Number);e=new Date(r,c-1,u),isNaN(e.getTime())&&(console.error("Invalid date after parsing:",e),e=new Date(t))}else e=new Date(t);if(isNaN(e.getTime()))return console.error("Invalid date after all parsing attempts:",e),"Invalid Date"}catch(r){return console.error("Error parsing date:",r),"Error"}console.log("Parsed date object:",e,"Year:",e.getFullYear(),"Month:",e.getMonth(),"Day:",e.getDate());const i=new Date,s=new Date(e.getFullYear(),e.getMonth(),e.getDate()),o=new Date(i.getFullYear(),i.getMonth(),i.getDate()),a=new Date(o);if(a.setDate(a.getDate()-1),s.getTime()===o.getTime())return"Today";if(s.getTime()===a.getTime())return"Yesterday";{const r=e.toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric"});return console.log("Formatted date:",r),r}}calculateTotalSpent(){return!this.expenses||this.expenses.length===0?0:this.expenses.reduce((t,e)=>{const i=parseFloat(e.amount)||0;return t+i},0)}calculateBudgetProgress(){var i,s;const t=this.calculateTotalSpent();let e=1;return this.activeView==="weekly"?e=((i=this.settings)==null?void 0:i.weeklyBudget)||1:this.activeView==="monthly"&&(e=((s=this.settings)==null?void 0:s.monthlyBudget)||1),e<=0?0:Math.min(100,t/e*100)}getBudgetProgressClass(){const t=this.calculateBudgetProgress();return t>=90?"danger":t>=75?"warning":""}openAddExpenseForm(t=null){this.showAddExpenseForm=!0,this.newExpense={name:"",amount:"",category:"",date:new Date().toISOString().split("T")[0],paymentMethod:t||"cash"}}closeAddExpenseForm(){this.showAddExpenseForm=!1}handleInputChange(t,e){this.newExpense={...this.newExpense,[e]:t.target.value}}selectCategory(t){this.newExpense={...this.newExpense,category:t}}getCategoryIcon(t){return{Food:"🍔",Transport:"🚗",Entertainment:"🎬",Shopping:"🛒",Bills:"📝",Health:"💊",Other:"📦"}[t]||"📦"}async saveExpense(){if(!this.newExpense.amount||!this.newExpense.category){console.error("Please fill in all required fields");return}try{const t=parseFloat(this.newExpense.amount),e={...this.newExpense,amount:t,weekId:this.weekId,monthId:this.monthId,createdAt:new Date().toISOString()};if(e.paymentMethod&&e.paymentMethod.startsWith("card-")){const i=parseInt(e.paymentMethod.replace("card-","")),s=await fe(i);if(s){console.log(`Adding expense to card ${s.name} (ID: ${i})`);const o=parseFloat(s.currentBalance)+t;await ce(i,{currentBalance:o}),console.log(`Updated card balance from ${s.currentBalance} to ${o}`)}else console.error(`Card with ID ${i} not found`)}await at.expenses.add(e),this.closeAddExpenseForm(),this.loadData()}catch(t){console.error("Error saving expense:",t)}}async openEditExpenseForm(t){(!this.creditCards||this.creditCards.length===0)&&(this.creditCards=await Ta()||[]),this.editingExpenseId=t.id,this.editingExpense={...t},this.editingExpense.paymentMethod||(this.editingExpense.paymentMethod="cash"),console.log("Opening edit form with expense:",this.editingExpense),this.showEditExpenseForm=!0}closeEditExpenseForm(){this.showEditExpenseForm=!1,this.editingExpense=null,this.editingExpenseId=null}handleEditExpenseInputChange(t,e){this.editingExpense={...this.editingExpense,[e]:t.target.value}}selectEditExpenseCategory(t){this.editingExpense={...this.editingExpense,category:t}}async saveEditExpense(){if(console.log("saveEditExpense called",this.editingExpense),!this.editingExpense.name||!this.editingExpense.amount||!this.editingExpense.category){console.error("Please fill in all required fields");return}try{const t=await at.expenses.get(this.editingExpenseId);let e=this.editingExpense.date;console.log("Original date from form:",e);const i=parseFloat(this.editingExpense.amount)||0,s={...this.editingExpense,amount:i,date:e};if(console.log("Updating expense with date:",s.date),t.paymentMethod&&t.paymentMethod.startsWith("card-")){const o=parseInt(t.paymentMethod.replace("card-","")),a=await fe(o);if(a){const r=parseFloat(a.currentBalance)-parseFloat(t.amount);await ce(o,{currentBalance:r}),console.log(`Adjusted original card balance from ${a.currentBalance} to ${r}`)}}if(s.paymentMethod&&s.paymentMethod.startsWith("card-")){const o=parseInt(s.paymentMethod.replace("card-","")),a=await fe(o);if(a){const r=parseFloat(a.currentBalance)+i;await ce(o,{currentBalance:r}),console.log(`Updated new card balance from ${a.currentBalance} to ${r}`)}}await at.expenses.update(this.editingExpenseId,s),console.log("Expense updated with ID:",this.editingExpenseId),this.closeEditExpenseForm(),this.loadData()}catch(t){console.error("Error updating expense:",t),console.error("Error details:",t.stack)}}openAddCardForm(){this.activeView!=="credit"&&(this.activeView="credit",this.loadData()),this.showAddCardForm=!1;const t=this.shadowRoot.querySelector("credit-card-edit-form");t?(console.log("Opening credit card form via component"),t.show()):(console.error("Credit card edit form component not found"),this.newCreditCard={name:"",lastFourDigits:"",limit:"",currentBalance:"",dueDate:"",minimumPayment:"",apr:"",color:Bn[0],reminderEnabled:!1,reminderDays:3,isActive:!0},this.showAddCardForm=!0,this.requestUpdate())}closeAddCardForm(){this.showAddCardForm=!1}openEditCardForm(t){this.editingCard=t;const e=this.shadowRoot.querySelector("credit-card-edit-form");e?e.show(t):console.error("Credit card edit form component not found")}closeEditCardForm(){this.showEditCardForm=!1,this.editingCard=null}handleCardInputChange(t,e){this.newCreditCard={...this.newCreditCard,[e]:t.target.value}}selectCardColor(t){this.newCreditCard={...this.newCreditCard,color:t}}async saveCard(){if(!this.newCreditCard.name||!this.newCreditCard.limit){console.error("Please fill in all required fields");return}try{const t={...this.newCreditCard,limit:parseFloat(this.newCreditCard.limit)||0,currentBalance:parseFloat(this.newCreditCard.currentBalance)||0,minimumPayment:parseFloat(this.newCreditCard.minimumPayment)||0,apr:parseFloat(this.newCreditCard.apr)||0};await Bd(t),this.closeAddCardForm(),this.loadData()}catch(t){console.error("Error saving credit card:",t)}}async handleCardSaved(){console.log("Card saved event received, reloading data"),this.activeView!=="credit"&&(this.activeView="credit"),this.showAddCardForm=!1,this.showEditCardForm=!1,await this.loadCreditCardData(),this.requestUpdate()}selectCard(t){this.selectedCardId=t,this.selectedCardTab="overview",this.loadCreditCardData()}clearSelectedCard(){this.selectedCardId=null,this.loadCreditCardData()}selectCardTab(t){this.selectedCardTab=t}openPaymentModal(t){const e=this.shadowRoot.querySelector("credit-card-payment-modal");e?e.show(t,this.settings):console.error("Payment modal component not found")}async handlePaymentSaved(){await this.loadCreditCardData()}confirmDeleteCard(t){console.log("Showing delete confirmation for card ID:",t),this.pendingDeleteId=t,this.pendingDeleteType="card",this.showDeleteConfirmation=!0,this.requestUpdate()}calculateUtilization(t){return vy(t)}formatDueDate(t){return Mc(t).text}getDueDateClass(t,e){return e?"paid":Mc(t).status}getFixedExpenseIcon(t){return{Housing:"🏠",Utilities:"💡",Subscriptions:"📺",Insurance:"🔒",Loans:"💰",Memberships:"🎯",Other:"📦"}[t]||"📦"}getCardNameById(t){if(!this.creditCards||!t)return"Card";const e=this.creditCards.find(i=>i.id===parseInt(t));return e?e.name:"Card"}openAddFixedExpenseForm(t=null){this.showAddFixedExpenseForm=!0,this.newFixedExpense={name:"",amount:"",category:"",dueDate:"",recurrenceFrequency:"Monthly",isPaid:!1,isActive:!0,paymentMethod:t||"cash"}}closeAddFixedExpenseForm(){this.showAddFixedExpenseForm=!1}handleFixedExpenseInputChange(t,e){this.newFixedExpense={...this.newFixedExpense,[e]:t.target.value}}selectFixedExpenseCategory(t){this.newFixedExpense={...this.newFixedExpense,category:t}}async saveFixedExpense(){if(console.log("saveFixedExpense called",this.newFixedExpense),!this.newFixedExpense.name||!this.newFixedExpense.amount||!this.newFixedExpense.category){console.error("Please fill in all required fields");return}try{const t=parseFloat(this.newFixedExpense.amount)||0,e={...this.newFixedExpense,amount:t,createdAt:new Date().toISOString()};if(console.log("Saving fixed expense:",e),e.paymentMethod&&e.paymentMethod.startsWith("card-")){const s=parseInt(e.paymentMethod.replace("card-","")),o=await fe(s);if(o){if(console.log(`Adding fixed expense to card ${o.name} (ID: ${s})`),e.isPaid){const a=parseFloat(o.currentBalance)+t;await ce(s,{currentBalance:a}),console.log(`Updated card balance from ${o.currentBalance} to ${a}`)}}else console.error(`Card with ID ${s} not found`)}const i=Aa(e);console.log("Fixed expense saved with ID:",i),this.closeAddFixedExpenseForm(),this.loadData()}catch(t){console.error("Error saving fixed expense:",t),console.error("Error details:",t.stack)}}async toggleFixedExpensePaid(t){try{const e=this.fixedExpenses.find(i=>i.id===t);if(!e){console.error("Expense not found");return}if(e.paymentMethod&&e.paymentMethod.startsWith("card-")){const i=parseInt(e.paymentMethod.replace("card-","")),s=await fe(i);if(s){const o=parseFloat(e.amount)||0;if(e.isPaid){const a=Math.max(0,parseFloat(s.currentBalance)-o);await ce(i,{currentBalance:a}),console.log(`Removed expense from card balance: ${s.currentBalance} -> ${a}`)}else{const a=parseFloat(s.currentBalance)+o;await ce(i,{currentBalance:a}),console.log(`Added expense to card balance: ${s.currentBalance} -> ${a}`)}}}Ld(t),this.loadData()}catch(e){console.error("Error updating fixed expense:",e)}}openEditFixedExpenseForm(t){this.editingFixedExpenseId=t.id,this.editingFixedExpense={...t},this.showEditFixedExpenseForm=!0}closeEditFixedExpenseForm(){this.showEditFixedExpenseForm=!1,this.editingFixedExpense=null,this.editingFixedExpenseId=null}handleEditFixedExpenseInputChange(t,e,i=!1){this.editingFixedExpense={...this.editingFixedExpense,[e]:i?t.target.checked:t.target.value}}selectEditFixedExpenseCategory(t){this.editingFixedExpense={...this.editingFixedExpense,category:t}}async saveEditFixedExpense(){if(console.log("saveEditFixedExpense called",this.editingFixedExpense),!this.editingFixedExpense.name||!this.editingFixedExpense.amount||!this.editingFixedExpense.category){console.error("Please fill in all required fields");return}try{const t=this.fixedExpenses.find(c=>c.id===this.editingFixedExpenseId);if(!t){console.error("Original expense not found");return}const e=parseFloat(this.editingFixedExpense.amount)||0,i=parseFloat(t.amount)||0,s={...this.editingFixedExpense,amount:e};console.log("Updating fixed expense:",s);const o=t.paymentMethod||"cash",a=s.paymentMethod||"cash";if(t.isPaid&&o.startsWith("card-")){const c=parseInt(o.replace("card-","")),u=await fe(c);if(u&&(a!==o||e!==i)){const h=Math.max(0,parseFloat(u.currentBalance)-i);await ce(c,{currentBalance:h}),console.log(`Adjusted original card (${u.name}) balance to ${h}`)}}if(s.isPaid&&a.startsWith("card-")){const c=parseInt(a.replace("card-","")),u=await fe(c);if(u&&(a!==o||e!==i||!t.isPaid)){const h=parseFloat(u.currentBalance)+e;await ce(c,{currentBalance:h}),console.log(`Updated new card (${u.name}) balance to ${h}`)}}const r=uy(this.editingFixedExpenseId,s);console.log("Fixed expense updated:",r),this.closeEditFixedExpenseForm(),this.loadData()}catch(t){console.error("Error updating fixed expense:",t),console.error("Error details:",t.stack)}}deleteFixedExpense(t){console.log("Showing delete confirmation for fixed expense ID:",t),this.pendingDeleteId=t,this.pendingDeleteType="fixed",this.showDeleteConfirmation=!0,this.requestUpdate()}deleteVariableExpense(t){console.log("Showing delete confirmation for variable expense ID:",t),this.pendingDeleteId=t,this.pendingDeleteType="variable",this.showDeleteConfirmation=!0,this.requestUpdate()}async confirmDelete(){try{if(this.pendingDeleteType==="fixed"){console.log("Deleting fixed expense with ID:",this.pendingDeleteId);const t=this.fixedExpenses.find(e=>e.id===this.pendingDeleteId);if(t&&t.isPaid&&t.paymentMethod&&t.paymentMethod.startsWith("card-")){const e=parseInt(t.paymentMethod.replace("card-","")),i=await fe(e);if(i){const s=Math.max(0,parseFloat(i.currentBalance)-parseFloat(t.amount));await ce(e,{currentBalance:s}),console.log(`Updated card balance from ${i.currentBalance} to ${s}`)}}hy(this.pendingDeleteId)}else if(this.pendingDeleteType==="variable"){console.log("Deleting variable expense with ID:",this.pendingDeleteId);const t=await at.expenses.get(this.pendingDeleteId);if(t&&t.paymentMethod&&t.paymentMethod.startsWith("card-")){const e=parseInt(t.paymentMethod.replace("card-","")),i=await fe(e);if(i){const s=parseFloat(i.currentBalance)-parseFloat(t.amount);await ce(e,{currentBalance:s}),console.log(`Adjusted card balance from ${i.currentBalance} to ${s} after deleting expense`)}}await at.expenses.delete(this.pendingDeleteId)}else this.pendingDeleteType==="card"?(console.log("Deleting credit card with ID:",this.pendingDeleteId),await gy(this.pendingDeleteId),this.selectedCardId===this.pendingDeleteId&&(this.selectedCardId=null)):this.pendingDeleteType==="payment"&&(console.log("Deleting credit card payment with ID:",this.pendingDeleteId),await deleteCreditCardPayment(this.pendingDeleteId));this.loadData(),this.closeDeleteConfirmation()}catch(t){console.error(`Error deleting ${this.pendingDeleteType}:`,t)}}closeDeleteConfirmation(){console.log("Closing delete confirmation"),this.showDeleteConfirmation=!1,this.pendingDeleteId=null,this.pendingDeleteType=null,this.requestUpdate()}calculateTotalFixedExpenses(){return py()}getCardNameById(t){if(!this.creditCards)return"";const e=this.creditCards.find(i=>i.id===parseInt(t));return e?e.name:""}groupExpensesByDateForCard(t){if(!t||t.length===0)return[];const e=[...t].sort((s,o)=>new Date(o.date)-new Date(s.date)),i={};return e.forEach(s=>{const o=s.date;i[o]||(i[o]=[]),i[o].push(s)}),Object.keys(i).map(s=>({date:s,expenses:i[s]}))}convertFixedExpensesToTransactions(t,e){return!t||t.length===0?[]:t.filter(s=>s.paymentMethod===`card-${e}`&&s.isPaid===!0).map(s=>({id:`fixed-${s.id}`,name:s.name,amount:s.amount,category:s.category,date:s.dueDate||new Date().toISOString().split("T")[0],paymentMethod:s.paymentMethod,isFixedExpense:!0,fixedExpenseId:s.id}))}updated(t){super.updated(t),(t.has("expenses")||t.has("activeView"))&&this.expenses&&this.expenses.length>0&&(this.activeView==="weekly"||this.activeView==="monthly")&&(this.createCharts(),this.calculateSpendingStats()),(t.has("fixedExpenses")||t.has("expenses")||t.has("activeView")||t.has("selectedCardTab"))&&((this.activeView==="monthly"||this.activeView==="weekly")&&this.updateComplete.then(()=>{this.setupSwipeToDelete()}),this.activeView==="credit"&&this.selectedCardId&&this.selectedCardTab==="transactions"&&this.updateComplete.then(()=>{this.setupSwipeToDelete()}))}createCharts(){setTimeout(()=>{this.createCategoryChart(),this.createDailyChart()},0)}createCategoryChart(){const t=this.shadowRoot.querySelector("#category-chart");if(!t)return;this.categoryChart&&this.categoryChart.destroy();const e={};this.expenses.forEach(a=>{const r=a.category||"Uncategorized";e[r]||(e[r]=0),e[r]+=parseFloat(a.amount)||0});const i=Object.keys(e),s=Object.values(e),o=["#34c759","#007aff","#ff9500","#ff3b30","#5856d6","#ff2d55","#a2845e","#8e8e93"];this.categoryChart=new se(t,{type:"doughnut",data:{labels:i,datasets:[{data:s,backgroundColor:o.slice(0,i.length),borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:a=>{var h;const r=a.raw,c=a.dataset.data.reduce((p,y)=>p+y,0),u=Math.round(r/c*100);return`${a.label}: ${pt(r,((h=this.settings)==null?void 0:h.currency)||"USD")} (${u}%)`}}}},cutout:"70%",layout:{padding:10}}})}createDailyChart(){const t=this.shadowRoot.querySelector("#daily-chart");if(!t)return;this.dailyChart&&this.dailyChart.destroy();const e={};if(this.activeView==="weekly"){const o=new Date(this.weekId);for(let a=0;a<7;a++){const r=new Date(o);r.setDate(r.getDate()+a);const c=r.toISOString().split("T")[0];e[c]=0}}else if(this.activeView==="monthly"){const[o,a]=this.monthId.split("-").map(Number),r=new Date(o,a,0).getDate();for(let c=1;c<=r;c++){const h=new Date(o,a-1,c).toISOString().split("T")[0];e[h]=0}}this.expenses.forEach(o=>{const a=o.date;e[a]!==void 0&&(e[a]+=parseFloat(o.amount)||0)});const i=Object.keys(e).map(o=>new Date(o).toLocaleDateString("en-US",{weekday:"short",day:"numeric"})),s=Object.values(e);this.dailyChart=new se(t,{type:"bar",data:{labels:i,datasets:[{label:"Daily Spending",data:s,backgroundColor:"#007aff",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>{var a;return`${pt(o.raw,((a=this.settings)==null?void 0:a.currency)||"USD")}`}}}},scales:{y:{beginAtZero:!0,ticks:{callback:o=>{var a;return pt(o,((a=this.settings)==null?void 0:a.currency)||"USD")}}},x:{ticks:{maxRotation:0,autoSkip:!0,font:{size:10}}}},layout:{padding:10}}})}calculateSpendingStats(){if(!this.expenses||this.expenses.length===0){this.spendingStats={totalSpent:0,avgPerDay:0,topCategory:"",topCategoryAmount:0,mostExpensiveDay:"",mostExpensiveAmount:0};return}const t=this.calculateTotalSpent();let e=7;if(this.activeView==="monthly"){const[p,y]=this.monthId.split("-").map(Number);e=new Date(p,y,0).getDate()}const i=t/e,s={};this.expenses.forEach(p=>{const y=p.category||"Uncategorized";s[y]||(s[y]=0),s[y]+=parseFloat(p.amount)||0});let o="",a=0;Object.entries(s).forEach(([p,y])=>{y>a&&(o=p,a=y)});const r={};this.expenses.forEach(p=>{const y=p.date;r[y]||(r[y]=0),r[y]+=parseFloat(p.amount)||0});let c="",u=0;Object.entries(r).forEach(([p,y])=>{y>u&&(c=p,u=y)});let h="";c&&(h=new Date(c).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})),this.spendingStats={totalSpent:t,avgPerDay:i,topCategory:o,topCategoryAmount:a,mostExpensiveDay:h,mostExpensiveAmount:u}}render(){var o,a,r,c,u,h,p,y;if(this.isLoading)return W`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading expenses...</span>
        </div>
      `;const t=this.calculateTotalSpent();let e=0;this.activeView==="weekly"?e=((o=this.settings)==null?void 0:o.weeklyBudget)||0:this.activeView==="monthly"&&(e=((a=this.settings)==null?void 0:a.monthlyBudget)||0);const i=Math.max(0,e-t),s=this.calculateBudgetProgress();return W`
      <!-- Delete Confirmation Dialog using existing modal pattern -->
      ${this.showDeleteConfirmation?W`
        <div class="modal-backdrop" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.4); z-index: 9998;" @click=${this.closeDeleteConfirmation}>
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; width: 270px; border-radius: 14px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15); z-index: 9999; text-align: center;" @click=${g=>g.stopPropagation()}>
            <div style="padding: 20px 16px 0;">
              <div style="font-size: 17px; font-weight: 500; margin-bottom: 8px; color: #000; line-height: 1.3;">Are you sure you want to delete the expense permanently?</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 20px; line-height: 1.4; font-weight: 400;">You cannot undo this action.</div>
            </div>
            <div style="display: flex; border-top: 0.5px solid rgba(0, 0, 0, 0.15); margin-top: 5px;">
              <button style="flex: 1; height: 44px; font-size: 17px; border: none; background: none; cursor: pointer; color: #007AFF; font-weight: 400; border-right: 0.5px solid rgba(0, 0, 0, 0.15); border-bottom-left-radius: 14px;" @click=${this.closeDeleteConfirmation}>
                Cancel
              </button>
              <button style="flex: 1; height: 44px; font-size: 17px; border: none; background: none; cursor: pointer; color: #FF3B30; font-weight: 500; border-bottom-right-radius: 14px;" @click=${this.confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      `:""}
      <div class="container">
        <!-- View selector -->
        <div class="view-selector">
          <div
            class="view-option ${this.activeView==="weekly"?"active":""}"
            @click=${()=>this.handleViewChange("weekly")}
          >
            Weekly
          </div>
          <div
            class="view-option ${this.activeView==="monthly"?"active":""}"
            @click=${()=>this.handleViewChange("monthly")}
          >
            Monthly
          </div>
          <div
            class="view-option ${this.activeView==="credit"?"active":""}"
            @click=${()=>this.handleViewChange("credit")}
          >
            Cards
          </div>
        </div>

        <!-- Date navigation -->
        <div class="date-navigation">
          <div class="nav-arrow" @click=${this.navigatePrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div class="date-range">
            ${this.getDateRangeText()}
          </div>
          <div class="nav-arrow" @click=${this.navigateNext}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        ${this.activeView==="credit"?W`
          <!-- Credit Card View -->
          ${this.selectedCardId?W`
            <!-- Selected Card Detail View -->
            ${this.creditCards.filter(g=>g.id===this.selectedCardId).map(g=>{var x,w,S,O,A;return W`
              <div class="credit-card" style="background-color: ${g.color}">
                <div class="card-header">
                  <div>
                    <div class="card-name">${g.name}</div>
                    <div class="card-number">••••${g.lastFourDigits}</div>
                  </div>
                  <div @click=${this.clearSelectedCard} style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <div class="balance-row">
                    <div class="balance-label">Current Balance</div>
                    <div class="balance-amount">${pt(g.currentBalance,((x=this.settings)==null?void 0:x.currency)||"USD")}</div>
                  </div>
                  <div class="balance-row">
                    <div class="balance-label">Credit Limit</div>
                    <div class="balance-amount">${pt(g.limit,((w=this.settings)==null?void 0:w.currency)||"USD")}</div>
                  </div>
                  <div class="balance-row">
                    <div class="balance-label">Available Credit</div>
                    <div class="balance-amount">${pt(Math.max(0,g.limit-g.currentBalance),((S=this.settings)==null?void 0:S.currency)||"USD")}</div>
                  </div>
                  <div class="credit-utilization">
                    <div class="utilization-fill" style="width: ${this.calculateUtilization(g)}%"></div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="due-date">
                    ${this.formatDueDate(g.dueDate)}
                  </div>
                  <div>
                    <button class="payment-button" @click=${()=>this.openPaymentModal(g)}>Make Payment</button>
                  </div>
                </div>
              </div>

              <!-- Card detail tabs -->
              <div class="view-selector" style="margin-top: 16px;">
                <div
                  class="view-option ${this.selectedCardTab==="overview"?"active":""}"
                  @click=${()=>this.selectCardTab("overview")}
                >
                  Overview
                </div>
                <div
                  class="view-option ${this.selectedCardTab==="payments"?"active":""}"
                  @click=${()=>this.selectCardTab("payments")}
                >
                  Payments
                </div>
                <div
                  class="view-option ${this.selectedCardTab==="transactions"?"active":""}"
                  @click=${()=>this.selectCardTab("transactions")}
                >
                  Transactions
                </div>
              </div>

              ${this.selectedCardTab==="overview"?W`
                <div class="card-detail-header">Card Details</div>
                <div class="budget-card">
                  <div class="balance-row">
                    <div>Minimum Payment</div>
                    <div>${pt(g.minimumPayment,((O=this.settings)==null?void 0:O.currency)||"USD")}</div>
                  </div>
                  <div class="balance-row">
                    <div>APR</div>
                    <div>${g.apr}%</div>
                  </div>
                  <div class="balance-row">
                    <div>Monthly Interest</div>
                    <div>${pt(by(g),((A=this.settings)==null?void 0:A.currency)||"USD")}</div>
                  </div>
                  <div class="balance-row">
                    <div>Payment Due</div>
                    <div class="${this.getDueDateClass(g.dueDate)}">${this.formatDueDate(g.dueDate)}</div>
                  </div>
                </div>

                <div class="ios-button-container">
                  <button
                    class="ios-native-button ios-blue-button filled"
                    @click=${()=>this.openEditCardForm(g)}
                  >
                    Edit Card
                  </button>
                  <button
                    class="ios-native-button ios-red-button"
                    @click=${()=>this.confirmDeleteCard(g.id)}
                  >
                    Delete
                  </button>
                </div>
              `:this.selectedCardTab==="payments"?W`
                <!-- Payment History Tab -->
                <credit-card-payment-history
                  .cardId=${g.id}
                  .settings=${this.settings}
                  @payment-deleted=${this.handlePaymentSaved}
                ></credit-card-payment-history>
              `:W`
                <!-- Transactions Tab -->
                <div class="fixed-expense-header">
                  <div>Card Transactions</div>
                  <div class="add-fixed-expense" @click=${()=>{this.openAddExpenseForm(`card-${g.id}`)}}>+ Add Transaction</div>
                </div>
                <div class="expense-list">
                  ${(()=>{const j=this.expenses.filter(C=>C.paymentMethod===`card-${g.id}`),N=this.groupExpensesByDateForCard(j);return!j||j.length===0?W`
                        <div class="empty-state">
                          <div>No transactions for this card yet</div>
                          <div>Tap the + button to add your first expense</div>
                        </div>
                      `:W`
                        ${N.map(C=>W`
                          <div class="expense-date-header">
                            ${this.formatDate(C.date)}
                          </div>
                          ${C.expenses.map(I=>{var et;const V=I.isFixedExpense===!0,U=V?I.fixedExpenseId:I.id,K=V?`fixed-expense-${U}`:`variable-expense-${U}`;return W`
                              <div class="expense-item swipeable-item"
                                @click=${()=>V?this.openEditFixedExpenseForm(this.fixedExpenses.find(Q=>Q.id===U)):this.openEditExpenseForm(I)}
                                id="${K}">
                                <div class="expense-content">
                                  <div class="expense-info">
                                    <div class="expense-name">${I.name||"Expense"}</div>
                                    <div class="expense-category">
                                      ${I.category||"Uncategorized"}
                                      ${V?W`<span class="fixed-expense-badge">Monthly</span>`:""}
                                    </div>
                                  </div>
                                  <div class="expense-amount">
                                    ${pt(I.amount||0,((et=this.settings)==null?void 0:et.currency)||"USD")}
                                  </div>
                                </div>
                                <div class="delete-action">
                                  <div class="delete-button" @click="${Q=>{Q.stopPropagation(),V?this.deleteFixedExpense(U):this.deleteVariableExpense(U)}}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                      <line x1="10" y1="11" x2="10" y2="17"></line>
                                      <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    <span>Delete</span>
                                  </div>
                                </div>
                              </div>
                            `})}
                        `)}
                      `})()}
                </div>
              `}
            `})}
          `:W`
            <!-- Credit Card List View -->
            ${this.creditCards.length===0?W`
              <div class="empty-state">
                <div class="empty-state-icon">💳</div>
                <div>No credit cards yet</div>
                <div>Tap the + button to add your first card</div>
              </div>
            `:W`
              ${this.creditCards.map(g=>{var x;return W`
                <div class="credit-card" style="background-color: ${g.color}" @click=${()=>this.selectCard(g.id)}>
                  <div class="card-header">
                    <div>
                      <div class="card-name">${g.name}</div>
                      <div class="card-number">••••${g.lastFourDigits}</div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="balance-row">
                      <div class="balance-label">Current Balance</div>
                      <div class="balance-amount">${pt(g.currentBalance,((x=this.settings)==null?void 0:x.currency)||"USD")}</div>
                    </div>
                    <div class="credit-utilization">
                      <div class="utilization-fill" style="width: ${this.calculateUtilization(g)}%"></div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="due-date">
                      ${this.formatDueDate(g.dueDate)}
                    </div>
                  </div>
                </div>
              `})}

              <div class="add-card-button" @click=${this.openAddCardForm}>
                <div class="add-card-icon">+</div>
                <div class="add-card-text">Add Credit Card</div>
              </div>
            `}
          `}
        `:W`
          <!-- Budget overview -->
          <div class="budget-card">
            <div class="card-title">
              ${this.activeView==="weekly"?"Weekly Budget":"Monthly Budget"}
            </div>
            <div class="budget-amount">
              ${pt(e,((r=this.settings)==null?void 0:r.currency)||"USD")}
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill ${this.getBudgetProgressClass()}"
                style="width: ${s}%"
              ></div>
            </div>
            <div class="budget-details">
              <div>${pt(t,((c=this.settings)==null?void 0:c.currency)||"USD")} spent</div>
              <div>${pt(i,((u=this.settings)==null?void 0:u.currency)||"USD")} left</div>
            </div>
          </div>

          <!-- Spending Analysis -->
          ${this.expenses&&this.expenses.length>0?W`
            <div class="spending-analysis">
              <div class="analysis-header">Spending Analysis</div>

              <!-- Stats Cards -->
              <div class="stats-container">
                <div class="stat-card">
                  <div class="stat-value">${pt(this.spendingStats.avgPerDay,((h=this.settings)==null?void 0:h.currency)||"USD")}</div>
                  <div class="stat-label">Avg. Per Day</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${this.spendingStats.topCategory||"N/A"}</div>
                  <div class="stat-label">Top Category</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${this.spendingStats.mostExpensiveDay||"N/A"}</div>
                  <div class="stat-label">Highest Day</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${pt(this.spendingStats.mostExpensiveAmount,((p=this.settings)==null?void 0:p.currency)||"USD")}</div>
                  <div class="stat-label">Highest Amount</div>
                </div>
              </div>

              <!-- Category Chart -->
              <div class="chart-container">
                <div class="chart-title">Spending by Category</div>
                <canvas id="category-chart"></canvas>
                ${!this.expenses||this.expenses.length===0?W`
                  <div class="no-data-message">No data available</div>
                `:""}
              </div>

              <!-- Daily Chart -->
              <div class="chart-container">
                <div class="chart-title">Daily Spending</div>
                <canvas id="daily-chart"></canvas>
                ${!this.expenses||this.expenses.length===0?W`
                  <div class="no-data-message">No data available</div>
                `:""}
              </div>
            </div>
          `:""}

          ${this.activeView==="monthly"?W`
            <!-- Fixed Expenses Section -->
            <div class="fixed-expense-section">
              <div class="fixed-expense-header">
                <div>Monthly Bills</div>
                <div class="add-fixed-expense" @click=${()=>this.openAddFixedExpenseForm()}>+ Add</div>
              </div>

              ${!this.fixedExpenses||this.fixedExpenses.length===0?W`
                <div class="empty-state">
                  <div>No monthly bills yet</div>
                  <div>Add your recurring monthly expenses like rent and subscriptions</div>
                </div>
              `:W`
                ${this.fixedExpenses.map(g=>{var x;return W`
                  <div class="fixed-expense-item swipeable-item" @click=${()=>this.openEditFixedExpenseForm(g)} id="expense-${g.id}">
                    <div class="fixed-expense-content">
                      <div class="fixed-expense-top">
                        <div class="fixed-expense-name">${g.name}</div>
                        <div class="fixed-expense-amount">
                          ${pt(g.amount,((x=this.settings)==null?void 0:x.currency)||"USD")}
                        </div>
                      </div>
                      <div class="fixed-expense-details">
                        <div class="fixed-expense-category">
                          <span class="fixed-expense-category-icon">${this.getFixedExpenseIcon(g.category)}</span>
                          ${g.category}
                          ${g.paymentMethod&&g.paymentMethod.startsWith("card-")?W`
                            <span class="payment-method">
                              💳 ${this.getCardNameById(g.paymentMethod.replace("card-",""))}
                            </span>
                          `:g.paymentMethod==="cash"?W`
                            <span class="payment-method">
                              💵 Cash
                            </span>
                          `:""}
                        </div>
                        <div class="fixed-expense-due ${this.getDueDateClass(g.dueDate,g.isPaid)}">
                          ${this.formatDueDate(g.dueDate)}
                        </div>
                      </div>
                      <div class="payment-status" @click=${w=>w.stopPropagation()}>
                        <div class="payment-status-label">Paid</div>
                        <div class="payment-status-toggle">
                          <label class="toggle-switch">
                            <input
                              type="checkbox"
                              ?checked=${g.isPaid}
                              @change=${()=>this.toggleFixedExpensePaid(g.id)}
                            >
                            <span class="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="delete-action">
                      <div class="delete-button" @click="${w=>{w.stopPropagation(),this.deleteFixedExpense(g.id)}}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                `})}

                <div class="budget-card" style="margin-top: 16px;">
                  <div class="card-title">TOTAL MONTHLY BILLS</div>
                  <div class="budget-amount">
                    ${pt(this.calculateTotalFixedExpenses(),((y=this.settings)==null?void 0:y.currency)||"USD")}
                  </div>
                </div>
              `}
            </div>
          `:""}

          <!-- Variable Expenses -->
          <div class="expense-list">
            <div class="fixed-expense-header">
              <div>${this.activeView==="monthly"?"Everyday Spending":"Expenses"}</div>
              <div class="add-fixed-expense" @click=${()=>this.openAddExpenseForm()}>+ Add Transaction</div>
            </div>

            ${!this.expenses||this.expenses.length===0?W`
              <div class="empty-state">
                <div class="empty-state-icon">💰</div>
                <div>No expenses yet</div>
                <div>Tap the + button to add your first expense</div>
              </div>
            `:W`
              ${this.groupedExpenses&&this.groupedExpenses.map(g=>W`
                <div class="expense-date-header">
                  ${this.formatDate(g.date)}
                </div>
                ${g.expenses&&g.expenses.map(x=>{var w;return W`
                  <div class="expense-item swipeable-item" @click=${()=>this.openEditExpenseForm(x)} id="variable-expense-${x.id}">
                    <div class="expense-content">
                      <div class="expense-info">
                        <div class="expense-name">${x.name||"Expense"}</div>
                        <div class="expense-category">
                          ${x.category||"Uncategorized"}
                          ${x.paymentMethod&&x.paymentMethod.startsWith("card-")?W`
                            <span class="payment-method">
                              💳 ${this.getCardNameById(x.paymentMethod.replace("card-",""))}
                            </span>
                          `:""}
                        </div>
                      </div>
                      <div class="expense-amount">
                        ${pt(x.amount||0,((w=this.settings)==null?void 0:w.currency)||"USD")}
                      </div>
                    </div>
                    <div class="delete-action">
                      <div class="delete-button" @click="${S=>{S.stopPropagation(),this.deleteVariableExpense(x.id)}}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                `})}
              `)}
            `}
          </div>
        `}
      </div>

      <!-- Add button (expense or card based on active view) - iOS style -->
      <div class="add-expense-button" @click=${()=>{this.activeView==="credit"?this.openAddCardForm():this.activeView==="monthly"?this.openAddFixedExpenseForm():this.openAddExpenseForm()}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      <!-- Add expense form -->
      ${this.showAddExpenseForm?W`
        <div class="modal-backdrop" @click=${this.closeAddExpenseForm}>
          <div class="modal-content" @click=${g=>g.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Everyday Expense</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="What did you spend on?"
                  .value=${this.newExpense.name}
                  @input=${g=>this.handleInputChange(g,"name")}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newExpense.amount}
                  @input=${g=>this.handleInputChange(g,"amount")}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${nl.map(g=>W`
                    <div
                      class="category-item ${this.newExpense.category===g?"selected":""}"
                      @click=${()=>this.selectCategory(g)}
                    >
                      <div class="category-icon">${this.getCategoryIcon(g)}</div>
                      <div class="category-name">${g}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Date input -->
              <div class="form-group">
                <label class="form-label">Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newExpense.date}
                  @input=${g=>this.handleInputChange(g,"date")}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.newExpense.paymentMethod||"cash"}
                  @change=${g=>this.handleInputChange(g,"paymentMethod")}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards&&this.creditCards.map(g=>W`
                    <option value="card-${g.id}">${g.name} (••••${g.lastFourDigits})</option>
                  `)}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${this.closeAddExpenseForm}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${this.saveExpense}>
                Save
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Add credit card form -->
      ${this.showAddCardForm?W`
        <div class="modal-backdrop" @click=${this.closeAddCardForm}>
          <div class="modal-content" @click=${g=>g.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Credit Card</h3>
            </div>

            <div class="modal-body">
              <!-- Card name input -->
              <div class="form-group">
                <label class="form-label">Card Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Chase Sapphire"
                  .value=${this.newCreditCard.name}
                  @input=${g=>this.handleCardInputChange(g,"name")}
                />
              </div>

              <!-- Last 4 digits input -->
              <div class="form-group">
                <label class="form-label">Last 4 Digits</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="1234"
                  maxlength="4"
                  pattern="[0-9]{4}"
                  .value=${this.newCreditCard.lastFourDigits}
                  @input=${g=>this.handleCardInputChange(g,"lastFourDigits")}
                />
              </div>

              <!-- Credit limit input -->
              <div class="form-group">
                <label class="form-label">Credit Limit</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="5000.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.limit}
                  @input=${g=>this.handleCardInputChange(g,"limit")}
                />
              </div>

              <!-- Current balance input -->
              <div class="form-group">
                <label class="form-label">Current Balance</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.currentBalance}
                  @input=${g=>this.handleCardInputChange(g,"currentBalance")}
                />
              </div>

              <!-- APR input -->
              <div class="form-group">
                <label class="form-label">APR (%)</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="15.99"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.apr}
                  @input=${g=>this.handleCardInputChange(g,"apr")}
                />
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Payment Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newCreditCard.dueDate}
                  @input=${g=>this.handleCardInputChange(g,"dueDate")}
                />
              </div>

              <!-- Minimum payment input -->
              <div class="form-group">
                <label class="form-label">Minimum Payment</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="35.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.minimumPayment}
                  @input=${g=>this.handleCardInputChange(g,"minimumPayment")}
                />
              </div>

              <!-- Card color selection -->
              <div class="form-group">
                <label class="form-label">Card Color</label>
                <div class="color-options-container">
                  ${Bn.map(g=>W`
                    <div
                      class="color-option ${this.newCreditCard.color===g?"selected":""}"
                      style="background-color: ${g}"
                      @click=${()=>this.selectCardColor(g)}
                    ></div>
                  `)}
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${this.closeAddCardForm}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${this.saveCard}>
                Save
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Add fixed expense form -->
      ${this.showAddFixedExpenseForm?W`
        <div class="modal-backdrop" @click=${this.closeAddFixedExpenseForm}>
          <div class="modal-content" @click=${g=>g.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Monthly Bill</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Rent, Netflix, Car Insurance"
                  .value=${this.newFixedExpense.name}
                  @input=${g=>this.handleFixedExpenseInputChange(g,"name")}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newFixedExpense.amount}
                  @input=${g=>this.handleFixedExpenseInputChange(g,"amount")}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${il.map(g=>W`
                    <div
                      class="category-item ${this.newFixedExpense.category===g?"selected":""}"
                      @click=${()=>this.selectFixedExpenseCategory(g)}
                    >
                      <div class="category-icon">${this.getFixedExpenseIcon(g)}</div>
                      <div class="category-name">${g}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newFixedExpense.dueDate}
                  @input=${g=>this.handleFixedExpenseInputChange(g,"dueDate")}
                />
              </div>

              <!-- Recurrence frequency -->
              <div class="form-group">
                <label class="form-label">Recurrence</label>
                <select
                  class="form-input"
                  .value=${this.newFixedExpense.recurrenceFrequency}
                  @change=${g=>this.handleFixedExpenseInputChange(g,"recurrenceFrequency")}
                >
                  ${sl.map(g=>W`
                    <option value=${g}>${g}</option>
                  `)}
                </select>
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.newFixedExpense.paymentMethod||"cash"}
                  @change=${g=>this.handleFixedExpenseInputChange(g,"paymentMethod")}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards&&this.creditCards.map(g=>W`
                    <option value="card-${g.id}">${g.name} (••••${g.lastFourDigits})</option>
                  `)}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${()=>this.closeAddFixedExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${()=>this.saveFixedExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Edit fixed expense form -->
      ${this.showEditFixedExpenseForm&&this.editingFixedExpense?W`
        <div class="modal-backdrop" @click=${()=>this.closeEditFixedExpenseForm()}>
          <div class="modal-content" @click=${g=>g.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Edit Monthly Bill</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Rent, Netflix, Car Insurance"
                  .value=${this.editingFixedExpense.name}
                  @input=${g=>this.handleEditFixedExpenseInputChange(g,"name")}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.editingFixedExpense.amount}
                  @input=${g=>this.handleEditFixedExpenseInputChange(g,"amount")}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${il.map(g=>W`
                    <div
                      class="category-item ${this.editingFixedExpense.category===g?"selected":""}"
                      @click=${()=>this.selectEditFixedExpenseCategory(g)}
                    >
                      <div class="category-icon">${this.getFixedExpenseIcon(g)}</div>
                      <div class="category-name">${g}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.editingFixedExpense.dueDate}
                  @input=${g=>this.handleEditFixedExpenseInputChange(g,"dueDate")}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.editingFixedExpense.paymentMethod||"cash"}
                  @change=${g=>this.handleEditFixedExpenseInputChange(g,"paymentMethod")}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards&&this.creditCards.map(g=>{const x=`card-${g.id}`,w=this.editingFixedExpense.paymentMethod===x;return W`
                      <option value="${x}" ?selected=${w}>${g.name} (••••${g.lastFourDigits})</option>
                    `})}
                </select>
              </div>

              <!-- Recurrence frequency -->
              <div class="form-group">
                <label class="form-label">Recurrence</label>
                <select
                  class="form-input"
                  .value=${this.editingFixedExpense.recurrenceFrequency}
                  @change=${g=>this.handleEditFixedExpenseInputChange(g,"recurrenceFrequency")}
                >
                  ${sl.map(g=>W`
                    <option value=${g}>${g}</option>
                  `)}
                </select>
              </div>

              <!-- Paid status -->
              <div class="form-group">
                <label class="form-label">
                  <input
                    type="checkbox"
                    ?checked=${this.editingFixedExpense.isPaid}
                    @change=${g=>this.handleEditFixedExpenseInputChange(g,"isPaid",!0)}
                  />
                  Paid
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${()=>this.closeEditFixedExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${()=>this.saveEditFixedExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Edit variable expense form -->
      ${this.showEditExpenseForm&&this.editingExpense?W`
        <div class="modal-backdrop" @click=${()=>this.closeEditExpenseForm()}>
          <div class="modal-content" @click=${g=>g.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Edit Everyday Expense</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="What did you spend on?"
                  .value=${this.editingExpense.name}
                  @input=${g=>this.handleEditExpenseInputChange(g,"name")}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.editingExpense.amount}
                  @input=${g=>this.handleEditExpenseInputChange(g,"amount")}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${nl.map(g=>W`
                    <div
                      class="category-item ${this.editingExpense.category===g?"selected":""}"
                      @click=${()=>this.selectEditExpenseCategory(g)}
                    >
                      <div class="category-icon">${this.getCategoryIcon(g)}</div>
                      <div class="category-name">${g}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Date input -->
              <div class="form-group">
                <label class="form-label">Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.editingExpense.date}
                  @input=${g=>this.handleEditExpenseInputChange(g,"date")}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.editingExpense.paymentMethod||"cash"}
                  @change=${g=>this.handleEditExpenseInputChange(g,"paymentMethod")}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards&&this.creditCards.map(g=>{const x=`card-${g.id}`,w=this.editingExpense.paymentMethod===x;return console.log(`Card option: ${x}, Selected: ${w}, Current value: ${this.editingExpense.paymentMethod}`),W`
                      <option value="${x}" ?selected=${w}>${g.name} (••••${g.lastFourDigits})</option>
                    `})}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${()=>this.closeEditExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${()=>this.saveEditExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Delete confirmation dialog -->
      ${this.showDeleteConfirmation?W`
        <div class="confirmation-dialog-backdrop" @click=${this.closeDeleteConfirmation}>
          <div class="confirmation-dialog" @click=${g=>g.stopPropagation()}>
            <div class="confirmation-title">
              ${this.pendingDeleteType==="fixed"?"Delete Monthly Bill":this.pendingDeleteType==="variable"?"Delete Everyday Expense":this.pendingDeleteType==="card"?"Delete Credit Card":"Delete Payment"}
            </div>
            <div class="confirmation-message">
              ${this.pendingDeleteType==="fixed"?"Are you sure you want to delete this monthly bill?":this.pendingDeleteType==="variable"?"Are you sure you want to delete this everyday expense?":this.pendingDeleteType==="card"?"Are you sure you want to delete this credit card? All payment history will also be deleted.":"Are you sure you want to delete this payment? This will add the payment amount back to your card balance."}
            </div>
            <div class="confirmation-buttons">
              <button class="confirmation-button delete-button" @click=${this.confirmDelete}>
                Delete
              </button>
              <button class="confirmation-button cancel-button" @click=${this.closeDeleteConfirmation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Credit Card Payment Modal -->
      <credit-card-payment-modal
        @payment-saved=${this.handlePaymentSaved}
      ></credit-card-payment-modal>

      <!-- Credit Card Edit Form -->
      <credit-card-edit-form
        @card-saved=${this.handleCardSaved}
      ></credit-card-edit-form>
    `}static get styles(){return[super.styles,Yt`
        /* Notes app style modal */
        .notes-style-modal {
          background-color: white;
          background: white;
          border-radius: 14px;
          width: 270px;
          max-width: 90%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .notes-style-icon {
          margin: 20px auto 15px;
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes notes-style-animation {
          0% {
            transform: scale(1.2);
            opacity: 0;
          }
          45% {
            transform: scale(1.02);
            opacity: 1;
          }
          60% {
            transform: scale(0.98);
          }
          80% {
            transform: scale(1.01);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .notes-style-content {
          padding: 20px 16px 0;
        }

        .notes-style-title {
          font-size: 17px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #000;
          line-height: 1.3;
        }

        .notes-style-message {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.4;
          font-weight: 400;
        }

        .notes-style-buttons {
          display: flex;
          flex-direction: row;
          border-top: 0.5px solid rgba(0, 0, 0, 0.15);
          margin-top: 5px;
        }

        .notes-style-button {
          font-size: 17px;
          padding: 0;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s;
          -webkit-tap-highlight-color: transparent;
          margin: 0;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          border-radius: 0;
          background: none;
        }

        .notes-style-cancel {
          color: #007AFF;
          font-weight: 400;
          border-bottom-left-radius: 14px;
          border-right: 0.5px solid rgba(0, 0, 0, 0.15);
        }

        .notes-style-delete {
          color: #FF3B30;
          font-weight: 500;
          border-bottom-right-radius: 14px;
        }

        .notes-style-button:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `]}}q(Ba,"properties",{activeView:{type:String},weekId:{type:String},monthId:{type:String},expenses:{type:Array},fixedExpenses:{type:Array},creditCards:{type:Array},creditCardPayments:{type:Array},settings:{type:Object},isLoading:{type:Boolean},showAddExpenseForm:{type:Boolean},showAddCardForm:{type:Boolean},showAddFixedExpenseForm:{type:Boolean},showEditFixedExpenseForm:{type:Boolean},showEditExpenseForm:{type:Boolean},showEditCardForm:{type:Boolean},showPaymentModal:{type:Boolean},showDeleteConfirmation:{type:Boolean},pendingDeleteId:{type:Number},pendingDeleteType:{type:String},newExpense:{type:Object},newCreditCard:{type:Object},newFixedExpense:{type:Object},editingFixedExpense:{type:Object},editingFixedExpenseId:{type:Number},editingExpense:{type:Object},editingExpenseId:{type:Number},editingCard:{type:Object},selectedCardId:{type:Number},selectedCardTab:{type:String},categoryChart:{type:Object},dailyChart:{type:Object},spendingStats:{type:Object}}),q(Ba,"styles",Yt`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
      margin-bottom: 80px;
    }

    .view-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      padding: 2px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .view-option {
      flex: 1;
      text-align: center;
      padding: 7px 12px;
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-option.active {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .dark .view-option.active {
      background-color: #1c1c1e;
      color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .date-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .date-range {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    .nav-arrow {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(142, 142, 147, 0.12);
      cursor: pointer;
    }

    .budget-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .card-title {
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .budget-amount {
      font-size: 28px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 8px;
    }

    .progress-bar {
      height: 8px;
      background-color: rgba(142, 142, 147, 0.2);
      border-radius: 4px;
      margin-bottom: 8px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: #34c759;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-fill.warning {
      background-color: #ff9500;
    }

    .progress-fill.danger {
      background-color: #ff3b30;
    }

    .budget-details {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #8e8e93;
    }

    .expense-list {
      margin-bottom: 16px;
    }

    .expense-date-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .expense-item {
      background-color: #ffffff;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      touch-action: pan-x;
      user-select: none;
    }

    .expense-content {
      padding: 12px 16px;
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .expense-info {
      display: flex;
      flex-direction: column;
    }

    .expense-name {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 4px;
    }

    .expense-category {
      font-size: 13px;
      color: #8e8e93;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    .payment-method {
      display: inline-flex;
      align-items: center;
      background-color: #f2f2f7;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: 4px;
      font-size: 11px;
    }

    .fixed-expense-badge {
      display: inline-block;
      font-size: 10px;
      padding: 2px 6px;
      margin-left: 6px;
      background-color: #007aff;
      color: white;
      border-radius: 10px;
      font-weight: 500;
    }

    .expense-amount {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    .add-expense-button {
      position: fixed;
      bottom: calc(80px + env(safe-area-inset-bottom, 0px));
      right: max(16px, env(safe-area-inset-right, 16px));
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background-color: #007aff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
      cursor: pointer;
      z-index: 10;
      -webkit-tap-highlight-color: transparent;
      transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    }

    /* iOS-style hover effect (desktop only) */
    @media (hover: hover) {
      .add-expense-button:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 10px rgba(0, 122, 255, 0.4);
      }
    }

    .add-expense-button:active {
      transform: scale(0.95);
      background-color: #0062cc;
      box-shadow: 0 1px 4px rgba(0, 122, 255, 0.3);
    }

    .add-expense-button svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.5;
    }

    .dark .add-expense-button {
      background-color: #0a84ff;
      box-shadow: 0 2px 8px rgba(10, 132, 255, 0.3);
    }

    @media (hover: hover) {
      .dark .add-expense-button:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 10px rgba(10, 132, 255, 0.4);
      }
    }

    .dark .add-expense-button:active {
      background-color: #0974e0;
      box-shadow: 0 1px 4px rgba(10, 132, 255, 0.3);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
      text-align: center;
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #8e8e93;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .ios-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(0, 122, 255, 0.2);
      border-top-color: rgba(0, 122, 255, 1);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Form styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 340px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
    }

    .modal-body {
      padding: 16px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 8px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .category-item.selected {
      background-color: rgba(0, 122, 255, 0.1);
      border-color: #007aff;
    }

    .category-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }

    .category-name {
      font-size: 12px;
      text-align: center;
    }

    .modal-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
    }

    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
    }

    .cancel-button {
      color: #8e8e93;
    }

    .save-button {
      color: #007aff;
    }

    /* Credit Card Styles */
    .credit-card {
      background-color: #007aff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .credit-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
      z-index: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      position: relative;
      z-index: 2;
    }

    .card-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-number {
      font-size: 14px;
      opacity: 0.8;
    }

    .card-body {
      position: relative;
      z-index: 2;
    }

    .balance-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .balance-label {
      font-size: 14px;
      opacity: 0.8;
    }

    .balance-amount {
      font-size: 14px;
      font-weight: 600;
    }

    .card-footer {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }

    .due-date {
      font-size: 14px;
    }

    .due-date-value {
      font-weight: 600;
    }

    .credit-utilization {
      height: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      margin: 8px 0;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .utilization-fill {
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
    }

    .add-card-button {
      background-color: rgba(142, 142, 147, 0.12);
      border: 1px dashed #8e8e93;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-align: center;
    }

    .add-card-icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .add-card-text {
      font-size: 15px;
      color: #007aff;
    }

    .card-detail-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .payment-button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 8px;
    }

    .color-option {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      margin: 4px;
      cursor: pointer;
      display: inline-block;
      border: 2px solid transparent;
    }

    .color-option.selected {
      border-color: #000000;
    }

    .color-options-container {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    /* Fixed Expense Styles */
    .fixed-expense-section {
      margin-bottom: 24px;
    }

    .fixed-expense-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .add-fixed-expense {
      font-size: 13px;
      color: #007aff;
      cursor: pointer;
    }

    .fixed-expense-item {
      background-color: #ffffff;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      touch-action: pan-x;
      user-select: none;
    }

    .fixed-expense-content {
      padding: 16px;
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .delete-action {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff3b30;
      color: white;
      font-weight: 600;
      z-index: 0;
    }

    .delete-button {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      gap: 4px;
    }

    .delete-button svg.trash-icon {
      margin-bottom: 4px;
      width: 22px;
      height: 22px;
      stroke: white;
      stroke-width: 2;
    }

    .delete-button span {
      font-size: 12px;
      font-weight: 500;
    }

    .fixed-expense-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .fixed-expense-name {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }

    .fixed-expense-amount {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }

    .fixed-expense-details {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #8e8e93;
    }

    .fixed-expense-category {
      display: flex;
      align-items: center;
    }

    .fixed-expense-category-icon {
      margin-right: 4px;
    }

    .fixed-expense-due {
      display: flex;
      align-items: center;
    }

    .due-soon {
      color: #ff9500;
    }

    .overdue {
      color: #ff3b30;
    }

    .paid {
      color: #34c759;
    }

    .payment-status {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .fixed-expense-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .action-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .edit-button {
      color: #007aff;
    }

    .delete-button {
      color: #ff3b30;
    }

    .payment-status-label {
      font-size: 13px;
      color: #8e8e93;
    }

    .payment-status-toggle {
      display: flex;
      align-items: center;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      margin-left: 8px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e9e9eb;
      transition: .4s;
      border-radius: 34px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    input:checked + .toggle-slider {
      background-color: #34c759;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(16px);
    }

    /* Spending Analysis Styles */
    .spending-analysis {
      margin-bottom: 24px;
    }

    .analysis-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .chart-container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .chart-container canvas {
      max-width: 100%;
      max-height: 200px; /* Leave room for title and padding */
    }

    .chart-title {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 8px;
      text-align: center;
    }

    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 8px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      margin-right: 12px;
      margin-bottom: 4px;
      font-size: 12px;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      margin-right: 4px;
    }

    .no-data-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #8e8e93;
      font-size: 14px;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 16px;
    }

    .stat-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #8e8e93;
    }
  `);customElements.define("spend-view-new",Ba);class Na extends Nt{constructor(){super(),this.expenses=[],this.isLoading=!1,this.showForm=!1,this.newExpense={name:"",amount:"",category:"Housing",dueDate:new Date().toISOString().split("T")[0],recurrenceFrequency:"Monthly",isPaid:!1,isActive:!0}}connectedCallback(){super.connectedCallback(),this.loadExpenses()}loadExpenses(){this.isLoading=!0,this.expenses=Re(),this.isLoading=!1}handleAddTestExpense(){this.isLoading=!0;const t={name:"Test Rent",amount:1e3,category:"Housing",dueDate:new Date().toISOString().split("T")[0],recurrenceFrequency:"Monthly",isPaid:!1,isActive:!0};Aa(t),this.loadExpenses(),this.isLoading=!1}handleClearExpenses(){this.isLoading=!0,fy(),this.loadExpenses(),this.isLoading=!1}handleTogglePaid(t){Ld(t),this.loadExpenses()}toggleForm(){this.showForm=!this.showForm}handleInputChange(t,e){this.newExpense={...this.newExpense,[e]:t.target.value}}handleCheckboxChange(t,e){this.newExpense={...this.newExpense,[e]:t.target.checked}}handleSubmit(t){if(t.preventDefault(),!this.newExpense.name||!this.newExpense.amount){alert("Please fill in all required fields");return}Aa({...this.newExpense,amount:parseFloat(this.newExpense.amount)}),this.newExpense={name:"",amount:"",category:"Housing",dueDate:new Date().toISOString().split("T")[0],recurrenceFrequency:"Monthly",isPaid:!1,isActive:!0},this.showForm=!1,this.loadExpenses()}render(){return W`
      <div class="container">
        <h2>Fixed Expenses Test</h2>

        <div class="button-container">
          <button @click=${this.handleAddTestExpense}>Add Test Expense</button>
          <button @click=${this.toggleForm}>${this.showForm?"Cancel":"Add Custom Expense"}</button>
          <button @click=${this.loadExpenses}>Refresh</button>
          <button class="danger" @click=${this.handleClearExpenses}>Clear All</button>
        </div>

        ${this.showForm?W`
          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label>Name:</label>
              <input
                type="text"
                .value=${this.newExpense.name}
                @input=${t=>this.handleInputChange(t,"name")}
                required
              />
            </div>

            <div class="form-group">
              <label>Amount:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                .value=${this.newExpense.amount}
                @input=${t=>this.handleInputChange(t,"amount")}
                required
              />
            </div>

            <div class="form-group">
              <label>Category:</label>
              <select
                .value=${this.newExpense.category}
                @change=${t=>this.handleInputChange(t,"category")}
              >
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Insurance">Insurance</option>
                <option value="Loans">Loans</option>
                <option value="Memberships">Memberships</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                .value=${this.newExpense.dueDate}
                @input=${t=>this.handleInputChange(t,"dueDate")}
                required
              />
            </div>

            <div class="form-group">
              <label>Recurrence:</label>
              <select
                .value=${this.newExpense.recurrenceFrequency}
                @change=${t=>this.handleInputChange(t,"recurrenceFrequency")}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div class="form-group">
              <label>
                <input
                  type="checkbox"
                  ?checked=${this.newExpense.isPaid}
                  @change=${t=>this.handleCheckboxChange(t,"isPaid")}
                />
                Paid
              </label>
            </div>

            <div class="form-group">
              <button type="submit">Save Expense</button>
            </div>
          </form>
        `:""}

        ${this.isLoading?W`
          <div class="loading">Loading...</div>
        `:W`
          <div>
            <p>Total expenses: ${this.expenses.length}</p>

            <div class="expense-list">
              ${this.expenses.length===0?W`
                <p>No fixed expenses found.</p>
              `:W`
                ${this.expenses.map(t=>W`
                  <div class="expense-item">
                    <div class="expense-name">${t.name}</div>
                    <div class="expense-details">
                      <span>${t.category}</span>
                      <span>${pt(t.amount,"USD")}</span>
                    </div>
                    <div class="expense-details">
                      <span>Due: ${t.dueDate}</span>
                      <span>
                        Paid: ${t.isPaid?"Yes":"No"}
                        <button @click=${()=>this.handleTogglePaid(t.id)}>
                          ${t.isPaid?"Mark Unpaid":"Mark Paid"}
                        </button>
                      </span>
                    </div>
                  </div>
                `)}
              `}
            </div>
          </div>
        `}
      </div>
    `}}q(Na,"properties",{expenses:{type:Array},isLoading:{type:Boolean},showForm:{type:Boolean},newExpense:{type:Object}}),q(Na,"styles",Yt`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      color: #007aff;
    }

    .button-container {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }

    button.danger {
      background-color: #ff3b30;
    }

    .expense-list {
      margin-top: 16px;
    }

    .expense-item {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
    }

    .expense-name {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .expense-details {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #8e8e93;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }

    form {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #c7c7cc;
      font-size: 16px;
    }

    input[type="checkbox"] {
      width: auto;
      margin-right: 8px;
    }

    button[type="submit"] {
      background-color: #34c759;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  `);customElements.define("test-fixed-expenses-view",Na);async function $y(){try{await Lc(),await Va(Xs()),Qu()&&(console.log("First launch detected"),Zu()),await nh();const t=await at.settings.get(1);await ih(),Nc(t.theme),Ay();const e=t.defaultView||"week";zd(e);const i=document.getElementById(`tab-${e}`);i&&i.classList.add("active");const s=document.querySelector(".ios-header h1");if(s)switch(e){case"week":s.textContent="This Week";break;case"summary":s.textContent="Summary";break;case"spend":s.textContent="Spend";break;case"history":s.textContent="History";break;case"settings":s.textContent="Settings";break;default:s.textContent="Hour Halo"}Ty(),console.log("Hour Halo initialized successfully")}catch(n){console.error("Error initializing app:",n)}}function Ay(){const n=document.querySelector("#app"),t=W`
    <div class="flex flex-col h-screen safe-area-all">
      <!-- iOS-style header with safe area insets -->
      <header class="ios-header safe-area-top dynamic-island-aware">
        <div class="flex justify-center items-center">
          <h1 class="text-lg font-semibold">Hour Halo</h1>
        </div>
      </header>

      <!-- Main content area with safe area insets -->
      <main class="flex-1 overflow-y-auto pb-28 safe-area-all">
        <div id="view-container" class="p-4 pb-20"></div>
      </main>

      <!-- iOS-style bottom navigation with safe area insets -->
      <nav class="ios-nav-bar safe-area-bottom">
        <div class="flex justify-around items-center h-16">
          <a href="#week" class="ios-nav-item" id="tab-week">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs mt-1">Week</span>
            </div>
          </a>
          <a href="#summary" class="ios-nav-item" id="tab-summary">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span class="text-xs mt-1">Summary</span>
            </div>
          </a>
          <a href="#spend" class="ios-nav-item" id="tab-spend">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs mt-1">Spend</span>
            </div>
          </a>
          <a href="#history" class="ios-nav-item" id="tab-history">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs mt-1">History</span>
            </div>
          </a>
          <a href="#settings" class="ios-nav-item" id="tab-settings">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-xs mt-1">Settings</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  `;Wa(t,n)}function Ty(){Hu.addListener(n=>{document.querySelectorAll(".ios-nav-item").forEach(i=>{i.classList.remove("active")});const t=document.getElementById(`tab-${n}`);t&&t.classList.add("active");const e=document.querySelector(".ios-header h1");if(e)switch(n){case"week":e.textContent="This Week";break;case"summary":e.textContent="Summary";break;case"spend":e.textContent="Spend";break;case"history":e.textContent="History";break;case"settings":e.textContent="Settings";break;default:e.textContent="Hour Halo"}zd(n)})}function zd(n){const t=document.getElementById("view-container");switch(t.innerHTML="",n){case"week":const e=document.createElement("week-view");t.appendChild(e);break;case"summary":const i=document.createElement("summary-view");t.appendChild(i);break;case"spend":const s=document.createElement("spend-view-new");t.appendChild(s);break;case"history":const o=document.createElement("history-view");t.appendChild(o);break;case"test-fixed-expenses":const a=document.createElement("test-fixed-expenses-view");t.appendChild(a);break;case"settings":const r=document.createElement("settings-view");t.appendChild(r);break;case"diagnostic":const c=document.createElement("diagnostic-view");t.appendChild(c);break;default:const u=W`
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
          <h2 class="text-2xl font-bold mb-4">${n.charAt(0).toUpperCase()+n.slice(1)} View</h2>
          <p class="text-gray-600 dark:text-gray-300">
            This view is coming soon.
          </p>
        </div>
      `;Wa(u,t)}}document.addEventListener("DOMContentLoaded",$y);export{at as d};
