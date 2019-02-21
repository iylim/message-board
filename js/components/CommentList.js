export default class CommentList extends HTMLElement {
  static get observedAttributes() {
    return ['comments'];
  }

  // getter/setters
  get comments() {
    if (this.hasAttribute('comments')) {
      return JSON.parse(this.getAttribute('comments'));
    }
    return [];
  }

  // allows us to set comment attribute by using this.comments = newVal
  set comments(val) {
    this.setAttribute('comments', JSON.stringify(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.comments.forEach(comment => {
      // create a comment-list element
      const newComment = document.createElement('message-board-comment-item');
      // set its comment attribute
      newComment.comment = comment;
      // append it to comment list
      this.appendChild(newComment);
    });
  }

  // listens for changes on the observed attributes
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}

// change p tags to message board comments