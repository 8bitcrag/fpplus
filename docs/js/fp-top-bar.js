import{LitElement as s,css as i,html as a,nothing as r}from"lit";import l from"../css/system.css"with{type:"css"};import{displayName as n}from"./format.js";import"./fp-search-field.js";import"./fp-faq.js";const c=[["fighter","Fighter"],["event","Event"],["all","All fights"]];class h extends s{static properties={mode:{type:String},fighter:{attribute:!1},event:{attribute:!1}};static styles=[l,i`
      .bar { gap: var(--space-5); }
      .search { flex: 1; max-inline-size: 32rem; }

      @media (width < 40rem) {
        .bar { gap: var(--space-3); }
        .tab { padding-inline: var(--space-2); font-size: var(--text-xs); }
      }
    `];constructor(){super(),this.mode="all"}render(){return a`
      <header>
        <div class="bar">
          <a class="wordmark" href="#/all" title="FP+ — start over">FP+</a>
          ${this.#t()}
          <fp-faq class="end"></fp-faq>
        </div>
        <div class="tabs" role="tablist" aria-label="Search mode">
          ${c.map(([e,t])=>a`
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
    `}#t(){if(this.mode==="all")return r;const e=this.mode==="event";return a`
      <div class="search">
        <fp-search-field
          kind=${e?"event":"fighter"}
          placeholder=${e?"Search events\u2026":"Search fighters\u2026"}
          .selected=${n(e?this.event?.name:this.fighter?.name)}
          @select=${t=>this.#e(t.detail)}
          @clear=${()=>this.#e(null)}
        ></fp-search-field>
      </div>
    `}#e(e){this.dispatchEvent(new CustomEvent("pick",{detail:{role:this.mode,option:e}}))}}customElements.define("fp-top-bar",h);export{h as FpTopBar};
