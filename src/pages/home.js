import React from "react";
import Card from "../components/card/card";
import CardDetails from "../components/card/card-details";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPost: null,
    };
  }

  componentDidMount() {
    const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json());
    postsPromise
        .then(posts => posts.map((post, index) => {
              return {
                ...post,
                ...{
                  pinned: false,
                  originalIndex: index
                }
              }
            }
        ))
        .then(posts => this.setState({posts: posts}));
  }

  postDetails(selectedPost) {
    this.setState({
      selectedPost: selectedPost
    })
  }

  pinPost(pinnedPost) {
    let posts = this.state.posts;
    if (posts[0].pinned) {
      this.unpinPost();
    }
    const toPinIndex = posts.findIndex(post => post.id === pinnedPost.id);
    const toPinPost = posts.splice(toPinIndex, 1)
        .map(post => ({...post, ...{pinned: true}}));
    toPinPost.forEach(post => posts.unshift(post));
    this.setState({posts: posts});
  }

  unpinPost() {
    const posts = this.state.posts;
    const pinnedPost = posts.shift();
    pinnedPost.pinned = false;
    posts.splice(pinnedPost.originalIndex, 0, pinnedPost);
    this.setState({posts: posts});
  }

  render() {
    return (
        <>
          <div className="posts">
            {
              this.state.posts.map(post => (
                  <Card post={post}
                        pinPost={(post) => this.pinPost(post)}
                        unpinPost={() => this.unpinPost()}
                        key={post.id}
                        postDetails={(post) => this.postDetails(post)}/>
              ))
            }
          </div>

          <div className="post-details">
            {this.state.selectedPost &&
            <CardDetails post={this.state.selectedPost} key={this.state.selectedPost.id}/>
            }
          </div>
        </>
    );
  }

}

export default Home;