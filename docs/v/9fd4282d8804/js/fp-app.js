import{LitElement as p,css as g,html as i,nothing as m}from"lit";import y from"./styles.js";import{backend as n}from"./backend.js";import{clearFilters as v,inAll as a,inEvent as c,inFighter as l,normalizeQuery as d,showMore as b}from"./search/contract.js";import{readHash as u,writeHash as f}from"./url.js";import{plural as o,segmentLabel as $}from"./format.js";import"./fp-top-bar.js";import"./fp-footer.js";import"./fp-list-controls.js";import{filterCount as x}from"./fp-list-controls.js";import"./fp-filter-rail.js";import"./fp-fight-list.js";import"./fp-comparison.js";import"./fp-fighter-header.js";import"./fp-event-header.js";const r={all:50,event:120,fighter:250};class q extends p{static properties={phase:{state:!0},error:{state:!0},mode:{state:!0},query:{state:!0},results:{state:!0},busy:{state:!0},revealed:{state:!0},sharedOnly:{state:!0},railOpen:{state:!0}};static styles=[y,g`
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
    `];#i=0;#e="";#r="";#t={fighter:null,event:null};constructor(){super();const{mode:e,query:t}=u(globalThis.location?.hash);this.mode=e,this.query=this.#d(t,e),this.phase="loading",this.busy=!1,this.revealed=!1,this.sharedOnly=!1,this.railOpen=!1,this.#h(this.query),this.#r=this.#n()}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("hashchange",this.#l),this.#g()}disconnectedCallback(){globalThis.removeEventListener("hashchange",this.#l),super.disconnectedCallback()}async#g(){try{await n().warm(),this.phase="ready",this.#o(),await this.#a()}catch(e){this.error=e,this.phase="error"}}#s(e,t){this.mode=e,this.query=this.#u(e,t),this.#h(this.query),this.#c(),this.#e=f(e,this.query,{limit:r[e]}),globalThis.location.hash!==this.#e&&(globalThis.location.hash=this.#e),this.#a()}#l=()=>{if(globalThis.location.hash===this.#e)return;const{mode:e,query:t}=u(globalThis.location.hash);this.mode=e,this.query=this.#d(t,e),this.#o(),this.#h(this.query),this.#c(),this.#a()};#o(){const e=globalThis.location.hash;if(this.#e=f(this.mode,this.query,{limit:r[this.mode]}),!e||e===this.#e){this.#e=e;return}globalThis.history.replaceState(null,"",this.#e)}#n(){return`${this.mode}:${this.query.fighter||""}:${this.query.vs||""}:${this.query.event||""}`}#c(){const e=this.#n();e!==this.#r&&(this.#r=e,this.revealed=!1,this.sharedOnly=!1)}#d(e,t){const s=String(globalThis.location?.hash||"").split("?")[1]||"",h=new URLSearchParams(s).has("limit");return this.#u(t,{...e,limit:h?e.limit:r[t]})}#u(e,t){const s=d(t);return e==="all"?s:d({...v(s),limit:s.limit})}#h(e){e.fighter&&(this.#t.fighter={fighter:e.fighter,vs:e.vs}),e.event&&(this.#t.event=e.event)}#f(){return this.mode==="fighter"&&!this.query.fighter||this.mode==="event"&&!this.query.event}async#a(){if(this.phase!=="ready")return;if(this.#f()){this.results=null;return}const e=++this.#i;this.busy=!0;try{const t=await n().search(this.query);if(e!==this.#i)return;this.results=t}catch(t){if(e!==this.#i)return;this.error=t,this.phase="error"}finally{e===this.#i&&(this.busy=!1)}}#m(e){if(e===this.mode)return;let t;e==="fighter"&&this.#t.fighter?t=l(this.query,this.#t.fighter.fighter,this.#t.fighter.vs):e==="event"&&this.#t.event?t=c(this.query,this.#t.event):t=a(this.query),this.#s(e,{...t,limit:r[e]})}#y({role:e,option:t}){const s=e==="event"?t?c(this.query,t.id):a(this.query):t?l(this.query,t.id,this.query.vs):a(this.query);this.#s(this.mode,{...s,limit:r[this.mode]})}#v(e){this.query.fighter&&this.#s("fighter",{...l(this.query,this.query.fighter,e?.id??null),limit:r.fighter})}#b({mark:e,side:t}){this.renderRoot.querySelector("fp-comparison")?.goToShared(e,t)}render(){const e=this.results?.context||{};return i`
      <fp-top-bar
        .mode=${this.mode}
        .fighter=${e.fighter}
        .event=${e.event}
        @mode-change=${t=>this.#m(t.detail)}
        @pick=${t=>this.#y(t.detail)}
      ></fp-top-bar>

      <main
        @query-change=${t=>this.#s(this.mode,t.detail)}
        @toggle-reveal=${t=>this.revealed=t.detail}
        @toggle-shared-only=${()=>this.sharedOnly=!this.sharedOnly}
        @toggle-rail=${()=>this.railOpen=!this.railOpen}
        @pick-opponent=${t=>this.#v(t.detail)}
        @jump-to-shared=${t=>this.#b(t.detail)}
        @more=${()=>this.#s(this.mode,b(this.query))}
      >
        ${this.#$()}
      </main>

      <fp-footer></fp-footer>
    `}#$(){if(this.phase==="error")return i`
        <p class="notice">
          Could not load the catalogue — ${this.error?.message||"unknown error"}.<br />
          FP+ reads <code>bin-data/</code> over HTTP; it needs a static server, not <code>file://</code>.
        </p>
      `;if(this.phase==="loading")return i`<p class="notice">Loading the fight catalogue…</p>`;if(this.#f())return i`
        <p class="notice">
          ${this.mode==="fighter"?"Search a fighter to see their career.":"Search an event to see its card."}
        </p>
      `;if(!this.results)return i`<p class="notice">That selection is not in this catalogue.</p>`;const e=this.results.context||{};return e.event?this.#k():e.fighter?this.#x():this.#w()}#x(){const{fighter:e,opponent:t}=this.results.context,s=!!t;return i`
      <fp-fighter-header
        class="head"
        .fighter=${e}
        .opponent=${t}
        .fights=${s?0:this.results.total}
      ></fp-fighter-header>

      <fp-list-controls
        class="head"
        .query=${this.query}
        .label=${s?this.#q():"Career"}
        .revealed=${this.revealed}
        .sharedOnly=${this.sharedOnly}
        ?showSharedOnly=${s&&!!this.results.context.shared?.length}
        sortable
      ></fp-list-controls>

      <div class="scroll list">
        ${s?i`
              <fp-comparison
                .results=${this.results}
                .fighter=${e}
                .opponent=${t}
                .revealed=${this.revealed}
                .sharedOnly=${this.sharedOnly}
              ></fp-comparison>
            `:i`
              <fp-fight-list
                layout="career"
                .fights=${this.results.fights}
                .focus=${[e.id]}
                .revealed=${this.revealed}
                .busy=${this.busy}
                .remaining=${this.#p()}
              ></fp-fight-list>
            `}
      </div>
    `}#q(){const e=this.results.context?.shared||[];return e.length?o(e.length,"shared opponent"):"No shared opponents"}#k(){const e=this.results.fights||[],t=[...e].sort((s,h)=>s.order-h.order)[0];return i`
      <fp-event-header class="head" .event=${this.results.context.event} .results=${this.results}></fp-event-header>

      <fp-list-controls
        class="head"
        .query=${this.query}
        .label=${$(t?.segment)||"Card"}
        .revealed=${this.revealed}
      ></fp-list-controls>

      <div class="scroll list">
        <fp-fight-list layout="event" .fights=${e} .revealed=${this.revealed}></fp-fight-list>
      </div>
    `}#w(){return i`
      <div class="with-panel">
        <div class="rail-holder" ?data-open=${this.railOpen}>
          <fp-filter-rail class="panel scroll" .query=${this.query} .facets=${this.results.facets}></fp-filter-rail>
          <div class="sheet-actions">
            <button class="btn" @click=${()=>this.railOpen=!1}>
              Show ${o(this.results.total,"fight")}
            </button>
          </div>
        </div>

        <div class="results">
          <fp-list-controls
            class="head"
            .query=${this.query}
            .label=${this.busy?"searching\u2026":o(this.results.total,"fight")}
            .revealed=${this.revealed}
            .filters=${x(this.query)}
            chips
            sortable
          ></fp-list-controls>

          <div class="scroll list">
            ${this.results.fights.length?i`
                  <fp-fight-list
                    layout="all"
                    .fights=${this.results.fights}
                    .revealed=${this.revealed}
                    .busy=${this.busy}
                    .remaining=${this.#p()}
                  ></fp-fight-list>
                `:i`<p class="notice">No fight matches these filters. Take one off to widen the search.</p>`}
          </div>
        </div>
      </div>
      ${this.railOpen?i`<button class="scrim" aria-label="Close filters" @click=${()=>this.railOpen=!1}></button>`:m}
    `}#p(){return Math.max(0,(this.results.total||0)-(this.results.fights?.length||0))}}customElements.define("fp-app",q);export{q as FpApp};
