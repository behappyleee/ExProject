import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import { response } from 'express';
import Subscribe from '../NavBar/Sections/Subscribe';

function VideioDetailPage(props) {
    
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
       Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail( response.data.VideoDetail )
                } else {
                    alert('비디오 정보를 가져오기 실패하였습니다.');
                }
            })
    }, [])
    
    if(VideoDetail.writer) {
        console.log(VideoDetail)
        return (
            <Row gutter={[16, 16]}>
                <Col lg ={18} xs={25}>
                     <div style={{ width: '100%', padding:'3rem 4rem' }}>
                         <video style={{ width: '100%'  }}  src={ `http://localhost:5000/${VideoDetail.filePath} `} />
                     <List.Item
                         actions={ <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}  /> }
                     >
                         <List.Item.Meta
                             avatar={<Avatar src={ VideoDetail.writer.image } />}
                             title={ VideoDetail.writer.name }
                             description={ VideoDetail.description }
                         />
                        
                     </List.Item>
                     {/* Comments */}
                     
                     
                     
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
