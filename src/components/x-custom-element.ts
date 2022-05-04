import minireset from './minireset';

class CustomElem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const shadow = this.shadowRoot as ShadowRoot;
    shadow.innerHTML = `
        <style id='css-main'>
        </style>
        <div id="container">
        </div>
    `;
    shadow.prepend(minireset);
  }
}
export default CustomElem;
