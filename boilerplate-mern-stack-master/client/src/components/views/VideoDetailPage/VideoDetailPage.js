import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import Subscribe from '../NavBar/Sections/Subscribe';
import Comment from './Sections/Comment';

function VideioDetailPage(props) {
    
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState( [] );

    useEffect(() => {
       Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail( response.data.VideoDetail )
                } else {
                    alert('비디오 정보를 가져오기 실패하였습니다.');
                }
            })
            console.log('Comment State 체크 ');

            Axios.post('/api/comment/getComments', variable)
                .then(response => {
                    if(response.data.success) { 
                        console.log('Comments Data Check : ' , response.data.comments);
                        setComments(response.data.comments)
                    } else {
                        alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
                    }
                })




    }, [])

    const refreshFunction = (newComment) => {
        // concat 을 이용하여 기존 comment 에 newComment 를 넣어준다.
        setComments(Comments.concat(newComment))
    }
    
    if(VideoDetail.writer) {
        console.log(VideoDetail)
 
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
 
        return (
            <Row gutter={[16, 16]}>
                <Col lg ={18} xs={25}>
                     <div style={{ width: '100%', padding:'3rem 4rem' }}>
                         <video style={{ width: '100%'  }}  src={ `http://localhost:5000/${VideoDetail.filePath} `} />
                     <List.Item
                         actions={[ subscribeButton ]}
                     >
                         <List.Item.Meta
                             avatar={<Avatar src={ VideoDetail.writer.image } />}
                             title={ VideoDetail.writer.name }
                             description={ VideoDetail.description }
                         />
                        
                     </List.Item>
                     {/* Comments */}
                            <Comment refreshFunction={refreshFunction} commentList={Comments} postId={ videoId } />
                     </div>              
     
                </Col>
                <Col lg={6} xs={24}>
                     Side Videos 
                </Col>
            </Row>
         )
    } else {
        return (
            <div> .... Loading </div>
        )
    }
    
    // return (
    //    <Row gutter={[16, 16]}>
    //        <Col lg ={18} xs={25}>
    //             <div style={{ width: '100%', padding:'3rem 4rem' }}>
    //                 <video style={{ width: '100%'  }}  src={ `http://localhost:5000/${VideoDetail.filePath} `} />
    //             <List.Item
    //                 actions
    //             >
    //                 <List.Item.Meta
    //                     avatar={<Avatar src={ VideoDetail.writer.image } />}
    //                     title={ post.writer.name }
    //                     description={ VideoDetail.description }
    //                 />

                   
    //             </List.Item>
    //             {/* Comments */}
                
                
                
    //             </div>              

    //        </Col>
    //        <Col lg={6} xs={24}>
    //             Side Videos 

    //        </Col>
    //    </Row>
    // )
}

export default VideioDetailPage
