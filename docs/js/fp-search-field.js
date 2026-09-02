import{LitElement as l,css as h,html as i,nothing as o}from"lit";import p from"../css/system.css"with{type:"css"};import{backend as c}from"./backend.js";import{displayName as n,formatDate as d,formatDay as r}from"./format.js";const u=120;class m extends l{static properties={kind:{type:String},placeholder:{type:String},selected:{type:String},text:{state:!0},options:{state:!0},open:{state:!0},active:{state:!0}};static styles=[p,h`
      :host {
        position: relative;
        flex: 1;
        min-inline-size: 8rem;
      }

      .wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

      .field {
        padding-inline-end: 2rem;
      }

      .clear {
        position: absolute;
        inset-inline-end: 2px;
      }

      .list {
        position: absolute;
        z-index: 20;
        inset-inline: 0;
        inset-block-start: calc(100% + var(--space-1));
        max-block-size: 22rem;
        margin: 0;
        padding: var(--space-1);
        overflow-y: auto;
        list-style: none;
        border: 1px solid var(--line-strong);
        border-radius: var(--radius-md);
        background: var(--bg-surface);
        box-shadow: var(--shadow-elevated);
      }

      /* Name over its dates, not beside them. Side by side, the two shared one
         line and the name lost the argument — in the narrow "Compare with…"
         field you could not read far enough to tell two fighters apart. */
      .option {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-sm);
        cursor: pointer;
      }

      .option[aria-selected='true'],
      .option:hover {
        background: var(--bg-raised);
      }

      .option > .title {
        --title-size: var(--text-sm);
      }

      .option > .hint {
        font-size: var(--text-xs);
        color: var(--text-faint);
      }
    `];#t=0;#e=0;constructor(){super(),this.kind="fighter",this.placeholder="Search\u2026",this.selected="",this.text="",this.options=[],this.open=!1,this.active=-1}updated(t){t.has("selected")&&this.text!==this.selected&&(this.text=this.selected)}render(){return i`
      <div class="wrap">
        <input
          class="field"
          type="text"
          role="combobox"
          aria-expanded=${this.open}
          aria-autocomplete="list"
          aria-label=${this.kind==="event"?"Search events":"Search fighters"}
          .value=${this.text}
          placeholder=${this.placeholder}
          @input=${this.#s}
          @keydown=${this.#r}
          @focus=${this.#s}
          @blur=${()=>setTimeout(()=>this.open=!1,100)}
        />
        ${this.text?i`<button class="icon-btn clear" title="Clear" aria-label="Clear" @click=${this.#l}>✕</button>`:o}
      </div>
      ${this.open&&this.options.length?this.#a():o}
    `}#a(){return i`
      <ul class="list" role="listbox">
        ${this.options.map((t,e)=>i`
            <li
              class="option"
              role="option"
              aria-selected=${e===this.active}
              @pointerdown=${s=>s.preventDefault()}
              @click=${()=>this.#i(t)}
            >
              <span class="title truncate">${n(t.name)}</span>
              <span class="num hint truncate">${this.#o(t)}</span>
            </li>
          `)}
      </ul>
    `}#o(t){return this.kind==="event"?d(t.date):`${r(t.start)}\u2013${r(t.end)}`}#s(t){this.text=t.target.value;const e=this.text.trim();if(clearTimeout(this.#t),e.length<2){this.options=[],this.open=!1;return}this.#t=setTimeout(()=>this.#n(e),u)}async#n(t){const e=++this.#e,s=c(),a=this.kind==="event"?await s.suggestEvents(t,8):await s.suggestFighters(t,8);e===this.#e&&(this.options=a,this.active=a.length?0:-1,this.open=a.length>0)}#r(t){if(t.key==="Escape"){this.open=!1;return}if(!(!this.open||!this.options.length))if(t.key==="ArrowDown"||t.key==="ArrowUp"){t.preventDefault();const e=t.key==="ArrowDown"?1:-1;this.active=(this.active+e+this.options.length)%this.options.length}else t.key==="Enter"&&(t.preventDefault(),this.#i(this.options[this.active]||this.options[0]))}#i(t){this.open=!1,this.options=[],this.text=n(t.name),this.dispatchEvent(new CustomEvent("select",{detail:t,bubbles:!0,composed:!0}))}#l(){this.selected="",this.text="",this.options=[],this.open=!1,this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0}))}}customElements.define("fp-search-field",m);export{m as FpSearchField};
