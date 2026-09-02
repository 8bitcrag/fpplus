import{LitElement as r,css as o,html as t,nothing as s}from"lit";import l from"../css/system.css"with{type:"css"};import"./fp-search-field.js";import{displayName as p,monogram as h,plural as c,yearOfDay as n}from"./format.js";class d extends r{static properties={fighter:{attribute:!1},opponent:{attribute:!1},fights:{type:Number},picking:{state:!0}};static styles=[l,o`
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
    `];constructor(){super(),this.fights=0,this.picking=!1}render(){return this.fighter?this.opponent?t`
          <div class="pair">
            ${this.#e(this.fighter,!1)}
            ${this.#e(this.opponent,!0)}
          </div>
        `:t`<div class="who solo">${this.#t(this.fighter)} ${this.#s()}</div>`:s}#e(e,i){return t`
      <div class="who">
        ${this.#t(e)}
        ${i?t`
              <button class="icon-btn" title="Stop comparing" aria-label="Stop comparing" @click=${()=>this.#i(null)}>
                ✕
              </button>
            `:s}
      </div>
    `}#t(e){const i=p(e.name);return t`
      <span class="monogram" aria-hidden="true">${h(i)}</span>
      <span class="meta">
        <h1 class="title name truncate" title=${i}>${i}</h1>
        <span class="cluster chips">${this.#a(e)}</span>
      </span>
    `}#a(e){const i=`${n(e.start)}\u2013${n(e.end)}`,a=[t`<span class="chip" data-unknown title="Weight class is not in this dataset yet">—</span>`,t`<span class="chip">${i}</span>`];return this.fights&&a.push(t`<span class="chip">${c(this.fights,"fight")}</span>`),a}#s(){return this.picking?t`
        <span class="picker end">
          <fp-search-field
            kind="fighter"
            placeholder="Compare with…"
            @select=${e=>this.#i(e.detail)}
            @clear=${()=>this.picking=!1}
          ></fp-search-field>
        </span>
      `:t`
      <button class="btn end" data-intent="quiet" @click=${()=>this.picking=!0}>+ Compare a fighter</button>
    `}#i(e){this.picking=!1,this.dispatchEvent(new CustomEvent("pick-opponent",{detail:e,bubbles:!0,composed:!0}))}}customElements.define("fp-fighter-header",d);export{d as FpFighterHeader};
