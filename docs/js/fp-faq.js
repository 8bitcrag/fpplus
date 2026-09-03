import{LitElement as o,css as r,html as t}from"lit";import n from"../css/system.css"with{type:"css"};const l=[{q:"What is this?",a:[`A search interface for UFC Fight Pass. You can search fighter careers and events, or
       filter all fights in various ways. Fight details are hidden to avoid spoilers, but you
       can click the 'Reveal results' toggle to see them. Fighter careers can be compared,
       highlighting common opponents.`,`You need a subscription to Fight Pass to see the videos; this just links to them in a
       new tab. This tool has no ads, trackers, or any monetisation.`]},{q:"What does it cover?",a:[`So far just numbered UFC events, fight nights and TUF finales. More will be added in
       the future with Contender Series events next on the list.`]},{q:"Why are some of the link times wrong?",a:[`Some fights link to a single fight VOD, while others to event VODs. For events, the VOD
       times are best guesses based on incomplete and inaccurate information, so they can't
       always be right. The goal is to eventually have single-fight VOD links for all fights.`]},{q:"Can you fix 'x' or add 'y'?",a:[`The answer is probably yes and also no. The Fight Pass data contains quite a few issues;
       they are all fixable, but fixing them would require a huge amount of data processing. If
       the UFC feel like hiring me so I have access to their data lakes, then it's possible.
       Otherwise I would probably crash their servers.`]},{q:"How was this done?",a:[`A tiny language model based loosely on the DeepSeek v3 paper was created and trained to
       match disparate UFC-related data. The unified data was then compressed into binaries. A
       tiny JS database engine was written to use those binaries so no server is needed.`]},{q:"Was AI used?",sub:!0,a:["For the presentation layer. Everything else - the model, compression, the database - is human."]}];class d extends o{static styles=[n,r`
      .trigger {
        font-family: var(--font-display);
        font-size: var(--text-md);
        font-weight: 700;
      }

      dialog {
        inline-size: min(44rem, 100% - var(--space-6));
        max-block-size: min(44rem, 100dvb - var(--space-12));
        padding: 0;
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: var(--bg-surface);
        color: var(--text);
        box-shadow: var(--shadow-elevated);
      }

      dialog[open] {
        display: flex;
        flex-direction: column;
      }

      dialog::backdrop { background: rgb(0 0 0 / 0.55); }

      .bar { flex: none; }

      .body {
        --stack-gap: var(--space-6);
        flex: 1 1 auto;
        padding: var(--space-5) var(--page-pad) var(--space-8);
        color: var(--text-dim);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
      }

      h3 {
        --title-size: var(--text-md);
        margin-block-end: var(--space-2);
        color: var(--text);
      }

      p + p { margin-block-start: var(--space-3); }

      /* A question that hangs off the one above it rather than standing beside
         the others — indented, and quieter by a step. */
      section[data-sub] {
        margin-block-start: calc(var(--space-6) * -1 + var(--space-4));
        padding-inline-start: var(--space-4);
        border-inline-start: 1px solid var(--line);
      }

      section[data-sub] h3 { --title-size: var(--text-sm); }
    `];render(){return t`
      <button class="icon-btn trigger" title="FAQs" aria-label="Open the FAQs" @click=${this.#a}>?</button>

      <dialog aria-labelledby="faq-title" @click=${this.#s}>
        <div class="bar">
          <h2 class="title" id="faq-title">FAQs</h2>
          <button class="icon-btn end" title="Close" aria-label="Close" @click=${this.#t}>✕</button>
        </div>

        <div class="body stack scroll">
          ${l.map(({q:e,a,sub:s})=>t`
              <section ?data-sub=${s}>
                <h3 class="title">${e}</h3>
                ${a.map(i=>t`<p>${i}</p>`)}
              </section>
            `)}
        </div>
      </dialog>
    `}#e(){return this.renderRoot.querySelector("dialog")}#a=()=>this.#e().showModal();#t=()=>this.#e().close();#s=e=>{e.target===this.#e()&&this.#t()}}customElements.define("fp-faq",d);export{d as FpFaq};
