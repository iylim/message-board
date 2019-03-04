function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class MessageBoardAPI {
  constructor(comments = []) {
    this.comments = comments;
    this.url = 'https://express-codealong.herokuapp.com/api/comments/';
  }
  /**
   * Get all comments
   * @returns {Promise<array>} of updated comments array
   */
  getComments() {
    // return wait(1000).then(() => this.comments);
    return fetch(this.url).then(response => response.json());
  }
  
  /**
   * Adds a new comment to the comments array
   * @param {string} text Text for our new comment
   * @returns {Promise<array>} Updated comments array
   */
  addComment(text) {
    // const id = this.comments.length > 0 ? this.comments[this.comments.length - 1].id + 1 : 0;
    // const timestamp = Date.now();
    // this.comments.push({
    //   text,
    //   id,
    //   timestamp,
    // });
    // return wait(1000).then(() => this.comments);
    const body = {
      text
    };
    return fetch(this.url, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json());
  }

  /** 
   * Updates comment text
   * @param {number} id Unique Id for comment
   * @param {string} text Updated comment text
   * @returns {Promise<array>} Updated comments array
   */
  updateComment(id, text) {
    const body = { text };
    // this.comments.find(comment => comment.id === id).text = text;
    // return wait(1000).then(() => this.comments);
    return fetch(`${this.url}${id}`, { 
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json());
  }

  /**
   * Removes comment from the list
   * @param {number} id Unique Id for comment to be removed
   * @returns {Promise<array>} Updated comments array
   */
  removeComment(id) {
    // const index = this.comments.findIndex(comment => comment.id === id);
    // this.comments.splice(index, 1);
    // return wait(1000).then(() => this.comments);
    return fetch(`${this.url}${id}`, {
      method: 'DELETE'
    }).then(response => response.json());
  }

  /**
   * Lists comments sorted by timestamp in desc or asc order
   * @param {boolean} orderAsc If true sorts by oldest to newest, else sorts newest to oldest
   *  @returns {Promise<array>} Sorted array of comment objects
   */
  getCommentsSortedByTime(orderAsc = true) {
    const clonedComments = JSON.parse(JSON.stringify(this.comments));
    clonedComments.sort((lhs, rhs) => {
      if (orderAsc) {
        return lhs.timestamp < rhs.timestamp ? -1 : 1;
      }
      return lhs.timestamp < rhs.timestamp ? 1 : -1;
    });
    return wait(1000).then(() => clonedComments);
  }

  /**
   * Filters comments by a substring contained in the text
   * @param {string} substring Substring to be filtered
   * @returns {Promise<array>} Filtered array of comment objects
   */
  filterCommentsByText(substring = '') {
    // return wait(1000).then(() => this.comments.filter(comment => comment.text.toLowerCase().includes(substring.toLowerCase())));
    // return this.comments.filter(comment => comment.text.toLowerCase().includes(substring.toLowerCase()));
    return fetch(`${this.url}?filter=${substring}`)
      .then(response => response.json());
  }
}

export default MessageBoardAPI;

// Use this comment data for testing
export const commentData = [
  {
    text: 'Love this!',
    id: 1,
    timestamp: 1549581565000,
  },
  {
    text: 'Super good',
    id: 2,
    timestamp: 1549577965000,
  },
  {
    text: 'You are the best',
    id: 3,
    timestamp: 1549495165000,
  },
  {
    text: 'Ramen is my fav food ever',
    id: 4,
    timestamp: 1548976765000,
  },
  {
    text: 'Nice Nice Nice!',
    id: 5,
    timestamp: 1546903165000,
  },
];
