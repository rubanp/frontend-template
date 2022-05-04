import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import reset from './reset';

@customElement('simple-greeting')
class SimpleGreeting extends LitElement {
  static override styles = [reset, css`
    h1 {
        background-color: red;
    }
    p {
        color: blue;
    }
  `];

  @property()
    name?: string = 'World';

  override render() {
    return html`
          <h1>Uwu</h1>
          <p>Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-greeting': SimpleGreeting;
  }
}

export default SimpleGreeting;
