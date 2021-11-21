import { Typography, Card, Icon, Avatar, Col, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    // Video 를 빈 배열로 가져옴 
    const [Video, setVideos] = useState([]);

    // DOM 이 Rendering 되자마자 무엇을 할지 결정을 해줌 
    // useEffect 는 함수형 컴포넌트에서 생명주기 관리를 위하여 사용 
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setVideos(response.data);
                } else {
                    alert('비디오 가져오기를 실패하였습니다.');
                }
            })

    }, [])   

    const renderCards = Video.map(( video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor((Video.duration - (minutes*60)));

    return (
        <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt />
                    <div className="duration">
                        <span> { minutes } : { seconds } </span>
                    </div>
                    </a>
                </div>
        <br/>
        <Meta
            avatar= {
                <Avatar src={video.writer.image} />
            }   
            title={video.title}
            description="DESCRIPTION TEST ON LandingPage.js"
        />
            <span>{video.writer.name}</span><br/>
            <span style={{ marginLeft: '3rem'}}> {video.views} views </span> 
        </Col> 
        )
    });

    return (
       <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>

           { renderCards }
            {/*  --> 풀 페이지에 비디오 4개씩 띄우기를 위함  */}
             
            </Row>
       </div>
    )
}

export default LandingPage
