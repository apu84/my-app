import React from "react";

class CardComment extends React.Component {
    render() {
        const comment = this.props.comment;
        return (
            <div className="card">
                <div className="container">
                    <b>{comment.name}</b>
                    <p>{comment.body}</p>
                    <i>{comment.email}</i>
                </div>
            </div>
        );
    }
}

export default CardComment;