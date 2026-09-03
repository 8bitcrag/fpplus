import{LitElement as m,css as h,html as s,nothing as o}from"lit";import f from"./styles.js";import{badgesOf as v,displayName as r,endingLabel as $,finishDetail as w,finishLabel as y,formatMonth as u,OUTCOME_LABEL as b,opponentIn as g,outcomeAttr as d,sideOf as x,weightAbbr as k,yearOf as E}from"./format.js";class L extends m{static properties={fight:{attribute:!1},layout:{type:String},focus:{attribute:!1},revealed:{type:Boolean},mark:{type:Number},mirror:{type:Boolean}};static styles=[f,h`
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
    `];constructor(){super(),this.layout="all",this.focus=[],this.revealed=!1,this.mark=0,this.mirror=!1}render(){const e=this.fight;if(!e)return o;const t=this.#l(e);return s`
      <div class="fr" ?data-inert=${!e.vod} ?data-marked=${!!this.mark} id=${e.id}>
        ${this.mirror?[...t].reverse():t}
      </div>
    `}#l(e){switch(this.layout){case"career":return[this.#s(u(e.event.date)),this.#n(e),this.#e(e,["outcome","finish","round"]),this.#o(e),this.#i(e),this.#t(e)];case"event":return[s`<span class="num order c-drop">${e.order}</span>`,this.#r(e,0),this.#e(e,["outcome"]),this.#r(e,1),this.#e(e,["finish"]),this.#o(e),this.#t(e)];case"compare":return[this.#s(E(e.event.date)),this.#n(e),this.#e(e,["outcome","finish"]),this.#t(e)];default:return[this.#s(u(e.event.date)),this.#a(r(e.title),e,"start"),this.#e(e,["outcome","finish","round"]),this.#i(e),this.#t(e)]}}#s(e){return s`<span class="num c-date">${e}</span>`}#n(e){const t=g(e,this.focus),a=r(t?.name)||r(e.title);return this.#a(a,e,this.mirror?"end":"start")}#r(e,t){const a=e.fighters?.[t];return this.#a(r(a?.name),e,t===0?"end":"start",t===0,a)}#a(e,t,a,n=!0,l=null){const c=n?v(t):[],p=this.revealed&&l&&d(l.outcome)||o;return s`
      <span class="name c-name" data-align=${a}>
        <span class="line">
          ${this.#c()}
          <span class="who truncate" data-outcome=${p} title=${e}>${e}</span>
        </span>
        ${c.length?s`
              <span class="badges">
                ${c.map(i=>s`<span class="badge" data-award=${i.award} data-short=${i.short}>${i.label}</span>`)}
              </span>
            `:o}
      </span>
    `}#c(){return this.mark?s`
      <button class="mark" title="Shared opponent — go to the matching fight" @click=${this.#d}>
        ◆${this.mark}<span class="sr-only">Shared opponent ${this.mark}</span>
      </button>
    `:o}#e(e,t){const a=this.mirror?[...t].reverse():t;return s`<span class="c-meta">${a.map(n=>this.#u(e,n))}</span>`}#u(e,t){if(!this.revealed)return s`<span class=${t==="round"?"c-drop":""}
        ><span class="spoiler" style=${O[t]}></span><span class="sr-only">Result hidden</span></span
      >`;if(t==="outcome"){const n=((this.focus.length?x(e,this.focus):null)||e.fighters?.[0])?.outcome||"unknown";return s`<span class="num value outcome" data-outcome=${d(n)}>${b[n]||""}</span>`}return t==="round"?s`<span class="num value c-drop">${$(e)}</span>`:s`<span class="num value" title=${w(e)}>${y(e)}</span>`}#o(e){return s`<span class="num c-drop" title="Weight class">${k(e)}</span>`}#i(e){const t=r(e.event.name);return s`<span class="num truncate c-drop" title=${t}>${t}</span>`}#t(e){const t=e.vod;if(!t)return s`<span class="cue c-cue" title="Not on Fight Pass">–<span class="sr-only">Not on Fight Pass</span></span>`;const a=t.exact?"Watch this fight on Fight Pass":"Watch the card cut this fight sits in";return s`
      <a
        class="cue c-cue"
        data-vod=${t.exact?"fight":"segment"}
        href=${t.url}
        target="_blank"
        rel="noopener"
        title=${a}
        >▷<span class="sr-only">${a} — ${r(e.title)}</span></a
      >
    `}#d(){this.dispatchEvent(new CustomEvent("jump-to-shared",{detail:{mark:this.mark,side:this.fight?.side},bubbles:!0,composed:!0}))}}const O={outcome:"--spoiler-width: 2.5rem",finish:"--spoiler-width: 4rem",round:"--spoiler-width: 1.25rem"};customElements.define("fp-fight-row",L);export{L as FpFightRow};
