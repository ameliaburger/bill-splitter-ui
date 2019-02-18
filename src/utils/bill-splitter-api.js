import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export {getUsers, getTransactions, getSessions};

function getSessions() {
    const url = `${BASE_URL}/session/get-all`
    return axios.get(url).then(response => response.data);
}

function getUsers(sessionId) {
    const url = `${BASE_URL}/user/get-for-session?sessionId=${sessionId}`;
    return axios.get(url).then(response => response.data);
}

function getTransactions(sessionId) {
    const url = `${BASE_URL}/transaction/get-for-session?sessionId=${sessionId}`;
    return axios.get(url).then(response => response.data);
}