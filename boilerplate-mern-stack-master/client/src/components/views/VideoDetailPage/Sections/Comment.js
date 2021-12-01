import Axios, { useState } from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import SingleComment from '../Sections/SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    // userSelector 는 state 에서 user 정보를 가져와서 변수에 넣음 
    // state 에서 user 의 모든 정보를 담아와서 user 변수안에 넣는다 ( user 변수 안에 user state 정보가 담겨져 있음 )
    const user = useSelector(state => state.user);
    
    const videoId = props.postId;
    
    const [CommentValue, setCommentValue] = useState();

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value );
    }

    const onSubmit = (event) => {
        // prventDefault() 는 refresh 를 방지하여 줌 
        event.preventDefault();
    
        const variables = {
            content: CommentValue,
            writer : user.userData._id,
            postId : videoId
        }

        Axios.post('/api/comment/saveComment', )
            .then(response => {
                if(response.data.success) {
                    console.log('Comment Response Data' , response.data.result );
                    setCommentValue('');
                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트를 저장하지 못했습니다. ');
                }
            })
    }   

    return (
        <div>
            <br />
            <p> Replies </p>      
            <hr />
            {/* Comment Lists */}
            {props.commentList && props.commentList.map((comment, index) => {
                { !comment.responseTo &&
                // JSX 문법은 div 나 React.Fragment 로 감싸주어야 함 
                <React.Fragment>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                    <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentList={ props.commentList } />  
                </React.Fragment>
                  } 
            })}

            {/* Root Comment Form */}
            <form  style={{ display : 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width : '100%' , borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height : '52px' }} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
