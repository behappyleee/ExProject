import React, { useEffect} from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';
import { PromiseProvider } from 'mongoose';


function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);

    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    
    let variable = {}

    if(props.video) {
        variable = {videoId : props.videoId, userId: props.userId}
    } else {
       // variable = {commentId, userId}
       varibale = {commentId : props.commentId, userId:props.userId }
    }


    useEffect(() => {
        // Likes 정보 가져오는 api
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {

                    // 얼마나 많은 좋아요를 받았는 지
                    setLikes(response.data.likes.length);

                    // 내가 이미 그 좋아요를 눌렀는 지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            // 이미 눌렀다면 liked 라고 표시를 해줌
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert('Liked 에 정보를 가져오지 못하였씁니다.')
                }
            })

         // Dislike 정보 가져오는 api
         Axios.post('/api/like/getDislikes', variable)
         .then(response => {
             if(response.data.success) {

                 // 얼마나 많은 싫어요를 받았는 지
                 setDislikes(response.data.dislikes.length);

                 // 내가 이미 그 싫어요를 눌렀는 지
                 response.data.dislikes.map(dislike => {
                     if(dislike.userId === props.userId) {
                         // 이미 눌렀다면 liked 라고 표시를 해줌
                         setDislikeAction('disliked');
                     }
                 })

             } else {
                 alert('Disliked 에 정보를 가져오지 못하였씁니다.')
             }
         })   
    }, [])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? 'filled' : 'outlined'} 
                          onClick
                    />
                </Tooltip>
            <span style={{ paddingLeft : '8px' , cursor : 'auto'}} >  {Likes}  </span>           
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                          theme={DislikeAction === ' disliked' ? 'filled' : 'outlined' }
                          onClick
                    />
                </Tooltip>
            <span style={{ paddingLeft : '8px' , cursor : 'auto'}}> {Dislikes} </span>
            </span>

        </div>
    )
}

export default LikeDislikes





