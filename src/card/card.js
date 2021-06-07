import React from "react";

class Card extends React.Component {
    render() {
        const post = this.props.post;
        const cardClass = post.pinned ? "card pinned" : "card";
        let pinButton = "";
        if (!post.pinned) {
            pinButton = <button onClick={() => this.props.pinPost(post)}>Pin</button>
        } else {
            pinButton = <button onClick={() => this.props.unpinPost()}>Unpin</button>
        }
        return (
            <div className={cardClass}>
                <div className="container">
                    {pinButton}
                    <h4 onClick={() => this.props.postDetails(post)}><b>{post.title}</b></h4>
                </div>
            </div>
        );
    }
}

export default Card;