import React from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const renderReplyComment = () => {

        props.commentList.map((comment, index) => {
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                <div>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                    <ReplyComment commentList={ props.commentList } />  
                </div>
                }
            </React.Fragment>
        })

    }

    return (
        <div>
            Reply Comment
            <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick >
                View 1 more comment (s)


            </p>

            {renderReplyComment(props)}



        </div>
    )
}

export default ReplyComment






