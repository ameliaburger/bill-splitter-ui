import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export {getUsers, getTransactions};

function getUsers() {
    const url = `${BASE_URL}/user/get-all`;
    return axios.get(url).then(response => response.data);
}

function getTransactions(sessionId) {
    const url = `${BASE_URL}/transaction/get-for-session?sessionId=${sessionId}`;
    return axios.get(url).then(response => response.data);
}