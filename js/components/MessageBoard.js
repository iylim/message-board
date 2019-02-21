import MessageBoardAPI, { commentData } from "../MessageBoardAPI.js";

class MessageBoardApp extends HTMLElement {
  constructor() {
    super();
    this.api = new MessageBoardAPI(commentData);
    this.state = {
      comments: this.api.getCommentsSortedByTime()
    };
  }

  setState(newState) {
    Object.keys(newState).forEach(key => {
      this.state[key] = newState[key];
      this.querySelectorAll(`[${key}]`).forEach(element => {
        element[key] = newState[key];
      });
    });
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
      <message-board-comments></message-board-comments>
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
    this.querySelector('message-board-comments').setAttribute('comments', JSON.stringify(this.state.comments));
    this.querySelector('message-board-comments').addEventListener('removeComment', this.handleRemoveComment);
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    const searchText = new FormData(event.target).get('search');
    const comments = this.state.comments = this.api.filterCommentsByText(searchText);
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

  };
}

export default MessageBoardApp;
