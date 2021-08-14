import axios from 'axios';
import { withRouter } from 'react-router-dom'
import pic from'./pic.jpg'
import React, { useState } from 'react';

function Make(props) {

    //props and state
    const [Iot, setIot] = useState("")

    const onIothandler = event => {
        setIot(event.currentTarget.value) //state를 바꿔준다
    }

    const onSubmitHandler = event => {
      event.preventDefault();
      const body = {
        mi:Iot
      }
        axios.post('/api/make', body).then(response => {
            if(response.data.Success) {
                alert("Iot장비 추가에 성공했습니다!!")
                props.history.push('/')
            }
            else {
              alert("Iot장비 추가에 실패했습니다!!")
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop:"110px"}}>
            <h1 style={{ textAlign:'center', fontSize:"60px"}}>IOT를</h1>
            <h1 style={{ textAlign:'center', fontSize:"55px", marginTop:"-40px"}}>추가합니다</h1>
            <img src={pic} style={{marginTop:'-30px', width:'330px', height:'200px'}}></img>
            <form style={{display:'flex', flexDirection:'column', width:"280px", marginTop:"30px"}}>
                <input type="name" value={Iot} onChange={onIothandler} style={{borderRadius:"30px", height:"40px", borderColor:"black", textAlign:"center"}} placeholder="식별번호 입력" />
                <button onClick={onSubmitHandler} style={{marginTop:"5px", borderRadius:"30px", backgroundColor:"black", outline:"0", border: "0", color:"white" , height:"40px"}}>추가하기</button>
            </form>
        </div>
    )
}

export default withRouter(Make);