import MessageBoardAPI, { commentData } from '../MessageBoardAPI.js';

class MessageBoardApp extends HTMLElement {
  constructor() {
    super();
    this.api = new MessageBoardAPI(commentData);
    this.state = {
      comments: this.api.getCommentsSortedByTime()
    };
    this.addEventListener('removeComment', this.handleRemoveComment);
    this.addEventListener('editComment', this.handleEditComment);
  }

  // takes in new piece of state
  setState(newState) {
    // for each piece of state
    Object.keys(newState).forEach(key => {
      // update correct key
      this.state[key] = newState[key];
      // select all child elements tracking piece of state w/ attributes
      this.querySelectorAll(`[${key}]`).forEach(element => {
        // sets the attribute
        element[key] = newState[key];
      });
    });
  }
  get active() {
    return this.hasAttribute('active');
  }

  set active(isActive) {
    if (isActive) {
      this.setAttribute('active', '');
    } 
    this.removeAttribute('active');
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <nav>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      <message-board-comment-list></message-board-comment-list>
        <div class="add-comment">
          <form>
            <input
              type="text"
              name="comment"
              placeholder="Your opinion here"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
    `;

    // add event listeners
    this.querySelector('nav form').addEventListener('submit', this.handleSearchSubmit);
    this.querySelector('.add-comment form').addEventListener('submit', this.handleAddComment);
    this.querySelector('message-board-comment-list').setAttribute('comments', JSON.stringify(this.state.comments));
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    const searchText = new FormData(event.target).get('search');
    const comments = this.api.filterCommentsByText(searchText);
    this.setState({ comments });
  };

  handleAddComment = event => {
    event.preventDefault();
    const commentText = new FormData(event.target).get('comment');
    event.target.reset();
    const comments = this.api.addComment(commentText);
    this.setState({ comments });
  };

  handleRemoveComment = event => {
    const confirmed = window.confirm(`Really delete ${event.detail}?`);
    if (confirmed) {
      const updatedComments = this.api.removeComment(event.target.comment.id);
      this.setState({ comments: updatedComments });
    }
  };

  handleEditComment = event => {
    const input = window.prompt(`Edit changes below`, `${event.detail}`);
    if (input) {
      const updatedComments = this.api.updateComment(event.target.comment.id);
      this.setState({ comments: updatedComments });
    }
  };
}

export default MessageBoardApp;
