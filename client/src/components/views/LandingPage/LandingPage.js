import axios from 'axios'
import { withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
function LandingPage(props) {
    const [Condition, setCondition] = useState(0);
    const [Name, setName] = useState('');
    useEffect(() => {
      axios.get('api/users/auth').then(response => {
          setCondition(response.data.isAuth);
          setName(response.data.name);
      });
    });
    let sign ='';
    let nm_sign
    if (Condition) {
        sign='로그아웃';
        nm_sign = '님 안녕하세요'
    } else {
        sign='로그인';
        nm_sign = '하나님이 답 입니다'
    }

    const onClickHandler = function() {
        if(!Condition) {
            props.history.push('/login')
        } else {
            axios.get('/api/users/logout').then(response => {
                if(response.data.success) {
                    props.history.push('/login')
                }
            })
        }
    }

    return (
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', width:'100%', height:'100vh', fontSize:'38px', textAlign:"center", marginTop:'-50px'}}>
            <div style={{marginBottom:'-5px'}}><h2>REUNBUS<br />새로움을<br />다시쓰다</h2></div>
            <p style={{fontSize:"18px"}}>{Name}{nm_sign}</p>
            <button onClick={onClickHandler} style={{width:'80px', height:'35px', fontSize:'10px', marginTop:'-10px'}}>{sign}</button>
        </div>
    )
}

export default withRouter(LandingPage)