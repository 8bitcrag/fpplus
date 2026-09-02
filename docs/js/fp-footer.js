import{LitElement as a,css as o,html as t,nothing as s}from"lit";import n from"../css/system.css"with{type:"css"};const i={about:`FP+ is an alternative way into the UFC Fight Pass library: Fight Pass has the
    catalogue but little means of searching it, so this layers real search over the same
    videos. Nothing plays here \u2014 choosing a fight opens it on Fight Pass in a new tab.`,data:`Every event, card and result is read from the published event data, indexed into a
    few hundred kilobytes and searched in the browser. There is no server. Coverage is
    uneven and the lists say so: most events offer whole-segment replays only, a minority
    of fights have a replay of their own, and some events are not on Fight Pass at all.`};class r extends a{static properties={open:{state:!0}};static styles=[n,o`
      .link {
        border: 0;
        background: none;
        padding: 0;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }

      .link:hover,
      .link[aria-expanded='true'] { color: var(--text-faint); }

      .note {
        flex-basis: 100%;
        max-inline-size: 46rem;
        padding: var(--space-3) var(--page-pad) 0;
        color: var(--text-faint);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        line-height: var(--leading-normal);
      }
    `];constructor(){super(),this.open=""}render(){return t`
      <footer class="footer">
        ${["about","data"].map(e=>t`
            <button class="link" aria-expanded=${this.open===e} @click=${()=>this.open=this.open===e?"":e}>
              ${e==="about"?"About":"Data source"}
            </button>
          `)}
        <span>Not affiliated with the UFC</span>
        ${this.open?t`<p class="note">${i[this.open]}</p>`:s}
      </footer>
    `}}customElements.define("fp-footer",r);export{r as FpFooter};
