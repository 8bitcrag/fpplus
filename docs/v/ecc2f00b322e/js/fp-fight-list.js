import{LitElement as l,css as h,html as i,nothing as a}from"lit";import m from"./styles.js";import"./fp-fight-row.js";import{count as d,segmentLabel as c}from"./format.js";const u={career:["Date","Opponent","Result","Method","Rd","Class","Event",""],all:["Date","Fight","Result","Method","Rd","Event",""]};class f extends l{static properties={fights:{attribute:!1},layout:{type:String},focus:{attribute:!1},revealed:{type:Boolean},busy:{type:Boolean},remaining:{type:Number}};static styles=[m,h`
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
    `];#e=null;constructor(){super(),this.fights=[],this.layout="all",this.focus=[],this.revealed=!1,this.busy=!1,this.remaining=0}disconnectedCallback(){this.#e?.disconnect(),this.#e=null,super.disconnectedCallback()}updated(){const e=this.renderRoot.querySelector(".sentinel");if(!e){this.#e?.disconnect(),this.#e=null;return}this.#e||(this.#e=new IntersectionObserver(s=>{s.some(t=>t.isIntersecting)&&this.#t()},{rootMargin:"400px"}),this.#e.observe(e))}#t=()=>{this.busy||this.remaining<=0||this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))};render(){const e=this.fights||[];if(!e.length)return a;const s=u[this.layout];return i`
      <div class="list" data-layout=${this.layout}>
        ${s?i`<div class="frh">${s.map(t=>i`<span>${t}</span>`)}</div>`:a}
        ${this.layout==="event"?this.#i(e):e.map(t=>this.#s(t))}
        ${this.remaining>0?i`
              <div class="sentinel"></div>
              <button class="loading" ?disabled=${this.busy} @click=${this.#t}>
                ${this.busy?"Loading more\u2026":`${d(this.remaining)} more \u2014 load them`}
              </button>
            `:a}
      </div>
    `}#i(e){const s=[...e].sort((r,n)=>r.order-n.order),t=[];let o=s[0]?.segment;for(const r of s)r.segment!==o&&(o=r.segment,t.push(i`<div class="strip segment eyebrow">${c(o)}</div>`)),t.push(this.#s(r));return t}#s(e){return i`
      <fp-fight-row
        .fight=${e}
        .layout=${this.layout}
        .focus=${this.focus}
        .revealed=${this.revealed}
      ></fp-fight-row>
    `}}customElements.define("fp-fight-list",f);export{f as FpFightList};
