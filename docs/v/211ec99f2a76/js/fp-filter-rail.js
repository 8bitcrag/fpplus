import{LitElement as p,css as m,html as l,nothing as h}from"lit";import v from"./styles.js";import{clearFilters as f,refine as r,toggle as i}from"./search/contract.js";import{AWARD_LABEL as g,count as o,displayName as b}from"./format.js";const c=1993;class y extends p{static properties={query:{attribute:!1},facets:{attribute:!1},lookup:{state:!0}};static styles=[v,m`
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
    `];constructor(){super(),this.lookup=""}render(){if(!this.query||!this.facets)return h;const e=!this.#c();return l`
      <div class="stack rail">
        <div class="head">
          <h2 class="eyebrow">Filters</h2>
          <button class="link end" ?disabled=${e} @click=${this.#s}>clear all</button>
        </div>

        ${this.#a()} ${this.#r()} ${this.#i()} ${this.#o()}

        <button class="btn clear-all" data-intent="quiet" ?disabled=${e} @click=${this.#s}>
          Clear all filters
        </button>
      </div>
    `}#a(){const[e,s]=this.query.years||[null,null],t=new Date().getUTCFullYear(),a=d=>n=>{const u=n.target.value===""?null:Number(n.target.value);this.#e(r(this.query,{years:d==="from"?[u,s]:[e,u]}))};return l`
      <section class="stack group">
        <h3 class="eyebrow">Date range</h3>
        <div class="cluster range">
          <input
            class="field num"
            type="number"
            aria-label="From year"
            min=${c}
            max=${t}
            placeholder=${c}
            .value=${e??""}
            @change=${a("from")}
          />
          <input
            class="field num"
            type="number"
            aria-label="To year"
            min=${c}
            max=${t}
            placeholder=${t}
            .value=${s??""}
            @change=${a("to")}
          />
        </div>
      </section>
    `}#l(){const e=[];for(const s of["methods","endings"])for(const t of this.facets[s]?.values||[])t.value!=="NONE"&&e.push({key:s,value:t.value,label:b(String(t.label)),count:t.count});return e}#r(){const e=this.lookup.trim().toLowerCase(),s=new Set([...this.query.methods,...this.query.endings]),t=this.#l().filter(a=>(a.count>0||s.has(a.value))&&a.label.toLowerCase().includes(e));return l`
      <section class="stack group">
        <h3 class="eyebrow">Method</h3>
        <input
          class="field"
          type="search"
          aria-label="Filter methods"
          placeholder="filter methods…"
          .value=${this.lookup}
          @input=${a=>this.lookup=a.target.value}
        />
        <div class="stack options scroll">
          ${t.length?t.map(a=>l`
                  <label class="facet">
                    <input
                      type="checkbox"
                      .checked=${this.query[a.key].includes(a.value)}
                      @change=${()=>this.#e(r(this.query,{[a.key]:i(this.query[a.key],a.value)}))}
                    />
                    <span class="truncate" title=${a.label}>${a.label}</span>
                    <span class="num">${o(a.count)}</span>
                  </label>
                `):l`<span class="num dim">no method matches that</span>`}
        </div>
      </section>
    `}#i(){const e=this.facets.rounds?.values||[];return l`
      <section class="stack group">
        <h3 class="eyebrow">Rounds</h3>
        <div class="cluster chips">
          ${e.map(s=>{const t=this.query.rounds.includes(Number(s.value));return l`
              <button
                class="chip"
                aria-pressed=${t}
                ?data-empty=${!t&&!s.count}
                title="${o(s.count)} fights ended in round ${s.value}"
                @click=${()=>this.#e(r(this.query,{rounds:i(this.query.rounds,Number(s.value))}))}
              >
                ${s.value}
              </button>
            `})}
        </div>
      </section>
    `}#o(){const e=this.facets.titleOnly,s=this.facets.awards?.values||[];return l`
      <section class="stack group">
        <h3 class="eyebrow">Accolades</h3>
        <div class="cluster chips" data-wrap="column">
          ${e?this.#t("Title fight",this.query.titleOnly,e.count,()=>this.#e(r(this.query,{titleOnly:!this.query.titleOnly}))):h}
          ${s.map(t=>this.#t(g[t.value]||String(t.label),this.query.awards.includes(t.value),t.count,()=>this.#e(r(this.query,{awards:i(this.query.awards,t.value)}))))}
        </div>
        <p class="note">A fight can hold more than one, so these counts add up to more than the total.</p>
      </section>
    `}#t(e,s,t,a){return l`
      <button class="chip" aria-pressed=${s} ?data-empty=${!s&&!t} title="${o(t)} fights" @click=${a}>
        ${e}
      </button>
    `}#c(){const e=this.query;return e.methods.length+e.endings.length+e.rounds.length+e.awards.length+(e.years?1:0)+(e.titleOnly?1:0)}#s=()=>this.#e(f(this.query));#e(e){this.dispatchEvent(new CustomEvent("query-change",{detail:e,bubbles:!0,composed:!0}))}}customElements.define("fp-filter-rail",y);export{y as FpFilterRail};
