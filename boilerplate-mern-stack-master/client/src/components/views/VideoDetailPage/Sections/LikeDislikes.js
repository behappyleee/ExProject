import React, { useEffect, useState } from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';
import { PromiseProvider } from 'mongoose';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);

    const [LikeAction, setLikeAction] = useState(null);
    const [DisLikeAction, setDisLikeAction] = useState(null);
    
    let variable = {}

    if(props.video) {
        variable = { videoId : props.videoId, userId: props.userId }
    } else {
       // variable = {commentId, userId}
       variable = {commentId : props.commentId, userId:props.userId }
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
                         setDisLikeAction('disliked');
                     }
                 })
             } else {
                 alert('Disliked 에 정보를 가져오지 못하였씁니다.')
             }
         })   
    }, [])

    const onLike =() => {

        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable )
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');
                        if(DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Like 를 올리지 못하였습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable )
            .then(response => {
                if(response.data.success) {
                  
                    setLikes(Likes - 1)
                    setLikeAction(null)

                } else {
                    alert('Like 를 내리지 못하였습니다.')
                }
            })
        }
    }

    const onDisLike = () => {

        if(DisLikeAction === null) {

            Axios.post('/api/like/unDislike' , variable)
                .then (response => {
                    if(response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDisLikeAction(null)
                    } else {
                        alert('dislike 을 지우지 못하였습니다.')
                    }
                })

        } else {
            Axios.post('/api/like/upDislike' , variable)
            .then (response => {
                if(response.data.success) {
                   
                    setDislikes(Dislikes + 1)
                    setDisLikeAction('disliked')

                    if(LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }

                } else {
                    alert('dislike 을 지우지 못하였습니다.')
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? 'filled' : 'outlined'} 
                          onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft : '8px' , cursor : 'auto'}} >  {Likes}  </span>           
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                          theme={DisLikeAction === ' disliked' ? 'filled' : 'outlined' }
                          onClick={onDisLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft : '8px' , cursor : 'auto'}}> {Dislikes} </span>
            </span>

        </div>
    )
}

export default LikeDislikes





