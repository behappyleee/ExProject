import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {


    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComment, setOpenReplyComment] = useState(false);

    useEffect(() => {

        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.ResponseTo === props.parentCommentId ) {
                // number 가 같은게 있으면 하나씩 늘어남
                commentNumber++;
            }

        })
        //두번째 배열인자가 비어있을 시 처음 Load 될 때만 실행이 됨
    }, [props.commentList])


    const renderReplyComment = (parentCommentId) => {
        props.commentList.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                <div style={{ width: '80%', marginLeft:'40px' }}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                    <ReplyComment refreshFunction={props.refreshFunction} commentList={ props.commentList } postId={props.videoId} parentCommentId={comment._id} />  
                </div>
                }
            </React.Fragment>
        ))

    }

    const onHandleChange =() => {
        setOpenReplyComment(!OpenReplyComment);
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange} >
                View {ChildCommentNumber} more comment (s)
            </p>
            }

            {OpenReplyComment &&
                renderReplyComment(props.parentCommentId)
            }


        </div>
    )
}

export default ReplyComment






