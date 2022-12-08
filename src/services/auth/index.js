import axios from '../config';
import qs from 'qs';

const LOGIN = (email, password) => {
    const data = qs.stringify({
        email,
        password
    });
    const result = axios
        .post('auth/login', data)
        .then((response) => response)
        .catch((error) => {
            if (error.response) {
                return error.response;
            }
            if (error.request) {
                return error.request;
            }
            if (error.message) {
                // do something other than the other two
                return error.message;
            }
            return error;
        });
    return result;
};

const REFRESH_TOKEN = () => {
    axios
        .get('auth/refresh')
        .then((response) => response)
        .catch((e) => e);
};

const ME = async () => {
    const headers = {
        Authorization: `Bearer ${await localStorage.getItem('token')}`
    };
    return axios
        .get('account/self', { headers })
        .then((response) => response)
        .catch((e) => e);
};
const ME_PERMISION = async () => {
    const headers = {
        Authorization: `Bearer ${await localStorage.getItem('token')}`
    };
    return axios
        .get('account/allPermission', { headers })
        .then((response) => response)
        .catch((e) => e);
};
export { LOGIN, REFRESH_TOKEN, ME, ME_PERMISION };
