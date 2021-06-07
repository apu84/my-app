import React from "react";
import CardComment from "./card-comment";

class CardDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    render() {
        const post = this.props.post;
        return (
            <>
                <div className="card" key={post.key}>
                    <div className="container">
                        <h6><b>{post.title}</b></h6>
                        <p>{post.body}</p>
                    </div>
                </div>
                <div className="comments">
                    <h4><b>Comments</b></h4>
                    {
                        this.state.comments && this.state.comments.map(comment => <CardComment comment={comment} key={comment.id}/>)
                    }
                </div>
            </>
        );
    }

    componentDidMount() {
        const post = this.props.post;
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(response => response.json())
            .then(comments => comments.map(comment => { comment.key = comment.id; return comment; }))
            .then(comments => this.setState({comments: comments}));
    }
}

export default CardDetails;