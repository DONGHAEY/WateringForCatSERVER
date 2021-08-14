import axios from 'axios';

export function regiseterUser(body) { //사용자에게서 입력받은 값을 Node서버로 보낸다
    const request = axios.post('/api/users/register', body)
        .then(response => response.data) //response를 받은다음 response를 request에 저장한다
    return {
        type: 'REGISTER_USER',
        payload: request
    }
}

export function loginUser(body) { //사용자에게서 입력받은 값을 Node서버로 보낸다
    const request = axios.post('/api/users/login', body)
        .then(response => response.data) //response를 받은다음 response를 request에 저장한다
    return {
        type: 'LOGIN_USER',
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth').then(response => response.data)
    return {
        type: 'AUTH_USER',
        payload: request
    }
}

export function import_w() {
    const request = axios.get('api/hhc').then(response => response.data)
    return {
        type: 'IMPORT_WATER_VALUE',
        payload: request
    }
}