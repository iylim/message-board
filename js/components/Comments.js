export default class Comments extends HTMLElement {
  static get observedAttributes() {
    return ['comments'];
  }

  //getter/setters
  get comments() {
    if (this.hasAttribute('comments')) {
      return JSON.parse(this.getAttribute('comments'));
    } 
    return [];
  }

  // avoid using
  set comments(val) {
    this.setAttribute('comments', JSON.stringify(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      ${this.comments.map(comment => `<p>${comment.text}</p>`).join('')}
    `;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}

//change p tags to message board comments
