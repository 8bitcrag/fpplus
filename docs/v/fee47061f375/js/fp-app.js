import{LitElement as ws,css as xs,html as q,nothing as $s}from"lit";var Qe=new CSSStyleSheet,de=await fetch(new URL("../css/system.css",import.meta.url));if(!de.ok)throw new Error(`styles: system.css failed to load (${de.status})`);Qe.replaceSync(await de.text());var k=Qe;function bt(s,e=0){return s[e]|0}function yt(s,e=0){let t=s[e+1]<<8;return s[e]|t}function wt(s,e=0){let t=s[e+1]<<8,r=s[e+2]<<16;return s[e]|t|r}function xt(s,e=0){let t=s[e+1]<<8,r=s[e+2]<<16,i=s[e+3]<<24;return s[e]|t|r|i}function y(s,e,t=0){if(e==1)return bt(s,t);if(e==2)return yt(s,t);if(e==3)return wt(s,t);if(e==4)return xt(s,t);throw new Error(`Size ${e} is not supported for num-byte conversion`)}function $t(s,e,t=0){let r=s.slice(t,t+e);return y(r.toReversed(),e,0)}function kt(s){let e=s&255;return new Uint8Array([e])}function St(s){let e=s>>8&255,t=s&255;return new Uint8Array([t,e])}function Ot(s){let e=s>>16&255,t=s>>8&255,r=s&255;return new Uint8Array([r,t,e])}function G(s,e){if(e==1)return kt(s);if(e==2)return St(s);if(e==3)return Ot(s);throw new Error(`Size ${e} is not supported for byte-num conversion`)}function J(s,{term:e,lowerBound:t,upperBound:r,width:i,be:o=!1,offset:l=0}){let c=o?$t:y,d=c(e,e.length,0),m=t/i,g=r/i;for(;m<=g;){let f=m+g>>1,$=c(s,e.length,f*i+l);if($===d)return{failed:!1,position:f*i,result:s.slice(f*i,f*i+i)};$<d?m=f+1:g=f-1}return{failed:!0}}function pe(s,e){let t=[],r=Math.floor(s.length/3),i=s.length%3;for(let o=0;o<r;o++){let l=o*3,c=y(s,3,l);for(let d=0;d<4;d++){let m=c>>d*6&63;m!==0&&t.push(e[m])}}if(i>0){let o=y(s,i,r*3);for(let l=0;l<i;l++){let c=o>>l*6&63;c!==0&&t.push(e[c])}}return t.join("")}function Et(s){let e=[];for(let t=0;t<s.length;t+=4){let r=s.slice(t,t+4),i=0;r.forEach((l,c)=>i|=l<<6*c);let o=Math.floor((r.length*6+7)/8);e.push(...G(i,o))}return new Uint8Array(e)}function He(s,e){let t=[];for(let r of s){if(!(r in e))return null;t.push(e[r])}return t.length==0?null:Et(new Uint8Array(t))}function Ve(s,e,t,r){let i=t.rowSize,o=J(e,{term:G(s,t.idSize),lowerBound:0,upperBound:e.length,width:i});return o.failed?null:r(o.result,0)}function Ye(s,e,t,r){return r(s,e*t.rowSize)}var zt=(s,e)=>(t,r)=>{let i=r,o=i+s.idSize,l=o+s.nameSize,c=l+s.dateSize,d=t.slice(o,l);return{id:y(t,s.idSize,i),name:pe(d,e),start:y(t,s.dateSize,l),end:y(t,s.dateSize,c)}},Ct=(s,e)=>(t,r)=>{let i=r,o=i+s.idSize,l=o+s.nameSize,c=t.slice(o,l),d=y(t,s.dateSize,l),m=new Date(d*864e5),g=m.toISOString().slice(0,10),f=m.getUTCFullYear();return{id:y(t,s.idSize,i),name:pe(c,e),days:d,date:g,year:f}};function Tt(s,e,t,r,i,o,l=null){let c=t.rowSize,d=[],m=0,g=f=>{let $=f+t.size*4+t.videoSize,C=s.slice(f,f+c);if(l&&!l(C))return;let A=y(s,t.filterSize+t.metaSize,$),E=0;for(let z=0;z<e.routeTable.length;z++)E|=e[e.routeTable[z]].fail(A,C)<<z;if(E===0){m++,d.length<i&&d.push(At(s,f,t));for(let z of e.routeTable)e[z].inc(A,C)}else if((E&E-1)===0){let z=31-Math.clz32(E),n=e.routeTable[z];e[n].inc(A,C)}};if(o)for(let f=r.end-c;f>=r.start;f-=c)g(f);else for(let f=r.start;f<r.end;f+=c)g(f);return{total:m,fights:d,facets:Object.fromEntries(e.routeTable.map(f=>[f,e[f].counts]))}}function At(s,e,t){let r=2*t.size,i=3*t.size,o=y(s,t.size,e),l=y(s,t.size,e+r),c=y(s,t.size,e+i),d=e+i+t.size,m=d+t.videoSize,g=m+t.filterSize,f=g+t.metaSize,$=y(s,t.videoSize,d),C=y(s,t.filterSize,m),A=y(s,t.metaSize,g),E=C>>16&15,z=[];return E>0&&(E&1&&z.push("fight-of-the-night"),E&2&&z.push("performance-of-the-night"),E&4&&z.push("ko-of-the-night"),E&8&&z.push("submission-of-the-night")),{date:o,eventId:y(s,t.size,e+t.size),red:l,blue:c,endingMethod:t.methodMap[C&15],title:C>>4&1,endingRound:C>>5&7,winner:t.outcomesMap[C>>8&3],ending:t.endingMap[C>>10&63],vodId:$<t.videoSequenceBase?$:null,order:A&31,segment:t.segmentMap[A>>5&3],exactVod:A>>7&1,awards:z,vodTime:y(s,t.size,f)}}async function Mt(s,e,t,r){let o=s.map(m=>m.substring(0,3)).map(m=>{let g=He(m,r);return g?g.length==1?new Uint8Array([g[0],0,0]):g.length==2?new Uint8Array([g[0],g[1],0]):g:null}).filter(m=>m!=null),l=t.trigramCount*(3+t.triOffsetSize+t.triPositionSize),d=o.map(m=>J(e,{term:m,lowerBound:0,upperBound:l,width:3+t.triOffsetSize+t.triPositionSize,be:!0})).filter(m=>!m.failed).map(m=>m.result).flatMap(m=>{let g=3+t.triOffsetSize,f=m.slice(3,g),$=m.slice(g,g+t.triPositionSize),C=y(f,t.triOffsetSize),A=y($,t.triPositionSize),E=l+C*t.positionSize,z=[],n=e.slice(E,E+A*t.positionSize);for(let u=0;u<A;u++)z.push(y(n,t.positionSize,u*t.positionSize));return z});return[...new Set(d)]}function Ge(s,e,t){let r=zt(s.fighter,e),i=Ct(s.event,t);return{getFighterById:(o,l)=>Ve(o,l,s.fighter,r),getEventById:(o,l)=>Ve(o,l,s.event,i),getFighterByPosition:(o,l,c)=>Ye(o,l,c,r),getEventByPosition:(o,l,c)=>Ye(o,l,c,i),autoComplete:Mt,getFightsByFilter:Tt}}function me(s){return(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function fe(s,e){return e?s===e?3:s.startsWith(e)?2:s.includes(` ${e}`)?1:s.includes(e)?0:-1:0}var ge={methods:K,endings:K,rounds:ie,segments:K,outcomes:K,awards:K},ve=["titleOnly"];function be(){let s={fighter:null,vs:null,event:null,years:null,sort:"newest",limit:50};for(let e of Object.keys(ge))s[e]=[];for(let e of ve)s[e]=!1;return s}function F(s={}){let e=re(s.event),t=e?null:re(s.fighter),r={fighter:t,vs:t?re(s.vs):null,event:e,years:Bt(s.years),sort:s.sort==="oldest"?"oldest":"newest",limit:re(s.limit)||50};for(let[i,o]of Object.entries(ge))r[i]=Nt(s[i],o);for(let i of ve)r[i]=Lt(s[i]);return r}var ne=s=>N(s,{fighter:null,vs:null,event:null}),ae=(s,e,t=null)=>N(s,{fighter:e,vs:t,event:null}),ye=(s,e)=>N(s,{event:e,fighter:null,vs:null}),N=(s,e)=>F({...s,...e,limit:50}),Je=(s,e=50)=>({...s,limit:s.limit+e}),oe=(s,e)=>s.includes(e)?s.filter(t=>t!==e):[...s,e];function Ke(s){let e=F(s),t=Object.keys(ge).filter(r=>e[r].length).concat(ve.filter(r=>e[r]));return e.years&&t.push("years"),t}function Q(s){let{fighter:e,vs:t,event:r,sort:i}=F(s);return{...be(),fighter:e,vs:t,event:r,sort:i}}function ie(s){return s==null||s===""||!Number.isFinite(+s)?null:Math.trunc(+s)}function K(s){return typeof s=="string"&&s?s:null}function Lt(s){return s===!0||s==="true"||s==="1"||s===1}function re(s){let e=ie(s);return e!=null&&e>0?e:null}function Nt(s,e){return Array.isArray(s)?[...new Set(s.map(e).filter(t=>t!==null))]:[]}function Bt(s){if(!Array.isArray(s))return null;let e=ie(s[0]),t=ie(s[1]);return e==null&&t==null?null:e!=null&&t!=null&&e>t?[t,e]:[e,t]}function Ze(s){let e=n=>Object.fromEntries(Object.entries(n).map(([u,a])=>[a,u])),t=null,r={fights:null,fighters:null,fightersTrigrams:null,events:null,eventsTrigrams:null},i=["v","vs","vs.","ufc","fight","night"],o=["fight-of-the-night","performance-of-the-night","ko-of-the-night","submission-of-the-night"],l=n=>`${s.base.replace(/\/$/,"")}/${n}`,c={},d={},m={draw:0,win:1,loss:2,"no-contest":3},g=(n,u,a)=>{let p=new Uint8Array(a);if(p.fill(1),n.length==0)p.fill(0);else for(let w of n)p[u(w)]=0;return p},f=(n,u)=>({table:n,lookup:u,counts:new Array(n.length).fill(0),fail(a,p){return n[u(a)]},inc(a,p){return this.counts[u(a)]++}}),$,C,A,E,z;return{name:"binary-data",async warm(){await Promise.all([fetch(l("config.json")).then(n=>n.json()).then(n=>t=n),fetch(l("fights.bin")).then(n=>n.arrayBuffer()).then(n=>new Uint8Array(n)).then(n=>r.fights=n),fetch(l("fighters.bin")).then(n=>n.arrayBuffer()).then(n=>new Uint8Array(n)).then(n=>r.fighters=n),fetch(l("fighters_trigrams.bin")).then(n=>n.arrayBuffer()).then(n=>new Uint8Array(n)).then(n=>r.fightersTrigrams=n),fetch(l("events.bin")).then(n=>n.arrayBuffer()).then(n=>new Uint8Array(n)).then(n=>r.events=n),fetch(l("events_trigrams.bin")).then(n=>n.arrayBuffer()).then(n=>new Uint8Array(n)).then(n=>r.eventsTrigrams=n)]),c.methods=t.fight.methodMap,c.endings=t.fight.endingMap,c.segments=t.fight.segmentMap,c.outcomes=t.fight.outcomesMap,c.rounds={0:1,1:2,2:3,3:4,4:5},c.awards=Object.fromEntries(o.map((n,u)=>[u,n])),d.methods=e(t.fight.methodMap),d.endings=e(t.fight.endingMap),d.segments=e(t.fight.segmentMap),d.outcomes=e(t.fight.outcomesMap),d.rounds={1:0,2:1,3:2,4:3,5:4},C=t.event.encodingMap,A=Object.fromEntries(Object.entries(C).map(([n,u])=>[u,n])),E=t.fighter.encodingMap,z=Object.fromEntries(Object.entries(E).map(([n,u])=>[u,n])),$=Ge(t,z,A)},async search(n){n=F(n),performance.mark("query-start");let u=null;return n.event?u=this.searchEvent(n.event,n):n.fighter?n.vs?u=this.searchCompare(n.fighter,n.vs,n):u=this.searchFighter(n.fighter,n):u=this.searchAll(n),u?(u.opponents&&delete u.opponents,u.fights=u.fights.map(a=>{let p=$.getEventById(a.eventId,r.events),w="PRELIM";a.segment=="Main"&&(w="MAIN CARD",a.order==1&&(w="MAIN EVENT"),a.order==2&&(w="CO-MAIN"));let O=a.winner=="red"?a.red:a.winner=="blue"?a.blue:null,v=a.winner=="red"?a.blue:a.winner=="blue"?a.red:null,h=$.getFighterById(a.red,r.fighters),M=$.getFighterById(a.blue,r.fighters),b={id:`f:${p.id}:${a.order}`,event:p,order:a.order,segment:a.segment,position:w,titleBout:a.title==1,method:a.endingMethod,finish:!a.endingMethod.startsWith("Decision"),endingRound:a.endingRound,ending:a.ending,fighters:[{id:h.id,name:h.name,outcome:a.winner=="red"?"win":a.winner=="blue"?"loss":a.winner,corner:"red"},{id:M.id,name:M.name,outcome:a.winner=="blue"?"win":a.winner=="red"?"loss":a.winner,corner:"blue"}],outcome:a.winner,winnerId:O,loserId:v,vod:a.vodId?{replayId:a.vodId,exact:a.exactVod==1,url:`https://www.ufcfightpass.com/video/${a.vodId}?t=${a.vodTime}`}:null,title:`${h.name} vs ${M.name}`,awards:a.awards};return a.side&&(b.side=a.side),a.shared?b.shared=a.shared:a.shared=!1,b}),performance.mark("query-stop"),{...u,ms:performance.measure("query","query-start","query-stop").duration}):null},executeMarshalledQuery(n,u,a,p={}){let w={routeTable:["methods","title","rounds","outcomes","endings","segments","awards"],methods:f(g(n.methods,h=>d.methods[h],Object.keys(d.methods).length),h=>h&15),title:{table:[n.titleOnly&1],counts:new Array(2).fill(0),lookup:h=>h>>4&1,fail(h,M){return this.table[0]^this.lookup(h)&this.table[0]},inc(h,M){this.counts[this.lookup(h)]++}},rounds:f(g(n.rounds,h=>d.rounds[h],5),h=>(h>>5&7)-1),outcomes:f(g(n.outcomes,h=>d.outcomes[h],Object.keys(d.outcomes).length),h=>h>>8&3),endings:f(g(n.endings,h=>d.endings[h],Object.keys(d.endings).length),h=>h>>10&63),segments:f(g(n.segments,h=>d.segments[h],Object.keys(d.segments).length),h=>h>>29&3),awards:{wanted:n.awards.reduce((h,M)=>h|1<<o.indexOf(M),0),counts:new Array(o.length).fill(0),lookup:h=>h>>16&15,fail(h){return this.wanted===0||this.lookup(h)&this.wanted?0:1},inc(h){let M=this.lookup(h);for(let b=0;b<this.counts.length;b++)M&1<<b&&this.counts[b]++}},...p},O=$.getFightsByFilter(r.fights,w,t.fight,u,n.limit??10,n.sort=="newest",a??null),v={};for(let h in O.facets)h=="title"?v.titleOnly={label:"Title Bout",count:O.facets.title[1]}:v[h]={label:h,values:O.facets[h].map((M,b)=>({value:c[h]?.[b]??b,label:c[h]?.[b]??b,count:M}))};return O.facets=v,{query:n,...O}},searchEvent(n,u){let a=this.getEvent(n);if(!a)return null;let p=this.executeMarshalledQuery(u,{start:a.start,end:a.end},w=>y(w,t.fight.size,t.fight.size)==a.event.id);return p.facets.outcomes.values=p.facets.outcomes.values.filter(w=>w.value!=="red"&&w.value!=="blue"),{context:{event:a.event},...p}},searchFighter(n,u){let a=this.getFighter(n);if(!a)return null;let p=new Set,w=b=>{let P=y(b,t.fight.size,t.fight.size*2),T=y(b,t.fight.size,t.fight.size*3),B=P==n||T==n;return B&&P==n&&p.add(T),B&&T==n&&p.add(P),B},O={start:a.start,end:a.end},v=g(u.outcomes,b=>m[b],4),h={table:v,lookup:b=>b>>8&3,counts:new Array(4).fill(0),fail(b,P){let T=this.lookup(b);if(T==0||T==3)return v[T];let B=y(P,t.fight.size,2*t.fight.size)==a.fighter.id;return T==1&&B||T==2&&!B?v[1]:v[2]},inc(b,P){let T=this.lookup(b);if(T==0)return this.counts[0]++;if(T==3)return this.counts[3]++;let B=y(P,t.fight.size,2*t.fight.size)==a.fighter.id;return T==1&&B?this.counts[1]++:T==2&&!B?this.counts[1]++:this.counts[2]++}},M=this.executeMarshalledQuery(u,O,w,{outcomes:h});return M.facets.outcomes.values.forEach(b=>{b.value=="red"&&(b.value="win",b.label="win"),b.value=="blue"&&(b.value="loss",b.label="loss")}),{context:{fighter:a.fighter},opponents:p,...M}},searchCompare(n,u,a){let p=this.searchFighter(n,a),w=this.searchFighter(u,a),O=new Set;p.opponents.forEach(x=>{w.opponents.has(x)&&O.add(x)});let v={fighter:p.context.fighter,opponent:w.context.fighter,shared:[...O].map(x=>$.getFighterById(x,r.fighters))},h=p.total+w.total,M=(x,R)=>{let _=x.date-R.date;return _==0?x.order-R.order:_},b=(x,R)=>{let _=R.date-x.date;return _==0?R.order-x.order:_},P=a.sort=="newest"?b:M,T=[...p.fights.map(x=>({...x,side:"a"})),...w.fights.map(x=>({...x,side:"b"}))].sort((x,R)=>P(x,R)).map(x=>({...x,shared:O.has(x.red)||O.has(x.blue)})),B={};for(let x in p.facets){if(x=="titleOnly"){B.titleOnly={label:p.facets.titleOnly.label,count:p.facets.titleOnly.count+w.facets.titleOnly.count};continue}let R=p.facets[x].values,_=w.facets[x].values;B[x]={...p.facets[x],values:R.map((We,vt)=>({...We,count:We.count+_[vt].count}))}}return{query:a,context:v,total:h,fights:T,facets:B}},searchAll(n){let u={start:0,end:r.fights.length};n.years&&(n.years.length>0&&n.years[0]!=null&&(u.start=t.fight.yearIndex[n.years[0]]),n.years.length>1&&n.years[1]!=null&&(u.end=t.fight.yearIndex[n.years[1]+1]??r.fights.length));let a=this.executeMarshalledQuery(n,u,null);return a.facets.outcomes.values=a.facets.outcomes.values.filter(p=>p.value!=="red"&&p.value!=="blue"),{context:{},...a}},async suggestFighters(n,u=10){let a=me(n),p=a.split(" "),O=(await $.autoComplete(p,r.fightersTrigrams,t.fighter,E,z)).map(v=>$.getFighterByPosition(r.fighters,v,t.fighter));return Xe(O,v=>fe(v.name,a),(v,h)=>v.name>=h.name?1:-1,u)},async suggestEvents(n,u=10){let a=me(n),p=a.split(" ").filter(v=>!i.includes(v)),O=(await $.autoComplete(p,r.eventsTrigrams,t.event,C,A)).map(v=>$.getEventByPosition(r.events,v,t.event));return Xe(O,v=>fe(v.name,a),(v,h)=>v.name>=h.name?1:-1,u)},getFighter(n){let a=(v=>$.getFighterById(v,r.fighters))(n);if(!a)return null;let p=t.fight.index,w=-1,O=-1;for(let v in p)v<=a.start&&(w=p[v]*t.fight.rowSize),O<0&&v>a.end&&(O=p[v]*t.fight.rowSize);return{fighter:a,start:w,end:O<0?r.fights.length:O}},getEvent(n){let u=$.getEventById(n,r.events);if(!u)return null;let a=t.fight.rowSize,p=J(r.fights,{term:G(u.days,t.event.dateSize),lowerBound:0,upperBound:r.fights.length,width:a});return{event:u,start:Math.max(p.position-a*32,0),end:p.position+a*32}}}}function Xe(s,e,t,r){let i=[];for(let o of s){let l=e(o);l>=0&&i.push({candidate:o,value:l})}return i.sort((o,l)=>l.value-o.value||t(o.candidate,l.candidate)),i.slice(0,r||50).map(o=>o.candidate)}var Ft=new URL("../bin-data/",import.meta.url).href,It=Ze({base:Ft}),X=()=>It;var Ut=["fighter","event","all"],Dt={attribute:"all"},et={methods:String,endings:String,rounds:Number,segments:String,outcomes:String,awards:String};function we(s){let e=String(s||"").replace(/^#\/?/,""),[t,r=""]=e.split("?"),[i,o]=t.split("/"),l=Dt[i]||i,c=Ut.includes(l)?l:"all",d=new URLSearchParams(r),m=be(),g=Number(o);c==="fighter"&&g>0?(m.fighter=g,m.vs=Number(d.get("vs"))||null):c==="event"&&g>0&&(m.event=g);for(let[C,A]of Object.entries(et)){let E=d.get(C);E&&(m[C]=E.split("|").map(A))}let f=d.get("years");f&&(m.years=f.split(":").map(Pt)),m.titleOnly=d.get("title")==="1",m.sort=d.get("sort")==="oldest"?"oldest":"newest";let $=Number(d.get("limit"));return $>0&&(m.limit=$),{mode:c,query:F(m)}}function xe(s,e,t={}){let r=F(e),i=s==="fighter"?r.fighter:s==="event"?r.event:null,o=new URLSearchParams;s==="fighter"&&r.vs&&o.set("vs",String(r.vs));for(let c of Object.keys(et))r[c].length&&o.set(c,r[c].join("|"));r.years&&o.set("years",`${r.years[0]??""}:${r.years[1]??""}`),r.titleOnly&&o.set("title","1"),r.sort!=="newest"&&o.set("sort",r.sort),t.limit!=null&&r.limit!==t.limit&&o.set("limit",String(r.limit));let l=o.toString().replace(/%7C/g,"|").replace(/%3A/g,":");return`#/${s}${i?`/${i}`:""}${l?`?${l}`:""}`}var Pt=s=>s===""?null:Number(s);var Rt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Z(s){if(!s)return"";let e=new Date(s);return Number.isNaN(e.getTime())?String(s).slice(0,10):`${e.getUTCDate()} ${Rt[e.getUTCMonth()]} ${e.getUTCFullYear()}`}var tt=s=>s?String(s).slice(0,4):"",$e=s=>s?String(s).slice(0,7):"",ke=s=>s==null?"":Z(new Date(s*864e5).toISOString()),Se=s=>s==null?"":String(new Date(s*864e5).getUTCFullYear());function S(s){return String(s||"").split(/(\s+|-)/).map(e=>/^\s+$|^-$/.test(e)?e:["ufc","tuf","tv"].includes(e)?e.toUpperCase():e==="vs"||e==="vs."?"vs.":/^mc[a-z]/.test(e)?`Mc${e[2].toUpperCase()}${e.slice(3)}`:e.replace(/(^|['.])([a-z])/g,(t,r,i)=>`${r}${i.toUpperCase()}`)).join("")}var U=s=>s==null?"":s.toLocaleString("en-US"),I=(s,e,t=`${e}s`)=>`${U(s)} ${s===1?e:t}`;function st(s){let e=String(s||"").trim().split(/\s+/).filter(Boolean);if(!e.length)return"?";let t=e[0][0],r=e.length>1?e[e.length-1][0]:"";return(t+r).toUpperCase()}var rt=(s,e)=>s?.fighters?.find(t=>e.includes(t.id))||null,le=(s,e)=>s?.fighters?.find(t=>!e.includes(t.id))||null;function it(s){if(!s?.method)return s?.status==="Cancelled"?"Cancelled":"No result";let[e,t]=s.method.split(" - ");return t?`${e} (${t.toLowerCase()})`:e}var nt=s=>s?.ending&&s.ending!=="NONE"?S(s.ending):"",at=s=>nt(s)||it(s),ot=s=>Wt([it(s),nt(s)]),lt=s=>s?.weightClass?.abbr||jt;var jt="\u2014";function ct(s){return s?.endingRound?`R${s.endingRound}`:""}function ht(s){if(!s)return[];let e=[];s.titleBout&&e.push({award:"title",label:"Title fight",short:"TITLE"});for(let[t,r,i,o]of Oe)s.awards?.includes(t)&&e.push({award:r,label:i,short:o});return e}var Oe=[["fight-of-the-night","night","Fight of the night","FOTN"],["performance-of-the-night","performance","Performance of the night","POTN"],["ko-of-the-night","performance","KO of the night","KOTN"],["submission-of-the-night","performance","Submission of the night","SOTN"]],ce=Object.fromEntries(Oe.map(([s,,e])=>[s,e])),Us=Object.fromEntries(Oe.map(([s,,,e])=>[s,e])),ut={win:"Win",loss:"Loss",draw:"Draw","no-contest":"NC",unknown:"\u2014"},Ee=s=>s==="no-contest"?"nc":s==="unknown"?"":s||"";var _t={Main:"Main card",Prelims1:"Prelims",Prelims2:"Early prelims"},H=s=>_t[s]||s||"";var Wt=(s,e=" \xB7 ")=>s.filter(Boolean).join(e);import{LitElement as Kt,css as Xt,html as Ae,nothing as Zt}from"lit";import{LitElement as Qt,css as Ht,html as he,nothing as dt}from"lit";var Vt=120,ze=class extends Qt{static properties={kind:{type:String},placeholder:{type:String},selected:{type:String},text:{state:!0},options:{state:!0},open:{state:!0},active:{state:!0}};static styles=[k,Ht`
      :host {
        position: relative;
        flex: 1;
        min-inline-size: 8rem;
      }

      .wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

      .field {
        padding-inline-end: 2rem;
      }

      .clear {
        position: absolute;
        inset-inline-end: 2px;
      }

      .list {
        position: absolute;
        z-index: 20;
        inset-inline: 0;
        inset-block-start: calc(100% + var(--space-1));
        max-block-size: 22rem;
        margin: 0;
        padding: var(--space-1);
        overflow-y: auto;
        list-style: none;
        border: 1px solid var(--line-strong);
        border-radius: var(--radius-md);
        background: var(--bg-surface);
        box-shadow: var(--shadow-elevated);
      }

      /* Name over its dates, not beside them. Side by side, the two shared one
         line and the name lost the argument — in the narrow "Compare with…"
         field you could not read far enough to tell two fighters apart. */
      .option {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-sm);
        cursor: pointer;
      }

      .option[aria-selected='true'],
      .option:hover {
        background: var(--bg-raised);
      }

      .option > .title {
        --title-size: var(--text-sm);
      }

      .option > .hint {
        font-size: var(--text-xs);
        color: var(--text-faint);
      }
    `];#e=0;#t=0;constructor(){super(),this.kind="fighter",this.placeholder="Search\u2026",this.selected="",this.text="",this.options=[],this.open=!1,this.active=-1}updated(e){e.has("selected")&&this.text!==this.selected&&(this.text=this.selected)}render(){return he`
      <div class="wrap">
        <input
          class="field"
          type="text"
          role="combobox"
          aria-expanded=${this.open}
          aria-autocomplete="list"
          aria-label=${this.kind==="event"?"Search events":"Search fighters"}
          .value=${this.text}
          placeholder=${this.placeholder}
          @input=${this.#n}
          @keydown=${this.#o}
          @focus=${this.#n}
          @blur=${()=>setTimeout(()=>this.open=!1,100)}
        />
        ${this.text?he`<button class="icon-btn clear" title="Clear" aria-label="Clear" @click=${this.#i}>✕</button>`:dt}
      </div>
      ${this.open&&this.options.length?this.#r():dt}
    `}#r(){return he`
      <ul class="list" role="listbox">
        ${this.options.map((e,t)=>he`
            <li
              class="option"
              role="option"
              aria-selected=${t===this.active}
              @pointerdown=${r=>r.preventDefault()}
              @click=${()=>this.#l(e)}
            >
              <span class="title truncate">${S(e.name)}</span>
              <span class="num hint truncate">${this.#s(e)}</span>
            </li>
          `)}
      </ul>
    `}#s(e){return this.kind==="event"?Z(e.date):`${ke(e.start)}\u2013${ke(e.end)}`}#n(e){this.text=e.target.value;let t=this.text.trim();if(clearTimeout(this.#e),t.length<2){this.options=[],this.open=!1;return}this.#e=setTimeout(()=>this.#a(t),Vt)}async#a(e){let t=++this.#t,r=X(),i=this.kind==="event"?await r.suggestEvents(e,8):await r.suggestFighters(e,8);t===this.#t&&(this.options=i,this.active=i.length?0:-1,this.open=i.length>0)}#o(e){if(e.key==="Escape"){this.open=!1;return}if(!(!this.open||!this.options.length))if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();let t=e.key==="ArrowDown"?1:-1;this.active=(this.active+t+this.options.length)%this.options.length}else e.key==="Enter"&&(e.preventDefault(),this.#l(this.options[this.active]||this.options[0]))}#l(e){this.open=!1,this.options=[],this.text=S(e.name),this.dispatchEvent(new CustomEvent("select",{detail:e,bubbles:!0,composed:!0}))}#i(){this.selected="",this.text="",this.options=[],this.open=!1,this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0}))}};customElements.define("fp-search-field",ze);import{LitElement as Yt,css as Gt,html as Ce}from"lit";var Jt=[{q:"What is this?",a:[`A search interface for UFC Fight Pass. You can search fighter careers and events, or
       filter all fights in various ways. Fight details are hidden to avoid spoilers, but you
       can click the 'Reveal results' toggle to see them. Fighter careers can be compared,
       highlighting common opponents.`,`You need a subscription to Fight Pass to see the videos; this just links to them in a
       new tab. This tool has no ads, trackers, or any monetisation.`]},{q:"What does it cover?",a:[`So far just numbered UFC events, fight nights and TUF finales. More will be added in
       the future with Contender Series events next on the list.`]},{q:"Why are some of the link times wrong?",a:[`Some fights link to a single fight VOD, while others to event VODs. For events, the VOD
       times are best guesses based on incomplete and inaccurate information, so they can't
       always be right. The goal is to eventually have single-fight VOD links for all fights.`]},{q:"Can you fix 'x' or add 'y'?",a:[`The answer is probably yes and also no. The Fight Pass data contains quite a few issues;
       they are all fixable, but fixing them would require a huge amount of data processing. If
       the UFC feel like hiring me so I have access to their data lakes, then it's possible.
       Otherwise I would probably crash their servers.`]},{q:"How was this done?",a:[`A tiny language model based loosely on the DeepSeek v3 paper was created and trained to
       match disparate UFC-related data. The unified data was then compressed into binaries. A
       tiny JS database engine was written to use those binaries so no server is needed.`]},{q:"Was AI used?",sub:!0,a:["For the presentation layer. Everything else - the model, compression, the database - is human."]}],Te=class extends Yt{static styles=[k,Gt`
      .trigger {
        font-family: var(--font-display);
        font-size: var(--text-md);
        font-weight: 700;
      }

      dialog {
        inline-size: min(44rem, 100% - var(--space-6));
        max-block-size: min(44rem, 100dvb - var(--space-12));
        padding: 0;
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: var(--bg-surface);
        color: var(--text);
        box-shadow: var(--shadow-elevated);
      }

      dialog[open] {
        display: flex;
        flex-direction: column;
      }

      dialog::backdrop { background: rgb(0 0 0 / 0.55); }

      .bar { flex: none; }

      .body {
        --stack-gap: var(--space-6);
        flex: 1 1 auto;
        padding: var(--space-5) var(--page-pad) var(--space-8);
        color: var(--text-dim);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
      }

      h3 {
        --title-size: var(--text-md);
        margin-block-end: var(--space-2);
        color: var(--text);
      }

      p + p { margin-block-start: var(--space-3); }

      /* A question that hangs off the one above it rather than standing beside
         the others — indented, and quieter by a step. */
      section[data-sub] {
        margin-block-start: calc(var(--space-6) * -1 + var(--space-4));
        padding-inline-start: var(--space-4);
        border-inline-start: 1px solid var(--line);
      }

      section[data-sub] h3 { --title-size: var(--text-sm); }
    `];render(){return Ce`
      <button class="icon-btn trigger" title="FAQs" aria-label="Open the FAQs" @click=${this.#t}>?</button>

      <dialog aria-labelledby="faq-title" @click=${this.#s}>
        <div class="bar">
          <h2 class="title" id="faq-title">FAQs</h2>
          <button class="icon-btn end" title="Close" aria-label="Close" @click=${this.#r}>✕</button>
        </div>

        <div class="body stack scroll">
          ${Jt.map(({q:e,a:t,sub:r})=>Ce`
              <section ?data-sub=${r}>
                <h3 class="title">${e}</h3>
                ${t.map(i=>Ce`<p>${i}</p>`)}
              </section>
            `)}
        </div>
      </dialog>
    `}#e(){return this.renderRoot.querySelector("dialog")}#t=()=>this.#e().showModal();#r=()=>this.#e().close();#s=e=>{e.target===this.#e()&&this.#r()}};customElements.define("fp-faq",Te);var es=[["fighter","Fighter"],["event","Event"],["all","All fights"]],Me=class extends Kt{static properties={mode:{type:String},fighter:{attribute:!1},event:{attribute:!1}};static styles=[k,Xt`
      .bar { gap: var(--space-5); }
      .search { flex: 1; max-inline-size: 32rem; }

      @media (width < 40rem) {
        .bar { gap: var(--space-3); }
        .tab { padding-inline: var(--space-2); font-size: var(--text-xs); }
      }
    `];constructor(){super(),this.mode="all"}render(){return Ae`
      <header>
        <div class="bar">
          <a class="wordmark" href="#/all" title="FP+ — start over">FP+</a>
          ${this.#e()}
          <fp-faq class="end"></fp-faq>
        </div>
        <div class="tabs" role="tablist" aria-label="Search mode">
          ${es.map(([e,t])=>Ae`
              <button
                class="tab"
                role="tab"
                aria-selected=${this.mode===e}
                @click=${()=>this.dispatchEvent(new CustomEvent("mode-change",{detail:e}))}
              >
                ${t}
              </button>
            `)}
        </div>
      </header>
    `}#e(){if(this.mode==="all")return Zt;let e=this.mode==="event";return Ae`
      <div class="search">
        <fp-search-field
          kind=${e?"event":"fighter"}
          placeholder=${e?"Search events\u2026":"Search fighters\u2026"}
          .selected=${S(e?this.event?.name:this.fighter?.name)}
          @select=${t=>this.#t(t.detail)}
          @clear=${()=>this.#t(null)}
        ></fp-search-field>
      </div>
    `}#t(e){this.dispatchEvent(new CustomEvent("pick",{detail:{role:this.mode,option:e}}))}};customElements.define("fp-top-bar",Me);import{LitElement as ts,html as ss}from"lit";var Le=class extends ts{static styles=[k];render(){return ss`<footer class="footer"><span>Not affiliated with the UFC</span></footer>`}};customElements.define("fp-footer",Le);import{LitElement as rs,css as is,html as W,nothing as ee}from"lit";var Ne={methods:"Method",endings:"Ending",rounds:"Round",segments:"Card",outcomes:"Outcome",awards:"Accolade",years:"Year",titleOnly:"Title fights"},Be=class extends rs{static properties={label:{type:String},query:{attribute:!1},revealed:{type:Boolean},chips:{type:Boolean},filters:{type:Number},sortable:{type:Boolean},sharedOnly:{type:Boolean},showSharedOnly:{type:Boolean}};static styles=[k,is`
      .strip { gap: var(--space-2); }
      .label { color: var(--text-dim); font-size: var(--text-xs); }
      .controls { --cluster-gap: var(--space-2); margin-inline-start: auto; }

      .clear {
        border: 0;
        background: none;
        padding: 0 var(--space-1);
        color: var(--accent-hover);
        font-size: var(--text-xs);
        cursor: pointer;
      }

      .clear:hover { text-decoration: underline; }
      .remove { color: var(--text-faint); }

      /* The rail is always on screen when there is room for it, so the button
         that opens it as a sheet exists only when there is not. */
      .sheet-toggle { display: none; }

      @media (width < 60rem) {
        .sheet-toggle { display: inline-flex; }
      }
    `];constructor(){super(),this.label="",this.revealed=!1,this.chips=!1,this.filters=null,this.sortable=!1,this.sharedOnly=!1,this.showSharedOnly=!1}render(){let e=this.chips?this.#t():[];return W`
      <div class="strip">
        ${this.filters==null?ee:W`
              <button class="chip sheet-toggle" aria-pressed=${this.filters>0} @click=${this.#a}>
                Filters${this.filters?` \xB7 ${this.filters} active`:""}
              </button>
            `}
        ${this.label?W`<span class="eyebrow label">${this.label}</span>`:ee}
        ${e}
        ${e.length?W`<button class="clear" @click=${this.#n}>clear</button>`:ee}

        <span class="cluster controls">
          ${this.showSharedOnly?W`
                <button class="chip" aria-pressed=${this.sharedOnly} @click=${this.#o}>Shared only</button>
              `:ee}
          <label class="switch">
            <input type="checkbox" .checked=${this.revealed} @change=${this.#l} />
            Reveal results
          </label>
          ${this.sortable?this.#e():ee}
        </span>
      </div>
    `}#e(){let e=this.query?.sort==="oldest";return W`
      <button
        class="chip"
        aria-pressed="true"
        title="Switch to ${e?"newest":"oldest"} first"
        @click=${()=>this.#i(N(this.query,{sort:e?"newest":"oldest"}))}
      >
        ${e?"Oldest first":"Newest first"} <span aria-hidden="true">↑↓</span>
      </button>
    `}#t(){let e=this.query;if(!e)return[];let t=[];for(let r of["methods","endings","rounds","segments","outcomes","awards"])for(let i of e[r])t.push(this.#s(this.#r(r,i),()=>N(e,{[r]:e[r].filter(o=>o!==i)})));if(e.years){let[r,i]=e.years,o=r!=null&&i!=null?`${r}\u2013${i}`:r!=null?`${r}+`:`up to ${i}`;t.push(this.#s(`${Ne.years} ${o}`,()=>N(e,{years:null})))}return e.titleOnly&&t.push(this.#s(Ne.titleOnly,()=>N(e,{titleOnly:!1}))),t}#r(e,t){return e==="awards"?ce[t]||t:e==="rounds"?`Round ${t}`:e==="segments"?H(t):e==="outcomes"?`${Ne.outcomes}: ${t}`:S(String(t))}#s(e,t){return W`
      <button class="chip" aria-pressed="true" @click=${()=>this.#i(t())}>
        ${e} <span class="remove" aria-hidden="true">✕</span>
        <span class="sr-only">— remove this filter</span>
      </button>
    `}#n=()=>this.#i(Q(this.query));#a=()=>{this.dispatchEvent(new CustomEvent("toggle-rail",{bubbles:!0,composed:!0}))};#o=()=>{this.dispatchEvent(new CustomEvent("toggle-shared-only",{bubbles:!0,composed:!0}))};#l=e=>{this.dispatchEvent(new CustomEvent("toggle-reveal",{detail:e.target.checked,bubbles:!0,composed:!0}))};#i(e){this.dispatchEvent(new CustomEvent("query-change",{detail:e,bubbles:!0,composed:!0}))}},pt=s=>Ke(s).length;customElements.define("fp-list-controls",Be);import{LitElement as ns,css as as,html as j,nothing as mt}from"lit";var qe=1993,Fe=class extends ns{static properties={query:{attribute:!1},facets:{attribute:!1},lookup:{state:!0}};static styles=[k,as`
      :host { display: block; }

      .rail { --stack-gap: var(--space-5); }

      .head {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
      }

      .group { --stack-gap: var(--space-2); }
      .group > h3 { color: var(--text-faint); }

      .range { --cluster-gap: var(--space-2); }
      .range .field { inline-size: 0; flex: 1; padding: var(--space-1) var(--space-2); }

      .options {
        --stack-gap: var(--space-1);
        max-block-size: 12rem;
        padding: var(--space-2);
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--bg-app);
      }

      .chips { --cluster-gap: var(--space-1); }
      .chips[data-wrap='column'] { flex-direction: column; align-items: flex-start; }
      .chip[data-empty] { color: var(--text-off); border-color: var(--line); }

      .note {
        color: var(--text-off);
        font-size: var(--text-2xs);
        line-height: 1.4;
      }

      .link {
        border: 0;
        background: none;
        padding: 0;
        color: var(--accent-hover);
        font-size: var(--text-xs);
        cursor: pointer;
      }

      .link:hover { text-decoration: underline; }
      .link:disabled { color: var(--text-off); cursor: default; text-decoration: none; }
      .clear-all { justify-content: center; }
    `];constructor(){super(),this.lookup=""}render(){if(!this.query||!this.facets)return mt;let e=!this.#o();return j`
      <div class="stack rail">
        <div class="head">
          <h2 class="eyebrow">Filters</h2>
          <button class="link end" ?disabled=${e} @click=${this.#l}>clear all</button>
        </div>

        ${this.#e()} ${this.#r()} ${this.#s()} ${this.#n()}

        <button class="btn clear-all" data-intent="quiet" ?disabled=${e} @click=${this.#l}>
          Clear all filters
        </button>
      </div>
    `}#e(){let[e,t]=this.query.years||[null,null],r=new Date().getUTCFullYear(),i=o=>l=>{let c=l.target.value===""?null:Number(l.target.value);this.#i(N(this.query,{years:o==="from"?[c,t]:[e,c]}))};return j`
      <section class="stack group">
        <h3 class="eyebrow">Date range</h3>
        <div class="cluster range">
          <input
            class="field num"
            type="number"
            aria-label="From year"
            min=${qe}
            max=${r}
            placeholder=${qe}
            .value=${e??""}
            @change=${i("from")}
          />
          <input
            class="field num"
            type="number"
            aria-label="To year"
            min=${qe}
            max=${r}
            placeholder=${r}
            .value=${t??""}
            @change=${i("to")}
          />
        </div>
      </section>
    `}#t(){let e=[];for(let t of["methods","endings"])for(let r of this.facets[t]?.values||[])r.value!=="NONE"&&e.push({key:t,value:r.value,label:S(String(r.label)),count:r.count});return e}#r(){let e=this.lookup.trim().toLowerCase(),t=new Set([...this.query.methods,...this.query.endings]),r=this.#t().filter(i=>(i.count>0||t.has(i.value))&&i.label.toLowerCase().includes(e));return j`
      <section class="stack group">
        <h3 class="eyebrow">Method</h3>
        <input
          class="field"
          type="search"
          aria-label="Filter methods"
          placeholder="filter methods…"
          .value=${this.lookup}
          @input=${i=>this.lookup=i.target.value}
        />
        <div class="stack options scroll">
          ${r.length?r.map(i=>j`
                  <label class="facet">
                    <input
                      type="checkbox"
                      .checked=${this.query[i.key].includes(i.value)}
                      @change=${()=>this.#i(N(this.query,{[i.key]:oe(this.query[i.key],i.value)}))}
                    />
                    <span class="truncate" title=${i.label}>${i.label}</span>
                    <span class="num">${U(i.count)}</span>
                  </label>
                `):j`<span class="num dim">no method matches that</span>`}
        </div>
      </section>
    `}#s(){let e=this.facets.rounds?.values||[];return j`
      <section class="stack group">
        <h3 class="eyebrow">Rounds</h3>
        <div class="cluster chips">
          ${e.map(t=>{let r=this.query.rounds.includes(Number(t.value));return j`
              <button
                class="chip"
                aria-pressed=${r}
                ?data-empty=${!r&&!t.count}
                title="${U(t.count)} fights ended in round ${t.value}"
                @click=${()=>this.#i(N(this.query,{rounds:oe(this.query.rounds,Number(t.value))}))}
              >
                ${t.value}
              </button>
            `})}
        </div>
      </section>
    `}#n(){let e=this.facets.titleOnly,t=this.facets.awards?.values||[];return j`
      <section class="stack group">
        <h3 class="eyebrow">Accolades</h3>
        <div class="cluster chips" data-wrap="column">
          ${e?this.#a("Title fight",this.query.titleOnly,e.count,()=>this.#i(N(this.query,{titleOnly:!this.query.titleOnly}))):mt}
          ${t.map(r=>this.#a(ce[r.value]||String(r.label),this.query.awards.includes(r.value),r.count,()=>this.#i(N(this.query,{awards:oe(this.query.awards,r.value)}))))}
        </div>
        <p class="note">A fight can hold more than one, so these counts add up to more than the total.</p>
      </section>
    `}#a(e,t,r,i){return j`
      <button class="chip" aria-pressed=${t} ?data-empty=${!t&&!r} title="${U(r)} fights" @click=${i}>
        ${e}
      </button>
    `}#o(){let e=this.query;return e.methods.length+e.endings.length+e.rounds.length+e.awards.length+(e.years?1:0)+(e.titleOnly?1:0)}#l=()=>this.#i(Q(this.query));#i(e){this.dispatchEvent(new CustomEvent("query-change",{detail:e,bubbles:!0,composed:!0}))}};customElements.define("fp-filter-rail",Fe);import{LitElement as hs,css as us,html as V,nothing as Ue}from"lit";import{LitElement as os,css as ls,html as L,nothing as ue}from"lit";var Ie=class extends os{static properties={fight:{attribute:!1},layout:{type:String},focus:{attribute:!1},revealed:{type:Boolean},mark:{type:Number},mirror:{type:Boolean}};static styles=[k,ls`
      :host { display: contents; }

      /* The name's colour sits on the *container*, so .who inherits it and
         carries no colour rule of its own. [data-outcome] is one attribute, and a
         rule of equal specificity in this sheet would beat it on order — but an
         inherited value loses to any direct rule, so the state still lands. */
      .name {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        min-inline-size: 0;
        color: var(--text);
      }

      .fr[data-inert] .name { color: var(--text-dim); }
      .who { font-weight: 500; }

      .line {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        min-inline-size: 0;
      }

      .badges {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-1);
      }

      /* The right-hand column of a comparison, and the red corner of an event
         card, read inwards towards the middle of the row. */
      .name[data-align='end'] { align-items: flex-end; text-align: end; }
      .name[data-align='end'] .line { flex-direction: row-reverse; }
      .name[data-align='end'] .badges { justify-content: flex-end; }

      /* A value that replaces a spoiler keeps its column, so revealing a list
         never reflows it. */
      .value {
        min-inline-size: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .outcome { font-weight: 600; }
      .order { color: var(--text-off); }
    `];constructor(){super(),this.layout="all",this.focus=[],this.revealed=!1,this.mark=0,this.mirror=!1}render(){let e=this.fight;if(!e)return ue;let t=this.#e(e);return L`
      <div class="fr" ?data-inert=${!e.vod} ?data-marked=${!!this.mark} id=${e.id}>
        ${this.mirror?[...t].reverse():t}
      </div>
    `}#e(e){switch(this.layout){case"career":return[this.#t($e(e.event.date)),this.#r(e),this.#o(e,["outcome","finish","round"]),this.#i(e),this.#h(e),this.#c(e)];case"event":return[L`<span class="num order c-drop">${e.order}</span>`,this.#s(e,0),this.#o(e,["outcome"]),this.#s(e,1),this.#o(e,["finish"]),this.#i(e),this.#c(e)];case"compare":return[this.#t(tt(e.event.date)),this.#r(e),this.#o(e,["outcome","finish"]),this.#c(e)];default:return[this.#t($e(e.event.date)),this.#n(S(e.title),e,"start"),this.#o(e,["outcome","finish","round"]),this.#h(e),this.#c(e)]}}#t(e){return L`<span class="num c-date">${e}</span>`}#r(e){let t=le(e,this.focus),r=S(t?.name)||S(e.title);return this.#n(r,e,this.mirror?"end":"start")}#s(e,t){let r=e.fighters?.[t];return this.#n(S(r?.name),e,t===0?"end":"start",t===0,r)}#n(e,t,r,i=!0,o=null){let l=i?ht(t):[],c=this.revealed&&o&&Ee(o.outcome)||ue;return L`
      <span class="name c-name" data-align=${r}>
        <span class="line">
          ${this.#a()}
          <span class="who truncate" data-outcome=${c} title=${e}>${e}</span>
        </span>
        ${l.length?L`
              <span class="badges">
                ${l.map(d=>L`<span class="badge" data-award=${d.award} data-short=${d.short}>${d.label}</span>`)}
              </span>
            `:ue}
      </span>
    `}#a(){return this.mark?L`
      <button class="mark" title="Shared opponent — go to the matching fight" @click=${this.#u}>
        ◆${this.mark}<span class="sr-only">Shared opponent ${this.mark}</span>
      </button>
    `:ue}#o(e,t){let r=this.mirror?[...t].reverse():t;return L`<span class="c-meta">${r.map(i=>this.#l(e,i))}</span>`}#l(e,t){if(!this.revealed)return L`<span class=${t==="round"?"c-drop":""}
        ><span class="spoiler" style=${cs[t]}></span><span class="sr-only">Result hidden</span></span
      >`;if(t==="outcome"){let i=((this.focus.length?rt(e,this.focus):null)||e.fighters?.[0])?.outcome||"unknown";return L`<span class="num value outcome" data-outcome=${Ee(i)}>${ut[i]||""}</span>`}return t==="round"?L`<span class="num value c-drop">${ct(e)}</span>`:L`<span class="num value" title=${ot(e)}>${at(e)}</span>`}#i(e){return L`<span class="num c-drop" title="Weight class">${lt(e)}</span>`}#h(e){let t=S(e.event.name);return L`<span class="num truncate c-drop" title=${t}>${t}</span>`}#c(e){let t=e.vod;if(!t)return L`<span class="cue c-cue" title="Not on Fight Pass">–<span class="sr-only">Not on Fight Pass</span></span>`;let r=t.exact?"Watch this fight on Fight Pass":"Watch the card cut this fight sits in";return L`
      <a
        class="cue c-cue"
        data-vod=${t.exact?"fight":"segment"}
        href=${t.url}
        target="_blank"
        rel="noopener"
        title=${r}
        >▷<span class="sr-only">${r} — ${S(e.title)}</span></a
      >
    `}#u(){this.dispatchEvent(new CustomEvent("jump-to-shared",{detail:{mark:this.mark,side:this.fight?.side},bubbles:!0,composed:!0}))}},cs={outcome:"--spoiler-width: 2.5rem",finish:"--spoiler-width: 4rem",round:"--spoiler-width: 1.25rem"};customElements.define("fp-fight-row",Ie);var ds={career:["Date","Opponent","Result","Method","Rd","Class","Event",""],all:["Date","Fight","Result","Method","Rd","Event",""]},De=class extends hs{static properties={fights:{attribute:!1},layout:{type:String},focus:{attribute:!1},revealed:{type:Boolean},busy:{type:Boolean},remaining:{type:Number}};static styles=[k,us`
      /* The one place each screen's columns are declared. Widths follow the
         wireframe, in rem so they track the type scale rather than a pixel.

         Method and Event stopped being fixed. Both were cut off — 'Decision
         (unanimous)', 'UFC 232 Jones vs. Gustafsson 2' — beside a name column
         that, as the only fr, sat on hundreds of pixels it had no use for.

         Method has a bounded vocabulary, so it takes a fixed ceiling. Event
         does not, so it shares the slack with the name instead: three parts
         name to two parts event, with a floor so the split never squeezes it to
         nothing. A ratio rather than a width is what keeps both readable at
         every size down to the phone breakpoint — All fights gives 208px to the
         filter rail and would have starved a fixed Event column. */
      .list[data-layout='career'] {
        --row-cols: 4.5rem minmax(0, 3fr) 3rem minmax(6rem, 9.5rem) 2rem 3rem minmax(8rem, 2fr) 1.5rem;
      }

      .list[data-layout='all'] {
        --row-cols: 4.5rem minmax(0, 3fr) 3rem minmax(6rem, 9.5rem) 2rem minmax(8rem, 2fr) 1.5rem;
      }

      /* Method takes the same ceiling here. The two name columns stay a matched
         pair of 1fr — a card reads symmetrically about the result, so whatever
         Method gains has to come off both corners equally. */
      .list[data-layout='event'] {
        --row-cols: 1.75rem minmax(0, 1fr) 3rem minmax(0, 1fr) minmax(6rem, 9.5rem) 3rem 1.5rem;
      }

      .list { display: flex; flex-direction: column; }

      /* The column header and the event's segment dividers both pin to the top
         of the scrolling region, so a row two thirds of the way down a card
         still says which part of the night it belongs to. */
      .frh,
      .segment {
        position: sticky;
        inset-block-start: 0;
        z-index: 2;
      }

      .sentinel { block-size: 1px; }

      .loading {
        inline-size: 100%;
        padding: var(--space-4);
        border: 0;
        background: none;
        text-align: center;
        color: var(--text-faint);
        font-family: var(--font-mono);
        font-size: var(--text-2xs);
        cursor: pointer;
      }

      .loading:hover { color: var(--text); }
      .loading:disabled { cursor: default; }
    `];#e=null;constructor(){super(),this.fights=[],this.layout="all",this.focus=[],this.revealed=!1,this.busy=!1,this.remaining=0}disconnectedCallback(){this.#e?.disconnect(),this.#e=null,super.disconnectedCallback()}updated(){let e=this.renderRoot.querySelector(".sentinel");if(!e){this.#e?.disconnect(),this.#e=null;return}this.#e||(this.#e=new IntersectionObserver(t=>{t.some(r=>r.isIntersecting)&&this.#t()},{rootMargin:"400px"}),this.#e.observe(e))}#t=()=>{this.busy||this.remaining<=0||this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))};render(){let e=this.fights||[];if(!e.length)return Ue;let t=ds[this.layout];return V`
      <div class="list" data-layout=${this.layout}>
        ${t?V`<div class="frh">${t.map(r=>V`<span>${r}</span>`)}</div>`:Ue}
        ${this.layout==="event"?this.#r(e):e.map(r=>this.#s(r))}
        ${this.remaining>0?V`
              <div class="sentinel"></div>
              <button class="loading" ?disabled=${this.busy} @click=${this.#t}>
                ${this.busy?"Loading more\u2026":`${U(this.remaining)} more \u2014 load them`}
              </button>
            `:Ue}
      </div>
    `}#r(e){let t=[...e].sort((o,l)=>o.order-l.order),r=[],i=t[0]?.segment;for(let o of t)o.segment!==i&&(i=o.segment,r.push(V`<div class="strip segment eyebrow">${H(i)}</div>`)),r.push(this.#s(o));return r}#s(e){return V`
      <fp-fight-row
        .fight=${e}
        .layout=${this.layout}
        .focus=${this.focus}
        .revealed=${this.revealed}
      ></fp-fight-row>
    `}};customElements.define("fp-fight-list",De);import{LitElement as ps,css as ms,html as te,nothing as fs}from"lit";var Pe=class extends ps{static properties={results:{attribute:!1},fighter:{attribute:!1},opponent:{attribute:!1},revealed:{type:Boolean},sharedOnly:{type:Boolean},side:{type:String}};static styles=[k,ms`
      :host { display: block; }

      /* 3d: a 22px list gutter with a hairline down it. */
      .columns {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
        column-gap: var(--space-5);
        padding-inline: var(--row-pad);
        align-items: start;
      }

      .rule { background: var(--line); align-self: stretch; }

      /* Method shares the slack with the name rather than sitting on a stub
         width: 'Decision (unanimous)' and 'Rear Naked Choke' were cut to a few
         characters beside a name column with hundreds of pixels spare. Two
         parts name to one part method, so when two mirrored careers do get
         cramped it is the method that gives way first — the opponent is what a
         comparison is read for. */
      .column {
        display: flex;
        flex-direction: column;
        min-inline-size: 0;
        --row-cols: 3rem minmax(0, 2fr) 3rem minmax(4.5rem, 1fr) 1.5rem;
      }

      /* The right career reads inwards, so its columns run the other way. */
      .column[data-side='b'] {
        --row-cols: 1.5rem minmax(4.5rem, 1fr) 3rem minmax(0, 2fr) 3rem;
      }

      .switcher { display: none; }
      .empty { padding: var(--space-8) 0; }

      @media (width < 60rem) {
        /* One career at a time, chosen by the A/B chips — 3g. Both keep their
           markers, so ◆1 still ties the pair across the switch. */
        .columns {
          grid-template-columns: minmax(0, 1fr);
          column-gap: 0;
        }

        .rule,
        .column[data-off] { display: none; }

        .column[data-side='b'] {
          --row-cols: 3rem minmax(0, 2fr) 3rem minmax(4.5rem, 1fr) 1.5rem;
        }

        .switcher {
          display: flex;
          gap: var(--space-2);
          padding: var(--space-3) var(--row-pad);
        }

        .switcher > .chip { flex: 1; justify-content: center; }
      }
    `];constructor(){super(),this.revealed=!1,this.sharedOnly=!1,this.side="a"}render(){if(!this.results)return fs;let e=this.#e();return te`
      <div>
        <div class="switcher">
          ${[["a",this.fighter],["b",this.opponent]].map(([t,r])=>te`
              <button class="chip" aria-pressed=${this.side===t} @click=${()=>this.side=t}>
                ${S(r?.name)}
              </button>
            `)}
        </div>
        <div class="columns">
          ${this.#t("a",this.fighter,e)}
          <div class="rule"></div>
          ${this.#t("b",this.opponent,e)}
        </div>
      </div>
    `}#e(){let e=this.results.context?.shared||[];return new Map(e.map((t,r)=>[t.id,r+1]))}#t(e,t,r){let i=t?[t.id]:[],o=(this.results.fights||[]).filter(l=>l.side===e).map(l=>({fight:l,mark:r.get(le(l,i)?.id)||0})).filter(l=>!this.sharedOnly||l.mark);return te`
      <section class="column" data-side=${e} ?data-off=${this.side!==e} aria-label=${S(t?.name)}>
        ${o.length?o.map(({fight:l,mark:c})=>te`
                <fp-fight-row
                  .fight=${l}
                  layout="compare"
                  .focus=${i}
                  .revealed=${this.revealed}
                  .mark=${c}
                  ?mirror=${e==="b"}
                ></fp-fight-row>
              `):te`<p class="notice empty">
              ${this.sharedOnly?"No shared opponents in this career.":"No fights match."}
            </p>`}
      </section>
    `}goToShared(e,t){let r=t==="a"?"b":"a";this.side!==r&&(this.side=r),this.updateComplete.then(()=>{[...this.renderRoot.querySelector(`.column[data-side='${r}']`)?.querySelectorAll("fp-fight-row")||[]].find(l=>l.mark===e)?.scrollIntoView({block:"center",behavior:"smooth"})})}static sharedLine(e){let t=e?.context?.shared||[];return t.length?I(t.length,"shared opponent"):"No shared opponents"}};customElements.define("fp-comparison",Pe);import{LitElement as gs,css as vs,html as D,nothing as ft}from"lit";var Re=class extends gs{static properties={fighter:{attribute:!1},opponent:{attribute:!1},fights:{type:Number},picking:{state:!0}};static styles=[k,vs`
      :host { display: block; }

      .who {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-4) var(--page-pad);
        min-inline-size: 0;
      }

      /* 3d's 44px gutter. The two sides are independent columns, so a long name
         on one never shunts the other. */
      .pair {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        column-gap: var(--space-12);
        border-block-end: 1px solid var(--line);
      }

      .pair > .who { padding-inline: 0; }
      .pair > .who:last-child { flex-direction: row-reverse; text-align: end; }
      .pair > .who:last-child .meta { align-items: flex-end; }
      .solo { border-block-end: 1px solid var(--line); }

      .meta {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        min-inline-size: 0;
      }

      .name { --title-size: var(--text-xl); }

      /* Comparison shrinks both sides together. Sizing the monogram per side —
         which is what the old per-fighter flag did — made the two careers sit
         under discs of different sizes. */
      .pair .name { --title-size: var(--text-md); }
      .pair .monogram { --monogram-size: 2.5rem; }
      .chips { --cluster-gap: var(--space-1); }
      .chip[data-unknown] { color: var(--text-off); border-color: var(--line); }
      /* Wide enough for a full name and the dates under it, and allowed to
         shrink rather than push the header wider on a small screen. */
      .picker { flex: 0 1 20rem; inline-size: 20rem; }

      @media (width < 52rem) {
        .pair { grid-template-columns: minmax(0, 1fr); column-gap: 0; }
        .pair > .who:last-child { flex-direction: row; text-align: start; }
        .pair > .who:last-child .meta { align-items: flex-start; }
        .who { padding-block: var(--space-3); }

        /* Sharing the row leaves the picker too narrow to read a name in, so
           it takes a line of its own instead. */
        .solo { flex-wrap: wrap; }
        .picker { flex: 1 0 100%; inline-size: auto; }
      }
    `];constructor(){super(),this.fights=0,this.picking=!1}render(){return this.fighter?this.opponent?D`
          <div class="pair">
            ${this.#e(this.fighter,!1)}
            ${this.#e(this.opponent,!0)}
          </div>
        `:D`<div class="who solo">${this.#t(this.fighter)} ${this.#s()}</div>`:ft}#e(e,t){return D`
      <div class="who">
        ${this.#t(e)}
        ${t?D`
              <button class="icon-btn" title="Stop comparing" aria-label="Stop comparing" @click=${()=>this.#n(null)}>
                ✕
              </button>
            `:ft}
      </div>
    `}#t(e){let t=S(e.name);return D`
      <span class="monogram" aria-hidden="true">${st(t)}</span>
      <span class="meta">
        <h1 class="title name truncate" title=${t}>${t}</h1>
        <span class="cluster chips">${this.#r(e)}</span>
      </span>
    `}#r(e){let t=`${Se(e.start)}\u2013${Se(e.end)}`,r=[D`<span class="chip" data-unknown title="Weight class is not in this dataset yet">—</span>`,D`<span class="chip">${t}</span>`];return this.fights&&r.push(D`<span class="chip">${I(this.fights,"fight")}</span>`),r}#s(){return this.picking?D`
        <span class="picker end">
          <fp-search-field
            kind="fighter"
            placeholder="Compare with…"
            @select=${e=>this.#n(e.detail)}
            @clear=${()=>this.picking=!1}
          ></fp-search-field>
        </span>
      `:D`
      <button class="btn end" data-intent="quiet" @click=${()=>this.picking=!0}>+ Compare a fighter</button>
    `}#n(e){this.picking=!1,this.dispatchEvent(new CustomEvent("pick-opponent",{detail:e,bubbles:!0,composed:!0}))}};customElements.define("fp-fighter-header",Re);import{LitElement as bs,css as ys,html as se,nothing as gt}from"lit";var je=class extends bs{static properties={event:{attribute:!1},results:{attribute:!1}};static styles=[k,ys`
      :host { display: block; }

      .head {
        --stack-gap: var(--space-2);
        padding: var(--space-4) var(--page-pad);
        border-block-end: 1px solid var(--line);
      }

      .name { --title-size: var(--text-2xl); }
      .chips { --cluster-gap: var(--space-1); }
    `];render(){if(!this.event)return gt;let e=S(this.event.name);return se`
      <div class="stack head">
        <h1 class="title name">${e}</h1>
        <p class="num dim">${Z(this.event.date)}</p>
        <div class="cluster chips">${this.#e()}</div>
      </div>
    `}#e(){let e=this.results;if(!e)return gt;let t=e.fights||[],r=e.facets?.titleOnly?.count||0,i=t.filter(c=>c.vod?.exact).length,o=t.filter(c=>!c.vod).length,l=[se`<span class="chip">${I(e.total,"bout")}</span>`];return r&&l.push(se`<span class="chip">${I(r,"title fight")}</span>`),o===t.length&&t.length?l.push(se`<span class="chip">Not on Fight Pass</span>`):l.push(se`<span class="chip"
          >${i?`${U(i)} with their own replay`:"card cuts only"}${o?` \xB7 ${U(o)} unavailable`:""}</span
        >`),l}};customElements.define("fp-event-header",je);var Y={all:50,event:120,fighter:250},_e=class extends ws{static properties={phase:{state:!0},error:{state:!0},mode:{state:!0},query:{state:!0},results:{state:!0},busy:{state:!0},revealed:{state:!0},sharedOnly:{state:!0},railOpen:{state:!0}};static styles=[k,xs`
      :host {
        display: flex;
        flex-direction: column;
        block-size: 100dvh;
      }

      main {
        flex: 1 1 auto;
        min-block-size: 0;
        display: flex;
        flex-direction: column;
      }

      .with-panel {
        flex: 1 1 auto;
        min-block-size: 0;
      }

      .results {
        display: flex;
        flex-direction: column;
        min-block-size: 0;
      }

      .head { flex: none; }
      .list { flex: 1 1 auto; }

      /* Wide: the rail is simply the panel column of .with-panel, and the sheet
         chrome around it generates no box at all. */
      .rail-holder { display: contents; }
      .sheet-actions,
      .scrim { display: none; }

      @media (width < 60rem) {
        /* Narrow: the same rail, as a bottom sheet over the results (3h). It is
           the same component either way — only where it stands changes. */
        .rail-holder {
          display: none;
          position: fixed;
          z-index: 30;
          inset-inline: 0;
          inset-block-end: 0;
          flex-direction: column;
          max-block-size: 82dvh;
          border-start-start-radius: var(--radius-lg);
          border-start-end-radius: var(--radius-lg);
          background: var(--bg-surface);
          box-shadow: var(--shadow-elevated);
        }

        .rail-holder[data-open] { display: flex; }
        .rail-holder > .panel { flex: 1 1 auto; min-block-size: 0; border: 0; }

        .sheet-actions {
          display: flex;
          gap: var(--space-2);
          padding: var(--page-pad);
          border-block-start: 1px solid var(--line);
        }

        .sheet-actions > .btn { flex: 1; justify-content: center; }

        .scrim {
          display: block;
          position: fixed;
          z-index: 29;
          inset: 0;
          border: 0;
          background: rgb(0 0 0 / 0.55);
        }
      }
    `];#e=0;#t="";#r="";#s={fighter:null,event:null};constructor(){super();let{mode:e,query:t}=we(globalThis.location?.hash);this.mode=e,this.query=this.#c(t,e),this.phase="loading",this.busy=!1,this.revealed=!1,this.sharedOnly=!1,this.railOpen=!1,this.#d(this.query),this.#r=this.#i()}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("hashchange",this.#o),this.#n()}disconnectedCallback(){globalThis.removeEventListener("hashchange",this.#o),super.disconnectedCallback()}async#n(){try{await X().warm(),this.phase="ready",this.#l(),await this.#p()}catch(e){this.error=e,this.phase="error"}}#a(e,t){this.mode=e,this.query=this.#u(e,t),this.#d(this.query),this.#h(),this.#t=xe(e,this.query,{limit:Y[e]}),globalThis.location.hash!==this.#t&&(globalThis.location.hash=this.#t),this.#p()}#o=()=>{if(globalThis.location.hash===this.#t)return;let{mode:e,query:t}=we(globalThis.location.hash);this.mode=e,this.query=this.#c(t,e),this.#l(),this.#d(this.query),this.#h(),this.#p()};#l(){let e=globalThis.location.hash;if(this.#t=xe(this.mode,this.query,{limit:Y[this.mode]}),!e||e===this.#t){this.#t=e;return}globalThis.history.replaceState(null,"",this.#t)}#i(){return`${this.mode}:${this.query.fighter||""}:${this.query.vs||""}:${this.query.event||""}`}#h(){let e=this.#i();e!==this.#r&&(this.#r=e,this.revealed=!1,this.sharedOnly=!1)}#c(e,t){let r=String(globalThis.location?.hash||"").split("?")[1]||"",i=new URLSearchParams(r).has("limit");return this.#u(t,{...e,limit:i?e.limit:Y[t]})}#u(e,t){let r=F(t);return e==="all"?r:F({...Q(r),limit:r.limit})}#d(e){e.fighter&&(this.#s.fighter={fighter:e.fighter,vs:e.vs}),e.event&&(this.#s.event=e.event)}#m(){return this.mode==="fighter"&&!this.query.fighter||this.mode==="event"&&!this.query.event}async#p(){if(this.phase!=="ready")return;if(this.#m()){this.results=null;return}let e=++this.#e;this.busy=!0;try{let t=await X().search(this.query);if(e!==this.#e)return;this.results=t}catch(t){if(e!==this.#e)return;this.error=t,this.phase="error"}finally{e===this.#e&&(this.busy=!1)}}#g(e){if(e===this.mode)return;let t;e==="fighter"&&this.#s.fighter?t=ae(this.query,this.#s.fighter.fighter,this.#s.fighter.vs):e==="event"&&this.#s.event?t=ye(this.query,this.#s.event):t=ne(this.query),this.#a(e,{...t,limit:Y[e]})}#v({role:e,option:t}){let r=e==="event"?t?ye(this.query,t.id):ne(this.query):t?ae(this.query,t.id,this.query.vs):ne(this.query);this.#a(this.mode,{...r,limit:Y[this.mode]})}#b(e){this.query.fighter&&this.#a("fighter",{...ae(this.query,this.query.fighter,e?.id??null),limit:Y.fighter})}#y({mark:e,side:t}){this.renderRoot.querySelector("fp-comparison")?.goToShared(e,t)}render(){let e=this.results?.context||{};return q`
      <fp-top-bar
        .mode=${this.mode}
        .fighter=${e.fighter}
        .event=${e.event}
        @mode-change=${t=>this.#g(t.detail)}
        @pick=${t=>this.#v(t.detail)}
      ></fp-top-bar>

      <main
        @query-change=${t=>this.#a(this.mode,t.detail)}
        @toggle-reveal=${t=>this.revealed=t.detail}
        @toggle-shared-only=${()=>this.sharedOnly=!this.sharedOnly}
        @toggle-rail=${()=>this.railOpen=!this.railOpen}
        @pick-opponent=${t=>this.#b(t.detail)}
        @jump-to-shared=${t=>this.#y(t.detail)}
        @more=${()=>this.#a(this.mode,Je(this.query))}
      >
        ${this.#w()}
      </main>

      <fp-footer></fp-footer>
    `}#w(){if(this.phase==="error")return q`
        <p class="notice">
          Could not load the catalogue — ${this.error?.message||"unknown error"}.<br />
          FP+ reads <code>bin-data/</code> over HTTP; it needs a static server, not <code>file://</code>.
        </p>
      `;if(this.phase==="loading")return q`<p class="notice">Loading the fight catalogue…</p>`;if(this.#m())return q`
        <p class="notice">
          ${this.mode==="fighter"?"Search a fighter to see their career.":"Search an event to see its card."}
        </p>
      `;if(!this.results)return q`<p class="notice">That selection is not in this catalogue.</p>`;let e=this.results.context||{};return e.event?this.#k():e.fighter?this.#x():this.#S()}#x(){let{fighter:e,opponent:t}=this.results.context,r=!!t;return q`
      <fp-fighter-header
        class="head"
        .fighter=${e}
        .opponent=${t}
        .fights=${r?0:this.results.total}
      ></fp-fighter-header>

      <fp-list-controls
        class="head"
        .query=${this.query}
        .label=${r?this.#$():"Career"}
        .revealed=${this.revealed}
        .sharedOnly=${this.sharedOnly}
        ?showSharedOnly=${r&&!!this.results.context.shared?.length}
        sortable
      ></fp-list-controls>

      <div class="scroll list">
        ${r?q`
              <fp-comparison
                .results=${this.results}
                .fighter=${e}
                .opponent=${t}
                .revealed=${this.revealed}
                .sharedOnly=${this.sharedOnly}
              ></fp-comparison>
            `:q`
              <fp-fight-list
                layout="career"
                .fights=${this.results.fights}
                .focus=${[e.id]}
                .revealed=${this.revealed}
                .busy=${this.busy}
                .remaining=${this.#f()}
              ></fp-fight-list>
            `}
      </div>
    `}#$(){let e=this.results.context?.shared||[];return e.length?I(e.length,"shared opponent"):"No shared opponents"}#k(){let e=this.results.fights||[],t=[...e].sort((r,i)=>r.order-i.order)[0];return q`
      <fp-event-header class="head" .event=${this.results.context.event} .results=${this.results}></fp-event-header>

      <fp-list-controls
        class="head"
        .query=${this.query}
        .label=${H(t?.segment)||"Card"}
        .revealed=${this.revealed}
      ></fp-list-controls>

      <div class="scroll list">
        <fp-fight-list layout="event" .fights=${e} .revealed=${this.revealed}></fp-fight-list>
      </div>
    `}#S(){return q`
      <div class="with-panel">
        <div class="rail-holder" ?data-open=${this.railOpen}>
          <fp-filter-rail class="panel scroll" .query=${this.query} .facets=${this.results.facets}></fp-filter-rail>
          <div class="sheet-actions">
            <button class="btn" @click=${()=>this.railOpen=!1}>
              Show ${I(this.results.total,"fight")}
            </button>
          </div>
        </div>

        <div class="results">
          <fp-list-controls
            class="head"
            .query=${this.query}
            .label=${this.busy?"searching\u2026":I(this.results.total,"fight")}
            .revealed=${this.revealed}
            .filters=${pt(this.query)}
            chips
            sortable
          ></fp-list-controls>

          <div class="scroll list">
            ${this.results.fights.length?q`
                  <fp-fight-list
                    layout="all"
                    .fights=${this.results.fights}
                    .revealed=${this.revealed}
                    .busy=${this.busy}
                    .remaining=${this.#f()}
                  ></fp-fight-list>
                `:q`<p class="notice">No fight matches these filters. Take one off to widen the search.</p>`}
          </div>
        </div>
      </div>
      ${this.railOpen?q`<button class="scrim" aria-label="Close filters" @click=${()=>this.railOpen=!1}></button>`:$s}
    `}#f(){return Math.max(0,(this.results.total||0)-(this.results.fights?.length||0))}};customElements.define("fp-app",_e);export{_e as FpApp};
