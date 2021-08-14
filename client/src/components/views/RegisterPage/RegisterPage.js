import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {regiseterUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
function RegisterPage(props) {

    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailhandler = event => {
        setEmail(event.currentTarget.value) //state를 바꿔준다
    }

    const onNamehandler = event => {
        setName(event.currentTarget.value) 
    }
    const onPasswordhandler = event => {
        setPassword(event.currentTarget.value) 
    }

    const onConfirmPasswordhandler = event => {
        setConfirmPassword(event.currentTarget.value) 
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        if(Password!==ConfirmPassword) {
            return alert("check your confirmPassword!")
        }
        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(regiseterUser(body)).then(response => {
            if(response.payload.success) {
                props.history.push("/login")
            } else {
                alert("Failed to sign up")
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}} onSubmit={onSubmitHandler}>
        <h2 style={{textAlign:'center', fontSize:'40px', marginRight:"30px"}}>Register<br />Page</h2>
        <form style={{display:'flex', flexDirection:'column'}}>
            <lable>Email</lable>
            <input type="email" value={Email} onChange={onEmailhandler} />
            <lable>Name</lable>
            <input type="text" value={Name} onChange={onNamehandler} />
            <lable>Password</lable>
            <input type="password" value={Password} onChange={onPasswordhandler} />
            <lable>Confirm password</lable>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordhandler} />
            <br />
            <button type>Register</button>
        </form>
    </div>
    )
}

export default  withRouter(RegisterPage)