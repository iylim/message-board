export default class CommentItem extends HTMLElement {
  get comment() {
    if (this.hasAttribute('comment')) {
      return JSON.parse(this.getAttribute('comment'));
    }
    return {
      timestamp: Date.now(),
      text: '',
      author: ''
    };
  }

  set comment(val) {
    this.setAttribute('comment', JSON.stringify(val));
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <p>${this.comment.text}</p><p class="timestamp">${new Date(this.comment.timestamp).toLocaleString()}</p>
    <input class="comment" active=${this.active} type="text" value="${this.comment.text}"></input>
    
    <span class="container">
      <button type="button" class="edit-button">Edit</button>
      <button type="button" class="delete-button">x</button>
    </span>
    `;
    // create custom event and emit it
    this.querySelector('button.delete-button').addEventListener('click', this.dispatchRemoveEvent);
    this.querySelector('button.edit-button').addEventListener('click', this.dispatchEditComment);
  }

  dispatchRemoveEvent = () => {
    this.dispatchEvent(new CustomEvent('removeComment', {
      bubbles: true,
      detail: this.comment.text
    }));
  };

  dispatchEditComment = (event) => {
    this.dispatchEvent(new CustomEvent('editComment', {
      bubbles: true,
      detail: this.comment.text
    }));
  };
}
