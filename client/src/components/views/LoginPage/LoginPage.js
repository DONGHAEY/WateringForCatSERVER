import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {

    const dispatch = useDispatch()

    //props and state
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailhandler = event => {
        setEmail(event.currentTarget.value) //state를 바꿔준다
    }
    const onPasswordhandler = event => {
        setPassword(event.currentTarget.value) 
    }
    const onSubmitHandler = event => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body)).then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/')
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}} onSubmit={onSubmitHandler}>
            <h2 style={{fontSize:'40px', marginRight:"20px"}}>LOGIN</h2>
            <form style={{display:'flex', flexDirection:'column'}}>
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailhandler} />
                <lable>Password</lable>
                <input type="password" value={Password} onChange={onPasswordhandler} />
                <br />
                <button type>Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
