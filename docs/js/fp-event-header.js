import{LitElement as o,css as d,html as s,nothing as p}from"lit";import u from"../css/system.css"with{type:"css"};import{count as r,displayName as m,formatDate as v,plural as h}from"./format.js";class f extends o{static properties={event:{attribute:!1},results:{attribute:!1}};static styles=[u,d`
      :host { display: block; }

      .head {
        --stack-gap: var(--space-2);
        padding: var(--space-4) var(--page-pad);
        border-block-end: 1px solid var(--line);
      }

      .name { --title-size: var(--text-2xl); }
      .chips { --cluster-gap: var(--space-1); }
    `];render(){if(!this.event)return p;const t=m(this.event.name);return s`
      <div class="stack head">
        <h1 class="title name">${t}</h1>
        <p class="num dim">${v(this.event.date)}</p>
        <div class="cluster chips">${this.#t()}</div>
      </div>
    `}#t(){const t=this.results;if(!t)return p;const e=t.fights||[],l=t.facets?.titleOnly?.count||0,c=e.filter(n=>n.vod?.exact).length,i=e.filter(n=>!n.vod).length,a=[s`<span class="chip">${h(t.total,"bout")}</span>`];return l&&a.push(s`<span class="chip">${h(l,"title fight")}</span>`),i===e.length&&e.length?a.push(s`<span class="chip">Not on Fight Pass</span>`):a.push(s`<span class="chip"
          >${c?`${r(c)} with their own replay`:"card cuts only"}${i?` \xB7 ${r(i)} unavailable`:""}</span
        >`),a}}customElements.define("fp-event-header",f);export{f as FpEventHeader};
