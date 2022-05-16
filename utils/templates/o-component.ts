import {
  LitElement, html, css,
} from 'lit';
import {
  customElement,
} from 'lit/decorators.js';
import reset from '../../reset';

@customElement('componentName')
export default class className extends LitElement {
  static styles = [
    reset, css``,
  ];

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'componentName': className
  }
}
