import React, { useEffect, useState } from 'react'
import { Typography, Card, Icon, Avatar, Col, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

    const [Video, setVideos] = useState([]);

    // DOM 이 Rendering 되자마자 무엇을 할지 결정을 해줌 
    // useEffect 는 함수형 컴포넌트에서 생명주기 관리를 위하여 사용 
    useEffect(() => {

        const subscriptionVariales = {
            userFrom : localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariales)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.Videos );
                    setVideos( response.data.videos );
                } else {
                    alert('비디오 가져오기를 실패하였습니다.');
                }
            })
    }, [])   
    
    return (
        <div>

        </div>
    )
}

export default SubscriptionPage
