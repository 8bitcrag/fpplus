import{LitElement as m,css as h,html as a,nothing as c}from"lit";import d from"./styles.js";import"./fp-fight-row.js";import{displayName as n,opponentIn as p,plural as u}from"./format.js";class f extends m{static properties={results:{attribute:!1},fighter:{attribute:!1},opponent:{attribute:!1},revealed:{type:Boolean},sharedOnly:{type:Boolean},side:{type:String}};static styles=[d,h`
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
    `];constructor(){super(),this.revealed=!1,this.sharedOnly=!1,this.side="a"}render(){if(!this.results)return c;const e=this.#t();return a`
      <div>
        <div class="switcher">
          ${[["a",this.fighter],["b",this.opponent]].map(([t,r])=>a`
              <button class="chip" aria-pressed=${this.side===t} @click=${()=>this.side=t}>
                ${n(r?.name)}
              </button>
            `)}
        </div>
        <div class="columns">
          ${this.#e("a",this.fighter,e)}
          <div class="rule"></div>
          ${this.#e("b",this.opponent,e)}
        </div>
      </div>
    `}#t(){const e=this.results.context?.shared||[];return new Map(e.map((t,r)=>[t.id,r+1]))}#e(e,t,r){const i=t?[t.id]:[],o=(this.results.fights||[]).filter(s=>s.side===e).map(s=>({fight:s,mark:r.get(p(s,i)?.id)||0})).filter(s=>!this.sharedOnly||s.mark);return a`
      <section class="column" data-side=${e} ?data-off=${this.side!==e} aria-label=${n(t?.name)}>
        ${o.length?o.map(({fight:s,mark:l})=>a`
                <fp-fight-row
                  .fight=${s}
                  layout="compare"
                  .focus=${i}
                  .revealed=${this.revealed}
                  .mark=${l}
                  ?mirror=${e==="b"}
                ></fp-fight-row>
              `):a`<p class="notice empty">
              ${this.sharedOnly?"No shared opponents in this career.":"No fights match."}
            </p>`}
      </section>
    `}goToShared(e,t){const r=t==="a"?"b":"a";this.side!==r&&(this.side=r),this.updateComplete.then(()=>{[...this.renderRoot.querySelector(`.column[data-side='${r}']`)?.querySelectorAll("fp-fight-row")||[]].find(s=>s.mark===e)?.scrollIntoView({block:"center",behavior:"smooth"})})}static sharedLine(e){const t=e?.context?.shared||[];return t.length?u(t.length,"shared opponent"):"No shared opponents"}}customElements.define("fp-comparison",f);export{f as FpComparison};
