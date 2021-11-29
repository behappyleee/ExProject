import React, { useState, useEffect } from 'react'
import Axios from 'axios';

function Subscribe(props) {
    
    const [subscribeNumber , setSubscribeNumber ] = useState(0);
    const [Subscribed, setSubscribed ] = useState(false)

    const onSubscribe =() => {

        let subscirbeVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom,
        }

        // 이미 구독중이라면 
        if(Subscribed) {
             Axios.post('/api/subscribe/unSubscribe', subscirbeVariable )
                .then( response => {
                    if(response.data.success) {
                        setSubscribeNumber(subscribeNumber - 1);
                    } else {
                        alert('구독 취소 하는데 실패하였습니다.');
                    }
                })

        // 아직 구독중이 아니라면
        } else {
            Axios.post('/api/subscribe/subscribe', subscirbeVariable )
                .then( response => {
                    if(response.data.success) {
                        setSubscribeNumber(subscribeNumber + 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독하는데 실패하였습니다.');
                    }
                })
        }
    }

    useEffect(() => {
        let variable = {
            userTo : props.userTo,
        }
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber); 
                } else{
                    alert('구독 자 수 정보를 받아오지 못했습니다.')
                }
            })

            let subscribedVariable = {userTo : props.userTo, userFrom: localStorage.getItem(';userId') }    

       Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.setSubscribed);
                } else {
                    alert('정보를 받아오지 못했습니다.');
                }
            })
    }, [])

    return (
        <div>
            <button
                style= {{ 
                    backgroundColor: `${Subscribed ? '#CC0000':'#AAAAAA' }` , 
                    borderRadius: '4px',
                    color: 'white', padding: '10px 16px', fontWeight: '500',         
                    fontSize: '1rem', textTransform: 'uppercase'
                }}
               onClick={onSubscribe}
            >
                {subscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe' }


            </button>
        </div>
    )
}

export default Subscribe
