import { withRouter } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import React, { useState, useEffect } from 'react';
import {import_w} from '../../../_actions/user_action'

function Machine(props) {

  const [count, setCount] = useState(0);
  const [water_height, setwater_height] = useState('')
  const [water_quality, setwater_quality] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(import_w()).then(response => {
      setCount(response.payload.ws)
      setwater_height(response.payload.wh)
      setwater_quality(response.payload.wc)
    })
  })
  const rerender = function() {
    props.history.push('/machine')
  }

  let img_link = '';
  if (water_height > 50)  img_link = 'https://img.huffingtonpost.com/asset/5d71d8743b0000683fd01db6.jpeg?ops=1200_630';
  else if (water_height > 25)  img_link = 'http://image.dongascience.com/Photo/2019/12/43a8a87814b98b5346192ec9855f5883.jpg';
  else if (water_height > 0)  img_link = 'https://s3.ap-northeast-2.amazonaws.com/st.dangidata/hobby_conects/data/review/video/thumb/86b9466d81d34572866c3c3cd7de5fac.JPG'

  return (
    <div style={{textAlign:'center'}}>
        <img src={img_link} style={{width:'330px', marginTop:"50px"}}></img>
      <p style={{fontSize:'18px'}}>물 높이 : {water_height}, 수질상태 : {water_quality}</p>
      <h2 style={{fontSize:'35px', marginTop:"-15px"}}>오늘 고양이가</h2>
      <h2 style={{fontSize:'35px', marginTop:"-20px"}}>물을 {count}초 동안 마셨어요</h2>
      <button>통계확인</button>       <button Onclick={rerender}>새로고침</button>
    </div>
  )
}

export default withRouter(Machine)