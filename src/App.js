import './App.css';
import Card from "./card/card";
import React from "react";
import CardDetails from "./card/card-details";

class App extends React.Component {
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

    render() {
        // need to use key property get rid of the waring about unique key
        return (
            <div className="App">
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
                    { this.state.selectedPost &&
                        <CardDetails post={this.state.selectedPost} key={this.state.selectedPost.id}/>
                    }
                </div>
            </div>
        );
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
            .map(post => {
                post.pinned = true;
                return post;
            });
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
}

export default App;
