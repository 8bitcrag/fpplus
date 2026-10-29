import{LitElement as c,css as u,html as r,nothing as l}from"lit";import p from"./styles.js";import{activeFilters as d,clearFilters as f,refine as o}from"./search/contract.js";import{AWARD_LABEL as m,displayName as b,segmentLabel as y}from"./format.js";const a={methods:"Method",endings:"Ending",rounds:"Round",segments:"Card",outcomes:"Outcome",awards:"Accolade",years:"Year",titleOnly:"Title fights"};class g extends c{static properties={label:{type:String},query:{attribute:!1},revealed:{type:Boolean},chips:{type:Boolean},filters:{type:Number},sortable:{type:Boolean},sharedOnly:{type:Boolean},showSharedOnly:{type:Boolean}};static styles=[p,u`
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
    `];constructor(){super(),this.label="",this.revealed=!1,this.chips=!1,this.filters=null,this.sortable=!1,this.sharedOnly=!1,this.showSharedOnly=!1}render(){const e=this.chips?this.#r():[];return r`
      <div class="strip">
        ${this.filters==null?l:r`
              <button class="chip sheet-toggle" aria-pressed=${this.filters>0} @click=${this.#o}>
                Filters${this.filters?` \xB7 ${this.filters} active`:""}
              </button>
            `}
        ${this.label?r`<span class="eyebrow label">${this.label}</span>`:l}
        ${e}
        ${e.length?r`<button class="clear" @click=${this.#l}>clear</button>`:l}

        <span class="cluster controls">
          ${this.showSharedOnly?r`
                <button class="chip" aria-pressed=${this.sharedOnly} @click=${this.#n}>Shared only</button>
              `:l}
          <label class="switch">
            <input type="checkbox" .checked=${this.revealed} @change=${this.#a} />
            Reveal results
          </label>
          ${this.sortable?this.#s():l}
        </span>
      </div>
    `}#s(){const e=this.query?.sort==="oldest";return r`
      <button
        class="chip"
        aria-pressed="true"
        title="Switch to ${e?"newest":"oldest"} first"
        @click=${()=>this.#t(o(this.query,{sort:e?"newest":"oldest"}))}
      >
        ${e?"Oldest first":"Newest first"} <span aria-hidden="true">↑↓</span>
      </button>
    `}#r(){const e=this.query;if(!e)return[];const t=[];for(const s of["methods","endings","rounds","segments","outcomes","awards"])for(const i of e[s])t.push(this.#e(this.#i(s,i),()=>o(e,{[s]:e[s].filter(n=>n!==i)})));if(e.years){const[s,i]=e.years,n=s!=null&&i!=null?`${s}\u2013${i}`:s!=null?`${s}+`:`up to ${i}`;t.push(this.#e(`${a.years} ${n}`,()=>o(e,{years:null})))}return e.titleOnly&&t.push(this.#e(a.titleOnly,()=>o(e,{titleOnly:!1}))),t}#i(e,t){return e==="awards"?m[t]||t:e==="rounds"?`Round ${t}`:e==="segments"?y(t):e==="outcomes"?`${a.outcomes}: ${t}`:b(String(t))}#e(e,t){return r`
      <button class="chip" aria-pressed="true" @click=${()=>this.#t(t())}>
        ${e} <span class="remove" aria-hidden="true">✕</span>
        <span class="sr-only">— remove this filter</span>
      </button>
    `}#l=()=>this.#t(f(this.query));#o=()=>{this.dispatchEvent(new CustomEvent("toggle-rail",{bubbles:!0,composed:!0}))};#n=()=>{this.dispatchEvent(new CustomEvent("toggle-shared-only",{bubbles:!0,composed:!0}))};#a=e=>{this.dispatchEvent(new CustomEvent("toggle-reveal",{detail:e.target.checked,bubbles:!0,composed:!0}))};#t(e){this.dispatchEvent(new CustomEvent("query-change",{detail:e,bubbles:!0,composed:!0}))}}const E=h=>d(h).length;customElements.define("fp-list-controls",g);export{g as FpListControls,E as filterCount};
